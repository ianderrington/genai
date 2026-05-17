import { NextResponse } from 'next/server';
import { getCachedAllContent } from '@/lib/content';

/**
 * Posts API endpoint
 * Returns lightweight post metadata for chat navigation and search
 */
export async function GET() {
  try {
    const posts = await getCachedAllContent();

    // Return only essential metadata for fuzzy search
    const metadata = posts.map(post => ({
      slug: post.slug,
      title: post.metadata.title,
      description: post.metadata.description || '',
      date: post.metadata.date,
      author: typeof post.metadata.author === 'object' ? post.metadata.author?.name : post.metadata.author,
      image: typeof post.metadata.coverImage === 'string' ? post.metadata.coverImage : post.metadata.coverImage?.url,
    }));

    return NextResponse.json(metadata, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
