'use client';

import React from 'react';
import Link from 'next/link';
import SafeImage from './SafeImage';
import SocialShare from './SocialShare';
import { Post } from '@/lib/content';
import { formatDate } from '@/lib/utils/dates';

interface PostListViewProps {
  items: Post[];
  section: string;
  getImagePath: (
    imageSource: any,
    fallbackImage: string | null | undefined,
    section: string,
    fullSlug: string
  ) => string;
  defaultImage: string;
}

const PostListView: React.FC<PostListViewProps> = ({
  items,
  section,
  getImagePath,
  defaultImage
}) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const postTitle = item.metadata.title;
        const postExcerpt = item.excerpt || item.metadata.description;
        const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/${item.slug}`;
        
        const coverImage = item.metadata.coverImage;
        const fallbackImage = item.metadata.image || defaultImage;
        const imagePath = getImagePath(coverImage, fallbackImage, section, item.slug);
        
        const postDate = item.metadata.date ? new Date(item.metadata.date) : null;

        return (
          <div
            key={item.slug}
            className="group flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200"
          >
            {/* Image */}
            <div className="flex-shrink-0 w-16 h-16 mr-4">
              <Link href={`/${item.slug}`} className="block w-full h-full">
                <SafeImage
                  src={imagePath}
                  alt={postTitle}
                  width={64}
                  height={64}
                  className="object-cover rounded-md"
                  priority={index < 10}
                />
              </Link>
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-grow min-w-0">
                  <Link href={`/${item.slug}`} className="block">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {postTitle}
                    </h3>
                  </Link>
                  
                  {postExcerpt && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {postExcerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400 space-x-4">
                    {postDate && (
                      <span>Published {formatDate(postDate.toISOString())}</span>
                    )}
                    {item.metadata.categories && item.metadata.categories.length > 0 && (
                      <span>{item.metadata.categories.join(', ')}</span>
                    )}
                  </div>
                </div>

                {/* Share button */}
                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <SocialShare
                    title={postTitle}
                    description={postExcerpt}
                    tags={item.metadata.tags}
                    isCircular={true}
                    isCompact={true}
                    url={url}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostListView; 