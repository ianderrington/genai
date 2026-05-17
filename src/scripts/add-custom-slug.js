// Script to add a custom slug to a markdown file's frontmatter

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

/**
 * Add a custom slug to a markdown file's frontmatter
 * @param {string} filePath - Path to the markdown file
 * @param {string} customSlug - The custom slug to add
 */
async function addCustomSlug(filePath, customSlug) {
  if (!filePath || !customSlug) {
    console.error('Missing required parameters: filePath and customSlug');
    process.exit(1);
  }

  try {
    // Check if file exists
    try {
      await fs.promises.access(filePath);
    } catch (error) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }

    // Read the file content
    const content = await readFile(filePath, 'utf-8');

    // Check if the file has frontmatter
    const hasFrontmatter = content.startsWith('---');

    if (!hasFrontmatter) {
      // Add new frontmatter with slug
      const newContent = `---
slug: ${customSlug}
---

${content}`;
      await writeFile(filePath, newContent);
      console.log(`Added frontmatter with slug: ${customSlug} to ${filePath}`);
      return;
    }

    // File has frontmatter, need to modify it
    const firstDividerIndex = content.indexOf('---');
    const secondDividerIndex = content.indexOf('---', firstDividerIndex + 3);

    if (secondDividerIndex === -1) {
      console.error(`Invalid frontmatter in file: ${filePath}`);
      process.exit(1);
    }

    // Extract frontmatter
    const frontmatter = content.slice(firstDividerIndex + 3, secondDividerIndex).trim();
    const restOfContent = content.slice(secondDividerIndex);

    // Check if frontmatter already has a slug
    const slugRegex = /^slug:\s*(.*)/m;
    const hasSlug = slugRegex.test(frontmatter);

    let newFrontmatter;
    if (hasSlug) {
      // Replace existing slug
      newFrontmatter = frontmatter.replace(slugRegex, `slug: ${customSlug}`);
      console.log(`Replaced existing slug with: ${customSlug} in ${filePath}`);
    } else {
      // Add slug to existing frontmatter
      newFrontmatter = `${frontmatter}\nslug: ${customSlug}`;
      console.log(`Added slug: ${customSlug} to existing frontmatter in ${filePath}`);
    }

    // Combine the updated frontmatter with the rest of the content
    const newContent = `---
${newFrontmatter}
${restOfContent}`;

    // Write the updated content back to the file
    await writeFile(filePath, newContent);
    console.log(`File updated successfully: ${filePath}`);
  } catch (error) {
    console.error(`Error updating file: ${error}`);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const filePath = args[0];
const customSlug = args[1];

if (args.length < 2) {
  console.error('Usage: node add-custom-slug.js <file-path> <custom-slug>');
  process.exit(1);
}

// Run the script
addCustomSlug(filePath, customSlug)
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  }); 