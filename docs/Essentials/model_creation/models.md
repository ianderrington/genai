Here we discuss models / architecture, and not models that are trained and released. Please see the [Available Models](../applied_engineering/models.md) for that 


Primary models are [Transformers](./transformers.md)

Additional models come up all the time.

- ‼️ [Retentive Network: A successor to Transformer for Large Language Models](https://arxiv.org/pdf/2307.08621.pdf) Important LLM-like system using similar components that may help it to be more scaleable than `O(N^2)` memory and `O(N)` inference complexity. 



## Mixture of Experts

## MultiModal 

- [Unilm](https://github.com/microsoft/unilm) (MSFT)
- [SPAE: Semantic Pyramid AutoEncoder for Multimodal Generation with Frozen LLMs](https://arxiv.org/pdf/2306.17842.pdf) A really cool idea that uses pyramidal representations and compresses information into text-tokens of different levels. It can reconstruct it as needbe. These tokens then could be used in novel image generation via semantic mapping with an LLM. 

