import path from 'path';
import { logger } from '../logger';
import { cache } from 'react';
import NodeCache from 'node-cache';
import fs from 'fs';

// Re-export types
export type { Post, ChatSegmentData } from './types';
export type { PostMetadata } from './markdown';
import type { Post } from './types';

// Create a server-side cache with a default TTL of 5 minutes (300 seconds) in development, 10 minutes in production
const contentCache = new NodeCache({
  stdTTL: process.env.NODE_ENV === 'production' ? 600 : 300 // 10 min prod, 5 min dev
});

// Cache key prefixes
const CACHE_KEYS = {
  ALL_CONTENT: 'all_content',
  POST_BY_SLUG: 'post_by_slug:',
  CHILD_POSTS: 'child_posts:',
  SECTION_CONTENT: 'section_content:',
};

/**
 * Load content from pre-processed JSON file
 */
async function loadFromPreProcessed(): Promise<Post[]> {
  const preProcessedPath = path.join(process.cwd(), 'public', 'content-data.json');

  if (!fs.existsSync(preProcessedPath)) {
    logger.warn('[loadFromPreProcessed] Pre-processed content file not found');
    return [];
  }

  logger.info('[loadFromPreProcessed] Loading content from pre-processed JSON');
  const preProcessedData = JSON.parse(fs.readFileSync(preProcessedPath, 'utf8'));

  // Convert pre-processed data to Post objects
  const posts: Post[] = preProcessedData.content.map((item: any) => {
    // Determine parent slug
    let parentSlug: string | undefined;
    if (item.isIndex && item.path.length > 1) {
      parentSlug = item.path.slice(0, -1).join('/') || undefined;
    } else if (!item.isIndex && item.path.length > 1) {
      parentSlug = item.path.slice(0, -1).join('/') || undefined;
    }

    return {
      slug: item.slug,
      path: item.path,
      content: '', // Not needed at runtime, already have HTML
      html: item.html,
      excerpt: item.excerpt,
      metadata: item.metadata,
      isIndex: item.isIndex,
      childPosts: [],
      childSlugs: [],
      parentSlug,
      sectionId: item.path[0] || '',
      sectionName: item.path[0] || '',
      displayStyle: item.isIndex ? 'collection' : 'standard',
      chatSegmentsHtml: item.chatSegmentsHtml
    } as Post;
  });

  logger.info(`[loadFromPreProcessed] Loaded ${posts.length} posts from pre-processed data`);
  return posts;
}

/**
 * Load content from filesystem (dev mode only)
 */
async function loadFromFilesystemDynamic(): Promise<Post[]> {
  logger.info('[loadFromFilesystemDynamic] Using filesystem scanning (dev mode)');

  // Dynamic import to avoid bundling heavy dependencies in production
  const { loadFromFilesystem } = await import('./filesystem-loader');
  return await loadFromFilesystem();
}

/**
 * Build parent-child relationships between posts
 * @param posts The array of posts to process
 * @returns The processed posts with parent-child relationships
 */
export function buildPostRelationships(posts: Post[]): Post[] {
  // Create a map of slugs to posts for quick lookup
  const postMap = new Map<string, Post>();
  posts.forEach(post => {
    postMap.set(post.slug, post);
  });
  
  // Build parent-child relationships
  posts.forEach(post => {
    // Get all potential parent slugs by walking up the path
    const slugParts = post.slug.split('/');
    for (let i = slugParts.length - 1; i > 0; i--) {
      const potentialParentSlug = slugParts.slice(0, i).join('/');
      const parentPost = postMap.get(potentialParentSlug);
      
      if (parentPost) {
        // Found the immediate parent
        post.parentSlug = parentPost.slug;
        if (!parentPost.childSlugs.includes(post.slug)) {
          parentPost.childSlugs.push(post.slug);
        }
        break;
      }
    }
  });
  
  // Populate childPosts arrays
  posts.forEach(post => {
    post.childPosts = post.childSlugs
      .map(slug => postMap.get(slug))
      .filter((post): post is Post => post !== undefined);
  });
  
  return posts;
}

/**
 * Get all content with proper caching
 * @returns An array of all posts
 */
export async function getAllContent(): Promise<Post[]> {
  // Check if content is already cached
  const cachedContent = contentCache.get(CACHE_KEYS.ALL_CONTENT);
  if (cachedContent) {
    return cachedContent as Post[];
  }

  // If not cached, process content and store in cache
  try {
    // Check if we should use pre-processed content
    const preProcessedPath = path.join(process.cwd(), 'public', 'content-data.json');
    const preProcessedExists = fs.existsSync(preProcessedPath);

    let posts: Post[];

    // Always use pre-processed content if available (for builds and production)
    // Only use filesystem loading in dev when preprocessed doesn't exist
    if (preProcessedExists) {
      logger.info(`[getAllContent] Using preprocessed content (NODE_ENV=${process.env.NODE_ENV})`);
      posts = await loadFromPreProcessed();
    } else {
      logger.info(`[getAllContent] Using filesystem loading (NODE_ENV=${process.env.NODE_ENV}) - preprocessed content not found`);
      posts = await loadFromFilesystemDynamic();
    }

    // Build parent-child relationships
    const processedPosts = buildPostRelationships(posts);

    // Store in cache before returning
    contentCache.set(CACHE_KEYS.ALL_CONTENT, processedPosts);
    return processedPosts;
  } catch (error) {
    logger.error(`Error getting all content: ${error}`);
    if (error instanceof Error) {
      logger.error(`Error stack: ${error.stack}`);
    }
    return [];
  }
}

/**
 * Get content for a specific section
 * @param section The section to get content for
 * @returns An array of posts in the section
 */
export async function getSectionContent(section: string): Promise<Post[]> {
  const allContent = await getAllContent();
  return allContent.filter(post => post.sectionId === section);
}

/**
 * Get a specific post by slug
 * @param slug The slug to get the post for
 * @returns The post with the specified slug, or null if not found
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Check if post is already cached
  const cacheKey = `${CACHE_KEYS.POST_BY_SLUG}${slug}`;
  const cachedPost = contentCache.get(cacheKey);
  if (cachedPost) {
    return cachedPost as Post | null;
  }

  const allContent = await getAllContent();
  const post = allContent.find(post => post.slug === slug) || null;
  
  // Cache the result
  contentCache.set(cacheKey, post);
  return post;
}

/**
 * Get all child posts for a given slug
 * @param slug The slug to get child posts for
 * @returns An array of child posts
 */
export async function getChildPosts(slug: string): Promise<Post[]> {
  const allContent = await getAllContent();
  return allContent.filter(post => post.parentSlug === slug);
}

/**
 * Get all sections from the content directory
 * @returns An array of section objects
 */
export async function getSections(): Promise<{ id: string; name: string }[]> {
  try {
    // Get sections from all content
    const allContent = await getAllContent();

    // Get unique section IDs (first segment of each post's path)
    const sectionIds = new Set<string>();
    allContent.forEach(post => {
      if (post.sectionId) {
        sectionIds.add(post.sectionId);
      }
    });

    // Convert to array of section objects
    return Array.from(sectionIds)
      .filter(id => id) // Filter out empty strings
      .map(id => ({
        id,
        name: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      }));
  } catch (error) {
    logger.error(`Error getting sections: ${error}`);
    return [];
  }
}

// Cache the content functions to avoid redundant filesystem reads
export const getCachedAllContent = cache(getAllContent);
export const getCachedSectionContent = cache(getSectionContent);
export const getCachedPostBySlug = cache(getPostBySlug);
export const getCachedChildPosts = cache(getChildPosts);
export const getCachedSections = cache(getSections);

// Function to clear cache when content changes
export function clearContentCache() {
  contentCache.flushAll();
} 