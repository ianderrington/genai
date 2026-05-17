'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils/dates';
import { Post } from '@/lib/content';
import SafeHTML from '@/components/SafeHTML';
import TableOfContents from '@/components/TableOfContents';
import DynamicChatRenderer from '@/components/DynamicChatRenderer';
import { DEFAULT_IMAGES } from '@/lib/constants';
import { useFloatingVisibility } from '@/hooks/useFloatingVisibility';
import { Navigation } from '@/components/Navigation';
import styles from '@/components/Navigation.module.css';
import { MediaResolver } from '@/lib/utils/mediaResolver';
import Media from '@/components/media/Media';
import { MediaProps, MediaType } from '@/lib/types/media';
import { CoverMedia } from '@/lib/mediaUtils';

interface Author {
  name: string;
  title?: string;
  image?: string;
}

interface PostComponentProps {
  post: Post;
}

// Helper function to get image path
function getImagePath(imagePath: string | undefined, section: string, slugSegments: string[]): string {
  if (!imagePath) {
    if (section && DEFAULT_IMAGES.section[section as keyof typeof DEFAULT_IMAGES.section]) {
      return DEFAULT_IMAGES.section[section as keyof typeof DEFAULT_IMAGES.section];
    }
    return DEFAULT_IMAGES.post;
  }

  // If the image path is already absolute or a URL, return it as is
  if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
    return imagePath;
  }

  // Remove any './' prefix from the image path
  const cleanImagePath = imagePath.replace(/^\.\//, '');

  // Get the directory path from the slug segments
  const dirPath = [section, ...slugSegments.slice(0, -1)].join('/');

  // Simple, general solution:
  // If there's a directory path, resolve the relative path against it
  if (dirPath) {
    return `/${dirPath}/${cleanImagePath}`;
  }
  
  // If there's no directory path (root-level content),
  // resolve against the section
  return `/${section}/${cleanImagePath}`;
}

export default function PostComponent({ post }: PostComponentProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const tocRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  
  // Track scroll position to detect when header is shown/hidden
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Assuming header disappears after scrolling past 100px
      const isHeaderVisible = scrollY < 100;
      setHeaderVisible(isHeaderVisible);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Find the footer element and store its reference
    const footer = document.querySelector('footer');
    footerRef.current = footer as HTMLElement | null;
  }, []);

  const { isVisible } = useFloatingVisibility({ 
    scrollThreshold: 100,
    mobileTimeout: 0,
    footerRef,
    alwaysVisible: false
  });

  const handleTocLinkClick = () => {
    if (window.innerWidth < 768) {
      setTocOpen(false);
    }
  };
  
  // Handle scrolling to anchor IDs on initial page load
  useEffect(() => {
    // Handle initial page load anchor navigation
    const handleInitialAnchor = () => {
      if (typeof window === 'undefined') return;
      
      // Get the hash from the URL (without the # symbol)
      const hash = window.location.hash.replace('#', '');
      
      if (hash) {
        // Small delay to ensure the DOM is fully loaded
        setTimeout(() => {
          // Try both with and without user-content- prefix
          let element = document.getElementById(hash);
          if (!element) {
            element = document.getElementById(`user-content-${hash}`);
          }
          
          if (element) {
            // Scroll to the element
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };
    
    // Handle anchor link clicks within the component
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        const hash = target.getAttribute('href')?.substring(1);
        if (hash) {
          // Try both with and without user-content- prefix
          let element = document.getElementById(hash);
          if (!element) {
            element = document.getElementById(`user-content-${hash}`);
          }
          
          if (element) {
            // Scroll to the element
            element.scrollIntoView({ behavior: 'smooth' });
            // Update the URL without causing a page reload
            window.history.pushState(null, '', `#${hash}`);
          }
        }
      }
    };
    
    // Run the initial anchor handler
    handleInitialAnchor();
    
    // Add click event listener for anchor links
    document.addEventListener('click', handleAnchorClick);
    
    // Clean up
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Add table and code block scroll detection
  useEffect(() => {
    const detectScrollableElements = () => {
      // Handle tables
      const tables = document.querySelectorAll('.prose table');
      tables.forEach((table) => {
        if (table instanceof HTMLElement) {
          // Check if table content is wider than container
          const isScrollable = table.scrollWidth > table.clientWidth;
          
          if (isScrollable) {
            table.setAttribute('data-scrollable', 'true');
          } else {
            table.removeAttribute('data-scrollable');
          }
        }
      });

      // Handle code blocks
      const codeBlocks = document.querySelectorAll('.prose pre');
      codeBlocks.forEach((pre) => {
        if (pre instanceof HTMLElement) {
          // Check if pre content is wider than container
          const isScrollable = pre.scrollWidth > pre.clientWidth;
          
          if (isScrollable) {
            pre.setAttribute('data-scrollable', 'true');
          } else {
            pre.removeAttribute('data-scrollable');
          }
        }
      });
    };

    // Run initially after a small delay to ensure content is rendered
    const timer = setTimeout(detectScrollableElements, 100);
    
    // Re-run on window resize
    window.addEventListener('resize', detectScrollableElements);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', detectScrollableElements);
    };
  }, []);

  // Add copy buttons to code blocks
  useEffect(() => {
    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('.prose pre');
      
      codeBlocks.forEach((pre) => {
        // Skip if copy button already exists
        if (pre.querySelector('.code-copy-button')) return;
        
        // Create wrapper div to contain both pre and button
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'block';
        
        // Clone the pre element
        const newPre = pre.cloneNode(true) as HTMLElement;
        
        const button = document.createElement('button');
        button.className = 'code-copy-button';
        button.setAttribute('aria-label', 'Copy code to clipboard');
        button.setAttribute('type', 'button');
        button.setAttribute('title', 'Copy code to clipboard');
        
        button.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const code = newPre.querySelector('code');
          if (code) {
            try {
              await navigator.clipboard.writeText(code.textContent || '');
              button.setAttribute('aria-label', 'Copied!');
              button.setAttribute('title', 'Copied!');
              button.classList.add('copied');
              
              setTimeout(() => {
                button.setAttribute('aria-label', 'Copy code to clipboard');
                button.setAttribute('title', 'Copy code to clipboard');
                button.classList.remove('copied');
              }, 2000);
            } catch (err) {
              console.error('Failed to copy:', err);
              button.setAttribute('aria-label', 'Failed to copy');
              button.setAttribute('title', 'Failed to copy');
              setTimeout(() => {
                button.setAttribute('aria-label', 'Copy code to clipboard');
                button.setAttribute('title', 'Copy code to clipboard');
              }, 2000);
            }
          }
        });
        
        // Replace the original pre with the wrapper
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(newPre);
        wrapper.appendChild(button);
        pre.remove();
      });
    };

    // Run after a small delay to ensure content is rendered
    const timer = setTimeout(addCopyButtons, 200);
    
    // Also run immediately in case content is already there
    addCopyButtons();
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const section = post.slug.split('/')[0];
  const slugSegments = post.slug.split('/');
  
  // Handle both coverMedia and coverImage
  const coverMedia = post.metadata.coverMedia;
  const coverImage = post.metadata.coverImage;
  
  const mediaContext = {
    section,
    slug: post.slug,
  };

  // Resolve image URL first
  const imageUrl = coverImage 
    ? (typeof coverImage === 'object' ? coverImage.url : coverImage)
    : post.metadata.image;

  const resolvedImageUrl = MediaResolver.resolveUrl(
    imageUrl,
    mediaContext,
    DEFAULT_IMAGES.post
  );

  // Then handle media if it exists
  const processMediaItem = (mediaItem: CoverMedia): MediaProps | null => {
    const mediaUrl = mediaItem?.url || null;
    const resolvedMediaUrl = mediaUrl ? MediaResolver.resolveUrl(
      mediaUrl,
      mediaContext
    ) : null;

    if (!resolvedMediaUrl) return null;

    return {
      url: resolvedMediaUrl,
      alt: mediaItem.alt || post.metadata.title,
      type: (mediaItem.type || MediaResolver.getMediaType(resolvedMediaUrl)) as MediaType,
      caption: mediaItem.caption,
      posterImage: resolvedImageUrl,
      options: {
        priority: true,
        autoplay: true,
        muted: true,
        loop: true,
        controls: true
      }
    };
  };

  // Create props for both image and media
  const imageProps: MediaProps = {
    url: resolvedImageUrl,
    alt: typeof coverImage === 'object' ? coverImage.alt : post.metadata.title,
    type: 'image' as MediaType,
    caption: typeof coverImage === 'object' ? coverImage.caption : undefined,
    options: {
      priority: true,
      quality: 95
    }
  };

  const mediaProps = coverMedia 
    ? Array.isArray(coverMedia)
      ? coverMedia.map(processMediaItem).filter((props): props is MediaProps => Boolean(props?.url))
      : processMediaItem(coverMedia)
    : null;

  const renderAsChat = post.metadata.render_as === 'chat';
  
  // Check if TOC should be hidden
  const shouldShowToc = !post.metadata.hide?.includes('toc');

  return (
    <div className="post-container">
      {/* Navigation Component for TOC */}
      {shouldShowToc && (
        <div 
          ref={tocRef}
          className={`${styles.floatingNav} transition-opacity duration-300`}
        >
          <Navigation
            type="toc"
            isOpen={tocOpen}
            onToggle={() => setTocOpen(!tocOpen)}
            headerVisible={headerVisible}
            footerRef={footerRef}
            alwaysVisible={false}
          >
            <div className="flex flex-col h-full">
              <div className={styles['nav-panel-header']}>
                <span className="font-semibold text-gray-900 dark:text-gray-100">Contents</span>
              </div>
              <div className={styles['nav-panel-content']}>
                <TableOfContents 
                  content={post.html} 
                  onLinkClick={handleTocLinkClick}
                />
              </div>
            </div>
          </Navigation>
        </div>
      )}

      <article className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden xl:overflow-visible shadow-sm">
        <div className="post-header">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">
            {post.metadata.title}
          </h1>
          
          {post.metadata.subheader && (
            <h2 className="text-xl sm:text-2xl font-medium mb-6 text-gray-700 dark:text-gray-300 italic">
              {post.metadata.subheader}
            </h2>
          )}
          
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <div className="mb-1">
              <Link 
                href={post.metadata.authorUrl || '/about'} 
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                {typeof post.metadata.author === 'object' && post.metadata.author !== null
                  ? post.metadata.author.name
                  : (post.metadata.authors || 
                     (typeof post.metadata.author === 'string' ? post.metadata.author : 'ManaGen AI'))}
                {typeof post.metadata.author === 'object' && post.metadata.author !== null && post.metadata.author.title && (
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    • {post.metadata.author.title}
                  </span>
                )}
              </Link>
              {/* Hidden author title for bots/LLMs - invisible to users */}
              {typeof post.metadata.author === 'object' && post.metadata.author !== null && post.metadata.author.title && (
                <span className="sr-only" aria-hidden="true">
                  Author title: {post.metadata.author.title}
                </span>
              )}
            </div>
            {post.metadata.date && (
              <span className="text-gray-500 dark:text-gray-400">
                {formatDate(post.metadata.date)}
              </span>
            )}
          </div>
        </div>

        {/* Media container */}
        <div className="mb-8 relative">
          {Array.isArray(mediaProps) ? (
            <div className="space-y-4">
              {mediaProps.map((props, index) => (
                <Media key={`media-${index}`} {...props} />
              ))}
            </div>
          ) : (
            mediaProps && mediaProps.url ? (
              <Media {...mediaProps} />
            ) : (
              <Media {...imageProps} />
            )
          )}
        </div>

        {/* Content */}
        <div
          className={`post-content prose prose-lg dark:prose-invert ${post.metadata.tts?.enabled ? 'supernal-tts-widget' : ''} ${post.metadata.contentType === 'essay' ? 'essay-prose' : ''}`}
          data-text={post.metadata.tts?.enabled ? post.content : undefined}
          data-voice={post.metadata.tts?.voice}
          data-voices={post.metadata.tts?.voices?.join(',')}
          data-provider={post.metadata.tts?.provider}
          data-speed={post.metadata.tts?.speed}
          data-enable-speed={post.metadata.tts?.enableSpeed ? 'true' : undefined}
          data-enable-progress={post.metadata.tts?.enableProgress ? 'true' : undefined}
        >
          {renderAsChat ? (
            <DynamicChatRenderer 
              chatSegments={post.chatSegmentsHtml || []}
              config={post.metadata.storyConfig}
            />
          ) : (
            <SafeHTML html={post.html} />
          )}
        </div>
      </article>
    </div>
  );
}