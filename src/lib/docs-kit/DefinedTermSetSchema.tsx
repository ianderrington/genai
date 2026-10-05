import React from 'react';

interface DefinedTermSetSchemaProps {
  name: string;
  url: string;
  terms: Array<{ term: string; definition: string }>;
}

export default function DefinedTermSetSchema({ name, url, terms }: DefinedTermSetSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name,
    url,
    hasDefinedTerm: terms.map(({ term, definition }) => ({
      '@type': 'DefinedTerm',
      name: term,
      description: definition,
      inDefinedTermSet: url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
