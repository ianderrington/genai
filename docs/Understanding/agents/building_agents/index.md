---
title: Building AI Agents
description: A comprehensive guide to the architecture, components, and deployment of modern AI agent systems
bullets:
  - The agent ecosystem has evolved from basic LLM frameworks to sophisticated architectures with state management and security
  - Modern agent stacks integrate specialized components for memory, tools, hosting, and observability
  - Emerging standards and protocols are shaping the future of agent development and deployment
---

# Building Agents

Building agents shares a degree of overlap with the building of applications, but we write about it here because of its unique importance. The AI agents stack has multiple frameworks and components to enable sophisticated agent architectures.

We describe the stack in [The AI Agent Stack](./stack.md), how to [evaluate and compare agents](./evaluating_and_comparing.md), and how to [optimize agents](./optimizing_agents.md).

Below you will find a description of the evolution of agents and the different strategies for building them.

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

## Strategies for Building Agents

### Development Approaches

#### Low/No Code vs Code-Centric Approaches

The development of AI agents can follow two main paths, each with its own advantages and use cases:

| Aspect | Low/No Code 🔌 | Hybrid 🔄 | Code-Centric 💻 |
|--------|---------------|------------|----------------|
| **Key Benefits** | Easy to use, rapid deployment | Best of both worlds | Full customization, scalability |
| **Best For** | Simple agents, chatbots | Evolving projects | Complex systems, enterprise |
| **Delivery Speed** | Days - Weeks ⚡ | Variable 📅 | Weeks - Months 🗓️ |
| **Maintenance Difficulty** | Low (platform handles) 🟢 | Medium (split scope) 🟡 | High (full stack) 🔴 |
| **Control** | Limited 🔒 | Balanced ⚖️ | Complete 🛠️ |
| **Examples** | GPTs, Zapier, Bubble 🤖 | GPTs + Custom Backend | LangChain, AutoGen 🚀 |

??? abstract "Low/No Code vs Code-Centric Approaches (expanded)"
    | Aspect | Low/No Code | Code-Centric | Hybrid |
    |--------|-------------|--------------|---------|
    | **Development Speed** | Fast (days/weeks) | Slower (weeks/months) | Medium (varies by component) |
    | **Technical Expertise** | Minimal | High | Mixed |
    | **Customization** | Limited | Extensive | Moderate to High |
    | **Scalability** | Platform-dependent | Highly scalable | Scalable with proper architecture |
    | **Integration Depth** | Pre-built connectors | Custom integrations | Mix of both |
    | **Maintenance** | Platform-managed | Team-managed | Split responsibility |
    | **Cost Structure** | Platform subscriptions | Development resources | Combined costs |
    | **Use Cases** | • Simple automations<br>• Chatbots<br>• Basic workflows | • Complex agents<br>• Custom solutions<br>• Enterprise systems | • MVP to production<br>• Scaled applications<br>• Enterprise solutions |
    | **Examples** | • OpenAI GPTs<br>• Zapier<br>• Bubble.io | • LangChain<br>• AutoGen<br>• Custom solutions | • GPTs + custom backend<br>• Visual frontend + coded agents |
    | **Team Size** | Individual to small team | Development team | Cross-functional team |
    | **Iteration Speed** | Very fast | Depends on complexity | Fast for no-code components |
    | **Security Control** | Platform-dependent | Full control | Balanced control |

#### Workflow Automation vs AI Agents

A key distinction in modern AI systems is between AI Agents and Workflow Automation approaches:

| Aspect | AI Agents and Teams | Workflow Automation |
|--------|-------------------|-------------------|
| **How?** | LLMs direct its own action based on feedback | LLM is embedded in, or controls flow in predefined paths |
| **Core Functionality** | Language understanding, contextual assistance | Trigger-based actions, workflow automation |
| **Ease of Use** | Requires setup and training | User-friendly, often no coding needed |
| **Integration and Customization** | Code-based integration with custom and commercial apps | Manual-integration with multiple apps/services |
| **Pricing** | LLM API and observability costs | LLM API costs and scale based subscriptions |
| **Testing and Optimization** | Enabled programmatically | Generally manual |
| **Tasks** | Complex, open-ended goals and tasks | Simpler and predefined tasks and procedures |
| **Scalability** | Scalability determined by code efficiency and hosting providers | Scalable through tiered service models |
| **Options** | LangGraph, AutoGen, Microsoft Copilot | Make, n8n, Zapier, Stack, Voiceflow |

??? abstract "Detailed Comparison of AI Agents vs Workflow Automation"
    | Aspect | AI Agents and Teams | Workflow Automation |
    |--------|-------------------|-------------------|
    | **Decision Making** | • Autonomous reasoning<br>• Self-directed actions<br>• Learning from feedback | • Predefined decision paths<br>• Rule-based triggers<br>• Fixed action sequences |
    | **Use Cases** | • Complex research tasks<br>• Creative problem solving<br>• Adaptive interactions | • Document processing<br>• Data workflows<br>• Scheduled automations |
    | **Development** | • Custom code development<br>• API integrations<br>• Advanced configurations | • Visual flow builders<br>• Pre-built templates<br>• No-code interfaces |
    | **Maintenance** | • Code updates<br>• Model fine-tuning<br>• Performance monitoring | • Visual flow updates<br>• Template modifications<br>• Platform-managed updates |
    | **Integration** | • Programmatic API access<br>• Custom connectors<br>• Deep system integration | • Pre-built connectors<br>• Visual integrations<br>• Platform limitations |
    | **Security** | • Custom security policies<br>• Fine-grained access control<br>• Custom audit trails | • Platform security<br>• Predefined permissions<br>• Standard logging |
    | **Cost Factors** | • API consumption<br>• Infrastructure costs<br>• Development resources | • Platform subscriptions<br>• Usage-based pricing<br>• Integration costs |
    | **Performance** | • Highly customizable<br>• Infrastructure dependent<br>• Optimization flexibility | • Platform constrained<br>• Tier-based limits<br>• Standard optimization |

#### Development Details

##### Low/No Code Development

Low/no code platforms provide visual interfaces and pre-built components for building agents without extensive programming:

1. **Benefits**
    - Rapid prototyping and deployment
    - Accessible to non-technical users
    - Visual workflow design
    - Pre-built integrations
    - Faster iteration cycles

2. **Popular Platforms**
    - OpenAI GPTs
    - Bubble.io with AI integrations
    - Zapier with AI actions
    - Microsoft Power Platform
    - Voiceflow for conversational agents

3. **Best For**
    - Business users and citizen developers
    - Quick proof-of-concept development
    - Simple automation workflows
    - Standard use cases with common integrations

##### Code-Centric Development

Traditional programming approaches offer maximum flexibility and control:

1. **Benefits**
    - Complete customization
    - Advanced functionality
    - Fine-grained control over agent behavior
    - Custom integrations
    - Better performance optimization

2. **Development Frameworks**
    - LangChain
    - AutoGen
    - LlamaIndex
    - Custom frameworks using LLM APIs

3. **Best For**
    - Complex agent architectures
    - Enterprise-grade applications
    - Novel use cases
    - High-performance requirements
    - Deep system integrations

##### Hybrid Approaches

Many organizations adopt a hybrid strategy:

1. **Prototyping with Low Code**
    - Validate concepts quickly
    - Test user interactions
    - Define basic workflows

2. **Production with Code**
    - Refine and optimize
    - Add custom features
    - Scale for production

3. **Integration Patterns**
    - Low-code for frontend/UI
    - Code-based backend services
    - API-driven architecture
    - Microservices composition

### Architectural Considerations

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

## Interesting and notable research and libraries

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
    


## Automatic building Agents

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

