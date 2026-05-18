'use client';

/**
 * Client-side logger for browser components
 * This logger is designed to respect the ENABLE_LOGS environment variable
 * that is passed from the server to the client via Next.js.
 */

// Logger interface to match the server-side logger
interface Logger {
  readonly enabled: boolean;
  info: (message: string) => void;
  debug: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
}

// Client-side logger implementation
export const clientLogger: Logger = {
  // Check if logging is enabled
  get enabled() {
    if (typeof window === 'undefined') {
      return false; // Always disabled during SSR
    }

    try {
      // Try to access the environment variable from Next.js data
      return window.__NEXT_DATA__?.props?.pageProps?.env?.ENABLE_LOGS === 'true';
    } catch (e) {
      // Check if we can access it from process.env via Next.js config
      return process.env.NEXT_PUBLIC_ENABLE_LOGS === 'true';
    }
  },

  /**
   * Log an informational message
   * @param message The message to log
   */
  info(message: string) {
    if (this.enabled) {
      console.log(`[CLIENT:INFO] ${message}`);
    }
  },
  
  /**
   * Log a debug message
   * @param message The message to log
   */
  debug(message: string) {
    if (this.enabled) {
      console.log(`[CLIENT:DEBUG] ${message}`);
    }
  },
  
  /**
   * Log a warning message
   * @param message The message to log
   */
  warn(message: string) {
    if (this.enabled) {
      console.warn(`[CLIENT:WARN] ${message}`);
    }
  },
  
  /**
   * Log an error message
   * @param message The message to log
   */
  error(message: string) {
    if (this.enabled) {
      console.error(`[CLIENT:ERROR] ${message}`);
    }
  }
}; 