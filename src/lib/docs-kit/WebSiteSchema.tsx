import React from 'react';

interface WebSiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
  author?: string;
  publisher?: { name: string; url: string };
}

export default function WebSiteSchema({
  name = 'ManaGen AI — The Living Guide to Generative AI',
  url = 'https://www.managen.ai',
  description = 'The Living Guide to Generative AI: in-depth coverage of LLMs, agents, and practical AI engineering.',
  author = 'https://ian.ceo/#person',
  publisher = { name: 'SI 42', url: 'https://si42.ai' },
}: WebSiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    author: { '@id': author },
    publisher: { '@type': 'Organization', name: publisher.name, url: publisher.url },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
