---
title: Agent Infrastructure
description: Protocols, runtimes, and platforms that connect agents to tools and each other
---

# Agent Infrastructure

> **Content updated May 2026.** This page covers the two foundational protocols for agentic AI — MCP and A2A — plus hosting and runtime considerations for production agent deployments.

The infrastructure layer beneath AI agents has crystallised around two complementary open standards. Understanding both is a prerequisite for any serious agentic architecture decision.

## Model Context Protocol (MCP)

MCP is the **tool-integration substrate** for AI agents — the standard way to connect any LLM to any external tool, API, file system, or database. Analogy: MCP is to AI agents what USB is to hardware peripherals.

**Key facts:**
- Launched by Anthropic, November 2024
- 97 million monthly SDK downloads by December 2025
- 10,000+ active MCP servers in production
- Donated to the Linux Foundation (Agentic AI Foundation) in December 2025, co-founded with Block and OpenAI
- MCP v3 (June 2025) added mandatory OAuth 2.0, structured tool outputs, and security primitives

Any enterprise building agentic systems needs an MCP integration story. See [actions and tools](../components/actions_and_tools.md) for implementation guidance.

!!! info "Source"
    [MCP specification and ecosystem](https://modelcontextprotocol.io); [Linux Foundation donation announcement](https://www.anthropic.com/news/mcp-linux-foundation)

## Agent-to-Agent Protocol (A2A)

Where MCP connects agents to tools, A2A connects **agents to other agents** across vendor boundaries. Announced by Google at Cloud Next, April 9, 2025.

**How it works:**
- Built on HTTP, JSON-RPC, and Server-Sent Events — standard web primitives
- Agents publish an "Agent Card" describing their capabilities
- Other agents discover and delegate to them via this card

**Adoption:**
- Launched with 50+ technology partners
- Transferred to the Linux Foundation alongside MCP
- 150+ organisations adopted A2A by April 2026

!!! info "Source"
    [Google A2A announcement at Cloud Next](https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-launch), April 9, 2025

## Runtime and Hosting Considerations

When deploying agents in production, consider:

1. **State persistence** — agents running long tasks need checkpointed state. LangGraph and the OpenAI Agents SDK both support checkpointing natively.
2. **Observability** — end-to-end tracing across agent hand-offs is essential for debugging. OpenAI Agents SDK includes built-in tracing; LangSmith provides this for LangGraph.
3. **Security boundaries** — agents with tool access to databases, file systems, or APIs require explicit permission models. MCP v3's OAuth requirements formalise this.
4. **Human-in-the-loop** — for high-stakes actions (financial transactions, code deployment, email sending), design explicit approval checkpoints into the agent loop.

!!! tip "agent-service-toolkit"
    [agent-service-toolkit](https://github.com/JoshuaC215/agent-service-toolkit) provides a production-ready starting template for deploying LangGraph agents as a service, with FastAPI, streaming, and auth baked in.

??? abstract "[OmniParser v2](https://github.com/microsoft/OmniParser/tree/master)"
    [Blog](https://www.microsoft.com/en-us/research/articles/omniparser-v2-turning-any-llm-into-a-computer-use-agent/) — turns any LLM into a computer-use agent by parsing screen content into structured, interactable elements.
