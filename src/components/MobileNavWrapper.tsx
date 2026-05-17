'use client';

import React, { useState, useEffect, useRef } from 'react';
import MobileBottomNav from './MobileBottomNav';
import { usePathname } from 'next/navigation';
import { clientLogger } from '@/lib/clientLogger';

interface MobileNavWrapperProps {
  children: React.ReactNode;
}

const MobileNavWrapper: React.FC<MobileNavWrapperProps> = ({ children }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const pathname = usePathname();
  const upObserverRef = useRef<IntersectionObserver | null>(null);
  const downObserverRef = useRef<IntersectionObserver | null>(null);
  const upSentinelRef = useRef<HTMLDivElement | null>(null);
  const downSentinelRef = useRef<HTMLDivElement | null>(null);
  
  // Only show mobile nav on blog post pages
  const isBlogPost = pathname?.includes('/blog/') && pathname?.split('/').length > 2;
  
  // Debug log
  clientLogger.debug(`MobileNavWrapper rendering: ${pathname}, isBlogPost: ${isBlogPost}`);
  
  // Use IntersectionObserver instead of scroll events
  useEffect(() => {
    if (!isBlogPost) return; // Only set up observers for blog posts
    
    // Create sentinel elements
    const upSentinel = document.createElement('div');
    upSentinel.style.position = 'fixed';
    upSentinel.style.top = '0';
    upSentinel.style.height = '5px';
    upSentinel.style.width = '100%';
    upSentinel.style.pointerEvents = 'none';
    upSentinel.style.opacity = '0';
    document.body.appendChild(upSentinel);
    upSentinelRef.current = upSentinel;
    
    const downSentinel = document.createElement('div');
    downSentinel.style.position = 'fixed';
    downSentinel.style.bottom = '50%';
    downSentinel.style.height = '5px';
    downSentinel.style.width = '100%';
    downSentinel.style.pointerEvents = 'none';
    downSentinel.style.opacity = '0';
    document.body.appendChild(downSentinel);
    downSentinelRef.current = downSentinel;
    
    // Create observers
    upObserverRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsHeaderVisible(true);
          clientLogger.debug('Header made visible by upward sentinel');
        }
      },
      { threshold: 0.1 }
    );
    
    downObserverRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsHeaderVisible(false);
          clientLogger.debug('Header hidden by downward sentinel');
        }
      },
      { threshold: 0.1 }
    );
    
    // Start observing
    if (upSentinelRef.current) {
      upObserverRef.current.observe(upSentinelRef.current);
      clientLogger.debug('Started observing up sentinel');
    }
    
    if (downSentinelRef.current) {
      downObserverRef.current.observe(downSentinelRef.current);
      clientLogger.debug('Started observing down sentinel');
    }
    
    return () => {
      // Disconnect observers
      upObserverRef.current?.disconnect();
      downObserverRef.current?.disconnect();
      
      // Remove sentinel elements
      if (upSentinelRef.current) {
        upSentinelRef.current.remove();
      }
      if (downSentinelRef.current) {
        downSentinelRef.current.remove();
      }
      
      clientLogger.debug('Cleaned up observers and sentinels');
    };
  }, [pathname, isBlogPost]); // Re-setup when pathname changes

  // Add padding to body when nav is fixed
  useEffect(() => {
    const addPadding = () => {
      if (isHeaderVisible && isBlogPost) {
        document.body.style.paddingBottom = '70px';
        clientLogger.debug('Added padding to body for mobile nav');
      } else {
        document.body.style.paddingBottom = '0';
        clientLogger.debug('Removed padding from body');
      }
    };

    addPadding();

    // Also update padding on window resize to handle orientation changes
    window.addEventListener('resize', addPadding);

    return () => {
      document.body.style.paddingBottom = '0';
      window.removeEventListener('resize', addPadding);
      clientLogger.debug('Cleaned up padding and resize listener');
    };
  }, [isHeaderVisible, isBlogPost]);

  const handleMenuClick = () => {
    // Dispatch a custom event that BlogNav can listen for
    const event = new CustomEvent('toggle-chapter-index');
    window.dispatchEvent(event);
    clientLogger.debug('Dispatched toggle-chapter-index event');
  };

  const handleShareClick = () => {
    // Dispatch a custom event to toggle the SocialShare component
    const event = new CustomEvent('toggle-social-share');
    window.dispatchEvent(event);
    clientLogger.debug('Dispatched toggle-social-share event');
  };

  return (
    <>
      {children}
      
      {isBlogPost && (
        <MobileBottomNav 
          onMenuClick={handleMenuClick}
          onShareClick={handleShareClick}
          isHeaderVisible={isHeaderVisible}
        />
      )}
    </>
  );
};

export default MobileNavWrapper; 