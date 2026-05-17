# CLAUDE.md — ManaGen AI (genai repo)

## What this is

This repo IS both the content AND the Next.js presentation layer for [managen.ai](https://www.managen.ai) — The Living Guide to Generative AI.

Built with [Supernal Intelligence](https://si42.ai) · `@supernal/docs-kit`

Replaces the old MkDocs site that previously lived here.

## Content

All markdown content is in `docs/`:
- `docs/Understanding/` — AI concepts, architectures, agents
- `docs/Using/` — practical guides, tools, deployment
- `docs/Managenai/` — about the project, contributing
- `docs/blog/` — blog posts
- `docs/site.config.yaml` — site title, author, social links

## Architecture

```
src/             ← Next.js 15 App Router
  app/           ← pages
  components/    ← UI components
    home/        ← Hero, SectionCards, constellation canvas
  lib/content/   ← markdown pipeline, filesystem resolver
docs/            ← content (markdown files)
public/          ← static assets
```

## Content path resolution

`filesystem.ts` resolves in this order:
1. `CONTENT_DIRECTORY` env var
2. `./docs/` at repo root ← primary (this repo, Vercel deploy)
3. `./genai/docs/` submodule ← standalone managen-web repo
4. `../genai/docs/` sibling ← monorepo dev

## Key rules

- `ConstellationCanvas.tsx` must stay `'use client'`; page uses `ConstellationCanvasLoader` with `ssr: false`
- Event handlers → must be in `'use client'` components, not Server Components
- MkDocs admonitions preprocessed in `markdown.ts` before unified pipeline
- `rehypeSanitize` needs `dataMermaid` (camelCase), not `data-mermaid`

## Dev

```bash
npm install
npm run dev
npm run build
```

## Deployment

Deployed on Vercel. Set `CONTENT_DIRECTORY` env var if needed.
DNS: `www.managen.ai` → Vercel
