'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  private copyErrorToClipboard = async () => {
    const errorText = `
Error: ${this.state.error?.toString() || 'Unknown error'}

Stack Trace:
${this.state.error?.stack || 'No stack trace available'}

Component Stack:
${this.state.errorInfo?.componentStack || 'No component stack available'}

Device Info:
${typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'}

URL: ${typeof window !== 'undefined' ? window.location.href : 'Unknown'}
Timestamp: ${new Date().toISOString()}
`.trim();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(errorText);
        alert('Error details copied to clipboard!');
      } else {
        // Fallback for iOS
        const textArea = document.createElement('textarea');
        textArea.value = errorText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          alert('Error details copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy:', err);
          alert('Could not copy. Please screenshot the error.');
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy error:', err);
      alert('Could not copy. Please screenshot the error.');
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h1 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">
                Application Error
              </h1>
              
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                  Error Message:
                </h2>
                <pre className="bg-white dark:bg-gray-800 p-4 rounded border border-red-200 dark:border-red-700 overflow-x-auto text-sm">
                  {this.state.error?.toString()}
                </pre>
              </div>

              {this.state.error?.stack && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                    Stack Trace:
                  </h2>
                  <pre className="bg-white dark:bg-gray-800 p-4 rounded border border-red-200 dark:border-red-700 overflow-x-auto text-xs max-h-96 overflow-y-auto">
                    {this.state.error.stack}
                  </pre>
                </div>
              )}

              {this.state.errorInfo?.componentStack && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                    Component Stack:
                  </h2>
                  <pre className="bg-white dark:bg-gray-800 p-4 rounded border border-red-200 dark:border-red-700 overflow-x-auto text-xs max-h-96 overflow-y-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}

              <div className="mt-6 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={this.copyErrorToClipboard}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                  >
                    📋 Copy Error Details
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                  >
                    🔄 Reload Page
                  </button>
                  <button
                    onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
                  >
                    ↩️ Try Again
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>For debugging:</strong> Please take a screenshot of this error and share it with the developer.
                  Device info: {typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
