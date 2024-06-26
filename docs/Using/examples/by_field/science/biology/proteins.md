🚧 Under construction 🦺

Generating or modifying protein sequences to improve behavior, or to create novel behavior, is is a powrful application for AI. Guided through evolutionary-techniques, Bayesian optimization, and/or with the use of protein language models (PLMS), they can vastly accelerate the development of biotechnological tools, as well as for identifying targets and avenues for therapeutics. Because of their ability to represent the 'language of proteins', PLMS are increasingly important in predicting structure and function of proteins. 

## Components

Protein optimization can be broken down into several component [^n1]

[^n1]: [adaptive machine learning for protein engineering](https://www.sciencedirect.com/science/article/pii/S0959440X21001457)

- **[Target property](#optimization-targets)** is the intended goal(s) for protein development
- **[Fitness Predictor]** that uses sequence information to estimate the value of the optimization target, as a surrogate for laboratory measurement
- **[Sequence Proposer](#sequence-optimization)** that creates sequences to evaluate and explore
- **Prioritizer** that uses sequence and predictor information to estimate the top candidates 
- **Laboratory measurements** that reveal the quality of the generated proteins based on the targets
- **Orchestrator** That puts the pieces together in a functional and validated manner

Optimization systems may involve merging and combining these components for full solutions in two general manners.

1. A model that separates generation and evaluation steps, where an the predictor model evaluates the quality of an input set of sequences (generated or otherwise defined)
2. A model that model that directly predicts the best designs using adaptive sampling, proposing solutions, evaluating them with the predictor model, and then iterating. 

These components can be cleanly seen in the box below:

???+ tip "[Adaptive machine learning for protein engineering](https://www.sciencedirect.com/science/article/pii/S0959440X21001457)"

    An overview of ML for protein engineering:
    
    ![image](https://github.com/ianderrington/genai/assets/76016868/a8af9370-05e8-4e81-a223-b60cafbb9b00)



### Strategy

Protein optimization will necessarily evolve the creation of those proteins and evaluations of target characteristics. There are large volumes of databases of various forms that may be useful in creating foundation models. It will still be essential to use continued observaiton to improve the optimization target based on predicted and iterated feedback.

The volume of the observations will help to determine the architectures that one could use. Base models tend to be PLMs because of the large set of available data. Unsupervised finetuning with those large models may be able to occur through homology or family sets to per. Final targets may be then optimized with simple networks, often involving regression to minimize overfitting, or methods that include Bayesian or evolutionary approaches. 

To be able to successfully deliver on final target optimziation, the greater the quantity of direct or surrogate data that can be obtained, the greater the potential the resulting models will sufficiently predictive of fitness of future protein sequence candidates. That is why massive screening approaches, as described in by [Ginko's platform](https://foundrytheory.substack.com/p/improving-a-stubborn-enzyme-with-ai) screening thousands of candidates. 

??? note "[An example process by Ginkgo](https://foundrytheory.substack.com/p/improving-a-stubborn-enzyme-with-ai)"
    
    Gingko reveals with foundry-scale protein estimates, that with thousands of samples they were able to create an enzyme with 10x improvement from where they started. In their design they use structure (differential) estimates via Rosetta, Evolutionary-scale modeling (PLMs), active site focus evolutionary models, as well as an in-house method called 'OWL. 

    ![image](https://github.com/ianderrington/genai/assets/76016868/c3666ac2-8d7b-46f7-838b-cd2e6d3721c1)

When it is possibly to iteratively measure proposed sequences, new data can be used to improve subsequent sequence predictions. This can be done _greedily_, choosing the best solutions, or using probabilistic methods, such as [Bayesian Optimization]. Searching for a protein that optimizes a target by combining both estimated values, as well as their uncertainties. Selecting the sequences with highest-predicted target values  will _greedily_ inform what should be used, and may easily fail due to incorrect estimates due to the predictor model. In other manners, confidence bound (UCB) acquisition, that selects sequences based on an a sum of the predicted target value and the predicted target unertainty. 


???+ tip "[Ways of prioritizing](https://www.sciencedirect.com/science/article/pii/S0959440X21001457)"

    ![image](https://github.com/ianderrington/genai/assets/76016868/08ed6633-0439-44f5-a52d-e53afb4804f2)


### Optimization Targets

There are a number of [targets](#optimization-targets) that protein optimization can focus on. For examples, some targets enable primarily basic understanding, such as protein [structure](#structure), and other targets are related to [function](#function), though it is generally considered that structure enables the functions. 

In the cannon of causal influence,  _source_ has --> _sequence_ that creates --> _structure_ --> enables the _function_.  we can generally compartmentalize targets based on these, though there is certain crossover betwen them . 

- **Source**
    - [Candidate Identification](#candidate-identification) 
- **[Sequence](#sequence)**
    - [Alignment](#candidate-alignment)
    - [Remote cohomology] Similar function, or structure, 
- **[Structure](#structure)**
    - **Contact prediction**
    - **Secondary and tertiary structure**
    - **(mis)Folding (missense)**
- **[Function](#function)**
    - **Enzymatic Catalysis:** The ability of an enzyme to accelerate chemical processes 
    - **Thermocompatibility** or thermostability, how well a protein remains stable or functions at varying temperatures
    - **Fluorescence** for visualization purposes

    - **[Protein Binding](#binding)** to...
        - **Proteins**
        - **Nucleic Acids**
        - **Drugs molecules**
        - **Metals**

Though there are many examples where these classes cross-these potential 

### Fitness prediction
Training a fitness model may first involve training an unsupervised [foundation model](#foundation-models) on a high volume of data. These models can then be fine-tuned, or otherwise adapted, to incorporate protein-sequences or higher relevance to the protein targets of interest. 
??? note "[Learning protein fitness models from evolutionary and assay-labeled data](https://www.nature.com/articles/s41587-021-01146-5)"
    The authors show in their paper that uses a manner to combine ridge regression wiømbined with large-languag emodels revealing the ability to effectively predict evolutionary and assay-labeled fitness
    <img width="706" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/03ac33f5-b455-491e-b7e0-72c207216d48">

    

### Sequence Proposer

With a fitness predictor made available, the next step is to create proposal sequences that may be evaluated with the predictor model, or potentially with direct measurement. 


One way of doing this is to use [_generative models_](#generative-models) directly in seeding the generated sequence with starting sequences of the target sequence, or even from an natural language prompt. Another mthod is to use [_activation maximization_](#activation-maximization), a method that will generate input to a model that will ideally maximize the output for a given model (assuming maximization is the desired target direction.



#### Generative Models

??? abstract "[Sequence modeling and design from molecular to genome scale with Evo](https://github.com/evo-design/evo)" evo-dna

    The authors reveal in their [paper](https://www.biorxiv.org/content/10.1101/2024.02.27.582234v1.full.pdf) the use of long-context Genetics models can be powerful in their ability to yield state of of art predictions in protein-related tasks. These tasks include zero-shot function prediction, multi-element sequence generation. Their models use the 'Striped-Hyena' structured state space model. Their model is known as Evo. 
    <img width="566" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/d62b1d21-f323-4ad7-8a1f-28295e9dea2b">


??? abstract "[ZymCTRL: a conditional language model for the controllable generation of artificial enzymes](https://www.mlsb.io/papers_2022/ZymCTRL_a_conditional_language_model_for_the_controllable_generation_of_artificial_enzymes.pdf)"
    Here, we describe ZymCTRL, a conditional language model trained on the BRENDA database of enzymes, which generates enzymes of a specific enzymatic class upon a user prompt. ZymCTRL generates artificial enzymes distant from natural ones while their intended functionality matches predictions from orthogonal methods.
    <img width="892" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/67d72fce-e8d8-4372-9371-1f45d2c2d408">

    [Model](https://huggingface.co/nferruz/ZymCTRL)


??? note "[Low-N protein engineering with data-efficient deep learning](https://www.nature.com/articles/s41592-021-01100-y)"
    The authors demonstrate a standard model where a pLM undergoes unsupervised pre-training and then refined on evolutionarily related sequences, and finally fine-tuned on assay-specific sequences. They use a Markov Chain Monte Carlo (MCMC) method to mutate and iteratively evaluate mutations to improve design approaches. 
    

#### Markov Chain Monte Carlo 

??? abstract "[Plug & play directed evolution of proteins with gradient-based discrete MCMC (EvoProtGrad for MCMC)](https://github.com/NREL/EvoProtGrad)" evoprotgrad
    A Python package for directed evolution on a protein sequence with gradient-based discrete Markov chain monte carlo (MCMC) based on the [paper](https://iopscience.iop.org/article/10.1088/2632-2153/accacd) [blog](https://huggingface.co/blog/AmelieSchreiber/directed-evolution-with-esm2) and [docs](https://nrel.github.io/EvoProtGrad/getting_started/MCMC/)
    ![image](https://github.com/ianderrington/genai/assets/76016868/4be735d6-bba2-4003-9bf0-36218e264c93)
    

    
    


##### With Natural Large Language Models

#### Activation Maximization

??? abstract "[SeqProp: Stochastic Sequence Propagation - A Keras Model for optimizing DNA, RNA and protein sequences based on a predictor. ](https://github.com/johli/seqprop)" seqprop
    The authors reveal in their [paper](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-021-04437-5) and [arxiv](https://arxiv.org/pdf/2005.11275.pdf) a method to optimize biological protein sequences based on an a predictor model. They use something called _trainable logits_ that can be sampled from, but do so doing instance normalizaton.
        A Python API for constructing generative DNA/RNA/protein Sequence PWM models in Keras. Implements a PWM generator (with support for discrete sampling and ST gradient estimation), a predictor model wrapper and a loss model.
    ![image](https://github.com/ianderrington/genai/assets/76016868/3c2fe20f-1257-4a76-a034-1b3cad242b8c)
    ![image](https://github.com/ianderrington/genai/assets/76016868/fed3de2c-6dcf-4f4b-8ad1-aa2ecadce5ad)


??? abstract "[Protein sequence design by conformational landscape optimization](https://github.com/gjoni/trDesign)"
    The authors propose a bayesian approach to optimizing the a protein structure to yield a residue sequence. They use a loss of the form $Loss = -/log P(contacts|sequence) + D_{KL}(f_{20}||f_{20}^{PDB}$ where $D_{KL}$ is the Kullback-Leibler divergence, $f_20$ is the average frequency of amino acids from the sequence, and $f_{20}^{PDB}$ is the average frequency of amino acids from proteins int he PDB. 
    [Paper](https://www.pnas.org/doi/full/10.1073/pnas.2017228118)
    ![image](https://github.com/ianderrington/genai/assets/76016868/8936aae6-4e1c-41f4-bc03-38092e829585)

??? abstract "[Structure-based scoring and sampling of 'Combinatorial Variant Effects from Structure' (CoVES)](https://github.com/ddingding/CoVES/tree/publish)" coves
    The authors show in their [paper](https://www.biorxiv.org/content/10.1101/2022.10.31.514613v2) and [Nature](https://www.nature.com/articles/s41467-024-45621-4#Sec1) over 7 different combinatorial mutation studies, the ability to design proteins by exploring the design spacae without needs for combinatorial number of mutations. They build a model to estimate a residue preference effect for each amino acid variant at each position, and sums these effects to predict combinatorial variants.  Simple linear and logistic models using a 'mutation effect preference of size 20(Amino Acids)x residue size' were able to predict the effect of variance. They could then use this to design sequences using Boltsman sampling and generate variatns that were much better.  
    
    ![image](https://github.com/ianderrington/genai/assets/76016868/753aaf78-06b7-4199-999d-f08e78d7addd)
    ![image](https://github.com/ianderrington/genai/assets/76016868/5d933173-49e2-4f76-9a0a-d7834c00590a)
    ![image](https://github.com/ianderrington/genai/assets/76016868/4fba09dc-0ecf-4a9b-833c-9d607e545c34)
    Particularly the following image provides credence that these simple models of important sites can be useful in predicting proteins. 
    
    <img width="440" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/911a6b86-0e44-45c2-8a47-9a301d187ce1">

## Data sources

??? note "[Brenda](https://www.brenda-enzymes.org/)"

??? abstract "[ProteinGym: Large-Scale Benchmarks for Protein Fitness Prediction and Design](https://github.com/OATML-Markslab/ProteinGym) is an extensive set of Deep Mutational Scanning (DMS) assays and annotated human clinical variants"
    The results are "curated to enable thorough comparisons of various mutation effect predictors in different regimes"
    <img width="566" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/75911610-75f1-4cce-bccf-d7de1f3a168a">

    [Website](https://proteingym.org/)
    [Paper](https://papers.nips.cc/paper_files/paper/2023/file/cac723e5ff29f65e3fcbb0739ae91bee-Paper-Datasets_and_Benchmarks.pdf)

??? note "[Homologous Pairs of Low and High Temperature Originating Proteins Spanning the Known Prokaryotic Universe](https://www.nature.com/articles/s41597-023-02553-w)"

## Example Architectures
While there are many architecture and methods for creating and optimizing proteins, we focus here, primarily on ways that employ PLMs in some way. These create _foundation models_ that can be fine-tuned and readily adapted to specific domains of interest. 

The general method of creating protein foundation models uses Masked Language Modeling (MLM) or 'Bert-based' predictions, though next-token predictions, as is done with GPT-architectures may also be used. We share a number of prominent models and uses or derivatives, 

### Evaluation Metrics

* Spearman Correlation Coefficient
* AUC
* MCC


### Foundation models

#### ESM models

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/facebookresearch/esm) [Language models enable zero-shot prediction of the effects of mutations on protein function]([Language models enable zero-shot prediction of the effects of mutations on protein function](https://github.com/facebookresearch/esm))"

??? tip "[Evolutionary-scale prediction of atomic-level protein structure with a language model (esm)](https://www.biorxiv.org/content/10.1101/2022.07.20.500902v3.full.pdf)"
    End to end Language model enabling structure sequence pairing, coupled with an equivariant transformer structure model at the end
    <img width="474" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/aeac8588-89a6-42f0-afa2-24f2735b0c50">

    [Science paper](https://www.science.org/doi/10.1126/science.ade2574)

??? abstract "[Genome-wide prediction of disease variant effects with a deep protein language model](https://github.com/ntranoslab/esm-variants)"
    The authors show in their [paper](https://www.nature.com/articles/s41588-023-01465-0) a workflow using ESM1b, a 650-million-parameter protein language model, to predict all ~450 million possible missense variant effects in the human genome, and made all predictions available on a web portal.


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
        86 billion amino acids across 250 million protein sequences spanning evolutionary diversity. The
        resulting model contains information about biological properties in its representations. The representations are learned from sequence data alone.
        The learned representation space has a multi-scale
        organization reflecting structure from the level
        of biochemical properties of amino acids to remote homology of proteins. Information about
        secondary and tertiary structure is encoded in the
        representations and can be identified by linear projections. "

        <img width="329" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/27df578a-50ab-42ac-b675-58f7d740be4a">

??? note "[TRANSFORMER PROTEIN LANGUAGE MODELS ARE UNSUPERVISED STRUCTURE LEARNERS](https://www.biorxiv.org/content/10.1101/2020.12.15.422761v1.full.pdf)"
    <img width="973" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e6ca2843-c5a1-444c-96f5-081a8aad6a5b">


??? note "[Reference Optimization of Protein Language Models as a Multi-objective Binder Design Paradigm](https://arxiv.org/pdf/2403.04187.pdf)" protgpt2
    The authors create a design paradigm using instruction fine-tuning and direct preference optimization of PLMS. Creating ProtGPT2 allows binders to be designed based on receptor and drug develepoability criterion. To do this, they do two-step instruction tuning with receptor-bindign 'chat-templates', and then optimize fine-tuned models to promote preferred binders. 
    Specifically they "propose an alignment method to transform pre-trained unconditional protein sequence models (p(s)), that autoregressively sample sequences (s) from underlying data distribution (D), to conditional probability models (p(s|r; c)) that given a target receptor (r) sample binders that satisfy constraints (c) encoded by preference datasets compiled from experiments and domain experts."
    
    <img width="726" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4a673b82-fa46-419b-b24e-d65436923438">
    
    Notably, they fuse protein sequences with English-language prompts and use BPE encoding with a large vocabulary size (50k) instead of the smaller pLM vocabulary sizes (33) that are standard.  
    
    <img width="708" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ff42d6df-a13e-418d-8385-264ecd2d0994">




    

#### Multimodal

??? abstract "🧬 ![GitHub Repo stars](https://badgen.net/github/stars/bio-ontology-research-group/deepgo2) [Protein function prediction as approximate semantic entailment]([Protein function prediction as approximate semantic entailment](https://github.com/bio-ontology-research-group/deepgo2))" deepgo-se

    **Developments** 

    Current LLM models excel at predicting the structure and other attributes of biological sequences like proteins. However, their [transferability is limited](https://www.biorxiv.org/content/10.1101/2024.02.05.578959v2.full.pdf), capping their true potential. The [DeepGO-SE](https://www.nature.com/articles/s42256-024-00795-w) model innovates 🚀 by integrating protein language models with specific knowledge on protein function, bridging the gap between knowledge-graphs' explicit representations and next-token prediction's implicit representations, and thereby significantly improving model performance.

    **How it works** 

    * 🔄 First, DeepGO-SE reuses the ESM2 large language model to convert a protein sequence into a vector space embedding, prepping it for machine learning application.
    * 🧠 Next, an ensemble of fitted prediction models is trained to align ESM2 embeddings with an embedding space (ELEmbeddings) derived from GO axioms, creating a world model filled with geometric shapes and relations akin to a Σ algebra, which can verify the truth of a statement.
    * ✅ Finally, for statements such as "protein has function C", when the ensemble reaches a consensus on truth, the semantic truth estimation is then accepted as valid.

    ![DeepGO-SE Model Overview](https://github.com/ianderrington/genai/assets/76016868/6136332a-66cd-4f1f-89d5-fe11690e42fa)

    The authors demonstrate 📈 that this method improves molecular function prediction by a substantial margin. Moreover, they reveal that training with protein-protein interactions substantially benefits the understanding of complex biological processes. They suggest that predicting biological processes may only require knowledge of molecular functions, potentially paving the way for a more generalized approach that could be advantageous in other domains.


??? abstract "[ProtST: Multi-Modality Learning of Protein Sequences and Biomedical Texts](https://github.com/DeepGraphLearning/ProtST)" prost 
    The authors show in their [paper](https://proceedings.mlr.press/v202/xu23t/xu23t.pdf) that the fusion of natural language model with a protein language model can reasonably improve protein location prediction, fitness landscape prediction, and protein function annotation. 
    
    ![image](https://github.com/ianderrington/genai/assets/76016868/c78e6baa-84a6-477f-b831-a69d338eb55c)

    **Data** Their build a ProtDescribe to match protein sequences with text descriptions.
    
    **Models** Their models involve three losses. 1. InfooNCE loss to maximize similarity between sequence pairs, and minimize similarity between negative pairs. 2. A Masked protein modeling cross-entropy loss to maintain unimodal information to the sequences, and a fusion MultiMOdal Mask Prediction that uses self and cross-attention on masked input sequence and text pairs to mutually recover the predicted results in sequence and text results. They start with pre-traiend protein models (Bert, ESM-1b and ESM-2) and pretrained language model (PubMedBERT-abs and PubMedBERT-full)

    <img width="336" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/cd2617ba-87d0-456d-bb1d-ba11c903e2fc">

    The text data set looks like this: 
    <img width="673" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/2e96eea2-aff6-4667-9101-96ae5dbb4dc0">




    
#### Other models

??? note "[Single-sequence protein structure prediction using supervised transformer protein language models](https://yanglab.nankai.edu.cn/trRosetta/benchmark_single/)"
    The authors show in their [paper[(https://nature.com/articles/s43588-022-00373-3) the ability to generate high quality predictions outperforming AlphaFold2, with a model called trRosettaX-Single using ESM to generate representations and attention maps  that can be trained for distance+energy maps, 
    
    ![image](https://github.com/ianderrington/genai/assets/76016868/c06d4a40-117f-4b86-9deb-ee9d29fc8f70)

??? abstract "[Tasks Assessing Protein Embeddings (TAPE)](https://github.com/songlab-cal/tape)"

#### Architectures by Target

##### Enzymatic Catalysis

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

??? abstract "[Contrastive learning on protein embeddings enlightens midnight zone](https://github.com/Rostlab/EAT)"
    In their [paper](https://academic.oup.com/nargab/article/4/2/lqac043/6605840) the authors demonstrate the use of contrastive optimization (like CLIP) to create embeddings that "optimize constraints captured by heirarchichal classification of protein 3D structures" 
    ![image](https://github.com/ianderrington/genai/assets/76016868/9bacb594-15e1-46aa-bb89-36c2bddfaefb)


#### Protein Binding

??? abstract "[Contrastive learning in protein language space predicts interactions between drugs and protein targets](https://github.com/samsledje/ConPLex)" ConPLex
    The authors show in their [paper](https://www.pnas.org/doi/full/10.1073/pnas.2220778120) the use of contrastive learning to help co-locate proteins and potential drug molecules in a 'shared feature space' and learns to map drue drugs against non-binding 'decoy' molecules. 
    ![image](https://github.com/ianderrington/genai/assets/76016868/bb697ce1-6ad7-4a1c-9122-c19ea93ce9eb)

??? abstract "[Robust deep learning based protein sequence design using ProteinMPNN](https://github.com/dauparas/ProteinMPNN)" protein-mpnn
    In their [paper][(https://www.biorxiv.org/content/10.1101/2022.06.03.494563v1](https://www.biorxiv.org/content/10.1101/2022.06.03.494563v1.full.pdf)) the authors reveal a novel method to predict sequences and sequence recovery. 
    ![image](https://github.com/ianderrington/genai/assets/76016868/ee8d6025-d4a1-4ade-ac22-cfb26cabd41e)


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


## Quality reviews and references

!!! tip "[Harnessing Generative AI to Decode Enzyme Catalysis and Evolution for Enhanced Engineering](https://www.biorxiv.org/content/10.1101/2023.10.10.561808v1.full.pdf)"

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/yangkky/Machine-learning-for-proteins) [Papers on Machine learning for Proteins]([Papers on Machine learning for Proteins](https://github.com/yangkky/Machine-learning-for-proteins))"

??? tip "[Deep Learning in Protein Structural Modeling and Design](https://www.sciencedirect.com/science/article/pii/S2666389920301902) provides a thorough summary of DL manners of optimizing proteins."
    They emphasize a Sequence --> Structure --> Function approach should be focused upon. 
    ![image](https://github.com/ianderrington/genai/assets/76016868/cf1b22cc-73d7-4f91-888d-2ad6f75953a1)

!!! note "[Nucleate AI in Biotech: AI for Protein Design](https://nucleate-hq.notion.site/AI-in-Protein-Design-Resource-Page-8c137f8ba2684402aef9e1e31b85776c)"
    

## Companies

Here are several companies that help to focus in protein design. If you have one you'd like to suggest, please file an [issue](https://github.com/ianderrington/genai/issues). 

- [Deepchain.bio]
- [https://310.ai/]
