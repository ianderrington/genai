
## Chains

Chains can be considered linked generative interactions where information can be processed with interepreters, tools, or other agents/GenAIs.
Done well, they can be built up to form reasoning systems that can enable more successful reasoning, or task completion. 

These cna enable passing concepts or data and re-introducing them directly throughout the database. 


## Basic Chains

Break an article up. This concept needs to carry forward in all mentions of items.

jStarting from an input, an input may first analyzed with another algorithm, such as by splitting or substituting for html link for a token representing a variable. This output may then be directed to part of a template. The prompt-template. The prompt-templates then fill in the information. This information is then passed to the LLM. Then the LLM generates the output. This output may then again be processed to re-introduce extracted information removed the original prompt call (like htmls), to use the output to affect the next actions to be taken, such as printing the output for a person, calling programatic functions (tools) or sharing with specific downstream chains (routing).


### Examples

- Basic Chain (Chat) 
  - With human interaction
  - With prompt structuring. 

- Routing Chain

Chain with memory storage and retrieval
Chain with memory retrival 
Multi-model chains.

(Other chains from lang-chain)





## Resources

- [Chain of thought hub](https://github.com/FranxYao/chain-of-thought-hub)

## Concepts

### Thought Structures
- [Skeleton of Thought](https://huggingface.co/papers/2307.15337) A fun structure that resembles thoughtful creation of answers allowing for parallelization and hence speedup, with comparable or better results in answer generation. 
- [Large Language Model Guided Tree-of-Thought](https://arxiv.org/abs/2305.08291) [Github](https://github.com/jieyilong/tree-of-thought-puzzle-solver)
- ‼️[Tree of Thoughts: Deliberate Problem Solving with Large Language Models](https://arxiv.org/abs/2305.10601) [Github](https://github.com/ysymyth/tree-of-thought-llm)
IDEA: Write Tree of Thoughts into Langchain?

- ‼️[Meta Tree of thought](https://github.com/kyegomez/Meta-Tree-Of-Thoughts)

- [Graph of Thought](https://www.linkedin.com/posts/tonyseale_gpt4-promptengineering-semanticweb-activity-7075381524631580672-TAv3/) An excellent thought on what next to consider when dealing with knowledge (or other output like information) generation chains.
![image](https://github.com/ianderrington/genai/assets/76016868/9f195465-2b6b-47b7-9041-369ad0597649)


- [Certified Reasoning with Language models](https://arxiv.org/abs/2306.04031) A 'logical guide' tool that an LLM can use. It " uses _constrained decoding_ to ensure the model will incrementally generate one of the valid outputs." 

## Enhancements

- ‼️ [EmbedChain](https://github.com/embedchain/embedchain) Creates embeddings for bots to be used. 


## Implementation Frameworks

### Langchain
- ‼️[Langchain](https://python.langchain.com/en/latest/#) A primative python or javascript based primitive 'LLM' language that enables planned and agentic AI.
  - ‼️[Langflow](https://github.com/logspace-ai/langflow) 
  - ‼️[Awesome Langchain](https://github.com/kyrolabs/awesome-langchain)
  -   - ‼️[Toolkit](https://www.toolkit.club/) Generates LangChain plugins

#### Tutorials

  - https://www.pinecone.io/learn/langchain-prompt-templates/
  - https://learn.deeplearning.ai/langchain/lesson/3/memory

## Llama index
- [llama index](https://www.llamaindex.ai/) and [Github](https://github.com/jerryjliu/llama_index) for integrating data ingestion and models. 
- [LlamaHub (community library of data loaders)](https://llamahub.ai)
- [LlamaLab (cutting-edge AGI projects using LlamaIndex)](https://github.com/run-llama/llama-lab)

 
## Others
- ‼️[Flowise](https://github.com/FlowiseAI/Flowise)
- ！[Chain Forge](https://github.com/ianarawjo/ChainForge) A data flow prompt engineering environment for evaluating ana analyzing LLM responses
- ‼️[llm-chain](https://docs.llm-chain.xyz/docs/introduction) ChatGPT and Alpaca support. Agentic with bash commands.
- [Auto Chain](https://github.com/Forethought-Technologies/AutoChain) 
- ‼️[Ollama.ai](https://olama.ai) Provides on mac silicon Llama2 calling. Has a great idea that resembles docker files for agent creation and pulling.

