TODO: This needs to be moved to ai_in_general (and that needs to be made into a sub directory to appropriately handle this)

## Building Knowledge Graphs

Knowledge graphs can be created with the help of Generative AI. Understanding relationships between pieces of information allows the technology to create visual representations of connections, improving information processing.

### General approaches 

??? important "[Natural Language is All a Graph Needs](https://arxiv.org/pdf/2308.07134.pdf) is a very powerful manner of fusing LLMs with KGs using natural language"

    - Node classification and self-supervised link predictions.
    - Scaleable natural-English graph prompts for instruction tuning
    - Identifying a central node and doing neighbor sampling and explorations using LLMs.
    - Avoids complex attention mechanisms and tokenizers.

    <img width="965" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/01bb7b6a-73d5-4969-a46f-ee1a35666082">
    <img width="544" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/2dde6920-f3a1-453b-bce2-76d5926e3ed4">

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/m-elbably/gpt-graph) [GPT for knowledge graphs](https://github.com/m-elbably/gpt-graph)"
    [Medium](https://medium.com/@m-elbably/gpt-graph-a-simple-tool-for-knowledge-graph-exploration-70e0e3861716)




### Description of Graphs for LLMs
??? tip "[Unifying Large Language Models and Knowledge Graphs: A Roadmap](https://arxiv.org/pdf/2306.08302.pdf)"

    <img width="570" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/63d90af4-6475-4622-9da9-ec90c979d745">

!!! abstract "[GPT4Graph: Can Large Language Models Understand Graph sTructure Data? An Empirical Evaluation and Benchmarking"]"

    <img width="543" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/7be33fc1-ff46-4717-9208-15941be23b96">
    <img width="1107" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/77e8aa02-a435-4f8a-8bbf-a4d0dc4afecf">


### Other examples

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/tomasonjo/llm-movieagent) [Enhancing LLMs with Semantic-layers](https://github.com/tomasonjo/llm-movieagent)"
    [Blog](https://towardsdatascience.com/enhancing-interaction-between-language-models-and-graph-databases-via-a-semantic-layer-0a78ad3eba49)
    Enhancing Interaction between Language Models and Graph Databases via a Semantic Layer

    "Knowledge graphs provide a great representation of data with flexible data schema that can store structured and unstructured information. You can use Cypher statements to retrieve information from a graph database like Neo4j. One option is to use LLMs to generate Cypher statements. While that option provides excellent flexibility, the truth is that base LLMs are still brittle at consistently generating precise Cypher statements. Therefore, we need to look for an alternative to guarantee consistency and robustness. What if, instead of developing Cypher statements, the LLM extracts parameters from user input and uses predefined functions or Cypher templates based on the user intent? In short, you could provide the LLM with a set of predefined tools and instructions on when and how to use them based on the user input, which is also known as the semantic layer."

 

!!! note "[Ontology mapping](https://medium.com/@peter.lawrence_47665/encouraging-results-for-knowledge-graph-extraction-by-llm-ontology-prompting-60a7e5dcaf0a)"

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/monarch-initiative/ontogpt) [OntoGPT](https://github.com/monarch-initiative/ontogpt) uses two different methods to query knowledge graphs using LLMS"

    Uses [SPIRES: Structured Prompt Interrogation and Recursive Extraction of Semantics](https://arxiv.org/pdf/2304.02711.pdf)
    A Zero-shot learning (ZSL) approach to extracting nested semantic structures from text
    This approach takes two inputs - 1) LinkML schema 2) free text, and outputs knowledge in a structure conformant with the supplied schema in JSON, YAML, RDF or OWL formats
    Uses GPT-3.5-turbo, GPT-4, or one of a variety of open LLMs on your local machine
    [SPINDOCTOR: Structured Prompt Interpolation of Narrative Descriptions Or Controlled Terms for Ontological Reporting](https://arxiv.org/pdf/2305.13338.pdf)


??? abstract "[Universal Preprocessing Operators for Embedding Knowledge Graphs with Literals](https://arxiv.org/pdf/2309.03023.pdf) proposes a set of preprocessing operators that can transform KGs to be embedded within any method."

    [Github](https://gitlab.com/patryk.preisner/mkga/)
    <img width="584" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4316fd44-acd3-4cad-81fd-7568c88cb69b">

### Other Papers and utilities

!!! abstract "[Diffbot + Langchain for KG creation](https://python.langchain.com/docs/use_cases/more/graph/diffbot_graphtransformer)"


??? abstract "[Multimodal learning with graphs](https://yashaektefaie.github.io/mgl/)"
    [Preprint](https://arxiv.org/pdf/2209.03299.pdf)
    [Nature](https://www.nature.com/articles/s42256-023-00624-6)
    While not strictly GenAI focused, this introduces a comprehensive manner of combining cross-modal dependencies using geometric relationships.

    <img width="711" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/51523805-c5f7-40ec-988b-590c2d2f8f81">

??? warning "![GitHub Repo stars](https://badgen.net/github/stars/nicolas-hbt/pygraft) is an open-source Python library for generating synthetic yet realistic schemas and (KGs) [PyGraft](https://github.com/nicolas-hbt/pygraft) is an open-source Python library for generating synthetic yet realistic schemas and (KGs) based on user-specified parameters."
    [Paper](https://arxiv.org/pdf/2309.03685.pdf)
