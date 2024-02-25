Just like people, memory plays a crucial role in enhancing the efficiency of information generation. Memory can either be _global_ or external to the existence of an agent or an agent-network, or _internal_ to the network, and gained by [experiences](#xperiential-memory) it gained during from the agent or agent-network's  efforts. Each of these types of memories are useful to extract information that is then placed into the LLM's [prompt-context](../prompting/index.md) and allowing a more accurate generation of information. 

Here we discuss _experiential memory_ based on the activity or action action of one or many agents. 

Recipients of LLM chat-interfaces with multiple sessions may benefit from stored experiential memory. Guarded by any default or manual firewalls, experiential memory may allow focused and enduring `memory tracks` that have more specific focuses. For instance, when a recipient is has used time to create something from scratch in a most effective manner, when that 'effective manner' needs to be understood to minimize the time necessary to do the same thing, or something similar. This is not unlikely why OpenAI enabled [memory for their agents](https://openai.com/blog/memory-and-new-controls-for-chatgpt). The way this memory is managed, and accessed is of prime importance to retention and `experiential transfer`, the sharing of experiences between different Agents without having to 'repeat' information. 

## Experiential Memory

Types of memory include simple aspects such as _conversation buffers_ to keep track of what has been said be employed to keep track of information. These buffers, can be 'private',  can facilitate communication between any agents, storing response stacks that include agent-environment interactions. 

For text-based memory can consist of verbatim text record or some form compressed summary to reduce memory overhead. The memory may be stored in simple file-based formats, or more complexe databases, both eith or without some form of schema that allow for generally structured representation. 

Here are some general types of memory:

* Conversaton Buffers
* Scratch-pads
* Gists
* Action-success lookups 

For example Open AI has launched [memory](https://openai.com/blog/memory-and-new-controls-for-chatgpt) for chatGPT, that stores relevant memory in a manner that allows the user control of what can be stored. It does not, yet, allow for memory compartmentalization of memories into groups that could help to focus relevance to generated content.

## Storage and Retrieval Methods

Memory can be retrieved via look up methodes that involve data-base queries (SQL, Graph), though they can also use [vector lookups](#vector-databaes). They can also be stored in simple ascii documents and search for via key-word lookups. 

### Traditional databases

Databases that rely on query-languages such as SQL or non-SQL based databases, or even 'csv-type' information stores can be accessed and generated using agents.


### Graph Databases

Graph Databases provide the ability to put information in relational contexts. Both native and not, they can allow for rich understandings of how things are connected, though sometimes overly complex. Often interacted with using query languages like [Cypher](https://neo4j.com/developer/cypher/), these can be sometimes challenging to extract the appropriate information, making their query very powerful. 

[Neo4j](https://towardsdatascience.com/enhancing-interaction-between-language-models-and-graph-databases-via-a-semantic-layer-0a78ad3eba49) has formed a semantic layer, as shown in the `tomasonjo/llm-movieagent` repository. 

y by an interpreter, though it is not guaranteed that the queries will be accurate. [TODO: Find reference some_reference_on_LLM_SQL]

!!! references
    For more information on memory implementations and caching, refer to the following resources:
    - [Langchain `memory`](https://python.langchain.com/docs/modules/memory/)
    - [Langchain `llm_caching`](https://python.langchain.com/docs/modules/model_io/architectures/llms/integrations/llm_caching)
    

### Vector databases

Vector databases, such as Pinecone, Qdrant, Weaviate, Chroma, Faiss, Redis, Milvus, and ScaNN, use embeddings to create query vector databases. These databases allow for efficient semantic searches.

- [Improving language models by retrieving from trillions of tokens](https://arxiv.org/pdf/2112.04426.pdf)

!!! example "Example vector databases"

    Please read this for more information  [Vector Databases (primer by Pinecone.io)](https://www.pinecone.io/learn/vector-database/)

    - https://github.com/Helicone/helicone
    - [Website](https://www.deeplake.ai/) [Github](https://github.com/activeloopai/deeplake)



## Text-

??? code "[Read-agent: A Human-Inspired Reading Agent with Gist Memory of Very Long Contexts](https://github.com/read-agent/read-agent.github.io/)" read-agent
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


