import { findReposWithNewReleases, loadWatchlist } from './fetch-releases';
import { readState, writeState } from './state-io';
import { checkQualityGate } from './quality-gate';
import { generateVerdict } from './generate-verdict';
import { overallScore } from './verdict-schema';
import { renderComparisonChart, type ChartEntry } from './render-chart';
import { writePost, type ScoredRepo } from './write-post';
import { watchlistKey } from './types';

async function main(): Promise<void> {
  const force = process.argv.includes('--force');
  const now = new Date();

  const state = readState();
  const newReleases = await findReposWithNewReleases();

  const gate = checkQualityGate(newReleases, state, force, now);
  console.log(`[eval-pipeline] quality gate: ${gate.allow ? 'ALLOW' : 'SKIP'} — ${gate.reason}`);
  if (!gate.allow) {
    console.log('EVAL_PIPELINE_RESULT=skipped');
    return;
  }

  const scoredRepos: ScoredRepo[] = [];
  const skipped: string[] = [];

  for (const item of newReleases) {
    const verdict = await generateVerdict(item);
    if (!verdict) {
      skipped.push(watchlistKey(item.entry));
      continue;
    }
    scoredRepos.push({ item, verdict });
  }

  if (scoredRepos.length === 0) {
    console.log(
      `[eval-pipeline] all ${newReleases.length} candidate verdict(s) failed validation, skipping this cycle`,
    );
    console.log('EVAL_PIPELINE_RESULT=skipped');
    return;
  }
  if (skipped.length) {
    console.log(`[eval-pipeline] dropped from this cycle (invalid verdict): ${skipped.join(', ')}`);
  }

  // Update state for scored repos first, so the chart's "carry forward" data
  // reflects this cycle's fresh scores.
  for (const { item, verdict } of scoredRepos) {
    const key = watchlistKey(item.entry);
    state.repos[key] = {
      lastSeenRelease: item.release.tagName,
      lastScoredAt: now.toISOString(),
      lastScore: overallScore(verdict),
    };
  }

  const freshKeys = new Set(scoredRepos.map((s) => watchlistKey(s.item.entry)));
  const watchlist = loadWatchlist();
  const chartEntries: ChartEntry[] = watchlist.repos
    .map((entry) => {
      const key = watchlistKey(entry);
      const repoState = state.repos[key];
      if (!repoState || repoState.lastScore === null) return null;
      return {
        label: key,
        score: repoState.lastScore,
        isFresh: freshKeys.has(key),
        category: entry.category,
      } satisfies ChartEntry;
    })
    .filter((e): e is ChartEntry => e !== null);

  const chartPng = await renderComparisonChart(chartEntries);
  const result = writePost(scoredRepos, chartPng, now);

  state.lastPublishedPostDate = now.toISOString();
  writeState(state);

  console.log(`[eval-pipeline] published post: ${result.postPath}`);
  console.log(`[eval-pipeline] chart: ${result.chartPath}`);
  console.log('EVAL_PIPELINE_RESULT=published');
  console.log(`EVAL_PIPELINE_SLUG=${result.slug}`);
}

main().catch((err) => {
  console.error('[eval-pipeline] generate failed:', err);
  console.log('EVAL_PIPELINE_RESULT=error');
  process.exitCode = 1;
});
