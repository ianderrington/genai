TODO: Sort and prioritize this. 

Agent types can be described by direct agentic ability to cause a change in the world.

## Text Agent

An agent that can output only language text. Even thought the language can be 'interpreted' into different things, as is done in the environment. 

## Text + Image Agent

An agent that can output 

## Robotic Agent

A robotic agent can control mechanism impacting the mechanical position or other activity of a device. 




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


### Agent

<div class="result" markdown>
??? tip "[Learning to Reason and Memorize with Self-Notes](https://adapterhub.ml/) Allows model to deviate from input context at any time to reason and take notes"
    <img width="685" alt="image" src="https://github.com/ianderrington/general/assets/76016868/e3b9ed66-18a8-451b-b29a-09815d7791d1">
</div>
<div class="result" markdown>
??? tip "[Large language models as tool makers](https://arxiv.org/pdf/2305.17126.pdf) [Github](https://github.com/ctlllll/llm-toolmaker) Allows high-quality tools to be reused by more lightweight models."
    <img width="545" alt="image" src="https://github.com/ianderrington/general/assets/76016868/fc0d79fd-54b7-493b-93a4-5eafd76584a6">
</div>
<div class="result" markdown>
??? tip "[CREATOR: Disentangling Abstract and Concrete Reasonings of Large Language Models through Tool Creation](https://arxiv.org/pdf/2305.14318.pdf)"
    <img width="750" alt="image" src="https://github.com/ianderrington/general/assets/76016868/0762aaaf-871e-495c-b560-f4e019c8020e">
    <img width="1012" alt="image" src="https://github.com/ianderrington/general/assets/76016868/81b88f7e-af2e-424e-9cb8-0e377bc141c0">
</div>


<div class="result" markdown>
??? tip "[smolai](https://github.com/ThomasEwing04/SMOL_AI) https://www.youtube.com/watch?v=zsxyqz6SYp8&t=1s An interesting example"
</div>

<div class="result" markdown>
??? tip "[Agent-GPT](https://github.com/reworkd/AgentGPT)"
    [Website](https://agentgpt.reworkd.ai/) --> Doesn't have agency/tools... So it is not good. A fancy wrapper for multi-task planning and execution. Limited at present. 
</div>
<div class="result" markdown>
??? tip "[AssistGPT: A General Multi-modal Assistant that can Plan, Execute, Inspect, and Learn](https://arxiv.org/pdf/2306.08640.pdf)" 
    [Webpage](https://showlab.github.io/assistgpt/) Uses PEIL PLan execute inspect learn.
</div>
<div class="result" markdown>
!!! tip "[GPT Engineer](https://github.com/AntonOsika/gpt-engineer)"
</div>
<div class="result" markdown>
!!! tip ️"[Robo-GPT](https://github.com/rokstrnisa/Robo-GPT)"
</div>
