### Memory Augmented Agents

A memory is considered a state associated with a llm-call and effects the ability of LLM to respond, thereby making the system an 'agent'. Memory augmented models enhance the capabilities of language models by retrieving information from trillions of tokens, improving their performance and efficiency. 

## Memory Considerations

Memory plays a crucial role in enhancing the efficiency of information recall and routing for different chains and agent interactions. In systems comprising Agents (and People), conversation buffers may be employed to keep track of information. These buffers can facilitate communication between any agents, storing response stacks that include agent-environment interactions.

Memory can be pushed (into prompt templates) and requested (based on GET memory requests from an LLM agent). 

Memory can be perfect records or compressed summaries, that are either templated or not. 

## Important References

For more information on memory implementations and caching, refer to the following resources:

- [Langchain `memory`](https://python.langchain.com/docs/modules/memory/)
- [Langchain `llm_caching`](https://python.langchain.com/docs/modules/model_io/models/llms/integrations/llm_caching)
- [Improving language models by retrieving from trillions of tokens](https://arxiv.org/pdf/2112.04426.pdf)

## Uses

### Input (prompt) Caching

Input caching is a technique that leverages memory to improve response time and efficiency. Instead of generating tokens based on the next input, it uses caching to identify responses that may have already been generated for similar prompts. This significantly enhances the efficiency of repeated queries. However, it may cause issues if the initial response was not satisfactory, as the system would return the same cached response.

### Parsed information routing

Parsed information routing involves directing parsed or processed information to the appropriate destination. This can be particularly useful in systems with multiple agents or complex workflows.

### Environmental interactions

This inclues changing finite-states, or otherwise tracked `state`, the agent or environment might have, 

# Implementations

Memory implementations can be based on memory types serialized and stored in many ways. Semantic searches can happen by looking at similar embeddings. 
These can be global or private, and structured inside agent classes or inside system message boards. They can be 'limited' or 'unlimited' (within appropriately established allocation limits). They can be in memory and stored on disk or in the cloud. They allow informaion to be routed at the appropriate time, and 'skipped' if necessary to work within context-window limitations.

Memory implementations can vary based on the type of memory used, and how it's serialized and stored. Semantic searches can be performed by comparing embeddings for similarity. These memory systems can be global or private, and can be structured within agent classes or within system message boards. They can be 'limited' or 'unlimited' (within appropriately established allocation limits). They can exist in memory, stored on disk, or in the cloud. They allow information to be routed at the appropriate time, and 'skipped' if necessary to work within context-window limitations.

## Types

### Vector databases

Vector databases, such as Pinecone, Qdrant, Weaviate, Chroma, Faiss, Redis, Milvus, and ScaNN, use embeddings to create query vector databases. These databases allow for efficient semantic searches. 

Please read this for more information  [Vector Databases (primer by Pinecone.io)](https://www.pinecone.io/learn/vector-database/)

- https://github.com/Helicone/helicone
- [Website](https://www.deeplake.ai/) [Github](https://github.com/activeloopai/deeplake)

### Other origins
