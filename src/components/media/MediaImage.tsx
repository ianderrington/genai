'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MediaProps } from '@/lib/types/media';
import { DEFAULT_IMAGES } from '@/lib/constants';

export default function MediaImage({ 
  url,
  alt,
  caption,
  className = '',
  options = {},
  onLoad,
  onError
}: MediaProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Auto-detect if this image should have priority based on URL patterns and context
  const shouldHavePriority = options.priority || 
    url.includes('/docs/') ||   // Any docs content image
    url.includes('/images/') || // Any image in an images directory
    className?.includes('hero') || // Hero images
    className?.includes('featured') || // Featured images
    className?.includes('cover'); // Cover images by class

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  // Determine fallback image based on the failed URL
  const getFallbackImage = (failedUrl: string): string => {
    // If it looks like a musings path, use musings default
    if (failedUrl.includes('musings')) {
      return DEFAULT_IMAGES.section.musings;
    }
    // If it looks like a blog path, use blog default  
    if (failedUrl.includes('blog')) {
      return DEFAULT_IMAGES.section.blog;
    }
    // If it looks like a fiction path, use fiction default
    if (failedUrl.includes('fiction')) {
      return DEFAULT_IMAGES.section.fiction;
    }
    // If it looks like a projects path, use projects default
    if (failedUrl.includes('projects')) {
      return DEFAULT_IMAGES.section.projects;
    }
    // Default fallback
    return DEFAULT_IMAGES.post;
  };

  // If there's an error, show fallback image instead of returning null
  if (error) {
    const fallbackUrl = getFallbackImage(url);
    return (
      <div className={`relative ${className}`}>
        <Image
          src={fallbackUrl}
          alt={alt || ''}
          width={1200}
          height={800}
          className={`w-full h-auto object-contain opacity-100 transition-opacity duration-300`}
          priority={shouldHavePriority}
          quality={options.quality || 95}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={url}
        alt={alt || ''}
        width={1200}
        height={800}
        className={`w-full h-auto object-contain ${
          loaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        priority={shouldHavePriority}
        quality={options.quality || 95}
        onError={handleError}
        onLoad={handleLoad}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      {/* {caption && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
          {caption}
        </div>
      )} */}
    </div>
  );
} 