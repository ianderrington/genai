/**
 * Auto-generated Container registrations
 *
 * These containers represent the pages in your Next.js application.
 */

import { createContainer } from '@supernal/interface';

/**
 * Register all containers
 */
export function registerContainers() {
  createContainer({
  id: 'search',
  name: 'Search',
  type: 'page',
  route: '/search',
});
}

// Auto-register containers on import
registerContainers();
