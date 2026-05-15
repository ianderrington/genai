---
title: Agent Memory Systems
description: How AI agents store, retrieve, and reason over memory — from in-context buffers to dynamic knowledge graphs
bullets:
  - Five distinct memory types serve different timescales and retrieval patterns
  - Self-editing memory (Letta/MemGPT) lets agents manage their own context window
  - Agentic RAG extends retrieval with autonomous query reformulation and multi-hop reasoning
  - Memory poisoning and staleness are active production concerns in 2025
---

Memory is the mechanism by which an agent retains information beyond a single inference call. Without persistent memory, every agent interaction starts from scratch — no user preferences, no task history, no accumulated knowledge. As agents move from single-turn tools to long-running autonomous systems, memory architecture becomes as important as the underlying model.

This page covers the 2025-standard memory taxonomy, key production systems, retrieval approaches, and the open challenges that distinguish toy demos from production deployments.

---

## Memory Taxonomy

The field has converged on five functional categories. They differ in lifetime, accessibility speed, and implementation:

| Memory Type | Description | Lifetime | Implementation |
|-------------|-------------|----------|----------------|
| **Core / Working** | Always in-context; immediately accessible without retrieval | Duration of the task | System prompt blocks, structured scratchpad |
| **Episodic** | Timestamped records of specific events and interactions | Sessions to months | Vector DB with timestamp metadata |
| **Semantic** | General world knowledge and domain facts | Long-term | RAG / knowledge bases |
| **Procedural** | Learned skills, preferences, and action sequences | Long-term | Fine-tuning, prompt libraries |
| **Archival** | Cold storage for rarely-accessed but persistent information | Indefinite | Database with full-text and semantic search |

In practice, production systems combine multiple types. A customer-support agent might use core memory for the current ticket, episodic memory for previous interactions with the same user, and semantic memory for the product knowledge base.

### Core / Working Memory

The contents of the active context window. It is fast (zero retrieval latency) but finite. Every token in the system prompt occupies working memory budget that could otherwise hold retrieved context or reasoning chains.

Design decisions:
- What to hard-code in the system prompt vs. retrieve on demand
- How to structure scratchpad blocks so the model uses them reliably
- When to compress or summarize earlier context to free space

### Episodic Memory

Records of what happened, when, and in what order. Episodic stores are indexed by recency and semantic similarity. Retrieval typically uses a vector database with optional time-decay weighting.

Key challenge: episodic retrieval must surface the *right* past event, not just similar-sounding ones. A question about "the project deadline we discussed" must retrieve the specific conversation about *this* project, not all deadline conversations ever stored.

### Semantic Memory

General knowledge that is true independent of when it was learned — product specifications, domain concepts, company policies. This is the standard RAG use case. See [vector databases](./vector_databases.md) and [RAG](../../architectures/generating/rag.md).

### Procedural Memory

How the agent knows to do things: multi-step workflows, user preferences about output format, learned tool usage patterns. Stored as prompt instructions, few-shot examples, or via fine-tuning. Hardest to update at runtime — typically requires a new model version or prompt update.

### Archival Memory

Long-tail storage. Items the agent is unlikely to need but must not lose — completed task logs, old versions of documents, historical metrics. Accessed via keyword or semantic search, not kept in context.

---

## Self-Editing Memory: The Letta Architecture

The dominant paradigm for autonomous memory management in 2025 is the **LLM-as-OS** model, pioneered by MemGPT and formalized in Letta.

Rather than a retrieval system passively serving context, the agent actively manages its own memory state:

1. **Core memory blocks** sit in the system prompt — always visible, limited size.
2. **Archival storage** lives on disk — unlimited size, accessed via tool calls.
3. **Recall storage** holds conversation history — searchable by semantic similarity.

The agent uses explicit tools (`core_memory_replace`, `archival_memory_insert`, `archival_memory_search`) to page information between tiers as needed — the same way an OS pages between RAM and disk.

**Why this matters:** the agent decides what to remember and what to forget. When it learns the user prefers concise responses, it updates its own core memory block. When a task completes, it archives the outcome. No external orchestrator needs to manage memory lifecycle.

??? abstract "[Letta (formerly MemGPT)](https://github.com/letta-ai/letta) — production agent memory framework"
    Letta is the production implementation of the LLM-as-OS paradigm. Originally published as MemGPT (2023), the V1 agent loop (2025) was redesigned for the latest generation of reasoning models.

    **Architecture highlights:**
    - Hierarchical memory: core (in-context) → recall (conversation history) → archival (persistent storage)
    - Agents use tool calls to explicitly read/write their own memory blocks
    - Memory edits are first-class operations, not side effects
    - Multi-agent support: agents can share memory namespaces

    **December 2025:** Letta Code ranked #1 on TerminalBench, demonstrating that explicit memory management outperforms context-window-only approaches on long-horizon coding tasks.

    - [GitHub](https://github.com/letta-ai/letta)
    - [Docs](https://docs.letta.com)
    - [MemGPT paper](https://arxiv.org/abs/2310.08560)

---

## Dynamic Memory: A-MEM

Static memory stores retrieve what was put in — they do not develop higher-order understanding over time. A-MEM addresses this with a Zettelkasten-inspired architecture where memories form connections and evolve.

??? abstract "[A-MEM: Agentic Memory for LLM Agents (arxiv 2502.12110)](https://arxiv.org/pdf/2502.12110v1)"
    The authors replace static memory retrieval with a dynamic system where memories develop relationships and adapt through use.

    **Core mechanism:**
    Each new memory receives:
    - Structured text attributes (keywords, context, importance)
    - Embedding vectors for similarity matching
    - Links to related memories already in the repository

    Two active processes keep the store alive:
    1. **Link generation** — when a new memory arrives, the system identifies and stores connections to memories with shared attributes or descriptions
    2. **Memory evolution** — existing memories are updated to incorporate higher-order patterns discovered when new related memories arrive

    This mirrors how a researcher using Zettelkasten notes doesn't just store facts but actively creates a web of connections that surfaces non-obvious relationships.

    **Results:** A-MEM outperforms static memory on long-horizon agentic tasks, particularly those requiring synthesis across many past interactions.

    - [Paper](https://arxiv.org/pdf/2502.12110v1)
    - [Code](https://github.com/WujiangXu/AgenticMemory)

---

## Agentic RAG

Standard RAG is a single-turn pattern: embed query → retrieve chunks → generate answer. It fails when the query is ambiguous, when answering requires multiple retrieval hops, or when the relevant information is scattered across sources.

Agentic RAG wraps the retrieval loop with an autonomous agent:

- **Iterative query reformulation** — if the first retrieval returns low-relevance results, the agent rewrites the query and tries again
- **Multi-hop evidence synthesis** — the agent chains multiple retrievals, using early results to inform later queries
- **Tool use within retrieval** — the agent can call APIs, run code, or consult sub-agents mid-retrieval
- **Self-evaluation** — after generating an answer, the agent assesses its confidence and decides whether to retrieve more evidence

!!! note "Single-agent Agentic RAG"
    <img width="676" alt="image" src="https://github.com/user-attachments/assets/ef0842f2-fb41-4dec-bdd9-6122497eaeaf" />

!!! note "Multi-agent Agentic RAG"
    <img width="643" alt="image" src="https://github.com/user-attachments/assets/e6325b83-657f-4c3a-b0a0-5c7714e438d6" />
    From [Agentic RAG survey (arxiv 2501.09136)](https://arxiv.org/pdf/2501.09136)

These systems often include post-generation feedback loops to detect and correct hallucinations and answer relevance failures before returning results to the user.

---

## Storage and Retrieval Methods

### Vector Databases

The workhorse of semantic memory. Embed text into high-dimensional vectors; retrieve by cosine similarity. See [vector databases](./vector_databases.md) for implementation details.

Common choices: Pinecone, Weaviate, Chroma, pgvector (Postgres extension).

At scale, embedding cost and retrieval latency become meaningful engineering concerns.

### Graph Databases

Graph stores capture relational structure that flat vector indexes cannot represent. If knowing that Entity A *caused* Event B, which *affected* Entity C matters, a graph database makes that structure queryable.

[Neo4j](https://neo4j.com) is the common choice. Queries use [Cypher](https://neo4j.com/developer/cypher/). The `tomasonjo/llm-movieagent` repository demonstrates an LLM semantic layer over Neo4j.

**Graphiti** (see Solutions below) uses a graph architecture specifically designed for temporally-aware agent memory — tracking not just relationships but when they were true.

### Traditional Databases

SQL and NoSQL stores remain appropriate for structured agent state: task logs, user profiles, configuration. Agents can read and write via tool calls. Graph and vector approaches add complexity; use traditional databases when the data is structured and queries are predictable.

### Key-Value and Cache Stores

Redis and similar stores handle short-term agent state — active session data, tool call results, intermediate reasoning steps. Appropriate for ephemeral data that does not need long-term persistence.

---

## Memory Consolidation and Hallucination Risk

A persistent problem in memory systems is hallucination during consolidation. When an LLM summarizes or extracts structured data from raw memories to store them more efficiently, it can introduce errors that become ground truth for future retrievals.

**MemMachine** addresses this with a ground-truth-preserving architecture: it combines short-term, episodic, and profile memory while minimizing LLM-based extraction steps. Structured facts are stored as-extracted, without LLM reformulation, reducing the surface area for consolidation errors.

---

## Production Challenges

| Challenge | Description | Mitigations |
|-----------|-------------|-------------|
| **Context window limits** | Core memory budget constrains what can be kept in-context | Tiered memory, aggressive summarization |
| **Retrieval precision** | Semantic similarity retrieval surfaces related-but-wrong memories | Hybrid retrieval (keyword + vector), metadata filtering |
| **Memory poisoning** | Adversarial inputs that inject false information into the agent's persistent memory | Input validation, provenance tracking, human review gates |
| **Stale memories** | Stored facts become outdated; the agent acts on wrong information | Timestamps + TTLs, periodic re-validation |
| **Cross-agent sharing** | Multiple agents needing shared memory without corrupting each other's state | Namespaced memory, write-lock protocols |
| **Embedding cost at scale** | Millions of memory entries require continuous re-embedding as models change | Batch embedding pipelines, versioned embedding indices |

Memory poisoning deserves particular attention. An agent that trusts its own memory is vulnerable to prompt injection attacks that store malicious instructions. Production systems need explicit provenance metadata on memory entries and should treat agent-written memories differently from human-authored content.

---

## Solutions

??? abstract "[Mem0: Memory for AI Agents](https://docs.mem0.ai/overview)"
    Mem0 provides a simple API layer for adding persistent memory to any LLM application. It handles embedding, storage, and retrieval, returning relevant memories as context for each new inference call.

    Supports user-level, session-level, and agent-level memory namespaces. Minimal integration overhead — designed for teams that need memory without building infrastructure.

    - [Docs](https://docs.mem0.ai/overview)
    - [GitHub](https://github.com/mem0ai/mem0)

??? abstract "[Graphiti: Temporally-Aware Knowledge Graphs](https://github.com/getzep/graphiti)"
    Graphiti builds dynamic, temporally-aware Knowledge Graphs that represent complex, evolving relationships between entities over time. Unlike static graph databases, Graphiti tracks *when* relationships were true — enabling agents to reason about change, not just current state.

    Ingests both unstructured and structured data. Queries combine time, full-text, semantic similarity, and graph algorithm approaches.

    Developed by the Zep team. Zep itself provides self-improving memory for sessions and users, layered on top of Graphiti.

    - [Graphiti GitHub](https://github.com/getzep/graphiti)
    - [Zep docs](https://help.getzep.com/concepts)

---

??? abstract "[Memobase](https://github.com/memodb-io/memobase) provides a user profile-based memory system for AI applications."
    Memobase is designed to bring long-term user memory to GenAI applications with a focus on structured user profiles. Key features include:
    
    - Memory focused on users rather than agents
    - Time-aware memory that prevents outdated information
    - Controllable memory with flexible configuration
    - Easy integration with existing LLM stacks via API and SDKs (Python/Node/Go)
    - Batch processing via non-embedding system and session buffer
    - Production-ready system tested by partners

## Research

??? abstract "[A-MEM: Agentic Memory for LLM Agents (arxiv 2502.12110)](https://arxiv.org/pdf/2502.12110v1)"
    See [Dynamic Memory: A-MEM](#dynamic-memory-a-mem) section above for full detail.

    - [Paper](https://arxiv.org/pdf/2502.12110v1)
    - [Code](https://github.com/WujiangXu/AgenticMemory)

??? abstract "[Letta / MemGPT: Self-Editing Memory for LLM Agents](https://github.com/letta-ai/letta)"
    See [Self-Editing Memory: The Letta Architecture](#self-editing-memory-the-letta-architecture) section above for full detail.

    - [MemGPT paper](https://arxiv.org/abs/2310.08560)
    - [Letta GitHub](https://github.com/letta-ai/letta)

??? abstract "[A Survey on Memory Mechanisms in AI Agents (arxiv 2603.07670)](https://arxiv.org/abs/2603.07670)"
    Comprehensive review of memory mechanisms across agentic systems, covering evaluation methodologies, identified gaps, and emerging frontiers.

    Key themes:
    - Taxonomy of memory types across the literature
    - Evaluation gaps — most benchmarks test retrieval in isolation, not how memory affects downstream task performance
    - Frontiers: cross-agent memory sharing, lifelong learning without catastrophic forgetting, memory compression at scale

    An essential reference for teams designing production memory architectures.

??? abstract "[Agentic Retrieval-Augmented Generation (arxiv 2501.09136)](https://arxiv.org/abs/2501.09136)"
    Comprehensive survey of Agentic RAG systems — architectures that wrap retrieval with autonomous agents capable of iterative query reformulation, multi-hop reasoning, and tool use.

    Significantly outperforms static RAG on complex multi-hop questions. Key finding: the performance gap between static RAG and Agentic RAG widens as question complexity increases.

    - [Paper](https://arxiv.org/abs/2501.09136)

??? abstract "[Read-Agent: Gist Memory for Very Long Contexts](https://github.com/read-agent/read-agent.github.io/)"
    Inspired by how humans read long documents interactively, Read-Agent implements a prompting-based system that:
    1. Decides which content belongs together in a memory episode
    2. Compresses those episodes into short *gist memories*
    3. Looks up sections in the original text when a gist needs refreshing

    Improves reading comprehension tasks while enabling effective context windows 3–20x larger than naive full-document prompting.

    - [Paper](https://arxiv.org/pdf/2402.09727.pdf)
    - [Jupyter notebook demo](https://github.com/read-agent/read-agent.github.io/blob/main/assets/read_agent_demo.ipynb)

!!! references
    - [Langchain memory how-to](https://python.langchain.com/docs/how_to/chatbots_memory/)
    - [MemGPT / Letta](https://github.com/letta-ai/letta)
    - [Mem0](https://docs.mem0.ai/overview)
    - [Graphiti](https://github.com/getzep/graphiti)
    - [Zep](https://help.getzep.com/concepts)
    - [A-MEM paper](https://arxiv.org/pdf/2502.12110v1)
    - [Agentic RAG survey](https://arxiv.org/abs/2501.09136)
    - [Memory survey](https://arxiv.org/abs/2603.07670)
