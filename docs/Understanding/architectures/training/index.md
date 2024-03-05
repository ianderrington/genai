Training GenAI will generally be domain/modality specific.

1. Self-supervised [pre-training](pre-training.md) to predict the next token with reasonable likelihoods.
1. Supervised or self-supervised [Finetuning](./finetuning.md) on higher quality data sets.
    - These datasets may be done so [recurrently](./recurrent.md) using [simulated data](../../data/preparation/synthetic.md).
1. [Automatically correcting](#automatic-correction) models to more accurately train a model to produce output that is is more globally accurate to the input prompts.

## Automatically Correcting 

Foundationally, the use of [reinforcement learning with human feedback (RLHF)](./feedback.md#rlhf) has enabled highly successful models that are aligned with tasks and requirements. The automated improvement of GenAI can be bbroken down into improving the models during _training time_ and then during _generation time_. 

!!! important "[Automatically Correcting Large Language Models: Surveying the landscape of diverse self-correction strategies](https://arxiv.org/pdf/2308.03188.pdf)"
    **Developments** The authors reveal a comprehensive set of solutions to iteratively improve models.
    <img width="657" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/961478b0-a40a-4c61-8ff7-f86c93633954">



### Frameworks

- Basics: [Distributed Training](https://neptune.ai/blog/distributed-training)
https://neptune.ai/blog/distributed-training-frameworks-and-tools


- [Levanter (not just LLMS) ](https://crfm.stanford.edu/2023/06/16/levanter-1_0-release.html) Codebase for training FMs with JAX. Using Haliax for naming tensors field names instead of indexes. (for example Batch, Feature....). Full sharding and distributable/parallelizable.
-  [DeepSpeed ZeRO++](https://www.microsoft.com/en-us/research/blog/deepspeed-zero-a-leap-in-speed-for-llm-and-chat-model-training-with-4x-less-communication/) A framework for accelerating model pre-training, finetuning, RLHF updating.  by minimizing communication overhead. A likely essential concept to be very familiar with.

- [RL4LMs by microsoft](https://github.com/allenai/RL4LMs/tree/main) A modular RL library to fine-tune language models to human preferences. [paper](https://arxiv.org/pdf/2305.08844.pdf)



