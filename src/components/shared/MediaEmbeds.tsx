'use client';

import React, { useEffect, useState } from 'react';

interface VideoOptions {
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  style?: {
    borderRadius?: string;
    boxShadow?: string;
    [key: string]: any;
  };
}

interface YouTubeEmbedProps {
  url: string;
  options?: VideoOptions;
}

interface VimeoEmbedProps {
  url: string;
  options?: VideoOptions;
}

interface HTML5VideoProps {
  url: string;
  posterImage?: string;
  options?: VideoOptions;
}

interface SoundCloudEmbedProps {
  url: string;
  options?: {
    autoPlay?: boolean;
    hideRelated?: boolean;
    showComments?: boolean;
    showUser?: boolean;
    showReposts?: boolean;
    visual?: boolean;
  };
}

export function getVideoType(url: string): 'youtube' | 'vimeo' | 'direct' {
  if (url.match(/youtu\.?be/)) return 'youtube';
  if (url.match(/vimeo/)) return 'vimeo';
  return 'direct';
}

export function YouTubeEmbed({ url, options = {} }: YouTubeEmbedProps) {
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : '';
  };

  const videoId = getYouTubeId(url);
  const { autoplay = false, muted = true, loop = false, controls = true } = options;

  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    mute: muted ? '1' : '0',
    loop: loop ? '1' : '0',
    controls: controls ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    showinfo: '0',
    iv_load_policy: '3', // Disable annotations
    fs: '0', // Disable fullscreen
    enablejsapi: '1'
  });

  if (loop) {
    params.append('playlist', videoId);
  }

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full"
      height="480"
    />
  );
}

export function VimeoEmbed({ url, options = {} }: VimeoEmbedProps) {
  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return match ? match[1] : '';
  };

  const videoId = getVimeoId(url);
  const { autoplay = false, muted = true, loop = false, controls = true } = options;

  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    muted: muted ? '1' : '0',
    loop: loop ? '1' : '0',
    controls: controls ? '1' : '0',
    transparent: '1',
    background: loop ? '1' : '0' // Background mode removes UI when looping
  });

  return (
    <iframe
      src={`https://player.vimeo.com/video/${videoId}?${params.toString()}`}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      className="w-full"
      height="480"
    />
  );
}

export function HTML5Video({ url, posterImage, options = {} }: HTML5VideoProps) {
  const { autoplay = false, muted = true, loop = false, controls = true, playsInline = true, style = {} } = options;

  return (
    <video
      src={url}
      poster={posterImage}
      autoPlay={autoplay}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline={playsInline}
      style={style}
      className="w-full"
    >
      Video not supported
    </video>
  );
}

export function SoundCloudEmbed({ url, options = {} }: SoundCloudEmbedProps) {
  const {
    autoPlay = false,
    hideRelated = true,
    showComments = false,
    showUser = true,
    showReposts = false,
    visual = true
  } = options;

  const params = new URLSearchParams({
    url,
    auto_play: autoPlay ? 'true' : 'false',
    hide_related: hideRelated ? 'true' : 'false',
    show_comments: showComments ? 'true' : 'false',
    show_user: showUser ? 'true' : 'false',
    show_reposts: showReposts ? 'true' : 'false',
    visual: visual ? 'true' : 'false'
  });

  return (
    <iframe
      src={`https://w.soundcloud.com/player/?${params.toString()}`}
      className="w-full"
      height={visual ? '300' : '166'}
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
    />
  );
} 