'use client';

import React from 'react';
import ReactDOM from 'react-dom/client';
import dynamic from 'next/dynamic';
import Warning from './Warning';

// Dynamically import MermaidDiagram with SSR disabled
const MermaidDiagram = dynamic(() => import('./MermaidDiagram'), { 
  ssr: false,
  loading: () => <div className="my-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-center">Loading diagram...</div>
});

interface SafeContentProps {
  html: string;
  className?: string;
}

const SafeContent: React.FC<SafeContentProps> = ({ html, className }) => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!contentRef.current) return;

    // Handle Mermaid diagrams
    const mermaidElements = contentRef.current.querySelectorAll('[data-mermaid]');
    const mermaidRoots: Array<{ root: ReactDOM.Root; container: HTMLElement }> = [];

    mermaidElements.forEach((element) => {
      const chart = decodeURIComponent(element.getAttribute('data-mermaid') || '');
      if (!chart) return;

      const container = document.createElement('div');
      element.replaceWith(container);

      const root = ReactDOM.createRoot(container);
      root.render(<MermaidDiagram chart={chart} />);
      mermaidRoots.push({ root, container });
    });

    // Handle warning blockquotes
    const warningElements = contentRef.current.querySelectorAll('blockquote[data-warning-type]');
    const warningRoots: Array<{ root: ReactDOM.Root; container: HTMLElement }> = [];

    warningElements.forEach((element) => {
      const type = element.getAttribute('data-warning-type');
      const content = element.innerHTML;
      if (!type) return;

      const container = document.createElement('div');
      element.replaceWith(container);

      const root = ReactDOM.createRoot(container);
      root.render(
        <Warning type={type as 'default' | 'ferromagnetic' | 'hazard' | 'neural'}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Warning>
      );
      warningRoots.push({ root, container });
    });

    return () => {
      mermaidRoots.forEach(({ root }) => root.unmount());
      warningRoots.forEach(({ root }) => root.unmount());
    };
  }, [html]);

  return (
    <div 
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default SafeContent; 