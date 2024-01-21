TODO: These need to be partitioned out to the different positions

The big-bang like expansion of AI has led to a surge in services, methods, frameworks, and tools that enhance the creation and deployment of models from start to finish. Although there are end-to-end providers for generating valuable GenAI solutions, there is immense value in implementing and experimenting with your own stacks.

Additionally, there are useful [libraries and tools](./libraries_and_tools.md) worth exploring.

!!! note "**tldr;** Here are the prominent frameworks"
    - [Langchain](#langchain) is an early system with a principled design that allows for extensive applications to be built with it.
    - [Llama Ecosystem](#llama-ecosystem) is a community of Llama-focused modelers, based on the Meta model called Llama, Llama-2, and beyond.
    - [A number of others](#others).

The rapid development in Generative AI tooling makes it challenging to keep up with the development and deprecation of powerful frameworks and tools. Some of the mentioned references may not be fully completed, or even nascent repos to build their intended purposes (described here). Please let us know if we are missing anything [here](../../Managenai/contributing.md).

## Frameworks

Starting with base programming languages, increasingly higher-level frameworks enable training and calling of AI models. Higher-level orchestration libraries and platforms allow creating and evaluating chains, agents, and systems that sometimes use visual interfaces. These can often be augmented with various tools/packages/repositories. On top of these involve mostly or all-complete frameworks and platforms that enable nearly complete.

### Base languages

Prominent languages include [python](https://www.python.org), [C++/CUDA](https://en.wikipedia.org/wiki/CUDA), and [Javascript](https://www.javascript.com). Due to its popularity, this project will be python-focused.

### AI-level software libraries

- [PyTorch](https://pytorch.org/) is a popular python-focused system for creating and using AI.
- [Tensorflow](https://tensorflow.org) is a popular multi-language eco-system for creating and using AI.
- [spAcy](https://spacy.io/) is a library for advanced Natural Language Processing in Python and Cython.

### APIs based model usage
- [OpenAI](https://github.com/openai/openai-python)

### Interaction and Orchestration Frameworks and Languages

Handling the inputs/outputs to GenAI in a consistent and reliable manner has spurred the creation of software libraries that can work with GenAI that is called as a service, or hosted locally.

#### LangChain
!!! tip "[Langchain](https://python.langchain.com/en/latest/#) Is a thorough python and javascript orchestration language for adaptable, memory and tooling-equipped calls that can enable agentic AI."

!!! tip "[LangServe](https://github.com/langchain-ai/langserve) will provide a hosted version of LangServe for one-click deployments of LangChain applications."

!!! tip "[OpenGPTs](https://github.com/langchain-ai/opengpts) Provides an open-source effort to integrate multiple LLMs, and builds upon Langchain, LangServe, and LangSmith"

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


#### Llama ecosystem

!!! code "[Llamaindex](https://github.com/run-llama/llama_index) Provides an orchestration framework for with multiple connectors"

!!! code "[Llama Lab](https://github.com/run-llama/llama-lab) enables flexible tools to use and indesx various tools"

!!! tip "[Llama](https://ai.meta.com/llama/) is a library and set of models that has an expanding community due to the generally open-source nature of high-quality Llama 2 model."


??? code "Code and models surrounding Llama"
    - [LlamaGPT](https://github.com/getumbrel/llama-gpt) A self-hosted, offline, ChatGPT-like chatbot, powered by Llama 2. 100% private, with no data leaving your device.
    - [Lit-Llama](https://github.com/Lightning-AI/lit-llama)
    - [MedAlpaca](https://github.com/kbressem/medAlpaca)
    - [Llama-2 on a CPU](https://towardsdatascience.com/running-llama-2-on-cpu-inference-for-document-q-a-3d636037a3d8) and [Github](https://github.com/kennethleungty/Llama-2-Open-Source-LLM-CPU-Inference)
    - [GPT LLM Training](https://github.com/mshumer/gpt-llm-trainer) Generates and trains fine-tuned LLAMA-2 LLMs for specific tasks.
    - [llama index](https://www.llamaindex.ai/) and [Github](https://github.com/jerryjliu/llama_index) for integrating data ingestion and models.
    - [LlamaHub (community library of data loaders)](https://llamahub.ai)
    - [LlamaLab (cutting-edge AGI projects using LlamaIndex)](https://github.com/run-llama/llama-lab)
    - [Ollama.ai](https://olama.ai) Provides on mac silicon Llama2 calling. Has a great idea that resembles docker files for agent creation and pulling.
    - [Running Llama 2 and other Open-Source LLMs on CPU Inference Locally for Document Q&A](https://github.com/kennethleungty/Llama-2-Open-Source-LLM-CPU-Inference)
    - [Llama.cpp](https://github.com/ggerganov/llama.cpp) 4 bit llama on macbooks.


### Haystack

!!! code "[Haystack](https://github.com/deepset-ai/haystack) is an e2e llm orchestration framework that allows a number of versatile interactions."

### Griptape

!!! code "[Griptape](https://github.com/griptape-ai/griptape) an enterprise alternative to Langchain"
    [Docs]
#### Higher level

??? code "[Pytorch Lightning](https://lightning.ai/docs/pytorch/latest/) Enables model training with Pytorch and minimizes the boilerplate"

    [Model parallelism](https://lightning.ai/docs/pytorch/stable/advanced/model_parallel.html)

??? code "[Deep Speed (by MSFT)](https://github.com/microsoft/DeepSpeed) empowers ChatGPT-like model training with a single click, offering 15x speedup over SOTA RLHF systems with unprecedented cost reduction at all scales"
    [Blog on Deepspeed Ulysses](https://github.com/microsoft/DeepSpeed/tree/master/blogs/deepspeed-ulysses)
    ![image](https://github.com/microsoft/DeepSpeed/raw/master/blogs/assets/images/ds-chat-overview.png)

    DeepSpeed-Ulysses uses a simple, portable, and effective methodology for enabling highly efficient and scalable LLM training with extremely long sequence lengths
    "DeepSpeed-Ulysses partitions individual samples along the sequence dimension among participating GPU. Then right before the attention computation, it employs all-to-all communication collective on the partitioned queries, keys and values such that each GPU receives the full sequence but only for a non-overlapping subset of the attention heads. This allows the participating GPUs to compute attention for different attention heads in parallel. Finally, DeepSpeed-Ulysses employs another all-to-all to gather the results along the attention heads while re-partitioning along the sequence dimension."
    ![Ulysses](https://github.com/microsoft/DeepSpeed/blob/master/blogs/deepspeed-ulysses/media/image3.png)
    Tutorial [here](https://www.deepspeed.ai/tutorials/ds-sequence/)

#### Fine Tuning

!!! code "[LLM Finetuning Hub](https://github.com/georgian-io/LLM-Finetuning-Hub) is an evolving model finetuning codebase. "

#### Agents

- [AgentOps](https://github.com/AgentOps-AI/agentops)

#### Orchestration

??? code "[EmbedChain](https://github.com/embedchain/embedchain)  is a framework to easily create LLM powered bots over any dataset."
    Example:
    ```python
        import os

        from embedchain import Llama2App

        os.environ['REPLICATE_API_TOKEN'] = "REPLICATE API TOKEN"

        zuck_bot = Llama2App()

        # Embed your data
        zuck_bot.add("youtube_video", "https://www.youtube.com/watch?v=Ff4fRgnuFgQ")
        zuck_bot.add("web_page", "https://en.wikipedia.org/wiki/Mark_Zuckerberg")

        # Nice, your bot is ready now. Start asking questions to your bot.
        zuck_bot.query("Who is Mark Zuckerberg?")
        # Answer: Mark Zuckerberg is an American internet entrepreneur and business magnate. He is the co-founder and CEO of Facebook.
    ```

??? tip "[txtai](https://github.com/neuml/txtai) 'is an all-in-one embeddings database for semantic search, LLM orchestration and language model workflows."

    ![image](https://raw.githubusercontent.com/neuml/txtai/master/docs/images/architecture.png#gh-light-mode-only)

- [Flowise](https://github.com/FlowiseAI/Flowise)
- [Chain Forge](https://github.com/ianarawjo/ChainForge) A data flow prompt engineering environment for evaluating ana analyzing LLM responses
- [llm-chain](https://docs.llm-chain.xyz/docs/introduction) ChatGPT and Alpaca support. Agentic with bash commands.n
- [Agent Flow](https://github.com/simonmesmith/agentflow)
- [Auto Chain](https://github.com/Forethought-Technologies/AutoChain)
- [Chatall](https://github.com/sunner/ChatALL) To interact with multiple chatbots at the same time.
- [LocalAI](https://github.com/go-skynet/LocalAI) drop-in replacement REST API that’s compatible with OpenAI API specifications for local inferencing.

!!! code "[Open Agent](https://github.com/dot-agent/openagent) IN DEVELOPMENT Microservices approach to AGI. Modular components for AI apps or AGI agents"

??? code "[DSPY](https://github.com/stanfordnlp/dspy) is a framework for solving advanced tasks with language models and retrieval models"
    Useful for exploring automatic prompt opteimization.


### Language-like interfaces
??? code "[LMQL](https://github.com/eth-sri/lmql) is a query language that enables simplified representations of chats and agents with minimal code. "
    ```
    "Greet LMQL:[GREETINGS]\n" where stops_at(GREETINGS, ".") and not "\n" in GREETINGS

    if "Hi there" in GREETINGS:
        "Can you reformulate your greeting in the speech of \
         victorian-era English: [VIC_GREETINGS]\n" where stops_at(VIC_GREETINGS, ".")

    "Analyse what part of this response makes it typically victorian:\n"

    for i in range(4):
        "-[THOUGHT]\n" where stops_at(THOUGHT, ".")

    "To summarize:[SUMMARY]"
    ```

### Control libraries

* Guidance
* RELM
* Outlines

### Retrieval Augmentation focus

!!! code "[RAGAS](https://github.com/explodinggradients/ragas) is a framework that helps you evaluate your Retrieval Augmented Generation (RAG) pipelines"
