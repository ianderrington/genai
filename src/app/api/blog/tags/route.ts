import { NextResponse } from 'next/server';
import { getCachedAllContent } from '@/lib/content';
import { getAllTags } from '@/lib/content/tags';
import blogConfig from '@/lib/content/blog-config';

export async function GET() {
  try {
    if (!blogConfig.enableTags) {
      return NextResponse.json([]);
    }
    
    // Get all posts
    const allPosts = await getCachedAllContent();
    
    // Filter posts by section inclusion/exclusion if configured
    let filteredPosts = allPosts;
    
    if (blogConfig.includeSections.length > 0) {
      filteredPosts = filteredPosts.filter(post => {
        const section = post.slug.split('/')[0];
        return blogConfig.includeSections.includes(section);
      });
    }
    
    if (blogConfig.excludeSections.length > 0) {
      filteredPosts = filteredPosts.filter(post => {
        const section = post.slug.split('/')[0];
        return !blogConfig.excludeSections.includes(section);
      });
    }
    
    // Filter out index posts and empty posts
    filteredPosts = filteredPosts.filter(post => 
      !post.isIndex && 
      post.html && 
      post.html.length > 0
    );
    
    // Get all tags from the filtered posts with minimum frequency filter
    const tags = getAllTags(filteredPosts, blogConfig.minTagFrequency);
    
    return NextResponse.json(tags, {
      headers: {
        // Add cache control headers for consistency
        'Cache-Control': process.env.NODE_ENV === 'production' 
          ? 'public, s-maxage=600, stale-while-revalidate=3600' // 10 min cache, 1 hour stale in prod
          : 'public, s-maxage=300, stale-while-revalidate=600', // 5 min cache, 10 min stale in dev
      }
    });
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog tags' },
      { status: 500 }
    );
  }
} 