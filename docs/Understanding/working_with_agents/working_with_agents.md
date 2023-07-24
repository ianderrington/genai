# Agents Gen(erative) AI
Agents in Gen()AI agents have access to 'tools' to provide them 'agency' beyond the ability to generate text or image based responses to the input data. They rely on several important concepts:



## Lists and websites
- [Agents overview by Lilian Weng](https://lilianweng.github.io/posts/2023-06-23-agent)
- [Awesome AGents](https://github.com/e2b-dev/awesome-ai-agents) of nicely curated AGents that helps to understand the differences they might contain.


## Basic Concepts

* [(LLM) model](../model_creation/model_creation.md): The 'intelligent' component returns an output for a given input. 
* Inceptions: The [prompt](../prompt_engineering/prompting.md) that orient's and agent's response. 
* Memory access
* Tool Access
* Chains and flows
* Security Features
* Output formatting
* [Systems of Agents](systems.md)



Similar to automota, they may have the ability to run discretely, separately from standard chat-interfaces. Generally they involve the possibility of Human-in-the-loop to help correct odd components. 

The ability to call programs, APIs, software, cursors, robots, or other non-language systems. 

## Memory Access

## Tool Access

- [Native function calls](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_call_functions_with_chat_models.ipynb) and [json support with OpenAI](https://yonom.substack.com/p/native-json-output-from-gpt-4) 
- [AutoLabel](https://github.com/refuel-ai/autolabel) A nice pythonic system for generating semantic labels repeatedly for use in downstream datasets



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

## TO ORGANIZE

## Recurrent and self-improving

- ‼️ [ReAct](https://arxiv.org/abs/2210.03629) [Github](https://github.com/ysymyth/ReAct) 
  - Effectively Observe, Think, Act, Repeat. Has limited action space 
- [Reflexion](Reflexion: an autonomous agent with dynamic memory and self-reflection): "Reflexion, an approach that endows an agent with dynamic memory and self-reflection capabilities to enhance its existing reasoning trace and task-specific action choice abilities"
  - [Github](https://github.com/noahshinn024/reflexion)
  - [Inspired github](https://github.com/GammaTauAI/reflexion-human-eval) 
- [Teaching Large Language Models to Self-Debug](https://arxiv.org/abs/2304.05128) `transcoder`
<img width="865" alt="image" src="https://user-images.githubusercontent.com/76016868/231906559-758d89e4-d22a-4a3a-aa96-1d630e48651d.png">

- [Self-play GPT](https://arxiv.org/pdf/2305.10142.pdf) Uses different LLMs and different roles to provide feedback on how to improve and enable autonomous improvement while game playing. 
- [Language Models can Solve Computer Tasks](https://arxiv.org/pdf/2303.17491.pdf), [Website](https://posgnu.github.io/rci-web/), [GitHub](https://github.com/posgnu/rci-agent) USes Recursive Criticism and Improvement. Combining with Chain of Thought it is even better. The method: Plan: Critique, Improve 
  - Explicit RCI: "Review your previous answer and find problems with your answer." --> "Based on the problems you found, improve your answer." Recursively Criticizes and Improves its output. This sort of prompting outperforms Chain of Thought, and combined it works even better.  
- [GPT-Bargaining](https://github.com/FranxYao/GPT-Bargaining) Uses multiple rounds to improve negotiation tactics based on external feedback. (Manager-like)
- ‼️[RL4L Allen ai](https://arxiv.org/pdf/2305.08844.pdf) Uses smaller critique model feedback to improve larger model output with a policy gradient to fine-tune the critique model while allowing reasonable performance gains. [Github](https://github.com/allenai/RL4LMs)

- [Strategic Reasoning with Language Models](https://arxiv.org/abs/2305.19165?utm_source=substack&utm_medium=email) Uses game trees and observed and inferred beliefs to achieve closer to optimal results. Powerful to consider for inferred beliefs and interacting in situations where negotiation or games are being played.
<img width="1008" alt="image" src="https://github.com/ianderrington/general/assets/76016868/5ffa0653-a323-44a6-bff5-b49e3be6091a">
https://arxiv.org/pdf/2306.08640.pdf

### Agentic


#### Results
- [Toolformer](https://arxiv.org/pdf/2302.04761.pdf) This section describes GPT that has been enabled with more 'agency' or the ability to do better.
- [HuggingGPT of 2023](https://arxiv.org/pdf/2303.17580.pdf) This paper describes a paradigm where ChatGPT is enabled with the ability to launch other ML models based on input. It does so by creating a Task list, then by identifying appropriate models, and then executing them.
  - ‼️ [Github repo known as JARVIS here](https://github.com/microsoft/JARVIS)
  - [TaskMatrix.ai](https://arxiv.org/abs/2303.16434) seemingly from the same authors. 
- [AUTO GPT](https://github.com/Torantulino/Auto-GPT) Auto GPT
- ‼️ [GPT engineer](https://github.com/AntonOsika/gpt-engineer )
- ‼️ [BabyAGI](https://github.com/yoheinakajima/babyagi)
- ‼️ [CAMEL](https://github.com/camel-ai/camel) inception prompting to guide chat agents toward task completion. Also [implemented in Langchain](https://python.langchain.com/en/latest/use_cases/agent_simulations/camel_role_playing.html)
- [Loop GPT](https://github.com/farizrahman4u/loopgpt) A re-implementation of Auto-GPT with modularity and extensibility in mind. 
- [Chameleon GPT](https://arxiv.org/pdf/2304.09842.pdf) A multi-agentic service that is able to accomplish many separate tasks, building it compositionally. (Project Idea: build in Langchain???)
<img width="1191" alt="image" src="https://github.com/ianderrington/general/assets/76016868/0dc2f25a-0eea-42ed-a108-c90cfeed8e1d">
- [Baize: An Open-Source Chat Model with Parameter-Efficient Tuning on Self-Chat Data](https://arxiv.org/pdf/2304.01196.pdf) Parameter efficient LLama Tuning and risk minimization with a new 'Self Distillation' with Feedback to improve itself even more. RESEARCH ONLY
- ‼️[Robo-GPT](https://github.com/rokstrnisa/Robo-GPT)
- (Open source + Product) [Agent-GPT](https://github.com/reworkd/AgentGPT) and [WEbsite](https://agentgpt.reworkd.ai/) --> Doesn't have agency/tools... So it is not good. A fancy wrapper for multi-task planning and execution. Limited at present. 
- ‼️ (Open source + product) [Super-AGI](https://github.com/TransformerOptimus/SuperAGI)  --> Seemingly better than SuperAGI because more tools accessible and GUI. Allows multiple agents (no communication though)
- ‼️  [AssistGPT: A General Multi-modal Assistant that can Plan, Execute, Inspect, and Learn] (https://arxiv.org/pdf/2306.08640.pdf) [Webpage](https://showlab.github.io/assistgpt/) Uses PEIL PLan execute inspect learn. Code coming soon. 
- ‼️ [GPT Engineer](https://github.com/AntonOsika/gpt-engineer)

### Agent Improvements

- [Learning to Reason and Memorize with Self-Notes](https://adapterhub.ml/) "Allows model to deviate from input context at any time to reason and take notes"

<img width="685" alt="image" src="https://github.com/ianderrington/general/assets/76016868/e3b9ed66-18a8-451b-b29a-09815d7791d1">

- [Large language models as tool makers](https://arxiv.org/pdf/2305.17126.pdf) [Github](https://github.com/ctlllll/llm-toolmaker) Allows high-quality tools to be reused by more lightweight models.

<img width="545" alt="image" src="https://github.com/ianderrington/general/assets/76016868/fc0d79fd-54b7-493b-93a4-5eafd76584a6">

- [CREATOR: Disentangling Abstract and Concrete Reasonings of Large Language Models through Tool Creation](https://arxiv.org/pdf/2305.14318.pdf)

  <img width="750" alt="image" src="https://github.com/ianderrington/general/assets/76016868/0762aaaf-871e-495c-b560-f4e019c8020e">
<img width="1012" alt="image" src="https://github.com/ianderrington/general/assets/76016868/81b88f7e-af2e-424e-9cb8-0e377bc141c0">





## Agentic
- [smolai](https://github.com/ThomasEwing04/SMOL_AI) https://www.youtube.com/watch?v=zsxyqz6SYp8&t=1s

## Chatbots

- [LAION-AI](https://github.com/LAION-AI/Open-Assistant) An attempt an open-version of ChatGPT
