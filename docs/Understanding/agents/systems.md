When an agent (or model) interacts with a different agent in some way, it becomes a system of agents. This can be created by incepting and equipping different agents and enabling their output to be ingested and returned. It could be considered that an agent's input can be regarded as nother 'tool' where the call to the tool is to the different agent. While a reasonable perspective, because the same considerations can generally be applied to all agents, but not tools, we consider it separately. 

!!! example "Binary system (asymmetric calling)"
    ChatGPT calls DallE with a prompt it generated. DallE returns an image that is either returned or otherwise used in Chat GPT's final response.

!!! example "Multi-body system (bidirectional calling)"
    A group of agents discussing their daily affairs and getting periodic environmental updates, like [this paper](https://arxiv.org/pdf/2304.03442.pdf)

## Examples
- [MetaGPT](https://github.com/geekan/MetaGPT) An amazing solution that allows for interacting agents. 

- [Self-play GPT](https://arxiv.org/pdf/2305.10142.pdf) Uses different LLMs and different roles to provide feedback on how to improve and enable autonomous improvement while game playing. 

- [Can Language Models Teach Weaker Agents? Teacher Explanations Improve Students via Theory of Mind](https://arxiv.org/pdf/2306.09299.pdf) Uses Theory fo Mind to try to improve student performance. [Github](https://github.com/swarnaHub/ExplanationIntervention)

- [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/pdf/2304.03442.pdf) A simulation of different agents of different personalities with a time-evolving environment that could be manipulated by the agents.   In it they discuss several challenges and solutions:

    **Remembering**
    
    _Observation Memory_ A memory stream maintaining a record of experience: memory objects with a description in natural language, and timestamping.
    Uses, _recency_, _importance_ and relevance_ to add weight to information that is more recent, how the memory is compared in relation to other memories, and how the information pertains to the present situation. 

    _Reflection Memory_ Which is a separate tipe of memory that allow more abstract thoughts for the agent. They can be included alongside the reflections. (Hardcoded when this happens, in relation to sum of importance scores > threshold)

    **Planning and Reacting**

    _Recursive Planning_ used to generate the day into several chunks of goals. These are then broken down to smaller timespaces. Plans can change based on interactions. (perhaps present status, planned and past) 


- [Multi-Agent Collaboration via Reward Attribution Decomposition](https://arxiv.org/abs/2010.08531)
    Describes optimization of multi agent with distributed reward systems to get SOA performance. It is a joint optimization allowing decentralized Q-function that relies on _self_ and _interactive_ terms. 


- [Super-AGI](https://github.com/TransformerOptimus/SuperAGI)  Allows multiple agents (no communication though)


- [GPT-Bargaining](https://github.com/FranxYao/GPT-Bargaining) Uses multiple rounds to improve negotiation tactics based on external feedback. 

- [RL4L Allen ai](https://arxiv.org/pdf/2305.08844.pdf) Uses smaller critique model feedback to improve larger model output with a policy gradient to fine-tune the critique model while allowing reasonable performance gains. [Github](https://github.com/allenai/RL4LMs)

