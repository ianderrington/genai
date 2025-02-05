---
hide:
  - toc
title: Building AI Applications
description: From concept to deployment - the complete AI application stack
bullets:
  - Modern AI apps combine over multiple specialized components across 4 critical layers
  - Each layer from data to management requires specific tools and considerations
  - The right architecture choices can make the difference between success and failure
---

This guide provides a comprehensive overview of building GenAI applications, from understanding the basic components to deployment. Whether you're building a proof-of-concept or planning an enterprise solution, you'll find practical guidance on:

- Choosing and deploying models
- Building robust [front-end](./front_end/index.md) and [back-end](./back_end/index.md) systems
- [Serving models](./back_end/llm_ops/model_serving.md)
- [Orchestrating complex AI workflows](./back_end/orchestrating.md)
- [Monitoring and maintaining GenAI applications](./security_compliance_and_governance/monitoring.md)


Building a GenAI application 'from scratch' can be a very daunting process considering the [the stack](#the-stack) that is involved. Quite fortunately, many tools, services, and libraries exist to accelerate a full-stack GenAI solution. It would also be worthwhile to consider [building or buying](../../Using/strategically/building_or_buying.md). 

Lets first look at the components that need to be put together. 

## The stack

| Layer             | Component            | Description                                                                 | 
|-------------------|----------------------|-----------------------------------------------------------------------------|
| Layer 4: Management | [**📊 Monitoring**](#monitoring-genai)        | Tools for **monitoring** the AI system's performance and health.            |
|                   | [**🛡 Compliance**](./security_compliance_and_governance/index.md)            | Uses observability to ensure the system is operating within **legal** and **ethical boundaries**. |                  
| Layer 3: Application | [**🖥 UI/UX Front ends**](./front_end/index.md)       |  GUIs and interfaces are specifically designed for **streamlined connection** with GenAI models.         |
|                   | [**📝 System evaluators**](../agents/building_agents/evaluating_and_comparing.md)            |Systems for assessing the **performance** and **effectiveness** of AI systems.      |   
|                   |  [**🧩 Orchestration Tools**](./back_end/orchestrating.md)          |  Languages and services to create and coordinate **LLM-chains**, agents workflows involving **memory**.          |
|                   | [**🗄  Caching**](./back_end/llm_ops/caching.md)              | Methods of speeding up model inference by caching results.        |
|                   | [**📊  Prompt Management**](../prompting/index.md)  |Systems to manage and refine the **prompts** used in conversational AI.          |   
|                   | [**🔧  Model Optimization**](../architectures/optimizing/index.md) | Methods of enabling models to fulfill **customer requirements**. |              
| Layer 2: Models   | [**🚀  Model Serving**](./back_end/llm_ops/model_serving.md) | Services to deploy and coordinate model inference **at scale**.   | 
|                   | [**💻 Computation**](./back_end/computation.md)          | Providers of computational resources, specifically **GPUs**, for AI processing.  |              
|                   |[**🔄 ML Ops**](./back_end/llm_ops/index.md)    | ML operations enable efficient coordination around **Model training** and **tracking**. | 
|                   | [**🏋️ Model Training**](../architectures/training/index.md)          | Tools **safety** of AI systems.            |
|                   | [**📊 Model comparisons**](../architectures/optimizing/evaluating_and_comparing.md)|  Methods of **evaluating** and **comparing models** across baselines and benchmarks.| 
|                   | [**🧠 Pretrained Models**](./back_end/pre_trained_models.md)   | Pre-built models offering a range of **capabilities** and **uses**.                  |        
|                   | [**📚 AI software libraries**](#ai-software-libraries)   | Higher level languages that enable **AI/ML training**.                 | 
| Layer 1: Data     | [**🧼 Data Processing**](../data/preparation/index.md)  | Tools for **cleaning**, **normalizing**, and preparing data for analysis.            |   |
|                   | [**🔄 ETL + Data Pipelines**](../data/preparation/index.md#etl-pipelines) | Tools to **find**, **extract**, **transform**, and **load** data, and to manage **data flow**.    |
|                   | **🗃 Databases**        | Services for **structured data storage** and retrieval. |            |
|                   | [**📈 Gathering Data**](../data/gathering/index.md)  | Places where one can obtain data for **training** and **using** models effectively. |



## How start?

When developing AI-enabled products, consider the following components

### 1. [Requirements](#requirements)

The client's requirements are determined by the specific target audience you're catering to. Concentrating on a smaller audience helps to minimize initial requirements and might assist in the quick creation of a minimum viable product (MVP). The needs of the audience can be expanded or altered as required. Typically, the requirements demand quick and satisfactory results.

#### [Compute Requirements](#compute-needs)

There are two primary, and often competing factors to consider when when assessing the model deployment requirements.

- Latency
- Accuracy

Keep in mind that the performance will not be evaluated just based on model-computation, but the entire orchestration and end-user UI/UX. 


### 2. [Servable Model](#servable-model)

The models must be capable of delivering the required content with an acceptable latency to meet the requirements. 

You might decide to rely on an API to handle model responses. Alternatively you may use an [pre-trained model](back_end/pre_trained_models.md), 
To reduce development costs using smaller/cheaper models may be preferred to get a working solution. 

However, for wider scale deployment it will be crucial to [optimize](../../Understanding/architectures/optimizing/index.md) your models' serving. Using services that try to optimize this for you, like [OpenRouter](https://openrouter.ai/) may be helpful.

### [Orchestration and Back-end compute](#compute-back-end)

Methods will require [orchestrating](./back_end/orchestrating.md) the GenAI interactions, fusing memory and other information. These may work together or independently from [back end](./back_end/index.md) 

### [Front-end Interface](./front_end/index.md)

Finally, you'll need to present the results to the end-user effectively. Look into our discussion on [front ends](./front_end/index.md) for best practices and excellent solutions for your model output.

Remember that needs will evolve as your understanding of all the above factors shifts. So it's crucial to start with a base that you can iterate from, especially if your solution involves a [data flywheel](https://brightdata.com/blog/brightdata-in-practice/using-data-flywheel-to-scale-your-business).



### Security, Compliance, and Governance



#### Monitoring
For reasons related to quality, ethics, and regulation, it is both useful, and at times required, to record both inputs, and outputs from an LLM. Particularly in systems that may be used in non low-risk settings, monitoring is an essential component of Gen()AI.  Also known as _LLM observability_, monitoring can people-in-the-loop, as well as automated systems to observe and adapt the system to both inputs and outputs that are undesired or dangerous.



### Timeline 

It should have been done yesterday, yes. But how soon is the solution actually needed? 

### Budget Considerations

The allocated budget will affect your tool's monetization strategy. 


## Useful References

!!! important "[LLMs from scratch](https://github.com/rasbt/LLMs-from-scratch) provides a quality series of Jupyter notebooks revealing how to build LLMs from scratch."


??? tip "[Emerging Architectures for LLM Applications](https://a16z.com/emerging-architectures-for-llm-applications/) A detailed discussion of the components and their interactions using orchestration systems."

    ![image](https://github.com/ianderrington/genai/assets/76016868/f287eaef-6b86-4846-8885-2b3ad3cd614b) 


???+ tip "[LLM Patterns](https://eugeneyan.com/writing/llm-patterns/) An impressively thorough and well-written discussion on LLMs and patterns within them"

    Important patterns mentioned (references to discussions herein):    
    
    * [Evaluating and comparing](../architectures/optimizing/evaluating_and_comparing.md)
    * [Retreival Augmented Generation (RAG)](../agents/components/memory.md#rag)
    * [Fine tuning](../architectures/optimizing/methods.md#finetuning)
    * [Caching](../agents/components/memory.md#caching) to reduce latency.
    * [Guardrails](../agents/components/actions_and_tools.md#guardrails) to ensure output (and input) quality.
    * Data Flywheel to use data collection and feedback to improve model and experience
    * Cascade Breaking models up into smaller simpler tasks instead of big ones.
    * Monitoring to ensure value is being derived
    * Effective (defensive) UX to ensure the models can be used well.
    ![image](https://github.com/ianderrington/genai/assets/76016868/fd03db2c-c695-4f52-8306-062fad5c3779)
    
Here are some other overviews to assist you in understanding the practical aspects of Generative AI, particularly with regards to GPT and large language models.

- [Neptune-nlp-models-infrastructure](https://neptune.ai/blog/nlp-models-infrastructure-cost-optimization#:~:text=Use%20a%20lightweight%20deployment%20framework,serve%20predictions%20over%20a%20network.)
- [How to Deploy Large Size Deep Learning Models Into Production](https://towardsdatascience.com/how-to-deploy-large-size-deep-learning-models-into-production-66b851d17f33)

