---
title: GenAI Agents
description: When AI systems gain the ability to observe, think, and act
bullets:
  - AI agents can now observe their environment, make decisions, and take actions autonomously
  - Modern agents combine LLMs, memory systems, and specialized tools to solve complex tasks
  - The evolution from simple chains to full agents represents 6 levels of increasing capability
---

## What are AI Agents?

Agents in Gen()AI have access to 'tools' to provide them 'agency' beyond the ability to act, such as in the generation of texts, or controls of other functions or variables. Similar to bots, or other computerized automata, they may have the ability to run discretely, separately from chat interfaces, though it may be preferable and perhaps legally required to have people-in-the-loop to correct, or stop any processes the agent's are pursuing. components.

!!! important "What are agents?"
    An computer system that can execute in the general loop 
    ```mermaid
    graph LR
        A(Observe Environment) --> B[Evaluate]
        B --> C[Propose action]
        C --> D[Act]
        D --> E[Observe]
        E --> A
    ```

_What makes an AI Agent?_ 
LLMs at are at the core of the agent's information evaluation, but they connect with other components to provide the agent with the ability to act.
[LLM models](../architectures/index.md) that power the core of the agent's information evaluation.


!!! example "LLM Core of Agents"
    ```mermaid
    graph LR
        In(("`**In**`")):::input --> LLM["`**LLM**`"]:::llm
        LLM <-.->|Query/Results| Retrieval["`**Retrieval**`"]:::component
        LLM <-.->|Call/Response| Tools["`**Tools**`"]:::component
        LLM <-.->|Read/Write| Memory["`**Memory**`"]:::component
        LLM --> Out(("`**Out**`")):::output
        classDef input fill:#ffefef,stroke:#d49999
        classDef output fill:#ffefef,stroke:#d49999
        classDef llm fill:#f0fff0,stroke:#9cd49c
        classDef component fill:#f0f0ff,stroke:#9999d4
    ```


Agent Internal [components](./components/index.md) including:

- [Prompts](../prompting/index.md)
- [Cognitive Architectures](./components/cognitive_architecture.md)
- [Memory](./components/memory.md)
- [Tools](./components/actions_and_tools.md) or aspects of the environment that can be called upon. 

Additionally, agents exist in [environments](./components/environments.md) where an agent can 'act'.

And finally, [Systems of Agents](./systems/index.md) that can allow for multiple agents with different sets of the components above, to interact and create powerful solutions.

See how these [components](./components/index.md) can be put together in [building agents](./building_agents/index.md).

### AI agents and similar concepts

Based on [this](https://blog.langchain.dev/openais-bet-on-a-cognitive-architecture/), one can classify an agent as to whether it can 

1. Decide the output of a step
2. Decide which steps to take
3. Determine what sequences of steps are available

| # | Process       | Decide Output of Step | Decide Which Steps to Take | Determine What Sequences of Steps are Available |
|---|---------------|-----------------------|----------------------------|-----------------------------------------------|
| 1 | Code          | 👩‍💻                   | 👩‍💻                         | 👩‍💻                                          |
| 2 | [LLM Call](../architectures/generating/index.md)      | 🗣️                   | 👩‍💻 (one step)              | 👩‍💻                                          |
| 3 | Chain         | 🗣                   | 👩‍💻 (multiple steps)        | 👩‍💻                                          |
| 4 | Router        | 🗣️                   | 🗣️  (no cycles)            | 👩‍💻                                          |
| 5 | State Machine | 🗣️                   | 🗣️  (cycles)               | 👩‍💻                                          |
| 6 | Agent         | 🗣️                   | 🗣️                         | 🗣️️                                          |

Just like people, Agents can be part of workflows, and systems that act according to procedures and rules. They are different in that they tend to have more leeway in how they process information, and act, allowing them a degree of autonomy that is often not possible in traditional workflows.


### Where do Agents exist?

Agents exist in 'environments' where they can act. These environments can be as simple as a chat, a complex as a virtual world (Minecraft), or with an actuator in a robotic system to alter something in the physical world.

See [types of agents](./examples/examples.md) for examples of different types of agents.

### How does an Agent work?

A little more detail on how an agent works can be found in the [building agents](./building_agents/index.md) and [components](./components/index.md) sections, but below is an example of some of the elements that enable an agent to work.



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


##  Essential Concepts for Agents

These are the essential concepts for agents and are often implemented in the [components](./components/index.md) of an agent, especially the [cognitive architecture](./components/cognitive_architecture.md).

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

## The Future of Agents

It is possible that limitations fundamental to static agents are not going to be universally optimal. Different cognitive architecutres and enabling tools will provide different degrees of success. That is where cognitive agents that are able to able to 'pull' new skills, and ways of working, into their realm of agency, will be able to bypass limitations inherent in in their original configurations.


That said, it seems that 2025 will be the year of the AI Agent. These will involve agents that perform tasks that can replace the tasks of what some people can do. They will also involve teams or systems of agents that can work together to accomplish complex tasks.

??? abstract "[Automated Design of Agentic Systems](https://github.com/ShengranHu/ADAS)"
    The author's show in their [paper](https://arxiv.org/pdf/2408.08435)  Automated Design of Agentic Systems (ADAS), "which aims to automatically create powerful agentic system designs, including inventing novel building blocks and/or combining them in new ways."
    
    <img width="663" alt="image" src="https://github.com/user-attachments/assets/34c669a4-df02-4fee-9200-6cd1a570c0fb">
    
    The core of their solution involves the following prompt which helps to improve the agent systems.
    
    ```markdown
    You are an expert machine learning researcher testing different agentic systems.
    [Brief Description of the Domain]
    [Framework Code]
    [Output Instructions and Examples]
    [Discovered Agent Archive] (initialized with baselines, updated at every iteration)
    # Your task
    You are deeply familiar with prompting techniques and the agent works from the literature. Your goal is
    to maximize the performance by proposing interestingly new agents ......
    Use the knowledge from the archive and inspiration from academic literature to propose the next
    interesting agentic system design.
    ```



## Useful Resources



??? important "[MRKL agents](https://arxiv.org/abs/2205.00445)"
    MRKL
    ```txt
    "Huge language models (LMs) have ushered in a new era for AI, serving as a gateway to natural-language-based knowledge tasks. Although an essential element of modern AI, LMs are also inherently limited in a number of ways. We discuss these limitations and how they can be avoided by adopting a systems approach. Conceptualizing the challenge as one that involves knowledge and reasoning in addition to linguistic processing, we define a flexible architecture with multiple neural models, complemented by discrete knowledge and reasoning modules. We describe this neuro-symbolic architecture, dubbed the Modular Reasoning, Knowledge and Language (MRKL, pronounced "miracle") system, some of the technical challenges in implementing it, and Jurassic-X, AI21 Labs' MRKL system implementation.
    ```

!!! important "![GitHub Repo stars](https://badgen.net/github/stars/WooooDyy/LLM-Agent-Paper-List) [LLM-Agent-Papers](https://github.com/WooooDyy/LLM-Agent-Paper-List)"

??? note "[The Rise and Potential of Large Language Model Based Agents:A Survey](https://arxiv.org/pdf/2309.07864.pdf) Providess a comprehensive overview of thoughtful ways of considering LLMs."

??? tip "[Agents overview by Lilian Weng](https://lilianweng.github.io/posts/2023-06-23-agent)"
     As usual, a splendid post by Lilian Weng

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/e2b-dev/awesome-ai-agents) [Awesome Agents](https://github.com/e2b-dev/awesome-ai-agents) of a nicely curated list of systems using agents"

!!! note "[Open AI's bet on a cognitive architecture](https://blog.langchain.dev/openais-bet-on-a-cognitive-architecture/)"

!!! note "[Huyen Chip's blog](https://huyenchip.com/2025/01/07/agents.html)"
