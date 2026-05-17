'use client';

import React, { useState, useEffect } from 'react';

interface SidenoteProps {
  id: string;
  number: number;
  children: React.ReactNode;
}

type DisplayMode = 'margin' | 'tooltip' | 'inline';

export default function Sidenote({ id, number, children }: SidenoteProps) {
  const [mode, setMode] = useState<DisplayMode>('margin');
  const [expanded, setExpanded] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    const updateMode = () => {
      const width = window.innerWidth;
      if (width >= 1280) setMode('margin');
      else if (width >= 768) setMode('tooltip');
      else setMode('inline');
    };
    updateMode();
    window.addEventListener('resize', updateMode);
    return () => window.removeEventListener('resize', updateMode);
  }, []);

  // Desktop: margin note
  if (mode === 'margin') {
    return (
      <span className="sidenote-wrapper" data-sidenote-rendered={id}>
        <sup className="sidenote-ref">{number}</sup>
        <span className="sidenote-margin" role="note" aria-label={`Sidenote ${number}`}>
          <span className="sidenote-number">{number}</span>
          {children}
        </span>
      </span>
    );
  }

  // Tablet: hover tooltip
  if (mode === 'tooltip') {
    return (
      <span
        className="sidenote-wrapper sidenote-tooltip-trigger"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <sup className="sidenote-ref sidenote-ref-interactive">{number}</sup>
        {tooltipVisible && (
          <span className="sidenote-tooltip" role="tooltip">
            {children}
          </span>
        )}
      </span>
    );
  }

  // Mobile: tap-to-expand inline
  return (
    <span className="sidenote-wrapper sidenote-inline-trigger">
      <sup
        className="sidenote-ref sidenote-ref-interactive"
        onClick={() => setExpanded(!expanded)}
        role="button"
        aria-expanded={expanded}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setExpanded(!expanded);
        }}
      >
        {number}
      </sup>
      {expanded && (
        <span className="sidenote-inline" role="note">
          {children}
        </span>
      )}
    </span>
  );
}
