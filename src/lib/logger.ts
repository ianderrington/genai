import { env, isLoggingEnabled } from './env';

// Check if we're running in a browser environment
const isBrowser = typeof window !== 'undefined';

// Determine whether to show logs in production
const shouldLogInProduction = env.ENABLE_LOGS || process.env.NODE_ENV !== 'production';

/**
 * Logging is disabled by default for a cleaner console experience.
 * To enable logging, set ENABLE_LOGS=true in your .env file
 * or use the npm scripts:
 * - npm run logs:on  (to enable logging)
 * - npm run logs:off (to disable logging)
 * - npm run toggle-logs (to toggle logging on/off)
 */

/**
 * Simple logger utility for consistent logging that works in both browser and server environments
 */
export const logger = {
  /**
   * Log an informational message
   * @param message The message to log
   */
  info: (message: string) => {
    if (isLoggingEnabled && shouldLogInProduction) {
      if (isBrowser) {
        console.log(`[CLIENT:INFO] ${message}`);
      } else {
        console.log(`[SERVER:INFO] ${message}`);
      }
    }
  },
  
  /**
   * Log a debug message
   * @param message The message to log
   */
  debug: (message: string) => {
    if (isLoggingEnabled && shouldLogInProduction) {
      if (isBrowser) {
        console.log(`[CLIENT:DEBUG] ${message}`);
      } else {
        console.log(`[SERVER:DEBUG] ${message}`);
      }
    }
  },
  
  /**
   * Log a warning message
   * @param message The message to log
   */
  warn: (message: string) => {
    if (isLoggingEnabled && shouldLogInProduction) {
      if (isBrowser) {
        console.warn(`[CLIENT:WARN] ${message}`);
      } else {
        console.warn(`[SERVER:WARN] ${message}`);
      }
    }
  },
  
  /**
   * Log an error message
   * @param message The message to log
   */
  error: (message: string) => {
    if (isLoggingEnabled || process.env.NODE_ENV === 'development') {
      // Always log errors in development
      if (isBrowser) {
        console.error(`[CLIENT:ERROR] ${message}`);
      } else {
        console.error(`[SERVER:ERROR] ${message}`);
      }
    }
  }
}; 