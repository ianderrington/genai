import React from 'react';
import { Post } from '@/lib/content';
import { CombinedItem } from '@/lib/content/collectionUtils';
import { CoverImage } from '@/lib/imageUtils';
import { CoverMedia } from '@/lib/mediaUtils';
import { ViewType } from './ViewTypeSelector';
import Breadcrumb from './Breadcrumb';
import CollectionTTSContent from './CollectionTTSContent';
import CollectionViewWrapper from './CollectionViewWrapper';
import Media from './media/Media';
import { DEFAULT_IMAGES } from '@/lib/constants';
import { MediaResolver } from '@/lib/utils/mediaResolver';
import { MediaProps, MediaType } from '@/lib/types/media';

// Define the structure for breadcrumb items if not already globally available
interface BreadcrumbItem {
  name: string;
  href: string;
}

interface CollectionDisplayProps {
  indexPost?: Post | null; // The index post for the collection (optional intro content)
  items: CombinedItem[]; // The items (folders/posts) to display in the grid
  section: string; // Current section context (e.g., for image resolution)
  breadcrumbPath: BreadcrumbItem[]; // Path for the Breadcrumb component
  defaultImage?: string; // Default image for grid items (optional, defaults to collection default)
  defaultViewType?: ViewType; // Default view type for the collection
  allowedViewTypes?: ViewType[]; // Which view types are allowed for this collection
  getImagePath: (
    imageSource: CoverImage | string | null | undefined,
    fallbackImage: string | null | undefined,
    section: string,
    fullSlug: string
  ) => string;
}

const CollectionDisplay: React.FC<CollectionDisplayProps> = ({
  indexPost,
  items,
  section,
  breadcrumbPath,
  defaultImage = DEFAULT_IMAGES.collection, // Provide a default
  defaultViewType = 'cards',
  allowedViewTypes,
  getImagePath
}) => {
  // Check if this is an index post and if it has actual content
  const isIndex = indexPost?.isIndex || false;
  const hasIndexContent = indexPost?.html && indexPost.html.trim() !== '';

  // Handle media rendering (similar to PostComponent)
  const coverMedia = indexPost?.metadata?.coverMedia;
  const coverImage = indexPost?.metadata?.coverImage;
  
  const mediaContext = {
    section,
    slug: indexPost?.slug || '',
    isIndex: indexPost?.isIndex || false,
  };

  // Process media if it exists
  const processMediaItem = (mediaItem: CoverMedia): MediaProps | null => {
    const mediaUrl = mediaItem?.url || null;
    const resolvedMediaUrl = mediaUrl ? MediaResolver.resolveUrl(
      mediaUrl,
      mediaContext
    ) : null;

    if (!resolvedMediaUrl) return null;

    return {
      url: resolvedMediaUrl,
      alt: mediaItem.alt || indexPost?.metadata?.title || '',
      type: (mediaItem.type || MediaResolver.getMediaType(resolvedMediaUrl)) as MediaType,
      caption: mediaItem.caption,
      options: {
        priority: true,
        autoplay: false, // Don't autoplay on collection pages
        muted: true,
        loop: false,
        controls: true,
        soundcloud: mediaItem.soundOptions || {
          autoPlay: false,
          hideRelated: true,
          showComments: false,
          showUser: true,
          showReposts: false,
          visual: true
        }
      }
    };
  };

  const mediaProps = coverMedia 
    ? Array.isArray(coverMedia)
      ? coverMedia.map(processMediaItem).filter((props): props is MediaProps => Boolean(props?.url))
      : processMediaItem(coverMedia)
    : null;

  // Fallback image props if no media
  const imageUrl = coverImage 
    ? (typeof coverImage === 'object' ? coverImage.url : coverImage)
    : indexPost?.metadata?.image;

  const resolvedImageUrl = indexPost?.slug ? MediaResolver.resolveUrl(
    imageUrl,
    mediaContext,
    DEFAULT_IMAGES.collection
  ) : DEFAULT_IMAGES.collection;

  const imageProps: MediaProps = {
    url: resolvedImageUrl,
    alt: typeof coverImage === 'object' ? coverImage.alt : indexPost?.metadata?.title || '',
    type: 'image' as MediaType,
    caption: typeof coverImage === 'object' ? coverImage.caption : undefined,
    options: {
      priority: true,
      quality: 95
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-1 sm:px-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Render Breadcrumbs */}
      {!indexPost?.metadata?.hide?.includes('breadcrumbs') && (
        <div className="breadcrumb-container">
          <Breadcrumb path={breadcrumbPath} />
        </div>
      )}

      {/* Render Media Container */}
      {(mediaProps || (!mediaProps && !hasIndexContent)) && (
        <div className="mb-8 relative max-w-xl mx-auto">
          {Array.isArray(mediaProps) ? (
            <div className="space-y-4">
              {mediaProps.map((props, index) => (
                <Media key={`media-${index}`} {...props} />
              ))}
            </div>
          ) : (
            mediaProps && mediaProps.url ? (
              <Media {...mediaProps} />
            ) : (
              !hasIndexContent && <Media {...imageProps} />
            )
          )}
        </div>
      )}

      {/* Render Optional Index Post Content */}
      {hasIndexContent && (
        <CollectionTTSContent
          html={indexPost.html}
          content={indexPost.content}
          tts={indexPost.metadata.tts}
          title={indexPost.metadata.title}
          isIndex={isIndex}
          hide={indexPost.metadata.hide}
        />
      )}

      {/* Render Collection Items with View Switching */}
      {!indexPost?.metadata?.hide?.includes('children') && (
        <div className={hasIndexContent ? 'mt-8' : 'mt-0'}>
          <CollectionViewWrapper
            items={items}
            section={section}
            defaultViewType={defaultViewType}
            allowedViewTypes={allowedViewTypes}
            defaultImage={defaultImage}
            itemImagePaths={items.reduce((acc, item) => {
              try {
                const fullSlug = 'posts' in item ? item.fullSlug : item.slug;
                const coverImage = 'posts' in item ? item.indexPost?.metadata?.coverImage : item.metadata?.coverImage;
                const fallbackImage = 'posts' in item ? item.indexPost?.metadata?.image : item.metadata?.image;
                const imageSlug = 'posts' in item ? `${item.fullSlug}/index` : item.slug;
                acc[fullSlug] = getImagePath(coverImage, fallbackImage || defaultImage, section, imageSlug);
              } catch (e) {
                console.error('Error processing item image path:', e, item);
                const fullSlug = 'posts' in item ? item.fullSlug : item.slug;
                acc[fullSlug] = defaultImage;
              }
              return acc;
            }, {} as Record<string, string>)}
          />
        </div>
      )}
    </div>
  );
};

export default CollectionDisplay; 