---
title: AI Architectures
description: The building blocks that make AI systems think and learn
bullets:
  - Foundation models can learn from vast amounts of data without explicit labels
  - The same architecture can master language, vision, and reasoning tasks
  - Modern AI combines multiple learning approaches in ways previously thought impossible
---

# Architectures

Here we will discuss the architectural components needed to build Gen()AI models. While it is often useful or essential to use [pre-trained models](../building_applications/back_end/pre_trained_models.md), it is likely that such pre-trained models can be further refined for specific use-cases.

???+ tip "**tl;dr**"

    - Understand [self-supervised learning](#self-supervised-learning) and [foundation models](#foundation-models)
    - Learn about [models](./models/index.md)
    - [Train](./training/index.md) your models
    - [Evaluate and compare](./optimizing/evaluating_and_comparing.md) your models
    - [Optimize](./optimizing/methods.md) your models
    - [Generate](./generating/index.md) with your models

## Background

There is a rich history of Generative AI architectures, which will be shared in future versions of this code.

Of primary importance is the manner of [model learning](#model-learning), or adapting to the input data. There are several fundamental types of model-updating: [supervised learning](), [unsupervisedlearning](), [semi-supervised learning](), [self-supervised learning](), [reinforcement learning (RL)](), and combinations of thereof.

Presently, the most successful models rely on  [**foundation models**](#foundation-models) that are trained on large corpora of data in a self-supervised manner. These models can then be refined using supervised, semi-supervised, and/or reinforcement learning techniques.

Once built, Gen()AI is generally called with language inputs to create a specifically desired end result.  These inputs, known as _prompts_ will generally be model-specific but may sometimes share commonalities for more optimal usage, which we describe in [prompt engineering](../prompting/index.md).

## Foundation Models

[Foundation models](https://en.wikipedia.org/wiki/Foundation_models) are large-scale models that are pre-trained with self or semi-supervision on vast amounts of data and can be fine-tuned for specific tasks. These models serve as a foundation or base for various applications, reducing the need to train models from scratch.

!!! important "Foundation models"
    Foundation models, by their nature, will continually expand in scope and potential. We share some seminal papers on foundation models here.

    Continual evolution of models may be found in hubs such as [Hugging Face](https://huggingface.co/models?other=foundation+model&sort=trending).

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
When combined with self-supervision, [reinforcement learning](./models/reinforcement_learning.md) has proven to be essential to create powerful [GPT architectures](#gpt-architectures).

### Hybrid learning methods

_Hybrid Learning_ methods combine one or several methods above to enable more successful Generative AI. _Semi-supervised learning_ is a form of hybrid learning where supervised and unsupervised learning are used to produce the final outcome.

General Pretrained Transformer models (GPT) work this way by first doing unsupervised prediction. Then some supervised training is provided. Then an RL approach is used to create a loss model using [reinforcment Learning with Human Feedback (RLHF)](./models/reinforcement_learning.md#RLHF) to score multiple potential outputs to provide more effective outputs.

Particular types of RLHF, like instruction-training of [Instruct GPT](https://arxiv.org/pdf/2203.02155.pdf) enables models to perform effectively.

![image](https://github.com/ianderrington/genai/assets/76016868/f9604950-6bd6-4855-85dd-16456a0528e9)


#### Language Models and LLMs

Language models (LMs) are a type of generative model trained to predict the next word in a sequence, given the previous words. They capture the statistical properties of language and can generate coherent and contextually relevant sentences.

**Large Language Models (LLMs)** are a subset of language models that are trained on vast amounts of text data. Due to their size and the diversity of data they're trained on, LLMs can understand and generate a wide range of textual content, from prose and poetry to code and beyond.

??? tip "[Challenges and Applications of Large Language Models Kaddour et al](https://arxiv.org/pdf/2307.10169.pdf) This is a well-done and comprehensive review."


#### GPT architectures


- [Illustrated GPT](http://jalammar.github.io/illustrated-gpt2/)
- [How GPT3 works](https://jalammar.github.io/how-gpt3-works-visualizations-animations/)
Excellent summary of the progress of GPT over time, revealing core components, optimizations, and essential variations to the major Foundation model architectures.


- [Five years of progress in GPTs](https://finbarrtimbers.substack.com/p/five-years-of-progress-in-gpts?utm_source=substack&utm_medium=email)

- [The Transformer Architecture of GPT Models](https://towardsdatascience.com/the-transformer-architecture-of-gpt-models-b8695b48728b)

https://proceedings.neurips.cc/paper_files/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Paper.pdf


Generative AI models are of two general categories: self-supervised, and Externally-supervised, and hybrid models.

## Model Classes

Different [model classes](./models/index.md) of models can often be used with multiple types of model learning. 


## Quality References

- [A Survey of Large Language Models](https://arxiv.org/pdf/2303.18223.pdf) A very comprehensive paper discussing LLM technology.
- [Understanding Large Language Models](https://magazine.sebastianraschka.com/p/understanding-large-language-models)
- [What we know about LLMS (primer)](https://willthompson.name/what-we-know-about-llms-primer)
- [Catching up on the weird world of LLMs](https://simonwillison.net/2023/Aug/3/weird-world-of-llms/)
- [LLM Engineering by Huyen Chip](https://huyenchip.com/2023/04/11/llm-engineering.html)


- [A Survey of Large Language Models](https://arxiv.org/pdf/2303.18223.pdf) A very comprehensive paper discussing LLM technology.
- [A cookbook of self-supervised Learning](https://arxiv.org/pdf/2304.12210.pdf)
- [LLM Survey](https://github.com/RUCAIBox/LLMSurvey)
- [Large Language Models Explained](https://www.understandingai.org/p/large-language-models-explained-with)
