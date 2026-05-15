---
title: Research Agents
description: Agents that autonomously gather, evaluate, and synthesise information across sources
---

# Research Agents

Research agents go beyond simple information retrieval. They autonomously plan a research strategy, gather information from multiple sources, evaluate source quality, synthesise findings, and produce structured reports — often with minimal human direction.

## What Makes a Research Agent Different from a Search

A research agent:
1. **Plans** what to look for and in what order
2. **Evaluates** source quality and relevance dynamically
3. **Cross-references** findings across sources
4. **Identifies gaps** and queries further
5. **Synthesises** into coherent, cited output

A search tool returns documents. A research agent produces conclusions.

## Commercial Research Agents (2025)

**NotebookLM Deep Research** (Google, November 2025) crossed the usability threshold for mainstream adoption. It transitioned from RAG retrieval to active agentic research — seeking out, synthesising, and cross-referencing external sources. Available in NotebookLM Plus for enterprise Google Workspace users.

**ChatGPT Deep Research** (OpenAI) performs extended web research tasks, spending minutes to hours on complex queries and producing detailed cited reports.

!!! info "Source"
    [NotebookLM Deep Research](https://blog.google/technology/ai/notebooklm-deep-research/); [OpenAI Deep Research](https://openai.com/blog/introducing-deep-research)

## Architecture Considerations

- **Source diversity** — research agents should query multiple independent sources, not rely on a single database
- **Citation tracking** — every claim should trace to a source; hallucinations are more dangerous in research contexts
- **Confidence calibration** — the agent should distinguish between well-supported and uncertain conclusions
- **Time horizon awareness** — research agents need to be aware of when their knowledge base was last updated

## Key Risks

!!! warning "Research agent risks"
    - **Confirmation bias** — agents can anchor on early results and seek confirming evidence
    - **Source authority blindness** — not all web sources are equal; agents may cite low-quality content
    - **Hallucinated citations** — always verify that cited sources actually say what the agent claims
