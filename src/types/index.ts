// src/types/index.ts

export interface BlogPostProps {
  slug: string;
  title: string;
  date: string;
  content: string;
  htmlContent: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: string;
  authorImage: string;
  authorBio: string;
  readingTime: string;
}

export interface BlogMetadata {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: string;
  authorImage: string;
  authorBio: string;
}