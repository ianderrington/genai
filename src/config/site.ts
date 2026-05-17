import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

interface SiteConfig {
  site: {
    title: string;
    description: string;
    url: string;
    language: string;
    favicon: string;
    copyright: string;
  };
  author: {
    name: string;
    email: string;
    link: string;
    jobTitle?: string;
    description?: string;
    social?: {
      twitter?: string;
      github?: string;
      bluesky?: string;
      threads?: string;
      linkedin?: string;
    };
    organizations?: Array<{
      name: string;
      url: string;
      role: string;
    }>;
  };
  rss: {
    title: string;
    description: string;
    categories: string[];
    ttl: number;
  };
}

// Load and parse the YAML config file
const configPath = path.join(process.cwd(), 'docs', 'site.config.yaml');
const configFile = fs.readFileSync(configPath, 'utf8');
const config: SiteConfig = yaml.parse(configFile);

export const siteConfig = config; 