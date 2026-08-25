---
title: Understanding GenAI
description: A comprehensive guide to understanding, creating, and using Generative AI
hide:
  - toc
bullets:
  - Learn the fundamentals of Generative AI and its key components
  - Explore practical examples and real-world applications
  - Understand how to choose between building or buying AI solutions
  - Ready to start your GenAI journey? Choose your adventure below!
---

# Understanding GenAI

Here you'll find what you need to know about how Gen()AI works, how it's built, and how to use it.


[Choose your adventure!](#choose-your-adventure){ .md-button .md-button--primary }
[See the primary components!](#component-interactions){ .md-button .md-button--primary }
[What is this about?](#what-is-this-about){ .md-button  }
[Look up a term](./glossary.md){ .md-button }

## Choose your adventure

!!! tip "How to go about understanding and building"
    ```mermaid
    graph TD
        subgraph Understand["Start Here"]
            WG["What is Gen()AI?"]
            Examples["Examples"]
            CH["Considerations"]
            BB["Build or<br>Buy"]
        end

        subgraph Build["Build"]
            Data["Data"]
            MA["Architecture"]
            RM["Reasoning<br>Models"]
            AG["Agents"]
            MCP["MCP<br>Protocol"]
        end

        subgraph Buy["Buy it"]
            SL["Evaluating"]
            VI["Integrating"]
        end

        subgraph Use["Use"]
            Deploy["Deploy"]
            AIX["AI Experience"]
            Compliance["Being Compliant"]
            Gov["Governance"]
        end

        Understand --> Build --> Use
        Understand --> Buy --> Use

        click WG "/understanding/overview"
        click CH "/understanding/overview/gen_ai/considerations"
        click BB "/using/strategically/building_or_buying"
        click Data "/understanding/data"
        click MA "/understanding/architectures"
        click RM "/understanding/architectures/reasoning-models"
        click Deploy "/understanding/building_applications/back_end/hosting"
        click AIX "/understanding/building_applications/front_end"
        click AG "/understanding/agents"
        click MCP "/understanding/agents/mcp-protocol"
        click SL "/using/strategically/building_or_buying"
        click VI "/using/strategically/building_or_buying"
        click Examples "/using/examples"
        click Compliance "/using/managing"
        click Gov "/understanding/governance"

        classDef warmColor fill:#f9d5e5,stroke:#333,stroke-width:2px,color:#111;
        classDef midColor fill:#f0e5d8,stroke:#333,stroke-width:2px,color:#111;
        classDef buyColor fill:#f4e7d3,stroke:#333,stroke-width:2px,color:#111;
        classDef coolColor fill:#d5e8d4,stroke:#333,stroke-width:2px,color:#111;
        classDef newColor fill:#e8d5f5,stroke:#333,stroke-width:2px,color:#111;

        class Understand warmColor;
        class Build midColor;
        class Buy buyColor;
        class Use coolColor;
        class RM newColor;
        class MCP newColor;
        class Gov newColor;

    ```

## Component interactions

!!!+ tip "Component of LLM-based GenAI (clickable)"
    ```mermaid
    graph TD

      RawData[High Volume<br>Data] --> DataCleaning[Cleaned<br>Data]
        DataCleaning --> PreTraining 
        subgraph LLMPreparation[" "]
            Model --> Architecture
            PreTraining --> Architecture
            
            FineTuning <--> Architecture
            Architecture <--> Optimization 
        end
        BehaviorData[Behavior<br>Data] --> FineTuning
        Architecture --> EmbeddingModel

        Architecture <--> Orchestration
        Architecture --> Hosting
        
        Hosting[Deployment] <--> APIorCall[API/Call]
        APIorCall <--> Orchestration

        
        subgraph OrchestrationSubgraph[ ]
            Agent[Agent]
            Orchestration
            Memory <--> Orchestration
            Prompts --> Orchestration
            CognitiveArchitectures[Cognitive<br>Architectures] --> Orchestration
            Cache <--> Orchestration        
            Monitor <--> Orchestration        
            Clean <--> Orchestration   
        end
        
        
        Orchestration <--> Database
        Orchestration <--> Environment
        Orchestration <--> Tools[Tools and<br>Plugins]
        

        subgraph memory[" "]
            RAG[Retrieval<br>Augmented<br>Generation]
            DataPipeline[Data<br>Preparation] --> EmbeddingModel[Embedding<br>Model]         
            Orchestration --> EmbeddingModel
            VectorDatabase[Vector<br>Database] --> Orchestration
        end

        ContextData[Context<br>Data] --> DataPipeline

        EmbeddingModel --> VectorDatabase
                Orchestration <--> FrontEnd
        FrontEnd[Front<br>End] <--> User

        
        classDef dataColor fill:#e6e6e6,stroke:#333,stroke-width:2px,color:#111;
        classDef llmColor fill:#add8e6,stroke:#333,stroke-width:2px,color:#111;
        classDef orchestrationColor fill:#f9d5e5,stroke:#333,stroke-width:2px,color:#111;
        classDef hostingColor fill:#fada5e,stroke:#333,stroke-width:2px,color:#111;
        classDef finalColor fill:#d4edda,stroke:#333,stroke-width:2px,color:#111;
        
        class RawData dataColor;
        class DataCleaning dataColor;
        class PreTraining dataColor;

        class LLMPreparation llmColor;
        class Model llmColor;
        class FineTuning llmColor;
        class Optimization llmColor;

        class OrchestrationSubgraph orchestrationColor;
        class Hosting hostingColor;
        class APIorCall hostingColor;
        class Cache hostingColor;
        class Monitor hostingColor;
        class Clean hostingColor;

        class memory finalColor;
        class FrontEnd finalColor;
        class User finalColor;

        click RawData "/understanding/data"
        click DataCleaning "/understanding/data"
        click Architecture "/understanding/architectures"
        click PreTraining "/understanding/architectures/training/pre-training"
        click Model "/understanding/architectures/models"
        click FineTuning "/understanding/architectures/training/finetuning"
        click Optimization "/understanding/architectures/optimizing"
        click Hosting "/understanding/building_applications/back_end/hosting"
        click Cache "/understanding/building_applications/back_end/llm_ops/caching"
        click Monitor "/understanding/building_applications/security_compliance_and_governance/monitoring"
        click Memory "/understanding/agents/components/memory"
        click Prompts "/understanding/prompting"
        click CognitiveArchitectures "/understanding/agents/components/cognitive_architecture"
        click Tools "/understanding/agents/components/actions_and_tools"
        click Environment "/understanding/agents/components/environments"
        click Database "/understanding/agents/components/memory"
        click DataPipeline "/understanding/architectures/generating/rag"
        click EmbeddingModel "/understanding/data"
        click VectorDatabase "/understanding/agents/components/memory"
        click FrontEnd "/understanding/building_applications/front_end"
        click RAG "/understanding/architectures/generating/rag"
        click Agent "/understanding/agents"
    ```



## What is this about?

Generative Artificial Intelligence, and related General AI and General Super AI are components of what already is and may be the future of intelligence 🌟. We must effectively manage these technologies to use them to their highest potential.

To manage these technologies effectively and responsibly _we must understand them_ 🚀. That is a complex task, especially given the speed at which we are generating novel insights, new discoveries, backed by increasingly powerful hardware. 

We created Managen AI 🔮 to help you _understand_ and [_use_](../Using/index.md) Gen()AI. 

What do you need to know?

???+ important "See these first" 
    - 🤔 Understand [**use cases**](../Using/examples/index.md) and think of the [**challenges**](overview/gen_ai/considerations.md) associated with it. 
    - 📊 Understand the [**data**](./data/index.md) and collect data that you need. 
    - 🚢 Consider [**Model Architectures**](./architectures/index.md) and use [**pre-trained models**](./architectures/models/index.md) if possible. 
    - 🧠 Understand [**Reasoning Models**](./architectures/reasoning-models.md) — how o3, DeepSeek R1, and Qwen3 use test-time compute to solve harder problems.
    - 💬 [**Prompts**](./prompting/index.md) govern how we interact with the models. 
    - 🛠️ [**Agents**](./agents/index.md) allow for models to be used in more useful, effective, and complex manners. 
    - 🔌 Learn about [**MCP (Model Context Protocol)**](./agents/mcp-protocol.md) — the open standard connecting LLMs to tools and data sources (97M monthly downloads).
    - 🧭 Consider [**Ethical concerns**](../Using/ethically/index.md) to ensure responsible use of these powerful technologies. 
    - ⚖️ Review [**AI Governance**](./governance/index.md) — EU AI Act, US executive orders, and compliance obligations in force from 2025.
    - 🏗️ [**Building your solution**](./building_applications/index.md)

In the documents you read here, you will be able to see an increasingly consistent and understandable discussion of Gen()AI technologies, enabled by Gen()AI technologies herein described. Like most powerful technology, Gen()AI can be a two-edged sword and effective use requires responsible and thoughtful understanding. ⚖️

### How do you do stuff with Gen()AI?

🛠️ As part of understanding, you'll learn a number of 'how-to's, in this section. You will also want to look at the [using guide](../Using/index.md) which will help you to directly use GenAI without needing to wade too-deeply into the complexities of research and engineering associated with Gen()AI. 

⾾ Competition is fierce to create the 'best' (based on certain metrics) Gen()AI, so much knowledge may not be known to protect IP and other secrets.

Still, these trained foundation models may be used, with varying degrees of open-source licensing, for your project. Open and closed-source pre-trained [models](./building_applications/back_end/pre_trained_models.md) are available in many places that can be used hosted by yourself, or enabled by API services. Because of the cost and challenge involved with creating these models, it will likely be necessary to use the ones already made.

If you are working on commercial projects, be sure to look at the Licenses to ensure you are legally compliant.

🚨 And please, whatever you do, be cognisant of the [ethical concerns](../Using/ethically/index.md) 

Generative AI is a subset of machine learning that aims to create new data samples or information based on an input. This technology has gained significant attention recently because it has been able to produce high-quality, realistic data across various domains, from images and videos to text and audio.

!!! warning "Presentation bias"
    This is presently highly [transformer-based large-language models](architectures/models/transformers.md) because language is presently more versatile than other modalities. Other models are discussed [here](architectures/models/index.md). Many other techniques and technologies may not have entered into this yet. If you'd like to help us build this right, please consider [contributing](../Managenai/contributing.md)


## Useful Resources

If you can't get enough here, check out the following resources

!!! important "![GitHub Repo stars](https://badgen.net/github/stars/aishwaryanr/awesome-generative-ai-guide) [Awesome Generative AI Guide](https://github.com/aishwaryanr/awesome-generative-ai-guide)"

!!! important "[Awesome AGI](https://github.com/EmbraceAGI/Awesome-AGI/blob/main/README.md)"

!!! important "[LLM bootcamp](https://fullstackdeeplearning.com/llm-bootcamp/spring-2023/)"
