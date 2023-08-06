Data is the most important part of training any model. 

Data can be 'real' or 'simulated', though there is general consensus that simulated data can lead to worse models. 

## Simulated

- [“Textbooks are all you need”](https://arxiv.org/pdf/2306.11644.pdf) A to-be opensourced high-quality model by Microsoft revealing the importance of high-quality input data. only used 4 days on 8 A-100s to train to reach out-performing results. (It also uses a lot of simulated data). Coding-focused model. 

## LLM-extraction

- ‼️[Kor](https://github.com/eyurtsev/kor) For extracting structured data using LLMs.


### Scaling Laws
- [The 'Chinchilla' paper of 2022](https://arxiv.org/abs/2203.15556) This paper identifies scaling laws that help to understand the volume of data that is needed to obtain 'optimal' performance for a given LLM models size. Use of it in other areas, such as for Llama reveals that the models may have been under-trained.
  - Primary takeaway: **"All three approaches suggest that as compute budget increases, model size and the amount of training data should be increased in approximately equal proportions." **

!!! references
    - [Github page on Embeddings](https://github.com/veekaybee/what_are_embeddings/blob/main/README.md)