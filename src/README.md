# Blog Navigation and Content Organization

## Overview
A hierarchical blog system that organizes technical content into folders and posts, with intuitive navigation and content preview capabilities.

## Core Features

### Main Blog Page
- [x] Display a clear overview of all content categories (AI, Fiction, Markets, etc.)
- [ ] Show category cards with descriptions from their respective index.md files
- [ ] Present the main blog introduction and purpose at the top of the page

### Navigation
- [ ] Collapsable left sidebar showing all main categories
- [ ] Ability to navigate between folders and posts without page reloads
- [ ] Clear breadcrumb trail showing current location in the content hierarchy
- [ ] Shareable URLs for direct linking to any content

### Content Organization
- [ ] Collections (folders) may contain an index.md describing the collection otherwise the folder name is used as the title.
- [ ] Posts within categories show previews via "more" tags
- [ ] Support for nested content based on folder structure 
- [ ] Folders may contain subfolders and are represented per content display
- [ ] Each post can have categories, bullets, and other metadata

### Content Display
- [ ] Layout has index.md content at top (if present) that can be expanded collapsed. Otherwise the folder name is used as the title.
- [ ] Underneath main content is blog-post in card format
- [ ] Preview cards showing excerpts from posts
- [ ] Clear distinction between collections and individual posts
- [ ] Modal view for reading full posts without losing context
- [ ] Back button returns to previous view instead of root

### Content Preview
- [ ] Show excerpts defined by <!--more--> tags
- [ ] Fallback to first 150 characters if no tag exists
- [ ] Maintain HTML formatting in previews
- [ ] Display post metadata (date, categories) in previews

### Search
- [ ] Search bar at top of page
- [ ] Search results are displayed in card format
- [ ] Search results include post metadata (date, categories)
- [ ] Search results are paginated
- [ ] Search results are sorted by relevance
- [ ] Search results are case insensitive

## User Experience Goals
- [ ] Intuitive content discovery
- [ ] Maintain context while browsing
- [ ] Quick access to main categories
- [ ] Seamless transitions between views
- [ ] Easy sharing and linking capabilities
