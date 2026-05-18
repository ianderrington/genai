import { PostMetadata } from './markdown';
import { logger } from '../logger';

/**
 * Deep merge utility for frontmatter objects
 * File-level frontmatter takes precedence over folder-level defaults
 * 
 * @param base - The base object (from folder config defaults)
 * @param override - The override object (from file frontmatter)
 * @returns Merged object with overrides taking precedence
 */
export function deepMerge<T extends Record<string, any>>(
  base: T | undefined,
  override: T | undefined
): T {
  // If no base, return override or empty object
  if (!base) return (override || {}) as T;
  // If no override, return base
  if (!override) return base;

  const result = { ...base } as Record<string, any>;

  for (const key in override) {
    if (Object.prototype.hasOwnProperty.call(override, key)) {
      const overrideValue = override[key];
      const baseValue = result[key];

      // If override value is undefined or null, keep base value
      if (overrideValue === undefined || overrideValue === null) {
        continue;
      }

      // If override is an object and base is also an object, merge recursively
      if (
        typeof overrideValue === 'object' &&
        !Array.isArray(overrideValue) &&
        typeof baseValue === 'object' &&
        !Array.isArray(baseValue) &&
        baseValue !== null
      ) {
        result[key] = deepMerge(baseValue, overrideValue);
      } else {
        // Otherwise, override completely replaces base
        result[key] = overrideValue;
      }
    }
  }

  return result as T;
}

/**
 * Merge folder-level defaults with file-level frontmatter
 * 
 * @param defaults - Default metadata from folder config
 * @param fileFrontmatter - Frontmatter from the specific file
 * @returns Merged PostMetadata with file-level taking precedence
 */
export function mergeFrontmatter(
  defaults: Partial<PostMetadata> | undefined,
  fileFrontmatter: PostMetadata
): PostMetadata {
  if (!defaults) {
    return fileFrontmatter;
  }

  try {
    // Deep merge defaults with file frontmatter
    const merged = deepMerge(defaults as Record<string, any>, fileFrontmatter as Record<string, any>);
    
    return merged as PostMetadata;
  } catch (error) {
    logger.error(`Error merging frontmatter: ${error instanceof Error ? error.message : String(error)}`);
    // On error, return file frontmatter as-is
    return fileFrontmatter;
  }
}

/**
 * Example usage:
 * 
 * Folder config (docs/musings/building_code/config.yaml):
 * ```yaml
 * defaults:
 *   tts:
 *     enabled: true
 *     provider: openai
 *     voice: onyx
 *     enableSpeed: true
 *     enableProgress: true
 *     apiUrl: https://tts.supernal.ai
 * ```
 * 
 * File frontmatter (my-post.md):
 * ```yaml
 * ---
 * title: "My Post"
 * tts:
 *   voice: nova  # Override just the voice
 * ---
 * ```
 * 
 * Result:
 * ```typescript
 * {
 *   title: "My Post",
 *   tts: {
 *     enabled: true,      // from defaults
 *     provider: "openai", // from defaults
 *     voice: "nova",      // from file (overridden)
 *     enableSpeed: true,  // from defaults
 *     enableProgress: true, // from defaults
 *     apiUrl: "https://tts.supernal.ai" // from defaults
 *   }
 * }
 * ```
 */

