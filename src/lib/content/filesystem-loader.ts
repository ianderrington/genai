/**
 * Filesystem-based content loading (dev mode only)
 * Separated to avoid importing heavy dependencies in production
 */

import { readDirectoryRecursively, readMarkdownFile, getContentDirectory, getAbsolutePath } from './filesystem';
import { parseFrontmatter, markdownToHtml, generateExcerpt, splitMarkdownIntoSegments } from './markdown';
import { generateSlug } from './slugs';
import { logger } from '../logger';
import { collectFolderConfigs } from './pages-config';
import { mergeFrontmatter } from './frontmatter-merge';
import { Post, ChatSegmentData } from './types';

/**
 * Process a single markdown file into a Post object (filesystem version)
 */
export async function processMarkdownFile(filePath: string): Promise<Post | null> {
  try {
    const absolutePath = getAbsolutePath(filePath);
    const content = await readMarkdownFile(absolutePath);

    if (!content) {
      return null;
    }

    // Parse frontmatter
    const { metadata: fileFrontmatter, content: markdownContent } = parseFrontmatter(content);

    // Skip files without valid frontmatter object
    if (!fileFrontmatter || typeof fileFrontmatter !== 'object') {
      logger.warn(`Skipping file ${filePath} - missing frontmatter object`);
      return null;
    }

    // Derive title from file path if not provided (support MkDocs-style docs without title)
    if (!fileFrontmatter.title) {
      const pathParts = filePath.replace(/\.(md|mdx)$/, '').split('/');
      const lastPart = pathParts[pathParts.length - 1];
      (fileFrontmatter as any).title = lastPart === 'index'
        ? pathParts[pathParts.length - 2]?.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Index'
        : lastPart.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      logger.warn(`Auto-derived title for ${filePath}: "${(fileFrontmatter as any).title}"`);
    }

    // Skip draft posts
    if (fileFrontmatter.draft === true) {
      logger.info(`Skipping draft post: ${filePath}`);
      return null;
    }

    // Collect folder-level configs and merge with file frontmatter
    const folderConfigs = await collectFolderConfigs(absolutePath);

    // Merge configs from general to specific, with file frontmatter taking final precedence
    let mergedMetadata = fileFrontmatter;

    if (folderConfigs.length > 0) {
      let baseDefaults: any = {};

      for (let i = folderConfigs.length - 1; i >= 0; i--) {
        const config = folderConfigs[i];
        if (config.defaults) {
          baseDefaults = mergeFrontmatter(baseDefaults, config.defaults as any) as any;
        }
      }

      if (Object.keys(baseDefaults).length > 0) {
        mergedMetadata = mergeFrontmatter(baseDefaults, fileFrontmatter);
        logger.debug(`[Frontmatter Merge: ${filePath}] Applied ${folderConfigs.length} folder config(s)`);
      }
    }

    const metadata = mergedMetadata;

    logger.info(`[Metadata Check: ${filePath}] Parsed render_as: '${metadata.render_as}'`);
    const excerpt = await generateExcerpt(markdownContent, 160, filePath);

    let html = '';
    let chatSegmentsHtml: ChatSegmentData[] | undefined = undefined;

    if (metadata.render_as === 'chat') {
      const segments = splitMarkdownIntoSegments(markdownContent);
      chatSegmentsHtml = [];
      logger.info(`[Chat Processing: ${filePath}] Found ${segments.length} raw segments.`);
      for (const segment of segments) {
        logger.info(`[Chat Processing: ${filePath}] Segment ${segment.index} Raw Markdown:\n---\n${segment.rawMarkdown}\n---`);
        logger.info(`[Chat Processing: ${filePath}] Segment ${segment.index} Metadata: ${JSON.stringify(segment.metadata)}`);

        const segmentHtml = await markdownToHtml(segment.rawMarkdown, filePath);
        chatSegmentsHtml.push({
          content: segmentHtml,
          index: segment.index,
          metadata: segment.metadata
        });
      }
    } else {
      html = await markdownToHtml(markdownContent, filePath);
    }

    // Generate slug from file path
    const slug = generateSlug(filePath);

    // Determine if this is an index file
    const isIndex = filePath.endsWith('index.md') || filePath.endsWith('index.mdx') ||
                   slug.endsWith('/index') || slug === 'index';

    // Get the path segments
    const pathSegments = slug.split('/').filter(Boolean);
    const normalizedPath = pathSegments.join('/');

    // Get the parent slug
    let parentSlug: string | undefined;
    if (isIndex) {
      parentSlug = pathSegments.slice(0, -2).join('/') || undefined;
    } else {
      parentSlug = pathSegments.slice(0, -1).join('/') || undefined;
    }

    // Get the section ID
    const sectionId = pathSegments[0] || '';

    const post: Post = {
      slug: isIndex ? normalizedPath.replace(/\/index$/, '') : normalizedPath,
      path: pathSegments,
      content: markdownContent,
      html,
      excerpt,
      metadata,
      isIndex,
      childPosts: [],
      childSlugs: [],
      parentSlug,
      sectionId,
      sectionName: sectionId,
      displayStyle: isIndex ? 'collection' : 'standard',
      chatSegmentsHtml
    };

    return post;
  } catch (error) {
    logger.error(`Error processing markdown file ${filePath}: ${error}`);
    return null;
  }
}

/**
 * Load all content from filesystem (dev mode)
 */
export async function loadFromFilesystem(): Promise<Post[]> {
  const contentDir = getContentDirectory();
  const filePaths = await readDirectoryRecursively(contentDir);

  const postsPromises = filePaths.map(async filePath => {
    logger.info(`[getAllContent] Attempting to process: ${filePath}`);
    return await processMarkdownFile(filePath);
  });

  const posts = (await Promise.all(postsPromises)).filter((post): post is Post => post !== null);
  return posts;
}
