/**
 * build-graph.ts
 *
 * Exports a content-derived concept graph to public/graph.json at build time,
 * sourced directly from docs/**\/*.md frontmatter/headings -- NOT from the
 * optional qmd-entity SQLite cache (removed entirely: that cache may or may
 * not exist on a given machine, which made the constellation canvas
 * non-reproducible across environments, and never exists in CI/Vercel).
 *
 * Usage:
 *   npx tsx scripts/build-graph.ts [--verbose]
 *
 * Output format:
 *   public/graph.json -- {generated, nodes[], edges[]}
 *   (edges is always [] -- ConstellationCanvas.tsx does not read graph.json's
 *   edges at all; it draws proximity lines between animated node positions at
 *   runtime. Kept in the schema for forward compatibility.)
 *
 * Uses the real `gray-matter` (already genai's own direct dependency) rather
 * than @supernal/docs-kit's or genai's own markdown.ts's parseFrontmatter --
 * both of those eagerly require() the entire unified/remark/rehype/katex
 * pipeline (confirmed in docs-kit's built dist/lib/index.js) just to read one
 * title field. gray-matter alone has no heavy transitive deps.
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

import { getContentDirectory, readDirectoryRecursively, readMarkdownFile } from '../src/lib/content/filesystem';
import { logger } from '../src/lib/logger';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '..', 'public', 'graph.json');
const VERBOSE = process.argv.includes('--verbose');

// ---------------------------------------------------------------------------
// Content filter
// ---------------------------------------------------------------------------

// Path-based denylist, checked FIRST (before any title-derivation logic) so
// a file can never land in two buckets at once -- e.g. docs/Managenai/index.md
// has no frontmatter and would otherwise also match the
// index-without-frontmatter-title rule below; denylist wins, unconditionally.
const DENY_PREFIXES = ['Managenai/']; // genai's own "managing this docs project" section -- not AI content
const DENY_SUBSTRINGS = ['/leaked/']; // raw leaked-prompt captures -- not concepts

function isDenylisted(relPath: string): boolean {
  if (DENY_PREFIXES.some((p) => relPath.startsWith(p))) return true;
  const withSlash = `/${relPath}`;
  return DENY_SUBSTRINGS.some((s) => withSlash.includes(s));
}

// Strips emoji / pictographs / dingbats / regional-indicator flags / variation
// selectors -- defense-in-depth for H1 fallbacks that bypass a clean
// frontmatter title (the one confirmed hit in this corpus, Managenai/contributing.md,
// is already excluded by the denylist above; kept for future content).
const DECORATIVE_RE = /[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu;

// Matches raw dated-capture filenames like "Claude_2024-07-11.md" -- only
// consulted when the title source is the filename fallback tier (i.e. no
// frontmatter title and no H1), so a real article that happens to have a
// date in its own filename (docs/Understanding/prompting/examples/coding/Claude_2024-07-20.md,
// which HAS real content and would derive its title from an H1 or frontmatter,
// not the filename) is never affected by this rule.
const DATE_IN_FILENAME_RE = /\d{4}-\d{2}-\d{2}/;

const H1_RE = /^#\s+(.+)$/m;

function toTitleCase(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function sanitizeTitle(raw: string): string {
  return raw.replace(DECORATIVE_RE, '').replace(/\s+/g, ' ').trim();
}

type TitleSource = 'frontmatter' | 'h1' | 'filename';

interface TitleResult {
  title: string;
  source: TitleSource;
}

/**
 * Title precedence: frontmatter `title` (trimmed -- catches whitespace-only
 * values like docs/index.md's `title: " "`) > H1 (non-index files only) >
 * filename. Index pages (index.md/index.mdx) without a real, non-blank
 * frontmatter title are skipped outright rather than falling back to H1/
 * folder name -- their bare H1 ("Examples", "Blog", "Ethically") reads as
 * meaningless once it's floating alone on a homepage canvas instead of under
 * its section breadcrumb.
 */
function deriveTitle(relPath: string, fmTitle: unknown, body: string): TitleResult | null {
  const base = basename(relPath);
  const isIndex = base === 'index.md' || base === 'index.mdx';

  const fmTitleStr = typeof fmTitle === 'string' ? fmTitle.trim() : '';
  if (fmTitleStr) {
    return { title: fmTitleStr, source: 'frontmatter' };
  }

  if (isIndex) {
    return null;
  }

  const h1Match = body.match(H1_RE);
  if (h1Match) {
    return { title: h1Match[1].trim(), source: 'h1' };
  }

  const slug = base.replace(/\.(md|mdx)$/i, '');
  return { title: toTitleCase(slug), source: 'filename' };
}

interface GraphNode {
  id: string;
  name: string;
  type: string;
  weight: number;
}

interface GraphEdge {
  source: string;
  target: string;
  type: string;
}

interface GraphJson {
  generated: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

type SkipReason = 'denylist' | 'index-without-frontmatter-title' | 'empty-after-sanitize' | 'dated-filename-fallback';

interface SkipLogEntry {
  relPath: string;
  reason: SkipReason;
}

async function main() {
  const contentDir = getContentDirectory();
  if (!existsSync(contentDir)) {
    logger.warn(`[build-graph] No docs directory found at ${contentDir} -- writing empty graph`);
    writeGraph([]);
    return;
  }

  const relPaths = await readDirectoryRecursively(contentDir);
  if (relPaths.length === 0) {
    logger.warn(`[build-graph] docs directory ${contentDir} contains no .md/.mdx files -- writing empty graph`);
    writeGraph([]);
    return;
  }

  const nodes: GraphNode[] = [];
  const skipped: SkipLogEntry[] = [];

  for (const relPath of relPaths) {
    // Denylist is checked FIRST and unconditionally -- a file can only ever
    // land in exactly one skip bucket, never both (see comment on DENY_PREFIXES).
    if (isDenylisted(relPath)) {
      skipped.push({ relPath, reason: 'denylist' });
      continue;
    }

    const raw = await readMarkdownFile(join(contentDir, relPath));
    if (!raw) continue; // read error already logged by readMarkdownFile

    // gray-matter throws a real YAML parse error on malformed frontmatter
    // (e.g. an unclosed opening "---" fence) -- confirmed present in this
    // corpus (2 files under docs/Understanding/agents/slides/basics/). Fall
    // back to treating the whole file as body (no frontmatter) rather than
    // aborting the entire build over one bad file.
    let parsed: { data: Record<string, unknown>; content: string };
    try {
      parsed = matter(raw);
    } catch (err) {
      logger.warn(
        `[build-graph] Malformed frontmatter in ${relPath} (${(err as Error).message.split('\n')[0]}) -- treating as no frontmatter`,
      );
      parsed = { data: {}, content: raw };
    }

    const result = deriveTitle(relPath, parsed.data?.title, parsed.content);

    if (!result) {
      skipped.push({ relPath, reason: 'index-without-frontmatter-title' });
      continue;
    }

    const cleanTitle = sanitizeTitle(result.title);
    if (!cleanTitle) {
      skipped.push({ relPath, reason: 'empty-after-sanitize' });
      continue;
    }

    if (result.source === 'filename' && DATE_IN_FILENAME_RE.test(basename(relPath))) {
      skipped.push({ relPath, reason: 'dated-filename-fallback' });
      continue;
    }

    const id = relPath.replace(/\.(md|mdx)$/i, '');
    const weight = parsed.content.trim().split(/\s+/).filter(Boolean).length;

    nodes.push({ id, name: cleanTitle, type: 'concept', weight });

    if (VERBOSE) {
      console.log(`[build-graph] KEEP  ${result.source.padEnd(11)} "${cleanTitle}"  <- ${relPath}`);
    }
  }

  if (VERBOSE) {
    for (const s of skipped) {
      console.log(`[build-graph] SKIP  ${s.reason.padEnd(32)} ${s.relPath}`);
    }
    const byReason: Record<string, number> = {};
    for (const s of skipped) byReason[s.reason] = (byReason[s.reason] ?? 0) + 1;
    console.log(`[build-graph] Skip breakdown: ${JSON.stringify(byReason)}`);
  }

  console.log(
    `[build-graph] ${nodes.length} kept, ${skipped.length} skipped ` +
    `(${relPaths.length} total .md/.mdx files under ${contentDir})`
  );

  writeGraph(nodes);
}

function writeGraph(nodes: GraphNode[]) {
  const edges: GraphEdge[] = []; // no content-derived relationship graph yet; frontend doesn't read this today

  const graph: GraphJson = {
    generated: new Date().toISOString(),
    nodes,
    edges,
  };

  const publicDir = join(__dirname, '..', 'public');
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(graph, null, 2), 'utf-8');
  console.log(`[build-graph] Wrote ${nodes.length} nodes, ${edges.length} edges -> public/graph.json`);
}

main().catch((err) => {
  console.error('[build-graph] Unexpected error:', err);
  process.exit(1);
});
