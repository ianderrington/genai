import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ChatSegmentMetadata } from '@/lib/content/markdown';
type ChatSegmentType = string;

interface TypedContentProps {
  content: string;
  isDark: boolean;
  metadata?: {
    type?: ChatSegmentType;
    storyControl?: {
      action: 'stop' | 'pause' | 'continue';
      duration?: number;
    };
    style?: {
      background?: string;
      textColor?: string;
    };
  };
}

export const TypedContent: React.FC<TypedContentProps> = ({
  content,
  isDark,
  metadata
}) => {
  // Skip rendering if this is a story control segment
  if (metadata?.storyControl) {
    return null;
  }

  const type = metadata?.type || 'narrative';
  const isR7 = type === 'r7';
  const isWarning = type.startsWith('warning-');
  const isNarrative = type === 'narrative';

  // Get background and text colors
  let bgColor = '';
  let textColor = '';
  let borderColor = '';
  let icon = '';

  switch (type) {
    case 'warning-ferromagnetic':
      bgColor = 'bg-yellow-100 dark:bg-yellow-900/30';
      textColor = 'text-yellow-800 dark:text-yellow-200';
      borderColor = 'border-yellow-500';
      icon = '⚠️';
      break;
    case 'warning-magnetic':
      bgColor = 'bg-red-100 dark:bg-red-900/30';
      textColor = 'text-red-800 dark:text-red-200';
      borderColor = 'border-red-500';
      icon = '⚠️';
      break;
    case 'warning-neural':
      bgColor = 'bg-purple-100 dark:bg-purple-900/30';
      textColor = 'text-purple-800 dark:text-purple-200';
      borderColor = 'border-purple-500';
      icon = '⚠️';
      break;
    case 'era':
      bgColor = 'bg-blue-100 dark:bg-blue-900/30';
      textColor = 'text-blue-800 dark:text-blue-200';
      borderColor = 'border-blue-500';
      break;
    case 'r7':
      bgColor = 'bg-blue-100 dark:bg-blue-900/30';
      textColor = 'text-blue-800 dark:text-blue-200';
      break;
    default:
      bgColor = isDark ? 'bg-gray-800/50' : 'bg-gray-100';
      textColor = isDark ? 'text-gray-200' : 'text-gray-900';
  }

  return (
    <div className={`w-full flex ${isR7 ? 'justify-end' : 'justify-start'} mb-6`}>
      {/* Avatar for R7 */}
      {isR7 && (
        <div className="order-2 ml-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold shadow-md">
            R7
          </div>
        </div>
      )}

      {/* Message bubble */}
      <div 
        className={`
          max-w-3xl p-4 rounded-2xl shadow-sm
          ${isR7 ? 'order-1' : ''}
          ${bgColor} ${textColor}
          ${isWarning ? `border-l-4 ${borderColor}` : ''}
          ${isR7 ? 'rounded-tr-none' : isNarrative ? 'rounded-2xl' : 'rounded-tl-none'}
          ${isWarning ? 'font-medium' : ''}
        `}
      >
        {/* Warning icon and title */}
        {isWarning && (
          <div className="flex items-center gap-2 mb-2 font-bold">
            <span className="text-lg">{icon}</span>
            <span>WARNING</span>
          </div>
        )}

        {/* Speaker name for R7 */}
        {isR7 && (
          <div className="font-semibold text-sm mb-1 text-blue-500">
            R-7
          </div>
        )}

        {/* Message content */}
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </div>
    </div>
  );
};