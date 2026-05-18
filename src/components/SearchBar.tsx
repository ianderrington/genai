'use client';

import React from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContentSearch } from '@/lib/search/useContentSearch';

interface SearchBarProps {
  className?: string;
  isMobile?: boolean;
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, isMobile = false, onClose }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { results: searchResults, isLoading } = useContentSearch(searchTerm, 5);

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)
      ) {
        event.preventDefault();
        if (window.innerWidth >= 768) {
          setIsExpanded(true);
          inputRef.current?.focus();
        } else {
          setIsMobileSearchOpen(true);
        }
      }
      if (event.key === 'Escape') {
        if (window.innerWidth >= 768) {
          setIsExpanded(false);
          setSearchTerm('');
        } else {
          setIsMobileSearchOpen(false);
          setSearchTerm('');
          if (onClose) onClose();
        }
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        if (window.innerWidth < 768) setIsMobileSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    if ((isMobile || isMobileSearchOpen) && inputRef.current) {
      const id = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const len = inputRef.current.value.length;
          inputRef.current.setSelectionRange(len, len);
        }
      }, 100);
      return () => clearTimeout(id);
    }
  }, [isMobile, isMobileSearchOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      e.preventDefault();
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsExpanded(false);
      setIsMobileSearchOpen(false);
      if (onClose) onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsExpanded(false);
      setIsMobileSearchOpen(false);
      if (onClose) onClose();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (onClose) onClose();
  };

  const closeDropdown = () => {
    setSearchTerm('');
    setIsExpanded(false);
    setIsMobileSearchOpen(false);
  };

  if (isMobile || isMobileSearchOpen) {
    return (
      <div className={`w-full ${isMobile ? '' : 'fixed inset-0 bg-gray-900/90 z-50 p-4 flex flex-col'}`} ref={searchRef}>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                autoFocus
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-2.5 p-1 text-gray-400 hover:text-white rounded-full"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {!isMobile && (
              <button
                type="button"
                onClick={() => { setIsMobileSearchOpen(false); setSearchTerm(''); if (onClose) onClose(); }}
                className="ml-2 p-3 text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>
        </form>

        <div className="flex-1 overflow-y-auto bg-gray-800 rounded-lg">
          {searchResults.length > 0 ? (
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              {searchResults.map(hit => (
                <Link
                  key={hit.slug}
                  href={`/${hit.slug}`}
                  className="block px-4 py-3 text-sm border-b border-gray-700 hover:bg-gray-700/50"
                  onClick={() => { closeDropdown(); if (onClose) onClose(); }}
                >
                  <div className="font-medium text-gray-200">{hit.title}</div>
                  {hit.description && (
                    <div className="text-sm text-gray-400 mt-1 line-clamp-2">{hit.description}</div>
                  )}
                </Link>
              ))}
              <Link
                href={`/search?q=${encodeURIComponent(searchTerm)}`}
                className="block px-4 py-3 text-sm text-blue-300 hover:bg-gray-700/50 font-medium text-center"
                onClick={() => { setIsMobileSearchOpen(false); if (onClose) onClose(); }}
              >
                View all results →
              </Link>
            </div>
          ) : (
            searchTerm ? (
              isLoading
                ? <div className="px-4 py-8 text-gray-400 text-center">Searching…</div>
                : <div className="px-4 py-8 text-gray-400 text-center">No results found</div>
            ) : (
              <div className="px-4 py-8 text-gray-400 text-center">Type to search…</div>
            )
          )}
        </div>
      </div>
    );
  }

  // Desktop
  return (
    <div className={`relative group ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className={`flex items-center transition-all duration-200 ease-in-out ${isExpanded ? 'w-96' : 'w-10'}`}>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsExpanded(true)}
            placeholder="Search posts..."
            className={`w-full pl-10 pr-4 py-2 text-sm rounded-full border transition-all duration-200 ease-in-out
              ${isExpanded ? 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600' : 'bg-transparent border-transparent'}
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200`}
          />
          <button
            type="submit"
            onClick={() => {
              if (!isExpanded) {
                setIsExpanded(true);
                inputRef.current?.focus();
              } else if (searchTerm.trim()) {
                router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                setIsExpanded(false);
              }
            }}
            className="absolute left-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      {isExpanded && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-[calc(100vh-200px)] overflow-y-auto">
          {searchResults.map(hit => (
            <Link
              key={hit.slug}
              href={`/${hit.slug}`}
              className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0"
              onClick={closeDropdown}
            >
              <div className="font-medium text-gray-900 dark:text-gray-100">{hit.title}</div>
              {hit.description && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{hit.description}</div>
              )}
            </Link>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(searchTerm)}`}
            className="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
            onClick={closeDropdown}
          >
            View all results →
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
