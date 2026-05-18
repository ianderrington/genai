'use client';

import React from 'react';
import Link from 'next/link';
import SafeImage from './SafeImage';
import { Post } from '@/lib/content';
import { formatDate } from '@/lib/utils/dates';

interface PostIconViewProps {
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

const PostIconView: React.FC<PostIconViewProps> = ({
  items,
  section,
  getImagePath,
  defaultImage
}) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4 justify-items-center">
      {items.map((item, index) => {
        const postTitle = item.metadata.title;
        const coverImage = item.metadata.coverImage;
        const fallbackImage = item.metadata.image || defaultImage;
        const imagePath = getImagePath(coverImage, fallbackImage, section, item.slug);
        const postDate = item.metadata.date ? new Date(item.metadata.date) : null;

        return (
          <Link
            key={item.slug}
            href={`/${item.slug}`}
            className="group flex flex-col items-center text-center"
            title={postTitle}
          >
            {/* Small icon container */}
            <div className="relative w-12 h-12 mb-1">
              <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                <SafeImage
                  src={imagePath}
                  alt={postTitle}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                  priority={index < 20}
                />
                
                                 {/* No date overlay in icon view for cleaner look */}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-[10px] font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
              {postTitle}
            </h3>
          </Link>
        );
      })}
    </div>
  );
};

export default PostIconView; 