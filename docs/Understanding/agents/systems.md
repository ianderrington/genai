Just like for people, when we can interact our interactions become a part of a system. When an agent (or model) engages in an interaction with another agent, the result is an agent system. The systems can be ordered or disordered, and interact with varying degrees of regulation as imposed by the environment, which includes other agents. To help steer the systems a person may be essential, though fully autonomous systems are of high intriguing for practical and theoretical reasons. 

!!! quote "Agent systems are integral components of the next stage of AI"

Individual agents are not individually ideal to perform the variety of tasks that are given to them. [Prompt-engineering](../prompting/index.md), [memories](./memory.md) and their derivative personas can enable different quality of output. Working together, different agents have the potential to create more successful outcomes. 

The challenge is _how_? 

This is an important question and bridges the gaps between complexity organization and process design. 

## Frameworks
Agentic Systems require that there is communication with and between AI-agents. To produce complexity management and success-potential, they are enabled through frameworks that permit certain forms of interactions. A _higher level_ [cognitive architecture](./cognitive_architecture.md) that can be built up in various manners to achieve end-goals effectively. 

Here are a few frameworks of importance. 


???+ code "[LangGraph](https://python.langchain.com/docs/langgraph) provides a simple interaction diagram to allow custom-built systems of interaction" langgraph
    It is important to consider [LangGraph](https://blog.langchain.dev/langgraph-multi-agent-workflows/) 

    ![langgrah](https://blog.langchain.dev/content/images/size/w1600/2024/01/simple_multi_agent_diagram--1-.png)
    ![langgraph](https://blog.langchain.dev/content/images/2024/01/hierarchical-diagram.png)

???+ important "[AutoGen](https://github.com/microsoft/autogen) enables LLM application development with communication between multiple agents."
    ![image](https://github.com/ianderrington/genai/assets/76016868/d24ece14-d24a-4144-9b7d-0c896bf10924)
    [Paper](https://arxiv.org/pdf/2308.08155.pdf)
    TRY THIS!

???+ important "[AutoAgents: A Framework for Automatic Agent Generation](https://arxiv.org/pdf/2309.17288v1.pdf)"
    [Paper](https://arxiv.org/pdf/2309.17288v1.pdf)
    ![image](https://github.com/ianderrington/genai/assets/76016868/d89bf7b1-99a0-429f-a6f5-50a8183a151f)
    <img width="581" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f9d7e423-b3d9-40ca-8be8-52461d53282a">

    TRY THIS!   


??? code "[ChatDev](https://github.com/OpenBMB/ChatDev) is a communicative agent approach allowing for development of solutions using ML models."
    Works with Camel to create agentic systems and has some generally good results. It is certainly not full-fledged software but provides a solid framework for creating systems of agents to produce software-enabled products.

??? code "[Agency Swarm](https://github.com/VRSEN/agency-swarm) provides a language creating interacting systems of agents."
    

??? code "[MetaGPT](https://github.com/geekan/MetaGPT) enables different agents to interact and generate meaningful outputs based on varying tasks and personas."

!!! code "[Reworkd/AgentGPT](https://github.com/reworkd/AgentGPT) '🤖 Assemble, configure, and deploy autonomous AI Agent(s) in your browser. 🤖'"


!!! tip "[Self-play GPT](https://arxiv.org/pdf/2305.10142.pdf)"
    This model leverages different game-roles and LLMs to provide feedback on how to optimize the model and facilitate autonomous enhancement during gameplay.

### Commercial Examples

#### OpenAI

OpenAI released their ability to integrate or call different [AI assistants](https://platform.openai.com/docs/assistants/overvie) be called within a chat using the `@` symbol. Similar to tagging in chat-interfaces, with a human 


## Theoretical Classifications

!!! note "Binary system (asymmetric calling)"
    In this system, ChatGPT initiates communication with DallE using a prompt. DallE responds by delivering an image. This image is then used in the final response of ChatGPT or returned as-is.

!!! note "Multi-body system (bidirectional calling)"
    This system consists of multiple agents, and they engage in ongoing discussions about their daily activities. They also receive regular updates about their environment. An example of this type of system can be viewed in [this paper](https://arxiv.org/pdf/2304.03442.pdf).

## Papers
??? important "[Experiential Co-Learning of Software-Developing Agents](https://arxiv.org/pdf/2312.17025.pdf) "

     Introduces a multi-agent paradigm that enables two types of language-agent using three modules of integration: 

     **Co-tracking**  that 'promotes interactive rehearsals between the agents' enabling joint exploration of procedural trajectories.

     - During this process an instructor provides a set of instruction to which assisstants responds. This is viewed as a directed chain, connecting the node responses to the edge which is a transition-record from nodes $r_j$ to $r_{j+1}$ given instructions $i_{j+1}$, $E = (r_j, i_{j+1}, r_{j+1})$. The task execution represents the completion process, combining the 'collaborative dynamics between both agents'. 
    TODO: FIX THIS; it isn't quite right
    ```mermaid
    flowchart LR
    subgraph instructor["Instructor"]
        i1["Instruction \( i_{j} \)"]
        i2["Instruction \( i_{j+1} \)"]
    end
    subgraph assistants["Assistants"]
        r1["Response \( r_{j} \)"]
        r2["Response \( r_{j+1} \)"]
    end
    i1 -->|provides| r1
    r1 -->|responds with| i2
    i2 -->|provides| r2
    r2 -->|responds with| i1
    r1 -->|transition-record| r2

    ```
     **Co-memorizing**  that looks for shortcuts based on past experiences and the environmental feedback, that allows information to be put into 'collective experience pools'.

     - Nodes sharing the same state are agregated via a embedding hash. These are examiend with a graph-compiler to find shortcuts for task-completion. When done, the co-memorization routine compells the instructor to use the document the routes for better guidance to record the end-points. 
     - The node feedback can be compared by looking at the product similarity between the node response $r_j$, the general task, the similarity between that node, and other nodes, and, the compilation success for node $r_j$. 
     - This allows for the construction of key-value pairs showing the best states from $r_i$, with $r_i \Rightarrow r_j$ and with $r_i \Rightarrow r_j$ to $r_j$. 
     
    ```mermaid
    graph TD
        subgraph state_pool["Collective Experience Pools"]
            A["Embedding Hash Aggregation"]
            B["Graph Compiler"]
            C["Documentation of Routes"]
        end
        A -->|examines| B
        B -->|finds shortcuts| C
        C -->|records endpoints| A
    ```

     **Co-reasoning** encourages instruction enhancement from their experience pools 

     - This step combines experience pools to generate refined insights in collaborative problem states, using memories to seed few-shot examples for instructions and responses as in [retrieval based prompting](../prompting/index.md#retrieval-augmented-prompting)
     - With a response to instruction memory $M_I$ encountering the task state $r_j$, a retrieval tool, acesses experiential instructions matching the meaning of the task to provide zerofew-shot examples. to guide the instructors reasoning to share with the assistant. 
     - The assistant with an instruction-to-response memory $M_A$ retrieves optimal responses based on the received instruction, allowing few-shot examples to create the next response.  

     ```mermaid
     flowchart LR
        subgraph experience_pools["Experience Pools"]
            MI["Instruction Memory  $$M_I$$ "]
            MA["Assistant Memory \( M_A \)"]
        end
        subgraph reasoning["Instruction Enhancement"]
            task_state["Task State \( r_j \)"]
            retrieval["Retrieval Tool"]
            few_shot["Few-Shot Examples"]
        end
        task_state -->|encounters| MI
        MI -->|accesses| retrieval
        retrieval -->|guides| few_shot
        few_shot -->|informs| MA
        MA -->|retrieves| task_state

     
     ```


!!! tip "[Can Language Models Teach Weaker Agents? Teacher Explanations Improve Students via Theory of Mind](https://arxiv.org/pdf/2306.09299.pdf)"
    In this work, the Theory of Mind (ToM) concept is used to attempt to improve the performance of students. [Github](https://github.com/swarnaHub/ExplanationIntervention)



??? tip "[Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/pdf/2304.03442.pdf) in a simulated town!!!"
    This paper discusses a simulation involving different agents exhibiting different personalities. The dynamic environment, shared in [code](https://github.com/a16z-infra/ai-town) can be manipulated by these agents. The paper explores various challenges and proposed solutions including:
    ```markdown
    **Remembering**
        _Observation Memory_ This is a memory stream that maintains a record of past experiences. These experiences are stored in "memory objects", which are described in natural language, and timestamped. The importance of each memory object is determined using metrics such as _recency_, _importance_, and _relevance_.
        _Reflection Memory_ This memory type allows the agent to generate more abstract thoughts. These thoughts can be included along with reflections. This process is hardcoded to occur when the sum of importance scores exceeds a certain threshold.
    **Planning and Reacting**
        _Recursive Planning_ In this process, the agent divides the day into chunks of "goals", which are further broken down into smaller time frames. The ability to adjust these plans based on interactions is a key feature of this mechanism.
    ```




!!! tip "[Multi-Agent Collaboration via Reward Attribution Decomposition](https://arxiv.org/pdf/2010.08531.pdf)"
    This work illuminates optimization techniques for multi-agents using distributed reward systems to achieve state-of-the-art performance. It introduces a joint optimization approach that depends on _self_ and _interactive_ terms.



!!! tip "[Super-AGI](https://github.com/TransformerOptimus/SuperAGI)"
    Super-AGI is a model that allows multiple agents to function. However, this system doesn't facilitate any communication between the agents.



!!! tip "[GPT-Bargaining](https://github.com/FranxYao/GPT-Bargaining)"
    This model applies several iterations to improve negotiation tactics based on external feedback.



!!! tip "[RL4L Allen ai](https://arxiv.org/pdf/2305.08844.pdf)"
    RL4L AI employs a small critique model to enhance the output from the larger model. It uses a policy gradient to fine-tune the critique model while maintaining reasonable performance gains. [Github](https://github.com/allenai/RL4LMs)



??? tip "[Showrunner Agents](https://fablestudio.github.io/showrunner-agents/) The Showrunner Agents use Large Language Models (LLMs) to generate episodic content."
     It's a massively creative and multi-faceted process with a great potential.
    ![image](https://github.com/ianderrington/genai/assets/76016868/9820f2c4-5779-4bc9-b501-4e9b455212ff)


??? tip "[Improving Factuality and Reasoning in Language Models through Multiagent Debate](https://arxiv.org/pdf/2305.14325.pdf) where multiple language model instances propose and debate their individual responses and reasoning processes over multiple rounds to arrive at a common final answer."
    They tried both concatenation or _summarization_ of other results. Summarization reduces length and improves quality.
    ```python
        # Debate Length Prompt
        short_prompt = """ These are the solutions to the problem from other agents: {other_answers}
            Based off the opinion of other agents, can you give an updated response . . ."""
        long_prompt = """ These are the solutions to the problem from other agents: {other_answers}
            Using the opinion of other agents as additional advice, can you give an updated response . . ."""
    ```
    [Github](https://github.com/composable-architectures/llm_multiagent_debate)


??? tip "[Council ](https://github.com/chain-ml/council) Very promising initial creation of networks of agents to create full-fledged teams for output products."
    ![image](https://github.com/chain-ml/council/raw/main/docs/source/introduction/engine_flow.png)


??? code "[SocraticAI](https://github.com/RunzheYang/SocraticAI/tree/main) to use the power of conversation to solve problems. Very interesting"
    [Description](https://princeton-nlp.github.io/SocraticAI/)
    ![image](https://github.com/ianderrington/genai/assets/76016868/48bf16aa-efde-4e38-b7e1-30963f74aa66)


## Open Source Implementations (unpublished)

!!! tip "[Swarms](https://medium.com/@kyeg/swarms-of-ai-agents-automating-everything-c554f5be421b )"
    Very thoughtful next-level systems focusing on large-dimensions of swarms. Very initial stages but has a lot of promise.
    [Github](https://github.com/kyegomez/swarms)


## Potentially useful tools
!!! tip "[Nomadproject.io](https://www.nomadproject.io/) A simple and flexible scheduler and orchestrator to deploy and manage containers and non-containerized applications across on-prem and clouds at scale."

!!! tip "[Firecracker](https://github.com/firecracker-microvm/firecracker) 'Our mission is to enable secure, multi-tenant, minimal-overhead execution of container and function workloads.'"
