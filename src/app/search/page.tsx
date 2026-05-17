'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BlogContext } from '@/app/providers';
import Link from 'next/link';
import { Post } from '@/lib/content';
import { Suspense } from 'react';
import { getBlogUrl } from '@/lib/urlUtils';
import { Search } from 'lucide-react';

function SearchContent() {
  const { posts } = React.useContext(BlogContext);
  const params = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState(params?.get('q') || '');
  const [searchResults, setSearchResults] = React.useState<Post[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const performSearch = React.useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      console.log(`SearchPage: Searching through ${posts.length} posts for: "${query}"`);
      
      const trimmedQuery = query.toLowerCase().trim();
      
      // Simple search strategy that prioritizes finding matches over ranking them
      const results = posts.filter(post => {
        if (!post || !post.metadata) return false;
        
        const title = (post.metadata.title || '').toLowerCase();
        const description = (post.metadata.description || '').toLowerCase();
        const content = (post.content || '').toLowerCase();
        const excerpt = (post.excerpt || '').toLowerCase();
        const tags = Array.isArray(post.metadata.tags) 
          ? post.metadata.tags.map(tag => (tag || '').toLowerCase()).join(' ')
          : '';
          
        // Check for matches anywhere in post data
        return (
          title.includes(trimmedQuery) ||
          description.includes(trimmedQuery) ||
          content.includes(trimmedQuery) ||
          excerpt.includes(trimmedQuery) ||
          tags.includes(trimmedQuery)
        );
      });
      
      setSearchResults(results);
    } catch (error) {
      console.error('Error performing search:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [posts]);

  React.useEffect(() => {
    const query = params?.get('q') || '';
    setSearchQuery(query);
    if (posts.length > 0) {
      performSearch(query);
    }
  }, [params, performSearch, posts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Search</h1>
      
      <form onSubmit={handleSearch} className="mb-8 w-full max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full p-3 pl-10 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          <button 
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </form>

      {posts.length === 0 ? (
        <div className="text-center py-8">Loading posts...</div>
      ) : isLoading ? (
        <div className="text-center py-8">Searching...</div>
      ) : searchResults.length > 0 ? (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {searchResults.map((post) => (
            <article key={post.slug} className="border rounded-lg p-4 sm:p-6 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
              <Link href={getBlogUrl(post)} className="block">
                <h2 className="text-lg sm:text-xl font-semibold mb-2">{post.metadata.title}</h2>
                {post.metadata.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm sm:text-base">{post.metadata.description}</p>
                )}
                <div className="text-sm text-gray-500">
                  {post.metadata.date && (
                    <time dateTime={post.metadata.date} className="text-xs sm:text-sm">
                      {new Date(post.metadata.date).toLocaleDateString()}
                    </time>
                  )}
                  {post.metadata.tags && post.metadata.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.metadata.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : searchQuery ? (
        <div className="text-center py-8">No results found</div>
      ) : null}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
} 