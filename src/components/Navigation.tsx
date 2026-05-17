import React, { useState, useRef, useEffect } from 'react';
import { List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navigation.module.css';
import { useFloatingVisibility } from '@supernal/docs-kit';

interface NavigationProps {
  type: 'toc' | 'chat';
  isOpen?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
  headerVisible?: boolean;
  footerRef?: React.RefObject<HTMLElement>;
  alwaysVisible?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  type,
  isOpen = false,
  onToggle,
  children,
  headerVisible = true,
  footerRef,
  alwaysVisible = false
}) => {
  const [localIsOpen, setLocalIsOpen] = useState(isOpen);
  const [isMobile, setIsMobile] = useState(false);
  const isControlled = typeof onToggle === 'function';
  const navRef = useRef<HTMLDivElement>(null);
  
  const { isVisible, behavior } = useFloatingVisibility({
    scrollThreshold: 100,
    mobileTimeout: 0,
    behavior: 'fade',
    footerRef,
    alwaysVisible
  });
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setLocalIsOpen(!localIsOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        if (isControlled) {
          onToggle?.();
        } else {
          setLocalIsOpen(false);
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isControlled) {
          onToggle?.();
        } else {
          setLocalIsOpen(false);
        }
      }
    };

    if (isControlled ? isOpen : localIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isControlled, isOpen, localIsOpen, onToggle]);

  const currentIsOpen = isControlled ? isOpen : localIsOpen;
  
  return (
    <div 
      className={`
        ${styles['navigation-container']} 
        ${headerVisible ? styles['navigation-container-with-header'] : ''}
        ${currentIsOpen
          ? 'opacity-100'
          : behavior === 'slide'
            ? (isVisible ? 'translate-y-0' : 'translate-y-full')
            : (isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none')
        }
        transition-all duration-300 ease-in-out
      `}
      ref={navRef}
    >
      <button
        onClick={handleToggle}
        className={`${styles['nav-button']} ${currentIsOpen ? styles.active : ''}`}
        aria-label={`Toggle ${type}`}
        aria-expanded={currentIsOpen}
      >
        <List className="w-5 h-5" />
      </button>
      
      <AnimatePresence>
        {currentIsOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, y: isMobile ? -20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -20, y: isMobile ? -20 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={styles['nav-panel']}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 