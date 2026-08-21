import { VerdictSchema, type Verdict } from './verdict-schema';
import type { RepoWithNewRelease } from './types';

const MAX_CHANGED_FILES = 30;

interface ComparedFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
}

async function fetchChangedFiles(
  owner: string,
  repo: string,
  base: string,
  head: string,
): Promise<ComparedFile[]> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/compare/${base}...${head}`,
    { headers },
  );
  if (!res.ok) {
    console.warn(
      `[eval-pipeline] compare API failed for ${owner}/${repo} ${base}...${head}: ${res.status}`,
    );
    return [];
  }
  const data = (await res.json()) as {
    files?: Array<{ filename: string; status: string; additions: number; deletions: number }>;
  };
  return (data.files ?? [])
    .sort((a, b) => b.additions + b.deletions - (a.additions + a.deletions))
    .slice(0, MAX_CHANGED_FILES)
    .map((f) => ({
      filename: f.filename,
      status: f.status,
      additions: f.additions,
      deletions: f.deletions,
    }));
}

function buildPrompt(item: RepoWithNewRelease, changedFiles: ComparedFile[]): string {
  const { entry, release, previousTag } = item;
  const filesSummary = changedFiles.length
    ? changedFiles
        .map((f) => `- ${f.filename} (${f.status}, +${f.additions}/-${f.deletions})`)
        .join('\n')
    : '(no file-change data available)';

  return `You are evaluating a new release of an AI eval/benchmark tool for a technical comparison post. Your verdict is grounded ONLY in the release's own changelog text and the list of changed files below — you have NOT run this tool, so never imply you tested it directly.

Repo: ${entry.owner}/${entry.repo} (category: ${entry.category})
Release: ${release.tagName}${previousTag ? ` (previous tracked release: ${previousTag})` : ' (first release tracked)'}
Release URL: ${release.htmlUrl}

Release notes (from the maintainers):
${release.body?.trim() || '(no release notes provided)'}

Changed files (top ${MAX_CHANGED_FILES} by size, from GitHub's compare API):
${filesSummary}

Score this release 0-10 on each axis (10 = best outcome for that axis):
- impact: how significant are these changes for someone actively using this tool
- stability: 10 = fully backward compatible, 0 = major breaking changes
- evalQuality: does this release plausibly improve the accuracy/quality of evaluations this tool produces (base this only on what the release notes/changed files actually claim or show, never invent an improvement they don't mention)
- documentation: are the changes and any limitations clearly documented by the maintainers in the release notes

Also extract (as plain strings, quoting or closely paraphrasing the release notes, not inventing details):
- notableChanges: up to 6 concrete things that changed
- breakingChanges: up to 6 breaking changes (empty array if none)
- limitations: up to 6 limitations or caveats the maintainers themselves noted (empty array if the release notes don't mention any — do not invent limitations)

Respond with ONLY a JSON object matching this exact shape, no markdown fences, no extra text:
{"summary": "2-3 sentence plain-language verdict", "impact": 0, "stability": 0, "evalQuality": 0, "documentation": 0, "notableChanges": [], "breakingChanges": [], "limitations": []}`;
}

async function callClaudeForVerdict(prompt: string): Promise<unknown> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await client.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });
  const textBlock = response.content.find((b) => b.type === 'text');
  const text = textBlock && 'text' in textBlock ? textBlock.text : '';
  return JSON.parse(text);
}

/**
 * Produces a validated verdict for one repo's new release. Retries the LLM
 * call once on malformed output; returns null (never a partial/invented
 * verdict) if both attempts fail, so the caller can drop this repo from the
 * current cycle instead of publishing garbage.
 */
export async function generateVerdict(item: RepoWithNewRelease): Promise<Verdict | null> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set');
  }
  const changedFiles = await fetchChangedFiles(
    item.entry.owner,
    item.entry.repo,
    item.previousTag ?? item.release.tagName,
    item.release.tagName,
  );
  const prompt = buildPrompt(item, changedFiles);

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const raw = await callClaudeForVerdict(prompt);
      return VerdictSchema.parse(raw);
    } catch (err) {
      console.warn(
        `[eval-pipeline] verdict attempt ${attempt} failed for ${item.entry.owner}/${item.entry.repo}:`,
        err instanceof Error ? err.message : err,
      );
    }
  }
  return null;
}
