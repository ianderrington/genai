const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Format a date string consistently across the application
 * For YYYY-MM-DD dates, ensures the date is interpreted in local time
 */
export function formatDate(dateString: string): string {
  try {
    // Handle null/undefined case
    if (!dateString) {
      console.error('Received null/undefined date string');
      return '';
    }

    // Ensure we have a string
    const dateStr = String(dateString);

    // If the date is in YYYY-MM-DD format, parse it in local time
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      const [_, yearStr, monthStr, dayStr] = match;
      const year = parseInt(yearStr, 10);
      const month = parseInt(monthStr, 10) - 1; // JS months are 0-based
      const day = parseInt(dayStr, 10);
      
      // Create date in local time
      const date = new Date(year, month, day, 12, 0, 0);
      
      return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }

    // For other formats, use local time parsing
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.error(`Invalid date string: ${dateStr}`);
      return dateStr;
    }

    // Use local time methods
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return String(dateString);
  }
} 