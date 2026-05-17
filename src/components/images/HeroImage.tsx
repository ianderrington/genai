'use client';

import Image from 'next/image';
import { useState } from 'react';

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * HeroImage component for full-width feature images in posts
 * Optimized for large, high-quality images with proper aspect ratio preservation
 */
export default function HeroImage({ src, alt, className = '' }: HeroImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error) {
    return null; // For hero images, we'll just hide them if they fail to load
  }

  return (
    <div className={`relative w-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className={`w-full h-auto object-contain ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        priority={true} // Hero images are always priority
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        quality={95}
        unoptimized={true}
      />
    </div>
  );
} 