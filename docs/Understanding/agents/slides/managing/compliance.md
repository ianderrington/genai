---
title: Agent Compliance
description: Regulatory and policy requirements for deploying AI agents in enterprise contexts
---

# Agent Compliance

Deploying AI agents in regulated industries or EU/US enterprise contexts requires understanding the compliance landscape that came into force through 2025.

## EU AI Act — What Applies to Agents

The EU AI Act's first obligations took effect February 2, 2025. For AI agents, the key considerations:

- **AI literacy requirement** — organisations must ensure staff working with AI have sufficient literacy (effective February 2, 2025)
- **High-risk AI systems** — agents making decisions in employment, credit, critical infrastructure, or education contexts may qualify as high-risk, requiring conformity assessments, transparency documentation, and human oversight mechanisms
- **GPAI model obligations** — frontier model providers (affecting GPT-5, Claude 4.x, Gemini 2.5 family) face transparency and copyright obligations effective August 2, 2025

!!! important "Timeline note (May 2026)"
    An AI Omnibus simplification proposal was adopted November 2025 and reached political agreement May 7, 2026. High-risk system obligations for most sectors now apply from December 2027; product-integrated AI from August 2028. This gives enterprises more runway, but the AI literacy requirement is already live.

!!! info "Source"
    [EU AI Act enforcement timeline](https://artificialintelligenceact.eu/); [EU AI Omnibus Proposal](https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence)

## Human-in-the-Loop Requirements

For regulated decisions, design **explicit human review checkpoints** into agent workflows:

- Flag decisions above a risk threshold for human review before execution
- Log agent reasoning and the human review outcome for audit trails
- Ensure humans can override or halt agent actions at any point

## Agentic AI Security Incidents (2025)

2025 set records for AI security incidents. Key statistics relevant to agent compliance:

- Prompt-based exploits: 35% of all documented AI incidents
- Agentic AI caused the most dangerous failures (crypto thefts, API abuses, legal disasters)
- Financial losses from GenAI security breaches exceeded $2.3B across 2023–2025

!!! info "Source"
    [AI security incident statistics 2025, from ManaGen.ai research](../../../.supernal/docs/ai-landscape-research-2025-2026.md)

## Checklist for Agent Compliance Reviews

- [ ] Identify whether agent functions qualify as high-risk under EU AI Act
- [ ] Document agent capabilities, limitations, and training data provenance
- [ ] Implement input and output logging with configurable retention
- [ ] Design human escalation paths for sensitive decisions
- [ ] Test adversarial prompt injection resistance
- [ ] Establish incident response procedures for agent failures
