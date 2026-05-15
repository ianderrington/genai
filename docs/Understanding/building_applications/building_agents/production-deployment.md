---
title: Production Deployment
description: What it actually takes to move AI agents from demo to production — infrastructure, reliability, observability, and governance
bullets:
  - 85% of organizations claim agent integration but fewer than 6% of surveyed orgs have genuine production agents
  - The gap between a working demo and a reliable production system is primarily an infrastructure and observability problem
  - Successful deployments start narrow, invest in observability before scaling, and surface failures loudly
---

# Production Deployment

The distance between a compelling demo and a production agent system is larger than most teams expect. Demos succeed when the happy path works. Production agents must handle edge cases, fail gracefully, cost predictably, stay secure, and remain debuggable when something goes wrong at 2am.

This page covers what enterprise deployments have learned, the infrastructure that makes production agents possible, and the readiness criteria you should meet before expanding agent scope.

---

## The Demo-to-Production Gap

A 2025 Cleanlab survey of 1,837 organizations found that 85% claimed some form of agent integration. But only 95 of those organizations — roughly 5% — had what the researchers classified as genuine production agents: systems running autonomously on live data, with measurable business impact, at consistent volume.

The other 80% had demos, proofs of concept, or narrow automation scripts that required frequent human intervention to keep running.

The gap is not primarily a model capability problem. The models are capable enough for many real tasks. The gap is:

1. **Reliability infrastructure** — what happens when the agent fails? Who knows? What recovers it?
2. **Observability** — can you see what the agent is doing, in sufficient detail to debug failures?
3. **Cost predictability** — long-horizon tasks consume tokens in unpredictable ways; costs can spike 10x on edge cases
4. **Security** — agents with real permissions require real controls (see [Security Threats](./security-threats.md))
5. **Governance** — knowing what agents you have deployed, what they can reach, and who owns them

!!! warning "Reliability is the #1 challenge"
    In every major survey of production AI deployments in 2025, reliability ranked as the top challenge — above cost, latency, and capability. Solving reliability requires infrastructure investment before capability expansion.

---

## What Works: Enterprise Patterns

### Goldman Sachs: The Hybrid Workforce Model

Goldman Sachs deployed Devin alongside 12,000 software developers and reported a 20% efficiency gain. Their framing is instructive: they call it a "hybrid workforce" rather than "AI replacing developers." Agents handle well-scoped, high-volume, repetitive code tasks; developers handle architecture, review, and anything requiring judgment about business context.

The key to their success: Devin was deployed narrowly first (specific task types with clear acceptance criteria), expanded only after reliability was demonstrated, and always with human review in the loop.

### Oracle: Agent Swarms for Migration Work

Oracle used agent swarms to complete Java version migrations 14x faster than all-human teams. This is the archetype of a successful production agent use case: a large volume of similar, well-defined tasks with clear correctness criteria (does the migrated code pass tests?). The agent doesn't need to understand business logic — it needs to apply mechanical transformations reliably.

### Amazon: Cross-Org Tool Schema Governance

Amazon requires tool schema governance standards across all agent builder teams. Before any team can deploy an agent that calls shared tools, the tool schema must be reviewed and approved. This prevents the tool proliferation problem: dozens of teams each building slightly different versions of the same tool, with inconsistent schemas that agents trained on one version fail on when they encounter another.

### CrewAI: Scale as Signal

CrewAI customers in finance, federal government, and field operations collectively run 12 million or more daily flow executions. At that scale, even a 1% failure rate means 120,000 failed flows per day. This is why the CrewAI ecosystem emphasizes robust error handling and retry logic — at production scale, rare events become common ones.

---

## Production Readiness Checklist

Before expanding an agent's scope, permissions, or user base, work through this list:

### Foundation

1. **Define measurable success criteria** before deployment, not after. What does "working" mean? What is the acceptable failure rate? What is the acceptable cost per task?
2. **Start with one workflow** — clearly defined, high volume, and measurable. Do not try to automate broadly; automate one thing well.
3. **Document what the agent can reach** — every tool, API, database, and external service in scope. This is your blast radius map.

### Observability (Required Before Scaling)

4. **Implement trace logging** — every tool call, input, and output, with correlation IDs that let you reconstruct a full run from any event.
5. **Set up alerting** — you must be notified when error rates spike, latency spikes, or cost spikes. Alerts before you notice in a dashboard.
6. **Define runbook for common failures** — what does an on-call engineer do when the agent is stuck in a loop? When it exceeds cost limits? When it starts producing wrong outputs?

### Cost and Resource Controls

7. **Set hard token limits per run** — not soft alerts, hard limits that terminate runs.
8. **Implement cost monitoring with automated alerts** at 50%, 80%, and 100% of budget thresholds.
9. **Track cost per successful task**, not just aggregate cost. Cost efficiency degrades in subtle ways that aggregate numbers hide.

### Security and Permissions

10. **Apply least privilege** — review the permission set and remove everything that is not required for the current task scope.
11. **Implement human confirmation gates** for irreversible or high-value actions.
12. **Establish audit logging** — every consequential action logged, immutably, with enough context to reconstruct what happened.

### Reliability

13. **Test failure paths, not just success paths** — what happens when a tool times out? When an API returns an error? When the agent gets an unexpected response format?
14. **Implement retry logic with exponential backoff and maximum retries** — not infinite retry loops.
15. **Surface failures loudly** — failed runs must be visible. Silent recovery is not acceptable; it hides the true failure rate.

### Governance

16. **Assign ownership** — every production agent has a named owner responsible for it.
17. **Document the agent in your agent registry** — what it does, what it can reach, who owns it, when it was last reviewed.
18. **Establish a review cadence** — permissions and scope should be reviewed periodically, not just at initial deployment.

---

## Reliability Statistics: What to Expect

The 2025 Devin review provides the most detailed public reliability data for a production coding agent:

| Metric | 2024 | 2025 |
|--------|------|------|
| PR merge rate | 34% | 67% |
| Merge with no significant revision | ~15% | 20–30% |
| Merge after one round of human feedback | ~30% | 40–50% |
| Substantially rewritten or closed | ~55% | 20–30% |

The improvement from 2024 to 2025 is significant, but the absolute numbers are important context: even in 2025, 30–50% of Devin PRs require one or more rounds of human revision before merging. This is not a criticism — it is the realistic baseline for what production coding agents currently deliver.

For your own deployments:
- Expect similar ranges for well-scoped coding tasks
- Expect lower initial rates for novel or domain-specific tasks
- Reliability improves substantially with well-defined task descriptions, clear acceptance criteria, and good examples

!!! tip "pass@k is the right reliability metric"
    Single-run success rate overstates reliability. Run the same task 5 or 10 times and measure how often it succeeds at least once (pass@k). That is closer to what you actually care about in a production system where you can retry failures.

---

## Infrastructure

### Hosting and Compute

| Platform | Description | Best For |
|----------|-------------|----------|
| [Amazon Bedrock AgentCore](https://aws.amazon.com/bedrock/) | Managed agent runtime (GA Oct 2025); includes sandboxing, state, and observability | AWS-native production deployments |
| [Modal](https://modal.com/) | Serverless GPU/CPU with fast cold starts; per-call billing | Cost-sensitive workloads; burst capacity |
| [LangGraph Cloud](https://langchain-ai.github.io/langgraph/cloud/) | Managed deployment for LangGraph agents | LangChain ecosystem |
| [E2B](https://e2b.dev/) | Sandboxed code execution environments | Code-executing agents |
| [Letta](https://letta.com/) | Agent hosting with built-in state and memory management | Long-running stateful agents |

### Observability

| Platform | Description | Best For |
|----------|-------------|----------|
| [LangSmith](https://smith.langchain.com/) | Full-stack LLM observability; trace replay, eval | LangChain agents |
| [Datadog Agent Traces](https://www.datadoghq.com/) | APM with LLM-specific tracing | Organizations already on Datadog |
| [Langfuse](https://langfuse.com/) | Open source; self-hostable; strong eval features | Self-hosted requirements; cost-sensitive |
| [AgentOps](https://www.agentops.ai/) | Agent-specific session replay and cost tracking | Framework-agnostic agent monitoring |
| [Arize Phoenix](https://phoenix.arize.com/) | Open source; strong for tracing and evaluation | Research and production evaluation |
| [OpenTelemetry](https://opentelemetry.io/) | Standard instrumentation protocol | Custom observability stacks |

### Memory and State

| Solution | Type | Best For |
|----------|------|----------|
| [Letta](https://letta.com/) | Managed long-term memory | Persistent agent personalities / context |
| [Redis](https://redis.io/) | In-memory KV store | Short-term session state; fast retrieval |
| [Zep](https://www.getzep.com/) | Long-term memory with semantic search | Conversational agents needing recall |
| [Mem0](https://mem0.ai/) | Memory layer with automatic consolidation | Personal assistant-style agents |
| Pinecone / Weaviate / Qdrant | Vector databases | Semantic memory retrieval at scale |

### Protocols and Integration

| Protocol | Purpose | Status |
|----------|---------|--------|
| [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) | Standardized tool/resource integration | 97M+ SDK downloads; de facto standard |
| [A2A (Agent-to-Agent)](https://google.github.io/A2A/) | Agent coordination and handoff protocol | Emerging; Google-led |
| OpenAI Function Calling format | Tool schema standard | Widely supported across frameworks |

---

## Cost Management

Long-horizon agent tasks consume tokens in ways that are difficult to predict from short-horizon benchmarks. A task that takes 3 tool calls in testing might take 30 in production when it hits edge cases. Cost management is not optional.

**Key cost drivers:**
- Context window size across multi-step reasoning chains
- Failed runs that consume tokens without producing results
- Retry loops on API failures
- Observability tooling (often underestimated — LangSmith at scale is not free)

**Controls to put in place before production:**
- Hard token limits per agent run (not soft alerts — hard limits that abort the run)
- Cost attribution by task type and agent, so you know where spend is going
- Automated alerts at percentage-of-budget thresholds
- Regular review of cost-per-successful-task, not just aggregate

!!! warning "The cost of debugging blind"
    Teams often skip observability tooling to reduce cost, then spend 10x more in engineering time trying to debug production failures without traces. Observability is not overhead — it is infrastructure.

---

## Common Production Failure Modes

Understanding why production agents fail is as important as understanding why demos succeed.

**Silent failure:** The agent produces output but the output is wrong. No error is raised. This is the hardest failure mode to catch. Defense: output validation and regular automated evaluation runs against known-good test cases.

**Runaway loops:** The agent enters a retry or reasoning loop and consumes resources until it hits a timeout or cost limit. Defense: maximum step counts, cost limits, and loop detection in the agent runtime.

**Permission creep over time:** Permissions are added to solve specific problems and never removed. Over months, an agent accumulates far more access than it needs. Defense: quarterly permission review as part of governance.

**Stale tool schemas:** An API changes; the agent's tool schema does not. The agent starts producing malformed calls or misinterpreting responses. Defense: schema validation in the tool integration layer with version pinning.

**Context overflow in long tasks:** Long-horizon tasks accumulate context until the agent's reasoning degrades. Defense: context summarization at checkpoints, and monitoring for degraded output quality on long runs.

---

## Governance: Know What You Have

At scale, agent governance is a real operational problem. Organizations that deploy agents without tracking them end up with:

- Agents running in production with no clear owner
- Agents with permissions that are broader than any current task requires
- No record of what agents were doing when something went wrong

Minimum governance posture for any production agent:

1. Agent registry with name, description, permissions, owner, and deployment date
2. Named owner responsible for each agent (not "the AI team" — a specific person)
3. Defined review cadence for permissions and scope
4. Runbook for common failure scenarios
5. Escalation path when the runbook does not cover the situation

Amazon's cross-org tool schema governance requirement is a useful reference model: make governance a gate, not an afterthought.

---

## References

- Cleanlab 2025 Enterprise AI Survey
- [Amazon Bedrock AgentCore documentation](https://aws.amazon.com/bedrock/)
- [Devin 2025 performance analysis](https://www.cognition-labs.com/)
- [CrewAI enterprise deployment case studies](https://www.crewai.com/)
- [LangSmith production observability guide](https://smith.langchain.com/)
- [A2A Protocol specification](https://google.github.io/A2A/)
- [MCP security considerations](https://modelcontextprotocol.io/docs/concepts/security)
