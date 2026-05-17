# Blog Utility Scripts

This directory contains utility scripts for managing the blog system.

## Duplicate Slug Detection

The `find-duplicate-slugs.js` script scans your content directory for Markdown files with duplicate slugs that could cause issues with React key conflicts and URL inconsistencies.

### Usage

```bash
node src/scripts/find-duplicate-slugs.js
```

This will scan the content directory (default: `docs/`) for any Markdown files that would generate the same slugs. If duplicates are found, it will list them along with suggestions for how to fix them.

## Adding Custom Slugs

When duplicate slugs are detected, you can use the `add-custom-slug.js` script to add a custom slug to a Markdown file's frontmatter.

### Usage

```bash
node src/scripts/add-custom-slug.js <file-path> <custom-slug>
```

#### Example

```bash
# Add a custom slug to a file that conflicts with another
node src/scripts/add-custom-slug.js docs/blog/ai-tools/gpt.md ai-tools-gpt-4
```

This will add or update the frontmatter of the specified file to include a custom slug:

```markdown
---
title: GPT Tools Guide
date: 2023-06-15
slug: ai-tools-gpt-4
---

Content starts here...
```

## Why Direct Slugs Matter

Using direct slugs as React keys (rather than synthetic keys) provides several benefits:

1. **Direct URL Mapping**: The key used in React directly corresponds to the URL path, making debugging easier.
2. **Analytics Tracking**: Direct slug mapping maintains the connection between UI components and tracking URLs.
3. **Sharing Consistency**: Share URLs and component identifiers remain consistent.
4. **Simplicity**: The code is more maintainable without extra transformation functions.

## Best Practices

- When creating new content, use unique filenames and paths to avoid slug conflicts
- For content with identical names that must exist in the same section, use custom slugs in frontmatter
- Follow consistent naming conventions for content files 