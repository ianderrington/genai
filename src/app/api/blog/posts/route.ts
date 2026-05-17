import { NextRequest, NextResponse } from 'next/server';
import { getCachedAllContent } from '@/lib/content';
import blogConfig from '@/lib/content/blog-config';

// Force dynamic to avoid static generation errors
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get URL parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || blogConfig.postsPerPage.toString());
    const tags = url.searchParams.getAll('tags');
    const searchQuery = url.searchParams.get('search') || '';
    
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
    
    // Filter out empty posts, index posts, and drafts
    filteredPosts = filteredPosts.filter(post => {
      if (post.isIndex) return false;
      if (!post.html || post.html.length === 0) return false;
      if (post.metadata.draft === true) return false;
      return true;
    });

    // Filter by tags if provided
    if (tags && tags.length > 0) {
      filteredPosts = filteredPosts.filter(post => {
        const postTags = post.metadata.tags || [];
        return tags.some(tag => postTags.includes(tag));
      });
    }

    // Search functionality
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      
      console.log(`API: Searching through ${filteredPosts.length} posts for: "${query}"`);
      
      // Simple search strategy that prioritizes finding matches over ranking them
      filteredPosts = filteredPosts.filter(post => {
        if (!post || !post.metadata) return false;
        
        const title = (post.metadata.title || '').toLowerCase();
        const description = (post.metadata.description || '').toLowerCase();
        const content = (post.content || '').toLowerCase();
        const excerpt = (post.excerpt || '').toLowerCase();
        const tags = Array.isArray(post.metadata.tags) 
          ? post.metadata.tags.map((tag: string) => (tag || '').toLowerCase()).join(' ')
          : '';
          
        // Check for matches anywhere in post data
        return (
          title.includes(query) ||
          description.includes(query) ||
          content.includes(query) ||
          excerpt.includes(query) ||
          tags.includes(query)
        );
      });
    } else {
      // If not searching, just sort posts by date (newest first)
      filteredPosts = filteredPosts.sort((a, b) => {
        const dateA = new Date(a.metadata.date || '').getTime();
        const dateB = new Date(b.metadata.date || '').getTime();

        // Handle invalid dates - push them to the end
        if (isNaN(dateA) && isNaN(dateB)) return 0;
        if (isNaN(dateA)) return 1;  // a goes after b
        if (isNaN(dateB)) return -1; // b goes after a

        return dateB - dateA;
      });
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    const totalPosts = filteredPosts.length;
    const hasMore = endIndex < totalPosts;
    
    return NextResponse.json({
      posts: paginatedPosts,
      pagination: {
        page,
        limit,
        totalPosts,
        hasMore
      }
    }, {
      headers: {
        // Increase cache times: 5 minutes main cache, 30 minutes stale-while-revalidate
        'Cache-Control': process.env.NODE_ENV === 'production' 
          ? 'public, s-maxage=300, stale-while-revalidate=1800' 
          : 'public, s-maxage=300, stale-while-revalidate=600', // 5 min cache, 10 min stale in dev
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
} 