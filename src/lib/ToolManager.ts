'use client';

import { setDefaultToolReporter, setGlobalToolReporter, type ToolExecutionReporter } from '@supernal/interface/browser';

/**
 * Tool execution result reported by tools
 */
export interface ToolExecutionResult {
  toolName: string;
  elementId?: string;
  actionType?: string;
  success: boolean;
  message: string;
  data?: unknown;
  error?: Error;
  timestamp: string;
}

type ToolExecutionListener = (result: ToolExecutionResult) => void;

/**
 * ToolManager - Central hub for tool execution tracking
 *
 * Subscribes to all @Tool decorator executions and HOC tool executions.
 * Provides real-time feedback to chat UI and other listeners.
 */
class ToolManagerClass {
  private listeners: ToolExecutionListener[] = [];
  private lastReport: ToolExecutionResult | null = null;

  constructor() {
    // Register as global reporter for HOC auto-reporting
    setGlobalToolReporter({
      reportExecution: (result) => {
        this.reportExecution({
          toolName: result.toolName,
          elementId: result.elementId,
          actionType: result.actionType,
          success: result.success,
          message: result.message,
          data: result.data,
        });
      },
    } as ToolExecutionReporter);

    // Register for @Tool decorator auto-reporting
    setDefaultToolReporter((result) => {
      this.reportExecution({
        toolName: 'Tool',
        success: result.success,
        message:
          result.message ||
          (result.error ? result.error.message : 'Tool executed'),
        data: result.data,
        error: result.error,
      });
    });
  }

  /**
   * Subscribe to tool execution results
   *
   * @param listener - Callback to receive execution results
   * @returns Unsubscribe function
   */
  subscribe(listener: ToolExecutionListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Report a tool execution result
   *
   * Called automatically by @Tool decorators and HOC tools.
   * Can also be called manually for custom tools.
   */
  reportExecution(
    result: Omit<ToolExecutionResult, 'timestamp'> | ToolExecutionResult
  ) {
    const fullResult: ToolExecutionResult = {
      ...result,
      timestamp:
        (result as ToolExecutionResult).timestamp || new Date().toISOString(),
    };

    this.lastReport = fullResult;

    // Notify all listeners
    this.listeners.forEach((listener) => {
      try {
        listener(fullResult);
      } catch (error) {
        console.error('Error in ToolManager listener:', error);
      }
    });
  }

  /**
   * Get the most recent tool execution result
   */
  getLastReport(): ToolExecutionResult | null {
    return this.lastReport;
  }

  /**
   * Clear all listeners (for cleanup)
   */
  clearListeners() {
    this.listeners = [];
  }
}

// Singleton instance
export const ToolManager = new ToolManagerClass();
