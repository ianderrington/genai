Training GenAI will generally be domain/modality specific.


1. Self-supervised pretraining: Predicts next token. 
2. Supervised pretrainign: Trains to give generally expected output.
3. Reinforcement Learning with Human Feedback: Trains a reward model that is used with Proximal Policy Optimization (PPO) to produce aligned output. 

Basics: [Distributed Training](https://neptune.ai/blog/distributed-training)
https://neptune.ai/blog/distributed-training-frameworks-and-tools

- [LLM Engineering by Huyen Chip](https://huyenchip.com/2023/04/11/llm-engineering.html)

## RLHF

## Frameworks

- [Levanter (not just LLMS) ](https://crfm.stanford.edu/2023/06/16/levanter-1_0-release.html) Codebase for training FMs with JAX. Using Haliax for naming tensors field-names instead of indexes. (for example Batch, Feature....). Full sharding and distributable / parallelizable. 
-  [DeepSpeed ZeRO++](https://www.microsoft.com/en-us/research/blog/deepspeed-zero-a-leap-in-speed-for-llm-and-chat-model-training-with-4x-less-communication/) A framework for accelerating model pre-training, finetuning, RLHF updating.  by minimizing communication overhead. A likely essential concept to be very familiar with. 

- [RL4LMs by microsoft](https://github.com/allenai/RL4LMs/tree/main) A modular RL library to fine-tune language models to human preferences. [paper](https://arxiv.org/pdf/2305.08844.pdf)

# Methods and Improvements

### Fine Tuning using Distillation

Train on model trains a new model on the output of a new model. 
- [Alpaca ](https://github.com/tatsu-lab/stanford_alpaca)

### Fine tuning Optimizations

- [Full Parameter Fine-Tuning for Large Language Models with Limited Resources.](https://github.com/openlmlab/lomo) Introduces LOMO: LOw-Memory Optimization to fuse 

### Adapter layers

- [AdapterHub: A Framework for Adapting Transformers](https://arxiv.org/pdf/2007.07779.pdf) [Website](https://adapterhub.ml/)
Adapters are efficient and performant layers that can optimize performance without needing to do inefficient fine-tuning. 


## RLHF
- [RLHF: Reinforcement Learning from Human Feedback](https://huyenchip.com/2023/05/02/rlhf.html) A splendid summary of the RLHF system.
<img width="751" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/2fb5b4d5-ecc9-45b3-9d16-63fab4ab6db0">


- [RLHF basics by hugging face](https://huggingface.co/blog/rlhf) A realy good intro to parse again.
- [RLHF for Palm in Pytorch](https://github.com/lucidrains/PaLM-rlhf-pytorch)
- [AligningLargeLanguageModelsthroughSyntheticFeedback](https://arxiv.org/abs/2305.13735) Using a heirarchy of systems to 

### AI-enabled ranking

- [Can foundation models label data like humans?](https://huggingface.co/blog/llm-leaderboard) using GPT to review model outputs produced biased results. Changing the prompt doesn't really help to de-bias it. Lots of additional considerations surrounding model evaluation


## Mixture of Experts.

- [Scaling Expert Language Models with Unsupervised Domain Discovery](https://arxiv.org/pdf/2303.14177.pdf) "parse language models on arbitrary text corpora. Our method clusters a corpus into sets of related documents, trains a separate expert language model on each cluster, and combines them in a sparse ensemble for inference. This approach generalizes embarrassingly parallel training by automatically discovering the domains for each expert, and eliminates nearly all the communication overhead of existing sparse language models. "

<img width="680" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f4ec7e2e-bf27-4fc0-b420-0010e1caef71">


### Pruning and compression

- [SparseGPT: Massive Language Models Can Be Accurately Pruned in One-Shot](https://arxiv.org/abs/2301.00774) Remove up to ~50% parameters preserving 
-  [SqueezeLLM](paper) They are able to have 2x fold in model size for equivalent performance in perplexity. They use 'Dense and SParce Quantization' [Github](https://github.com/SqueezeAILab/SqueezeLLM)
