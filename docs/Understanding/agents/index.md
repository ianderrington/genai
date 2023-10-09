# Agents Gen(erative) AI
Agents in Gen()AI agents have access to 'tools' to provide them 'agency' beyond the ability to generate text or image based responses to the input data.

Similar to bots, or other computerized automota, they may have the ability to run discretely, separately from standard chat-interfaces. Generally they involve the possibility of Human-in-the-loop to help correct odd components. 

## Basic Concepts

* [Environments](environments.md) that can and do provide **inputs**.
* [Cognition](./cognition.md) is the ability to understand through the use of computational [models](../architecture/models/index.md) and [memory](./memory.md). 
* Language [prompts](../prompting/index.md) that orient's and agent's response. 
* [Memory](./memory.md) to enable writing and reading information that may be of use. 
* [Tools](./actions_and_tools.md) that enable more than text (or images) to be returned or otherwise acted upon. 
* [Interpreters](#interpreters) that are used to process input or output. 
* [Chains](./chains.md) which enable continuous flow of information, including memory, to downstream tasks. 
* Agents can be quite different! Here are some [examples](./examples.md) of agents made both in academic and commercial settings. 
* [Systems of Agents](systems.md) that can allow for multiple agents with different sets of the components above, to interact and create powerful solutions.

## Background
```mermaid
flowchart LR
    A(Input) --> B[Calculate]
    B --> C[Output]
    C --> D[Action]

```
### [Models](../architectures/index.md)

Models provide the computational core of Agents. Acting like a 'brain' that a takes in input [prompts](#prompts) they return outputs. Generally the models may be considered `frozen` for a given agent, but sometimes, agentic feedback is used for helping model creation with [recurrent training](../architectures/recurrent_training.md).

[Here](../architectures/index.md) you can learn how to build models, though it is often easier to use [pre-trained models](../architectures/pre_trained_models.md). 

### [Prompts](../prompting/index.md)

!!! warning "Garbage In --> Garbage Out"
    The common realization that bad input will lead to bad outputs becomes more nuanced when considering the degree to which small changes in input prompts can lead to wildly different outcome performance. Consequently, well-chosen prompts can functionally enable an agent, or not. 

Because of the importance and breadth of details involved with prompting, please visit [this section](../prompting/index.md). Note, that prompts will be model-specific, and if the model changes, either completely or with new architecture, the continued performance of a given prompt or prompt strategy is not certain. 

### [Memory](./memory.md)

Like people, agents can be better enabled when they have access to memory.  We discuss memory thoroughly [here](./memory.md).

### [Tools](./actions_and_tools.md)

### Interpreters 

Both the input and output into an LLM model may be intepreted, or otherwise parsed in a manner that makes the input or output more impactful. 

- [Native function calls](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_call_functions_with_chat_models.ipynb) and [json support with OpenAI](https://yonom.substack.com/p/native-json-output-from-gpt-4) 


## [Systems](systems.md)
Generative AI systems involve the interaction of multiple individual GenAI elements that can act, to a coordinated degree, independently of other AI Agents. 

## Useful references

Before we go on, there are several references that are of high merit that you may wish to check out!!!

- [Agents overview by Lilian Weng](https://lilianweng.github.io/posts/2023-06-23-agent) As usual, a splendid post by Lilian Weng
- [Awesome Agents](https://github.com/e2b-dev/awesome-ai-agents) of nicely curated list of systems using agents




## TO ORGANIZE


- [This](https://arxiv.org/pdf/2306.08640.pdf)

