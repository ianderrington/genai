Here we will discuss the models essential components of Gen()AI. Please see the [Trained Models](../../Engineering/models.md) for specific manners of implementing, deploying, or otherwise using these models.

!!! tip "**tl;dr**"
    - Understand [self-supervised learning](#self-supervised-learning)
    - Learn about [models](./models.md)
    - Learn about [

## Background 

There is a rich history of Generative AI  models that may be of interest, which will be shared in future versions of this code. 

Of primary importance is the manner of [model learning](#model-learning), or adapting to the input data. There are several fundamental types of model-updating: [supervised learning]() , [unsupervisedlearning](), [semi-supervised learning](), [self-supervised learning](), [reinforcement learning (RL)](), and combinations of thereof. 

Presently, the most successful models rely on  [**foundation models**](#foundation-models) that are trained on large corpora of data in a self-supervised manner. These models can then be refined using supervised, semi-supervised, and/or reinforcement learning techniques. 

Once build, Gen()AI is generally called with language inputs to create a specifically desired end-result.  These inputs, known as _prompts_ will generally be model-specific but may sometimes share commonalities for more-optimal usage, which we describe in [prompt engineering](prompt_engineering/prompting.md).

## Foundation Models

[Foundation models](https://en.wikipedia.org/wiki/Foundation_models) are large-scale models that are pre-trained with self or semi-supervision on vast amounts of data and can be fine-tuned for specific tasks. These models serve as a foundation or base for various applications, reducing the need to train models from scratch.

We discuss the general complete models used in creating Generative AI. Initial incarnations of this will focus on the most observably promising core-models, [transformers](./classes/transformers.md) often called `General Pretrained Transformers`.  

## Model Learning

### Self-supervised learning
_Self-supervision_ amounts to using a single data entry to train a model to predict a portion of the data itself. For instance, a model that is used to predict the next word in a string of text or a model that is used to generate a piece of an image that has been blanked out. 

Self-supervised learning is a training paradigm where the model learns by predicting parts of the input data, using other parts of the same data as context. Unlike supervised learning, where labels are provided, self-supervised learning generates its own supervisory signal from the input data. This approach has proven to be highly effective, especially for tasks where labeled data is scarce.

### Supervised learning

_Supervised learning_ is a more traditional ML approach that generally involves predicting the association between an input and an output variable. While generally quite powerful, supervised learning can be limited by the volume and cost of obtaining quality 'labeled' data, where inputs and outputs are associated with a high degree of veracity. 

### Unsupervised learning

_Unsupervised learning_ is often used for discovering insights and patterns in the way data is distributed or related. While not directly or consistenly used in GenAI systems, it can be valuable for filtering and selecting data. 

### Reinforcement learning 

Generally originating from game-play and robotics, _reinforcement learning_ offers the capacity for models to interact with a generally more-complex environment.
When combined with self-supervision, [reinforcement learning](./classes/reinforcement_learning.md) has proven to to be essential to create powerful [GPT architectures](#gpt-architectures).

### Hybrid learning methods
_Hybrid Learning_ methods combine one or several methods above to enable more successful Generative AI. _Semi-supervised learning_ is a form of hybrid learning where supervised and unsupervised learning are used to produce the final outcome. 

#### Language Models and LLMs

Language models (LMs) are a type of generative model trained to predict the next word in a sequence, given the previous words. They capture the statistical properties of language and can generate coherent and contextually relevant sentences.

**Large Language Models (LLMs)** are a subset of language models that are trained on vast amounts of text data. Due to their size and the diversity of data they're trained on, LLMs can understand and generate a wide range of textual content, from prose and poetry to code and beyond. 

#### GPT architectures

Generative AI models are of two general categories: self-supervised, and Externally-supervised, and hybrid models. 

## Model Classes
Different [model classes](./classes/index.md) of models can often be used with multiple types of model learning. Because of their present degree of quality present model Architectures tend to be transformer-based, or diffusion-based, or made from any other sufficently capable AI method. While Generative Adversarial Networks, [GANS](https://en.wikipedia.org/wiki/Generative_adversarial_network) were the initially most successful, the challenges in training them successfully can be difficult to surmount. 

- [Transformers](./classes/transformers.md)
- [Diffusers](./classes/diffusers.md)
- [Generative Adversarial Networks](./classes/gans.md)
- [Reinforcement Learning](./classes/reinforcement_learning.md)
- [Developing Architectures](./classes/developing_architectures.md)

### References

- [A Survey of Large Language Models](https://arxiv.org/pdf/2303.18223.pdf) A very comprehensive paper discussing LLM technology. 
- [Understanding Large Language Models](https://magazine.sebastianraschka.com/p/understanding-large-language-models)

### Self-supervised learning.



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
  

