'use client';

import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import Warning from './mdx/Warning';

const components = {
  Warning,
  // Add other custom components here as needed
};

export default function MDXProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseMDXProvider components={components}>
      {children}
    </BaseMDXProvider>
  );
} 