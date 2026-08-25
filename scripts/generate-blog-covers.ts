#!/usr/bin/env tsx
/**
 * One-time batch: generate a themed cover illustration for every blog post
 * that doesn't have one yet (docs/blog/posts/*.md, frontmatter `coverImage`
 * unset). Writes the PNG to public/images/blog/<slug>.png and sets
 * `coverImage: /images/blog/<slug>.png` in the post's own frontmatter.
 *
 * Style/prompt approach ported from bottlenecks-web's lib/images/ (same
 * gpt-image-1 via @ai-sdk/openai, same base + named-theme composition,
 * same lessons learned there: short evocative subject beats a full-article
 * dump, strip named-individual attribution, avoid the word "moody" (reads
 * as sad/depressed, not just atmospheric).
 *
 * Usage: npx tsx --env-file=.env.local scripts/generate-blog-covers.ts [--limit N]
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

// gray-matter's bundled YAML engine calls the removed js-yaml v3 API
// (yaml.safeLoad); the monorepo hoists js-yaml v4. Supply a working engine.
const YAML_ENGINE = {
  parse: (s: string) => yaml.load(s),
  stringify: (obj: object) => yaml.dump(obj),
};
import { generateImage as aiGenerateImage } from 'ai';
import { openai } from '@ai-sdk/openai';

const POSTS_DIR = path.join(process.cwd(), 'docs/blog/posts');
const OUT_DIR = path.join(process.cwd(), 'public/images/blog');

const args = process.argv.slice(2);
const limitFlagIndex = args.indexOf('--limit');
const limit = limitFlagIndex >= 0 ? parseInt(args[limitFlagIndex + 1], 10) : undefined;
const offsetFlagIndex = args.indexOf('--offset');
const offset = offsetFlagIndex >= 0 ? parseInt(args[offsetFlagIndex + 1], 10) : 0;
// Regenerate every post's cover, including ones that already have one — for
// a real style/palette fix, not just filling gaps.
const regenerateAll = args.includes('--regenerate-all');

const BASE_STYLE = `
- Absolutely no text, letters, numbers, labels, or writing of any kind
  anywhere in the image. Represent identity or meaning through color, shape,
  and iconography only, never lettering.
- Professional, editorial illustration style — not a generic stock photo look.
- Clear focal point, balanced composition, deliberate negative space.
- The overall feeling should be optimistic, energetic, and inviting — like
  the excitement of learning something new — never somber, heavy, or bleak.
`.trim();

// A hard, unconditional rule: MOST images must have zero human figure at
// all. A soft "vary it / don't default to a portrait" instruction was
// tried first and every single image still included a person — the model's
// prior toward "person examining a device" is strong enough that only a
// flat prohibition breaks it. Applied to most of the batch, not all of it,
// so the set still has some human warmth without being homogeneous.
const NO_PERSON_RULE = `
- Do NOT depict any human figure, face, hand, or body part anywhere in this
  image — represent the concept purely through objects, devices, symbols,
  or an environmental scene.
`.trim();

const PERSON_INCIDENTAL_RULE = `
- A person may appear, but only incidental to a larger scene — never a
  portrait, never centered, never the main focal point. Vary who they are
  (do not default to the same apparent age, gender, or ethnicity). Give
  them an expression and posture that is neutral, approachable, focused,
  curious, or upbeat — never stern, sad, frowning, distressed, weary,
  defeated, or downcast, in the face or the body language.
`.trim();

// Rotated per image so the set doesn't converge on one background color —
// the first version of this script said "a warm color wash" unconditionally
// and every image came out the same amber/orange. Six genuinely distinct
// backgrounds, cycling deterministically by post position.
const PALETTES = [
  'deep indigo/navy background with warm amber glow on the focal element',
  'soft sage/olive-green background with a warm coral glow on the focal element',
  'warm terracotta/rust background with a pale gold glow on the focal element',
  'deep teal background with a warm rose-pink glow on the focal element',
  'dusty plum/violet background with a warm amber glow on the focal element',
  'warm charcoal-brown background with a bright cyan glow on the focal element',
];

function themeFor(palette: string): string {
  return `
Technical/scientific illustration style: precise, confident line work like a
natural-history or science-magazine diagram plate — real structural detail
rather than a simplified icon. Restrained, sophisticated color washes layered
over the line art. One focal element carries a soft radiant glow or
backlight, and a single continuous color wash bleeds across the whole
background: ${palette}. Atmospheric and inviting, bright and hopeful, not
dark or heavy.
`.trim();
}

function composePrompt(subject: string, noPerson: boolean, palette: string): string {
  const personRule = noPerson ? NO_PERSON_RULE : PERSON_INCIDENTAL_RULE;
  return [subject, `Style guide:\n${BASE_STYLE}\n${personRule}\n\n${themeFor(palette)}`].join(
    '\n\n'
  );
}

// Strips a leading "<Name> says/argues/..." attribution — a confirmed cause
// of repetitive single-portrait output when a real name appears in the prompt.
function stripAttribution(text: string): string {
  return text.replace(
    /^[A-Z][a-zA-Z.'-]+(?: [A-Z][a-zA-Z.'-]+){0,2} (?:says|says that|argues|argues that|frames|contends|writes|notes|observes|puts it)[:,]?\s*/,
    ''
  );
}

function firstParagraph(body: string): string {
  const withoutHeading = body.replace(/^#.*\n+/, '');
  const para = withoutHeading.split(/\n\s*\n/)[0] ?? '';
  return para.replace(/[#*`_]/g, '').trim().slice(0, 300);
}

async function generateImage(subject: string, noPerson: boolean, palette: string): Promise<Buffer> {
  const result = await aiGenerateImage({
    model: openai.image('gpt-image-1'),
    prompt: composePrompt(subject, noPerson, palette),
    size: '1536x1024',
    providerOptions: { openai: { quality: 'high' } },
  });
  return Buffer.from(result.image.uint8Array);
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not configured.');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort();

  const candidates = regenerateAll
    ? files
    : files.filter((file) => {
        const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
        const { data } = matter(raw, { engines: { yaml: YAML_ENGINE } });
        return !data.coverImage && !data.coverMedia && !data.image;
      });

  const afterOffset = candidates.slice(offset);
  const targets = limit ? afterOffset.slice(0, limit) : afterOffset;
  console.log(
    `Found ${candidates.length} candidate posts (${regenerateAll ? 'regenerating all' : 'missing cover only'}), offset ${offset}; generating ${targets.length}.\n`
  );

  let done = 0;
  let failed = 0;

  for (let j = 0; j < targets.length; j++) {
    const i = j + offset; // absolute position — keeps palette/noPerson assignment stable across --offset runs
    const file = targets[j];
    const filePath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw, { engines: { yaml: YAML_ENGINE } });

    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch?.[1]?.trim() ?? file.replace(/\.md$/, '');
    const detail = stripAttribution(firstParagraph(content));
    const subject = `An editorial illustration representing this concept: "${title}".${
      detail ? ` ${detail}` : ''
    }`;

    const slug = file.replace(/\.md$/, '');
    // ~80% no-person, ~20% person-incidental — deterministic on position.
    const noPerson = i % 5 !== 0;
    const palette = PALETTES[i % PALETTES.length];

    try {
      const bytes = await generateImage(subject, noPerson, palette);
      const outPath = path.join(OUT_DIR, `${slug}.png`);
      fs.writeFileSync(outPath, bytes);

      const updated = matter.stringify(
        content,
        { ...data, coverImage: `/images/blog/${slug}.png` },
        { engines: { yaml: YAML_ENGINE } }
      );
      fs.writeFileSync(filePath, updated);

      done++;
      console.log(`[${done + failed}/${targets.length}] OK: ${title}`);
    } catch (err) {
      failed++;
      console.error(
        `[${done + failed}/${targets.length}] FAILED: ${title} -> ${
          err instanceof Error ? err.message : err
        }`
      );
    }
  }

  console.log(`\nDone. ${done} succeeded, ${failed} failed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
