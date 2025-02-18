
### Evaluation 

https://github.com/defog-ai/sql-eval



https://www.uber.com/blog/query-gpt/


=======

??? note "[Spider 2.0: The Text-to-SQL Dataset that Breaks LLMs]((https://github.com/xlang-ai/Spider2)"
  ![image](https://github.com/user-attachments/assets/06a2c4fb-740e-477a-801b-e332e74010f7)
  https://yale-lily.github.io/spider 
  
  
  We're talking about databases with over 1,000 columns, stored in various systems like BigQuery and Snowflake.
  
  To tackle this challenge, models need to:
  
  1. Understand and search through extensive database metadata, dialect documentation, and project-level codebases
  2. Process extremely long contexts
  3. Perform intricate reasoning
  4. Generate multiple SQL queries, often exceeding 100 lines
  
  So how do state-of-the-art models fare on this challenge? Not great, it turns out. 




Text2SQL is Not Enough: Unifying AI and Databases with TAG https://arxiv.org/pdf/2408.14717


==============

Article: https://medium.com/llamaindex-blog/combining-text-to-sql-with-semantic-search-for-retrieval-augmented-generation-c60af30ec3b 

Full guide: 
https://gpt-index.readthedocs.io/en/latest/examples/query_engine/SQLAutoVectorQueryEngine.html

=================


A Survey on Employing Large Language Models for Text-to-SQL Tasks (Peking University, July 2024)

Paper: https://arxiv.org/abs/2407.15186 

Abstract: 
"The increasing volume of data stored in relational databases has led to the need for efficient querying and utilization of this data in various sectors. However, writing SQL queries requires specialized knowledge, which poses a challenge for non-professional users trying to access and query databases. Text-to-SQL parsing solves this issue by converting natural language queries into SQL queries, thus making database access more accessible for non-expert users. To take advantage of the recent developments in Large Language Models (LLMs), a range of new methods have emerged, with a primary focus on prompt engineering and fine-tuning. This survey provides a comprehensive overview of LLMs in text-to-SQL tasks, discussing benchmark datasets, prompt engineering, fine-tuning methods, and future research directions. We hope this review will enable readers to gain a broader understanding of the recent advances in this field and offer some insights into its future trajectory."



==================

  Mac-sql: Multi-agent collaboration https://arxiv.org/abs/2312.11242 https://github.com/wbbeyourself/MAC-SQL

Decomposition for Enhancing Attention: Improving LLM-based Text-to-SQL through Workflow Paradigm. https://arxiv.org/abs/2402.10671v3 Good

Act-sql: In-context learning for text-to-sql with automatically-generated https://arxiv.org/pdf/2310.17342


================

Review: https://arxiv.org/pdf/2407.15186

Adapt and Decompose: Efficient Generalization of Text-to-SQL via Domain Adapted Least-To-Most Prompting. https://arxiv.org/abs/2308.02582

Text-to-sql empowered by large language models: A benchmark evaluation. arXiv preprint arXiv:2308.15363 (2023). 

Few-shot text-to-sql translation using structure and content: https://dl.acm.org/doi/abs/10.1145/3589292


RUSH4SQL: Collective retrieval using schema hallucination https://arxiv.org/abs/2311.01173


Can llm already serve as a database interface? a big bench for large-scale database grounded text-to-sqls. https://arxiv.org/pdf/2305.03111 https://bird-bench.github.io/ Good

Prompt-enhanced Two-stage Text-to-SQL Framework with Cross-consistency.  https://arxiv.org/pdf/2403.09732 Good

Semantic Enhanced Text-to-SQL Parsing via Iteratively Learning Schema Linking Graph. https://arxiv.org/pdf/2208.03903

 Enhancing text-to-SQL https://arxiv.org/abs/2305.12586

Din-sql: Decomposed in-context learning of text-to-sql with self-correction.   https://arxiv.org/abs/2304.11015

 2023. Sql-palm: Improved large Language Model Adaption for Text-to_SQL https://arxiv.org/abs/2306.00739

 Exploring Chain of Thought Style Prompting for Text-to-SQL. https://arxiv.org/abs/2305.14215
