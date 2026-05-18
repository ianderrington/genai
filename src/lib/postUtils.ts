export function processPostContent(content: string) {
  return {
    excerpt: '',  // We handle this in getBlogPosts.ts now
    fullContent: content
  };
} 