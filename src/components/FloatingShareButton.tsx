'use client';

import { useEffect, useState } from 'react';
import { useFloatingVisibility } from '@supernal/docs-kit';
import SocialShare from './SocialShare';

interface FloatingShareButtonProps {
  title: string;
  description?: string;
  tags?: string[];
  shareBlurbs?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    medium?: string;
    substack?: string;
  };
  isAlwaysVisible?: boolean;
  url?: string;
  isCollection?: boolean;
  fullContent?: string;
  htmlContent?: string;
  coverImage?: string;
}

function FloatingShareButton({
  title,
  description = '',
  tags = [],
  shareBlurbs = {},
  isAlwaysVisible = false,
  url,
  isCollection = false,
  fullContent = '',
  htmlContent = '',
  coverImage = ''
}: FloatingShareButtonProps) {
  const { isVisible, behavior } = useFloatingVisibility({
    scrollThreshold: 100,
    mobileTimeout: 3000,
    behavior: 'fade',
    alwaysVisible: isAlwaysVisible,
    onlyShowAtBottom: isCollection
  });
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  return (
    <div 
      className={`
        fixed bottom-12 lg:right-[calc(50%-32rem)] 
        right-4 z-50
        transition-all duration-300 ease-in-out 
        ${behavior === 'slide' 
          ? (isVisible ? 'translate-y-0' : 'translate-y-full')
          : (isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none')
        }
      `}
    >
      <SocialShare
        title={title}
        description={description}
        tags={tags}
        shareBlurbs={shareBlurbs}
        isCircular={true}
        isCompact={true}
        isAlwaysVisible={isAlwaysVisible}
        url={url}
        fullContent={fullContent}
        htmlContent={htmlContent}
        coverImage={coverImage}
      />
    </div>
  );
}

export default FloatingShareButton; 