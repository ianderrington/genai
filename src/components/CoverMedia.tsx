'use client';

import React from 'react';
import Image from 'next/image';
import { YouTubeEmbed, SoundCloudEmbed } from './shared/MediaEmbeds';
import MediaButton from './MediaButton';

interface MediaItem {
  url: string;
  remote_url?: string;
  type: 'image' | 'video' | 'sound';
  alt?: string;
  caption?: string;
  hidden?: boolean;
  posterImage?: string;
  videoType?: 'youtube' | 'revid' | 'direct';
  options?: {
    autoplay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
    playsInline?: boolean;
    soundType?: 'soundcloud' | 'direct';
    soundOptions?: {
      autoPlay?: boolean;
      hideRelated?: boolean;
      showComments?: boolean;
      showUser?: boolean;
      showReposts?: boolean;
      visual?: boolean;
    };
    style?: {
      borderRadius?: string;
      boxShadow?: string;
      [key: string]: any;
    };
  };
}

interface CoverMediaProps {
  media: MediaItem | MediaItem[];
  className?: string;
  priority?: boolean;
}

export default function CoverMedia({ media, className = '', priority = false }: CoverMediaProps) {
  const getMediaUrl = (item: MediaItem) => {
    // Use remote_url if available and we're in production, otherwise fallback to local url
    return process.env.NODE_ENV === 'production' && item.remote_url ? item.remote_url : item.url;
  };

  const renderSingleMedia = (item: MediaItem) => {
    const mediaUrl = getMediaUrl(item);

    switch (item.type) {
      case 'video':
        if (mediaUrl.includes('youtu') || item.videoType === 'youtube') {
          return (
            <div className="relative aspect-video">
              <YouTubeEmbed
                url={mediaUrl}
                options={item.options}
              />
            </div>
          );
        }
        
        // Handle style options for direct video rendering
        const videoStyle = item.options?.style ? {
          borderRadius: item.options.style.borderRadius,
          boxShadow: item.options.style.boxShadow,
          ...item.options.style
        } : {};
        
        return (
          <video
            src={mediaUrl}
            poster={item.posterImage}
            controls={item.options?.controls ?? true}
            autoPlay={item.options?.autoplay}
            muted={item.options?.muted}
            loop={item.options?.loop}
            playsInline={item.options?.playsInline ?? true}
            style={videoStyle}
            className={`w-full ${className}`}
          >
            Video not supported
          </video>
        );

      case 'sound':
        if (mediaUrl.includes('soundcloud') || item.options?.soundType === 'soundcloud') {
          return (
            <div className="w-full">
              <SoundCloudEmbed
                url={mediaUrl}
                options={item.options?.soundOptions}
              />
            </div>
          );
        }
        return (
          <audio
            src={mediaUrl}
            controls={true}
            className={`w-full ${className}`}
            autoPlay={item.options?.autoplay}
          >
            Your browser does not support the audio element.
          </audio>
        );

      case 'image':
      default:
        return (
          <div className={`relative ${className}`}>
            <Image
              src={mediaUrl}
              alt={item.alt || ''}
              fill
              className="object-cover"
              priority={priority || true} // Cover images should have priority
            />
          </div>
        );
    }
  };

  const renderMedia = () => {
    if (Array.isArray(media)) {
      // Filter out hidden media items
      const visibleMedia = media.filter(item => !item.hidden);
      
      if (visibleMedia.length === 0) {
        return null;
      }
      
      return (
        <div className="space-y-4">
          {visibleMedia.map((item, index) => (
            <div key={`${getMediaUrl(item)}-${index}`} className="relative">
              {renderSingleMedia(item)}
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                  {item.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    // For single media item, check if it's hidden
    if (media.hidden) {
      return null;
    }

    return (
      <div className="relative">
        {renderSingleMedia(media)}
        {media.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
            {media.caption}
          </div>
        )}
      </div>
    );
  };

  return renderMedia();
} 