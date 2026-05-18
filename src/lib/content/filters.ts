import { Post } from './index';

/**
 * Filter out draft posts unless explicitly included
 * @param posts Array of posts to filter
 * @param includeDrafts Whether to include draft posts
 * @returns Filtered array of posts
 */
export function filterDrafts(posts: Post[], includeDrafts: boolean = false): Post[] {
  if (includeDrafts) return posts;
  
  return posts.filter(post => {
    // Always show index posts (collections)
    if (post.isIndex) return true;
    // Filter out drafts
    return !post.metadata.draft;
  });
} 