import React from 'react';

interface PersonSchemaProps {
  name?: string;
  jobTitle?: string;
  description?: string;
  email?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  alumniOf?: string;
  worksFor?: string;
  founder?: Array<{ name: string; url: string }>;
}

export default function PersonSchema({
  name = 'Ian Derrington',
  jobTitle = 'CEO & Founder',
  description = 'CEO/Founder of Supernal Intelligence, inventor of Nanopore Sequencing Technology, PhD in Physics',
  email = 'ianderrington@gmail.com',
  url = 'https://ian.ceo',
  image = 'https://ian.ceo/images/authors/i_logo.png',
  sameAs = [
    'https://x.com/ian_derrington',
    'https://github.com/ianderrington',
    'https://bsky.app/profile/sentienti.bsky.social',
    'https://www.threads.net/@supernalai',
    'https://www.linkedin.com/in/ian-derrington',
    'https://www.managen.ai',
    'https://www.maketruthmatter.com',
  ],
  knowsAbout = [
    'Generative AI',
    'Large Language Models',
    'Nanopore Sequencing',
    'Physics',
    'Genomics',
    'Biotechnology',
    'AI Engineering',
  ],
  alumniOf = 'University of Washington',
  worksFor = 'Supernal Intelligence',
  founder = [
    { name: 'Supernal Intelligence', url: 'https://supernal.ai' },
    { name: 'Managen.ai', url: 'https://www.managen.ai' },
    { name: 'Make Truth Matter', url: 'https://www.maketruthmatter.com' },
  ],
}: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}/#person`,
    name,
    jobTitle,
    description,
    email,
    url,
    image,
    sameAs,
    knowsAbout,
    alumniOf: { '@type': 'EducationalOrganization', name: alumniOf },
    worksFor: { '@type': 'Organization', name: worksFor },
    founder: founder.map((org) => ({ '@type': 'Organization', name: org.name, url: org.url })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
