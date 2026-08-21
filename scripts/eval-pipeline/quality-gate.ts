import type { PipelineState, RepoWithNewRelease } from './types';

const MIN_DAYS_BETWEEN_POSTS = 21;

export interface GateResult {
  allow: boolean;
  reason: string;
}

/**
 * Decides whether this cycle should produce a post at all. Requires both a
 * genuinely new release AND a minimum gap since the last publish, so a chatty
 * repo can't spam weekly posts and every post reads as a real roundup rather
 * than a single-tool blip. `force` bypasses the time gate (used by a manual
 * workflow_dispatch run) but never bypasses "at least one new release".
 */
export function checkQualityGate(
  newReleases: RepoWithNewRelease[],
  state: PipelineState,
  force: boolean,
  now: Date,
): GateResult {
  if (newReleases.length === 0) {
    return { allow: false, reason: 'no watched repo has a new release since last check' };
  }

  if (force) {
    return { allow: true, reason: 'forced via workflow_dispatch' };
  }

  if (!state.lastPublishedPostDate) {
    return { allow: true, reason: 'no post has been published yet' };
  }

  const last = new Date(state.lastPublishedPostDate);
  const daysSince = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSince < MIN_DAYS_BETWEEN_POSTS) {
    return {
      allow: false,
      reason: `only ${daysSince.toFixed(1)} days since last post, minimum is ${MIN_DAYS_BETWEEN_POSTS}`,
    };
  }

  return { allow: true, reason: `${daysSince.toFixed(1)} days since last post` };
}
