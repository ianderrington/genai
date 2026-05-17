// src/components/SocialShare.tsx
"use client";

import React, { useEffect, useState, useRef, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp, FaLink } from 'react-icons/fa';
import { SiBluesky, SiMedium, SiSubstack } from 'react-icons/si';
import { TbBrandThreads } from 'react-icons/tb';
import { RiTwitterXFill } from 'react-icons/ri';
import { IconType } from 'react-icons';
import { FiShare2 } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { markdownToLinkedIn } from 'supernal-linkedin-formatter';

export interface SocialShareProps {
  title: string;
  description?: string;
  tags?: string[];
  shareBlurbs?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    medium?: string;
    substack?: string;
  };
  isAlwaysVisible?: boolean;
  isCircular?: boolean;
  isCompact?: boolean;
  url?: string;
  fullContent?: string;
  htmlContent?: string;
  coverImage?: string;
}

type SharePlatformName = 'twitter' | 'facebook' | 'linkedin' | 'whatsapp' | 'threads' | 'bluesky' | 'copyLink' | 'medium' | 'substack';

interface SharePlatform {
  name: SharePlatformName;
  icon: IconType;
  label: string;
  bgColor: string;
  textColor: string;
  requiresCtrl?: boolean;
  getShareUrl?: (url: string, title: string, description?: string, tags?: string[]) => string;
  handleClick?: (e: React.MouseEvent, url: string, title: string, description?: string, tags?: string[], fullContent?: string, htmlContent?: string, coverImage?: string) => void | Promise<void>;
}

// Helper function to convert HTML to clean formatted text
const convertHtmlToFormattedText = (html: string): string => {
  if (!html) return '';
  
  if (typeof document === 'undefined') {
    // Server-side rendering fallback (simple tag stripping)
    return html
      .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '$1\n\n') // Headers
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n') // Paragraphs
      .replace(/<br\s*\/?>/gi, '\n') // Line breaks
      .replace(/<li[^>]*>(.*?)<\/li>/gi, '• $1\n') // List items
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '$2 ($1)') // Links
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '*$1*') // Bold
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '_$1_') // Italic
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n') // Blockquotes
      .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`') // Inline code
      .replace(/<pre[^>]*>(.*?)<\/pre>/gi, '```\n$1\n```\n\n') // Code blocks
      .replace(/<[^>]*>/g, '') // Strip remaining tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with spaces
      .replace(/&amp;/g, '&') // Replace &amp; with &
      .replace(/&lt;/g, '<') // Replace &lt; with <
      .replace(/&gt;/g, '>') // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#39;/g, "'") // Replace &#39; with '
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove excessive blank lines
      .trim();
  }
  
  // Browser environment: Use DOM to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Process headers h1-h6
  Array.from(tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach(header => {
    const level = parseInt(header.tagName.substring(1));
    const prefix = '#'.repeat(level) + ' ';
    const text = header.textContent || '';
    const replacement = document.createTextNode(`\n\n${prefix}${text}\n\n`);
    header.parentNode?.replaceChild(replacement, header);
  });
  
  // Process paragraph breaks
  Array.from(tempDiv.querySelectorAll('p')).forEach(p => {
    const text = p.textContent || '';
    const replacement = document.createTextNode(`${text}\n\n`);
    p.parentNode?.replaceChild(replacement, p);
  });
  
  // Process links
  Array.from(tempDiv.querySelectorAll('a')).forEach(a => {
    const text = a.textContent || '';
    const href = a.getAttribute('href') || '';
    const replacement = document.createTextNode(`${text} (${href})`);
    a.parentNode?.replaceChild(replacement, a);
  });
  
  // Process lists
  Array.from(tempDiv.querySelectorAll('li')).forEach(li => {
    const text = li.textContent || '';
    const replacement = document.createTextNode(`• ${text}\n`);
    li.parentNode?.replaceChild(replacement, li);
  });
  
  // Process bold text
  Array.from(tempDiv.querySelectorAll('strong, b')).forEach(b => {
    const text = b.textContent || '';
    const replacement = document.createTextNode(`*${text}*`);
    b.parentNode?.replaceChild(replacement, b);
  });
  
  // Process italic text
  Array.from(tempDiv.querySelectorAll('em, i')).forEach(i => {
    const text = i.textContent || '';
    const replacement = document.createTextNode(`_${text}_`);
    i.parentNode?.replaceChild(replacement, i);
  });
  
  // Process blockquotes
  Array.from(tempDiv.querySelectorAll('blockquote')).forEach(quote => {
    const text = quote.textContent || '';
    const lines = text.split('\n').map(line => `> ${line}`).join('\n');
    const replacement = document.createTextNode(`\n\n${lines}\n\n`);
    quote.parentNode?.replaceChild(replacement, quote);
  });
  
  // Process code blocks
  Array.from(tempDiv.querySelectorAll('pre')).forEach(pre => {
    const text = pre.textContent || '';
    const replacement = document.createTextNode(`\n\`\`\`\n${text}\n\`\`\`\n\n`);
    pre.parentNode?.replaceChild(replacement, pre);
  });
  
  // Process inline code
  Array.from(tempDiv.querySelectorAll('code')).forEach(code => {
    if (code.parentNode?.nodeName !== 'PRE') { // Skip if inside pre (already handled)
      const text = code.textContent || '';
      const replacement = document.createTextNode(`\`${text}\``);
      code.parentNode?.replaceChild(replacement, code);
    }
  });
  
  // Get the text content
  let result = tempDiv.textContent || '';
  
  // Clean up the result (remove excess whitespace, etc.)
  result = result
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove excessive blank lines
    .trim();
  
  return result;
};

// Helper function to fetch image and convert to data URL with robust error handling
const imageToDataUrl = async (imageUrl: string): Promise<string> => {
  try {
    // Skip if already a data URL or empty
    if (!imageUrl || imageUrl.startsWith('data:')) return imageUrl;
    
    // Log the original image URL for debugging
    console.log(`Converting image to data URL, original URL: ${imageUrl}`);
    
    // Attempt to fetch the image
    try {
      // First attempt - standard fetch
      console.log(`Attempting primary fetch for image: ${imageUrl}`);
      
      const response = await fetch(imageUrl, { 
        cache: 'force-cache',
        headers: {
          'Accept': 'image/*'
        }
      });
      
      if (!response.ok) {
        console.error(`Image fetch failed with status: ${response.status} - ${response.statusText} for URL: ${imageUrl}`);
        
        // Try alternative formats if the image can't be found
        if (response.status === 404) {
          const alternativePaths = [];
          
          // Parse the URL to get components
          try {
            const urlObj = new URL(imageUrl);
            const pathParts = urlObj.pathname.split('/').filter(Boolean);
            
            // Try just the filename as a fallback
            if (pathParts.length > 0) {
              const filename = pathParts[pathParts.length - 1];
              alternativePaths.push(`${urlObj.origin}/images/${filename}`);
              
              // Also try different directories
              alternativePaths.push(`${urlObj.origin}/assets/${filename}`);
              alternativePaths.push(`${urlObj.origin}/media/${filename}`);
              
              // Try with 'public' prefix
              alternativePaths.push(`${urlObj.origin}/public/images/${filename}`);
            }
            
            // Try each alternative path
            for (const altPath of alternativePaths) {
              console.log(`Trying alternative image path: ${altPath}`);
              
              try {
                const altResponse = await fetch(altPath, {
                  cache: 'force-cache',
                  headers: {
                    'Accept': 'image/*'
                  }
                });
                
                if (altResponse.ok) {
                  const blob = await altResponse.blob();
                  if (blob.type.startsWith('image/')) {
                    console.log(`Successfully retrieved image from alternative path: ${altPath}`);
                    return blobToDataUrl(blob);
                  }
                }
              } catch (altError) {
                console.warn(`Alternative fetch failed for ${altPath}:`, altError);
              }
            }
          } catch (parseError) {
            console.warn(`Error parsing URL for alternatives:`, parseError);
          }
        }
        
        // Return original URL as fallback after all attempts
        return imageUrl;
      }
      
      const blob = await response.blob();
      
      // Verify we got a valid image
      if (!blob.type.startsWith('image/')) {
        console.warn(`Response is not an image (type: ${blob.type}), using original URL`);
        return imageUrl;
      }
      
      return blobToDataUrl(blob);
      
    } catch (fetchError) {
      console.error(`Image fetch error for ${imageUrl}:`, fetchError);
      return imageUrl; // Return original URL on error
    }
  } catch (error) {
    console.error('Failed to convert image to data URL:', error);
    return imageUrl; // Return original URL if conversion fails
  }
};

// Helper function to convert blob to data URL
const blobToDataUrl = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = (e) => {
      console.error('FileReader failed to read blob:', e);
      reject(e);
    };
    reader.readAsDataURL(blob);
  });
};

// Helper function to prepare content for Medium and Substack
const prepareContentForEditors = async (
  title: string, 
  html: string, 
  url: string, 
  fullContent: string, 
  description: string, 
  tags: string[] = [], 
  coverImage?: string,
  skipImageDataUrls = false // Parameter to skip data URL conversions
): Promise<string> => {
  if (!html && !fullContent && !description) return '';
  
  // Get the base URL and post path
  const urlObj = new URL(url);
  const baseUrl = urlObj.origin;
  const postPath = urlObj.pathname;
  const postDirectory = postPath.substring(0, postPath.lastIndexOf('/'));
  
  console.log(`Post URL: ${url}`);
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Post Path: ${postPath}`);
  console.log(`Post Directory: ${postDirectory}`);
  
  // Process cover image
  let coverImageUrl = '';
  if (coverImage) {
    // Remove ./ prefix from relative paths
    const cleanCoverImage = coverImage.replace(/^\.\//, '');
    
    // Normalize the cover image URL
    if (cleanCoverImage.startsWith('http')) {
      coverImageUrl = cleanCoverImage;
    } else if (cleanCoverImage.startsWith('/')) {
      // Absolute path from site root
      coverImageUrl = `${baseUrl}${cleanCoverImage}`;
    } else {
      // Relative path to the current post
      coverImageUrl = `${baseUrl}${postDirectory}/${cleanCoverImage}`;
    }
    
    console.log(`Original cover image: ${coverImage}`);
    console.log(`Resolved cover image URL: ${coverImageUrl}`);
      
    // Only try to convert to data URL if not skipping
    if (!skipImageDataUrls) {
      try {
        console.log(`Trying to convert cover image to data URL: ${coverImageUrl}`);
        const dataUrl = await imageToDataUrl(coverImageUrl);
        if (dataUrl && dataUrl.startsWith('data:')) {
          coverImageUrl = dataUrl;
          console.log('Cover image converted to data URL successfully');
        } else {
          console.log(`Using original cover image URL (${coverImageUrl}) as fallback - conversion to data URL failed`);
        }
      } catch (error) {
        console.error('Error converting cover image to data URL:', error);
      }
    }
  }
  
  // Create image markup with robust fallback
  const imageMarkup = coverImage 
    ? `<figure><img src="${coverImageUrl}" alt="${title}" style="max-width: 100%;"></figure>` 
    : '';
  
  if (html) {
    // Process HTML content
    let processedHtml = html;
    
    // Fix relative URLs in links and images
    processedHtml = processedHtml
      // Fix URLs starting with / (absolute path from root)
      .replace(/(href|src)="\/([^"]+)"/g, `$1="${baseUrl}/$2"`)
      .replace(/(href|src)='\/([^']+)'/g, `$1='${baseUrl}/$2'`)
      // Fix URLs starting with ./ (relative path from current post)
      .replace(/(href|src)="\.\//g, `$1="${baseUrl}${postDirectory}/`)
      .replace(/(href|src)='\.\//g, `$1='${baseUrl}${postDirectory}/`)
      // Fix relative URLs with no prefix (also relative to current post)
      .replace(/(href|src)="(?!https?:\/\/)(?!\/|\.\/|#)([^"]+)"/g, `$1="${baseUrl}${postDirectory}/$2"`)
      .replace(/(href|src)='(?!https?:\/\/)(?!\/|\.\/|#)([^']+)'/g, `$1='${baseUrl}${postDirectory}/$2'`);
    
    // Try to convert all image sources to data URLs if not skipping
    if (typeof document !== 'undefined' && !skipImageDataUrls) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = processedHtml;
      
      // Get all images in the content
      const images = tempDiv.querySelectorAll('img');
      console.log(`Found ${images.length} images in content to process`);
      
      // Only process the first few images to avoid excessive requests
      const maxImagesToProcess = 3;
      
      // Process each image - convert src to data URL
      let successCount = 0;
      let failCount = 0;
      
      for (let i = 0; i < Math.min(images.length, maxImagesToProcess); i++) {
        const img = images[i];
        const src = img.getAttribute('src');
        
        if (src && !src.startsWith('data:')) {
          try {
            console.log(`Processing image ${i+1}/${Math.min(images.length, maxImagesToProcess)}: ${src}`);
            
            // Convert to data URL - the src should already be resolved to absolute URL from the replacements above
            const dataUrl = await imageToDataUrl(src);
            if (dataUrl && dataUrl.startsWith('data:')) {
              img.setAttribute('src', dataUrl);
              console.log(`Successfully converted image ${i+1} to data URL`);
              successCount++;
            } else {
              console.warn(`Failed to convert image ${i+1}, keeping original src: ${src}`);
              failCount++;
            }
          } catch (error) {
            console.error(`Failed to convert image ${src} to data URL:`, error);
            failCount++;
          }
        }
      }
      
      console.log(`Image conversion summary: ${successCount} success, ${failCount} failed, ${images.length - Math.min(images.length, maxImagesToProcess)} skipped`);
      
      // Add note if there were more images than we processed
      if (images.length > maxImagesToProcess) {
        console.log(`Skipped processing ${images.length - maxImagesToProcess} additional images to avoid excessive requests`);
      }
      
      // Get the updated HTML
      processedHtml = tempDiv.innerHTML;
    }
    
    // Add fallback messages for potential image issues
    const imageNote = `<p><em>Note: If images do not appear correctly, view the original article at <a href="${url}">${url}</a></em></p>`;
    
    // Add title, description, cover image and attribution
    return `<h1>${title}</h1>
${description ? `<h2>${description}</h2>` : ''}
${imageMarkup}
${processedHtml}
${imageNote}
<p><em>Originally published at: <a href="${url}">${url}</a></em></p>`;
  } else if (fullContent) {
    // Fallback to markdown content
    const tagsString = tags?.length ? tags.map(tag => `#${tag}`).join(' ') : '';
    const markdownImage = coverImage ? `![${title}](${coverImageUrl})\n\n` : '';
    const imageNote = `*Note: If images do not appear correctly, view the original article at ${url}*\n\n`;
    
    return `# ${title}
${description ? `## ${description}\n\n` : ''}
${markdownImage}
${fullContent}

${imageNote}
${tagsString ? tagsString + '\n\n' : ''}_Originally published at: ${url}_`;
  } else {
    // Last resort - use description only
    const tagsString = tags?.length ? tags.map(tag => `#${tag}`).join(' ') : '';
    const markdownImage = coverImage ? `![${title}](${coverImageUrl})\n\n` : '';
    const imageNote = `*Note: If images do not appear correctly, view the original article at ${url}*\n\n`;
    
    return `# ${title}
${description ? `## ${description}\n\n` : ''}
${markdownImage}
${description || ''}

${imageNote}
${tagsString ? tagsString + '\n\n' : ''}_Originally published at: ${url}_`;
  }
};

// Function to create a special HTML clipboard item with embedded images
const createHtmlClipboardItem = (html: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      // @ts-ignore - ClipboardItem may not be in type definitions
      if (navigator.clipboard && window.ClipboardItem) {
        const type = 'text/html';
        const blob = new Blob([html], { type });
        
        // @ts-ignore - ClipboardItem may not be in type definitions
        await navigator.clipboard.write([
          new ClipboardItem({ [type]: blob })
        ]);
        resolve(true);
        return;
      }
      
      // Use the contenteditable div approach as fallback
      const tempElem = document.createElement('div');
      tempElem.setAttribute('contenteditable', 'true');
      tempElem.innerHTML = html;
      tempElem.style.position = 'fixed';
      tempElem.style.left = '-9999px';
      tempElem.style.top = '-9999px';
      document.body.appendChild(tempElem);
      
      // Select the content
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(tempElem);
      
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        
        // Execute copy command
        const success = document.execCommand('copy');
        selection.removeAllRanges();
        document.body.removeChild(tempElem);
        
        resolve(success);
      } else {
        document.body.removeChild(tempElem);
        resolve(false);
      }
    } catch (err) {
      console.error('HTML clipboard copy failed:', err);
      resolve(false);
    }
  });
};

// Helper function to copy plain text to clipboard
const copyTextToClipboard = async (text: string): Promise<boolean> => {
  try {
    // Check if document has focus before trying clipboard API
    if (navigator.clipboard && document.hasFocus()) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for browsers without navigator.clipboard or when document doesn't have focus
    const tempElem = document.createElement('textarea');
    tempElem.value = text;
    tempElem.style.position = 'fixed';
    tempElem.style.left = '-9999px';
    tempElem.style.top = '-9999px';
    tempElem.style.opacity = '0';
    tempElem.style.pointerEvents = 'none';
    document.body.appendChild(tempElem);
    tempElem.focus();
    tempElem.select();
    
    const success = document.execCommand('copy');
    document.body.removeChild(tempElem);
    return success;
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error);
    
    // Final fallback - try the old-fashioned way one more time
    try {
      const tempElem = document.createElement('textarea');
      tempElem.value = text;
      tempElem.style.position = 'fixed';
      tempElem.style.left = '-999999px';
      tempElem.style.top = '-999999px';
      document.body.appendChild(tempElem);
      tempElem.focus();
      tempElem.select();
      
      const success = document.execCommand('copy');
      document.body.removeChild(tempElem);
      return success;
    } catch (finalError) {
      console.error('Final fallback also failed:', finalError);
      return false;
    }
  }
};

const SocialShare = ({
  title,
  description = '',
  tags = [],
  shareBlurbs = {},
  isAlwaysVisible = false,
  isCircular = true,
  isCompact = false,
  url,
  fullContent = '',
  htmlContent = '',
  coverImage = ''
}: SocialShareProps) => {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('Link copied!');
  const [isHovering, setIsHovering] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [hasNativeShare, setHasNativeShare] = useState(false);
  const shareButtonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Show menu based on isAlwaysVisible prop or hover/expanded state
  // On desktop: show on hover or when expanded (normal behavior)
  // On mobile: show when expanded (simple toggle behavior)
  const showMenu = isAlwaysVisible || 
    (!isMobile && (isExpanded || isHovering)) || 
    (isMobile && isExpanded);
  
  useEffect(() => {
    // Guard clause for SSR
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Create portal container
    if (typeof document !== 'undefined') {
      let container = document.getElementById('share-menu-portal');
      if (!container) {
        container = document.createElement('div');
        container.id = 'share-menu-portal';
        document.body.appendChild(container);
      }
      setPortalContainer(container);
    }

    // Set the URL and check mobile state
    setCurrentUrl(url || window.location.href);
    setIsMobile(window.innerWidth < 768);
    
    // Check if native sharing is available
    setHasNativeShare(!!navigator?.share);
    
    // Listen for window resize to update mobile state
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Detect if user is on Mac/iOS (using userAgent as platform is deprecated)
    try {
      const userAgent = navigator.userAgent || '';
      setIsMac(/Mac|iPod|iPhone|iPad/.test(userAgent));
    } catch (e) {
      setIsMac(false);
    }

    // Add keyboard event listeners for Ctrl/Cmd key and Alt key for ALL mode
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control' || (isMac && e.key === 'Meta')) {
        setIsCtrlPressed(true);
      }
      if (e.key === 'Alt') {
        setIsAltPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control' || (isMac && e.key === 'Meta')) {
        setIsCtrlPressed(false);
      }
      if (e.key === 'Alt') {
        setIsAltPressed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKeyDown as any);
    document.addEventListener('keyup', handleKeyUp as any);

    return () => {
      // Cleanup event listeners
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown as any);
      document.removeEventListener('keyup', handleKeyUp as any);
      
      // Clean up portal on unmount only
      const container = document.getElementById('share-menu-portal');
      if (container && document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, [isMac, url]); // Removed portalContainer from dependencies

  // Update currentUrl when url prop changes
  useEffect(() => {
    if (url) {
      setCurrentUrl(url);
    }
  }, [url]);

  useEffect(() => {
    // Update menu position when shown
    if (showMenu && shareButtonRef.current && menuRef.current) {
      const buttonRect = shareButtonRef.current.getBoundingClientRect();
      
      if (isCircular) {
        menuRef.current.style.position = 'fixed';
        menuRef.current.style.left = `${buttonRect.left + (buttonRect.width / 2)}px`;
        menuRef.current.style.top = `${buttonRect.top + (buttonRect.height / 2)}px`;
      } else {
        menuRef.current.style.position = 'fixed';
        menuRef.current.style.left = `${buttonRect.left}px`;
        menuRef.current.style.top = `${buttonRect.bottom + 8}px`;
      }
    }
  }, [showMenu, isCircular]);

  // Handle click outside to close menu on mobile
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (isMobile && isExpanded && shareButtonRef.current && menuRef.current) {
        const target = event.target as Node;
        
        // Check if click is outside both the button and menu
        if (!shareButtonRef.current.contains(target) && 
            !menuRef.current.contains(target) &&
            !(portalContainer && portalContainer.contains(target))) {
          setIsExpanded(false);
        }
      }
    };

    if (isMobile && isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile, isExpanded, portalContainer]);

  const handleCopyLink = async (e: React.MouseEvent) => {
    // Restrict event handling to this component only
    e.preventDefault();
    
    if (!currentUrl) {
      toast.error('No URL to copy');
      return;
    }

    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(currentUrl);
        toast.success(`Link copied!`, {
          position: 'top-center',
        });
        setTooltipText(`Link copied!`);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
        return;
      } catch (err) {
        console.warn('Clipboard API failed, trying fallback:', err);
        // Continue to fallback approach
      }
    }

    // Fallback approach for mobile or when clipboard API fails
    const textArea = document.createElement('textarea');
    textArea.value = currentUrl;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    
    try {
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, 99999); // For mobile devices
      
      const successful = document.execCommand('copy');
      if (successful) {
        toast.success(`Link copied!`, {
          position: 'top-center',
        });
        setTooltipText(`Link copied!`);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
      } else {
        throw new Error('Copy command failed');
      }
    } catch (err) {
      console.error('Failed to copy link: ', err);
      
      // On mobile, show the URL in a prompt as last resort
      if (isMobile) {
        try {
          const userAgent = navigator.userAgent || '';
          const isIOS = /iPad|iPhone|iPod/.test(userAgent);
          const isAndroid = /android/i.test(userAgent);
          
          if (isIOS || isAndroid) {
            // Show URL for manual copying on mobile
            alert(`Please copy this link manually:\n\n${currentUrl}`);
          } else {
            toast.error('Failed to copy link - please copy manually from address bar');
          }
        } catch (e) {
          toast.error('Failed to copy link - please copy manually from address bar');
        }
      } else {
        toast.error('Failed to copy link');
      }
    } finally {
      document.body.removeChild(textArea);
    }
  };

  // Handle native sharing via Web Share API
  const handleNativeShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: currentUrl,
        });
        
        // Show success feedback
        toast.success('Shared successfully!', {
          position: 'top-center',
          duration: 2000
        });
      } catch (error: any) {
        console.log('Native share error:', error);
        
        // Check if user cancelled (this shouldn't show an error)
        if (error.name === 'AbortError') {
          // User cancelled, no need to show error or fallback
          return;
        }
        
        // For other errors, show fallback options
        toast.error('Native sharing failed. Showing share options...', {
          position: 'top-center',
          duration: 2000
        });
        
        // Fall back to custom share menu
        setIsExpanded(true);
      }
    } else {
      // Native share not supported, show custom menu
      setIsExpanded(true);
    }
  };

  // Simple function to handle share button click - just toggle the menu
  const handleMainShareButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Simple toggle behavior for both desktop and mobile
    setIsExpanded(!isExpanded);
  };

  // Regular platforms always shown
  const mainPlatforms: SharePlatform[] = [
    {
      name: 'copyLink',
      icon: FaLink,
      label: 'Copy Link',
      bgColor: 'bg-gray-600',
      textColor: 'text-white'
    },
    {
      name: 'twitter',
      icon: RiTwitterXFill,
      label: 'Twitter',
      bgColor: 'bg-black',
      textColor: 'text-white',
      getShareUrl: (url, title, description, tags) => {
        // Use the provided description (which is now platform-specific)
        let text = description || title;
        
        // Add URL at the end of the text
        text += `\n\n${url}`;
        
        // Use the text parameter only
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      }
    },
    {
      name: 'facebook',
      icon: FaFacebook,
      label: 'Facebook',
      bgColor: 'bg-[#4267B2]',
      textColor: 'text-white',
      getShareUrl: (url, title, description) => {
        // Facebook's sharer relies primarily on Open Graph meta tags for content
        // but we can include a quote parameter for direct sharing
        const params = new URLSearchParams();
        params.append('u', url);
        if (description) {
          params.append('quote', description);
        }
        return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
      }
    },
    {
      name: 'linkedin',
      icon: FaLinkedin,
      label: 'LinkedIn',
      bgColor: 'bg-[#0077B5]',
      textColor: 'text-white',
      getShareUrl: (url, title, description) => {
        // LinkedIn sharing format according to Ryan Harris's article
        // https://www.linkedin.com/feed/?shareActive&mini=true&text=YOUR_TEXT
        let shareText = title;
        
        // Add description if available
        if (description) {
          shareText += `\n\n${description}`;
        }
        
        // Format the text using supernal-linkedin-formatter to convert markdown to LinkedIn formatting
        shareText = markdownToLinkedIn(shareText);
        
        // Add URL at the end
        shareText += `\n\n${url}`;
        
        // Return the properly formatted LinkedIn sharing URL
        return `https://www.linkedin.com/feed/?shareActive&mini=true&text=${encodeURIComponent(shareText)}`;
      }
    },
    {
      name: 'whatsapp',
      icon: FaWhatsapp,
      label: 'WhatsApp',
      bgColor: 'bg-[#25D366]',
      textColor: 'text-white',
      getShareUrl: (url, title) => {
        // WhatsApp needs text and URL combined
        return `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
      }
    },
    {
      name: 'threads',
      icon: TbBrandThreads,
      label: 'Threads',
      bgColor: 'bg-black',
      textColor: 'text-white',
      getShareUrl: (url, title, description) => {
        // Threads intent API format - includes URL at end of the text
        const text = description 
          ? `${title}\n\n${description}\n\n${url}` 
          : `${title}\n\n${url}`;
        return `https://threads.net/intent/post?text=${encodeURIComponent(text)}`;
      }
    },
    {
      name: 'bluesky',
      icon: SiBluesky,
      label: 'Bluesky',
      bgColor: 'bg-[#1DA1F2]',
      textColor: 'text-white',
      getShareUrl: (url, title) => {
        return `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${url}`)}`;
      }
    }
  ];

  // Ctrl-only platforms (shown only when Ctrl is pressed)
  const ctrlPlatforms: SharePlatform[] = [
    {
      name: 'medium',
      icon: SiMedium,
      label: 'Medium',
      bgColor: 'bg-black',
      textColor: 'text-white',
      requiresCtrl: true,
      handleClick: async (e, url, title, description, tags, fullContent, htmlContent, coverImage) => {
        e.preventDefault();
        
        // Show toast that we're preparing content
        toast.loading('Preparing content for Medium...', {
          position: 'top-center',
          duration: 3000,
          id: 'medium-prepare'
        });
        
        // Try to get cover image from metadata or first image in content
        let extractedCoverImage = coverImage || '';
        
        // Check if there's an image in the HTML content if no cover image provided
        if (!extractedCoverImage && htmlContent) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = htmlContent;
          const firstImg = tempDiv.querySelector('img');
          if (firstImg) {
            extractedCoverImage = firstImg.getAttribute('src') || '';
          }
        }
        
        // First try without image conversion to ensure at least the text content works
        let success = false;
        let contentToShare = '';
        
        try {
          // Prepare basic content first without image conversion (more reliable)
          contentToShare = await prepareContentForEditors(
            title, 
            htmlContent || '', 
            url || window.location.href, 
            fullContent || '', 
            description || '',
            tags,
            extractedCoverImage,
            true // Skip data URLs initially for more reliability
          );
          
          // Try to copy as HTML first
          if (htmlContent) {
            try {
              // Try HTML clipboard
              success = await createHtmlClipboardItem(contentToShare);
              if (success) {
                console.log('Successfully copied HTML content to clipboard');
                toast.dismiss('medium-prepare');
                toast.success('Content copied! Opening Medium...', {
                  position: 'top-center',
                  duration: 3000
                });
                
                // Open Medium editor after a short delay
                setTimeout(() => {
                  window.open('https://medium.com/new-story', '_blank');
                }, 1000);
                return;
              }
            } catch (htmlError) {
              console.error('HTML clipboard error:', htmlError);
            }
          } 
          
          // Fall back to plain text if HTML copying failed
          if (!success) {
            try {
              const plainTextContent = convertHtmlToFormattedText(contentToShare);
              success = await copyTextToClipboard(plainTextContent);
              if (success) {
                console.log('Successfully copied plain text to clipboard');
                toast.dismiss('medium-prepare');
                toast.success('Content copied as plain text! Opening Medium...', {
                  position: 'top-center',
                  duration: 3000
                });
                
                // Open Medium editor after a short delay
                setTimeout(() => {
                  window.open('https://medium.com/new-story', '_blank');
                }, 1000);
                return;
              }
            } catch (textError) {
              console.error('Text clipboard error:', textError);
            }
          }
        } catch (error) {
          console.error('Error preparing basic content:', error);
        }
        
        // If basic approach failed, try with data URL conversion as a last resort
        if (!success) {
          toast.dismiss('medium-prepare');
          toast.loading('Trying to include images, this may take a moment...', {
            position: 'top-center',
            duration: 5000,
            id: 'medium-images'
          });
          
          try {
            console.log('Basic approach failed, trying with image conversion...');
            
            // Prepare content with image data URL conversion
            contentToShare = await prepareContentForEditors(
              title,
              htmlContent || '',
              url || window.location.href,
              fullContent || '',
              description || '',
              tags,
              extractedCoverImage,
              false // Try to convert images to data URLs
            );
            
            // Try with HTML content
            if (htmlContent) {
              success = await createHtmlClipboardItem(contentToShare);
            }
            
            // Fall back to plain text if needed
            if (!success) {
              const plainText = convertHtmlToFormattedText(contentToShare);
              success = await copyTextToClipboard(plainText);
            }
            
            toast.dismiss('medium-images');
            
            if (success) {
              toast.success('Content with images copied! Opening Medium...', {
                position: 'top-center',
                duration: 3000
              });
            } else {
              // If still failing, try one last time with just the text
              const simpleText = `# ${title}\n\n${description || ''}\n\n${fullContent || ''}\n\nRead more at: ${url}`;
              const simpleSuccess = await copyTextToClipboard(simpleText);
              
              if (simpleSuccess) {
                toast.success('Basic content copied! Opening Medium...', {
                  position: 'top-center',
                  duration: 3000
                });
              } else {
                toast.error('Could not copy content. Try copying manually after Medium opens.', {
                  position: 'top-center',
                  duration: 4000
                });
              }
            }
          } catch (imageError) {
            console.error('Error with image conversion approach:', imageError);
            toast.dismiss('medium-images');
            toast.error('Error processing images. Opening Medium for manual copy...', {
              position: 'top-center',
              duration: 3000
            });
          }
        }
        
        // Always open Medium, even if copying failed - user can copy manually
        setTimeout(() => {
          window.open('https://medium.com/new-story', '_blank');
        }, 1500);
      }
    },
    {
      name: 'substack',
      icon: SiSubstack,
      label: 'Substack',
      bgColor: 'bg-[#FF6719]',
      textColor: 'text-white',
      requiresCtrl: true,
      handleClick: async (e, url, title, description, tags, fullContent, htmlContent, coverImage) => {
        e.preventDefault();
        
        // Show toast that we're preparing content
        toast.loading('Preparing content for Substack...', {
          position: 'top-center',
          duration: 3000,
          id: 'substack-prepare'
        });
        
        // Try to get cover image from metadata or first image in content
        let extractedCoverImage = coverImage || '';
        
        // Check if there's an image in the HTML content if no cover image provided
        if (!extractedCoverImage && htmlContent) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = htmlContent;
          const firstImg = tempDiv.querySelector('img');
          if (firstImg) {
            extractedCoverImage = firstImg.getAttribute('src') || '';
          }
        }
        
        // First try without image conversion to ensure at least the text content works
        let success = false;
        let contentToShare = '';
        
        try {
          // Prepare basic content first without image conversion (more reliable)
          contentToShare = await prepareContentForEditors(
            title, 
            htmlContent || '', 
            url || window.location.href, 
            fullContent || '', 
            description || '',
            tags,
            extractedCoverImage,
            true // Skip data URLs initially for more reliability
          );
          
          // Try to copy as HTML first
          if (htmlContent) {
            try {
              // Try HTML clipboard
              success = await createHtmlClipboardItem(contentToShare);
              if (success) {
                console.log('Successfully copied HTML content to clipboard');
                toast.dismiss('substack-prepare');
                toast.success('Content copied! Opening Substack...', {
                  position: 'top-center',
                  duration: 3000
                });
                
                // Open Substack editor after a short delay
                setTimeout(() => {
                  window.open('https://substack.com/publish', '_blank');
                }, 1000);
                return;
              }
            } catch (htmlError) {
              console.error('HTML clipboard error:', htmlError);
            }
          } 
          
          // Fall back to plain text if HTML copying failed
          if (!success) {
            try {
              const plainTextContent = convertHtmlToFormattedText(contentToShare);
              success = await copyTextToClipboard(plainTextContent);
              if (success) {
                console.log('Successfully copied plain text to clipboard');
                toast.dismiss('substack-prepare');
                toast.success('Content copied as plain text! Opening Substack...', {
                  position: 'top-center',
                  duration: 3000
                });
                
                // Open Substack editor after a short delay
                setTimeout(() => {
                  window.open('https://substack.com/publish', '_blank');
                }, 1000);
                return;
              }
            } catch (textError) {
              console.error('Text clipboard error:', textError);
            }
          }
        } catch (error) {
          console.error('Error preparing basic content:', error);
        }
        
        // If basic approach failed, try with data URL conversion as a last resort
        if (!success) {
          toast.dismiss('substack-prepare');
          toast.loading('Trying to include images, this may take a moment...', {
            position: 'top-center',
            duration: 5000,
            id: 'substack-images'
          });
          
          try {
            console.log('Basic approach failed, trying with image conversion...');
            
            // Prepare content with image data URL conversion
            contentToShare = await prepareContentForEditors(
              title,
              htmlContent || '',
              url || window.location.href,
              fullContent || '',
              description || '',
              tags,
              extractedCoverImage,
              false // Try to convert images to data URLs
            );
            
            // Try with HTML content
            if (htmlContent) {
              success = await createHtmlClipboardItem(contentToShare);
            }
            
            // Fall back to plain text if needed
            if (!success) {
              const plainText = convertHtmlToFormattedText(contentToShare);
              success = await copyTextToClipboard(plainText);
            }
            
            toast.dismiss('substack-images');
            
            if (success) {
              toast.success('Content with images copied! Opening Substack...', {
                position: 'top-center',
                duration: 3000
              });
            } else {
              // If still failing, try one last time with just the text
              const simpleText = `# ${title}\n\n${description || ''}\n\n${fullContent || ''}\n\nRead more at: ${url}`;
              const simpleSuccess = await copyTextToClipboard(simpleText);
              
              if (simpleSuccess) {
                toast.success('Basic content copied! Opening Substack...', {
                  position: 'top-center',
                  duration: 3000
                });
              } else {
                toast.error('Could not copy content. Try copying manually after Substack opens.', {
                  position: 'top-center',
                  duration: 4000
                });
              }
            }
          } catch (imageError) {
            console.error('Error with image conversion approach:', imageError);
            toast.dismiss('substack-images');
            toast.error('Error processing images. Opening Substack for manual copy...', {
              position: 'top-center',
              duration: 3000
            });
          }
        }
        
        // Always open Substack, even if copying failed - user can copy manually
        setTimeout(() => {
          window.open('https://substack.com/publish', '_blank');
        }, 1500);
      }
    }
  ];
  
  // Combine platforms based on ctrl state
  const allPlatforms = isCtrlPressed 
    ? [...mainPlatforms, ...ctrlPlatforms]
    : mainPlatforms;

  // Limit to fewer platforms on mobile but still include the most popular ones
  const mobilePlatforms = ['copyLink', 'twitter', 'facebook', 'linkedin', 'whatsapp', 'threads'];
  
  // Filter platforms based on mobile status
  const displayPlatforms = isMobile 
    ? allPlatforms.filter(p => mobilePlatforms.includes(p.name))
    : allPlatforms;

  // Handle opening all platforms at once (when Alt is pressed)
  const handleShareToAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast.loading('Opening all sharing platforms...', {
      position: 'top-center',
      duration: 2000,
      id: 'share-all'
    });

    // For "ALL" mode, we want to include ALL platforms regardless of Ctrl state
    const allAvailablePlatforms = [...mainPlatforms, ...ctrlPlatforms];
    
    // Get all platforms that have URLs (excluding copyLink and custom handlers initially)
    const urlPlatforms = allAvailablePlatforms.filter(platform => platform.getShareUrl && platform.name !== 'copyLink');

    // Open all URL-based platforms
    urlPlatforms.forEach((platform, index) => {
      setTimeout(() => {
        try {
          if (platform.getShareUrl) {
            // Use platform-specific blurb if available
            let platformDescription = description;
            if (platform.name === 'twitter' && shareBlurbs.twitter) {
              platformDescription = shareBlurbs.twitter;
            } else if (platform.name === 'facebook' && shareBlurbs.facebook) {
              platformDescription = shareBlurbs.facebook;
            } else if (platform.name === 'linkedin' && shareBlurbs.linkedin) {
              platformDescription = shareBlurbs.linkedin;
            }
            
            const shareUrl = platform.getShareUrl(currentUrl, title, platformDescription, tags);
            window.open(shareUrl, '_blank', 'noopener,noreferrer');
          }
        } catch (error) {
          console.error(`Error opening ${platform.name} during share to all:`, error);
        }
      }, index * 200); // Reduced delay to 200ms to prevent too long of a sequence
    });

    // Handle copyLink separately with error handling
    setTimeout(async () => {
      try {
        handleCopyLink(e);
      } catch (error) {
        console.error('Error copying link during share to all:', error);
        // Continue with other operations even if copy link fails
      }
    }, urlPlatforms.length * 200);

    // Handle Medium and Substack (get them from allAvailablePlatforms which includes them)
    const mediumPlatform = allAvailablePlatforms.find(p => p.name === 'medium');
    const substackPlatform = allAvailablePlatforms.find(p => p.name === 'substack');

    if (mediumPlatform?.handleClick) {
      setTimeout(async () => {
        try {
          await mediumPlatform.handleClick!(e, currentUrl, title, description, tags, fullContent, htmlContent, coverImage);
        } catch (error) {
          console.error('Error sharing to Medium during share to all:', error);
        }
      }, (urlPlatforms.length + 1) * 200);
    }

    if (substackPlatform?.handleClick) {
      setTimeout(async () => {
        try {
          await substackPlatform.handleClick!(e, currentUrl, title, description, tags, fullContent, htmlContent, coverImage);
        } catch (error) {
          console.error('Error sharing to Substack during share to all:', error);
        }
      }, (urlPlatforms.length + 2) * 200);
    }

    // Calculate total platforms opened (URL platforms + copyLink + Medium + Substack)
    const totalPlatforms = urlPlatforms.length + 1 + (mediumPlatform ? 1 : 0) + (substackPlatform ? 1 : 0);

    // Show success message
    setTimeout(() => {
      toast.dismiss('share-all');
      toast.success(`Opened ${totalPlatforms} sharing options!`, {
        position: 'top-center',
        duration: 3000
      });
    }, (urlPlatforms.length + 3) * 200);

    // Close menu
    setTimeout(() => {
      setIsExpanded(false);
    }, 500);
  };

  const handleShareButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // Auto-close menu on mobile after delay if no interaction
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isMobile && isExpanded) {
      timeoutId = setTimeout(() => {
        setIsExpanded(false);
      }, 10000); // Auto-close after 10 seconds on mobile
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isMobile, isExpanded]);

  const handlePlatformClick = (platformAction: () => void) => {
    platformAction();
    
    // Close menu after platform selection on mobile
    if (isMobile) {
      setTimeout(() => {
        setIsExpanded(false);
      }, 500); // Small delay to show action completed
    }
  };

  const renderMenu = () => {
    if (!showMenu || !portalContainer) return null;

    const menu = (
      <>
        {/* Mobile backdrop overlay */}
        {isMobile && isExpanded && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 z-[999998]"
            onClick={() => setIsExpanded(false)}
          />
        )}
        
        <div 
          ref={menuRef}
          className={`
            fixed ${isCompact ? 'w-[180px] h-[180px]' : 'w-[240px] h-[240px]'}
            transition-all duration-300 ease-in-out
            ${showMenu ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
          `}
          style={{
            transform: isCircular ? 'translate(-50%, -50%)' : 'none',
            zIndex: 999999
          }}
        >
          {/* Add center button - Use native share API if available */}
          <div 
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 999999
            }}
          >
            <button
              onClick={isAltPressed ? handleShareToAll : handleMainShareButtonClick}
              className={`
                ${isCompact ? 'w-10 h-10' : 'w-12 h-12'} 
                rounded-full shadow-lg
                flex items-center justify-center
                ${isAltPressed 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white'
                }
                border border-gray-200 dark:border-gray-700
                hover:${isAltPressed 
                  ? 'from-purple-600 to-pink-600' 
                  : 'bg-blue-50 dark:hover:bg-gray-700'
                }
                transition-all duration-300
                ${isAltPressed ? 'animate-pulse' : ''}
              `}
              aria-label={isAltPressed ? "Share to all platforms at once" : "Share content"}
              title={isAltPressed ? "Share to all platforms - opens multiple tabs" : "Share content"}
            >
              {isAltPressed ? (
                <span className={`font-bold ${isCompact ? 'text-xs' : 'text-sm'}`}>ALL</span>
              ) : (
                <FiShare2 className={isCompact ? "w-5 h-5" : "w-6 h-6"} />
              )}
            </button>
          </div>

          {displayPlatforms.map((platform, index) => {
            const angle = ((index * (360 / displayPlatforms.length)) * Math.PI) / 180;
            const radius = isCompact ? 50 : 70;
            const centerPoint = isCompact ? 90 : 120;
            const left = Math.cos(angle) * radius + centerPoint;
            const top = Math.sin(angle) * radius + centerPoint;
            
            const buttonContent = platform.name === 'copyLink' ? (
              <button
                onClick={(e) => handlePlatformClick(() => handleCopyLink(e))}
                className={`
                  ${isCompact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full shadow-lg
                  flex items-center justify-center
                  ${platform.bgColor} ${platform.textColor}
                  hover:opacity-90 transform hover:scale-110
                  transition-all duration-200
                  ${platform.requiresCtrl && !isCtrlPressed ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                title={platform.requiresCtrl ? `Press ${isMac ? 'Cmd' : 'Ctrl'} for ${platform.label}` : platform.label}
                disabled={platform.requiresCtrl && !isCtrlPressed}
              >
                <platform.icon className={isCompact ? "w-4 h-4" : "w-5 h-5"} />
              </button>
            ) : (
              <a
                href={platform.getShareUrl ? (() => {
                  // Use platform-specific blurb if available
                  let platformDescription = description;
                  if (platform.name === 'twitter' && shareBlurbs.twitter) {
                    platformDescription = shareBlurbs.twitter;
                  } else if (platform.name === 'facebook' && shareBlurbs.facebook) {
                    platformDescription = shareBlurbs.facebook;
                  } else if (platform.name === 'linkedin' && shareBlurbs.linkedin) {
                    platformDescription = shareBlurbs.linkedin;
                  }
                  return platform.getShareUrl(currentUrl, title, platformDescription, tags);
                })() : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  ${isCompact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full shadow-lg
                  flex items-center justify-center
                  ${platform.bgColor} ${platform.textColor}
                  hover:opacity-90 transform hover:scale-110
                  transition-all duration-200
                  ${platform.requiresCtrl && !isCtrlPressed ? 'opacity-50 pointer-events-none' : ''}
                `}
                title={platform.requiresCtrl ? `Press ${isMac ? 'Cmd' : 'Ctrl'} for ${platform.label}` : platform.label}
                onClick={(e) => {
                  if (platform.requiresCtrl && !isCtrlPressed) {
                    e.preventDefault();
                  } else if (platform.handleClick) {
                    e.preventDefault();
                    handlePlatformClick(() => platform.handleClick!(e, currentUrl, title, description, tags, fullContent, htmlContent, coverImage));
                  } else {
                    // For regular links, close menu on mobile after small delay
                    if (isMobile) {
                      setTimeout(() => setIsExpanded(false), 300);
                    }
                  }
                }}
              >
                <platform.icon className={isCompact ? "w-4 h-4" : "w-5 h-5"} />
              </a>
            );

            return (
              <div 
                key={platform.name}
                style={{
                  position: 'absolute',
                  left: `${left - 15}px`,
                  top: `${top - 15}px`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: showMenu ? 'scale(1)' : 'scale(0)',
                  opacity: showMenu ? 1 : 0,
                  zIndex: 999999
                }}
                className={platform.requiresCtrl && !isCtrlPressed ? 'opacity-40' : ''}
              >
                {buttonContent}
              </div>
            );
          })}
        </div>
      </>
    );

    return createPortal(menu, portalContainer);
  };

  return (
    <div 
      ref={shareButtonRef}
      className={`inline-block ${isMobile ? 'mobile-share-visible' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button
        onClick={isAltPressed ? handleShareToAll : handleMainShareButtonClick}
        className={`
          ${isCircular 
            ? `rounded-full ${isCompact ? 'w-8 h-8' : 'w-12 h-12'} flex items-center justify-center` 
            : 'px-3 py-2 rounded-lg flex items-center gap-2'
          } 
          ${isAltPressed 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400' 
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-200 dark:border-gray-700'
          }
          shadow-md hover:${isAltPressed 
            ? 'from-purple-600 to-pink-600' 
            : 'bg-blue-50 dark:hover:bg-gray-700'
          }
          transition-all duration-300
          ${isAltPressed ? 'animate-pulse' : 'animate-glow'}
        `}
        aria-label={isAltPressed ? "Share to all platforms at once" : "Share content"}
        title={isAltPressed ? "Share to all platforms - opens multiple tabs" : "Share content (Hold Alt for ALL mode)"}
      >
        {isAltPressed ? (
          <span className={`font-bold ${isCompact ? 'text-xs' : 'text-sm'}`}>ALL</span>
        ) : (
          <FiShare2 className={isCompact ? "w-4 h-4" : "w-6 h-6"} />
        )}
      </button>

      {renderMenu()}



      {showTooltip && portalContainer && createPortal(
        <div 
          className="fixed px-3 py-1 bg-black text-white text-sm rounded-md"
          style={{
            zIndex: 999999,
            left: shareButtonRef.current ? `${shareButtonRef.current.getBoundingClientRect().left}px` : '50%',
            top: shareButtonRef.current ? `${shareButtonRef.current.getBoundingClientRect().bottom + 8}px` : '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {tooltipText}
        </div>,
        portalContainer
      )}
    </div>
  );
};

export default SocialShare;