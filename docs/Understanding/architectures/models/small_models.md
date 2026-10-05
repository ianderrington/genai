---
title: Small and On-Device Models
description: The 2025-2026 shift toward small language models that run locally, the current model roster, and the runtime tooling behind it (Ollama, MLX, llama.cpp)
---

# Small and On-Device Models

A parallel track to frontier-scale models has become a real deployment category in its own right: models small enough (roughly 1-9 billion parameters) to run on a laptop, phone, or edge device, with no API call and no data leaving the machine. It's not a fallback for when a big model is unaffordable. It's the correct choice whenever privacy, latency, or offline operation matters more than raw capability.

## Why This Category Exists Separately

A frontier model API call has three costs a local model avoids entirely: the data leaves your machine, every call has network latency, and every call has a per-token price. For applications where none of the frontier model's extra capability is actually needed, running a small model locally removes all three at once, at the cost of some ceiling on what the model can do.

[Quantization, pruning, and distillation](../optimizing/methods.md) are the general techniques that make this possible. This page covers the resulting model roster and the tooling that runs them, not the compression techniques themselves.

## Current Model Roster

| Model | Size | Maker | Notable for |
|-------|------|-------|-------------|
| **Gemma 3** | 4B | Google | Strong reasoning-to-memory ratio; roughly 4.2GB footprint |
| **Phi-4-mini** | 3.8B | Microsoft | Consistently near the top of its size class on reasoning benchmarks |
| **Llama 3.3** | 8B | Meta | Broad tooling support; commonly run quantized (Q4_K_M) |
| **Qwen 3** | 0.6B-7B | Alibaba | Wide size range in one family; strong at code generation for its class |
| **Qwen3.5** | 0.8B-9B | Alibaba | Reported March 2026; shared architecture across the whole size range, Apache 2.0 |
| **Gemma-3n-E2B-IT** | ~5B raw, ~2B-class memory footprint | Google | Multimodal (text, image, audio) in a genuinely phone-sized model |

!!! note "Benchmark numbers move fast, verify before citing"
    Specific accuracy figures for this category are widely reported in comparison roundups but change with every point release. Check the model's own card on Hugging Face or the maker's release notes before quoting a precise number.

## Runtime Tooling: How You Actually Run These

The infrastructure layer changed meaningfully in 2026, not just the models:

- **Ollama** switched its Apple Silicon backend from llama.cpp's Metal implementation to Apple's own MLX framework. Version 0.19 shipped as a preview on March 30, 2026; version 0.30.0, released May 13, 2026, made MLX the default Apple Silicon inference path. Ollama's own benchmark, on an M5 Max running Qwen3.5-35B-A3B with NVFP4 quantization: prefill improved from 1,154 to 1,810 tokens/second, decode from 58 to 112 tokens/second.
- **MLX** is Apple's own open-source array framework, purpose-built around Apple Silicon's unified memory architecture: CPU and GPU share one physical memory pool, so there's no copy between host RAM and GPU VRAM. Apple introduced MLX as its preferred Apple Silicon inference path at WWDC 2025, alongside a Foundation Models framework giving app developers a Swift API to an on-device model roughly 3 billion parameters in size.
- **llama.cpp** remains the cross-platform, fine-grained-control option: not Apple-Silicon-optimized the way MLX is, but portable to essentially any hardware, and still the base most other tools (including Ollama, before its MLX switch) are built on.

!!! tip "Which one to reach for"
    Ollama is the right default for everyday local use: minimal setup, a model registry, an OpenAI-compatible API. Reach for MLX directly when you're on Apple Silicon and need the extra throughput MLX's unified-memory design provides. Reach for llama.cpp when you need to target hardware Ollama or MLX don't cover, or need control at a lower level than either provides.

## Related Pages

- [Optimizing Methods](../optimizing/methods.md) - quantization, pruning, and distillation, the techniques that make small models possible
- [Evaluating and Comparing Models](../optimizing/evaluating_and_comparing.md) - how to benchmark a small model against your own actual workload rather than a generic leaderboard
- [Agent Harnesses](../../agents/harnesses.md) - several coding-agent harnesses support pointing at a local model instead of a hosted API
