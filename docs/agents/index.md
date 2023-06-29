# Agents Gen(erative) AI
Agents in Gen()AI agents have access to 'tools' to provide them 'agency' beyond the ability to generate text or image based responses to the input data. They rely on several important concepts:

## Basic Concepts

* [(LLM) model](../models/index.md): The 'intelligent' component returns an output for a given input. 
* Inceptions: The [prompt](../models/prompting.md) that orient's and agent's response. 
* Memory access
* Tool Access
* Chains and flows
* Security Featurs
* Output formatting
* Agent Networks


Similar to automota, they may have the ability to run discretely, separately from standard chat-interfaces. Generally they involve the possibility of Human-in-the-loop to help correct odd components. 

The ability to call programs, APIs, software, cursors, robots, or other non-language systems. 

## Chains and Flows

### Langchain

- ‼️[Langchain](https://python.langchain.com/en/latest/#) A primative python or javascript based primitive 'LLM' language that enables planned and agentic AI.
  - ‼️[Langflow](https://github.com/logspace-ai/langflow) 
  - ‼️[Awesome Langchain](https://github.com/kyrolabs/awesome-langchain)
  -   - ‼️[Toolkit](https://www.toolkit.club/) Generates LangChain plugins


### LLM-Chain
- ‼️[llm-chain](https://docs.llm-chain.xyz/docs/introduction) ChatGPT and Alpaca support. Agentic with bash commands.

### Guidance

- ‼️[Guidance](https://github.com/microsoft/guidance/) Interleaving generation, prompting and logical control to single  continuous flow.

### Security Features

- ‼️[Semantic Kernel]([https://github.com/microsoft/semantic-kernel/blob/main/samples/notebooks/python/00-getting-started.ipynb](https://github.com/microsoft/semantic-kernel/tree/main))
- ‼️ [Rebuff](https://github.com/woop/rebuff) a prompt injection detection service.
- ‼️ [Guardrails](https://shreyar.github.io/guardrails/) To help format output and prevent improper prompts.
- [Native function calls](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_call_functions_with_chat_models.ipynb) and [json support with OpenAI](https://yonom.substack.com/p/native-json-output-from-gpt-4) 
- [AutoLabel](https://github.com/refuel-ai/autolabel) A nice pythonic system for generating semantic labels repeatedly for use in downstream datasets

### Agent Networks
Generative AI networks involve the interaction of multiple individual Gen()AI elements that can act, to a coordinated degree, independently of other AI Agents. 
