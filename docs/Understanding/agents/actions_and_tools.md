
## Action


Actions may be be internal or externally focused.  focused generally related to an agent's '`memory`, or externally focused, with tools, though their distinction may be moot. 

**Internal actions** generally relate reading, writing or updating, an agents memory, [memory](./memory.md) state, such as free-text `scratech-pad`, an ordered `memory-log` or a vector database.

**External actions** may be to act on simulated or real environments, or otherwise tracked `state`, or to use a toolthat an agent may be 'equipped with' to run. These can be API calls or local function calls. 

### Executors
The action that an agent may take is enabled by an `AgentExecutor` or [interpreter](./interpreters.md) of the LLM output, that coordinates the call to perform the action. 

!!! references
    - [Langchain Agent Executor](https://github.com/langchain-ai/langchain/blob/b786335dd10902489f87a536ee074d747b6df370/libs/langchain/langchain/agents/agent.py#L637)


## Tools
Tools generally consist of single function calls to something that will return value to the end-point destination, be that the agent itself or a person interacting with an agent. 


## Toolkits
Toolkits consist of tool pearings that often work together well. For instance, bash commands for file creation, deletion, naming and movement. Toolkits can be api-calls or 


!!! references
    - [Langchain Toolkits](https://github.com/langchain-ai/langchain/tree/b786335dd10902489f87a536ee074d747b6df370/libs/langchain/langchain/agents/agent_toolkits)
    - [Tool LLM](https://huggingface.co/papers/2307.16789) Which describes a novel approach enabling over 16000 API's to be called through an intelligent routing mechanism. [Github](https://github.com/OpenBMB/ToolBench)
    - [Gorilla](https://github.com/ShishirPatil/gorilla) A Llama-focused high-quality API calling methods. 