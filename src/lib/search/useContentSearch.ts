'use client';

import { useEffect, useState, useRef } from 'react';
import { create, search as oramaSearch, AnyOrama } from '@orama/orama';
import { restore } from '@orama/plugin-data-persistence';

export interface SearchHit {
  slug: string;
  section: string;
  title: string;
  description: string;
  excerpt: string;
  tags: string[];
  score: number;
}

interface SearchIndexFile {
  version: string;
  built_at: string;
  doc_count: number;
  has_vectors: boolean;
  db: unknown;
}

interface DbCache {
  db: AnyOrama;
  hasVectors: boolean;
}

// ---------------------------------------------------------------------------
// Singleton DB cache — loaded once per browser session
// ---------------------------------------------------------------------------
let dbPromise: Promise<DbCache> | null = null;

function getDb(): Promise<DbCache> {
  if (!dbPromise) {
    dbPromise = (async (): Promise<DbCache> => {
      const res = await fetch('/search-index.json');
      if (!res.ok) throw new Error(`Failed to fetch search index: ${res.status}`);
      const indexFile: SearchIndexFile = await res.json();

      // Restore the Orama DB from the persisted JSON blob.
      // The schema used here must match the one written by build-search-index.ts.
      // We cast to AnyOrama to avoid fighting the complex generic inference.
      const db = (await restore('json', JSON.stringify(indexFile.db))) as AnyOrama;
      return { db, hasVectors: indexFile.has_vectors };
    })();
  }
  return dbPromise;
}

// ---------------------------------------------------------------------------
// Build a plain-text excerpt from content matching the query
// ---------------------------------------------------------------------------
function buildExcerpt(content: string, query: string): string {
  if (!content) return '';
  const lower = content.toLowerCase();
  const firstWord = query.toLowerCase().split(/\s+/)[0];
  const idx = lower.indexOf(firstWord);
  if (idx === -1) return content.slice(0, 160);
  const start = Math.max(0, idx - 60);
  const end = Math.min(content.length, idx + 160);
  const snip = content.slice(start, end).replace(/\n+/g, ' ').trim();
  return (start > 0 ? '…' : '') + snip + (end < content.length ? '…' : '');
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useContentSearch(
  query: string,
  limit = 20,
): { results: SearchHit[]; isLoading: boolean; error: string | null } {
  const [results, setResults] = useState<SearchHit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    let cancelled = false;

    debounceRef.current = setTimeout(async () => {
      try {
        const { db } = await getDb();

        const oramaResults = await oramaSearch(db, {
          term: trimmed,
          limit,
          properties: ['title', 'description', 'content', 'tags'] as string[],
          tolerance: 1,
        });

        if (!cancelled) {
          const hits: SearchHit[] = oramaResults.hits.map(hit => {
            const doc = hit.document as Record<string, unknown>;
            return {
              slug: String(doc.slug ?? ''),
              section: String(doc.section ?? ''),
              title: String(doc.title ?? ''),
              description: String(doc.description ?? ''),
              excerpt: buildExcerpt(String(doc.content ?? ''), trimmed),
              tags: Array.isArray(doc.tags) ? (doc.tags as string[]) : [],
              score: hit.score,
            };
          });
          setResults(hits);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Search failed');
          setResults([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }, 200);

    return () => {
      cancelled = true;
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };

    // TODO: vector search upgrade — for natural-language queries (>3 words),
    // POST to /api/search which generates a server-side embedding and runs
    // oramaSearch with mode: 'vector' on the stored embeddings.
  }, [query, limit]);

  return { results, isLoading, error };
}
