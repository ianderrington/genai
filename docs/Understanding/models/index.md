Here we will discuss the models essential components of Gen()AI. Please see the [Trained Models](../../Engineering/models.md) for specific manners of implementing, deploying, or otherwise using these models.

!!! tip "**tl;dr**"

    - Understand [self-supervised learning](#self-supervised-learning)
    - Learn about [models](./models.md)
    - Work on your [prompting](./prompt_engineering/prompting.md)
    - Move on to learn about [agents](../agents/index.md)

## Background 

There is a rich history of Generative AI  models that may be of interest, which will be shared in future versions of this code. 

Of primary importance is the manner of [model learning](#model-learning), or adapting to the input data. There are several fundamental types of model-updating: [supervised learning]() , [unsupervisedlearning](), [semi-supervised learning](), [self-supervised learning](), [reinforcement learning (RL)](), and combinations of thereof. 

Presently, the most successful models rely on  [**foundation models**](#foundation-models) that are trained on large corpora of data in a self-supervised manner. These models can then be refined using supervised, semi-supervised, and/or reinforcement learning techniques. 

Once build, Gen()AI is generally called with language inputs to create a specifically desired end-result.  These inputs, known as _prompts_ will generally be model-specific but may sometimes share commonalities for more-optimal usage, which we describe in [prompt engineering](prompt_engineering/prompting.md).

## Foundation Models

[Foundation models](https://en.wikipedia.org/wiki/Foundation_models) are large-scale models that are pre-trained with self or semi-supervision on vast amounts of data and can be fine-tuned for specific tasks. These models serve as a foundation or base for various applications, reducing the need to train models from scratch.

## Model Learning

There are several fundamental ways that models can 'learn' in relation to how data interacts with the model. 

??? tip "[To Compress or Not to Compress](https://arxiv.org/pdf/2304.09355.pdf) provides a coherent understanding of different manners of learning in relation to information theory."

    <img width="1057" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a0bf6426-bd06-4f56-a702-9b3f28a6e5a3">


### Self-supervised learning

_Self-supervision_ amounts to using a single data entry to train a model to predict a portion of the data itself. For instance, a model that is used to predict the next word in a string of text or a model that is used to generate a piece of an image that has been blanked out. This approach has proven to be highly effective, especially for tasks where labeled data is expensive to obtain or otherwise scarce.

### Supervised learning

_Supervised learning_ is a more traditional ML approach that generally involves predicting the association between an input and an output variable. While generally quite powerful, supervised learning can be limited by the volume and cost of obtaining quality 'labeled' data, where inputs and outputs are associated with a high degree of veracity. 

### Unsupervised learning

_Unsupervised learning_ is often used for discovering insights and patterns in the way data is distributed or related. While not directly or consistently used in GenAI systems, it can be valuable for filtering and selecting data. 

### Reinforcement learning 

Generally originating from game-play and robotics, _reinforcement learning_ offers the capacity for models to interact with a generally more complex environment.
When combined with self-supervision, [reinforcement learning](./classes/reinforcement_learning.md) has proven to be essential to create powerful [GPT architectures](#gpt-architectures).

### Hybrid learning methods

_Hybrid Learning_ methods combine one or several methods above to enable more successful Generative AI. _Semi-supervised learning_ is a form of hybrid learning where supervised and unsupervised learning are used to produce the final outcome. 

#### Language Models and LLMs

Language models (LMs) are a type of generative model trained to predict the next word in a sequence, given the previous words. They capture the statistical properties of language and can generate coherent and contextually relevant sentences.

**Large Language Models (LLMs)** are a subset of language models that are trained on vast amounts of text data. Due to their size and the diversity of data they're trained on, LLMs can understand and generate a wide range of textual content, from prose and poetry to code and beyond. 

#### GPT architectures

Generative AI models are of two general categories: self-supervised, and Externally-supervised, and hybrid models. 

## Model Classes

Different [model classes](./classes/index.md) of models can often be used with multiple types of model learning. Because of their present degree of quality present model Architectures tend to be transformer-based, or diffusion-based, or made from any other sufficently capable AI method. While Generative Adversarial Networks, [GANS](https://en.wikipedia.org/wiki/Generative_adversarial_network) were the initially most successful, the challenges in training them successfully can be difficult to surmount. Below we describe the model classes in greater detail.

- [Hybrid models like GPT](./classes/hybrid_models.md)
- [Transformers](./classes/transformers.md)
- [Diffusers](./classes/diffusers.md)
- [Generative Adversarial Networks](./classes/gans.md)
- [Reinforcement Learning](./classes/reinforcement_learning.md)
- [Developing Architectures](./classes/developing_architectures.md)


## Quality References

- [A Survey of Large Language Models](https://arxiv.org/pdf/2303.18223.pdf) A very comprehensive paper discussing LLM technology. 
- [Understanding Large Language Models](https://magazine.sebastianraschka.com/p/understanding-large-language-models)

  

