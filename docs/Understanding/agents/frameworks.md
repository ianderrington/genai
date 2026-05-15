---
title: Agentic AI Orchestration Frameworks
description: A side-by-side comparison of the major frameworks for building multi-agent systems — LangGraph, OpenAI Agents SDK, CrewAI, Microsoft Agent Framework, Google ADK, and Amazon Strands
---

# Agentic AI Orchestration Frameworks

Choosing an orchestration framework is one of the most consequential architectural decisions in an agentic AI project. The frameworks are not interchangeable: each encodes a different theory of how agents should coordinate, and that theory shapes every layer of the system you build — how state is managed, how tasks are delegated, how failures are recovered, and how humans stay in the loop.

By mid-2026 the landscape had consolidated around six major frameworks, supplemented by AWS's newer entrant. This page compares them directly and provides guidance on selection.

---

## Framework Comparison

| Framework | Architecture Model | Released (stable) | Best For | Production Maturity | Links |
|-----------|-------------------|-------------------|----------|--------------------|----|
| **LangGraph** | Graph / state machine | Oct 2025 (v1.0) | Complex stateful multi-step workflows | High — widely deployed | [Docs](https://langchain-ai.github.io/langgraph/) |
| **OpenAI Agents SDK** | Handoff-based delegation | Mar 2025 | Handoff-centric delegation, customer service | High — provider-agnostic | [Docs](https://openai.github.io/openai-agents-python/) |
| **CrewAI** | Role-based crews | Oct 2025 (v1.1) | Specialist-team workflows, enterprise scale | High — 12M+ daily executions | [Docs](https://docs.crewai.com) |
| **Microsoft Agent Framework** | Async event-driven actors | Oct 2025 (preview) | Enterprise, .NET-heavy, distributed systems | Medium — GA Q1 2026 | [Docs](https://aka.ms/agentframework) |
| **Google ADK** | Hierarchical / multi-agent | 2025 (v1.0 GA) | Google Cloud users, cross-framework via A2A | High (Python), Early (Java) | [Docs](https://google.github.io/adk-docs/) |
| **Amazon Strands Agents** | Bedrock-integrated / composable | Oct 2025 (GA) | AWS-centric deployments | High (within AWS) | [GitHub](https://github.com/strands-agents/sdk-python) |

---

## Framework Deep Dives

### LangGraph (LangChain)

LangGraph 1.0 reached stable in October 2025, and LangChain's own documentation now carries a clear directive: **"Use LangGraph, not LangChain"** for agent workflows. LangChain continues to exist but is deprecated as an agent orchestration layer.

LangGraph models agent workflows as directed graphs where **nodes** are agents or functions, and **edges** are transitions between them. State flows through the graph and is tracked at every step.

**Key capabilities:**

- **Durable execution with checkpointing** — state is persisted between steps. If a process is interrupted (server restart, rate limit, human approval timeout), execution resumes from exactly where it stopped. This is the most production-important feature for long-running workflows.
- **Full streaming** — tokens, tool call arguments, state diffs, and node transition events are all streamable. Critical for responsive UX in human-facing applications.
- **Human-in-the-loop via interrupt points** — specific nodes can be configured to pause and await human input before proceeding. Approval gates, review steps, and escalation paths are first-class constructs.
- **LangGraph Studio v2** — a visual debugger that shows graph structure, live state, and step-by-step replay of any execution.
- **Pre-built architectures** — Swarm, Supervisor, and standard tool-calling agent topologies are available as starting points.
- **LangSmith integration** — agent metrics, trace inspection, and regression testing across runs.

!!! tip "When to choose LangGraph"
    LangGraph is the right choice when your workflow has complex branching logic, requires mid-execution recovery, or needs fine-grained control over state transitions. If you can draw your workflow as a flowchart with loops and conditional branches, LangGraph's graph model will feel natural.

**Avoid LangGraph if:** you want minimal abstractions and your workflows are largely sequential or delegation-based — OpenAI Agents SDK or CrewAI will be simpler.

---

### OpenAI Agents SDK

Released in March 2025, the OpenAI Agents SDK superseded the experimental Swarm SDK. Despite the name, it is **provider-agnostic** and works with any model, not just OpenAI models.

The SDK is built around four core abstractions:

- **Agents** — an LLM combined with a set of instructions and available tools. The basic unit of capability.
- **Handoffs** — the mechanism by which an agent dynamically transfers a task to another agent, passing full conversation context. This is the framework's defining feature.
- **Guardrails** — input and output validators that run before and after each agent step, enabling safety constraints without polluting agent logic.
- **Tracing** — built-in execution visualization, exportable to Logfire, AgentOps, or any OpenTelemetry-compatible backend.

In April 2026, enterprise features were added including enhanced access controls, audit logging, and compliance-oriented tracing exports.

!!! tip "When to choose OpenAI Agents SDK"
    If your multi-agent topology is primarily about routing and delegation — a triage agent deciding which specialist agent handles a request — the handoff model is an exact fit. Customer service pipelines, support routing, and research assistants that delegate to domain specialists are canonical use cases.

**Avoid OpenAI Agents SDK if:** you need durable long-running workflows with checkpointing. The SDK does not provide built-in state persistence across process restarts.

---

### CrewAI

CrewAI v1.1.0 was released October 2025. The framework takes a **role-based** approach: you define a "crew" of agents, each with a distinct role, goal, and backstory, and assign them tasks. The crew then collaborates to complete the overall objective.

**Scale indicators (2025):**

- 12 million+ daily executions
- 100,000+ certified developers through CrewAI's certification program

**Key additions in the v1.x line:**

- **CrewAI Flows** — an event-driven orchestration layer that sits above the crew abstraction, enabling complex enterprise workflows with conditional logic and state management.
- **AMP Suite** — a unified control plane providing tracing, cloud integrations, and deployment infrastructure. AMP is CrewAI's answer to the operational gap between framework and production.

!!! tip "When to choose CrewAI"
    CrewAI excels when you want to model a team of specialists: a researcher, a writer, a fact-checker, and an editor, each with a defined remit. The role-based abstraction makes agent behaviour more predictable and auditable than open-ended delegation. Strong choice for content generation, research pipelines, and any workflow that maps naturally to human team structures.

**Avoid CrewAI if:** your workflow requires very fine-grained control over state transitions or graph-level parallelism. Flows add capability here, but LangGraph remains more expressive for complex state machines.

---

### Microsoft Agent Framework (AutoGen + Semantic Kernel)

Microsoft's agentic strategy converged significantly in 2025. The trajectory:

- **AutoGen v0.4** (January 2025) — a complete redesign from the ground up. The conversational multi-agent model of AutoGen 0.2/0.3 was replaced with an **async event-driven actor model**, adding cross-language support for Python and .NET.
- **Microsoft Agent Framework public preview** (October 1, 2025) — a unification of AutoGen's dynamic orchestration capabilities with Semantic Kernel's production-grade foundations (semantic memory, plugins, planners). AutoGen and Semantic Kernel were simultaneously placed into **maintenance mode** (security patches only — no new features).
- **GA target: Q1 2026.**

!!! note "AutoGen and Semantic Kernel status"
    If you are reading documentation for AutoGen v0.2/v0.3 or Semantic Kernel as standalone frameworks, note that Microsoft has effectively deprecated both in favour of the unified Agent Framework. New projects should target the Agent Framework directly.

**Key capabilities:**

- Async, event-driven actor model with explicit message passing between agents
- Distributed execution — agents can run across processes or machines
- Cross-language: Python and .NET agents in the same workflow
- Semantic Kernel's plugin and memory infrastructure carried forward

!!! tip "When to choose Microsoft Agent Framework"
    The primary selection criteria is organisational: if your engineering team is .NET-first, or if your deployment targets Azure infrastructure with deep enterprise integrations, the Agent Framework's native Azure positioning removes significant friction. Also the right choice for genuinely distributed agent networks (agents on different machines or in different services).

**Avoid if:** you need it in production today. The framework was in public preview as of late 2025, with GA targeting early 2026.

---

### Google ADK (Agent Development Kit)

Google's ADK reached Python v1.0 stable GA, with a Java v0.1.0 release launched simultaneously. ADK is designed to complement Google's **A2A (Agent2Agent) protocol** — see the [A2A Protocol page](./a2a-protocol.md) for detail on how they work together.

ADK supports multi-agent architectures with a hierarchical coordination model: a root agent decomposes objectives and delegates to sub-agents, which may themselves have further sub-agents. Cross-framework interoperability is a first-class goal — ADK agents can interoperate with LangGraph, CrewAI, and other framework agents via A2A.

!!! tip "When to choose Google ADK"
    The clearest selection signal is infrastructure: if you are deploying on Google Cloud (Vertex AI, Cloud Run, GKE), ADK integrates with the stack natively. The second signal is cross-framework interoperability — if you need agents built in different frameworks to work together, ADK's A2A pairing is currently the most mature solution.

---

### Amazon Strands Agents

Amazon open-sourced the Strands Agents SDK (Python and TypeScript) with GA of the underlying **Amazon Bedrock AgentCore** on October 13, 2025. Strands is deeply integrated with AWS infrastructure but designed to be framework-composable.

**Notable capabilities:**

- Native MCP support — connect any MCP server to Strands agents
- Multi-agent coordination built in
- Deployment infrastructure: VPC/PrivateLink for network isolation, CloudFormation templates, built-in observability
- **Framework interoperability** — Strands explicitly supports working alongside LangGraph, CrewAI, Google ADK, and OpenAI Agents SDK. Teams can mix frameworks within a single AWS deployment.

!!! tip "When to choose Amazon Strands"
    Infrastructure selection criterion: if your system runs on AWS and you want the runtime, observability, networking, and deployment infrastructure to come from the same vendor as your cloud, Strands is the natural choice. The framework interop story is also a differentiator for heterogeneous deployments.

---

## Orchestration Patterns

Framework choice and coordination pattern are related but distinct decisions. Most frameworks support multiple patterns; some are optimised for specific ones.

| Pattern | Description | Typical Frameworks | Common Use Cases |
|---------|-------------|-------------------|-----------------|
| **Orchestrator-Worker** | Central orchestrator decomposes the task and routes sub-tasks to specialist workers | LangGraph, CrewAI, OpenAI Agents SDK | The most common production pattern. Research → write → review pipelines, code generation with testing. |
| **Hierarchical** | Tree-structured delegation: executive agent → manager agents → specialist agents | Google ADK, Microsoft Agent Framework | Complex enterprise workflows, multi-department coordination |
| **Swarm / Handoff** | Agents dynamically transfer control and context to each other without a central coordinator | OpenAI Agents SDK (native), LangGraph (pre-built) | Customer service routing, triage systems, any flow where the right agent is determined by context |
| **Mesh** | Direct peer-to-peer communication between agents; no central coordinator | Microsoft Agent Framework (actor model) | Distributed sensor networks, simulation environments, peer review workflows |
| **Pipeline** | Sequential stage-based processing; each agent receives the output of the previous | All frameworks | ETL-style data processing, document transformation chains |
| **Hybrid** | Combinations of the above (most real production systems) | All frameworks | Any sufficiently complex real-world workflow |

!!! note "Anthropic's five composable patterns"
    Anthropic's *Building Effective Agents* guide defines five composable workflow patterns at increasing complexity:

    1. **Prompt chaining** — sequential calls where each output feeds the next prompt
    2. **Routing** — a classifier directs inputs to specialised sub-chains
    3. **Parallelisation** — multiple agents run independently and results are aggregated
    4. **Orchestrator-workers** — a planner dynamically spawns and directs workers
    5. **Evaluator-optimiser** — an evaluation agent scores outputs and re-prompts until quality thresholds are met

    The guide's standing recommendation: **start with the simplest pattern that could work**. Complexity in agentic systems is expensive to debug.

---

## How to Choose

Use this decision sequence:

**1. Map your coordination model first.**  
Before evaluating frameworks, draw your workflow. What does control flow look like? Is it sequential, branching, delegation-based, or peer-to-peer? The answer constrains your options significantly.

**2. Apply infrastructure constraints.**  
Cloud-provider integrations are a legitimate factor. If you are AWS-committed, Strands and Bedrock AgentCore remove ops burden. If you are GCP-committed, ADK is the obvious fit. If you are cloud-agnostic, LangGraph, CrewAI, and OpenAI Agents SDK are all viable.

**3. Match the framework model to your pattern.**  
- **Long-running, stateful, complex branching** → LangGraph (checkpointing is the differentiator)  
- **Specialist team model** → CrewAI  
- **Routing and delegation chains** → OpenAI Agents SDK  
- **Enterprise .NET** → Microsoft Agent Framework (target GA release)  
- **Cross-framework interop** → Google ADK with A2A  
- **AWS deployment** → Amazon Strands  

**4. Evaluate operational maturity requirements.**  
If you need production observability, audit logging, and enterprise SSO today, CrewAI (AMP Suite), LangGraph (LangSmith), and OpenAI Agents SDK (tracing exports) are the most operationally mature options. Microsoft Agent Framework is still approaching GA.

**5. Consider team familiarity.**  
Frameworks with large developer communities (LangGraph, CrewAI) have more tutorials, Stack Overflow answers, and third-party tooling. The 100,000 certified CrewAI developers and LangGraph's position as the LangChain-recommended path both signal strong ecosystem support.

!!! tip "Avoid premature lock-in"
    The A2A protocol (see [Agent2Agent Protocol](./a2a-protocol.md)) is specifically designed to let agents from different frameworks interoperate. If you build to the A2A spec, the framework decision becomes less permanent — agents can be replaced or supplemented with agents from other frameworks without rebuilding the communication layer.

---

## MCP Support Across Frameworks

All major frameworks support MCP (Model Context Protocol) for tool integration. This means tool servers (databases, APIs, code execution environments) built once to the MCP spec are reusable across all of them.

| Framework | MCP Support |
|-----------|-------------|
| LangGraph | Native via LangChain MCP adapters |
| OpenAI Agents SDK | Native |
| CrewAI | Native |
| Microsoft Agent Framework | Via Semantic Kernel plugin layer |
| Google ADK | Native |
| Amazon Strands | Native (explicitly listed as a key feature) |

See [Model Context Protocol](./mcp-protocol.md) for how MCP fits into the overall agentic stack.

---

## Related Pages

- [Model Context Protocol (MCP)](./mcp-protocol.md) — the tool integration standard all frameworks use
- [Agent2Agent Protocol (A2A)](./a2a-protocol.md) — cross-framework agent communication
- [Agent Components: Actions and Tools](./components/actions_and_tools.md) — how tools are used inside the agent loop
- [Building Agents: Libraries and Tools](./building_agents/libraries_and_tools.md) — hands-on framework setup
- [Multi-Agent Systems](./systems/index.md) — patterns for combining agents into systems
