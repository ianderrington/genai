export interface StoryConfig {
  autoPlay: boolean;
  defaultSpeed: number;
  initialSegments: number;
  theme: 'dark' | 'light' | 'system';
  transitionSpeed: number; // in ms
  controls: {
    position: 'top-right' | 'bottom-center';
    showOnHover: boolean;
    mobileTimeout: number; // ms before hiding on mobile
  };
  progress: {
    showSectionNumbers: boolean;
    showPercentage: boolean;
  };
}

export const DEFAULT_CONFIG: StoryConfig = {
  autoPlay: false,
  defaultSpeed: 1,
  initialSegments: 1,
  theme: 'system',
  transitionSpeed: 300,
  controls: {
    position: 'bottom-center',
    showOnHover: true,
    mobileTimeout: 3000
  },
  progress: {
    showSectionNumbers: true,
    showPercentage: true
  }
};