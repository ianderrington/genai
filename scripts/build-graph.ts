/**
 * build-graph.ts
 *
 * Exports the qmd-entity knowledge graph to public/graph.json at build time.
 * Safe to run before any QMD data exists — no-ops gracefully.
 *
 * Usage:
 *   npx tsx scripts/build-graph.ts
 *
 * Output format:
 *   public/graph.json — {generated, nodes[], edges[]}
 *
 * API used from @supernal/qmd-entity:
 *   - getDbPath()        — resolve DB path (env QMD_DB_PATH or ~/.cache/qmd/index.sqlite)
 *   - listEntities(type) — list all entities, optionally filtered by EntityType
 *   - getDb()            — open DB connection (throws if file doesn't exist and allowCreate=false)
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '..', 'public', 'graph.json');

// ---------------------------------------------------------------------------
// Attempt to load @supernal/qmd-entity. Try npm package first, then fall back
// to the sibling path in the monorepo (dev environment).
// ---------------------------------------------------------------------------
async function loadQmdEntity() {
  // 1. Try the npm package (works when installed)
  try {
    return await import('@supernal/qmd-entity');
  } catch {
    // not installed as npm dep
  }

  // 2. Try sibling monorepo path (local dev)
  const siblingPath = join(
    __dirname,
    '../../supernal-coding/packages/qmd-entity/dist/index.js'
  );
  if (existsSync(siblingPath)) {
    try {
      return await import(siblingPath);
    } catch {
      // dist not built or incompatible
    }
  }

  return null;
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

async function main() {
  // -------------------------------------------------------------------------
  // Load qmd-entity. If unavailable, emit an empty graph and exit 0.
  // -------------------------------------------------------------------------
  const qmd = await loadQmdEntity();
  if (!qmd) {
    console.log('[build-graph] @supernal/qmd-entity not available — skipping graph export');
    return;
  }

  const { getDbPath, listEntities, getDb } = qmd as {
    getDbPath: () => string;
    listEntities: (type?: string) => Array<{
      id: string;
      name: string;
      type: string;
      description?: string | null;
      factCount: number;
      relationCount: number;
      aliases: string[];
      firstSeen: string;
      lastSeen: string;
    }>;
    getDb: (allowCreate?: boolean) => {
      prepare: (sql: string) => { all: (...args: unknown[]) => unknown[] };
    };
  };

  // -------------------------------------------------------------------------
  // Check whether the QMD SQLite database exists before trying to open it.
  // First-run environments (CI, fresh Vercel deploy) won't have it yet.
  // -------------------------------------------------------------------------
  const dbPath = getDbPath();
  if (!existsSync(dbPath)) {
    console.log(`[build-graph] No QMD database found at ${dbPath} — skipping graph export`);
    return;
  }

  // -------------------------------------------------------------------------
  // Query entities. We prefer type="concept" (AI topic nodes) but fall back
  // to all entity types if the DB contains no concepts.
  // -------------------------------------------------------------------------
  let entities: ReturnType<typeof listEntities>;
  try {
    entities = listEntities('concept');
    if (entities.length === 0) {
      // No concept-typed entities yet — grab everything
      entities = listEntities();
    }
  } catch (err) {
    console.log(`[build-graph] Could not query entities: ${(err as Error).message} — skipping`);
    return;
  }

  if (entities.length === 0) {
    console.log('[build-graph] No entities found in QMD database — writing empty graph');
  }

  // -------------------------------------------------------------------------
  // Build nodes. weight = factCount + relationCount (measures importance).
  // -------------------------------------------------------------------------
  const nodes: GraphNode[] = entities.map((e) => ({
    id: e.id,
    name: e.name,
    type: e.type,
    // weight drives node size in the canvas — sum of all linked facts + relationships
    weight: (e.factCount ?? 0) + (e.relationCount ?? 0),
  }));

  // Build a fast id set for edge filtering
  const nodeIds = new Set(nodes.map((n) => n.id));

  // -------------------------------------------------------------------------
  // Query relationships directly from SQLite. There is no standalone
  // listRelationships() function in the public API, so we use getDb().
  // -------------------------------------------------------------------------
  let edges: GraphEdge[] = [];
  try {
    const db = getDb();
    const rows = db
      .prepare(
        `SELECT source_entity_id as source, target_entity_id as target, relation_type as type
         FROM relationships`
      )
      .all() as Array<{ source: string; target: string; type: string }>;

    // Only include edges where both endpoints are in our node set
    edges = rows.filter((r) => nodeIds.has(r.source) && nodeIds.has(r.target));
  } catch (err) {
    // relationships table may not exist on a fresh schema — non-fatal
    console.log(`[build-graph] Could not query relationships: ${(err as Error).message}`);
  }

  // -------------------------------------------------------------------------
  // Write public/graph.json
  // -------------------------------------------------------------------------
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
  console.log(
    `[build-graph] Wrote ${nodes.length} nodes, ${edges.length} edges → public/graph.json`
  );
}

main().catch((err) => {
  console.error('[build-graph] Unexpected error:', err);
  process.exit(1);
});
