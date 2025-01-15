# Retrieval-Augmented Generation (RAG)

Trained and fine-tuned LLMs can generate high quality results, though their generated results will be generally confined to the information they have been trained on. Additionally, responses can suffer from:

* **[Confabulations and Hallucinations](../../overview/gen_ai/considerations.md#hallucinations-and-confabulations)** that create false or inaccurate information 
* Lack of **attributon** making it difficult to ascertain validity
* **Staleness** due to new or updated information 

**Retrieval-Augmented Generation (RAG) helps to solve these!!** is a context-augmentation method by coupling the information to external memory.  

Here is a basic comparison of the two: 

!!! example "Comparison with/without RAG"

    === "With"

        ```mermaid
        graph LR
            style QueryEncoder fill:#D2E1FA,stroke:#333,stroke-width:1px
            style QueryOptimizer1 fill:#E7B4E1,stroke:#333,stroke-width:1px
            style Query fill:#FADAD2,stroke:#333,stroke-width:1px
            style Prompt fill:#D2FAFA,stroke:#333,stroke-width:1px
            style Docs fill:#FADAD2,stroke:#333,stroke-width:1px
            style QueryOptimizer2 fill:#E7B4E1,stroke:#333,stroke-width:1px
            style DocEncoder fill:#D2E1FA,stroke:#333,stroke-width:1px
            style Retriever fill:#E1E7B4,stroke:#333,stroke-width:1px
            style Context fill:#B4E1E7,stroke:#333,stroke-width:1px
            style Generator fill:#FAD2E1,stroke:#333,stroke-width:1px
            style Answer fill:#E1FAD2,stroke:#333,stroke-width:1px

            QueryEncoder --> |Retrieve<br> from|Retriever
            Prompt --> Generator[LLM<br> Generation]
            Query --> Generator
            Query --> QueryOptimizer1(Query<br> Optimizer)
            QueryOptimizer1 --> QueryEncoder[Encoder]
            Docs --> QueryOptimizer2(Docs<br> Optimizer)
            QueryOptimizer2 --> DocEncoder[Encoder]
            DocEncoder --> |Index<br> to| Retriever[Database]
            
            Retriever --> Context
            
            Context --> Generator
            Generator --> Answer 
        ```

    === "Without"

        ```mermaid
        graph LR
            style Query fill:#E1FAD2,stroke:#333,stroke-width:1px
            style Prompt fill:#D2FAFA,stroke:#333,stroke-width:1px
            style Generator fill:#FAD2E1,stroke:#333,stroke-width:1px
            style Answer fill:#E1FAD2,stroke:#333,stroke-width:1px
        
            Query --> Generator[LLM Generation]
            Prompt --> Generator
            Generator --> Answer
        ```


        
Original inceptions of RAG involve queries that involve connecting with [Embedding](../models/embedding.md) based lookups, though other lookup mechanisms, including key-word searches and other lookups from [memory](../../agents/components/memory.md) sources may also be possible. 

!!! warning "RAG is still an area of optimization with a number of components that may be optimized"
   These areas of optimization include:
   
   * Manner of document encoding and chunking
   * Manner of query encoding when and what to retrieve.
   * How to combine the contexts with the prompts

One of the seminal papers on RAG, [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/pdf/2005.11401.pdf) introduced a solution for end-to-end training of models involving training document and query encoding, lookup and demosntrated revealing [improved results](https://contextual.ai/introducing-rag2/) over solutions where model components were frozen. For reasons of simplicity, however, a generally standard approach uses models that are frozen to embed and query documents. 

!!! danger "It is important to [Evaluate your system](../../optimizing/index.md) to ensure efficient efforts in using RAG."
   
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

#### RAG vs Finetuning

Because finetuning can enable intrisic knowledge to be ingrained in an LLM, it generally leads to improved performance. 

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/informagi/RAGvsFT) [Rag vs Finetuning](https://github.com/informagi/RAGvsFT) reveals Fine tuning boosts performance over RAG"  
    [Paper](https://arxiv.org/abs/2403.01432)

That said, it can be seen that using RAG to informe fine tuning, in Retrieval Augmented Fine Tuning (RAFT), as variations are done with [mixture of experts](../models/mixture_of_experts.md) can lead to even improved performance. 

??? abstract "[🦍 RAFT: Adapting Language Model to Domain Specific RAG](https://github.com/ShishirPatil/gorilla/blob/main/raft/raft.py)" raft
    <img width="676" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/813c5a4e-8a6f-408d-8629-e78df15d6c04">
    [Blog post](https://gorilla.cs.berkeley.edu/blogs/9_raft.html)
    [Paper](https://arxiv.org/abs/2403.10131)

## Types of RAG
2 Types of RAG:

▪️ Original RAG
▪️ Graph RAG
▪️ LongRAG
▪️ Self-RAG
▪️ Corrective RAG
▪️ EfficientRAG
▪️ Golden-Retriever
▪️ Adaptive RAG
▪️ Modular RAG
▪️ Speculative RAG
▪️ RankRAG
▪️ Multi-Head RAG

Save the list and check this out for more info: https://www.turingpost.com/p/12-types-of-rag

## Implementing RAg

The RAG process can be divided into two main stages: Preparation (offline) and Retrieval and Generation (online).

### Document Indexing (offline)

Indexing will involve Loading Data, Splitting data, Embedding Data, Adding Metadata, Storing the data.  

It is useful to perform parallel indexing that keeps track of records that are put into vector stores. 

!!! info "[Indexing](https://blog.langchain.dev/syncing-data-sources-to-vector-stores/)" indexing-vector-records

    Indexing helps to improves performance saving time and money by not:

    * Re-processing unchanged content
    * Re-computing embeddings of unchanged content 
    * Inserting duplicated content


The langchain [Blog](https://blog.langchain.dev/syncing-data-sources-to-vector-stores/) and docs on [indexing](https://python.langchain.com/docs/modules/data_connection/indexing) provide quality discussions on these topics. 

!!! important "Indexing process (clickable)"
    ```mermaid
    graph LR
        style DocumentSelection fill:#B4E1E7,stroke:#333,stroke-width:1px
        style LoadDocuments fill:#FAD2E1,stroke:#333,stroke-width:1px
        style SplitDocuments fill:#E1FAD2,stroke:#333,stroke-width:1px
        style EmbedDocumentSplits fill:#D2FAFA,stroke:#333,stroke-width:1px
        style StoringData fill:#FADAD2,stroke:#333,stroke-width:1px

        DocumentSelection[Select Documents] --> LoadDocuments[Load <br>Documents]
        LoadDocuments --> SplitDocuments[Split <br> Documents]
        SplitDocuments --> EmbedDocumentSplits[Embed <br> Document <br> Splits]
        EmbedDocumentSplits --> StoringData[Store in <br>Database]

        click DocumentSelection "#selecting-data"
        click LoadDocuments "#loading-data"
        click SplitDocuments "#splitting-data"
        click EmbedDocumentSplits "#embedding-data"
        click StoringData "#storing-data"

    ```

The preparation stage involves the following steps in an offline manner

1. **Data Selection:** Choose the appropriate data to ingest.
2. **Loading Data:** Load the data in a manner that can be consumed by the models.
3. **Splitting Data:** Split the data into chunks that can be both consumed by the model and retrieved with a reasonable degree of data.
4. **Embedding Data:** Embed the data.
5. **Storing Data:** Store the embedding.

#### Selecting Data

Users should only access data that is appropriate for their application. However, including too much information might be unnecessary or harmful to retrieval if the [retrieval](#retrieval) cannot handle the volume or complexity of data. It is also crucial to ensure data privacy when providing data that might not be appropriate (or legal) to access.


#### Loading Data

Different data types require different loaders. Raw text, PDFs, spreadsheets, and more proprietary formats need to be processed in a way that the information is of highest relevance to data. Text is easy to process, but some data, especially multimodal data like PDFs, may need to be formatted with a schema to allow for more effective searching.

#### Splitting Data

Once data has been loaded in a way that a model can process it, it must be split. There are several ways of splitting data:

1. By the max size a model can handle.
2. By some heuristic break, such as `.` sentences, `<br>` return characters or `\p` paragraphs or newlines.
3. In a manner that maximizes the topic coherence. In this case, splitting and embedding may happen simultaneously.

!!! note "[AST-T5: Structure-Aware Pretraining for Code Generation and Understanding](https://arxiv.org/pdf/2401.03003)"

??? abstract "[Late Chunking of Short Chunks in Long-Context Embedding Models](https://github.com/jina-ai/late-chunking?tab=readme-ov-file)"
    The authors show in their [Blog](https://jina.ai/news/late-chunking-in-long-context-embedding-models/)_and [Paper](https://arxiv.org/abs/2409.04701)
    <img width="685" alt="image" src="https://github.com/user-attachments/assets/8baff616-0eb8-4f86-9e51-3c48e8851546"> The use of tokenization initially and then pooling those intelligently for having better embeddings for lookup. 

??? note "[Contextual retrieval](https://www.anthropic.com/news/contextual-retrieval)" contextual-retrieval
    Anthropic reveals contextual-retrieval where entire documents are cached (for efficiency) and RAG-retrieval is significantly improved. They use the following to generate contextual chunks that are paired with the item when performing embedding. The results leads to significant (67% !!!) performance improvements. 
    ```markdown
    <document> 
    {{WHOLE_DOCUMENT}} 
    </document> 
    Here is the chunk we want to situate within the whole document 
    <chunk> 
    {{CHUNK_CONTENT}} 
    </chunk> 
    Please give a short succinct context to situate this chunk within the overall document for the purposes of improving search retrieval of the chunk. Answer only with the succinct context and nothing else. 
    ```
    ![image](https://github.com/user-attachments/assets/f7817126-2e24-418a-9809-8acc8ecbcf52)



#### Embedding Data

Index Building - One of the most useful tricks is multi-representation indexing: decouple what you index for retrieval (e.g., table or image summary) from what you pass to the LLM for answer synthesis (e.g., the raw image, a table). [Read more](https://blog.langchain.dev/semi-structured-multi-modal-rag/.)

##### Adding metadata

Information such as dates, chapters, or key words can allow for filtering and key-word lookup. 

#### Storing Data

The embedded data is stored for future retrieval and use. This is done via standarad database methods, with the use of embeddings as vector retrieval addresses as well as meta-data for more traditional search (key-word) methods.



### Retrieval and Generation (online)


The retrieval and generation stage involves the following steps:

1. **Retrieving Data:** Retrieve the data based on input in such a way that relevant documents and chunks can be used in downstream chains.
2. **Generating Output:** Generate an output using a prompt that integrates the query and retrieved data.

The decision and act to retrieve the documents will depend on the additional contexts that the agents may need to be aware of.

It might not always be necessary to retrieve documents. When it is necessary to retrieve the document, it is important to know where to retrieve from [routing](#routing), and then [matching](#matching) the query to the appropriately stored information. Both of these may involve [rewriting](#query-transformations) the prompt to be more effective in the manner the data is retrieved.

!!! important "Retrieval and generation (clickable)"
    ```mermaid
        graph LR
            style C fill:#B4E1E7,stroke:#333,stroke-width:1px
            style T fill:#FAD2E1,stroke:#333,stroke-width:1px
            style RR fill:#E1FAD2,stroke:#333,stroke-width:1px
            style R fill:#FADAD2,stroke:#333,stroke-width:1px
            style F fill:#E7B4E1,stroke:#333,stroke-width:1px
            style G fill:#D2E1FA,stroke:#333,stroke-width:1px
            style H fill:#E1E7B4,stroke:#333,stroke-width:1px

            C[Query] --> T[Optimize]
            T --> RR[Route]
            RR --> R[Match and <br>Rank Documents]
            R --> F[Combine With<br> Context]
            F --> G[LLM <br>Generation]
            G --> H[Answer]

            click T "#query-optimization"
            click RR "#routing"
            click R "#match-and-rank"
            click F "#CombineWithContext"
            click G "#LLMGeneration"
            click H "#Answer"
    ```

#### Query Optimization

In production settings, the queries that users ask are unlikely to be optimal for retrieval. This can be due to a combination of challenges such as questions that are. 

* Irrelevant
* Vague
* Not related to retrieval
* Are made of multiple questions

**Optimization** of queries, looks to improve these queries in several manners.

##### Rewrite-Retrieve-Read

This approach involves rewriting the query for better retrieval and reading of the relevant documents.

??? important "[Query Rewriting for Retrieval-Augmented Large Language Models](https://arxiv.org/pdf/2305.14283.pdf)"

    <img width="630" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/b518994c-a419-4cc3-b065-065c0ca625d1">


##### Step Back Prompting

This method generates an intermediate context that helps to 'abstract' the information. Once generated, the additional context can be used.

??? example "[Step back](https://smith.langchain.com/hub/langchain-ai/stepback-answer)"
    ```markdown
        You are an expert of world knowledge. I am going to ask you a question. Your response should be comprehensive and not contradicted with the following context if they are relevant. Otherwise, ignore them if they are not relevant.

        {normal_context}
        {step_back_context}

        Original Question: {question}
        Answer:
    ```

??? example "[Take a Step Back: Evoking Reasoning via Abstraction in Large Language Models](https://arxiv.org/pdf/2310.06117.pdf)"

    ![image](https://github.com/ianderrington/genai/assets/76016868/970df1c9-cdfc-4a9e-9dcf-f83944e6102c)

##### Query Rephrasing

Particularly in chat settings, it's important to include all of the appropriate context to create an effective search query.

??? example "[Rephrase question](https://smith.langchain.com/hub/langchain-ai/weblangchain-search-query)"

    ```markdown
        Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

        Chat History:
        {chat_history}
        Follow Up Input: {question}
        Standalone Question:
    ```

##### Query Decomposition

When questions are directly made of multiple questions, or the effective answer to these questions involves answering several sub-questions, breaking the questions into multiple queries may be essential. This may involve performing sequential queries that are created based on retrieved information, or queries that can be run irrespective of other results. [Langchain Query decomposition](https://python.langchain.com/docs/use_cases/query_analysis/techniques/decomposition)

##### Query Expasion

Can generate multiple rephrased versions of the query to increas the likelihood of a hit, or use the advanced retrieval methods to triangulate higher quality hits.

##### Query Clarifying

Particularly in chat settings when questions are vague, asking follow-up questions can be instrumental in ensuring the lookup can be as effective as possible. 

##### Query structuring

When answers to queries can be 'filtered' using meta-data based on elements of the queries can be highly valuable. This can include attributes such as _date_, _location_, _subjects_. See [Langchain's Query construction](https://blog.langchain.dev/query-construction/) for additional information related to this.


#### Routing

Depending on the question asked, queries may need to be routed to different sources of data, or indexes. OpenAI's [RAG strategies](https://blog.langchain.dev/applying-openai-rag/) provides some guidance on question routing: 

#### Matching and Ranking

Matching involves aligning the query with the appropriately stored information. 

#### Multi-Hop RAG

In order to effectively answer some queries, retrieval of evidence from multiple documents may be needed. This is known as **multi-hop** rag. 

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/yixuantt/MultiHop-RAG) [MultiHop-RAG: Benchmarking Retrieval-Augmented Generation for Multi-Hop Queries](https://github.com/yixuantt/MultiHop-RAG) provides a dataset for evaluating multihop rag"
    "MultiHop-RAG: a QA dataset to evaluate retrieval and reasoning across documents with metadata in the RAG pipelines. It contains 2556 queries, with evidence for each query distributed across 2 to 4 documents. The queries also involve document metadata, reflecting complex scenarios commonly found in real-world RAG applications."
    
    <img width="331" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/80db5bd9-510b-4c23-bf46-4d4679e1929b">


##### Small to big lookup
TODO xxx

#### Reranking

TODO xxx
Reranking 

### Generating responses

The final step is generating an output using a prompt that integrates the query and retrieved data.

Challenges in generating responses can involve

* Not having enough information: RAG can help minimize response generation of non-factual information, but only if retrieved information provides sufficient context to answer theq estion properly. If the question cannot be answered with a reasonable degree of certainty, then the response should be along the lines of _"I don't know."_ 
* Conflicting information: When retrieved results contain different responses to the same question, a difinitive response may not be possible
* Stale information: When information is no longer relevant.

## Advanced methods




## Multimodal Rag
Natural-language lookup with RAG can be improved by allowing other modalities, such as tables and images, at the same time. There are several ways that this may be accomplished as described in [Langchain's multi modal rag](https://blog.langchain.dev/semi-structured-multi-modal-rag/): 

    Option 1:
    
    Use multimodal embeddings (such as CLIP) to embed images and text
    Retrieve both using similarity search
    Pass raw images and text chunks to a multimodal LLM for answer synthesis
    
    Option 2:
    
    Use a multimodal LLM (such as GPT4-V, LLaVA, or FUYU-8b) to produce text summaries from images
    Embed and retrieve text
    Pass text chunks to an LLM for answer synthesis
    
    Option 3:
    
    Use a multimodal LLM (such as GPT4-V, LLaVA, or FUYU-8b) to produce text summaries from images
    Embed and retrieve image summaries with a reference to the raw image
    Pass raw images and text chunks to a multimodal LLM for answer synthesis

* **Multi-Modal:** This approach is used for RAG on a substack that has many images of densely packed tables, graphs. [Here](https://github.com/langchain-ai/langchain/blob/master/cookbook/Multi_modal_RAG.ipynb) is an example implementation, and [Here](https://github.com/langchain-ai/langchain/blob/master/cookbook/Semi_structured_multi_modal_RAG_LLaMA2.ipynb) is one that works with private data. 

* **Semi-Structured:** This approach is used for RAG on documents with tables, which can be split using naive RAG text-splitting that does not explicitly preserve them. [Here](https://github.com/langchain-ai/langchain/blob/master/cookbook/Semi_Structured_RAG.ipynb) is an example implementation.

## Evaluating and Comparing

Because of the large number of manners of performing RAG, it is important to evaluate the quality of the implemented solution. 

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/mendableai/rag-arena) [Rag Arena](https://github.com/mendableai/rag-arena) Provides interfaces with LangChain to provide a RAG chatbot experience where queries receive multiple responses." 

??? note "[Retrieval Augmented Generation (RAG) and Beyond: A Comprehensive Survey on How to Make your LLMs use External Data More Wisely](https://arxiv.org/pdf/2409.14924)" rag-and-beyond
    **Development:** The authors present a survey that introduces a RAG task categorization method that helps to classify user queries into four levels according to the type of external data required and the focus of the task. It summarizes key challenges in building robust data-augmented LLM applications and the most effective techniques for addressing them. 

    <img width="1023" alt="image" src="https://github.com/user-attachments/assets/330f93fa-2e4d-4862-a4ce-d98b039df186">

    In general, it breaks down the complexity of queries into several levels: 
    **L1: Explicit Fact Queries: ** To just answer specific questions based on document or snippets within the collection.
    **L2: Implicit Fact Queries: ** To answer questions involving data dependencies or some level of logical or common sense reasoning. 
    **L3: Interpretable Rational Queries: ** Queries that require external data to create rational for comparison. 
    **L4: Hidden Rational Queri8es**: They have domain specific reasoning that may not be explicitly described and difficult to enumerate.  
    
    <img width="1073" alt="image" src="https://github.com/user-attachments/assets/4afba3a0-34a9-411a-b92b-a403be847f80">

    <img width="1038" alt="image" src="https://github.com/user-attachments/assets/c3d35e52-b894-4805-bc44-e40dbaf241ad">



## Resources, Tutorials and Blogs
??? important "[Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/pdf/2005.11401.pdf) introduces a complete solution for enabling improved response generation with LLMs."

    <img width="1153" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/493156fe-322d-42e6-8b26-98e199676cb6">
    The authors reveal that allowing for fine tuning of the models when equipped with RAG improved the results. 
    <img width="598" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/05ffefbd-4fd7-4d4e-9ec4-0719e66e1791">

??? important "[12 RAG Pain Points and Proposed Solutions](https://arxiv.org/pdf/2401.05856.pdf)" 12-rag-pain-points-and-solutions
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

??? abstract "[Advanced Rag small to big](https://colab.research.google.com/github/sophiamyang/demos/blob/main/advanced_rag_small_to_big.ipynb)" 
    [Blog](https://towardsdatascience.com/advanced-rag-01-small-to-big-retrieval-172181b396d4)
    
??? abstract "[Advanced Retreival Augmented Generation from Theory to Llamaindex](https://github.com/weaviate/recipes/blob/main/integrations/llamaindex/retrieval-augmented-generation/advanced_rag.ipynb)"
    [Blog](https://towardsdatascience.com/advanced-retrieval-augmented-generation-from-theory-to-llamaindex-implementation-4de1464a9930)

??? note "[RAG vs finetuning](https://towardsdatascience.com/rag-vs-finetuning-which-is-the-best-tool-to-boost-your-llm-application-94654b1eaba7)"


- [Langchain Question Answering](https://python.langchain.com/docs/use_cases/question_answering/)
- [RAG demystified](https://github.com/pchunduri6/rag-demystified/blob/main/complex_qa.py)
- [Mastering RAG: How To Architect An Enterprise RAG System](https://www.rungalileo.io/blog/mastering-rag-how-to-architect-an-enterprise-rag-system)
- [RAG chatbot with Chat Embedding and Reranking (cohere)](https://txt.cohere.com/rag-chatbot/) and [Notebook](https://colab.research.google.com/github/cohere-ai/notebooks/blob/main/notebooks/RAG_Chatbot_with_Chat_Embed_Rerank.ipynb)

- [https://github.com/the-full-stack/ask-fsdl] 
