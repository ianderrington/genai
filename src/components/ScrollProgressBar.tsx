// src/components/ScrollProgressBar.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';

const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const ticking = useRef(false);
  
  useEffect(() => {
    const totalHeight = () => document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    const updateProgress = () => {
      // Only update if document has scrollable area
      if (totalHeight() > 0) {
        const currentScroll = window.scrollY;
        const scrollPercentage = (currentScroll / totalHeight()) * 100;
        setScrollProgress(scrollPercentage);
      }
      ticking.current = false;
    };
    
    const handleScroll = () => {
      if (!ticking.current) {
        // Use requestAnimationFrame for better performance
        // This prevents excessive state updates during fast scrolling
        ticking.current = true;
        requestAnimationFrame(updateProgress);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="h-1 bg-blue-600 transition-all duration-300 fixed top-0 left-0 z-50"
      style={{ width: `${scrollProgress}%` }}
    ></div>
  );
};

export default ScrollProgressBar;
