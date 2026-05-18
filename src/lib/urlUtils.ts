export const useHierarchicalUrls = true; // You can toggle this or make it configurable

export function getBlogUrl(post: { slug: string; sectionId?: string }) {
  // If the post has a sectionId and it's not already part of the slug, use it
  if (post.sectionId && !post.slug.startsWith(post.sectionId)) {
    // Handle the case where the slug might already include the section
    const slugParts = post.slug.split('/');
    if (slugParts[0] !== post.sectionId) {
      return `/${post.sectionId}/${post.slug}`;
    }
  }
  
  // The slug already contains the section, so we just need to add the leading slash
  return `/${post.slug}`;
} 