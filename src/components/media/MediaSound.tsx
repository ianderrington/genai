'use client';

import React from 'react';
import { MediaProps } from '@/lib/types/media';
import { SoundCloudEmbed } from '@/components/shared/MediaEmbeds';

const MediaSound: React.FC<MediaProps> = ({
  url,
  caption,
  options = {},
  className,
}) => {
  const renderSound = () => {
    if (url.includes('soundcloud.com')) {
      return (
        <SoundCloudEmbed
          url={url}
          options={{
            autoPlay: options.autoplay,
            hideRelated: options.soundcloud?.hideRelated ?? true,
            showComments: options.soundcloud?.showComments ?? false,
            showUser: options.soundcloud?.showUser ?? true,
            showReposts: options.soundcloud?.showReposts ?? false,
            visual: options.soundcloud?.visual ?? true
          }}
        />
      );
    }

    // For direct audio files (mp3, wav, etc.)
    return (
      <audio
        src={url}
        controls={options.controls ?? true}
        autoPlay={options.autoplay}
        className="w-full"
        preload="metadata"
      >
        Your browser does not support the audio element.
      </audio>
    );
  };

  return (
    <div className={className}>
      {renderSound()}
      {caption && <p className="mt-2 text-sm text-gray-600">{caption}</p>}
    </div>
  );
};

export default MediaSound; 