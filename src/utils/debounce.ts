/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked.
 * 
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the original function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

/**
 * Creates a throttled function that only invokes func at most once per animation frame,
 * with additional time throttling for heavy operations.
 * 
 * This implementation is optimized for scroll events to prevent excessive
 * history API calls that can cause browser throttling warnings.
 * 
 * @param func The function to throttle
 * @param wait The minimum number of milliseconds between invocations
 * @returns A throttled version of the original function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 100
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let requestId: number | null = null;
  let lastArgs: Parameters<T> | null = null;
  
  // Function to execute on animation frame
  const executeOnAnimationFrame = () => {
    requestId = null;
    const now = Date.now();
    
    // Only execute if enough time has passed
    if (now - lastCall >= wait && lastArgs) {
      lastCall = now;
      func(...lastArgs);
      lastArgs = null;
    } else if (lastArgs) {
      // Still need to execute, but wait for next frame
      scheduleAnimationFrame();
    }
  };
  
  // Schedule the execution on the next animation frame
  const scheduleAnimationFrame = () => {
    if (!requestId) {
      requestId = requestAnimationFrame(executeOnAnimationFrame);
    }
  };
  
  // Return the throttled function
  return function(...args: Parameters<T>) {
    // Always capture the latest arguments
    lastArgs = args;
    
    // Schedule execution
    scheduleAnimationFrame();
  };
}

/**
 * Creates a throttled function specifically optimized for scroll events.
 * Uses requestAnimationFrame for better performance and reduced CPU usage.
 * 
 * @param func The function to execute on scroll
 * @returns A scroll-optimized throttled function
 */
export function scrollThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let ticking = false;
  let lastArgs: Parameters<T> | null = null;
  
  return function(...args: Parameters<T>) {
    lastArgs = args;
    
    if (!ticking) {
      ticking = true;
      
      requestAnimationFrame(() => {
        if (lastArgs) {
          func(...lastArgs);
        }
        ticking = false;
      });
    }
  };
} 