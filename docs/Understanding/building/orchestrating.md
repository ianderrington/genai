#### Orchestration


### Interaction and Orchestration Frameworks and SDKs

Handling the inputs/outputs to GenAI in a consistent and reliable manner has spurred the creation of software libraries that can work with GenAI that is called as a service, or hosted locally.

#### LangChain
Langchain is an open source SDK that allows for creation and management of chat and RAG based interactions. It has a Large user community emphasizing extensions to multiple types of models and documents. It has entrprise offerings with Langsmith for observability, Langserve for serving. It alos can enable multi-agent interactions with lang-graph. 

!!! tip "[Langchain](https://python.langchain.com/en/latest/#) Is a thorough python and javascript orchestration language for adaptable, memory and tooling-equipped calls that can enable agentic AI."

!!! tip "![GitHub Repo stars](https://badgen.net/github/stars/langchain-ai/langserve) [LangServe](https://github.com/langchain-ai/langserve) will provide a hosted version of LangServe for one-click deployments of LangChain applications."

!!! tip "![GitHub Repo stars](https://badgen.net/github/stars/langchain-ai/opengpts) [OpenGPTs](https://github.com/langchain-ai/opengpts) Provides an open-source effort to integrate multiple LLMs, and builds upon Langchain, LangServe, and LangSmith"

**Their Stack**

![image](https://github.com/ianderrington/genai/assets/76016868/c66bf027-8556-43e6-8e73-de59c5e58d95)

They are building [Lang Smith](https://smith.langchain.com/) for more Low-code solutions for agentic needs.

- [Langchain service deployment](https://github.com/ajndkr/lanarky)
- [Awesome Langchain](https://github.com/kyrolabs/awesome-langchain)
- [Langflow](https://github.com/logspace-ai/langflow)
- [Toolkit](https://www.toolkit.club/) Generates LangChain plugins for javascript. May be deprecated.

**Tutorials:**

!!! tip "[GPT and PDFS](https://betterprogramming.pub/talking-to-pdfs-gpt-4-and-langchain-77f44f23505d)"


!!! tip "[Langchain prompt tmeplates](https://www.pinecone.io/learn/langchain-prompt-templates/)"

!!! tip "[Deep learn langchain](https://learn.deeplearning.ai/langchain/lesson/3/memory)"

#### Other SDKs

!!! abstract "[Semantic Kernel](https://github.com/microsoft/semantic-kernel)"
    [Github](https://github.com/microsoft/semantic-kernel/blob/main/samples/notebooks/python/00-getting-started.ipynb)


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/embedchain/embedchain) [EmbedChain](https://github.com/embedchain/embedchain)  is a framework to easily create LLM powered bots over any dataset."
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

??? tip "![GitHub Repo stars](https://badgen.net/github/stars/neuml/txtai) [txtai](https://github.com/neuml/txtai) 'is an all-in-one embeddings database for semantic search, LLM orchestration and language model workflows."

    ![image](https://raw.githubusercontent.com/neuml/txtai/master/docs/images/architecture.png#gh-light-mode-only)

- [Flowise](https://github.com/FlowiseAI/Flowise)
- [Chain Forge](https://github.com/ianarawjo/ChainForge) A data flow prompt engineering environment for evaluating ana analyzing LLM responses
- [llm-chain](https://docs.llm-chain.xyz/docs/introduction) ChatGPT and Alpaca support. Agentic with bash commands.n
- [Agent Flow](https://github.com/simonmesmith/agentflow)
- [Auto Chain](https://github.com/Forethought-Technologies/AutoChain)
- [Chatall](https://github.com/sunner/ChatALL) To interact with multiple chatbots at the same time.
- [LocalAI](https://github.com/go-skynet/LocalAI) drop-in replacement REST API that’s compatible with OpenAI API specifications for local inferencing.

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/dot-agent/openagent) [Open Agent](https://github.com/dot-agent/openagent) IN DEVELOPMENT Microservices approach to AGI. Modular components for AI apps or AGI agents"

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/stanfordnlp/dspy) [DSPY](https://github.com/stanfordnlp/dspy) is a framework for solving advanced tasks with language models and retrieval models"
    Useful for exploring automatic prompt opteimization.


### Language-like interfaces
??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/eth-sri/lmql) [LMQL](https://github.com/eth-sri/lmql) is a query language that enables simplified representations of chats and agents with minimal code. "
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

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/explodinggradients/ragas) is a framework that helps you evaluate your Retrieval Augmented Generation (RAG) [RAGAS](https://github.com/explodinggradients/ragas) is a framework that helps you evaluate your Retrieval Augmented Generation (RAG) pipelines"




#### Llama Index


??? abstract "[Create Llama](https://github.com/run-llama/create-llama) The easiest way to get started with LlamaIndex is by using create-llama."
    This CLI tool enables you to quickly start building a new LlamaIndex application, with everything set up for you.

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/run-llama/llama_index) [Llamaindex](https://github.com/run-llama/llama_index) Provides an orchestration framework for with multiple connectors"


!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/run-llama/llama-lab) [Llama Lab](https://github.com/run-llama/llama-lab) enables flexible tools to use and indesx various tools"


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/Alpha-VLLM/LLaMA2-Accessory) [LLaMA2-Accessory: An Open-source Toolkit for LLM Development 🚀](https://github.com/Alpha-VLLM/LLaMA2-Accessory)
    🚀LLaMA2-Accessory is an open-source toolkit for pretraining, finetuning and deployment of Large Language Models (LLMs) and multimodal LLMs. This repo is mainly inherited from LLaMA-Adapter with more advanced features.🧠
    ![image](https://github.com/ianderrington/genai/assets/76016868/d55e274a-13af-40bd-9586-3bf56557175b)


- [LlamaGPT](https://github.com/getumbrel/llama-gpt) A self-hosted, offline, ChatGPT-like chatbot, powered by Llama 2. 100% private, with no data leaving your device.


- [Lit-Llama](https://github.com/Lightning-AI/lit-llama)
- [MedAlpaca](https://github.com/kbressem/medAlpaca)


- [Llama-2 on a CPU](https://towardsdatascience.com/running-llama-2-on-cpu-inference-for-document-q-a-3d636037a3d8) and [Github](https://github.com/kennethleungty/Llama-2-Open-Source-LLM-CPU-Inference)
- [GPT LLM Training](https://github.com/mshumer/gpt-llm-trainer) Generates and trains fine-tuned LLAMA-2 LLMs for specific tasks.


- [llama index](https://www.llamaindex.ai/) at [Github](https://github.com/jerryjliu/llama_index) for integrating data ingestion and models.
- [LlamaHub (community library of data loaders)](https://llamahub.ai)
- [LlamaLab (cutting-edge AGI projects using LlamaIndex)](https://github.com/run-llama/llama-lab)


### Haystack

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/deepset-ai/haystack) [Haystack](https://github.com/deepset-ai/haystack) is an e2e llm orchestration framework that allows a number of versatile interactions."
    Open source by DeepSet
    Designed for scaleable search and retrieval
    Evaluation pipelines for system eval
    Deployable as REST API

### Griptape

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/griptape-ai/griptape) [Griptape](https://github.com/griptape-ai/griptape) an enterprise alternative to Langchain"
    Open source / managemed
    Commercial Support
    Optimized for scalability and cloud
    Encryption, access control, security
    

### Others

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/monarch-initiative/agent-smith-ai) [AGent Smith AI](https://github.com/monarch-initiative/agent-smith-ai) makes it easy to instantiate AI agents that can safely and easily call APIs and locally defined functions to interact with the world."

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/monarch-initiative/monarch-assistant) [Monarch Assistant](https://github.com/monarch-initiative/monarch-assistant) Uses AGent Smith for RAG purposes"

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/monarch-initiative/curate-gpt) [Curage GPT](https://github.com/monarch-initiative/curate-gpt)"





??? code "[Langfuse](https://github.com/langfuse/langfuse) is an open Source LLM Engineering platform with Traces, Evals, Prompt management, metrics and a playground" 

### Agents

!!! abstract "[AgentOps](https://github.com/AgentOps-AI/agentops)"



!!! abstract "[LangSmith](https://docs.smith.langchain.com/api-docs)"

!!! note "[Helicone](https://www.helicone.ai)"

!!! note "[AgentOps](https://www.agentops.ai)"