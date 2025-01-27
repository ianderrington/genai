---
title: Building AI Agents
description: A comprehensive guide to the architecture, components, and deployment of modern AI agent systems
bullets:
  - The agent ecosystem has evolved from basic LLM frameworks to sophisticated architectures with state management and security
  - Modern agent stacks integrate specialized components for memory, tools, hosting, and observability
  - Emerging standards and protocols are shaping the future of agent development and deployment
---

# Building Agents

Building agents shares a degree of overlap with the building of applications, but we write about it here because of its unique importance. The AI agents stack has evolved significantly since 2022-2023, moving beyond simple LLM frameworks to more sophisticated agent architectures.

## The Evolution of AI Agents

The AI agent landscape has evolved significantly since the initial release of frameworks like LangChain (Oct 2022) and LlamaIndex (Nov 2022). While these started as simple LLM frameworks, the field has grown to encompass more sophisticated architectures addressing key challenges:

1. **State Management**: Agents require sophisticated handling of:
    - Message and event history
    - Long-term memories
    - Execution state in agentic loops

2. **Tool Execution**: Agents need secure and reliable ways to:
    - Execute LLM-generated actions
    - Handle tool dependencies
    - Manage execution environments
    - Process tool results

### Key Architectural Considerations

When building agents, several architectural decisions are crucial:

1. **State Persistence**
    - File-based serialization vs. Database-backed state
    - Query capabilities for historical data
    - Scaling with conversation length
    - Multi-agent state management

2. **Tool Security**
    - Sandbox environments for arbitrary code execution
    - Dependency management
    - Access control and authorization
    - Input validation and sanitization

3. **Production Deployment**
    - REST API design for agent interactions
    - Data normalization for agent state
    - Environment recreation for tool execution
    - Scaling to millions of agents


## Future Trends

The agent ecosystem is still in its early stages, with several emerging trends:

1. **Standardization**
    - Movement toward common tool schemas (like OpenAI's function calling format)
    - Emerging patterns for agent APIs and deployment
    - Cross-framework compatibility for tools and agents

2. **Production Focus**
    - Shift from notebook-based development to production services
    - Growing importance of observability and monitoring
    - Need for enterprise-grade security and compliance

3. **Tool Ecosystem Growth**
    - Specialized tool providers for common tasks
    - Authentication and access control frameworks
    - Industry-specific tool collections


## The Stack

The modern AI agent stack can be broken down into several key layers, each addressing specific challenges in agent development. These include:


- [Agent Hosting & Serving Solutions](#agent-hosting--serving-solutions)
- [Agent Observability Solutions](#agent-observability-solutions)
- [Agent Frameworks](#agent-frameworks)
- [Agent Memory Solutions](#agent-memory-solutions)
- [Tool Libraries](#tool-libraries)
- [Model Serving Solutions](#model-serving-solutions)

with some nice examples of successful [Vertical AI Agent Solutions](#vertical-ai-agent-solutions).


### Agent Hosting & Serving Solutions

| Platform | Description |
|----------|-------------|
| [Letta](https://letta.com/) | Agent deployment and hosting platform |
| [LangGraph](https://github.com/langchain-ai/langgraph) | Graph-based orchestration for language model agents |
| [Assistants API](https://platform.openai.com/docs/assistants/overview) | OpenAI's API for deploying and managing AI assistants |
| [Amazon Bedrock Agents](https://aws.amazon.com/bedrock/agents/) | AWS-based agent hosting and management service |
| [LiveKit Agents](https://livekit.io/) | Real-time agent deployment and communication platform |

These platforms provide infrastructure and tools for deploying, hosting, and serving AI agents at scale, each with different specializations and integration capabilities.

Additional considerations for hosting solutions:

- Scalability and performance requirements
- Integration capabilities with existing systems
- Cost and resource optimization
- Security and compliance features

### Agent Observability Solutions

| Platform | Description |
|----------|-------------|
| [LangSmith](https://smith.langchain.com/) | LangChain's platform for debugging, testing, evaluating, and monitoring LLM applications and agents |
| [Arize](https://arize.com/) | ML observability platform with LLM monitoring capabilities |
| [Weave](https://www.weave.ai/) | AI observability and monitoring platform |
| [Langfuse](https://langfuse.com/) | Open source LLM engineering platform for monitoring and analytics |
| [AgentOps.ai](https://www.agentops.ai/) | Specialized platform for monitoring and optimizing AI agents |
| [Braintrust](https://www.braintrustdata.com/) | LLM evaluation and monitoring platform |

These platforms provide specialized tools for monitoring, debugging, and analyzing the performance of AI agents and LLM applications in production environments.

Key observability features to consider:

- Real-time monitoring and alerting
- Performance analytics and tracing
- Debug tooling and replay capabilities
- Cost tracking and optimization

### Agent Frameworks

These frameworks provide different approaches and tools for building AI agents, from simple single-agent systems to complex multi-agent orchestrations. Each has its own strengths and specialized use cases.

| Framework | Description |
|-----------|-------------|
| [LangGraph](https://github.com/langchain-ai/langgraph) | LangChain's framework for building structured agents using computational graphs |
| [Letta](https://letta.com/) | Framework for building and deploying AI agents with built-in orchestration |
| [Open Hands](https://github.com/All-Hands-AI/OpenHands) | Collaborative AI systems |
| [AutoGen](https://microsoft.github.io/autogen/) | Microsoft's framework for building multi-agent systems with automated agent orchestration |
| [LlamaIndex](https://www.llamaindex.ai/) | Framework for building RAG-enabled agents and LLM applications |
| [CrewAI](https://github.com/joaomdmoura/crewAI) | Framework for orchestrating role-playing autonomous AI agents |
| [DSPy](https://github.com/stanfordnlp/dspy) | Stanford's framework for programming with foundation models |
| [Phidata](https://github.com/phidatahq/phidata) | AI-first development framework for building production-ready AI applications |
| [Semantic Kernel](https://github.com/microsoft/semantic-kernel) | Microsoft's orchestration framework for LLMs |
| [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Framework for building autonomous AI agents with GPT-4 |
| [L3AGI](https://github.com/l3vels/L3AGI) | Open-source tool that enables AI Assistants to collaborate together as effectively as human teams. |
| [Open GPTs](https://github.com/langchain-ai/opengpts) | Provides a similar experience to OpenAI GPTs and assistants, using Langchain components |
| [CAMEL](https://github.com/camel-ai/camel) | Communicative Agents for "Mind" Exploration of Large Scale Language Model Society |



Framework selection considerations:

- State Management: How agent state is serialized and persisted
- Context Window Management: How data is compiled into LLM context
- Multi-Agent Communication: Support for agent collaboration
- Memory Handling: Techniques for managing long-term memory
- Model Support: Compatibility with open-source models

### Agent Memory Solutions

Agent memory is based off of [vector databases](../components/vector_databases.md), but can be made easier with platform solutions for managing agent memory, enabling long-term context retention and efficient memory management for AI applications.

| Platform | Description |
|----------|-------------|
| [Letta](https://github.com/letta-ai/letta) | System for extending LLM context windows with infinite memory via memory management |
| [Zep](https://www.getzep.com/) | Long-term memory store for LLM applications and agents |
| [LangMem](https://python.langchain.com/docs/how_to/chatbots_memory/) | LangChain's memory management system for conversational agents |
| [Mem0](https://github.com/mem0ai/mem0) | Memory management and persistence solution for AI assistants and agents |


Memory architecture considerations:

- Persistence strategies
- Context window optimization
- Memory retrieval mechanisms
- Integration with vector stores

### Tool Libraries

Tools can be categorized into three main types:

1. **Knowledge Augmentation**
    - Text retrievers
    - Image retrievers
    - Web browsers
    - SQL executors
    - Internal knowledge base access
    - API integrations (news, weather, stocks)

2. **Capability Extension**
    - Calculators
    - Code interpreters
    - Calendar tools
    - Unit converters
    - Language translators
    - Multimodal converters (text-to-image, speech-to-text)

3. **Write Actions**
    - Database modifications
    - Email sending
    - File system operations
    - API calls with side effects
    - Transaction processing

These libraries provide specialized tools and capabilities that can be integrated into AI agents to enhance their ability to interact with various systems and perform specific tasks.

| Library | Description |
|---------|-------------|
| [Composio](https://www.composio.dev/) | Tool composition and orchestration library for AI agents |
| [Browserbase](https://browserbase.com/) | Browser automation and web interaction tools for AI agents |
| [Exa](https://exa.ai/) | AI-powered search and knowledge tools library |
| [Model Context Protocol (MCP)](https://modelcontextprotocol.io/tutorials/building-mcp-with-llms) | A protocol for enabling LLMs to use tools |


#### Tool Integration Protocols

A key challenge in building agents is standardizing how they interact with tools. Several protocols have emerged to address this

##### Model Context Protocol (MCP)

[Model Context Protocol](https://modelcontextprotocol.io/tutorials/building-mcp-with-llms) provides a standardized way for LLMs to interact with tools and external systems. Key features include:

1. **Resource Management**
    - Structured exposure of external resources
    - Schema definitions for data access
    - Standardized resource querying

2. **Tool Definitions**
    - Common format for tool specifications
    - Input/output validation
    - Error handling patterns

3. **Prompt Templates**
    - Standardized prompt formats
    - Context management
    - Response handling

##### Other Tool Integration Standards

| Protocol | Description |
|----------|-------------|
| [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling) | JSON Schema-based function definitions |
| [LangChain Tools](https://python.langchain.com/docs/how_to/#tools) | Tool specification format for LangChain agents |
| [Semantic Kernel Skills](https://github.com/microsoft/semantic-kernel) | Microsoft's approach to defining reusable AI capabilities |

#### Best Practices for Tool Integration

When implementing tool protocols:

1. **Security Considerations**
    - Validate all inputs before execution
    - Implement proper access controls
    - Monitor tool usage and rate limits

2. **Error Handling**
    - Graceful failure modes
    - Clear error messages
    - Recovery strategies

3. **Documentation**
    - Clear tool specifications
    - Usage examples
    - Integration guides

4. **Testing**
    - Tool validation
    - Integration testing
    - Performance monitoring


### Model Serving Solutions

These platforms provide various solutions for deploying and serving AI models, from local deployment to cloud-based infrastructure, with different performance and scaling capabilities.

| Platform | Description |
|----------|-------------|
| [vLLM](https://github.com/vllm-project/vllm) | High-performance inference engine for LLM serving |
| [Ollama](https://ollama.ai/) | Run and serve open-source LLMs locally |
| [LM Studio](https://lmstudio.ai/) | Desktop application for running and serving local LLMs |
| [Together AI](https://www.together.ai/) | Platform for deploying and serving large language models |
| [Fireworks AI](https://fireworks.ai/) | Infrastructure for serving and fine-tuning LLMs |
| [Groq](https://groq.com/) | High-performance LLM inference and serving platform |
| [OpenAI](https://openai.com/) | API platform for serving GPT and other AI models |
| [Anthropic](https://www.anthropic.com/) | Platform for serving Claude and other AI models |
| [Mistral AI](https://mistral.ai/) | Platform for serving efficient and powerful language models |
| [Google Gemini](https://deepmind.google/technologies/gemini/) | Google's platform for serving multimodal AI models |



### Agent Sandboxes

| Platform | Description |
|----------|-------------|
| [E2B](https://e2b.dev/) | Secure sandboxed environments for running and testing AI agents |
| [Modal](https://modal.com/) | Cloud platform for running AI agents in isolated environments |

Note: These platforms provide secure, isolated environments for testing and running AI agents, ensuring safe execution and development of agent capabilities.



### Vertical AI Agent Solutions

| Company | Description/Focus Area |
|---------|----------------------|
| [Decagon](https://decagon.ai/) | AI agent development platform |
| [Sierra](https://sierra.ai/) | Environmental and sustainability-focused AI solutions |
| [Replit](https://replit.com/) | Cloud development environment and AI coding tools |
| [Perplexity](https://www.perplexity.ai/) | AI-powered search and discovery |
| [Harvey](https://harvey.ai/) | Legal AI solutions |
| [Please AI](https://please.ai/) | Multi-agent systems and orchestration |
| [Cognition](https://www.cognition-labs.com/) | Cognitive computing and AI reasoning |
| [Factory](https://www.factory.ai/) | AI automation and manufacturing solutions |
| [Dosu](https://dosu.dev/) | AI code writing agent and github plugin |
| [Lindy](https://lindy.ai/) | AI Automated emailing and scheduling|
| [11x](https://11x.ai/) | Digital Human Workers |

## Interesting and notabl research and libraries


!!! abstract "[Open GPTs](https://github.com/langchain-ai/opengpts) Enables the creation of agents and assistants, using Langchain components"

??? abstract "[The Open Source AI Assistant Framework & API](https://github.com/superagent-ai/superagent)" superagent
    [Docs](https://docs.superagent.sh/overview/overview/introduction)

??? abstract "[Agenta-AI](https://github.com/Agenta-AI/agenta) provides end-to-end LLM developer platform. It provides the tools for prompt engineering and management, ⚖️ evaluation, human annotation, and 🚀 deployment. All without imposing any restrictions on your choice of framework, library, or model." 

??? abstract "[Jarvis](https://github.com/microsoft/JARVIS/) provides essential components to enable LLM-agents to have tools. They provide ToolBench, HuggingGPT, and EasyTool at present." jarvis

??? important "[Easy Tool: Enhancing LLM-based Agents with Concise Tool Instruction](https://arxiv.org/pdf/2401.06201.pdf) provides a framework transforming diverse and lengthy tool documentation into a unified and concise tool instruction for easier tool usage" easy-tool

    **Development**
    Easy Tool follows a simple pattern of: 1. Task Planning, 2. Tool Retrieval, 3. Tool Selection and 4. Tool Execution, coupled with thoughtful prompting to enable SOT tool usage over multiple models. 

    **Problem**
    Using new tools, software,  especially can be challenging for LLMs (and people too!), especially with a poor or redundant documentation and a variety of usage manners. 
    <img width="733" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4b17492e-c227-4633-9620-437fb08ab8c9">

    **Solution**
    Easy tool provides "a simple method to condense tool documentation into more concise and effective tool instructions."

    ```markdown
         I: Tool Description Generation
         /* I: Task prompt */
         Your task is to create a concise and effective tool usage description based on the tool documentation. You should ensure the description only contains the purposes of the
         tool without irrelevant information. Here is an example:
         /* Examples */
         {Tool Documentation}
         Tool usage description:
         {Tool_name} is a tool that can {General_Purposes}.
         This tool has {Number} multiple built-in functions:
         1. {Function_1} is to {Functionality_of_Function_1} 2. {Function_2} is to ...
         /* Auto generation of tool description */ {ToolDocumentationof'AviationWeatherCenter'} Tool usage description:
         'Aviation Weather Center' is a tool which can provide official aviation weather data...
         II: Tool Function Guidelines Construction
         /* Task prompt */
         Your task is to create the scenario that will use the tool.
         1. You are given a tool with its purpose and its parameters list. The scenario should adopt the parameters in the list.
         2. If the parameters and parameters are both null, you
         should set: {"Scenario": XX, "Parameters":{}}.
         Here is an example:
         /* Examples */
         {Tool_name} is a tool that can {General_Purposes}. {Function_i} is to {Functionality_of_Function_i} {Parameter List of Function_i}
         One scenario for {Function_i} of {Tool_name} is: {"Scenario": XX, "Parameters":{XX:XX}}
         /* Auto-construction for Tool Function Guidelines */
         'Ebay' can get products from Ebay in a specific country. 'Product Details' in 'Ebay' can get the product details for a given product id and a specific country.
         {Parameter List of 'Product Details'}
         One scenario for 'Product Details' of 'Ebay' is:
         {"Scenario": "if you want to know the details of the product with product ID 1954 in Germany from Ebay", "Parameters":{"product_id": 1954, "country": "Germany"}}.
    ```
    <img width="418" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/caed1a08-4761-4809-8a05-c2d026e26281">

    **Results** 
    The performance is SOT over multiple models. ChatGPT, ToolLLaMA-7B, Vicuna-7B, Mistral-Instruct-&B and GPT-4
    <img width="820" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5a4a1b6d-986c-491e-9642-c28f6d56f771">


??? important "[Hugging GPT: Solving AI Tasks with ChatGPT and its Friends in Hugging Face](https://arxiv.org/abs/2303.17580)" hugging-gpt
    
    **Development** 
    
    Hugging GPT enables LLM models to call other models via the Hugging Face Repo
    
    **Problem**
    
    LLMs are not the best task for all tasks. Enabling LLMS to use task-specific models can improve the quality of the results.
    
    **Solution**
    Hugging GPT provides an intervace for LLMs by breaking it down into 1. Task Planning, 2. Model Selection, 3. Task Execution, and 4. Response Generation 

    <img width="724" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/293351bf-63c8-40d3-a972-90207a5e409a">
    
    <img width="740" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a5aa16d3-4468-4413-b537-fb63298b285b">
    <img width="696" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/9cd2a6f8-5d6c-47a0-81f2-74258136880a">

    **Results**
    The results provide substiantial evidence that HuggingGPT can enable successful single, sequential, and graph-based tasks.
    


## Atomatic building Agents

??? abstract "[Automated Design of Agentic Systems](https://github.com/ShengranHu/ADAS)" adas
    **Developments** In their [paper](https://arxiv.org/pdf/2408.08435) the authors revealmeta-agents that observe adn critique prompting nd efforts to enable better agents. In their own words: 
    > "The core concept of Meta Agent Search is to instruct a meta agent to iteratively create interestingly new agents, evaluate them, add them to an archive that stores discovered agents, and use this archive to help the meta agent in subsequent iterations create yet more interestingly new agents."
    ![image](https://github.com/user-attachments/assets/1a9459c9-aecf-4c25-9231-cbd89fb51334)
    ![image](https://github.com/user-attachments/assets/3afbf915-2b0b-4b04-be85-3f04445aa697)
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

## Resources

??? abstract "[Awesome Agents](https://github.com/slavakurilyak/awesome-ai-agents)"

