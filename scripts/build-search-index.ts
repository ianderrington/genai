import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, dirname, relative, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { create, insert } from '@orama/orama';
import { persist } from '@orama/plugin-data-persistence';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = join(__dirname, '..', 'docs');
const OUTPUT_PATH = join(__dirname, '..', 'public', 'search-index.json');

// ---------------------------------------------------------------------------
// Frontmatter parser — no external deps
// ---------------------------------------------------------------------------
function parseFrontmatter(raw: string): { meta: Record<string, unknown>; body: string } {
  if (!raw.startsWith('---')) return { meta: {}, body: raw };
  const end = raw.indexOf('\n---', 4);
  if (end === -1) return { meta: {}, body: raw };
  const yamlBlock = raw.slice(4, end).trim();
  const body = raw.slice(end + 4).trim();
  const meta: Record<string, unknown> = {};
  for (const line of yamlBlock.split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let val = line.slice(colon + 1).trim();
    // Handle inline arrays: tags: [a, b, c]
    if (val.startsWith('[') && val.endsWith(']')) {
      meta[key] = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
    } else {
      meta[key] = val.replace(/^['"]|['"]$/g, '');
    }
  }
  return { meta, body };
}

// ---------------------------------------------------------------------------
// Strip markdown syntax from content
// ---------------------------------------------------------------------------
function stripMarkdown(text: string, maxLen: number): string {
  return text
    .replace(/^---[\s\S]*?---\n?/m, '')          // frontmatter
    .replace(/```[\s\S]*?```/g, '')               // code fences
    .replace(/`[^`]*`/g, '')                      // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '')              // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')      // links → text
    .replace(/^#{1,6}\s+/gm, '')                  // headings
    .replace(/^\s*[-*+]\s+/gm, '')                // list bullets
    .replace(/^\s*\d+\.\s+/gm, '')                // ordered lists
    .replace(/[*_~]{1,3}([^*_~]*)[*_~]{1,3}/g, '$1') // bold/italic
    .replace(/\|.*\|/g, '')                       // tables
    .replace(/^\s*>\s*/gm, '')                    // blockquotes
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLen);
}

// ---------------------------------------------------------------------------
// Collect all .md files recursively
// ---------------------------------------------------------------------------
function collectMdFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.')) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectMdFiles(full));
    } else if (extname(entry) === '.md') {
      results.push(full);
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Extract first non-heading paragraph (max 300 chars)
// ---------------------------------------------------------------------------
function extractDescription(body: string): string {
  const lines = body.split('\n');
  const paragraphs: string[] = [];
  let current = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (current && !current.startsWith('#') && !current.startsWith('|') && !current.startsWith('```')) {
        paragraphs.push(current.trim());
      }
      current = '';
    } else {
      current += (current ? ' ' : '') + trimmed;
    }
  }
  if (current && !current.startsWith('#')) paragraphs.push(current.trim());
  const first = paragraphs.find(p => !p.startsWith('#') && p.length > 20);
  if (!first) return '';
  return stripMarkdown(first, 300);
}

// ---------------------------------------------------------------------------
// Attempt to load @xenova/transformers
// ---------------------------------------------------------------------------
async function loadEmbedder(): Promise<((texts: string, opts: Record<string, unknown>) => Promise<{ data: Float32Array }>) | null> {
  try {
    const mod = await import('@xenova/transformers');
    const pipeline = mod.pipeline ?? mod.default?.pipeline;
    if (!pipeline) throw new Error('No pipeline export found');
    console.log('[search-index] Loading embedding model (first run downloads ~80MB)...');
    const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    console.log('[search-index] Embedding model ready');
    return embedder as (texts: string, opts: Record<string, unknown>) => Promise<{ data: Float32Array }>;
  } catch (err) {
    console.warn('[search-index] WARNING: @xenova/transformers unavailable — building text-only index');
    console.warn('[search-index] Reason:', (err as Error).message?.slice(0, 120));
    return null;
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  if (!existsSync(DOCS_DIR)) {
    console.log(`[search-index] No docs directory at ${DOCS_DIR} — skipping`);
    return;
  }

  const files = collectMdFiles(DOCS_DIR);
  if (files.length === 0) {
    console.log('[search-index] No markdown files found — skipping');
    return;
  }

  const embedder = await loadEmbedder();
  const withVectors = embedder !== null;

  // Schema: conditionally include embedding field
  const schema = withVectors
    ? {
        slug: 'string' as const,
        section: 'string' as const,
        title: 'string' as const,
        description: 'string' as const,
        content: 'string' as const,
        tags: 'string[]' as const,
        embedding: 'vector[384]' as const,
      }
    : {
        slug: 'string' as const,
        section: 'string' as const,
        title: 'string' as const,
        description: 'string' as const,
        content: 'string' as const,
        tags: 'string[]' as const,
      };

  const db = await create({ schema } as Parameters<typeof create>[0]);

  let indexed = 0;
  for (const filePath of files) {
    const relPath = relative(DOCS_DIR, filePath);
    const slug = relPath.replace(/\.md$/, '').toLowerCase().replace(/\\/g, '/');
    const section = slug.split('/')[0] ?? '';
    const raw = readFileSync(filePath, 'utf-8');
    const { meta, body } = parseFrontmatter(raw);

    // Title: frontmatter → first heading → filename
    let title = (meta.title as string) || '';
    if (!title) {
      const headingMatch = body.match(/^#+\s+(.+)/m);
      title = headingMatch ? headingMatch[1].trim() : basename(filePath, '.md').replace(/-/g, ' ');
    }

    // Description
    const description = (meta.description as string) ||
      extractDescription(body);

    // Content — stripped, max 2000 chars
    const content = stripMarkdown(body, 2000);

    // Tags
    const rawTags = meta.tags;
    const tags: string[] = Array.isArray(rawTags)
      ? rawTags.map(String)
      : typeof rawTags === 'string'
        ? rawTags.split(',').map(s => s.trim()).filter(Boolean)
        : [];

    const doc: Record<string, unknown> = { slug, section, title, description, content, tags };

    if (withVectors && embedder) {
      try {
        const embedText = `${title}. ${description}. ${content.slice(0, 500)}`;
        const out = await embedder(embedText, { pooling: 'mean', normalize: true });
        doc.embedding = Array.from(out.data) as number[];
      } catch (embErr) {
        console.warn(`[search-index] Embedding failed for ${slug}: ${(embErr as Error).message?.slice(0, 80)}`);
        // Insert without embedding rather than failing
        if ('embedding' in doc) delete doc.embedding;
      }
    }

    await insert(db, doc as Parameters<typeof insert>[1]);
    indexed++;
    console.log(`[search-index] Indexed ${indexed}/${files.length}: ${slug}`);
  }

  // Serialize using plugin-data-persistence
  const serialized = await persist(db, 'json');

  const publicDir = join(__dirname, '..', 'public');
  if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

  const output = JSON.stringify({
    version: '1',
    built_at: new Date().toISOString(),
    doc_count: indexed,
    has_vectors: withVectors,
    db: JSON.parse(serialized as string),
  });

  writeFileSync(OUTPUT_PATH, output, 'utf-8');

  const sizeMB = (output.length / 1024 / 1024).toFixed(2);
  console.log(`[search-index] Done: ${indexed} docs, ${sizeMB}MB → public/search-index.json (vectors: ${withVectors})`);
}

main().catch(err => {
  console.error('[search-index] Unexpected error:', err);
  process.exit(1);
});
