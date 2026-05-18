import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface PagesConfig {
  nav: string[];
  order?: string[];
}

export async function readPagesConfig(dirPath: string): Promise<PagesConfig> {
  try {
    const configPath = path.join(dirPath, '.pages');
    if (!fs.existsSync(configPath)) {
      return { nav: [] };
    }
    
    const configContent = await fs.promises.readFile(configPath, 'utf-8');
    return yaml.load(configContent) as PagesConfig;
  } catch (error) {
    console.error('Error reading .pages config:', error);
    return { nav: [] };
  }
}

export function sortByPagesConfig<T extends { slug: string }>(items: T[], config: PagesConfig): T[] {
  if (!config.order || config.order.length === 0) {
    return items;
  }

  // Create a map for O(1) lookup of order indices
  const orderMap = new Map(config.order.map((slug, index) => [slug, index]));

  return [...items].sort((a, b) => {
    const aOrder = orderMap.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const bOrder = orderMap.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    return aOrder - bOrder;
  });
} 