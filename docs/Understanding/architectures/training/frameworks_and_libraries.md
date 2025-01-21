

The big-bang like expansion of AI has led to a surge in services, methods, frameworks, and tools that enhance the creation and deployment of models from start to finish. Although there are end-to-end providers for generating valuable GenAI solutions, there is immense value in implementing and experimenting with your own stacks.

!!! note "**tldr;** Here are the prominent frameworks"
    - [Langchain](#langchain) is an early system with a principled design that allows for extensive applications to be built with it.
    - [Llama Ecosystem](#llama-ecosystem) is a community of Llama-focused modelers, based on the Meta model called Llama, Llama-2, and beyond.
    - [A number of others](#others).

The rapid development in Generative AI tooling makes it challenging to keep up with the development and deprecation of powerful frameworks and tools. Some of the mentioned references may not be fully completed, or even nascent repos to build their intended purposes (described here). Please let us know if we are missing anything [here](../../../Managenai/contributing.md).


## Layer 1: Foundation

Starting with base programming languages, increasingly higher-level frameworks enable training and calling of AI models. Higher-level orchestration libraries and platforms allow creating and evaluating chains, agents, and systems that sometimes use visual interfaces. These can often be augmented with various tools/packages/repositories. On top of these involve mostly or all-complete frameworks and platforms that enable nearly complete.

### Base languages

Prominent languages include [python](https://www.python.org), [C++/CUDA](https://en.wikipedia.org/wiki/CUDA), and [Javascript](https://www.javascript.com).

### AI software libraries

??? abstract "[PyTorch](https://pytorch.org/) is a popular python-focused system for creating and using AI."

??? abstract "[Tensorflow](https://tensorflow.org) is a popular multi-language eco-system for creating and using AI."

??? abstract "[JAX](https://github.com/google/jax) is a library enabling composable transformations of Python+NumPy programs: differentiate, vectorize, JIT to GPU/TPU, and more"

??? abstract "[spAcy](https://spacy.io/) is a library for advanced Natural Language Processing in Python and Cython."


#### Higher level

??? abstract "[Pytorch Lightning](https://lightning.ai/docs/pytorch/latest/) Enables model training with Pytorch and minimizes the boilerplate"

    [Model parallelism](https://lightning.ai/docs/pytorch/stable/advanced/model_parallel.html)

??? abstract "[Pytorch Lightning Thunder](https://github.com/Lightning-AI/lightning-thunder)

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/microsoft/DeepSpeed) [Deep Speed (by MSFT)](https://github.com/microsoft/DeepSpeed) empowers ChatGPT-like model training with a single click, offering 15x speedup over SOTA RLHF systems with unprecedented cost reduction at all scales"
    [Blog on Deepspeed Ulysses](https://github.com/microsoft/DeepSpeed/tree/master/blogs/deepspeed-ulysses)
    ![image](https://github.com/microsoft/DeepSpeed/raw/master/blogs/assets/images/ds-chat-overview.png)

    DeepSpeed-Ulysses uses a simple, portable, and effective methodology for enabling highly efficient and scalable LLM training with extremely long sequence lengths
    "DeepSpeed-Ulysses partitions individual samples along the sequence dimension among participating GPU. Then right before the attention computation, it employs all-to-all communication collective on the partitioned queries, keys and values such that each GPU receives the full sequence but only for a non-overlapping subset of the attention heads. This allows the participating GPUs to compute attention for different attention heads in parallel. Finally, DeepSpeed-Ulysses employs another all-to-all to gather the results along the attention heads while re-partitioning along the sequence dimension."
    ![Ulysses](https://github.com/microsoft/DeepSpeed/blob/master/blogs/deepspeed-ulysses/media/image3.png)
    Tutorial [here](https://www.deepspeed.ai/tutorials/ds-sequence/) and blog on [DeepSpeed ZeRO++](https://www.microsoft.com/en-us/research/blog/deepspeed-zero-a-leap-in-speed-for-llm-and-chat-model-training-with-4x-less-communication/)

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/stanford-crfm/levanter) [Levanter (not just LLMS) ](https://github.com/stanford-crfm/levanter) Codebase for training FMs with JAX."
    [Release](https://crfm.stanford.edu/2023/06/16/levanter-1_0-release.html) 
    Using Haliax for naming tensors field names instead of indexes. (for example Batch, Feature....). Full sharding and distributable/parallelizable.

??? abstract "[RL4LMs by microsoft](https://github.com/allenai/RL4LMs) A modular RL library to fine-tune language models to human preferences."
    [paper](https://arxiv.org/pdf/2305.08844.pdf)


??? abstract "[Ray](https://docs.ray.io/en/latest/ray-overview/getting-started.html)"


#### Fine Tuning

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/georgian-io/LLM-Finetuning-Hub) [LLM Finetuning Hub](https://github.com/georgian-io/LLM-Finetuning-Hub) is an evolving model finetuning codebase. "



### References

- [Distributed training frameworks and tools](https://neptune.ai/blog/distributed-training-frameworks-and-tools)

??? abstract "[Langfuse](https://github.com/langfuse/langfuse?tab=readme-ov-file)"


??? abstract "[DeepSpeed ZeRO++](https://www.microsoft.com/en-us/research/blog/deepspeed-zero-a-leap-in-speed-for-llm-and-chat-model-training-with-4x-less-communication/) A framework for accelerating model pre-training, finetuning, RLHF updating." deepspeed
     By minimizing communication overhead. A likely essential concept to be very familiar with.

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/stanford-crfm/levanter) [Levanter (not just LLMS) ](https://github.com/stanford-crfm/levanter) Codebase for training FMs with JAX."
    [Release](https://crfm.stanford.edu/2023/06/16/levanter-1_0-release.html) 
    Using Haliax for naming tensors field names instead of indexes. (for example Batch, Feature....). Full sharding and distributable/parallelizable.

??? abstract "[RL4LMs by microsoft](https://github.com/allenai/RL4LMs/tree/main) A modular RL library to fine-tune language models to human preferences."
    [paper](https://arxiv.org/pdf/2305.08844.pdf)

### References

- [Distributed training frameworks and tools](https://neptune.ai/blog/distributed-training-frameworks-and-tools)



