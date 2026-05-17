'use client';

import React from 'react';
// Import the data type
import { ChatSegmentData } from '@/lib/content';

interface ChatRendererProps {
  // Expect ChatSegmentData objects
  segments: ChatSegmentData[]; 
  isDark: boolean;
}

const ChatRenderer: React.FC<ChatRendererProps> = ({ 
  segments,
  isDark
}) => {
  let stopRendering = false;
  
  return (
    <div className="space-y-4 px-2 chat-renderer-container">
      {segments.map((segment, index) => { // Now segment is ChatSegmentData
        if (stopRendering) return null; 

        // --- Use Pre-parsed Metadata --- 
        const { metadata, content: segmentHtml } = segment;

        // Handle stop action from metadata
        if (metadata.storyControl?.action === 'stop') {
          stopRendering = true;
          return null; // Don't render the stop segment itself
        }

        // Handle sound directive from metadata
        if (metadata.sound) {
          // TODO: Implement sound playback using metadata.sound path
          console.log('Sound directive found:', metadata.sound);
          // Decide if sound directive segments should render content or not
          // If they shouldn't render content, return null here.
          // return null; 
        }
        
        // --- End Metadata Handling ---

        // If it wasn't a directive that prevents rendering, render the segment content
        return (
          <div 
            key={index}
            // TODO: Apply styling based on metadata.type or metadata.style if needed
            className="chat-bubble prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: segmentHtml }} // Use segment.content
          />
        );
      })}
    </div>
  );
};

export default ChatRenderer;