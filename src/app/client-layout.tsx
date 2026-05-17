'use client'

import React, { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Providers } from './providers'
import MobileNavWrapper from '@/components/MobileNavWrapper'
import '@fontsource/inter'
import { initCardEffects } from './card-effects'

// Wrapper component that uses the hooks inside Suspense
function ClientLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize card effects when the component mounts
  useEffect(() => {
    // Wrap in try-catch to prevent WebGL errors on iOS
    try {
      // Skip card effects on mobile devices to avoid WebGL issues
      if (typeof window !== 'undefined' && window.innerWidth > 768) {
        initCardEffects();
      }
    } catch (error) {
      console.warn('Card effects failed to initialize (non-critical):', error);
    }
  }, []);
  
  // Track route changes, including pathname or search params changes
  useEffect(() => {
    // Set smooth scrolling behavior on route changes
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [pathname, searchParams]); // Re-run when route changes
  
  // Add effect to fix mobile viewport issues
  useEffect(() => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
      document.head.appendChild(meta);
    } else {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
    }

    // Fix for iOS height issues
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);
  
  return (
    <Providers>
      <MobileNavWrapper>
        <div className="w-full max-w-full overflow-x-hidden">
          {children}
        </div>
      </MobileNavWrapper>
    </Providers>
  );
}

// Implements a proper scroll management solution
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientLayoutContent>
        {children}
      </ClientLayoutContent>
    </Suspense>
  );
} 