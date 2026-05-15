---
title: Model Context Protocol (MCP)
description: The open standard that connects LLMs to tools, data sources, and external services — the USB of agentic AI
---

# Model Context Protocol (MCP)

The most common bottleneck in building useful AI agents is not the model itself — it is connecting the model to the systems it needs: databases, APIs, file systems, calendars, code execution environments, and the hundreds of enterprise tools that organisations already rely on. Anthropic's **Model Context Protocol (MCP)** is an open standard designed to solve exactly this problem, and its adoption speed suggests it has succeeded.

## What Is MCP?

MCP is an open protocol that defines a standard way for AI models to communicate with external tools and data sources. Think of it as a common interface layer: instead of every model provider implementing bespoke integrations with every tool (and every tool implementing bespoke integrations for every model), both sides implement the MCP specification once, and they work together automatically.

The analogy that has stuck is "**the USB of AI agents**" — a universal connector that works regardless of which model you are using or which tool you are connecting to.

MCP was originally developed by Anthropic and released in November 2024. In December 2025, Anthropic donated it to the **Agentic AI Foundation (AAIF)**, a directed fund under the Linux Foundation co-founded with Block and OpenAI. This governance transfer transformed MCP from a single-vendor standard to an industry-governed open protocol — a prerequisite for widespread enterprise adoption.

## Why 97 Million Monthly Downloads Matters

By December 2025, MCP had reached:

- **97 million monthly SDK downloads**
- **10,000+ active MCP servers in production**
- Hundreds of distinct AI client implementations

These numbers are not just marketing metrics. They signal that MCP has crossed the adoption threshold where it is risky *not* to support it. Any enterprise software vendor that wants to be used inside an AI agent workflow now needs an MCP server. Any organisation building agentic systems needs to understand how MCP works.

For comparison, npm packages that reach 10M monthly downloads are considered ecosystem standards. MCP at 97M suggests it has become infrastructure.

## How MCP Connects LLMs to Tools

MCP defines three core primitives:

**Resources**: Structured data that a tool exposes to the model — files, database records, API responses, code output. Resources are read by the model; the model does not modify them directly.

**Tools**: Functions that the model can invoke to take action — executing a database query, calling a REST API, writing a file, running code. Tools are the action layer.

**Prompts**: Reusable prompt templates that the tool server exposes — these allow tool providers to ship recommended prompts alongside their integrations.

The communication flow is:

```
AI Client (Claude, GPT-5, etc.)
    ↕ MCP over stdio / HTTP+SSE
MCP Server (your database, Slack, GitHub, etc.)
```

The model asks "what tools do you have?", the server describes them, and the model decides when and how to invoke them during a conversation or agent loop.

### MCP v3 (June 2025)

The third major version of the spec added mandatory OAuth for authentication, structured tool outputs with typed schemas, and richer security primitives including tool-call auditing. The OAuth requirement was significant: it means MCP servers can now participate in enterprise identity and access management systems, which was a blocker for many regulated industries.

## MCP in Practice

**For developers building agents**: MCP removes the need to write custom tool-calling glue code for each combination of model and tool. Connect your tool to MCP once; any MCP-compatible agent framework (LangGraph, CrewAI, OpenAI Agents SDK, Anthropic Agent SDK) can use it.

**For enterprise architects**: MCP provides a vendor-neutral integration layer. If you change your LLM provider, your tool integrations do not need to be rewritten. The protocol handles the schema negotiation between model and tool automatically.

**For security teams**: The AAIF governance model means that MCP security patches and OAuth requirements are now community-governed, not single-vendor decisions. Audit logs for tool invocations are part of the v3 spec.

## Related Pages

- [Agent Components: Actions and Tools](./components/actions_and_tools.md) — how tools are used inside the agent loop
- [Agent Infrastructure](./building_agents/agent_infrastructure.md) — MCP alongside A2A and other infrastructure standards
- [Building Agents: Libraries and Tools](./building_agents/libraries_and_tools.md) — frameworks that support MCP natively
- [Official MCP Specification](https://spec.modelcontextprotocol.io) — the full protocol reference
