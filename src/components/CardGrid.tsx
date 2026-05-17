import React from 'react';
import { Post } from '@/lib/content';
import PostCard from './PostCard';
import FolderCard from './FolderCard';
import { CoverImage } from '@/lib/imageUtils';
import { FolderItem, CombinedItem } from '@/lib/content/collectionUtils';

interface CardGridProps {
  items: CombinedItem[];
  section: string;
  getImagePath: (
    imageSource: CoverImage | string | null | undefined,
    fallbackImage: string | null | undefined,
    section: string,
    fullSlug: string
  ) => string;
  defaultImage: string;
}

export default function CardGrid({ items, section, getImagePath, defaultImage }: CardGridProps) {
  const gridCols = items.length === 1 ? 'grid-cols-1' :
    items.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
    items.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <div className={`
      grid ${gridCols} gap-6 
      justify-center justify-items-center content-start
      auto-rows-auto
      ${items.length === 1 ? 'max-w-[300px] mx-auto' : ''}
    `}>
      {items.map((item, index) => {
        // Apply priority to first 4 items (likely above the fold)
        const itemPriority = index < 4;
        
        if ('posts' in item) {
          const indexPost = item.indexPost;
          const coverImage = indexPost?.metadata?.coverImage ?? undefined;
          const fallbackImage = indexPost?.metadata?.image ?? defaultImage;
          const imagePath = getImagePath(coverImage, fallbackImage, section, item.fullSlug + '/index');
          
          return (
            <div key={item.fullSlug} className="w-full max-w-[300px]">
              <FolderCard 
                item={item}
                section={section}
                defaultImage={imagePath}
                priority={itemPriority}
              />
            </div>
          );
        } else {
          const coverImage = item.metadata?.coverImage ?? undefined;
          const fallbackImage = item.metadata?.image ?? defaultImage;
          const imagePath = getImagePath(coverImage, fallbackImage, section, item.slug);
          
          return (
            <div key={item.slug} className="w-full max-w-[300px]">
              <PostCard 
                post={item} 
                section={section}
                showDate={false}
                imagePath={imagePath}
                priority={itemPriority}
              />
            </div>
          );
        }
      })}
    </div>
  );
} 