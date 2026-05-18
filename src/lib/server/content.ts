import { readFileSync } from 'fs';
import { join } from 'path';
import { existsSync } from 'fs';
import yaml from 'js-yaml';
import { cache } from 'react';

export interface CategoryConfig {
  title: string;
  description: string;
  display_count: number;
  pinned: string[];
}

export interface HomePageContent {
  title: string;
  description: string;
  hero: {
    title?: string;
    subtitle: string;
    quick_links?: Array<{
      title: string;
      description: string;
      link: string;
      type: 'music' | 'writing';
    }>;
    cta?: {
      text: string;
      link: string;
    };
    background_style?: 'dynamic' | 'image' | 'gradient';
    background_image?: string;
  };
  featured_posts: {
    title: string;
    description: string;
    kids_corner?: CategoryConfig;
    cerebral_songs?: CategoryConfig;
    fiction?: CategoryConfig;
    musings?: CategoryConfig;
    projects?: CategoryConfig;
  };
  features: {
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    button: {
      text: string;
      link: string;
    };
  };
  content: string;
}

// Cached content loader - ensures it only loads once
export const loadHomeContent = cache((): HomePageContent | null => {
  try {
    // First try the _pages directory
    const pagesPath = join(process.cwd(), 'docs', '_pages', 'home', 'content.yaml');
    
    // Then try directly in the docs directory
    const directPath = join(process.cwd(), 'docs', 'home', 'content.yaml');
    
    // Check which one exists
    let contentPath = null;
    if (existsSync(pagesPath)) {
      contentPath = pagesPath;
    } else if (existsSync(directPath)) {
      contentPath = directPath;
    }
    
    if (!contentPath) {
      console.warn('Home content file not found');
      return null;
    }
    
    const content = readFileSync(contentPath, 'utf8');
    return yaml.load(content) as HomePageContent;
  } catch (e) {
    console.error('Error loading home content:', e);
    return null;
  }
}); 