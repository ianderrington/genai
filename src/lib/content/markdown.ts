import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import { logger } from '../logger';
import path from 'path';
import remarkGithubBetaBlockquoteAdmonitions from 'remark-github-beta-blockquote-admonitions';
import { StoryConfig } from '@/types/story-config';
import { visit } from 'unist-util-visit';
import { z } from 'zod';
import { MediaConfig } from '@/lib/types/media';
import { Node } from 'unist';
import remarkMdLinks from '../remarkMdLinks';
import NodeCache from 'node-cache';

// Create a cache for processed markdown content
// Set TTL to 1 hour (3600 seconds) in production, 5 minutes in development
const mdCache = new NodeCache({ 
  stdTTL: process.env.NODE_ENV === 'production' ? 3600 : 300, // 5 minutes in dev instead of 10 seconds
  checkperiod: 120,
  useClones: false
});

// Cache key format for markdown content
const getMdCacheKey = (content: string, filePath?: string): string => {
  // Create a stable hash from content instead of base64 to avoid memory issues
  const crypto = require('crypto');
  const contentHash = crypto.createHash('md5').update(content).digest('hex').substring(0, 16);
  const pathHash = filePath ? crypto.createHash('md5').update(filePath).digest('hex').substring(0, 8) : 'unknown';
  return `md:${contentHash}:${pathHash}`;
};

// Define types for heading nodes and text nodes
interface HeadingNode extends Node {
  type: 'element';
  tagName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  properties: {
    id?: string;
    className?: string[];
  };
  children: Array<TextNode | Node>;
}

interface TextNode extends Node {
  type: 'text';
  value: string;
}

export interface Author {
  name: string;
  title?: string;
  image?: string;
}

export interface PostMetadata {
  title: string;
  date: string;
  description?: string;
  dateModified?: string;
  subheader?: string; // Add subheader field
  categories?: string[];
  tags?: string[];
  draft?: boolean;
  image?: string;
  shareBlurbs?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    medium?: string;
    substack?: string;
  };
  author?: Author | string;
  authors?: string;
  authorUrl?: string;
  authorImage?: string;
  authorBio?: string;
  coverImage?: {
    url: string;
    alt?: string;
    caption?: string;
  } | string;
  coverMedia?: MediaConfig;
  readingTime?: string;
  bullets?: string[];
  key_points?: string[];
  show_bullets?: boolean;
  hide?: string[];
  displayStyle?: string;
  render_as?: 'normal' | 'chat';
  defaultViewType?: 'cards' | 'list' | 'icons';
  allowedViewTypes?: ('cards' | 'list' | 'icons')[];
  storyConfig?: Partial<StoryConfig>;
  // Home page specific fields
  features?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  cta?: {
    title: string;
    description: string;
    button: {
      text: string;
      link: string;
    };
  };
  breadcrumbs?: boolean;
  chatSegments?: ChatSegment[];
  contentType?: string;
  // Analytics and sorting fields
  views?: number | string;
  recommendationScore?: number | string;
  
  // TTS Widget Configuration
  tts?: {
    enabled: boolean;
    provider?: 'openai' | 'mock';
    voice?: string;
    voices?: string[]; // Array of voices to show in dropdown
    speed?: number;
    enableSpeed?: boolean; // Show speed control
    enableProgress?: boolean; // Show progress bar
    apiUrl?: string;
    apiKey?: string;
  };
}

export function parseFrontmatter(content: string): {
  metadata: PostMetadata;
  content: string;
  excerpt: string;
} {
  try {
    // Check if the content contains frontmatter (starts with ---)
    const hasFrontmatter = content.trim().startsWith('---');
    
    if (!hasFrontmatter) {
      // Return with empty metadata for files without frontmatter
      logger.warn('Content has no frontmatter');
      return {
        metadata: {
          title: '',
          date: ''
        } as PostMetadata,
        content: content,
        excerpt: '',
      };
    }
    
    const { data, content: markdownContent, excerpt } = matter(content, {
      excerpt: true,
      excerpt_separator: '<!-- excerpt -->',
    });

    // Validate metadata fields that can be strings from YAML and convert them to arrays if needed
    const processMetadataArray = (field: unknown): string[] => {
      if (Array.isArray(field)) {
        return field;
      } else if (typeof field === 'string') {
        return field.split(',').map((s) => s.trim());
      }
      return [];
    };

    // Process specific fields that might be strings but need to be arrays
    if (data.categories && !Array.isArray(data.categories)) {
      data.categories = processMetadataArray(data.categories);
    }
    if (data.tags && !Array.isArray(data.tags)) {
      data.tags = processMetadataArray(data.tags);
    }
    if (data.hide && !Array.isArray(data.hide)) {
      data.hide = processMetadataArray(data.hide);
    }
    if (data.features && !Array.isArray(data.features)) {
      data.features = processMetadataArray(data.features);
    }

    // If bullets are provided as a string, convert to array
    if (data.bullets && typeof data.bullets === 'string') {
      data.bullets = data.bullets.split('\n').map((s: string) => s.trim());
    }

    // If key_points are provided as a string, convert to array
    if (data.key_points && typeof data.key_points === 'string') {
      data.key_points = data.key_points.split('\n').map((s: string) => s.trim());
    }

    const metadata = data as PostMetadata;
    return {
      metadata,
      content: markdownContent,
      excerpt: excerpt || '',
    };
  } catch (error) {
    logger.error(`Error parsing front matter: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

// Custom plugin to process Mermaid diagrams
const remarkProcessMermaid = () => {
  return (tree: Node) => {
    visit(tree, 'code', (node: any) => {
      if (node.lang === 'mermaid') {
        // Convert Mermaid code block to a div with data-mermaid attribute
        node.type = 'html';
        node.value = `<div data-mermaid="${encodeURIComponent(node.value)}"></div>`;
      }
    });
  };
};

// Custom plugin to process heading IDs
const remarkProcessHeadingIds = () => {
  return (tree: Node) => {
    visit(tree, node => {
      // Type guard for heading nodes
      if (
        node.type === 'heading' && 
        'children' in node && 
        Array.isArray(node.children) && 
        node.children.length > 0
      ) {
        const lastChild = node.children[node.children.length - 1];
        if (lastChild && 'value' in lastChild) {
          const match = lastChild.value.match(/\s+\{#([a-zA-Z0-9_-]+)\}$/);
          if (match) {
            // Remove the {#id} from the text
            lastChild.value = lastChild.value.replace(/\s+\{#([a-zA-Z0-9_-]+)\}$/, '');
            
            // Set the ID on the heading node
            if (!('data' in node)) {
              (node as any).data = {};
            } else if (!node.data) {
              node.data = {};
            }
            
            const data = (node as any).data;
            data.hProperties = data.hProperties || {};
            data.hProperties.id = match[1];
          }
        }
      }
    });
  };
};

// Custom plugin to process sidenotes: > [!sidenote] blockquotes → div[data-sidenote]
const remarkProcessSidenotes = () => {
  return (tree: Node) => {
    let counter = 0;
    visit(tree, (node: any) => {
      if (
        node.type === 'blockquote' &&
        'children' in node &&
        Array.isArray(node.children) &&
        node.children.length > 0
      ) {
        const firstChild = node.children[0];
        if (
          firstChild &&
          firstChild.type === 'paragraph' &&
          'children' in firstChild &&
          Array.isArray(firstChild.children) &&
          firstChild.children.length > 0 &&
          firstChild.children[0].type === 'text' &&
          'value' in firstChild.children[0]
        ) {
          const text = firstChild.children[0].value;
          const match = text.match(/^\[!sidenote\]/i);
          if (match) {
            counter++;
            // Remove the [!sidenote] prefix from the text
            firstChild.children[0].value = text.replace(/^\[!sidenote\]\s*/i, '');

            // If the text node is now empty, remove it
            if (firstChild.children[0].value === '') {
              firstChild.children.shift();
            }
            // If the paragraph is now empty, remove it
            if (firstChild.children.length === 0) {
              node.children.shift();
            }

            // Convert blockquote to a div with sidenote data attributes
            node.data = node.data || {};
            node.data.hName = 'div';
            node.data.hProperties = node.data.hProperties || {};
            node.data.hProperties.dataSidenote = 'true';
            node.data.hProperties.dataSidenoteId = `sn-${counter}`;
          }
        }
      }
    });
  };
};

// Custom rehype plugin to ensure IDs don't have user-content- prefixes
const rehypeCleanIds = () => {
  return (tree: Node) => {
    visit(tree, node => {
      // Type guard for element nodes with ID properties
      if (
        node.type === 'element' && 
        'properties' in node && 
        node.properties && 
        typeof node.properties === 'object' &&
        node.properties !== null &&
        'id' in node.properties && 
        typeof node.properties.id === 'string'
      ) {
        // Remove user-content- prefix from all IDs
        node.properties.id = node.properties.id.replace(/^user-content-/, '');
      }
    });
  };
};

// MkDocs admonition types and their CSS color classes
const ADMONITION_TYPES = [
  'note', 'tip', 'warning', 'danger', 'abstract', 'info', 'success',
  'question', 'failure', 'bug', 'example', 'quote', 'important', 'caution',
];

// Map GitHub/Obsidian `> [!TYPE]` title text to MkDocs type classes
const TITLE_TO_ADMONITION_TYPE: Record<string, string> = {
  note: 'note', tip: 'tip', hint: 'tip',
  warning: 'warning', caution: 'warning', attention: 'warning', important: 'important',
  danger: 'danger', error: 'danger',
  info: 'info', information: 'info',
  success: 'success', check: 'success', done: 'success',
  question: 'question', help: 'question', faq: 'question',
  failure: 'failure', fail: 'failure', missing: 'failure',
  bug: 'bug', example: 'example',
  quote: 'quote', cite: 'quote',
  abstract: 'abstract', summary: 'abstract', tldr: 'abstract',
};

/**
 * Convert inline markdown (links, code, images, bold, italic) to HTML for use
 * inside admonition title elements, where the unified pipeline won't process it.
 */
function processInlineMarkdown(text: string): string {
  const esc = (s: string) =>
    s.replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c] ?? c));

  return text
    // Images: ![alt](src)
    .replace(/!\[([^\]]*)\]\(([^)]*)\)/g, (_, alt, src) =>
      `<img class="admonition-title-img" src="${src.replace(/[<>"]/g, '')}" alt="${esc(alt)}">`)
    // Links: [text](url)
    .replace(/\[([^\]]*)\]\(([^)]*)\)/g, (_, linkText, href) =>
      `<a href="${href.replace(/[<>"]/g, '')}" rel="noopener noreferrer">${esc(linkText)}</a>`)
    // Auto-links: [https://url]
    .replace(/\[(https?:\/\/[^\]]+)\]/g, (_, url) =>
      `<a href="${url.replace(/[<>"]/g, '')}" rel="noopener noreferrer">${esc(url)}</a>`)
    // Inline code: `code`
    .replace(/`([^`]+)`/g, (_, code) => `<code>${esc(code)}</code>`)
    // Bold: **text**
    .replace(/\*\*([^*]+)\*\*/g, (_, t) => `<strong>${t}</strong>`)
    // Italic: *text* (not preceded/followed by another *)
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, (_, t) => `<em>${t}</em>`);
}

/**
 * Parse the portion of an admonition line after the `!!!` / `???` marker.
 * Handles all of:
 *   type "title"       →  { adType: type, title }
 *   type rest…         →  { adType: type, title: rest }
 *   type               →  { adType: type, title: capitalized type }
 *   "title"            →  { adType: 'note', title }
 */
function parseAdmonitionHeader(rest: string): { adType: string; title: string } {
  // type "title" (with optional trailing content after closing quote)
  let m = rest.match(/^(\w+)\s+"([^"]*)"/);
  if (m) return { adType: m[1].toLowerCase(), title: m[2] };

  // "title" with no type
  m = rest.match(/^"([^"]*)"/);
  if (m) return { adType: 'note', title: m[1] };

  // type followed by unquoted rest (e.g. `!!! type [link]`)
  m = rest.match(/^(\w+)\s+(.*)/);
  if (m) return { adType: m[1].toLowerCase(), title: m[2].trim() };

  // bare type word only
  m = rest.match(/^(\w+)$/);
  if (m) {
    const t = m[1].toLowerCase();
    return { adType: t, title: t.charAt(0).toUpperCase() + t.slice(1) };
  }

  return { adType: 'note', title: rest.trim() };
}

/**
 * Preprocesses MkDocs-style admonitions (!!! and ???) into HTML divs/details
 * before the markdown string enters the unified pipeline.
 *
 * Handles:
 *   !!! type "Optional title"
 *   !!! "title"              (no type — defaults to note)
 *   !!! type rest of line    (unquoted title)
 *   ??? type "title"         (collapsible, closed)
 *   ???+ type "title"        (collapsible, open by default)
 *       body indented by 4 spaces or 1 tab
 */
function preprocessMkDocsAdmonitions(content: string): string {
  const lines = content.split('\n');
  const output: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    const admonitionMatch = line.match(/^(!!!|\?\?\?[+]?)\s+(.*)/);

    if (admonitionMatch && admonitionMatch[2].trim()) {
      const marker = admonitionMatch[1];
      const { adType, title } = parseAdmonitionHeader(admonitionMatch[2]);
      const isCollapsible = marker.startsWith('???');
      const isOpen = marker === '???+';

      // Collect indented body lines (4-space or 1-tab indent)
      const bodyLines: string[] = [];
      let j = i + 1;
      while (j < lines.length && (lines[j].startsWith('    ') || lines[j].startsWith('\t') || lines[j] === '')) {
        if (lines[j] === '') {
          bodyLines.push('');
        } else {
          bodyLines.push(lines[j].replace(/^(    |\t)/, ''));
        }
        j++;
      }

      // Trim trailing blank lines from body
      while (bodyLines.length > 0 && bodyLines[bodyLines.length - 1] === '') {
        bodyLines.pop();
      }

      const bodyContent = bodyLines.join('\n');
      const safeType = ADMONITION_TYPES.includes(adType) ? adType : 'note';
      const renderedTitle = processInlineMarkdown(title);

      if (isCollapsible) {
        const openAttr = isOpen ? ' open' : '';
        output.push(`<details class="admonition admonition-${safeType} collapsible"${openAttr}>`);
        output.push(`<summary class="admonition-title">${renderedTitle}</summary>`);
        output.push(`<div class="admonition-body">\n\n${bodyContent}\n\n</div>`);
        output.push(`</details>`);
      } else {
        output.push(`<div class="admonition admonition-${safeType}">`);
        output.push(`<p class="admonition-title">${renderedTitle}</p>`);
        output.push(`<div class="admonition-body">\n\n${bodyContent}\n\n</div>`);
        output.push(`</div>`);
      }

      i = j;
      continue;
    }

    output.push(line);
    i++;
  }

  return output.join('\n');
}

/**
 * Rehype plugin: adds admonition type classes to `> [!TYPE]` blockquotes that
 * were converted to `<div class="admonition">` by remarkGithubBetaBlockquoteAdmonitions.
 * The plugin reads the title text to determine which type class to add.
 */
const rehypeAddAdmonitionTypeClasses = () => {
  return (tree: Node) => {
    visit(tree, 'element', (node: any) => {
      if (
        node.tagName === 'div' &&
        Array.isArray(node.properties?.className) &&
        node.properties.className.includes('admonition') &&
        !node.properties.className.some(
          (c: string) => c !== 'admonition' && c.startsWith('admonition-')
        )
      ) {
        const titleChild = node.children?.find(
          (child: any) =>
            child.type === 'element' &&
            child.tagName === 'p' &&
            Array.isArray(child.properties?.className) &&
            child.properties.className.includes('admonition-title')
        );
        if (titleChild) {
          const getText = (n: any): string => {
            if (n.type === 'text') return n.value ?? '';
            if (Array.isArray(n.children)) return n.children.map(getText).join('');
            return '';
          };
          const titleText = getText(titleChild).trim().toLowerCase();
          const typeKey = TITLE_TO_ADMONITION_TYPE[titleText] ?? 'note';
          node.properties.className.push(`admonition-${typeKey}`);
        }
      }
    });
  };
};

/**
 * Convert markdown to HTML
 * @param content The markdown content to convert
 * @param filePath Optional file path to determine if special handling is needed
 * @returns The HTML content
 */
export async function markdownToHtml(content: string, filePath?: string): Promise<string> {
  try {
    // Check if we have this content cached already
    const cacheKey = getMdCacheKey(content, filePath);
    const cachedHtml = mdCache.get<string>(cacheKey);
    
    if (cachedHtml) {
      return cachedHtml;
    }

    // Preprocess MkDocs admonitions (!!! / ???) into raw HTML before the AST is built
    const preprocessed = preprocessMkDocsAdmonitions(content);

    // Removed excessive logging - only log errors and warnings

    // Process custom ID syntax in markdown headers: ## Header {#custom-id}
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkProcessMermaid) // Process Mermaid diagrams
      .use(remarkProcessHeadingIds) // Process custom heading IDs
      // Add remarkMdLinks to convert markdown links from .md to .html
      .use(remarkMdLinks, {
        rootDir: process.cwd(),
        currentFilePath: filePath || path.join(process.cwd(), 'content'),
        checkFiles: false // Don't check files to avoid fs usage in client components
      })
      .use(remarkProcessSidenotes)
      .use(remarkGithubBetaBlockquoteAdmonitions)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSlug) // Add IDs to headings that don't have them
      .use(rehypeCleanIds) // Clean up IDs to remove user-content- prefixes
      .use(rehypeKatex)
      .use(rehypeAddAdmonitionTypeClasses)
      .use(rehypeSanitize, {
        ...defaultSchema,
        tagNames: [
          ...(defaultSchema.tagNames || []),
          'details',
          'summary',
          'script',
          'iframe',
          'math',
          'semantics',
          'mrow',
          'mi',
          'mo',
          'mn',
          'msup',
          'msub',
          'msubsup',
          'mfrac',
          'mover',
          'munder',
          'munderover',
          'msqrt',
          'mroot',
          'mtable',
          'mtr',
          'mtd',
          'mtext',
          'annotation',
          'annotation-xml',
        ],
        attributes: {
          ...defaultSchema.attributes,
          math: ['xmlns', 'display'],
          annotation: ['encoding'],
          'annotation-xml': ['encoding'],
          svg: ['xmlns', 'viewBox', 'width', 'height', 'style', 'aria-hidden', 'focusable'],
          path: ['d', 'style'],
          g: ['transform'],
          use: ['href'],
          rect: ['x', 'y', 'width', 'height', 'rx', 'ry'],
          div: [
            ...(defaultSchema.attributes?.div || []),
            'className',
            'data-type',
            'data-warning-type',
            'dataMermaid',
            'dataSidenote',
            'dataSidenoteId',
            'id'
          ],
          details: ['className', 'open'],
          summary: ['className'],
          p: [
            ...(defaultSchema.attributes?.p || []),
            'className',
          ],
          img: [
            ...(defaultSchema.attributes?.img || []),
            'className',
          ],
          blockquote: [
            ...(defaultSchema.attributes?.blockquote || []),
            'class',
            'data-type'
          ],
          code: [
            ...(defaultSchema.attributes?.code || []),
            ['className']
          ],
          span: [
            ...(defaultSchema.attributes?.span || []),
            ['className'],
            'style',
            'aria-hidden',
          ],
          'h1,h2,h3,h4,h5,h6': [
            ...(defaultSchema.attributes?.['h1,h2,h3,h4,h5,h6'] || []),
            'id'
          ],
          a: [
            ...(defaultSchema.attributes?.a || []),
            'id',
            'href',
            'target',
            'rel'
          ],
          script: [
            'src',
            'type',
            'charset',
            'async',
            'defer'
          ],
          iframe: [
            'src',
            'width',
            'height',
            'style',
            'frameborder',
            'allowfullscreen',
            'allow'
          ]
        }
      })
      .use(rehypeStringify);

    const result = await processor.process(preprocessed);
    
    let html = result.toString();
    
    // Add explicit anchors for any remaining {#id} patterns
    html = html.replace(/<(h[1-6])([^>]*)>\s*(.*?)\s*\{#([a-zA-Z0-9_-]+)\}\s*<\/\1>/g, '<$1$2 id="$4">$3</$1>');
    
    // Add standalone anchors for manually specified anchors not attached to headings
    html = html.replace(/\{#([a-zA-Z0-9_-]+)\}/g, '<a id="$1"></a>');
    
    // Final cleanup to ensure IDs don't have user-content- prefixes
    html = html.replace(/id="user-content-([^"]+)"/g, 'id="$1"');
    
    // Cache the result before returning
    mdCache.set(cacheKey, html);
    
    return html;
  } catch (error) {
    return `<div class="error">Error converting markdown to HTML: ${error instanceof Error ? error.message : String(error)}</div>`;
  }
}

// Function to clear markdown cache
export function clearMarkdownCache() {
  mdCache.flushAll();
}

export function getMediaConfigFromFrontmatter(mediaString: string | Record<string, unknown>): MediaConfig | null {
  try {
    const mediaConfigSchema = z.object({
      type: z.union([z.literal('image'), z.literal('video'), z.literal('embed')]),
      url: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional(),
      attributes: z.record(z.string(), z.any()).optional(),
    });

    // If mediaString is already an object, validate it
    if (typeof mediaString === 'object') {
      const result = mediaConfigSchema.safeParse(mediaString);
      if (result.success) {
        return result.data as MediaConfig;
      } else {
        logger.error(`Invalid media config object: ${result.error}`);
        return null;
      }
    }

    // If mediaString is a string, parse it as JSON and validate
    try {
      const mediaObject = JSON.parse(mediaString);
      const result = mediaConfigSchema.safeParse(mediaObject);
      if (result.success) {
        return result.data as MediaConfig;
      } else {
        logger.error(`Invalid media config JSON: ${result.error}`);
        return null;
      }
    } catch (error) {
      // If parsing fails, treat it as a simple image URL
      return {
        type: 'image',
        url: mediaString,
      };
    }
  } catch (error) {
    logger.error(`Error processing media config: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

// Add warning type handling
const warningTypes = ['default', 'ferromagnetic', 'hazard', 'neural'] as const;
type WarningType = typeof warningTypes[number];

function isValidWarningType(type: string): type is WarningType {
  return warningTypes.includes(type as WarningType);
}

/**
 * Process blockquotes with warning styles from frontmatter
 */
function remarkProcessWarnings() {
  return (tree: any) => {
    visit(tree, node => {
      // Check if node is a blockquote
      if (
        node.type === 'blockquote' && 
        'children' in node && 
        Array.isArray(node.children) && 
        node.children.length > 0
      ) {
        // Check if there's a paragraph as the first child
        const firstChild = node.children[0];
        if (
          firstChild && 
          firstChild.type === 'paragraph' && 
          'children' in firstChild && 
          Array.isArray(firstChild.children) && 
          firstChild.children.length > 0 && 
          firstChild.children[0].type === 'text' && 
          'value' in firstChild.children[0]
        ) {
          const text = firstChild.children[0].value;
          
          // Check for warning style syntax [!warning-type]
          const match = text.match(/^\[!(.*?)\]/);
          if (match) {
            const type = match[1].toLowerCase();
            if (isValidWarningType(type)) {
              // Remove the [!type] prefix from the text
              firstChild.children[0].value = text.replace(/^\[!.*?\]\s*/, '');
              
              // Add warning type to blockquote data
              node.data = node.data || {};
              node.data.hProperties = node.data.hProperties || {};
              node.data.hProperties['data-warning-type'] = type;
            }
          }
        }
      }
    });
  };
}

/**
 * Generate an excerpt from markdown content
 * @param content The markdown content to generate an excerpt from
 * @param maxLength The maximum length of the excerpt
 * @param filePath Optional file path to determine if special handling is needed
 * @returns The generated excerpt
 */
export async function generateExcerpt(content: string, maxLength: number = 160, filePath?: string): Promise<string> {
  // Check for the more tag (handle both formats: <!--more--> and <!-- more -->)
  let moreTagIndex = content.indexOf('<!--more-->');
  if (moreTagIndex === -1) {
    moreTagIndex = content.indexOf('<!-- more -->');
  }
  
  let excerptMarkdown = '';
  
  if (moreTagIndex !== -1) {
    // Get the content before the more tag
    excerptMarkdown = content.slice(0, moreTagIndex).trim();
  } else {
    // Otherwise, use the first paragraph or a portion of it
    const firstParagraphMatch = content.match(/^(.*?)(?:\n\n|$)/);
    if (firstParagraphMatch && firstParagraphMatch[1]) {
      const firstParagraph = firstParagraphMatch[1].trim();
      
      // Calculate length without markdown formatting for length check only
      const plainText = firstParagraph
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Keep link text
        .replace(/[*_~`#]/g, ''); // Remove markdown markers for length calculation only
      
      if (plainText.length <= maxLength) {
        excerptMarkdown = firstParagraph; // Use full markdown paragraph
      } else {
        // Find a good breaking point in the original markdown
        let currentLength = 0;
        let breakIndex = firstParagraph.length;
        let inMarkdown = false;
        let markdownBuffer = '';
        
        for (let i = 0; i < firstParagraph.length; i++) {
          const char = firstParagraph[i];
          
          if (char === '[' || char === '*' || char === '_' || char === '`') {
            inMarkdown = true;
            markdownBuffer += char;
            continue;
          }
          
          if (inMarkdown) {
            markdownBuffer += char;
            if (char === ']' || char === '*' || char === '_' || char === '`') {
              inMarkdown = false;
              // Only count the actual text length, not the markdown
              currentLength += markdownBuffer.replace(/[\[\]_*`]/g, '').length;
              markdownBuffer = '';
            }
            continue;
          }
          
          currentLength++;
          if (currentLength > maxLength - 3) {
            // Find the last space before this point
            const lastSpace = firstParagraph.lastIndexOf(' ', i);
            if (lastSpace !== -1) {
              breakIndex = lastSpace;
            } else {
              breakIndex = i;
            }
            break;
          }
        }
        
        excerptMarkdown = firstParagraph.slice(0, breakIndex).trim() + '...';
      }
    }
  }
  
  // Return the markdown directly instead of converting to HTML
  return excerptMarkdown || '';
}

// Define Zod schema for ChatSegmentMetadata
const ChatSegmentMetadataSchema = z.object({
  delay: z.number().optional(),          // Delay before starting this segment
  speed: z.number().optional(),          // Custom speed for this segment
  pause: z.boolean().optional(),         // Whether to pause after this segment
  type: z.enum(['warning', 'narrative', 'dialogue', 'system', 'header']).optional(), // Type of chat segment
  style: z.object({
    background: z.string().optional(),
    textColor: z.string().optional(),
    fadeIn: z.boolean().optional(),
  }).optional(),
  transition: z.object({
    type: z.enum(['fade', 'slide', 'type']).optional(),
    duration: z.number().optional(),
  }).optional(),
  storyControl: z.object({
    action: z.enum(['stop', 'pause', 'continue']).optional(),
    duration: z.number().optional(),
  }).optional(),
  sound: z.string().url().optional(), // Add sound property
}).passthrough(); // Allow other properties

// Define type from schema
export type ChatSegmentMetadata = z.infer<typeof ChatSegmentMetadataSchema>;

export class ChatSegment {
  content: string; // Processed HTML content
  metadata: ChatSegmentMetadata;
  index: number;

  constructor(content: string, index: number, metadata: ChatSegmentMetadata = {}) {
    this.content = content;
    this.index = index;
    this.metadata = metadata;
  }

  static parseMetadata(jsonString: string): ChatSegmentMetadata {
    try {
      const rawData = JSON.parse(jsonString);
      const parsed = ChatSegmentMetadataSchema.safeParse(rawData);
      if (parsed.success) {
        return parsed.data;
      } else {
        logger.warn(`Invalid chat segment metadata format: ${jsonString}. Errors: ${parsed.error.message}`);
        return {}; // Return default empty metadata on parse failure
      }
    } catch (error) {
      // Combine error into the message string
      logger.warn(`Error parsing chat segment metadata JSON: ${jsonString}. Error: ${error instanceof Error ? error.message : String(error)}`); 
      return {}; // Return default empty metadata on JSON parse error
    }
  }
}

// Interface for the raw segment before HTML conversion
interface RawMarkdownSegment {
  rawMarkdown: string;
  metadata: ChatSegmentMetadata;
  index: number;
}

/**
 * Splits markdown content by horizontal rules (--- or --- { ... }) 
 * and parses metadata associated with each segment.
 * @param markdownContent The raw markdown content after frontmatter.
 * @returns An array of RawMarkdownSegment objects.
 */
export function splitMarkdownIntoSegments(markdownContent: string): RawMarkdownSegment[] {
  // Normalize line endings
  const normalizedContent = markdownContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Regex to match the separator line globally
  const separatorRegex = /^---\s*({.*})?\s*$/gm;

  // Find all separators and their metadata first
  const separators: { index: number; metadata: ChatSegmentMetadata }[] = [];
  let match;
  while ((match = separatorRegex.exec(normalizedContent)) !== null) {
    let metadata: ChatSegmentMetadata = {};
    if (match[1]) { // JSON part captured
      metadata = ChatSegment.parseMetadata(match[1]);
    }
    separators.push({ index: match.index, metadata });
     // Explicitly reset lastIndex if the match was zero-length (though unlikely here)
     if (match.index === separatorRegex.lastIndex) {
        separatorRegex.lastIndex++;
    }
  }

  const segments: RawMarkdownSegment[] = [];
  let currentSegmentStart = 0;
  let segmentIndex = 0;

  // Add segment before the first separator (if any content exists)
  const firstSeparatorIndex = separators.length > 0 ? separators[0].index : normalizedContent.length;
  const firstSegmentText = normalizedContent.substring(currentSegmentStart, firstSeparatorIndex).trim();
  if (firstSegmentText) {
      segments.push({
          rawMarkdown: firstSegmentText,
          metadata: {}, // No metadata before the first separator
          index: segmentIndex++
      });
  }

  // Process segments between separators
  for (let i = 0; i < separators.length; i++) {
      const separator = separators[i];
      // Find the start of the text *after* the current separator line
      // We need to find the newline character after the separator's starting index
      const endOfSeparatorLine = normalizedContent.indexOf('\n', separator.index);
      const segmentStart = endOfSeparatorLine === -1 ? normalizedContent.length : endOfSeparatorLine + 1;

      const nextSeparatorIndex = (i + 1 < separators.length) ? separators[i + 1].index : normalizedContent.length;

      const segmentText = normalizedContent.substring(segmentStart, nextSeparatorIndex).trim();

      // Only add a segment if there's actual text content.
      // The metadata from the *current* separator applies to the *following* segment text.
      if (segmentText) {
          segments.push({
              rawMarkdown: segmentText,
              metadata: separator.metadata, // Metadata from the preceding separator
              index: segmentIndex++
          });
      } else if (Object.keys(separator.metadata).length > 0) {
          // If there's no text but there *is* metadata, create a segment for the metadata action
           segments.push({
              rawMarkdown: "", // Empty markdown
              metadata: separator.metadata,
              index: segmentIndex++
          });
      }
  }

  return segments;
}

// Example usage in markdown:
/*
First segment content
<!-- @chat {"speed": 1.5, "delay": 1000} -->

---
Second segment with custom speed
<!-- @chat {"pause": true, "style": {"background": "dark"}} -->

---
Final segment
*/ 