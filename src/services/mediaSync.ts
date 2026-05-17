import { SupabaseClient } from '@supabase/supabase-js'
import { MediaAsset, MediaSyncConfig, MediaSyncStatus, MediaSyncReport, MediaFile } from '../types/media'
import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'
import mime from 'mime-types'
import yaml from 'js-yaml'

export class MediaSyncService {
  private client: SupabaseClient
  private config: MediaSyncConfig
  private status: MediaSyncStatus = {
    inProgress: false,
    lastSync: null,
    errors: []
  }

  constructor(client: SupabaseClient, config: MediaSyncConfig) {
    this.client = client
    this.config = config
  }

  private async calculateFileHash(filePath: string): Promise<string> {
    const fileBuffer = await fs.readFile(filePath)
    return crypto.createHash('sha256').update(fileBuffer).digest('hex')
  }

  private getStoragePath(filePath: string): string {
    // Generate a flat storage path using hash to avoid collisions
    const ext = path.extname(filePath)
    const hash = crypto.createHash('md5').update(filePath).digest('hex').slice(0, 8)
    return `${hash}${ext}`
  }

  private async loadMediaRegistry(): Promise<Record<string, MediaFile>> {
    try {
      const content = await fs.readFile(this.config.registryPath, 'utf-8')
      return JSON.parse(content)
    } catch {
      return {}
    }
  }

  private async saveMediaRegistry(registry: Record<string, MediaFile>): Promise<void> {
    await fs.writeFile(this.config.registryPath, JSON.stringify(registry, null, 2))
  }

  private async updateFrontmatterWithRemoteUrl(mdFilePath: string, localPath: string, remoteUrl: string): Promise<void> {
    try {
      const content = await fs.readFile(mdFilePath, 'utf-8')
      const [frontmatter, ...contentParts] = content.split('---\n')
      
      if (!frontmatter || contentParts.length === 0) return

      const data = yaml.load(frontmatter) as Record<string, any>
      
      // Update URLs in coverMedia and coverImage
      if (data.coverMedia?.url === localPath) {
        data.coverMedia.remote_url = remoteUrl
      }
      if (data.coverImage?.url === localPath) {
        data.coverImage.remote_url = remoteUrl
      }
      
      const updatedFrontmatter = yaml.dump(data)
      await fs.writeFile(mdFilePath, `---\n${updatedFrontmatter}---\n${contentParts.join('---\n')}`)
    } catch (error) {
      console.error(`Failed to update frontmatter in ${mdFilePath}:`, error)
    }
  }

  private async findAssociatedMarkdownFiles(contentRoot: string, mediaPath: string): Promise<string[]> {
    const mdFiles: string[] = []
    const dir = path.dirname(mediaPath)
    const entries = await fs.readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        const mdPath = path.join(dir, entry.name)
        const content = await fs.readFile(mdPath, 'utf-8')
        if (content.includes(path.basename(mediaPath))) {
          mdFiles.push(mdPath)
        }
      }
    }
    
    return mdFiles
  }

  async findMediaFilesToSync(dir: string, dryRun = false): Promise<MediaFile[]> {
    const mediaFiles: MediaFile[] = []
    const registry = await this.loadMediaRegistry()
    
    const processFile = async (filePath: string) => {
      const mimeType = mime.lookup(filePath) || ''
      if (!mimeType.startsWith('image/') && !mimeType.startsWith('video/')) return null
      
      const hash = await this.calculateFileHash(filePath)
      const existing = registry[filePath]
      
      if (existing && existing.hash === hash) return null
      
      return {
        localPath: filePath,
        storagePath: this.getStoragePath(filePath),
        hash,
        mimeType,
        size: (await fs.stat(filePath)).size,
        lastModified: new Date(),
        needsSync: true
      }
    }

    const walkDir = async (currentDir: string) => {
      const entries = await fs.readdir(currentDir, { withFileTypes: true })
      
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name)
        if (entry.isDirectory()) {
          if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
            await walkDir(fullPath)
          }
        } else {
          const mediaFile = await processFile(fullPath)
          if (mediaFile) mediaFiles.push(mediaFile)
        }
      }
    }

    await walkDir(dir)

    if (dryRun) {
      await fs.writeFile(
        'files_to_upload.md',
        `# Files to Upload\n\n${mediaFiles.map(f => `- ${f.localPath}`).join('\n')}`
      )
    }

    return mediaFiles
  }

  async syncFile(filePath: string, mediaFile: MediaFile): Promise<MediaAsset> {
    const { data, error } = await this.client.storage
      .from(this.config.bucket)
      .upload(mediaFile.storagePath, await fs.readFile(filePath), {
        contentType: mediaFile.mimeType,
        upsert: true
      })

    if (error) throw error

    const { data: { publicUrl } } = this.client.storage
      .from(this.config.bucket)
      .getPublicUrl(mediaFile.storagePath)

    // Update registry
    const registry = await this.loadMediaRegistry()
    registry[filePath] = {
      ...mediaFile,
      publicUrl,
      needsSync: false
    }
    await this.saveMediaRegistry(registry)

    // Update markdown files
    const mdFiles = await this.findAssociatedMarkdownFiles(this.config.contentRoot, filePath)
    for (const mdFile of mdFiles) {
      await this.updateFrontmatterWithRemoteUrl(
        mdFile,
        `./${path.relative(path.dirname(mdFile), filePath)}`,
        publicUrl
      )
    }

    return {
      id: data.path,
      hash: mediaFile.hash,
      filename: path.basename(filePath),
      path: mediaFile.storagePath,
      publicUrl,
      mimeType: mediaFile.mimeType,
      size: mediaFile.size,
      lastModified: mediaFile.lastModified
    }
  }

  async syncDirectory(dryRun = false): Promise<MediaSyncReport> {
    const report: MediaSyncReport = {
      startTime: new Date(),
      endTime: null,
      totalFiles: 0,
      successfulUploads: 0,
      failedUploads: 0,
      errors: []
    }

    this.status.inProgress = true

    try {
      const filesToSync = await this.findMediaFilesToSync(this.config.contentRoot, dryRun)
      report.totalFiles = filesToSync.length

      if (dryRun) {
        return {
          ...report,
          endTime: new Date()
        }
      }

      for (const mediaFile of filesToSync) {
        try {
          await this.syncFile(mediaFile.localPath, mediaFile)
          report.successfulUploads++
        } catch (error) {
          report.failedUploads++
          report.errors.push({
            file: mediaFile.localPath,
            error: error instanceof Error ? error.message : String(error)
          })
        }
      }

      // Generate removable files list
      const registry = await this.loadMediaRegistry()
      const removableFiles = Object.entries(registry)
        .filter(([_, file]) => !file.needsSync)
        .map(([path]) => path)

      if (removableFiles.length > 0) {
        await fs.writeFile(
          'removable_files.md',
          `# Files Safe to Remove\nThese files have been synced to storage and can be removed from the repository:\n\n${removableFiles.join('\n')}`
        )
      }

      return {
        ...report,
        endTime: new Date()
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      return {
        ...report,
        endTime: new Date(),
        errors: [...report.errors, {
          file: 'unknown',
          error: errorMessage
        }]
      }
    } finally {
      this.status.inProgress = false
      this.status.lastSync = new Date()
    }
  }

  getStatus(): MediaSyncStatus {
    return { ...this.status }
  }
} 