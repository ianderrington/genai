---
hide:

  - toc
---


#  Understanding Gen🔮AI! 

Here you'll find what you need to know to understand (eventually) everything you need to know about creating and using Gen()AI. 


[Choose your adventure!](#choose-your-adventure){ .md-button .md-button--primary }
[See the primary components!](#component-interactions){ .md-button .md-button--primary }
[What is this about?](#what-is-this-about){ .md-button  }

## Choose your adventure

???+ tip "How to go about understanding and building"
    ```mermaid
    graph TD
        subgraph Understand["Understand your"]
            UC["Use Cases"]
            CH["Challenges"]
            BB["Build or Buy"]
        end

        subgraph Build["Build it"]
            Data["Get Data"]
            MA["Create\nArchitecture"]

            Deploy["Deploy"]
            AG["Agents"]
        end

        subgraph Buy["Buy it"]
            CM["Commercial Markets"]
            SL["Solution Licensing"]
            VI["Vendor Integration"]
        end

        subgraph Use["Use"]
            Business["Business Considerations"]
            Ethical["Ethical Considerations"]
            Examples["Examples & Case Studies"]
            Interfacing["Interfacing Layers"]
            Marking["Marking and Detecting"]
        end

        Understand --> Build --> Use
        Understand --> Buy --> Use

        click UC "./overview/use_cases.html"
        click CH "./overview/challenges.html"
        click BB "./overview/building_or_buying.html"
        click Data "./data/index.html"
        click MA "./architectures/index.html"
        click Deploy "./deploying/index.html"
        click AG "./agents/index.html"
        click CM "../Using/commercial_markets.html"
        click SL "../Using/solution_licensing.html"
        click VI "../Using/vendor_integration.html"
        click Business "../Using/business.html"
        click Ethical "../Using/ethically/index.html"
        click Examples "../Using/examples/index.html"
        click Interfacing "../Using/interfacing_layers/web_plugins.html"
        click Marking "../Using/marking_and_detecting.html"

        classDef warmColor fill:#f9d5e5,stroke:#333,stroke-width:2px;
        classDef midColor fill:#f0e5d8,stroke:#333,stroke-width:2px;
        classDef buyColor fill:#f4e7d3,stroke:#333,stroke-width:2px;
        classDef coolColor fill:#d5e8d4,stroke:#333,stroke-width:2px;

        class Understand warmColor;
        class Build midColor;
        class Buy buyColor;
        class Use coolColor;

    ```

## Component interactions

???+ tip "Component of LLM-based GenAI (clickable)"
    ```mermaid
    graph TD

      RawData[High Volume Data] --> DataCleaning[Cleaned Data]
        DataCleaning --> PreTraining 
        subgraph LLMPreparation[" "]
            Model --> Architecture
            PreTraining --> Architecture
            
            FineTuning <--> Architecture
            Architecture <--> Optimization 
        end
        BehaviorData[Behavior \n Data] --> FineTuning
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
            CognitiveArchitectures[Cognitive\n Architectures] --> Orchestration
            Cache <--> Orchestration        
            Monitor <--> Orchestration        
            Clean <--> Orchestration   
        end
        
        
        Orchestration <--> Database
        Orchestration <--> Environment
        Orchestration <--> Tools[Tools and \n Plugins]
        

        subgraph memory[" "]
            RAG[Retrieval \n Augmented \n Generation]
            DataPipeline[Data\n Preparation] --> EmbeddingModel[Embedding \n Model]         
            Orchestration --> EmbeddingModel
            VectorDatabase --> Orchestration
        end

        ContextData[Context\n Data] --> DataPipeline

        EmbeddingModel --> VectorDatabase[Vector Database]
                Orchestration <--> FrontEnd
        FrontEnd[Front End] <--> User

        
        classDef dataColor fill:#e6e6e6,stroke:#333,stroke-width:2px;
        classDef llmColor fill:#add8e6,stroke:#333,stroke-width:2px;
        classDef orchestrationColor fill:#f9d5e5,stroke:#333,stroke-width:2px;
        classDef hostingColor fill:#fada5e,stroke:#333,stroke-width:2px;
        classDef finalColor fill:#d4edda,stroke:#333,stroke-width:2px;
        
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

        click RawData "./data/index.html"
        click DataCleaning "./data/selection.html"
        click Architecture "./architectures/index.html"
        click PreTraining "./architectures/training/pre-training.html"
        click Model "./architectures/models/index.html"
        click FineTuning "./architectures/training/finetuning.html"
        click Optimization "./architectures/optimization.html"
        click Hosting "./deploying/index.html"
        click APIorCall "./api_call/index.html"
        click Cache "./deploying/caching.html"
        click Monitor "./deploying/monitoring.html"
        click Clean "./cleaning/index.html"
        click Memory "./agents/memory.html"
        click Prompts "./prompting/index.html"
        click CognitiveArchitectures "./agents/cognitive_architecture.html"
        click Tools "./agents/actions_and_tools.html"
        click Environment "./agents/environments.html"
        click Database "./agents/memory.html"
        click DataPipeline "./agents/rag.html#data-preparation"
        click EmbeddingModel "./data/index.html#embedding"
        click VectorDatabase "./agents/memory.html#vector-databases"
        click FrontEnd "./deploying/front_end.html"
        click User "./user/index.html"
        click RAG "./agents/rag.html"
        click Agent "./agents/index.html"
    ```



## What is this about?

Generative Artificial Intelligence, and related General AI and General Super AI are components of what already is and may be the future of intelligence 🌟. We must effectively manage these technologies to use them to their highest potential.

To manage these technologies effectively and responsibly _we must understand them_ 🚀. That is a complex task, especially given the speed at which we are generating novel insights, new discoveries, backed by increasingly powerful hardware. 

We created Managen AI 🔮 to help you _understand_ and [_use_](../Using/index.md) Gen()AI. 

What do you need to know?

???+ important "See these first" 
    - 🤔 Evaluate your [**use cases**](./overview/use_cases.md) and think of the [**challenges**](./overview/challenges.md) associated with it. 
    - 📊 Understand the [**data**](./data/index.md) and collect data that you need. 
    - 🚢 Consider [**Model Architectures**](./architectures/index.md) use [**pre-trained**](./architectures/pre_trained_models.md) models if possible. 
    - [💬 Prompts](prompting/index.md) govern how we interact with the models. 
    - [🔧 Optimize](./architectures/optimization/index.md) your model for better performance and efficiency. 
    
    - [🛠️ Agents](agents/index.md) allow for models to be used in more useful, effective, and complex manners. 
    - [🧭 Consider Ethical concerns](../Using/ethically/index.md) help us to temper the responsible use of these powerful technologies. 
    - 🏗️ [](./building/index.md) your model. 
    

In the documents you read here, you will be able to see an increasingly consistent and understandable discussion of Gen()AI technologies, enabled by Gen()AI technologies herein described. Like most powerful technology, Gen()AI can be a two-edged sword and effective use requires responsible and thoughtful understanding. ⚖️

### How do you do stuff with Gen()AI?

🛠️ As part of understanding, you'll learn a number of 'how-to's, in this section. You will also want to look at the [using guide](../Using/index.md) which will help you to directly use GenAI without needing to wade too-deeply into the complexities of research and engineering associated with Gen()AI. 

⾾ Competition is fierce to create the 'best' (based on certain metrics) Gen()AI, so much knowledge may not be known to protect IP and other secrets.

Still, these trained foundation models may be used, with varying degrees of open-source licensing, for your project. Open and closed-source pre-trained [models](architectures/pre_trained_models.md) are available in many places that can be used hosted by yourself, or enabled by API services. Because of the cost and challenge involved with creating these models, it will likely be necessary to use the ones already made.

If you are working on commercial projects, be sure to look at the Licenses to ensure you are legally compliant.

🚨 And please, whatever you do, be cognisant of the [ethical concerns](../Using/ethically/index.md) 

Generative AI is a subset of machine learning that aim to creates new data samples or information based on an input. This technology has gained significant attention recently because they have been able to produce high-quality, realistic data across various domains, from images and videos to text and audio. 🌈

!!! warning "Presentation bias"
    This is presently highly [transformer-based large-language models](architectures/models/transformers.md) because language is presently more versatile than other modalities. Other models are discussed [here](architectures/models/index.md). Many other techniques and technologies may not have entered into this yet. If you'd like to help us build this right, please consider [contributing](../contributing.md)


## Useful Resources

If you can't get enough here, check out the following resources

!!! important "![GitHub Repo stars](https://badgen.net/github/stars/aishwaryanr/awesome-generative-ai-guide) [Awesome Generative AI Guide]([Awesome Generative AI Guide](https://github.com/aishwaryanr/awesome-generative-ai-guide))"

!!! important "[Awesome AGI](https://github.com/EmbraceAGI/Awesome-AGI/blob/main/README.md)"

!!! important "[LLLM bootcamp](https://fullstackdeeplearning.com/llm-bootcamp/spring-2023/)"
