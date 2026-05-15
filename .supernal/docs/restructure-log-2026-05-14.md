---
title: Site Restructure Log
date: 2026-05-14
author: ralph-managen-restructure (automated agent)
epic: EPIC-MANAGEN-OVERHAUL
---

# Site Restructure Log — 2026-05-14

This log records all changes made during the Phase 1 nav restructure and P0 stub creation pass for ManaGen.ai.

---

## Summary

Created 4 new content pages addressing the highest-priority gaps identified in `content-architecture-spec.md` and `ai-landscape-research-2025-2026.md`. Updated navigation files and the main Understanding section index to surface the new content.

No existing files were modified beyond nav configuration and the Understanding index. No content was deleted.

---

## Files Created

### 1. `docs/Understanding/architectures/reasoning-models.md`
**~330 words**  
New page covering test-time compute scaling, why reasoning models changed AI capabilities in 2025, and a per-model breakdown of o3, DeepSeek R1, Qwen3, and Gemini 2.5 Deep Think. Includes a section on Process Reward Models (PRMs) and a practical guidance section for practitioners making model selection decisions. Cross-links to existing training and optimizing sections.

**Gap addressed:** Gap 1 from the content spec — "The site has no content explaining test-time compute scaling or the thinking model paradigm." The existing `architectures/training/reasoning_models.md` is a link dump with no prose content; this page provides the substantive overview.

---

### 2. `docs/Understanding/agents/mcp-protocol.md`
**~430 words**  
New page covering Model Context Protocol: what it is, how it works (Resources / Tools / Prompts primitives), why 97M monthly downloads signals ecosystem standard status, the MCP v3 spec additions (OAuth, structured outputs), and the Linux Foundation governance transfer. Includes practical sections for developers, enterprise architects, and security teams. Cross-links to agent components, infrastructure, and the official MCP spec.

**Gap addressed:** Gap 2 from the content spec — "MCP is the defining protocol of 2025 agentic AI. Its absence is a red flag." The site had zero MCP coverage before this change.

---

### 3. `docs/Understanding/governance/index.md`
**~480 words**  
New section index page for AI Governance. Covers: why governance shifted from academic concern to live compliance obligation between 2022 and 2025, EU AI Act overview and key enforcement dates, US executive order policy shift (Biden → Trump), NIST AI RMF, safety and red-teaming practices, and organisational governance structures. Links to the eu-ai-act.md detail page and related existing sections.

**Gap addressed:** Gap 4 from the content spec — "EU AI Act compliance guide" — plus broader governance context. The site had governance content scattered under `building_applications/security_compliance_and_governance/` but no top-level governance section accessible from the Understanding nav.

---

### 4. `docs/Understanding/governance/eu-ai-act.md`
**~750 words**  
Detailed compliance guide structured by risk tier (Prohibited / High-Risk / GPAI / Limited-Risk). Covers: specific prohibited practices in force from February 2025; key obligations for high-risk systems (documentation, audit trails, conformity assessment); GPAI obligations active from August 2025 (affects frontier model providers); what the 2025 Omnibus adjustment changed in the timeline; and a "what you need to do now" action checklist segmented by reader type (foundation model provider / high-risk app deployer / general AI product / uncertain about tier).

**Gap addressed:** Gap 4 from the content spec — the site previously had no EU AI Act content despite first obligations having taken effect in February 2025.

---

### 5. `docs/Understanding/governance/.pages`
New awesome-pages navigation config for the governance section, ordering `index.md` before `eu-ai-act.md`.

---

## Files Modified

### `docs/Understanding/.pages`
Added `governance` to the section navigation order, placed after `agents`.

**Before:**
```yaml
nav:
    - index.md
    - overview
    - data
    - architectures
    - prompting
    - agents
    - ...
```

**After:**
```yaml
nav:
    - index.md
    - overview
    - data
    - architectures
    - prompting
    - agents
    - governance
    - ...
```

---

### `docs/Understanding/architectures/.pages`
Added `reasoning-models.md` as the second entry after `index.md`, before the existing subdirectory sections.

**Before:**
```yaml
nav:
    - index.md
    - models
    - training
    - generating
    - optimizing
    - ...
```

**After:**
```yaml
nav:
    - index.md
    - reasoning-models.md
    - models
    - training
    - generating
    - optimizing
    - ...
```

---

### `docs/Understanding/agents/.pages`
Added `mcp-protocol.md` as the second entry after `index.md`.

**Before:**
```yaml
nav:
    - index.md
    - components
    - building_agents
    - systems
    - examples
    - slide_presentation.md
```

**After:**
```yaml
nav:
    - index.md
    - mcp-protocol.md
    - components
    - building_agents
    - systems
    - examples
    - slide_presentation.md
```

---

### `docs/Understanding/index.md`
Two changes:

**1. Mermaid diagram**: Added `RM["Reasoning<br>Models"]`, `MCP["MCP<br>Protocol"]`, and `Gov["Governance"]` nodes. Reasoning Models and MCP were placed in the Build subgraph; Governance was placed in the Use subgraph. Added click handlers for all three nodes. Added `newColor` class (purple) to visually distinguish new nodes.

**2. "See these first" callout**: Added three new bullet points:
- Reasoning Models — with description of test-time compute
- MCP (Model Context Protocol) — with the 97M downloads signal
- AI Governance — EU AI Act and compliance obligations

---

## What Was NOT Done (deferred to future passes)

The following P0 items from the spec remain outstanding:

- `agents/building/frameworks.md` — rewrite of `libraries_and_tools.md` covering LangGraph, CrewAI, AutoGen, OpenAI Agents SDK, Google ADK, Anthropic SDK
- `building/evals.md` — LLM evaluation and benchmarking from scratch
- `models/model-comparison.md` — capability matrix GPT-5 vs Claude 4.x vs Gemini 2.5 vs Llama 4 vs Qwen3

The P1/P2 content items (small language models, structured outputs, synthetic data, etc.) are unchanged.

Physical file reorganisation (Phase 3 of the spec's migration plan) has not been started.

---

## Navigation Note

The site uses the `awesome-pages` plugin rather than a hand-written `nav:` block in `mkdocs.yml`. All navigation changes in this pass were made by modifying `.pages` files in the affected directories. The `mkdocs.yml` file was not changed.
