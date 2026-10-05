# Genetics Language Models

Language models trained on DNA, RNA, and protein sequences instead of natural-language text. The same transformer architecture that predicts the next word can predict the next base pair or amino acid, letting a model learn the statistical structure of genomes the way an LLM learns the structure of language.

[Genetics Language Models](https://arxiv.org/pdf/2311.07621.pdf) surveys the field.

### Applications

- Predicting gene function and co-regulation from genomic context, without needing a labeled dataset for every gene.
- Designing cis-regulatory elements (promoters, enhancers) for biomanufacturing and gene-therapy applications.
- Modeling protein structure and function jointly with the genomic sequence that encodes it.

### Targets

Most models in this space operate on one of three sequence types: raw DNA (nucleotide-level), protein sequences (amino-acid-level), or a joint genomic-and-protein representation that links a gene's sequence to what it produces.

## Research 


??? abstract "[Genomic language model predicts protein co-regulation and function](https://github.com/y-hwang/gLM)"

    The authors show in their [paper](https://www.nature.com/articles/s41467-024-46947-9#Sec30) the ability to train genomic language models on top of protein language models (ESM2)  "on millions of metagenomic scaffolds to learn the latent functional and regulatory relationships between genes." Their reveal "a promising approach to encode functional semantics and regulatory syntax of genes in their genomic context and uncover complex relationships between genes in a genomic region."
    ![image](https://github.com/ianderrington/genai/assets/76016868/4e7fad69-3eb2-42ec-aa7b-62ee51f9b3a0)

    
??? abstract "[RegLM - a toolkit for training hyenaDNA based autoregressive language models on DNA sequences](https://github.com/Genentech/regLM/tree/main/src/reglm)" reglm
    **Developments** The authors show in their [paper](https://genome.cshlp.org/content/early/2024/09/24/gr.279142.124.abstract) a model capable of generating Cis-regulatory elements (CREs) like promoters and enhancers that can regulate the expression of Genes. These are useful for biomanufacturing as well as otheir therapeutic applications. 

    <img width="1151" alt="image" src="https://github.com/user-attachments/assets/ada05f41-b21f-4e16-a1c6-0b80f658dc6c">
