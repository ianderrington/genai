Security for LLMs involves the protection of propriatary information, or personal identifiable information (PII) that is used in creation or deployment of a model.


### Demonstrations

??? code "[Text Embeddings Reveal (Almost) As Much As Text](https://github.com/jxmorris12/vec2text) uses a multistep method to recover a large amount of the original text used to create an embedding."
    [Paper](https://arxiv.org/pdf/2310.06816.pdf)
    Wherein the authors introduce Vec2text, a method that can accurately recover (short) texts, given access to an embedding model.
    This means that while those high-dimensional embedding vectors can be used to reconstructed the text that led to them.
    This includes important personal information (as in from a dataset of clinical notes).
