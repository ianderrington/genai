import type { AnnounceResult } from './types';

/**
 * Minimal re-implementation of the request shape in
 * families/supernal-coding/packages/modules/lib/publishers/x.ts, without
 * importing it (same cross-repo-dependency rationale as linkedin.ts). Same
 * official POST /2/tweets call — never the unofficial cookie-based path that
 * repo's own x.ts explicitly rejects for violating X's Developer Agreement.
 *
 * Self-checks its own credential, returns {skipped:true, reason} instead of
 * throwing when X_BEARER_TOKEN is unset.
 */
export async function postToX(text: string): Promise<AnnounceResult> {
  const bearerToken = process.env.X_BEARER_TOKEN;
  if (!bearerToken) {
    return { platform: 'x', skipped: true, reason: 'X_BEARER_TOKEN not set' };
  }

  const res = await fetch('https://api.x.com/2/tweets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text.slice(0, 280) }),
  });

  if (!res.ok) {
    return { platform: 'x', skipped: true, reason: `X /2/tweets failed: HTTP ${res.status}` };
  }

  const json = (await res.json()) as { data?: { id?: string } };
  const tweetId = json.data?.id;
  return {
    platform: 'x',
    skipped: false,
    url: tweetId ? `https://x.com/i/status/${tweetId}` : undefined,
  };
}
