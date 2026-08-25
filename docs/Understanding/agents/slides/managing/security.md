---
title: Agent Security
description: Threat models, attack vectors, and defences for AI agent deployments
---

# Agent Security

As agents gain access to tools, APIs, databases, and financial systems, the security surface expands dramatically. This page covers the primary threat categories and mitigation approaches.

## The Agent Security Threat Model

Agents differ from traditional software in their attack surface:

- **Prompt injection** — malicious content in retrieved data or tool outputs can hijack agent behaviour
- **Tool abuse** — an agent with write access can be manipulated into destructive actions
- **Data exfiltration** — agents with memory access can be prompted to leak sensitive context
- **Indirect instruction** — attackers embed instructions in web pages, emails, or documents that the agent will process

!!! warning "2025 statistics"
    Around 35% of real-world AI security incidents in 2025 were triggered by a simple prompt alone, no exploit code required, per Adversa AI's threat report. Agentic AI caused the most dangerous failures — including crypto thefts, API abuses, and legal disasters. Documented financial losses from GenAI security breaches exceeded \$2.3B across 2023–2025.

    !!! info "Source"
        [Gen AI Security Breaches Timeline 2023–2025](https://wald.ai/blog/gen-ai-security-breaches-timeline-20232025-recurring-mistakes-are-the-real-threat); Adversa AI 2025 threat report

## Prompt Injection Defences

1. **Separate trusted from untrusted content** — system prompts (trusted) should be structurally distinct from user/retrieved content (untrusted)
2. **Use structured tool schemas** — MCP v3's structured outputs make it harder to inject instructions through tool responses
3. **Validate outputs** — the OpenAI Agents SDK's Guardrails primitive validates agent outputs before passing them downstream
4. **Sandbox tool execution** — tools should have the minimum permissions required (principle of least privilege)

## Agentic Access Control

- Grant agents scoped credentials (OAuth with minimum scopes via MCP v3's mandatory OAuth)
- Never give agents permanent write access to production systems without approval checkpoints
- Implement rate limiting on tool calls to prevent runaway agentic loops

## Human-in-the-Loop for High-Risk Actions

Define action categories that always require human approval:

| Risk level | Example actions | Control |
|------------|----------------|---------|
| Low | Read-only queries, drafting | Agent autonomous |
| Medium | Sending emails, creating records | Log and notify |
| High | Financial transactions, code deployment | Explicit approval required |
| Critical | Data deletion, system configuration | Two-person approval |

## Key Resources

!!! note "[OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)"
    The primary reference for LLM and agent security vulnerabilities, including prompt injection (LLM01) and insecure output handling (LLM02).
