'use client';

import { ThemeProvider } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Post } from '@/lib/content';
import { MobileMenuProvider } from '@/contexts/MobileMenuContext';
import { cachedFetch } from '@/lib/clientCache';
// ChatProvider disabled - no LLM budget allocated
// import { ChatProvider } from '@/architecture/ChatProvider';

interface BlogContextType {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

export const BlogContext = React.createContext<BlogContextType>({
  posts: [],
  setPosts: () => {}
});

// Posts loader component
function PostsLoader({ children }: { children: React.ReactNode }) {
  const { setPosts } = React.useContext(BlogContext);

  React.useEffect(() => {
    async function loadPosts() {
      try {
        // Use cached fetch with 10 minute cache for initial posts load
        const data = await cachedFetch<any>(
          '/api/blog/posts?limit=500',
          undefined,
          10 * 60 * 1000 // 10 minutes cache
        );
        setPosts(data.posts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    }
    loadPosts();
  }, [setPosts]); // Include setPosts dependency

  return <>{children}</>;
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Force a re-render of the theme on mount
    document.documentElement.classList.remove('light', 'dark');
  }, []);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return children;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = React.useState<Post[]>([]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({ posts, setPosts }), [posts]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      storageKey="blog-theme-preference"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ThemeWrapper>
        <MobileMenuProvider>
          <BlogContext.Provider value={contextValue}>
              <PostsLoader>
                {children}
              </PostsLoader>
          </BlogContext.Provider>
        </MobileMenuProvider>
      </ThemeWrapper>
    </ThemeProvider>
  );
} 