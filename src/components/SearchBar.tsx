import React from 'react';
import { Post } from '@/lib/content';
import Link from 'next/link';
import { getBlogUrl } from '@/lib/urlUtils';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  posts: Post[];
  className?: string;
  isMobile?: boolean;
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ posts, className, isMobile = false, onClose }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Use ref to persist search term across re-renders caused by posts loading
  const searchTermRef = React.useRef('');
  const isUserTypingRef = React.useRef(false);

  // Update ref whenever searchTerm changes
  React.useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm]);

  // Prevent search term from being reset when posts are loaded
  const postsLengthRef = React.useRef(posts.length);
  React.useEffect(() => {
    // Only update if posts array changed (loaded), we have a persisted search term, and user is not currently typing
    if (posts.length !== postsLengthRef.current && 
        searchTermRef.current && 
        searchTerm !== searchTermRef.current && 
        !isUserTypingRef.current) {
      setSearchTerm(searchTermRef.current);
    }
    postsLengthRef.current = posts.length;
  }, [posts, searchTerm]);

  // Handle keyboard shortcut
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
          searchTermRef.current = '';
        } else {
          setIsMobileSearchOpen(false);
          setSearchTerm('');
          searchTermRef.current = '';
          if (onClose) onClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  // Handle clicks outside search to collapse it
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        if (window.innerWidth < 768) {
          setIsMobileSearchOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when component is mounted in mobile mode
  React.useEffect(() => {
    if ((isMobile || isMobileSearchOpen) && inputRef.current) {
      // Small delay to ensure the input is properly rendered
      const timeoutId = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          // Also set cursor to end of existing text if any
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isMobile, isMobileSearchOpen]);

  // Handle Enter key press to navigate to search page
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      e.preventDefault();
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsExpanded(false);
      setIsMobileSearchOpen(false);
      if (onClose) onClose();
    }
  };

  // Updated search term handler to also update the ref
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    isUserTypingRef.current = true;
    setSearchTerm(newValue);
    searchTermRef.current = newValue;
    
    // Reset typing flag after a delay
    setTimeout(() => {
      isUserTypingRef.current = false;
    }, 500);
  };

  // Search results with a limit
  const searchResults = React.useMemo(() => {
    if (!searchTerm.trim() || !Array.isArray(posts)) return [];
    
    // Make sure we have posts to search through
    console.log(`SearchBar: Searching through ${posts.length} posts for: "${searchTerm}"`);
    
    const query = searchTerm.toLowerCase().trim();
    
    // Simply find ANY posts that contain the search term anywhere
    // This ensures we don't miss anything, prioritizing recall over precision
    return posts
      .filter(post => {
        if (!post || !post.metadata) return false;
        
        const title = (post.metadata.title || '').toLowerCase();
        const description = (post.metadata.description || '').toLowerCase();
        const content = (post.content || '').toLowerCase();
        const excerpt = (post.excerpt || '').toLowerCase();
        const tags = Array.isArray(post.metadata.tags) 
          ? post.metadata.tags.map(tag => (tag || '').toLowerCase()).join(' ')
          : '';
          
        // Check for matches anywhere in post data
        return (
          title.includes(query) ||
          description.includes(query) ||
          content.includes(query) ||
          excerpt.includes(query) ||
          tags.includes(query)
        );
      })
      .slice(0, 5); // Limit to 5 results in dropdown for better UX
  }, [posts, searchTerm]);

  // Mobile search button
  const mobileSearchButton = (
    <button
      onClick={() => setIsMobileSearchOpen(true)}
      className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label="Search"
    >
      <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
    </button>
  );

  // Handle search form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsExpanded(false);
      setIsMobileSearchOpen(false);
      if (onClose) onClose();
    }
  };

  // Handle clear search with ref update
  const handleClearSearch = () => {
    setSearchTerm('');
    searchTermRef.current = '';
    if (onClose) onClose();
  };

  // Mobile search overlay
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
                onChange={handleSearchTermChange}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="w-full px-4 py-3 pl-10 rounded-lg
                  bg-gray-800
                  border border-gray-700
                  text-white
                  placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition-all duration-200"
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
                onClick={() => {
                  setIsMobileSearchOpen(false);
                  setSearchTerm('');
                  searchTermRef.current = '';
                  if (onClose) onClose();
                }}
                className="ml-2 p-3 text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>
        </form>

        {/* Mobile search results */}
        <div className="flex-1 overflow-y-auto bg-gray-800 rounded-lg">
          {searchResults.length > 0 ? (
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              {searchResults.map((post) => (
                <Link
                  key={post.slug}
                  href={getBlogUrl(post)}
                  className="block px-4 py-3 text-sm border-b border-gray-700 hover:bg-gray-700/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileSearchOpen(false);
                    setSearchTerm('');
                    searchTermRef.current = '';
                    if (onClose) onClose();
                  }}
                >
                  <div className="font-medium text-gray-200">{post.metadata.title}</div>
                  {post.excerpt && (
                    <div className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {post.excerpt.replace(/<[^>]*>/g, '')}
                    </div>
                  )}
                </Link>
              ))}
              <Link
                href={`/search?q=${encodeURIComponent(searchTerm)}`}
                className="block px-4 py-3 text-sm text-blue-300 hover:bg-gray-700/50 font-medium text-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileSearchOpen(false);
                  if (onClose) onClose();
                }}
              >
                View all results →
              </Link>
            </div>
          ) : (
            searchTerm ? (
              <div className="px-4 py-8 text-gray-400 text-center">
                No results found
              </div>
            ) : (
              <div className="px-4 py-8 text-gray-400 text-center">
                Type to search...
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  // Desktop search
  return (
    <div className={`relative group ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <div className={`flex items-center transition-all duration-200 ease-in-out ${isExpanded ? 'w-96' : 'w-10'}`}>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
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
          {searchResults.map((post) => (
            <Link
              key={post.slug}
              href={getBlogUrl(post)}
              className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0"
              onClick={(e) => {
                e.stopPropagation();
                setSearchTerm('');
                searchTermRef.current = '';
                setIsExpanded(false);
              }}
            >
              <div className="font-medium text-gray-900 dark:text-gray-100">{post.metadata.title}</div>
              {post.excerpt && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {post.excerpt.replace(/<[^>]*>/g, '')}
                </div>
              )}
            </Link>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(searchTerm)}`}
            className="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
            onClick={(e) => {
              e.stopPropagation();
              setSearchTerm('');
              searchTermRef.current = '';
              setIsExpanded(false);
            }}
          >
            View all results →
          </Link>
        </div>
      )}
    </div>
  );
}

export default SearchBar; 