---
title: Reasoning Models & Test-Time Compute
description: How models like o3, DeepSeek R1, and Qwen3 reason step-by-step at inference time
---

# Reasoning Models & Test-Time Compute

For most of AI's history, a model's capability was determined almost entirely at training time — the data it learned from, the scale of the run, the quality of the fine-tuning pass. In 2025, a second axis emerged: **test-time compute**. By spending more computation *during inference* — generating intermediate reasoning steps, verifying partial answers, and backtracking on failure — models can solve problems they would otherwise get wrong. This shift fundamentally changed both what AI systems can do and how organisations should budget for them.

## What Is Test-Time Compute?

Standard language models generate a response in a single forward pass: input goes in, tokens come out. Reasoning models break that single pass into an extended chain-of-thought phase before producing a final answer. The model "thinks out loud," working through sub-problems, checking its logic, and correcting mistakes — all invisible to the end user but consuming tokens (and therefore compute) proportional to problem difficulty.

The key insight, validated across 2025 research, is that **inference compute scales with accuracy in a similar way to pre-training compute** — more compute generally yields better answers, up to a ceiling determined by the task type. This creates a new dimension for practitioners: for any given task, you can now choose between a cheaper fast model and a more expensive deep-thinking model, with the accuracy difference made concrete by published benchmarks.

## Why It Changed AI Capabilities in 2025

Before reasoning models, hard mathematical proofs, complex multi-step coding problems, and adversarial logic puzzles were reliable failure modes for frontier LLMs. The 2025 generation of reasoning models changed this dramatically:

- **OpenAI o3** (April 2025) scored **88% on ARC-AGI** — a benchmark designed to resist AI — compared to o1's 32%. It also supports multimodal reasoning, allowing it to analyse diagrams and sketches within its chain-of-thought phase.
- **OpenAI o3-mini** (January 2025) proved that test-time gains are achievable at commodity inference costs, not just expensive research budgets.
- **Process supervision research** (formalised throughout 2025 via PRM800K and derivatives) showed that training models to receive feedback on individual reasoning *steps* — rather than only final answers — produces more reliable and interpretable chains of thought.

## Key Models

### OpenAI o3 and o4-mini
Released April 16, 2025 alongside each other. o3 is optimised for accuracy on hard reasoning tasks; o4-mini delivers comparable performance at significantly lower cost. Both are the first o-series models with multimodal reasoning — they can incorporate images into their chain-of-thought.

### DeepSeek R1
Released January 20, 2025 under the MIT License. A 671B-parameter Mixture-of-Experts model that directly competes with OpenAI o1 on math and coding benchmarks at a fraction of the compute cost. R1's technical report demonstrated that reasoning capabilities can emerge from reinforcement learning applied to a base model *without* requiring supervised chain-of-thought scaffolding — a paradigm shift in how the field thinks about training reasoning ability.

### Qwen3
Released April 29, 2025 by Alibaba. The headline innovation is a **unified thinking/non-thinking mode**: developers can switch between deep reasoning and rapid response within the same model, configuring thinking-token budgets up to 38K. This simplifies cost management for applications that need both fast and slow reasoning paths within the same deployment.

### Gemini 2.5 Pro Deep Think
Google's first explicit thinking-model tier, introduced at Google I/O in May 2025. Scored 84.0% on MMMU and led LiveCodeBench at time of release, validating test-time compute as a competitive differentiator outside of OpenAI.

## Process Reward Models (PRMs)

Standard model training evaluates whether the *final answer* is correct (outcome supervision). Process reward models evaluate each intermediate reasoning step. Datasets like PRM800K (800,000 step-level labels) demonstrate that step-level supervision produces models that reason more reliably and hallucinate less in agentic deployments — because the model has learned that incorrect reasoning steps are penalised regardless of whether they produce the right endpoint.

## What This Means for Practitioners

- **Budget reasoning compute per task type**: Hard symbolic reasoning, complex code generation, and multi-step planning benefit greatly from reasoning models. Simple classification and content generation do not.
- **Benchmark numbers require context**: A model scoring 92% on AIME 2025 at "high compute" may score 60% at standard compute. Always check which compute tier benchmarks were run at.
- **Hybrid deployments are emerging**: Qwen3's unified mode and GPT-5's routing between fast and deep-thinking paths both suggest that production systems will increasingly route queries to the appropriate reasoning depth dynamically.

## Related Pages

- [Architectures Overview](./index.md) — where reasoning models fit in the broader model taxonomy
- [Model Families](./models/index.md) — full catalogue of current reasoning and non-reasoning models
- [Training: Reasoning via RL](./training/reasoning_models.md) — DeepSeek R1 methodology, GRPO, and process supervision
- [Optimizing](./optimizing/index.md) — inference scaling laws and cost/accuracy trade-offs
