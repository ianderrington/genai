'use client';

import React from 'react';
import Link from 'next/link';
import SafeImage from './SafeImage';
import SocialShare from './SocialShare';
import { Post } from '@/lib/content';
import { DEFAULT_IMAGES } from '@/lib/constants';
import { markdownToHtml } from '@/lib/content/markdown';

interface CoverImage {
  url: string;
  alt?: string;
  caption?: string;
}

interface FolderCardProps {
  item: {
    slug: string;
    fullSlug: string;
    posts: Post[];
    indexPost?: Post;
  };
  section: string;
  defaultImage: string;
}

export default function FolderCard({ item, section, defaultImage, priority = false }: FolderCardProps & { priority?: boolean }) {
  const [excerptHtml, setExcerptHtml] = React.useState<string>('');
  const folderTitle = item.indexPost?.metadata.title || 
    item.slug.charAt(0).toUpperCase() + item.slug.slice(1).replace(/-/g, ' ');
  
  const postCount = item.posts.length;
  const folderExcerpt = item.indexPost?.excerpt || item.indexPost?.metadata.description;
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/${item.fullSlug}`;
  
  // Get image path from coverImage first, then fall back to image
  const coverImage = item.indexPost?.metadata.coverImage;
  const imagePath = coverImage 
    ? (typeof coverImage === 'string' ? coverImage : coverImage.url)
    : (item.indexPost?.metadata.image || defaultImage);

  React.useEffect(() => {
    if (folderExcerpt) {
      markdownToHtml(folderExcerpt).then(html => {
        setExcerptHtml(html);
      });
    }
  }, [folderExcerpt]);

  // Handle relative paths
  const finalImagePath = (() => {
    if (!imagePath) {
      return defaultImage;
    }

    // If the image path is already absolute or a URL, return it as is
    if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
      return imagePath;
    }

    // Remove any './' prefix from the image path
    const cleanImagePath = imagePath.replace(/^\.\//, '');

    // For relative paths in a post's directory, use the full slug with /docs/ prefix
    return `/docs/${item.fullSlug}/${cleanImagePath}`;
  })();

  // Get the alt text from coverImage if it's an object, otherwise use the folder title
  const imageAlt = typeof coverImage === 'object' && coverImage?.alt 
    ? coverImage.alt 
    : folderTitle;

  return (
    <div className="folder-card folder-card-stacked w-full h-full relative group">
      <Link href={`/${item.fullSlug}`} className="block h-full">
        <div className="folder-card-image-container">
          <div className="folder-card-stack-effect"></div>
          <SafeImage 
            src={finalImagePath}
            alt={imageAlt || 'Collection image'}
            fill={true}
            className="folder-card-image"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="folder-card-content">
          <h3 className="folder-card-title">{folderTitle}</h3>
          {excerptHtml && (
            <div 
              className="folder-card-description"
              dangerouslySetInnerHTML={{ __html: excerptHtml }}
            />
          )}
          <div className="folder-card-action">
            <span>Browse {postCount} {postCount === 1 ? 'post' : 'posts'}</span>
            <span className="folder-card-arrow">→</span>
          </div>
        </div>
      </Link>
      
      <div className="card-share-button">
        <SocialShare
          title={folderTitle}
          description={folderExcerpt}
          tags={item.indexPost?.metadata.tags}
          isCircular={true}
          isCompact={true}
          url={url}
        />
      </div>
    </div>
  );
} 