import { z } from 'zod';

/**
 * Scored verdict for one repo's release, produced by reading the release's own
 * changelog + a bounded file-change summary — NOT by running the tool. Every
 * axis is 0-10, where 10 is the best outcome for that axis (e.g. stability=10
 * means fully backward compatible, not "10 breaking changes").
 */
export const VerdictSchema = z.object({
  summary: z.string().min(20).max(600),
  impact: z.number().min(0).max(10),
  stability: z.number().min(0).max(10),
  evalQuality: z.number().min(0).max(10),
  documentation: z.number().min(0).max(10),
  notableChanges: z.array(z.string()).max(6),
  breakingChanges: z.array(z.string()).max(6),
  limitations: z.array(z.string()).max(6),
});

export type Verdict = z.infer<typeof VerdictSchema>;

export function overallScore(v: Verdict): number {
  return Math.round(
    ((v.impact + v.stability + v.evalQuality + v.documentation) / 4) * 10,
  ) / 10;
}
