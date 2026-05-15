---
project: ManaGen.ai Complete Overhaul
epic: EPIC-MANAGEN-OVERHAUL
epic_file: /Users/saiterminal/git/supernal/.supernal/docs/planning/epics/epic-managen-overhaul-managen-ai-complete-overhaul.md
created: 2026-05-14
status: ready
---

# Ralph Loop Specs — ManaGen.ai Overhaul

Five Ralph loops covering the full overhaul of `managen.ai`. Run them in dependency order (1 → 2 → 3 → 4 and 5 can run in parallel after 1 and 2).

> **Run order:** `ralph-managen-research` → `ralph-managen-skill` → then `ralph-managen-techstack`, `ralph-managen-landing`, and `ralph-managen-content-update` (3, 4, 5 can run in parallel once 1 and 2 are done).

---

## Loop 1: `ralph-managen-research`

**Goal:** Catalogue every significant AI development from January 2025 to May 2026 and write a structured research document that drives all subsequent content work.

### Inputs
- `families/genai/docs/` — current site content (establishes what is already known)
- `families/genai/mkdocs.yml` — site nav (reveals topic coverage)
- Epic file at `epic-managen-overhaul-managen-ai-complete-overhaul.md`

### Process (iteration guide)
1. **Iteration 1 — Landscape sweep:** Use WebSearch to find all major AI model releases from Jan 2025–May 2026. Categories: frontier models (GPT-5, Claude 4.x, Gemini 2+), reasoning models (o3, o4, DeepSeek R2), multimodal, open-source (Llama 4, Mistral, Qwen), agentic frameworks (Claude MCP, A2A protocol, OpenAI Assistants v2).
2. **Iteration 2 — Benchmarks and capabilities:** Search for benchmark shifts (MMLU, HumanEval, GPQA, new evals like SWE-bench 2.0). Document which models lead which benchmarks as of May 2026.
3. **Iteration 3 — Paradigm shifts:** Research agentic AI (multi-agent systems, tool-use, computer-use), governance and regulation (EU AI Act enforcement, US EO developments), enterprise adoption patterns, and cost/accessibility trends.
4. **Iteration 4 — Write and structure:** Compile all findings into the output document. Organize by category with chronological sub-sections. Include a "What Changed Since 2024" summary section.
5. **Iteration 5 — Source verification:** Re-check all cited URLs, replace any dead links, ensure every claim has a live source.

### Success Criteria
- [ ] Output file exists and is non-empty
- [ ] Covers all six categories: frontier models, reasoning, multimodal, open-source, agentic frameworks, governance
- [ ] Each entry includes: release date, key capabilities, benchmarks (where available), source URL
- [ ] "What Changed Since 2024" summary section present
- [ ] All source URLs are reachable
- [ ] No entries older than Jan 2025 (unless explicitly labeled historical)

### Output Files
- `families/genai/.supernal/docs/research/ai-landscape-research-2025-2026.md`

### Estimated Iterations
5

### Dependencies
None — this is the first loop and unblocks all others.

---

## Loop 2: `ralph-managen-skill`

**Goal:** Create and validate the `managen-research` skill so it can drive autonomous content updates.

### Inputs
- `families/genai/.supernal/docs/research/ai-landscape-research-2025-2026.md` — output of Loop 1 (needed to validate research commands work against real content)
- `~/.openclaw/skills/managen-research/SKILL.md` — the skill file (already scaffolded; this loop validates and improves it)
- `families/genai/docs/` — target doc tree for integration testing
- Epic file at `epic-managen-overhaul-managen-ai-complete-overhaul.md`

### Process (iteration guide)
1. **Iteration 1 — Review the scaffolded skill:** Read `~/.openclaw/skills/managen-research/SKILL.md`. Identify any gaps between what the skill spec promises and what can actually be executed with available tools (WebSearch, Read, Write, Bash, sc task, git).
2. **Iteration 2 — Validate `managen gap-scan` logic:** Run the gap-scan process manually against one doc file. Confirm the output format matches the spec. Fix the SKILL.md if the process needs adjustment.
3. **Iteration 3 — Validate `managen research <topic>` logic:** Run the research process on a single topic (e.g., "reasoning models 2025"). Confirm draft output is written to the correct path with correct frontmatter.
4. **Iteration 4 — Validate `managen update <file>` logic:** Apply a draft to a live doc. Confirm in-place update works, git commit is formed correctly.
5. **Iteration 5 — Fix and finalize:** Update SKILL.md with any corrections from validation. Ensure `RUNME.sh` stub reflects the validated process. Commit final skill file.

### Success Criteria
- [ ] `~/.openclaw/skills/managen-research/SKILL.md` is complete and validated
- [ ] All four commands (research, gap-scan, update, batch-update) have been manually exercised at least once
- [ ] `RUNME.sh` stub runs without errors
- [ ] Skill is listed in `~/.openclaw/skills/skill.json` (or equivalent registry)
- [ ] A test gap-scan report exists at `families/genai/.supernal/docs/research/gap-report-<date>.md`

### Output Files
- `~/.openclaw/skills/managen-research/SKILL.md` (finalized)
- `~/.openclaw/skills/managen-research/RUNME.sh` (validated)
- `families/genai/.supernal/docs/research/gap-report-<YYYY-MM-DD>.md` (first real gap report)

### Estimated Iterations
5

### Dependencies
- Loop 1 (`ralph-managen-research`) — landscape doc needed for validation

---

## Loop 3: `ralph-managen-techstack`

**Goal:** Evaluate whether ManaGen.ai should stay on MkDocs Material or migrate to a modern dynamic framework (Next.js primary candidate), and write a binding decision document.

### Inputs
- `families/genai/mkdocs.yml` — current config
- `families/genai/docs/` — site content volume and structure
- `families/genai/requirements.txt` — current Python/MkDocs deps
- Epic file at `epic-managen-overhaul-managen-ai-complete-overhaul.md`
- Reference: `families/supernal-web/apps/marketing-site/` — supernal.ai (Next.js, for comparison)

### Process (iteration guide)
1. **Iteration 1 — Audit current stack:** Read mkdocs.yml, requirements.txt, and site structure. Document current capabilities and limitations (no dynamic routes, no server-side data, limited animation).
2. **Iteration 2 — Research alternatives:** Use WebSearch for "MkDocs Material 2025 vs Next.js for documentation site", "documentation sites Next.js 2025 examples", "Astro documentation sites 2025". Evaluate: Next.js 15, Astro, Nextra, staying on MkDocs Material with heavy JS customization.
3. **Iteration 3 — Evaluate against requirements:** Score each option against the epic's requirements — landing page performance (< 2s load), Lighthouse > 90, motion/video hero, dynamic content, existing content migration effort, maintainability.
4. **Iteration 4 — Write decision doc:** Structure as ADR (Architecture Decision Record): Context, Options Considered, Decision, Rationale, Migration Plan (if applicable), Risks.

### Success Criteria
- [ ] Decision document exists and is complete
- [ ] At least three options evaluated with explicit scoring
- [ ] A clear "Decision" section names the chosen stack
- [ ] If migrating away from MkDocs: migration plan with estimated effort (files to convert, build changes, routing changes) is included
- [ ] If staying on MkDocs: spec for JS/CSS customizations required for dynamic landing page is included

### Output Files
- `families/genai/.supernal/docs/decisions/techstack-decision-<YYYY-MM-DD>.md`

### Estimated Iterations
4

### Dependencies
- Loop 1 (`ralph-managen-research`) — landscape context helps frame what the site needs to represent
- Loop 2 (`ralph-managen-skill`) — recommended (gap report informs content volume)

---

## Loop 4: `ralph-managen-landing`

**Goal:** Spec and build a new landing page for ManaGen.ai — hero with motion or video, clear value proposition, visually competitive with modern AI resource sites.

### Inputs
- `families/genai/.supernal/docs/decisions/techstack-decision-<date>.md` — Loop 3 output (determines whether this is MkDocs override or Next.js component)
- `families/genai/docs/index.md` — current home page
- `families/genai/mkdocs.yml` — theme/feature config
- `families/genai/material/` — MkDocs Material overrides directory
- Epic file at `epic-managen-overhaul-managen-ai-complete-overhaul.md`
- Reference: `families/supernal-web/apps/marketing-site/` — design language reference

### Process (iteration guide)
1. **Iteration 1 — Spec the landing page:** Define hero copy (headline, sub-headline, CTA), value proposition sections, nav structure, and motion/animation plan. Write as `landing-page-spec.md`.
2. **Iteration 2 — Research inspiration and components:** Use WebSearch for "modern AI documentation site landing page 2025", "MkDocs Material hero override examples", "Next.js documentation landing page with video hero". Find 3–5 reference implementations.
3. **Iteration 3 — Build or spec implementation:** If staying on MkDocs: write the custom `overrides/home.html` Jinja2 template and matching CSS. If Next.js: write the `app/page.tsx` component with hero, feature sections, and motion. Implement or write the full spec if implementation is out of scope for one session.
4. **Iteration 4 — Review and refine:** Check the implementation against the spec. Verify performance targets (< 2s load, Lighthouse > 90). Fix any issues. Update `index.md` or `docs/index.md` to match the new landing page content.
5. **Iteration 5 — Commit and screenshot spec:** Commit all changes. Write a screenshot/preview spec noting which URL renders the new landing page and what the screenshot should capture for the slide deck.

### Success Criteria
- [ ] Landing page spec exists and is complete
- [ ] Implementation is committed (either MkDocs override or Next.js component, per Loop 3 decision)
- [ ] Page renders without errors
- [ ] Hero section has motion or video component (or motion is explicitly deferred with rationale)
- [ ] Value proposition is clear and does not reference stale AI landscape (post-2024)
- [ ] Slide deck screenshot spec written at `families/genai/.supernal/docs/slide-deck-assets.md`

### Output Files
- `families/genai/.supernal/docs/specs/landing-page-spec.md`
- `families/genai/material/overrides/home.html` (if MkDocs) OR `app/page.tsx` (if Next.js)
- `families/genai/.supernal/docs/slide-deck-assets.md`

### Estimated Iterations
5

### Dependencies
- Loop 3 (`ralph-managen-techstack`) — tech stack decision gates implementation approach
- Loop 1 (`ralph-managen-research`) — ensures landing page copy references current AI landscape

---

## Loop 5: `ralph-managen-content-update`

**Goal:** Iterate through the gap report produced by Loop 2 and update stale or missing content in the site's doc files, one file per iteration.

### Inputs
- `families/genai/.supernal/docs/research/gap-report-<date>.md` — Loop 2 output (prioritized list of gaps)
- `families/genai/.supernal/docs/research/ai-landscape-research-2025-2026.md` — Loop 1 output (source of truth for updates)
- `families/genai/docs/` — live doc tree to be updated
- Epic file at `epic-managen-overhaul-managen-ai-complete-overhaul.md`

### Process (iteration guide — one file per iteration)
Each iteration follows this pattern:
1. Read the gap report. Pick the highest-priority unclaimed gap.
2. Create an `sc task`: `sc task create "Update <file>: <gap description>" --epic EPIC-MANAGEN-OVERHAUL --assignee @me`
3. Mark task in-progress: `sc task start TASK-XXX`
4. Read the target doc file.
5. Use WebSearch to supplement the landscape research for this specific topic.
6. Apply targeted edits: update model names, benchmark numbers, add missing sections, remove or label obsolete content.
7. Write the updated file in-place.
8. Commit: `git add docs/<file> && git commit -m "docs(managen): update <file> — <summary> [<date>]"`
9. Mark task done: `sc task done TASK-XXX --notes "Updated <file>: <summary>, sources: <urls>"`
10. Mark the gap item as resolved in the gap report.

**Done condition:** All High and Medium priority gaps in the report are resolved.

### Success Criteria
- [ ] All High-priority gaps from the gap report are resolved
- [ ] All Medium-priority gaps from the gap report are resolved (or explicitly deferred with rationale)
- [ ] No doc file contains model references older than 2023 without explicit "historical" labeling
- [ ] Each updated file has a git commit with a descriptive message
- [ ] All corresponding `sc task` items are marked done with evidence notes
- [ ] Batch summary written at `families/genai/.supernal/docs/research/batch-summary-<date>.md`
- [ ] Submodule pointer advanced in parent repo

### Output Files
- Updated files in `families/genai/docs/` (multiple, per gap report)
- `families/genai/.supernal/docs/research/batch-summary-<YYYY-MM-DD>.md`

### Estimated Iterations
15–20 (one file per iteration; actual count depends on gap report size)

### Dependencies
- Loop 1 (`ralph-managen-research`) — landscape doc is the research foundation for updates
- Loop 2 (`ralph-managen-skill`) — gap report is required input; skill validation ensures update process works

---

## Execution Summary

| Loop | Name | Depends On | Est. Iterations | Output |
|------|------|-----------|----------------|--------|
| 1 | `ralph-managen-research` | none | 5 | `ai-landscape-research-2025-2026.md` |
| 2 | `ralph-managen-skill` | Loop 1 | 5 | finalized skill + first gap report |
| 3 | `ralph-managen-techstack` | Loop 1, 2 | 4 | `techstack-decision-<date>.md` |
| 4 | `ralph-managen-landing` | Loop 3 | 5 | landing page spec + implementation |
| 5 | `ralph-managen-content-update` | Loop 1, 2 | 15–20 | updated docs + batch summary |

**Total estimated iterations:** 34–39

**Parallel opportunities:** Loops 3, 4, and 5 can run in parallel after Loops 1 and 2 are complete. Loop 4 must wait for Loop 3's tech stack decision before building (spec can proceed in parallel).

---

## Starting a Loop

Paste this into a Ralph session, replacing `<loop-name>` with the loop you want to run:

```
Execute Ralph loop: <loop-name>

Pre-flight:
1. Read the epic: /Users/saiterminal/git/supernal/.supernal/docs/planning/epics/epic-managen-overhaul-managen-ai-complete-overhaul.md
2. Read the loop spec: /Users/saiterminal/git/supernal/families/genai/.supernal/docs/ralph-loop-specs.md — find the section for <loop-name>
3. Check dependencies: confirm all required input files from dependency loops exist
4. sc task list --epic EPIC-MANAGEN-OVERHAUL --status in-progress

Run the iteration loop as specified. Max iterations as specified per loop.
Report: what was produced, output file paths, any blockers.
```
