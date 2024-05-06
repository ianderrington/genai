Actions and tools, also called 'plugins', can be considered function calls to routines external to the LLM. Relayed by an [interpreters and routers](#interpeters-and-routers), these have made LLMs one of the most powerful enablers of Agentic AI. 

## Actions and tools

Tools generally consist of single function calls to something that will return value to the end-point destination, be that the agent itself or a person interacting with an agent.
Actions can be thought of interacting in an environment, this environment can have external 'tools' or some form of digital or physical embodiment state of the agent. Thhought of in a different way, actions may be be internal or externally focused.  focused generally related to an agent's '`memory`, or externally focused, with tools, though their distinction may be moot.

**Internal actions** generally relate reading, writing or updating, an agents memory, [memory](./memory.md) state, such as free-text `scratech-pad`, an ordered `memory-log` or a vector database.

**External actions** may be to act on simulated or real environments, or otherwise tracked `state`, or to use a toolthat an agent may be 'equipped with' to run. These can be API calls or local function calls.



### Libraries

??? tip "![GitHub Repo stars](https://badgen.net/github/stars/ShishirPatil/gorilla) [Gorilla](https://github.com/ShishirPatil/gorilla) A Llama-focused high-quality API calling methods."
    <img width="801" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/631a7023-0b14-4a55-9993-2d49bb3b81d2">
    [Paper](https://arxiv.org/abs/2305.15334)



??? abstract "[On the Tool Manipulation Capability of Open-source Large Language Models](https://github.com/sambanova/toolbench)"
    [Paper](https://arxiv.org/pdf/2305.16504.pdf)
    Provides a method to allow open-source LLMs to work with tools for real-world tasks.


??? abstract "[Langchain Toolkits](https://github.com/langchain-ai/langchain/tree/b786335dd10902489f87a536ee074d747b6df370/libs/langchain/langchain/agents/agent_toolkits)"
    <img width="971" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/65e22011-f815-4f19-8d78-24bc2c731b08">



!!! tip "[Tool Documentation Enables Zero-Shot Tool-Usage with Large Language Models](https://arxiv.org/pdf/2308.00675.pdf) Demonstrates that presenting documentation of tool usage is likely more valuable than providing examples."

!!! abstract "[GitHub Repo stars](https://badgen.net/github/stars/rizerphe/local-llm-function-calling) [Local LLM Function Calling]([Local LLM Function Calling](https://github.com/rizerphe/local-llm-function-calling)) enforces json semantics for calls to functions"

!!! abstract "[GitHub Repo stars](https://badgen.net/github/stars/OpenBMB/ToolBench) [Tool LLM]([Github](https://github.com/OpenBMB/ToolBench))" 
    "[Paper](https://huggingface.co/papers/2307.16789) This describes a novel approach enabling over 16000 API's to be called through an intelligent routing mechanism."  Uses RapidAPI connector to do so. "

!!! abstract "[GitHub Repo stars](https://badgen.net/github/stars/ZubinGou/llm-agent-web-tools) [Web search tools that allow a number of search engines to be used]([Web search tools that allow a number of search engines to be used](https://github.com/ZubinGou/llm-agent-web-tools))"


### Executors

The action that an agent may take is enabled by an `AgentExecutor` or [interpreter](./cognitive_architecture.md/#interpreters) of the LLM output, that coordinates the call to perform the action.

!!! abstract "[Langchain Agent Executor](https://github.com/langchain-ai/langchain/blob/b786335dd10902489f87a536ee074d747b6df370/libs/langchain/langchain/agents/agent.py#L637)"

###  Interpeters and Routers

Interpreters are programs that facilitate model computation by parsing, formatting, or otherwise preparing the data for effective use. They can also be used to route information to the appropriate reciever, such as a tool or other LLM. 

Interpreting Such efforts can be used to reduce input complexity, token-count, to detect potentially unreasonable inputs or outputs. These interpreters _may_ be agents or models themselves, thought that is not required.

!!! example "Link Routing"
    A model may not be guaranteed to produce equivalent output based on a complex input string such as an html address. Consequently, pre-parsing the output and substituting a simple name for an address, such as 'html_1', and then re-introducing that within any output, both using RegEx, may enable more effective output.

#### Libraries

!!! abstract "[Guardrails](https://shreyar.github.io/guardrails/) To help format output and prevent improper prompts."

!!! abstract "[Semantic Kernel](https://github.com/microsoft/semantic-kernel)"
    [Github](https://github.com/microsoft/semantic-kernel/blob/main/samples/notebooks/python/00-getting-started.ipynb),

!!! abstract "️[Guidance](https://github.com/microsoft/guidance/) Interleaving generation, prompting and logical control to single  continuous flow."



