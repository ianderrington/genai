import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { RepoWithNewRelease } from './types';
import type { Verdict } from './verdict-schema';
import { overallScore } from './verdict-schema';
import { watchlistKey } from './types';

export interface ScoredRepo {
  item: RepoWithNewRelease;
  verdict: Verdict;
}

const POSTS_DIR = join(__dirname, '..', '..', 'docs', 'blog', 'posts');
const CHART_DIR = join(__dirname, '..', '..', 'public', 'images', 'blog', 'eval-watch');
const METHODOLOGY = `> **Methodology:** this comparison is based on reading each project's own release notes and a bounded summary of its changed files via GitHub's compare API — not hands-on execution of the tools. Scores and notes below are grounded in what maintainers themselves documented, not independent testing.`;

function slugForDate(date: Date): string {
  const iso = date.toISOString().slice(0, 10);
  return `eval-watch-${iso}`;
}

function formatVerdictSection(scored: ScoredRepo): string {
  const { item, verdict } = scored;
  const key = watchlistKey(item.entry);
  const score = overallScore(verdict);
  const lines: string[] = [];
  lines.push(`### ${key} — ${item.release.tagName} (score: ${score}/10)`);
  lines.push('');
  lines.push(verdict.summary);
  lines.push('');
  lines.push(
    `Impact ${verdict.impact}/10 · Stability ${verdict.stability}/10 · Eval quality ${verdict.evalQuality}/10 · Documentation ${verdict.documentation}/10`,
  );
  if (verdict.notableChanges.length) {
    lines.push('');
    lines.push('**Notable changes:**');
    verdict.notableChanges.forEach((c) => lines.push(`- ${c}`));
  }
  if (verdict.breakingChanges.length) {
    lines.push('');
    lines.push('**Breaking changes:**');
    verdict.breakingChanges.forEach((c) => lines.push(`- ${c}`));
  }
  if (verdict.limitations.length) {
    lines.push('');
    lines.push('**Limitations noted by maintainers:**');
    verdict.limitations.forEach((c) => lines.push(`- ${c}`));
  }
  lines.push('');
  lines.push(`[Release notes →](${item.release.htmlUrl})`);
  return lines.join('\n');
}

export interface WritePostResult {
  slug: string;
  postPath: string;
  chartPath: string;
  chartPublicUrl: string;
}

export function writePost(
  scoredRepos: ScoredRepo[],
  chartPng: Buffer,
  now: Date,
): WritePostResult {
  const slug = slugForDate(now);
  const dateStr = now.toISOString().slice(0, 10);

  mkdirSync(CHART_DIR, { recursive: true });
  const chartFilename = `${slug}.png`;
  const chartPath = join(CHART_DIR, chartFilename);
  writeFileSync(chartPath, chartPng);
  const chartPublicUrl = `/images/blog/eval-watch/${chartFilename}`;

  const repoNames = scoredRepos.map((s) => watchlistKey(s.item.entry)).join(', ');
  const title = `Eval Tooling Watch — ${dateStr}: ${repoNames}`;
  const description = `A scored, source-linked comparison of ${scoredRepos.length} AI eval/benchmark tool release(s), based on maintainer release notes and code diffs.`;

  const body: string[] = [];
  body.push(`![Comparison chart](${chartPublicUrl})`);
  body.push('');
  body.push(METHODOLOGY);
  body.push('');
  body.push(
    `This cycle looked at ${scoredRepos.length} new release(s) across the watched AI eval/benchmark tooling field.`,
  );
  body.push('');
  scoredRepos.forEach((s) => {
    body.push(formatVerdictSection(s));
    body.push('');
  });

  const frontmatter = [
    '---',
    `title: '${title.replace(/'/g, "''")}'`,
    `date: '${dateStr}'`,
    `dateModified: '${dateStr}'`,
    `description: '${description.replace(/'/g, "''")}'`,
    'categories:',
    '  - AI Tools',
    '  - Evals',
    `coverImage: ${chartPublicUrl}`,
    'authors: evalwatch',
    'tags:',
    '  - eval-watch',
    ...scoredRepos.map((s) => `  - ${s.item.entry.repo}`),
    '---',
  ].join('\n');

  const content = `${frontmatter}\n\n${body.join('\n')}\n`;
  const postPath = join(POSTS_DIR, `${slug}.md`);
  writeFileSync(postPath, content, 'utf8');

  return { slug, postPath, chartPath, chartPublicUrl };
}
