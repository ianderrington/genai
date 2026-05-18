import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';
import { getContentDirectory } from './content/filesystem';

export interface Section {
  id: string;
  name: string;
  path: string;
  structure: 'posts' | 'direct'; // Indicates if content is directly in the folder or in a 'posts' subfolder
}

// Cache for directory content checks to avoid redundant filesystem operations
const markdownCache = new Map<string, boolean>();

/**
 * Check if a directory contains markdown files (recursively)
 * @param dirPath Directory path to check
 * @returns Boolean indicating if the directory contains markdown files
 */
async function hasMarkdownFiles(dirPath: string): Promise<boolean> {
  // Check cache first
  if (markdownCache.has(dirPath)) {
    return markdownCache.get(dirPath)!;
  }
  
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
        markdownCache.set(dirPath, true);
        return true;
      }
      
      if (entry.isDirectory()) {
        const hasMarkdown = await hasMarkdownFiles(fullPath);
        if (hasMarkdown) {
          markdownCache.set(dirPath, true);
          return true;
        }
      }
    }
    
    markdownCache.set(dirPath, false);
    return false;
  } catch (error) {
    console.error(`Error checking for markdown files in ${dirPath}:`, error);
    markdownCache.set(dirPath, false);
    return false;
  }
}

/**
 * Determine the structure of a section directory
 * @param dirPath Directory path to check
 * @returns 'posts' if it has a posts subfolder with content, 'direct' otherwise
 */
async function determineSectionStructure(dirPath: string): Promise<'direct' | 'posts'> {
  try {
    // Check if there's a 'posts' subfolder
    const postsPath = path.join(dirPath, 'posts');
    try {
      const postsStats = await fs.stat(postsPath);
      if (postsStats.isDirectory()) {
        // Check if the posts directory has markdown files
        const hasContent = await hasMarkdownFiles(postsPath);
        if (hasContent) {
          return 'posts';
        }
      }
    } catch (e) {
      // posts directory doesn't exist, continue with direct check
    }
    
    // Check if there are markdown files directly in the directory
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
        return 'direct';
      }
    }
    
    // If we get here, there are no direct markdown files, but there might be in subdirectories
    // We'll default to 'direct' structure in this case
    return 'direct';
  } catch (error) {
    console.error(`Error determining section structure for ${dirPath}:`, error);
    return 'direct'; // Default to direct structure
  }
}

/**
 * Get all top-level sections from the docs directory that contain markdown files
 * @returns Array of section objects
 */
export const getSections = cache(async (): Promise<Section[]> => {
  try {
    const sectionsWithContent = [];
    const rootDirectory = process.cwd();
    const docsDirectory = getContentDirectory();

    // First, handle top-level .md files in root directory
    const rootEntries = await fs.readdir(rootDirectory, { withFileTypes: true });
    const rootMdFiles = rootEntries.filter(entry => 
      entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))
      && !entry.name.startsWith('.') // Skip hidden files
      && !['README.md', 'CHANGELOG.md', 'LICENSE.md'].includes(entry.name) // Skip common repo files
    );

    for (const file of rootMdFiles) {
      // Remove the .md or .mdx extension for the ID
      const id = file.name.replace(/\.(md|mdx)$/, '');
      
      // Convert filename to a more readable format
      const name = id
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      sectionsWithContent.push({
        id: file.name, // Keep the .md extension in the ID
        name,
        path: `/${id}`,
        structure: 'direct' as const
      });
    }

    // Then, handle directories in docs folder
    const docsEntries = await fs.readdir(docsDirectory, { withFileTypes: true });
    const dirEntries = docsEntries.filter(entry => 
      entry.isDirectory() && !entry.name.startsWith('.')
    );
    
    for (const dir of dirEntries) {
      const dirPath = path.join(docsDirectory, dir.name);
      const hasContent = await hasMarkdownFiles(dirPath);
      
      if (hasContent) {
        // Determine the structure of this section
        const structure = await determineSectionStructure(dirPath);
        
        // Convert directory name to a more readable format
        const name = dir.name
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
          
        sectionsWithContent.push({
          id: dir.name,
          name,
          path: `/${dir.name}`,
          structure
        });
      }
    }
    
    return sectionsWithContent;
  } catch (error) {
    console.error('Error reading sections:', error);
    return [];
  }
}); 