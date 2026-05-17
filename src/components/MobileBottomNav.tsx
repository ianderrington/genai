'use client';

import React, { useState, useEffect } from 'react';
import { Menu, Share } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { clientLogger } from '@/lib/clientLogger';

interface MobileBottomNavProps {
  onMenuClick: () => void;
  onShareClick: () => void;
  isHeaderVisible: boolean;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  onMenuClick, 
  onShareClick,
  isHeaderVisible: propIsHeaderVisible 
}) => {
  const [isFixed, setIsFixed] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(propIsHeaderVisible);
  const pathname = usePathname();
  const { theme } = useTheme();
  
  // Debug log
  clientLogger.debug(`MobileBottomNav rendering: ${pathname}, isHeaderVisible: ${isHeaderVisible}, isFixed: ${isFixed}, theme: ${theme}`);

  // Determine if we're on a blog post page
  const isBlogPost = pathname?.includes('/blog/') && pathname?.split('/').length > 2;

  // Listen for header visibility changes
  useEffect(() => {
    const handleHeaderVisibilityChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsHeaderVisible(customEvent.detail.isHeaderVisible);
    };
    
    window.addEventListener('header-visibility-change', handleHeaderVisibilityChange);
    clientLogger.debug('Added header-visibility-change event listener');
    
    return () => {
      window.removeEventListener('header-visibility-change', handleHeaderVisibilityChange);
      clientLogger.debug('Removed header-visibility-change event listener');
    };
  }, []);

  // Update from props as well
  useEffect(() => {
    setIsHeaderVisible(propIsHeaderVisible);
    clientLogger.debug(`Updated isHeaderVisible from props: ${propIsHeaderVisible}`);
  }, [propIsHeaderVisible]);

  // Handle scroll behavior
  useEffect(() => {
    if (isBlogPost) {
      setIsFixed(!isHeaderVisible);
    } else {
      setIsFixed(true);
    }
    clientLogger.debug(`Updated isFixed: isBlogPost=${isBlogPost}, isHeaderVisible=${isHeaderVisible}, isFixed=${!isHeaderVisible}`);
  }, [isHeaderVisible, isBlogPost]);

  // Add padding to body when nav is fixed
  useEffect(() => {
    const addPadding = () => {
      if (isFixed) {
        document.body.style.paddingBottom = '65px';
        clientLogger.debug('Added padding to body');
      } else {
        document.body.style.paddingBottom = '0';
        clientLogger.debug('Removed padding from body');
      }
    };

    addPadding();

    // Also add padding on window resize to handle orientation changes
    window.addEventListener('resize', addPadding);

    return () => {
      document.body.style.paddingBottom = '0';
      window.removeEventListener('resize', addPadding);
      clientLogger.debug('Removed padding from body and resize listener');
    };
  }, [isFixed]);

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-[9999] flex justify-between items-center transition-all duration-300 ease-in-out ${isHeaderVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex justify-between items-center w-full px-6 py-4 bg-white/95 dark:bg-gray-800/95 border-t border-gray-200 dark:border-gray-700 backdrop-blur-sm">
      {/* Menu button - left side */}
      <button 
        onClick={onMenuClick}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-sm transition-all duration-300"
        aria-label="Toggle chapter index"
      >
        <Menu size={22} />
      </button>
      
      {/* Share button - right side */}
      <button 
        onClick={onShareClick}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-sm transition-all duration-300"
        aria-label="Share this post"
      >
        <Share size={22} />
      </button>
      </div>
    </div>
  );
};

export default MobileBottomNav; 