/**
 * Auto-generated route contract for 
 *
 * This contract provides type-safe access to all routes in the application.
 */
export const Routes = {
  sectionSlug: (section: string, slug: string) => `/${section}/${slug}`,
  section: (section: string) => `/${section}`,
  blog: '/blog',
  devStory_graph: '/dev/story-graph',
  root: '/',
  search: '/search',
} as const;

export type Route = keyof typeof Routes;
