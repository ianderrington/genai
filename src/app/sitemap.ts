import { MetadataRoute } from 'next';
import { getAllContent } from '@/lib/content';
import { loadConfig } from '@/lib/content/resolver';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = loadConfig();
  const baseUrl = config.site.url;

  // Get all content
  const allPosts = await getAllContent();

  // Filter out draft posts and create sitemap entries
  const postEntries: MetadataRoute.Sitemap = allPosts
    .filter(post => !post.metadata.draft)
    .map(post => {
      const url = `${baseUrl}/${post.slug}`;
      const lastModified = post.metadata.dateModified || post.metadata.date;

      return {
        url,
        lastModified: lastModified ? new Date(lastModified) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: post.isIndex ? 0.8 : 0.6,
      };
    });

  // Add static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ];

  return [...staticPages, ...postEntries];
}
