// This file contains utility functions that should only be used on the server
// It uses dynamic imports to avoid issues with client-side code

/**
 * Check if code is running on the server
 * @returns Boolean indicating if running on server
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Check if we're in a Node.js environment
 * @returns Boolean indicating if in Node.js
 */
export function isNodeEnvironment(): boolean {
  return isServer() && typeof process !== 'undefined' && !!process.versions?.node;
} 