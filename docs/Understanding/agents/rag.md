# Retrieval-Augmented Generation (RAG)

Trained and fine-tuned LLMs can generate high quality results, though their generated results will be generally confined to the information they have been trained on. Additionally, their responses can suffer from:

* **Hallucinations** that create false or inaccurate information 
* Lack of **attributon** making it difficult to ascertain validity
* **Staleness** due to new or updated information 

Retrieval-Augmented Generation (RAG) helps to solve that by coupling the information to external memory.  Here is a basic comparison. 

<div class ="grid cards" markdown>

=== "Without RAG"
```mermaid
graph LR
 style Input fill:#FFA500,stroke:#333,stroke-width:2px
 style Prompt fill:#FFA500,stroke:#333,stroke-width:2px
 style Generator fill:#0000FF,stroke:#333,stroke-width:2px
 style Output fill:#800080,stroke:#333,stroke-width:2px

 Input --> Generator
 Prompt --> Generator
 Generator --> Output
```

=== "With RAG"
```mermaid
graph LR
    style Docs fill:#FF0000,stroke:#333,stroke-width:2px
    style QueryEncoder fill:#FF0000,stroke:#333,stroke-width:2px
    style DocEncoder fill:#FF0000,stroke:#333,stroke-width:2px
    style Retriever fill:#FF0000,stroke:#333,stroke-width:2px
    style Input fill:#FFA500,stroke:#333,stroke-width:2px
    style Prompt fill:#FFA500,stroke:#333,stroke-width:2px
    style Context fill:#FFA500,stroke:#333,stroke-width:2px
    style Generator fill:#0000FF,stroke:#333,stroke-width:2px
    style Output fill:#800080,stroke:#333,stroke-width:2px

    QueryEncoder --> Retriever
    Input --> Generator
    Input --> QueryEncoder
    Docs --> DocEncoder
    DocEncoder --> Retriever
    
    Retriever --> Context
    
    Prompt --> Generator
    Context --> Generator
    Generator --> Output
```
</div>

Original inceptions of RAG involve queries that involve connecting with [../architectures/embedding.md] based lookups, though other lookup mechanisms, including key-word searches and other lookups from [memory](./memory.md) sources may also be possible. 

!!! warning "RAG is still an area of optimization with a number of components that may be optimized"
   These areas of optimization include:
   
   * Manner of document encoding and chunking
   * Manner of query encoding when and what to retrieve.
   * How to combine the contexts with the prompts

One of the seminal papers on RAG, [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/pdf/2005.11401.pdf) introduced a complete solution for enabled training the models themselves for embeddings that would better-enable retrieval. Many present incarnations of RAG append information based on document lookup methods that do not include model fine-tuning to improve the document embedding. 

## RAG vs Finetuning


??? code "[Rag vs Finetuning](https://github.com/informagi/RAGvsFT) reveals Fine tuning boosts performance over RAG"  
   [Paper](https://arxiv.org/abs/2403.01432)
   
### Why use RAG?

Large foundation models are trained on large corporas of public (and sometimes private) data. Models may lose effective semantic grounding because of the breadth of implicing knowledge they have codified in the next-token predictors. To improve the groundedness and appropriateness of the desired output, RAG fetches appropriate information that can be combined with the prompt context in order for the LLM to generate appropriate results. This can be particularly important when there is information that my be changing, and needs to be incorporated quickly. 

Importantly, iou can use RAG to help with for data summarization, question-answeering, and the ability to 'know how' information is generated in a somewhat more interpretable manner. 

!!! important "Use RAG because: "
    * You need knowledge beyond the LLM's training set
    * You want to minimize hallucinations
    * Your data can be highly dynamic
    * The results need to interpretable
    * You don't have training data available

### Why not use RAG? 

The primary challenges regarding rag may be related to organizational or functional challenges. 

!!! warning "Don't use RAG because:"
    * You have Latency requirements that RAG retrieval may induce.
    * You don't want to pay for, or maintain and support a RAG database. 
    * There are ethical or privacy concerns relating to sending data to a third-party API
    * 


## RAG in Detail

The RAG process can be divided into two main stages: Preparation (offline) and Retrieval and Generation (online).

```mermaid
    graph TB
        A[Prepare \n Relevant \n Data] -->|Format | B(Embedding Model)
        B --> I[Indexing]
        I --> |Store| D
        C[User Question] --> |Transform| Q(Query)
        Q --> B
        B -->|Find| D[Vector Database]
        %% B --> |Search|D
        D --> |Retrieve| E[Assemble relevant documents]
        E --> F[Prompt: Original Question + Context]
        C --> F
        F -->|Generate| G[LLM]
        G --> H[Answer]
```

### Data Preparation 

The preparation stage involves the following steps in an offline manner

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



### Indexing Data

Indexing will involve Loading Data, Splitting data, Embedding Data, Adding Metadata, Storing the data.  identified data into 

#### Loading Data

Different data types require different loaders. Raw text, PDFs, spreadsheets, and more proprietary formats need to be processed in a way that the information is of highest relevance to data. Text is easy to process, but some data, especially multimodal data like PDFs, may need to be formatted with a schema to allow for more effective searching.

### Splitting Data

Once data has been loaded in a way that a model can process it, it must be split. There are several ways of splitting data:

1. By the max size a model can handle.
2. By some heuristic break, such as `.` sentences, `\n` return characters or `\p` paragraphs or newlines.
3. In a manner that maximizes the topic coherence. In this case, splitting and embedding may happen simultaneously.

#### Embedding Data

Index Building - One of the most useful tricks is multi-representation indexing: decouple what you index for retrieval (e.g., table or image summary) from what you pass to the LLM for answer synthesis (e.g., the raw image, a table). [Read more](https://blog.langchain.dev/semi-structured-multi-modal-rag/.)

#### Adding metadata

Information such as dates, chapters, or key words can allow for filtering and key-word lookup. 

#### Storing Data

The embedded data is stored for future retrieval and use. This is done via standarad database methods, with the use of embeddings as vector retrieval addresses as well as meta-data for more traditional search (key-word) methods.

### Indexing Data

It is useful to perform parallel indexing that keeps track of records that are put into vector stores. 

!!! info "[Indexing](https://blog.langchain.dev/syncing-data-sources-to-vector-stores/)" indexing-vector-records
    Indexing helps to improves performance saving time and money by not:
    * Re-processing unchanged content
    * Re-computing embeddings of unchanged content 
    * Inserting duplicated content


The langchain [Blog](https://blog.langchain.dev/syncing-data-sources-to-vector-stores/) and docs on [indexing](https://python.langchain.com/docs/modules/data_connection/indexing) provide quality discussions on these topics. 



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

Depending on the question asked, queries may need to be routed to different sources of data. OpenAI's [RAG strategies](https://blog.langchain.dev/applying-openai-rag/) provides some guidance on question routing: 

#### Matching

Matching involves aligning the query with the appropriately stored information. This can be done with vector-only, or


##### Small to big lookup

#### Reranking

Reranking 

### Generating

The final step is generating an output using a prompt that integrates the query and retrieved data.

## Other Topics
??? code "[Time stamp aware vector storage](https://github.com/timescale/tsv-timemachine)"



* **Multi-Modal:** This approach is used for RAG on a substack that has many images of densely packed tables, graphs. [Here](https://github.com/langchain-ai/langchain/blob/master/cookbook/Multi_modal_RAG.ipynb) is an example implementation.

* **Semi-Structured:** This approach is used for RAG on documents with tables, which can be split using naive RAG text-splitting that does not explicitly preserve them. [Here](https://github.com/langchain-ai/langchain/blob/master/cookbook/Semi_Structured_RAG.ipynb) is an example implementation.

## Important references

??? important "[Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/pdf/2005.11401.pdf) introduces a complete solution for enabling improved response generation with LLMs."

    <img width="1153" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/493156fe-322d-42e6-8b26-98e199676cb6">
    The authors reveal that allowing for fine tuning of the models when equipped with RAG improved the results. 
    <img width="598" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/05ffefbd-4fd7-4d4e-9ec4-0719e66e1791">


## Tutorials and Blogs

- [Langchain Question Answering](https://python.langchain.com/docs/use_cases/question_answering/)
- [RAG demystified](https://github.com/pchunduri6/rag-demystified/blob/main/complex_qa.py)
- [Mastering RAG: How To Architect An Enterprise RAG System](https://www.rungalileo.io/blog/mastering-rag-how-to-architect-an-enterprise-rag-system)

???+ important "[12 RAG Pain Points and Proposed Solutions](https://arxiv.org/pdf/2401.05856.pdf)" 12-rag-pain-points-and-solutions
    Things that might lead to failure of RAG pipeline. Mostly taken from the [blog]( https://towardsdatascience.com/12-rag-pain-points-and-proposed-solutions-43709939a28c)
    
    Pain point:
      * and solutions
    
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

## Resources
!!! code "[Advanced Rag small to big](https://colab.research.google.com/github/sophiamyang/demos/blob/main/advanced_rag_small_to_big.ipynb)" 
    [Blog](https://towardsdatascience.com/advanced-rag-01-small-to-big-retrieval-172181b396d4)
    
!!! code "[Advanced Retreival Augmented Generation from Theory to Llamaindex](https://github.com/weaviate/recipes/blob/main/integrations/llamaindex/retrieval-augmented-generation/advanced_rag.ipynb)"
    [Blog](https://towardsdatascience.com/advanced-retrieval-augmented-generation-from-theory-to-llamaindex-implementation-4de1464a9930)

!!! note "[RAG vs finetuning](https://towardsdatascience.com/rag-vs-finetuning-which-is-the-best-tool-to-boost-your-llm-application-94654b1eaba7)"


    
