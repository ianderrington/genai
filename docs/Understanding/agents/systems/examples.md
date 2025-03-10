---
title: Agent System Examples
description: Real-world implementations and case studies of multi-agent systems
bullets:
  - Practical examples demonstrate different approaches to agent collaboration
  - Case studies highlight successful agent system architectures
  - Implementation patterns show how to build effective agent networks
---

# Agent System Examples

## Collaborative Development Systems
Examples of agent systems working together to develop software and solutions.

??? abstract "[TheAgentCompany](https://github.com/TheAgentCompany/TheAgentCompany)" theagentcompany
    TheAgentCompany provides a multi-agent environment designed for collaborative problem-solving and development, implementing a comprehensive benchmark for evaluating AI agents in realistic workplace scenarios. Built using [OpenHands](https://github.com/All-Hands-AI/OpenHands) agent framework.
    
    <img width="558" alt="image" src="https://github.com/user-attachments/assets/5a33fda7-ca3a-45de-9f5e-4dfd4d675d72" />
    
    ### Environment Architecture
    1. **Local Workspace**
        - [Docker](https://www.docker.com/)-based sandboxed environment for safe execution
        - Pre-installed software tools and development environment
        - Isolated from evaluation machine for security
        - Browser ([Playwright](https://playwright.dev/)), code editor, and Linux terminal access

    2. **Intranet Services**
        - **[GitLab](https://about.gitlab.com/)**: Code repositories and tech-oriented wiki pages
        - **[OwnCloud](https://owncloud.com/)**: Document storage and collaborative editing
        - **[Plane](https://github.com/makeplane/plane)**: Issue tracking, sprint cycles, product roadmaps
        - **[RocketChat](https://www.rocket.chat/)**: Internal real-time messaging and collaboration
        - All services are reproducible and reset-able with mock data

    3. **Simulated Colleagues**
        - Built on [Sotopia](https://github.com/sotopia-lab/sotopia) platform for human-like interactions
        - Detailed profiles including name, role, responsibilities, project affiliations
        - Backed by [Claude-3.5-Sonnet](https://www.anthropic.com/news/claude-3-family) for consistent behavior
        - Support for direct messages and channel communications

    ### Task Implementation
    1. **Task Components**
        - Detailed task intent in natural language
        - Multiple checkpoints representing milestones
        - Programmatic evaluators for verification
        - Environment initialization and cleanup code

    2. **Checkpoint System**
        - **Action Completion**: Tool usage, navigation, data collection
        - **Data Accuracy**: Output correctness and completeness
        - **Collaboration**: Quality of colleague interactions
        - Point-based scoring for partial completion

    3. **Evaluation Methods**
        - **Deterministic Evaluators**
            - Python functions for objective checks
            - Environment state verification
            - File system change monitoring
            - Browser history tracking
            - Action sequence validation
        
        - **LLM-based Evaluators**
            - Complex deliverable assessment
            - Predefined evaluation rubrics
            - Reference output comparison
            - Subjective quality measurement

    ### Scoring Implementation
    1. **Full Completion Score**
        ```
        Sfull = 1 if all checkpoints passed else 0
        ```

    2. **Partial Completion Score**
        ```
        Spartial = 0.5 * (points_achieved/total_points) + 0.5 * Sfull
        ```

    3. **Efficiency Metrics**
        - Number of LLM calls per task
        - Token usage and associated costs
        - Step count tracking
        - Execution time monitoring

        
    ### Common Failure Categories
    1. **Common Sense Deficits**
        - Missing implicit assumptions
        - File type inference failures
        - Context understanding issues
        - Basic workflow comprehension gaps

    2. **Social Interaction Issues**
        - Incomplete communication flows
        - Missed social cues
        - Follow-up failures
        - Context switching problems

    3. **Technical Challenges**
        - Complex UI navigation
        - Popup handling difficulties
        - Multi-step process management
        - Tool integration issues

    4. **Task Execution Problems**
        - Invalid shortcut creation
        - Critical step omission
        - Incorrect assumption chains
        - Resource management issues

    ### Performance Metrics
    - Success rate across different task types
    - Platform-specific performance analysis
    - Cost-efficiency measurements
    - Step count optimization
    - Token usage efficiency

    ### Resources
    - [Website](https://the-agent-company.com)
    - [GitHub Repository](https://github.com/TheAgentCompany/TheAgentCompany)
    - [Evaluation Results](https://github.com/TheAgentCompany/experiments)




!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/camel-ai/camel) [CAMEL: Communicative Agents for "Mind" Exploration of Large Scale Language Model Society (King Abdullah University, March 2023)](https://github.com/camel-ai/camel)"

    Paper: [https://arxiv.org/abs/2303.17760](https://arxiv.org/abs/2303.17760)

    Abstract:
    "The rapid advancement of conversational and chat-based language models has led to remarkable progress in complex task-solving. However, their success heavily relies on human input to guide the conversation, which can be challenging and time-consuming. This paper explores the potential of building scalable techniques to facilitate autonomous cooperation among communicative agents and provide insight into their "cognitive" processes. To address the challenges of achieving autonomous cooperation, we propose a novel communicative agent framework named role-playing. Our approach involves using inception prompting to guide chat agents toward task completion while maintaining consistency with human intentions. We showcase how role-playing can be used to generate conversational data for studying the behaviors and capabilities of chat agents, providing a valuable resource for investigating conversational language models. Our contributions include introducing a novel communicative agent framework, offering a scalable approach for studying the cooperative behaviors and capabilities of multi-agent systems, and open-sourcing our library to support research on communicative agents and beyond. "

    GitHub: [https://github.com/camel-ai/camel](https://github.com/camel-ai/camel)

    Article: [https://blog.devgenius.io/coded-example-of-langchain-enabled-cooperative-agents-4859d294b197](https://blog.devgenius.io/coded-example-of-langchain-enabled-cooperative-agents-4859d294b197)


??? abstract "[Agent Laboratory](https://github.com/SamuelSchmidgall/AgentLaboratory)" agentlaboratory
    A research assistant framework that transforms human research ideas into complete research reports and code repositories. Designed to complement human researchers rather than replace them.

    ### Research Team Structure
    - **PhD Agent**: Research planning and literature review lead
    - **Postdoc Agent**: Expert guidance and methodology refinement
    - **ML Engineer**: Code implementation and technical development
    - **Professor Agent**: Quality evaluation and research direction

    ### How It Works
    1. **Literature Review**
        - Semantic search across research papers
        - Contextual understanding of related work
        - Synthesis of key findings and gaps
        - Automatic citation management

    2. **Experimentation**
        - Collaborative experimental design
        - Iterative code development and testing
        - Results analysis and validation
        - Documentation of findings

    3. **Report Writing**
        - Academic paper structure
        - Integration of results and literature
        - LaTeX formatting and figure generation
        - Citation and reference management

    ### Operation Modes
    1. **Autonomous Mode**
        - Self-directed research workflow
        - Internal peer review process
        - Continuous quality monitoring
        - Independent decision-making

    2. **Co-Pilot Mode**
        - Human-AI collaboration
        - Regular feedback checkpoints
        - Adjustable interaction levels
        - Responsive to researcher guidance

    ### Key Tools
    1. **MLE-Solver**
        - Machine learning code generation
        - Self-improving algorithms
        - Iterative refinement process
        - Error detection and correction

    2. **Paper-Solver**
        - Research synthesis
        - Academic writing
        - Results visualization
        - Format compliance

    ### External Integrations
    - [arXiv](https://arxiv.org/) for literature access
    - [Hugging Face](https://huggingface.co/) for ML models
    - Python environment for experiments
    - LaTeX for document preparation

    ### Resources
    - [Website](https://agentlaboratory.github.io/)
    - [Paper](https://arxiv.org/abs/2501.04227)
    - [GitHub Repository](https://github.com/SamuelSchmidgall/AgentLaboratory)

    <img width="649" alt="image" src="https://github.com/user-attachments/assets/b5144cb2-01e1-4ada-b969-e8185bd8f5fb" />
    <img width="612" alt="image" src="https://github.com/user-attachments/assets/117ff003-2d0a-4424-b37c-4cedba197eb5" />


??? abstract "ChatDev - Collaborative Software Development"
    [ChatDev](https://github.com/OpenBMB/ChatDev) is a communicative agent approach for developing solutions using ML models. It works with Camel to create agentic systems and provides a framework for creating systems of agents to produce software-enabled products.

??? important "Experiential Co-Learning of Software-Developing Agents"
    This [system](https://arxiv.org/pdf/2312.17025.pdf) introduces a multi-agent paradigm with three key modules:
    - **Co-tracking**: Promotes interactive rehearsals between agents
    - **Co-memorizing**: Finds shortcuts based on past experiences
    - **Co-reasoning**: Enhances instructions using collective experience pools

## Task-Specific Agent Teams

??? abstract "Polaris - Healthcare Safety System"
    [Polaris](https://arxiv.org/html/2403.13313v1) is a safety-focused LLM constellation architecture for healthcare, ensuring safe and compliant AI chatbots through multi-agent collaboration.
    

??? tip "Showrunner Agents - Content Generation"
    [Showrunner Agents](https://fablestudio.github.io/showrunner-agents/) use LLMs to generate episodic content through a creative and multi-faceted process.

??? abstract "MAgICoRe - Reasoning Framework"
    [MAgICoRe](https://github.com/dinobby/MAgICoRe) implements a multi-agent system with solver, reviewer, and refiner roles to enable improved solutions through collaborative refinement.

## Learning and Teaching Systems

??? tip "Theory of Mind Teaching"
    [This research](https://arxiv.org/pdf/2306.09299.pdf) explores how language models can teach weaker agents using Theory of Mind concepts to improve student performance. [Implementation](https://github.com/swarnaHub/ExplanationIntervention)

??? tip "Multi-Agent Debate for Improvement"
    [This approach](https://arxiv.org/pdf/2305.14325.pdf) uses multiple language model instances to debate and refine responses, improving factuality and reasoning through collaborative critique.

## Production Systems

??? abstract "Agency Swarm - Production Framework"
    [Agency Swarm](https://github.com/VRSEN/agency-swarm) provides a language for creating interacting systems of agents in production environments.

??? abstract "Council - Team Orchestration"
    [Council](https://github.com/chain-ml/council) enables the creation of networks of agents to form full-fledged teams for production outputs.

??? tip "OpenAI Assistants"
    OpenAI's [AI assistants](https://platform.openai.com/docs/assistants/overview) system allows integration of different assistants within a chat using the `@` symbol, enabling collaborative problem-solving.

## Research Implementations

??? tip "Generative Agents Simulation"
    [This research](https://arxiv.org/pdf/2304.03442.pdf) implements a simulated town where agents with different personalities interact and evolve. Key features include:
    - Observation and reflection memory systems
    - Recursive planning capabilities
    - Dynamic environment interactions
    [Implementation](https://github.com/a16z-infra/ai-town)

??? abstract "SocraticAI - Conversational Problem Solving"
    [SocraticAI](https://github.com/RunzheYang/SocraticAI) leverages the power of conversation between agents to solve complex problems through structured dialogue.

??? tip "Society of Minds"
    Based on Minsky's theory, this [research](https://arxiv.org/pdf/2305.17066.pdf) implements a multi-agent debate approach where agents collectively review and refine answers through structured interaction.

## Emerging Architectures

??? abstract "Hierarchical Autonomous Agent Swarm (HAAS)"
    [HAAS](https://github.com/daveshap/OpenAI_Agent_Swarm) implements self-directing, self-correcting, and self-improving agent systems through hierarchical organization.

??? tip "Swarm Intelligence Systems"
    [Swarms](https://github.com/kyegomez/swarms) explores large-scale agent coordination, focusing on emergent behaviors and collective intelligence in multi-agent systems.
