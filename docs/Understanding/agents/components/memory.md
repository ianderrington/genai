---
title: AI Memory Systems
description: How AI systems remember and learn from experience
bullets:
  - AI systems can now maintain memories across conversations and tasks
  - Vector databases enable AI to search through trillions of pieces of information
  - Different types of memory - from simple buffers to complex graphs - serve different purposes
---

Just like people, memory plays a crucial role in enhancing the efficiency of information generation. Memory can either be _global_ or external to the existence of an agent or an agent-network, or _internal_ to the network, and gained by [experiences](#experiential-memory) it gained during from the agent or agent-network's  efforts. Each of these types of memories are useful to extract information that is then placed into the LLM's [prompt-context](../../prompting/index.md) and allowing a more accurate generation of information, as in [retrieval augmented generation](../../architectures/generating/rag.md). Because of its importance [agentic rag](#agentic-rag) is itself an essential application of agents, and it uses [cognitive architectures](#cognitive-architectures) to improve its results. 

### Experiental-memory

Here we discuss _experiential memory_ based on the activity or action action of one or many agents. 

Recipients of LLM chat-interfaces with multiple sessions may benefit from stored experiential memory. Guarded by any default or manual firewalls, experiential memory may allow focused and enduring `memory tracks` that have more specific focuses. For instance, when a recipient is has used time to create something from scratch in a most effective manner, when that 'effective manner' needs to be understood to minimize the time necessary to do the same thing, or something similar. This is not unlikely why OpenAI enabled [memory for their agents](https://openai.com/blog/memory-and-new-controls-for-chatgpt). The way this memory is managed, and accessed is of prime importance to retention and `experiential transfer`, the sharing of experiences between different Agents without having to 'repeat' information. 

Types of memory include simple aspects such as _conversation buffers_ to keep track of what has been said be employed to keep track of information. These buffers, can be 'private',  can facilitate communication between any agents, storing response stacks that include agent-environment interactions. 

For text-based memory can consist of verbatim text record or some form compressed summary to reduce memory overhead. The memory may be stored in simple file-based formats, or more complexe databases, both eith or without some form of schema that allow for generally structured representation. 

Here are some general types of memory:

* Conversaton Buffers
* Scratch-pads
* Gists and Summarizaton
* Action-success lookups 

For example Open AI has launched [memory](https://openai.com/blog/memory-and-new-controls-for-chatgpt) for chatGPT, that stores relevant memory in a manner that allows the user control of what can be stored. It does not, yet, allow for memory compartmentalization of memories into groups that could help to focus relevance to generated content.

## Agentic RAG

Agentic rag refers to dynamic response generation using methods in [rag](../../architecture/generating/rag.md) coupled with [cognitive architectures](./cognitive_architectures.md)
 that aim to enable: 

* Autonomous Decision Making
* Iterative Refinement
* Dynamic workflow optimization

These systems will often involve query-chats to more properly understand the query's intent, if there is any ambiguity or otherwise unanswerable queries especially the 

!!! note "Single agent agentic rag"
    <img width="676" alt="image" src="https://github.com/user-attachments/assets/ef0842f2-fb41-4dec-bdd9-6122497eaeaf" />

!!! note "Multi-AGent Agentic Rag"
    <img width="643" alt="image" src="https://github.com/user-attachments/assets/e6325b83-657f-4c3a-b0a0-5c7714e438d6" />
    From [here](https://arxiv.org/pdf/2501.09136)

Often these systems have feedback observation after generation to detect and correct

* Hallucinations
* Answer relevance

## Storage and Retrieval Methods

Memory can be retrieved via look up methodes that involve data-base queries (SQL, Graph), though they can also use [vector lookups](#vector-databases). They can also be stored in simple ascii documents and search for via key-word lookups. 

### Traditional databases

Databases that rely on query-languages such as SQL or non-SQL based databases, or even 'csv-type' information stores can be accessed and generated using agents.

### Graph Databases

Graph Databases provide the ability to put information in relational contexts. Both native and not, they can allow for rich understandings of how things are connected, though sometimes overly complex. Often interacted with using query languages like [Cypher](https://neo4j.com/developer/cypher/), these can be sometimes challenging to extract the appropriate information, making their query very powerful. 

[Neo4j](https://towardsdatascience.com/enhancing-interaction-between-language-models-and-graph-databases-via-a-semantic-layer-0a78ad3eba49) has formed a semantic layer, as shown in the `tomasonjo/llm-movieagent` repository. 

!!! references
    For more information on memory implementations and caching, refer to the following resources:
    - [Langchain `memory`](https://python.langchain.com/docs/how_to/chatbots_memory/)
   


##  Solutions

??? abstract "[Mem0: provides memory for agents in an ice an easy manner](https://docs.mem0.ai/overview)"

??? abstract "[Graphiti](https://github.com/getzep/graphiti?tab=readme-ov-file)  builds dynamic, temporally aware Knowledge Graphs that represent complex, evolving relationships between entities over time."
    Graphiti ingests both unstructured and structured data, and the resulting graph may be queried using a fusion of time, full-text, semantic, and graph algorithm approaches.
    [GetZep: self-improving memory users, sessions and more](https://help.getzep.com/concepts)"

## Research

??? note "[A-MEM: Agentic Memory for LLM Agents](https://arxiv.org/pdf/2502.12110v1)"
    The authors generate dynamic memory structuring without static predetermined memory, based on Zettelkasten method. They have memory architectur that

    For each new memory, a comprehensive notes are made, and integrate with structured text attributes and embedding vectors for imilarity matching. it uses historical memory repository to create relevant connections and shared attributes. This allows dynamic evolution when new memories are incorporated. 
    (1) Link generation between memories with shared attributes/descriptions
    (2) Evolve existing memories to evolve with higher order patterns. 

    ![image](https://github.com/user-attachments/assets/b93c4368-7d08-45ce-9090-4dafc376aa82)

    Code not yet available here https://github.com/WujiangXu/AgenticMemory


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/lilakk/BooookScore) [BooookScore: A systematic exploration of book-length summarization in the era of LLMs](https://github.com/lilakk/BooookScore)" BooookScore
    **Developments** The authors reveal an effective manner of providing effective summaries of long books using two methods: 1. Hierarchichal merging of chunk-level summaries, and 2. Incremental update using a running summary. 
    ![image](https://github.com/ianderrington/genai/assets/76016868/2c711b18-d76f-4c75-b7fe-7960d8e7ef93)
    **Results** Human evaluation shows that "hierarchical merging produces more coherent summaries but may lack detail compared to incremental updating; closedsource models like GPT-4 and Claude 2 generate the most coherent summaries; and increasing chunk size can significantly improve incremental updating"
    [Paper](https://arxiv.org/abs/2310.00785)
    

??? abstract "[Read-agent: A Human-Inspired Reading Agent with Gist Memory of Very Long Contexts](https://github.com/read-agent/read-agent.github.io/)" read-agent
    [Jupyter notebook](https://github.com/read-agent/read-agent.github.io/blob/main/assets/read_agent_demo.ipynb)
    **Developments**
    
    The authors reveal a manner of reading long documents and summarizing it using Gist memory to deal with Long Contexts.
    
    **Problem**
    
    Context length of long inputs limits the ability for model to perform effectively and efficienntly. 

    **Solution** 

    With inspiration in how people interactively read long documents, the authors implement a simple prompting-based system that 

    1. Decides what content should be stored togeter in a memory episode
    2. Compresses those memories into short episodic memories called _gist memories_ and 
    3. Takes actions to look up sections in the original text if memory needs to be refreshed

    **Results**
    The simple method improves reading comperhension tasks at the same time as enabling context windows that are 3-20x bigger.

    [Paper](https://arxiv.org/pdf/2402.09727.pdf)



??? abstract "[MemGPT](https://github.com/cpacker/MemGPT)  allows you to build LLM agents with self-editing memory"
