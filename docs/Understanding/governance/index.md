---
title: AI Governance
description: Navigating the regulatory, ethical, and organisational frameworks that govern AI systems in 2025 and beyond
---

# AI Governance

AI governance sits at the intersection of law, ethics, and engineering. For anyone building or deploying AI systems today, it is no longer optional — it is a live compliance obligation. The EU AI Act's first tranche of rules became enforceable on February 2, 2025. GPAI model obligations affecting frontier model providers followed on August 2, 2025. In the US, executive policy shifted dramatically between administrations, reshaping the global regulatory landscape.

This section covers what you need to know to deploy AI responsibly and legally — from understanding which regulations apply to your systems, to the safety research that underpins responsible development, to the organisational frameworks that keep AI deployments auditable and correctable.

## Why Governance Matters Now

Governance was an academic concern in 2022. It became a compliance obligation in 2025.

The shift happened for several reasons:

1. **AI entered high-stakes domains** — healthcare decisions, credit scoring, hiring, law enforcement — where errors have concrete human costs.
2. **Agentic AI raised the stakes further** — agents that can take actions (book flights, send emails, execute code, move money) carry liability implications that passive chatbots did not.
3. **Regulation caught up** — the EU AI Act passed, the US established a national AI framework, and China extended its AI content regulations. The era of regulatory silence ended.
4. **Security incidents accumulated** — 2025 set new records for AI-related security incidents, including $2.3B+ in documented financial losses from GenAI breaches between 2023–2025.

## Key Regulatory Frameworks

### EU AI Act

The most comprehensive AI regulatory framework currently in force. The Act classifies AI systems by risk tier — Unacceptable, High-Risk, Limited-Risk, and Minimal-Risk — with obligations scaling accordingly. GPAI (General Purpose AI) model providers face their own tier of obligations covering transparency, capability evaluations, and incident reporting.

**Key enforcement dates:**
- February 2, 2025 — first tranche of prohibitions and AI literacy requirements
- August 2, 2025 — GPAI model obligations (affects foundation model providers)
- December 2027 — high-risk AI system rules for biometrics, critical infrastructure, employment (adjusted by the 2025 Omnibus)
- August 2028 — product-integrated AI systems under the Omnibus simplification

See [EU AI Act](./eu-ai-act.md) for the full breakdown.

### US Executive Orders and National Framework

US AI policy shifted significantly in 2025. Biden's October 2023 AI Executive Order — which emphasised safety evaluations and reporting requirements for frontier models — was repealed in January 2025. The Trump administration's AI Action Plan (July 2025) prioritised competitiveness, data centre permitting, and US AI exports. A December 2025 EO established a national AI framework that preempts state-level AI regulations, creating a single federal standard.

The practical impact for US organisations: fewer federal reporting requirements for model developers, but continued state-level activity in California, Colorado, and Texas that the federal EO may supersede.

### NIST AI Risk Management Framework

The NIST AI RMF (and its companion NIST AI 600-1 for generative AI) provides a voluntary but widely adopted framework for AI risk identification, measurement, and management. Unlike the EU AI Act, the NIST RMF is not legally binding — but it is increasingly referenced in procurement requirements, insurance underwriting, and sector-specific guidance (healthcare, finance, critical infrastructure).

## Safety Research and Red-Teaming

Governance is not only about external regulation — it also includes the internal practices organisations use to evaluate and control their AI systems before deployment.

**Prompt injection and adversarial inputs** are the most common attack vector against deployed AI systems. In 2025, prompt-based exploits accounted for 35% of all documented AI security incidents. Organisations deploying AI in customer-facing or agentic contexts need red-teaming protocols before launch.

**Alignment techniques** — RLHF, DPO, constitutional AI, and process reward models — shape how models behave relative to intended values. Understanding alignment is increasingly relevant not only for model developers but for organisations doing fine-tuning.

**Agentic AI safety** presents distinct challenges: an agent that can take real-world actions can cause irreversible harm if its task goals are misspecified. Human-in-the-loop controls, kill switches, and scope limitations are the current state of practice.

## Organisational Governance

Beyond regulatory compliance, effective AI governance includes the organisational practices that keep deployments auditable:

- **Model cards and system cards** — documentation of model capabilities, limitations, evaluation results, and intended use cases
- **AI incident registers** — tracking failures, near-misses, and unexpected outputs
- **Access controls for agentic systems** — which agents can take which actions, approved by whom
- **Ongoing monitoring** — model drift, distributional shift, and performance degradation in production

## In This Section

- [EU AI Act](./eu-ai-act.md) — risk tiers, GPAI obligations, compliance timeline, and what it means for builders
- [Building Applications: Security & Compliance](../building_applications/security_compliance_and_governance/index.md) — technical implementation of governance controls
- [Using GenAI Ethically](../../Using/ethically/index.md) — ethical frameworks and responsible use practices
