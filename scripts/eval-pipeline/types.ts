export interface WatchlistEntry {
  owner: string;
  repo: string;
  category: string;
}

export interface Watchlist {
  repos: WatchlistEntry[];
}

export interface ReleaseInfo {
  tagName: string;
  name: string | null;
  body: string | null;
  htmlUrl: string;
  publishedAt: string | null;
}

export interface RepoState {
  lastSeenRelease: string | null;
  lastScoredAt: string | null;
  lastScore: number | null;
}

export interface PipelineState {
  version: 1;
  lastPublishedPostDate: string | null;
  repos: Record<string, RepoState>;
}

export interface RepoWithNewRelease {
  entry: WatchlistEntry;
  release: ReleaseInfo;
  previousTag: string | null;
}

export function watchlistKey(entry: WatchlistEntry): string {
  return `${entry.owner}/${entry.repo}`;
}
