When an agent (or model) engages in an interaction with another agent, the result is an agent system. This is achieved by implementing and equipping various agents, and then setting them up so that the output of one is used as the input of the other. Although one may argue that an agent's input can be perceived as another 'tool' where the different agent prompts the action, this argument isn't entirely valid. The reason is that, in most cases, the same considerations apply to all agents but not to all tools. Therefore, we deal with it separately.

!!! note "Binary system (asymmetric calling)"
    In this system, ChatGPT initiates communication with DallE using a prompt. DallE responds by delivering an image. This image is then used in the final response of ChatGPT or returned as-is.

        
!!! note "Multi-body system (bidirectional calling)"
    This system consists of multiple agents, and they engage in ongoing discussions about their daily activities. They also receive regular updates about their environment. An example of this type of system can be viewed in [this paper](https://arxiv.org/pdf/2304.03442.pdf).

## Tools Paper and Code

!!! code "[AutoGen](https://github.com/microsoft/autogen) enables LLM application development with communication between multiple agents."
    ![image](https://github.com/ianderrington/genai/assets/76016868/d24ece14-d24a-4144-9b7d-0c896bf10924)
    [Paper](https://arxiv.org/pdf/2308.08155.pdf)


!!! tip "[MetaGPT](https://github.com/geekan/MetaGPT)"
    MetaGPT enables different agents to interact and generate meaningful outputs based on varying tasks and personas. It's a reliable partially-formed solution. Check out the code for further knowledge!

!!! code "[Reworkd/AgentGPT](https://github.com/reworkd/AgentGPT) '🤖 Assemble, configure, and deploy autonomous AI Agent(s) in your browser. 🤖'"

    
!!! tip "[Self-play GPT](https://arxiv.org/pdf/2305.10142.pdf)"
    This model leverages different game-roles and LLMs to provide feedback on how to optimize the model and facilitate autonomous enhancement during gameplay.



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




!!! tip "[Multi-Agent Collaboration via Reward Attribution Decomposition](https://arxiv.org/abs/2010.08531)"
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


## Open Source Implementations (unpublished)
!!! tip "[Swarms](https://medium.com/@kyeg/swarms-of-ai-agents-automating-everything-c554f5be421b )"
    Very thoughtful next-level systems focusing on large-dimensions of swarms. Very initial stages but has a lot of promise. 
    [Github](https://github.com/kyegomez/swarms)
    
## Potentially useful tools
!!! tip "[Nomadproject.io](https://www.nomadproject.io/) A simple and flexible scheduler and orchestrator to deploy and manage containers and non-containerized applications across on-prem and clouds at scale."

!!! tip "[Firecracker](https://github.com/firecracker-microvm/firecracker) 'Our mission is to enable secure, multi-tenant, minimal-overhead execution of container and function workloads.'"

