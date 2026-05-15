---
title: Agent Planning
description: How AI agents decompose goals, sequence actions, and adapt plans when environments change
bullets:
  - ReAct interleaves reasoning and action but struggles on long-horizon tasks
  - Plan-and-Act separates planner from executor and supports dynamic plan revision
  - Anthropic's five workflow patterns cover most production use cases
  - Choose the simplest pattern that handles your task complexity
---

Planning is how an agent converts a goal into a sequence of actions. Without explicit planning, agents respond reactively — each step is decided in isolation from what came before and what comes next. Explicit planning allows an agent to reason about dependencies, allocate effort, and recover from failures without starting over.

This page covers the main planning paradigms from basic ReAct through multi-agent hierarchical approaches, plus a practical decision guide for choosing between them.

---

## ReAct: The Foundation Pattern

**ReAct (Reasoning + Acting)** is the baseline planning paradigm for tool-using agents. The agent interleaves chain-of-thought reasoning steps with concrete action steps:

```
Thought: I need to find the current price of X
Action: search("current price of X")
Observation: [search results]
Thought: The results show X costs $42. Now I need to compare with Y.
Action: search("current price of Y")
Observation: ...
```

ReAct is simple to implement, works well with any tool-capable model, and is easy to debug — the reasoning trace is explicit and human-readable.

**Where it breaks down:** ReAct has no global view of the task. Each thought-action step only considers the immediate next move. On tasks with more than 5-6 steps, agents frequently:
- Lose track of earlier subgoals
- Repeat actions already completed
- Get stuck in local optima without the ability to backtrack
- Fail silently without recognizing the overall task has gone off-track

For simple, well-defined tasks with predictable tool sequences, ReAct remains the right choice. For anything longer or more complex, the architectures below address its limitations.

---

## Plan-and-Act: Explicit Upfront Planning

**Plan-and-Act** separates the problem into two phases:

1. **Plan phase:** The planner creates an explicit, structured plan before any actions are taken. This plan enumerates subtasks, dependencies, and expected outputs.
2. **Act phase:** The executor works through the plan step by step, reporting results back.

The key advance over naive sequential execution is **dynamic plan revision** — when the executor encounters an unexpected result, the planner can update the remaining steps rather than forcing the executor to continue with an invalidated plan.

```
[Plan]
1. Retrieve current inventory levels (→ database)
2. If inventory < threshold: generate reorder request
3. Check supplier availability for flagged items
4. Draft purchase order

[Execution]
Step 1: inventory retrieved — item A is below threshold, item B is fine
[Plan revised: skip step 3 for item B]
Step 2: reorder request generated for item A
...
```

This addresses ReAct's core failure mode: the planner maintains a global view, while the executor focuses on individual steps. When step 3 returns unexpected results, the planner revises steps 4–6 accordingly.

**Best for:** Tasks with 5–20 steps, clear subgoal structure, and environments where intermediate results meaningfully affect later steps.

---

## RP-ReAct: Strategic and Tactical Separation

**Reason-Plan-ReAct (RP-ReAct)** takes the planner/executor split further by using distinct agents for each role.

- **Reasoner-Planner Agent (RPA):** Handles strategic decomposition. Maintains the high-level plan, tracks overall progress, and makes decisions about replanning.
- **Proxy-Execution Agents (PEA):** Handle tactical execution. Each PEA handles a specific subtask, uses tools, and reports results to the RPA.

This decoupling has a concrete benefit: the RPA can reason about the full task at a high level of abstraction without being distracted by tool call details. The PEAs can execute aggressively without needing to maintain global context.

??? abstract "[RP-ReAct: Decoupled Strategic and Tactical Planning (arxiv 2512.03560)](https://arxiv.org/abs/2512.03560)"
    The paper introduces the multi-agent RP-ReAct framework for complex enterprise tasks with many interdependent components.

    Key finding: separating strategic planning from tactical execution reduces planning errors on tasks with more than 10 interdependent steps. The RPA's reasoning quality improves when it is not also responsible for tool call selection and formatting.

    Particularly effective for tasks where different subtasks require different specialist capabilities — the RPA routes to the appropriate PEA rather than context-switching itself.

**Best for:** Complex enterprise tasks with many dependencies, tasks requiring specialist capabilities per subtask, long-horizon workflows where a single agent would context-thrash.

---

## Autono: ReAct with Abandonment and Transfer

**Autono** extends ReAct with two mechanisms that address common failure modes in long-running tasks:

1. **Timely abandonment:** The agent recognizes when a subtask is failing and abandons it rather than retrying indefinitely. This prevents a single stuck subtask from blocking the entire workflow.
2. **Memory transfer:** When abandoning a subtask or resuming after interruption, the agent explicitly transfers what it learned during the failed attempt to the next attempt. Partial progress is not lost.

Autono also ships with native MCP compatibility, making it practical to integrate into tool ecosystems without custom adapter layers.

??? abstract "[Autono: ReAct with Abandonment and Memory Transfer (arxiv 2504.04650)](https://arxiv.org/abs/2504.04650)"
    ReAct-based framework that addresses two specific failure modes: infinite retry loops on stuck subtasks, and loss of partial progress across attempts.

    The abandonment strategy is explicit — the agent evaluates whether continued effort on a subtask is likely to succeed, and if not, records what it learned and moves on. This is distinct from timeout-based approaches that discard state.

    Native MCP compatibility means tool definitions work without wrapping.

---

## Tree-of-Thought and Search-Based Planning

For tasks where the solution requires exploring multiple competing approaches before committing, **Tree-of-Thought (ToT)** and **Monte Carlo Tree Search (MCTS)** methods evaluate branches of a plan before executing any of them.

The planning process:
1. Generate multiple candidate next steps
2. Evaluate each candidate (via scoring model, simulation, or heuristic)
3. Expand the most promising candidates
4. Commit to the best-scoring path found within the search budget

This is computationally expensive relative to linear planning but produces significantly better results on problems where early decisions foreclose good solutions — mathematical reasoning, code planning, strategic tasks.

OpenAI's o3 and similar reasoning models use MCTS-style approaches internally. For most application-level agent planning, Tree-of-Thought is more relevant as an explicit orchestration pattern than as a model-internal mechanism.

**Best for:** Exploration tasks, research problems, creative generation, situations where the search space has many viable-looking paths but only a few correct ones.

---

## Anthropic's Five Workflow Patterns

Anthropic's "Building Effective Agents" identifies five compositional patterns that cover the majority of production use cases. These are workflow-level patterns, not model-level techniques.

### 1. Prompt Chaining

Sequential tasks where each step feeds the next. Output of step N is input to step N+1.

```
[Draft] → [Edit] → [Fact-check] → [Format]
```

Simple, debuggable, low overhead. The right default for linear pipelines.

### 2. Routing

Classify the input first, then route to a specialist handler.

```
[Classify: billing / technical / general] → [Route to specialist agent]
```

Enables different models, prompts, or tools per category without one agent handling everything. Particularly valuable when inputs have very different complexity profiles.

### 3. Parallelization

Run independent subtasks simultaneously, then aggregate results.

```
[Subtask A] ┐
[Subtask B] ├→ [Aggregator]
[Subtask C] ┘
```

Reduces wall-clock time when subtasks have no dependencies. Common in research, document processing, and multi-source data collection.

### 4. Orchestrator-Workers

A central orchestrator plans and delegates; specialist workers execute.

```
[Orchestrator] → [Worker: code] 
              → [Worker: search]
              → [Worker: write]
```

This is the RP-ReAct pattern at the workflow level. The orchestrator maintains the plan; workers do not need global context. Most powerful pattern for complex multi-capability tasks.

### 5. Evaluator-Optimizer

One agent generates output; another agent evaluates and critiques it. The generator revises based on feedback.

```
[Generator] → [Evaluator] → [Generator (revised)] → ...
```

Effective for tasks with quality criteria that are easier to evaluate than to satisfy in one pass: writing, code review, data validation, plan verification.

!!! tip "Start Simple"
    Anthropic's core recommendation: start with the simplest pattern that could work. Add complexity only when a simpler approach demonstrably fails. A well-prompted single agent with chaining often outperforms a complex multi-agent system that is harder to debug and more expensive to run.

---

## Decision Guide

| Task characteristics | Recommended pattern |
|---------------------|---------------------|
| Single-turn, well-defined, < 5 tool calls | ReAct |
| Multi-step with clear subgoals, 5–20 steps | Plan-and-Act |
| Long-horizon with many interdependent subtasks | RP-ReAct or Orchestrator-Workers |
| Research / exploration with uncertain solution path | Tree-of-Thought |
| Independent parallel workstreams | Parallelization |
| Input classification + specialist handling | Routing |
| Output quality critical, criteria are evaluable | Evaluator-Optimizer |
| Tasks prone to infinite retry loops | Autono (abandonment strategy) |

### Failure Mode → Pattern Mapping

- **Agent loses track of overall goal** → Plan-and-Act (explicit plan maintained separately)
- **Single stuck subtask blocks everything** → Autono (abandonment + transfer)
- **Context window consumed by tool noise** → RP-ReAct (executor context isolated from planner)
- **Output quality inconsistent** → Evaluator-Optimizer
- **Latency unacceptable** → Parallelization
- **One agent can't handle all input types** → Routing

---

## Research

??? abstract "[Plan-and-Act: Separate Planner and Executor (arxiv 2503.09572)](https://arxiv.org/abs/2503.09572)"
    Formal treatment of the plan/execute split with empirical evaluation on long-horizon benchmarks.

    Key contribution: dynamic plan revision — the planner is not a one-shot artifact but an active component that revises remaining steps as execution results arrive. The paper demonstrates this is necessary (not just helpful) for reliable performance on tasks exceeding 10 steps.

    - [Paper](https://arxiv.org/abs/2503.09572)

??? abstract "[RP-ReAct: Reasoner-Planner and Proxy-Execution Agents (arxiv 2512.03560)](https://arxiv.org/abs/2512.03560)"
    Multi-agent framework decoupling strategic planning from tactical execution. The Reasoner-Planner Agent (RPA) maintains the global plan; Proxy-Execution Agents (PEA) execute individual subtasks.

    Evaluated on complex enterprise task benchmarks. The performance advantage grows with task complexity — on simple tasks, the overhead of multi-agent coordination is not justified.

    - [Paper](https://arxiv.org/abs/2512.03560)

??? abstract "[Autono: ReAct with Timely Abandonment (arxiv 2504.04650)](https://arxiv.org/abs/2504.04650)"
    Addresses the "stuck agent" failure mode with an explicit abandonment strategy and cross-attempt memory transfer. Native MCP support.

    - [Paper](https://arxiv.org/abs/2504.04650)

!!! references
    - [ReAct: Synergizing Reasoning and Acting (arxiv 2210.03629)](https://arxiv.org/abs/2210.03629)
    - [Tree of Thoughts (arxiv 2305.10601)](https://arxiv.org/abs/2305.10601)
    - [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)
    - [Plan-and-Act (arxiv 2503.09572)](https://arxiv.org/abs/2503.09572)
    - [RP-ReAct (arxiv 2512.03560)](https://arxiv.org/abs/2512.03560)
    - [Autono (arxiv 2504.04650)](https://arxiv.org/abs/2504.04650)
