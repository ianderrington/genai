---
hide:

  - toc
---

Building a GenAI application 'from scratch' can be a very daunting process considering the [the stack](#the-stack) that is involved. Quite fortunately, many tools, services, and libraries exist to accelerate a full-stack GenAI solution. Lets first look at the components that need to be put together. 

## The stack 
| Layer             | Component            | Description                                                                 | 
|-------------------|----------------------|-----------------------------------------------------------------------------|
| Layer 4: Management | [Monitoring](./monitoring.md)        | Tools for monitoring the AI system's performance and health.            |
|                   | [Compliance](./compliance.md)            | Uses observability to ensure the system is operating with legal and ethical boundaries |                  
| Layer 3: Application | [UI/UX Front ends](./front_end.md)       | Guis and interfaces are specifically designed for streamlined connection with GenAI models.         |
|                   | [System evaluators](../agents/evaluating_and_comparing.md)            | Systems for assessing the performance and effectiveness of AI systems.      |   
|                   |  [Orchestration Tools](./orchestrating.md)          |  Languages and services to create and coordinate LLM- chains, agents workflows involving memory          |
|                   | [Vector Database](./vector_databases.md)              | Manners of methods of storing/indexing and retrieving documents.         |
|                   | [Prompt Management](../prompting/index.md#libraries-and-collections)  | Systems to manage and refine the prompts used in conversational AI.          |   
|                   | [Model Optimization](../architectures/optimization/index.md) | Manners and methods of enabling models to fulfil customer requirements | 
|                   | [Model Serving](./model_serving.md) | Services to deploy AI models and perform inference at scale.       |  
| Layer 2: Models   | [Computation](./computation.md)          | Providers of computational resources, specifically GPUs, for AI processing.  |              
|                   | [AI Alignment](./alignment.md)          | Tools and services to ensure the safety of AI systems.            |
|                   | Model comparison methods | Manners of evaluating and comparing models across baselines and benchmarks| [Model comparisons](../architectures/evaluating_and_comparing.md) |
|                   |[ML Ops](#ml-ops)    |  ML operations enables efficient coordination around Model training and tracking | 
|                   | [Pretrained Models](../architectures/pre_trained_models.md)   | Pre-built models offering a range of capabilities and uses.                  |        
|                   | [AI software libraries](#ai-software-libraries)   | Higher level languages that enable AI/ML training                 | 
| Layer 1: Data     | [Data Processing](./data.md)  | Tools for cleaning, normalizing, and preparing data for analysis.            |   |
|                   | [ETL + Data Pipelines](./data.md#etl-pipelines) | Tools to find, extract, transform, and load data, and to manage data flow.    |
|                   | Databases        | Services for structured data storage. |            |
|                   | [Data set solutions](./../data/sources.md)  | Places where one can obtain data for training and using models effecectively. |

## How do we decide on what components?

When developing AI-enabled products, consider the following components

### 1. [Customer Needs](#caller-needs)

The client's necessities are determined by the specific target audience you're catering to. Concentrating on a smaller audience helps to minimize initial requirements and might assist in the quick creation of a minimum viable product (MVP). The needs of the audience can be expanded or altered as required. Typically, the requirements demand quick and satisfactory results.

### 2. [Servable Model](#servable-model)

The models must be capable of delivering the required content with an acceptable latency to meet your model's marketing requirements.

To create a serviceable model, you may need to [optimize](../../Understanding/architectures/optimization/index.md) your models' serving.

### [Compute Requirements](#compute-needs)

Consider these general factors when assessing the requirements for model deployment.

- Latency
- Accuracy

### [Budget Constraints](#budget-available)

The allocated budget will affect your tool's monetization strategy. Highly dependent on your business model, it is crucial to optimize [model serving](../../Understanding/architectures/optimization/index.md) to avoid excessive computing needs. Using services that try to optimize this for you, like [OpenRouter](https://openrouter.ai/) may be helpful.

### [Back-end Computing](#compute-back-end)

Choosing your back-end will involve deciding between do-it-yourself and fully serviced [frameworks](./frameworks.md) on some computing host solution. You may also need additional [tools and libraries](libraries_and_tools.md) for your solution.

### [Front-end Interface](./front_end.md)

Finally, you'll need to present the results to the end-user effectively. Look into our discussion on [front ends](./front_end.md) for best practices and excellent solutions for your model output.

Remember that needs will evolve as your understanding of all the above factors shifts. So it's crucial to start with a base that you can iterate from, especially if your solution involves a [data flywheel](https://brightdata.com/blog/brightdata-in-practice/using-data-flywheel-to-scale-your-business).


## Useful References

Here are some other overviews to assist you in understanding the practical aspects of Generative AI, particularly with regards to GPT and large language models.

- [Neptune-nlp-models-infrastructure](https://neptune.ai/blog/nlp-models-infrastructure-cost-optimization#:~:text=Use%20a%20lightweight%20deployment%20framework,serve%20predictions%20over%20a%20network.)
- [How to Deploy Large Size Deep Learning Models Into Production](https://towardsdatascience.com/how-to-deploy-large-size-deep-learning-models-into-production-66b851d17f33)
