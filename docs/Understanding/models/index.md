

Here we will discuss the models essential components of Gen()AI. Please see the [Trained Models](../../Engineering/models.md) for specific manners of implementing, deploying, or otherwise using these models.


## Background 
There is a rich history of Generative AI  models that may be of interest, which will be shared in future versions of this code. 

There is a philosophical overlap with 'predictive' AI where a predictive model could just be said to 'generate' either possible future outcomes or estimated classifications of data. 

We will touch upon these concepts as they relate to various [applications](applications.md).

A good portion of Gen()AI relies on large scale [**foundation models**](#foundation-models) that can be reused. These models are also made with [**self-supervised learning**](#self-supervised-learning) which enables data to be 'understood' by models, by a manner speech.

## Foundation Models

[Foundation models](https://en.wikipedia.org/wiki/Foundation_models) are large-scale models that are pre-trained with self or semi-supervision on vast amounts of data and can be fine-tuned for specific tasks. These models serve as a foundation or base for various applications, reducing the need to train models from scratch.



We discuss the general complete models used in creating Generative AI. Initial incarnations of this will focus on the most observably promising core-models, [transformers](./classes/transformers.md) often called `General Pretrained Transformers`.  

Because we generally call Gen()AI with language inputs, there are different ways to use language to achieve the appropriately desired results. These inputs, [prompts](prompt_engineering/prompting.md) will be model-specific, but may share commonalities for more-optimal usage and we discuss that more thoroughly [here](prompt_engineering/prompting.md)

Generative AI models are of two general categories: self-supervised, and Externally-supervised, and hybrid models. Generally, self-supervised models pass into external supervision to improve the quality of the output as part of [reinforcement learning](./classes/reinforcement_learning.md)

_Self-supervision_ amounts to using a single data entry itself to train a model, without interacting with other data points. For instance, a model is used to predict the next word in a string of text (as done with GPT's) or 

Because of their present degree of quality present model Architectures tend to be transformer-based, or diffusion-based, though they can also be hybrids, or made from any other standard AI method. While Generative Adversarial Networks, [GANS](https://en.wikipedia.org/wiki/Generative_adversarial_network) were the initially most successful, the challenges in training them successfully can be difficult to surmount. 

## Learning styles

### Self-Supervised Learning

Self-supervised learning is a training paradigm where the model learns by predicting parts of the input data, using other parts of the same data as context. Unlike supervised learning, where labels are provided, self-supervised learning generates its own supervisory signal from the input data. This approach has proven to be highly effective, especially for tasks where labeled data is scarce.

For instance, in the context of natural language processing, a model might be trained to predict the next word in a sentence. The surrounding words serve as context, and the model learns representations of the language without requiring explicit labels.

### Language Models and LLMs

Language models (LMs) are a type of generative model trained to predict the next word in a sequence, given the previous words. They capture the statistical properties of language and can generate coherent and contextually relevant sentences.

**Large Language Models (LLMs)** are a subset of language models that are trained on vast amounts of text data. Due to their size and the diversity of data they're trained on, LLMs can understand and generate a wide range of textual content, from prose and poetry to code and beyond. 

#### Characteristics of LLMs:

- **Versatility**: LLMs can be applied to a variety of tasks without task-specific training data, from text completion and translation to question-answering and summarization.
  
- **Transfer Learning**: LLMs can be fine-tuned on a smaller, task-specific dataset to achieve state-of-the-art performance on various NLP tasks.

- **Rich Knowledge**: Due to their extensive training data, LLMs possess a vast amount of world knowledge, often surprising users with the breadth and depth of their responses.

However, it's essential to note that while LLMs are powerful, they are not infallible. They can produce incorrect or biased information, and their outputs need to be interpreted with caution.



## Models

- [Transformers](./classes/transformers.md)
- [Diffusers](./classes/diffusers.md)
- [Generative Adversarial Networks](./classes/gans.md)
- [Reinforcement Learning](./classes/reinforcement_learning.md)
- [Developing Architectures](./classes/developing_architectures.md)

### References

- [A Survey of Large Language Models](https://arxiv.org/pdf/2303.18223.pdf) A very comprehensive paper discussing LLM technology. 

- [Understanding Large Language Models](https://magazine.sebastianraschka.com/p/understanding-large-language-models)

### Self-supervised learning.


??? tip "[Llama 2: Open Foundation and Fine-Tuned Chat Models](https://arxiv.org/abs/2307.09288) A nearly open source set of 7B-70B models with quality performance"
    
    <img width="1393" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5f6a647d-c0dc-453c-9334-3632e86bc19e">

??? tip "[Shepherd: A Critic for Language Model Generation](https://arxiv.org/pdf/2308.04592.pdf) A 7B model trained to critique outputs"
    
    **Example chat response**
    <img width="560" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c207939b-9bd7-4a20-b747-ea46d13534f7">

??? tip "[Baize: An Open-Source Chat Model with Parameter-Efficient Tuning on Self-Chat Data](https://arxiv.org/pdf/2304.01196.pdf) Parameter efficient LLama Tuning and risk minimization"

    with a new 'Self Distillation' with Feedback to improve itself even more. RESEARCH ONLY
    <img width="587" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5426c030-96a6-4e85-a37f-d465a7e13ab5">



## Mixture of Experts



## MultiModal 

There are two primary domains of Generative AI, text-oriented or image-oriented, though there is great indication that many other (multi-)modalities will be very important for the future. 

??? tip "[SPAE: Semantic Pyramid AutoEncoder for Multimodal Generation with Frozen LLMs](https://arxiv.org/pdf/2306.17842.pdf) A really cool idea that uses pyramidal representations and compresses information into text-tokens of different levels."
    It can reconstruct it as need be. These tokens then could be used in novel image generation via semantic mapping with an LLM. 



## Model agnostic improvements

- [Learning to Compress Prompts with Gist Tokens](https://arxiv.org/pdf/2304.08467.pdf). Can enable 26x compression and 40% FLOP reduction and improvements. Trains 'gist tokens' to summarize information. 


## TO SORT

  
  * Token Embedding: Mapping to a vector space. 
  * Positional Embedding: Learned or hard-coded mapping to position of sequence to a vector space
  * Attention: Token being predicted is mapped to a query vector and tokens in context are mapped to key and value vectors. Inner products are used to combine to extract information. 
  * Bi-directional / unmasked
  * Unidirectional / masked self attetion
  * Cross attention applies attention to the primary sequence and treates the second token sequence the context. 
  * Multi-head attention. Multiple attention heads in parallel.
  * Layer normalization. Found to be computationally efficient version sets m = beta = 0 or root mean square layer normalizagion or `RMSnorm`. 
  * Unembedding: Learns to convert vector intot he vocuabulary elements. 
  

