
# Grounding

Grounding is the opposite of hallucination and confabulation: it means a model's output is actually tied to real, verifiable facts rather than plausible-sounding invention.

Ways to improve grounding:

1. **Improved Training Data**: training on accurate, high-quality data reduces the model's tendency to confabulate.
2. **Regular Audits and Updates**: continuous monitoring of a deployed system helps catch and correct errors before they compound.
3. **Transparency and Accountability**: making a system's decision-making process visible helps users judge how much to trust a given output.
4. **User Education**: users who understand that AI-generated misinformation is possible are better equipped to critically evaluate what they read.
5. **Retrieval Augmentation**: grounding output directly in retrieved documents (see [RAG](../generating/rag.md)) gives the model a real source to cite, rather than relying purely on what it memorized during training.

There's also a slower, structural risk in the other direction: as more AI-generated content itself gets published and indexed, future models trained on that content are increasingly grounded in other models' own outputs rather than real-world fact, a feedback loop that degrades grounding over time rather than improving it. See [model collapse](../../../blog/posts/synthetic-data-llm.md) for the mechanism behind this.
