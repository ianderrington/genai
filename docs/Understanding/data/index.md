Data is the most important part of training any model. 

## Amount of data needed. 
The larger the model, the more data is needed. A rough order of estimate is that the number of tokens should be 10x the number of parameters used by the model. 

??? tip "[Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556) The 'Chinchilla' paper of 2022, identifies scaling laws that help to understand the volume of data that is needed"
    to obtain 'optimal' performance for a given LLM models size. Use of it in other areas, such as for Llama reveals that the models may have been under-trained.
    - Primary takeaway: **"All three approaches suggest that as compute budget increases, model size and the amount of training data should be increased in approximately equal proportions." 
    <img width="538" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/d9243085-2db9-4ef2-91d7-83249fdd6c18">

## Bath sizes of data needed...
TODO

## Training with generated data. 

It is possible and sometimes even peferred to train with generated data produced by other models. There are notable concerns, however, as some evidence indicates that training with generated data can yield worse results, and if done consistently, can lead to complete degredation of model performance.  

??? tip "[Textbooks are all you need](https://arxiv.org/pdf/2306.11644.pdf) Used a volume of generated data, and transformer-classifiers to filter data to create a high quality coding-focused model."
    Used 4 days on 8 A-100s to train to reach out-performing results. 
    
