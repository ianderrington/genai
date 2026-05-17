// Conditionally import GoogleGenAI only when needed to avoid Node.js v24 issues
let GoogleGenAI: any = null;

async function loadGoogleGenAI() {
  if (process.argv.includes('audit')) {
    // For audit command, we don't need GoogleGenAI
    GoogleGenAI = null;
  } else {
    // Only import when actually generating images
    try {
      const { GoogleGenAI: GeminiAI } = await import("@google/genai");
      GoogleGenAI = GeminiAI;
    } catch (error: any) {
      console.error("Failed to load GoogleGenAI:", error.message);
      console.error("This is likely due to Node.js v24 compatibility issues with google-auth-library");
      GoogleGenAI = null;
    }
  }
}

import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import * as dotenv from "dotenv";
import * as yaml from 'js-yaml';
import matter from 'gray-matter';
import { readdirSync } from 'fs';
import type { Stats } from 'fs';

// Load environment variables
dotenv.config({ path: '.env.local' });

interface ImageGenerationOptions {
  outputDir?: string;
  outputFilename?: string;
  numImages?: number;
  dryRun?: boolean;
  frontmatterOnly?: boolean;
  contentOnly?: boolean;
  force?: boolean;
}

interface ImageGenerationTask {
  filePath: string;
  description: string;
  line: number;
  context: string;
  outputDir: string;
}

interface FrontmatterImageInfo {
  filePath: string;
  frontmatter: Record<string, unknown>;
  hasCoverImage: boolean;
  expectedImagePath: string;
}

class GeminiImageGenerator {
  private ai: any;
  private defaultOptions: ImageGenerationOptions = {
    outputDir: "generated_images",
    outputFilename: "gemini-image",
    numImages: 3,
    dryRun: false
  };

  constructor() {
    if (GoogleGenAI) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY not found in environment variables");
      }
      this.ai = new GoogleGenAI({ apiKey });
    } else {
      // For audit mode, we don't need the AI instance
      this.ai = null;
    }
  }

  private async getImageStyle(outputDir: string): Promise<string> {
    const styleGuides: string[] = [];

    try {
      const globalStyleFile = path.join(process.cwd(), 'docs', 'global_image_style.txt');
      try {
        await fs.access(globalStyleFile);
        const globalStyle = await fs.readFile(globalStyleFile, 'utf-8');
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
        await fs.access(localStyleFile);
        const localStyle = await fs.readFile(localStyleFile, 'utf-8');
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

  async generateImage(prompt: string, options: ImageGenerationOptions = {}): Promise<string[]> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const { outputDir, outputFilename, numImages, dryRun, force } = mergedOptions;

    if (!this.ai) {
      console.error("❌ Cannot generate images: GoogleGenAI not available");
      console.error("This is likely due to Node.js v24 compatibility issues with google-auth-library");
      console.error("Please try using Node.js v18 or v20 instead");
      return [];
    }

    if (dryRun) {
      console.log(`[DRY RUN] Would generate ${numImages} images for prompt: "${prompt}"`);
      console.log(`[DRY RUN] Would save to directory: ${outputDir}`);
      console.log(`[DRY RUN] Would use filename pattern: ${outputFilename}-N.png`);
      return [];
    }

    // Ensure output directory exists
    const absoluteOutputDir = path.isAbsolute(outputDir!) ? outputDir! : path.resolve(outputDir!);
    try {
      await fs.stat(absoluteOutputDir);
    } catch (error) {
      // Directory doesn't exist, create it
      await fs.mkdir(absoluteOutputDir, { recursive: true });
    }

    // Get style guide if it exists
    const style = await this.getImageStyle(absoluteOutputDir);
    const fullPrompt = style ? `${prompt}\n\nStyle guide:\n${style}` : prompt;

    if (style) {
      console.log(`Using style guide from ${absoluteOutputDir}/image_style.txt`);
    }

    // Check for existing files unless force is true
    if (!force) {
      const existingFiles: string[] = [];
      for (let i = 1; i <= numImages!; i++) {
        const filename = `${outputFilename}-${i}.png`;
        const filepath = path.join(absoluteOutputDir, filename);
        if (existsSync(filepath)) {
          existingFiles.push(filepath);
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

    const generatedFiles: string[] = [];

    for (let i = 0; i < numImages!; i++) {
      try {
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
            const filename = `${outputFilename}-${i + 1}.png`;
            const filepath = path.join(absoluteOutputDir, filename);
            await fs.writeFile(filepath, buffer);
            generatedFiles.push(filepath);
            console.log(`Image saved as ${filepath}`);
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

  private async findImageTasks(content: string, filePath: string, options: ImageGenerationOptions = {}): Promise<ImageGenerationTask[]> {
    const tasks: ImageGenerationTask[] = [];
    
    // Use matter to parse frontmatter
    const { data: frontmatter } = matter(content);
    
    // Process frontmatter images (unless contentOnly is specified)
    // Check if coverImage key exists in frontmatter (even if null/empty)
    if (!options.contentOnly && frontmatter && 'coverImage' in frontmatter) {
      const imageStatus = await this.evaluateCoverImageStatus(filePath, frontmatter);

      if (imageStatus.needsImageGeneration) {
        tasks.push({
          filePath,
          description: imageStatus.imageAlt,
          line: 1, // Frontmatter is always at start
          context: `Frontmatter coverImage: ${imageStatus.imageAlt}`,
          outputDir: imageStatus.outputDir
        });
      }
    }
    
    // Process content images (unless frontmatterOnly is specified)
    if (!options.frontmatterOnly) {
      // Match various image patterns in the content
      const patterns = [
      {
        // Standard markdown image
        regex: /!\[([^\]]+)\]\(([^\)]*)\)/g,
        extract: (match: RegExpMatchArray) => ({ alt: match[1], src: match[2] })
      },
      {
        // HTML img tag
        regex: /<img[^>]*alt="([^"]*)"[^>]*(?:src="([^"]*)")?[^>]*>/g,
        extract: (match: RegExpMatchArray) => ({ alt: match[1], src: match[2] || '' })
      },
      {
        // MDX image component
        regex: /<Image[^>]*alt="([^"]*)"[^>]*(?:src="([^"]*)")?[^>]*>/g,
        extract: (match: RegExpMatchArray) => ({ alt: match[1], src: match[2] || '' })
      },
      {
        // Markdown reference style images
        regex: /!\[([^\]]+)\]\[([^\]]*)\]/g,
        extract: (match: RegExpMatchArray) => ({ alt: match[1], src: '' })
      }
    ];

    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      for (const pattern of patterns) {
        const matches = line.matchAll(pattern.regex);
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
            
            // Set output directory to images folder relative to the markdown file
            const fileDir = path.dirname(filePath);
            const outputDir = path.join(fileDir, 'images');
            
            tasks.push({
              filePath,
              description: alt,
              line: index + 1,
              context,
              outputDir
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
        const matches = line.matchAll(pattern);
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
    }

    return tasks;
  }

  private extractFrontmatter(content: string): Record<string, any> | null {
    try {
      const { data } = matter(content);
      return data;
    } catch (error) {
      console.error('Error extracting frontmatter:', error);
      return null;
    }
  }

  private async processMarkdownFile(filePath: string, options: ImageGenerationOptions = {}): Promise<ImageGenerationTask[]> {
    const tasks: ImageGenerationTask[] = [];
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const frontmatter = this.extractFrontmatter(content);
      if (!frontmatter) {
        console.warn(`No frontmatter found in ${filePath}`);
        return tasks;
      }
      
      const fileTasks = await this.findImageTasks(content, filePath, options);
      tasks.push(...fileTasks);
      
      if (!options.dryRun) {
        for (const task of fileTasks) {
          await this.generateImage(task.description, {
            ...options,
            outputDir: task.outputDir,
            outputFilename: path.basename(filePath, path.extname(filePath))
          });
        }
      }
      return tasks;
    } catch (error) {
      console.error(`Error processing markdown file ${filePath}:`, error);
      throw error;
    }
  }

  public async processMarkdownFiles(target: string, options: ImageGenerationOptions = {}): Promise<void> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const { dryRun } = mergedOptions;
    let allTasks: ImageGenerationTask[] = [];
    let allFiles: string[] = [];

    console.log(`Processing target: ${target} (dryRun: ${dryRun})`);
    
    try {
      const stats: Stats = await fs.stat(target);
      if (stats.isDirectory()) {
        const entries = await fs.readdir(target, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(target, entry.name);
          if (entry.isDirectory()) {
            await this.processMarkdownFiles(fullPath, mergedOptions);
          } else if (entry.isFile() && entry.name.endsWith('.md')) {
            const content = await fs.readFile(fullPath, 'utf-8');
            const fileTasks = await this.findImageTasks(content, fullPath, mergedOptions);
            
            // Only show output if there are tasks
            if (fileTasks.length > 0) {
              const absolutePath = path.resolve(fullPath);
              console.log(`📝 ${absolutePath} → ${fileTasks.length} task${fileTasks.length > 1 ? 's' : ''}`);
            }
            
            allTasks = [...allTasks, ...fileTasks];
            allFiles.push(fullPath);
            
            if (!dryRun && fileTasks.length > 0) {
              for (const task of fileTasks) {
                // Generate appropriate filename based on task type
                let outputFilename: string;
                if (task.context.startsWith('Frontmatter coverImage:')) {
                  // For frontmatter tasks, extract the expected filename from coverImage
                  const content = await fs.readFile(fullPath, 'utf-8');
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
                      outputFilename = path.basename(imageUrl, path.extname(imageUrl));
                    } else {
                      outputFilename = path.basename(fullPath, path.extname(fullPath));
                    }
                  } else {
                    outputFilename = path.basename(fullPath, path.extname(fullPath));
                  }
                } else {
                  // For content tasks, create a unique filename from the description
                  const cleanDescription = task.description
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, '')
                    .replace(/\s+/g, '_')
                    .substring(0, 50);
                  outputFilename = cleanDescription || `content_image_${task.line}`;
                }
                
                await this.generateImage(task.description, {
                  ...mergedOptions,
                  outputDir: task.outputDir,
                  outputFilename: outputFilename
                });
              }
            }
          }
        }
      } else if (target.endsWith('.md')) {
        const content = await fs.readFile(target, 'utf-8');
        const fileTasks = await this.findImageTasks(content, target, mergedOptions);
        
        if (fileTasks.length > 0) {
          const absolutePath = path.resolve(target);
          console.log(`📝 ${absolutePath} → ${fileTasks.length} task${fileTasks.length > 1 ? 's' : ''}`);
        }
        
        allTasks = [...allTasks, ...fileTasks];
        allFiles.push(target);
        
        if (!dryRun && fileTasks.length > 0) {
          for (const task of fileTasks) {
            // Generate appropriate filename based on task type
            let outputFilename: string;
            if (task.context.startsWith('Frontmatter coverImage:')) {
              // For frontmatter tasks, extract the expected filename from coverImage
              const content = await fs.readFile(target, 'utf-8');
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
                  outputFilename = path.basename(imageUrl, path.extname(imageUrl));
                } else {
                  outputFilename = path.basename(target, path.extname(target));
                }
              } else {
                outputFilename = path.basename(target, path.extname(target));
              }
            } else {
              // For content tasks, create a unique filename from the description
              const cleanDescription = task.description
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '_')
                .substring(0, 50);
              outputFilename = cleanDescription || `content_image_${task.line}`;
            }
            
            await this.generateImage(task.description, {
              ...mergedOptions,
              outputDir: task.outputDir,
              outputFilename: outputFilename
            });
          }
        }
      }

      // Only show summary if there are tasks to report
      if (allTasks.length > 0) {
        console.log(`\n📊 Summary for ${target}:`);
        console.log(`📁 Files processed: ${allFiles.length}`);
        console.log(`🎯 Image tasks found: ${allTasks.length}`);
        
        // Categorize tasks
        const frontmatterTasks = allTasks.filter(task => task.context.startsWith('Frontmatter coverImage:'));
        const contentTasks = allTasks.filter(task => !task.context.startsWith('Frontmatter coverImage:'));
        
        if (frontmatterTasks.length > 0) {
          console.log(`   └─ 🖼️  Frontmatter coverImage tasks: ${frontmatterTasks.length}`);
        }
        if (contentTasks.length > 0) {
          console.log(`   └─ 📝 Content image tasks: ${contentTasks.length}`);
        }
        
        console.log(`🎨 Images per task: ${mergedOptions.numImages} variations`);
        console.log(`📈 Total images to generate: ${allTasks.length * mergedOptions.numImages!}`);
        
        if (dryRun) {
          console.log("\n[DRY RUN] No images will be generated. Run without --dry-run to generate images.");
        }
      }
    } catch (error) {
      console.error(`Error processing ${target}:`, error);
      throw error;
    }
  }

  private async getFrontmatterImageInfo(filePath: string): Promise<FrontmatterImageInfo | null> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (frontmatterMatch) {
        const frontmatterContent = frontmatterMatch[1];
        const frontmatter = yaml.load(frontmatterContent) as Record<string, unknown>;
        const hasCoverImage = 'coverImage' in frontmatter;
        
        return {
          filePath,
          frontmatter,
          hasCoverImage,
          expectedImagePath: hasCoverImage ? frontmatter.coverImage as string : ''
        };
      }
    } catch (error) {
      console.error(`Error reading frontmatter from ${filePath}:`, error);
    }
    return null;
  }

  private async evaluateCoverImageStatus(filePath: string, frontmatter: Record<string, unknown>): Promise<{
    hasValidCoverImage: boolean;
    needsImageGeneration: boolean;
    imageUrl: string;
    imageAlt: string;
    outputDir: string;
  }> {
    const coverImage = frontmatter.coverImage;
    let imageUrl = '';
    let imageAlt = `Illustration for ${path.basename(filePath, path.extname(filePath))}`;
    
    if (typeof coverImage === 'string') {
      imageUrl = coverImage;
    } else if (typeof coverImage === 'object' && coverImage !== null && 'url' in coverImage) {
      imageUrl = (coverImage as any).url;
      imageAlt = (coverImage as any).alt || imageAlt;
    }
    
    const fileDir = path.dirname(filePath);
    const outputDir = path.join(fileDir, 'images');
    
    // Check if URL is null/empty - needs image generation
    if (!imageUrl || imageUrl === 'null') {
      return {
        hasValidCoverImage: false,
        needsImageGeneration: true,
        imageUrl,
        imageAlt,
        outputDir
      };
    }
    
    // Check if image file exists
    const normalizedImageUrl = imageUrl.replace(/^\.\//, '');
    const imagePath = path.join(fileDir, normalizedImageUrl);
    
    try {
      await fs.stat(imagePath);
      // Image exists and is valid
      return {
        hasValidCoverImage: true,
        needsImageGeneration: false,
        imageUrl,
        imageAlt,
        outputDir: path.dirname(imagePath)
      };
    } catch (error) {
      // Image file doesn't exist - needs generation
      return {
        hasValidCoverImage: false,
        needsImageGeneration: true,
        imageUrl,
        imageAlt,
        outputDir: path.dirname(imagePath)
      };
    }
  }

  async auditFrontmatterImages(directory: string, options: { skipDrafts?: boolean; verbose?: boolean } = {}): Promise<void> {
    const { skipDrafts = true, verbose = false } = options;
    const files = this.findMarkdownFiles(directory);
    const missingFrontmatter: FrontmatterImageInfo[] = [];
    const missingFiles: { filePath: string; coverImagePath: string; fullImagePath: string }[] = [];
    const validImages: { filePath: string; coverImagePath: string }[] = [];
    const skippedDrafts: string[] = [];
    const noCoverImageField: string[] = [];

    console.log(`\nAuditing ${files.length} markdown files in ${path.resolve(directory)}:`);

    for (const file of files) {
      // Check draft status
      if (skipDrafts) {
        try {
          const content = await fs.readFile(file, 'utf-8');
          const { data } = matter(content);
          if (data.draft === true) {
            skippedDrafts.push(file);
            continue;
          }
        } catch (error) {
          // Continue with audit if we can't read the file
        }
      }

      const info = await this.getFrontmatterImageInfo(file);
      if (info) {
        if (!info.hasCoverImage) {
          noCoverImageField.push(file);
          if (verbose) {
            console.log(`  ❌ ${file} — no coverImage field`);
          }
        } else {
          // Use shared logic to evaluate cover image status
          const imageStatus = await this.evaluateCoverImageStatus(file, info.frontmatter);

          if (imageStatus.hasValidCoverImage) {
            validImages.push({ filePath: file, coverImagePath: imageStatus.imageUrl });
            if (verbose) {
              console.log(`  ✅ ${file} — ${imageStatus.imageUrl}`);
            }
          } else if (imageStatus.imageUrl && imageStatus.imageUrl !== 'null') {
            // Has URL but file is missing
            const fileDir = path.dirname(file);
            const normalizedImagePath = imageStatus.imageUrl.replace(/^\.\//, '');
            const fullImagePath = path.join(fileDir, normalizedImagePath);

            missingFiles.push({ filePath: file, coverImagePath: imageStatus.imageUrl, fullImagePath });
            console.log(`  ⚠️  ${file}`);
            console.log(`     coverImage: ${imageStatus.imageUrl} — FILE NOT FOUND`);
          } else {
            // URL is null or empty
            missingFrontmatter.push(info);
            console.log(`  ❌ ${file} — coverImage has null/empty URL`);
          }
        }
      }
    }

    // Summary
    console.log(`\n📊 Audit Summary for ${path.resolve(directory)}:`);
    console.log(`   Total files scanned:       ${files.length}`);
    if (skipDrafts && skippedDrafts.length > 0) {
      console.log(`   Drafts skipped:            ${skippedDrafts.length}`);
    }
    console.log(`   Valid coverImage:           ${validImages.length}`);

    const totalIssues = missingFrontmatter.length + missingFiles.length + noCoverImageField.length;
    if (totalIssues === 0) {
      console.log(`\n   ✅ All non-draft posts have valid cover images!`);
    } else {
      if (missingFiles.length > 0) {
        console.log(`   Broken image paths:         ${missingFiles.length}`);
      }
      if (missingFrontmatter.length > 0) {
        console.log(`   Null/empty coverImage URL:  ${missingFrontmatter.length}`);
      }
      if (noCoverImageField.length > 0) {
        console.log(`   No coverImage field:        ${noCoverImageField.length}`);
      }
    }

    if (missingFiles.length > 0) {
      console.log(`\n🖼️  Broken image paths (file referenced but missing):`);
      missingFiles.forEach(item => {
        console.log(`   ${item.filePath}`);
        console.log(`     → ${item.fullImagePath}`);
      });
    }

    if (missingFrontmatter.length > 0) {
      console.log(`\n🔧 Posts with null/empty coverImage URL:`);
      missingFrontmatter.forEach(info => {
        console.log(`   ${info.filePath}`);
      });
    }

    if (noCoverImageField.length > 0) {
      console.log(`\n📝 Posts without coverImage field:`);
      noCoverImageField.forEach(file => {
        console.log(`   ${file}`);
      });
    }
  }

  private async addCoverImageToFrontmatter(info: FrontmatterImageInfo): Promise<void> {
    try {
      const content = await fs.readFile(info.filePath, 'utf-8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (!frontmatterMatch) {
        throw new Error('No frontmatter found');
      }

      const frontmatterContent = frontmatterMatch[1];
      const frontmatter = yaml.load(frontmatterContent) as Record<string, unknown>;
      
      // Add cover image path
      const imagesDir = 'images';
      const imageFilename = `cover.png`;
      frontmatter.coverImage = path.join(imagesDir, imageFilename);
      
      // Convert back to YAML
      const newFrontmatterText = yaml.dump(frontmatter);
      const newContent = content.replace(/^---\n[\s\S]*?\n---/, `---\n${newFrontmatterText}---`);
      
      await fs.writeFile(info.filePath, newContent, 'utf-8');
      console.log(`Updated frontmatter in ${info.filePath}`);

      // Create images directory if it doesn't exist
      const imagesDirPath = path.join(path.dirname(info.filePath), 'images');
      try {
        await fs.access(imagesDirPath);
      } catch {
        await fs.mkdir(imagesDirPath, { recursive: true });
      }
    } catch (error) {
      console.error(`Error updating frontmatter in ${info.filePath}:`, error);
      throw error;
    }
  }

  private findMarkdownFiles(dir: string): string[] {
    const files: string[] = [];
    const entries = readdirSync(dir, { withFileTypes: true });
    
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

  public async findMissingCoverImages(directory: string): Promise<FrontmatterImageInfo[]> {
    const missingImages: FrontmatterImageInfo[] = [];
    
    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          const subDirResults = await this.findMissingCoverImages(fullPath);
          missingImages.push(...subDirResults);
        } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
          const content = await fs.readFile(fullPath, 'utf-8');
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

// Export the class
export default GeminiImageGenerator;

// Command line interface
// Check if this is being run directly (either in CommonJS or ESM)
if ((typeof require !== 'undefined' && require.main === module) || 
    (import.meta.url === `file://${process.argv[1]}`)) {
  
  async function main() {
    const args = process.argv.slice(2);
    
    // Load GoogleGenAI if needed
    await loadGoogleGenAI();
    
    const generator = new GeminiImageGenerator();

    if (args.length === 0) {
      console.log("Usage:");
      console.log("  Generate images from prompt:");
      console.log("    node imageGeneration.js prompt <text> [numImages] [--dry-run] [--force]");
      console.log("  Process markdown files:");
      console.log("    node imageGeneration.js markdown <directory> [numImages] [--dry-run] [--frontmatter-only] [--content-only] [--force]");
      console.log("  Audit frontmatter images:");
      console.log("    node imageGeneration.js audit [directory] [--include-drafts] [--verbose]");
      console.log("  Options:");
      console.log("    --dry-run           Show what would be done without generating images");
      console.log("    --frontmatter-only  Only process missing frontmatter coverImage files");
      console.log("    --content-only      Only process empty image references in content");
      console.log("    --force             Overwrite existing images");
      console.log("    --include-drafts    Include draft posts in audit (default: skip drafts)");
      console.log("    --verbose           Show all files including valid ones");
      process.exit(1);
    }

    const command = args[0];
    const isDryRun = args.includes('--dry-run');
    const frontmatterOnly = args.includes('--frontmatter-only');
    const contentOnly = args.includes('--content-only');
    const isForce = args.includes('--force');
    const includeDrafts = args.includes('--include-drafts');
    const isVerbose = args.includes('--verbose');

    // Remove flags from args
    const cleanArgs = args.filter(arg =>
      !arg.startsWith('--')
    );
    
    if (command === "prompt") {
      const prompt = cleanArgs[1];
      const numImages = parseInt(cleanArgs[2] || "3");
      
      if (!prompt) {
        console.error("Please provide a prompt");
        process.exit(1);
      }

      generator.generateImage(prompt, { numImages, dryRun: isDryRun, force: isForce })
        .then(() => console.log("Image generation complete"))
        .catch(console.error);
    } else if (command === "markdown") {
      const directory = cleanArgs[1];
      const numImages = parseInt(cleanArgs[2] || "3");
      
      if (!directory) {
        console.error("Please provide a directory");
        process.exit(1);
      }

      generator.processMarkdownFiles(directory, { 
        numImages, 
        dryRun: isDryRun, 
        frontmatterOnly,
        contentOnly,
        force: isForce 
      })
        .then(() => console.log("Markdown processing complete"))
        .catch(console.error);
    } else if (command === "audit") {
      const directory = cleanArgs[1] || 'docs';

      generator.auditFrontmatterImages(directory, {
        skipDrafts: !includeDrafts,
        verbose: isVerbose,
      })
        .then(() => console.log("\nAudit complete"))
        .catch(console.error);
    } else {
      console.error("Unknown command. Use 'prompt', 'markdown', or 'audit'");
      process.exit(1);
    }
  }
  
  main().catch(console.error);
} else {
  // Module imported, not run directly
} 