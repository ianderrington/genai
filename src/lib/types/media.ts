export type MediaType = 'image' | 'video' | 'sound';

export interface MediaOptions {
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  priority?: boolean;
  quality?: number;
  videoType?: 'youtube' | 'revid' | 'direct';
  youtube?: {
    modestBranding?: boolean;
    showRelated?: boolean;
    rel?: number;
  };
  soundType?: 'soundcloud' | 'direct';
  soundcloud?: {
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
}

export interface MediaConfig {
  url: string;
  type: MediaType;
  alt?: string;
  caption?: string;
  posterImage?: string;
  options?: MediaOptions;
}

export interface MediaProps extends MediaConfig {
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
} 