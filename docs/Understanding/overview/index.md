The ability of computers and algorithms to generate art, literature, and other forms of content has been around for several decades. However, it is only recently that such content has begun to exhibit _human-like_ quality. This is largely due to the use of Artificial Intelligence (AI), particularly Machine Learning (ML), which leverages _data_ to produce high-quality output. 

This document provides a high-level overview of how Gen()AI achieves this feat. 

Before delving into the details, let's first understand what Gen()AI is.

## Defining Gen()AI

Gen()AI is a term that encapsulates both **Generative** and **General** AI. Each of these technologies has the capability to generate new information. Generative AI uses data, such as text, images, and videos, to create new content. On the other hand, General AI, also known as Artificial General Intelligence (AGI), is often viewed as a goal. It aims to generate information across almost all domains in a manner that is indistinguishable from, or even superior to, human-created content. 

Recent advancements in Generative AI have positioned it as a potential stepping stone towards AGI. Given the [profound implications](../../Use/ethically/index.md) of Gen()AI on individuals and society, it is crucial to understand these technologies. 

Generative AI is a subset of [AI in general](ai_and_ml_basics/index.md), as illustrated in the diagram below.

???+ important "Heirarchy of GenAI" heirarchy-of-genai
    <img width="100%" alt="image" loading="lazy" src="https://github.com/ianderrington/genai/assets/76016868/0b344719-b998-43f7-92fb-725797324af9">

Traditionally, predictive AI has been widely used in virtually every domain where data exists. But how does predictive AI differ from generative AI?

### Predictive AI vs Generative AI

Understanding the similarities and differences between predictive and generative AI is crucial. While there is a significant overlap, with Generative AI inheriting many tools and methods from predictive AI, they serve different purposes. 


The distinction is visually represented below.

???+ important "Predictive AI vs Generative AI" predictive-vs-gen-ai

    * **Predictive AI** generates predictive data based on existing data
    * **Generative AI** creates new data based on existing data and generation criteria. 
    <img width="100%" alt="image" loading="lazy" src="https://github.com/ianderrington/genai/assets/76016868/821b3315-962a-4956-96cf-ffe863beed3f">

## Creating Gen()AI

Several techniques exist for creating Gen()AI, including rule-based, data-based, and fusion methods. This section provides a brief overview of these techniques, with more detailed discussions to follow.

### Data-based Approaches

The data-based approach to creating Gen()AI involves the following steps:

1. Collect data.
2. Train the model on the collected data.
3. Evaluate the model based on any new data.
4. Iterate the process to improve the model.


### Rule-based Approaches

The rule-based approach to creating Gen()AI involves defining a set of rules that the AI follows to generate new data. This approach is often used in scenarios where the data is scarce or when the generation process needs to adhere to specific guidelines or standards. 

The steps involved in the rule-based approach are:

1. Define the rules for data generation.
2. Implement the rules in the AI model.
3. Evaluate new data based on the rules.
4. Iterate the process to refine the rules and improve the model.

However, this approach can be less effective on larger volumes of data due to unnecessary or inaccurate rules, especially if the rules are not continually re-evaluated for their impact. 

### Fusion Approaches

Fusion approaches combine the strengths of both data-based and rule-based methods. Fine-tuned models, even those that are smaller in size/cost, may outperform larger models, likely due to the no free lunch theorem. As such, using both hard-coded and ML-generated rules to select between models provides the basis for fusion techniques. For instance, combining traditional algorithms, like a calculator for math processing or regular expressions for text processing, with ML can result in a system that is more explainable, accurate, and designable compared to systems that are predominantly AI-driven.