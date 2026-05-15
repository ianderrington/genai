---
title: EU AI Act — Compliance Guide for AI Builders
description: What the EU AI Act means for organisations building or deploying AI systems, broken down by risk tier and timeline
---

# EU AI Act — Compliance Guide for AI Builders

The EU AI Act is the world's first comprehensive AI regulatory framework with binding legal force. It passed the European Parliament in March 2024, entered into force August 1, 2024, and became progressively enforceable from February 2025. If you build or deploy AI systems for any audience that includes EU residents — regardless of where your company is incorporated — the Act applies to you.

This guide cuts through the legal language to explain what you actually need to do, organised by risk tier.

## The Core Architecture: Risk Tiers

The Act classifies AI systems into four risk categories. Your obligations depend entirely on which tier your system falls into.

### Unacceptable Risk — Prohibited (in force from February 2, 2025)

These systems are banned outright:

- **Cognitive behavioural manipulation** of vulnerable groups — AI systems that exploit psychological weaknesses to influence behaviour in harmful ways
- **Social scoring by public authorities** — general-purpose scoring of citizens based on social behaviour or personal characteristics
- **Real-time remote biometric identification** in public spaces by law enforcement — with narrow exceptions for specific crimes
- **Emotion recognition in workplaces and educational institutions** — with limited exceptions
- **Biometric categorisation** by protected characteristics (race, political opinions, religion, sexual orientation)
- **Predictive policing** based solely on profiling or personality traits
- **Manipulation of individuals without awareness** — subliminal techniques

If your system falls here: it cannot be deployed in the EU, full stop.

### High-Risk AI Systems — Significant Obligations

High-risk systems can be deployed but face mandatory conformity assessment, documentation, human oversight, and incident reporting requirements. The categories cover:

- **Critical infrastructure** — AI in water, energy, transport, financial networks
- **Education and employment** — admissions systems, hiring/firing decisions, performance evaluation
- **Essential services** — creditworthiness assessment, insurance risk, emergency services prioritisation
- **Law enforcement** — risk assessment, polygraphs, evidence evaluation
- **Migration and asylum** — border control, visa applications, asylum assessment
- **Administration of justice** — judicial decision assistance
- **Biometric systems** — remote identification, emotion recognition, categorisation (with exceptions)

**Key obligations for high-risk systems:**

1. **Risk management system** — ongoing process covering design, testing, and post-deployment monitoring
2. **Data governance** — training data must be documented; bias testing is mandatory
3. **Technical documentation** — system card covering architecture, capabilities, limitations, and evaluation results
4. **Logging and audit trails** — automatic logging of operations sufficient for post-incident forensic analysis
5. **Transparency to users** — users must be informed they are interacting with an AI system; human oversight mechanisms must be provided
6. **Human oversight by design** — operators must be able to intervene, override, or stop the system
7. **Accuracy, robustness, and cybersecurity** — measurable performance metrics; adversarial testing

**Conformity assessment**: High-risk systems typically require third-party conformity assessment or self-assessment against harmonised standards before market placement.

### GPAI Models — General Purpose AI Obligations (in force from August 2, 2025)

General Purpose AI models — foundation models like GPT-5, Claude, Gemini, and Llama 4 — face their own obligation tier regardless of the risk category of downstream applications. Any model trained on more than 10^25 FLOPs falls under systemic risk provisions.

**GPAI obligations for all providers:**
- **Technical documentation** of model training, capabilities, and limitations
- **Copyright compliance documentation** covering training data
- **AI-generated content labelling** — GPAI-generated content must be machine-readable as such
- **Cooperation with downstream deployers** — providers must give deployers the information they need to comply with their own tier obligations

**Additional obligations for systemic-risk GPAI models** (>10^25 FLOPs):
- **Adversarial testing and red-teaming** before deployment
- **Incident reporting** to the European AI Office — serious incidents affecting health, safety, fundamental rights, or security
- **Cybersecurity measures** for the model and serving infrastructure
- **Energy consumption reporting**

As a practical matter: if you are calling a GPAI API (OpenAI, Anthropic, Google) rather than building a frontier model yourself, the GPAI obligations fall on the provider, not you. Your obligations are determined by the risk tier of your *application* built on top.

### Limited and Minimal Risk

Most AI applications fall here. Obligations are primarily **transparency** requirements:

- **Chatbots and conversational AI** — users must know they are talking to an AI (unless obvious from context)
- **Deepfake generation** — AI-generated synthetic media must be labelled
- **Emotion recognition and biometric categorisation** — transparency notices required

There are no mandatory conformity assessments or registration requirements for limited-risk systems.

## Enforcement Timeline

| Date | What takes effect |
|------|-------------------|
| August 1, 2024 | Act enters into force |
| February 2, 2025 | Unacceptable risk prohibitions; AI literacy obligations for organisations |
| August 2, 2025 | GPAI model obligations |
| August 2, 2026 | High-risk AI systems listed in Annex I (safety components); codes of practice finalised |
| **December 2027** | High-risk AI in Annex III (employment, critical infrastructure, biometrics, etc.) — *timeline adjusted by 2025 Omnibus* |
| **August 2028** | AI in regulated products covered by existing safety legislation — *adjusted by Omnibus* |

**The 2025 Omnibus Adjustment**: On November 19, 2025, the EU adopted a proposal to simplify and streamline AI Act obligations. A political agreement was reached May 7, 2026. The Omnibus extended the Annex III high-risk timeline to December 2027 (from February 2026) and reduced compliance burden for mid-market companies. GPAI obligations were not delayed.

## What You Need to Do Now

**If you are a foundation model provider serving EU users:**
- GPAI documentation requirements are live (August 2025)
- Establish incident reporting procedures to the European AI Office
- Red-teaming reports should be in place for systemic-risk models

**If you are deploying a high-risk application:**
- Start your risk management system and technical documentation now — the December 2027 deadline is closer than it looks for complex systems
- Map your system against the Annex III categories honestly
- Begin logging and audit trail infrastructure

**If you are building a general AI product (chatbot, assistant, recommendation system):**
- Ensure users know they are interacting with AI
- Label AI-generated content
- Review your training data for copyright provenance

**If you are uncertain about your risk tier:**
- The European AI Office has published guidance and a self-assessment tool
- Many law firms and compliance consultancies now offer EU AI Act risk assessments
- The Act's risk classification guidance is available at [digital-strategy.ec.europa.eu](https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence)

## Related Pages

- [AI Governance Overview](./index.md) — the broader regulatory landscape beyond the EU
- [Security, Compliance & Governance](../building_applications/security_compliance_and_governance/index.md) — technical implementation
- [Using GenAI Ethically](../../Using/ethically/index.md) — ethical frameworks
