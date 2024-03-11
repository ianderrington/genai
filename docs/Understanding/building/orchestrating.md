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


## Monitoring Gen()AI
For reasons related to quality, ethics, and regulation, it is both useful, and at times required, to record both inputs, and outputs from an LLM. Particularly in systems that may be used in non low-risk settings, monitoring is an essential component of Gen()AI.  Also known as _LLM observability_, monitoring can people-in-the-loop, as well as automated systems to observe and adapt the system to both inputs and outputs that are undesired or dangerous.

### Agents

- [AgentOps](https://github.com/AgentOps-AI/agentops)



#### Llama ecosystem

!!! code "[Llamaindex](https://github.com/run-llama/llama_index) Provides an orchestration framework for with multiple connectors"

!!! code "[Llama Lab](https://github.com/run-llama/llama-lab) enables flexible tools to use and indesx various tools"

!!! tip "[Llama](https://ai.meta.com/llama/) is a library and set of models that has an expanding community due to the generally open-source nature of high-quality Llama 2 model."

??? code "[LLaMA2-Accessory: An Open-source Toolkit for LLM Development 🚀](https://github.com/Alpha-VLLM/LLaMA2-Accessory)
    🚀LLaMA2-Accessory is an open-source toolkit for pretraining, finetuning and deployment of Large Language Models (LLMs) and multimodal LLMs. This repo is mainly inherited from LLaMA-Adapter with more advanced features.🧠
    ![image](https://github.com/ianderrington/genai/assets/76016868/d55e274a-13af-40bd-9586-3bf56557175b)

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
    Open source by DeepSet
    Designed for scaleable search and retrieval
    Evaluation pipelines for system eval
    Deployable as REST API

### Griptape

!!! code "[Griptape](https://github.com/griptape-ai/griptape) an enterprise alternative to Langchain"
    Open source / managemed
    Commercial Support
    Optimized for scalability and cloud
    Encryption, access control, security
    