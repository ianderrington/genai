'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils/dates';
import SocialShare from './SocialShare';
import { BlogPostProps } from '@/lib/getBlogPosts';

interface BlogCardProps {
  post: BlogPostProps;
  compact?: boolean;
  showDate?: boolean;
}

export default function BlogCard({ post, compact = false, showDate = true }: BlogCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  // Construct URL from post slug
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/${post.slug}`;

  return (
    <div className="card-wrapper">
      <div
        className="post-card w-full relative group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Link href={url} className="block">
          <div className="post-card-content h-full">
            <h3 className="post-card-title">{post.title}</h3>
            {!compact && post.excerpt && (
              <p className="post-card-description">{post.excerpt}</p>
            )}
            <div className="text-sm mt-auto text-gray-400">
              {showDate && post.date && (
                <span className="post-card-date">{formatDate(post.date)}</span>
              )}
              {post.categories && post.categories.length > 0 && (
                <span className={`text-xs ${showDate ? 'ml-4' : ''}`}>
                  {post.categories.join(', ')}
                </span>
              )}
            </div>
          </div>
        </Link>

        <div className="card-share-button absolute top-2 right-2">
          <SocialShare
            title={post.title}
            description={post.description || post.excerpt}
            tags={post.tags}
            shareBlurbs={post.shareBlurbs}
            isCompact={true}
            url={url}
          />
        </div>
      </div>
    </div>
  );
} 