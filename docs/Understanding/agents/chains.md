Language models produce outputs based on their model and input prompts. **Chains** allow for richer and more valuable outputs by connecting inputs + outputs with other components. These components may process GenAI output, enable the execution of [actions and tools](./actions_and_tools.md), and interact with [memory](./memory.md). Chains can be used to build more complex and integrated systems to enable higher-quality reasoning and results.

Because of their nature, chains can be constructed in a more [basic](#basic-chains), linear fashion - as in the case of the LLM-enabled chats. They can also be constructed more generally with parallel GenAI calls, resulting in [graph chains](#graph-chains) of varying complexity, which have been shown to increase performance further. 

Each call to GenAI may be considered a _chain node_ with constant parameters, such as [_prompt templates_](#prompt-templates), and variable parameters that are governed by external functions (including other chain/GenAI calls). 

Both [basic](#basic-chains) and [graph](#graph-chain) can enable [cognitive architectures](cognitive_argitecture.md) that further improve their performance by using specific prompts that are separated in different calls or combined in a singular prompt, that guide GenAI chained outputs and inputs. 

## Basic Chains

Input to a chain node may be passed directly, embedded into a prompt template, and/or processed with traditional algorithms, like regular expressions, and augmented with [memory](./memory.md) before being processed by the GenAI. 

### Prompt templates

The prompt templates are an unresolved string that is completed before passing to a GenAI request.  Basic templates codify general [prompt-engineering](../prompting/index.md) patterns to lead to the more desired outputs.


### Chain components

There are different components of chains. They involve interactions with different units. 

#### Memory Interactions

#### Supervision
When a model's output, or processes or methods/prompts used as part of generating a model's output are supervised, additional feedback can help to improve the outcome. In some manner, not necessarily the self-same model would evaluate these and provide inputs to help improve subsequent trial outcomes. 


MANAGEN IMPROVE:
When a model questions it's own, or another's output in creates an _interrogation_ that can be used as input to the model to improve it's output. Such chain 

!!! important "[Let's verify step by step](https://arxiv.org/abs/2305.20050)"