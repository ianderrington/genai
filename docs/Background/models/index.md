# Models for Gen()AI

As of 2023, there are two primary domains of Generative AI, text-based and image-based. Though there is a whole host of other modalities that can be considered. 

We won't go into detail to the wide variety of generative AI models, but, instead will focus on the model architecture that is presently dominating the market: Transformers. 

Because [prompting](prompting.md) will be model dependent we also focus on prompting in this section. 


# Available models

## Text (first)
* [Bard](https://bard.google.com/)
* [Claud]()
* [ChatGPT](https://openai.com/blog/chatgpt)

* [Medpalm](https://arxiv.org/abs/2212.13138)
* [Llama](https://github.com/facebookresearch/llama) (Non-commercial ??)
* [Open Llama](https://github.com/openlm-research/open_llama) (Non-commercial ??)
* [UAE Falcon](https://www.tii.ae/news/uaes-falcon-40b-now-royalty-free) (Apache License)


### Image (first)

- [StableLM: Stability AI Language Models](https://github.com/stability-AI/stableLM/)  CC BY-SA-4.0

### MultiModal 

- [Unilm](https://github.com/microsoft/unilm) (MSFT

### Model Overviews

Below we provide references to concepts that extend beyond transformer-based models.
- [A Survey of Large Language Models](https://arxiv.org/pdf/2303.18223.pdf) A very comprehensive paper discussing LLM technology. 

### Self-supervised learning

- ‼️ [A cookbook of self-supervised Learning](https://arxiv.org/pdf/2304.12210.pdf) 

### Self-supervised learning

- ‼️ [A cookbook of self-supervised Learning](https://arxiv.org/pdf/2304.12210.pdf) 

## Leaderboards and comparisons

- [Hugging Face LLM leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard) An essential chart for documenting the model peformance across multiple models.
- [lmsys.org leader board](https://lmsys.org/blog/2023-06-22-leaderboard/)
- [Foundation model Providers EU AI compliance](https://crfm.stanford.edu/2023/06/15/eu-ai-act.html)


## TO SORT

  
  * Token Embedding: Mapping to a vector space. 
  * Positional Embedding: Learned or hard-coded mapping to position of sequence to a vector space
  * Attention: Token being predicted is mapped to a query vector and tokens in context are mapped to key and value vectors. Inner products are used to combine to extract information. 
  * Bi-directional / unmasked
  * Unidirectional / masked self attetion
  * Cross attention applies attention to the primary sequence and treates the second token sequence the context. 
  * Multi-head attention. Multiple attention heads in parallel.
  * Layer normalization. Found to be computationally efficient version sets m = beta = 0 or root mean square layer normalizagion or `RMSnorm`. 
  * Unembedding: Learns to convert vector intot he vocuabulary elements. 
  
  **Architectures:**

  * Encoder-Decoder (EDT), is also sequence-to-sequence. 
  * Encoder-only: (BERT)
  * Decoder-only (GPT) Next-token 
  * Multi-domain decoder-only transformer (Gato)
