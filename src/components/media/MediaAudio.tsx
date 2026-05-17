'use client';

import { useState } from 'react';
import { MediaProps } from '@/lib/types/media';
import { MediaResolver } from '@/lib/utils/mediaResolver';

export default function MediaAudio({
  url,
  caption,
  className = '',
  options = {},
  onLoad,
  onError
}: MediaProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return null;
  }

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  // Handle SoundCloud embeds
  if (url.includes('soundcloud.com')) {
    const embedUrl = MediaResolver.getSoundCloudUrl(url);
    const {
      hideRelated = true,
      showComments = false,
      showUser = true,
      showReposts = false,
      visual = true
    } = options.soundcloud || {};

    return (
      <div className={`relative ${className}`}>
        <iframe
          src={`${embedUrl}&auto_play=${options.autoplay ? 'true' : 'false'}&hide_related=${hideRelated}&show_comments=${showComments}&show_user=${showUser}&show_reposts=${showReposts}&visual=${visual}`}
          width="100%"
          height={visual ? '300' : '166'}
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          className={`w-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
        />
        {caption && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
            {caption}
          </div>
        )}
      </div>
    );
  }

  // Handle direct audio files
  return (
    <div className={`relative ${className}`}>
      <audio
        src={url}
        controls={options.controls ?? true}
        autoPlay={options.autoplay}
        className={`w-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoadedData={handleLoad}
        onError={handleError}
      >
        Your browser does not support the audio element.
      </audio>
      {caption && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
          {caption}
        </div>
      )}
    </div>
  );
} 