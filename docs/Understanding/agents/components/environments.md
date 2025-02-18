---
title: Environments
description: The operational contexts and interaction spaces for AI agents and systems
bullets:
  - Environments define the boundaries and capabilities of AI agent operations
  - Sandboxed environments provide essential safety and control mechanisms
  - Specialized environments enable diverse applications from chat to virtual worlds
---

Environments consist of the information that agents have access to as well as 'what can be done' to influence the environment. An environment sends information that an agent can receive.

Especially for systems without people-in-the-loop, there is potential for negative things to be done. This could be incorrectly writing files, sending emails/tweets that are inappropriate or spammy, and otherwise corrupting the positive value that an AI agent may provide. Consequently, it is important to have a [sandbox](#sandbox)

### Sandbox

Sandboxes appropriately limit the ability of an Agent to export (write or send) or receieve (read from disk or memory) information beyond the Sandbox. While sandboxes may be fully isolated, sandbox-controllers can provide interaction boundaries that permit some essential degree of information input/output. These boundaries may the ability to only a single file or folder, or a set of domains that are on admit-lists, and refined with block-lists.  

#### Cloud Based Sandboxes

???+ code "![GitHub Repo stars](https://badgen.net/github/stars/e2b-dev/e2b) [E2B.dev sandbox](https://github.com/e2b-dev/e2b)" e2b-sandbox

    E2B.dev provides a cloud-based sandbox to enable AI-agents to within safe confines. 
    Their [Docs](https://e2b.dev/docs?ref=landing-page-get-started)

#### Local Sandboxes

## Example Environments 
### Chat environment 
In a chat environment the GenAI receives text information from a user and then returns text information that is printed for the user to read.
!!! example "[chat Langchain ](https://github.com/langchain-ai/chat-langchain/tree/master)"

### Web environments

??? abstract "[TheAGenticBrowser](https://github.com/TheAgenticAI/TheAgenticBrowser)"
    TheAgenticBrowser is an advanced agent-based system designed for web automation and scraping using natural language interfaces. It employs a three-agent architecture to handle complex web interactions:

    1. **Planner Agent**: Acts as the strategist by:
        - Breaking down user requests into executable steps
        - Creating and adapting plans based on feedback
        - Determining action sequences
    
    2. **Browser Agent**: Serves as the executor by:
        - Directly interacting with web pages
        - Performing actions (clicking, typing, navigation)
        - Extracting information using browser automation
        - Managing DOM interactions and screenshots
    
    3. **Critique Agent**: Functions as quality control by:
        - Analyzing actions and verifying results
        - Guiding workflow progression
        - Determining task completion status

    **Key Features**:
    - Web Research and Analysis across academic papers, travel sites & code repositories
    - Data Extraction for various types (sports, historical, financial data)
    - E-commerce Information scraping (prices, specifications, availability)
    - Smart cross-domain navigation with context-aware traversal

    The system operates in a continuous feedback loop:
    1. Planning Phase: Task analysis and step-by-step execution planning
    2. Execution Phase: Precise browser actions and result reporting
    3. Evaluation Phase: Review, analysis, and decision-making for next steps

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/web-arena-x/webarena) [Webarena:](https://github.com/web-arena-x/webarena)" webarena

    **Developments** "WebArena is a standalone, self-hostable web environment for building autonomous agents. WebArena creates websites from four popular categories with functionality and data mimicking their real-world equivalents. To emulate human problem-solving, WebArena also embeds tools and knowledge resources as independent websites. WebArena introduces a benchmark on interpreting high-level realistic natural language command to concrete web-based interactions. We provide annotated programs designed to programmatically validate the functional correctness of each task."

    ![image](https://github.com/ianderrington/genai/assets/76016868/a7e3ee14-dae3-4052-b4c2-d51ff43d0040)

    [Paper](https://arxiv.org/pdf/2307.13854.pdf)    
    [Webpage](https://webarena.dev/)

### Social Simulations
??? example "[Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/pdf/2304.03442.pdf) provides a town simulation to provide observable information and an interaction world with/between other agents."

??? example "![GitHub Repo stars](https://badgen.net/github/stars/Farama-Foundation/chatarena) [Chat Arena](https://github.com/Farama-Foundation/chatarena) ChatArena is a library that provides multi-agent language game environments."


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/Farama-Foundation/chatarena) [Chat Arena](https://github.com/Farama-Foundation/chatarena)"
    ![image](https://github.com/ianderrington/genai/assets/76016868/d722c347-9505-4930-8325-d2b074bc43c8)



??? example "[Generative agent-based modeling with actions grounded in physical, social, or digital space using Concordia (Google DeepMind, December 2023)
](https://github.com/google-deepmind/concordia)"
    Abstract:
    "Agent-based modeling has been around for decades, and applied widely across the social and natural sciences. The scope of this research method is now poised to grow dramatically as it absorbs the new affordances provided by Large Language Models (LLM)s. Generative Agent-Based Models (GABM) are not just classic Agent-Based Models (ABM)s where the agents talk to one another. Rather, GABMs are constructed using an LLM to apply common sense to situations, act "reasonably", recall common semantic knowledge, produce API calls to control digital technologies like apps, and communicate both within the simulation and to researchers viewing it from the outside. Here we present Concordia, a library to facilitate constructing and working with GABMs. Concordia makes it easy to construct language-mediated simulations of physically- or digitally-grounded environments. Concordia agents produce their behavior using a flexible component system which mediates between two fundamental operations: LLM calls and associative memory retrieval. A special agent called the Game Master (GM), which was inspired by tabletop role-playing games, is responsible for simulating the environment where the agents interact. Agents take actions by describing what they want to do in natural language. The GM then translates their actions into appropriate implementations. In a simulated physical world, the GM checks the physical plausibility of agent actions and describes their effects. In digital environments simulating technologies such as apps and services, the GM may handle API calls to integrate with external tools such as general AI assistants (e.g., Bard, ChatGPT), and digital apps (e.g., Calendar, Email, Search, etc.). Concordia was designed to support a wide array of applications both in scientific research and for evaluating performance of real digital services by simulating users and/or generating synthetic data."
    [Paper](https://arxiv.org/abs/2312.03664)

### Operating Systems
The versatility and interpretability of an cursor and keyboard interface to software and programs within an OS, it provides a integral environment for AI agents to augment and automated otherwise hard-to-program tasks. 

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/OthersideAI/self-operating-computer) [Self Operating Computer](https://github.com/OthersideAI/self-operating-computer)"


### Embodied environments

Embodied environments involve acuiring information from reality using recording instrumentation like cameras, microphones. 

#### Self-aware embodiments

Self aware embodiments involve knowing a measured of an actuating device, such as the angle or extension of a robotic limb. 

### Gaming
!!! abstract "[Madrona Game Enging](https://madrona-engine.github.io/)"

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/MineDojo/Voyager) [Voyager, an Agent in Minecraft](https://github.com/MineDojo/Voyager)"
    [Website](https://voyager.minedojo.org/)
    [Paper](https://arxiv.org/pdf/2305.16291.pdf)


