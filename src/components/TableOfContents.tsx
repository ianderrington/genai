'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Link as LinkIcon } from 'lucide-react';

interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  onLinkClick?: () => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content, onLinkClick }) => {
  const [headings, setHeadings] = useState<TOCHeading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const activeIdRef = useRef(activeId);
  const { theme } = useTheme();
  const observersRef = useRef<{[key: string]: IntersectionObserver}>({});
  const headingElementsRef = useRef<{[key: string]: HTMLElement | null}>({});
  const navContainerRef = useRef<HTMLElement | null>(null);
  const activeItemRef = useRef<HTMLAnchorElement | null>(null);
  const linkRefs = useRef<{[key: string]: HTMLAnchorElement | null}>({});
  const navRef = useRef<HTMLElement | null>(null);
  const lastActiveId = useRef<string>('');
  
  // Track activeId in a ref to use in callbacks
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  // Extract headings from content
  useEffect(() => {
    if (!content) return;

    try {
      const doc = new DOMParser().parseFromString(content, 'text/html');
      
      // Get all headings
      const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
      // Get all standalone anchors (not inside headings)
      const anchorElements = doc.querySelectorAll('a[id]');
      
      // Process heading elements
      const newHeadings = Array.from(headingElements).map((heading) => {
        // Clean any user-content- prefixes from IDs
        const headingId = heading.id.replace(/^user-content-/, '');
        
        return {
          id: headingId,
          text: heading.textContent || '',
          level: parseInt(heading.tagName[1])
        };
      });
      
      // Add any standalone anchors that might be used for navigation
      Array.from(anchorElements).forEach((anchor) => {
        // Skip anchors that are children of headings (already processed)
        if (anchor.parentElement?.tagName.match(/^H[1-6]$/)) {
          return;
        }
        
        // Clean any user-content- prefixes from anchor IDs
        const anchorId = anchor.id.replace(/^user-content-/, '');
        
        // Find the next heading element after this anchor
        let nextHeading = anchor.nextElementSibling;
        while (nextHeading && !nextHeading.tagName.match(/^H[1-6]$/)) {
          nextHeading = nextHeading.nextElementSibling;
        }
        
        if (nextHeading && nextHeading.tagName.match(/^H[1-6]$/)) {
          const headingText = nextHeading.textContent || '';
          const level = parseInt(nextHeading.tagName[1]);
          
          // Check if this heading already exists in our list with a different ID
          const existingIndex = newHeadings.findIndex(
            h => h.text === headingText && h.level === level
          );
          
          if (existingIndex >= 0) {
            // If the heading exists but has a different ID, update it
            // This happens when anchor is separate from heading
            if (!nextHeading.id && anchor.id) {
              newHeadings[existingIndex].id = anchorId;
            }
          } else {
            // If heading isn't in our list, add it with this anchor ID
            newHeadings.push({
              id: anchorId,
              text: headingText,
              level: level
            });
          }
        }
      });
      
      // Filter out any headings without IDs and sort by their position in the document
      const filteredHeadings = newHeadings.filter(heading => heading.id.length > 0);
      setHeadings(filteredHeadings);
    } catch (error) {
      console.error('Error processing table of contents:', error);
      setHeadings([]);
    }
  }, [content]);

  // Find parent nav-panel-content div for auto-scrolling
  useEffect(() => {
    if (!navContainerRef.current) {
      // Find the container element that has the scroll
      const findScrollContainer = () => {
        // Start by looking for the nav-panel-content class
        const navPanelContent = document.querySelector('.nav-panel-content');
        if (navPanelContent) {
          return navPanelContent as HTMLElement;
        }
        
        // If not found and we have an active item, try to traverse up
        if (activeItemRef.current) {
          let parent = activeItemRef.current.parentElement;
          while (parent) {
            if (parent.classList.contains('nav-panel-content') || 
                parent.style.overflowY === 'auto' || 
                getComputedStyle(parent).overflowY === 'auto') {
              return parent;
            }
            parent = parent.parentElement;
          }
        }
        
        return null;
      };
      
      // Set the container ref
      navContainerRef.current = findScrollContainer();
    }
    
    // Save our nav element ref
    if (!navRef.current) {
      navRef.current = document.querySelector('nav') as HTMLElement;
    }
  }, [activeId]);

  // Auto-scroll the active item into view whenever activeId changes
  useEffect(() => {
    // Skip if activeId hasn't changed
    if (activeId === lastActiveId.current) return;
    lastActiveId.current = activeId;
    
    // Function to scroll the active item into view
    const scrollActiveIntoView = () => {
      if (!activeId) return;
      
      // Try to get both the active link element and the scroll container
      const activeElement = linkRefs.current[activeId];
      const container = navContainerRef.current;
      
      if (activeElement && container) {
        // Calculate positions
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        
        // Get the index of the current active heading
        const activeIndex = headings.findIndex(h => h.id === activeId);
        
        // Calculate the desired position - place active element 1/4 of the way down from the top
        // This ensures we can see some previous sections but more upcoming ones
        const targetPosition = containerRect.top + (containerRect.height * 0.25);
        
        // Always scroll when:
        // 1. Active element is out of view
        // 2. We're at a primary heading (to ensure chapter changes are visible)
        // 3. We're moving to a deeper section in the document
        const isAbove = activeRect.top < containerRect.top;
        const isBelow = activeRect.bottom > containerRect.bottom;
        const isPrimaryHeading = headings[activeIndex]?.level <= 2;
        const isMovingDown = activeIndex > headings.findIndex(h => h.id === lastActiveId.current);
        
        if (isAbove || isBelow || isPrimaryHeading || isMovingDown) {
          // Calculate the scroll position to place the active element at our target position
          const scrollTop = container.scrollTop + (activeRect.top - targetPosition);
          
          container.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        }
      }
    };
    
    // Call immediately
    scrollActiveIntoView();
    
    // Also set up a small delay to ensure DOM is fully updated
    const timeoutId = setTimeout(scrollActiveIntoView, 100);
    
    return () => clearTimeout(timeoutId);
  }, [activeId, headings]);

  // Handle scroll spy with better tracking
  useEffect(() => {
    if (headings.length === 0 || typeof IntersectionObserver === 'undefined') return;
    
    // Cleanup previous observers
    Object.values(observersRef.current).forEach(observer => observer.disconnect());
    observersRef.current = {};
    headingElementsRef.current = {};
    
    // Create a map to track the visibility state of each heading
    const visibilityMap = new Map<string, boolean>();
    headings.forEach(heading => visibilityMap.set(heading.id, false));
    
    // Create different observers for better accuracy
    // Observer for headings entering viewport from top
    const topObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = entry.target.id.replace(/^user-content-/, '');
          visibilityMap.set(id, entry.isIntersecting);
          
          // Find the first visible heading or the one that just passed the top
          if (entry.isIntersecting) {
            // When scrolling down and a heading enters viewport, set it as active
            const scrollingDown = entry.boundingClientRect.y <= 0;
            if (scrollingDown || activeIdRef.current === '') {
              setActiveId(id);
            }
          } else {
            // When no headings are visible, find the last one above the viewport
            const isAnyVisible = Array.from(visibilityMap.values()).some(Boolean);
            if (!isAnyVisible) {
              const elementsAboveViewport = headings
                .filter(heading => {
                  const element = headingElementsRef.current[heading.id];
                  return element && element.getBoundingClientRect().y < 0;
                })
                .sort((a, b) => {
                  const aElement = headingElementsRef.current[a.id];
                  const bElement = headingElementsRef.current[b.id];
                  if (!aElement || !bElement) return 0;
                  
                  return bElement.getBoundingClientRect().y - aElement.getBoundingClientRect().y;
                });
              
              if (elementsAboveViewport.length > 0) {
                setActiveId(elementsAboveViewport[0].id);
              }
            }
          }
        });
      },
      { 
        rootMargin: '-10% 0px -85% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1] 
      }
    );
    
    // Observer for determining the current section (larger rootMargin)
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = entry.target.id.replace(/^user-content-/, '');
          
          // When a heading is fully in view, definitely make it active
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveId(id);
          }
        });
      },
      { 
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0.5, 1]
      }
    );
    
    headings.forEach(heading => {
      // Try both with and without user-content- prefix
      let element = document.getElementById(heading.id);
      if (!element) {
        element = document.getElementById(`user-content-${heading.id}`);
      }
      
      if (element) {
        // Store references to the elements for position calculations
        headingElementsRef.current[heading.id] = element;
        
        // Observe with both observers
        topObserver.observe(element);
        sectionObserver.observe(element);
        
        // Store observers for cleanup
        observersRef.current[`top-${heading.id}`] = topObserver;
        observersRef.current[`section-${heading.id}`] = sectionObserver;
      }
    });

    // Store the main observer in the ref for cleanup
    observersRef.current.topObserver = topObserver;
    observersRef.current.sectionObserver = sectionObserver;

    return () => {
      // Cleanup all observers
      Object.values(observersRef.current).forEach(observer => observer.disconnect());
    };
  }, [headings]);

  // Share handlers
  const handleCopyLink = async (id: string) => {
    const url = `${window.location.href.split('#')[0]}#${id}`;
    await navigator.clipboard.writeText(url);
  };

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Try to find element with and without user-content- prefix
    let element = document.getElementById(id);
    if (!element) {
      element = document.getElementById(`user-content-${id}`);
    }
    
    if (element) {
      // Calculate a better scroll position that accounts for fixed header
      const viewportHeight = window.innerHeight;
      const offset = Math.max(60, viewportHeight * 0.1); // At least 60px or 10% of viewport
      
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - offset;
      
      window.scrollTo({
        top: middle,
        behavior: 'smooth'
      });
      
      window.history.pushState({}, '', `#${id}`);
      setActiveId(id);
      if (onLinkClick) onLinkClick();
    }
  };

  // If no headings, don't render
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav ref={el => { if (el) navRef.current = el; }} className="space-y-2">
      {headings.map(heading => (
        <div
          key={heading.id}
          className="flex items-center group"
          style={{ marginLeft: `${(heading.level - 1) * 0.75}rem` }}
        >
          <a
            ref={(el) => {
              linkRefs.current[heading.id] = el;
              if (heading.id === activeId) {
                activeItemRef.current = el;
              }
            }}
            href={`#${heading.id}`}
            onClick={(e) => scrollToHeading(e, heading.id)}
            className={`
              py-1.5 text-sm flex-grow
              ${activeId === heading.id 
                ? 'text-blue-600 dark:text-blue-400 font-medium' 
                : 'text-gray-700 dark:text-gray-300'
              }
              hover:text-blue-800 dark:hover:text-blue-300
              transition-colors duration-200
            `}
          >
            {heading.text}
          </a>
          <button
            onClick={() => handleCopyLink(heading.id)}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1"
            title="Copy link to section"
          >
            <LinkIcon size={14} className="text-gray-400 hover:text-gray-600 
              dark:text-gray-500 dark:hover:text-gray-300
              transition-colors duration-200" 
            />
          </button>
        </div>
      ))}
    </nav>
  );
};

export default TableOfContents; 