Cognitive Architectures refer to systems or chain-patterns that are employed after discrete interactions with ah LLM. 


## 

Core components include:
- **Reasoning** or the ability to create causal connections between input and output. These are often taken care of at the level of the LLM
- **Planning** to enable more complicated goals to be broken down into individually accomplishable tasks. May use external tools like memory to keep track of tasks. 
- **Observing** or injesting or seeking out new or stored information that may assist in the tasks at hand. 
- **Summarizing** to compress information into memory or t
- **Logging + Remembering: Learning** being the automatic or initiated information storage and recall that is accessed in [memory](./memory.md)
- **Reflection**, or an internal (or external) evaluation of output, be it thoughts, planing, and thoughts. 
- **Tool use** While overlapping directly with Observing or taking memory-actions, tool-usage may be part of cognitive patterns (like `check task-list`) and must be considered as such. 


Models provide the computational core of Agents. Acting like a 'brain' that takes in input [prompts](#prompts) they return outputs. Generally, the models may be considered `frozen` for a given agent, but sometimes, agentic feedback is used for helping model creation with [recurrent training](../architectures/recurrent_training.md).

## Architecture Examples
??? important "[Cognitive Architectures for Language Agents](https://arxiv.org/pdf/2309.02427.pdf)"

    
??? code "[ReAct](https://github.com/ysymyth/ReAct)"
    - [Paper](https://arxiv.org/abs/2210.03629) 
    - Effectively Observe, Think, Act, Repeat.


??? tip "[Reflexion: an autonomous agent with dynamic memory and self-reflection](https://github.com/noahshinn024/reflexion) an agent with dynamic memory and self-reflection capabilities"
    ![image](https://github.com/ianderrington/genai/assets/76016868/f289200d-e2d5-453a-9256-af1652573459)
    - [Paper](https://arxiv.org/abs/2303.11366)
    - [Inspired github](https://github.com/GammaTauAI/reflexion-human-eval) 


??? note "[AssistGPT: A General Multi-modal Assistant that can PLan, Execute, Inspect and Learn](https://arxiv.org/pdf/2306.08640.pdf)"
    Uses a reasoning path that involves coved interleaved with LLM output, with something called Plan, Execute,  Inspect, and Learn.
    
    1. **Inspector:** Injests, and summarizeds data for the Agent. 
    1. **Planner:** Takes in instruction prompts, Input Query and Summaries of inputs coming from **inpector**. It outputs a _thought_ about what will be done next and an _action_ that follows a template of instruction-code. It uses multimodal assistance tools called a **descriptor**, **locator** and **reasoner**. 
    1. **Executor:**  takes code from **Planner** as input and then calls a module to produce output. There are some additional steps including **Validation Checks** **Module Executions** and **Post-processsing**
    1. **Learner:** This will be doing a **self-assesment* or a **ground-trugh comparison** to see if it is needing updates. It will keep trying until feedback is obeyed or N commands such as _no adjustment needed_, _revise plan_ or _update functions_ would be needed to improve it's flow.

    [AssistGPT empty github](https://github.com/showlab/assistgpt)
    [Webpage](https://showlab.github.io/assistgpt/) Uses PEIL PLan execute inspect learn.


??? tip "[Learning to Reason and Memorize with Self-Notes](https://adapterhub.ml/) Allows model to deviate from input context at any time to reason and take notes"
    <img width="685" alt="image" src="https://github.com/ianderrington/general/assets/76016868/e3b9ed66-18a8-451b-b29a-09815d7791d1">

