TODO and MANGEN: This entire document needs to be reorganized and revised.

[Foundation models](#foundation-models) play a significant role in the data-based approach as they can be built upon to allow fine-tuning based on new or more specific data that may be proprietary, private, or otherwise inappropriately accessed for training a public-facing model. 

<i id='#foundation-models'></i>
!!! important "Foundation models"
    Foundation models, by their nature, will continually expand in scope and potential. We share some seminal papers on foundation models here.

    Continual evolution of models may be found in hubs such as [Hugging Face](https://huggingface.co/models?other=foundation+model&sort=trending).


While there is a great deal in several primary domains of Generative AI, Text, Image, sound, video, there are many other modalities that are of interest. Here we share prominent and interesting methods for these domains. These models will often rely on [tokenization](../../data/tokenizing.md). Once tokenized, the transformed projected in some way to an _embedding vector_ that can be used by  downstream LLM's, as well as vector-databases.


??? tip "[Llama 2: Open Foundation and Fine-Tuned Chat Models](https://arxiv.org/pdf/2307.09288.pdf) A nearly open source set of 7B-70B models with quality performance"
    <img width="1393" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5f6a647d-c0dc-453c-9334-3632e86bc19e">


??? tip "[Shepherd: A Critic for Language Model Generation](https://arxiv.org/pdf/2308.04592.pdf) A 7B model trained to critique outputs"
    **Example chat response**
    <img width="560" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c207939b-9bd7-4a20-b747-ea46d13534f7">

??? tip "[Baize: An Open-Source Chat Model with Parameter-Efficient Tuning on Self-Chat Data](https://arxiv.org/pdf/2304.01196.pdf) Parameter efficient LLama Tuning and risk minimization"
    with a new 'Self Distillation' with Feedback to improve itself even more. RESEARCH ONLY
    <img width="587" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5426c030-96a6-4e85-a37f-d465a7e13ab5">

## Mixture of Experts

## General Literature

??? code "[A Survey of Large Language Models](https://github.com/RUCAIBox/LLMSurvey)"
    [Paper](https://arxiv.org/pdf/2303.18223.pdf)

## Multi-Modal Models


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



## TO SORT



??? tip "[Llama 2: Open Foundation and Fine-Tuned Chat Models](https://arxiv.org/pdf/2307.09288.pdf) A nearly open source set of 7B-70B models with quality performance"

    <img width="1393" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5f6a647d-c0dc-453c-9334-3632e86bc19e">


## To consider and sort

MANGEN (This is a number of the things that need to be considered in reorganization)

### Self-supervised learning.
-
Diffusion
LLMs

Alignment methods.

Additional models come up all the time.


  * [HuBERT: Self-Supervised Speech Representation Learning by Masked Prediction of Hidden Units](https://ieeexplore.ieee.org/abstract/document/9585401)
  * [Generating Diverse High-Fidelity Images with VQ-VAE-2](https://arxiv.org/pdf/1906.00446.pdf)
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

??? tip "[Why you probably don't need to fine tune an LLM](https://www.tidepool.so/2023/08/17/why-you-probably-dont-need-to-fine-tune-an-llm)

    Summary (with links internal to this project):
    **Why you shouldn't**
    1. Few Shot examples and better [prompts](../prompting/index.md) (and [chains](../agents/chains.md) helps a great deal.
    2. [Retrieval Augmented Generation](../agents/rag.md) will get you all the way there.


    **Why you should**
    1. High accuracy requirements
    2. Don't care about speed
    3. Methods above don't work




  **Architectures:**

  * Encoder-Decoder (EDT), is also sequence-to-sequence.
  * Encoder-only: (BERT)
  * Decoder-only (GPT) Next-token
  * Multi-domain decoder-only transformer (Gato)


## Established Architectures

## Developing Architectures

!!! tip "[Retentive Network: A successor to Transformer for Large Language Models](https://arxiv.org/pdf/2307.08621.pdf) Important LLM-like system using similar components that may help it to be more scaleable than `O(N^2)` memory and `O(N)` inference complexity."


### Activations

{%
   include-markdown "./components.md"
   start="<!--start-activations-->"
   end="<!--stop-activations-->"
%}
