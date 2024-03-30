## Gen(erative) AI Agents

Agents in Gen()AI agents have access to 'tools' to provide them 'agency' beyond the ability to act, such as in the generation of texts, or controls of other functions or variables. Similar to bots, or other computerized automata, they may have the ability to run discretely, separately from chat interfaces, though it may be preferable and perhaps legally required to have people-in-the-loop to correct, or stop any processes the agent's are pursuing. components.

???+ important "What are agents?"
    An computer system that can execute in the general loop 
    ```mermaid
    graph LR
        A(Observe Environment) --> B[Evaluate]
        B --> C[Propose action]
        C --> D[Act]
        D --> E[Observe]
        E --> A
    ```

What makes an LLM?
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
    | 2 | [LLM Call](../architectures/generation.md)      | 🗣️                   | 👩‍💻 (one step)              | 👩‍💻                                          |
    | 3 | Chain         | 🗣                   | 👩‍💻 (multiple steps)        | 👩‍💻                                          |
    | 4 | Router        | 🗣️                   | 🗣️  (no cycles)            | 👩‍💻                                          |
    | 5 | State Machine | 🗣️                   | 🗣️  (cycles)               | 👩‍💻                                          |
    | 6 | Agent         | 🗣️                   | 🗣️                         | 🗣️️                                          |


## Essential Concepts

???+ important "How components interact (clickable)"
    ```mermaid
    graph TB
        Environment[Environment] -->|represented \n by | Data[Data]
        
        click Environment "./environments.html"
        Data -->|interpreted \n with| LLM[LLMs]
        click Data "../../data/index.html"
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

        classDef dataColor fill:#ffcc00,stroke:#333,stroke-width:2px;
        classDef environmentColor fill:#ff9999,stroke:#333,stroke-width:2px;
        classDef llmColor fill:#99ccff,stroke:#333,stroke-width:2px;
        classDef cognitiveColor fill:#cc99ff,stroke:#333,stroke-width:2px;
        classDef memoryColor fill:#99ff99,stroke:#333,stroke-width:2px;
        classDef actionColor fill:#ff9966,stroke:#333,stroke-width:2px;
        classDef interpreterColor fill:#66ffff,stroke:#333,stroke-width:2px;
        classDef internal fill:#f996,stroke:#333,stroke-width:2px;
        classDef external fill:#9f6,stroke:#333,stroke-width:2px;

        class Data dataColor;
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

At the core of agents are data interpreters such as LLMs [models](../architectures/models/index.md), provide the 'brains' that allow for data to be processed, and then acted upon. Actions occur with an [environment](./environments.md), with specific [actions and tools](./actions_and_tools.md). To be effective, the data interpretation is best accomplished with [cognitive architectures](./cognitive_architecture.md) that enable reasoning, planning, and interactions with [memory](./memory.md) sources. To coordinate these components effectively [interpreters and executors](./cognitive_architecture.md#interpreters). With one agent is found to work, [systems](./systems.md) of agents allow for multiple agents to interact with other agents and with people. 


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




## General oncepts


### Task Planning & Management

**Methods for generating and tracking tasks:** Autonomous agents can create tasks using handcrafted sequences where the designer explicitly chains them, or through emergent methods like Chains of Thought (CoT), where tasks are generated one at a time in response to evolving circumstances. For example, a navigation agent might have a handcrafted sequence to reach a destination, while an AI in a dynamic environment might use CoT to adapt to new obstacles.

**Knowledge graph utilization:** A knowledge graph serves as a structural memory that can greatly enhance an agent's ability to plan and execute tasks by understanding the relationships between different entities and concepts. An AI agent using a knowledge graph might navigate a user query more efficiently by understanding related topics or concepts.

**Learning from past tasklists:** Implementing machine learning techniques allows agents to analyze previous task lists and outcomes to improve future performance. For instance, an AI learning from past interactions could start to predict user needs and prepare relevant tasks in advance.

### Task Execution & Routing
**Execution strategies:** The choice between specialized agents for specific tasks or a more generalist approach has significant implications for efficiency and adaptability. For example, an assembly line robot might be highly specialized, while a customer service AI might need to route tasks to various internal or external tools and databases.

**Routing methods to appropriate execution points:** Effective task routing ensures that tasks are executed by the most appropriate resource, be it an AI system or a human agent. For instance, a support ticket might be automatically routed to either a FAQ bot or a human agent based on its complexity.

**Ensuring correct execution and handling failures:** Continuous monitoring of task execution and outcome validation is crucial. An AI system might apply error-checking algorithms to ensure a task has been executed correctly and have fallback procedures in case of failure.

### Tool Usage & Learning
**Integration with external tools and models:** Autonomous agents often require integration with specialized tools and models to perform specific functions. For example, an AI might use a natural language processing tool to understand user inquiries better.

**Tool accessibility and connection:** The mechanisms by which an agent accesses and utilizes tools can significantly impact its effectiveness. Ensuring that tools are easily accessible and that the agent has clear methods for interfacing with them is essential for seamless operation.

**Adoption of new tools and leveraging existing libraries:** An adaptable agent should not only utilize existing tools effectively but also have the capability to learn and integrate new ones as they become available, similar to how a recommendation system might improve over time as it incorporates new algorithms.

### Memory & Knowledge
**Storage and recall of information:** Effective storage structures, such as databases or in-memory data grids, are essential for recalling past actions, task lists, results, and feedback. This memory can be structured in a way that mirrors human short-term and long-term memory, with different retention and recall strategies.

**Long-term and short-term memory considerations:** Just as humans rely on both short-term and long-term memory, autonomous agents can be designed with volatile memory for immediate recall and persistent storage for long-term knowledge retention, optimizing response times and data durability.

**Information value decay and efficient retrieval:** Implementing algorithms that recognize the decay in the value of information over time can help maintain the relevance of an agent's knowledge base. For example, a weather prediction agent must prioritize recent data as older information quickly becomes obsolete.

### Self-Improvement

**Utilizing successes and failures to enhance performance:** By analyzing the outcomes of past actions, an autonomous agent can refine its algorithms and improve its decision-making processes. For example, a navigation AI that encountered traffic jams might learn to avoid certain routes at peak times.

**Development of better task lists and tool selection:** Continuous optimization of task lists and tool usage allows an agent to become more efficient. An AI might refine its task list generation by identifying which tasks are most frequently successful and prioritizing similar types of tasks in the future.

**Tracking and measuring improvements:** Setting up key performance indicators and tracking changes over time enables the assessment of an agent's self-improvement. For instance, measuring the reduction in the number of failed tasks after each iteration could indicate the agent's growing proficiency.

### UI/UX (Input/Output)

**Interaction mechanisms with users:** The design of an agent's UI/UX profoundly impacts its accessibility and user satisfaction. For instance, an AI with a natural language interface allows for more intuitive interaction compared to command-line inputs.

**Frequency and methods of communication:** Determining how often and through which channels an agent communicates can balance user engagement and annoyance. An agent might use push notifications for important alerts while aggregating less critical updates for a daily summary.

**Additional sensors for environmental interaction:** An agent equipped with sensors, such as cameras or microphones, can interact with its environment in more nuanced ways. A home assistant device might use such sensors to detect when


!!! note "Push vs Pull: how an agent gets its ability to perform the next action"
    If an agent requests something, then it is able to act based on a 'pull' action. If it is given everything to begin with, it has a 'push' action. From this Langchain [blog](https://blog.langchain.dev/openais-bet-on-a-cognitive-architecture/)

## The Future 

It is possible that limitations fundamental to static agents are not goin to be universally optimal. Different cognitive architecutres and enabling tools will provide different degrees of success. That is where cognitive agents that are able to able to 'pull' new skills, and ways of working, into their realm of agency, will be able to bypass limitations inherent in in their original configurations.

## Useful Resources

??? important "https://arxiv.org/abs/2205.00445"

??? important "[MRKL agents](https://arxiv.org/abs/2205.00445)"
    MRKL
    ```txt
    "Huge language models (LMs) have ushered in a new era for AI, serving as a gateway to natural-language-based knowledge tasks. Although an essential element of modern AI, LMs are also inherently limited in a number of ways. We discuss these limitations and how they can be avoided by adopting a systems approach. Conceptualizing the challenge as one that involves knowledge and reasoning in addition to linguistic processing, we define a flexible architecture with multiple neural models, complemented by discrete knowledge and reasoning modules. We describe this neuro-symbolic architecture, dubbed the Modular Reasoning, Knowledge and Language (MRKL, pronounced "miracle") system, some of the technical challenges in implementing it, and Jurassic-X, AI21 Labs' MRKL system implementation.
    ```

!!! important "[LLM-Agent-Papers](https://github.com/WooooDyy/LLM-Agent-Paper-List)"

??? note "[The Rise and Potential of Large Language Model Based Agents:A Survey](https://arxiv.org/pdf/2309.07864.pdf) Providess a comprehensive overview of thoughtful ways of considering LLMs."

??? tip "[Agents overview by Lilian Weng](https://lilianweng.github.io/posts/2023-06-23-agent)"
     As usual, a splendid post by Lilian Weng

!!! abstract "[Awesome Agents](https://github.com/e2b-dev/awesome-ai-agents) of a nicely curated list of systems using agents"

### Other

!!! note "[Open AI's bet on a cognitive architecture](https://blog.langchain.dev/openais-bet-on-a-cognitive-architecture/)"
