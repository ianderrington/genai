## Gen(erative) AI Agents

Agents in Gen()AI agents have access to 'tools' to provide them 'agency' beyond the ability to act, such as in the generation of texts, or controls of other functions or variables.

Similar to bots, or other computerized automata, they may have the ability to run discretely, separately from chat interfaces, though it may be preferable and perhaps legally required to have people-in-the-loop to correct, or stop any processes the agent's are pursuing. components.

???+ important "[tl;dr](#tldr)"
    At a very basic level, an Agent does this, 

    ```mermaid
    graph LR
        A(Observe Environment) --> B[Evaluate]
        B --> C[Propose action]
        C --> D[Act]
        D --> E[Observe]
        E --> A
    ```

Though, more generally it includes these components: 

* [LLM models](../architectures/index.md) that power information evaluation.
* [Prompts](../prompting/index.md),  [chains](./cognitive_architecture.md), [memory](./memory.md) connected with [cognition architectures](./cognitive_architecture.md).
* [Environments](environments.md) where an agent can 'act'.
* [Tools](./actions_and_tools.md), or aspects of the environment that can be called upon. 
* [Interpreters and Executors](./cognitive_architecture.md#interpreters) that are used to process input or output.
* [Systems of Agents](systems.md) that can allow for multiple agents with different sets of the components above, to interact and create powerful solutions.


## Agents in In perspective

Based on [this](https://blog.langchain.dev/openais-bet-on-a-cognitive-architecture/), Agents can be considered as 

???+ important "How components are related""
    | # | Process       | Decide Output of Step | Decide Which Steps to Take | Determine What Sequences of Steps are Available |
    |---|---------------|-----------------------|----------------------------|-----------------------------------------------|
    | 1 | Code          | 👩‍💻                   | 👩‍💻                         | 👩‍💻                                          |
    | 2 | LLM Call      | 🗣️                   | 👩‍💻 (one step)              | 👩‍💻                                          |
    | 3 | Chain         | 🗣                   | 👩‍💻 (multiple steps)        | 👩‍💻                                          |
    | 4 | Router        | 🗣️                   | 🗣️  (no cycles)            | 👩‍💻                                          |
    | 5 | State Machine | 🗣️                   | 🗣️  (cycles)               | 👩‍💻                                          |
    | 6 | Agent         | 🗣️                   | 🗣️                         | 🗣️️                                          |


## Essential Concepts


???+ important "How components interact (clickable)"
    ```mermaid
    graph TB
        Environment[Environment] -->|represented \n by | Information[Information]
        
        click Environment "./environments.html"
        Information -->|interpreted \n with| LLM[LLMs]
        
        LLM <-->|uses| CognitiveArchitectures[Cognitive \nArchitectures]
        click LLM "../architectures/models/index.html"
        CognitiveArchitectures <--> |Find, Create, Read\nUpdate, Delete| Memory[Memory]
        
        classDef promptsColor fill:#f0ad4e,stroke:#333,stroke-width:2px;
        class Prompts promptsColor;
        click Memory "./memory.html"
        Prompts[Prompts] -->|condition| LLM
        click Prompts "../prompting/index.html"
        Prompts -->|support| CognitiveArchitectures
        click Prompts "../prompting/index.html"
        LLM -->|decides| Action[Action]
        click CognitiveArchitectures "./cognitive_architecture.html"
        Action -->|considered \n by| Interpreter[Interpreter]
        click Action "./actions_and_tools.html"
        Interpreter -->|updates| Environment
        click Interpreter "./interpreters.html"

        classDef informationColor fill:#ffcc00,stroke:#333,stroke-width:2px;
        classDef environmentColor fill:#ff9999,stroke:#333,stroke-width:2px;
        classDef llmColor fill:#99ccff,stroke:#333,stroke-width:2px;
        classDef cognitiveColor fill:#cc99ff,stroke:#333,stroke-width:2px;
        classDef memoryColor fill:#99ff99,stroke:#333,stroke-width:2px;
        classDef actionColor fill:#ff9966,stroke:#333,stroke-width:2px;
        classDef interpreterColor fill:#66ffff,stroke:#333,stroke-width:2px;
        classDef internal fill:#f996,stroke:#333,stroke-width:2px;
        classDef external fill:#9f6,stroke:#333,stroke-width:2px;

        class Information informationColor;
        class Environment environmentColor;
        class LLM llmColor;
        class CognitiveArchitectures cognitiveColor;
        class Memory memoryColor;
        class Action actionColor;
        class Interpreter interpreterColor;

        subgraph  
        LLM
        Prompts
        CognitiveArchitectures
        Memory
        Action
        DummyNode[Agent Internals]
        end

        class DummyNode internal;
        style DummyNode fill:#ff9999,stroke:#fff,color:#000;  

    ```

At the core of agents are information interpreters such as LLMs [models](../architectures/models/index.md), provide the 'brains' that allow for information to be processed, and then acted upon. Actions occur with an [environment](./environments.md), with specific [actions and tools](./actions_and_tools.md). To be effective, the information interpretation is best accomplished with [cognitive architectures](./cognitive_architecture.md) that enable reasoning, planning, and interactions with [memory](./memory.md) sources. To coordinate these components effectively [interpreters and executors](./cognitive_architecture.md#interpreters). With one agent is found to work, [systems](./systems.md) of agents allow for multiple agents to interact with other agents and with people. 


Agents can be quite different! Here are some [examples](./examples.md) of agents made both in academic and commercial settings.



### Example Agent Diagram:

To enable that it may require more complicated relations between example components. Below is an example representation.

??? example "Another view of an Agent's components"
    ```mermaid
    graph TB
        Agent((Agent)) -->|makes| decision((Decision))
        decision -->|attempts| action((Action))
        action -->|passes| execution((Execution))
        execution -->|affects| environment((Environment))
        execution -->|generates| agentMemory((Agent's Memory))
        agentMemory -->|informs and effects| Agent
        environment -->|provides| observations((Observations))
        observations -->|informs and effects| Agent
        execution -->|queries| environment
        AgentManager((Agent Manager)) -->|affects| execution
        Agent --> |informs and effects| AgentManager
        AgentManager --> |informs and effects| Agent
    ```

## Agent environemtns and purposes
Agents can exist in different 'domains' all

**Environments**

1. Human+Chat-agents
1. Autonomous chat-agents
1. Agent-systems
1. Embodied agents

**Purpose:**

* Do simple/single things: perhaps ephemeral.
* Do a complex task that may require simple things. Very likely enduring, especially if they are expert systems..
* Doing a list set of complex tasks, perhaps more continuously enduring.


## Models
??? important "https://arxiv.org/abs/2205.00445"

??? important "[MRKL agents](https://arxiv.org/abs/2205.00445)"
    MRKL
    ```txt
    "Huge language models (LMs) have ushered in a new era for AI, serving as a gateway to natural-language-based knowledge tasks. Although an essential element of modern AI, LMs are also inherently limited in a number of ways. We discuss these limitations and how they can be avoided by adopting a systems approach. Conceptualizing the challenge as one that involves knowledge and reasoning in addition to linguistic processing, we define a flexible architecture with multiple neural models, complemented by discrete knowledge and reasoning modules. We describe this neuro-symbolic architecture, dubbed the Modular Reasoning, Knowledge and Language (MRKL, pronounced "miracle") system, some of the technical challenges in implementing it, and Jurassic-X, AI21 Labs' MRKL system implementation.
    ```

## Other concepts
!!! note "Push vs Pull: how an agent gets its ability to perform the next action"
    If an agent requests something, then it is able to act based on a 'pull' action. If it is given everything to begin with, it has a 'push' action. From this Langchain [blog](https://blog.langchain.dev/openais-bet-on-a-cognitive-architecture/)

## The Future 

It is possible that limitations fundamental to static agents are not goin to be universally optimal. Different cognitive architecutres and enabling tools will provide different degrees of success. That is where cognitive agents that are able to able to 'pull' new skills, and ways of working, into their realm of agency, will be able to bypass limitations inherent in in their original configurations.

## References

### Reviews and Lists

!!! important "[LLM-Agent-Papers](https://github.com/WooooDyy/LLM-Agent-Paper-List)"

??? note "[The Rise and Potential of Large Language Model Based Agents:A Survey](https://arxiv.org/pdf/2309.07864.pdf) Providess a comprehensive overview of thoughtful ways of considering LLMs."

??? tip "[Agents overview by Lilian Weng](https://lilianweng.github.io/posts/2023-06-23-agent)"
     As usual, a splendid post by Lilian Weng

!!! code "[Awesome Agents](https://github.com/e2b-dev/awesome-ai-agents) of a nicely curated list of systems using agents"

### Other

!!! note "[Open AI's bet on a cognitive architecture](https://blog.langchain.dev/openais-bet-on-a-cognitive-architecture/)"