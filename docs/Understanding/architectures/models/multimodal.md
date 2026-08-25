# Multimodal Models

A multimodal model processes more than one kind of input, text, images, audio, video, within a single system, rather than requiring separate models stitched together.

## Two Architectural Approaches

**Adapter-based** (the earlier, more common approach for open research models): a frozen or lightly-tuned vision encoder (commonly CLIP) is connected to a language model through a trainable projection layer, mapping visual features into the LLM's existing word-embedding space. [LLaVA](https://arxiv.org/abs/2304.08485) is the canonical example: it connects CLIP's visual encoder to Vicuna's language decoder via a linear projection, trained in two stages (aligning image embeddings to the LLM's language space, then instruction-tuning the combined system), and reached roughly 85% of GPT-4's performance on synthetic multimodal benchmarks without needing large-scale human annotation.

**Natively multimodal** (the approach every current frontier model has converged on): the model is trained from the start on all modalities at once, so text tokens, image patches, and audio frames coexist in the same sequence and pass through the same transformer layers, rather than being translated between separate pipelines and stitched together afterward. This avoids the information loss that translation-based stitching introduces. By 2026, every major frontier model, GPT-5-series, Claude Opus, Gemini, Llama 4, natively handles text, images, and audio within a single model pass, and several handle video as well.

## SPHINX: An Intermediate Design Worth Knowing

??? abstract "[SPHINX: The Joint Mixing of Weights, Tasks, and Visual Embeddings for Multi-Modal Large Language Models](https://arxiv.org/abs/2311.07575)"
    Rather than freezing the vision encoder like LLaVA, SPHINX unfreezes the LLM during pre-training and mixes weights from LLMs trained on real-world versus synthetic data, combines multiple visual instruction-tuning tasks (visual QA, region-level understanding, document layout, human pose estimation) with task-specific instructions to avoid the tasks interfering with each other, and extracts visual embeddings from multiple network architectures and resolutions rather than relying on one fixed encoder. [Code](https://github.com/Alpha-VLLM/LLaMA2-Accessory)

## Why This Matters Beyond Architecture Trivia

The shift from adapter-based to natively multimodal is more than an implementation detail. It's the reason a model like GPT-4o or Gemini can reason about the relationship between what it sees, hears, and reads in one coherent pass, instead of each modality being processed in isolation and only combined at the end. If you're building on top of a multimodal model, this distinction predicts real behavioral differences: an adapter-based system is more likely to lose fine-grained cross-modal detail than one where every modality was learned jointly from the start.
