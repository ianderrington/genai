import React, { useEffect, useState } from 'react';
import { StoryConfig } from '@/types/story-config';

interface ChatBubbleProps {
  content: string;
  isVisible: boolean;
  config: StoryConfig;
  sectionNumber: number;
  totalSections: number;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  content,
  isVisible,
  config,
  sectionNumber,
  totalSections,
}) => {
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAppeared) {
      setHasAppeared(true);
    }
  }, [isVisible, hasAppeared]);

  return (
    <div 
      className={`
        chat-bubble 
        ${hasAppeared ? 'animate-fade-in' : 'opacity-0'}
        ${isVisible ? 'visible' : 'hidden'}
      `}
      style={{
        '--transition-speed': `${config.transitionSpeed}ms`,
      } as React.CSSProperties}
      role="article"
    >
      {config.progress.showSectionNumbers && (
        <div className="section-number">
          {sectionNumber + 1}/{totalSections}
        </div>
      )}
      <div 
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}; 