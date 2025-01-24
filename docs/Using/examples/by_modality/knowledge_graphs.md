# Building Knowledge Graphs

Knowledge graphs can be created with the help of Generative AI. Understanding relationships between pieces of information allows the technology to create visual representations of connections, improving information processing.

## General Approaches 

??? important "[Natural Language is All a Graph Needs](https://arxiv.org/pdf/2308.07134.pdf) is a very powerful manner of fusing LLMs with KGs using natural language"

    - Node classification and self-supervised link predictions.
    - Scaleable natural-English graph prompts for instruction tuning
    - Identifying a central node and doing neighbor sampling and explorations using LLMs.
    - Avoids complex attention mechanisms and tokenizers.

    <img width="965" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/01bb7b6a-73d5-4969-a46f-ee1a35666082">
    <img width="544" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/2dde6920-f3a1-453b-bce2-76d5926e3ed4">



## Applications and Examples

### Healthcare and Biomedical
#### Drug Discovery and Repurposing
Knowledge Graph RAG (KG-RAG) consistently enhanced the performance of LLMs across various prompt types, including one-hop and two-hop prompts, drug repurposing queries, biomedical true/false questions, and multiple-choice questions (MCQ). Notably, KG-RAG provides a remarkable 71% boost in the performance of the Llama-2 model on the challenging MCQ dataset.

#### Disease Validation
??? abstract "[Establishing Trust in ChatGPT BioMedical Generated Text](https://arxiv.org/pdf/2308.03929)"
    Methods: Through an innovative approach, we construct ontology-based knowledge graphs from authentic medical literature and AI-generated content. Our goal is to distinguish factual information from unverified data.
    
    Results: The findings revealed that while PubMed knowledge graphs exhibit a wealth of disease-symptom terms, some ChatGPT graphs surpass them in the number of connections. The factual link ratio between any two graphs reached its peak at 60%.

### Natural Language Processing
#### Named Entity Recognition
??? abstract "[GLiner](https://github.com/urchade/GLiNER)"
    A compact NER model trained to identify any type of entity. Leveraging a bidirectional transformer encoder, GLiNER facilitates parallel entity extraction, outperforming both ChatGPT and fine-tuned LLMs in zero-shot evaluations on various NER benchmarks.


### Question Answering Systems
#### Factoid QA using KG lookups
#### Complex question decomposition and multi####hop reasoning

### Recommender Systems
#### Leveraging KGs for explainable recommendations

??? abstract "[LLM-movieagent](https://github.com/tomasonjo/llm-movieagent)"
    This project is designed to implement an agent capable of interacting with a graph database like Neo4j through a semantic layer using OpenAI function calling. The semantic layer equips the agent with a suite of robust tools, allowing it to interact with the graph database based on the user's intent. 

## Tools and Frameworks

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/m-elbably/gpt-graph) [GPT Graph for Knowledge Graph Exploration](https://github.com/m-elbably/gpt-graph)"
    [Medium](https://medium.com/@m-elbably/gpt-graph-a-simple-tool-for-knowledge-graph-exploration-70e0e3861716)
    
    A knowledge graph is a type of database that is used to store and represent knowledge in a machine-readable format. It uses a graph-based model, consisting of nodes (entities) and edges (relationships), to represent information and the connections between them. Knowledge graphs are often used to represent complex information in a structured and intuitive way, making it easier for machines to understand and analyze. They can be used in various domains, such as natural language processing, search engines, recommendation systems, and data analytics.
    
    It's a unique way to explore information in an organized and intuitive manner. With GPT Graph, you can easily navigate through different topics, discover new relationships between them, and generate creative ideas.
    
    It leverages the power of GPT-3 to generate relevant and high-quality content. Unlike traditional keyword-based searches, GPT Graph takes a more semantic approach to explore the topics and generate the graph. It helps to uncover hidden relationships between different topics and provides a comprehensive view of the entire knowledge domain.
    
    Moreover, GPT Graph provides a user-friendly interface that allows users to interact with the graph easily. Users can ask questions, generate prompts, and add their own ideas to the graph. It's a powerful tool that enables users to collaborate, brainstorm, and generate new insights in a very efficient way.

??? abstract "[iText2KG](https://github.com/AuvaLab/itext2kg)"
    🔥 A zero-shot method for incremental knowledge graph (KG) construction with resolved entities and relations. This method demonstrates superior performance across three scenarios: converting scientific papers to graphs, websites to graphs, and CVs to graphs.

    ✅ iText2KG addresses key limitations in current KG construction methods:
    - Reliance on predefined ontologies
    - Topic dependency
    - Need for extensive supervised training
    - Entity and Relation Resolution challenges
    
    Key modules:
    💡 Document Distiller
    💡 Incremental Entity Extractor (iEntities Extractor)
    💡 Incremental Relation Extractor (iRelations Extractor)
    💡 Graph Integrator and Visualization module

    The package integrates with Neo4j for intuitive graph visualization.

??? abstract "[Docs2KG: Unified Knowledge Graph Construction](https://docs2kg.ai4wa.com/)"
    Even for a conservative estimate, 80% of enterprise data reside in unstructured files, stored in data lakes that accommodate heterogeneous formats. Classical search engines can no longer meet information seeking needs, especially when the task is to browse and explore for insight formulation. Knowledge graphs, due to their natural visual appeals that reduce the human cognitive load, become the winning candidate for heterogeneous data integration and knowledge representation.



??? abstract "Semantic Layer Integration"
    [Blog](https://towardsdatascience.com/enhancing-interaction-between-language-models-and-graph-databases-via-a-semantic-layer-0a78ad3eba49)
    
    Knowledge graphs provide a great representation of data with flexible data schema that can store structured and unstructured information. You can use Cypher statements to retrieve information from a graph database like Neo4j. One option is to use LLMs to generate Cypher statements. While that option provides excellent flexibility, the truth is that base LLMs are still brittle at consistently generating precise Cypher statements. Therefore, we need to look for an alternative to guarantee consistency and robustness. What if, instead of developing Cypher statements, the LLM extracts parameters from user input and uses predefined functions or Cypher templates based on the user intent? In short, you could provide the LLM with a set of predefined tools and instructions on when and how to use them based on the user input, which is also known as the semantic layer.

!!! note "[Ontology Mapping](https://medium.com/@peter.lawrence_47665/encouraging-results-for-knowledge-graph-extraction-by-llm-ontology-prompting-60a7e5dcaf0a)"
    Shows how LLMs can be used for ontology mapping and knowledge graph extraction through prompting.

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/monarch-initiative/ontogpt) [OntoGPT](https://github.com/monarch-initiative/ontogpt)"
    Uses two different methods to query knowledge graphs using LLMs:
    - SPIRES: Structured Prompt Interrogation and Recursive Extraction of Semantics
    - SPINDOCTOR: Structured Prompt Interpolation of Narrative Descriptions Or Controlled Terms for Ontological Reporting

??? abstract "[Universal Preprocessing Operators for Embedding Knowledge Graphs with Literals](https://arxiv.org/pdf/2309.03023.pdf)"
    [Github](https://gitlab.com/patryk.preisner/mkga/)
    Proposes a set of preprocessing operators that can transform KGs to be embedded within any method.
    <img width="584" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4316fd44-acd3-4cad-81fd-7568c88cb69b">

??? abstract "[Multimodal learning with graphs](https://yashaektefaie.github.io/mgl/)"
    While not strictly GenAI focused, this introduces a comprehensive manner of combining cross-modal dependencies using geometric relationships.
    <img width="711" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/51523805-c5f7-40ec-988b-590c2d2f8f81">
