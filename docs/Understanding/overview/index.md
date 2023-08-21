Generative AI is a subset of machine learning that aim to creates new data samples or information based on an input. This technology has gained significant attention recently because they have been able to produce produce high-quality, realistic data across various domains, from images and videos to text and audio.

!!! important "[tl;dr](#tldr)"
    - Evaluate your [**application**](./applications.md) and think of the [**challenges**](./challenges.md) 
    - Understand the [**data**](../data/index.md) and collect data that you need.
    - [**Understand**](../models/index.md) and [**build**](../../Engineering/models.md) your model
    - [**Deploy**](../../Engineering/model_deployment.md) your model
    - [**Manage**](../../Managing/index.md) your model

!!! tip "A little more advanced"
    - [Use Agents](../agents/index.md)
    - Optimize your model [performance](../../Engineering/hyper_parameter_optimization.md) and [serving](../../Engineering/model_serving_optimization.md)
    

## Background 

There is a rich history of Generative AI that may be of interest for some.  Until future versions will be able to generate, and validate, that herein. There is also a philosophical overlap with 'predictive' AI where an predictive model could just be said to 'generating' either possible future outcomes, or estimated classifications of data. We will touch upon these concepts as they relate to various [applications](applications.md).

A good portion of Gen()AI relies on large scale [**foundation models**](#foundation-models) that can be reused. These models are also made with [**self-supervised learning**](#self-supervised-learning) which enables data to be 'understood' by models, by a manner speech. There are many generally distinct domains of Gen()AI application, though many be compositional. Effectively any information that can be recorded onto a computer may be made by Gen()AI.

* Language
* Visual 2D
* Visual 3D
* Visual 2D with time
* Visual 3D with time
* Brain recordings
* Weather patterns
* Protein folding 

## Foundation Models

[Foundation models](https://en.wikipedia.org/wiki/Foundation_models) are large-scale models that are pre-trained with self or semi-supervision on vast amounts of data and can be fine-tuned for specific tasks. These models serve as a foundation or base for various applications, reducing the need to train models from scratch.

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

## Resources

