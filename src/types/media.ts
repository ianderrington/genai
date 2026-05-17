import { StorageError } from '@supabase/storage-js'

export interface MediaAsset {
  id: string
  hash: string
  filename: string
  path: string
  publicUrl: string
  remote_url?: string
  mimeType: string
  size: number
  lastModified: Date
}

export interface ImageAsset extends MediaAsset {
  width: number
  height: number
  thumbnailUrl?: string
}

export interface VideoAsset extends MediaAsset {
  duration: number
  thumbnailUrl?: string
}

export interface MediaSyncStatus {
  inProgress: boolean
  lastSync: Date | null
  errors: Array<{
    file: string
    error: string
  }>
}

export interface MediaFile {
  localPath: string
  storagePath: string
  hash: string
  mimeType: string
  size: number
  lastModified: Date
  needsSync: boolean
  publicUrl?: string
}

export interface MediaSyncConfig {
  bucket: string
  contentRoot: string
  registryPath: string
  maxFileSize: number
  allowedImageTypes: string[]
  allowedVideoTypes: string[]
}

export interface MediaSyncReport {
  startTime: Date
  endTime: Date | null
  totalFiles: number
  successfulUploads: number
  failedUploads: number
  errors: Array<{
    file: string
    error: string
  }>
} 