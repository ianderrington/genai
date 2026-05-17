'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Post } from '@/lib/content';
import { TagInfo } from '@/lib/content/tags';
import BlogGrid from './BlogGrid';
import blogConfig from '@/lib/content/blog-config';
import { cachedFetch, createCacheKey } from '@/lib/clientCache';

interface BlogGridClientProps {
  initialPosts: Post[];
  tags: TagInfo[];
  hasMoreInitial: boolean;
}

export default function BlogGridClient({
  initialPosts,
  tags,
  hasMoreInitial
}: BlogGridClientProps) {
  // Initialize with empty arrays to prevent hydration issues
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPosts, setCurrentPosts] = useState<Post[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Set initial data after mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    setCurrentPosts(initialPosts || []);
    setHasMore(hasMoreInitial);
  }, [initialPosts, hasMoreInitial]);

  const handleTagSelected = useCallback((tag: string) => {
    if (!isMounted) return;
    
    if (tag === 'clear-all') {
      setSelectedTags([]);
      setPage(1);
      setHasMore(hasMoreInitial);
      setCurrentPosts(initialPosts || []);
      return;
    }
    
    setSelectedTags(prev => {
      const isTagSelected = prev.includes(tag);
      return isTagSelected 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag];
    });
    setPage(1);
  }, [hasMoreInitial, initialPosts, isMounted]);

  const loadMorePosts = useCallback(async () => {
    if (!isMounted || isLoading) return [];
    
    try {
      setIsLoading(true);
      const nextPage = page + 1;
      const queryParams = new URLSearchParams({
        page: nextPage.toString(),
        limit: blogConfig.postsPerPage.toString()
      });
      
      if (selectedTags.length > 0) {
        selectedTags.forEach(tag => {
          queryParams.append('tags', tag);
        });
      }
      
      // Use cached fetch with 5 minute cache
      const data = await cachedFetch<any>(
        `/api/blog/posts?${queryParams.toString()}`,
        undefined,
        5 * 60 * 1000 // 5 minutes cache
      );
      
      setPage(nextPage);
      setHasMore(data.pagination.hasMore);
      
      return data.posts || [];
    } catch (error) {
      console.error('Error loading more posts:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [page, selectedTags, isLoading, isMounted]);

  // This effect fetches filtered posts when tags change
  useEffect(() => {
    if (!isMounted) return;
    
    // Skip unnecessary fetches for empty tag selections
    if (selectedTags.length === 0) {
      setCurrentPosts(initialPosts || []);
      setHasMore(hasMoreInitial);
      setPage(1);
      return;
    }
    
    // Use a timeout to debounce the fetch
    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams({
          page: '1',
          limit: blogConfig.postsPerPage.toString(),
        });
        
        selectedTags.forEach(tag => {
          queryParams.append('tags', tag);
        });
        
        // Use cached fetch with 5 minute cache
        const data = await cachedFetch<any>(
          `/api/blog/posts?${queryParams.toString()}`,
          undefined,
          5 * 60 * 1000 // 5 minutes cache
        );
        
        setCurrentPosts(data.posts || []);
        setHasMore(data.pagination.hasMore);
        setPage(1);
      } catch (error) {
        console.error('Error fetching posts for tags:', error);
        // On error, keep showing what we had
        setCurrentPosts(initialPosts || []);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce
    
    return () => clearTimeout(timer);
  }, [selectedTags, initialPosts, hasMoreInitial, isMounted]);

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="h-3 w-3 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="h-3 w-3 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="h-3 w-3 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <BlogGrid
      initialPosts={currentPosts}
      tags={tags || []}
      onTagSelected={handleTagSelected}
      selectedTags={selectedTags}
      hasMore={hasMore}
      loadMorePosts={loadMorePosts}
    />
  );
} 