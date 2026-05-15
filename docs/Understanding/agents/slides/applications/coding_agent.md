---
title: Coding Agents
description: AI agents that write, review, debug, and deploy code
---

# Coding Agents

Coding agents are among the most mature and widely deployed agent applications of 2025. They combine code generation, execution, test running, and iterative debugging in a loop — far beyond autocomplete.

## Key Capabilities

- **Code generation** from natural language specifications
- **Test execution and debugging** — running code, reading error output, and revising
- **Multi-file refactoring** — understanding and modifying codebases across many files
- **Code review** — identifying bugs, security issues, and style violations

## Notable Coding Agents (2025)

- **Claude Code** — Anthropic's agentic coding system, GA mid-2025; can autonomously execute long coding tasks in a terminal
- **GitHub Copilot** — integrated into VS Code; moved from autocomplete toward agent-mode multi-step tasks
- **Cursor** and **Windsurf** — IDE-native agents that apply multi-file edits from natural language instructions
- **Mistral Code Agent** — supports long-running cloud-based coding sessions

!!! important "Vibe coding"
    The term "vibe coding" (attributed to Andrej Karpathy, 2025) describes AI-first development where developers describe intent in natural language and accept AI-generated code with minimal review. This creates new capabilities — non-developers building software — and new risks: unreviewed code and hallucinated dependencies.

!!! info "Source"
    [Claude Code GA announcement](https://www.anthropic.com/claude-code); [Andrej Karpathy on vibe coding](https://twitter.com/karpathy/status/1886192184808149025)

## Key Considerations

- Run generated code in a sandbox before production deployment
- Coding agents work best when given clear acceptance criteria (tests) alongside the task
- Long-context models (1M+ tokens in Claude 4.6, 10M tokens in Llama 4 Scout) allow agents to understand large codebases holistically
