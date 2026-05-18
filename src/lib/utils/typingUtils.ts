/**
 * Typing animation utilities
 * Provides functions for realistic typing animations with variable speeds
 */

// Base typing speed in milliseconds per character
export const BASE_TYPING_SPEED = 25;

// Define type for speed modifiers
type SpeedModifierKey = '.' | ',' | '!' | '?' | ':' | ';' | '\n' | '\r' | '<p>' | '</p><p>';

// Speed modifiers for different punctuation
export const SPEED_MODIFIERS: Record<SpeedModifierKey, number> = {
  '.': 12,    // Longer pause after periods
  ',': 6,     // Medium pause after commas
  '!': 12,    // Longer pause after exclamation marks
  '?': 12,    // Longer pause after question marks
  ':': 6,     // Medium pause after colons
  ';': 6,     // Medium pause after semicolons
  '\n': 8,    // Longer pause for line breaks
  '\r': 8,    // Longer pause for carriage returns
  '<p>': 16,  // Even longer pause for paragraph breaks
  '</p><p>': 20, // Longest pause between paragraphs
};

// Random variation range (percentage)
const SPEED_VARIATION = 0.15; // 15% variation

/**
 * Adds random variation to typing speed
 * @param baseSpeed Base speed in milliseconds
 * @returns Speed with random variation
 */
export const addRandomVariation = (baseSpeed: number): number => {
  const variation = 1 - SPEED_VARIATION + (Math.random() * SPEED_VARIATION * 2);
  return Math.round(baseSpeed * variation);
};

/**
 * Calculates typing delay for a specific character based on context
 * @param char Current character
 * @param nextChar Next character (for context)
 * @param html Whether we're processing HTML content
 * @returns Delay in milliseconds
 */
export const getTypingDelay = (char: string, nextChar: string, html: boolean = false): number => {
  let delay = BASE_TYPING_SPEED;
  
  // Check for HTML paragraph breaks
  if (html && char === '>' && nextChar === '<') {
    const potentialTag = '</p><p>' as SpeedModifierKey;
    return addRandomVariation(BASE_TYPING_SPEED * (SPEED_MODIFIERS[potentialTag] || 1));
  }
  
  // Check for line breaks
  if (char === '\n' || char === '\r') {
    return addRandomVariation(BASE_TYPING_SPEED * SPEED_MODIFIERS[char as SpeedModifierKey]);
  }
  
  // Check for punctuation
  if (char in SPEED_MODIFIERS) {
    delay = BASE_TYPING_SPEED * SPEED_MODIFIERS[char as SpeedModifierKey];
  }
  
  return addRandomVariation(delay);
};

/**
 * Processes HTML content to extract text and calculate typing positions
 * @param html HTML content
 * @returns Object with text content and mapping of text positions to HTML positions
 */
export const processHtmlForTyping = (html: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const textContent = tempDiv.textContent || '';
  
  // Create a mapping between text position and HTML position
  const positionMap: number[] = [];
  let textPos = 0;
  let inTag = false;
  let tagBuffer = '';
  
  for (let htmlPos = 0; htmlPos < html.length; htmlPos++) {
    const char = html[htmlPos];
    
    if (char === '<') {
      inTag = true;
      tagBuffer = '<';
      continue;
    }
    
    if (inTag) {
      tagBuffer += char;
      if (char === '>') {
        inTag = false;
        // If this is a closing tag or self-closing tag, don't map it
        if (!tagBuffer.match(/<\/?[^>]+>/)) {
          positionMap[textPos] = htmlPos;
          textPos++;
        }
      }
      continue;
    }
    
    if (!inTag && textPos < textContent.length) {
      positionMap[textPos] = htmlPos;
      textPos++;
    }
  }
  
  return {
    textContent,
    positionMap,
    getHtmlPosition: (textPosition: number) => {
      // Find the closest mapped position
      while (textPosition >= 0) {
        if (positionMap[textPosition] !== undefined) {
          return positionMap[textPosition];
        }
        textPosition--;
      }
      return 0;
    }
  };
};

/**
 * Creates a typing animation for HTML content
 * @param html Full HTML content
 * @param onUpdate Callback for updates with current typed content
 * @param onComplete Callback when typing is complete
 * @returns Object with control functions (skip, pause, resume)
 */
export const createTypingAnimation = (
  html: string,
  onUpdate: (content: string) => void,
  onComplete: () => void
) => {
  let isCancelled = false;
  let isPaused = false;
  let timeoutId: NodeJS.Timeout | null = null;
  
  const { textContent, getHtmlPosition } = processHtmlForTyping(html);
  
  const typeNextChar = (currentTextPosition: number) => {
    if (isCancelled) return;
    if (isPaused) {
      timeoutId = setTimeout(() => typeNextChar(currentTextPosition), 100);
      return;
    }
    
    if (currentTextPosition >= textContent.length) {
      onUpdate(html); // Ensure we set the full content
      onComplete();
      return;
    }
    
    const htmlPosition = getHtmlPosition(currentTextPosition);
    const currentTypedHtml = html.substring(0, htmlPosition + 1);
    onUpdate(currentTypedHtml);
    
    const currentChar = textContent[currentTextPosition];
    const nextChar = textContent[currentTextPosition + 1] || '';
    const delay = getTypingDelay(currentChar, nextChar, true);
    
    timeoutId = setTimeout(() => typeNextChar(currentTextPosition + 1), delay);
  };
  
  // Start typing
  timeoutId = setTimeout(() => typeNextChar(0), 0);
  
  // Return control functions
  return {
    skip: () => {
      if (timeoutId) clearTimeout(timeoutId);
      isCancelled = true;
      onUpdate(html);
      onComplete();
    },
    pause: () => {
      isPaused = true;
    },
    resume: () => {
      isPaused = false;
    },
    cancel: () => {
      if (timeoutId) clearTimeout(timeoutId);
      isCancelled = true;
    }
  };
}; 