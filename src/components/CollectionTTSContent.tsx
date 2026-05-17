'use client';

import React, { useRef, useEffect } from 'react';
import SafeHTML from './SafeHTML';

declare global {
  interface Window {
    SupernalTTSInstance?: { setupWidget: (el: HTMLElement) => void };
  }
}

interface CollectionTTSContentProps {
  html: string;
  content: string;
  tts?: {
    enabled?: boolean;
    voice?: string;
    voices?: string[];
    provider?: string;
    speed?: number;
    enableSpeed?: boolean;
    enableProgress?: boolean;
  };
  title?: string;
  isIndex?: boolean;
  hide?: string[];
}

export default function CollectionTTSContent({
  html,
  content,
  tts,
  title,
  isIndex,
  hide,
}: CollectionTTSContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tts?.enabled || !containerRef.current) return;
    const el = containerRef.current;

    // The TTS widget has two init paths:
    // 1. Initial querySelectorAll scan — fires before SafeHTML populates content
    // 2. MutationObserver on addedNodes — only for NEW nodes, not attribute changes
    //
    // On collection pages, the div exists from SSR (hydrated, not added new),
    // so the observer never fires. The initial scan finds empty text and skips.
    // Fix: wait for SafeHTML to populate content, add the class, then
    // directly call the widget's setupWidget API.
    const initTTS = () => {
      if (el.textContent && el.textContent.trim().length > 0) {
        el.classList.add('supernal-tts-widget');
        if (window.SupernalTTSInstance) {
          window.SupernalTTSInstance.setupWidget(el);
        }
      } else {
        requestAnimationFrame(initTTS);
      }
    };
    requestAnimationFrame(initTTS);
  }, [html, tts?.enabled]);

  return (
    <div
      ref={containerRef}
      className="post-content prose prose-lg dark:prose-invert"
      data-text={tts?.enabled ? content : undefined}
      data-voice={tts?.voice}
      data-voices={tts?.voices?.join(',')}
      data-provider={tts?.provider}
      data-speed={tts?.speed}
      data-enable-speed={tts?.enableSpeed ? 'true' : undefined}
      data-enable-progress={tts?.enableProgress ? 'true' : undefined}
    >
      {title && !isIndex && !hide?.includes('title') && (
        <h1 className="text-3xl md:text-4xl font-bold mb-6 font-display">{title}</h1>
      )}
      <SafeHTML html={html} />
    </div>
  );
}
