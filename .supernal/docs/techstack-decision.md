# Tech Stack Decision: ManaGen.ai Site Overhaul

**Status:** Draft for decision  
**Date:** 2026-05-14  
**Audience:** Engineering lead, product owner  
**Decision needed:** Which framework to use for the ManaGen.ai public site rebuild

---

## Context

ManaGen.ai is currently a MkDocs Material site with substantial content — 222 markdown files across 21 directories covering Understanding, Using, Managenai, and blog sections. The last major commit was March 2025. The site needs to go into an investor/pitch slide deck and must look modern, dynamic, and visually impressive while preserving content discoverability.

The question is not whether to rebuild, but *how much* of the existing infrastructure to replace vs. extend.

---

## Options Evaluated

### Option A: Enhance MkDocs Material (Keep Existing Stack)

MkDocs Material 9.x supports extensive customization via `material/overrides`, custom HTML templates, and CSS/JS injection. The home page already uses a custom `home.html` template.

**What's already there:**
- Custom override directory at `material/overrides/`
- Social cards with custom layout
- Mermaid diagrams, math, code annotations, glightbox
- Full search index, 222 markdown docs
- `macros` plugin enabling Jinja templating in markdown

**What you can do without migrating:**
- Full custom hero section with video background via `home.html` override
- CSS animations, gradient backgrounds, canvas-based particle effects via JS injection
- Dark/light mode toggle (already configured, just needs palette polish)
- Custom nav landing pages per section

**Pros:**
- Zero content migration — 222 files stay exactly where they are
- Build time: 2–3 days for a high-quality custom landing page
- Content updates remain markdown-native — contributors don't need Node.js
- Existing search, plugins, analytics all continue working
- Lowest risk for investor deadline

**Cons:**
- Custom landing page requires hand-writing HTML/CSS/JS (no component system)
- No React ecosystem — complex UI interactions are harder to maintain
- Typography and layout are constrained by Material's CSS architecture
- Harder to do highly animated sections (possible but more effort than React)
- Perception: "it's still a MkDocs site" — but invisible to viewers of the landing page

**Build effort:** 2–3 days  
**Design flexibility:** Medium-high (landing page only), Low (inner pages)  
**Performance:** Excellent — static HTML, no JS framework overhead  
**SEO:** Excellent — fully static, crawlable, existing content indexed  
**Content velocity:** Excellent — pure markdown  
**Slide-deck impressiveness:** High if hero/landing is well executed; inner docs pages look like docs

---

### Option B: Next.js (App Router) with MDX

Replace MkDocs entirely with a Next.js App Router site. Docs content migrated to MDX, hosted on Vercel.

**Architecture:**
- `app/` routes for marketing pages (hero, features, about)
- `app/docs/[...slug]/page.tsx` for all 222 existing docs, rendered from MDX
- Vercel deployment with ISR or SSG

**Pros:**
- Maximum design flexibility — full React component system
- Video backgrounds, canvas animations, Framer Motion all trivial to add
- Linear.app / Vercel.com aesthetic is native to this stack
- Single repo for marketing + docs — consistent design system
- Incremental Static Regeneration means docs can update without full rebuild
- TypeScript, strong tooling, large ecosystem

**Cons:**
- Migration effort: 5–10 days minimum
  - 222 .md files need frontmatter audit and MDX compatibility check
  - MkDocs-specific syntax (`!!!`, `???+`, `===`) must be converted or replaced
  - Mermaid diagrams work in MDX but require explicit client component wrapper
  - MkDocs plugins (awesome-pages, include-markdown, table-reader, macros) have no direct MDX equivalents — content using these must be rewritten
  - Custom Jinja macros in markdown must be resolved manually
- Search requires Algolia DocSearch or a custom solution (replaces built-in MkDocs search)
- Content contributors lose pure-markdown simplicity
- Risk: content breaks discovered only during migration — could delay investor deadline

**Build effort:** 7–12 days (5–8 for initial, + 2–4 for content migration quality pass)  
**Design flexibility:** Excellent  
**Performance:** Excellent with proper SSG/ISR  
**SEO:** Excellent  
**Content velocity:** Good (MDX, but higher barrier for contributors)  
**Slide-deck impressiveness:** Excellent

---

### Option C: Astro (with MDX content collections)

Astro's content collections natively handle large markdown/MDX doc sites with partial hydration. The `@astrojs/mdx` integration is mature.

**Architecture:**
- `src/pages/index.astro` for landing
- `src/content/docs/` for migrated markdown using Astro content collections
- Starlight (Astro's docs theme) for inner doc pages — it mirrors MkDocs Material's UX but is React/Astro-native
- Deploy on Vercel or Cloudflare Pages

**Pros:**
- Best performance of the three — zero JS by default, islands architecture
- Starlight provides a near drop-in visual replacement for MkDocs Material
- MDX support means React components can be embedded in docs pages
- `.md` content migration is simpler than Next.js (less framework-specific API surface)
- Great for content-heavy sites — built for this use case
- Smaller bundle size than Next.js for a docs site

**Cons:**
- Smaller ecosystem than Next.js; fewer pre-built UI component libraries
- Starlight is opinionated — diverging from its layout requires override work similar to MkDocs
- Same MkDocs plugin incompatibilities as Next.js — macros, include-markdown, table-reader need manual resolution
- Less "wow factor" for a pure marketing page than Next.js + Framer Motion
- Team familiarity likely lower than React/Next.js

**Build effort:** 6–10 days  
**Design flexibility:** Good  
**Performance:** Excellent  
**SEO:** Excellent  
**Content velocity:** Good  
**Slide-deck impressiveness:** Good (Starlight looks clean; landing can be impressive)

---

## Comparison Matrix

| Criterion             | Weight | MkDocs Enhanced | Next.js | Astro |
|-----------------------|--------|-----------------|---------|-------|
| Build effort (days)   | High   | 2–3             | 7–12    | 6–10  |
| Design flexibility    | High   | Medium          | Excellent | Good |
| Performance           | Medium | Excellent       | Excellent | Excellent |
| SEO                   | Medium | Excellent       | Excellent | Excellent |
| Content velocity      | High   | Excellent       | Good    | Good  |
| Slide-deck impression | High   | High (landing)  | Excellent | Good |
| Migration risk        | High   | None            | High    | Medium |
| Contributor barrier   | Medium | Low             | Medium  | Medium |

---

## Recommendation

**Phase 1 (immediate, for investor deck): Enhance MkDocs Material**

Build a custom `home.html` landing page within the existing MkDocs override system. This is a 2–3 day effort and produces a high-quality, visually impressive landing page with:
- Full-bleed video or canvas-animated hero section
- Custom dark-mode-first palette
- Feature sections, stats, CTA — all implemented in raw HTML/CSS/JS within the MkDocs template
- No content migration required

The investor/pitch audience sees only the landing page and possibly a few interior docs. Those inner pages already look professional with MkDocs Material. The gap between "MkDocs with a custom landing" and "Next.js with a custom landing" is invisible to investors.

**Phase 2 (post-funding, Q3 2026): Migrate to Next.js**

After the deck pressure is off, migrate to Next.js App Router with:
- Proper content migration sprint (audit 222 files, resolve plugin dependencies)
- Design system built with shadcn/ui or Radix
- Algolia DocSearch
- Full Framer Motion animations

This gives you the best long-term platform without risking the investor timeline.

---

## Phase 1 Implementation Notes (MkDocs Enhanced)

**Files to modify:**
- `material/overrides/home.html` — custom landing page template
- `docs/stylesheets/extra.css` — override palette, typography, animations
- `docs/javascripts/` — add hero animation script (WebGL/canvas or video)
- `mkdocs.yml` — update palette to custom dark scheme, add Google Fonts

**Key technique:** MkDocs Material's `home.html` override receives full page control. You write standard HTML, pull in the MkDocs CSS variables for consistency, and can inject any JS. The rest of the site (docs) remains completely untouched.

**Estimated timeline:**
- Day 1: Palette, typography, hero section (video or CSS animation)
- Day 2: Feature sections, stats counters, newsletter CTA
- Day 3: Mobile polish, dark/light toggle, cross-browser QA
