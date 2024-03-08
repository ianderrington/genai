🚧 Under construction 🦺

**Please consider contributing modifications or suggestions to improve this [here](https://github.com/ianderrington/genai)**

Generating or modifying protein sequences to improve behavior, or to create novel behavior, is is a powrful application for AI. Guided through evolutionary-techniques, Bayesian optimization, and/or with the use of language models, they can vasly accelerate the development of biotechnological tools, as well as for identifying targets and avenues for therapeutics. 

Protein language models, PLMs, are increasingly useful in predicting structure and function of proteins. 


#### Candidate Identification

Particularly for evolutionary methods, it is essential to know _where to start_ optimizing from. GenAI can be used to identify candidates based on databases of prior candidates. 

Searching is essential to find similar sequences that may aid in the training or fine-tuning of models. This can be done with sequence-based alignment, as well as structure-based alignment. Here are a few references of highly-relevant tools for search/alignment. 

??? tip "[Fast and accurate protein structure search with: Foldseek](https://search.foldseek.com/search)"
    Foldseek "aligns the structure of a query protein against a database by describing tertiary amino acid interactions within proteins as sequences over a structural alphabet".
    [Paper](https://www.nature.com/articles/s41587-023-01773-0)


##### Candidate alignment
It is not necessarily just enough to identify a potential candidate but to have a degree of _alignment_ with of the candidate with starting or suggested candidates. This allows for a degree of interpretability to by people. 




## Architectures
#### Traditional
#### Deep / LLMS
#### VAE
#### MaxEnt Maximum Entropy Models

##### Diffusion
##### GANS

## Optimization Targets

There are several optimization targets of direct interest 


- [Structure](#structure)
- [Function](#function)
    - Enzymatic Catalysis
    - Fluorescence
- [Hybrid](#hybrid-targets)
- [Protein Binding](#binding)
    - Proteins
    - Nucleic Acids
    - Drugs molecules
    - Metals
- Relevancy 

    
#### Structure

!!! tip "[Evolutionary-scale prediction of atomic-level protein structure with a language model](https://www.science.org/doi/10.1126/science.ade2574) End to end Language model enabling structure sequence pairing, coupled with an equivariant transformer structure model at the end"


#### Function

!!! tip "[Harnessing Generative AI to Decode Enzyme Catalysis and Evolution for Enhanced Engineering](https://www.biorxiv.org/content/10.1101/2023.10.10.561808v1.full.pdf)"

??? tip "[De novo design of luciferases using deep learning](https://www.nature.com/articles/s41586-023-05696-3)"
    ![image](https://github.com/ianderrington/genai/assets/76016868/b4de3724-def9-43f6-a3b0-e55061c5b278)


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


??? note "[ForceGen: End-to-end de novo protein generation based on nonlinear mechanical unfolding responses using a language diffusion model](https://www.science.org/doi/10.1126/sciadv.adl4000)" forcegen
      **Developments**  The authors present ForceGen, an end-to-end algorithm for de novo protein generation based on nonlinear mechanical unfolding responses. Rooted in the physics of protein mechanics, this generative strategy provides a powerful way to design new proteins rapidly, including exquisite and rapid predictions about their dynamical behavior.
      
      Proteins, like any other mechanical object, respond to forces in peculiar ways. Think of the different response you'd get from pulling on a steel cable versus pulling on a rubber band, or the difference between honey and glass. Now, we can design proteins with a set of desirable mechanical characteristics, with applications from health to sustainable plastics.

      <img width="701" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/3af9d0de-93dd-4591-9967-ebb856307618">

      <img width="727" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f985357c-2b3b-4092-875c-93648ab167f0">

      The key to solving this problem was to integrate a **protein language model with denoising diffusion methods**, and using accurate atomistic-level physical simulation data to endow the model a first-principles understanding. ForceGen can solve both forward and inverse tasks: In the forward task, we can predict how stable a protein is, how it will unfold and what the forces involved are, all given just the sequence of amino acids. In the inverse task, we can design new proteins that meet complex nonlinear mechanical signature targets.
      
      With the new generative model they can directly design proteins to meet complex nonlinear mechanical property-design objectives by leveraging deep knowledge on protein sequences from a pretrained protein language model and maps mechanical unfolding responses to create proteins.
      
      Via full-atom molecular simulations for direct validation from physical and chemical principles, we demonstrate that the designed proteins are de novo, and fulfill the targeted mechanical properties, including unfolding energy and mechanical strength, and a detailed unfolding force-separation curves. 


#### Hybrid Targets


??? code "🧬 [Protein function prediction as approximate semantic entailment](https://github.com/bio-ontology-research-group/deepgo2)" deepgo-se

    **Developments** 

    Current LLM models excel at predicting the structure and other attributes of biological sequences like proteins. However, their [transferability is limited](https://www.biorxiv.org/content/10.1101/2024.02.05.578959v2.full.pdf), capping their true potential. The [DeepGO-SE](https://www.nature.com/articles/s42256-024-00795-w) model innovates 🚀 by integrating protein language models with specific knowledge on protein function, bridging the gap between knowledge-graphs' explicit representations and next-token prediction's implicit representations, and thereby significantly improving model performance.

    **How it works** 

    * 🔄 First, DeepGO-SE reuses the ESM2 large language model to convert a protein sequence into a vector space embedding, prepping it for machine learning application.
    * 🧠 Next, an ensemble of fitted prediction models is trained to align ESM2 embeddings with an embedding space (ELEmbeddings) derived from GO axioms, creating a world model filled with geometric shapes and relations akin to a Σ algebra, which can verify the truth of a statement.
    * ✅ Finally, for statements such as "protein has function C", when the ensemble reaches a consensus on truth, the semantic truth estimation is then accepted as valid.

    ![DeepGO-SE Model Overview](https://github.com/ianderrington/genai/assets/76016868/6136332a-66cd-4f1f-89d5-fe11690e42fa)

    The authors demonstrate 📈 that this method improves molecular function prediction by a substantial margin. Moreover, they reveal that training with protein-protein interactions substantially benefits the understanding of complex biological processes. They suggest that predicting biological processes may only require knowledge of molecular functions, potentially paving the way for a more generalized approach that could be advantageous in other domains.




### Tools

!!! tip "[ColabDesign: Making Protein Design accessible to all via Google Colab!](https://github.com/sokrypton/ColabDesign)"


    

## Companies
- [Deepchain.bio]
- [https://310.ai/]

## Quality reviews and references

!!! tip "[Harnessing Generative AI to Decode Enzyme Catalysis and Evolution for Enhanced Engineering](https://www.biorxiv.org/content/10.1101/2023.10.10.561808v1.full.pdf)"

!!! code "[Papers on Machine learning for Proteins](https://github.com/yangkky/Machine-learning-for-proteins?tab=readme-ov-file)"

!!! note "[Nucleate AI in Biotech: AI for Protein Design](https://nucleate-hq.notion.site/AI-in-Protein-Design-Resource-Page-8c137f8ba2684402aef9e1e31b85776c)"


