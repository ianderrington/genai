'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import ThemeToggle from './ThemeToggle';

interface MobileMenuProps {
  sections: Array<{
    id: string;
    title: string;
  }>;
  externalLinks?: Array<{
    title: string;
    href: string;
  }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ sections, externalLinks = [] }) => {
  const { isOpen, closeMenu, isMobile } = useMobileMenu();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Get current section from pathname
  const currentSection = pathname?.split('/')[1];

  // Remove excessive debug logging

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Focus trap
  useEffect(() => {
    if (isOpen && isMobile) {
      const menu = menuRef.current;
      if (!menu) {
        return;
      }

      const focusableElements = menu.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      };

      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeMenu();
        }
      };

      document.addEventListener('keydown', handleTabKey);
      document.addEventListener('keydown', handleEscapeKey);
      firstElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleTabKey);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, isMobile, closeMenu]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      closeMenu();
    }
  };

  // Only render on mobile
  if (!isMobile) {
    return null;
  }

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        ref={overlayRef}
        className={`
          fixed inset-0 bg-black z-[9998]
          transition-opacity duration-300 ease-in-out
          ${isOpen 
            ? 'opacity-50 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
          }
        `}
        onClick={handleOverlayClick}
        aria-hidden={!isOpen}
      />

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw]
          bg-white dark:bg-gray-900 z-[9999]
          shadow-xl border-l border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          flex flex-col
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 id="mobile-menu-title" className="text-lg font-semibold text-gray-900 dark:text-white">
            Navigation
          </h2>
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 space-y-2">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={`/${section.id}`}
                className={`
                  block px-4 py-3 rounded-lg text-base font-medium
                  transition-colors duration-200
                  ${currentSection === section.id
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  }
                `}
                onClick={closeMenu}
              >
                {section.title}
              </Link>
            ))}
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={closeMenu}
              >
                {link.title} ↗
              </a>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu; 