---
title: GenAI Chronology
description: Inside the breakthroughs that shaped modern AI
bullets:
  - GPT went from research project to reshaping industries in less than 5 years
  - Leading AI researchers reveal the behind-the-scenes developments that made it possible
  - Each major breakthrough rewrites our understanding of what AI can achieve
---

A chronological record of the developments that shaped modern generative AI. Each entry links to the primary source, not a summary of one.

## 2017-06: Attention Is All You Need

Vaswani et al. introduce the transformer architecture, dropping recurrence and convolution entirely in favor of self-attention. Nearly every model on this page after 2017 is a transformer or a direct descendant of one. [Paper](https://arxiv.org/abs/1706.03762)

## 2020-05: GPT-3 and Few-Shot Learning

Brown et al. show that a 175-billion-parameter language model, ten times larger than any prior non-sparse model, can perform new tasks from a handful of examples in its prompt, with no gradient updates. This result is what made "just scale it up" a credible strategy rather than a hope. [Paper](https://arxiv.org/abs/2005.14165)

## 2022-04: Latent Diffusion and Stable Diffusion

Rombach et al. show that running the diffusion process in a compressed latent space, rather than directly on pixels, makes high-resolution image synthesis dramatically cheaper to train and run. This became the foundation for Stable Diffusion, released as open-weight software the same year and the reason image generation went from a handful of well-funded labs to anyone with a consumer GPU. [Paper](https://arxiv.org/abs/2112.10752)

## 2022-11-30: ChatGPT

OpenAI releases ChatGPT, a conversational interface over a GPT-3.5-class model. It reaches a million users within five days, becoming the fastest-adopted consumer software product at the time. This is the moment "generative AI" left research labs and became a mainstream, daily-used product category.

## 2023-03: GPT-4

OpenAI releases GPT-4, its first publicly available multimodal model (accepting both image and text input), scoring in the top 10% on a simulated bar exam among other professional and academic benchmarks. [Technical report](https://arxiv.org/abs/2303.08774)

## 2023-06

??? tip "[State of GPT by Andrej Karpathy](https://build.microsoft.com/en-US/sessions/db3f4859-cd30-4445-a0cd-553c3304f8e2) A comprehensive presentation on the general state of Generative AI made possible by GPT."

    <img width="925" alt="image" src="https://github.com/ianderrington/general/assets/76016868/de2d3b33-9e79-407d-b3c7-5b795f330722" loading="lazy">
    <img width="918" alt="image" src="https://github.com/ianderrington/general/assets/76016868/0ecb56de-966a-40c5-8d14-1df3b4a5a89f">
    <img width="282" alt="image" src="https://github.com/ianderrington/general/assets/76016868/7cea8be4-26dd-46c3-9001-fcf625e5975d">
    <img width="918" alt="image" src="https://github.com/ianderrington/general/assets/76016868/a32295bd-9d88-4b31-bd10-134e11e6c546">
    <img width="886" alt="image" src="https://github.com/ianderrington/general/assets/76016868/7b1c6c4b-3778-4536-8d10-03696f3624c5">

## Later developments

The pace after 2023 accelerated enough that a fixed list goes stale fast. For current-generation models (reasoning models, the latest frontier releases), see the [model landscape section](../index.md#the-20252026-model-landscape) on the Overview page, which is updated as new releases ship rather than maintained as a historical record.
