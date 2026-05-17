// Script to find duplicate slugs in content

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

// Configuration
const contentDir = path.join(process.cwd(), 'docs');
const excludeDirs = ['node_modules', '.git', '.next', 'public', 'assets'];

// Function to read directory recursively
async function readDirectoryRecursively(dirPath) {
  const files = [];
  
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip excluded directories
        if (excludeDirs.includes(entry.name)) {
          continue;
        }
        
        // Recursively process subdirectories
        const subDirFiles = await readDirectoryRecursively(fullPath);
        files.push(...subDirFiles);
      } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
        // Process markdown files
        files.push(fullPath);
      }
    }
    
    return files;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

// Function to extract slug from file path
function getSlugFromPath(filePath) {
  // Remove content directory from path
  const relativePath = filePath.replace(contentDir, '');
  
  // Convert to URL format
  let slug = relativePath
    .replace(/\\/g, '/') // Replace Windows backslashes with forward slashes
    .replace(/^\//, '')  // Remove leading slash
    .replace(/\.mdx?$/, ''); // Remove .md or .mdx extension
  
  // Special case for index.md files
  if (slug.endsWith('/index')) {
    slug = slug.replace(/\/index$/, '');
  }
  
  return slug;
}

// Main function
async function findDuplicateSlugs() {
  console.log('Scanning for duplicate slugs...');
  
  // Get all markdown files
  const files = await readDirectoryRecursively(contentDir);
  
  // Map files to slugs
  const slugMap = new Map();
  
  for (const file of files) {
    const slug = getSlugFromPath(file);
    
    if (slugMap.has(slug)) {
      slugMap.get(slug).push(file);
    } else {
      slugMap.set(slug, [file]);
    }
  }
  
  // Find duplicates
  const duplicates = [...slugMap.entries()]
    .filter(([slug, files]) => files.length > 1);
  
  // Print results
  if (duplicates.length === 0) {
    console.log('No duplicate slugs found!');
  } else {
    console.log(`Found ${duplicates.length} duplicate slugs:`);
    
    for (const [slug, files] of duplicates) {
      console.log(`\nSlug: ${slug}`);
      console.log('Files:');
      files.forEach(file => {
        console.log(`  - ${file.replace(process.cwd(), '')}`);
      });
    }
    
    console.log('\nSuggestions to fix:');
    console.log('1. Rename one of the duplicate files');
    console.log('2. Move one file to a different directory');
    console.log('3. Add a unique front matter slug in one of the files');
  }
}

// Run the script
findDuplicateSlugs()
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  }); 