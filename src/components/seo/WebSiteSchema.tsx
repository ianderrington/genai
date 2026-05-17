import React from 'react';

interface WebSiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
  author?: string;
}

export default function WebSiteSchema({
  name = "ManaGen AI",
  url = "https://www.managen.ai",
  description = "Enabling Generative and General AI to be well understood and effectively used",
  author = "https://www.managen.ai/#person"
}: WebSiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    author: {
      "@id": author
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
