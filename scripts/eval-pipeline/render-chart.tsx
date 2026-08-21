import React from 'react';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ImageResponse } from 'next/og';

export interface ChartEntry {
  label: string;
  score: number; // 0-10
  isFresh: boolean; // scored this cycle vs. carried forward
  category: string;
}

const WIDTH = 1200;
const HEIGHT = 630;
const BAR_MAX_WIDTH = 620;
const FONT_DIR = join(__dirname, '..', '..', 'src', 'app', 'og');

/**
 * Renders a static PNG leaderboard bar chart, reusing the exact visual
 * pattern already live in src/app/og/route.tsx (dark canvas, Inter font,
 * gradient accents) so generated posts look native to the site, not bolted
 * on. Runs standalone via tsx (next/og resolves to a Node-compatible bundle
 * outside the edge runtime).
 */
export async function renderComparisonChart(entries: ChartEntry[]): Promise<Buffer> {
  const fontBold = readFileSync(join(FONT_DIR, 'Inter-Bold.woff'));
  const fontRegular = readFileSync(join(FONT_DIR, 'Inter-Regular.woff'));

  const sorted = [...entries].sort((a, b) => b.score - a.score).slice(0, 8);
  const rowHeight = 56;

  const image = new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          background: '#0a0b1a',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Inter',
          padding: '48px 56px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            fontWeight: 700,
            color: 'white',
            marginBottom: 8,
          }}
        >
          Eval Tooling Comparison
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 16,
            color: 'rgba(148,163,184,0.7)',
            marginBottom: 32,
          }}
        >
          Scored 0-10 from release notes and code diffs — not hands-on testing
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {sorted.map((entry) => (
            <div
              key={entry.label}
              style={{ display: 'flex', alignItems: 'center', height: rowHeight }}
            >
              <div
                style={{
                  width: 260,
                  fontSize: 20,
                  fontWeight: 700,
                  color: 'white',
                  display: 'flex',
                  overflow: 'hidden',
                }}
              >
                {entry.label}
              </div>
              <div
                style={{
                  width: BAR_MAX_WIDTH,
                  height: 24,
                  borderRadius: 8,
                  background: 'rgba(99,102,241,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: Math.max(4, (entry.score / 10) * BAR_MAX_WIDTH),
                    height: 24,
                    borderRadius: 8,
                    background: entry.isFresh
                      ? 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)'
                      : 'rgba(148,163,184,0.5)',
                    display: 'flex',
                  }}
                />
              </div>
              <div
                style={{
                  marginLeft: 16,
                  fontSize: 20,
                  fontWeight: 700,
                  color: entry.isFresh ? '#a5b4fc' : 'rgba(148,163,184,0.8)',
                  display: 'flex',
                }}
              >
                {entry.score.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 16,
            color: 'rgba(148,163,184,0.6)',
          }}
        >
          <div style={{ display: 'flex' }}>managen.ai</div>
          <div style={{ display: 'flex' }}>
            Highlighted bars = updated this cycle
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: 'Inter', data: fontBold, weight: 700, style: 'normal' },
        { name: 'Inter', data: fontRegular, weight: 400, style: 'normal' },
      ],
    },
  );

  const arrayBuffer = await image.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
