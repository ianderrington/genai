Generative AI is a subset of machine learning that aim to creates new data samples or information based on an input. This technology has gained significant attention recently because they have been able to produce produce high-quality, realistic data across various domains, from images and videos to text and audio.

Herein, we will mention a few references of historically pivotal papers and code, we will miss much of the rich history of Generative AI until future versions will be able to generate, and validate, that herein. There is also a philosophical overlap with 'predictive' AI where an predictive model could just be said to 'generating' either possible future outcomes, or estimated classifications of data. We will touch upon these concepts as they relate to various [applications](applications.md), as well as how the models may be [trained](../models/index.md).

A good portion of Gen()AI relies on large scale **foundation models** that can be reused. These models are also made with **self-supervision** which enables data to be 'understood' by models, by a manner speech. There are many generally distinct domains of Gen()AI application, though many be compositional. Effectively any information that can be recorded onto a computer may be made by Gen()AI.

* Language
* Visual 2D
* Visual 3D
* Visual 2D with time
* Visual 3D with time
* Brain recordings
* Weather patterns
* Protein folding 
* [... many other applications](applications.md)

## Foundation Models

Foundation models are large-scale models that are pre-trained on vast amounts of data and can be fine-tuned for specific tasks. These models serve as a foundation or base for various applications, reducing the need to train models from scratch. Examples include OpenAI's GPT series, Google's BERT, and many others.

### Basics of Self-Supervised Learning

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

### Quality Recordings
<div class="result" markdown>
!!! tip "[State of GPT by Andrej Karpathy](https://build.microsoft.com/en-US/sessions/db3f4859-cd30-4445-a0cd-553c3304f8e2)"

??? note "Some Screenshots"
    <img width="925" alt="image" src="https://github.com/ianderrington/general/assets/76016868/de2d3b33-9e79-407d-b3c7-5b795f330722">
    <img width="918" alt="image" src="https://github.com/ianderrington/general/assets/76016868/0ecb56de-966a-40c5-8d14-1df3b4a5a89f">
    <img width="282" alt="image" src="https://github.com/ianderrington/general/assets/76016868/7cea8be4-26dd-46c3-9001-fcf625e5975d">
    <img width="918" alt="image" src="https://github.com/ianderrington/general/assets/76016868/a32295bd-9d88-4b31-bd10-134e11e6c546">
    <img width="886" alt="image" src="https://github.com/ianderrington/general/assets/76016868/7b1c6c4b-3778-4536-8d10-03696f3624c5">
    <img width="927" alt="image" src="https://github.com/ianderrington/general/assets/76016868/dc89e484-aed6-485f-9a3e-84cdfcf858d2">

- [Lex Fridman](https://www.youtube.com/@lexfridman)
- [David Shapiro](https://www.youtube.com/@DavidShapiroAutomator)
- [AI Explained](https://www.youtube.com/@ai-explained-)
- [Yannic Kilcher](https://www.youtube.com/@YannicKilcher)
  

### LLMs
- [Emerging Architectures for LLM Applications](https://a16z.com/2023/06/20/emerging-architectures-for-llm-applications/) A very nice high overview of the component market for LLM architectures.

- [A Survey of Large Language Models](https://arxiv.org/pdf/2303.18223.pdf) A very comprehensive paper discussing LLM technology. 

- [Understanding Large Language Models](https://magazine.sebastianraschka.com/p/understanding-large-language-models)

- [Challenges and Applications of Large Language Models Kaddour et al](https://arxiv.org/abs/2307.10169]

