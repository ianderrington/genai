// Default image paths
const DEFAULT_POST_IMAGE = '/images/default-post.jpg';
const DEFAULT_COLLECTION_IMAGE = '/images/default-collection.jpg';
const DEFAULT_MUSINGS_IMAGE = '/images/default-musings.jpg';
const DEFAULT_BLOG_IMAGE = '/images/default-blog.jpg';
const DEFAULT_FICTION_IMAGE = '/images/default-fiction.jpg';
const DEFAULT_PROJECTS_IMAGE = '/images/default-projects.jpg';
const DEFAULT_ABOUT_IMAGE = '/images/default-about.jpg';

// All sections with their default images
export const SECTION_IMAGES = {
  blog: DEFAULT_BLOG_IMAGE,
  fiction: DEFAULT_FICTION_IMAGE,
  musings: DEFAULT_MUSINGS_IMAGE,
  projects: DEFAULT_PROJECTS_IMAGE,
  about: DEFAULT_ABOUT_IMAGE,
} as const;

export const DEFAULT_IMAGES = {
  post: DEFAULT_POST_IMAGE,
  collection: DEFAULT_COLLECTION_IMAGE,
  section: SECTION_IMAGES
} as const;

// Type for sections to ensure type safety
export type ContentSection = keyof typeof SECTION_IMAGES; 