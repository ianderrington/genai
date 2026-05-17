'use client';

import React from 'react';
import Link from 'next/link';
import SafeImage from './SafeImage';
import { formatDate } from '@/lib/utils/dates';
import SocialShare from './SocialShare';
import { Post } from '@/lib/content';
import { DEFAULT_IMAGES } from '@/lib/constants';
import { markdownToHtml } from '@/lib/content/markdown';

interface CoverImage {
  url: string;
  alt?: string;
  caption?: string;
}

interface PostCardProps {
  post: Post;
  section: string;
  showDate?: boolean;
  imagePath: string | null;
  priority?: boolean;
}

export default function PostCard({ post, section, showDate = true, imagePath, priority = false }: PostCardProps) {
  const { title, description, date, tags } = post.metadata;
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : null;

  const showTags = section === 'blog' && tags && tags.length > 0;
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/${post.slug}`;

  return (
    <div className="post-card group">
      <Link href={`/${post.slug}`} className="block h-full">
        <div className="image-container">
          <SafeImage
            src={imagePath || ''}
            alt={title}
            width={300}
            height={200}
            className="object-cover"
            priority={priority}
          />
        </div>
        <div className="content">
          <h3 className="title">{title}</h3>
          {showDate && formattedDate && (
            <span className="date">{formattedDate}</span>
          )}
          {description && (
            <p className="description">{description}</p>
          )}
          {showTags && (
            <div className="tags">
              {tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
              {tags.length > 3 && (
                <span className="tag">+{tags.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </Link>
      <div className="card-share-button">
        <SocialShare
          title={title}
          description={description}
          tags={showTags ? tags : undefined}
          isCircular={true}
          isCompact={true}
          url={url}
        />
      </div>
    </div>
  );
} 