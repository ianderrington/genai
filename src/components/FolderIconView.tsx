'use client';

import React from 'react';
import Link from 'next/link';
import SafeImage from './SafeImage';
import { FolderItem } from '@/lib/content/collectionUtils';

interface FolderIconViewProps {
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

const FolderIconView: React.FC<FolderIconViewProps> = ({
  items,
  section,
  getImagePath,
  defaultImage
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {items.map((item, index) => {
        const folderTitle = item.indexPost?.metadata.title || 
          item.slug.charAt(0).toUpperCase() + item.slug.slice(1).replace(/-/g, ' ');
        
        const postCount = item.posts.length;
        const coverImage = item.indexPost?.metadata.coverImage;
        const fallbackImage = item.indexPost?.metadata.image || defaultImage;
        const imagePath = getImagePath(coverImage, fallbackImage, section, item.fullSlug);

        return (
          <Link
            key={item.fullSlug}
            href={`/${item.fullSlug}`}
            className="group flex flex-col items-center text-center"
          >
            {/* Icon container with stack effect */}
            <div className="relative w-24 h-24 mb-3">
              {/* Stack effect backgrounds */}
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg transform rotate-1 group-hover:rotate-2 transition-transform"></div>
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-600 rounded-lg transform -rotate-1 group-hover:-rotate-2 transition-transform"></div>
              
              {/* Main image */}
              <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                <SafeImage
                  src={imagePath}
                  alt={folderTitle}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  priority={index < 20}
                />
                
                {/* Post count overlay */}
                {postCount > 0 && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs rounded-tl-md px-1.5 py-0.5 font-medium">
                    {postCount}
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xs font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
              {folderTitle}
            </h3>
          </Link>
        );
      })}
    </div>
  );
};

export default FolderIconView; 