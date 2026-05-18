/**
 * Environment configuration
 * 
 * This file ensures environment variables are properly loaded and typed
 */

// Define environment interface for type safety
export interface Env {
  ENABLE_LOGS: boolean;
  NODE_ENV: 'development' | 'production' | 'test';
}

// Parse and load environment variables with proper typing
export const env: Env = {
  ENABLE_LOGS: process.env.ENABLE_LOGS === 'true',
  NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
};

// Export a function to check if we're in development mode
export const isDev = env.NODE_ENV === 'development';

// Export a function to check if logging is enabled
export const isLoggingEnabled = env.ENABLE_LOGS; 