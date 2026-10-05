## Confabulation and Hallucination in GenAI

Confabulation, often referred to as hallucination in the context of AI, is a critical issue. It can lead to the dissemination of information that ranges from mildly incorrect to dangerously misleading. In commercial settings, confabulations can be exploited, leading to significant ethical concerns.

### Importance of Addressing Confabulation

Confabulation in AI-generated content is not just an inconvenience; it poses serious risks:

1. **Immediate Incorrect Information**: Users may receive information that is factually wrong. This misinformation can vary from minor errors to significantly harmful advice or data.
2. **Exploitation in Commercial Settings**: Misinformation can be used maliciously, such as spreading false reviews or misleading advertisements.
3. **Degradation of Grounded Understanding**: Over time, repeated exposure to confabulated information can erode the accuracy of knowledge. When alternative realities created by AI are recorded and propagated across the internet, they can distort collective understanding.

!!! note "[ChatGPT is bullshit](https://link.springer.com/content/pdf/10.1007/s10676-024-09775-5.pdf)"

### Effects on Knowledge and Society

The long-term effects of AI confabulation are profound:

- **Distorted Perception of Reality**: As AI systems generate and distribute incorrect information, people's perception of reality can be altered. This is particularly concerning in areas such as history, science, and health.
- **Erosion of Trust**: Persistent misinformation can lead to a loss of trust in AI systems and the entities that deploy them. Users might become skeptical of all AI-generated content, reducing the utility and adoption of these technologies.
- **Impact on Decision Making**: Decisions based on incorrect information can have serious consequences, particularly in critical fields such as medicine, finance, and public policy.





## What to do?

There's no way to guarantee an LLM never confabulates, but the risk drops sharply with a few concrete practices:

- **Ground answers in retrieval.** [Retrieval-augmented generation](../../Understanding/architectures/generating/rag.md) lets the model cite real source documents instead of generating from parametric memory alone, so a wrong answer is at least traceable to a specific passage.
- **Ask for citations, then check them.** A model asked to cite its source will sometimes fabricate a plausible-looking reference. Verify any citation independently before trusting it.
- **Lower the temperature for factual tasks.** Higher sampling temperature increases variety, but also increases the odds of an unsupported claim; factual lookups should run near-deterministic.
- **Use a second model, or a human, to check high-stakes output.** For medicine, finance, and legal use, treat the model's answer as a first draft that a domain expert reviews, never as a final answer on its own.
- **Prefer a narrow, well-scoped prompt over an open-ended one.** A model asked "what do you know about X" has more room to invent than one asked to summarize a specific document you provide.

