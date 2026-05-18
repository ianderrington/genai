import { Post, getCachedChildPosts, getCachedSectionContent, getCachedSections } from '@/lib/content';
import { prepareGridItems, CombinedItem } from '@/lib/content/collectionUtils';

export interface CollectionRenderData {
  indexPost: Post | null;
  items: CombinedItem[];
  breadcrumbPath: Array<{ name: string; href: string }>;
  section: string;
  isCollection: boolean;
}

export async function prepareCollectionRenderData(
  section: string, 
  slug?: string[]
): Promise<CollectionRenderData> {
  const sections = await getCachedSections();
  const sectionInfo = sections.find(s => s.id === section);
  const sectionName = sectionInfo?.name || section.charAt(0).toUpperCase() + section.slice(1);

  // If no slug provided, this is a top-level section collection
  if (!slug || slug.length === 0) {
    const allPostsInSection = await getCachedSectionContent(section);
    const indexPost = allPostsInSection.find(post => 
      post.isIndex && (post.slug === section || post.slug === `${section}/index`)
    );
    
    const allItems = await prepareGridItems(allPostsInSection, section);
    const breadcrumbPath = [{ name: sectionName, href: `/${section}` }];
    
    return {
      indexPost: indexPost || null,
      items: allItems,
      breadcrumbPath,
      section,
      isCollection: true
    };
  }

  // For nested collections, find the specific post
  const relativePath = [section, ...slug].join('/');
  const { getCachedPostBySlug } = await import('@/lib/content');
  const { generateSlug } = await import('@/lib/content/slugs');
  const fullSlug = generateSlug(relativePath);
  const post = await getCachedPostBySlug(fullSlug);

  if (!post) {
    return {
      indexPost: null,
      items: [],
      breadcrumbPath: [],
      section,
      isCollection: false
    };
  }

  // Check if this post is a collection (index file)
  const isCollection = post.isIndex;
  let allItems: CombinedItem[] = [];

  if (isCollection) {
    // Gather all nested posts for this collection
    const childPosts = await getCachedChildPosts(post.slug);
    const scopeSlug = post.slug.replace(/\/index$/, '');
    
    const getAllNestedPosts = async (posts: Post[]): Promise<Post[]> => {
      const allPosts: Post[] = [];
      for (const childPost of posts) {
        allPosts.push(childPost);
        if (childPost.isIndex || childPost.childSlugs?.length > 0) {
          const nestedPosts = await getCachedChildPosts(childPost.slug);
          allPosts.push(...await getAllNestedPosts(nestedPosts));
        }
      }
      return allPosts;
    };
    
    const allNestedPosts = await getAllNestedPosts(childPosts);
    allItems = await prepareGridItems(allNestedPosts, scopeSlug);
  }

  // Build breadcrumb path
  let breadcrumbPath = [{ name: sectionName, href: `/${section}` }];
  let currentPath = `/${section}`;
  
  for (let i = 0; i < slug.length - 1; i++) {
    const segment = slug[i];
    currentPath += `/${segment}`;
    const segmentName = segment.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    breadcrumbPath.push({ name: segmentName, href: currentPath });
  }

  const finalHref = typeof post.path === 'string' && post.path 
    ? post.path 
    : `${currentPath}/${slug[slug.length - 1]}`;
  breadcrumbPath.push({ name: post.metadata.title, href: finalHref });

  return {
    indexPost: post,
    items: allItems,
    breadcrumbPath,
    section,
    isCollection
  };
} 