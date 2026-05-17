const { GoogleGenAI } = require("@google/genai");
const fs = require("node:fs");
const fsPromises = require("node:fs/promises");
const path = require("path");
const dotenv = require("dotenv");
const yaml = require("js-yaml");
const matter = require("gray-matter");

// Load environment variables
dotenv.config({ path: '.env.local' });

class GeminiImageGenerator {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not found in environment variables");
    }
    this.ai = new GoogleGenAI({ apiKey });
    this.defaultOptions = {
      outputDir: "generated_images",
      outputFilename: "gemini-image", 
      numImages: 3,
      dryRun: false,
      force: false
    };
  }

  async getImageStyle(outputDir) {
    const styleGuides = [];

    try {
      const globalStyleFile = path.join(process.cwd(), 'docs', 'global_image_style.txt');
      try {
        await fsPromises.access(globalStyleFile);
        const globalStyle = await fsPromises.readFile(globalStyleFile, 'utf-8');
        styleGuides.push('Global style:\n' + globalStyle.trim());
      } catch (error) {
        // File doesn't exist, skip
      }
    } catch (error) {
      console.warn('Error reading global style:', error);
    }

    try {
      const localStyleFile = path.join(outputDir, 'image_style.txt');
      try {
        await fsPromises.access(localStyleFile);
        const localStyle = await fsPromises.readFile(localStyleFile, 'utf-8');
        styleGuides.push('Local style:\n' + localStyle.trim());
      } catch (error) {
        // File doesn't exist, skip
      }
    } catch (error) {
      console.warn('Error reading local style:', error);
    }

    if (styleGuides.length > 0) {
      console.log('Using style guides:');
      if (styleGuides[0]) console.log('- Global style from docs/global_image_style.txt');
      if (styleGuides[1]) console.log(`- Local style from ${outputDir}/image_style.txt`);
    }

    return styleGuides.join('\n\n');
  }

  async generateImage(prompt, options = {}) {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const { outputDir, outputFilename, numImages, dryRun, force, isFrontmatterCoverImage } = mergedOptions;

    if (dryRun) {
      const actualNumImages = isFrontmatterCoverImage ? 1 : numImages;
      console.log(`[DRY RUN] Would generate ${actualNumImages} image${actualNumImages > 1 ? 's' : ''} for prompt: "${prompt}"`);
      console.log(`[DRY RUN] Would save to directory: ${outputDir}`);
      if (isFrontmatterCoverImage) {
        console.log(`[DRY RUN] Would use filename: ${outputFilename}.png`);
      } else {
        console.log(`[DRY RUN] Would use filename pattern: ${outputFilename}-N.png`);
      }
      return [];
    }

    // Ensure output directory exists
    const absoluteOutputDir = path.isAbsolute(outputDir) ? outputDir : path.resolve(outputDir);
    try {
      await fsPromises.stat(absoluteOutputDir);
    } catch (error) {
      // Directory doesn't exist, create it
      await fsPromises.mkdir(absoluteOutputDir, { recursive: true });
      console.log(`📁 Created directory: ${absoluteOutputDir}`);
    }

    // Get style guide if it exists
    const style = await this.getImageStyle(absoluteOutputDir);
    const fullPrompt = style ? `${prompt}\n\nStyle guide:\n${style}` : prompt;

    if (style) {
      console.log(`Using style guide from ${absoluteOutputDir}/image_style.txt`);
    }

    // Check for existing files unless force is true
    if (!force) {
      const existingFiles = [];
      if (isFrontmatterCoverImage) {
        // For frontmatter cover images, check for the exact filename
        const filename = `${outputFilename}.png`;
        const filepath = path.join(absoluteOutputDir, filename);
        if (fs.existsSync(filepath)) {
          existingFiles.push(filepath);
        }
      } else {
        // For other images, check for numbered files
        for (let i = 1; i <= numImages; i++) {
          const filename = `${outputFilename}-${i}.png`;
          const filepath = path.join(absoluteOutputDir, filename);
          if (fs.existsSync(filepath)) {
            existingFiles.push(filepath);
          }
        }
      }
      
      if (existingFiles.length > 0) {
        console.log(`⚠️  Existing images found:`);
        existingFiles.forEach(file => console.log(`  - ${file}`));
        console.log(`\n❌ Skipping generation to avoid overwriting existing files.`);
        console.log(`   Use --force to overwrite existing images.`);
        return existingFiles;
      }
    }

    const actualNumImages = isFrontmatterCoverImage ? 1 : numImages;
    console.log(`🎨 Generating ${actualNumImages} image variation${actualNumImages > 1 ? 's' : ''}...`);
    console.log(`📂 Output directory: ${absoluteOutputDir}`);
    
    if (isFrontmatterCoverImage) {
      console.log(`📝 Filename: ${outputFilename}.png`);
    } else {
      console.log(`📝 Filename pattern: ${outputFilename}-N.png`);
    }

    const generatedFiles = [];

    for (let i = 0; i < actualNumImages; i++) {
      try {
        console.log(`Generating image ${i + 1}/${actualNumImages}...`);
        const response = await this.ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: fullPrompt,
          config: {
            responseModalities: ["Text", "Image"],
          },
        });

        if (!response.candidates?.[0]?.content?.parts) {
          console.error('No content parts in response');
          continue;
        }

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            
            let filename;
            if (isFrontmatterCoverImage) {
              filename = `${outputFilename}.png`;
            } else {
              filename = `${outputFilename}-${i + 1}.png`;
            }
            
            const filepath = path.join(absoluteOutputDir, filename);
            if (force || !fs.existsSync(filepath)) {
              await fsPromises.writeFile(filepath, buffer);
              generatedFiles.push(filepath);
              console.log(`✓ Image saved as ${filepath}`);
            } else {
              console.log(`⚠️  Skipped existing file: ${filepath}`);
            }
          } else if (part.text) {
            console.log(`Generation info: ${part.text}`);
          }
        }
      } catch (error) {
        console.error(`Error generating image ${i + 1}:`, error);
      }
    }

    return generatedFiles;
  }

  async findImageTasks(content, filePath) {
    const tasks = [];
    
    // Use matter to parse frontmatter
    const { data: frontmatter } = matter(content);
    
    if (frontmatter && frontmatter.coverImage) {
      const coverImage = frontmatter.coverImage;
      let imageUrl = '';
      let imageAlt = '';
      
      if (typeof coverImage === 'string') {
        imageUrl = coverImage;
        imageAlt = `Illustration for ${path.basename(filePath, path.extname(filePath))}`;
      } else if (typeof coverImage === 'object') {
        imageUrl = coverImage.url;
        imageAlt = coverImage.alt || `Illustration for ${path.basename(filePath, path.extname(filePath))}`;
      }
      
      if (imageUrl) {
        // Get absolute path to where image should be
        const fileDir = path.dirname(filePath);
        
        // Handle relative paths properly 
        const normalizedImageUrl = imageUrl.replace(/^\.\//, '');
        const imagePath = path.join(fileDir, normalizedImageUrl);
        
        // Check if image exists
        try {
          await fsPromises.stat(imagePath);
          // Image exists, no need to add to tasks
        } catch (error) {
          // Image doesn't exist, add to tasks
          const outputDir = path.dirname(imagePath);
          tasks.push({
            filePath,
            description: imageAlt,
            line: 1, // Frontmatter is always at start
            context: `Frontmatter coverImage: ${imageAlt}`,
            outputDir
          });
        }
      }
    }
    
    // Match various image patterns in the content
    const patterns = [
      {
        // Standard markdown image
        regex: /!\[([^\]]+)\]\(([^\)]*)\)/g,
        extract: (match) => ({ alt: match[1], src: match[2] })
      },
      {
        // HTML img tag
        regex: /<img[^>]*alt="([^"]*)"[^>]*(?:src="([^"]*)")?[^>]*>/g,
        extract: (match) => ({ alt: match[1], src: match[2] || '' })
      },
      {
        // MDX image component
        regex: /<Image[^>]*alt="([^"]*)"[^>]*(?:src="([^"]*)")?[^>]*>/g,
        extract: (match) => ({ alt: match[1], src: match[2] || '' })
      },
      {
        // Markdown reference style images
        regex: /!\[([^\]]+)\]\[([^\]]*)\]/g,
        extract: (match) => ({ alt: match[1], src: '' })
      }
    ];

    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      for (const pattern of patterns) {
        const matches = [...line.matchAll(pattern.regex)];
        for (const match of matches) {
          const { alt, src } = pattern.extract(match);
          
          // If the alt text looks like a path, skip it
          if (alt && (alt.includes('/') || alt.endsWith('.png') || alt.endsWith('.jpg') || 
              alt.endsWith('.jpeg') || alt.endsWith('.gif') || alt.endsWith('.webp') || 
              alt.endsWith('.svg'))) {
            continue;
          }

          // If we have a meaningful alt text and no source (or empty source)
          if (alt && (!src || src.trim() === '')) {
            // Get some context by including surrounding lines
            const contextStart = Math.max(0, index - 2);
            const contextEnd = Math.min(lines.length, index + 3);
            const context = lines.slice(contextStart, contextEnd).join('\n');
            
            tasks.push({
              filePath,
              description: alt,
              line: index + 1,
              context,
              outputDir: ""
            });
          }
        }
      }

      // Also check for bare image descriptions in code blocks or comments that might need visualization
      const imageDescriptionPatterns = [
        /```mermaid\s+([\s\S]*?)```/g,  // Mermaid diagrams
        /```plantuml\s+([\s\S]*?)```/g,  // PlantUML diagrams
        /```diagram\s+([\s\S]*?)```/g,   // Generic diagrams
        /<!--\s*image:\s*([^>]*?)-->/g,  // HTML comments with image descriptions
      ];

      for (const pattern of imageDescriptionPatterns) {
        const matches = [...line.matchAll(pattern)];
        for (const match of matches) {
          const description = match[1]?.trim();
          if (description) {
            tasks.push({
              filePath,
              description,
              line: index + 1,
              context: `Diagram/Image Description: ${description}`,
              outputDir: ""
            });
          }
        }
      }
    });

    return tasks;
  }

  extractFrontmatter(content) {
    try {
      const { data } = matter(content);
      return data;
    } catch (error) {
      console.error('Error extracting frontmatter:', error);
      return null;
    }
  }

  async processMarkdownFiles(target, options = {}) {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const { dryRun } = mergedOptions;
    let allTasks = [];
    let allFiles = [];

    console.log(`Processing target: ${target} (dryRun: ${dryRun})`);
    
    try {
      const stats = await fsPromises.stat(target);
      if (stats.isDirectory()) {
        console.log(`Target is a directory: ${target}`);
        const entries = await fsPromises.readdir(target, { withFileTypes: true });
        console.log(`Found ${entries.length} entries in directory`);
        
        for (const entry of entries) {
          const fullPath = path.join(target, entry.name);
          if (entry.isDirectory()) {
            console.log(`Found subdirectory: ${entry.name}`);
            await this.processMarkdownFiles(fullPath, mergedOptions);
          } else if (entry.isFile() && entry.name.endsWith('.md')) {
            console.log(`Found markdown file: ${entry.name}`);
            const content = await fsPromises.readFile(fullPath, 'utf-8');
            const fileTasks = await this.findImageTasks(content, fullPath);
            console.log(`Found ${fileTasks.length} tasks in ${entry.name}`);
            
            allTasks = [...allTasks, ...fileTasks];
            allFiles.push(fullPath);
            
            if (!dryRun && fileTasks.length > 0) {
              for (const task of fileTasks) {
                await this.generateImage(task.description, {
                  ...mergedOptions,
                  outputDir: task.outputDir,
                  outputFilename: path.basename(fullPath, path.extname(fullPath))
                });
              }
            }
          }
        }
      } else if (target.endsWith('.md')) {
        console.log(`Target is a markdown file: ${target}`);
        const content = await fsPromises.readFile(target, 'utf-8');
        const fileTasks = await this.findImageTasks(content, target);
        console.log(`Found ${fileTasks.length} tasks in ${path.basename(target)}`);
        
        allTasks = [...allTasks, ...fileTasks];
        allFiles.push(target);
        
        if (!dryRun && fileTasks.length > 0) {
          for (const task of fileTasks) {
            // Extract the expected filename from the frontmatter path
            let outputFilename = path.basename(target, path.extname(target));
            let isFrontmatterTask = false;
            
            // If this is a frontmatter coverImage task, extract the expected filename
            if (task.context && task.context.startsWith('Frontmatter coverImage:')) {
              isFrontmatterTask = true;
              // Find the coverImage in the frontmatter
              const content = await fsPromises.readFile(target, 'utf-8');
              const { data: frontmatter } = matter(content);
              
              if (frontmatter && frontmatter.coverImage) {
                let imageUrl = '';
                if (typeof frontmatter.coverImage === 'string') {
                  imageUrl = frontmatter.coverImage;
                } else if (typeof frontmatter.coverImage === 'object') {
                  imageUrl = frontmatter.coverImage.url;
                }
                
                if (imageUrl) {
                  // Extract the filename without extension from the expected path
                  const expectedFilename = path.basename(imageUrl, path.extname(imageUrl));
                  outputFilename = expectedFilename;
                  console.log(`Frontmatter expects: ${imageUrl}, extracted filename: ${expectedFilename}`);
                }
              }
            } else {
              // For non-frontmatter tasks, create a meaningful filename from the description
              const cleanDescription = task.description
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '_')
                .substring(0, 50);
              outputFilename = cleanDescription || outputFilename;
            }
            
            await this.generateImage(task.description, {
              ...mergedOptions,
              outputDir: task.outputDir,
              outputFilename: outputFilename,
              isFrontmatterCoverImage: isFrontmatterTask
            });
          }
        }
      }

      console.log(`\nSummary for ${target}:`);
      console.log(`Total files processed: ${allFiles.length}`);
      console.log(`Total image tasks found: ${allTasks.length}`);
      console.log(`Would generate ${mergedOptions.numImages} variations per image`);
      console.log(`Total images that would be generated: ${allTasks.length * mergedOptions.numImages}`);
      
      if (dryRun) {
        console.log("\n[DRY RUN] No images will be generated. Run without --dry-run to generate images.");
      }
    } catch (error) {
      console.error(`Error processing ${target}:`, error);
      throw error;
    }
  }

  async getFrontmatterImageInfo(filePath) {
    try {
      const content = await fsPromises.readFile(filePath, 'utf-8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (frontmatterMatch) {
        const frontmatterContent = frontmatterMatch[1];
        const frontmatter = yaml.load(frontmatterContent);
        const hasCoverImage = 'coverImage' in frontmatter;
        
        return {
          filePath,
          frontmatter,
          hasCoverImage,
          expectedImagePath: hasCoverImage ? frontmatter.coverImage : ''
        };
      }
    } catch (error) {
      console.error(`Error reading frontmatter from ${filePath}:`, error);
    }
    return null;
  }

  findMarkdownFiles(dir) {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        files.push(...this.findMarkdownFiles(fullPath));
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  async auditFrontmatterImages(directory) {
    const files = this.findMarkdownFiles(directory);
    const missingFrontmatter = [];
    const missingFiles = [];
    const validImages = [];
    
    console.log(`\nAuditing ${files.length} markdown files for frontmatter images:`);
    
    for (const file of files) {
      const info = await this.getFrontmatterImageInfo(file);
      if (info) {
        if (!info.hasCoverImage) {
          missingFrontmatter.push(info);
          console.log(`\n❌ File: ${file}`);
          console.log(`   Missing coverImage in frontmatter`);
        } else {
          // Check if the image file actually exists
          const coverImage = info.frontmatter.coverImage;
          let imagePath = '';
          
          if (typeof coverImage === 'string') {
            imagePath = coverImage;
          } else if (typeof coverImage === 'object' && coverImage !== null && 'url' in coverImage) {
            imagePath = coverImage.url;
          }
          
          if (imagePath) {
            // Resolve the image path relative to the markdown file
            const fileDir = path.dirname(file);
            const normalizedImagePath = imagePath.replace(/^\.\//, '');
            const fullImagePath = path.join(fileDir, normalizedImagePath);
            
            try {
              await fsPromises.access(fullImagePath);
              validImages.push({ filePath: file, coverImagePath: imagePath });
              console.log(`\n✅ File: ${file}`);
              console.log(`   Has coverImage: ${imagePath} ✓`);
            } catch (error) {
              missingFiles.push({ filePath: file, coverImagePath: imagePath, fullImagePath });
              console.log(`\n⚠️  File: ${file}`);
              console.log(`   Has coverImage: ${imagePath}`);
              console.log(`   But image file missing: ${fullImagePath}`);
            }
          }
        }
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`Total files checked: ${files.length}`);
    console.log(`Files with valid coverImage: ${validImages.length}`);
    console.log(`Files missing coverImage field: ${missingFrontmatter.length}`);
    console.log(`Files with missing image files: ${missingFiles.length}`);
    
    if (missingFrontmatter.length > 0) {
      console.log(`\n🔍 Files missing coverImage field:`);
      missingFrontmatter.forEach(info => {
        console.log(`  - ${info.filePath}`);
      });
    }
    
    if (missingFiles.length > 0) {
      console.log(`\n🖼️  Files with missing image files:`);
      missingFiles.forEach(item => {
        console.log(`  - ${item.filePath}`);
        console.log(`    Expected: ${item.fullImagePath}`);
      });
    }
    
    if (missingFrontmatter.length > 0) {
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const answer = await new Promise(resolve => {
        readline.question('\nWould you like to add the missing coverImage fields? (y/N) ', resolve);
      });
      readline.close();

      if (answer.toLowerCase() === 'y') {
        for (const info of missingFrontmatter) {
          await this.addCoverImageToFrontmatter(info);
        }
        console.log('\nFrontmatter updates complete.');
      }
    }
  }

  async addCoverImageToFrontmatter(info) {
    try {
      const content = await fsPromises.readFile(info.filePath, 'utf-8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (!frontmatterMatch) {
        throw new Error('No frontmatter found');
      }

      const frontmatterContent = frontmatterMatch[1];
      const frontmatter = yaml.load(frontmatterContent);
      
      // Add cover image path
      const imagesDir = 'images';
      const imageFilename = `cover.png`;
      frontmatter.coverImage = path.join(imagesDir, imageFilename);
      
      // Convert back to YAML
      const newFrontmatterText = yaml.dump(frontmatter);
      const newContent = content.replace(/^---\n[\s\S]*?\n---/, `---\n${newFrontmatterText}---`);
      
      await fsPromises.writeFile(info.filePath, newContent, 'utf-8');
      console.log(`Updated frontmatter in ${info.filePath}`);

      // Create images directory if it doesn't exist
      const imagesDirPath = path.join(path.dirname(info.filePath), 'images');
      try {
        await fsPromises.access(imagesDirPath);
      } catch {
        await fsPromises.mkdir(imagesDirPath, { recursive: true });
      }
    } catch (error) {
      console.error(`Error updating frontmatter in ${info.filePath}:`, error);
      throw error;
    }
  }

  async findMissingCoverImages(directory) {
    const missingImages = [];
    
    try {
      const entries = await fsPromises.readdir(directory, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          const subDirResults = await this.findMissingCoverImages(fullPath);
          missingImages.push(...subDirResults);
        } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
          const content = await fsPromises.readFile(fullPath, 'utf-8');
          const frontmatter = this.extractFrontmatter(content);
          const hasCoverImage = frontmatter && frontmatter.coverImage && typeof frontmatter.coverImage === 'string';
          
          if (!hasCoverImage) {
            missingImages.push({
              filePath: fullPath,
              frontmatter: frontmatter || {},
              hasCoverImage: false,
              expectedImagePath: path.join(path.dirname(fullPath), 'images', path.basename(fullPath, path.extname(fullPath)) + '.png')
            });
          }
        }
      }
    } catch (error) {
      console.error('Error finding missing cover images:', error);
      throw error;
    }
    
    return missingImages;
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const generator = new GeminiImageGenerator();

  if (args.length === 0) {
    console.log("Usage:");
    console.log("  Generate images from prompt:");
    console.log("    node imageGeneration.js prompt <text> [numImages] [--dir=path] [--filename=name] [--dry-run] [--force]");
    console.log("  Process markdown files:");
    console.log("    node imageGeneration.js markdown <directory> [numImages] [--dry-run]");
    console.log("  Audit frontmatter images:");
    console.log("    node imageGeneration.js audit <directory>");
    console.log("  Examples:");
    console.log("    node imageGeneration.js prompt 'A futuristic interface' 3");
    console.log("    node imageGeneration.js prompt 'Developer with code' 3 --dir=docs/musings/building_code/images --filename=vibe_interfaces");
    console.log("    node imageGeneration.js prompt 'Update existing' 3 --force  # Overwrites existing files");
    console.log("    node imageGeneration.js markdown docs/musings 3 --dry-run");
    console.log("    node imageGeneration.js audit docs");
    process.exit(1);
  }

  const command = args[0];
  const isDryRun = args.includes('--dry-run');
  const isForce = args.includes('--force');
  
  // Parse custom options
  const dirArg = args.find(arg => arg.startsWith('--dir='));
  const filenameArg = args.find(arg => arg.startsWith('--filename='));
  
  const customDir = dirArg ? dirArg.split('=')[1] : undefined;
  const customFilename = filenameArg ? filenameArg.split('=')[1] : undefined;
  
  const cleanArgs = args.filter(arg => !arg.startsWith('--'));
  
  if (command === "prompt") {
    const prompt = cleanArgs[1];
    const numImages = parseInt(cleanArgs[2] || "3");
    
    if (!prompt) {
      console.error("Please provide a prompt");
      process.exit(1);
    }

    const options = { 
      numImages, 
      dryRun: isDryRun,
      force: isForce,
      ...(customDir && { outputDir: customDir }),
      ...(customFilename && { outputFilename: customFilename })
    };

    generator.generateImage(prompt, options)
      .then((files) => {
        console.log("\n🎉 Image generation complete");
        if (files.length > 0) {
          console.log(`Generated ${files.length} images:`);
          files.forEach(file => console.log(`  - ${file}`));
        }
      })
      .catch(console.error);
  } else if (command === "markdown") {
    const directory = cleanArgs[1];
    const numImages = parseInt(cleanArgs[2] || "3");
    
    if (!directory) {
      console.error("Please provide a directory");
      process.exit(1);
    }

    generator.processMarkdownFiles(directory, { numImages, dryRun: isDryRun })
      .then(() => console.log("Markdown processing complete"))
      .catch(console.error);
  } else if (command === "audit") {
    const directory = cleanArgs[1];
    
    if (!directory) {
      console.error("Please provide a directory");
      process.exit(1);
    }

    generator.auditFrontmatterImages(directory)
      .then(() => console.log("Audit complete"))
      .catch(console.error);
  } else {
    console.error("Unknown command. Use 'prompt', 'markdown', or 'audit'");
    process.exit(1);
  }
}

module.exports = GeminiImageGenerator; 