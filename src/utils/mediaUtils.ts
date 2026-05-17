import { createHash } from 'crypto'
import { readFile, stat } from 'fs/promises'
import { extname } from 'path'
import { MediaAsset, ImageAsset, VideoAsset, MediaSyncConfig } from '../types/media'

export async function generateFileHash(filePath: string): Promise<string> {
  const buffer = await readFile(filePath)
  return createHash('sha256').update(buffer).digest('hex')
}

export async function getFileMetadata(filePath: string): Promise<Pick<MediaAsset, 'size' | 'lastModified'>> {
  const stats = await stat(filePath)
  return {
    size: stats.size,
    lastModified: stats.mtime
  }
}

export function getMimeType(filename: string): string {
  const ext = extname(filename).toLowerCase()
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime'
  }
  return mimeTypes[ext] || 'application/octet-stream'
}

export function isImageFile(filename: string, config: MediaSyncConfig): boolean {
  const mimeType = getMimeType(filename)
  return config.allowedImageTypes.includes(mimeType)
}

export function isVideoFile(filename: string, config: MediaSyncConfig): boolean {
  const mimeType = getMimeType(filename)
  return config.allowedVideoTypes.includes(mimeType)
}

export function validateFileSize(size: number, config: MediaSyncConfig): boolean {
  return size <= config.maxFileSize
}

export function generatePublicUrl(bucket: string, path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${cleanPath}`
}

export function generateThumbnailPath(originalPath: string): string {
  const ext = extname(originalPath)
  return originalPath.replace(ext, `_thumb${ext}`)
} 