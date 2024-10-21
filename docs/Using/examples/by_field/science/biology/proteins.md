# Protein Optimization Using AI

Generating or modifying protein sequences to improve or create novel behavior is a powerful application for AI. Guided through evolutionary techniques, Bayesian optimization, and/or using protein language models (PLMs), AI can vastly accelerate the development of biotechnological tools and identify targets and avenues for therapeutics. Because of their ability to represent the 'language of proteins,' PLMs are increasingly important in predicting the structure and function of proteins.

## Where to start?

There are two general manners of optimizing proteins: _mutagenic_ and _de-novo_. In mutagenic protein optimization, a target protein is found and altered in a manner to fulfill target requirement. In _de novo_ protein generation, protein sequences are created without direct seeding by initial target proteins. It is important to note that _de novo_ generation is generally more difficult because generated protein sequences may not have originated from evolutionary pressures, so may be existentially dispreferred, but de novo designs can offer a degree of freedom and flexibility beyond directly evolutionarily derived protein sequences. 

## Targets

There are a number of [targets](#optimization-targets) that protein optimization can focus on. For example, some targets enable primarily basic understanding, such as protein [structure](#structure), and other targets are related to [function](#function), though it is generally considered that structure enables the functions.

In the canon of causal influence, _source_ has --> _sequence_ that creates --> _structure_ --> enables the _function_. We can generally compartmentalize targets based on these, though there is certain crossover between them.

- **Source**
    - [Candidate Identification](#candidate-identification)
- **[Sequence](#sequence)**
    - [Alignment](#candidate-alignment)
    - [Remote cohomology]: Similar function, or structure
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
        - **Drug molecules**
        - **Metals**

Though there are many examples where these classes cross, these potential targets are essential for protein optimization.



## Components

Protein optimization can be broken down into several components[^n1]:

[^n1]: [Adaptive Machine Learning for Protein Engineering](https://www.sciencedirect.com/science/article/pii/S0959440X21001457)

- **[Target Property](#optimization-targets)**: The intended goal(s) for protein development.
- **[Fitness Predictor](#fitness-prediction)**: Uses sequence information to estimate the value of the optimization target, as a surrogate for laboratory measurement.
- **[Sequence Proposer](#sequence-proposer)**: Creates sequences to evaluate and explore.
- **Prioritizer**: Uses sequence and predictor information to estimate the top candidates.
- **Laboratory Measurements**: Reveal the quality of the generated proteins based on the targets.
- **Orchestrator**: Puts the pieces together in a functional and validated manner.

Optimization systems may involve merging and combining these components for full solutions in two general manners:

1. A model that separates generation and evaluation steps, where the predictor model evaluates the quality of an input set of sequences (generated or otherwise defined).
2. A model that directly predicts the best designs using adaptive sampling, proposing solutions, evaluating them with the predictor model, and then iterating.

These components can be seen in the box below:

???+ tip "[Adaptive Machine Learning for Protein Engineering](https://www.sciencedirect.com/science/article/pii/S0959440X21001457)"
    An overview of ML for protein engineering:
    ![image](https://github.com/ianderrington/genai/assets/76016868/a8af9370-05e8-4e81-a223-b60cafbb9b00)

### Fitness Prediction

Training a fitness model may first involve training an unsupervised [foundation model](#foundation-models) on a high volume of data. These models can then be fine-tuned, or otherwise adapted, to incorporate protein sequences or higher relevance to the protein targets of interest.

??? note "[Learning protein fitness models from evolutionary and assay-labeled data](https://www.nature.com/articles/s41587-021-01146-5)"
    The authors show in their paper that uses a manner to combine ridge regression with large-language models revealing the ability to effectively predict evolutionary and assay-labeled fitness.
    <img width="706" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/03ac33f5-b455-491e-b7e0-72c207216d48">


### Strategy

Protein optimization will necessarily evolve the creation of those proteins and evaluations of target characteristics. There are large volumes of databases of various forms that may be useful in creating foundation models. It will still be essential to use continued observation to improve the optimization target based on predicted and iterated feedback.

The volume of the observations will help to determine the architectures that one could use. Base models tend to be PLMs because of the large set of available data. Unsupervised fine-tuning with those large models may be able to occur through homology or family sets. Final targets may then be optimized with simple networks, often involving regression to minimize overfitting or methods that include Bayesian or evolutionary approaches.

To be able to successfully deliver on final target optimization, the greater the quantity of direct or surrogate data that can be obtained, the greater the potential the resulting models will sufficiently predict the fitness of future protein sequence candidates. That is why massive screening approaches, as described by [Ginkgo's platform](https://foundrytheory.substack.com/p/improving-a-stubborn-enzyme-with-ai), screen thousands of candidates.

??? note "[An example process by Ginkgo](https://foundrytheory.substack.com/p/improving-a-stubborn-enzyme-with-ai)"
    Ginkgo reveals with foundry-scale protein estimates, that with thousands of samples they were able to create an enzyme with 10x improvement from where they started. In their design, they use structure (differential) estimates via Rosetta, Evolutionary-scale modeling (PLMs), active site focus evolutionary models, as well as an in-house method called 'OWL.'
    ![image](https://github.com/ianderrington/genai/assets/76016868/c3666ac2-8d7b-46f7-838b-cd2e6d3721c1)

When it is possible to iteratively measure proposed sequences, new data can be used to improve subsequent sequence predictions. This can be done _greedily_, choosing the best solutions, or using probabilistic methods, such as [Bayesian Optimization]. Searching for a protein that optimizes a target by combining both estimated values, as well as their uncertainties. Selecting the sequences with the highest-predicted target values will _greedily_ inform what should be used and may easily fail due to incorrect estimates from the predictor model. In other manners, confidence bound (UCB) acquisition selects sequences based on a sum of the predicted target value and the predicted target uncertainty.

???+ tip "[Ways of prioritizing](https://www.sciencedirect.com/science/article/pii/S0959440X21001457)"
    ![image](https://github.com/ianderrington/genai/assets/76016868/08ed6633-0439-44f5-a52d-e53afb4804f2)
    

### Sequence Proposer

With a fitness predictor made available, the next step is to create proposal sequences that may be evaluated with the predictor model, or potentially with direct measurement.

One way of doing this is to use [_generative models_](#generative-models). Generative modeles can be made by using logistic/probabilistic outputs from models and random sampling to determine amino acids in a sequence. It can be done so using _causal language_ (CLM) models, like GPT, where the tokens only attend to prior tokens, or with _masked language_ models (CLM), that can attend to the entire sequences. With CLM, directly in seeding the generated sequence with starting sequences of the target sequence, or even from a natural language prompt, as in models like [ProGen](#progen2), sequences are generated sequentially. In other models, sequences can be generated using MLM using several techniques. 

These methods include:

* **[activation maximization_](#activation-maximization)**, a method that will generate input sequences to a model that will optimize given model.
* **[Iterative Masking](#iterative-masking)**, where masks are randomly removed until generated remain stationary.
* **[Markov Chain Monte Carlo](#markov-chain-monte-carlo)** to iteratively mutate evaluate mutations to improve design approaches.

#### Iterative Masking

??? abstract "[Generative power of a protein language model trained on multiple sequence alignments](https://elifesciences.org/articles/79854)"

    <img width="593" alt="image" src="https://github.com/user-attachments/assets/f6253a6e-ddf4-4fec-a625-22de1a268842">

#### Activation Maximization

??? abstract "[SeqProp: Stochastic Sequence Propagation - A Keras Model for optimizing DNA, RNA and protein sequences based on a predictor.](https://github.com/johli/seqprop)"
    The authors reveal in their [paper](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-021-04437-5) and [arxiv](https://arxiv.org/pdf/2005.11275.pdf) a method to optimize biological protein sequences based on a predictor model. They use something called _trainable logits_ that can be sampled from, but do so using instance normalization.
    A Python API for constructing generative DNA/RNA/protein Sequence PWM models in Keras. Implements a PWM generator (with support for discrete sampling and ST gradient estimation), a predictor model wrapper, and a loss model.
    ![image](https://github.com/ianderrington/genai/assets/76016868/3c2fe20f-1257-4a76-a034-1b3cad242b8c)
    ![image](https://github.com/ianderrington/genai/assets/76016868/fed3de2c-6dcf-4f4b-8ad1-aa2ecadce5ad)

??? abstract "[Protein sequence design by conformational landscape optimization](https://github.com/gjoni/trDesign)"
    The authors propose a Bayesian approach to optimizing a protein structure to yield a residue sequence. They use a loss of the form $Loss = -/log P(contacts|sequence) + D_{KL}(f_{20}||f_{20}^{PDB}$ where $D_{KL}$ is the Kullback-Leibler divergence, $f_{20}$ is the average frequency of amino acids from the sequence, and $f_{20}^{PDB}$ is the average frequency of amino acids from proteins in the PDB.
    [Paper](https://www.pnas.org/doi/full/10.1073/pnas.2017228118)
    ![image](https://github.com/ianderrington/genai/assets/76016868/8936aae6-4e1c-41f4-bc03-38092e829585)

??? abstract "[Structure-based scoring and sampling of 'Combinatorial Variant Effects from Structure' (CoVES)](https://github.com/ddingding/CoVES/tree/publish)"
    The authors show in their [paper](https://www.biorxiv.org/content/10.1101/2022.10.31.514613v2) and [Nature](https://www.nature.com/articles/s41467-024-45621-4#Sec1) over 7 different combinatorial mutation studies, the ability to design proteins by exploring the design space without the need for a combinatorial number of mutations. They build a model to estimate a residue preference effect for each amino acid variant at each position and sum these effects to predict combinatorial variants. Simple linear and logistic models using a 'mutation effect preference of size 20(Amino Acids)x residue size' were able to predict the effect of variance. They could then use this to design sequences using Boltzmann sampling and generate variants that were much better.
    ![image](https://github.com/ianderrington/genai/assets/76016868/753aaf78-06b7-4199-999d-f08e78d7addd)
    ![image](https://github.com/ianderrington/genai/assets/76016868/5d933173-49e2-4f76-9a0a-d7834c00590a)
    ![image](https://github.com/ianderrington/genai/assets/76016868/4fba09dc-0ecf-4a9b-833c-9d607e545c34)
    Particularly the following image provides credence that these simple models of important sites can be useful in predicting proteins.
    <img width="440" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/911a6b86-0e44-45c2-8a47-9a301d187ce1">

#### Markov Chain Monte Carlo

??? abstract "[Plug & play directed evolution of proteins with gradient-based discrete MCMC (EvoProtGrad for MCMC)](https://github.com/NREL/EvoProtGrad)"
    A Python package for directed evolution on a protein sequence with gradient-based discrete Markov chain Monte Carlo (MCMC) based on the [paper](https://iopscience.iop.org/article/10.1088/2632-2153/accacd), [blog](https://huggingface.co/blog/AmelieSchreiber/directed-evolution-with-esm2), and [docs](https://nrel.github.io/EvoProtGrad/getting_started/MCMC/)
    ![image](https://github.com/ianderrington/genai/assets/76016868/4be735d6-bba2-4003-9bf0-36218e264c93)


??? note "[Low-N protein engineering with data-efficient deep learning](https://www.nature.com/articles/s41592-021-01100-y)"
    The authors demonstrate a standard model where a PLM undergoes unsupervised pre-training and then refined on evolutionarily related sequences, and finally fine-tuned on assay-specific sequences. They use a Markov Chain Monte Carlo (MCMC) method to mutate and iteratively evaluate mutations to improve design approaches.


### Generative Models

#### Progen2
??? abstract "[Large language models generate functional protein sequences across diverse families](https://github.com/salesforce/progen)" progen
    In their [paper](https://www.nature.com/articles/s41587-022-01618-2) the authors reveal the ability to generate proteins with functionality across a wide variety of families. Functionally, it uses property-conditional generation so that the sequences that are generated will be conditions upon protein family, biological process, molecular function. They train models to predict next-amino acid prediction. With models finetuned to different lysozyme families, they showed similar catalytic efficiencies as natural versions demonstrate high expression (40-50%) activity with sometimes much lower sequence identity. 
    **Conditional Language Modeling** They are able to do so by creating a concatenated sequence of the control tag and the protein sequence $x=[c;a]$ and doing next token 

??? abstract "[Design of highly functional genome editors by modeling the universe of CRISPR-Cas sequences](https://www.biorxiv.org/content/10.1101/2024.04.22.590591v1.full.pdf)" 
    To generate novel CRISPR-Cas proteins, they fine-tuned the ProGen2-base language model. 
    <img width="805" alt="image" src="https://github.com/user-attachments/assets/824adef6-58d3-46e8-848c-04e1fec1f205">


??? abstract [CONDITIONAL ENZYME GENERATION USING PROTEIN LANGUAGE MODELS WITH ADAPTERS](https://github.com/Profluent-Internships/ProCALM)" procalm
    The author [show](https://arxiv.org/pdf/2410.03634) the ability to generate proteins in families by using conditional encoding to project the conditions into a embedding state that is used to generate proteins in a manner that can satisfy certain conditions, like family type'. 
    <img width="548" alt="image" src="https://github.com/user-attachments/assets/c6ad57fc-e489-4952-8dfc-2858fcf75813">
    


#### Evo
??? abstract "[Sequence modeling and design from molecular to genome scale with Evo](https://github.com/evo-design/evo)"
    The authors reveal in their [paper](https://www.biorxiv.org/content/10.1101/2024.02.27.582234v1.full.pdf) the use of long-context Genetics models can be powerful in their ability to yield state-of-the-art predictions in protein-related tasks. These tasks include zero-shot function prediction, multi-element sequence generation. Their models use the 'Striped-Hyena' structured state space model. Their model is known as Evo.
    <img width="566" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/d62b1d21-f323-4ad7-8a1f-28295e9dea2b">

??? abstract "[ZymCTRL: a conditional language model for the controllable generation of artificial enzymes](https://www.mlsb.io/papers_2022/ZymCTRL_a_conditional_language_model_for_the_controllable_generation_of_artificial_enzymes.pdf)"
    Here, we describe ZymCTRL, a conditional language model trained on the BRENDA database of enzymes, which generates enzymes of a specific enzymatic class upon a user prompt. ZymCTRL generates artificial enzymes distant from natural ones while their intended functionality matches predictions from orthogonal methods.
    <img width="892" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/67d72fce-e8d8-4372-9371-1f45d2c2d408">
    [Model](https://huggingface.co/nferruz/ZymCTRL)



##### With Natural Large Language Models



## Data 

## Data Selection

??? abstract "[Protein Language Model Fitness Is a Matter of Preference](https://www.biorxiv.org/content/10.1101/2024.10.03.616542v1.full.pdf)"
    The authors show that models preferences are biased by human preference during the data curation. Quite cleanly, they state "Algorithmic differences might be overshadowed by human preferences at the data level confounding whether a model better captures the biology of proteome"
    
    <img width="651" alt="image" src="https://github.com/user-attachments/assets/74a52ec5-500a-4c48-bb79-d91cd81be5ed">


## Data Sources

??? note "[Brenda](https://www.brenda-enzymes.org/)"

??? abstract "[ProteinGym: Large-Scale Benchmarks for Protein Fitness Prediction and Design](https://github.com/OATML-Markslab/ProteinGym)"
    ProteinGym is an extensive set of Deep Mutational Scanning (DMS) assays and annotated human clinical variants. The results are "curated to enable thorough comparisons of various mutation effect predictors in different regimes."
    <img width="566" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/75911610-75f1-4cce-bccf-d7de1f3a168a">
    [Website](https://proteingym.org/)
    [Paper](https://papers.nips.cc/paper_files/paper/2023/file/cac723e5ff29f65e3fcbb0739ae91bee-Paper-Datasets_and_Benchmarks.pdf)

??? note "[Homologous Pairs of Low and High Temperature Originating Proteins Spanning the Known Prokaryotic Universe](https://www.nature.com/articles/s41597-023-02553-w)"

## Example Architectures

While there are many architectures and methods for creating and optimizing proteins, we focus here primarily on ways that employ PLMs in some way. These create _foundation models_ that can be fine-tuned and readily adapted to specific domains of interest.

The general method of creating protein foundation models uses Masked Language Modeling (MLM) or 'Bert-based' predictions, though next-token predictions, as is done with GPT-architectures, may also be used. We share a number of prominent models and uses or derivatives.

### Evaluation Metrics

### To do
- Spearman Correlation Coefficient
- AUC
- MCC


### Pseudo Likelihood

The Pseudo log likelihood (PLL) is often used to evaluate the fintess of a given sequence conditioned upon the parameters of the model. It found by evaluating the following: <img width="211" alt="image" src="https://github.com/user-attachments/assets/c42b5596-8ec2-43af-a800-727d9b7883b4">

It requires $O(L)$ passes through the data. 

There is a way to go faster, as in [Protein Language Model Fitness Is a Matter of Preference](https://www.biorxiv.org/content/10.1101/2024.10.03.616542v1.full.pdf). The authors show that the pseudo log likelihood can be calculated in a single pass as such:

    <img width="366" alt="image" src="https://github.com/user-attachments/assets/56807d57-1f12-402c-98da-17107d965063">



??? abstract "[BERTOLOGY MEETS BIOLOGY: INTERPRETING ATTENTION IN PROTEIN LANGUAGE MODELS](https://github.com/salesforce/provis)"
    **Developments** The authors show in their [paper](https://arxiv.org/pdf/2006.15222.pdf) "that attention: (1) captures the folding structure of proteins, connecting amino acids that are far apart in the underlying sequence, but spatially close in the three-dimensional structure, (2) targets binding sites, a key functional component of proteins, and (3) focuses on progressively more complex biophysical properties with increasing layer depth. We find this behavior to be consistent across three Transformer architectures (BERT, ALBERT, XLNet) and two distinct protein datasets. We also present a three-dimensional visualization of the interaction between attention and protein structure."
    They see the following:
    * Attention aligns strongly with contact maps in the deepest layers.
    * Attention targets binding sites throughout most layers of the models.
    * Attention targets Post-translational modifications in a small number of heads.
    * Attention targets higher-level properties in deeper layers.
    * Attention heads specialize in particular amino acids.
    * Attention is consistent with substitution relationships.


### Strategies

??? abstract "[Pro-FSFP: Few-Shot Protein Fitness Prediction](https://github.com/ai4protein/Pro-FSFP)" pro-fsfp
    In their [paper](https://www.nature.com/articles/s41467-024-49798-6) The wuthors show tthe ability to use a meta-model that is able to train models using a 'meta learning model that works with multiepl tasks to create a meta-learned model (PLMS with LORA adapters) to create better results using a ranking loss. Comparing in this manner allows for multiple results in different experiments to be used simultaneously without impacting the quality of results. 
    ![image](https://github.com/user-attachments/assets/83a6fd9c-8f92-4ffe-b826-3a9723ef87e5)

    
### Foundation Models

#### ESM Models

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/facebookresearch/esm) [Language models enable zero-shot prediction of the effects of mutations on protein function](https://github.com/facebookresearch/esm)"

??? tip "[Evolutionary-scale prediction of atomic-level protein structure with a language model (esm)](https://www.biorxiv.org/content/10.1101/2022.07.20.500902v3.full.pdf)"
    End-to-end Language model enabling structure sequence pairing, coupled with an equivariant transformer structure model at the end.
    <img width="474" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/aeac8588-89a6-42f0-afa2-24f2735b0c50">
    [Science paper](https://www.science.org/doi/10.1126/science.ade2574)

??? abstract "[Genome-wide prediction of disease variant effects with a deep protein language model](https://github.com/ntranoslab/esm-variants)"
    The authors show in their [paper](https://www.nature.com/articles/s41588-023-01465-0) a workflow using ESM1b, a 650-million-parameter protein language model, to predict all ~450 million possible missense variant effects in the human genome, and made all predictions available on a web portal.
    **Developments**
    Using established and newly trained protein language models, the authors demonstrate the ability to provide zero-shot predictions of the effect of a protein mutation on a protein's fluorescence.
    <img width="610" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5b9b6d18-a7a6-4ffb-a0cd-c952315aed90">
    They use a PLM to score the mutations using a log odds-ratio of the mutated protein.
    <img width="320" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/88f7ea61-b1a8-4455-882e-d3ba23403f58">
    **Data**
    They create ESM-1v, an unsupervised masked transformer model by training on 98 million protein sequences, using Uniref90 2020-03.
    They evaluate the model on a set of 41 deep mutational scans.

       [Paper](    [Paper](https://www.biorxiv.org/content/10.1101/2021.07.09.450648v2.full.pdf)

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/facebookresearch/esm) [MSA Transformer](https://github.com/facebookresearch/esm)"
    The authors demonstrate in their [paper](https://www.biorxiv.org/content/10.1101/2021.02.12.430858v3.full.pdf) training an unsupervised PLM that operates on sets of aligned sequences. Self-supervision helps to reconstruct the corrupted MSA.
    **Developments**
    <img width="334" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e87edf1e-49eb-4a19-bf08-093060e87220">
    **Architecture**
    The architecture 'interleaves attention across the rows and columns of the alignment as an axial attention' that ties the attention map across the rows with 'tied row attention'. They use a single feed-forward layer for each block. For position embeddings, they use a 1D learned position embeddings added independently to each row of MSA to distinguish aligned positions differently for each sequence.
    The objective looks for the loss of the masked MSA as follows:
    <img width="254" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e7fbe493-e30d-415a-99e7-9c28dd4358c6">
    With the probabilities being the output of the MSA transformer, softmax normalized of the amino acid vocabulary independently normalized per position in the sequence. Masking the columns uniformly resulted in the best performance.
    The models are 12 layers, with a 768 embedding size, and 12 attention heads resulting in 100M parameters.
    **Data**
    They use 26 million MSA sequences generated from UniRef50 by searching UniClust30 with HHblits.
    **Analysis**
    <img width="706" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/b24fffe3-efbb-4b14-a2b7-fa20b3fdf7ba">
    They show that a logistic regression with 144 parameters fit on 20 training structures could predict the contact maps of almost 15k other structures almost unsupervised. They show a supervised contact prediction map can improve the contact-prediction maps. They find the attention heads focus on highly variable columns, correlating with the per-column entropy of MSA.

??? abstract "[Biological structure and function emerge from scaling unsupervised learning to 250 million protein sequences](https://www.biorxiv.org/content/10.1101/622803v4.full.pdf)"
    The authors used masked language prediction with transformer models to train a foundation model capable of multiple downstream tasks.
    "To this end we use unsupervised learning to train a deep contextual language model on 86 billion amino acids across 250 million protein sequences spanning evolutionary diversity. The resulting model contains information about biological properties in its representations. The representations are learned from sequence data alone. The learned representation space has a multi-scale organization reflecting structure from the level of biochemical properties of amino acids to remote homology of proteins. Information about secondary and tertiary structure is encoded in the representations and can be identified by linear projections."
    <img width="329" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/27df578a-50ab-42ac-b675-58f7d740be4a">

??? note "[TRANSFORMER PROTEIN LANGUAGE MODELS ARE UNSUPERVISED STRUCTURE LEARNERS](https://www.biorxiv.org/content/10.1101/2020.12.15.422761v1.full.pdf)"
    <img width="973" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e6ca2843-c5a1-444c-96f5-081a8aad6a5b">

??? note "[Reference Optimization of Protein Language Models as a Multi-objective Binder Design Paradigm](https://arxiv.org/pdf/2403.04187.pdf)"
    The authors create a design paradigm using instruction fine-tuning and direct preference optimization of PLMs. Creating ProtGPT2 allows binders to be designed based on receptor and drug developability criteria. To do this, they do two-step instruction tuning with receptor-binding 'chat-templates', and then optimize fine-tuned models to promote preferred binders.
    Specifically, they "propose an alignment method to transform pre-trained unconditional protein sequence models (p(s)), that autoregressively sample sequences (s) from underlying data distribution (D), to conditional probability models (p(s|r; c)) that given a target receptor (r) sample binders that satisfy constraints (c) encoded by preference datasets compiled from experiments and domain experts."
    <img width="726" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4a673b82-fa46-419b-b24e-d65436923438">
    Notably, they fuse protein sequences with English-language prompts and use BPE encoding with a large vocabulary size (50k) instead of the smaller PLM vocabulary sizes (33) that are standard.
    <img width="708" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ff42d6df-a13e-418d-8385-264ecd2d0994">


??? note "[Single-sequence protein structure prediction using supervised transformer protein language models](https://yanglab.nankai.edu.cn/trRosetta/benchmark_single/)"
    The authors show in their [paper](https://nature.com/articles/s43588-022-00373-3) the ability to generate high-quality predictions outperforming AlphaFold2, with a model called trRosettaX-Single using ESM to generate representations and attention maps that can be trained for distance+energy maps.
    ![image](https://github.com/ianderrington/genai/assets/76016868/c06d4a40-117f-4b86-9deb-ee9d29fc8f70)

??? abstract "[AMPLIFY Protein Language Model](https://github.com/chandar-lab/AMPLIFY?tab=readme-ov-file)" amplify-plm
    The author's show in their [Paper](https://www.biorxiv.org/content/10.1101/2024.09.23.614603v1.full.pdf) that they can train highly performant ESM models (and modifications) with better performance. They use different data sets with better filtering and validation selection. They use flash attention. Together they see their 350M model is as performant of 15B ESM model. 
    They also use something called _pseudo-perplexity_ which measures the replacement of non-random masking (one of each sequence). 
    They show that retraining the same models (ESM and Amplify) on uniref data 
    **Differences with ESM** *
    * They used SwiGLU and RMS norm instead of Gelu Activation. 
    * They used reduced number of attention heads.
    * They used AdamW optimization (not Adam). 
    * They trained with bf16 using DeepSpeed, an dmodel sharding. 
    * They streamlined the vocabulary removing unused tokens.







##### Alpha-models


??? note "[(closed source) De novo design of high-affinity protein binders with AlphaProteo](https://arxiv.org/pdf/2409.08022)"
    The authors reveal in their paper and [blog](https://deepmind.google/discover/blog/alphaproteo-generates-novel-proteins-for-biology-and-health-research/), a very performant solution that designs proteins to bind to protein targets. 
    
??? note "[(semi-open) Accurate structure prediction of biomolecular interactions with AlphaFold 3](https://www.nature.com/articles/s41586-024-07487-w)"
    The authors reveal a highly powerful solution that allows higha ccuracy binding, and uses tokenization beyond single protein letters. 

??? abstract "[Open source implementation of AlphaFold3](https://github.com/Ligo-Biosciences/AlphaFold3)"


##### xTrimo

??? note "[xTrimoPGLM: Unified 100B-Scale Pre-trained Transformer for Deciphering the Language of Protein](https://arxiv.org/pdf/2401.06199)" xtrimopglm
    **Developments** The authors reveal an innovative manner of training protein language models using novel Masked Language Model training.  They also investigate LORA and MLP adapter layers at the end for finetuning methods and show a significant gain when using LORA. 

    <img width="658" alt="image" src="https://github.com/user-attachments/assets/c05363ce-2389-4191-8b03-4a44029ec9cd"> 
    
    **Results** The resulting models are made with both standard `[MASK]` tokens masking tokens that indicate short-spans that are masked `[sMASK]` and spans marked at the end with `[gMASK]`. Training with both standard and block masking, at a ratio of 20% to 80%, respectively, they train models with notable improvement over models.  

??? note "[xTrimoGene: An Efficient and Scalable Representation Learner for Single-Cell RNA-Seq Data](https://proceedings.neurips.cc/paper_files/paper/2023/file/db68f1c25678f72561ab7c97ce15d912-Paper-Conference.pdf)"
    **Developments** The authors create a scaleable asymmetrical encoder-decoder network that uses scRNA-seq with sparse labeling. 
    
    <img width="561" alt="image" src="https://github.com/user-attachments/assets/e2b9b91b-2a72-44a4-acd8-bb987a45d8e6">

    **Methods:** From an expression matrix, the model masks and filters expression sequences to try to reconstruct the full-length embedding and expression matrix. They also introduce _auto-discretization_ to help alleviate category assignment errors to different genes... because genes are not necessarily fully categorical.  The Auto-discritization strategy has a lookup table that leaves a weighted combination of individual embeddings from the lookup-table. 


##### Others

??? abstract "[Chai labs protein model](https://github.com/chaidiscovery/chai-lab?tab=readme-ov-file)" chai1
    An apparent competitor to AF-3 in the making

??? abstract "[Tasks Assessing Protein Embeddings (TAPE)](https://github.com/songlab-cal/tape)"


#### Natural Language + Protein Language model integrations

It is possible to combine LLMs for natural language and PLMs to produce poweful suggestions just based on NL queries. Here are some examples. 

??? abstract "🧬 ![GitHub Repo stars](https://badgen.net/github/stars/bio-ontology-research-group/deepgo2) [Protein function prediction as approximate semantic entailment](https://github.com/bio-ontology-research-group/deepgo2)"
    **Developments**
    Current LLM models excel at predicting the structure and other attributes of biological sequences like proteins. However, their [transferability is limited](https://www.biorxiv.org/content/10.1101/2024.02.05.578959v2.full.pdf), capping their true potential. The [DeepGO-SE](https://www.nature.com/articles/s42256-024-00795-w) model innovates 🚀 by integrating protein language models with specific knowledge on protein function, bridging the gap between knowledge-graphs' explicit representations and next-token prediction's implicit representations, and thereby significantly improving model performance.
    **How it works**
    * 🔄 First, DeepGO-SE reuses the ESM2 large language model to convert a protein sequence into a vector space embedding, prepping it for machine learning application.
    * 🧠 Next, an ensemble of fitted prediction models is trained to align ESM2 embeddings with an embedding space (ELEmbeddings) derived from GO axioms, creating a world model filled with geometric shapes and relations akin to a Σ algebra, which can verify the truth of a statement.
    * ✅ Finally, for statements such as "protein has function C", when the ensemble reaches a consensus on truth, the semantic truth estimation is then accepted as valid.
    ![DeepGO-SE Model Overview](https://github.com/ianderrington/genai/assets/76016868/6136332a-66cd-4f1f-89d5-fe11690e42fa)
    The authors demonstrate 📈 that this method improves molecular function prediction by a substantial margin. Moreover, they reveal that training with protein-protein interactions substantially benefits the understanding of complex biological processes. They suggest that predicting biological processes may only require knowledge of molecular functions, potentially paving the way for a more generalized approach that could be advantageous in other domains.

??? abstract "[ProtST: Multi-Modality Learning of Protein Sequences and Biomedical Texts](https://github.com/DeepGraphLearning/ProtST)"
    The authors show in their [paper](https://proceedings.mlr.press/v202/xu23t/xu23t.pdf) that the fusion of natural language model with a protein language model can reasonably improve protein location prediction, fitness landscape prediction, and protein function annotation.
    ![image](https://github.com/ianderrington/genai/assets/76016868/c78e6baa-84a6-477f-b831-a69d338eb55c)
    **Data** They build a ProtDescribe to match protein sequences with text descriptions.
    **Models** Their models involve three losses. 1. InfoNCE loss to maximize similarity between sequence pairs, and minimize similarity between negative pairs. 2. A Masked protein modeling cross-entropy loss to maintain unimodal information to the sequences, and a fusion MultiModal Mask Prediction that uses self and cross-attention on masked input sequence and text pairs to mutually recover the predicted results in sequence and text results. They start with pre-trained protein models (Bert, ESM-1b, and ESM-2) and pre-trained language model (PubMedBERT-abs and PubMedBERT-full).
    <img width="336" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/cd2617ba-87d0-456d-bb1d-ba11c903e2fc">
    The text data set looks like this:
    <img width="673" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/2e96eea2-aff6-4667-9101-96ae5dbb4dc0">


#### Architectures by Target

##### Enzymatic Catalysis

!!! tip "[Harnessing Generative AI to Decode Enzyme Catalysis and Evolution for Enhanced Engineering](https://www.biorxiv.org/content/10.1101/2023.10.10.561808v1.full.pdf)"

??? tip "[De novo design of luciferases using deep learning](https://www.nature.com/articles/s41586-023-05696-3)"
    ![image](https://github.com/ianderrington/genai/assets/76016868/b4de3724-def9-43f6-a3b0-e55061c5b278)

??? note "[ForceGen: End-to-end de novo protein generation based on nonlinear mechanical unfolding responses using a language diffusion model](https://www.science.org/doi/10.1126/sciadv.adl4000)"
    **Developments** The authors present ForceGen, an end-to-end algorithm for de novo protein generation based on nonlinear mechanical unfolding responses. Rooted in the physics of protein mechanics, this generative strategy provides a powerful way to design new proteins rapidly, including exquisite and rapid predictions about their dynamical behavior.
    Proteins, like any other mechanical object, respond to forces in peculiar ways. Think of the different response you'd get from pulling on a steel cable versus pulling on a rubber band, or the difference between honey and glass. Now, we can design proteins with a set of desirable mechanical characteristics, with applications from health to sustainable plastics.
    <img width="701" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/3af9d0de-93dd-4591-9967-ebb856307618">
    <img width="727" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f985357c-2b3b-4092-875c-93648ab167f0">
    The key to solving this problem was to integrate a **protein language model with denoising diffusion methods**, and using accurate atomistic-level physical simulation data to endow the model a first-principles understanding. ForceGen can solve both forward and inverse tasks: In the forward task, we can predict how stable a protein is, how it will unfold and what the forces involved are, all given just the sequence of amino acids. In the inverse task, we can design new proteins that meet complex nonlinear mechanical signature targets.
    With the new generative model, they can directly design proteins to meet complex nonlinear mechanical property-design objectives by leveraging deep knowledge on protein sequences from a pretrained protein language model and maps mechanical unfolding responses to create proteins.
    Via full-atom molecular simulations for direct validation from physical and chemical principles, we demonstrate that the designed proteins are de novo, and fulfill the targeted mechanical properties, including unfolding energy and mechanical strength, and a detailed unfolding force-separation curves.

#### Thermostability

??? abstract "[ProLaTherm: Protein Language Model-based Thermophilicity Predictor](https://github.com/grimmlab/ProLaTherm)"
    **Developments** The authors reveal in their [paper](https://academic.oup.com/nargab/article/5/4/lqad087/7306664) a model that is good at predicting thermal stability as well as an augmented dataset to enable their good predictive control.
    ![image](https://github.com/ianderrington/genai/assets/76016868/0c9b9576-b753-459b-9016-c40a7aaccde0)
    **Data**: Collected from multiple sources to create new sets. "9422 UniProt identifiers and 9363 corresponding amino acid sequences from 16 thermophilic and 16 mesophilic organisms" Filtered.
    **Models**: They considered several first, we consider feature-based models that rely on manually engineered features, such as physicochemical properties. Second, we include hybrid sequence-based models that use amino acid features to learn sequence embeddings. Third, we consider approaches that are purely sequence-based, similarly to ProLaTherm, but in contrast train sequence embeddings from scratch. The final model used a simplified transformer solution that used 1024 sequence embeddings that were put into a self-attention network resulting in an output embedding that was averaged and put into a ReLU activation that then went to a batch norm and logistic prediction of whether the protein was a thermophile.
    **Training**: From scratch.
    **Results**: High performance of PLM 97% accuracy over other models, though this accuracy is reduced when reducing train/test set homology.

### Candidate Identification

Particularly for evolutionary methods, it is essential to know _where to start_ optimizing from. GenAI can be used to identify candidates based on databases of prior candidates.


Searching is essential to find similar sequences that may aid in the training or fine-tuning of models. This can be done with sequence-based alignment, as well as structure-based alignment. Here are a few references of highly-relevant tools for search/alignment.

??? tip "[Fast and accurate protein structure search with: Foldseek](https://search.foldseek.com/search)"
    Foldseek "aligns the structure of a query protein against a database by describing tertiary amino acid interactions within proteins as sequences over a structural alphabet."
    [Paper](https://www.nature.com/articles/s41587-023-01773-0)

#### Candidate Alignment

It is not necessarily just enough to identify a potential candidate but to have a degree of _alignment_ with the candidate with starting or suggested candidates. This allows for a degree of interpretability by people.

??? abstract "[Contrastive learning on protein embeddings enlightens midnight zone](https://github.com/Rostlab/EAT)"
    In their [paper](https://academic.oup.com/nargab/article/4/2/lqac043/6605840) the authors demonstrate the use of contrastive optimization (like CLIP) to create embeddings that "optimize constraints captured by hierarchical classification of protein 3D structures."
    ![image](https://github.com/ianderrington/genai/assets/76016868/9bacb594-15e1-46aa-bb89-36c2bddfaefb)

#### Protein Binding

??? abstract "[Contrastive learning in protein language space predicts interactions between drugs and protein targets](https://github.com/samsledje/ConPLex)"
    The authors show in their [paper](https://www.pnas.org/doi/full/10.1073/pnas.2220778120) the use of contrastive learning to help co-locate proteins and potential drug molecules in a 'shared feature space' and learns to map drugs against non-binding 'decoy' molecules.
    ![image](https://github.com/ianderrington/genai/assets/76016868/bb697ce1-6ad7-4a1c-9122-c19ea93ce9eb)

??? abstract "[Robust deep learning based protein sequence design using ProteinMPNN](https://github.com/dauparas/ProteinMPNN)"
    In their [paper](https://www.biorxiv.org/content/10.1101/2022.06.03.494563v1) the authors reveal a novel method to predict sequences and sequence recovery.
    ![image](https://github.com/ianderrington/genai/assets/76016868/ee8d6025-d4a1-4ade-ac22-cfb26cabd41e)

## Performance optimizations

??? tip "[Tokenized and Continuous Embedding Compressions of Protein Sequence and Structure](https://www.biorxiv.org/content/10.1101/2024.08.06.606920v1.full.pdf)" cheap
    **Developments** The authors show they "can construct a tokenized all-atom structure vocabulary that retains high reconstruction accuracy, thus introducing a tokenized representation of all-atom structure that can be obtained from sequence alone". They use a Compressed Hourglass Embedding Adaptations of Proteins (CHEAP) toe represent protein structure of sequence and structure with significant embedding compression. 
    <img width="657" alt="image" src="https://github.com/user-attachments/assets/0c48e102-f9ff-4b32-910c-5b3b7a8fa061">
    <img width="645" alt="image" src="https://github.com/user-attachments/assets/e1094347-bf07-4a00-8f3b-5c57631ba1e3">



## Common Methods




## Tools
### Colab Design

!!! tip "![GitHub Repo stars](https://badgen.net/github/stars/sokrypton/ColabDesign) [ColabDesign: Making Protein Design accessible to all via Google Colab!](https://github.com/sokrypton/ColabDesign)"



## Quality Reviews and References

!!! tip "[Harnessing Generative AI to Decode Enzyme Catalysis and Evolution for Enhanced Engineering](https://www.biorxiv.org/content/10.1101/2023.10.10.561808v1.full.pdf)"

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/yangkky/Machine-learning-for-proteins) [Papers on Machine learning for Proteins](https://github.com/yangkky/Machine-learning-for-proteins)"

??? tip "[Deep Learning in Protein Structural Modeling and Design](https://www.sciencedirect.com/science/article/pii/S2666389920301902)"
    Provides a thorough summary of DL manners of optimizing proteins. They emphasize a Sequence --> Structure --> Function approach should be focused upon.
    ![image](https://github.com/ianderrington/genai/assets/76016868/cf1b22cc-73d7-4f91-888d-2ad6f75953a1)

!!! note "[Nucleate AI in Biotech: AI for Protein Design](https://nucleate-hq.notion.site/AI-in-Protein-Design-Resource-Page-8c137f8ba2684402aef9e1e31b85776c)"

## Companies

Here are several companies that focus on protein design. If you have one you'd like to suggest, please file an [issue](https://github.com/ianderrington/genai/issues).

- [Deepchain.bio](https://deepchain.bio)
- [310.ai](https://310.ai)

EOF
