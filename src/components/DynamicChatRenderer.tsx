'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
// Import the type for chat segment data
import { ChatSegmentData } from '@/lib/content';

// Import the base ChatRenderer
const BaseChatRenderer = dynamic(() => import('./ChatRenderer'), { ssr: false });

export interface DynamicChatRendererProps {
  // content prop might not be needed anymore if segments are passed directly
  // content?: string; 
  chatSegments: ChatSegmentData[]; // Expect pre-processed segments
  config?: any;  // Keep for compatibility but ignore for now
}

function DynamicChatRenderer({
  chatSegments,
}: DynamicChatRendererProps) {
  // Remove state for segments and loading, as segments are passed directly
  // const [segments, setSegments] = useState<string[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Remove useEffect for client-side splitting
  // useEffect(() => { ... });

  // Remove loading indicator if segments are passed directly and guaranteed to be present
  // if (isLoading) { ... }
  
  // Check if segments exist and are valid before rendering
  if (!chatSegments || chatSegments.length === 0) {
    // Optionally return null or a placeholder if no segments are provided
    return <div>No chat content available.</div>; 
  }

  // Pass the pre-processed segments (ChatSegmentData[]) to BaseChatRenderer
  // We assume BaseChatRenderer can handle this structure. If not, adjust mapping here.
  return (
    <BaseChatRenderer
      segments={chatSegments} // Pass ChatSegmentData[]
      isDark={isDark}
    />
  );
}

export default DynamicChatRenderer;