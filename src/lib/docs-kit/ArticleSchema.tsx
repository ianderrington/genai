import React from 'react';

interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  author?: { name: string; url: string };
  keywords?: string[];
  wordCount?: number;
}

export default function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  image,
  url,
  author = { name: 'Ian Derrington', url: 'https://ian.ceo/#person' },
  keywords = [],
  wordCount,
}: ArticleSchemaProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { '@type': 'Person', '@id': author.url, name: author.name },
    publisher: { '@type': 'Person', '@id': author.url, name: author.name },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  if (image) schema.image = { '@type': 'ImageObject', url: image };
  if (keywords.length > 0) schema.keywords = keywords;
  if (wordCount) schema.wordCount = wordCount;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
