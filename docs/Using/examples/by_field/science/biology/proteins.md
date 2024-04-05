🚧 Under construction 🦺

**Please consider contributing modifications or suggestions to improve this [here](https://github.com/ianderrington/genai)**

Generating or modifying protein sequences to improve behavior, or to create novel behavior, is is a powrful application for AI. Guided through evolutionary-techniques, Bayesian optimization, and/or with the use of language models, they can vasly accelerate the development of biotechnological tools, as well as for identifying targets and avenues for therapeutics. 

Protein language models, PLMs, are increasingly useful in predicting structure and function of proteins. 

## Strategy

Protein optimization will necessarily evolve the creation of those proteins and evaluations of target characteristics. There are large volumes of databases of various forms that may be useful in creating foundation models. It will still be essential to use continued observaiton to improve the optimization target based on predicted and iterated feedback.

The volume of the observations will hepl to determine the architectures that one ould use. Base models tend to be PLMs because of the large set of available data. Unsupervised finetuning with those large models may be able to occur through homology or family sets to per. Final targets may be then optimized with simple networks, often involving regression to minimize overfitting, or methods that include Bayesian or evolutionary approaches. 

To be able to successfully deliver on final target optimziation, the greater the quantity of direct or surrogate data that can be obtained, the greater the potential the resulting models will ˆs sufficiently predictive of fitness of future protein sequence candidates. That is why massive screening approaches, as described in by [Ginko's platform](https://foundrytheory.substack.com/p/improving-a-stubborn-enzyme-with-ai) screening thousands of candidates. 

??? note "[An example process by Ginko](https://foundrytheory.substack.com/p/improving-a-stubborn-enzyme-with-ai)"
    <img width="635" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/d62000de-845d-4e91-9a7d-c87473752782">

## Architectures

Evolutionary scale models are trained using generally all known protein sequences, generally with PLMs. Optimization can occur heuristically focusing on active site mutagensis as most likely areas for improvement. Also, the use of computational models like Rosetta to make mutations to molecules and evaluate how they might impact the binding. It may be a fusion of all of these techniques in different manners. 

### Fitness Modeling 
The models that are used in the architectures may be large-language models, quite often transformer based. These models are used to generate embeddings and attention maps (when using transformers). These generated results are then fused, often with a representation (one hot) of the original sequence, resulting in an input to a downstream model. These downstream models are then optimized for particular [targets](#optimization-targets). 

### Sequence Generation
Once 'oracle' models have bene found to yield  optimized, it is important to be able to generate sequences that may help to optimize the sequence. One way of doing this is to use _activation maximization_, a method that will generate input to a model that will ideally maximize the output for a given model (assuming maximization is the desired target direction.)


??? abstract "[SeqProp: Stochastic Sequence Propagation - A Keras Model for optimizing DNA, RNA and protein sequences based on a predictor. ](https://github.com/johli/seqprop/tree/master)" seqprop
    The authors reveal in their [paper](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-021-04437-5) a method to optimize biological protein sequences based on an a predictor model. They use something called _trainable logits_ that can be sampled from, but do so doing instance normalizaton 
    ![image](https://github.com/ianderrington/genai/assets/76016868/3c2fe20f-1257-4a76-a034-1b3cad242b8c)
    ![image](https://github.com/ianderrington/genai/assets/76016868/fed3de2c-6dcf-4f4b-8ad1-aa2ecadce5ad)



## Optimization Targets

There are several optimization targets of direct interest 


- [Structure](#structure)
    - Contact prediction
    - Secondary structure
    - Remote cohomology
    - (mis)Folding (missense)
    
- [Function](#function)
    - Enzymatic Catalysis
    - Thermocompatibility
    - Fluorescence
    - Remote cohomology
    
- [Protein Binding](#binding)
    - Proteins
    - Nucleic Acids
    - Drugs molecules
    - Metals
 
-

- [Candidate Identification](#candidate-identification) and [alignment](#candidate-alignment)
- ... and _hybrid_ versions to optimize the targets jointly


## Foundation models

### ESM based

??? abstract "[Genome-wide prediction of disease variant effects with a deep protein language model](https://github.com/ntranoslab/esm-variants)"
    The authors show int heir [paper](https://www.nature.com/articles/s41588-023-01465-0) a workflow using ESM1b, a 650-million-parameter protein language model, to predict all ~450 million possible missense variant effects in the human genome, and made all predictions available on a web portal.

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/facebookresearch/esm) [Language models enable zero-shot prediction of the effects of mutations on protein function]([Language models enable zero-shot prediction of the effects of mutations on protein function](https://github.com/facebookresearch/esm))"
    
    **Developments**

    Using established and newly trained protein language models, the authors demonstrate the ability to provide zero-shot predictions of the effect of a protein mutation on a protein's fluorescence. 
    
    <img width="610" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5b9b6d18-a7a6-4ffb-a0cd-c952315aed90">
    
    They use a PLM to score the mutations using a log odds-ration of the mutated protein. 
    
    <img width="320" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/88f7ea61-b1a8-4455-882e-d3ba23403f58">
    
    **Data**
    
    They create ESM-1v, an unsupervised masked transformer model by training on 98 million protein sequences, using Uniref90 2020-03. 
    
    They evaluate the model on a set of 41 deep mutational scans. 

    [Paper](https://www.biorxiv.org/content/10.1101/2021.07.09.450648v2.full.pdf)


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/facebookresearch/esm) [MSA Transformer]([MSA Transformer](https://github.com/facebookresearch/esm))"

    The author's demonstrate in their [paper](https://www.biorxiv.org/content/10.1101/2021.02.12.430858v3.full.pdf) training an unsupervised PLM that operates on sets of aligned sequences. Self-supervision helps to reconstruct the corrupted MSA. 

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

    

??? abstract "[Biological structure and function emerge from scaling unsupervised learning to 250 million protein sequences](https://www.biorxiv.org/content/10.1101/622803v4.full.pdf)"
    The authors used masked languaged prediction with transformer models to train a foundation model capable of multiple downstream tasks.
    
        "To this end we use unsupervised learning to train a deep contextual language model on
        86 billion amino acids across 250 million protein
        sequences spanning evolutionary diversity. The
        resulting model contains information about biological properties in its representations. The representations are learned from sequence data alone.
        The learned representation space has a multi-scale
        organization reflecting structure from the level
        of biochemical properties of amino acids to remote homology of proteins. Information about
        secondary and tertiary structure is encoded in the
        representations and can be identified by linear projections. "

        <img width="329" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/27df578a-50ab-42ac-b675-58f7d740be4a">

??? note "[TRANSFORMER PROTEIN LANGUAGE MODELS ARE UNSUPERVISED STRUCTURE LEARNERS](https://www.biorxiv.org/content/10.1101/2020.12.15.422761v1.full.pdf)"
    <img width="973" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e6ca2843-c5a1-444c-96f5-081a8aad6a5b">

??? note "[Single-sequence protein structure prediction using supervised transformer protein language models](https://yanglab.nankai.edu.cn/trRosetta/benchmark_single/)"
    The authors show in their [paper[(https://nature.com/articles/s43588-022-00373-3) the ability to generate high quality predictions outperforming AlphaFold2, with a model called trRosettaX-Single using ESM to generate representations and attention maps  that can be trained for distance+energy maps, 
    
    ![image](https://github.com/ianderrington/genai/assets/76016868/c06d4a40-117f-4b86-9deb-ee9d29fc8f70)



### Tape
??? abstract "[Tasks Assessing Protein Embeddings (TAPE)](https://github.com/songlab-cal/tape)"
    


### Structure


!!! tip "[Evolutionary-scale prediction of atomic-level protein structure with a language model](https://www.science.org/doi/10.1126/science.ade2574) End to end Language model enabling structure sequence pairing, coupled with an equivariant transformer structure model at the end"


### Function

#### Enzymatic Catalysis

!!! tip "[Harnessing Generative AI to Decode Enzyme Catalysis and Evolution for Enhanced Engineering](https://www.biorxiv.org/content/10.1101/2023.10.10.561808v1.full.pdf)"

??? tip "[De novo design of luciferases using deep learning](https://www.nature.com/articles/s41586-023-05696-3)"
    ![image](https://github.com/ianderrington/genai/assets/76016868/b4de3724-def9-43f6-a3b0-e55061c5b278)




??? note "[ForceGen: End-to-end de novo protein generation based on nonlinear mechanical unfolding responses using a language diffusion model](https://www.science.org/doi/10.1126/sciadv.adl4000)" forcegen
      **Developments**  The authors present ForceGen, an end-to-end algorithm for de novo protein generation based on nonlinear mechanical unfolding responses. Rooted in the physics of protein mechanics, this generative strategy provides a powerful way to design new proteins rapidly, including exquisite and rapid predictions about their dynamical behavior.
      
      Proteins, like any other mechanical object, respond to forces in peculiar ways. Think of the different response you'd get from pulling on a steel cable versus pulling on a rubber band, or the difference between honey and glass. Now, we can design proteins with a set of desirable mechanical characteristics, with applications from health to sustainable plastics.

      <img width="701" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/3af9d0de-93dd-4591-9967-ebb856307618">

      <img width="727" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f985357c-2b3b-4092-875c-93648ab167f0">

      The key to solving this problem was to integrate a **protein language model with denoising diffusion methods**, and using accurate atomistic-level physical simulation data to endow the model a first-principles understanding. ForceGen can solve both forward and inverse tasks: In the forward task, we can predict how stable a protein is, how it will unfold and what the forces involved are, all given just the sequence of amino acids. In the inverse task, we can design new proteins that meet complex nonlinear mechanical signature targets.
      
      With the new generative model they can directly design proteins to meet complex nonlinear mechanical property-design objectives by leveraging deep knowledge on protein sequences from a pretrained protein language model and maps mechanical unfolding responses to create proteins.
      
      Via full-atom molecular simulations for direct validation from physical and chemical principles, we demonstrate that the designed proteins are de novo, and fulfill the targeted mechanical properties, including unfolding energy and mechanical strength, and a detailed unfolding force-separation curves. 



??? abstract "🧬 ![GitHub Repo stars](https://badgen.net/github/stars/bio-ontology-research-group/deepgo2) [Protein function prediction as approximate semantic entailment]([Protein function prediction as approximate semantic entailment](https://github.com/bio-ontology-research-group/deepgo2))" deepgo-se

    **Developments** 

    Current LLM models excel at predicting the structure and other attributes of biological sequences like proteins. However, their [transferability is limited](https://www.biorxiv.org/content/10.1101/2024.02.05.578959v2.full.pdf), capping their true potential. The [DeepGO-SE](https://www.nature.com/articles/s42256-024-00795-w) model innovates 🚀 by integrating protein language models with specific knowledge on protein function, bridging the gap between knowledge-graphs' explicit representations and next-token prediction's implicit representations, and thereby significantly improving model performance.

    **How it works** 

    * 🔄 First, DeepGO-SE reuses the ESM2 large language model to convert a protein sequence into a vector space embedding, prepping it for machine learning application.
    * 🧠 Next, an ensemble of fitted prediction models is trained to align ESM2 embeddings with an embedding space (ELEmbeddings) derived from GO axioms, creating a world model filled with geometric shapes and relations akin to a Σ algebra, which can verify the truth of a statement.
    * ✅ Finally, for statements such as "protein has function C", when the ensemble reaches a consensus on truth, the semantic truth estimation is then accepted as valid.

    ![DeepGO-SE Model Overview](https://github.com/ianderrington/genai/assets/76016868/6136332a-66cd-4f1f-89d5-fe11690e42fa)

    The authors demonstrate 📈 that this method improves molecular function prediction by a substantial margin. Moreover, they reveal that training with protein-protein interactions substantially benefits the understanding of complex biological processes. They suggest that predicting biological processes may only require knowledge of molecular functions, potentially paving the way for a more generalized approach that could be advantageous in other domains.

#### Thermostability

??? abstract "[ProLaTherm: Protein Language Model-based Thermophilicity Predictor](https://github.com/grimmlab/ProLaTherm)" prolatherm
    
    **Developments** The authors reveal in their [paper](https://academic.oup.com/nargab/article/5/4/lqad087/7306664) a model that is good at predicting thermal stability as well as an augmented dataset to enable their good predictive control 
    
    ![image](https://github.com/ianderrington/genai/assets/76016868/0c9b9576-b753-459b-9016-c40a7aaccde0)
    
    Data: Collected from multiple sources to create new sets. " 9422 UniProt identifiers and 9363 corresponding amino acid sequences from 16 thermophilic and 16 mesophilic organisms" Filtered

    Models: 
    They considered several first, we consider feature-based models that rely on manually engineered features, such as physicochemical properties. Second, we include hybrid sequence-based models that use amino acid features to learn sequence embeddings. Third, we consider approaches that are purely sequence-based, similarly to ProLaTherm, but in contrast train sequence embeddings from scratch.  The final model used a simplified transformer solution that used 1024 sequence enbeddings that were put into a self-attention network resulting in an output embedding that was averaged and put into an ReLU activation that then went to a a batch norm and logistic predction of whether the protein was a thermophile. 
    
    Training: From scratch.

    Results: High performance of PLM 97% accuracy over other models, though this accuracy is reduced when reducing train/test set homology.
    

    

### Candidate Identification

Particularly for evolutionary methods, it is essential to know _where to start_ optimizing from. GenAI can be used to identify candidates based on databases of prior candidates. 

Searching is essential to find similar sequences that may aid in the training or fine-tuning of models. This can be done with sequence-based alignment, as well as structure-based alignment. Here are a few references of highly-relevant tools for search/alignment. 

??? tip "[Fast and accurate protein structure search with: Foldseek](https://search.foldseek.com/search)"
    Foldseek "aligns the structure of a query protein against a database by describing tertiary amino acid interactions within proteins as sequences over a structural alphabet".
    [Paper](https://www.nature.com/articles/s41587-023-01773-0)


#### Candidate alignment
It is not necessarily just enough to identify a potential candidate but to have a degree of _alignment_ with of the candidate with starting or suggested candidates. This allows for a degree of interpretability to by people. 



## Tools

### Evaluation Methods

??? abstract "[BERTOLOGY MEETS BIOLOGY: INTERPRETING ATTENTION IN PROTEIN LANGUAGE MODELS](https://github.com/salesforce/provis)"
    **Developments** The authors show in their [paper](https://arxiv.org/pdf/2006.15222.pdf) " that
    attention: (1) captures the folding structure of proteins, connecting amino acids that
    are far apart in the underlying sequence, but spatially close in the three-dimensional
    structure, (2) targets binding sites, a key functional component of proteins, and
    (3) focuses on progressively more complex biophysical properties with increasing layer depth. We find this behavior to be consistent across three Transformer
    architectures (BERT, ALBERT, XLNet) and two distinct protein datasets. We
    also present a three-dimensional visualization of the interaction between attention and protein structure"

    They see the following:
    
    * Attention aligns strongly with contact maps in the deepest layers.
    * Attention targets binding sites throughout most layers of the models.
    * Attention targets Post-translational modifications in a small number of heads.
    * Attention targets higher-level properties in deeper layers.
    * Attention heads specialize in particular amino acids. 
    * Attention is consistent with substitution relationships

### Colab Design
!!! tip "![GitHub Repo stars](https://badgen.net/github/stars/sokrypton/ColabDesign) [ColabDesign: Making Protein Design accessible to all via Google Colab!]([ColabDesign: Making Protein Design accessible to all via Google Colab!](https://github.com/sokrypton/ColabDesign))"


    

## Companies
- [Deepchain.bio]
- [https://310.ai/]

## Quality reviews and references

!!! tip "[Harnessing Generative AI to Decode Enzyme Catalysis and Evolution for Enhanced Engineering](https://www.biorxiv.org/content/10.1101/2023.10.10.561808v1.full.pdf)"

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/yangkky/Machine-learning-for-proteins?tab=readme-ov-file) [Papers on Machine learning for Proteins]([Papers on Machine learning for Proteins](https://github.com/yangkky/Machine-learning-for-proteins?tab=readme-ov-file))"

??? tip "[Deep Learning in Protein Structural Modeling and Design](https://www.sciencedirect.com/science/article/pii/S2666389920301902) provides a thorough summary of DL manners of optimizing proteins."
    They emphasize a Sequence --> Structure --> Function approach should be focused upon. 
    ![image](https://github.com/ianderrington/genai/assets/76016868/cf1b22cc-73d7-4f91-888d-2ad6f75953a1)



!!! note "[Nucleate AI in Biotech: AI for Protein Design](https://nucleate-hq.notion.site/AI-in-Protein-Design-Resource-Page-8c137f8ba2684402aef9e1e31b85776c)"


