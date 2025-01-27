---
title: Agent Components
description: The fundamental building blocks that enable AI agent capabilities
bullets:
  - AI agents are composed of four essential interacting systems
  - Each component serves a distinct and critical role in agent behavior
  - Understanding component interactions is key to effective agent design
---

# Components

AI agents are complex systems made up of several essential components that work together to enable intelligent behavior. Each component serves a specific purpose and contributes to the agent's overall capabilities:

- [Cognitive Architecture](cognitive_architecture.md) - How agents think, reason, and make decisions
- [Memory](memory.md) - How agents store and recall information
- [Actions and Tools](actions_and_tools.md) - How agents interact with the world
- [Environments](environments.md) - The contexts in which agents operate

These components form the foundation of any AI agent system, whether simple or complex. Understanding how they work together is crucial for building effective AI applications.


## Agent Components

???+ important "How components interact (clickable)"
    ```mermaid
    graph TB
        Environment[Environment] -->|represented <br> by | Data[Data]
        
        click Environment "./environments.html"
        Data -->|interpreted <br> with| LLM[LLMs]
        click Data "../data/index.html"
        LLM <-->|uses| CognitiveArchitectures[Cognitive <br>Architectures]
        click LLM "../../architectures/models/index.html"
        CognitiveArchitectures <--> |Find, Create, Read<br>Update, Delete| Memory[Memory]
        
        classDef promptsColor fill:#f0ad4e,stroke:#333,stroke-width:2px;
        class Prompts promptsColor;
        click Memory "./memory.html"
        Prompts[Prompts] -->|condition| LLM
        click Prompts "../../prompting/index.html"
        Prompts -->|support| CognitiveArchitectures
        click Prompts "../../prompting/index.html"
        CognitiveArchitectures -->|proposes| Action[Action]
        click CognitiveArchitectures "./cognitive_architecture.html"
        Action -->|uses| Tools[Tools]
        click Tools "./actions_and_tools.html"
        Tools -->|executed by| Interpreter[Interpreter]
        Interpreter -->|updates| Environment
        

        classDef dataColor fill:#ffcc00,stroke:#333,stroke-width:2px;
        classDef environmentColor fill:#ff9999,stroke:#333,stroke-width:2px;
        classDef llmColor fill:#99ccff,stroke:#333,stroke-width:2px;
        classDef cognitiveColor fill:#cc99ff,stroke:#333,stroke-width:2px;
        classDef memoryColor fill:#99ff99,stroke:#333,stroke-width:2px;
        classDef actionColor fill:#ff9966,stroke:#333,stroke-width:2px;
        classDef toolsColor fill:#ff99cc,stroke:#333,stroke-width:2px;
        classDef interpreterColor fill:#66ffff,stroke:#333,stroke-width:2px;
        classDef internal fill:#f996,stroke:#333,stroke-width:2px;
        classDef external fill:#9f6,stroke:#333,stroke-width:2px;

        class Data dataColor;
        class Environment environmentColor;
        class LLM llmColor;
        class CognitiveArchitectures cognitiveColor;
        class Memory memoryColor;
        class Action actionColor;
        class Tools toolsColor;
        class Interpreter interpreterColor;

        subgraph  
        LLM
        Prompts
        CognitiveArchitectures
        Memory
        Action
        Tools
        DummyNode[Agent Internals]
        end
        click DummyNode "./index.html"
        class DummyNode internal;
        style DummyNode fill:#ff9999,stroke:#fff,color:#000;  

    ```

At the core of agents are data interpreters such as LLMs [models](../architectures/models/index.md), provide the 'brains' that allow for data to be processed, and then acted upon. Actions occur with an [environment](./components/environments.md), with specific [actions and tools](./components/actions_and_tools.md). To be effective, the data interpretation is best accomplished with [cognitive architectures](./components/cognitive_architecture.md) that enable reasoning, planning, and interactions with [memory](./components/memory.md) sources. To coordinate these components effectively [interpreters and executors](./components/cognitive_architecture.md#interpreters). With one agent is found to work, [systems](./systems/index.md) of agents allow for multiple agents to interact with other agents and with people. 


Agents can be quite different! Here are some [examples](./examples/index.md) of agents made both in academic and commercial settings.
