// src/components/ScrollDepthTracker.tsx
'use client';

import React, { useEffect, useState } from 'react';

const ScrollDepthTracker: React.FC = () => {
  const [scrollPercentages, setScrollPercentages] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollPosition / totalHeight) * 100);

      const thresholds = [25, 50, 75, 100];
      thresholds.forEach(threshold => {
        if (scrollPercentage >= threshold && !scrollPercentages.includes(threshold)) {
          setScrollPercentages(prev => [...prev, threshold]);
          // You can add your own analytics tracking here
          console.log(`Reached ${threshold}% scroll depth`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPercentages]);

  return null;
};

export default ScrollDepthTracker;