'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFloatingVisibility } from '@/hooks/useFloatingVisibility';
import Header from './Header';
import Footer from './Footer';
import { SiteConfig } from '@/lib/server/config';
// AIChat disabled - no LLM budget allocated
// import { AIChat } from './chat/AIChat';

interface PageLayoutProps {
  children: React.ReactNode;
  sections: Array<{
    id: string;
    title: string;
  }>;
  config: SiteConfig;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, sections, config }) => {
  const footerRef = useRef<HTMLElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const { isVisible, behavior } = useFloatingVisibility({
    scrollThreshold: 100,
    mobileTimeout: 0,
    behavior: 'slide',
    footerRef
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const headerClass = hasMounted && !isVisible ? 'slide-up' : '';

  // Force removing any default margins on html/body
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.margin = '0';
      document.documentElement.style.padding = '0';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full overflow-x-hidden m-0 p-0">
      <div className={`header-wrapper fixed top-0 left-0 right-0 z-40 w-full ${headerClass} m-0 p-0`}>
        <Header sections={sections} />
      </div>
      <main className="flex-grow w-full flex flex-col p-0 m-0">
        {children}
      </main>
      <Footer ref={footerRef} config={config} />
      {/* <AIChat /> - disabled, no LLM budget */}
    </div>
  );
};

export default PageLayout; 