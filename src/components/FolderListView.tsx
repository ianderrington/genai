'use client';

import React from 'react';
import Link from 'next/link';
import SafeImage from './SafeImage';
import SocialShare from './SocialShare';
import { Post } from '@/lib/content';
import { FolderItem } from '@/lib/content/collectionUtils';
import { formatDate } from '@/lib/utils/dates';

interface FolderListViewProps {
  items: FolderItem[];
  section: string;
  getImagePath: (
    imageSource: any,
    fallbackImage: string | null | undefined,
    section: string,
    fullSlug: string
  ) => string;
  defaultImage: string;
}

const FolderListView: React.FC<FolderListViewProps> = ({
  items,
  section,
  getImagePath,
  defaultImage
}) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const folderTitle = item.indexPost?.metadata.title || 
          item.slug.charAt(0).toUpperCase() + item.slug.slice(1).replace(/-/g, ' ');
        
        const postCount = item.posts.length;
        const folderExcerpt = item.indexPost?.excerpt || item.indexPost?.metadata.description;
        const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/${item.fullSlug}`;
        
        const coverImage = item.indexPost?.metadata.coverImage;
        const fallbackImage = item.indexPost?.metadata.image || defaultImage;
        const imagePath = getImagePath(coverImage, fallbackImage, section, item.fullSlug);
        
        // Get the last modified date from the most recent post
        const lastModified = item.posts.length > 0 
          ? item.posts.reduce((latest, post) => {
              const postDate = post.metadata.date ? new Date(post.metadata.date) : new Date(0);
              return postDate > latest ? postDate : latest;
            }, new Date(0))
          : null;

        return (
          <div
            key={item.fullSlug}
            className="group flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200"
          >
            {/* Image */}
            <div className="flex-shrink-0 w-16 h-16 mr-4">
              <Link href={`/${item.fullSlug}`} className="block w-full h-full">
                <SafeImage
                  src={imagePath}
                  alt={folderTitle}
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
                  <Link href={`/${item.fullSlug}`} className="block">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {folderTitle}
                    </h3>
                  </Link>
                  
                  {folderExcerpt && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {folderExcerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400 space-x-4">
                    <span>{postCount} {postCount === 1 ? 'item' : 'items'}</span>
                    {lastModified && lastModified.getTime() > 0 && (
                      <span>Updated {formatDate(lastModified.toISOString())}</span>
                    )}
                  </div>
                </div>

                {/* Share button */}
                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <SocialShare
                    title={folderTitle}
                    description={folderExcerpt}
                    tags={item.indexPost?.metadata.tags}
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

export default FolderListView; 