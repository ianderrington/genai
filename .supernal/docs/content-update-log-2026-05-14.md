---
title: Content Update Log — 2026-05-14
type: update-log
author: ralph-managen-content-update
epic: EPIC-MANAGEN-OVERHAUL
---

# Content Update Log — May 14, 2026

This log records all content changes made in the ManaGen.ai P0/P1 content refresh pass on 2026-05-14. Research source for all additions: `families/genai/.supernal/docs/ai-landscape-research-2025-2026.md`.

---

## Files Modified (existing content updated)

### `docs/Understanding/agents/index.md`

**Changes:**
- Added "The 2025 agent landscape" section directly after the opening "What are AI Agents?" paragraph, introducing the six production frameworks in a comparison table (LangGraph, CrewAI, OpenAI Agents SDK, Google ADK, AutoGen, Anthropic Agent SDK).
- Replaced the "The Future of Agents" section preamble with a new major section: **"The 2025 Agent Infrastructure Layer"** covering:
  - **MCP (Model Context Protocol)**: 97M monthly downloads, 10,000+ production servers, donated to Linux Foundation (AAIF) December 2025, MCP v3 OAuth requirement. Includes Mermaid diagram.
  - **A2A Protocol**: Google, April 9, 2025, open HTTP/JSON-RPC/SSE standard, 150+ adopters by April 2026, under Linux Foundation.
  - **OpenAI Agents SDK**: March 2025, replaced Swarm, three primitives (Handoffs, Guardrails, Tracing).
  - **Claude Computer Use**: October 2024 public beta (14.9% OSWorld), March 23, 2026 Research Preview GA.
- Updated the "The Future of Agents" closing paragraph to reflect that 2025 was definitively the year of the AI Agent.

### `docs/Understanding/architectures/training/reasoning_models.md`

**Changes (full rewrite from stub):**
- Was: 28-line stub with raw URLs and image references, no prose content.
- Now: Full page covering:
  - Test-time compute scaling as the new paradigm (with Mermaid diagram)
  - "When to use reasoning models" decision tip
  - OpenAI o3/o4-mini (April 2025): 88% ARC-AGI, first multimodal reasoning
  - DeepSeek R1 (January 2025): <$6M training, MIT license, RL-induced reasoning
  - Chain-of-thought at inference vs. during training — distinction table
  - Process Reward Models (PRMs): step-level supervision, PRM800K, mainstream by 2025
  - Inference scaling laws: limits on knowledge-intensive tasks
  - Reasoning via RL: GRPO methodology, R1-Zero, Qwen3 hybrid mode
  - Source admonitions on all key facts

### `docs/Understanding/overview/index.md`

**Changes:**
- Added new section **"The 2025–2026 Model Landscape"** at the end of the page covering:
  - Standard frontier models table: GPT-5/5.5, Claude 4/4.6, Gemini 2.5, Llama 4, DeepSeek V3/R1
  - Reasoning/thinking models subsection: o3/o4-mini, DeepSeek R1, Gemini Deep Think, Qwen3
  - Link to reasoning-models.md and model optimization pages
  - Source admonitions citing all model releases

### `docs/Understanding/agents/building_agents/libraries_and_tools.md`

**Changes (full rewrite from 7-line stub):**
- Was: Single raw GitHub URL + an OmniParser reference
- Now: Full page covering all six production frameworks with descriptions, paradigm labels, best-fit guidance, sources, and a Mermaid decision tree for framework selection. Also preserves the OmniParser reference.

---

## Files Created (previously empty — 0 bytes)

### `docs/Understanding/agents/building_agents/agent_infrastructure.md`

Previously empty. Now covers:
- MCP: core concept, key stats, Linux Foundation donation
- A2A: how it works, adoption numbers
- Runtime/hosting considerations: state persistence, observability, security boundaries, human-in-the-loop
- agent-service-toolkit and OmniParser v2 references

### `docs/Understanding/architectures/optimizing/index.md`

Previously empty. Now covers:
- Quality vs. efficiency optimization distinction
- Key optimization levers table (quantization, distillation, pruning, LoRA, MoE, test-time compute)
- 2025 inference cost collapse context (SGLang vs vLLM, MoE architectures, quantization)
- Model tier routing Mermaid decision tree

### `docs/Understanding/architectures/training/pre-training.md`

Previously empty. Now covers:
- What pre-training is (next-token prediction objective)
- Why scale matters: scaling laws, Chinchilla
- Pre-training vs. test-time compute scaling (2025 context)
- Synthetic data as a first-class training technique (Phi-4 example)
- Key resources: scaling laws papers, Chinchilla, self-supervised learning cookbook

### `docs/Understanding/agents/slides/applications/coding_agent.md`

Previously empty. Now covers: key capabilities, 2025 coding agents (Claude Code, Copilot, Cursor, Windsurf), vibe coding explanation, key considerations.

### `docs/Understanding/agents/slides/applications/information_agent.md`

Previously empty. Now covers: key patterns (RAG, Deep Research, knowledge graph), architecture diagram, NotebookLM Deep Research (November 2025), key considerations.

### `docs/Understanding/agents/slides/applications/planning_agent.md`

Previously empty. Now covers: core capabilities, architecture pattern diagram, planning approaches comparison table (CoT, ToT, ReAct, handcrafted), 2025 context on reasoning models improving planning.

### `docs/Understanding/agents/slides/applications/research_agent.md`

Previously empty. Now covers: what distinguishes a research agent from a search, commercial research agents (NotebookLM, ChatGPT Deep Research), architecture considerations, key risks.

### `docs/Understanding/agents/slides/applications/routing_agent.md`

Previously empty. Now covers: when routing matters, routing approaches comparison table, OpenAI Agents SDK Handoffs primitive, key considerations.

### `docs/Understanding/agents/slides/managing/compliance.md`

Previously empty. Now covers: EU AI Act obligations for agents (February 2025, August 2025 GPAI), AI Act Omnibus simplification timeline, human-in-the-loop requirements, 2025 AI security incident statistics, compliance checklist.

### `docs/Understanding/agents/slides/managing/optimizing.md`

Previously empty. Now covers: the quality/speed/cost triad diagram, model tier routing table, prompt caching, parallelisation, evaluation-driven optimization.

### `docs/Understanding/agents/slides/managing/security.md`

Previously empty. Now covers: agent security threat model (prompt injection, tool abuse, data exfiltration, indirect instruction), 2025 security statistics, prompt injection defences, agentic access control, human-in-the-loop risk table, OWASP Top 10 reference.

### `docs/Understanding/agents/slides/systems/agent_teams.md`

Previously empty. Now covers: why agent teams, coordination patterns (hierarchical vs peer-to-peer), framework comparison table for team patterns, A2A for cross-vendor teams, key considerations.

### `docs/Understanding/agents/slides/systems/autonomous_companies.md`

Previously empty. Now covers: autonomy spectrum diagram, what's actually deployed in 2026 (tier-1 support, coding, research, content, finance ops), Anthropic Economic Index findings, key design principles, autonomy risk warning.

### `docs/Understanding/building_applications/full_stack/index.md`

Previously empty. Now covers: full-stack architecture diagram, key architecture decisions table, 2025 production defaults, navigation to related pages.

---

## Files NOT Modified (out of scope or already substantive)

- `docs/Understanding/architectures/reasoning-models.md` — already a well-written full page (54 lines), created in a prior pass; no changes needed
- `docs/Understanding/architectures/models/mixture_of_experts.md` — existing content; out of scope for this pass
- Slide files in `agents/slides/basics/` and `agents/slides/components/` — covered by existing content; out of scope
- `docs/Understanding/architectures/generating/` files — multimodal content updates deferred (not P0/P1)
- EU AI Act page — gap noted in research doc; deferred (no existing file to update into)

---

## Coverage Against P0 Requirements

| P0 Requirement | Status |
|---------------|--------|
| MCP — 97M downloads, Linux Foundation | Done — agents/index.md and agent_infrastructure.md |
| A2A protocol — Google, April 2025, 150+ partners | Done — agents/index.md and agent_infrastructure.md |
| OpenAI Agents SDK — March 2025, replaced Swarm | Done — agents/index.md and libraries_and_tools.md |
| Claude Computer Use agents | Done — agents/index.md |
| 6-framework production landscape | Done — agents/index.md and libraries_and_tools.md |
| Updated "What are AI Agents?" for 2025 | Done — agents/index.md |
| Test-time compute scaling paradigm | Done — training/reasoning_models.md (full rewrite) |
| o3/o4-mini April 2025, first multimodal reasoning | Done — training/reasoning_models.md and architectures/reasoning-models.md |
| DeepSeek R1 Jan 2025, <$6M training | Done — training/reasoning_models.md |
| Process Reward Models mainstream | Done — training/reasoning_models.md |
| Chain-of-thought at inference vs training | Done — training/reasoning_models.md |
| Empty files < 5 lines — add stubs | Done — 11 files created |

## Coverage Against P1 Requirements

| P1 Requirement | Status |
|---------------|--------|
| overview/index.md — model landscape (Claude 4.x, GPT-5, Gemini 2.5, Llama 4, DeepSeek) | Done |
| New architectures/reasoning-models.md | Already existed and was complete; no changes needed |
