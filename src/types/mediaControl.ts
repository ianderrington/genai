/**
 * Media Control Types
 * Unified type system for TTS, video, and audio controls
 */

export type MediaControlType = 'tts' | 'video' | 'sound';

/**
 * Base interface for all media controls
 */
export interface BaseMediaControl {
  type: MediaControlType;
  label: string;
}

/**
 * TTS (Text-to-Speech) media control configuration
 */
export interface TTSMediaControl extends BaseMediaControl {
  type: 'tts';
  enabled: boolean;
  provider?: 'openai' | 'mock';
  voice?: string;
  voices?: string[];
  speed?: number;
  enableSpeed?: boolean;
  enableProgress?: boolean;
  apiUrl?: string;
}

/**
 * Video media control configuration
 */
export interface VideoMediaControl extends BaseMediaControl {
  type: 'video';
  url: string;
  videoType?: 'youtube' | 'revid' | 'direct';
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
}

/**
 * Sound/Audio media control configuration
 */
export interface SoundMediaControl extends BaseMediaControl {
  type: 'sound';
  url: string;
  soundType?: 'soundcloud' | 'direct';
  soundOptions?: {
    autoPlay?: boolean;
    hideRelated?: boolean;
    showComments?: boolean;
    showUser?: boolean;
    showReposts?: boolean;
    visual?: boolean;
  };
}

/**
 * Union type of all media controls
 */
export type MediaControl = TTSMediaControl | VideoMediaControl | SoundMediaControl;

/**
 * Configuration for the media selector UI
 */
export interface MediaSelectorConfig {
  position?: 'top' | 'bottom';
  style?: 'buttons' | 'dropdown';
  align?: 'left' | 'center' | 'right';
}

/**
 * Complete media configuration for a post
 */
export interface MediaConfiguration {
  controls?: MediaControl[];
  selector?: MediaSelectorConfig;
}
