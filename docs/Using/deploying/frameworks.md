TODO, split this up in other documents up by what it does, not what it is.
There is a AI-Cambriatic explosion of services, methods, frameworks and tooling to better-enable the creation and deployment of models from beginning to end. While there may be complete end-to-end providers for generating valuable GenAI solutions, there is still a great deal of value in implementing and experimenting with your own stacks. 


- [Langchain](#langchain) is a early system that has stellar success with a principled design allowing for extensive applications to built on top of it. 
- [Llama Ecosystem](#llama-ecosystem) is a a community of Llama-focused modelers, based on the Meta model called Llama, Llama-2 and beyond. 
- [A number of others](#others).

## Frameworks 

The excitement about the tooling around Generative AI make it hard to keep up with development and deprecation of powerful frameworks and tools. Some of the mentioned references may not be fully completed, or even nascent repos to build their intended purposes (described here). Please let us know if we are missing anything [here](../../Managen.ai/contributing.md). 

## Engineering and Deployment

- [Deploying on Azure for Embeddings](https://github.com/ruoccofabrizio/azure-open-ai-embeddings-qna)
- [Integrating with Azure Services](https://www.youtube.com/watch?v=tW2EA4aZ_YQ)
- [Langchain service deployment](https://github.com/ajndkr/lanarky)


===

### General
??? code "[Tool Bench](https://github.com/OpenBMB/ToolBench) 'This project (ToolLLM) aims to construct open-source, large-scale, high-quality instruction tuning SFT data to facilitate the construction of powerful LLMs with general tool-use capability.'"

    ![image](https://github.com/OpenBMB/ToolBench/blob/master/assets/overview.png)


### Langchain

- [Langchain](https://python.langchain.com/en/latest/#) A primitive python or javascript-based primitive 'LLM' language that enables planned and agentic AI.
- [Langflow](https://github.com/logspace-ai/langflow) 
- [Awesome Langchain](https://github.com/kyrolabs/awesome-langchain)
- [Toolkit](https://www.toolkit.club/) Generates LangChain plugins

#### Tutorials

- https://www.pinecone.io/learn/langchain-prompt-templates/
- https://learn.deeplearning.ai/langchain/lesson/3/memory

### Llama ecosystem

Llama is Meta's now open-source model. Llama 2 is MIT and free for commercial use. 

- [Llama](https://ai.meta.com/llama/) Direct from the source 
- [Lit-Llama](https://github.com/Lightning-AI/lit-llama)
- [MedAlpaca](https://github.com/kbressem/medAlpaca)
- [Llama-2 on a CPU](https://towardsdatascience.com/running-llama-2-on-cpu-inference-for-document-q-a-3d636037a3d8) and [Github](https://github.com/kennethleungty/Llama-2-Open-Source-LLM-CPU-Inference)
- [GPT LLM Training](https://github.com/mshumer/gpt-llm-trainer) Generates and trains fine-tuned LLAMA-2 LLMs for specific tasks. 
- [llama index](https://www.llamaindex.ai/) and [Github](https://github.com/jerryjliu/llama_index) for integrating data ingestion and models. 
- [LlamaHub (community library of data loaders)](https://llamahub.ai)
- [LlamaLab (cutting-edge AGI projects using LlamaIndex)](https://github.com/run-llama/llama-lab)
- [Ollama.ai](https://olama.ai) Provides on mac silicon Llama2 calling. Has a great idea that resembles docker files for agent creation and pulling.
- [Running Llama 2 and other Open-Source LLMs on CPU Inference Locally for Document Q&A](https://github.com/kennethleungty/Llama-2-Open-Source-LLM-CPU-Inference)

### Others

??? tip "[txtai](https://github.com/neuml/txtai) 'is an all-in-one embeddings database for semantic search, LLM orchestration and language model workflows."

    ![image](https://raw.githubusercontent.com/neuml/txtai/master/docs/images/architecture.png#gh-light-mode-only)


- [Flowise](https://github.com/FlowiseAI/Flowise)
- [Chain Forge](https://github.com/ianarawjo/ChainForge) A data flow prompt engineering environment for evaluating ana analyzing LLM responses
- [llm-chain](https://docs.llm-chain.xyz/docs/introduction) ChatGPT and Alpaca support. Agentic with bash commands.
- [Agent Flow](https://github.com/simonmesmith/agentflow)
- [Auto Chain](https://github.com/Forethought-Technologies/AutoChain) 
