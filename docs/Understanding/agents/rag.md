# Retrieval-Augmented Generation (RAG)

Large Language Models (LLMs) can be made more useful by enabling them to access a set of information relevant to the prompt at hand. This can be achieved by extracting information from vector, SQL, and no-SQL [memory](./memory.md) and feeding it into the LLM. This approach, known as Retrieval-Augmented Generation (RAG), was introduced in 2020 in [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/pdf/2005.11401.pdf). It has shown impressive results in improving the generation of content. However, it is still an area of active development and research, and fully optimized solutions are not always available.

## RAG Process

The RAG process can be divided into two main stages: Preparation (offline) and Retrieval and Generation (online).

```mermaid
    graph TB
        A[Proprietary Data] -->|Format | B(Embedding Model)
        C[User Question] --> |Transform| Q(Query)
        Q --> B
        B -->|Store| D[Vector Database]
        B --> |Search|D
        D --> |Retrieve| E[Assemble relevant documents]
        E --> F[Prompt: Original Question + Context]
        C --> F
        F -->|Generate| G[LLM]
        G --> H[Answer]
```

### Preparation (offline)

The preparation stage involves the following steps:

1. **Data Selection:** Choose the appropriate data to ingest.
2. **Loading Data:** Load the data in a manner that can be consumed by the models.
3. **Splitting Data:** Split the data into chunks that can be both consumed by the model and retrieved with a reasonable degree of data.
4. **Embedding Data:** Embed the data.
5. **Storing Data:** Store the embedding.

### Retrieval and Generation (online)

The retrieval and generation stage involves the following steps:

1. **Retrieving Data:** Retrieve the data based on input in such a way that relevant documents and chunks can be used in downstream chains.
2. **Generating Output:** Generate an output using a prompt that integrates the query and retrieved data.

## Detailed Steps

### Data Selection

Users should only access data that is appropriate for their application. However, including too much information might be unnecessary or harmful to retrieval if the [retrieval](#retrieval) cannot handle the volume or complexity of data. It is also crucial to ensure data privacy when providing data that might not be appropriate (or legal) to access.

### Loading Data

Different data types require different loaders. Raw text, PDFs, spreadsheets, and more proprietary formats need to be processed in a way that the information is of highest relevance to data. Text is easy to process, but some data, especially multimodal data like PDFs, may need to be formatted with a schema to allow for more effective searching.

### Splitting Data

Once data has been loaded in a way that a model can process it, it must be split. There are several ways of splitting data:

1. By the max size a model can handle.
2. By some heuristic break, such as `\n` return characters or `\p` paragraphs or newlines.
3. In a manner that maximizes the topic coherence. In this case, splitting and embedding may happen simultaneously.

### Embedding Data

Index Building - One of the most useful tricks is multi-representation indexing: decouple what you index for retrieval (e.g., table or image summary) from what you pass to the LLM for answer synthesis (e.g., the raw image, a table). See blog:
https://blog.langchain.dev/semi-structured-multi-modal-rag/.

### Storing Data

The embedded data is stored for future retrieval and use.

### Retrieving Data

The decision and act to retrieve the documents will depend on the additional contexts that the agents may need to be aware of.

It might not always be necessary to retrieve documents. When it is necessary to retrieve the document, it is important to know where to retrieve from [routing](#routing), and then [matching](#matching) the query to the appropriately stored information. Both of these may involve [rewriting](#query-transformations) the prompt to be more effective in the manner the data is retrieved.

#### Query Transformations

Query transformations can be done in several ways, including:

1. **Rewrite-Retrieve-Read:** This approach involves rewriting the query for better retrieval and reading of the relevant documents.

    ??? important "[Query Rewriting for Retrieval-Augmented Large Language Models](https://arxiv.org/pdf/2305.14283.pdf)"

        <img width="630" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/b518994c-a419-4cc3-b065-065c0ca625d1">



2. **Step Back Prompting:** This method generates an intermediate context that helps to 'abstract' the information. Once generated, the additional context can be used.

    ???+ example "[Step back](https://smith.langchain.com/hub/langchain-ai/stepback-answer)"
        ```markdown
        You are an expert of world knowledge. I am going to ask you a question. Your response should be comprehensive and not contradicted with the following context if they are relevant. Otherwise, ignore them if they are not relevant.

        {normal_context}
        {step_back_context}

        Original Question: {question}
        Answer:
        ```

    ??? example "[Take a Step Back: Evoking Reasoning via Abstraction in Large Language Models](https://arxiv.org/pdf/2310.06117.pdf)"

        ![image](https://github.com/ianderrington/genai/assets/76016868/970df1c9-cdfc-4a9e-9dcf-f83944e6102c)

4. **Question Rephrasing:** Particularly in chat settings, it's important to include all of the appropriate context to create an effective search query.

    ???+ example "[Rephrase question](https://smith.langchain.com/hub/langchain-ai/weblangchain-search-query)"

        ```markdown
            Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

            Chat History:
            {chat_history}
            Follow Up Input: {question}
            Standalone Question:
        ```

5. **Question Partitioning:** Some questions may require individual pieces of information to be found to answer the question. This means breaking the question apart into multiple pieces.

#### Routing

Queries may need to be routed to different data sources depending on what is being asked. Recent blog reviewing OpenAI's RAG strategies provides some guidance on question routing: https://blog.langchain.dev/applying-openai-rag/

#### Matching

Matching involves aligning the query with the appropriately stored information.

### Generating

The final step is generating an output using a prompt that integrates the query and retrieved data.

## Other Topics
??? code "[Time stamp aware vector storage](https://github.com/timescale/tsv-timemachine)"



* **Multi-Modal:** This approach is used for RAG on a substack that has many images of densely packed tables, graphs. [Here](https://github.com/langchain-ai/langchain/blob/master/cookbook/Multi_modal_RAG.ipynb) is an example implementation.

* **Semi-Structured:** This approach is used for RAG on documents with tables, which can be split using naive RAG text-splitting that does not explicitly preserve them. [Here](https://github.com/langchain-ai/langchain/blob/master/cookbook/Semi_Structured_RAG.ipynb) is an example implementation.

## Tutorials and Blogs

- [Langchain Question Answering](https://python.langchain.com/docs/use_cases/question_answering/)
- [RAG demystified](https://github.com/pchunduri6/rag-demystified/blob/main/complex_qa.py)
- [Mastering RAG: How To Architect An Enterprise RAG System](https://www.rungalileo.io/blog/mastering-rag-how-to-architect-an-enterprise-rag-system)

???+ important "[12 RAG Pain Points and Proposed Solutions](https://arxiv.org/pdf/2401.05856.pdf)" 12-rag-pain-points-and-solutions
    Things that might lead to failure of RAG pipeline. Mostly taken from the [blog]( https://towardsdatascience.com/12-rag-pain-points-and-proposed-solutions-43709939a28c)
    
    !!! test "this is a test"
        hi abou

    Pain point:
      And solutions
    
    1: Missing Content:

    * Clean your data
    * Better prompting

    2: Missed the Top Ranked Documents

    * Hyperparameter tuning for `chunk_size` and `similarity_top_k` as in [Hyperparameter Optimization for RAG](https://docs.llamaindex.ai/en/stable/examples/param_optimizer/param_optimizer.html). 
    * Reranking [notebook](https://docs.llamaindex.ai/en/stable/examples/node_postprocessor/CohereRerank.html) usses [Improving Retrieval Performance by Fine-tuning Cohere Reranker with LlamaIndex](https://blog.llamaindex.ai/improving-retrieval-performance-by-fine-tuning-cohere-reranker-with-llamaindex-16c0c1f9b33b) and `CohereRank` to rerank the results 
    ```python
        import os
        from llama_index.postprocessor.cohere_rerank import CohereRerank

        api_key = os.environ["COHERE_API_KEY"]
        cohere_rerank = CohereRerank(api_key=api_key, top_n=2) # return top 2 nodes from reranker

        query_engine = index.as_query_engine(
            similarity_top_k=10, # we can set a high top_k here to ensure maximum relevant retrieval
            node_postprocessors=[cohere_rerank], # pass the reranker to node_postprocessors
        )

        response = query_engine.query(
            "What did Sam Altman do in this essay?",
        )
    ```

    3: Not in Context — Consolidation Strategy Limitations

    * Tweak retrieval strategies
    * Finetune embeddings

    4: Not Extracted

    * Clean your Data
    * [Prompt Compression](https://arxiv.org/abs/2310.06839)
    * [Long Context Reorder](https://arxiv.org/abs/2307.03172) (put crucial content at beginning and end)

    5: Wrong Format

    * Output Parsing 
    * Pydantic 

    6: Incorrect Specificity

    * [small-to-big retrieval](https://docs.llamaindex.ai/en/stable/examples/retrievers/auto_merging_retriever.html)
    * [sentence window retrieval](https://docs.llamaindex.ai/en/stable/examples/node_postprocessor/MetadataReplacementDemo.html)
    * [recursive retrieval](https://docs.llamaindex.ai/en/stable/examples/query_engine/pdf_tables/recursive_retriever.html)
    * [Advanced Retriever](https://towardsdatascience.com/jump-start-your-rag-pipelines-with-advanced-retrieval-llamapacks-and-benchmark-with-lighthouz-ai-80a09b7c7d9d)

    7: Incomplete and Impartial Responses

    * [Query Transformations](https://docs.llamaindex.ai/en/stable/examples/query_transformations/query_transform_cookbook.html) 
    * [Pipeline Parallelization](https://github.com/run-llama/llama_index/blob/main/docs/examples/ingestion/parallel_execution_ingestion_pipeline.ipynb?__s=db5ef5gllwa79ba7a4r2&utm_source=drip)

    8: Data Ingestion Scalability

    * [Chain of table](https://arxiv.org/abs/2401.04398) and [Llama solution](https://github.com/run-llama/llama-hub/blob/main/llama_hub/llama_packs/tables/chain_of_table/chain_of_table.ipynb)
    * Mix-Self-Consistency Pack based on  [Rethinking Tabular Data Understanding with Large Language Models](https://arxiv.org/pdf/2312.16702v1.pdf) [Llama solution](https://github.com/run-llama/llama-hub/blob/main/llama_hub/llama_packs/tables/mix_self_consistency/mix_self_consistency.ipynb)

    9: Structured Data QA

    * Use Llama index `ChainOfTablePack` based on [Chain of Table](https://arxiv.org/abs/2401.04398)
    * Use [Llama index `MixSelfConsistencyQueryEngine`](https://github.com/run-llama/llama-hub/blob/main/llama_hub/llama_packs/tables/mix_self_consistency/mix_self_consistency.ipynb) based on [Rethinking Tabular Data Understanding with Large Language Models](https://arxiv.org/pdf/2312.16702v1.pdf)

    10: Data Extraction from Complex PDFs

    * Use [pdf2htmlEX](https://github.com/pdf2htmlEX/pdf2htmlEX)
    * Use `EmbeddedTablesUnstructuredRetrieverPack` in `LlamaIndex`

    11: Fallback Model(s):  Use a model router like
    -  [Neutrino](https://platform.neutrinoapp.com/) 
    
    ```python
        from llama_index.llms import Neutrino
        from llama_index.llms import ChatMessage

        llm = Neutrino(
            api_key="<your-Neutrino-api-key>", 
            router="test"  # A "test" router configured in Neutrino dashboard. You treat a router as a LLM. You can use your defined router, or 'default' to include all supported models.
        )

        response = llm.complete("What is large language model?")
        print(f"Optimal model: {response.raw['model']}")
    ```

    - [Openrouter](https://docs.llamaindex.ai/en/stable/examples/llm/openrouter.html#openrouter)

    ```python
        from llama_index.llms import OpenRouter
        from llama_index.llms import ChatMessage

        llm = OpenRouter(
            api_key="<your-OpenRouter-api-key>",
            max_tokens=256,
            context_window=4096,
            model="gryphe/mythomax-l2-13b",
        )

        message = ChatMessage(role="user", content="Tell me a joke")
        resp = llm.chat([message])
        print(resp)
    ```

    12: LLM Security

    * Use things like [Llama Guard](https://towardsdatascience.com/safeguarding-your-rag-pipelines-a-step-by-step-guide-to-implementing-llama-guard-with-llamaindex-6f80a2e07756?sk=c6cc48013bac60924548dd4e1363fa9e)



    