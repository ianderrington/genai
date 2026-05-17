'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Post } from '@/lib/content';
import SafeImage from '../SafeImage';
import { Clock, Star, TrendingUp, ArrowRight } from 'lucide-react';

interface FeaturedPostsProps {
  title: string;
  description?: string;
  categories: {
    kids_corner: any;
    cerebral_songs: any;
    fiction: any;
    projects: any;
  };
  posts: Record<string, Post[]>;
}

type SortOption = 'recent' | 'popular' | 'recommended';

// Map of sort option to icon
const sortIcons: Record<string, React.FC<any>> = {
  recent: Clock,
  popular: TrendingUp,
  recommended: Star,
};

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({
  title,
  categories,
  posts
}) => {
  const [sortOption, setSortOption] = useState<SortOption>('recent');

  // Combine all posts from different categories
  const getAllPosts = () => {
    let allPosts: Post[] = [];
    Object.values(posts).forEach(categoryPosts => {
      allPosts = [...allPosts, ...categoryPosts];
    });
    return sortPosts(allPosts, sortOption);
  };

  const sortPosts = (postsToSort: Post[], option: SortOption): Post[] => {
    const sorted = [...postsToSort];

    switch (option) {
      case 'recent':
        return sorted.sort((a, b) => {
          const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
          const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;
          return dateB - dateA;
        });

      case 'popular':
        return sorted.sort((a, b) => {
          const viewsA = typeof a.metadata.views !== 'undefined' ? Number(a.metadata.views) : Math.random() * 100;
          const viewsB = typeof b.metadata.views !== 'undefined' ? Number(b.metadata.views) : Math.random() * 100;
          return viewsB - viewsA;
        });

      case 'recommended':
        return sorted.sort((a, b) => {
          const scoreA = typeof a.metadata.recommendationScore !== 'undefined' ? Number(a.metadata.recommendationScore) : Math.random() * 100;
          const scoreB = typeof b.metadata.recommendationScore !== 'undefined' ? Number(b.metadata.recommendationScore) : Math.random() * 100;
          return scoreB - scoreA;
        });

      default:
        return sorted;
    }
  };

  const getPostImage = (post: Post) => {
    // Logic to determine the post image
    if (post.metadata.coverImage) {
      // Handle both string and object formats for coverImage
      if (typeof post.metadata.coverImage === 'string') {
        return ensureAbsolutePath(post.metadata.coverImage, post.slug);
      } else if (typeof post.metadata.coverImage === 'object' && 'url' in post.metadata.coverImage) {
        return ensureAbsolutePath(post.metadata.coverImage.url, post.slug);
      }
    }

    // Default images based on category - use absolute paths
    const defaults = {
      kids_corner: '/images/default-musings.jpg',
      cerebral_songs: '/images/default-musings.jpg',
      fiction: '/images/default-fiction.jpg',
      projects: '/images/default-projects.jpg',
    };

    // Try to determine category from slug
    if (post.slug.includes('wise_songs') && post.slug.includes('cerebral_songs')) {
      return defaults.cerebral_songs;
    } else if (post.slug.includes('wise_songs')) {
      return defaults.kids_corner;
    }
    
    for (const cat of Object.keys(defaults)) {
      if (post.slug.startsWith(cat)) {
        return defaults[cat as keyof typeof defaults];
      }
    }

    return '/images/default-post.jpg';
  };

  // Helper function to ensure image paths are absolute
  const ensureAbsolutePath = (imagePath: string, postSlug: string): string => {
    if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
      return imagePath;
    }

    const slugParts = postSlug.split('/');
    slugParts.pop();
    const slugDir = slugParts.join('/');

    return `/docs/${slugDir}/${imagePath}`;
  };

  return (
    <section className="py-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with centered title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {title}
          </h2>

          <div className="flex items-center justify-center">
            {/* Sort Options only */}
            <div className="inline-flex rounded-md overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
              {(Object.keys(sortIcons) as SortOption[]).map((option) => {
                const Icon = sortIcons[option];

                return (
                  <button
                    key={option}
                    onClick={() => setSortOption(option)}
                    className={`
                      py-2 px-4 text-sm font-medium flex items-center space-x-2
                      ${sortOption === option
                        ? 'bg-gray-800 dark:bg-gray-800 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}
                      border-r border-gray-200 dark:border-gray-700 last:border-r-0
                      transition-all duration-200
                    `}
                    aria-current={sortOption === option ? 'page' : undefined}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="capitalize">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sortOption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Grid Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getAllPosts().slice(0, 6).map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  getPostImage={getPostImage}
                />
              ))}
            </div>

            {/* View All Link */}
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline"
              >
                View all posts
                <ArrowRight className="ml-1 w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// Helper function to determine content type from post
const getContentType = (post: Post): 'music' | 'writing' | 'project' | 'fiction' | 'research' | 'essay' => {
  // Frontmatter contentType takes priority
  const ct = post.metadata.contentType;
  if (ct === 'research' || ct === 'essay') return ct;

  if (post.slug.includes('wise_songs') || post.slug.includes('cerebral_songs')) {
    return 'music';
  }
  if (post.slug.startsWith('projects/')) {
    return 'project';
  }
  if (post.slug.startsWith('fiction/')) {
    return 'fiction';
  }
  if (post.slug.startsWith('about/research/')) {
    return 'research';
  }
  return 'writing';
};

// Helper function to get type indicator styling
const getTypeIndicatorStyle = (type: 'music' | 'writing' | 'project' | 'fiction' | 'research' | 'essay') => {
  const styles = {
    music: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50',
    writing: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50',
    project: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700/50',
    fiction: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700/50',
    research: 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-700/50',
    essay: 'bg-stone-100 text-stone-800 border-stone-200 dark:bg-stone-900/30 dark:text-stone-300 dark:border-stone-700/50'
  };
  return styles[type];
};

// Post Card component
const PostCard = ({ post, getPostImage }: { post: Post, getPostImage: (post: Post) => string }) => {
  const contentType = getContentType(post);
  
  return (
    <Link href={`/${post.slug}`} className="group block h-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow transition-all duration-300 overflow-hidden h-full border border-gray-100 dark:border-gray-700">
        <div className="relative h-40 overflow-hidden">
          <SafeImage
            src={getPostImage(post)}
            alt={post.metadata.title}
            width={400}
            height={250}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        </div>
        <div className="p-3 flex-grow flex flex-col">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {post.metadata.title}
          </h4>
          {post.metadata.description && (
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
              {post.metadata.description}
            </p>
          )}
          <div className="mt-auto space-y-2">
            <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getTypeIndicatorStyle(contentType)}`}>
              {contentType.toUpperCase()}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {post.metadata.date && new Date(post.metadata.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <span className="text-primary-600 dark:text-primary-400 text-xs font-medium">
                Read more
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPosts; 