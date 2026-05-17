// src/components/RelatedPosts.tsx
import React from 'react';
import Link from 'next/link';
import { BlogPostProps } from '@/lib/getBlogPosts';
import { getBlogUrl } from '@/lib/urlUtils';
import SafeContent from './SafeContent';

interface RelatedPostsProps {
  posts: BlogPostProps[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link 
            href={getBlogUrl(post)} 
            key={post.slug}
            className="block bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {post.title}
            </h3>
            {post.excerpt && (
              <div className="text-gray-600 dark:text-gray-300 line-clamp-3">
                <SafeContent html={post.excerpt} />
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;

