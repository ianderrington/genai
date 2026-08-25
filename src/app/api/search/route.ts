import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { search as oramaSearch, AnyOrama } from '@orama/orama';
import { restore } from '@orama/plugin-data-persistence';

// Server-side counterpart to src/lib/search/useContentSearch.ts's client-side
// hook. Restores the same Orama index built by scripts/build-search-index.ts
// so any HTTP client — not just the browser search bar — can query the
// site's content. This is what makes managen.ai's content queryable by an
// AI agent rather than only crawlable as HTML.
//
// Vector search mode is not wired up here: build-search-index.ts embeds via
// a devDependency (@xenova/transformers, an ~80MB local ONNX model), and
// promoting that into a live serverless request path is a separate decision
// (cold-start cost, memory, whether to move it to a production dependency or
// call a hosted embedding API instead). This route covers full-text search,
// the same mode the human-facing search bar already uses.

export const dynamic = 'force-dynamic';

interface SearchIndexFile {
  version: string;
  built_at: string;
  doc_count: number;
  has_vectors: boolean;
  db: unknown;
}

let dbPromise: Promise<AnyOrama> | null = null;

function getDb(): Promise<AnyOrama> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const raw = await readFile(join(process.cwd(), 'public', 'search-index.json'), 'utf-8');
      const indexFile: SearchIndexFile = JSON.parse(raw);
      return (await restore('json', JSON.stringify(indexFile.db))) as AnyOrama;
    })();
  }
  return dbPromise;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const term = url.searchParams.get('q')?.trim() ?? '';
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '10', 10) || 10, 50);

  if (!term) {
    return NextResponse.json(
      { error: 'Missing required query parameter "q"' },
      { status: 400 },
    );
  }

  try {
    const db = await getDb();
    const results = await oramaSearch(db, {
      term,
      limit,
      properties: ['title', 'description', 'content', 'tags'],
      tolerance: 1,
    });

    return NextResponse.json({
      query: term,
      count: results.count,
      results: results.hits.map((hit) => {
        const doc = hit.document as Record<string, unknown>;
        return {
          slug: doc.slug,
          section: doc.section,
          title: doc.title,
          description: doc.description,
          tags: doc.tags,
          url: `https://www.managen.ai/${doc.slug}`,
          score: hit.score,
        };
      }),
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Search failed' },
      { status: 500 },
    );
  }
}
