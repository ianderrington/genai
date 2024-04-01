---
hide:

  - toc
---

The big-bang like expansion of AI has led to a surge in services, methods, frameworks, and tools that enhance the creation and deployment of models from start to finish. Although there are end-to-end providers for generating valuable GenAI solutions, there is immense value in implementing and experimenting with your own stacks.

Additionally, there are useful [libraries and tools](./libraries_and_tools.md) worth exploring.

!!! note "**tldr;** Here are the prominent frameworks"
    - [Langchain](#langchain) is an early system with a principled design that allows for extensive applications to be built with it.
    - [Llama Ecosystem](#llama-ecosystem) is a community of Llama-focused modelers, based on the Meta model called Llama, Llama-2, and beyond.
    - [A number of others](#others).

The rapid development in Generative AI tooling makes it challenging to keep up with the development and deprecation of powerful frameworks and tools. Some of the mentioned references may not be fully completed, or even nascent repos to build their intended purposes (described here). Please let us know if we are missing anything [here](../../Managenai/contributing.md).


## Layer 1: Foundation

Starting with base programming languages, increasingly higher-level frameworks enable training and calling of AI models. Higher-level orchestration libraries and platforms allow creating and evaluating chains, agents, and systems that sometimes use visual interfaces. These can often be augmented with various tools/packages/repositories. On top of these involve mostly or all-complete frameworks and platforms that enable nearly complete.

### Base languages

Prominent languages include [python](https://www.python.org), [C++/CUDA](https://en.wikipedia.org/wiki/CUDA), and [Javascript](https://www.javascript.com).

### AI software libraries

??? abstract "[PyTorch](https://pytorch.org/) is a popular python-focused system for creating and using AI."

??? abstract "[Tensorflow](https://tensorflow.org) is a popular multi-language eco-system for creating and using AI."

??? abstract "[JAX](https://github.com/google/jax) is a library enabling composable transformations of Python+NumPy programs: differentiate, vectorize, JIT to GPU/TPU, and more"

??? abstract "[spAcy](https://spacy.io/) is a library for advanced Natural Language Processing in Python and Cython."

### APIs based model usage
- [OpenAI](https://github.com/openai/openai-python)

### Interaction and Orchestration Frameworks and Languages

Handling the inputs/outputs to GenAI in a consistent and reliable manner has spurred the creation of software libraries that can work with GenAI that is called as a service, or hosted locally.

#### LangChain
* Open source
Large user community
Extensive integrations
Enterprise expansions with LangSmith, LangChainHub and more


!!! tip "[Langchain](https://python.langchain.com/en/latest/#) Is a thorough python and javascript orchestration language for adaptable, memory and tooling-equipped calls that can enable agentic AI."

!!! tip "![GitHub Repo stars](https://badgen.net/github/stars/langchain-ai/langserve) [LangServe]([LangServe](https://github.com/langchain-ai/langserve)) will provide a hosted version of LangServe for one-click deployments of LangChain applications."

!!! tip "![GitHub Repo stars](https://badgen.net/github/stars/langchain-ai/opengpts) [OpenGPTs]([OpenGPTs](https://github.com/langchain-ai/opengpts)) Provides an open-source effort to integrate multiple LLMs, and builds upon Langchain, LangServe, and LangSmith"

**Their Stack**

![image](https://github.com/ianderrington/genai/assets/76016868/c66bf027-8556-43e6-8e73-de59c5e58d95)

They are building [Lang Smith](https://smith.langchain.com/) for more Low-code solutions for agentic needs.

- [Langchain service deployment](https://github.com/ajndkr/lanarky)
- [Awesome Langchain](https://github.com/kyrolabs/awesome-langchain)
- [Langflow](https://github.com/logspace-ai/langflow)
- [Toolkit](https://www.toolkit.club/) Generates LangChain plugins for javascript. May be deprecated.

**Tutorials:**

- https://www.pinecone.io/learn/langchain-prompt-templates/
- https://learn.deeplearning.ai/langchain/lesson/3/memory



#### Higher level

??? abstract "[Pytorch Lightning](https://lightning.ai/docs/pytorch/latest/) Enables model training with Pytorch and minimizes the boilerplate"

    [Model parallelism](https://lightning.ai/docs/pytorch/stable/advanced/model_parallel.html)

??? abstract "[Pytorch Lightning THunder](https://github.com/Lightning-AI/lightning-thunder?tab=readme-ov-file)

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/microsoft/DeepSpeed) [Deep Speed (by MSFT)]([Deep Speed (by MSFT)](https://github.com/microsoft/DeepSpeed)) empowers ChatGPT-like model training with a single click, offering 15x speedup over SOTA RLHF systems with unprecedented cost reduction at all scales"
    [Blog on Deepspeed Ulysses](https://github.com/microsoft/DeepSpeed/tree/master/blogs/deepspeed-ulysses)
    ![image](https://github.com/microsoft/DeepSpeed/raw/master/blogs/assets/images/ds-chat-overview.png)

    DeepSpeed-Ulysses uses a simple, portable, and effective methodology for enabling highly efficient and scalable LLM training with extremely long sequence lengths
    "DeepSpeed-Ulysses partitions individual samples along the sequence dimension among participating GPU. Then right before the attention computation, it employs all-to-all communication collective on the partitioned queries, keys and values such that each GPU receives the full sequence but only for a non-overlapping subset of the attention heads. This allows the participating GPUs to compute attention for different attention heads in parallel. Finally, DeepSpeed-Ulysses employs another all-to-all to gather the results along the attention heads while re-partitioning along the sequence dimension."
    ![Ulysses](https://github.com/microsoft/DeepSpeed/blob/master/blogs/deepspeed-ulysses/media/image3.png)
    Tutorial [here](https://www.deepspeed.ai/tutorials/ds-sequence/)

