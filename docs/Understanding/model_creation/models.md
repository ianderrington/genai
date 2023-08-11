Here we discuss models / architecture, and not models that are trained and released. Please see the [Available Models](../enablement/models.md) for specific maners of both using or creating models. 

Genrative AI models are of two general categories. Self-supervised, and Externally-supervised, and hybrid models. Often times self-supervised models then pass into external-supervision to improve the quality of the output.

Self supervision amounts to using a single data-entry itself to train a model, without interacting with other data points. For instance, a model used to predict 

Because of their present degree of quality present model Architectures tend to be transformer-based, or diffusion-based, though they can also be hybrids, or made from any other standard AI method. While Generative Adversarial Networks, [GANS](https://en.wikipedia.org/wiki/Generative_adversarial_network) were the inititally most successful, the challenges in training them successfully can be challenging. 

[Transformers](./classes/transformers.md)
[Diffusers](./classes/diffusers.md)


### References
### Self-supervised learning.
- 
Diffusion
LLMs

Alignment methods.

Additional models come up all the time.



- ‼️ [Retentive Network: A successor to Transformer for Large Language Models](https://arxiv.org/pdf/2307.08621.pdf) Important LLM-like system using similar components that may help it to be more scaleable than `O(N^2)` memory and `O(N)` inference complexity. 

<div class="result" markdown>
!!! note "[Shepherd: A Critic for Language Model Generation](https://arxiv.org/pdf/2308.04592.pdf)"
    A 7B model trainewd to critique outputs

??? example "Example chat response"
    <img width="560" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c207939b-9bd7-4a20-b747-ea46d13534f7">

</div>
## Mixture of Experts

## MultiModal 


- [SPAE: Semantic Pyramid AutoEncoder for Multimodal Generation with Frozen LLMs](https://arxiv.org/pdf/2306.17842.pdf) A really cool idea that uses pyramidal representations and compresses information into text-tokens of different levels. It can reconstruct it as needbe. These tokens then could be used in novel image generation via semantic mapping with an LLM. 


- [Multimodal Neurons in Pretrained Text-Only Transformers](https://arxiv.org/pdf/2308.01544.pdf) Neat demonstration "finding multimodal neurons in text-only transformer MLPs and show that these neurons consistently translate
image semantics into language."  
