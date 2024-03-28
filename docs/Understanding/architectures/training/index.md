Training GenAI will generally be domain/modality specific.



## Important concepts
### Training Objectives

- Next token
- Masked token
- Embedding similarity

### What is done 
- Self-supervised [**pre-training**](pre-training.md) to predict the next token with reasonable likelihoods.
- Supervised or self-supervised [Finetuning](./finetuning.md) on higher quality data sets.
    - These datasets may be done so [recurrently](./recurrent.md) using [simulated data](../../data/preparation/synthetic.md).
- [**Automatically correcting**](#automatic-correction) models to more accurately train a model to produce output that is is more globally accurate to the input prompts.

#### Retrieval Aware Training


??? code "[GRIT: Generative Representational Instruction Tuning](https://github.com/ContextualAI/gritlm)" grit-lm
 
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
