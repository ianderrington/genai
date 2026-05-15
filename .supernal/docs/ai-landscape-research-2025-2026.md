---
title: AI Landscape Research 2025-2026
created: 2026-05-14
type: research
purpose: Content audit and gap analysis for ManaGen.ai knowledge hub (pitch deck support)
period_covered: January 2025 – May 2026
---

# AI Landscape Research 2025–2026

> Research compiled May 2026 for the ManaGen.ai content refresh project. The site has been largely static since March 2025. This document catalogues every significant AI development that has occurred since then and maps each to the existing site structure, followed by a gap analysis identifying the highest-priority new content.

---

## 1. Foundation Models

### 1.1 DeepSeek-R1 and V3 Family
- **Date:** January 2025 (R1); December 2024 (V3)
- **Description:** DeepSeek released R1 on January 20, 2025 under the MIT License — a 671B parameter MoE reasoning model that directly competes with OpenAI o1 on math and coding benchmarks, at a fraction of the compute cost. DeepSeek-V3.1, released August 2025, merged the V3 and R1 architectures into a single hybrid model.
- **Why it matters:** Proved that frontier-class reasoning is achievable open-source, triggering a global re-evaluation of closed-model pricing and democratising access to chain-of-thought capabilities. Directly relevant to understanding inference cost economics.
- **Site section:** `Understanding/architectures/models/` and `Understanding/overview/gen_ai/`

### 1.2 Gemini 2.0 Flash / Pro
- **Date:** December 2024 preview; February 2025 GA
- **Description:** Google released Gemini 2.0 Flash as the default Gemini model on January 30, 2025, followed by Gemini 2.0 Pro on February 5, 2025. Both feature a 2M-token context window, native tool use, and multimodal input/output. Flash-Lite, the most cost-efficient variant, launched in public preview simultaneously.
- **Why it matters:** Set a new standard for cost-to-performance ratio in multimodal models and mainstreamed multi-million token context windows for production use.
- **Site section:** `Understanding/architectures/models/`

### 1.3 Gemini 2.5 Pro / Flash (Deep Think)
- **Date:** May 2025 (Google I/O); GA June 2025
- **Description:** Gemini 2.5 Pro with Deep Think introduced an experimental extended-reasoning mode that scored 84.0% on MMMU and led LiveCodeBench. Flash 2.5 reduced token usage by 20–30% versus prior versions while matching Pro on many tasks.
- **Why it matters:** Google's first explicit "thinking model" tier, validating test-time compute as a competitive differentiator outside of OpenAI.
- **Site section:** `Understanding/architectures/models/` and `Understanding/architectures/optimizing/`

### 1.4 GPT-4.5 and GPT-4o Variants
- **Date:** Early 2025 (4.5 preview); throughout 2025
- **Description:** OpenAI released GPT-4.5 as a large pre-training scaling experiment emphasising pattern recognition and creative insight without chain-of-thought. Multiple GPT-4o snapshot variants (4o-mini, 4o with vision, 4o audio) shipped throughout early 2025.
- **Why it matters:** Demonstrated that traditional pre-training scaling still yields improvements distinct from reasoning-time scaling, keeping both tracks active.
- **Site section:** `Understanding/architectures/models/`

### 1.5 GPT-5
- **Date:** August 7, 2025
- **Description:** OpenAI's flagship unified model integrates a fast-path model and a deep-thinking mode, with a real-time router selecting between them. Achieved 94.6% on AIME 2025, 74.9% on SWE-bench Verified, and 84.2% on MMMU. Factual error rate is ~80% lower than o3 on anonymised production traffic.
- **Why it matters:** The single most-anticipated model release of the cycle; sets the new baseline for general-purpose AI capability and redefines enterprise SLA expectations.
- **Site section:** `Understanding/architectures/models/` and `Understanding/overview/gen_ai/`

### 1.6 GPT-5.2 / 5.5
- **Date:** December 2025 (5.2); April 23, 2026 (5.5)
- **Description:** GPT-5.2 introduced long-context emphasis, reasoning tokens, and agentic workflow support. GPT-5.5 (April 2026) is OpenAI's current API-available flagship, focusing on structured professional knowledge work.
- **Why it matters:** Each iteration narrowed the gap between GPT-class capability and enterprise deployment requirements; the 5.x versioning scheme signals a shift to incremental refinement over major version jumps.
- **Site section:** `Understanding/architectures/models/`

### 1.7 Claude 4 (Sonnet 4, Opus 4)
- **Date:** May 2025
- **Description:** Anthropic launched the Claude 4 generation with professional-grade coding capabilities. Opus 4 is positioned for complex reasoning and long-running agent workflows; Sonnet 4 became the primary workhorse model.
- **Why it matters:** Marked the moment Claude became a credible alternative to GPT-4-class models for enterprise software development workflows.
- **Site section:** `Understanding/architectures/models/`

### 1.8 Claude 4.5 and 4.6 Releases
- **Date:** October 2025 (Haiku 4.5); November 2025 (Opus 4.5); February 2026 (Sonnet 4.6)
- **Description:** Haiku 4.5 targeted cost-sensitive deployments. Opus 4.5 (November 24, 2025) added spreadsheet and workplace task improvements. Sonnet 4.6 (February 17, 2026) was the first Sonnet to outperform the prior-gen Opus in coding evaluations; Opus 4.6 and Sonnet 4.6 reached a 1M-token GA context window at standard pricing.
- **Why it matters:** Established Anthropic's tiered model strategy and demonstrated that mid-tier models can eclipse prior flagships — directly relevant to enterprise model-selection decisions.
- **Site section:** `Understanding/architectures/models/`

### 1.9 Meta Llama 4 (Scout, Maverick)
- **Date:** April 5, 2025
- **Description:** Llama 4 launched as a natively multimodal family. Scout (17B active / 16 experts, 10M context window) and Maverick (17B active / 128 experts, 1M context) were the headline models; Maverick beat GPT-4o and Gemini 2.0 Flash on broad benchmarks.
- **Why it matters:** The largest open-weight multimodal release in the period; the 10M-token context window in Scout pushed the open-source frontier substantially forward.
- **Site section:** `Understanding/architectures/models/` and `Understanding/architectures/generating/`

### 1.10 Qwen 2.5 / 2.5-VL / 2.5-Omni
- **Date:** November 2024 (2.5); January 2025 (2.5-VL); March 2025 (2.5-Omni)
- **Description:** Qwen 2.5 was described at launch as potentially "the largest open-source release in history" — ranging from 7B to 72B parameters. Qwen 2.5-VL added vision. Qwen 2.5-Omni (released March 26, 2025, Apache 2.0) added real-time audio, video, and streaming speech output.
- **Why it matters:** Alibaba's rapid iteration demonstrated that non-Western open-source labs were converging with Western closed models; Omni made true multimodal open-source realistic for production.
- **Site section:** `Understanding/architectures/models/`

### 1.11 Qwen3
- **Date:** April 29, 2025 (release); May 14, 2025 (technical report)
- **Description:** Alibaba launched Qwen3 with six dense models (0.6B–32B) and two MoE models (30B/3B active; 235B/22B active). The headline innovation is a unified thinking/non-thinking mode: developers can switch between deep reasoning and rapid response within the same model, with configurable thinking-token budgets up to 38K.
- **Why it matters:** Hybrid thinking/non-thinking in a single deployment simplifies cost management for applications that need both fast and slow reasoning paths.
- **Site section:** `Understanding/architectures/models/` and `Understanding/architectures/optimizing/`

### 1.12 Grok 3 (xAI)
- **Date:** February 17, 2025
- **Description:** xAI released Grok 3, trained with 10× the compute of Grok 2 on the 200,000-GPU Colossus cluster. Included Grok 3 Reasoning and Grok 3 mini Reasoning variants, directly competing with o3-mini and DeepSeek R1.
- **Why it matters:** Validated the compute-concentration thesis: very large single training runs on proprietary hardware can produce competitive frontier models.
- **Site section:** `Understanding/architectures/models/`

### 1.13 Microsoft Phi-4 Family
- **Date:** January 2025 (Phi-4 base); February 2025 (Phi-4-multimodal); May 2025 (Phi-4-reasoning variants)
- **Description:** Phi-4 (14B parameters) outperforms larger models on math reasoning through high-quality synthetic data. Phi-4-reasoning-plus (released May 2025) beats DeepSeek-R1 671B on AIME 2025 despite being orders of magnitude smaller. Available on Snapdragon Copilot+ PCs.
- **Why it matters:** Demonstrated definitively that synthetic training data and post-training innovations can substitute for raw scale; key for on-device and edge AI deployment strategies.
- **Site section:** `Understanding/architectures/models/` and `Understanding/architectures/optimizing/`

### 1.14 Mistral Releases (Medium 3, Magistral, Large 3)
- **Date:** May 7, 2025 (Medium 3); June 10, 2025 (Magistral); December 2, 2025 (Large 3)
- **Description:** Mistral Medium 3 positioned as a cost-effective mid-tier; Magistral Small (open-source) and Magistral Medium introduced chain-of-thought reasoning for European labs. Mistral Large 3 (December 2025) is a 675B MoE model with 41B active parameters.
- **Why it matters:** Europe's leading open-source AI lab demonstrating that EU-domiciled models can reach frontier parity — critical for GDPR-compliant and data-sovereign enterprise deployments.
- **Site section:** `Understanding/architectures/models/`

---

## 2. Reasoning and Test-Time Compute

### 2.1 OpenAI o3-mini
- **Date:** January 31, 2025
- **Description:** OpenAI released o3-mini as a cost-efficient reasoning model designed to pause and work through questions step-by-step. Preceded the full o3 release, giving developers an affordable entry point into the o-series reasoning tier.
- **Why it matters:** Proved that test-time compute gains could be delivered at commodity inference costs, not just at o3 High's $1,000+/task price point.
- **Site section:** `Understanding/architectures/models/` and `Understanding/architectures/optimizing/`

### 2.2 OpenAI o3 / o4-mini
- **Date:** April 16, 2025
- **Description:** Full o3 released alongside o4-mini. o3 scored 88% on ARC-AGI (versus o1's 32%) and is described by OpenAI as its most advanced reasoning model at time of release. Both models are the first in the o-series to support multimodal reasoning — they can "think with images," analysing diagrams and whiteboard sketches within the chain-of-thought phase. o4-mini delivers comparable performance at significantly lower cost.
- **Why it matters:** The multimodal thinking capability is qualitatively new: reasoning is no longer purely linguistic. This reshapes assumptions about which tasks require reasoning models.
- **Site section:** `Understanding/architectures/models/` and `Understanding/architectures/optimizing/`

### 2.3 DeepSeek-R1-0528 Upgrade
- **Date:** May 2025
- **Description:** DeepSeek released a major update to R1 built on the same V3 Base but with substantially more compute applied to post-training. Pushed reasoning and inference capabilities further, reducing errors on complex multi-step problems.
- **Why it matters:** Showed that open-source reasoning models can receive the same iterative post-training improvements as closed proprietary models.
- **Site section:** `Understanding/architectures/optimizing/`

### 2.4 Inference Scaling Laws for Reasoning
- **Date:** Ongoing through 2025; formalised in multiple papers
- **Description:** The research community established that test-time compute (inference compute scaling) follows its own scaling laws distinct from pre-training. Studies confirmed that models can trade inference FLOPs for accuracy, but that this approach is not yet effective for knowledge-intensive tasks requiring high factual accuracy.
- **Why it matters:** Fundamentally changes how teams should budget compute: the answer to "is this model good enough?" now depends on how much inference compute you are willing to spend, not just which model you chose at training time.
- **Site section:** `Understanding/architectures/optimizing/` and `Understanding/overview/gen_ai/going_deeper/`

### 2.5 Process Reward Models (PRM) and Step-Level Supervision
- **Date:** Throughout 2025 (PRM800K and derivatives widely adopted)
- **Description:** Process supervision — providing feedback on individual reasoning steps rather than only final answers — became a mainstream training technique. Datasets like PRM800K (800,000 step-level labels) demonstrably outperform outcome supervision and improve reasoning interpretability.
- **Why it matters:** Explains why reasoning models behave more reliably and provides a lever for reducing "correct conclusion, wrong reasoning" hallucinations in agentic deployments.
- **Site section:** `Understanding/architectures/training/`

---

## 3. Agentic AI

### 3.1 OpenAI Operator
- **Date:** January 23, 2025 (Pro preview); integrated into ChatGPT as Agent Mode, July 2025
- **Description:** Operator launched as a standalone research preview powered by the Computer-Using Agent (CUA) model — a GPT-4o vision model with RL-trained action prediction. It could autonomously browse the web, fill forms, and complete multi-step browser tasks. After reliability issues (CAPTCHAs, complex JS) led to its standalone shutdown (August 31, 2025), the technology was reintegrated as ChatGPT Agent Mode.
- **Why it matters:** The first widely-available commercial computer-use agent from a major lab; established the pattern of perception-reasoning-action loops as a product category.
- **Site section:** `Understanding/agents/examples/commercial/`

### 3.2 Anthropic Claude Computer Use (Beta → Research Preview GA)
- **Date:** October 2024 (public beta); March 23, 2026 (Research Preview GA)
- **Description:** Claude 3.5 Sonnet became the first frontier model to offer computer use in public beta, scoring 14.9% on OSWorld (versus 7.8% for the next-best system). The Claude Computer Use Agent reached a broader research preview GA on March 23, 2026, giving Claude the ability to see, navigate, and control a user's desktop.
- **Why it matters:** Anthropic's careful staged rollout established a safety-first model for computer-use agents that influenced competitor approaches and enterprise risk frameworks.
- **Site section:** `Understanding/agents/examples/commercial/` and `Understanding/agents/building_agents/`

### 3.3 OpenAI Agents SDK (Swarm replacement)
- **Date:** March 2025
- **Description:** OpenAI replaced the experimental Swarm framework with the production-grade Agents SDK, featuring three built-in primitives: Handoffs (agent-to-agent transfer), Guardrails (input/output validation), and Tracing (end-to-end observability). Python-first.
- **Why it matters:** Marked OpenAI's shift from experimentation to production-grade multi-agent infrastructure, giving enterprises a supported path to deploying agent networks.
- **Site section:** `Understanding/agents/building_agents/libraries_and_tools/`

### 3.4 Google Agent Development Kit (ADK) and A2A Protocol
- **Date:** April 9, 2025 (A2A announced at Google Cloud Next); ADK shipped same quarter
- **Description:** Google released ADK as a hierarchical agent framework (root agent delegates to sub-agents) alongside the Agent2Agent (A2A) protocol — an open standard for cross-vendor agent interoperability built on HTTP/JSON-RPC/SSE. Launched with 50+ technology partners; transferred to the Linux Foundation. By April 2026, 150+ organisations adopted A2A.
- **Why it matters:** A2A is the first industry-wide protocol for agent interoperability, analogous to what HTTP did for the web. Alongside Anthropic's MCP, it defines the emerging infrastructure layer for multi-agent systems.
- **Site section:** `Understanding/agents/building_agents/agent_infrastructure/` and `Understanding/agents/systems/`

### 3.5 Model Context Protocol (MCP) Ecosystem Growth
- **Date:** November 2024 (launch); 2025 (ecosystem expansion); December 2025 (donated to Linux Foundation)
- **Description:** Anthropic's MCP open standard for connecting LLMs to external tools and data sources reached 97 million monthly SDK downloads, 10,000+ active MCP servers in production, and hundreds of distinct AI clients by December 2025. MCP v3 (June 2025) added mandatory OAuth, structured tool outputs, and richer security primitives. In December 2025, Anthropic donated MCP to the Agentic AI Foundation (AAIF) under the Linux Foundation, co-founded with Block and OpenAI.
- **Why it matters:** MCP has become the de-facto standard for tool integration — the USB of AI agents. Any enterprise building agentic systems needs to understand it.
- **Site section:** `Understanding/agents/building_agents/agent_infrastructure/` and `Understanding/agents/components/actions_and_tools/`

### 3.6 LangGraph Maturation
- **Date:** Multiple major versions throughout 2025
- **Description:** LangGraph (graph-based stateful agent framework from LangChain team) matured through several production iterations, becoming one of the two dominant enterprise agent frameworks alongside CrewAI. Supports explicit state management, checkpointing, and complex multi-agent control flows.
- **Why it matters:** LangGraph's graph-based paradigm — versus role-based (CrewAI) or handoff-based (OpenAI SDK) — is the most expressive for complex orchestration logic; a critical choice point for engineering teams.
- **Site section:** `Understanding/agents/building_agents/libraries_and_tools/`

### 3.7 Google ADK Deep Research and NotebookLM Deep Research
- **Date:** November 2025 (NotebookLM Deep Research)
- **Description:** NotebookLM transitioned from a RAG retrieval tool to an "Agentic Researcher" through its Deep Research feature — actively seeking, synthesising, and cross-referencing information from external sources. NotebookLM Plus launched for enterprise via Google Workspace.
- **Why it matters:** Demonstrated that consumer-facing agentic research tools had crossed a usability threshold, driving mainstream adoption of agentic workflows outside developer circles.
- **Site section:** `Understanding/agents/examples/commercial/`

---

## 4. Multimodal AI

### 4.1 GPT-4o Native Image Generation (replaces DALL-E 3)
- **Date:** March 2025
- **Description:** OpenAI replaced DALL-E 3 with GPT-4o's native image generation — a fundamental reimagining where image creation is tightly integrated with language understanding rather than being a separate model call. Produces significantly more accurate text-in-image rendering and better contextual coherence.
- **Why it matters:** The shift from pipeline-based (text→image model) to unified-model generation is architecturally significant; it previews the end-state of fully integrated multimodal generation.
- **Site section:** `Understanding/architectures/generating/`

### 4.2 Sora and Sora 2 (OpenAI)
- **Date:** Late 2024 (Sora public); 2025 (Sora 2)
- **Description:** OpenAI's text-to-video model made available to the public, followed by Sora 2 with improved photorealism, physics accuracy, and controllability. Sora 2 generates 30–60 second clips in 15–35 seconds at $0.10–$0.50/second; video-only (no audio generation). Positioned as a creative filmmaking tool.
- **Why it matters:** Established commercially available high-quality video generation; demonstrated the content creation disruption potential of multimodal generative AI.
- **Site section:** `Understanding/architectures/generating/`

### 4.3 Google Veo 2 and Veo 3
- **Date:** 2025 (Veo 2); May 2025 (Veo 3)
- **Description:** Google's Veo 3 generates cinematic videos over one minute long with fully integrated audio (ambient sound, dialogue, effects) — the first major model to produce synchronised audio+video natively. Generated 70+ million videos within months of launch.
- **Why it matters:** Veo 3's native audio integration is a major leap over Sora 2's video-only output; the audio-video integration problem is now solved at the infrastructure level, not in post-production.
- **Site section:** `Understanding/architectures/generating/`

### 4.4 FLUX.1 Family (Black Forest Labs)
- **Date:** August 2024 (launch); January 2025 (NVIDIA partnership); May 2025 (Flux.1 Kontext); November 2025 (Flux.2)
- **Description:** FLUX.1 from Black Forest Labs (founded by former Stability AI researchers) is a 12B-parameter rectified flow transformer family that matches Midjourney V6 quality. FLUX.1 schnell is Apache 2.0 open source. Flux.1 Kontext (May 29, 2025) enables in-context image editing from text+image prompts. Flux.2 (November 2025) extended the Pro/Dev/Klein lineup with NVIDIA Blackwell integration.
- **Why it matters:** The dominant open-weight image generation model; the Kontext capability (edit images with reference images + text) unlocked product design and visual iteration workflows.
- **Site section:** `Understanding/architectures/generating/`

### 4.5 Midjourney V7 and First Video Model
- **Date:** January/February 2025 (V7); June 2025 (video model V1)
- **Description:** Midjourney V7 introduced faster processing, improved photorealism, and more precise prompt interpretation. In June 2025, Midjourney launched its first video model, allowing users to animate images into 5-second motion clips at approximately 25× lower cost than competing AI video services.
- **Why it matters:** Midjourney's video launch signals that the best image generation platforms are converging toward full media generation, collapsing the image/video tool distinction.
- **Site section:** `Understanding/architectures/generating/`

### 4.6 Llama 4 Multimodal Architecture
- **Date:** April 5, 2025
- **Description:** Llama 4's Scout and Maverick models are natively multimodal from architecture level (not post-hoc adapter), supporting text, images, and video input. The 10M-token Scout context window is the largest production-available open-weight context at time of writing.
- **Why it matters:** Native multimodality in open-weight models closes a major capability gap with closed frontier models, enabling self-hosted multimodal applications.
- **Site section:** `Understanding/architectures/models/` and `Understanding/architectures/generating/`

### 4.7 Qwen 2.5-Omni Real-Time Multimodal
- **Date:** March 26, 2025
- **Description:** Qwen 2.5-Omni (Apache 2.0) processes text, images, audio, and video simultaneously while generating streaming text and natural speech simultaneously — all in a 7B open-weight package.
- **Why it matters:** The first open-source model to combine all four modalities (text/image/audio/video in + text/speech out) in a streaming architecture; a proof point for edge multimodal AI.
- **Site section:** `Understanding/architectures/generating/` and `Understanding/architectures/models/`

---

## 5. Infrastructure and Tooling

### 5.1 vLLM V1 Refactor
- **Date:** December 2024 – January 2025
- **Description:** vLLM unveiled its V1 architecture refactor, reducing latency ~5× and improving throughput ~2.7× via CPU-scheduling optimisations. Experienced explosive adoption growth following DeepSeek V3/R1's release, becoming the default serving framework for open-weight models.
- **Why it matters:** vLLM is the infrastructure layer beneath most production open-weight deployments; teams need to understand its architecture to reason about cost and latency trade-offs.
- **Site section:** `Understanding/building_applications/back_end/llm_ops/`

### 5.2 SGLang Performance Leadership
- **Date:** Ongoing improvements through 2025; TPU backend October 2025; video/image diffusion January 2026
- **Description:** SGLang (Stanford) achieved 16,215 tok/s throughput versus vLLM's 12,553 tok/s on identical H100 workloads — a 29% advantage. Added day-one support for DeepSeek V3/R1, native TPU execution via SGLang-Jax backend (October 2025), and diffusion model acceleration for image/video generation (January 2026).
- **Why it matters:** SGLang's performance advantage is significant enough to materially change economics at scale; the TPU support opens Google Cloud as a serving platform for open-weight models.
- **Site section:** `Understanding/building_applications/back_end/llm_ops/`

### 5.3 Model Context Protocol (MCP) as Infrastructure Standard
- **Date:** November 2024 (launch); 2025 (standardisation)
- **Description:** See section 3.5 above. MCP grew to 97M monthly SDK downloads and 10,000+ production servers. The MCP v3 spec formalised OAuth requirements, structured outputs, and security primitives.
- **Why it matters for infrastructure:** MCP is now the tool-integration substrate; any RAG pipeline, agent framework, or enterprise system needs an MCP integration story.
- **Site section:** `Understanding/agents/building_agents/agent_infrastructure/`

### 5.4 Quantization and Distillation at Scale
- **Date:** Advances throughout 2025; formalised in NVIDIA GTC 2025 sessions
- **Description:** Post-training quantization (INT8, INT4, FP8) and knowledge distillation matured into standard production techniques. Quantization can shrink models 75%+ with minimal accuracy loss; distillation enables student models achieving 90–95% of teacher performance. NVIDIA TensorRT Model Optimizer made pruning+distillation accessible for mainstream LLMs.
- **Why it matters:** These techniques are the primary levers for reducing inference cost; any enterprise deploying models at scale needs to understand the accuracy/cost trade-off curves.
- **Site section:** `Understanding/architectures/optimizing/` and `Understanding/building_applications/back_end/llm_ops/`

### 5.5 Agentic Frameworks Landscape Consolidation
- **Date:** Throughout 2025
- **Description:** The multi-agent framework landscape consolidated around six production-grade options: LangGraph (graph/stateful), CrewAI (role-based), OpenAI Agents SDK (handoff-based), Google ADK (hierarchical tree + A2A), AutoGen (conversational, Microsoft), and Anthropic Agent SDK. Each reflects a fundamentally different philosophy on coordination.
- **Why it matters:** Framework choice has deep architectural implications; teams that pick the wrong framework for their coordination model face expensive rewrites. A comparison guide is essential.
- **Site section:** `Understanding/agents/building_agents/libraries_and_tools/`

---

## 6. AI Governance and Regulation

### 6.1 EU AI Act — First Obligations Take Effect
- **Date:** February 2, 2025
- **Description:** The first tranche of EU AI Act obligations became enforceable on February 2, 2025, prohibiting certain AI practices and mandating AI literacy in organisations. GPAI model obligations (affecting frontier model providers) took effect August 2, 2025.
- **Why it matters:** The most comprehensive AI regulatory framework in force; every European enterprise or company serving EU customers must now understand high-risk classifications, GPAI obligations, and compliance timelines.
- **Site section:** `Understanding/building_applications/security_compliance_and_governance/`

### 6.2 EU AI Omnibus Proposal and AI Act Simplification
- **Date:** November 19, 2025 (proposal adopted); May 7, 2026 (political agreement)
- **Description:** The EU adopted an AI Omnibus proposal to simplify and streamline the AI Act's obligations. A political agreement was reached May 7, 2026. High-risk AI system rules for biometrics, critical infrastructure, education, employment, and migration will now apply from December 2027; product-integrated AI systems from August 2028.
- **Why it matters:** The timeline adjustments give enterprises more runway; the simplification reduces compliance burden for mid-market companies and clarifies GPAI provider obligations.
- **Site section:** `Understanding/building_applications/security_compliance_and_governance/`

### 6.3 EU AI Continent Action Plan
- **Date:** April 2025
- **Description:** The European Commission's AI Continent Action Plan set out a strategy for large-scale AI data and computing infrastructure, high-quality data access, and AI adoption in strategic sectors (healthcare, education, industry). Explicitly targets European AI competitiveness as a counterweight to US and Chinese AI dominance.
- **Why it matters:** Signals European sovereign AI infrastructure investment; relevant for organisations evaluating EU-based model hosting and data residency.
- **Site section:** `Understanding/building_applications/security_compliance_and_governance/`

### 6.4 US Stargate Project and AI Executive Orders
- **Date:** January 21, 2025 (Stargate); July 2025 (AI Action Plan executive orders); December 2025 (national framework EO)
- **Description:** President Trump announced Project Stargate — a $500B+ AI infrastructure investment by SoftBank, OpenAI, and Oracle — on his first full week in office. Biden's October 2023 AI EO was repealed. July 2025 executive orders accelerated data centre permitting, promoted US AI exports, and blocked "woke AI" in federal contracts. A December 2025 EO established a national AI framework preempting state-level AI regulations.
- **Why it matters:** The US regulatory posture shifted from safety-oriented (Biden) to competitiveness-oriented (Trump); this reshapes the global regulatory landscape and changes compliance calculus for US companies.
- **Site section:** `Understanding/building_applications/security_compliance_and_governance/`

### 6.5 AI Safety Incidents — Agentic Failures and Prompt Injection
- **Date:** Throughout 2025
- **Description:** 2025 set new records for AI security incidents. Prompt-based exploits accounted for 35% of all documented incidents; agentic AI caused the most dangerous failures (crypto thefts, API abuses, legal disasters). Financial losses from Gen AI security breaches exceeded $2.3B across 2023–2025. Voice cloning attacks (3–5 seconds of audio required) caused high-profile financial fraud including a ~€1M impersonation of an Italian Defence Minister.
- **Why it matters:** As agents gain access to systems and financial infrastructure, the attack surface and consequence severity increase dramatically. Organisations managing GenAI deployments need updated threat models.
- **Site section:** `Understanding/building_applications/security_compliance_and_governance/` and `Understanding/prompting/security/`

### 6.6 Anthropic Economic Index
- **Date:** Launched 2025; reports throughout 2025–2026
- **Description:** Anthropic launched the Economic Index to empirically track AI's actual labour market impact. Findings: AI use remains concentrated in specific countries and occupations; more complex tasks were sped up most (12× speed-up for tasks requiring college-degree-level prompts); limited evidence of employment effects to date; projected productivity growth of 1.0–1.2 pp annually after reliability adjustments.
- **Why it matters:** Provides empirical grounding for the "AI will replace jobs" debate; the complexity-weighted productivity findings are directly useful for enterprise AI prioritisation.
- **Site section:** `Understanding/overview/gen_ai/`

---

## 7. Enterprise and Deployment

### 7.1 RAG Architecture Maturation
- **Date:** Advances throughout 2025
- **Description:** RAG established itself as indispensable enterprise AI infrastructure. Key technical advances: transformer-based cross-encoders and late-interaction retrieval models improved precision by 15–30%; Long RAG processes longer retrieval units to preserve context; SELF-RAG adds self-reflective evaluation of retrieved content. The cost argument solidified: embedding 10,000 documents costs under $100 versus six-figure fine-tuning costs.
- **Why it matters:** RAG is now the standard architecture for enterprise knowledge integration; teams not yet using systematic evaluation frameworks (70% still lack them) face undetected quality regressions.
- **Site section:** `Understanding/agents/components/memory/` and `Understanding/data/augmentation/`

### 7.2 Multi-Million Token Context and "Long RAG" Trade-offs
- **Date:** Throughout 2025
- **Description:** Gemini 2.0 Pro (2M tokens) and Llama 4 Scout (10M tokens) pushed context windows to new heights, while Anthropic Claude 4.6 / Sonnet reached 1M tokens at standard pricing (GA March 13, 2026). Research showed that real-world recall performance at 1M tokens is in the 20–30% range on multi-needle tests, far below launch-day benchmark scores.
- **Why it matters:** The "just stuff everything in context" approach to knowledge retrieval is not yet reliable; teams need to understand when long-context replaces RAG and when it does not.
- **Site section:** `Understanding/data/augmentation/` and `Understanding/architectures/models/`

### 7.3 Inference Cost Collapse
- **Date:** Trajectory through 2025
- **Description:** API pricing for frontier-class intelligence fell dramatically: open-weight models via SGLang or vLLM on commodity hardware now deliver GPT-4-class output at costs 10–100× lower than 2023 API pricing. Quantization (INT8/FP8) and distillation are now standard cost levers. DeepSeek's efficiency demonstrations accelerated incumbent pricing pressure.
- **Why it matters:** The economics of AI deployment have fundamentally changed; cost-benefit analyses for AI projects written in 2023–2024 are likely obsolete.
- **Site section:** `Understanding/building_applications/back_end/llm_ops/` and `Understanding/architectures/optimizing/`

### 7.4 Fine-tuning vs. RAG vs. Prompting — Updated Trade-off Landscape
- **Date:** Throughout 2025
- **Description:** The trade-off calculus between fine-tuning, RAG, and prompting shifted substantially. LoRA and QLoRA made fine-tuning accessible; DPO eliminated the reward model requirement; long-context models reduced the urgency of retrieval for short document sets. The consensus: RAG for frequently changing knowledge, fine-tuning for style/format/domain transfer, prompting for task specification.
- **Why it matters:** This is the most operationally important architectural decision for enterprise AI teams; updated guidance that accounts for 2025 developments is critically needed.
- **Site section:** `Understanding/data/augmentation/` and `Understanding/architectures/training/`

### 7.5 Vibe Coding and AI-Assisted Software Development
- **Date:** Popularised through 2025
- **Description:** The term "vibe coding" (attributed to Andrej Karpathy) entered mainstream usage to describe AI-first software development where developers describe intent in natural language and accept AI-generated code with minimal review. Tools like Claude Code, GitHub Copilot, Cursor, and Windsurf drove adoption. Mistral released a code agent supporting long-running cloud-based coding sessions.
- **Why it matters:** This represents a fundamental change in the developer workflow, not just an efficiency tool; it creates new risks (unreviewed code, hallucinated dependencies) and new capabilities (non-developers building software).
- **Site section:** `Understanding/agents/slides/applications/coding_agent/`

---

## 8. Research Breakthroughs

### 8.1 Mixture-of-Experts (MoE) Becomes the Default Architecture
- **Date:** Demonstrated at scale through 2025 (DeepSeek V3, Qwen3, Llama 4, Mistral Large 3)
- **Description:** MoE architectures — where only a subset of expert sub-networks activate per forward pass — became the standard for frontier-scale models. DeepSeek V3 (671B total / 37B active), Qwen3 235B (235B total / 22B active), Llama 4 Maverick (128 experts), and Mistral Large 3 (675B total / 41B active) all use MoE. The efficiency gain: near-dense-model quality at sparse-model inference cost.
- **Why it matters:** Understanding MoE is now essential for understanding why frontier models cost what they cost, how they can be served efficiently, and why parameter counts are misleading quality signals.
- **Site section:** `Understanding/architectures/models/` and `Understanding/architectures/optimizing/`

### 8.2 Reasoning via Reinforcement Learning (DeepSeek-R1 methodology)
- **Date:** January 2025 (R1 technical report)
- **Description:** DeepSeek's R1 technical report demonstrated that strong reasoning capabilities can be induced via group relative policy optimisation (GRPO) applied to base models without requiring supervised chain-of-thought data as scaffolding. R1-Zero, a model trained with pure RL and no SFT, developed reasoning behaviours spontaneously.
- **Why it matters:** This was a paradigm shift: reasoning is not solely a function of training data curation but emerges from well-designed reinforcement signals. It changed how the field thinks about alignment and capability development.
- **Site section:** `Understanding/architectures/training/`

### 8.3 Direct Preference Optimization (DPO) Mainstream Adoption
- **Date:** Widely adopted in production pipelines 2025
- **Description:** DPO (introduced 2023) became the mainstream alternative to RLHF in 2025. By mathematically reparameterising the optimal RLHF policy, DPO eliminates the need for a separate reward model, enabling preference-based alignment in a single training pass. Combined with synthetic preference data generation, it dramatically reduces alignment training costs.
- **Why it matters:** DPO changed the economics of fine-tuning aligned models; it is now the baseline approach teams should understand before evaluating alternatives.
- **Site section:** `Understanding/architectures/training/`

### 8.4 Long-Context Architecture Advances
- **Date:** Throughout 2025
- **Description:** Architectural innovations for long contexts included: gated attention variants tested across 30+ configurations on 15B MoE and 1.7B dense models improving long-context extrapolation; sparse attention mechanisms for efficient attention over million-token sequences; and RoPE (Rotary Position Embedding) extensions that generalise to unseen sequence lengths without degradation.
- **Why it matters:** Enables the context window expansions seen in production models; teams building long-context applications need to understand which underlying technique their model uses and its failure modes.
- **Site section:** `Understanding/architectures/models/`

### 8.5 Synthetic Data Generation as a First-Class Training Technique
- **Date:** Proven at scale through 2025 (Phi-4, DeepSeek, Qwen3)
- **Description:** High-quality synthetic data generation became a primary lever for model quality, not just a data-augmentation fallback. Microsoft's Phi-4 family demonstrated that 14B models trained on curated synthetic data outperform 70B+ models trained on raw internet data on reasoning tasks. DeepSeek and Qwen adopted similar approaches.
- **Why it matters:** Synthetic data changes the data moat dynamics: organisations that can generate high-quality synthetic training data can fine-tune models that outperform models trained on vastly larger natural datasets.
- **Site section:** `Understanding/data/preparation/` and `Understanding/architectures/training/`

### 8.6 NeurIPS 2025 and Major Research Trends
- **Date:** December 2025
- **Description:** NeurIPS 2025 best papers focused on inference-time scaling, test-time verification, and multimodal reasoning. Key trends at the conference: verifier-guided generation, process reward models, hybrid RL algorithms for alignment, and multi-objective alignment frameworks.
- **Why it matters:** Conference directions often predict the production capabilities available 12–18 months later; the verifier-guided generation trend suggests future models will self-check outputs before returning them.
- **Site section:** `Understanding/architectures/training/`

---

## 9. Industry Milestones

### 9.1 Project Stargate — $500B AI Infrastructure Commitment
- **Date:** January 21, 2025
- **Description:** SoftBank, OpenAI, and Oracle announced Project Stargate at the White House: a commitment to invest at least $500B in US AI infrastructure, creating 100,000+ jobs. SoftBank holds financial responsibility; OpenAI holds operational responsibility. Technology partners include Microsoft, NVIDIA, Arm, and Oracle.
- **Why it matters:** The largest single infrastructure commitment in the history of computing; signals that AI infrastructure is now national-security-level strategic investment, not just commercial capex.
- **Site section:** `docs/Managenai/strategy/`

### 9.2 Global AI Funding Reaches $211B in 2025
- **Date:** Full-year 2025
- **Description:** Global AI funding reached $211B for the year (Q4 alone: $54B). Five companies — OpenAI ($40B at $300B valuation), Anthropic ($13B Series F at $183B valuation), xAI ($10B+ at $200B valuation), Scale AI, and Project Prometheus — raised $84B between them, representing 20% of all global VC in 2025.
- **Why it matters:** Capital concentration at this level guarantees continued frontier capability development at the top tier for years; for organisations managing GenAI, it means the capability landscape will continue to shift rapidly.
- **Site section:** `docs/Managenai/strategy/`

### 9.3 Anthropic Agent SDK and Claude Code GA
- **Date:** Mid-2025 (Claude Code GA); alongside Claude 4 family
- **Description:** Anthropic launched Claude Code as a generally available agentic coding system and released the Claude Agent SDK for building multi-agent pipelines natively on Claude models. Claude Cowork (desktop task automation) launched as a consumer product.
- **Why it matters:** Anthropic shifted from "model API provider" to "full-stack agentic platform," competing directly with OpenAI's ChatGPT Agent Mode and Google's ADK ecosystem.
- **Site section:** `Understanding/agents/examples/commercial/`

### 9.4 MCP Donated to Linux Foundation (Agentic AI Foundation)
- **Date:** December 2025
- **Description:** Anthropic donated the Model Context Protocol to the AAIF (Agentic AI Foundation), a directed fund under the Linux Foundation, co-founded with Block and OpenAI. This transformed MCP from a single-vendor standard to an industry-governed open protocol.
- **Why it matters:** Governance neutrality is a prerequisite for widespread enterprise adoption; the Linux Foundation home gives MCP the legitimacy required for inclusion in enterprise IT standards.
- **Site section:** `Understanding/agents/building_agents/agent_infrastructure/`

### 9.5 AI Total Investment Reaches $297B Globally (May 2026)
- **Date:** May 14, 2026
- **Description:** Total global AI technology investment reached $297B as of May 2026, with enterprise deployment accelerating toward production scale. The shift from pilot to production is the defining enterprise trend of the period.
- **Why it matters:** Organisations in the "pilot" phase of AI adoption are now behind the curve; the transition to production-scale deployment is the central management challenge.
- **Site section:** `docs/Managenai/strategy/`

---

## Gap Analysis — 10 Most Critical Content Gaps

The following gaps represent the highest-priority new content for ManaGen.ai, ranked by relevance to the site's mission of helping managers and knowledge workers understand and manage GenAI.

### Gap 1: Reasoning Models — Manager's Guide (CRITICAL)
**What's missing:** The site has no content explaining test-time compute scaling, o-series models, or the "thinking model" paradigm (o3, Gemini Deep Think, Qwen3 thinking mode, DeepSeek R1).
**Why critical:** This is the most significant architectural shift of the period. Managers now face decisions about when to use reasoning models (slower, more expensive, more accurate) versus standard models. Without this content, the site is obsolete for any 2025+ AI decision.
**Suggested location:** New page: `Understanding/architectures/models/reasoning-models.md`

### Gap 2: Agentic AI Fundamentals — Updated for 2025 Reality (CRITICAL)
**What's missing:** Existing agent content predates the current production ecosystem. There is no coverage of MCP, A2A, or the six production frameworks (LangGraph, CrewAI, OpenAI SDK, Google ADK, AutoGen, Anthropic SDK).
**Why critical:** Agentic AI is the dominant deployment pattern of 2025–2026. Any organisation not understanding agent infrastructure is unprepared for the tools their teams are already using.
**Suggested location:** Update `Understanding/agents/building_agents/libraries_and_tools/` and add `Understanding/agents/building_agents/agent_infrastructure/mcp.md`

### Gap 3: MoE Architecture Explainer (HIGH)
**What's missing:** No content explaining Mixture-of-Experts, why it matters, or how it affects cost/performance trade-offs. All frontier models now use MoE.
**Why critical:** Managers evaluating model costs are routinely confused by "671B parameters but 37B active" pricing and performance claims. Without an MoE explainer, the architecture section is misleading.
**Suggested location:** New page: `Understanding/architectures/models/mixture-of-experts.md`

### Gap 4: EU AI Act Compliance Guide (HIGH)
**What's missing:** The site has governance content but nothing reflecting the EU AI Act obligations that came into force in February and August 2025. No GPAI classification guide, no obligation timeline, no high-risk category breakdown.
**Why critical:** European users and any global company operating in EU markets faces live compliance obligations. This is also the most-asked governance question from enterprise AI teams.
**Suggested location:** New page: `Understanding/building_applications/security_compliance_and_governance/eu-ai-act.md`

### Gap 5: RAG in 2025 — Updated Architecture Patterns (HIGH)
**What's missing:** The data augmentation section predates Long RAG, SELF-RAG, hybrid search with rerankers, and the long-context vs. RAG trade-off analysis. The fine-tuning vs. RAG decision framework is outdated.
**Why critical:** RAG is the most widely deployed enterprise AI architecture; the site's existing content gives teams confidence in an approach based on 2023 best practices.
**Suggested location:** Major update to `Understanding/data/augmentation/` and `Understanding/agents/components/memory/`

### Gap 6: Model Selection Guide 2025 (HIGH)
**What's missing:** No comparative guide to choosing between GPT-5, Claude 4.x, Gemini 2.5, DeepSeek, Llama 4, Qwen3, and Mistral for different use cases, with cost and capability context.
**Why critical:** Model selection is the first practical decision every GenAI team makes; without current guidance, teams are using 2023 mental models for 2025 capability and cost landscapes.
**Suggested location:** New page: `Understanding/architectures/models/model-selection-guide.md`

### Gap 7: Computer Use and Desktop Agents (MEDIUM-HIGH)
**What's missing:** No content covering computer-use agent architectures, production readiness, trust models, or risk frameworks — despite Operator, Claude Computer Use, and competitive offerings all being production features.
**Why critical:** Computer-use agents are the next major enterprise automation category; IT and security teams need a risk framework before deployment, and the site offers none.
**Suggested location:** New page: `Understanding/agents/examples/computer-use-agents.md`

### Gap 8: Inference Optimization — LLMOps Toolchain (MEDIUM-HIGH)
**What's missing:** No coverage of vLLM, SGLang, quantization, distillation, or the hosted vs. self-hosted decision framework for 2025 economics.
**Why critical:** Cost is the #1 barrier to GenAI scaling in production; LLMOps tooling content directly supports the site's enterprise audience.
**Suggested location:** Major expansion of `Understanding/building_applications/back_end/llm_ops/`

### Gap 9: Synthetic Data and Alignment Techniques (MEDIUM)
**What's missing:** No content on DPO, RLHF alternatives, synthetic data generation as a training lever, or process reward models. These are now standard knowledge for anyone managing AI model development or fine-tuning.
**Why critical:** As fine-tuning costs fall, more teams are doing it; without understanding alignment techniques, teams risk deploying misaligned fine-tuned models.
**Suggested location:** New page: `Understanding/architectures/training/alignment-techniques.md`

### Gap 10: AI Industry Landscape 2025 — Strategic Context (MEDIUM)
**What's missing:** The strategy and overview sections have no content on the $297B investment landscape, Stargate, the US regulatory shift, or the competitive dynamics between OpenAI/Anthropic/Google/xAI/open-source.
**Why critical:** Managers making multi-year AI strategy decisions need market context; the existing content reads as if it was written before the current AI investment supercycle.
**Suggested location:** Update `docs/Managenai/strategy/` and `Understanding/overview/gen_ai/going_deeper/`

---

## Appendix: Quick-Reference Timeline

| Date | Event | Category |
|------|--------|----------|
| Jan 2025 | DeepSeek R1 released (MIT license) | Foundation Models / Reasoning |
| Jan 2025 | Project Stargate announced ($500B) | Industry Milestone |
| Jan 2025 | Trump repeals Biden AI EO; Stargate Week 1 policy | Governance |
| Jan 2025 | OpenAI o3-mini released | Reasoning |
| Jan 2025 | Phi-4 (14B) released by Microsoft | Foundation Models |
| Jan 2025 | Qwen 2.5-VL released (vision + language) | Multimodal |
| Jan 2025 | vLLM V1 refactor ships | Infrastructure |
| Feb 2, 2025 | EU AI Act first obligations take effect | Governance |
| Feb 2025 | Gemini 2.0 Pro GA; Flash GA | Foundation Models |
| Feb 2025 | Phi-4-multimodal released | Multimodal |
| Feb 17, 2025 | Grok 3 released (xAI, 10× compute) | Foundation Models |
| Mar 2025 | OpenAI Agents SDK released (replaces Swarm) | Agentic AI |
| Mar 2025 | GPT-4o native image generation (replaces DALL-E 3) | Multimodal |
| Mar 2025 | Qwen 2.5-Omni released (Apache 2.0, all modalities) | Multimodal |
| Apr 5, 2025 | Meta Llama 4 Scout and Maverick released | Foundation Models |
| Apr 9, 2025 | Google A2A Protocol announced at Cloud Next | Agentic AI |
| Apr 2025 | EU AI Continent Action Plan | Governance |
| Apr 16, 2025 | OpenAI o3 and o4-mini released (multimodal thinking) | Reasoning |
| Apr 29, 2025 | Qwen3 released (thinking/non-thinking hybrid) | Foundation Models |
| May 2025 | Claude 4 family launched (Sonnet 4, Opus 4) | Foundation Models |
| May 2025 | Phi-4-reasoning and Phi-4-reasoning-plus released | Foundation Models / Reasoning |
| May 7, 2025 | Mistral Medium 3 released | Foundation Models |
| May 2025 | DeepSeek-R1-0528 upgrade | Reasoning |
| May 2025 | Google I/O: Gemini 2.5 Pro with Deep Think | Foundation Models / Reasoning |
| May 29, 2025 | FLUX.1 Kontext released (in-context image editing) | Multimodal |
| Jun 2025 | Mistral Magistral (reasoning models) released | Foundation Models |
| Jun 2025 | Midjourney video model V1 launched | Multimodal |
| Jun 10, 2025 | MCP v3 spec (OAuth, structured outputs) | Infrastructure |
| Jul 2025 | ChatGPT Agent Mode replaces Operator | Agentic AI |
| Jul 2025 | Trump AI Action Plan executive orders | Governance |
| Aug 2, 2025 | EU AI Act GPAI model obligations take effect | Governance |
| Aug 7, 2025 | GPT-5 released | Foundation Models |
| Aug 2025 | DeepSeek-V3.1 released (hybrid V3+R1) | Foundation Models |
| Oct 2025 | SGLang native TPU backend released | Infrastructure |
| Oct 2025 | Haiku 4.5 released (Anthropic) | Foundation Models |
| Oct 2025 | OpenAI Atlas browser (Agent Mode replacement) | Agentic AI |
| Nov 2025 | Gemini 3 Pro and Deep Think released | Foundation Models |
| Nov 2025 | NotebookLM Deep Research launched | Agentic AI / Enterprise |
| Nov 17, 2025 | Grok 4.1 released (xAI) | Foundation Models |
| Nov 19, 2025 | EU AI Omnibus proposal adopted | Governance |
| Nov 24, 2025 | Opus 4.5 released (Anthropic) | Foundation Models |
| Nov 25, 2025 | FLUX.2 model series released | Multimodal |
| Dec 2, 2025 | Mistral Large 3 (675B MoE) released | Foundation Models |
| Dec 2025 | GPT-5.2 released (long-context, reasoning tokens) | Foundation Models |
| Dec 2025 | MCP donated to Linux Foundation (AAIF) | Infrastructure / Industry |
| Dec 2025 | Trump national AI framework EO (preempts state laws) | Governance |
| Jan 2026 | SGLang Diffusion for image/video acceleration | Infrastructure |
| Feb 2026 | Qwen 3.5 (397B MoE, 17B active) released | Foundation Models |
| Feb 17, 2026 | Claude Sonnet 4.6 released (beats prior Opus in coding) | Foundation Models |
| Mar 13, 2026 | Claude 1M context window GA at standard pricing | Foundation Models |
| Mar 23, 2026 | Claude Computer Use Agent Research Preview GA | Agentic AI |
| Apr 16, 2026 | Claude Opus 4.7 released (3× image resolution) | Foundation Models |
| Apr 23, 2026 | GPT-5.5 released | Foundation Models |
| May 7, 2026 | EU AI Act Omnibus political agreement reached | Governance |
| May 14, 2026 | Global AI investment reaches $297B | Industry Milestone |
