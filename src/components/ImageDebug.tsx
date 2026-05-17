'use client';

import React from 'react';
import Image from 'next/image';

interface ImageDebugProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * A component that attempts to render an image with fallbacks and debugging information
 */
export default function ImageDebug({ src, alt, width = 300, height = 200, className = '' }: ImageDebugProps) {
  const [error, setError] = React.useState<string | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  // Try different path variations
  const paths = [
    src,
    src.startsWith('/') ? src : `/${src}`,
    src.startsWith('./') ? src.substring(2) : src,
  ];

  return (
    <div className="image-debug-container">
      <div className={`image-container ${className}`}>
        {!loaded && !error && (
          <div className="loading-placeholder" style={{ width, height, background: '#f0f0f0' }}>
            Loading...
          </div>
        )}
        
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`debug-image ${loaded ? 'loaded' : 'not-loaded'}`}
          onError={(e) => {
            console.error(`Failed to load image: ${src}`, e);
            setError(`Failed to load image: ${src}`);
          }}
          onLoad={() => {
            console.log(`Successfully loaded image: ${src}`);
            setLoaded(true);
          }}
        />
      </div>
      
      {error && (
        <div className="image-debug-info">
          <p className="error-message">{error}</p>
          <details>
            <summary>Debug Info</summary>
            <div className="debug-paths">
              <p>Attempted paths:</p>
              <ul>
                {paths.map((path, index) => (
                  <li key={index}>{path}</li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      )}
    </div>
  );
} 