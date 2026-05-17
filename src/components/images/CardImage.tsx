'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * CardImage component for post cards and thumbnails
 * Optimized for smaller, fixed-aspect images with consistent display
 */
export default function CardImage({ src, alt, className = '' }: CardImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // For cards, we want to show a placeholder if the image fails
  if (error) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={{ aspectRatio: '16/9' }}
      >
        <span className="text-gray-400 dark:text-gray-500 text-sm">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          fill={true}
          className={`object-cover ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onError={() => setError(true)}
          onLoad={() => setLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          unoptimized={true}
        />
      </div>
    </div>
  );
} 