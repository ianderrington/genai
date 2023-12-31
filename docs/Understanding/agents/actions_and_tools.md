Actions and tools, also called 'plugins', can be considered function calls to routines external to the LLM. While potentially minimal distinction. Often relayed by an [interpreter](./chains.md/#interpreters) or a perhaps simple jinja syntax-pattern more complete json input that can be validated for the function of choice.

!!! code "[Local LLM Function Calling](https://github.com/rizerphe/local-llm-function-calling) enforces json semantics for calls to functions"

## Action

Actions may be be internal or externally focused.  focused generally related to an agent's '`memory`, or externally focused, with tools, though their distinction may be moot.

**Internal actions** generally relate reading, writing or updating, an agents memory, [memory](./memory.md) state, such as free-text `scratech-pad`, an ordered `memory-log` or a vector database.

**External actions** may be to act on simulated or real environments, or otherwise tracked `state`, or to use a toolthat an agent may be 'equipped with' to run. These can be API calls or local function calls.

### Executors
The action that an agent may take is enabled by an `AgentExecutor` or [interpreter](./chains.md/#interpreters) of the LLM output, that coordinates the call to perform the action.

!!! code "[Langchain Agent Executor](https://github.com/langchain-ai/langchain/blob/b786335dd10902489f87a536ee074d747b6df370/libs/langchain/langchain/agents/agent.py#L637)"


## Tools
Tools generally consist of single function calls to something that will return value to the end-point destination, be that the agent itself or a person interacting with an agent.



### Toolkits
Toolkits consist of tool pairings that often work together well. For instance, bash commands for file creation, deletion, naming and movement. Toolkits can be api-calls or

??? code "[On the Tool Manipulation Capability of Open-source Large Language Models](https://github.com/sambanova/toolbench/tree/main)"
    [Paper](https://arxiv.org/pdf/2305.16504.pdf)
    Provides a method to allow open-source LLMs to work with tools for real-world tasks.


??? code "[Langchain Toolkits](https://github.com/langchain-ai/langchain/tree/b786335dd10902489f87a536ee074d747b6df370/libs/langchain/langchain/agents/agent_toolkits)"
    <img width="971" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/65e22011-f815-4f19-8d78-24bc2c731b08">

!!! tip "[Gorilla](https://github.com/ShishirPatil/gorilla) A Llama-focused high-quality API calling methods."

!!! tip "[Tool Documentation Enables Zero-Shot Tool-Usage with Large Language Models](https://arxiv.org/pdf/2308.00675.pdf) Demonstrates that presenting documentation of tool usage is likely more valuable than providing examples."



!!! code "[Tool LLM](https://huggingface.co/papers/2307.16789) This describes a novel approach enabling over 16000 API's to be called through an intelligent routing mechanism. [Github](https://github.com/OpenBMB/ToolBench) Uses RapidAPI connector to do so. "
