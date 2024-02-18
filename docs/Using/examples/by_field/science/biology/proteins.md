Generating or modifying protein sequences to improve behavior, or to create novel behavior, is is a powrful application for AI. Guided through evolutionary-techniques, Bayesian optimization, and/or with the use of language models, they can vasly accelerate the development of biotechnological tools, as well as for identifying targets and avenues for therapeutics. 

Protein language models, PLMs, are increasingly useful in predicting structure and function of proteins. 

## Methods

### Sequence prediction 
#### Transformers
#### Diffusion

### GANS

### Non-LLM based
#### Evolutionary

## Optimization Targets

- [Structure](#structure)
- [Function](#function)
    - Enzymatic Catalysis
- Fluorescence
- [Protein Binding](#binding)
    - Proteins
    - Nucleic Acids
    - Drugs molecules
    - Metals

## Targets
    
#### Structure

- [Evolutionary-scale prediction of atomic-level protein structure with a language model](https://www.science.org/doi/10.1126/science.ade2574) End to end Language model enabling structure sequence pairing, coupled with an equivariant transformer structure model at the end.


#### Function

??? code "[Language models enable zero-shot prediction of the effects of mutations on protein function](https://github.com/facebookresearch/esm)"
    
    **Developments**
    Using established and newly trained protein language models, the authors demonstrate the ability to provide zero-shot predictions of the effect of a protein mutation on a protein's fluorescence. 
    
    <img width="610" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5b9b6d18-a7a6-4ffb-a0cd-c952315aed90">
    They use a PLM to score the mutations using a log odds-ration of the mutated protein. 
    <img width="320" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/88f7ea61-b1a8-4455-882e-d3ba23403f58">
    
    **Data**
    
    They create ESM-1v, an unsupervised masked transformer model by training on 98 million protein sequences, using Uniref90 2020-03. 
    
They evaluate the model on a set of 41 deep mutational scans. 

    [Paper](https://www.biorxiv.org/content/10.1101/2021.07.09.450648v2.full.pdf)


??? code "[MSA Transformer](https://github.com/facebookresearch/esm)"

    The author's demonstrate training an unsupervised PLM that operates on sets of aligned sequences. 
    Self-supervision helps to reconstruct the corrupted MSA. 

    **Developments**
    
    <img width="334" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e87edf1e-49eb-4a19-bf08-093060e87220">
    
    ** Architecture**
    The architecture 'interleaves attention across the rows and columns of the alignment as an axial attention' that ties the attention map across the rows with 'tied row attention'. They use a single feed-forward layer for each block. For position embeddings, they use a 1D learned position embeddings added independently to each row of MSA to distinguish aligned positions differently for each sequence. 

    The objective looks for the loss of th masked MSA as follows
    <img width="254" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e7fbe493-e30d-415a-99e7-9c28dd4358c6">
    With the probabilities are the output of the MSA transformer, softmax normalized of the amino acid vocabulary indepentely normalized per position in the sequence. Masking the columns uniformly resulted in the best performance.
    
    The models are 12 layers, with a 768 embedding size, and 12 attention heads resulting in 100M parameters.
    
    **Data**

    They use 26 million MSA sequences generated from from UniRef50 by searching UniClust30 with HHblits.

    **Analysis** 
    <img width="706" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/b24fffe3-efbb-4b14-a2b7-fa20b3fdf7ba">

    They show that a logistic regression with 144 parameters fit on 20 training structures could predict the contact maps of almost 15k other structures almost unsupervised. 
    They show a supervised contact prediction map can improve the contact-prediction maps. 
    They find the attention heads focus on highly variable colums, correlating with the per-column entropy of MSA.  

    

    [Paper](https://www.biorxiv.org/content/10.1101/2021.02.12.430858v3.full.pdf)


#### Binding

??? code "[DL Protein Binder](https://github.com/nrbennet/dl_binder_design)"
    ![image](https://github.com/ianderrington/genai/assets/76016868/a998c262-0cd8-490f-b1af-078ccf535c7a)


#### Hybrid Models



## Studies

??? tip "[Feature Reuse and Scaling: Understanding Transfer Learning with Protein Language Models](https://www.biorxiv.org/content/10.1101/2024.02.05.578959v2.full.pdf)"
    The authors reveal that task performance does not scale with pretraining and 'primarily relies on low-level features learned early in pretraining'. 
    <img width="675" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/2770a02f-0359-4685-890c-2499f0dab537">
    The results predict "that scaling PLMs under current pretraining paradigms may not improve performance on many protein function prediction tasks and charts a direction for identifying new, better-aligned pretraining tasks."
    They do see that:

    * Structure Prediction benefits from Masked Language Modeling (MLM) (because in alignment) and scales. 
    * 
    


## Components 

### Search and Alignment

Searching is essential to find similar sequences that may aid in the training or fine-tuning of models. This can be done with sequence-based alignment, as well as structure-based alignment. Here are a few references of highly-relevant tools for search/alignment. 

!!! tip "[Fast and accurate protein structure search with: Foldseek](https://search.foldseek.com/search)"
    Foldseek "aligns the structure of a query protein against a database by describing tertiary amino acid interactions within proteins as sequences over a structural alphabet".
    [Paper](https://www.nature.com/articles/s41587-023-01773-0)


### Tools

!!! tip "[ColabDesign: Making Protein Design accessible to all via Google Colab!](https://github.com/sokrypton/ColabDesign)"


    

## Companies
- [Deepchain.bio]

## References

!!! code "[Papers on Machine learning for Proteins](https://github.com/yangkky/Machine-learning-for-proteins?tab=readme-ov-file)"

!!! note "[Nucleate AI in Biotech: AI for Protein Design](https://nucleate-hq.notion.site/AI-in-Protein-Design-Resource-Page-8c137f8ba2684402aef9e1e31b85776c)"


