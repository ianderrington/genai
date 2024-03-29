## Use cases

Chemistry optimization is useful for drugs, materials synthesis. 

### Dual use
It is important to first consider dual-use and potential intentional or accidental harm that could come from the generation steps. Any GenAI enabled solution must necessarily have guardrails to prevent the synthesis of chemicals or byproducts that are harmful to people or to the environment. 

!!! tip "[Dual use of artificial-intelligence-powered drug discovery](https://www.nature.com/articles/s42256-022-00465-9https://www.nature.com/articles/s42256-022-00465-9)"


### Drugs
!!! "[Deep learning-guided discovery of an antibiotic targeting Acinetobacter baumannii](https://www.nature.com/articles/s41589-023-01349-8)"

## Components

### Protocol Optimization 

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/ur-whitelab/BO-LIFT) [BAYESIAN OPTIMIZATION OF CATALYSTS WITH IN-CONTEXT LEARNING]([BAYESIAN OPTIMIZATION OF CATALYSTS WITH IN-CONTEXT LEARNING](https://github.com/ur-whitelab/BO-LIFT)) Uses LLMs to optimize synthesis procedures and prediction of properties. They allow for in-context learning."
    <img width="653" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/522cffed-3016-41f1-b073-f2d1e77cbdb6">

    [Paper](https://arxiv.org/pdf/2304.05341.pdf)


### Reaction Optimization 

??? tip "[Grammar-Induced Geometry for Data-Efficient Molecular Property Prediction](https://openreview.net/pdf?id=SGQi3LgFnqj) IMPORTANT uses heirarchichal metagraphs to stitch-together molecular nodes. "
    This results in leaves that are 'actual' molecules. Using graph neural-diffusion, it does amazingly well even with minimal data-sets (100 examples).
    <img width="1052" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/50894091-fdc9-4a8f-9836-90cec4a147d0">

??? tip "[Probing the chemical ‘reactome’ with high-throughput experimentation data](https://www.nature.com/articles/s41557-023-01393-w)"

??? tip "[A deep learning framework for accurate reaction prediction and its application on high-throughput experimentation data](https://jcheminf.biomedcentral.com/articles/10.1186/s13321-023-00732-w)" graphrxn

    **Developments** The authors introduce a reaction representation, GraphRXNX that predicts reactions with graph-neuralnetworks. The model predicted graphical dataset reactions beyond baseline models. 

    ![image](https://github.com/ianderrington/genai/assets/76016868/08779ac3-d63f-4c69-a18b-95327e7eef0e)

??? tip "[Optimizing Chemical Reactions with Deep Reinforcement Learning (2017)](https://pubs.acs.org/doi/epdf/10.1021/acscentsci.7b00492)" deep-reaction-optimizer
    The authors reveal the use of models that iteratively improve outcomes for [lab in loop optimization](./index.md#lab-in-loop-optimization) using deep learning models. Using RNN-enabled re-inforcement learning. The resulting Deep Reaction Optimizer (DRO) is supposed to "guide interactive decision-making procedure in optimizing reactions" by combining deep RL with chemistry domain knowledge.
    <img width="418" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4de4e2e2-fbca-4fe9-8c1e-a3b3af1d71e0">


### Confirmation prediciton

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/AspirinCode/papers-for-molecular-design-using-DL) [Papers for Molecular Design using DL]([Papers for Molecular Design using DL](https://github.com/AspirinCode/papers-for-molecular-design-using-DL)) Provides a large set of papers"
 
## Models

??? abstract "[ChemLLM: A Chemical Large Language Model](https://huggingface.co/AI4Chem/ChemLLM-7B-Chat)"
    <img width="589" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/fd81410c-fc59-47a1-95f1-346bfd380ef2">

    [Paper](https://arxiv.org/abs/2402.06852)

## Frameworks

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/datamol-io/datamol) [Datamol is a python lybrary to work with molecules on top of RDKit]([Datamol is a python lybrary to work with molecules on top of RDKit](https://github.com/datamol-io/datamol))"

!!! abstract "[RDKit is a collection of cheminformatics and machine-learning software written in C++ and Python.](https://www.rdkit.org/)"




