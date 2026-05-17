'use client';

import React from 'react';
import Link from 'next/link';
// Removed unused usePathname
// import { usePathname } from 'next/navigation';

// Update the BreadcrumbProps interface to accept the new structure
interface BreadcrumbItem {
  name: string;
  href?: string; // Allow href to be optional
}

interface BreadcrumbProps {
  path: BreadcrumbItem[];
}

const truncateText = (text: string, maxLength: number) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  // For very long texts, keep the start and end
  if (maxLength > 30) {
    const start = text.slice(0, Math.floor(maxLength/2));
    const end = text.slice(text.length - Math.floor(maxLength/4));
    return `${start}...${end}`;
  }
  
  return `${text.slice(0, maxLength)}...`;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path }) => {
  // No need to use pathname here if path provides full info
  // const pathname = usePathname();
  // const section = pathname?.split('/').filter(Boolean)[0] || '';
  // if (!section) return null;

  // Check if the path array is empty
  if (!path || path.length === 0) {
    return null; // Don't render if no path items are provided
  }

  // Determine which items to show
  const itemsToShow = path.length <= 2 ? path : [
    // Ellipsis placeholder for hidden items (only if more than 2 items)
    { name: '...', href: undefined },
    // Penultimate item (second to last)
    path[path.length - 2],
    // Last item (current page)
    path[path.length - 1]
  ];

  // Handle keyboard navigation for links
  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-nav text-sm font-medium text-gray-500 dark:text-gray-400">
      <ol className="list-none p-0 inline-flex space-x-2 flex-wrap"> {/* Added flex-wrap for responsiveness */}
        {itemsToShow.map((item, index) => {
          // Use a more robust key combining href/name and index
          const key = `${item.name || 'item'}-${index}`;
          const isLast = index === itemsToShow.length - 1;
          const isEllipsis = item.name === '...';
          
          // Different truncation lengths based on position and screen size
          let displayName = item.name || '';
          if (isLast) {
            displayName = truncateText(displayName, 50); // Last item gets more space
          } else if (!isEllipsis) {
            displayName = truncateText(displayName, 20); // Other items are shorter
          }

          return (
            <li key={key} className="flex items-center min-w-0">
              {index > 0 && (
                <span className="mx-2 flex-shrink-0 text-gray-400 dark:text-gray-500" aria-hidden="true">/</span>
              )}
              {isLast || isEllipsis || typeof item.href !== 'string' || !item.href ? (
                // Render as text if it's the last item OR if href is not a valid, non-empty string
                <span
                  className={`${
                    isLast ? 'text-gray-700 dark:text-gray-200 font-semibold' : ''
                  } ${isEllipsis ? 'text-gray-500 dark:text-gray-500' : 'capitalize'} truncate`}
                  aria-current={isLast ? 'page' : undefined}
                  title={isEllipsis ? 'Hidden path items' : item.name}
                >
                  {displayName}
                </span>
              ) : (
                // Render as a link only if it's not the last item AND href is a non-empty string
                <Link
                  href={item.href} // We know item.href is a string here
                  className={`
                    hover:text-gray-700 dark:hover:text-gray-300 
                    focus:text-gray-700 dark:focus:text-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                    focus:bg-blue-50 dark:focus:bg-gray-700
                    capitalize truncate rounded px-1 py-0.5 -mx-1 -my-0.5
                    transition-all duration-200
                    touch-manipulation
                  `}
                  title={item.name}
                  tabIndex={0}
                  role="link"
                  aria-label={`Navigate to ${item.name}`}
                  onKeyDown={(e) => handleKeyDown(e, item.href!)}
                >
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb; 