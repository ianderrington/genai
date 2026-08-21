import { readFileSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';
import { readState } from './state-io';
import {
  watchlistKey,
  type Watchlist,
  type ReleaseInfo,
  type RepoWithNewRelease,
} from './types';

const WATCHLIST_PATH = join(__dirname, 'watchlist.yaml');

export function loadWatchlist(): Watchlist {
  const raw = readFileSync(WATCHLIST_PATH, 'utf8');
  return yaml.load(raw) as Watchlist;
}

async function fetchLatestRelease(owner: string, repo: string): Promise<ReleaseInfo | null> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
    headers,
  });
  if (res.status === 404) return null; // repo has no releases published
  if (!res.ok) {
    throw new Error(`GitHub API error for ${owner}/${repo}: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as {
    tag_name: string;
    name: string | null;
    body: string | null;
    html_url: string;
    published_at: string | null;
  };
  return {
    tagName: data.tag_name,
    name: data.name,
    body: data.body,
    htmlUrl: data.html_url,
    publishedAt: data.published_at,
  };
}

/** Finds every watchlist repo whose latest release tag differs from the last-seen state. */
export async function findReposWithNewReleases(): Promise<RepoWithNewRelease[]> {
  const watchlist = loadWatchlist();
  const state = readState();
  const found: RepoWithNewRelease[] = [];

  for (const entry of watchlist.repos) {
    const key = watchlistKey(entry);
    const release = await fetchLatestRelease(entry.owner, entry.repo);
    if (!release) {
      console.log(`[eval-pipeline] ${key}: no releases published, skipping`);
      continue;
    }
    const previousTag = state.repos[key]?.lastSeenRelease ?? null;
    if (previousTag === release.tagName) {
      console.log(`[eval-pipeline] ${key}: no new release (still ${release.tagName})`);
      continue;
    }
    console.log(
      `[eval-pipeline] ${key}: new release ${release.tagName} (previously ${previousTag ?? 'none'})`,
    );
    found.push({ entry, release, previousTag });
  }

  return found;
}

async function main(): Promise<void> {
  const dryRun = process.argv.includes('--dry-run');
  const found = await findReposWithNewReleases();

  console.log(
    `\n[eval-pipeline] ${found.length} repo(s) with a new release since last check.`,
  );

  if (dryRun) {
    console.log('[eval-pipeline] --dry-run: not writing state.');
    return;
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('[eval-pipeline] fetch-releases failed:', err);
    process.exitCode = 1;
  });
}
