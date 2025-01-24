# Knowledge Graphs for Generation

## TLDR Abstract
Knowledge graphs provide structured representations of information that can enhance the reasoning capabilities of large language models. By explicitly modeling concepts and relationships, KGs offer a complementary approach to the statistical knowledge learned by LLMs, enabling more systematic and interpretable AI systems.

## Using KGs to Enhance LLMs

### Retrieval-Augmented Generation (RAG)
??? note "[CRAG -- Comprehensive RAG Benchmark](https://huggingface.co/papers/2406.04744)"
    Retrieval-Augmented Generation (RAG) has recently emerged as a promising solution to alleviate Large Language Model (LLM)'s deficiency in lack of knowledge. The benchmark highlights that whereas most advanced LLMs achieve <=34% accuracy on CRAG, adding RAG in a straightforward manner improves the accuracy only to 44%. State-of-the-art industry RAG solutions only answer 63% questions without any hallucination.

??? note "[Self-RAG](https://selfrag.github.io/)"
    A new easy-to-train, customizable, and powerful framework for making an LM learn to retrieve, generate, and critique its own outputs and retrieved passages, by using model-predicted reflection tokens.

### Knowledge Integration

??? note "[Unifying Large Language Models and Knowledge Graphs](https://arxiv.org/pdf/2306.08302.pdf)"
    LLMs are black-box models, which often fall short of capturing and accessing factual knowledge. In contrast, Knowledge Graphs (KGs) are structured knowledge models that explicitly store rich factual knowledge. KGs can enhance LLMs by providing external knowledge for inference and interpretability.

### Intelligent Agents

??? abstract "[Intelligent Graph = Knowledge Graph + Intelligent Agents](https://github.com/peterjohnlawrence/IntelligentGraph)"
    Recently there has been much excitement related to Artificial Intelligence and Knowledge Graphs, especially regarding the emerging symbiotic relationship between them: LLMs provide unstructured reasoning, whilst the knowledge graph provides complementary structured reasoning.


??? note "[Graph Machine Learning in the Era of LLMs](https://arxiv.org/abs/2404.14928)"
    Explores how LLMs can enhance graph features and how graphs can enhance LLMs.

??? note "[MechGPT]()"
    A system capable of understanding scientific disciplines and generating knowledge graphs to connect concepts between disparate areas of research.

??? abstract "[Knowledge Graph Prompting for Multi-Document Question Answering](https://github.com/YuWVandy/KG-LLM-MDQA)"
    Proposes a Knowledge Graph Prompting (KGP) method to formulate the right context in prompting LLMs for MD-QA.

??? abstract "[SURGE Framework](https://openreview.net/forum?id=WhWlYzUTJfP)"
    A framework for generating context-relevant and knowledge-consistent dialogues with a KG. The method first retrieves the relevant subgraph from the KG, then enforces consistency across facts by perturbing their word embeddings conditioned on the retrieved subgraph.

### Tools and Frameworks
??? abstract "[iText2KG](https://github.com/AuvaLab/itext2kg)"
    A zero-shot method for incremental knowledge graph construction with resolved entities and relations. Key modules:
    - Document Distiller for semantic block structuring
    - Incremental Entity Extractor for unique entity identification
    - Incremental Relation Extractor for relationship extraction
    - Graph Integrator and Visualization module

??? abstract "[Docs2KG](https://docs2kg.ai4wa.com/)"
    A framework designed to extract multimodal information from diverse unstructured documents, including emails, web pages, PDF files, and Excel files. It offers a flexible and extensible solution that can adapt to various document structures and content types.

### Research Benchmarks
??? note "[Head-to-Tail: How Knowledgeable are LLMs?](https://arxiv.org/abs/2308.10168)"
    Through evaluation of 16 LLMs, shows that existing models still struggle with factual knowledge, especially for torso-to-tail entities.

??? note "[Neurosymbolic AI for Reasoning](https://arxiv.org/abs/2302.07200)"
    Surveys methods that perform neurosymbolic reasoning tasks on knowledge graphs and proposes a novel taxonomy for classification.

??? note "[ULTRA: Foundation Models for KG Reasoning](https://arxiv.org/abs/2310.04562)"
    Presents an approach for learning universal and transferable graph representations, achieving strong zero-shot performance on unseen graphs.


??? note "[Knowledge Graph Reasoning with Self-supervised Reinforcement Learning (Google Brain, May 2024)](https://arxiv.org/abs/2405.13640)"

    Abstract:
    "Reinforcement learning (RL) is an effective method of finding reasoning pathways in incomplete knowledge graphs (KGs). To overcome the challenges of a large action space, a self-supervised pre-training method is proposed to warm up the policy network before the RL training stage. To alleviate the distributional mismatch issue in general self-supervised RL (SSRL), in our supervised learning (SL) stage, the agent selects actions based on the policy network and learns from generated labels; this self-generation of labels is the intuition behind the name self-supervised. With this training framework, the information density of our SL objective is increased and the agent is prevented from getting stuck with the early rewarded paths. Our self-supervised RL (SSRL) model improves the performance of RL by pairing it with the wide coverage achieved by SL during pretraining, since the breadth of the SL objective makes it infeasible to train an agent with that alone. We show that our SSRL model meets or exceeds current state-of-the-art results on all Hits@k and mean reciprocal rank (MRR) metrics on four large benchmark KG datasets. This SSRL method can be used as a plug-in for any RL architecture for a KGR task. We adopt two RL architectures, i.e., MINERVA and MultiHopKG as our baseline RL models and experimentally show that our SSRL model consistently outperforms both baselines on all of these four KG reasoning tasks. "

#### Data generation

??? abstract "[Pygraft](https://github.com/nicolas-hbt/pygraft)"
    For those of you interested in open-source Python tools, I am happy to share with you our new work: PyGraft, a configurable Python tool to generate synthetic knowledge graphs easily! We expect PyGraft to help you generate new and tailored benchmark datasets useful for any kind of Machine Learning related tasks.

    We plan on submitting the presentation of PyGraft (paper provided below) to an international conference, so we welcome any help: please share and star our Github repository if you like the project, this is very important for increasing PyGraft's visibility and proposing additional features in the near future!

    We also welcome any ideas on how to improve PyGraft. So, if you want to contribute, let us get in touch! We mainly seek contributions from top Master's students with some exposure to research, as well as researchers (PhDs, PostDocs, etc) with good programming skills.

    Documentation: [https://pygraft.readthedocs.io/en/latest/](https://pygraft.readthedocs.io/en/latest/)

    📝 Paper: [https://arxiv.org/pdf/2309.03685.pdf](https://arxiv.org/pdf/2309.03685.pdf)


### Retrieval on other Databases

??? abstract "[An interesting study that shows the impact of KGs for question answering on SQL databases.](https://github.com/datadotworld/cwd-benchmark-data)"

    The authors show that the KG representation of the enterprise SQL database improves the performance of GPT-4 for QA: 54% accuracy vs. 16% with instructions directly on SQL databases.

    📝 Paper: [https://arxiv.org/pdf/2311.07509](https://arxiv.org/pdf/2311.07509)



### Financial Analysis
#### Risk assessment using company and market KGs
#### Fraud detection through relationship analysis

## Training and Courses
In this hands-on course, you will learn how to create and query knowledge graphs using Large Language Models (LLMs).

https://graphacademy.neo4j.com/courses/llm-knowledge-graph-construction/


## Research

### Research

??? note "[Introducing MechGPT 🦾🤖]()"

    This project by Markus J. Buehler is one of the coolest use cases of 1) fine-tuning an LLM, and 2) generating a knowledge graph that we've seen (powered by LlamaIndex 🦙).

    The end result is a system capable of understanding a diverse range of scientific disciplines, generating new hypotheses/ideas, and importantly - connect concepts between disparate concepts of research.

    Let's take a concrete example of this: "relate hyperelasticity in dynamic fracture with protein unfolding"

    A knowledge graph is generated with LlamaIndex abstractions from sampled LLM conversations. Take a look below. We see some key concepts in common between hyperplasticity and protein unfolding! 
    💡 Dynamics of Energy Transfer
    💡Mirror-symmetry effect

    Finally, this knowledge graph can itself be used for retrieval-augmentation to answer questions + develop new hypotheses.

    Check out the full paper below - there's a lot of details that we didn't cover:

    AMR: https://lnkd.in/g6gn-XaK

    ArXiv: https://lnkd.in/gx7N43Jz


??? abstract "[Title; Establishing Trust in ChatGPT BioMedical Generated Text: An Ontology-Based Knowledge Graph to Validate Disease-Symptom Links](https://arxiv.org/pdf/2308.03929)"
    Methods: Through an innovative approach, we construct ontology-based knowledge graphs from authentic medical literature and AI-generated content. Our goal is to distinguish factual information from unverified data. We compiled two datasets: one from biomedical literature using a "human disease and symptoms" query, and another generated by ChatGPT, simulating articles. With these datasets (PubMed and ChatGPT), we curated 10 sets of 250 abstracts each, selected randomly with a specific seed. Our method focuses on utilizing disease ontology (DOID) and symptom ontology (SYMP) to build knowledge graphs, robust mathematical models that facilitate unbiased comparisons. By employing our fact-checking algorithms and network centrality metrics, we conducted GPT disease-symptoms link analysis to quantify the accuracy of factual knowledge amid noise, hypotheses, and significant findings. 

    Results: The findings obtained from the comparison of diverse ChatGPT knowledge graphs with their PubMed counterparts revealed some interesting observations. While PubMed knowledge graphs exhibit a wealth of disease-symptom terms, it is surprising to observe that some ChatGPT graphs surpass them in the number of connections. Furthermore, some GPT graphs are demonstrating supremacy of the centrality scores, especially for the overlapping nodes. This striking contrast indicates the untapped potential of knowledge that can be derived from AI-generated content, awaiting verification. Out of all the graphs, the factual link ratio between any two graphs reached its peak at 60%. 

    Conclusions: An intriguing insight from our findings was the striking number of links among terms in the knowledge graph generated from ChatGPT datasets, surpassing some of those in its PubMed counterpart. This early discovery has prompted further investigation using universal network metrics to unveil the new knowledge the links may hold.

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
