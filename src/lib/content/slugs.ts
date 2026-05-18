/**
 * Generate a slug from a file path
 * @param filePath The file path to generate a slug from
 * @returns The generated slug
 */
export function generateSlug(filePath: string): string {
  // Remove file extension
  let slug = filePath.replace(/\.(md|mdx)$/, '');
  
  // Handle index files
  if (slug.endsWith('/index')) {
    slug = slug.replace(/\/index$/, '');
  }
  
  // Handle top-level .md files - preserve the directory structure
  if (!slug.endsWith('index')) {
    const parts = slug.split('/');
    const lastPart = parts[parts.length - 1];
    if (lastPart.endsWith('.md')) {
      parts[parts.length - 1] = lastPart.replace(/\.md$/, '');
      slug = parts.join('/');
    }
  }
  
  // Normalize slug
  slug = slug
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_/]/g, '')  // Allow underscores
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return slug;
}

/**
 * Generate all possible variations of a slug for matching
 * @param slug The slug to generate variations for
 * @returns An array of possible slug variations
 */
export function generateSlugVariations(slug: string): string[] {
  // Generate all possible variations of the slug for matching
  return [
    slug,
    slug.replace(/-/g, '_'),
    slug.replace(/_/g, '-'),
  ];
}

/**
 * Check if a slug is an index slug
 * @param slug The slug to check
 * @returns True if the slug is an index slug, false otherwise
 */
export function isIndexSlug(slug: string): boolean {
  // Check if the slug ends with '/index' or is exactly 'index'
  // Also check if the last path segment is 'index'
  const segments = slug.split('/');
  const lastSegment = segments[segments.length - 1];
  
  return slug.endsWith('/index') || slug === 'index' || lastSegment === 'index';
}

/**
 * Get the parent slug for a given slug
 * @param slug The slug to get the parent for
 * @returns The parent slug
 */
export function getParentSlug(slug: string): string | null {
  // If the slug doesn't contain a slash, it's a top-level slug
  if (!slug.includes('/')) {
    return null;
  }
  
  // Handle index files specially
  if (slug.endsWith('/index')) {
    // For index files, go up two levels since /index is one level
    const segments = slug.split('/');
    segments.pop(); // Remove 'index'
    if (segments.length > 1) {
      segments.pop(); // Remove parent directory
      return segments.join('/');
    }
    return null;
  }
  
  // For non-index files, just remove the last segment
  const segments = slug.split('/');
  segments.pop();
  return segments.join('/');
}

/**
 * Get the section ID from a slug
 * @param slug The slug to get the section ID from
 * @returns The section ID
 */
export function getSectionFromSlug(slug: string): string {
  // Get the first segment of the slug
  return slug.split('/')[0];
}

/**
 * Normalize a slug for comparison
 * @param slug The slug to normalize
 * @returns The normalized slug
 */
export function normalizeSlugForComparison(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/-/g, '')
    .replace(/_/g, '')
    .replace(/\s+/g, '');
}

/**
 * Check if two slugs match, accounting for variations
 * @param slug1 The first slug
 * @param slug2 The second slug
 * @returns True if the slugs match, false otherwise
 */
export function slugsMatch(slug1: string, slug2: string): boolean {
  const normalized1 = normalizeSlugForComparison(slug1);
  const normalized2 = normalizeSlugForComparison(slug2);
  
  return normalized1 === normalized2;
} 