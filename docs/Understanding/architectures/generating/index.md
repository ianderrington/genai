# Generating

Generating new data from an input involves selecting the next best token or sets of tokens given an input query, and an output logit vector. 

There can be improving the ouput results by better pre-conditioning the [prompts](../../prompting/index.md), improving the [token generaton](./token_generation.md), and then by enabling iterative cycles as in [test time inference](./test_time_inference.md) that will iteratively produce [chain of thought](../../agents/components/cognitive_architectures.md#chain-of-though)-like outputs that can produce vastly improved results at the cost of additional computation time and speed. 

To improving the input prompts, information is found and used to augment the original query, and placing it in the context. This process is known as [retrieval augmented generation (RAG)](rag.md) that can also work with explicit knowledge representations with [knowledge graphs](./knowledge_graphs.md) to augment any implicit knowledge embodied in LLMs. 

Once submitted to the LLM, [token generation](./token_generation.md) can be improved by improving how output tokens are selected from predicted logits, helping to improve accuracy and latency. 


