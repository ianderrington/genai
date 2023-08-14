When an agent (or model) engages in an interaction with another agent, the result is an agent system. This is achieved by implementing and equipping various agents, and then setting them up so that the output of one is used as the input of the other. Although one may argue that an agent's input can be perceived as another 'tool' where the different agent prompts the action, this argument isn't entirely valid. The reason is that, in most cases, the same considerations apply to all agents but not to all tools. Therefore, we deal with it separately.

!!! note "Binary system (asymmetric calling)"
    In this system, ChatGPT initiates communication with DallE using a prompt. DallE responds by delivering an image. This image is then used in the final response of ChatGPT or returned as-is.

        
!!! note "Multi-body system (bidirectional calling)"
    This system consists of multiple agents, and they engage in ongoing discussions about their daily activities. They also receive regular updates about their environment. An example of this type of system can be viewed in [this paper](https://arxiv.org/pdf/2304.03442.pdf).

## Research

<div class="result" markdown>
!!! tip "[MetaGPT](https://github.com/geekan/MetaGPT)"
    MetaGPT enables different agents to interact and generate meaningful outputs based on varying tasks and personas. It's a reliable partially-formed solution. Check out the code for further knowledge!
</div>
<div class="result" markdown>
    
!!! tip "[Self-play GPT](https://arxiv.org/pdf/2305.10142.pdf)"
    This model leverages different game-roles and LLMs to provide feedback on how to optimize the model and facilitate autonomous enhancement during gameplay.

<div class="result" markdown>
</div>
!!! tip "[Can Language Models Teach Weaker Agents? Teacher Explanations Improve Students via Theory of Mind](https://arxiv.org/pdf/2306.09299.pdf)"
    In this work, the Theory of Mind (ToM) concept is used to attempt to improve the performance of students. [Github](https://github.com/swarnaHub/ExplanationIntervention)

<div class="result" markdown>

!!! tip "[Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/pdf/2304.03442.pdf)"
    This paper discusses a simulation involving different agents exhibiting different personalities. The dynamic environment can be manipulated by these agents. The paper explores various challenges and proposed solutions including:

??? example 
    **Remembering**
    
    _Observation Memory_ This is a memory stream which maintains a record of past experiences. These experiences are stored in "memory objects", which are described in natural language, and timestamped. The importance of each memory object is determined using metrics such as _recency_, _importance_, and _relevance_. 

    _Reflection Memory_ This memory type allows the agent to generate more abstract thoughts. These thoughts can be included along with reflections. This process is hardcoded to occur when the sum of importance scores exceeds a certain threshold.

    **Planning and Reacting**
    
    _Recursive Planning_ In this process, the agent divides the day into chunks of "goals", which are further broken down into smaller time frames. The ability to adjust these plans based on interactions is a key feature of this mechanism.
</div>
<div class="result" markdown>

!!! tip "[Multi-Agent Collaboration via Reward Attribution Decomposition](https://arxiv.org/abs/2010.08531)"
    This work illuminates optimization techniques for multi-agents using distributed reward systems to achieve state-of-the-art performance. It introduces a joint optimization approach that depends on _self_ and _interactive_ terms.
</div> 
<div class="result" markdown>

!!! tip "[Super-AGI](https://github.com/TransformerOptimus/SuperAGI)"
    Super-AGI is a model that allows multiple agents to function. However, this system doesn't facilitate any communication between the agents.
</div> 
<div class="result" markdown>

!!! tip "[GPT-Bargaining](https://github.com/FranxYao/GPT-Bargaining)"
    This model applies several iterations to improve negotiation tactics based on external feedback.
</div> 
<div class="result" markdown>
    
!!! tip "[RL4L Allen ai](https://arxiv.org/pdf/2305.08844.pdf)"
    RL4L AI employs a small critique model to enhance the output from the larger model. It uses a policy gradient to fine-tune the critique model while maintaining reasonable performance gains. [Github](https://github.com/allenai/RL4LMs)
</div> 
<div class="result" markdown>

??? tip "[Showrunner Agents](https://fablestudio.github.io/showrunner-agents/) The Showrunner Agents use Large Language Models (LLMs) to generate episodic content."
     It's a massively creative and multi-faceted process with a great potential.
    ![image](https://github.com/ianderrington/genai/assets/76016868/9820f2c4-5779-4bc9-b501-4e9b455212ff)
</div>

??? tip "[Improving Factuality and Reasoning in Language Models through Multiagent Debate](https://arxiv.org/pdf/2305.14325.pdf)
    "multiple language model instances propose and debate their individual responses and reasoning processes over multiple rounds to arrive at a common final answer."
    They tried both concatenation or _summarization_ of other results. Summarization reduces length and improves quality. 
    ```python
        # Debate Length Prompt
        short_prompt = """ These are the solutions to the problem from other agents: {other_answers}
            Based off the opinion of other agents, can you give an updated response . . ."""
        long_prompt = """ These are the solutions to the problem from other agents: {other_answers}
            Using the opinion of other agents as additional advice, can you give an updated response . . ."""
    ```
    [Github](https://github.com/composable-models/llm_multiagent_debate)

??? tip "[Council ](https://github.com/chain-ml/council)
    Very promising initial creation of networks of agents to create full-fledged teams for output products. 
    ![image](https://github.com/chain-ml/council/raw/main/docs/source/introduction/engine_flow.png)


## Open Source Implementations (unpublished)
!!! tip "[Swarms](https://medium.com/@kyeg/swarms-of-ai-agents-automating-everything-c554f5be421b )"
    Very thoughtful next-level systems focusing on large-dimensions of swarms. Very initial stages but has a lot of promise. 
    [Github](https://github.com/kyegomez/swarms)
    
