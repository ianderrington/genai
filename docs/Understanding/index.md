Generative Artificial Intelligence, and related General AI and General Super AI are components of what already is and may be the future of intelligence and computing. We must effectively manage these technologies to use them to their highest potential. 

To manage these technologies effectively and responsibly _we must understand them_. That is a complex task, especially given the speed at which we are generating novel insights, new discoveries, backed by increasingly powerful hardware. 

That is why we created Mana Gen AI. 

Here we focus on Generative AI, knowing various and changing definitions of these domains have a degree of overlap. With time and support we will be able to help many people understand the technology, lest it become a magician's tool. 

!!! quote "Any sufficiently advanced technology is indistinguishable from magic. --Arthur C. Clark”

In the documents you read here, you will be able to see an increseasingly consistent and understandable discussion of Gen()AI technologies, enabled by Gen()AI technologies herein described.  Like most powerful technology, Gen()AI can be a two edged sword and effective use requires responsible and thoughtful understanding. 

## The base components of Gen()AI

If you are new to this area, you may briefly peruse [applications](overview/applications.md) and [challenges](overview/challenges.md) associated with Gen()AI. 

Getting into it, you will find the following outline: 

### What's been done with Gen()AI?

1. [Data](data/index.md) provides the backbone connecting computation to our recorded reality.
1. [Models](models/index.md) allow the data to be understood and used. [^n1]
1. [Prompts](prompting/index.md) govern how we interact with the models.
1. [Agents](agents/index.md) allow for models to be used in more useful, effective, and complex manners.
1. [Ethical concerns](../Using/ethically/index.md) help us to temper the responsible use of these powerful technologies.
1. [Studies](studies/studies.md) help us to understand Gen()AI from an experimental and theoretical basis. 

### How do you do stuff with Gen()AI?

Of course, there will be some important 'how-to's, particularly in the [data](data/index.md), [models](models/index.md), [prompts](prompting/index.md) and [agents](./agents/index.md). 

Competition is fierce to create the 'best' (based on certain metrics) Gen()AI, so much knowledge may not be known to protect IP and other secrets.

Still, these trained foundation models may be used, with varying degrees of open-source licensing, for your project. Open and closed-source pre-trained [models](models/pre_trained_models.md) are available in many places that can be used hosted by yourself, or enabled by API services. Because of the cost and challenge involved with creating these models, it will likely be necessary to use the ones already made. 

If you are working on commercial projects, be sure to look at the Licenses to ensure you are legally compliant. 

And please, whatever you do, be cognisant of the [ethical concerns](../Using/ethically/index.md)

## Useful References[^a1]

There is so much quality material, it would be valuable for your time to check some of these out if you got the chance. 


??? tip "[LLM Patterns](https://eugeneyan.com/writing/llm-patterns/) An impressively thorough and well-written discussion on LLMs and patterns within them"
    Important patterns mentioned (references to discussions herein):
    * [Evaluation](models/evaluation.md)
    * [Retreival Augmented Generation (RAG)](agents/rag.md)
    * [Fine tuning](models/alignment.md#finetuning)
    * [Caching](agents/memory.md#caching) to reduce latency. 
    * [Guardrails](agents/interpreters.md#guardrails) to ensure output (and input) quality.
    * Data Flywheel to use data collection and feedback to improve model and experience
    * Cascade Breaking models up into smaller simpler tasks instead of big ones.
    * Monitoring to ensure value is being derived
    * Effective (defensive) UX to ensure the models can be used well. 
    ![image](https://github.com/ianderrington/genai/assets/76016868/fd03db2c-c695-4f52-8306-062fad5c3779)


- [A Survey of Large Language Models](https://arxiv.org/pdf/2303.18223.pdf) A very comprehensive paper discussing LLM technology. 
- [A cookbook of self-supervised Learning](https://arxiv.org/pdf/2304.12210.pdf) 
- [LLM Survey](https://github.com/RUCAIBox/LLMSurvey)
- [Large Language Models Explained](https://www.understandingai.org/p/large-language-models-explained-with)

[a^1]: This is presently highly [transformer-based large-language models](models/classes/transformers.md) because language is presently more versatile than other modalities. Other models are discussed [here](models/classes/index.md)



Generative AI is a subset of machine learning that aim to creates new data samples or information based on an input. This technology has gained significant attention recently because they have been able to produce produce high-quality, realistic data across various domains, from images and videos to text and audio.

!!! important "[tl;dr](#tldr)"
    - Evaluate your [**application**](./overview/applications.md) and think of the [**challenges**](./overview/challenges.md) associated with it
    - Understand the [**data**](./data/index.md) and collect data that you need.
    - [**Understandand build**](models/index.md) use [**pre-trained**](models/pre_trained_models.md) models.
    - [**Deploy**](./deploying/index.md) your model
    - [**Manage**](../Managen.ai/index.md) your model

!!! tip "A little more advanced"
    - [Use Agents](agents/index.md) for increasingly powerful applications
    - Optimize your model [performance](models/optimizing_hyper_parameters.md) and [serving](models/call_optimization.md)

In this section, we will focus on 'Understanding' the various components of GenAI, [data](./data/index.md), [models](./models/index.md) and [agents](./agents/index.md) including methods and models that are initial or under development. 
