import { MediaSyncConfig } from '../types/media'

export const mediaSyncConfig: MediaSyncConfig = {
  bucket: 'media',
  contentRoot: './docs',
  registryPath: './media/registry/registry.json',
  maxFileSize: 100 * 1024 * 1024, // 100MB
  allowedImageTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ],
  allowedVideoTypes: [
    'video/mp4',
    'video/webm',
    'video/ogg'
  ]
} 