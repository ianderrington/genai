'use client';

import React from 'react';
import { MediaProps } from '@/lib/types/media';
import { YouTubeEmbed, VimeoEmbed, HTML5Video, getVideoType } from '@/components/shared/MediaEmbeds';

const MediaVideo: React.FC<MediaProps> = ({
  url,
  caption,
  options = {},
  posterImage,
  className,
}) => {
  const renderVideo = () => {
    const videoType = getVideoType(url);

    switch (videoType) {
      case 'youtube':
        return (
          <div className="relative w-full">
            <YouTubeEmbed url={url} options={options} />
          </div>
        );
      case 'vimeo':
        return (
          <div className="relative w-full">
            <VimeoEmbed url={url} options={options} />
          </div>
        );
      case 'direct':
        return (
          <div className="relative w-full">
            <HTML5Video url={url} posterImage={posterImage} options={options} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      {renderVideo()}
      {caption && <p className="mt-2 text-sm text-gray-600">{caption}</p>}
    </div>
  );
};

export default MediaVideo; 