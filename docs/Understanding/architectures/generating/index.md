# Generating

Generating new data from an input involves selecting the next best token, or set of tokens, given an input query and an output logit vector.

Output quality can be improved at three different points in the pipeline: better pre-conditioning the [prompts](../../prompting/index.md), improving [token generation](./token_generation.md) itself, and enabling iterative cycles as in [test-time inference](./test_time_inference.md), which produces [chain-of-thought](../../agents/components/cognitive_architecture.md#chain-of-thought)-like outputs. Each of these improves results at the cost of additional computation time.

To improve the input prompts, relevant information is retrieved and used to augment the original query before it reaches the model. This process is known as [retrieval-augmented generation (RAG)](rag.md), which can also draw on explicit knowledge representations like [knowledge graphs](./knowledge_graphs.md) to augment whatever implicit knowledge is already embedded in the LLM's weights.

Once a prompt reaches the model, [token generation](./token_generation.md) can be improved by refining how output tokens are actually sampled from the predicted logits, which affects both accuracy and latency.


