'use client';

import { useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom/client';
import dynamic from 'next/dynamic';
import Warning from './Warning';
import Sidenote from './Sidenote';

// Dynamically import MermaidDiagram with SSR disabled
const MermaidDiagram = dynamic(() => import('./MermaidDiagram'), { 
  ssr: false,
  loading: () => <div className="my-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-center">Loading diagram...</div>
});

interface SafeHTMLProps {
  html: string;
  className?: string;
}

export default function SafeHTML({ html, className = '' }: SafeHTMLProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mermaidRootsRef = useRef<Array<{ root: ReactDOM.Root; container: HTMLElement }>>([]);
  const warningRootsRef = useRef<Array<{ root: ReactDOM.Root; container: HTMLElement }>>([]);
  const sidenoteRootsRef = useRef<Array<{ root: ReactDOM.Root; container: HTMLElement }>>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean up previous React roots
    mermaidRootsRef.current.forEach(({ root }) => {
      try {
        root.unmount();
      } catch (e) {
        console.warn('Error unmounting Mermaid root:', e);
      }
    });
    warningRootsRef.current.forEach(({ root }) => {
      try {
        root.unmount();
      } catch (e) {
        console.warn('Error unmounting Warning root:', e);
      }
    });
    sidenoteRootsRef.current.forEach(({ root }) => {
      try {
        root.unmount();
      } catch (e) {
        console.warn('Error unmounting Sidenote root:', e);
      }
    });
    mermaidRootsRef.current = [];
    warningRootsRef.current = [];
    sidenoteRootsRef.current = [];

    // Set the HTML content
    container.innerHTML = html;

    // Handle Mermaid diagrams
    const mermaidElements = container.querySelectorAll('[data-mermaid]');
    mermaidElements.forEach((element) => {
      const chart = decodeURIComponent(element.getAttribute('data-mermaid') || '');
      if (!chart) return;

      const mermaidContainer = document.createElement('div');
      element.replaceWith(mermaidContainer);

      const root = ReactDOM.createRoot(mermaidContainer);
      root.render(<MermaidDiagram chart={chart} />);
      mermaidRootsRef.current.push({ root, container: mermaidContainer });
    });

    // Handle warning blockquotes
    const warningElements = container.querySelectorAll('blockquote[data-warning-type]');
    warningElements.forEach((element) => {
      const type = element.getAttribute('data-warning-type');
      const content = element.innerHTML;
      if (!type) return;

      const warningContainer = document.createElement('div');
      element.replaceWith(warningContainer);

      const root = ReactDOM.createRoot(warningContainer);
      root.render(<Warning type={type as any}><div dangerouslySetInnerHTML={{ __html: content }} /></Warning>);
      warningRootsRef.current.push({ root, container: warningContainer });
    });

    // Handle sidenotes
    const sidenoteElements = container.querySelectorAll('div[data-sidenote="true"]');
    let sidenoteNumber = 0;
    sidenoteElements.forEach((element) => {
      sidenoteNumber++;
      const id = element.getAttribute('data-sidenote-id') || `sn-${sidenoteNumber}`;
      const content = element.innerHTML;

      const sidenoteContainer = document.createElement('div');
      sidenoteContainer.className = 'sidenote-anchor';
      element.replaceWith(sidenoteContainer);

      const root = ReactDOM.createRoot(sidenoteContainer);
      root.render(
        <Sidenote id={id} number={sidenoteNumber}>
          <span dangerouslySetInnerHTML={{ __html: content }} />
        </Sidenote>
      );
      sidenoteRootsRef.current.push({ root, container: sidenoteContainer });
    });

    // Find all scripts
    const scripts = Array.from(container.getElementsByTagName('script'));
    
    // Separate scripts by type
    const externalScripts = scripts.filter(script => script.src);
    const inlineScripts = scripts.filter(script => !script.src);

    // Helper to load a script and wait for it to complete
    const loadScript = (oldScript: HTMLScriptElement): Promise<void> => {
      return new Promise((resolve) => {
        const newScript = document.createElement('script');
        
        // Copy all attributes
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        
        // For external scripts, wait for them to load
        if (oldScript.src) {
          newScript.onload = () => resolve();
          newScript.onerror = () => resolve(); // Continue even if there's an error
        }
        
        // For inline scripts, just set the content
        if (!oldScript.src) {
          newScript.innerHTML = oldScript.innerHTML;
        }
        
        // Replace the script
        oldScript.parentNode?.replaceChild(newScript, oldScript);
        
        // For inline scripts, resolve immediately
        if (!oldScript.src) {
          setTimeout(resolve, 0);
        }
      });
    };

    // Execute scripts in sequence to ensure dependency order
    const executeScripts = async () => {
      // First load all external scripts
      for (const script of externalScripts) {
        await loadScript(script);
      }
      
      // Then execute all inline scripts
      for (const script of inlineScripts) {
        await loadScript(script);
      }
    };
    
    executeScripts().catch(console.error);

    // Cleanup function
    return () => {
      mermaidRootsRef.current.forEach(({ root }) => {
        try {
          root.unmount();
        } catch (e) {
          console.warn('Error unmounting Mermaid root during cleanup:', e);
        }
      });
      warningRootsRef.current.forEach(({ root }) => {
        try {
          root.unmount();
        } catch (e) {
          console.warn('Error unmounting Warning root during cleanup:', e);
        }
      });
      sidenoteRootsRef.current.forEach(({ root }) => {
        try {
          root.unmount();
        } catch (e) {
          console.warn('Error unmounting Sidenote root during cleanup:', e);
        }
      });
    };
  }, [html]);

  return <div ref={containerRef} className={className} />;
} 