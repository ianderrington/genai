import React from 'react';
import FloatingShareButton from './FloatingShareButton';

interface ShareButtonProps {
  title: string;
  description?: string;
  tags?: string[];
  shareBlurbs?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
  isCompact?: boolean;
  isAlwaysVisible?: boolean;
}

const ShareButton: React.FC<ShareButtonProps> = ({ 
  title,
  description = '',
  tags = [],
  shareBlurbs = {},
  isCompact = false,
  isAlwaysVisible = false
}) => {
  return (
    <FloatingShareButton
      title={title}
      description={description}
      tags={tags}
      shareBlurbs={shareBlurbs}
      isAlwaysVisible={isAlwaysVisible}
    />
  );
};

export default ShareButton; 