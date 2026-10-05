'use client';

import React from 'react';
// This component is already lazy-loaded via next/dynamic({ ssr: false }) from
// every caller (SafeHTML, SafeContent), so it never reaches the server
// bundle. A static top-level import here lets webpack bundle mermaid into
// that SAME client-only chunk, instead of the previous pattern (a raw
// import() inside useEffect) which forced a SECOND sequential network
// round-trip after this chunk had already loaded and mounted, doubling the
// "Loading diagram..." stall a reader actually sees.
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const [svg, setSvg] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);
  const elementId = React.useId();

  React.useEffect(() => {
    const renderDiagram = async () => {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
        });
        
        const { svg } = await mermaid.render(elementId, chart);
        setSvg(svg);
        setLoading(false);
      } catch (error) {
        console.error('Failed to render diagram:', error);
        setLoading(false);
      }
    };

    renderDiagram();
  }, [chart, elementId]);

  if (loading) {
    return <div className="my-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-center">Loading diagram...</div>;
  }

  if (!svg) {
    return <div className="my-4 p-4 bg-red-100 dark:bg-red-900 rounded text-center">Failed to render diagram</div>;
  }

  return (
    <div 
      className="my-4" 
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
};

// Use dynamic import with SSR disabled for this component
export default MermaidDiagram; 