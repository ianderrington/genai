# ManaGen.ai Landing Page Spec

**Status:** Ready for implementation  
**Date:** 2026-05-14  
**Implementation path:** MkDocs Material custom `home.html` override  
**Reference aesthetic:** Linear.app, Vercel.com, Mintlify — dark-first, clean typography, purposeful motion

---

## Design Philosophy

The landing page must do three things instantly:
1. Establish authority — this is the serious, comprehensive GenAI knowledge resource
2. Communicate the unique angle — self-building, AI-generated, community-powered
3. Convert — newsletter signup, GitHub star, or docs entry

The rest of managen.ai is a docs site. The landing page is a product page for the knowledge base itself.

---

## Color Palette

### Primary Palette (Dark Mode Default)

| Token              | Hex       | Usage |
|--------------------|-----------|-------|
| `--bg-base`        | `#080C14` | Page background |
| `--bg-surface`     | `#0F1624` | Card/section backgrounds |
| `--bg-elevated`    | `#1A2235` | Hover states, code blocks |
| `--accent-primary` | `#6366F1` | Indigo — CTAs, links, highlights |
| `--accent-glow`    | `#818CF8` | Lighter indigo for glows, borders |
| `--accent-teal`    | `#14B8A6` | Secondary accent — badges, tags |
| `--text-primary`   | `#F1F5F9` | Body text |
| `--text-secondary` | `#94A3B8` | Captions, metadata |
| `--text-tertiary`  | `#475569` | Placeholders, disabled |
| `--border-subtle`  | `#1E2D45` | Card borders |
| `--border-active`  | `#6366F1` | Focus rings |

### Light Mode Override

| Token              | Hex       |
|--------------------|-----------|
| `--bg-base`        | `#FAFBFC` |
| `--bg-surface`     | `#FFFFFF` |
| `--bg-elevated`    | `#F1F5F9` |
| `--text-primary`   | `#0F172A` |
| `--text-secondary` | `#475569` |
| `--border-subtle`  | `#E2E8F0` |

Accent colors remain identical across modes for brand consistency.

---

## Typography Stack

```css
/* Headlines */
font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;
font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11'; /* Cleaner numerals */

/* Body / Docs */
font-family: 'Inter', system-ui, sans-serif;

/* Code */
font-family: 'JetBrains Mono', 'Fira Code', 'Roboto Mono', monospace;
```

**Type scale:**
| Role           | Size   | Weight | Line Height |
|----------------|--------|--------|-------------|
| Display XL     | 72px   | 700    | 1.05        |
| Display L      | 56px   | 700    | 1.1         |
| Section H2     | 40px   | 600    | 1.2         |
| Card H3        | 24px   | 600    | 1.3         |
| Body L         | 18px   | 400    | 1.7         |
| Body Base      | 16px   | 400    | 1.6         |
| Caption        | 14px   | 400    | 1.5         |
| Label/Badge    | 12px   | 500    | 1.4         |

Load via Google Fonts: `Inter:wght@400;500;600;700` (self-host for performance).

---

## Section-by-Section Breakdown

### Section 1: Navigation Bar

**Height:** 64px  
**Behavior:** Sticky, background transitions from transparent → `rgba(8,12,20,0.85)` with `backdrop-filter: blur(12px)` on scroll

**Left:** ManaGen.ai logo (SVG, inverted for dark) + wordmark  
**Center:** Links — Understanding | Using | About | Blog  
**Right:** GitHub star count badge + "Read the Docs" CTA button (filled, accent-primary)

**Mobile:** Hamburger menu collapsing to fullscreen overlay

---

### Section 2: Hero

**Height:** 100vh on desktop, auto on mobile  
**Background:** Full-bleed animated canvas

**Animation concept — Neural Constellation:**
A dark background with 80–120 small circular nodes (`rgba(99,102,241,0.6)`) connected by thin lines (`rgba(99,102,241,0.15)`) that pulse in slow waves. Nodes drift slowly. On mouse move, the nearest 3–5 nodes are attracted toward the cursor and their connecting lines brighten. This is a lightweight vanilla JS canvas animation (~60 LOC), no external deps.

Alternative (simpler, video-based): Loop a 10–15s WebM/MP4 of abstract neural network visualization (dark purple-blue, blurred/abstract) at 20% opacity over the base background. Stock footage available at Mixkit or Coverr under free license.

**Headline (centered, Display XL):**
```
The most comprehensive open guide
to understanding, building, and
managing GenAI.
```

**Subheadline (Body L, `--text-secondary`, max-width 600px):**
```
222 pages of technical depth across agents, architectures,
data, prompting, and responsible AI. Built in the open.
Updated with AI.
```

**CTA row (centered, stacked on mobile):**
- Primary button: "Explore the Docs →" (filled, accent-primary, 16px, 48px height)
- Secondary button: "Star on GitHub ☆ 2.1k" (outlined, border accent-primary)

**Scroll indicator:** Animated down-chevron, fades out after first scroll

**Copy rationale:** Lead with the knowledge breadth claim. Investors and technical audiences respond to specificity ("222 pages") over vague superlatives.

---

### Section 3: Social Proof / Stats Bar

**Layout:** Centered row of 4 stats, full-width, `--bg-surface` background, 80px padding vertical  
**Dividers:** Thin vertical lines between each stat on desktop

| Stat | Value | Label |
|------|-------|-------|
| Pages of content | 222+ | Technical docs |
| Topics covered | 40+ | From models to ethics |
| Contributors | Open | Community-driven |
| Last updated | 2025 | Actively maintained |

Each stat animates up (count-up animation) when it enters the viewport.

**Note to developer:** Pull the actual GitHub stats (stars, forks, contributors) dynamically via the GitHub API at build time using the MkDocs `macros` plugin. Fallback to hardcoded values.

---

### Section 4: What You'll Learn

**Layout:** 2-column grid on desktop (header left, cards right). Full-width section, `--bg-base` background.

**Section label (Badge component):** `KNOWLEDGE BASE`  
**Section H2:** "Everything you need, organized."  
**Section subtext:** "From foundational theory to production deployment — the full stack of GenAI knowledge."

**6 Topic Cards (3x2 grid on desktop, 1-col on mobile):**

Each card: icon (SVG, monochrome teal or indigo) + title + 1-line description + link to section.

| Icon | Title | Description | Link |
|------|-------|-------------|------|
| Neural net | Model Architectures | Transformers, diffusion, MoE, multimodal, and beyond | /Understanding/architectures/ |
| Robot arm | Agents & Systems | Cognitive architectures, memory, tools, multi-agent systems | /Understanding/agents/ |
| Database | Data | Gathering, preparation, augmentation, embeddings | /Understanding/data/ |
| Chat bubble | Prompting | Engineering, optimization, security, examples | /Understanding/prompting/ |
| Stack | Building Applications | Back-end, front-end, LLMOps, security & compliance | /Understanding/building_applications/ |
| Scale | Responsible AI | Ethics, alignment, fairness, transparency, regulations | /Using/ethically/ |

**Card design:** Subtle border (`--border-subtle`), hover state lifts card (`transform: translateY(-2px)`) and brightens border to `--accent-primary`. Transition 150ms ease.

---

### Section 5: Who It's For

**Layout:** Full-width, `--bg-surface` background. Alternating icon-text rows or 3-column cards.

**Section label:** `AUDIENCE`  
**Section H2:** "Built for builders. Useful for everyone."

**3 Persona Cards (horizontal on desktop):**

**Card 1 — The Engineer**  
*"I'm building AI systems and need depth."*  
You'll find architectural deep-dives, implementation code, evaluation frameworks, and agent infrastructure patterns.  
Tag: Technical

**Card 2 — The Product Leader**  
*"I need to make smart AI decisions without getting lost in research papers."*  
Use the Understanding overview, the build-or-buy guide, and the responsible AI sections to make informed choices.  
Tag: Strategic

**Card 3 — The Researcher**  
*"I want to stay current and contribute."*  
Access the latest model comparisons, reasoning system analyses, and contribute via GitHub.  
Tag: Research

---

### Section 6: How It's Built (Self-Building Site)

**Layout:** Full-width, dark `#050810` background (slightly darker than base). Left: text content. Right: animated terminal / code block showing a content generation command.

**Section label:** `META`  
**Section H2:** "GenAI explaining GenAI."  
**Body text:**
```
ManaGen.ai is a self-building knowledge base. AI assists in
keeping content current as the field evolves — new models,
new architectures, new risks. The source is open, the
methodology is transparent, and every page is editable.

This isn't a blog. It's living documentation for a
living field.
```

**Right-side visual (animated terminal block):**
```
$ managen update Understanding/architectures/models/index.md

→ Fetching latest model releases...
→ Comparing GPT-4o, Claude 3.5, Gemini 2.0, Llama 3.3...
→ Generating diff from last update...
→ Content updated. 3 new models indexed.
→ PR #847 opened for review.
```
Text types out character by character using a typewriter animation, loops every 8 seconds.

**CTA below text:** "See how it works →" linked to `/Managenai/build_plan.html`

---

### Section 7: Featured Content / Latest Articles

**Layout:** `--bg-base`. Header row + horizontal scroll of content cards on mobile, 3-col grid on desktop.

**Section H2:** "Explore what's new."

**Content source:** Pull the 3 most recent blog posts from `/blog/posts/` — author, date, title, excerpt. Fall back to 3 manually curated "featured" docs pages if blog is sparse.

**Card anatomy:**
- Gradient tag pill (topic category, e.g. "Agents", "Models")
- Title (Card H3)
- Excerpt (2 lines, truncated)
- Author avatar (initials fallback) + date
- Hover: card border brightens, subtle gradient overlay appears

---

### Section 8: Contribute / Newsletter CTA

**Layout:** Full-width centered section, `--bg-surface`, subtle radial gradient glow behind the text block.

**Two-column layout on desktop:**

**Left — Contribute:**  
**H2:** "Help build the future of GenAI knowledge."  
**Body:** "ManaGen.ai is open source. Every correction, new section, and case study makes it better for everyone building with AI."  
**CTA:** "Contribute on GitHub →" (outlined button, links to repo)

**Right — Newsletter:**  
**H2:** "Stay ahead of the field."  
**Body:** "Get notified when major sections are updated — new model analyses, architecture breakdowns, agent frameworks."  
**Input + Button:** Email input + "Subscribe" (form posts to existing HubSpot or Mailchimp list)

**Divider:** Thin vertical line between columns (hidden on mobile, stack vertically)

---

### Section 9: Footer

**Background:** `#050810`  
**Max-width:** 1200px, centered  
**Top:** Logo + tagline ("Helping to use Gen()AI for our better future.")  
**Middle:** 4-column link grid — Understanding | Using | About | Connect  
**Bottom row:** Copyright + Cookie settings link + GitHub + Twitter + LinkedIn icons

---

## Component List

All components are plain HTML/CSS/JS, injected via `material/overrides/home.html`.

| Component | Implementation | Notes |
|-----------|----------------|-------|
| `NavBar` | `<nav>` with scroll JS | Glassmorphism on scroll |
| `HeroCanvas` | `<canvas>` + vanilla JS | ~60 LOC neural constellation |
| `CountUpStat` | Intersection Observer + rAF | Triggers when in viewport |
| `TopicCard` | `<article>` + CSS | Hover lift + border glow |
| `PersonaCard` | `<div>` + CSS | Accent border on left |
| `TerminalBlock` | `<pre>` + typewriter JS | CSS caret animation |
| `ContentCard` | `<article>` | Blog/featured post card |
| `EmailForm` | `<form>` + HubSpot JS | Existing HubSpot embed |
| `ThemeToggle` | MkDocs built-in | Extend palette vars |
| `Footer` | `<footer>` | 4-col link grid |

---

## Animation Principles

- **Entrance animations:** Elements fade up (`transform: translateY(20px) → 0` + `opacity: 0 → 1`) as they enter viewport via IntersectionObserver. Duration: 400ms, ease-out. Stagger: 80ms between children.
- **Hero canvas:** 60fps target, requestAnimationFrame loop. Reduce particle count on mobile (`prefers-reduced-motion` check: disable entirely).
- **Hover states:** 150ms transitions on cards. No layout shifts.
- **Count-up stats:** Run once per page load when section enters viewport.
- **Typewriter terminal:** Character interval: 35ms. Pause at end: 3s. Cursor blink: CSS keyframes.
- **Respect `prefers-reduced-motion`:** All animations disabled except opacity fades when this media query is active.

---

## Mobile Responsive Breakpoints

| Breakpoint | Width     | Layout changes |
|------------|-----------|----------------|
| Mobile     | < 640px   | Single column, hero text smaller (40px), nav hamburger |
| Tablet     | 640–1024px | 2-col cards, reduced padding |
| Desktop    | > 1024px  | Full layout as specced |
| Wide       | > 1440px  | Max-width 1200px centered, no further changes |

---

## Performance Targets

- Lighthouse Performance score: 90+
- LCP (hero image/canvas): < 2.5s
- No render-blocking fonts (font-display: swap)
- Canvas animation: must not block main thread (use Web Worker if needed)
- Total landing page JS: < 30KB minified (excluding MkDocs bundles)

---

## Implementation Checklist

- [ ] Create/update `material/overrides/home.html` with full landing page HTML
- [ ] Add `docs/stylesheets/landing.css` with all tokens and section styles (separate from `extra.css`)
- [ ] Add `docs/javascripts/landing.js` for canvas animation, count-up, typewriter
- [ ] Update `mkdocs.yml` palette to custom dark scheme using CSS overrides
- [ ] Add Inter font via Google Fonts in `home.html` `<head>` (or self-host)
- [ ] Wire GitHub star count via `macros` plugin at build time
- [ ] QA on iPhone 14, Pixel 7, iPad, 1440px desktop
- [ ] Test `prefers-reduced-motion` with system accessibility setting
- [ ] Verify HubSpot form embed works in MkDocs context (CSP headers)
