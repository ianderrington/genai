import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import { logger } from '../logger';
import { PostMetadata } from './markdown';
import NodeCache from 'node-cache';
import { getContentDirectory } from './filesystem';

// Cache for folder configs - TTL: 1 hour in production, 5 minutes in dev
const folderConfigCache = new NodeCache({
  stdTTL: process.env.NODE_ENV === 'production' ? 3600 : 300,
  checkperiod: 120,
  useClones: false
});

/**
 * Interface for the .pages configuration file
 */
export interface PagesConfig {
  nav?: Array<string | Record<string, string>>;
  title?: string;
  order?: number;
  hide?: string[];
  defaults?: Partial<PostMetadata>; // Folder-level frontmatter defaults
}

/**
 * Read and parse a .pages configuration file
 * @param dirPath The directory path containing the .pages file
 * @returns The parsed configuration or null if no file exists
 */
export async function readPagesConfig(dirPath: string): Promise<PagesConfig | null> {
  try {
    const pagesPath = path.join(dirPath, '.pages');
    
    // Check if the file exists
    try {
      await fs.access(pagesPath);
    } catch (error) {
      // File doesn't exist, return null
      return null;
    }
    
    // Read the file
    const content = await fs.readFile(pagesPath, 'utf-8');
    
    // Parse YAML
    const config = yaml.load(content) as PagesConfig;
    
    return config || {};
  } catch (error) {
    logger.error(`Error reading .pages config from ${dirPath}: ${error}`);
    return null;
  }
}

/**
 * Sort items based on a .pages configuration
 * @param items Array of items with slugs
 * @param config The .pages configuration
 * @returns Sorted array of items
 */
export function sortByPagesConfig<T extends { slug: string; id?: string }>(
  items: T[],
  config: PagesConfig | null
): T[] {
  if (!config || !config.nav || config.nav.length === 0) {
    return items;
  }
  
  const result: T[] = [];
  const itemMap = new Map<string, T>();
  const remainingItems: T[] = [];
  
  // Create a map of items by their slug and id for easy lookup
  items.forEach(item => {
    // Store by slug
    const slugParts = item.slug.split('/');
    const lastSlugPart = slugParts[slugParts.length - 1];
    itemMap.set(lastSlugPart, item);
    itemMap.set(`${lastSlugPart}.md`, item);
    
    // Store by id if available
    if (item.id) {
      itemMap.set(item.id, item);
      itemMap.set(`${item.id}.md`, item);
    }
    
    // Also add to remaining items
    remainingItems.push(item);
  });
  
  // Process items in the order specified by the nav array
  config.nav.forEach(navItem => {
    if (navItem === '...') {
      // Add all remaining items that haven't been explicitly ordered
      const processedSlugs = new Set(result.map(item => item.slug));
      remainingItems
        .filter(item => !processedSlugs.has(item.slug))
        .forEach(item => result.push(item));
    } else if (typeof navItem !== 'string') {
      // Skip non-string nav items (Record<string, string> entries)
    } else {
      // Strip .md extension if present for matching
      const cleanNavItem = navItem.endsWith('.md')
        ? navItem.substring(0, navItem.length - 3) 
        : navItem;
      
      // Try to find the item by exact match first
      let item = itemMap.get(navItem) || itemMap.get(cleanNavItem);
      
      // If not found, try case-insensitive match
      if (!item) {
        const lowerNavItem = cleanNavItem.toLowerCase();
        item = Array.from(itemMap.values()).find(i => 
          i.id?.toLowerCase() === lowerNavItem || 
          i.slug.split('/')[0].toLowerCase() === lowerNavItem
        );
      }
      
      if (item) {
        // Add to result and remove from remaining items
        result.push(item);
        const index = remainingItems.findIndex(i => i.slug === item.slug);
        if (index !== -1) {
          remainingItems.splice(index, 1);
        }
      }
    }
  });
  
  // Add any remaining items that weren't in the nav array
  if (!config.nav.includes('...')) {
    remainingItems.forEach(item => {
      if (!result.includes(item)) {
        result.push(item);
      }
    });
  }
  
  return result;
}

/**
 * Get the root .pages configuration for the site
 * Used for ordering the main navigation
 */
export async function getRootPagesConfig(): Promise<PagesConfig | null> {
  try {
    const docsPath = getContentDirectory();
    return await readPagesConfig(docsPath);
  } catch (error) {
    logger.error(`Error reading root .pages config: ${error}`);
    return null;
  }
}

/**
 * Read and parse a config.yaml file from a directory
 * This is used for folder-level defaults including TTS configuration
 * @param dirPath The directory path containing the config.yaml file
 * @returns The parsed configuration or null if no file exists
 */
export async function readFolderConfig(dirPath: string): Promise<PagesConfig | null> {
  // Check cache first
  const cacheKey = `folder-config:${dirPath}`;
  const cached = folderConfigCache.get<PagesConfig>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const configPath = path.join(dirPath, 'config.yaml');
    
    // Check if the file exists
    try {
      await fs.access(configPath);
    } catch (error) {
      // File doesn't exist, return null
      return null;
    }
    
    // Read the file
    const content = await fs.readFile(configPath, 'utf-8');
    
    // Parse YAML
    const config = yaml.load(content) as PagesConfig;
    
    // Cache the result
    if (config) {
      folderConfigCache.set(cacheKey, config);
    }
    
    return config || null;
  } catch (error) {
    logger.error(`Error reading folder config from ${dirPath}: ${error}`);
    return null;
  }
}

/**
 * Collect folder configs walking up the directory tree
 * Returns configs from deepest (most specific) to shallowest (most general)
 * 
 * @param filePath - Absolute path to the markdown file
 * @param docsRoot - Root directory of docs (defaults to 'docs')
 * @returns Array of PagesConfig objects from specific to general
 */
export async function collectFolderConfigs(
  filePath: string,
  docsRoot: string = getContentDirectory()
): Promise<PagesConfig[]> {
  const configs: PagesConfig[] = [];
  
  try {
    // Get the directory containing the file
    let currentDir = path.dirname(filePath);
    
    // Walk up the tree until we reach the docs root
    while (currentDir.startsWith(docsRoot) && currentDir !== docsRoot) {
      const config = await readFolderConfig(currentDir);
      if (config) {
        configs.push(config);
      }
      
      // Move up one directory
      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) {
        break; // Reached filesystem root
      }
      currentDir = parentDir;
    }
    
    // Also check the docs root itself
    if (currentDir === docsRoot) {
      const rootConfig = await readFolderConfig(docsRoot);
      if (rootConfig) {
        configs.push(rootConfig);
      }
    }
  } catch (error) {
    logger.error(`Error collecting folder configs for ${filePath}: ${error}`);
  }
  
  return configs;
}

/**
 * Clear the folder config cache
 * Useful for testing or when configs are updated
 */
export function clearFolderConfigCache(): void {
  folderConfigCache.flushAll();
} 