import { cache } from 'react';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ComponentType } from 'react';
import type { HomePageProps } from '@/layouts/default/home';
// Note: next-mdx-remote v6 installed but serialize not currently used
// import { serialize } from 'next-mdx-remote/serialize';
import { bundleMDX } from 'mdx-bundler';
import { getContentDirectory } from './filesystem';
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import { existsSync } from 'fs';

// Define proper types for the site configuration
interface SiteConfig {
  site: {
    title: string;
    description: string;
    url: string;
    images: {
      og: string;
      twitter: string;
      favicon: string;
    };
    social: {
      twitter: {
        card: 'summary' | 'summary_large_image' | 'app' | 'player';
        handle: string;
      };
      openGraph: {
        type: 'website' | 'article' | 'profile';
        locale: string;
      };
    };
  };
  layout: {
    fonts: Array<{
      family: string;
      subsets: string[];
      variable?: string;
    }>;
    header: {
      navigation: {
        default_order: string[];
        external_links?: Array<{ title: string; href: string; [key: string]: unknown }>;
      };
    };
    footer: {
      copyright: string;
    };
  };
  landing: any;
}

// Default site configuration
const DEFAULT_SITE_CONFIG: SiteConfig = {
  site: {
    title: 'Site Title',
    description: 'Site Description',
    url: 'http://localhost:3000',
    images: {
      og: '/images/og-image.jpg',
      twitter: '/images/twitter-image.jpg',
      favicon: '/favicon.ico'
    },
    social: {
      twitter: {
        card: 'summary_large_image',
        handle: ''
      },
      openGraph: {
        type: 'website',
        locale: 'en_US'
      }
    }
  },
  layout: {
    fonts: [
      {
        family: 'Inter',
        subsets: ['latin']
      },
      {
        family: 'Space_Grotesk',
        subsets: ['latin'],
        variable: '--font-space-grotesk'
      }
    ],
    header: {
      navigation: {
        default_order: ['about', 'blog', 'projects', 'contact']
      }
    },
    footer: {
      copyright: '© {year} All rights reserved.'
    }
  },
  landing: {}
};

interface ContentConfig {
  contentDir: string;  // Root content directory (e.g., 'docs', 'test_docs')
  pagesDir: string;    // Pages directory within content dir (e.g., '_pages')
  defaultLayoutDir: string; // Layout directory (e.g., 'src/layouts/default')
  configFile?: string; // Optional path to config.yaml
}

const DEFAULT_CONFIG: ContentConfig = {
  contentDir: 'docs',
  pagesDir: '_pages',
  defaultLayoutDir: 'src/layouts/default'
};

// Runtime config loaded during build
let runtimeConfig: SiteConfig | null = null;
let contentConfig: ContentConfig = DEFAULT_CONFIG;

// Initialize content configuration
export function initializeContent(config: Partial<ContentConfig> = {}) {
  contentConfig = {
    ...DEFAULT_CONFIG,
    ...config
  };
  
  // Reset runtime config to force reload with new paths
  runtimeConfig = null;
  return contentConfig;
}

// Load and parse YAML configuration - only used in server components
export const loadConfig = cache(() => {
  if (runtimeConfig) {
    return runtimeConfig;
  }

  try {
    // First try specific config path
    const configPath = join(process.cwd(), 'docs', '_pages', 'config.yaml');
    // Then try site.config.yaml in docs root
    const siteConfigPath = join(process.cwd(), 'docs', 'site.config.yaml');
    
    let configContent = null;
    
    if (existsSync(configPath)) {
      configContent = readFileSync(configPath, 'utf8');
    } else if (existsSync(siteConfigPath)) {
      configContent = readFileSync(siteConfigPath, 'utf8');
    } else {
      throw new Error('No configuration file found');
    }
    
    const loadedConfig = yaml.load(configContent) as Partial<SiteConfig>;
    
    runtimeConfig = {
      site: {
        ...DEFAULT_SITE_CONFIG.site,
        ...(loadedConfig?.site || {}),
        social: {
          ...DEFAULT_SITE_CONFIG.site.social,
          ...(loadedConfig?.site?.social || {}),
          twitter: {
            ...DEFAULT_SITE_CONFIG.site.social.twitter,
            ...(loadedConfig?.site?.social?.twitter || {}),
          },
          openGraph: {
            ...DEFAULT_SITE_CONFIG.site.social.openGraph,
            ...(loadedConfig?.site?.social?.openGraph || {}),
          }
        }
      },
      layout: {
        ...DEFAULT_SITE_CONFIG.layout,
        ...(loadedConfig?.layout || {})
      },
      landing: loadedConfig?.landing || {}
    };
    return runtimeConfig;
  } catch (e) {
    console.warn('Could not parse config, using defaults:', e);
    return DEFAULT_SITE_CONFIG;
  }
});

// Load page content - only used in server components
export const loadPageContent = cache((pageName: string) => {
  try {
    // First try the _pages directory
    const pagesPath = join(process.cwd(), 'docs', '_pages', pageName, 'content.yaml');
    
    // Then try directly in the docs directory
    const directPath = join(process.cwd(), 'docs', pageName, 'content.yaml');
    
    // Check which one exists
    let contentPath = null;
    if (existsSync(pagesPath)) {
      contentPath = pagesPath;
    } else if (existsSync(directPath)) {
      contentPath = directPath;
    }
    
    if (!contentPath) {
      return null;
    }
    
    const content = readFileSync(contentPath, 'utf8');
    return yaml.load(content);
  } catch (e) {
    console.warn(`Could not load content for ${pageName}:`, e);
    return null;
  }
});

// Map content types to page names
type PageContent = {
  home: HomePageProps;
};

// Map of page names to their layout components
const PAGE_LAYOUTS = {
  home: () => import('@/layouts/default/home')
} as const;

type PageName = keyof typeof PAGE_LAYOUTS;

// Helper type to extract the component type from a dynamic import
type DynamicImport<T> = Promise<{ default: ComponentType<T> }>;

// Map of page names to their layout loaders with proper typing
const PAGE_LAYOUTS_TYPED: {
  [K in PageName]: () => DynamicImport<PageContent[K]>;
} = PAGE_LAYOUTS;

// Resolve page component and its content
const resolvePageImpl = cache(async <T extends PageName>(pageName: T) => {
  try {
    // Load the page content first
    const content = await loadPageContent(pageName) as PageContent[T];
    
    // Load the layout component
    const layoutLoader = PAGE_LAYOUTS_TYPED[pageName];
    if (!layoutLoader) {
      throw new Error(`No layout found for ${pageName}`);
    }

    const layout = await layoutLoader();
    if (!layout.default) {
      throw new Error(`Layout for ${pageName} does not have a default export`);
    }
    
    return {
      component: layout.default,
      content
    };
  } catch (error) {
    console.error('Error loading page:', error);
    throw error;
  }
});

export const resolvePage = resolvePageImpl;

// Helper to check if a page exists
export const hasPage = (pageName: string): pageName is PageName => {
  return pageName in PAGE_LAYOUTS;
};

// Helper to get content directory configuration
export const getContentConfig = (): ContentConfig => {
  return DEFAULT_CONFIG;
};

export type { SiteConfig, ContentConfig, PageName };

interface MDXOptions {
  remarkPlugins?: any[];
  rehypePlugins?: any[];
}

// export async function resolveContent(filePath: string) {
//   const config = loadConfig();
//   const contentDir = getContentDirectory();
//   const fullPath = path.join(contentDir, filePath);
  
//   try {
//     const fileContent = await fs.readFile(fullPath, 'utf-8');
//     const { data: frontMatter, content } = matter(fileContent);
    
//     // Check if file is MDX
//     const isMDX = path.extname(filePath) === '.mdx';
    
//     let html;
//     if (isMDX) {
//       // Process MDX content
//       const { code } = await bundleMDX({
//         source: content,
//         mdxOptions(options: MDXOptions) {
//           options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
//           options.rehypePlugins = [
//             ...(options.rehypePlugins ?? []),
//             rehypeSlug,
//             [rehypeAutolinkHeadings, { behavior: 'wrap' }],
//             rehypeHighlight,
//           ];
//           return options;
//         },
//       });
//       html = code;
//     } else {
//       // Process regular markdown
//       const mdxSource = await serialize(content, {
//         mdxOptions: {
//           remarkPlugins: [remarkGfm],
//           rehypePlugins: [
//             rehypeSlug,
//             [rehypeAutolinkHeadings, { behavior: 'wrap' }],
//             rehypeHighlight,
//           ],
//         },
//         parseFrontmatter: true,
//       });
//       html = mdxSource.compiledSource;
//     }
    
//     return {
//       frontMatter,
//       content,
//       html,
//     };
//   } catch (error) {
//     console.error(`Error resolving content for ${filePath}:`, error);
//     throw error;
//   }
// } 