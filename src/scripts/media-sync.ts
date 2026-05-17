#!/usr/bin/env node
import { program } from 'commander'
import { createClient } from '@supabase/supabase-js'
import { MediaSyncService } from '../services/mediaSync'
import { mediaSyncConfig } from '../config/media'
import dotenv from 'dotenv'

dotenv.config()

const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env

if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('Error: Supabase environment variables are not set')
  process.exit(1)
}

const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
const mediaSync = new MediaSyncService(supabase, mediaSyncConfig)

program
  .name('media-sync')
  .description('CLI to manage media synchronization with Supabase storage')

program
  .command('status')
  .description('Show current sync status')
  .action(async () => {
    const status = mediaSync.getStatus()
    console.log('Media Sync Status:', status)
  })

program
  .command('dry-run')
  .description('Show which files would be synced without actually syncing')
  .action(async () => {
    try {
      const report = await mediaSync.syncDirectory(true)
      console.log('Dry Run Report:', report)
      console.log('\nCheck files_to_upload.md for the list of files that would be synced')
    } catch (error) {
      console.error('Error during dry run:', error)
      process.exit(1)
    }
  })

program
  .command('sync')
  .description('Synchronize media files with Supabase storage')
  .action(async () => {
    try {
      console.log('Starting media synchronization...')
      const report = await mediaSync.syncDirectory(false)
      console.log('Sync completed:', report)
      
      if (report.errors.length > 0) {
        console.log('\nErrors encountered:')
        report.errors.forEach(({ file, error }) => {
          console.error(`- ${file}: ${error}`)
        })
      }
      
      console.log('\nCheck removable_files.md for the list of files that can be safely removed')
    } catch (error) {
      console.error('Error during sync:', error)
      process.exit(1)
    }
  })

program.parse() 