'use client';

import React, { useState } from 'react';
import { MediaButton as MediaButtonType } from '../lib/mediaUtils';
import { YouTubeEmbed, SoundCloudEmbed } from './shared/MediaEmbeds';

interface MediaButtonProps {
  button: MediaButtonType;
}

export default function MediaButton({ button }: MediaButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMedia = () => {
    setIsOpen(!isOpen);
  };

  const renderMedia = () => {
    if (!isOpen) return null;

    switch (button.type) {
      case 'video':
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-full max-w-4xl mx-4">
              <button
                onClick={toggleMedia}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                Close
              </button>
              <div className="aspect-video relative">
                <YouTubeEmbed
                  url={button.url}
                  options={button.options}
                />
              </div>
            </div>
          </div>
        );
      case 'sound':
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-full max-w-2xl mx-4">
              <button
                onClick={toggleMedia}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                Close
              </button>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <SoundCloudEmbed
                  url={button.url}
                  options={button.options?.soundOptions}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <button
        onClick={toggleMedia}
        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {button.icon && (
          <span className="mr-2">
            <i className={button.icon} />
          </span>
        )}
        {button.label}
      </button>
      {renderMedia()}
    </>
  );
} 