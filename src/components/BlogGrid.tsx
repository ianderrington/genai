'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Post } from '@/lib/content';
import PostCard from '@/components/PostCard';
import { TagInfo } from '@/lib/content/tags';
import blogConfig from '@/lib/content/blog-config';
import { DEFAULT_IMAGES } from '@/lib/constants';

interface CoverImage {
  url: string;
  alt?: string;
  caption?: string;
}

interface BlogGridProps {
  initialPosts: Post[];
  tags?: TagInfo[];
  onTagSelected?: (tag: string) => void;
  selectedTags?: string[];
  hasMore?: boolean;
  loadMorePosts?: () => Promise<Post[]>;
}

export default function BlogGrid({
  initialPosts,
  tags,
  onTagSelected,
  selectedTags = [],
  hasMore = false,
  loadMorePosts
}: BlogGridProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState<'date' | 'title'>(blogConfig.defaultSort);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(blogConfig.defaultSortDirection);
  const observerTarget = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [noMorePosts, setNoMorePosts] = useState(!hasMore);
  const [showAllTags, setShowAllTags] = useState(false);
  const [tagsExpanded, setTagsExpanded] = useState(false);

  // The number of tags to show when collapsed
  const VISIBLE_TAGS_COUNT = 10;

  // Sort posts based on current sort field and direction
  const sortedPosts = React.useMemo(() => {
    if (!Array.isArray(posts)) return [];
    
    // Create a map to deduplicate posts by slug
    const postMap = new Map<string, Post>();
    posts.forEach(post => {
      if (!post?.slug || !post?.metadata) return; // Skip invalid posts
      
      // Skip index posts that should be displayed as collections
      if (post.isIndex || (post.childPosts && post.childPosts.length > 0)) {
        return;
      }
      // Only keep the first occurrence of each slug
      if (!postMap.has(post.slug)) {
        postMap.set(post.slug, post);
      }
    });
    
    // Convert back to array and sort
    return Array.from(postMap.values()).sort((a, b) => {
      if (!a?.metadata || !b?.metadata) return 0;
      
      if (sortField === 'date') {
        const dateA = new Date(a.metadata.date || '').getTime();
        const dateB = new Date(b.metadata.date || '').getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        const titleA = (a.metadata.title || '').toLowerCase();
        const titleB = (b.metadata.title || '').toLowerCase();
        return sortDirection === 'asc'
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      }
    });
  }, [posts, sortField, sortDirection]);

  // Filter posts by search term
  const filteredPosts = React.useMemo(() => {
    if (!searchTerm || !Array.isArray(sortedPosts)) {
      return sortedPosts;
    }
    
    const term = searchTerm.toLowerCase();
    return sortedPosts.filter(post => {
      if (!post?.metadata) return false;
      
      return (
        (post.metadata.title || '').toLowerCase().includes(term) ||
        (post.metadata.description || '').toLowerCase().includes(term) ||
        (post.excerpt || '').toLowerCase().includes(term) ||
        (Array.isArray(post.metadata.tags) && post.metadata.tags.some(tag => (tag || '').toLowerCase().includes(term))) ||
        (Array.isArray(post.metadata.categories) && post.metadata.categories.some(category => (category || '').toLowerCase().includes(term)))
      );
    });
  }, [sortedPosts, searchTerm]);

  // Ensure tags are unique by slug to avoid duplicate key errors
  const uniqueTags = React.useMemo(() => {
    if (!Array.isArray(tags)) return [];
    
    // Create a map to deduplicate by slug
    const tagMap = new Map<string, TagInfo>();
    tags.forEach(tag => {
      if (!tag?.slug) return; // Skip invalid tags
      
      if (!tagMap.has(tag.slug)) {
        tagMap.set(tag.slug, tag);
      } else {
        // If we find a duplicate slug, append a unique identifier
        const existingTag = tagMap.get(tag.slug)!;
        // Keep the one with higher count or the first one if counts are equal
        if (tag.count > existingTag.count) {
          tagMap.set(tag.slug, tag);
        }
      }
    });
    
    return Array.from(tagMap.values());
  }, [tags]);

  // Get visible tags based on expanded state
  const visibleTags = React.useMemo(() => {
    if (!Array.isArray(uniqueTags)) return [];
    if (tagsExpanded || uniqueTags.length <= VISIBLE_TAGS_COUNT) {
      return uniqueTags;
    }
    return uniqueTags.slice(0, VISIBLE_TAGS_COUNT);
  }, [uniqueTags, tagsExpanded]);

  // Handle infinite scroll with Intersection Observer
  useEffect(() => {
    if (!hasMore || !loadMorePosts || loading || noMorePosts) return;
    
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          try {
            const newPosts = await loadMorePosts();
            if (!newPosts || newPosts.length === 0) {
              setNoMorePosts(true);
            } else {
              // Deduplicate posts when adding new ones
              setPosts(prevPosts => {
                if (!Array.isArray(prevPosts) || !Array.isArray(newPosts)) return prevPosts;
                const existingSlugs = new Set(prevPosts.map(p => p?.slug).filter(Boolean));
                const uniqueNewPosts = newPosts.filter(post => post?.slug && !existingSlugs.has(post.slug));
                return [...prevPosts, ...uniqueNewPosts];
              });
            }
          } catch (error) {
            console.error('Error loading more posts:', error);
            setNoMorePosts(true);
          } finally {
            setLoading(false);
          }
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );
    
    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, [hasMore, loadMorePosts, loading, noMorePosts]);

  // Add passive scroll event listener
  useEffect(() => {
    const options: AddEventListenerOptions = {
      passive: true
    };

    const noop = () => {};

    window.addEventListener('scroll', noop, options);
    window.addEventListener('touchstart', noop, options);
    window.addEventListener('touchmove', noop, options);

    return () => {
      window.removeEventListener('scroll', noop, options);
      window.removeEventListener('touchstart', noop, options);
      window.removeEventListener('touchmove', noop, options);
    };
  }, []);

  // Reset posts when initialPosts changes
  useEffect(() => {
    setPosts(initialPosts);
    setNoMorePosts(!hasMore);
  }, [initialPosts, hasMore]);

  const handleTagClick = useCallback((tagSlug: string) => {
    if (onTagSelected) {
      onTagSelected(tagSlug);
    }
  }, [onTagSelected]);

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSortChange = useCallback((field: 'date' | 'title') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'date' ? 'desc' : 'asc');
    }
  }, [sortField]);

  const toggleTagsExpanded = useCallback(() => {
    setTagsExpanded(prev => !prev);
  }, []);

  return (
    <div className="w-full">
      {/* Controls: search + sort */}
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
        {blogConfig.enableSearch && (
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        )}
        
        <div className="flex gap-2">
          <button
            onClick={() => handleSortChange('date')}
            className={`px-3 py-1 text-sm rounded-lg ${
              sortField === 'date'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('title')}
            className={`px-3 py-1 text-sm rounded-lg ${
              sortField === 'title'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            Title {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      {/* Tags with expand/collapse functionality */}
      {blogConfig.enableTags && uniqueTags.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Tags</h3>
            <div className="flex items-center gap-2">
              {selectedTags.length > 0 && (
                <button 
                  onClick={() => onTagSelected && onTagSelected('clear-all')}
                  className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Clear Filters ({selectedTags.length})
                </button>
              )}
              {uniqueTags.length > VISIBLE_TAGS_COUNT && (
                <button 
                  onClick={toggleTagsExpanded}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {tagsExpanded ? 'Show Less' : `Show All (${uniqueTags.length})`}
                </button>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {visibleTags.map(tag => (
              <button
                key={`tag-${tag.slug}`} 
                onClick={() => handleTagClick(tag.slug)}
                className={`px-3 py-1 text-sm rounded-full transition-colors flex items-center gap-1
                  ${selectedTags.includes(tag.slug)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                aria-pressed={selectedTags.includes(tag.slug)}
              >
                {selectedTags.includes(tag.slug) && (
                  <span className="text-xs">✓</span>
                )}
                <span>{tag.name} ({tag.count})</span>
              </button>
            ))}
            
            {!tagsExpanded && uniqueTags.length > VISIBLE_TAGS_COUNT && (
              <button
                onClick={toggleTagsExpanded}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                +{uniqueTags.length - VISIBLE_TAGS_COUNT} more
              </button>
            )}
          </div>
        </div>
      )}

      {/* Posts grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid justify-items-stretch gap-8 md:gap-10">
          {filteredPosts.map((post, index) => {
            const imagePath = (() => {
              // Get the section from the post's slug
              const section = post.slug.split('/')[0];
              
              // Get the image path - check coverImage first, then fall back to image
              const coverImage = typeof post.metadata.coverImage === 'string' 
                ? { url: post.metadata.coverImage } 
                : (post.metadata.coverImage as CoverImage | undefined);
                
              let imagePath = coverImage?.url || post.metadata.image || DEFAULT_IMAGES.section[section as keyof typeof DEFAULT_IMAGES.section] || DEFAULT_IMAGES.post;
              
              // Ensure image path is absolute
              if (imagePath.startsWith('http')) {
                return imagePath;
              }
              
              // Handle relative paths starting with ./
              if (imagePath.startsWith('./')) {
                const slugParts = post.slug.split('/');
                const parentDir = slugParts.slice(0, -1).join('/');
                return `/docs/${parentDir}/${imagePath.slice(2)}`;
              }
              
              // Otherwise ensure it starts with / for public directory
              // Non-absolute paths need /docs/ prefix
              return imagePath.startsWith('/') ? imagePath : `/docs/${section}/${imagePath}`;
            })();

            return (
              <div key={post.slug}>
                <PostCard
                  post={post}
                  section="blog"
                  showDate={true}
                  imagePath={imagePath}
                  priority={index < 6} // Apply priority to first 6 posts (likely above fold)
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          {searchTerm ? 'No posts found matching your search.' : 'No posts found.'}
        </div>
      )}

      {/* Loading indicator and observer target */}
      {hasMore && !noMorePosts && (
        <div ref={observerTarget} className="w-full py-8 text-center">
          {loading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
            </div>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">Scroll for more</span>
          )}
        </div>
      )}
    </div>
  );
} 