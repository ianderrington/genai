Data selection acts as the backbone for training generative AI models. Without suitable data and an optimal selection strategy, it might be challenging to develop models that provide useful and relevant outputs.

## Why is Data Selection Important?

Data selection forms the initial step in any machine learning project. Selecting the right data can help train your GenAI model more efficiently and accurately. Improper data selection, and balancing, can cause you models to fail all together, or more insideously induce output biases that are of [ethical concern](../../../Using/ethically/fairness.md)

### Role in Training Models

The right data selection dictates how well a model can generate the desired output. It decides what the design and parameters of the model will be.

### Impact on Model Performance

The quality and relevance of selected data have a direct impact on the performance of the model. The right selection reduces the risk of overfitting and underfitting.

## Strategies for Effective Data Selection

There are several strategies to ensure the data used for training Generative AI models is selected effectively.

### Understanding Your Data

Before selecting data, take time to understand the data you have. Analyzing the data to identify patterns, trends or anomalies will give some direction on what data to use.

??? abstract "[WHAT’S IN MY BIG DATA?](https://github.com/allenai/wimbd) provides a nice way of looking at data from common text corpora."
    **Developments** The [authors](https://arxiv.org/pdf/2310.20707.pdf) show that there are a lot of artifacts in common corpora like winograd, and open source the artifacts that they find.
    

### Choosing Relevant Data

Relevancy of data to the problem at hand is crucial. Inappropriate data can lead to inaccurate results and will impede the model’s performance.

### Balancing Your Dataset

In order to train an effective Generative AI model, it's important to balance your dataset. An imbalanced dataset could lead your model to be biased towards the class that is overrepresented.

### Automated Data Selection



## Filtering 

### Applying labels 
??? important "[TnT-LLM: Text Mining at Scale with Large Language Models](https://arxiv.org/html/2403.12173v1) uses an LLM to provide taxonomy and annotate data with text clasifiers."
    
    <img width="866" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/02e4559d-77e2-471f-8dcc-0b3f6653772d">
    <img width="856" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/bffff5f8-0c69-401f-bb63-887c08fb9d39">
    <img width="861" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/6f14e6e5-26b7-45b4-b4f4-d2259c83b6ac">




??? important "[How to Train Data-Efficient LLMs](https://arxiv.org/html/2402.09668v1)" how-to-train-data-efficient-llms
    
    **Developments** The authors compare a number of sampling methods and demonstrate that an LLM that choosing high quality pre-training data with a simple prompt can result in outperforming models that converge 70% faster while rejecting 90% of data. The resulting model they call `Ask-LLM`. 

    ![image](https://github.com/ianderrington/genai/assets/76016868/a84a0d30-6b6e-410a-bff1-05eddea5205c)

    **Method**
    The authors a number of  sampling methods including those that were heuristic-based including compute-efficient density/perplexity estimation. The models that were most  , gains were primarily found when using a 
    ```markdown
    ###
    This is a pretraining .... datapoint.
    ###

    Does the previous paragraph demarcated within ### and ### contain info
    rmative signal for pre-raining a large-language model?
    An informaive datapoint should be well-formatted, contain some usable knowledge of the world, and strictly NOT have any harmful, racist, sexist, etc. content. 

    OPTIONS: 
    - yes
    - no
    ```
    **Results**
    The LLM-based quality filtering yields a "Pareto optimal efficiency between data quanity and model quality", helping to reduce environment and thereby becoming a net social-good. 


     
