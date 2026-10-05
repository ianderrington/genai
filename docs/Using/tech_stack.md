---
title: The GenAI Tech Stack
description: The layers of a production GenAI system in 2026, from models and orchestration to retrieval, evaluation, and deployment, and which tools sit in each one
---

# The GenAI Tech Stack

A production GenAI application is rarely just "call an API." By 2026 the stack has settled into a handful of distinct layers, each with its own set of tools. This page maps the layers and points to the tools that dominate each one.

## Model layer

The foundation models themselves: see the [2025–2026 model landscape](../Understanding/overview/index.md#the-20252026-model-landscape) for the current frontier. Most teams call these through a hosted API (OpenAI, Anthropic, Google) rather than self-hosting, unless data sovereignty or cost at scale pushes them toward an open-weight model (Llama 4, DeepSeek V3, Qwen3) run on their own infrastructure or a neutral inference host (Together AI, Fireworks, Groq).

## Orchestration layer

Coordinates multi-step reasoning, tool calls, and multi-agent handoffs. See [Agent Frameworks](../Understanding/agents/frameworks.md) for the full comparison. LangGraph, CrewAI, the OpenAI Agents SDK, Google ADK, AutoGen, and the Anthropic Agent SDK each take a different coordination approach: graph-based, role-based, or handoff-based.

## Execution layer

Where an agent actually runs and what permissions it has. See [Agent Harnesses](../Understanding/agents/harnesses.md) for coding-agent harnesses (Claude Code, Cursor, Devin, Codex CLI) and their sandboxing models, and [Agent Communication Layers](../Understanding/agents/communication-layers.md) for agents built to persist and reach users across channels (OpenClaw and its variants).

## Retrieval and memory layer

Gives a model access to information beyond its training data and context window:

- **Vector databases**: Pinecone, Weaviate, Qdrant, and pgvector (Postgres) are the most widely deployed for semantic search over embeddings
- **RAG frameworks**: LlamaIndex and LangChain's retrieval modules handle chunking, indexing, and query-time retrieval
- **Agentic RAG**: see [Agentic RAG](../Understanding/agents/agentic-rag.md) for retrieval that an agent actively drives (searching, reformulating, verifying) rather than a single fixed lookup

## Interoperability layer

Protocols that let models, tools, and agents talk to each other without custom integration code for every pair. [MCP](../Understanding/agents/mcp-protocol.md) (Model Context Protocol) connects a model to tools and data sources; [A2A](../Understanding/agents/a2a-protocol.md) (Agent2Agent) handles direct agent-to-agent communication.

## Evaluation and observability layer

How teams know whether a GenAI system is actually working, before and after shipping it:

- **Tracing and logging**: LangSmith, Langfuse, and Arize Phoenix capture every model call, tool call, and intermediate step for debugging
- **Evaluation frameworks**: purpose-built eval harnesses (Braintrust, promptfoo) and general-purpose benchmarking against labeled test sets
- **Red-teaming and safety testing**: see [Agent Security](../Understanding/agents/slides/managing/security.md) for the threat model this layer defends against

## Deployment and serving layer

- **Managed hosting**: Vercel, Modal, and Replicate, for teams that don't want to run their own inference infrastructure
- **Self-hosted serving**: vLLM and TensorRT-LLM, for teams running open-weight models at scale and optimizing for throughput and cost per token

## How the layers fit together

A minimal production system touches at least four of these layers: a model, an orchestration layer to structure the task, a retrieval layer if the task needs information the model wasn't trained on, and an evaluation layer to catch regressions before they reach users. Teams typically add the interoperability layer (MCP/A2A) once they're integrating more than one tool provider or agent, and the execution/harness layer once agents start taking real actions instead of just generating text.

!!! info "Source"
    [Menlo Ventures: The Modern AI Stack](https://menlovc.com/perspective/the-modern-ai-stack-design-principles-for-the-future-of-enterprise-ai-architectures/), January 2024. An early, still-useful framing of the layer breakdown, though the specific tools it names have moved on since.
