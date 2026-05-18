/**
 * Shared type definitions for content system
 */

import { ChatSegmentMetadata, PostMetadata } from './markdown';

export interface ChatSegmentData {
  content: string;
  metadata: ChatSegmentMetadata;
  index: number;
}

export interface Post {
  slug: string;
  path: string[];
  content: string;
  html: string;
  excerpt: string;
  metadata: PostMetadata;
  isIndex: boolean;
  childPosts: Post[];
  childSlugs: string[];
  parentSlug?: string;
  sectionId?: string;
  sectionName?: string;
  displayStyle: string;
  chatSegmentsHtml?: ChatSegmentData[];
}
