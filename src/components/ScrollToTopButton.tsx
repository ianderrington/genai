// src/components/ScrollToTopButton.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create a sentinel element that will be observed
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '300px'; // Show button after 300px scroll
    sentinel.style.left = '0';
    sentinel.style.width = '100%';
    sentinel.style.height = '1px';
    sentinel.style.pointerEvents = 'none';
    sentinel.style.opacity = '0';
    document.body.appendChild(sentinel);
    sentinelRef.current = sentinel;
    
    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        // When sentinel is not visible, show the button
        // (meaning we've scrolled past 300px)
        setIsVisible(!entries[0].isIntersecting);
      },
      {
        rootMargin: '0px',
        threshold: 0
      }
    );
    
    // Start observing
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    
    // Cleanup
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
        sentinelRef.current.remove();
      }
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;