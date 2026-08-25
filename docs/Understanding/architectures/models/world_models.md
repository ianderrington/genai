---
title: World Models and Video Generation
description: The four distinct meanings of "world model" in 2026, from Dreamer-style latent planning to Sora/Veo video generation to Genie's interactive environments
---

# World Models and Video Generation

"World model" gets used for at least four genuinely different things in 2026. Conflating them is easy and misleading, since a model that generates a beautiful video clip and a model that lets an agent plan inside a simulated environment solve different problems, even when both get called by the same name.

## Four Meanings, Not One

| Meaning | What it does | Example |
|---------|-------------|---------|
| **Latent-space world models for RL** | Predicts future latent states, not pixels, so an agent can plan or "imagine" ahead without acting in the real environment | Ha and Schmidhuber's 2018 V-M-C architecture, the Dreamer series (V1/V2/V3) |
| **Generative video models** | Text or image to video, built for content creation, only loosely a simulator | Sora 2, Veo 3, Kling, Runway Gen-4 |
| **Physical-AI world models** | Trained specifically to generate physically plausible video for robot and self-driving training data | Domain-specific systems built on video-generation backbones |
| **Interactive, playable world models** | Generates a navigable environment in real time, action-conditioned, not a fixed clip | Google DeepMind's Genie series |

The [Reinforcement Learning](./reinforcement_learning.md) page covers the first category from the planning-and-control angle. This page covers the second and fourth: the generative and interactive ends of "world model," which is where most of the 2025-2026 momentum has actually been.

## Generative Video Models

Nearly every current leader in this category shares an architectural throughline with [diffusion models](./diffusion_models.md): a Diffusion Transformer (DiT) backbone, the same family Sora's original architecture introduced.

| Model | Maker | Notable for |
|-------|-------|-------------|
| **Sora 2** | OpenAI | Physical-world simulation fidelity: object permanence, plausible physics over longer clips |
| **Veo 3 / 3.1** | Google DeepMind | Native synchronized audio generated alongside the video, not added afterward |
| **Kling 2.0 Master / Kling 3** | Kuaishou | Strong motion quality with better price and access economics than Western competitors |
| **LTX-2** | Lightricks | Optimized for speed and cost over peak fidelity |
| **Runway Gen-4** | Runway | Consistency of characters and objects across shots in the same generated sequence |

!!! note "Verify current specifics before citing"
    Exact benchmark numbers and version details for this category move fast and are often reported first by comparison and marketing sites rather than papers. Treat any specific number here as approximate and check the maker's own release notes before quoting it precisely.

## Interactive World Models: Genie

Google DeepMind's Genie line is the clearest example of the fourth category: a model that generates a world you can move through, not a clip you watch.

**Genie 3**, DeepMind's own description: a general-purpose world model that generates dynamic, interactive environments from a text prompt, navigable in real time at 20-24 frames per second, 720p resolution, with world-state consistency holding for a few minutes of continuous interaction. This is a real jump from Genie 2, which held memory for roughly 10 seconds and produced non-interactive clips rather than a persistent, actionable world.

Genie 3 reached the public as **Project Genie**, released January 29, 2026 via Google Labs, gated to Google AI Ultra subscribers. The distinction DeepMind itself draws: Genie 3 lets an agent predict how a world evolves and how its own actions change it, which is a planning-relevant capability a passive video generator doesn't have, even a photorealistic one.

!!! tip "Why this distinction matters for agent training"
    A generative video model shows you a plausible future. An interactive world model lets an agent act inside that future and see the consequence, which is what makes it usable for reinforcement learning and robotics training data, not just content. If you're evaluating a "world model" for agent training rather than content generation, confirm which of the two it actually is before assuming action-conditioning exists.

## Related Pages

- [Diffusion Models](./diffusion_models.md) - the DiT architecture behind most generative video models
- [Reinforcement Learning](./reinforcement_learning.md) - the planning-and-control use of latent-space world models
- [Multimodal Models](./multimodal.md) - how video, audio, and text get combined in a single model
