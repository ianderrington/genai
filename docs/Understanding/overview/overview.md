Like most powerful technology, it can be a two edged sword and effective use requires being responsible with it. We first go over to several [Applications](applications.md) and
[Challenges](challenges.md) associated with Gen()AI. Please look into those, and when you're ready, check out the 

## The base components of Gen()AI

1. [Data](../data/data.md) provides the backbone connecting computation to our recorded reality.
1. [Models](../model_creation/index.md) allow the data to bunderstood and used. 
1. [Prompts](../prompt_engineering/prompting.md) govern how we interact with the models.
1. [Agents](../agents/index.md) allow for models to be used in more useful, and complex manners.
1. [Engineering and Management](../enablement/index.md) is required given the scope of complexity of the tools. 
1. [Ethical concerns](../ethical_concerns/index.md) help us to temper the responsible use of these powerful technologies.
1. [Studies](../studies/studies.md) help us to understand Gen()AI from an experimental and theoretical basis. 

!!! tip "Just want to use Gen()AI right now?"
    There are both open and closed-source models, that can be used. Because of computation requirements, more-powerful hardware may be needed to run these models, so they are often run with cloud-based services. We share an incomplete list [here](../enablement/models.md)

## Useful References[^a1]

<div class="result" markdown>
!!! tip "[LLM Patterns](https://eugeneyan.com/writing/llm-patterns/)"
    An impressively thorough and well-written discussion on LLMs and patterns within them
??? example 
    Important patterns mentioned (references to discussions herein):
    * [Evaluation](../model_creation/evaluation.md)
    * [Retreival Augmented Generation (RAG)](../model_creation/rag.md)
    * [Fine tuning](../model_creation/alignment.md#finetuning)
    * [Caching](../agents/memory.md#caching) to reduce latency. 
    * [Guardrails](../agents/interpreters.md#guardrails) to ensure output (and input) quality.
    * Data Flywheel to use data collection and feedback to improve model and experience
    * Cascade Breaking models up into smaller simpler tasks instead of big ones.
    * Monitoring to ensure value is being derived
    * Effective (defensive) UX to ensure the models can be used well. 
    ![image](https://github.com/ianderrington/genai/assets/76016868/fd03db2c-c695-4f52-8306-062fad5c3779)
</div>

- [A Survey of Large Language Models](https://arxiv.org/pdf/2303.18223.pdf) A very comprehensive paper discussing LLM technology. 
- [A cookbook of self-supervised Learning](https://arxiv.org/pdf/2304.12210.pdf) 
- [LLM Survey](https://github.com/RUCAIBox/LLMSurvey)
- [Large Language Models Explained](https://www.understandingai.org/p/large-language-models-explained-with)

[a^1]: This is presently highly [transformer-based LLM](../model_creation/classes/transformers.md) because language is presently more versatile than other modalities. Other models are discussed [here](../model_creation/classes/index.md) 