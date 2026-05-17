'use client';

import React from 'react';
import dynamic from 'next/dynamic';

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
        // Dynamically import mermaid only on the client side
        const mermaid = (await import('mermaid')).default;
        
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