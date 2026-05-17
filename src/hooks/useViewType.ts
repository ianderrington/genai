'use client';

import { useState, useEffect } from 'react';
import { ViewType } from '@/components/ViewTypeSelector';

interface UseViewTypeOptions {
  defaultView?: ViewType;
  storageKey?: string;
}

export function useViewType(options: UseViewTypeOptions = {}) {
  const { 
    defaultView = 'cards', 
    storageKey = 'collection-view-type' 
  } = options;

  const [viewType, setViewType] = useState<ViewType>(defaultView);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      setViewType(defaultView);
      setIsLoading(false);
      return;
    }

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && ['cards', 'list', 'icons'].includes(stored)) {
        setViewType(stored as ViewType);
      } else {
        // If no stored preference, use the provided default
        setViewType(defaultView);
      }
    } catch (error) {
      console.warn('Failed to load view type from localStorage:', error);
      setViewType(defaultView);
    } finally {
      setIsLoading(false);
    }
  }, [storageKey, defaultView]);

  // Save to localStorage when viewType changes
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(storageKey, viewType);
      } catch (error) {
        console.warn('Failed to save view type to localStorage:', error);
      }
    }
  }, [viewType, storageKey, isLoading]);

  const changeViewType = (newViewType: ViewType) => {
    setViewType(newViewType);
  };

  return {
    viewType,
    setViewType: changeViewType,
    isLoading
  };
} 