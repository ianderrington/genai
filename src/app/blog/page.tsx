import { Metadata } from 'next';
import { getCachedAllContent } from '@/lib/content';
import blogConfig from '@/lib/content/blog-config';
import { getAllTags } from '@/lib/content/tags';
import nextDynamic from 'next/dynamic';

// Dynamically import client components with loading state
const BlogGridClient = nextDynamic(() => import('@/components/BlogGridClient'), {
  ssr: true,
  loading: () => (
    <div className="py-10 flex justify-center items-center">
      <div className="animate-pulse flex space-x-4">
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  )
});

// Force dynamic rendering to avoid SSR issues with client components
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: blogConfig.title,
    description: blogConfig.description,
    openGraph: {
      title: blogConfig.title,
      description: blogConfig.description,
      url: '/blog',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: blogConfig.title,
      description: blogConfig.description,
    },
  };
}

export default async function BlogPage() {
  // Check if the custom blog page is enabled
  if (!blogConfig.enabled) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{blogConfig.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{blogConfig.description}</p>
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            The blog page is currently disabled. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  try {
    // Fetch initial posts and tags
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
      post.html.length > 0 &&
      post.metadata.draft !== true
    );
    
    // Sort posts by date (newest first)
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      const dateA = new Date(a.metadata.date || '').getTime();
      const dateB = new Date(b.metadata.date || '').getTime();

      // Handle invalid dates - push them to the end
      if (isNaN(dateA) && isNaN(dateB)) return 0;
      if (isNaN(dateA)) return 1;  // a goes after b
      if (isNaN(dateB)) return -1; // b goes after a

      return dateB - dateA;
    });
    
    // Get initial page of posts
    const initialPosts = sortedPosts.slice(0, blogConfig.postsPerPage);
    
    // Get tags if enabled (limit to tags that have posts and meet minimum frequency)
    const tags = blogConfig.enableTags ? getAllTags(filteredPosts, blogConfig.minTagFrequency) : [];
    
    // Calculate if there are more posts
    const hasMoreInitial = initialPosts.length < sortedPosts.length;

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{blogConfig.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{blogConfig.description}</p>
        </div>
        
        {initialPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No blog posts found. {allPosts.length > 0 ? `Found ${allPosts.length} total posts, but none match the blog criteria.` : 'No posts loaded.'}
            </p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <BlogGridClient 
              initialPosts={initialPosts}
              tags={tags}
              hasMoreInitial={hasMoreInitial}
            />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('[Blog Page] Error:', error);
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{blogConfig.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{blogConfig.description}</p>
        </div>
        <div className="mt-12 text-center bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Error Loading Blog</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            There was a problem loading the blog content. Please try refreshing the page.
          </p>
          {error instanceof Error && (
            <pre className="text-left text-sm bg-white dark:bg-gray-800 p-4 rounded mt-4 overflow-auto">
              {error.message}
            </pre>
          )}
        </div>
      </div>
    );
  }
}
