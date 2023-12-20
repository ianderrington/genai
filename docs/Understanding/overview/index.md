# Overview of Gen()AI

Computers and algorithms have been able to generate art, writing, and other forms of content for many decades. It is recently that the content has become _human-like_ in its quality. Using AI, that is generally Machine-Learning based, uses _data_ to create such high quality output. 

Here we discuss at a high-level how Gen() AI accomplishes this. 

But first, we answer the question what is Gen() AI?

## What is Gen()AI?

We consider Gen()AI as a unification of **Generative** and/or **General** AI. Each of these different technologies has the ability to create new information. Using data, such as text, images, and video, Generative AI is able to create new information. General AI, also known as Artificial General Intelligence (AGI) is often considered a goal, that may be able to create information in almost every domain, in such a way that it is indistinguishable, or better than that which a person would create. 

Because of recent advances with Generative AI, it is often seen as a potential steppign stone towards AGI. Because Gen()AI has [profound implications](../../Using/ethically/index.md) on both individuals society, it is important they we understand each of them. 

Generative AI itself is a subset of [AI, in general](ai_in_general.md) as can be seen in the diagram below.

<img width="1151" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/0b344719-b998-43f7-92fb-725797324af9">

Traditioanlly, predictive AI, has found powerful use in effectively every domain where data exists. But what is the difference between predictive and generative AI?

### Predictve vs Generative AI

It is important to understand similarities and differences between predictive and Generative AI. There is a large degree of overlap, where Generative AI able to inherit many of the tools and methods of predictive AI.

With the similarities that they have, how do we separate Generative and Predictive AI? 

**Predictive AI** “creates predictive data” based on recorded data
**Generative AI** “creates new data” based on recorded data and generation criteria

With a visual representation as follows

<img width="788" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/821b3315-962a-4956-96cf-ffe863beed3f">


## How do we create Gen()AI?


There are several techniques for creating Gen()AI, including rule-based, data-based, and fusion methods. We will provide a brief summary of these techniques here and delve into more detail in the subsequent sections.

### Data-based Approaches

The data-based approach to creating Gen()AI involves the following steps:

1. Collect data.
2. Train the model on the collected data.
3. Evaluate the model based on any new data.
4. Iterate the process to improve the model.

[Foundation models](#foundation-models) play a significant role in the data-based approach as they can be built from to allow fine-tuning based on new or more specific data that may be proprietary, private, or otherwise inappropriately accessed for training a public-facing model. 

<i id='#foundation-models'></i>"
!!! important "Foundation models"
    By their nature, foundational models will be ever increasing in scope and potential. We share some seminal papers on foundation models here.

    Continual evolution of models may be found in hubs such as [Hugging Face](https://huggingface.co/models?other=foundation+model&sort=trending).


### Rule-based Approaches

The rule-based approach to creating Gen()AI involves defining a set of rules that the AI follows to interact new data. This approach is often used in scenarios where the data is scarce or when the generation process needs to adhere to specific guidelines or standards. 

The steps involved in the rule-based approach are:

1. Define the rules for data generation.
2. Implement the rules in the AI model.
3. Evaluate new data based on the rules.
4. Iterate the process to refine the rules and improve the model.

On larger volumes of data process can be less powerful due to unecessary or inaccurate rules, especially if the rules are are not continually re-evaluated for their impact. 


### Fusion approaches can do both of those

Fine-tuned models, even those that are smaller in their size/cost may out-perform larger mdoels, likely due to the no free lunch theorem. As such, using both hard-coded and ml-generated rules to select between models provide the basis fo fusion techniques. For instance, combining traditional algorithms, like that of a calculator for math processing, or regular expressions for text processing, with a ML, will help it to be more explainable, more accurate, and more designable, compared to systems that are mostly AI-driven. 