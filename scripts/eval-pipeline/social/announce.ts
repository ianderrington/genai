import { readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { postToLinkedIn } from './linkedin';
import { postToX } from './x';
import { draftToSubstack } from './substack';
import type { AnnounceResult } from './types';

const SITE_URL = 'https://www.managen.ai';

interface PostFrontmatter {
  title?: string;
  description?: string;
}

function loadPost(slug: string): {
  title: string;
  description: string;
  url: string;
  body: string;
} {
  const postPath = join(__dirname, '..', '..', '..', 'docs', 'blog', 'posts', `${slug}.md`);
  const raw = readFileSync(postPath, 'utf8');
  const { data, content } = matter(raw) as { data: PostFrontmatter; content: string };
  return {
    title: data.title ?? slug,
    description: data.description ?? '',
    url: `${SITE_URL}/blog/posts/${slug}`,
    body: content,
  };
}

/**
 * Called only when Phase 2's generate step actually published a post this
 * cycle. Each platform self-checks its own credential and never throws on a
 * missing one — this orchestrator reports every result (posted or skipped)
 * so the workflow's Telegram notify step can say exactly what happened,
 * never silently.
 */
async function main(): Promise<void> {
  const slug = process.env.EVAL_PIPELINE_SLUG;
  if (!slug) {
    console.error('[eval-pipeline] announce: EVAL_PIPELINE_SLUG is not set, nothing to announce');
    process.exitCode = 1;
    return;
  }

  const meta = loadPost(slug);
  const commentary = `New eval tooling comparison: ${meta.title}\n\n${meta.description}\n\nMethodology: scored from release notes and code diffs, not hands-on testing.`;
  const tweetText = `${meta.title}\n\n${meta.url}`;
  const substackBody = `${meta.body}\n\n[Read on managen.ai](${meta.url})`;

  const results: AnnounceResult[] = await Promise.all([
    postToLinkedIn(commentary, meta.url, meta.title),
    postToX(tweetText),
    draftToSubstack(meta.title, substackBody),
  ]);

  for (const r of results) {
    if (r.skipped) {
      console.log(`[eval-pipeline] ${r.platform}: skipped (${r.reason})`);
    } else if (r.platform === 'substack') {
      console.log('[eval-pipeline] substack: draft created — review and publish manually');
    } else {
      console.log(`[eval-pipeline] ${r.platform}: posted${r.url ? ` — ${r.url}` : ''}`);
    }
  }
}

main().catch((err) => {
  console.error('[eval-pipeline] announce failed:', err);
  // Never fail the overall pipeline run just because social announcing broke
  // — the post itself already published successfully.
});
