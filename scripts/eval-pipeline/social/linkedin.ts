import type { AnnounceResult } from './types';

/**
 * Minimal re-implementation of the request shape in
 * families/supernal-coding/packages/modules/lib/publishers/linkedin.ts,
 * without importing it — genai has no precedent of depending on an internal
 * supernal-coding package, and it isn't published to npm. Same POST
 * /v2/ugcPosts call, same OAuth2 bearer + author-URN resolution.
 *
 * Self-checks its own credential and returns {skipped:true, reason} rather
 * than throwing, so a missing LINKEDIN_ACCESS_TOKEN never fails the pipeline
 * run — it just means this platform's announcement didn't happen yet.
 */
export async function postToLinkedIn(
  commentary: string,
  canonicalUrl: string,
  title: string,
): Promise<AnnounceResult> {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!accessToken) {
    return { platform: 'linkedin', skipped: true, reason: 'LINKEDIN_ACCESS_TOKEN not set' };
  }

  let authorUrn = process.env.LINKEDIN_PERSON_ID
    ? `urn:li:person:${process.env.LINKEDIN_PERSON_ID}`
    : null;

  if (!authorUrn) {
    const userinfoRes = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!userinfoRes.ok) {
      return {
        platform: 'linkedin',
        skipped: true,
        reason: `LinkedIn /v2/userinfo failed: HTTP ${userinfoRes.status}`,
      };
    }
    const data = (await userinfoRes.json()) as { sub?: string };
    if (!data.sub) {
      return { platform: 'linkedin', skipped: true, reason: '/v2/userinfo returned no sub field' };
    }
    authorUrn = `urn:li:person:${data.sub}`;
  }

  const ugcBody = {
    author: authorUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text: commentary.slice(0, 3000) },
        shareMediaCategory: 'ARTICLE',
        media: [{ status: 'READY', originalUrl: canonicalUrl, title: { text: title } }],
      },
    },
    visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
  };

  const res = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(ugcBody),
  });

  if (!res.ok) {
    return { platform: 'linkedin', skipped: true, reason: `LinkedIn publish failed: HTTP ${res.status}` };
  }

  const postUrn = res.headers.get('x-restli-id') ?? res.headers.get('X-RestLi-Id') ?? '';
  const url = postUrn
    ? `https://www.linkedin.com/feed/update/${encodeURIComponent(postUrn)}`
    : undefined;

  return { platform: 'linkedin', skipped: false, url };
}
