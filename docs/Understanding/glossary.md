---
title: AI Glossary
description: Quick definitions for the terms used across this site, from parameter to Mixture of Experts, each linked to the full explanation
---

# AI Glossary

Short definitions for terms used across this site. Each one links to a full page if you want the deeper explanation.

## A

**A2A (Agent2Agent)**: an open protocol for direct agent-to-agent communication, letting agents built by different teams or vendors talk to each other without custom integration code. See [Agent2Agent Protocol](agents/a2a-protocol.md).

**Agent**: a model given tools (functions it can call) and agency (the ability to decide which tool to use and when), so it can act on real systems rather than just generate text. See [GenAI Agents](agents/index.md).

**Agentic RAG**: retrieval-augmented generation where the agent actively drives the search (reformulating queries, verifying results) instead of a single fixed lookup. See [Agentic RAG](agents/agentic-rag.md).

**AGI (Artificial General Intelligence)**: a hypothetical AI capable of generating information across nearly any domain at or beyond human level, often treated as a long-term goal rather than a current capability.

## C

**Chain of Thought (CoT)**: prompting or training a model to write out its intermediate reasoning steps before giving a final answer, which reliably improves accuracy on multi-step problems.

**Cognitive Architecture**: the internal structure an agent uses to combine reasoning, memory, and tool use into a coherent decision loop. See [Cognitive Architectures](agents/components/cognitive_architecture.md).

**Context Window**: the maximum amount of text (measured in tokens) a model can consider at once, spanning the prompt, any retrieved documents, and the conversation history.

**Computer Use**: an agent capability that lets a model see a screen and control a mouse/keyboard directly, rather than through a purpose-built API. See [Computer Use & Browser Agents](agents/computer-use.md).

## D

**Diffusion Model**: a generative architecture that creates content (typically images or video) by learning to reverse a gradual noising process, starting from random noise and iteratively refining it into a coherent output. See [Diffusion Models](architectures/models/diffusion_models.md).

**Distillation**: training a smaller "student" model to reproduce the behavior of a larger "teacher" model, trading some capability for lower cost and latency.

## F

**Fine-tuning**: further training a pre-trained model on a smaller, specific dataset to specialize its behavior for a particular task or domain.

**Foundation Model**: a large model pre-trained on broad data, meant to be adapted (via fine-tuning or prompting) to many downstream tasks rather than built for one narrow purpose.

## G

**GAN (Generative Adversarial Network)**: a generative architecture using two competing networks, a generator that creates content and a discriminator that judges it, trained together until the generator's output is convincing. See [GANs](architectures/models/gans.md).

**Gen()AI**: this site's term for the combined space of Generative AI (models that create new content) and the broader goal of General AI, used interchangeably with "GenAI" in most of this site's prose.

**Grounding**: connecting a model's output to verifiable external facts (documents, databases, real-time data) so its answers are checkable rather than purely generated from memory. See [Grounding](architectures/training/grounding.md).

## H

**Hallucination**: when a model generates plausible-sounding but false or fabricated information, presented with the same confidence as accurate output.

**Harness**: the runtime that executes an agent's task in a real environment (a codebase, a terminal, a sandbox), distinct from the orchestration framework that structures its reasoning. See [Agent Harnesses](agents/harnesses.md).

## K

**Knowledge Graph**: a structured network of entities and their relationships, used to ground generation in explicit, checkable facts. See [Knowledge Graphs for Generation](architectures/generating/knowledge_graphs.md).

## L

**LLM (Large Language Model)**: a neural network, almost always a transformer, trained on large amounts of text to predict the next token, which turns out to be a powerful basis for a wide range of language tasks.

**LoRA (Low-Rank Adaptation)**: an efficient fine-tuning method that trains a small number of additional parameters instead of the full model, making specialization far cheaper in compute and storage.

## M

**MCP (Model Context Protocol)**: an open standard for connecting a model to external tools and data sources, so any MCP-compatible model can use any MCP-compatible tool without custom glue code. See [Model Context Protocol](agents/mcp-protocol.md).

**Mixture of Experts (MoE)**: a model architecture where only a subset of the network's "expert" sub-modules activate for any given input, allowing a very large total parameter count while keeping the compute cost of each forward pass much lower. See [Mixture of Experts](architectures/models/mixture_of_experts.md).

**Multimodal**: a model that can process or generate more than one type of content (text, images, audio, video) rather than being limited to text alone. See [Multimodal Models](architectures/models/multimodal.md).

## P

**Parameter**: a single learned number inside a model that controls its behavior; a model's size is usually described by its total parameter count (millions to trillions).

**Pre-training**: the initial, large-scale training phase where a foundation model learns general patterns from broad data, before any task-specific fine-tuning. See [Pre-Training Foundation Models](architectures/training/pre-training.md).

**Prompt Injection**: an attack where malicious instructions are hidden in content a model processes (a webpage, a document, a tool result), attempting to override its actual instructions.

## Q

**Quantization**: reducing the numerical precision a model's parameters are stored in (e.g. from 16-bit to 4-bit), shrinking memory use and speeding up inference at some cost to accuracy.

## R

**RAG (Retrieval-Augmented Generation)**: combining a model with a search step: relevant documents are retrieved first, then given to the model as context so it can ground its answer in real, current information. See [RAG](architectures/generating/rag.md).

**Reasoning Model**: a model trained to allocate extra inference-time compute to work through a problem step by step before answering, trading latency for accuracy on hard tasks. See [Reasoning Models](architectures/training/reasoning_models.md).

**RLHF (Reinforcement Learning from Human Feedback)**: a training method that uses human preference judgments to shape a model's behavior, commonly used to make model output more helpful and less harmful.

## T

**Temperature**: a setting that controls how random a model's output is: low temperature makes it pick the most likely next token nearly every time, high temperature lets it take more varied, creative paths.

**Test-Time Compute**: additional computation spent while generating an answer (rather than during training) to improve output quality, the mechanism behind reasoning models. See [Test-Time Inference](architectures/generating/test_time_inference.md).

**Token**: the basic unit a language model processes, typically a word fragment rather than a whole word; both context windows and API pricing are measured in tokens.

**Transformer**: the neural network architecture behind nearly all modern large language models, built around a mechanism called attention that lets every token in the input directly weigh every other token. See [Transformers](architectures/models/transformers.md).

## V

**Vector Database**: a database optimized for storing and searching embeddings (numerical representations of meaning), the retrieval backbone behind most RAG systems. See [Vector Databases](agents/components/vector_databases.md).

**Vision-Language Model (VLM)**: a model trained to jointly understand images and text, able to answer questions about an image, describe it, or reason about visual content alongside language. See [Vision-Language Models](architectures/models/vision_language_transformers.md).

## W

**World Model**: a model trained to simulate how an environment evolves over time, used for video generation and for agents that plan by predicting the consequences of actions before taking them. See [World Models](architectures/models/world_models.md).

## Z

**Zero-shot / Few-shot**: a model's ability to perform a task from just an instruction (zero-shot) or from a handful of examples in the prompt (few-shot), without any task-specific fine-tuning.
