---
title: Agent Harnesses (Coding Agents)
description: What an agent harness is, how it differs from an orchestration framework, and a comparison of Claude Code, Cursor, GitHub Copilot CLI, Codex CLI, Devin, OpenHands, Cline, Aider, and Amp
---

# Agent Harnesses

A **harness** is the runtime that actually executes an agentic loop against a real environment, usually a codebase. It owns the tool-calling loop, decides what commands and file edits need approval, sandboxes what the agent can touch, and manages what goes into the model's context on each turn. Claude Code, Cursor, GitHub Copilot CLI, and Devin are all harnesses in this sense.

!!! note "Not the same 'harness' as elsewhere on this site"
    [Agent Harnesses for Safe Self-Improvement](./self_improvement/harnesses.md) uses the word for a different, narrower concept: safety-containment infrastructure wrapped around a self-modifying agent. This page covers the everyday production sense of the term: the tool a developer runs to have an AI agent write and execute code.

## Harness vs. Framework vs. Orchestration

These three terms get used almost interchangeably, but they describe different layers:

| Term | What it is | Example |
|------|-----------|---------|
| **Framework** | A development-time library for assembling agent logic, tool wiring, and routing by hand | LangGraph, CrewAI - see [Agentic AI Orchestration Frameworks](./frameworks.md) |
| **Orchestration** | The sub-problem of coordinating multiple agents or steps, which a framework requires you to code and a harness exposes as configuration | Subagent definitions, workflow YAML |
| **Harness** | The production runtime that actually executes the loop: tool-call dispatch, permissions, sandboxing, context management, observability | Claude Code, Cursor, Devin |

Several 2026 industry write-ups (Arize, Atlan, Cursor's own engineering blog, which describes "Cursor's agent harness" in its own documentation) converge on this distinction, though it isn't a formal standard. The practical difference that matters most: a framework is a library you import and wire up yourself; a harness is a product you run, and its permission model is the thing standing between an agent's mistake and your filesystem.

## Comparison

| Harness | Maker | Form | Open Source | GA / Milestone |
|---------|-------|------|--------------|-----------------|
| **Claude Code** | Anthropic | CLI | No | GA May 22, 2025 |
| **Cursor** | Anysphere | IDE (VS Code fork) | No | - |
| **GitHub Copilot CLI** | GitHub/Microsoft | CLI | No (public repo, proprietary license) | GA February 2026 |
| **Codex CLI** | OpenAI | CLI | Yes (Apache-2.0) | - |
| **Devin** | Cognition | Cloud agent + CLI | No | Announced March 2024 |
| **Devin Desktop** (formerly Windsurf) | Cognition | IDE (VS Code fork) | No | Rebranded June 2, 2026 |
| **OpenHands** | Open source community | CLI / self-hosted | Yes (MIT) | v1.7.0, May 2026 |
| **Cline** | Open source community | IDE extension + CLI preview | Yes (Apache-2.0) | v3.81 |
| **Aider** | Paul Gauthier | CLI | Yes (Apache-2.0) | - |
| **Amp** | Sourcegraph | IDE extension / CLI | No | - |

## Permission and Sandboxing Models

This is the dimension that actually defines a harness, and the approaches diverge sharply:

**Claude Code** evaluates allow/ask/deny rules per tool call (Bash, Read, Edit, WebFetch, MCP) before execution. A sandboxed Bash mode restricts writes to the working directory while allowing broader reads. Background subagents pre-declare every permission they'll need up front, then auto-deny anything outside that set once running.

**Cursor** introduced "Auto-review" in version 3.6 (May 2026): a three-stage filter (allowlist, sandbox, classifier subagent) that Cursor says cuts approval prompts by roughly 84%, with sandboxed agents stopping less often than unsandboxed ones. A documented weakness exists too: certain shell built-ins can bypass the allowlist under prompt injection, a reminder that a permission system is only as strong as its narrowest gap.

**Codex CLI** keeps sandbox mode and approval policy as two independent settings rather than one combined toggle: three sandbox levels (read-only, workspace-write, danger-full-access) crossed with three approval policies (untrusted, on-request, never). Being open source, this configuration is fully auditable in `config.toml` rather than described only in documentation.

**Devin** runs each session in an OS-level isolated VM with network and command access denied by default, unless explicitly whitelisted per project. Session-level permission grants now propagate to sibling subagents, so a multi-agent Devin session doesn't re-prompt for something already approved.

**Cline** takes the simplest approach: a hard split between Plan mode (read and reason only, cannot edit) and Act mode (executes with per-step approval). There's no auto-approve spectrum to configure, just two distinct modes.

**Aider** sidesteps interactive approval almost entirely: every AI edit is auto-committed as its own semantically-messaged Git commit. The repository's commit history functions as the audit trail instead of a permission dialog, which only works because Aider assumes you're already reviewing diffs the way you'd review any other commit.

!!! warning "Valuation and capability aren't the same signal"
    Devin's most recent funding round valued Cognition at $26 billion (May 2026), yet its last *published* SWE-bench score remains 13.86%, from the original March 2024 announcement. No updated official benchmark has been released since. That gap is worth knowing before treating funding size as a proxy for how well a harness actually performs on real coding tasks.

## Security Is Part of the Harness's Job, Not an Add-On

In March 2026, Anthropic accidentally published Claude Code's full client-side source, roughly 513,000 lines across 1,906 files, inside a 59.8MB JavaScript sourcemap bundled in npm package version 2.1.88 (a missing `*.map` entry in `.npmignore`). Within hours the code had been mirrored across GitHub with over 84,000 stars and 82,000 forks before takedowns could catch up; some mirrors, hosted outside DMCA's practical reach, are still up. Anthropic's own incident statement called it "a release packaging issue caused by human error, not a security breach," and confirmed no customer data or credentials were exposed. Notably, the security reporting on the incident itself described what leaked as "the complete client-side agent harness," the same term this page uses.

The lesson generalizes beyond this one incident: a harness's build and release pipeline is itself part of its security surface, not just the permission checks it runs at agent execution time.

## How to Choose

- **Want the deepest sandboxing with the least manual permission tuning?** Devin's default-deny VM model asks the least of you upfront, at the cost of being closed source and cloud-hosted.
- **Want to see and audit exactly what the sandbox and approval logic do?** Codex CLI and OpenHands are both fully open source; Codex CLI's `config.toml` separation of sandbox level from approval policy is unusually explicit for a CLI tool.
- **Already living inside an IDE and want agent work to look like normal commit history?** Aider's auto-commit model turns every AI edit into a reviewable diff with no separate approval UI to learn.
- **Running multi-agent sessions where sub-tasks shouldn't each re-prompt for permission?** Claude Code's background-subagent pre-declaration and Devin's propagated session grants both solve this; most single-agent harnesses don't need to.
- **Evaluating a harness for a team, not just yourself?** Check whether its permission model is auditable (open source, or documented down to the config file) before trusting it with write access to a shared codebase; several harnesses on this page only describe their approval flow in marketing copy, not in a spec you can read.

## Related Pages

- [Agentic AI Orchestration Frameworks](./frameworks.md) - the library layer for building custom multi-agent systems, distinct from the harnesses on this page
- [Agent Harnesses for Safe Self-Improvement](./self_improvement/harnesses.md) - the safety-containment sense of "harness," for self-modifying agents specifically
- [VMs and Sandboxes](../building_applications/back_end/vms_and_sandboxes.md) - the isolation techniques these harnesses build on
- [Model Context Protocol (MCP)](./mcp-protocol.md) - the tool-integration standard several of these harnesses support natively
- [Building Agents: Infrastructure](../building_applications/building_agents/agent_infrastructure.md) - the deployment layer underneath a harness
