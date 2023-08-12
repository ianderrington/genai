# Agents Gen(erative) AI
Agents in Gen()AI agents have access to 'tools' to provide them 'agency' beyond the ability to generate text or image based responses to the input data.

Similar to bots, or other computerized automota, they may have the ability to run discretely, separately from standard chat-interfaces. Generally they involve the possibility of Human-in-the-loop to help correct odd components. 

## Basic Concepts

* [Models](../models/index.md): The 'intelligent' component returns an output for a given input. 
* Input [environments](environments.md) that can and do provide inputs. 
* Language [prompts](../prompt_engineering/prompting.md) that orient's and agent's response. 
* [Memory](./memory.md) to enable writing and reading information that may be of use. 
* [Tools](./actions_and_tools.md) that enable more than text (or images) to be returned or otherwise acted upon. 
* [Interpreters](./interpreters.md) that are used to process input or output. 
* [Chains](./chains.md) which enable continuous flow of information, including memory, to downstream tasks. 
* Agents can be quite different! Here are some [examples](./examples.md) of agents made both in academic and commercial settings. 
* [Systems of Agents](systems.md) that can allow for multiple agents with different sets of the components above, to interact and create powerful solutions.



## Essential references

Before we go on, there are several references that are of high merit that you may wish to check out!!!

- [Agents overview by Lilian Weng](https://lilianweng.github.io/posts/2023-06-23-agent) As usual, a splendid post by Lilian Weng
- [Awesome Agents](https://github.com/e2b-dev/awesome-ai-agents) of nicely curated list of systems using agents

## [Models](../models/index.md)

Models provide the computational core of Agents. Acting like a 'brain' that atakes in input [prompts](#prompts) they return outputs. Generally the models may be considered `frozen` for a given agent, but sometimes, agentic feedback is used for helping model creation as with [distillation](../models/distillation.md) 

We describe models cational manner [here](../models/index.md) and in an applied manner [here](../../Engineering/models.md). 

## [Prompts](../prompt_engineering/prompting.md)

!!! warning "Garbage In --> Garbage Out"
    The common realization that bad input will lead to bad outputs becomes more nuanced when considering the degree to which small changes in input prompts can lead to wildly different outcome performance. Consequently, well-chosen [prompts](../prompt_engineering/prompting.md) can functionally enable an agent, or not. 

Because of the importance and breadth of details involved with prompting, please visit [this section](../prompt_engineering/prompting.md). Note, that prompts will be model-specific, and if the model changes, either completely or with new architecture, the continued performance of a given prompt or prompt strategy is not certain. 

## [Memory](./memory.md)

Like people, agents can be better enabled when they have access to memory.  We discuss memory thoroughly [here](./memory.md).

## [Tools](./actions_and_tools.md)

## [Interpreters](./interpreters.md)

Both the input and output into an LLM model may be intepreted, or otherwise parsed in a manner that makes the input or output more impactful. 

- [Native function calls](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_call_functions_with_chat_models.ipynb) and [json support with OpenAI](https://yonom.substack.com/p/native-json-output-from-gpt-4) 


## [Systems](systems.md)
Generative AI systems involve the interaction of multiple individual GenAI elements that can act, to a coordinated degree, independently of other AI Agents. 

## TO ORGANIZE

- ️[Guidance](https://github.com/microsoft/guidance/) Interleaving generation, prompting and logical control to single  continuous flow.

- [AutoLabel](https://github.com/refuel-ai/autolabel) A nice pythonic system for generating semantic labels repeatedly for use in downstream datasets

- [This](https://arxiv.org/pdf/2306.08640.pdf)

- [Baize: An Open-Source Chat Model with Parameter-Efficient Tuning on Self-Chat Data](https://arxiv.org/pdf/2304.01196.pdf) Parameter efficient LLama Tuning and risk minimization with a new 'Self Distillation' with Feedback to improve itself even more. RESEARCH ONLY

