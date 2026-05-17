interface YouTubeEvent {
  data: number;
  target: any;
}

interface YouTubePlayer {
  destroy: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getVolume: () => number;
}

interface YT {
  Player: {
    new (
      element: HTMLElement | string,
      config: {
        videoId: string;
        playerVars?: {
          autoplay?: number;
          mute?: number;
          controls?: number;
          modestbranding?: number;
          rel?: number;
          playsinline?: number;
          enablejsapi?: number;
        };
        events?: {
          onReady?: () => void;
          onError?: (event: YouTubeEvent) => void;
          onStateChange?: (event: YouTubeEvent) => void;
          onPlaybackQualityChange?: (event: YouTubeEvent) => void;
          onPlaybackRateChange?: (event: YouTubeEvent) => void;
        };
      }
    ): YouTubePlayer;
  };
  PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

declare global {
  interface Window {
    YT?: YT;
    onYouTubeIframeAPIReady?: () => void;
  }
} 