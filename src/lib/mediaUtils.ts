import path from 'path';
import { DEFAULT_IMAGES } from './constants';

// Content directory is always 'docs' - hardcoded to avoid filesystem dependencies
const CONTENT_DIR = 'docs';

/**
 * Represents a media button that can be displayed in the content
 */
export interface MediaButton {
  type: 'video' | 'sound';
  label: string;
  icon?: string;
  url: string;
  options?: {
    autoplay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
    playsInline?: boolean;
    videoType?: 'youtube' | 'revid' | 'direct';
    soundType?: 'soundcloud' | 'direct';
    soundOptions?: {
      autoPlay?: boolean;
      hideRelated?: boolean;
      showComments?: boolean;
      showUser?: boolean;
      showReposts?: boolean;
      visual?: boolean;
    };
    style?: {
      borderRadius?: string;
      boxShadow?: string;
      [key: string]: any;
    };
  };
}

/**
 * Represents the structure of a media object in metadata.
 */
export interface CoverMedia {
  type: 'image' | 'video' | 'sound';
  url: string;
  alt?: string;
  caption?: string;
  hidden?: boolean; // If true, media will be included in metadata but not rendered
  // Video specific properties
  posterImage?: string;
  videoType?: 'youtube' | 'revid' | 'direct';
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  // Sound specific properties
  soundType?: 'soundcloud' | 'direct';
  soundOptions?: {
    autoPlay?: boolean;
    hideRelated?: boolean;
    showComments?: boolean;
    showUser?: boolean;
    showReposts?: boolean;
    visual?: boolean;
  };
  // Style options for custom styling
  options?: {
    autoPlay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsInline?: boolean;
    style?: {
      borderRadius?: string;
      boxShadow?: string;
      [key: string]: any;
    };
  };
  // Additional media buttons
  mediaButtons?: MediaButton[];
}

// Keep existing CoverImage for backwards compatibility
export interface CoverImage {
  url: string;
  alt?: string;
  caption?: string;
  mediaButtons?: MediaButton[];
}

/**
 * Resolves the final media path and type for use in components.
 */
export function resolveMediaPath(
  mediaSource: CoverMedia | CoverImage | string | null | undefined,
  fallbackMedia: string | null | undefined,
  section: string,
  fullSlug: string
): { 
  url: string; 
  type: 'image' | 'video' | 'sound'; 
  posterImage?: string;
  options?: {
    autoplay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
    playsInline?: boolean;
    videoType?: 'youtube' | 'revid' | 'direct';
    soundType?: 'soundcloud' | 'direct';
    soundOptions?: {
      autoPlay?: boolean;
      hideRelated?: boolean;
      showComments?: boolean;
      showUser?: boolean;
      showReposts?: boolean;
      visual?: boolean;
    };
    style?: {
      borderRadius?: string;
      boxShadow?: string;
      [key: string]: any;
    };
  };
} {
  let mediaPath: string | undefined | null = null;
  let mediaType: 'image' | 'video' | 'sound' = 'image';
  let posterImage: string | undefined;
  let options: any = undefined;

  // 1. Check if mediaSource is a CoverMedia object
  if (mediaSource && typeof mediaSource === 'object' && 'type' in mediaSource && mediaSource.url) {
    mediaPath = mediaSource.url;
    mediaType = mediaSource.type;
    
    if (mediaType === 'video') {
      posterImage = mediaSource.posterImage;
      options = {
        videoType: mediaSource.videoType || 'direct',
        autoplay: mediaSource.options?.autoPlay ?? mediaSource.autoplay,
        muted: mediaSource.options?.muted ?? mediaSource.muted,
        loop: mediaSource.options?.loop ?? mediaSource.loop,
        controls: mediaSource.options?.controls ?? mediaSource.controls ?? true,
        playsInline: mediaSource.options?.playsInline ?? mediaSource.playsInline ?? true,
        style: mediaSource.options?.style
      };
    } else if (mediaType === 'sound') {
      options = {
        soundType: mediaSource.soundType || 'direct',
        soundOptions: mediaSource.soundOptions || {
          autoPlay: false,
          hideRelated: true,
          showComments: false,
          showUser: true,
          showReposts: false,
          visual: true
        }
      };
    }
  }
  // 2. Check if mediaSource is a CoverImage object
  else if (typeof mediaSource === 'object' && mediaSource?.url) {
    mediaPath = mediaSource.url;
  }
  // 3. Check if mediaSource is a non-empty string
  else if (typeof mediaSource === 'string' && mediaSource.trim() !== '') {
    mediaPath = mediaSource;
    // Infer type from extension or URL
    if (/\.(mp4|webm|ogg)$/i.test(mediaPath) || mediaPath.includes('youtu')) {
      mediaType = 'video';
    } else if (/\.(mp3|wav|ogg)$/i.test(mediaPath) || mediaPath.includes('soundcloud')) {
      mediaType = 'sound';
    }
  }
  // 4. Check if fallbackMedia is a non-empty string
  else if (typeof fallbackMedia === 'string' && fallbackMedia.trim() !== '') {
    mediaPath = fallbackMedia;
    // Infer type from extension or URL
    if (/\.(mp4|webm|ogg)$/i.test(mediaPath) || mediaPath.includes('youtu')) {
      mediaType = 'video';
    } else if (/\.(mp3|wav|ogg)$/i.test(mediaPath) || mediaPath.includes('soundcloud')) {
      mediaType = 'sound';
    }
  }

  // 5. If we have a potential path, resolve it
  if (mediaPath) {
    let resolvedPath: string;
    
    // a. If it's an external URL, use as is
    if (mediaPath.startsWith('http://') || mediaPath.startsWith('https://')) {
      resolvedPath = mediaPath;
    }
    // b. If it's an absolute path (starts with '/'), assume it's relative to the public dir
    else if (mediaPath.startsWith('/')) {
      resolvedPath = path.join('/', mediaPath).replace(/\\/g, '/');
    }
    // c. If it's relative, assume it's relative to the content item's directory
    else {
      const itemDir = path.dirname(fullSlug);
      resolvedPath = path.join('/', CONTENT_DIR, itemDir, mediaPath).replace(/\\/g, '/');
    }

    return {
      url: resolvedPath,
      type: mediaType,
      ...(posterImage && { posterImage }),
      ...(options && { options })
    };
  }

  // 6. If no specific media path found, use default images
  const sectionDefault = DEFAULT_IMAGES.section[section as keyof typeof DEFAULT_IMAGES.section];
  const postDefault = DEFAULT_IMAGES.post;
  const collectionDefault = DEFAULT_IMAGES.collection;

  return {
    url: sectionDefault || postDefault || collectionDefault || '/default-image.png',
    type: 'image'
  };
} 