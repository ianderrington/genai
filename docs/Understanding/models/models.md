

- [Retentive Network: A successor to Transformer for Large Language Models](https://arxiv.org/pdf/2307.08621.pdf) Important LLM-like system using similar components that may help it to be more scaleable than `O(N^2)` memory and `O(N)` inference complexity. 


??? tip "[Llama 2: Open Foundation and Fine-Tuned Chat Models](https://arxiv.org/abs/2307.09288) A nearly open source set of 7B-70B models with quality performance"
    <img width="1393" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5f6a647d-c0dc-453c-9334-3632e86bc19e">



??? tip "[Shepherd: A Critic for Language Model Generation](https://arxiv.org/pdf/2308.04592.pdf) A 7B model trained to critique outputs"
    **Example chat response**
    <img width="560" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c207939b-9bd7-4a20-b747-ea46d13534f7">



??? tip "[Baize: An Open-Source Chat Model with Parameter-Efficient Tuning on Self-Chat Data](https://arxiv.org/pdf/2304.01196.pdf) Parameter efficient LLama Tuning and risk minimization"
    with a new 'Self Distillation' with Feedback to improve itself even more. RESEARCH ONLY
    <img width="587" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5426c030-96a6-4e85-a37f-d465a7e13ab5">
dic>


## Mixture of Experts


## Multi-Modal Models

While there is a great deal in several primary domains of Generative AI, Text, Image, sound, video, there are many other modalities that are of interest. Here we share prominent and interesting methods for these domains. These models will often rely on [tokenization](../data/tokenizing.md) and [embedding](../data/embedding.md) changes, but because they may impact the entire system we mention them here.

### Vision-Language Models
Vision Language models are among the most prominent. 

TODO: Clip paper

??? tip "[SPAE: Semantic Pyramid AutoEncoder for Multimodal Generation with Frozen LLMs](https://arxiv.org/pdf/2306.17842.pdf) A really cool idea that uses pyramidal representations and compresses information into text-tokens of different levels."

    It can be reconstructed as needed. These tokens then could be used in novel image generation via semantic mapping with an LLM. 
    <img width="1252" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e64de0a0-0e8b-4d2e-9c0e-bb89fcdd67e8">

??? "[Towards Language Models That Can See: Computer Vision Through the LENS of Natural Language](https://arxiv.org/pdf/2306.16410.pdf) Represents images into language and combines them with a Frozen LLM to produce output."

    <img width="843" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/efb3e439-ba1e-45f1-90c3-840b393c45df">

    <img width="853" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/dd327581-60d6-4e2e-a503-5aa1871c903c">
    [Github](https://github.com/ContextualAI/lens)
    [Website](https://contextual.ai/introducing-lens/)

### Tabular Models
- [Challenges in End-to-End Neural Scientific Table Recognitions](https://ieeexplore.ieee.org/abstract/document/8978078)

## More than one modal 

??? important "[Meta Transformer](https://arxiv.org/pdf/2307.10802.pdf) Combines embedding in from 12 modalities by adjoining individual models and flattening them together."
    <img width="868" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f366d75d-43fd-4101-84e6-53baa49b64ab">
    [Github](https://github.com/invictus717/MetaTransformer)


## Model agnostic improvements

!!! tip "[Learning to Compress Prompts with Gist Tokens](https://arxiv.org/pdf/2304.08467.pdf). Can enable 26x compression and 40% FLOP reduction and improvements by training 'gist tokens' to summarize information."

??? tip "[LM-INfinite: Simple On-the-Fly Length Generalization for Large Language Models](https://arxiv.org/abs/2308.16137) provides an O(n) time/space extension allows LMMs to ability to go to 32k tokens and 2.7x speedup."

    <img width="545" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/d3c4ccbb-9fc9-4bc5-9b54-7b2270c26cc8">
    
    <img width="850" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/0eb9dc5d-b409-4b98-95c0-e712fd186dc1">
    
    <img width="863" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c2bdf11c-dec1-4575-99ef-e931ae306d61">




## TO SORT


!!! tip " [Multimodal Neurons in Pretrained Text-Only Transformers](https://arxiv.org/pdf/2308.01544.pdf) "finding multimodal neurons in text-only transformer MLPs and show that these neurons consistently translate image semantics into language."  


??? tip "[Llama 2: Open Foundation and Fine-Tuned Chat Models](https://arxiv.org/abs/2307.09288) A nearly open source set of 7B-70B models with quality performance"
    
    <img width="1393" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5f6a647d-c0dc-453c-9334-3632e86bc19e">

??? tip "[Shepherd: A Critic for Language Model Generation](https://arxiv.org/pdf/2308.04592.pdf) A 7B model trained to critique outputs"
    
    **Example chat response**
    <img width="560" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c207939b-9bd7-4a20-b747-ea46d13534f7">

  - [DeepSpeed-Ulysses](https://github.com/microsoft/DeepSpeed/tree/master/blogs/deepspeed-ulysses)

## To consider and sort


### Self-supervised learning.
- 
Diffusion
LLMs

Alignment methods.

Additional models come up all the time.


  * [HuBERT: Self-Supervised Speech Representation Learning by Masked Prediction of Hidden Units](https://ieeexplore.ieee.org/abstract/document/9585401)
  * [Generating Diverse High-Fidelity Images with VQ-VAE-2](https://arxiv.org/abs/1906.00446)
  * Token Embedding: Mapping to a vector space. 
  * Positional Embedding: Learned or hard-coded mapping to position of sequence to a vector space
  * Attention: Token being predicted is mapped to a query vector and tokens in context are mapped to key and value vectors. Inner products are used to combine to extract information. 
  * Bi-directional / unmasked
  * Unidirectional / masked self attetion
  * Cross attention applies attention to the primary sequence and treates the second token sequence the context. 
  * Multi-head attention. Multiple attention heads in parallel.
  * Layer normalization. Found to be computationally efficient version sets m = beta = 0 or root mean square layer normalizagion or `RMSnorm`. 
  * Unembedding: Learns to convert vector intot he vocuabulary elements.  
  * Token Embedding: Mapping to a vector space. 
  * Positional Embedding: Learned or hard-coded mapping to position of sequence to a vector space
  * Attention: Token being predicted is mapped to a query vector and tokens in context are mapped to key and value vectors. Inner products are used to combine to extract information. 
  * Bi-directional / unmasked
  * Unidirectional / masked self attetion
  * Cross attention applies attention to the primary sequence and treates the second token sequence the context. 
  * Multi-head attention. Multiple attention heads in parallel.
  * Layer normalization. Found to be computationally efficient version sets m = beta = 0 or root mean square layer normalizagion or `RMSnorm`. 
  * Unembedding: Learns to convert vector intot he vocuabulary elements. 
  

