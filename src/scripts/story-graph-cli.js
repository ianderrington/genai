#!/usr/bin/env node

/**
 * Story Graph CLI - Node.js replacement for the Python CLI
 * Usage: node src/scripts/story-graph-cli.js [command] [options]
 */

const fs = require('fs').promises;
const path = require('path');
const { fileURLToPath } = require('url');

// Command line argument parsing
const args = process.argv.slice(2);
const command = args[0];

const commands = {
  analyze: analyzeStory,
  export: exportStoryGraph,
  serve: serveVisualization,
  help: showHelp
};

// Default configuration
const defaultConfig = {
  autoExtract: true,
  relationshipPatterns: {
    observes: '(\\w+)\\s+(?:observes?|watches?|monitors?)\\s+(\\w+)',
    operates: '(\\w+)\\s+(?:operates?|controls?|manages?)\\s+(\\w+)',
    collaborates: '(\\w+)\\s+(?:collaborates?|works?)\\s+(?:with\\s+)?(\\w+)',
    inhabits: '(\\w+)\\s+(?:inhabits?|lives?\\s+in|exists?\\s+in)\\s+(\\w+)',
    influences: '(\\w+)\\s+(?:influences?|affects?|impacts?)\\s+(\\w+)',
    opposes: '(\\w+)\\s+(?:opposes?|fights?|resists?)\\s+(\\w+)',
  },
  visualizationOptions: {
    theme: 'auto',
    layout: 'timeline',
    showMetadata: true,
    interactive: true,
  },
  exportFormats: ['json', 'csv']
};

async function main() {
  if (!command || command === 'help' || !commands[command]) {
    showHelp();
    return;
  }

  try {
    await commands[command]();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

async function analyzeStory() {
  const inputFile = getArgValue('-i', '--input');
  const outputDir = getArgValue('-o', '--output') || './story-graph-output';
  const format = getArgValue('-f', '--format') || 'json';

  if (!inputFile) {
    console.error('Error: Input file is required. Use -i or --input');
    process.exit(1);
  }

  console.log(`Analyzing story: ${inputFile}`);
  console.log(`Output directory: ${outputDir}`);

  // Read the input file
  let content, frontmatter = {};
  
  try {
    const fileContent = await fs.readFile(inputFile, 'utf-8');
    
    // Parse frontmatter if it exists
    if (fileContent.startsWith('---')) {
      const parts = fileContent.split('---');
      if (parts.length >= 3) {
        const frontmatterText = parts[1];
        content = parts.slice(2).join('---').trim();
        
        // Simple YAML parsing (you might want to use a proper YAML parser)
        frontmatter = parseFrontmatter(frontmatterText);
      } else {
        content = fileContent;
      }
    } else {
      content = fileContent;
    }
  } catch (error) {
    console.error(`Failed to read input file: ${error.message}`);
    process.exit(1);
  }

  // For now, simulate the analysis (in a real implementation, you'd use the StoryGraphProcessor)
  const analysis = {
    metadata: {
      title: frontmatter.title || path.basename(inputFile, path.extname(inputFile)),
      description: frontmatter.description || '',
      processedAt: new Date().toISOString(),
      version: '1.0.0'
    },
    elements: extractElements(content),
    relationships: extractRelationships(content),
    scenes: extractScenes(content, frontmatter.render_as === 'chat'),
    timeline: [],
    statistics: {}
  };

  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });

  // Save results
  const outputFile = path.join(outputDir, `story-graph.${format}`);
  
  if (format === 'json') {
    await fs.writeFile(outputFile, JSON.stringify(analysis, null, 2));
  } else if (format === 'csv') {
    const csv = convertToCSV(analysis);
    await fs.writeFile(outputFile, csv);
  }

  console.log(`Analysis complete! Results saved to: ${outputFile}`);
  console.log(`Found ${analysis.elements.length} elements, ${analysis.relationships.length} relationships, ${analysis.scenes.length} scenes`);
}

async function exportStoryGraph() {
  console.log('Export functionality - TODO: Implement export to various formats');
}

async function serveVisualization() {
  const port = getArgValue('-p', '--port') || 3001;
  console.log(`Starting visualization server on port ${port}`);
  console.log('TODO: Implement local server for story graph visualization');
  console.log('Consider using: npx serve or creating a simple Express server');
}

function showHelp() {
  console.log(`
Story Graph CLI - Node.js Version

Usage: node story-graph-cli.js [command] [options]

Commands:
  analyze     Analyze a story file and extract story graph data
  export      Export story graph in various formats
  serve       Start a local server for visualization
  help        Show this help message

Options for 'analyze':
  -i, --input <file>     Input markdown file to analyze (required)
  -o, --output <dir>     Output directory (default: ./story-graph-output)
  -f, --format <format>  Output format: json, csv (default: json)

Options for 'serve':
  -p, --port <port>      Port number (default: 3001)

Examples:
  node story-graph-cli.js analyze -i story.md -o output/
  node story-graph-cli.js serve -p 8080
  node story-graph-cli.js export -i story-graph.json -f csv

Migration from Python:
  This CLI replaces the Python story_graph_cli.py with Node.js.
  All functionality is being migrated to work within the Next.js ecosystem.
`);
}

// Helper functions
function getArgValue(shortFlag, longFlag) {
  const shortIndex = args.indexOf(shortFlag);
  const longIndex = args.indexOf(longFlag);
  const index = shortIndex !== -1 ? shortIndex : longIndex;
  
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  
  return null;
}

function parseFrontmatter(text) {
  const lines = text.trim().split('\n');
  const frontmatter = {};
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }
  
  return frontmatter;
}

function extractElements(content) {
  const elements = [];
  
  // Extract potential character names (capitalized words)
  const characterPattern = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g;
  const matches = content.match(characterPattern) || [];
  
  // Filter out common false positives
  const commonWords = new Set([
    'The', 'This', 'That', 'They', 'There', 'Then', 'Thus', 'Therefore',
    'Chapter', 'Scene', 'Act', 'Part', 'Book', 'Section', 'Volume'
  ]);

  const characters = Array.from(new Set(matches.filter(name => !commonWords.has(name))));
  
  characters.forEach((name, index) => {
    elements.push({
      id: `char_${index}`,
      name,
      type: 'character',
      metadata: { extractedFrom: 'text_analysis' }
    });
  });

  return elements;
}

function extractRelationships(content) {
  const relationships = [];
  
  // Simple relationship extraction
  const patterns = {
    observes: /(\\w+)\\s+(?:observes?|watches?|monitors?)\\s+(\\w+)/gi,
    collaborates: /(\\w+)\\s+(?:collaborates?|works?)\\s+(?:with\\s+)?(\\w+)/gi,
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      if (match[1] && match[2]) {
        relationships.push({
          id: `rel_${relationships.length}`,
          source: match[1],
          target: match[2],
          type,
          metadata: { extractedFrom: 'pattern_matching' }
        });
      }
    }
  }

  return relationships;
}

function extractScenes(content, isChat = false) {
  const scenes = [];
  
  if (isChat) {
    // Split on common chat delimiters
    const segments = content.split(/---\\s*\\n|\\n\\s*\\n\\s*\\n/).filter(s => s.trim());
    
    segments.forEach((segment, index) => {
      scenes.push({
        id: `scene_${index}`,
        title: `Scene ${index + 1}`,
        content: segment.trim(),
        timestamp: extractTimestamp(segment),
        metadata: { index, wordCount: segment.split(/\\s+/).length }
      });
    });
  } else {
    // Treat whole content as one scene
    scenes.push({
      id: 'scene_0',
      title: 'Main Scene',
      content: content,
      metadata: { wordCount: content.split(/\\s+/).length }
    });
  }

  return scenes;
}

function extractTimestamp(content) {
  const patterns = [
    /(\\d{4}-\\d{2}-\\d{2})/,  // YYYY-MM-DD
    /(Day \\d+)/i,             // Day N
    /(Era \\d+)/i,             // Era N
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return undefined;
}

function convertToCSV(analysis) {
  const headers = ['ID', 'Name', 'Type', 'Metadata'];
  const rows = analysis.elements.map(el => [
    el.id,
    el.name,
    el.type,
    JSON.stringify(el.metadata)
  ]);

  return [headers, ...rows].map(row => 
    row.map(cell => `"${cell}"`).join(',')
  ).join('\\n');
}

// Run the CLI
main().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
}); 