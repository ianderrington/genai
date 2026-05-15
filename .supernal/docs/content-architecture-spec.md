# ManaGen.ai Content Architecture Spec

**Status:** Ready for implementation  
**Date:** 2026-05-14  
**Based on:** Full audit of `mkdocs.yml`, `docs/` tree (222 files, 21 directories)  
**Goal:** Sharper top-level nav, 2025–2026 content coverage, archive stubs, improve discoverability

---

## Current State: Audit Findings

### Navigation Topology (from `mkdocs.yml` + `awesome-pages`)

```
Root
├── Understanding/
│   ├── overview/          (ai_and_ml_basics, gen_ai)
│   ├── architectures/     (models, training, generating, optimizing)
│   ├── agents/            (components, building_agents, systems, examples, slides)
│   ├── data/              (gathering, preparation, augmentation)
│   ├── prompting/         (optimizing, examples, security)
│   └── building_applications/ (back_end, front_end, full_stack, security_compliance_and_governance)
├── Using/
│   ├── examples/          (by_field, by_modality, by_use_case)
│   ├── ethically/         (de-risking, alignment, fairness, etc.)
│   ├── strategically/     (building_or_buying, business_models, etc.)
│   ├── managing/          (governing, ml_ops, observability, regulations)
│   └── legally.md, tech_stack.md (orphaned top-level files)
├── Managenai/             (project docs: contributing, build_plan, strategy, etc.)
└── blog/                  (1 post: Launch.md — effectively empty)
```

### Critical Problems Found

**1. Stub and near-empty files (blockers for credibility):**
These files exist as placeholders but have zero or near-zero content. They create dead-end experiences when users click through from the navigation.

| File | Size | Problem |
|------|------|---------|
| `Understanding/architectures/training/pre-training.md` | 0 bytes | Empty file |
| `Understanding/agents/building_agents/agent_infrastructure.md` | 0 bytes | Empty file |
| `Understanding/architectures/models/diffusion_models.md` | 165 bytes | Stub only |
| `Understanding/architectures/models/gans.md` | 37 bytes | Stub only |
| `Understanding/architectures/models/hybrid_models.md` | 94 bytes | Stub only |
| `Understanding/architectures/models/vision_language_transformers.md` | 327 bytes | Stub only |
| `Understanding/architectures/training/reasoning_models.md` | ~500 bytes | Link dump, no content |
| `Understanding/architectures/training/grounding.md` | 897 bytes | Stub |
| `Using/strategically/implementation.md` | 1 byte | Empty |
| `Understanding/agents/building_agents/ethically.md` | 133 bytes | Stub |
| `Understanding/agents/building_agents/libraries_and_tools.md` | 290 bytes | Stub |
| `blog/posts/Launch.md` | 159 bytes | Empty launch post |
| `Understanding/architectures/generating/test_time_inference.md` | 445 bytes | Stub |

**2. Missing 2025–2026 coverage:**
The site was last substantially updated March 2025. Entire categories that are now table-stakes for a GenAI knowledge resource are absent or underdeveloped:
- Reasoning models (o1, o3, DeepSeek-R1, Gemini 2.0 Thinking) — file exists but is a link dump
- Multi-agent systems / agent swarms — folder exists (`systems/`), only `examples.md` and `index.md`
- MCP (Model Context Protocol) — not present anywhere
- Agentic frameworks in 2025 context (LangGraph, CrewAI, Agentforce, Claude Agent SDK) — `libraries_and_tools.md` is a stub
- Multimodal generation (text-to-video, Sora, Kling) — `architectures/models/multimodal.md` exists but size unknown
- LLMOps tooling (LangSmith, Braintrust, Weights & Biases, Helicone) — `back_end/llm_ops/` exists
- Small language models / on-device inference — not covered
- Structured outputs / JSON mode — not covered
- Evals and benchmarking — not covered as standalone section

**3. Navigation usability issues:**
- `Understanding/` and `Using/` split is confusing — users don't know where to start
- `Managenai/` section (project docs) is exposed in main nav alongside knowledge content
- `Using/legally.md` and `Using/tech_stack.md` are orphaned files with no parent section
- `blog/` effectively doesn't exist (1 stub post)
- The `slides/` subdirectory under `agents/` is exposed in nav — these are presentation assets, not knowledge articles
- `architectures/generating/` vs `architectures/models/` split is unclear — overlap exists

**4. Naming inconsistencies:**
- `Understanding/` uses snake_case for all dirs
- `Managenai/` uses PascalCase for the folder name
- `Using/` uses mixed casing in files (`legally.md`, `tech_stack.md`)
- `Managenai/` vs `ManagenAI` vs `Managen.ai` — naming is inconsistent throughout

---

## Proposed Navigation Structure

### Design Principles
1. **Start with the user's question**, not the content taxonomy. Top-level nav answers "what do you want to do?" not "how did we organize this?"
2. **Hide project infrastructure** (`Managenai/`, slides) from the main knowledge nav
3. **Keep depth to 3 levels max** before content pages
4. **Stubs get hidden or merged** — never expose empty pages in nav

### Proposed Top-Level Navigation

```
Root
├── Start Here           (new — onboarding section)
├── Foundations          (replaces Overview + core concepts)
├── Models               (elevated from architectures/models — high-traffic topic)
├── Agents               (keep, with restructuring)
├── Building             (replaces building_applications + relevant parts of data)
├── Prompting            (keep)
├── Responsible AI       (merge Ethics + Legal + Governance)
├── Using GenAI          (replaces Using/ — practical, less technical)
└── About ManaGen.ai     (move project docs here, hidden from main nav)
```

---

### Detailed Structure

#### 1. Start Here (new section)

Purpose: Replace the current home page's "choose your adventure" Mermaid diagram with a proper landing section. Serves first-time visitors.

```
start-here/
├── index.md              "What is GenAI and where should I begin?"
├── for-engineers.md      "Learning path: technical builders"
├── for-leaders.md        "Learning path: product/business decision-makers"
├── for-researchers.md    "Learning path: research and contribution"
└── glossary.md           "Key terms defined" (new — currently spread across pages)
```

**Migration:** Extract the "choose your adventure" section from `Understanding/index.md` into the Start Here section. Keep `Understanding/index.md` as a section index.

---

#### 2. Foundations

Replaces: `Understanding/overview/`  
Absorbs: `Understanding/architectures/training/pre-training.md` (when content exists), basics content

```
foundations/
├── index.md              "What is Generative AI?" (keep current content)
├── how-llms-work.md      "Transformers and language models explained"
├── gen-ai-landscape.md   "Map of the field: models, modalities, providers"
├── considerations.md     "Key challenges and limitations" (keep current)
└── ai-vs-ml.md           "GenAI vs traditional ML" (from overview/ai_and_ml_basics/)
```

---

#### 3. Models

Elevated from: `Understanding/architectures/models/`  
Reason: Model selection is the #1 question practitioners have. Burying it under "architectures" undervalues it.

```
models/
├── index.md              "Choosing and understanding foundation models"
├── transformers.md       (keep, substantial content at 17KB)
├── reasoning-models.md   "o1, o3, DeepSeek-R1, Gemini Thinking" (REWRITE — currently stub)
├── multimodal.md         (keep/expand)
├── mixture-of-experts.md (keep)
├── diffusion-models.md   (EXPAND — currently 165 bytes)
├── small-language-models.md  (NEW — on-device, Phi-3, Llama-3 quantized, Gemma)
├── embedding-models.md   (move from architectures/generating/embedding via data/)
└── model-comparison.md   (NEW — benchmark tables, capability matrix)
```

**Archive (move to `_archive/`):**
- `gans.md` (37 bytes — no longer relevant to practical GenAI)
- `hybrid_models.md` (94 bytes — too vague to be useful)
- `vision_language_transformers.md` (327 bytes — merge into multimodal.md)
- `developing_architectures.md` (keep but rename `architecture-internals.md`)

---

#### 4. Agents

Keep existing strong content, add missing 2025 coverage.

```
agents/
├── index.md              (keep — 16KB, comprehensive)
├── components/
│   ├── index.md
│   ├── cognitive-architecture.md  (keep)
│   ├── memory.md                  (keep)
│   ├── tools-and-actions.md       (keep)
│   ├── environments.md            (keep)
│   └── vector-databases.md        (keep)
├── building/
│   ├── index.md
│   ├── frameworks.md              "LangGraph, CrewAI, AutoGen, Claude Agent SDK, OpenAI Agents" (REWRITE libraries_and_tools.md)
│   ├── mcp.md                     "Model Context Protocol — what it is, why it matters" (NEW)
│   ├── infrastructure.md          "Hosting, execution, monitoring" (REWRITE — currently empty)
│   ├── evaluating.md              (keep evaluating_and_comparing.md)
│   ├── optimizing.md              (keep)
│   └── stack.md                   (keep — 16KB)
├── systems/
│   ├── index.md
│   ├── multi-agent.md             "Swarms, crews, parallel execution" (EXPAND examples.md)
│   ├── agent-teams.md             "Coordination patterns, handoffs, orchestration"
│   └── autonomous-workflows.md   "Long-running agents, computer use" (NEW)
└── examples/
    ├── index.md
    └── commercial.md              (keep)
```

**Remove from nav:** `agents/slides/` — these are slide decks, not knowledge articles. Keep the files but exclude from `nav:` or `.pages`. Link them from `Start Here / for-engineers.md` as "slide decks for presentations".

---

#### 5. Building (Applications)

Replaces: `Understanding/building_applications/` + relevant training content

```
building/
├── index.md              "Building GenAI applications: where to start"
├── data/
│   ├── index.md
│   ├── gathering.md      (keep)
│   ├── preparation.md    (keep)
│   ├── augmentation.md   (keep)
│   └── synthetic-data.md (NEW — increasingly important)
├── training/
│   ├── index.md
│   ├── pre-training.md   (WRITE — currently empty, even a 500-word overview helps)
│   ├── finetuning.md     (keep — 7.8KB)
│   ├── grounding.md      (EXPAND — currently stub)
│   ├── feedback.md       (keep — 10.9KB)
│   └── tokenizing.md     (keep — 7.6KB)
├── rag.md                (move from architectures/generating/rag.md — this is a building topic, not arch)
├── structured-outputs.md (NEW — JSON mode, function calling, tool use schemas)
├── evals.md              (NEW — LLM evaluation, benchmarking, red-teaming)
├── back-end/
│   ├── index.md
│   ├── llmops.md         (keep/expand)
│   └── deployment.md     (keep)
├── front-end/
│   ├── index.md          (keep)
│   └── ux-patterns.md    (new — AI UX patterns, streaming, loading states)
└── security-compliance/
    ├── index.md
    ├── security.md       (keep)
    ├── compliance.md     (keep)
    ├── governance.md     (keep)
    └── monitoring.md     (keep)
```

---

#### 6. Prompting

Keep as-is — this section is solid. Minor additions.

```
prompting/
├── index.md
├── techniques.md         "Few-shot, chain-of-thought, system prompts" (from current index)
├── optimizing.md         (keep)
├── security.md           "Prompt injection, jailbreaks, defenses" (keep/expand)
├── examples/
│   ├── coding.md         (keep)
│   └── leaked.md         (keep)
└── structured-prompting.md (NEW — XML tags, JSON output, tool use prompts)
```

---

#### 7. Responsible AI

Merges: `Using/ethically/` + `Using/legally.md` + `Using/managing/`  
Reason: These are naturally co-located — legal and ethical concerns are part of the same decision context.

```
responsible-ai/
├── index.md              "Why responsibility matters in GenAI"
├── ethics/
│   ├── index.md          (keep)
│   ├── alignment.md      (keep)
│   ├── fairness.md       (keep)
│   ├── transparency.md   (keep)
│   ├── confabulation.md  (keep — rename to hallucinations.md for discoverability)
│   └── dual-use.md       (keep)
├── de-risking/
│   ├── index.md
│   ├── red-teaming.md    (keep)
│   ├── security.md       (keep)
│   ├── explainability.md (keep)
│   └── marking.md        (keep)
├── legal.md              (move from Using/legally.md)
├── regulations.md        (from Using/managing/regulations_and_guidelines.md)
├── governance.md         (from Using/managing/governing.md)
└── observability.md      (from Using/managing/observability.md)
```

---

#### 8. Using GenAI (Practical Guides)

Replaces: `Using/` section — retains the practical orientation but cleaner naming.

```
using/
├── index.md              "How to use GenAI effectively without building from scratch"
├── examples/             (keep all by_field, by_modality, by_use_case subdirs — well organized)
├── strategically/
│   ├── index.md
│   ├── build-or-buy.md   (keep building_or_buying.md)
│   ├── business-models.md (keep)
│   ├── open-source.md    (keep)
│   └── implementation.md (REWRITE — currently 1 byte)
├── managing/
│   ├── index.md
│   └── ml-ops.md         (keep)
└── tools.md              (consolidate tech_stack.md here, renamed)
```

---

#### 9. About ManaGen.ai (hidden from main nav)

Move: `Managenai/` contents here  
Navigation: Link from footer, not from main nav tabs.

```
about/
├── index.md              (mission, method, audience)
├── contributing.md       (keep — link from prominent CTAs on landing page)
├── build-plan.md         (keep)
├── strategy.md           (keep)
└── project-requirements.md (keep)
```

---

## Content Priorities: What to Write First

Ranked by investor/audience impact and content gap severity.

### P0 — Fix before investor presentation

| File | Action | Why |
|------|--------|-----|
| `reasoning-models.md` | Complete rewrite | It's a link dump. This is the hottest topic in AI right now. |
| `agents/building/mcp.md` | Write from scratch | MCP is the defining protocol of 2025 agentic AI. Its absence is a red flag. |
| `agents/building/frameworks.md` | Rewrite `libraries_and_tools.md` | LangGraph, CrewAI, AutoGen are expected knowledge. Stub is worse than nothing. |
| `building/evals.md` | Write from scratch | Evaluation is table-stakes for serious practitioners. |
| `models/model-comparison.md` | Write from scratch | Most-searched topic. A capability matrix (GPT-4o vs Claude 3.5 vs Gemini 2.0 vs Llama 3) is high-value. |

### P1 — Write within 2 weeks

| File | Action |
|------|--------|
| `models/small-language-models.md` | New — on-device AI is a major 2025 trend |
| `building/structured-outputs.md` | New — JSON mode, tool calling schemas |
| `agents/systems/autonomous-workflows.md` | New — computer use, long-horizon agents |
| `start-here/glossary.md` | Compile existing scattered definitions |
| `building/training/pre-training.md` | Even 800 words of overview unlocks the empty file |
| `using/strategically/implementation.md` | Currently 1 byte — needs content |

### P2 — 30-day horizon

| File | Action |
|------|--------|
| `building/data/synthetic-data.md` | New |
| `building/front-end/ux-patterns.md` | New — streaming UI, loading states |
| `prompting/structured-prompting.md` | New |
| `responsible-ai/regulations.md` | Expand current content with EU AI Act, NIST RMF updates |
| All diffusion model stubs | Expand to 800+ words each |

### Archive (hide from nav, keep in repo)

Move these to `docs/_archive/` and exclude from `awesome-pages` navigation:

| File | Reason |
|------|--------|
| `agents/slides/` (all) | Presentation assets, not knowledge content |
| `architectures/models/gans.md` | 37 bytes, no longer practical for GenAI builders |
| `architectures/models/hybrid_models.md` | 94 bytes, too vague |
| `blog/posts/Launch.md` | Placeholder, adds no value |
| `Using/tech_stack.md` | Orphaned; merge content into `using/tools.md` |

---

## Navigation Config Changes for `mkdocs.yml`

The site uses `awesome-pages` plugin which respects `.pages` files in each directory. The restructure does not require hand-writing a full `nav:` block — instead, update `.pages` files in each new directory.

**Key `mkdocs.yml` changes needed:**

```yaml
# 1. Update nav tabs (if using navigation.tabs feature)
nav:
  - Start Here: start-here/
  - Foundations: foundations/
  - Models: models/
  - Agents: agents/
  - Building: building/
  - Prompting: prompting/
  - Responsible AI: responsible-ai/
  - Using GenAI: using/
  # About moved to footer only

# 2. Add navigation.path feature for breadcrumbs
theme:
  features:
    - navigation.path      # Shows "Agents / Building / MCP" breadcrumb
    - navigation.indexes   # Keep existing — section index pages
    - navigation.instant   # Enable for SPA-like navigation (currently disabled)
    - navigation.instant.prefetch  # Enable for speed
    - navigation.prune     # Reduces left-sidebar DOM size for large nav
```

---

## Breadcrumb and Discoverability Improvements

### 1. Enable `navigation.path`

Currently disabled. This adds `Agents / Building / Frameworks` breadcrumbs at the top of each page. Zero content work — just enable in `mkdocs.yml`.

### 2. Add `.pages` `title:` overrides

The `awesome-pages` plugin supports per-directory titles. Add `title: Agents` to each section's `.pages` file so the nav label matches the proposed names without renaming directories.

```yaml
# Example: docs/agents/.pages
title: Agents
nav:
  - index.md
  - components
  - building
  - systems
  - examples
```

### 3. Enable `navigation.instant` + `navigation.instant.prefetch`

Currently disabled. These make navigation feel like a SPA — instant page transitions. Content is unchanged; just a flag in `mkdocs.yml`.

### 4. Section index pages

`navigation.indexes` is already enabled. Ensure every section directory has an `index.md` with:
- A 2–3 sentence orientation paragraph
- Links to the 3–5 most important pages in that section
- Consistent frontmatter with `description:` and `bullets:` for social cards

### 5. Cross-linking audit (P2)

High-value cross-links to add once content exists:
- From `models/reasoning-models.md` → `prompting/` (reasoning models need specific prompting)
- From `agents/building/mcp.md` → `agents/components/tools-and-actions.md`
- From `building/evals.md` → `agents/building/evaluating.md`
- From `responsible-ai/` pages → relevant `using/` practical guides

---

## Migration Execution Plan

### Phase 1: Nav restructure without moving files (1 day)

Use `awesome-pages` `.pages` files and `title:` overrides to remap the displayed navigation without changing file paths. This breaks zero existing links and can go live immediately.

Steps:
1. Add `title:` overrides to all `.pages` files
2. Create new section `index.md` files for sections that need them (Start Here, Responsible AI merge)
3. Enable `navigation.path`, `navigation.instant`, `navigation.instant.prefetch` in `mkdocs.yml`
4. Add symlinks or redirects for moved URLs if needed (MkDocs `redirects` plugin)

### Phase 2: Content gap sprint (1–2 weeks)

Write P0 content items. Each page should be at minimum 800 words with code examples where applicable.

### Phase 3: Physical file reorganization (after Phase 2)

Move files to the new directory structure. Add redirect rules for old URLs via `mkdocs-redirects` plugin:

```yaml
plugins:
  - redirects:
      redirect_maps:
        'Understanding/architectures/training/reasoning_models.md': 'models/reasoning-models.md'
        'Understanding/agents/building_agents/libraries_and_tools.md': 'agents/building/frameworks.md'
        # ... etc
```

This preserves SEO equity from any indexed pages and prevents 404s from external links.
