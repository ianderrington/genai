import { Post } from '@/lib/content';
import { readPagesConfig, sortByPagesConfig } from '@/lib/content/pages-config';
import path from 'path';
import { getContentDirectory } from '@/lib/content/filesystem';
import { logger } from '../logger';

export interface FolderItem {
  slug: string;
  fullSlug: string;
  section: string;
  title: string;
  description?: string;
  path: string;
  metadata?: Post['metadata'];
  posts: Post[];
  indexPost?: Post;
}

export type CombinedItem = FolderItem | Post;

/**
 * Processes a list of posts for a given scope (section or subdirectory)
 * and prepares them for display in a CardGrid component.
 * Filters out the main index post, groups other posts by immediate subfolder,
 * finds index posts for those subfolders, and sorts all items based on .pages config.
 *
 * @param allPostsInScope - All posts relevant to the current view
 * @param scopeSlug - The base slug for the current scope (e.g., 'docs', or 'docs/subfolder')
 * @returns An array of CombinedItem sorted and ready for CardGrid.
 */
export async function prepareGridItems(
  allPostsInScope: Post[],
  scopeSlug: string,
): Promise<CombinedItem[]> {
  // Normalize scopeSlug by removing trailing slash if present
  const cleanScopeSlug = scopeSlug.endsWith('/') ? scopeSlug.slice(0, -1) : scopeSlug;
  const section = cleanScopeSlug.split('/')[0];

  // 1. Filter out the main index post for the current scope
  const nonIndexPostsAndFolderIndices = allPostsInScope.filter(post => {
    if (!post.isIndex) return true;
    return post.slug !== cleanScopeSlug && post.slug !== `${cleanScopeSlug}/index`;
  });

  // 2. Group posts by immediate subfolder & identify direct children
  const postsByFolder: Record<string, Post[]> = {}; 
  const directChildPosts: Post[] = []; 

  nonIndexPostsAndFolderIndices.forEach(post => {
    if (post.isIndex) return;
    
    // Calculate path relative to the current scopeSlug
    const relativePath = post.slug.startsWith(`${cleanScopeSlug}/`)
                         ? post.slug.substring(cleanScopeSlug.length + 1)
                         : post.slug;
    if (!relativePath) { return; }
    const pathSegments = relativePath.split('/');

    if (pathSegments.length > 1 && !pathSegments[0].endsWith('.md') && !pathSegments[0].endsWith('.mdx')) {
        const folderName = pathSegments[0];
        const folderSlug = `${cleanScopeSlug}/${folderName}`;
        if (!postsByFolder[folderSlug]) { 
          postsByFolder[folderSlug] = [];
        }
        // Add the post and all its child posts to the folder
        postsByFolder[folderSlug].push({
          ...post,
          sectionId: section,
          sectionName: section
        });
        // If the post has child posts, add them too
        if (post.childPosts?.length > 0) {
          postsByFolder[folderSlug].push(...post.childPosts.map(childPost => ({
            ...childPost,
            sectionId: section,
            sectionName: section
          })));
        }
    } else if (pathSegments.length === 1 && !post.isIndex) {
         directChildPosts.push({
           ...post,
           sectionId: section,
           sectionName: section
         });
    }
  });

  // 3. Find index posts for all relevant subfolders
  const folderIndexPosts: Record<string, Post> = {}; 
  const indexOnlyFolders: Record<string, Post> = {}; 

  nonIndexPostsAndFolderIndices
    .filter(post => post.isIndex) 
    .forEach(indexPost => {
      const parentFolderSlug = indexPost.slug.replace(/\/index$/, '');
      if (parentFolderSlug.startsWith(`${cleanScopeSlug}/`) && parentFolderSlug.split('/').length === cleanScopeSlug.split('/').length + 1) {
        folderIndexPosts[parentFolderSlug] = {
          ...indexPost,
          sectionId: section,
          sectionName: section
        };
        if (postsByFolder[parentFolderSlug] === undefined) {
          indexOnlyFolders[parentFolderSlug] = {
            ...indexPost,
            sectionId: section,
            sectionName: section
          };
        }
      }
    });

  // 4. Sort direct children and folder items based on .pages config
  const scopePath = path.join(getContentDirectory(), cleanScopeSlug);
  const pagesConfig = await readPagesConfig(scopePath);
  const sortedDirectChildPosts = sortByPagesConfig(directChildPosts, pagesConfig);

  // 5. Prepare folder items structure, including index-only folders
  let folderItems: FolderItem[] = Object.keys(postsByFolder).map(folderSlug => {
    const folderName = folderSlug.split('/').pop() || '';
    const indexPost = folderIndexPosts[folderSlug];
    return {
      slug: folderName,
      fullSlug: folderSlug, // Keep the full slug for proper path resolution
      section,
      title: indexPost?.metadata.title || folderName,
      description: indexPost?.metadata.description,
      path: `/${section}/${folderSlug}`, // Keep the full path for proper routing
      metadata: indexPost?.metadata,
      posts: postsByFolder[folderSlug],
      indexPost
    };
  });

  // Add items for folders that only had an index post
  Object.keys(indexOnlyFolders).forEach(folderSlug => {
    const indexPost = indexOnlyFolders[folderSlug];
    const folderName = folderSlug.split('/').pop() || '';
    folderItems.push({
      slug: folderName,
      fullSlug: folderSlug, // Keep the full slug for proper path resolution
      section,
      title: indexPost.metadata.title || folderName,
      description: indexPost.metadata.description,
      path: `/${section}/${folderSlug}`, // Keep the full path for proper routing
      metadata: indexPost.metadata,
      posts: [],
      indexPost
    });
  });

  // 6. Sort the combined folder items
  const sortedFolderItems = sortByPagesConfig(folderItems, pagesConfig);

  // 7. Combine sorted folders and sorted direct posts
  return [...sortedFolderItems, ...sortedDirectChildPosts];
} 