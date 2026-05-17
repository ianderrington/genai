// chatStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatState {
  // Playback state
  isPlaying: boolean;
  wasPlaying: boolean;
  playbackSpeed: number;
  currentPosition: number;
  segments: string[];
  stopIndex: number | null;
  
  // Reading position
  lastScrollPosition: number;
  
  // Actions
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  setPosition: (position: number) => void;
  moveForward: () => void;
  moveBackward: () => void;
  reset: () => void;
  setSegments: (segments: string[]) => void;
  setStopIndex: (index: number | null) => void;
  saveScrollPosition: (position: number) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      // Initial state
      isPlaying: false,
      wasPlaying: false,
      playbackSpeed: 1,
      currentPosition: 0,
      segments: [],
      stopIndex: null,
      lastScrollPosition: 0,
      
      // Actions
      play: () => set({ isPlaying: true }),
      
      pause: () => set({ isPlaying: false, wasPlaying: get().isPlaying }),
      
      togglePlay: () => set(state => ({ isPlaying: !state.isPlaying })),
      
      setSpeed: (speed: number) => set({ playbackSpeed: speed }),
      
      setPosition: (position: number) => {
        const state = get();
        // Don't allow setting position beyond bounds
        if (position < 0 || position >= state.segments.length) {
          return;
        }
        
        // If trying to advance past the stop index while playing, pause
        if (state.isPlaying && state.stopIndex !== null && position > state.stopIndex) {
          set({ 
            currentPosition: position,
            isPlaying: false,
            wasPlaying: true
          });
        } else {
          set({ currentPosition: position });
        }
      },
      
      moveForward: () => {
        const state = get();
        const newPosition = state.currentPosition + 1;
        
        if (newPosition >= state.segments.length) {
          return;
        }
        
        // If trying to advance past the stop index while playing, pause
        if (state.isPlaying && state.stopIndex !== null && newPosition > state.stopIndex) {
          set({ 
            currentPosition: newPosition,
            isPlaying: false,
            wasPlaying: true
          });
        } else {
          set({ currentPosition: newPosition });
        }
      },
      
      moveBackward: () => set(state => {
        const newPosition = state.currentPosition - 1;
        if (newPosition < 0) {
          return state;
        }
        return { currentPosition: newPosition };
      }),
      
      reset: () => set({ currentPosition: 0 }),
      
      setSegments: (segments: string[]) => {
        set({ segments });
        
        // Look for stop marker
        const stopIndex = segments.findIndex(segment => 
          segment.includes('---story:stop---')
        );
        
        if (stopIndex >= 0) {
          set({ stopIndex });
        }
      },
      
      setStopIndex: (index: number | null) => set({ stopIndex: index }),
      
      saveScrollPosition: (position: number) => set({ lastScrollPosition: position }),
    }),
    {
      name: 'chat-store',
      // Only persist these fields
      partialize: (state) => ({
        currentPosition: state.currentPosition,
        playbackSpeed: state.playbackSpeed,
        lastScrollPosition: state.lastScrollPosition,
      }),
    }
  )
);