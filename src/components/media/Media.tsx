'use client';

import React from 'react';
import { MediaResolver } from '@/lib/utils/mediaResolver';
import MediaVideo from '@/components/media/MediaVideo';
import MediaImage from '@/components/media/MediaImage';
import MediaSound from '@/components/media/MediaSound';
import { MediaProps, MediaType } from '@/lib/types/media';

const Media: React.FC<Omit<MediaProps, 'type'> & { type?: MediaType }> = ({ 
  url, 
  type,
  alt,
  caption,
  posterImage,
  className,
  options = {},
  onLoad,
  onError
}) => {
  const mediaType = (type || MediaResolver.getMediaType(url)) as MediaType;

  const commonProps: MediaProps = {
    url,
    type: mediaType,
    alt,
    caption,
    className,
    options,
    onLoad,
    onError
  };

  switch (mediaType) {
    case 'video':
      return <MediaVideo {...commonProps} posterImage={posterImage} />;
    case 'sound':
      return <MediaSound {...commonProps} />;
    case 'image':
      return <MediaImage {...commonProps} />;
    default:
      return null;
  }
};

export default Media; 