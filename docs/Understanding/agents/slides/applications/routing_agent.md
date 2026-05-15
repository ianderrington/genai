---
title: Routing Agents
description: Agents that classify inputs and direct them to the most appropriate handler
---

# Routing Agents

Routing agents classify an incoming task or message and direct it to the most appropriate resource — another agent, a tool, a human, or a workflow. They are the traffic controllers of multi-agent systems.

## When Routing Matters

As agent systems grow in complexity, not every request should go to the same model or tool:

- **Cost efficiency** — a complex coding question deserves a reasoning model; a simple FAQ deserves a fast, cheap model
- **Specialisation** — different agents may be optimised for different domains (legal, technical, creative)
- **Safety** — sensitive topics may require human escalation before any agent handles them

## Routing Approaches

| Approach | Mechanism | Trade-offs |
|----------|-----------|-----------|
| **LLM classifier** | Prompt an LLM to classify the intent | Flexible, adds latency and cost |
| **Semantic similarity** | Embed the query, find closest category | Fast, requires good category definitions |
| **Rule-based** | Keyword or regex matching | Fastest, brittle to edge cases |
| **Hybrid** | Rules first, LLM fallback | Balanced cost and accuracy |

## OpenAI Agents SDK: Handoffs

The OpenAI Agents SDK (March 2025) formalised routing through its **Handoffs** primitive — a structured way for one agent to transfer task execution to another, with full context passing. This replaced ad-hoc prompt-based routing patterns.

!!! info "Source"
    [OpenAI Agents SDK: Handoffs](https://openai.com/blog/new-tools-for-building-agents), March 2025

## Key Considerations

- Routing decisions should be **logged and auditable** — when a task is misrouted, you need to diagnose why
- Include a **fallback handler** for queries that don't match any route — never silently drop messages
- Test routing accuracy separately from downstream task accuracy; errors compound
