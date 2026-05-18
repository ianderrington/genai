import { Post } from "@/lib/content";

export interface TagInfo {
  name: string;
  count: number;
  slug: string;
}

/**
 * Extract and count all unique tags from a collection of posts
 */
export function getAllTags(posts: Post[], minFrequency: number = 1): TagInfo[] {
  // Create a map to store tag counts
  const tagMap = new Map<string, number>();
  
  // Count occurrences of each tag
  posts.forEach(post => {
    // Process tags array if it exists
    if (Array.isArray(post.metadata.tags)) {
      post.metadata.tags.forEach(tag => {
        const normalizedTag = normalizeTag(tag);
        if (normalizedTag) { // Only process non-empty tags
          tagMap.set(normalizedTag, (tagMap.get(normalizedTag) || 0) + 1);
        }
      });
    }
    
    // Also process categories as tags if they exist
    if (Array.isArray(post.metadata.categories)) {
      post.metadata.categories.forEach(category => {
        const normalizedCategory = normalizeTag(category);
        if (normalizedCategory) { // Only process non-empty categories
          tagMap.set(normalizedCategory, (tagMap.get(normalizedCategory) || 0) + 1);
        }
      });
    }
  });
  
  // Convert map to array of TagInfo objects and filter by frequency
  return Array.from(tagMap.entries())
    .filter(([name, count]) => count >= minFrequency) // Filter by minimum frequency
    .map(([name, count]) => ({
      name,
      count,
      slug: slugifyTag(name)
    }))
    .sort((a, b) => b.count - a.count); // Sort by count in descending order
}

/**
 * Normalize a tag string (trim whitespace, consistent casing, handle duplicates)
 */
export function normalizeTag(tag: string): string {
  if (!tag || typeof tag !== 'string') {
    return '';
  }
  
  const trimmed = tag.trim();
  if (!trimmed) {
    return '';
  }
  
  // Convert to proper case - capitalize first letter, lowercase the rest
  // This handles duplicates like "Education" vs "education" vs "EDUCATION"
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

/**
 * Create a URL-friendly slug from a tag name
 */
export function slugifyTag(tag: string): string {
  return tag.toLowerCase()
    .replace(/\s+/g, '-')  // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')  // Remove non-word chars
    .replace(/\-\-+/g, '-')  // Replace multiple hyphens with single
    .replace(/^-+/, '')  // Trim hyphens from start
    .replace(/-+$/, '');  // Trim hyphens from end
}

/**
 * Filter posts by one or more tags (AND logic)
 */
export function filterPostsByTags(posts: Post[], tagSlugs: string[]): Post[] {
  if (tagSlugs.length === 0) return posts;
  
  return posts.filter(post => {
    // Post must match ALL the provided tags (AND logic)
    return tagSlugs.every(tagSlug => {
      // Check if post has tags or categories that match this tag
      const hasTags = Array.isArray(post.metadata.tags) && 
        post.metadata.tags.some(tag => slugifyTag(normalizeTag(tag)) === tagSlug);
      
      // Check categories
      const hasCategories = Array.isArray(post.metadata.categories) && 
        post.metadata.categories.some(category => slugifyTag(normalizeTag(category)) === tagSlug);
      
      return hasTags || hasCategories;
    });
  });
}

/**
 * Filter posts by a specific tag (legacy function for backward compatibility)
 */
export function filterPostsByTag(posts: Post[], tagSlug: string): Post[] {
  return filterPostsByTags(posts, [tagSlug]);
} 