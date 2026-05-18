import path from 'path';
import { DEFAULT_IMAGES } from '@/lib/constants';
import { MediaType } from '@/lib/types/media';

interface MediaContext {
  section: string;
  slug: string;
  contentDir?: string;
  isIndex?: boolean;
}

export class MediaResolver {
  static getMediaType(url: string): string {
    if (!url) return 'unknown';

    // Video platforms
    if (
      url.includes('youtube.com') ||
      url.includes('youtu.be') ||
      url.includes('vimeo.com')
    ) {
      return 'video';
    }

    // Direct video files
    if (
      url.match(/\.(mp4|webm|ogg)$/i)
    ) {
      return 'video';
    }

    // Audio files
    if (
      url.match(/\.(mp3|wav|ogg|m4a)$/i)
    ) {
      return 'sound';
    }

    // Image files
    if (
      url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
    ) {
      return 'image';
    }

    return 'unknown';
  }

  static resolveUrl(
    mediaPath: string | undefined,
    context: MediaContext,
    defaultImage?: string
  ): string {
    if (!mediaPath) {
      return defaultImage || DEFAULT_IMAGES.post;
    }

    // Handle absolute URLs
    if (mediaPath.match(/^https?:\/\//)) {
      return mediaPath;
    }

    // Handle absolute paths
    if (mediaPath.startsWith('/')) {
      return path.join('/', mediaPath).replace(/\\/g, '/');
    }

    // Handle relative paths
    const contentDir = context.contentDir || 'docs';
    
    // Remove the section from the slug if it starts with it to avoid duplication
    const slugWithoutSection = context.slug.startsWith(context.section)
      ? context.slug.slice(context.section.length + 1) // +1 for the slash
      : context.slug;

    // Clean the media path (remove ./ prefix)
    const cleanMediaPath = mediaPath.replace(/^\.\//, '');

    // For collection index posts, use the full slug as the directory
    // For regular posts, use the parent directory of the slug
    const itemDir = context.isIndex
      ? slugWithoutSection  // Index files: use full slug as directory
      : slugWithoutSection.includes('/') 
        ? path.dirname(slugWithoutSection)  // Regular posts: use parent directory
        : '';  // Top-level posts: use section only

    // Construct the full path
    const fullPath = path.join(
      '/',
      contentDir,
      context.section,
      itemDir,
      cleanMediaPath
    );

    return fullPath.replace(/\\/g, '/');
  }

  static getYouTubeId(url: string): string | null {
    if (!url) return null;

    // Handle youtu.be URLs
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1];
      console.log('MediaResolver: Found YouTube ID from youtu.be URL:', id);
      return id;
    }

    // Handle youtube.com URLs
    const match = url.match(
      /(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
    );

    if (match) {
      console.log('MediaResolver: Found YouTube ID from youtube.com URL:', match[1]);
      return match[1];
    }

    console.log('MediaResolver: No YouTube ID found in URL:', url);
    return null;
  }

  static getSoundCloudUrl(url: string): string {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`;
  }
} 