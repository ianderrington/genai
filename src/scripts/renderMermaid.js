const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const POSTS_DIR = 'docs/blog/';
const DIAGRAMS_DIR = 'public/diagrams';
const CACHE_FILE = path.join(DIAGRAMS_DIR, '.mermaid-cache.json');

// Ensure diagrams directory exists
if (!fs.existsSync(DIAGRAMS_DIR)) {
  fs.mkdirSync(DIAGRAMS_DIR, { recursive: true });
}

// Load cache if it exists
let fileCache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    fileCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (e) {
    console.error('Error reading cache file:', e);
    fileCache = {};
  }
}

function processMermaidBlocks(content, filePath) {
  const regex = /```mermaid\n([\s\S]*?)```/g;
  let match;
  
  // Get file stats
  const stats = fs.statSync(filePath);
  const lastModified = stats.mtime.getTime();
  
  // Skip if file hasn't changed since last processing
  if (fileCache[filePath] && fileCache[filePath].lastModified >= lastModified) {
    return false;
  }
  
  console.log('Processing file:', filePath);
  
  const fileHash = Buffer.from(filePath).toString('base64').replace(/[/+=]/g, '_');
  let diagramsProcessed = 0;

  while ((match = regex.exec(content)) !== null) {
    const diagramContent = match[1];
    const diagramName = `${fileHash}-${match.index}`;
    const diagramPath = path.join(DIAGRAMS_DIR, `${diagramName}.svg`);
    
    // Skip if diagram already exists and file hasn't been modified
    if (fs.existsSync(diagramPath) && fileCache[filePath] && fileCache[filePath].lastModified >= lastModified) {
      continue;
    }
    
    console.log('Rendering mermaid diagram');
    const tempFile = path.join(DIAGRAMS_DIR, `temp-${diagramName}.mmd`);
    try {
      fs.writeFileSync(tempFile, diagramContent);
      execSync(`npx mmdc -i ${tempFile} -o ${diagramPath}`, { stdio: 'inherit' });
      diagramsProcessed++;
    } catch (error) {
      console.error('Failed to render diagram:', error);
    } finally {
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }
    }
  }
  
  // Update cache
  fileCache[filePath] = {
    lastModified: lastModified,
    diagramsProcessed: diagramsProcessed
  };
  
  return diagramsProcessed > 0;
}

function processMarkdownFiles(dir) {
  const files = fs.readdirSync(dir);
  let filesProcessed = 0;
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      filesProcessed += processMarkdownFiles(fullPath);
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (processMermaidBlocks(content, fullPath)) {
        filesProcessed++;
      }
    }
  });
  
  return filesProcessed;
}

const filesProcessed = processMarkdownFiles(POSTS_DIR);
console.log(`Processed ${filesProcessed} files with changes`);

// Save cache
fs.writeFileSync(CACHE_FILE, JSON.stringify(fileCache, null, 2)); 