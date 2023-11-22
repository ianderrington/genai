TODO: This needs to split up in to pre-training, finetuning and optimization

Training GenAI will generally be domain/modality specific.

1. Self-supervised [pre-training](pre-training.md) to predict the next token with reasonable likelihoods. 
2. Supervised pretrainign: Trains to give generally expected output.
3. [Finetuning](./finetuning.md) on higher quality data sets sometimes [recurrently](./recurrent_training.md) using [simulated data](../data/simulation.md),
4. [Reinforcement Learning with Human Feedback](rlhf.md) to more accurately train a model's output to find a reward model that is used with Proximal Policy Optimization (PPO) to produce aligned output. 

Basics: [Distributed Training](https://neptune.ai/blog/distributed-training)
https://neptune.ai/blog/distributed-training-frameworks-and-tools



!!! important "[Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155)" 
    Instruct GPT allows for following of instructions. InstructGPT, established a powerful paradigm of LLM performance
    <img width="1006" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f8eccb3c-0afe-4f8f-a477-4269c5b93fb0">


### Frameworks

- [Levanter (not just LLMS) ](https://crfm.stanford.edu/2023/06/16/levanter-1_0-release.html) Codebase for training FMs with JAX. Using Haliax for naming tensors field names instead of indexes. (for example Batch, Feature....). Full sharding and distributable/parallelizable. 
-  [DeepSpeed ZeRO++](https://www.microsoft.com/en-us/research/blog/deepspeed-zero-a-leap-in-speed-for-llm-and-chat-model-training-with-4x-less-communication/) A framework for accelerating model pre-training, finetuning, RLHF updating.  by minimizing communication overhead. A likely essential concept to be very familiar with. 

- [RL4LMs by microsoft](https://github.com/allenai/RL4LMs/tree/main) A modular RL library to fine-tune language models to human preferences. [paper](https://arxiv.org/pdf/2305.08844.pdf)



## Mixture of Experts.

- [Scaling Expert Language Models with Unsupervised Domain Discovery](https://arxiv.org/pdf/2303.14177.pdf) "parse language models on arbitrary text corpora. Our method clusters a corpus into sets of related documents, trains a separate expert language model on each cluster, and combines them in a sparse ensemble for inference. This approach generalizes embarrassingly parallel training by automatically discovering the domains for each expert, and eliminates nearly all the communication overhead of existing sparse language models. "

<img width="680" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f4ec7e2e-bf27-4fc0-b420-0010e1caef71">

## General Training Improvements



### Pruning and compression

- [SparseGPT: Massive Language Models Can Be Accurately Pruned in One-Shot](https://arxiv.org/abs/2301.00774) Remove up to ~50% parameters preserving 
- [SqueezeLLM](https://arxiv.org/pdf/2306.07629.pdf) They are able to have 2x fold in model size for equivalent performance in perplexity. They use 'Dense and SParce Quantization' [Github](https://github.com/SqueezeAILab/SqueezeLLM)
