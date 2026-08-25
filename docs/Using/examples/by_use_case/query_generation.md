---
title: Text-to-SQL and Query Generation
description: Benchmarks, methods, and papers for generating SQL and database queries from natural language
---

# Text-to-SQL and Query Generation

Translating natural-language questions into SQL is one of the more mature applied-LLM use cases, and one of the harder ones once the schema gets large. The resources below cover benchmarks, production approaches, and the research behind current methods.

## Benchmarks

- [Spider 2.0](https://github.com/xlang-ai/Spider2): a text-to-SQL benchmark built from real enterprise-scale databases (over 1,000 columns each, on systems like BigQuery and Snowflake). Models need to search long database metadata and dialect documentation, reason over long contexts, and generate multi-hundred-line SQL. Current state-of-the-art models score far below human performance on it. See also the [Spider project page](https://yale-lily.github.io/spider).
- [Bird-SQL](https://bird-bench.github.io/): a large-scale, cross-domain benchmark testing whether an LLM can serve as a real database interface.

## Production approaches

- [defog-ai/sql-eval](https://github.com/defog-ai/sql-eval): an open evaluation harness for text-to-SQL systems
- [Uber's Query GPT](https://www.uber.com/blog/query-gpt/): a production write-up of natural-language querying at scale
- [Combining Text-to-SQL with Semantic Search for RAG](https://medium.com/llamaindex-blog/combining-text-to-sql-with-semantic-search-for-retrieval-augmented-generation-c60af30ec3b) and its [full LlamaIndex guide](https://gpt-index.readthedocs.io/en/latest/examples/query_engine/SQLAutoVectorQueryEngine.html): combining structured SQL queries with vector search
- [MAC-SQL](https://arxiv.org/abs/2312.11242) ([code](https://github.com/wbbeyourself/MAC-SQL)): a multi-agent collaboration approach to text-to-SQL

## Surveys

- [A Survey on Employing Large Language Models for Text-to-SQL Tasks](https://arxiv.org/abs/2407.15186) (Peking University, July 2024): a full overview of benchmark datasets, prompt engineering, and fine-tuning methods for this task
- [Text-to-SQL Empowered by Large Language Models: A Benchmark Evaluation](https://arxiv.org/abs/2308.15363)

## Papers on method

- [TAG: Unifying AI and Databases for Text2SQL](https://arxiv.org/pdf/2408.14717): argues text-to-SQL alone isn't enough and proposes unifying it with broader database-AI integration
- [Decomposition for Enhancing Attention (Workflow Paradigm)](https://arxiv.org/abs/2402.10671v3): improving LLM-based text-to-SQL through a decomposed workflow
- [ACT-SQL: In-Context Learning with Automatically-Generated Chain-of-Thought](https://arxiv.org/pdf/2310.17342)
- [Adapt and Decompose: Least-to-Most Prompting for Text-to-SQL](https://arxiv.org/abs/2308.02582)
- [Few-Shot Text-to-SQL Translation Using Structure and Content](https://dl.acm.org/doi/abs/10.1145/3589292)
- [RUSH4SQL: Collective Retrieval Using Schema Hallucination](https://arxiv.org/abs/2311.01173)
- [Prompt-Enhanced Two-Stage Text-to-SQL with Cross-Consistency](https://arxiv.org/pdf/2403.09732)
- [Semantic Enhanced Text-to-SQL via Iteratively Learning Schema Linking Graph](https://arxiv.org/abs/2208.03903)
- [DIN-SQL: Decomposed In-Context Learning with Self-Correction](https://arxiv.org/abs/2304.11015)
- [SQL-PaLM: Improved LLM Adaptation for Text-to-SQL](https://arxiv.org/abs/2306.00739)
- [Exploring Chain-of-Thought Prompting for Text-to-SQL](https://arxiv.org/abs/2305.14215)
- [Enhancing Text-to-SQL](https://arxiv.org/abs/2305.12586)
