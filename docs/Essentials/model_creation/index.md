## Models for Gen()AI

Here we will discuss the models essential components of Gen()AI. 

There are two primary domains of Generative AI, text-oriented or image-oriented, though there is great indication that many other (multi-)modalities will be very important for the future. 

We discuss the general complete models used in creating Generative AI. Initial incarnations of this will focus on the most observably promising core-models, transformers. 

Because we generally call Gen()AI with language inputs, there are different ways to use language to achieve the appropriately desired results. These inputs, [prompts](../prompt_engineering/prompting.md) will be model-specific, but may share commonalities for more-optimal usage and we discuss that more thoroughly [here](../prompt_engineering/prompting.md)



## (potentially) model agnostic improvements

- [Learning to Compress Prompts with Gist Tokens](https://arxiv.org/pdf/2304.08467.pdf). Can enable 26x compression and 40% FLOP reduction and improvements. Trains 'gist tokens' to summarize information. 


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
