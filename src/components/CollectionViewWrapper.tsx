'use client';

import React from 'react';
import { CombinedItem, FolderItem } from '@/lib/content/collectionUtils';
import type { Post } from '@/lib/content';
import { CoverImage } from '@/lib/imageUtils';
import CardGrid from './CardGrid';
import FolderListView from './FolderListView';
import FolderIconView from './FolderIconView';
import PostListView from './PostListView';
import PostIconView from './PostIconView';
import ViewTypeSelector, { ViewType } from './ViewTypeSelector';
import { useViewType } from '@/hooks/useViewType';

interface CollectionViewWrapperProps {
  items: CombinedItem[];
  section: string;
  defaultViewType?: ViewType;
  allowedViewTypes?: ViewType[];
  defaultImage: string;
  // Pre-resolved image paths for each item
  itemImagePaths: Record<string, string>;
}

const CollectionViewWrapper: React.FC<CollectionViewWrapperProps> = ({
  items,
  section,
  defaultViewType = 'cards',
  allowedViewTypes,
  defaultImage,
  itemImagePaths
}) => {
  
  // Create a getImagePath function that uses the pre-resolved paths
  const getImagePath = (imageSource: any, fallbackImage: any, section: string, fullSlug: string) => {
    return itemImagePaths[fullSlug] || defaultImage;
  };

  const { viewType, setViewType, isLoading } = useViewType({ 
    defaultView: defaultViewType,
    storageKey: `collection-view-${section}`
  });

  // Separate folders from individual posts
  const folders = items.filter((item): item is FolderItem => 'posts' in item);
  const posts = items.filter((item): item is Post => !('posts' in item));

  // Determine if we should show the view selector
  // Show if allowedViewTypes is specified AND there are items AND more than one view type is allowed
  const shouldShowViewSelector = allowedViewTypes && 
                                 allowedViewTypes.length > 1 && 
                                 (folders.length > 0 || posts.length > 0);

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 mt-8">
      </div>
    );
  }

  return (
    <div>
      {/* View Type Selector */}
      {shouldShowViewSelector && !isLoading && (
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1"></div>
          <ViewTypeSelector
            currentView={viewType}
            onViewChange={setViewType}
            className="flex-shrink-0"
          />
        </div>
      )}

      {/* Render Content Based on View Type */}
      <div className="space-y-8">
        {/* Render Folders Based on Selected View */}
        {folders.length > 0 && (
          <div>
            {!isLoading && viewType === 'list' && (
              <FolderListView
                items={folders}
                section={section}
                getImagePath={getImagePath}
                defaultImage={defaultImage}
              />
            )}
            {!isLoading && viewType === 'icons' && (
              <FolderIconView
                items={folders}
                section={section}
                getImagePath={getImagePath}
                defaultImage={defaultImage}
              />
            )}
            {(isLoading || viewType === 'cards') && (
              <div className={`flex justify-center ${folders.length === 1 ? 'max-w-[300px] mx-auto' : ''}`}>
                <CardGrid
                  items={folders}
                  section={section}
                  getImagePath={getImagePath}
                  defaultImage={defaultImage}
                />
              </div>
            )}
          </div>
        )}

        {/* Render Individual Posts (respecting view type) */}
        {posts.length > 0 && (
          <div>
            {folders.length > 0 && (
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Posts</h2>
            )}
            
            {!isLoading && viewType === 'list' && (
              <PostListView
                items={posts}
                section={section}
                getImagePath={getImagePath}
                defaultImage={defaultImage}
              />
            )}
            {!isLoading && viewType === 'icons' && (
              <PostIconView
                items={posts}
                section={section}
                getImagePath={getImagePath}
                defaultImage={defaultImage}
              />
            )}
            {(isLoading || viewType === 'cards') && (
              <div className={`flex justify-center ${posts.length === 1 ? 'max-w-[300px] mx-auto' : ''}`}>
                <CardGrid
                  items={posts}
                  section={section}
                  getImagePath={getImagePath}
                  defaultImage={defaultImage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionViewWrapper; 