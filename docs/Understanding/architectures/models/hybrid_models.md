# Hybrid Models

Hybrid models combine multiple different architectures within a single system to reach a goal that no single architecture handles well on its own. Rather than treating "the model" as one monolithic network, a hybrid system routes different parts of a task to whichever component architecture is best suited to it.

A few concrete patterns this covers:

- **Mixture of Experts (MoE)**: a routing layer sends each input to a subset of specialized sub-networks ("experts") rather than running the full model on every input. This is how many current large models (Mixtral, DeepSeek V3, Qwen3's flagship) scale total parameter count far beyond what running every parameter on every token would allow, since only the active experts do work per token.
- **Neurosymbolic systems**: pairing a neural network's pattern-recognition strengths with a symbolic reasoning engine's precision and explainability, used where pure neural approaches struggle with exact logical or mathematical correctness.
- **Retrieval-augmented architectures**: combining a generative model with a separate retrieval system (a vector database, a search index) so the model can ground its output in retrieved facts rather than relying purely on what it memorized during training. See [RAG](../generating/rag.md) for the dedicated coverage of this pattern.

The common thread across all three: match the architecture to what a specific sub-problem actually needs, instead of asking one architecture to be good at everything.
