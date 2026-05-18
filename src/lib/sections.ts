import { getCachedSections } from './content';

/**
 * Get all sections from the content directory
 * @returns An array of section objects
 */
export async function getSections() {
  return await getCachedSections();
} 