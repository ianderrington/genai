import { getSections } from './getSections';
import { getBlogPosts, BlogPostProps } from './getBlogPosts';
import { logger } from './logger';
import { cache } from 'react';

/**
 * Fetches posts from all sections except the specified excludeSections
 * and combines them into a single list sorted by date (newest first)
 * 
 * @param excludeSections Array of section IDs to exclude from the aggregation
 * @returns Promise resolving to a sorted array of blog posts from all sections
 */
export const getAllSectionPosts = cache(async (excludeSections: string[] = []): Promise<BlogPostProps[]> => {
  try {
    // Get all available sections
    const sections = await getSections();
    
    // Filter out excluded sections
    const includedSections = sections.filter(section => 
      !excludeSections.includes(section.id)
    );
    
    logger.debug(`Fetching posts from ${includedSections.length} sections: ${includedSections.map(s => s.id).join(', ')}`);
    
    // Fetch posts from each section in parallel
    const postsPromises = includedSections.map(async section => {
      try {
        logger.debug(`Fetching posts from section: ${section.id}`);
        const sectionPosts = await getBlogPosts(section.id);
        logger.debug(`Found ${sectionPosts.length} posts in section ${section.id}`);
        
        // Add section information to each post for display purposes
        return sectionPosts.map(post => ({
          ...post,
          sectionId: section.id,
          sectionName: section.name
        }));
      } catch (error) {
        logger.error(`Error fetching posts from section ${section.id}: ${error}`);
        // Continue with next section even if there's an error
        return [];
      }
    });
    
    // Wait for all posts to be fetched
    const postsArrays = await Promise.all(postsPromises);
    
    // Flatten the array of arrays into a single array
    const allPosts = postsArrays.flat();
    
    logger.debug(`Fetched ${allPosts.length} posts from all sections`);
    
    // Filter out index posts and folder posts (collections)
    // We only want individual content posts for the chronological view
    const contentPosts = allPosts.filter(post => {
      // Log the post being evaluated to help debug
      logger.debug(`Evaluating post: ${post.slug}, title: ${post.title}`);
      
      // Skip posts that are section root indexes
      if (post.slug === post.sectionId) {
        logger.debug(`Skipping section root index: ${post.slug}`);
        return false;
      }
      
      // Skip posts that are explicitly marked as index files
      if (post.isIndexFile) {
        logger.debug(`Skipping explicit index file: ${post.slug}`);
        return false;
      }
      
      // Skip posts that are folder indexes by checking the original file path
      const originalPath = post.originalPath || '';
      if (originalPath.endsWith('/index.md') || originalPath.endsWith('/index.mdx')) {
        logger.debug(`Skipping by original path: ${post.slug}, path: ${originalPath}`);
        return false;
      }
      
      // Skip posts where the title matches a directory name
      // This is a common pattern for index files that represent collections
      const pathParts = post.slug.split('/');
      const lastPathPart = pathParts[pathParts.length - 1];
      const secondLastPathPart = pathParts[pathParts.length - 2];
      if (lastPathPart === secondLastPathPart) {
        logger.debug(`Skipping likely index file (title matches directory): ${post.slug}`);
        return false;
      }
      
      // Skip posts that have bullet lists that match links to other posts
      // This is a common pattern for index files that list child posts
      // if (post.bullets && post.bullets.length > 0) {
      //   logger.debug(`Post has bullets, might be an index: ${post.slug}`);
      //   return false;
      // }
      
      // Skip posts that are folder indexes
      if (post.slug.endsWith('/index')) {
        logger.debug(`Skipping by slug ending with /index: ${post.slug}`);
        return false;
      }
      
      // Skip any index.md files by checking the path segments
      const pathSegments = post.path;
      const lastSegment = pathSegments[pathSegments.length - 1];
      if (lastSegment === 'index') {
        logger.debug(`Skipping by last path segment being 'index': ${post.slug}`);
        return false;
      }
      
      // Also check if the slug contains 'index' anywhere
      if (post.slug.includes('/index')) {
        logger.debug(`Skipping by slug containing /index: ${post.slug}`);
        return false;
      }
      
      // Skip posts that are explicitly marked as collections
      if (post.displayStyle === 'collection') {
        logger.debug(`Skipping collection: ${post.slug}`);
        return false;
      }
      
      // Skip draft posts
      if (post.draft) {
        logger.debug(`Skipping draft: ${post.slug}`);
        return false;
      }
      
      logger.debug(`Including post: ${post.slug}`);
      return true;
    });
    
    // Add additional logging to check what posts are being included
    logger.debug(`Posts after filtering: ${contentPosts.map(p => p.slug).join(', ')}`);
    
    logger.debug(`Filtered to ${contentPosts.length} content posts`);
    
    // Log some sample posts for debugging
    if (contentPosts.length > 0) {
      logger.debug(`Sample posts: ${contentPosts.slice(0, 3).map(p => `${p.sectionId}/${p.slug}: ${p.title}`).join(', ')}`);
    }
    
    // Sort posts by date (newest first)
    const sortedPosts = contentPosts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Descending order (newest first)
    });
    
    return sortedPosts;
  } catch (error) {
    logger.error(`Error fetching posts from all sections: ${error}`);
    return [];
  }
}); 