---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - Applications
  - Architecture
authors: parnian
---

# RAG: Retrieval-Augmented Generation Deep Dive

Retrieval-Augmented Generation (RAG) grounds language models in external knowledge, reducing hallucinations and enabling dynamic, up-to-date, and domain-specific responses without retraining.

## Why RAG Matters

```
LLM Alone:
├── Knowledge frozen at training cutoff
├── Hallucinates when uncertain
├── No source attribution
└── Expensive to update (retraining)

LLM + RAG:
├── Access to current information
├── Grounded in retrieved documents
├── Provides source citations
└── Update by changing the knowledge base
```

## Basic RAG Pipeline

```python
class BasicRAG:
    def __init__(self, embedder, vector_store, llm):
        self.embedder = embedder
        self.vector_store = vector_store
        self.llm = llm

    def answer(self, query, k=5):
        # 1. Embed the query
        query_embedding = self.embedder.encode(query)

        # 2. Retrieve relevant documents
        docs = self.vector_store.search(query_embedding, top_k=k)

        # 3. Build context
        context = "\n\n".join([doc.text for doc in docs])

        # 4. Generate answer
        prompt = f"""Based on the following context, answer the question.

Context:
{context}

Question: {query}

Answer:"""

        return self.llm.generate(prompt)
```

## Advanced Retrieval Strategies

### Hybrid Search

```python
class HybridRetriever:
    """Combine dense (semantic) and sparse (keyword) search."""

    def __init__(self, dense_index, sparse_index, alpha=0.5):
        self.dense = dense_index   # FAISS, Pinecone, etc.
        self.sparse = sparse_index  # BM25, Elasticsearch
        self.alpha = alpha  # Weight between dense and sparse

    def search(self, query, k=10):
        # Dense retrieval (semantic similarity)
        dense_results = self.dense.search(
            self.embedder.encode(query), k=k*2
        )

        # Sparse retrieval (keyword matching)
        sparse_results = self.sparse.search(query, k=k*2)

        # Reciprocal Rank Fusion
        return self.rrf_fusion(dense_results, sparse_results, k)

    def rrf_fusion(self, results_a, results_b, k, rrf_k=60):
        """Combine rankings using RRF."""
        scores = {}
        for rank, doc in enumerate(results_a):
            scores[doc.id] = scores.get(doc.id, 0) + 1 / (rrf_k + rank + 1)
        for rank, doc in enumerate(results_b):
            scores[doc.id] = scores.get(doc.id, 0) + 1 / (rrf_k + rank + 1)

        sorted_docs = sorted(scores.items(), key=lambda x: -x[1])
        return [self.get_doc(doc_id) for doc_id, _ in sorted_docs[:k]]
```

### Query Transformation

```python
class QueryTransformer:
    """Improve retrieval through query manipulation."""

    def __init__(self, llm):
        self.llm = llm

    def expand_query(self, query):
        """Generate multiple query variations."""
        prompt = f"""Generate 3 different versions of this query to improve search:

Query: {query}

Variations:
1."""
        variations = self.llm.generate(prompt)
        return [query] + self.parse_variations(variations)

    def decompose_query(self, query):
        """Break complex queries into sub-queries."""
        prompt = f"""Break this question into simpler sub-questions:

Question: {query}

Sub-questions:
1."""
        return self.parse_subqueries(self.llm.generate(prompt))

    def hypothetical_document(self, query):
        """HyDE: Generate hypothetical answer, embed that."""
        prompt = f"""Write a paragraph that would answer this question:

Question: {query}

Answer:"""
        hypothetical = self.llm.generate(prompt)
        return self.embedder.encode(hypothetical)
```

### Reranking

```python
class CrossEncoderReranker:
    """Rerank retrieved documents with a cross-encoder."""

    def __init__(self, model_name="cross-encoder/ms-marco-MiniLM-L-6-v2"):
        self.model = CrossEncoder(model_name)

    def rerank(self, query, documents, top_k=5):
        # Score each document against the query
        pairs = [(query, doc.text) for doc in documents]
        scores = self.model.predict(pairs)

        # Sort by score
        ranked = sorted(zip(documents, scores), key=lambda x: -x[1])
        return [doc for doc, score in ranked[:top_k]]
```

## Chunking Strategies

```python
class IntelligentChunker:
    """Context-aware document chunking."""

    def __init__(self, chunk_size=512, overlap=50):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def semantic_chunking(self, document):
        """Split at natural boundaries."""
        # First, split at paragraph/section boundaries
        sections = self.split_by_headers(document)

        chunks = []
        for section in sections:
            if len(section.tokens) <= self.chunk_size:
                chunks.append(section)
            else:
                # Recursively split large sections
                chunks.extend(self.split_by_sentences(section))

        return chunks

    def parent_child_chunking(self, document):
        """Small chunks for retrieval, large chunks for context."""
        large_chunks = self.chunk(document, size=2000)
        small_chunks = []

        for large_chunk in large_chunks:
            children = self.chunk(large_chunk, size=200)
            for child in children:
                child.parent_id = large_chunk.id
                small_chunks.append(child)

        return large_chunks, small_chunks

    def late_chunking(self, document, embedder):
        """Embed full document, then pool into chunk embeddings."""
        # Embed entire document
        full_embedding = embedder.encode_long(document)

        # Split into chunks
        chunks = self.basic_chunk(document)

        # Pool embeddings for each chunk's token range
        chunk_embeddings = []
        for chunk in chunks:
            start, end = chunk.token_range
            chunk_emb = full_embedding[start:end].mean(axis=0)
            chunk_embeddings.append(chunk_emb)

        return chunks, chunk_embeddings
```

## Context Compression

```python
class ContextCompressor:
    """Reduce retrieved context to most relevant parts."""

    def __init__(self, llm):
        self.llm = llm

    def extract_relevant(self, query, documents):
        """Extract only query-relevant sentences."""
        prompt = f"""Given the question and documents, extract only the sentences relevant to answering the question.

Question: {query}

Documents:
{self.format_docs(documents)}

Relevant excerpts:"""
        return self.llm.generate(prompt)

    def summarize_for_query(self, query, documents):
        """Summarize documents with query focus."""
        prompt = f"""Summarize these documents, focusing on information relevant to: {query}

Documents:
{self.format_docs(documents)}

Focused summary:"""
        return self.llm.generate(prompt)
```

## Advanced RAG Architectures

### Self-RAG

```python
class SelfRAG:
    """LLM decides when and what to retrieve."""

    def __init__(self, llm, retriever):
        self.llm = llm
        self.retriever = retriever

    def generate(self, query):
        response = ""
        current_query = query

        while True:
            # Generate with retrieval decision
            output = self.llm.generate(f"""
Query: {current_query}
Previous response: {response}

Should I retrieve more information? [Yes/No]
If yes, what search query should I use?
""")

            if self.needs_retrieval(output):
                search_query = self.extract_search_query(output)
                docs = self.retriever.search(search_query)
                current_query = f"{query}\n\nRetrieved:\n{docs}"
            else:
                # Generate final response
                break

        return self.llm.generate(f"""
Based on retrieved information, answer: {query}
Context: {current_query}
""")
```

### Corrective RAG (CRAG)

```python
class CorrectiveRAG:
    """Evaluate and correct retrieved documents."""

    def __init__(self, llm, retriever, web_search):
        self.llm = llm
        self.retriever = retriever
        self.web_search = web_search

    def answer(self, query):
        # Initial retrieval
        docs = self.retriever.search(query)

        # Evaluate relevance
        evaluation = self.evaluate_retrieval(query, docs)

        if evaluation == "correct":
            # Documents are relevant
            return self.generate_with_context(query, docs)

        elif evaluation == "ambiguous":
            # Partially relevant - filter and supplement
            filtered_docs = self.filter_relevant(docs)
            web_results = self.web_search(query)
            combined = filtered_docs + web_results
            return self.generate_with_context(query, combined)

        else:  # "incorrect"
            # Documents not relevant - fall back to web
            web_results = self.web_search(query)
            return self.generate_with_context(query, web_results)

    def evaluate_retrieval(self, query, docs):
        prompt = f"""Evaluate if these documents are relevant to the query.

Query: {query}

Documents:
{self.format_docs(docs)}

Are the documents relevant? (correct/ambiguous/incorrect):"""
        return self.llm.generate(prompt).strip().lower()
```

### Agentic RAG

```python
class AgenticRAG:
    """Agent-driven iterative retrieval."""

    def __init__(self, agent, retriever, tools):
        self.agent = agent
        self.retriever = retriever
        self.tools = tools

    async def answer(self, query):
        plan = await self.agent.plan(query)

        context = []
        for step in plan.steps:
            if step.type == "retrieve":
                docs = await self.retriever.search(step.query)
                context.extend(docs)

            elif step.type == "search_web":
                results = await self.tools["web_search"](step.query)
                context.extend(results)

            elif step.type == "calculate":
                result = await self.tools["calculator"](step.expression)
                context.append({"type": "calculation", "result": result})

            elif step.type == "reason":
                intermediate = await self.agent.reason(query, context)
                context.append({"type": "reasoning", "content": intermediate})

        return await self.agent.synthesize(query, context)
```

## Evaluation Metrics

```python
class RAGEvaluator:
    def __init__(self, llm):
        self.llm = llm

    def evaluate_response(self, query, response, retrieved_docs, ground_truth=None):
        metrics = {}

        # Faithfulness: Is response grounded in retrieved docs?
        metrics["faithfulness"] = self.check_faithfulness(response, retrieved_docs)

        # Relevance: Does response answer the query?
        metrics["answer_relevance"] = self.check_relevance(query, response)

        # Context relevance: Were retrieved docs relevant?
        metrics["context_relevance"] = self.check_context_relevance(query, retrieved_docs)

        if ground_truth:
            # Correctness: Does response match ground truth?
            metrics["correctness"] = self.check_correctness(response, ground_truth)

        return metrics

    def check_faithfulness(self, response, docs):
        prompt = f"""Is every claim in this response supported by the documents?

Response: {response}

Documents: {docs}

Score (1-5):"""
        return int(self.llm.generate(prompt).strip())
```

## References

- [Retrieval-Augmented Generation for Knowledge-Intensive Tasks](https://arxiv.org/abs/2005.11401)
- [Self-RAG](https://arxiv.org/abs/2310.11511)
- [Corrective RAG](https://arxiv.org/abs/2401.15884)
- [HyDE: Hypothetical Document Embeddings](https://arxiv.org/abs/2212.10496)

---

*RAG bridges the gap between static model knowledge and dynamic real-world information—the model becomes a reasoning engine over your data rather than a fixed encyclopedia.*
