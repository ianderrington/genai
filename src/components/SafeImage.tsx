'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SafeImageProps {
  src?: string | null;  // Make src optional and allow null
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

// Default images for different content types
const getDefaultImage = (src?: string | null): string => {
  // If no src provided or empty string, return default post image
  if (!src) {
    return '/images/default-post.jpg';
  }
  
  // If the src already includes 'default-', we're already using a default image
  if (src.includes('/images/default-')) {
    return src;
  }
  
  // Extract section from path for better default selection
  const pathParts = src.split('/').filter(Boolean);
  if (pathParts.length > 0) {
    const section = pathParts[0];
    switch (section) {
      case 'blog':
        return '/images/default-blog.jpg';
      case 'fiction':
        return '/images/default-fiction.jpg';
      case 'musings':
        return '/images/default-musings.jpg';
      case 'projects':
        return '/images/default-projects.jpg';
      case 'about':
        return '/images/default-about.jpg';
      case 'docs':
        // For docs, check the next part of the path
        if (pathParts.length > 1) {
          switch (pathParts[1]) {
            case 'blog':
              return '/images/default-blog.jpg';
            case 'fiction':
              return '/images/default-fiction.jpg';
            case 'musings':
              return '/images/default-musings.jpg';
            case 'projects':
              return '/images/default-projects.jpg';
            case 'about':
              return '/images/default-about.jpg';
          }
        }
        break;
    }
  }
  
  // For folder/index type paths, use collection default
  if (src.endsWith('/')) {
    return '/images/default-collection.jpg';
  }
  
  // Default post image
  return '/images/default-post.jpg';
};

/**
 * A server-compatible image component that provides fallbacks
 * without requiring client-side state
 */
export default function SafeImage({ 
  src, 
  alt, 
  width = 300, 
  height = 200, 
  className = '',
  priority = false,
  fill = false,
  sizes
}: SafeImageProps) {
  const [error, setError] = useState<boolean>(false);
  const [secondaryError, setSecondaryError] = useState<boolean>(false);
  const [loaded, setLoaded] = useState(false);

  // Auto-detect if this image should have priority based on URL patterns and context
  const shouldHavePriority = priority || 
    (src && src.includes('/docs/')) ||   // Any docs content image
    (src && src.includes('/images/')) || // Any image in an images directory
    className?.includes('hero') ||       // Hero images
    className?.includes('featured') ||   // Featured images
    className?.includes('cover');        // Cover images by class
  
  // If no src provided or empty string, use default image directly
  const initialSrc = !src || src.trim() === '' ? getDefaultImage(null) : src;
  
  // Pick a placeholder color based on the image URL to make it consistent
  const getPlaceholderColor = (url?: string | null) => {
    const colors = [
      '#3b82f6', '#a855f7', '#ec4899', '#ef4444', '#f97316', 
      '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#0ea5e9'
    ];
    
    // If no URL provided, return a default color
    if (!url || url.trim() === '') {
      return colors[0];
    }
    
    // Use a hash function to get a consistent color for the same image path
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      hash = (hash + url.charCodeAt(i) * (i + 1)) % colors.length;
    }
    
    return colors[hash];
  };
  
  const placeholderColor = getPlaceholderColor(initialSrc);
  
  // If both original and default images failed, show the final placeholder
  if (secondaryError || (error && initialSrc.includes('/images/default-'))) {
    // Create a more sophisticated placeholder with letter and gradient background
    const firstLetter = alt.charAt(0).toUpperCase();
    
    return (
      <div 
        className={`image-placeholder ${className}`}
        style={{ 
          width: fill ? '100%' : width, 
          height: fill ? '100%' : height,
          background: `linear-gradient(135deg, ${placeholderColor}40 0%, ${placeholderColor}20 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'inherit',
          overflow: 'hidden',
          position: fill ? 'absolute' : 'relative'
        }}
      >
        <div style={{
          width: '70%',
          height: '70%',
          background: placeholderColor,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: fill ? '2rem' : Math.min(width, height) * 0.25,
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {firstLetter}
        </div>
      </div>
    );
  }
  
  // If there's an error with the original image, use a default image
  if (error) {
    const defaultImageSrc = getDefaultImage(initialSrc);
    
    return (
      <div className="safe-image-container" style={{ position: fill ? 'relative' : 'static', width: '100%', height: '100%' }}>
        <div className={`image-container ${className}`} style={{ position: fill ? 'relative' : 'static', width: '100%', height: '100%' }}>
          <Image
            src={defaultImageSrc}
            alt={alt}
            {...(fill ? { 
              fill: true,
              sizes: sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            } : { 
              width, 
              height,
              sizes: sizes || `${width}px`
            })}
            className="safe-image loaded"
            priority={shouldHavePriority}
            style={{
              objectFit: 'cover',
              width: fill ? '100%' : 'auto',
              height: fill ? '100%' : 'auto'
            }}
            onError={() => {
              // If the default image also fails, show the placeholder
              setSecondaryError(true);
            }}
          />
        </div>
      </div>
    );
  }
  
  // Original image
  return (
    <div className="safe-image-container" style={{ position: fill ? 'relative' : 'static', width: '100%', height: '100%' }}>
      <div className={`image-container ${className}`} style={{ position: fill ? 'relative' : 'static', width: '100%', height: '100%' }}>
        <Image
          src={initialSrc}
          alt={alt}
          {...(fill ? { 
            fill: true,
            sizes: sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          } : { 
            width, 
            height,
            sizes: sizes || `${width}px`
          })}
          className={`safe-image ${loaded ? 'loaded' : 'not-loaded'}`}
          priority={shouldHavePriority}
          style={{
            objectFit: 'cover',
            width: fill ? '100%' : 'auto',
            height: fill ? '100%' : 'auto'
          }}
          onError={() => {
            setError(true);
          }}
          onLoad={() => {
            setLoaded(true);
          }}
        />
      </div>
    </div>
  );
} 