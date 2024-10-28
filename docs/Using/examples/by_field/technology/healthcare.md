## Healthcare


### Medical Knowledge

??? abstract "[Medical Graph RAG: Towards Safe Medical Large Language Model via Graph Retrieval-Augmented Generation](https://github.com/MedicineToken/Medical-Graph-RAG" MediGraphRag
    <img width="879" alt="image" src="https://github.com/user-attachments/assets/c335f350-0bc4-44cb-9d76-58aad39ced44">
    **Developments:** The authors [devlop](https://arxiv.org/pdf/2408.04187) a powerful graph-rag based system called MediGraphRag for medical discustions reaching SOTA results. They do so, they most notably introduce 'Triple Graph Construction'. 

    1. Dynamically selected chunk partitioning. 
    2. Entity extraction using structured output of _name_, _type_, and a _context_ in how it mattered. 
    3. Triple link

    **Graph Construction: 'Triple Link'** 
    They create a Triple link Repository Graph (RepoGraph). They create three graphs:
    
    Involving the creation of several graph layers.  

    1. **Medical papers/books**
    2. **Medical Dictionaries**
    3. **UMLS) made of well-defined medical vocabularies and their relationships. 

    They link the entities that are extracted from medical books/papers as E2, based on their relevance, then they use to compute cosine similarity. They then create a relation as a consise phrase based on on the entity, and associated references. 
    Next, they tag the graphs strting with some pre-defined tags, and iteratively generate more tag summaries, for closely-related graphs. These tags have multiple categories. Language models then tag the system using a prompts akin to the following

    ```markdown
    Generate a structured summary from the provided medical content,
    strictly adhering to the following categories... {Tag
    Name: Description of the tag}... .
    ```
    (Their other well constructed prompts can be found [here](https://github.com/MedicineToken/Medical-Graph-RAG/blob/main/nano_graphrag/prompt.py)

    They then iterate using heirarchichal clustering based on tag similarity to group the graphs and generate synthesized tag summaries, with each graph having it's own groups. They try to merge the top 20% of most similar pairs, and merge pairs  if the pairwise similarities cross a specified threshold. They 
    
    
    **Retrieval**
    To do retrieval, they 

    
### Patient Care


!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/FeatureBaseDB/DoctorGPT) [Doctor GPT](https://github.com/FeatureBaseDB/DoctorGPT) implements advanced LLM prompting for organizing, indexing and discussing PDFs, and does so without using any type of opinionated prompt processing frameworks "“


### Disease prediction
??? tip "[Genome-wide prediction of disease variant effects with a deep protein language model](https://www.nature.com/articles/s41588-023-01465-0) 'A Model that predects bad genetic variants'"
    Here we implemented a workflow generalizing ESM1b to protein sequences of any length and used it to predict all ~450 million possible missense variant effects across all 42,336 protein isoforms in the human genome.

??? tip "[The Nucleotide Transformer: Building and Evaluating Robust Foundation Models for Human Genomics](https://www.biorxiv.org/content/10.1101/2023.01.11.523679v2.full.pdf) A quality set of JAX-enabled transformer models for use in downstream uses."
    They use 6mer tokenization and embeddings. Non-commercial license.
    [Github](https://www.biorxiv.org/content/10.1101/2023.01.11.523679v2.full.pdf)
    <img width="765" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/660548e4-1fe8-4dfa-b020-e22d88f4f656">


### Drug synthesis

!!! tip "[Generative AI for designing and validating easily synthesizable and structurally novel antibiotics](https://github.com/swansonk14/SyntheMol.)"
    The authors [demonstrate](https://www.nature.com/articles/s42256-024-00809-7) a powerful AI that helps to discover antibiotic chemicals with some demonstrating antibacterial activity.
    
    """Many generative AI models for drug design are only tested in silico because the molecules they design are synthetically intractable. Without synthesis and wet lab validation, it’s hard to know whether AI-generated molecules actually work as expected. 
    
    SyntheMol was built exclusively design easy-to-synthesize molecules to enable wet lab validation. SyntheMol creates molecules using molecular building blocks and chemical reactions from the @EnamineLtd REAL Space of 30 billion molecules, which ensures easy synthesis. 
    
    SyntheMol uses a Monte Carlo Tree Search (MCTS) to explore the vast space of easily synthesizable compounds for promising drug candidates. The MCTS is guided by a trained molecular property prediction model such as a graph neural network (GNN). 
    
    We applied SyntheMol to design #antibiotics for A. baumannii, a bacterium with few treatments. We screened ~13,500 compounds against A. baumannii, which we used to train our property prediction models. We then ran SyntheMol to design tens of thousands of antibiotic candidates. 
    
    We filtered our #AI-generated #molecules for novelty, predicted efficacy, and diversity, and we worked with @EnamineLtd
     to #Synthesize 58 #compounds. We found that 6 of those 58 compounds (10% hit rate) were highly potent against A. baumannii and a range of other bacterial species. 
    
    SyntheMol can generate molecules that are easy to synthesize and are effective in the wet lab, bridging the gap between AI-based drug design and #experimentall validation.
    
    SyntheMol’s code is fully open-source at https://github.com/swansonk14/SyntheMol. Data, models, and generated molecules for our antibiotics application are at https://zenodo.org/records/10257839.


??? tip "[ChemChrow](https://arxiv.org/pdf/2304.05376.pdf)"
    [Github](https://github.com/ur-whitelab/chemcrow-public)


!!! tip "![GitHub Repo stars](https://badgen.net/github/stars/kennethleungty/Generative-AI-Pharmacist) [Fully GenAI pharmacist from scripts, images and videos](https://github.com/kennethleungty/Generative-AI-Pharmacist)"


## SubField

### Optometry
!!! important "[Foundation models for Retinas](https://www.nature.com/articles/s41586-023-06555-x)"
