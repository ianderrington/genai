'use client';

import React from 'react';
import { BlogPostProps } from '@/lib/getBlogPosts';

interface TagFilterProps {
  posts: BlogPostProps[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onClearFilters: () => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ 
  posts, 
  selectedTags, 
  onTagSelect, 
  onClearFilters 
}) => {
  // Extract all unique tags from posts
  const allTags = React.useMemo(() => {
    if (!Array.isArray(posts)) return [];
    
    const tagSet = new Set<string>();
    
    posts.forEach(post => {
      if (post?.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => {
          if (tag) tagSet.add(tag);
        });
      }
    });
    
    return Array.from(tagSet).sort();
  }, [posts]);
  
  // Count posts for each tag
  const tagCounts = React.useMemo(() => {
    if (!Array.isArray(posts)) return {};
    
    const counts: Record<string, number> = {};
    
    posts.forEach(post => {
      if (post?.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => {
          if (tag) counts[tag] = (counts[tag] || 0) + 1;
        });
      }
    });
    
    return counts;
  }, [posts]);
  
  // Extract all unique sections from posts
  const allSections = React.useMemo(() => {
    if (!Array.isArray(posts)) return [];
    
    const sectionSet = new Set<string>();
    
    posts.forEach(post => {
      if (post?.sectionName) {
        sectionSet.add(post.sectionName);
      }
    });
    
    return Array.from(sectionSet).sort();
  }, [posts]);
  
  // Count posts for each section
  const sectionCounts = React.useMemo(() => {
    if (!Array.isArray(posts)) return {};
    
    const counts: Record<string, number> = {};
    
    posts.forEach(post => {
      if (post?.sectionName) {
        counts[post.sectionName] = (counts[post.sectionName] || 0) + 1;
      }
    });
    
    return counts;
  }, [posts]);
  
  if (allTags.length === 0 && allSections.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Filter Posts</h2>
        
        {selectedTags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded-full bg-blue-500 text-white flex items-center"
                >
                  {tag}
                  <button 
                    onClick={() => onTagSelect(tag)}
                    className="ml-2 text-white hover:text-blue-200"
                    aria-label={`Remove ${tag} filter`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <button
              onClick={onClearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
        
        {allSections.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Sections</h3>
            <div className="flex flex-wrap gap-2">
              {allSections.map(section => (
                <button
                  key={section}
                  onClick={() => onTagSelect(`section:${section}`)}
                  className={`px-3 py-1 rounded-full text-sm 
                    ${selectedTags.includes(`section:${section}`) 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                  {section} ({sectionCounts[section]})
                </button>
              ))}
            </div>
          </div>
        )}
        
        {allTags.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => onTagSelect(tag)}
                  className={`px-3 py-1 rounded-full text-sm 
                    ${selectedTags.includes(tag) 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                  {tag} ({tagCounts[tag]})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagFilter; 