Training GenAI will generally be domain/modality specific.

## Training Generative Language models

Models are generally trained with the following manner: 

- Self-supervised [**pre-training**](pre-training.md) to predict the next token with reasonable likelihoods.
- Supervised or self-supervised [Finetuning](./finetuning.md) on higher quality data sets, including instruction finetuning to create responses in expected manners. 

The manner that these languag emodels can be done [recursively](./recursive.md) using [simulated data](../../data/preparation/augmentation.md) and in such a way that they can be  [Automatically correcting](#automatic-correction) models to enable models that may be more globally accurate. 

### Training Objectives

There are several methods of training methods, that use samples thata re altered or hidden to and models to predict the original, unaltered/noised models

### Masked Language Models
Mask elements of 
### Causal Language Models

### Combination models

??? note "[Exploration of Masked and Causal Language Modelling for Text Generation](https://arxiv.org/pdf/2405.12630v2)"
    The authors demonstrate a manner of training data that combines both CLM and MLM methods. 
    <img width="408" alt="image" src="https://github.com/user-attachments/assets/eb6b3100-ba33-4704-a4c9-dfd73042136b">


### Diffusion models 



#### Retrieval Aware Training


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/ContextualAI/gritlm) [GRIT: Generative Representational Instruction Tuning](https://github.com/ContextualAI/gritlm)" grit-lm
 
    **Developments** The authors reveal in their [paper](https://arxiv.org/pdf/2402.09906.pdf) the ability to simultaneously train generation and embedding models, revealing improved performance in both domains, and enhancement of RAG performance by not requiring separate retrieval and generation models. 
    
    <img width="564" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f2411adc-e760-4e50-9c2f-637ea159e40c">
    <img width="571" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/9f3001fd-968b-4f8e-9658-dce3bdbfb333">

    <img width="565" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/7a14ce3b-193c-4605-aced-75c2f1a5afcd">
    <img width="553" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/98380c59-7308-449c-8592-6643e3fb7198">

??? note "[Retriever-Aware Training (RAT): Are LLMs memorizing or understanding?](https://gorilla.cs.berkeley.edu/blogs/3_retriever_aware_training.html)"
    Retrieval aware training uses the fact that it is useful to use up-to-date information at generation time and hence considers retrievers as part of the training.
    <img width="952" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/285ea9b4-75e8-4762-b1bf-b63597a463f1">
 




### How training is done

- [**Distributed training**](./distributed.md) describes the manner in which models and data can be effeciently computed with. 


## Automatically Correcting 

Foundationally, the use of [reinforcement learning with human feedback (RLHF)](./feedback.md#rlhf) has enabled highly successful models that are aligned with tasks and requirements. The automated improvement of GenAI can be bbroken down into improving the models during _training time_ and then during _generation time_. 

!!! important "[Automatically Correcting Large Language Models: Surveying the landscape of diverse self-correction strategies](https://arxiv.org/pdf/2308.03188.pdf)"
    **Developments** The authors reveal a comprehensive set of solutions to iteratively improve models.
    <img width="657" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/961478b0-a40a-4c61-8ff7-f86c93633954">

## Distributed Training
[Distributed Training](https://neptune.ai/blog/distributed-training)

### References


## To filter

## Training variations
### Fairness Enablement

- [Concept Erasure](https://arxiv.org/pdf/2306.03819.pdf)

### Using Knowledge Links

- [LinkBERT](https://github.com/michiyasunaga/LinkBERT) places in the context window hyperlinked references to achieve better performance and is a drop-in replacement for BERT models.

### Fine Tuning

Using examples to fine-tune a model can reduce the number of tokens needed to achieve a sufficiently reasonable response. Can be expensive to retrain though.


??? tip "[Symbol Tuning Improves in-context learning in Language Models](https://arxiv.org/pdf/2305.08298.pdf)"
    <img width="488" alt="image" src="https://github.com/ianderrington/general/assets/76016868/a75d4a36-0e20-4259-bd10-c7180b5468b5">


