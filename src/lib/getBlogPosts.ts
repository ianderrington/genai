// src/lib/getBlogPosts.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml } from './content/markdown';
import { getContentDirectory } from './content/filesystem';
import { processPostContent } from './postUtils';
import { logger } from './logger';

export interface BlogPostProps {
  slug: string;
  title: string;
  date: string;
  content: string;
  htmlContent: string;
  excerpt: string;
  description: string;
  categories: string[];
  bullets: string[];
  draft: boolean;
  path: string[];
  childPosts: BlogPostProps[];
  childSlugs: string[];
  displayStyle: string;
  hierarchicalSlug: string;
  coverImage?: string;
  author?: string;
  authorImage?: string;
  authorBio?: string;
  readingTime?: string;
  tags?: string[];
  parentSlug?: string;
  sectionId?: string;  // ID of the section this post belongs to
  sectionName?: string;  // Display name of the section this post belongs to
  isIndexFile: boolean;
  originalPath?: string;
  hide?: string[];  // Array of elements to hide (e.g., 'navigation')
  show_bullets?: boolean; // Whether to show bullets in the post
  key_points?: string[]; // Key points to highlight in the post
  shareBlurbs?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    medium?: string;
    substack?: string;
  };
}

export interface DocTree {
  [key: string]: {
    post?: BlogPostProps;
    children: DocTree;
  };
}

// Unified slug normalization function to ensure consistent handling
function normalizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/%20/g, '-')     // Replace %20 with hyphens
    .replace(/[^a-z0-9-_]/g, '-') // Replace non-alphanumeric chars with hyphens (allow underscores)
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '');   // Remove leading/trailing hyphens
}

// Function to generate all possible slug variations for matching
function generateSlugVariations(slug: string): string[] {
  const variations = [
    slug,
    slug.replace(/-/g, '_'),  // Replace hyphens with underscores
    slug.replace(/_/g, '-'),  // Replace underscores with hyphens
  ];
  
  // Remove duplicates using Array.from
  return Array.from(new Set(variations));
}

export async function getBlogPosts(section: string = 'blog') {
  try {
    // Check if the section has a posts directory
    const sectionDirectory = path.join(getContentDirectory(), section);
    const postsDirectory = path.join(sectionDirectory, 'posts');
    
    let hasPostsDir = false;
    try {
      const stats = await fs.stat(postsDirectory);
      hasPostsDir = stats.isDirectory();
    } catch (e) {
      // posts directory doesn't exist
      hasPostsDir = false;
    }
    
    // First, try to get the root index.md file
    const rootIndexPath = path.join(sectionDirectory, 'index.md');
    let rootIndex: BlogPostProps | null = null;

    try {
      const indexContent = await fs.readFile(rootIndexPath, 'utf8');
      logger.debug(`Successfully read root index.md for ${section}`);
      
      const { data, content: markdownContent } = matter(indexContent);
      
      // Use same excerpt handling for root index
      const [beforeMore, ...afterMore] = markdownContent.split('<!--more-->');
      const excerpt = beforeMore.trim();
      const fullContent = afterMore.length > 0 ? markdownContent : excerpt;

      const [htmlContent, htmlExcerpt] = await Promise.all([
        markdownToHtml(fullContent, rootIndexPath),
        markdownToHtml(excerpt, rootIndexPath)
      ]);

      // Create a proper section-specific slug for the root index
      rootIndex = {
        slug: `${section}`,  // Changed from ${section}/index to just ${section}
        title: data.title || section.charAt(0).toUpperCase() + section.slice(1),
        date: data.date || new Date().toISOString().split('T')[0],
        content: markdownContent,
        htmlContent,
        excerpt: htmlExcerpt,
        description: data.description || '',
        categories: Array.isArray(data.categories) ? data.categories : [],
        bullets: Array.isArray(data.bullets) ? data.bullets : [],
        draft: !!data.draft,
        path: [section],
        childPosts: [],
        childSlugs: [],
        displayStyle: data.displayStyle || 'standard',
        hierarchicalSlug: section,  // Changed from ${section}/index to just ${section}
        isIndexFile: true,
        hide: data.hide || undefined,
        show_bullets: data.show_bullets || undefined,
        key_points: data.key_points || undefined,
        shareBlurbs: data.shareBlurbs || undefined
      };
    } catch (e) {
      logger.error(`Error reading root index for ${section}: ${e}`);
      
      // If no index.md exists, create a default one with a better title and content
      const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
      
      rootIndex = {
        slug: section,
        title: sectionTitle,
        date: new Date().toISOString().split('T')[0],
        content: `# ${sectionTitle}\n\nWelcome to the ${sectionTitle} section of the blog.`,
        htmlContent: `<h1>${sectionTitle}</h1><p>Welcome to the ${sectionTitle} section of the blog.</p>`,
        excerpt: `Welcome to the ${sectionTitle} section of the blog.`,
        description: `${sectionTitle} section`,
        categories: [],
        bullets: [],
        draft: false,
        path: [section],
        childPosts: [],
        childSlugs: [],
        displayStyle: 'standard',
        hierarchicalSlug: section,
        isIndexFile: true,
        hide: undefined,
        show_bullets: undefined,
        key_points: undefined,
        shareBlurbs: undefined
      };
      
      // Try to create the index.md file for next time
      try {
        const indexContent = `---
draft: false
date: ${new Date().toISOString().split('T')[0]}
title: "${sectionTitle}"
description: "${sectionTitle} section"
---

Welcome to the ${sectionTitle} section of the blog.`;
        
        await fs.writeFile(rootIndexPath, indexContent, 'utf8');
        logger.debug(`Created default index.md for ${section}`);
      } catch (writeError) {
        logger.error(`Error creating default index.md for ${section}: ${writeError}`);
      }
    }

    // Process the main section directory recursively
    let posts = await processDirectoryRecursively(sectionDirectory, [section]);
    
    // If there's a posts directory, process it too and merge the results
    if (hasPostsDir) {
      const postsDirPosts = await processDirectoryRecursively(postsDirectory, [section]);
      posts = [...posts, ...postsDirPosts];
    }
    
    // Add root index to posts array if it exists
    if (rootIndex) {
      // Check if we already have a post with the same slug
      const existingRootIndex = posts.find(p => p.slug === rootIndex?.slug);
      if (!existingRootIndex) {
        posts.unshift(rootIndex);
      }
    }

    // Ensure we don't have duplicate posts with the same slug
    const uniquePosts = Array.from(
      new Map(posts.map(post => [post.slug, post])).values()
    );
    
    // Build a map of all posts by slug for faster lookups
    const postsBySlug = new Map<string, BlogPostProps>();
    uniquePosts.forEach(post => {
      postsBySlug.set(post.slug, post);
      
      // Also add with normalized slug (replacing hyphens with underscores and vice versa)
      const variations = generateSlugVariations(post.slug);
      variations.forEach(variation => {
        if (variation !== post.slug) {
          postsBySlug.set(variation, post);
        }
      });
    });
    
    // Process all posts to build the collection hierarchy
    uniquePosts.forEach(post => {
      // Skip processing the root index as it's handled separately
      if (post.slug === section) return;
      
      const pathSegments = post.slug.split('/');
      
      // For each level in the path, associate this post with its parent collection
      for (let i = 1; i < pathSegments.length; i++) {
        // Build the parent path up to this level
        const parentPath = pathSegments.slice(0, i).join('/');
        
        // Find the parent post (either directly or with /index)
        const parentPost = postsBySlug.get(parentPath) || postsBySlug.get(`${parentPath}/index`);
        
        if (parentPost) {
          // If this is a direct child (next level in hierarchy)
          if (i === pathSegments.length - 1 && !post.isIndexFile) {
            // Check if this post is already in the parent's childPosts
            const isAlreadyChild = parentPost.childPosts.some(p => p.slug === post.slug);
            
            if (!isAlreadyChild) {
              // Add this post to the parent's childPosts
              parentPost.childPosts.push(post);
              parentPost.childSlugs.push(post.slug);
              
              logger.debug(`Added post ${post.slug} to parent ${parentPost.slug}'s childPosts`);
            }
          }
        }
      }
    });
    
    // Special handling for index files
    uniquePosts.forEach(post => {
      if (post.isIndexFile) {
        // Get the parent path (without /index)
        const parentPath = post.slug.replace(/\/index$/, '');
        
        // Find all direct children of this index
        const directChildren = uniquePosts.filter(p => {
          if (p.slug === post.slug) return false; // Skip self
          if (p.isIndexFile) return false; // Skip other index files
          
          const pathSegments = p.slug.split('/');
          const parentSegments = parentPath.split('/');
          
          // A direct child has exactly one more segment than the parent
          // and all parent segments match
          return pathSegments.length === parentSegments.length + 1 &&
                 p.slug.startsWith(`${parentPath}/`);
        });
        
        // Update childPosts and childSlugs
        if (directChildren.length > 0) {
          // Only add children that aren't already in the list
          const existingSlugs = new Set(post.childSlugs);
          const newChildren = directChildren.filter(p => !existingSlugs.has(p.slug));
          
          if (newChildren.length > 0) {
            post.childPosts = [...post.childPosts, ...newChildren];
            post.childSlugs = [...post.childSlugs, ...newChildren.map(p => p.slug)];
            
            logger.debug(`Added ${newChildren.length} direct children to index ${post.slug}`);
          }
        }
      }
    });
    
    // Handle special case for collection index files
    uniquePosts.forEach(post => {
      // If this is a regular post (not an index) but has child posts, it's a collection
      if (!post.isIndexFile && post.childPosts.length > 0) {
        // Mark it as a collection
        post.displayStyle = 'collection';
        logger.debug(`Marked post ${post.slug} as a collection with ${post.childPosts.length} child posts`);
      }
    });

    // COMPREHENSIVE FIX: Ensure all posts in terminal collections are properly associated
    // First, identify all terminal collections (folders that contain markdown files but no subfolders)
    const terminalCollections = new Map<string, BlogPostProps>();
    
    // Find all potential terminal collection paths
    uniquePosts.forEach(post => {
      if (post.isIndexFile) {
        const collectionPath = post.slug.replace(/\/index$/, '');
        terminalCollections.set(collectionPath, post);
      }
    });
    
    // For each terminal collection, find all posts that should belong to it
    terminalCollections.forEach((collectionPost, collectionPath) => {
      // Find all posts that belong to this collection
      const collectionPosts = uniquePosts.filter(post => {
        // Skip the collection index itself
        if (post.slug === collectionPost.slug) return false;
        
        // Skip draft posts
        if (post.draft) return false;
        
        // Include all posts that start with this collection's path
        // This is the key fix - we're looking for ALL posts that belong to this collection
        const variations = generateSlugVariations(collectionPath);
        return variations.some(variation => post.slug.startsWith(`${variation}/`));
      });
      
      if (collectionPosts.length > 0) {
        logger.debug(`COMPREHENSIVE FIX: Found ${collectionPosts.length} posts for terminal collection: ${collectionPath}`);
        
        // Check if these posts are already in the collection's childPosts
        const existingSlugs = new Set(collectionPost.childSlugs || []);
        const newPosts = collectionPosts.filter(p => !existingSlugs.has(p.slug));
        
        if (newPosts.length > 0) {
          // Add these posts to the collection's childPosts
          collectionPost.childPosts = [...(collectionPost.childPosts || []), ...newPosts];
          collectionPost.childSlugs = [...(collectionPost.childSlugs || []), ...newPosts.map(p => p.slug)];
          collectionPost.displayStyle = 'collection';
          
          logger.debug(`COMPREHENSIVE FIX: Added ${newPosts.length} posts to terminal collection: ${collectionPath}`);
          
          // Log each post we're adding for debugging
          newPosts.forEach(post => {
            logger.debug(`COMPREHENSIVE FIX: Added post ${post.slug} to terminal collection: ${collectionPath}`);
          });
        }
      }
    });
    
    

    logger.debug(`Found ${uniquePosts.length} posts for section ${section}: ${uniquePosts.map(p => p.slug).join(', ')}`);
    
    return uniquePosts;
  } catch (e) {
    logger.error(`Error in getBlogPosts for ${section}: ${e}`);
    return []; // Return empty array instead of throwing
  }
}

// Recursive directory processing function
async function processDirectoryRecursively(dirPath: string, parentPath: string[] = []): Promise<BlogPostProps[]> {
  try {
    logger.debug(`Processing directory recursively: ${dirPath}, parentPath: ${parentPath.join('/')}`);
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    // First, check if this directory has an index.md file
    const hasIndexFile = entries.some(entry => 
      entry.isFile() && (entry.name === 'index.md' || entry.name === 'index.mdx')
    );
    
    const postsPromises = entries.map(async entry => {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
        try {
          const content = await fs.readFile(fullPath, 'utf8');
          const { data, content: markdownContent } = matter(content);
          
          // Skip root level index.md files as they're handled separately
          // But process index.md files in subdirectories
          if (entry.name === 'index.md' && parentPath.length <= 1 && dirPath.endsWith(parentPath[0])) {
            return null;
          }
          
          // Split at <!--more--> and use first paragraph as fallback
          const [beforeMore, ...afterMore] = markdownContent.split('<!--more-->');
          let excerpt = beforeMore.trim();
          const fullContent = afterMore.length > 0 ? markdownContent : excerpt;

          // If no <!--more-->, use first paragraph
          if (afterMore.length === 0) {
            const firstParagraph = excerpt.split('\n\n')[0].trim();
            excerpt = firstParagraph;
          }

          const [htmlContent, htmlExcerpt] = await Promise.all([
            markdownToHtml(fullContent, fullPath),
            markdownToHtml(excerpt, fullPath)
          ]);

          // Create normalized slug
          const normalizedParentPath = parentPath.map(normalizeSlug);
          const normalizedName = normalizeSlug(entry.name.replace(/\.mdx?$/, ''));
          
          // Handle index files specially - they should use the parent path as their slug
          let slug;
          if (normalizedName === 'index' && parentPath.length > 0) {
            // For nested index files, use the parent path
            slug = normalizedParentPath.join('/');
            logger.debug(`Created slug for index file: ${slug}`);
          } else {
            slug = [...normalizedParentPath, normalizedName].join('/');
            logger.debug(`Created slug for regular file: ${slug}`);
          }

          // Explicitly mark index files
          const isIndexFile = entry.name === 'index.md' || entry.name === 'index.mdx';

          return {
            slug,
            title: data.title || entry.name.replace(/\.mdx?$/, ''),
            date: data.date || new Date().toISOString().split('T')[0],
            content: markdownContent,
            htmlContent,
            excerpt: htmlExcerpt,
            description: data.description || '',
            categories: Array.isArray(data.categories) ? data.categories : [],
            bullets: Array.isArray(data.bullets) ? data.bullets : [],
            draft: !!data.draft,
            path: parentPath,
            childPosts: [],
            childSlugs: [],
            displayStyle: data.displayStyle || (isIndexFile ? 'collection' : 'standard'),
            hierarchicalSlug: slug,
            parentSlug: parentPath.join('/'),
            coverImage: data.coverImage || undefined,
            author: data.author || undefined,
            authorImage: data.authorImage || undefined,
            authorBio: data.authorBio || undefined,
            readingTime: data.readingTime || undefined,
            tags: Array.isArray(data.tags) ? data.tags : undefined,
            sectionId: data.sectionId || undefined,
            sectionName: data.sectionName || undefined,
            isIndexFile: isIndexFile,
            originalPath: fullPath,
            hide: data.hide || undefined,
            show_bullets: data.show_bullets || undefined,
            key_points: data.key_points || undefined,
            shareBlurbs: data.shareBlurbs || undefined
          } as BlogPostProps;
        } catch (e) {
          logger.error(`Error processing ${fullPath}: ${e}`);
          // Return a fallback post instead of failing
          return {
            slug: [...parentPath.map(p => normalizeSlug(p)), normalizeSlug(entry.name.replace(/\.mdx?$/, ''))].join('/'),
            title: `Error loading: ${entry.name}`,
            date: new Date().toISOString().split('T')[0],
            content: 'Error loading content',
            htmlContent: '<p>Error loading content</p>',
            excerpt: 'Error loading content',
            description: '',
            categories: [],
            bullets: [],
            draft: false,
            path: parentPath,
            childPosts: [],
            childSlugs: [],
            displayStyle: 'standard',
            hierarchicalSlug: '',
            parentSlug: parentPath.join('/'),
            sectionId: undefined,
            sectionName: undefined,
            isIndexFile: false,
            originalPath: fullPath,
            hide: undefined,
            show_bullets: undefined,
            key_points: undefined,
            shareBlurbs: undefined
          } as BlogPostProps;
        }
      }
      
      if (entry.isDirectory()) {
        // Skip processing the 'posts' directory if we're already in the section directory
        // This prevents duplicate processing since we handle it separately in getBlogPosts
        if (entry.name === 'posts' && parentPath.length === 1) {
          return null;
        }
        
        // Recursively process subdirectories at any depth
        return processDirectoryRecursively(fullPath, [...parentPath, entry.name]);
      }
      
      return null;
    });

    const results = await Promise.all(postsPromises);
    return results.flat().filter((post): post is BlogPostProps => post !== null);
  } catch (e) {
    logger.error(`Error processing directory: ${e}`);
    return [];
  }
}