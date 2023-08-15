## Models for Gen()AI

Here we will discuss the models essential components of Gen()AI. 

There are two primary domains of Generative AI, text-oriented or image-oriented, though there is great indication that many other (multi-)modalities will be very important for the future. 

We discuss the general complete models used in creating Generative AI. Initial incarnations of this will focus on the most observably promising core-models, transformers. 

Because we generally call Gen()AI with language inputs, there are different ways to use language to achieve the appropriately desired results. These inputs, [prompts](prompt_engineering/prompting.md) will be model-specific, but may share commonalities for more-optimal usage and we discuss that more thoroughly [here](prompt_engineering/prompting.md)

Here we discuss models / architecture, and not models that are trained and released. Please see the [Available Trained Models](../../Engineering/models.md) for specific access to models. 

Genrative AI models are of two general categories. Self-supervised, and Externally-supervised, and hybrid models. Often times self-supervised models then pass into external-supervision to improve the quality of the output.

Self supervision amounts to using a single data-entry itself to train a model, without interacting with other data points. For instance, a model used to predict 

Because of their present degree of quality present model Architectures tend to be transformer-based, or diffusion-based, though they can also be hybrids, or made from any other standard AI method. While Generative Adversarial Networks, [GANS](https://en.wikipedia.org/wiki/Generative_adversarial_network) were the inititally most successful, the challenges in training them successfully can be difficult to surmount. 

[Transformers](./classes/transformers.md)
[Diffusers](./classes/diffusers.md)


### References

- [A Survey of Large Language Models](https://arxiv.org/pdf/2303.18223.pdf) A very comprehensive paper discussing LLM technology. 

- [Understanding Large Language Models](https://magazine.sebastianraschka.com/p/understanding-large-language-models)

### Self-supervised learning.
- 
Diffusion
LLMs

Alignment methods.

Additional models come up all the time.



- [Retentive Network: A successor to Transformer for Large Language Models](https://arxiv.org/pdf/2307.08621.pdf) Important LLM-like system using similar components that may help it to be more scaleable than `O(N^2)` memory and `O(N)` inference complexity. 

<div class="result" markdown>
??? tip "[Llama 2: Open Foundation and Fine-Tuned Chat Models](https://arxiv.org/abs/2307.09288) A nearly open source set of 7B-70B models with quality performance"
    <img width="1393" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5f6a647d-c0dc-453c-9334-3632e86bc19e">
</div>

<div class="result" markdown>
??? tip "[Shepherd: A Critic for Language Model Generation](https://arxiv.org/pdf/2308.04592.pdf) A 7B model trained to critique outputs"
    **Example chat response**
    <img width="560" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c207939b-9bd7-4a20-b747-ea46d13534f7">

</div>
<div class="result" markdown>
??? tip "[Baize: An Open-Source Chat Model with Parameter-Efficient Tuning on Self-Chat Data](https://arxiv.org/pdf/2304.01196.pdf) Parameter efficient LLama Tuning and risk minimization"
    with a new 'Self Distillation' with Feedback to improve itself even more. RESEARCH ONLY
    <img width="587" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5426c030-96a6-4e85-a37f-d465a7e13ab5">
</div>dic>


## Mixture of Experts

## MultiModal 

??? tip "[SPAE: Semantic Pyramid AutoEncoder for Multimodal Generation with Frozen LLMs](https://arxiv.org/pdf/2306.17842.pdf) A really cool idea that uses pyramidal representations and compresses information into text-tokens of different levels."
    It can reconstruct it as need be. These tokens then could be used in novel image generation via semantic mapping with an LLM. 

- [Multimodal Neurons in Pretrained Text-Only Transformers](https://arxiv.org/pdf/2308.01544.pdf) Neat demonstration "finding multimodal neurons in text-only transformer MLPs and show that these neurons consistently translate
image semantics into language."  




## Model agnostic improvements

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
  

