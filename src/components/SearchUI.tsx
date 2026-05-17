'use client';

import { BlogPostProps } from '@/lib/getBlogPosts';
import BlogCard from '@/components/BlogCard';

interface SearchUIProps {
  query: string;
  searchResults: BlogPostProps[];
}

export default function SearchUI({ query, searchResults }: SearchUIProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-white mb-8 font-display">
        Search Results for &quot;{query}&quot;
      </h1>
      {searchResults.length > 0 ? (
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">{`Found ${searchResults.length} ${searchResults.length === 1 ? 'post' : 'posts'} for "${query}"`}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {searchResults.map(post => (
              <BlogCard key={post.slug} post={post} showDate={false} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No results found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  );
} 