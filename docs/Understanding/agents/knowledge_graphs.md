# Knowledge Graphs: Empowering Large Language Models with Structured Knowledge

* [Tools and Resources](#tools)

!!! important "TL;DR: Knowledge Graphs and LLMs" tldr-graphs-and-llms
    Knowledge graphs provide structured representations of information that can enhance the reasoning capabilities of large language models. By explicitly modeling concepts and relationships, KGs offer a complementary approach to the statistical knowledge learned by LLMs, enabling more systematic and interpretable AI systems.
    
    There are several key manners of having LLMs work with Knowledge Graphs
    
    * **Pushing to graph** 
    * **Getting information from graphs**
    * **Predicting and classifying things about graph**
    * **Navigating graphs and multi-hop reasoning**

## Background

### What are Knowledge Graphs?
#### Definition and core concepts
#### Key components: entities, relationships, attributes

### Implicit vs. Explicit Knowledge
LLMs learn probabilistic representation of linear knowledge representations, not necessarily higher order concepts and considerations. While relationships between text may be inferred, it may not be explicitly encoded, which can be of considerable value, in some instances, for instance when talking about 'Apple falling', LLM may be able to infer the possibliity of talking about the company and it's stocks, but could also allow for an apple falling down to the ground. It allows an 'implicit' understanding. Once trained, these understandings can be modified by prompting changes, making there application non-universal, and not necessarily modifiable. 

Knowledge graphs, however, offer explicit representations of relations between items, by providing concrete associations, numerical or textual. They can be formally verified and easily modified. 


#### Comparison between statistical (LLM) and symbolic (KG) knowledge representation

KGs can help to address some shortcomings of LLMs. Below are a few areas where KGs can be and are helpful. 

**Logical, and Compositional Reasoning**
LLMs probabilistically map information, and while they look like they may reason, some studies say they only  [replicate reasoning](https://arxiv.org/pdf/2410.05229) KGs can help to ensure causality, and chained in multistep resolutions that require more complex rational. 

**Causal, Temporal and Relevant Reasoning**

The world is sequential and changing in nature.  Events, plans and narratives change and adapt quickly, making it difficult to train LLMs to be accurate. Coupling with KG's can help to maintain temporal relevance, as well as ensuring, or at least helping, causality in how LLMs perform. 

**Grounding Language Models in Facts and Logic**

Some exmaples sho

??? note "[Large Language Models can Learn Rules](https://arxiv.org/abs/2310.07064)"
    Augmenting large language models with structured knowledge graphs is a solution.   By training language models to reason over knowledge graphs, performing tasks like link prediction, triple classification, and collective reasoning, we can ground their knowledge in factual information. Mastering these types of logical reasoning over interconnected factual knowledge can enhance their reasoning capabilities.”
    **Abstract**
    
    “When prompted with a few examples and intermediate steps, large language models (LLMs) have demonstrated impressive performance in various reasoning tasks. However, prompting methods that rely on implicit knowledge in an LLM often hallucinate incorrect answers when the implicit knowledge is wrong or inconsistent with the task. To tackle this problem, we present Hypotheses-to-Theories (HtT), a framework that learns a rule library for reasoning with LLMs. HtT contains two stages, an induction stage and a deduction stage. In the induction stage, an LLM is first asked to generate and verify rules over a set of training examples. Rules that appear and lead to correct answers sufficiently often are collected to form a rule library. In the deduction stage, the LLM is then prompted to employ the learned rule library to perform reasoning to answer test questions. Experiments on both numerical reasoning and relational reasoning problems show that HtT improves existing prompting methods, with an absolute gain of 11-27% in accuracy. The learned rules are also transferable to different models and to different forms of the same problem.”
    
    <img width="561" alt="image" src="https://github.com/user-attachments/assets/3bc8e16b-cbc2-4de5-a2a2-df5930402299">

**Meta-learning**

KGs cna improve model meta-cognition by enabling the evaluation and generation of data during both training and generation. 

## Using Knowledge Graphs wih LLMs

### When to use KGs with LLMs and when not to
Some things may be better adressed with graph-specific models (prediction of node/link, classification, other things to predict). The LLM can help to generate the graph, though!

While LLMs afford a great deal of potential, they may not be optimal tools for specific jobs. For complex KGs that involve nodes and edges with highly specific meanings and definitions that may not related to natural language, or for very large graphs, LLMs will not be able to accurately embody holistic understanding that whole graph solutions may enable. Graph Neural Network methods, can effectivly do _prediction_ of nodes and edges, _classification_ of nodes and groups, and traditional algorithms can be used. Here are some common traditional algorithms that may be preferred over using LLMs to understand KGs. 

**Search** Algorithms like breadth-first search, depth-first search, and Dijkstra's algorithm are fundamental for navigating knowledge graphs. These methods efficiently explore graph structures to find paths, detect cycles, or identify connected components, forming the basis for more complex graph operations.

**Pathfinding Algorithms (e.g., Dijkstra’s, A\*):** Find the shortest path between two nodes, useful in route planning and network analysis.
**Community Detection Algorithms (e.g., Louvain Method)** Identify clusters or communities within graphs, helping in social network analysis and market segmentation.
**Centrality Measures (e.g., PageRank, Betweenness Centrality):** Determine the importance of different nodes in a network, applicable in analyzing influence in social networks or key infrastructure in transportation networks.

Be sure to understand your use case and how traditional, or GNN approaches may be valuable for your specific needs. 

### Indexing and Generation

LLMs are of keen interest in creating and populating knowledge graphs. They have the ability to generate accurate and entities and relationships from injested data. They can be used to approximately verify as they are generating, helping to ensure KG consistency. Finally, because they can be used to generated [structured output](../architectures/generation.md) LLM output can  be incorporated directly into KGs. 

#### KG construction from unstructured data

??? abstract " [Title: Prompting an LLM with an ontology to drive Knowledge Graph extraction from unstructured documents](https://www.linkedin.com/pulse/llm-ontology-prompting-knowledge-graph-extraction-peter-lawrence)"
    
    This article shows how an ChatAgent can be eventually prompted with an unstructured document and asked to extract a graph corresponding to a specific ontology/schema.

    ![image](https://github.com/user-attachments/assets/0c8706be-0eee-4b6c-a0c0-70ba10984e79)

    The author used a GPT conversation  to improve graph extraction, given a pre-defined and preferred ontological structure. 
    ```markdown
    Using this provided ontology exclusively, please create specific instances 
    and data about individuals within the family from the following text. 
    Also, create the RDF graph.
    
    … <document text>…
    ```



#### Ontology design and best practices

### Lookup and Querying
#### Query languages 
Query languages like SPARQL and Cypher allow precise retrieval of information from knowledge graphs. SPARQL is the standard for RDF graphs, while Cypher is commonly used for property graphs like those in Neo4j. These languages enable complex queries that can traverse relationships, filter results, and aggregate data.

#### LLMs for Querying
Large Language Models can be used to generate graph queries from natural language, making knowledge graphs more accessible to non-technical users. This approach combines the flexibility of natural language with the precision of structured queries, enabling more intuitive interaction with knowledge graphs.




### Efficient indexing and retrieval techniques
Techniques such as inverted indexing, graph partitioning, and caching strategies optimize query performance on large-scale knowledge graphs. These methods reduce search space and access times, enabling rapid retrieval of relevant information even from massive graph structures.

### Integration with LLMs
#### Vector embeddings of KG entities and relationships
By representing graph elements as dense vectors, we can bridge the gap between symbolic knowledge graphs and neural language models. These embeddings capture semantic relationships in a format compatible with LLM architectures, enabling joint reasoning over structured and unstructured data.

#### Retrieval-augmented generation: RAG

This technique enhances LLM outputs by first retrieving relevant information from a knowledge graph. The retrieved context guides the generation process, improving factual accuracy and coherence of LLM responses, especially for knowledge-intensive tasks.

??? "[GNN-RAG: Graph Neural Retrieval for Large Language Model Reasoning (May 2024)](https://arxiv.org/abs/2405.20139)"

    Abstract:
    "Knowledge Graphs (KGs) represent human-crafted factual knowledge in the form of triplets (head, relation, tail), which collectively form a graph. Question Answering over KGs (KGQA) is the task of answering natural questions grounding the reasoning to the information provided by the KG. Large Language Models (LLMs) are the state-of-the-art models for QA tasks due to their remarkable ability to understand natural language. On the other hand, Graph Neural Networks (GNNs) have been widely used for KGQA as they can handle the complex graph information stored in the KG. In this work, we introduce GNN-RAG, a novel method for combining language understanding abilities of LLMs with the reasoning abilities of GNNs in a retrieval-augmented generation (RAG) style. First, a GNN reasons over a dense KG subgraph to retrieve answer candidates for a given question. Second, the shortest paths in the KG that connect question entities and answer candidates are extracted to represent KG reasoning paths. The extracted paths are verbalized and given as input for LLM reasoning with RAG. In our GNN-RAG framework, the GNN acts as a dense subgraph reasoner to extract useful graph information, while the LLM leverages its natural language processing ability for ultimate KGQA. Furthermore, we develop a retrieval augmentation (RA) technique to further boost KGQA performance with GNN-RAG. Experimental results show that GNN-RAG achieves state-of-the-art performance in two widely used KGQA benchmarks (WebQSP and CWQ), outperforming or matching GPT-4 performance with a 7B tuned LLM. In addition, GNN-RAG excels on multi-hop and multi-entity questions outperforming competing approaches by 8.9--15.5% points at answer F1."

    Article: https://bdtechtalks.substack.com/p/llms-and-gnns-are-a-killer-combo


??? note "[Graph Neural Prompting with LLMs](https://arxiv.org/abs/2309.15427)"

    Proposes a plug-and-play method to assist pre-trained LLMs in learning beneficial knowledge from knowledge graphs (KGs).

    Includes various designs, including a standard graph neural network encoder, a cross-modality pooling module, a domain projector, and a self-supervised link prediction objective.

    It looks like a really effective way to learn and capture valuable knowledge from KGs for pre-trained LLMs to enhance them on tasks like commonsense and biomedical reasoning. 

    Graph Neural Prompting can improve the performance by +13.5% when the LLM is frozen, and +1.8% when the LLM is tuned.

    KGs and GNNs are underrated but they are quite effective for problems where you are dealing with factual knowledge and complex structural information. 

    The innovative plug-and-play method significantly enriches LLMs with Knowledge Graphs. It adeptly integrates varied modules, showing marked improvements in nuanced tasks and addressing challenges with factual and structural info, making this paper key for those seeking advancements in sophisticated #AI understanding. 

??? note "[To process]"

    RAG on FHIR with Knowledge Graph Part 1 talks about the high-level ideas, like what is a Knowledge Graph, and show a demo using an LLM to answer a question that requires linking more than one resource together:
    https://www.youtube.com/watch?v=QgQ2zlW9Khs

    RAG on FHIR with Knowledge Graph Part 2 takes a deep dive into the code behind the demo:
    https://www.youtube.com/watch?v=5H6Pk6pSIDU

    RAG on FHIR with Knowledge Graph is an article on Medium discussing this topic:
    https://medium.com/@samschifman/rag-on-fhir-with-knowledge-graphs-04d8e13ee96e

    The code is all available on GitHub:
    https://github.com/samschifman/RAG_on_FHIR/tree/main/RAG_on_FHIR_with_KG 




#### Fused models and attention mechanisms
Integrating knowledge graph structures directly into LLM architectures allows for more sophisticated reasoning. Techniques like graph attention networks or knowledge-aware transformers can learn to attend to relevant graph elements during text generation or understanding tasks.

## Advanced Techniques

### Knowledge Graph Embeddings
#### Types of KG embedding models
Various models like TransE, RotatE, and ComplEx represent entities and relations in vector spaces. Each model has unique geometric interpretations, capturing different aspects of graph structure and semantics in the embedding space.

#### Training objectives and loss functions
Common objectives include margin-based ranking losses, negative sampling, and adversarial training. These approaches optimize embeddings to preserve graph structure while generalizing to unseen facts.

#### Applications in link prediction and entity classification
KG embeddings enable inference of missing links or properties in the graph. This capability is crucial for knowledge base completion, recommendation systems, and predictive analytics in various domains.

### Reasoning over Knowledge Graphs
#### Logical inference and rule-based reasoning

This approach translates logical rules into geometric constraints on embeddings, enabling models to perform symbolic reasoning in continuous space. It bridges logical and statistical AI, enhancing interpretability and causal understanding.

#### Path-based reasoning methods
These methods analyze paths between entities to infer new relationships or validate existing ones. Techniques like Path Ranking Algorithm (PRA) or reinforcement learning-based path finding can discover complex reasoning patterns in the graph.

#### Probabilistic reasoning in KGs

Probabilistic embeddings represent entities and relations as distributions, naturally modeling uncertainty in knowledge. This approach allows for more nuanced reasoning, handling incomplete or conflicting information in the graph.

#### Causal Reasoning
By explicitly modeling causal relationships in the graph, we can perform interventional and counterfactual reasoning. This capability is crucial for decision-making systems and scientific discovery, where understanding cause-effect relationships is essential.

### Temporal and Dynamic Knowledge Graphs
Temporal Reasoning: Introducing time marker nodes with temporal relation types allows projection of entity embeddings to future states by analyzing traversal paths. This facilitates prediction and simulation.

#### Representing time-dependent information
Temporal KGs extend traditional graphs with time annotations on nodes or edges. This allows representing evolving relationships, event sequences, and historical data, crucial for domains like finance, healthcare, or social network analysis.

#### Reasoning about temporal relationships
Temporal logic and specialized query languages enable reasoning about sequences, durations, and temporal ordering. This supports complex queries like "What was the state of X before event Y?" or "How has Z changed over time?", essential for trend analysis and predictive modeling.

#### Updating and maintaining dynamic KGs
Techniques for efficient graph updates, versioning, and streaming ingestion allow KGs to reflect real-time changes. This is vital for applications requiring up-to-date information, such as news aggregation, financial trading, or real-time recommendation systems.



### Intelligent Graphs
#### Agents and Semantic Layers

LLMs can be used to read graph eamples and generate cypher statements to retrieve information from a knowledge graph. More powerfully 

Semantic layers provide an ability to look up connections between objects, and how to use them. Functions and data, and not just data. This semantic layer allowers 

CURSOR AI: Generate a Mermaid diagram that has these two options
LLM <--> Knowledge Graph 
vs
LLM <--> Semantic Layer <--> Knowledge Graph

CURSOR AI: Please summarize this 

??? abstract "[Intelligent Graph = Knowledge Graph + Intelligent Agents](https://github.com/peterjohnlawrence/IntelligentGraph)"


    Recently there has been much excitement related to Artificial Intelligence and Knowledge Graphs, especially regarding the emerging symbiotic relationship between them: LLMs provide unstructured reasoning, whilst the knowledge graph provides complementary structured reasoning. But how do we bridge the unstructured and structured worlds? Does the LLM push or does the KG pull?
    With LLM-Push we can set up agents which can push information from the LLM into a Knowledge Graph. What data? How often? When do we stop pushing? And so on.
    With KG-Pull we can add Intelligent agents to a Knowledge Graph, which pulls information from outside, including LLMs. This avoids unnecessarily pushing any data just-in-case into the graph store, instead pulling the data just-in-time when a user questions the graph.

    [Blog](https://medium.com/@peter.lawrence_47665/intelligent-graph-knowledge-graph-intelligent-agents-b3952399bf8a)

## Evaluating

??? note "[CRAG -- Comprehensive RAG Benchmark](https://huggingface.co/papers/2406.04744)"

    Retrieval-Augmented Generation (RAG) has recently emerged as a promising solution to alleviate Large Language Model (LLM)'s deficiency in lack of knowledge. Existing RAG datasets, however, do not adequately represent the diverse and dynamic nature of real-world Question Answering (QA) tasks. To bridge this gap, we introduce the Comprehensive RAG Benchmark (CRAG), a factual question answering benchmark of 4,409 question-answer pairs and mock APIs to simulate web and Knowledge Graph (KG) search. CRAG is designed to encapsulate a diverse array of questions across five domains and eight question categories, reflecting varied entity popularity from popular to long-tail, and temporal dynamisms ranging from years to seconds. Our evaluation on this benchmark highlights the gap to fully trustworthy QA. Whereas most advanced LLMs achieve <=34% accuracy on CRAG, adding RAG in a straightforward manner improves the accuracy only to 44%. State-of-the-art industry RAG solutions only answer 63% questions without any hallucination. CRAG also reveals much lower accuracy in answering questions regarding facts with higher dynamism, lower popularity, or higher complexity, suggesting future research directions. The CRAG benchmark laid the groundwork for a KDD Cup 2024 challenge, attracting thousands of participants and submissions within the first 50 days of the competition. We commit to maintaining CRAG to serve research communities in advancing RAG solutions and general QA solutions. 


??? note [A Benchmark to Understand the Role of Knowledge Graphs on Large Language Model's Accuracy for Question Answering on Enterprise SQL Databases (November 2023)](https://arxiv.org/abs/2311.07509)
    Abstract:
    "Enterprise applications of Large Language Models (LLMs) hold promise for question answering on enterprise SQL databases. However, the extent to which LLMs can accurately respond to enterprise questions in such databases remains unclear, given the absence of suitable Text-to-SQL benchmarks tailored to enterprise settings. Additionally, the potential of Knowledge Graphs (KGs) to enhance LLM-based question answering by providing business context is not well understood. This study aims to evaluate the accuracy of LLM-powered question answering systems in the context of enterprise questions and SQL databases, while also exploring the role of knowledge graphs in improving accuracy. To achieve this, we introduce a benchmark comprising an enterprise SQL schema in the insurance domain, a range of enterprise queries encompassing reporting to metrics, and a contextual layer incorporating an ontology and mappings that define a knowledge graph. Our primary finding reveals that question answering using GPT-4, with zero-shot prompts directly on SQL databases, achieves an accuracy of 16%. Notably, this accuracy increases to 54% when questions are posed over a Knowledge Graph representation of the enterprise SQL database. Therefore, investing in Knowledge Graph provides higher accuracy for LLM powered question answering systems."
    Article: https://ai.plainenglish.io/new-research-proves-knowledge...



## Challenges and Future Directions

### Scalability and Efficiency
#### Handling large-scale, web-scale knowledge graphs
#### Distributed and parallel processing techniques

### Knowledge Graph Quality
#### Addressing incompleteness and inconsistency
#### Fact verification and trust in KG sources

### Multimodal Knowledge Graphs

??? note "[Title: Universal Preprocessing Operators for Embedding Knowledge Graphs with Literals](https://arxiv.org/abs/2309.03023)"
    Comment: Multimodal knowledge graphs (MKGs) are a major interest area in AI.  MKGs can improve accuracy and robustness compared to unimodal AI.  They can enhance decision-making by providing a more comprehensive view of data. (See… https://www.nature.com/articles/s42256-023-00624-6. And https://ieeexplore.ieee.org/document/9778820).  Given the variety of MKGs possible data embedding providing a universal/common embedding has value.  The attached paper is a recent contribution in this respect.

    Abstract: Knowledge graph embeddings are dense numerical representations of entities in a knowledge graph (KG). While the majority of approaches concentrate only on relational information, i.e., relations between entities, fewer approaches exist which also take information about literal values (e.g., textual descriptions or numerical information) into account. Those which exist are typically tailored towards a particular modality of literal and a particular embedding method. In this paper, we propose a set of universal preprocessing operators which can be used to transform KGs with literals for numerical, temporal, textual, and image information, so that the transformed KGs can be embedded with any method. The results on the kgbench dataset with three different embedding methods show promising results.
    
#### Integrating textual, visual, and numerical data
#### Cross-modal reasoning and inference

### Ethical Considerations
#### Bias and fairness in knowledge representation
#### Privacy concerns in KG construction and usage

## Conclusion

#### Recap of the importance of KGs in enhancing LLM capabilities
#### The future of hybrid AI systems leveraging structured and unstructured knowledge
#### Call to action for further research and development in this field


## Open Source Tools

### GraphRag
??? abstract "[Data discovery with GraphRAG 🚀](https://github.com/microsoft/graphrag)"
    Microsoft open-sourced this week GraphRAG, a Python library for extracting insights from unstructured text using LLMs. The GraphRAG uses LLM-generated knowledge graphs to extract information and answer questions from private datasets and documentation.

    Installation 🛠️: 𝘱𝘪𝘱 𝘪𝘯𝘴𝘵𝘢𝘭𝘭 𝘨𝘳𝘢𝘱𝘩𝘳𝘢𝘨

    License 🪪: MIT 🦄

    Resources 📚
    Code 🔗:https://github.com/microsoft/graphrag 
    Documentation 📖 : https://microsoft.github.io/graphrag/ 
    Release notes 📝: https://www.microsoft.com/en-us/research/blog/graphrag-new-tool-for-complex-data-discovery-now-on-github/

    We note the basic flow that underpins GraphRAG, which builds upon our prior 
    https://www.microsoft.com/en-us/worklab/patterns-hidden-inside-the-org-chart

    https://github.com/graspologic-org/graspologic
     using graph machine learning: 
    * The LLM processes the entire private dataset, creating references to all entities and relationships within the source data, which are then used to create an LLM-generated knowledge graph. 
    * This graph is then used to create a bottom-up clustering that organizes the data hierarchically into semantic clusters (indicated by using color in Figure 3 below).  This partitioning allows for pre-summarization of semantic concepts and themes, which aids in holistic understanding of the dataset. 
    * At query time, both of these structures are used to provide materials for the LLM context window when answering a question. 

### LLamaindex

??? abstract "[LlamaIndex:  The Property Graph Index](https://github.com/run-llama/llama_index)
    We’re excited to launch a huge feature making LlamaIndex the framework for building knowledge graphs with LLMs: 💫
    You now have a sophisticated set of tools to construct and query a knowledge graph with LLMs:

    1. You can extract out a knowledge graph according to a set of extractors. These extractors include defining a pre-defined schema of entities/relationships/properties, defining a set of node relationship with LlamaIndex constructs, or implicitly figuring out the schema using an LLM.
    2. You can now query a knowledge graph with a huge host of different retrievers that can be combined: keywords, vector search, text-to-cypher, and more.
    3. You can include the text along with the entities/relationships during retrieval
    4. You can perform joint vector search/graph search even if your graph store doesn’t support vectors! We’ve created robust abstractions to plug in both a graph store as well as a separate vector store.
    5. You have full customizability: We’ve made it easy/intuitive for you to define your own extractors and retrievers.

    Labelled Property Graph: a KG representation with nodes + relationships. Each node/relationship has a label and an arbitrary set of properties.

    Why you care: This is a robust representation of knowledge graphs that extends way beyond just triplets - allows you to treat KGs as a superset of vector search. Each text node can be represented by a vector representation similar to a vector db, but also link to other nodes through relationships.

    Our initial launch was done in collaboration with our partners from Neo4j. Huge shoutout to Tomaz Bratanic for creating a detailed integration guide as well as extensive guidance on how to refactor our abstractions.

    Our blog post: https://www.llamaindex.ai/blog/introducing-the-property-graph-index-a-powerful-new-way-to-build-knowledge-graphs-with-llms

    Full guide in the docs: https://docs.llamaindex.ai/en/stable/module_guides/indexing/lpg_index_guide/

    Usage guide: https://docs.llamaindex.ai/en/stable/examples/property_graph/graph_store/

    Basic notebook: https://docs.llamaindex.ai/en/stable/examples/property_graph/property_graph_basic/

    Advanced notebook (shows extraction according to a schema): https://docs.llamaindex.ai/en/stable/examples/property_graph/property_graph_advanced/

    Using Neo4j with our property graphs: https://docs.llamaindex.ai/en/stable/examples/property_graph/property_graph_neo4j/ 



### Other Notable

??? abstract "[iText2KG](https://github.com/AuvaLab/itext2kg)"
    🔥 We are excited to share the release of our algorithm, iText2KG, a zero-shot method for incremental knowledge graph (KG) construction with resolved entities and relations.  Our method demonstrates superior performance compared to baseline methods across three scenarios: converting scientific papers to graphs, websites to graphs, and CVs to graphs. Now available as a Python package, iText2KG has been accepted at WISE 2024.

    ✅ iText2KG addresses key limitations in current KG construction methods, such as reliance on predefined ontologies, topic dependency, and the need for extensive supervised training. It also tackles a major limitation of current LLM-based methods for KG construction: Entity and Relation Resolution. These LLM-based methods often produce graphs with unresolved and semantically duplicated entities and relations, leading to inconsistencies and extensive post-processing.

    ✅ iText2KG solves entity and relation resolution by integrating an automatic matching process directly into the knowledge graph construction workflow through two key modules: Incremental Entity Extraction (iEntities Extractor) and Incremental Relation Extraction (iRelations Extractor).

    ✅ Overall, our algorithm consists of four modules that work together to construct knowledge graphs incrementally:

    💡 The Document Distiller reformulates raw input documents into structured semantic blocks using a predefined blueprint, focusing on relevant content to improve the signal-to-noise ratio and guide accurate extraction.

    💡 The Incremental Entity Extractor (iEntities Extractor) identifies and extracts unique entities by comparing new entities from each document against a global set, ensuring all entities in the KG are semantically unique.

    💡 The Incremental Relation Extractor (iRelations Extractor) uses the global entity set as context with each semantic block to extract unique relationships through the Incremental Relations Matcher (iRelations Matcher) which mirrors the strategy used by the iEntities Matcher. 

    💡 Finally, the Graph Integrator and Visualization module combines these resolved entities and relations into a coherent and visually navigable graph using tools like Neo4j, creating a consistent structure that reflects the extracted knowledge for further analysis and decision-making.

    Our package integrates with Neo4j for intuitive graph visualization.

    ➡  Check out our GitHub repository : https://github.com/AuvaLab/itext2kg
    ➡  Read our paper here: https://arxiv.org/pdf/2409.03284


??? abstract "[Docs2KG: Unified Knowledge Graph Construction from Heterogeneous Documents Assisted by Large Language Models (University of Western Australia, June 2024)](https://docs2kg.ai4wa.com/)"
    [Paper](https://arxiv.org/abs/2406.02962)

    Abstract:
        "Even for a conservative estimate, 80% of enterprise data reside in unstructured files, stored in data lakes that accommodate heterogeneous formats. Classical search engines can no longer meet information seeking needs, especially when the task is to browse and explore for insight formulation. In other words, there are no obvious search keywords to use. Knowledge graphs, due to their natural visual appeals that reduce the human cognitive load, become the winning candidate for heterogeneous data integration and knowledge representation.

        In this paper, we introduce Docs2KG, a novel framework designed to extract multimodal information from diverse and heterogeneous unstructured documents, including emails, web pages, PDF files, and Excel files. Dynamically generates a unified knowledge graph that represents the extracted key information, Docs2KG enables efficient querying and exploration of document data lakes. Unlike existing approaches that focus on domain-specific data sources or pre-designed schemas, Docs2KG offers a flexible and extensible solution that can adapt to various document structures and content types. The proposed framework unifies data processing supporting a multitude of downstream tasks with improved domain interpretability."

    Demo: https://docs2kg.ai4wa.com/Video

## Applications

### NER extraction 

??? abstract "[GLiner](https://github.com/urchade/GLiNER)"
    [Paper](https://arxiv.org/abs/2311.08526): Named Entity Recognition (NER) is essential in various Natural Language Processing (NLP) applications. Traditional NER models are effective but limited to a set of predefined entity types. In contrast, Large Language Models (LLMs) can extract arbitrary entities through natural language instructions, offering greater flexibility. However, their size and cost, particularly for those accessed via APIs like ChatGPT, make them impractical in resource-limited scenarios. In this paper, we introduce a compact NER model trained to identify any type of entity. Leveraging a bidirectional transformer encoder, our model, GLiNER, facilitates parallel entity extraction, an advantage over the slow sequential token generation of LLMs. Through comprehensive testing, GLiNER demonstrates strong performance, outperforming both ChatGPT and fine-tuned LLMs in zero-shot evaluations on various NER benchmarks.


### Knowledge consistent Chat Generation



??? note "[Knowledge-Consistent Dialogue Generation with Language Models and Knowledge Graphs](https://openreview.net/forum?id=WhWlYzUTJfP)

    Abstract: 
    "Pre-trained language models have achieved impressive performances on dialogue generation tasks. However, when generating responses for a conversation that requires factual knowledge, they are far from perfect, due to the absence of mechanisms to retrieve, encode, and reflect the knowledge in the generated responses. Some knowledge-grounded dialogue generation methods tackle this problem by leveraging the structured knowledge from Knowledge Graphs (KGs). However, existing methods do not guarantee that the model utilizes a relevant piece of knowledge from the KG before generating knowledge-consistent dialogues. To overcome this limitation, we propose SUbgraph Retrieval-augmented GEneration (SURGE), a framework for generating context-relevant and knowledge-consistent dialogues with a KG. Specifically, our method first retrieves the relevant subgraph from the KG, and then enforces consistency across facts by perturbing their word embeddings conditioned on the retrieved subgraph. Then, it learns a latent representation space using contrastive learning which ensures that the generated texts have high similarity to the retrieved subgraphs. We validate the performance of our SURGE framework on the OpendialKG and KOMODIS datasets and show that our method generates high-quality dialogues that faithfully reflect the knowledge from the KG."

    <img width="543" alt="image" src="https://github.com/user-attachments/assets/56a9213e-6b0b-41fe-88bb-38a3a35364c9">




## Examples

### Training LLMs 



??? note "[Knowledge Graph Reasoning with Self-supervised Reinforcement Learning (Google Brain, May 2024)](https://arxiv.org/abs/2405.13640)"

    Abstract:
    "Reinforcement learning (RL) is an effective method of finding reasoning pathways in incomplete knowledge graphs (KGs). To overcome the challenges of a large action space, a self-supervised pre-training method is proposed to warm up the policy network before the RL training stage. To alleviate the distributional mismatch issue in general self-supervised RL (SSRL), in our supervised learning (SL) stage, the agent selects actions based on the policy network and learns from generated labels; this self-generation of labels is the intuition behind the name self-supervised. With this training framework, the information density of our SL objective is increased and the agent is prevented from getting stuck with the early rewarded paths. Our self-supervised RL (SSRL) model improves the performance of RL by pairing it with the wide coverage achieved by SL during pretraining, since the breadth of the SL objective makes it infeasible to train an agent with that alone. We show that our SSRL model meets or exceeds current state-of-the-art results on all Hits@k and mean reciprocal rank (MRR) metrics on four large benchmark KG datasets. This SSRL method can be used as a plug-in for any RL architecture for a KGR task. We adopt two RL architectures, i.e., MINERVA and MultiHopKG as our baseline RL models and experimentally show that our SSRL model consistently outperforms both baselines on all of these four KG reasoning tasks. "

#### Data generation

??? abstract "[Pygraft](https://github.com/nicolas-hbt/pygraft)"
    For those of you interested in open-source Python tools, I am happy to share with you our new work: PyGraft, a configurable Python tool to generate synthetic knowledge graphs easily! We expect PyGraft to help you generate new and tailored benchmark datasets useful for any kind of Machine Learning related tasks.

    We plan on submitting the presentation of PyGraft (paper provided below) to an international conference, so we welcome any help: please share and star our Github repository if you like the project, this is very important for increasing PyGraft's visibility and proposing additional features in the near future!

    We also welcome any ideas on how to improve PyGraft. So, if you want to contribute, let us get in touch! We mainly seek contributions from top Master's students with some exposure to research, as well as researchers (PhDs, PostDocs, etc) with good programming skills.

    Documentation: https://pygraft.readthedocs.io/en/latest/

    Paper: https://arxiv.org/pdf/2309.03685.pdf


### Retrieval on other Databases

??? abstract [An interesting study that shows the impact of KGs for question answering on SQL databases.](https://github.com/datadotworld/cwd-benchmark-data)

    The authors show that the KG representation of the enterprise SQL database improves the performance of GPT-4 for QA: 54% accuracy vs. 16% with instructions directly on SQL databases.

    📝 Paper: https://arxiv.org/pdf/2311.07509


### Question Answering Systems
#### Factoid QA using KG lookups
#### Complex question decomposition and multi####hop reasoning

### Recommender Systems
#### Leveraging KGs for explainable recommendations

??? abstract "[LLM-movieagent](https://github.com/tomasonjo/llm-movieagent)"
    This project is designed to implement an agent capable of interacting with a graph database like Neo4j through a semantic layer using OpenAI function calling. The semantic layer equips the agent with a suite of robust tools, allowing it to interact with the graph database based on the user's intent. 


#### Addressing cold-start problems with KG-based features

### Research

??? note "[Introducing MechGPT 🦾🤖]()"

    This project by Markus J. Buehler is one of the coolest use cases of 1) fine-tuning an LLM, and 2) generating a knowledge graph that we’ve seen (powered by LlamaIndex 🦙).

    The end result is a system capable of understanding a diverse range of scientific disciplines, generating new hypotheses/ideas, and importantly - connect concepts between disparate concepts of research.

    Let’s take a concrete example of this: “relate hyperelasticity in dynamic fracture with protein unfolding”

    A knowledge graph is generated with LlamaIndex abstractions from sampled LLM conversations. Take a look below. We see some key concepts in common between hyperplasticity and protein unfolding! 
    💡 Dynamics of Energy Transfer
    💡Mirror-symmetry effect

    Finally, this knowledge graph can itself be used for retrieval-augmentation to answer questions + develop new hypotheses.

    Check out the full paper below - there’s a lot of details that we didn’t cover:

    AMR: https://lnkd.in/g6gn-XaK

    ArXiv: https://lnkd.in/gx7N43Jz


??? abstract "[Knowledge Graph Prompting for Multi-Document Question Answering (Adobe Research, August 2023)](https://github.com/YuWVandy/KG-LLM-MDQA)"
    Paper: [https://arxiv.org/abs/2308.11730](https://arxiv.org/abs/2308.11730)

    Abstract:
    "The 'pre-train, prompt, predict' paradigm of large language models (LLMs) has achieved remarkable success in open-domain question answering (OD-QA). However, few works explore this paradigm in the scenario of multi-document question answering (MD-QA), a task demanding a thorough understanding of the logical associations among the contents and structures of different documents. To fill this crucial gap, we propose a Knowledge Graph Prompting (KGP) method to formulate the right context in prompting LLMs for MD-QA, which consists of a graph construction module and a graph traversal module. For graph construction, we create a knowledge graph (KG) over multiple documents with nodes symbolizing passages or document structures (e.g., pages/tables), and edges denoting the semantic/lexical similarity between passages or intra-document structural relations. For graph traversal, we design an LM-guided graph traverser that navigates across nodes and gathers supporting passages assisting LLMs in MD-QA. The constructed graph serves as the global ruler that regulates the transitional space among passages and reduces retrieval latency. Concurrently, the LM-guided traverser acts as a local navigator that gathers pertinent context to progressively approach the question and guarantee retrieval quality. Extensive experiments underscore the efficacy of KGP for MD-QA, signifying the potential of leveraging graphs in enhancing the prompt design for LLMs. "





#### Drug discovery and repurposing using KGs

#### Literature-based discovery and hypothesis generation

Knowledge Graph RAG (KG-RAG) consistently enhanced the performance of LLMs across various prompt types, including one-hop and two-hop prompts, drug repurposing queries, biomedical true/false questions, and multiple-choice questions (MCQ). Notably, KG-RAG provides a remarkable 71% boost in the performance of the Llama-2 model on the challenging MCQ dataset, demonstrating the framework's capacity to empower open-source models with fewer parameters for domain-specific questions. Biomedical knowledge graph-enhanced prompt generation for large language models

#### Disease Validation

??? abstract "[Title; Establishing Trust in ChatGPT BioMedical Generated Text: An Ontology-Based Knowledge Graph to Validate Disease-Symptom Links](https://arxiv.org/pdf/2308.03929)"
    Methods: Through an innovative approach, we construct ontology-based knowledge graphs from authentic medical literature and AI-generated content. Our goal is to distinguish factual information from unverified data. We compiled two datasets: one from biomedical literature using a "human disease and symptoms" query, and another generated by ChatGPT, simulating articles. With these datasets (PubMed and ChatGPT), we curated 10 sets of 250 abstracts each, selected randomly with a specific seed. Our method focuses on utilizing disease ontology (DOID) and symptom ontology (SYMP) to build knowledge graphs, robust mathematical models that facilitate unbiased comparisons. By employing our fact-checking algorithms and network centrality metrics, we conducted GPT disease-symptoms link analysis to quantify the accuracy of factual knowledge amid noise, hypotheses, and significant findings. 

    Results: The findings obtained from the comparison of diverse ChatGPT knowledge graphs with their PubMed counterparts revealed some interesting observations. While PubMed knowledge graphs exhibit a wealth of disease-symptom terms, it is surprising to observe that some ChatGPT graphs surpass them in the number of connections. Furthermore, some GPT graphs are demonstrating supremacy of the centrality scores, especially for the overlapping nodes. This striking contrast indicates the untapped potential of knowledge that can be derived from AI-generated content, awaiting verification. Out of all the graphs, the factual link ratio between any two graphs reached its peak at 60%. 

    Conclusions: An intriguing insight from our findings was the striking number of links among terms in the knowledge graph generated from ChatGPT datasets, surpassing some of those in its PubMed counterpart. This early discovery has prompted further investigation using universal network metrics to unveil the new knowledge the links may hold.


### Financial Analysis
#### Risk assessment using company and market KGs
#### Fraud detection through relationship analysis

## Training and Courses
In this hands-on course, you will learn how to create and query knowledge graphs using Large Language Models (LLMs).

https://graphacademy.neo4j.com/courses/llm-knowledge-graph-construction/


## Research

==========================
??? note "[Neurosymbolic AI for Reasoning over Knowledge Graphs: A Survey (University of Edinburgh., February 20243](https://arxiv.org/abs/2302.07200)"
    Abstract:
    "Neurosymbolic AI is an increasingly active area of research that combines symbolic reasoning methods with deep learning to leverage their complementary benefits. As knowledge graphs are becoming a popular way to represent heterogeneous and multi-relational data, methods for reasoning on graph structures have attempted to follow this neurosymbolic paradigm. Traditionally, such approaches have utilized either rule-based inference or generated representative numerical embeddings from which patterns could be extracted. However, several recent studies have attempted to bridge this dichotomy to generate models that facilitate interpretability, maintain competitive performance, and integrate expert knowledge. Therefore, we survey methods that perform neurosymbolic reasoning tasks on knowledge graphs and propose a novel taxonomy by which we can classify them. Specifically, we propose three major categories: (1) logically-informed embedding approaches, (2) embedding approaches with logical constraints, and (3) rule learning approaches. Alongside the taxonomy, we provide a tabular overview of the approaches and links to their source code, if available, for more direct comparison. Finally, we discuss the unique characteristics and limitations of these methods, then propose several prospective directions tow


??? note "[Graph Machine Learning in the Era of Large Language Models (Hong Kong Polytechnic University, April 2024)](https://arxiv.org/abs/2404.14928)"

    Abstract:
    "Graphs play an important role in representing complex relationships in various domains like social networks, knowledge graphs, and molecular discovery. With the advent of deep learning, Graph Neural Networks (GNNs) have emerged as a cornerstone in Graph Machine Learning (Graph ML), facilitating the representation and processing of graph structures. Recently, LLMs have demonstrated unprecedented capabilities in language tasks and are widely adopted in a variety of applications such as computer vision and recommender systems. This remarkable success has also attracted interest in applying LLMs to the graph domain. Increasing efforts have been made to explore the potential of LLMs in advancing Graph ML's generalization, transferability, and few-shot learning ability. Meanwhile, graphs, especially knowledge graphs, are rich in reliable factual knowledge, which can be utilized to enhance the reasoning capabilities of LLMs and potentially alleviate their limitations such as hallucinations and the lack of explainability. Given the rapid progress of this research direction, a systematic review summarizing the latest advancements for Graph ML in the era of LLMs is necessary to provide an in-depth understanding to researchers and practitioners. Therefore, in this survey, we first review the recent developments in Graph ML. We then explore how LLMs can be utilized to enhance the quality of graph features, alleviate the reliance on labeled data, and address challenges such as graph heterogeneity and out-of-distribution (OOD) generalization. Afterward, we delve into how graphs can enhance LLMs, highlighting their abilities to enhance LLM pre-training and inference. Furthermore, we investigate various applications and discuss the potential future directions in this promising field."


??? note "[Head-to-Tail: How Knowledgeable are Large Language Models (LLM)? A.K.A. Will LLMs Replace Knowledge Graphs? Sun et al.](https://arxiv.org/abs/2308.10168)"
    Since the recent prosperity of Large Language Models (LLMs), there have been interleaved discussions regarding how to reduce hallucinations from LLM responses, how to increase the factuality of LLMs, and whether Knowledge Graphs (KGs), which store the world knowledge in a symbolic form, will be replaced with LLMs. In this paper, we try to answer these questions from a new angle: How knowledgeable are LLMs?
    To answer this question, we constructed Head-to-Tail, a benchmark that consists of 18K question-answer (QA) pairs regarding head, torso, and tail facts in terms of popularity. We designed an automated evaluation method and a set of metrics that closely approximate the knowledge an LLM confidently internalizes. Through a comprehensive evaluation of 16 publicly available LLMs, we show that existing LLMs are still far from being perfect in terms of their grasp of factual knowledge, especially for facts of torso-to-tail entities.


??? note "[Title: Unifying Large Language Models and Knowledge Graphs: A Roadmap](https://arxiv.org/pdf/2306.08302.pdf)"

    Abstract—Large language models (LLMs), such as ChatGPT and GPT4, are making new waves in the field of natural language processing and artificial intelligence, due to their emergent ability and generalizability. However, LLMs are black-box models, which often fall short of capturing and accessing factual knowledge. In contrast, Knowledge Graphs (KGs), Wikipedia and Huapu for example, are structured knowledge models that explicitly store rich factual knowledge. KGs can enhance LLMs by providing external knowledge for inference and interpretability. Meanwhile, KGs are difficult to construct and evolving by nature, which challenges the existing methods in KGs to generate new facts and represent unseen knowledge. Therefore, it is complementary to unify LLMs and KGs together and simultaneously leverage their advantages. In this article, we present a forward-looking roadmap for the unification of LLMs and KGs. Our roadmap consists of three general frameworks, namely, 1) KG-enhanced LLMs, which incorporate KGs during the pre-training and inference phases of LLMs, or for the purpose of enhancing understanding of the knowledge learned by LLMs; 2) LLM-augmented KGs, that leverage LLMs for different KG tasks such as embedding, completion, construction, graph-to-text generation, and question answering; and 3) Synergized LLMs + KGs, in which LLMs and KGs play equal roles and work in a mutually beneficial way to enhance both LLMs and KGs for bidirectional reasoning driven by both data and knowledge. We review and summarize existing efforts within these three frameworks in our roadmap and pinpoint their future research directions.
    
??? note tosort
    Towards Foundation Models for Knowledge Graph Reasoning (Intel AI Lab, October 2023)

    Paper: https://arxiv.org/abs/2310.04562

    Abstract:
    "Foundation models in language and vision have the ability to run inference on any textual and visual inputs thanks to the transferable representations such as a vocabulary of tokens in language. Knowledge graphs (KGs) have different entity and relation vocabularies that generally do not overlap. The key challenge of designing foundation models on KGs is to learn such transferable representations that enable inference on any graph with arbitrary entity and relation vocabularies. In this work, we make a step towards such foundation models and present ULTRA, an approach for learning universal and transferable graph representations. ULTRA builds relational representations as a function conditioned on their interactions. Such a conditioning strategy allows a pre-trained ULTRA model to inductively generalize to any unseen KG with any relation vocabulary and to be fine-tuned on any graph. Conducting link prediction experiments on 57 different KGs, we find that the zero-shot inductive inference performance of a single pre-trained ULTRA model on unseen graphs of various sizes is often on par or better than strong baselines trained on specific graphs. Fine-tuning further boosts the performance."

    Article: https://towardsdatascience.com/ultra-foundation-models-for-knowledge-graph-reasoning-9f8f4a0d7f09
