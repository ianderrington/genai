'use client';

import { createContext, useContext, useEffect } from 'react';
import { NavigationGraph } from '@supernal/interface/browser';

/**
 * Navigation Context
 *
 * Tracks which "container" (page/section) the user is currently in.
 * This helps AI understand context when executing commands.
 */
export const NavigationContextContext = createContext<string>('global');

/**
 * Provider component to set navigation context
 *
 * Wrap pages/sections with this to tell the NavigationGraph
 * where the user currently is.
 *
 * @example
 * <NavigationContextProvider value="blog">
 *   <BlogPage />
 * </NavigationContextProvider>
 */
export function NavigationContextProvider({
  value,
  children
}: {
  value: string;
  children: React.ReactNode;
}) {
  const graph = useNavigationGraph();

  useEffect(() => {
    graph.setCurrentContext(value);
  }, [value, graph]);

  return (
    <NavigationContextContext.Provider value={value}>
      {children}
    </NavigationContextContext.Provider>
  );
}

/**
 * Hook to access the global NavigationGraph singleton
 *
 * The NavigationGraph tracks:
 * - Current context (which page/container)
 * - Available tools in each context
 * - Relationships between contexts
 *
 * @returns NavigationGraph singleton instance
 */
export function useNavigationGraph() {
  return NavigationGraph.getInstance();
}

/**
 * Hook to get current navigation context
 */
export function useNavigationContext() {
  return useContext(NavigationContextContext);
}
