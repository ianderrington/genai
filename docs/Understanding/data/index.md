Data is the most important part of training any model. Better data is, well, better. Higher quality data can lead to improved performance of downstream models. More data is better data too. More diverse data is better. Data with meta-data is better. We have to maintain a balance with the costs associated with getting, keeping, organizing, and accessing the data. 

With data in hand, it is generally good to understand it directly, by looking at the accompanying meta-data and a good number of examples to ensure that it is generally consistent. Often times data is not properly structured that can be processeed downstream. For language models, this may involve having the incorrect incorrect encoding, or symbols that are otherwise not anticipated for your token-space. The data is normalized, either once or on-the-fly, to ensure the modles downstream can process it. 

COPILOT: Generate a MErmaid Diagram of the above. 


COPILOT: generate a mermad
very profound general way to retrain LLMs with synthetic data.
* train(Large+Vague model) -> generate highly specific data
* train(small specific model) on specific data.

### Important questions 
## Amount of data needed. 
The larger the model, the more data is needed. A rough order of estimate is that the number of tokens should be 10x the number of parameters used by the model. 

??? tip "[Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556) The 'Chinchilla' paper of 2022, identifies scaling laws that help to understand the volume of data that is needed"
    to obtain 'optimal' performance for a given LLM models size. Use of it in other areas, such as for Llama reveals that the models may have been under-trained.
    - Primary takeaway: **"All three approaches suggest that as compute budget increases, model size and the amount of training data should be increased in approximately equal proportions." 
    <img width="538" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/d9243085-2db9-4ef2-91d7-83249fdd6c18">

## Batch sizes of data needed...
TODO

## Training with generated data. 

It is possible and sometimes even peferred to train with generated data produced by other models. There are notable concerns, however, as some evidence indicates that training with generated data can yield worse results, and if done consistently, can lead to complete degredation of model performance.  

??? tip "[Textbooks are all you need](https://arxiv.org/pdf/2306.11644.pdf) Used a volume of generated data, and transformer-classifiers to filter data to create a high quality coding-focused model."
    Used 4 days on 8 A-100s to train to reach out-performing results. 
    
