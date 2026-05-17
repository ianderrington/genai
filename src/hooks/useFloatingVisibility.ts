import { useState, useEffect, useRef, RefObject } from 'react';
import { scrollThrottle } from '@/utils/debounce';

type VisibilityBehavior = 'fade' | 'slide';

interface UseFloatingVisibilityOptions {
  mobileTimeout?: number;
  scrollThreshold?: number;
  bottomOffset?: number;
  footerBuffer?: number;
  behavior?: VisibilityBehavior;
  footerRef?: RefObject<HTMLElement>;
  alwaysVisible?: boolean;
  onlyShowAtBottom?: boolean;
}

export function useFloatingVisibility({
  mobileTimeout = 3000,
  scrollThreshold = 100,
  bottomOffset = 10,
  footerBuffer = 50,
  behavior = 'fade',
  footerRef,
  alwaysVisible = false,
  onlyShowAtBottom = false,
}: UseFloatingVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const scrollDirectionRef = useRef<'up' | 'down'>('up');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = scrollThrottle(() => {
      if (alwaysVisible) {
        setIsVisible(true);
        return;
      }

      const currentScroll = window.scrollY;
      const scrollingDown = currentScroll > lastScrollY.current;
      const isAtTop = currentScroll < scrollThreshold;
      const isAtBottom = Math.ceil(window.innerHeight + currentScroll) >= (document.documentElement.scrollHeight - bottomOffset);
      
      let isOverlappingFooter = false;
      if (footerRef?.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const controlsHeight = 64;
        const footerTop = footerRect.top;
        const controlsBottom = viewportHeight - controlsHeight;
        isOverlappingFooter = footerTop <= (controlsBottom + footerBuffer);
      }

      if (scrollingDown !== (scrollDirectionRef.current === 'down')) {
        scrollDirectionRef.current = scrollingDown ? 'down' : 'up';
      }

      if (onlyShowAtBottom) {
        setIsVisible(isAtBottom);
      } else {
      const shouldBeVisible = 
        isAtTop || 
        isAtBottom || 
        !scrollingDown || 
        isOverlappingFooter;

      setIsVisible(shouldBeVisible);
      }
      
      lastScrollY.current = currentScroll;

      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches && mobileTimeout > 0) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        const currentVisible = 
          onlyShowAtBottom ? isAtBottom : (isAtTop || isAtBottom || !scrollingDown || isOverlappingFooter);
        
        if (currentVisible) {
          timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
          }, mobileTimeout);
        }
      }
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    handleScroll();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [mobileTimeout, scrollThreshold, bottomOffset, footerBuffer, footerRef, alwaysVisible, onlyShowAtBottom]);

  return {
    isVisible,
    setIsVisible,
    behavior,
  };
} 