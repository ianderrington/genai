
## Chains

Chains can be considered linked generative interactions where information can be processed with interepreters, tools, or other agents/GenAIs.
Done well, they can be built up to form reasoning systems that can enable more successful reasoning, or task completion. 

These cna enable passing concepts or data and re-introducing them directly throughout the database. 


## Basic Chains

Break an article up. This concept needs to carry forward in all mentions of items.

jStarting from an input, an input may first analyzed with another algorithm, such as by splitting or substituting for html link for a token representing a variable. This output may then be directed to part of a template. The prompt-template. The prompt-templates then fill in the information. This information is then passed to the LLM. Then the LLM generates the output. This output may then again be processed to re-introduce extracted information removed the original prompt call (like htmls), to use the output to affect the next actions to be taken, such as printing the output for a person, calling programatic functions (tools) or sharing with specific downstream chains (routing).


### Examples

- Basic Chain (Chat) 
  - With human interaction
  - With prompt structuring. 

- Routing Chain

Chain with memory storage and retrieval
Chain with memory retrival 
Multi-model chains.

(Other chains from lang-chain)





## Resources

- [Chain of thought hub](https://github.com/FranxYao/chain-of-thought-hub)

## Concepts

### Thought Structures
<div class="result" markdown>
!!! tip "[Skeleton of Thought](https://arxiv.org/pdf/2307.15337.pdf)" 
    A nice structure that resembles thoughtful creation of answers allowing for parallelization and hence speedup, with comparable or better results in answer generation. 
    
</div>
<div class="result" markdown>
!!! tip "[Large Language Model Guided Tree-of-Thought](https://arxiv.org/abs/2305.08291)" 
    [Github](https://github.com/jieyilong/tree-of-thought-puzzle-solver)
</div>
<div class="result" markdown>
!!! tip "‼[Tree of Thoughts: Deliberate Problem Solving with Large Language Models](https://arxiv.org/abs/2305.10601)"
    [Github](https://github.com/ysymyth/tree-of-thought-llm)
IDEA: Write Tree of Thoughts into Langchain?
</div>
<div class="result" markdown>
!!! tip "[Meta Tree of thought](https://github.com/kyegomez/Meta-Tree-Of-Thoughts)"
</div>
<div class="result" markdown>
!!! tip "[Graph of Thought](https://www.linkedin.com/posts/tonyseale_gpt4-promptengineering-semanticweb-activity-7075381524631580672-TAv3/)" 
    An excellent thought on what next to consider when dealing with knowledge (or other output like information) generation chains.
    ![image](https://github.com/ianderrington/genai/assets/76016868/9f195465-2b6b-47b7-9041-369ad0597649)
</div>
<div class="result" markdown>
!!! tip "[Certified Reasoning with Language models](https://arxiv.org/abs/2306.04031)"
    A 'logical guide' tool that an LLM can use. It " uses _constrained decoding_ to ensure the model will incrementally generate one of the valid outputs." 
</div>
<div class="result" markdown>
!!! tip "[UNLEASHING COGNITIVE SYNERGY IN LARGE LANGUAGE MODELS: A TASK-SOLVING AGENT THROUGH MULTI-PERSONA SELF-COLLABORATION](https://arxiv.org/pdf/2307.05300.pdf)"

    Uses a prompt that initiates a group of personas to be used withing the same LLM call to facilitate collaborative analysis and creation of the final output. Solid improvement but comparisons to other techniques uncertain
??? example "[Example prompt](https://github.com/MikeWangWZHL/Solo-Performance-Prompting/blob/main/prompts/trivia_creative_writing.py)" 
   
    ```python

        spp_prompt = '''When faced with a task, begin by identifying the participants who will contribute to solving the task. Then, initiate a multi-round collaboration process until a final solution is reached. The participants will give critical comments and detailed suggestions whenever necessary.

        Here are some examples:
        ---
        Example Task 1: Use numbers and basic arithmetic operations (+ - * /) to obtain 24. You need to use all numbers, and each number can only be used once.
        Input: 6 12 1 1

        Participants: AI Assistant (you); Math Expert

        Start collaboration!

        Math Expert: Let's analyze the task in detail. You need to make sure that you meet the requirement, that you need to use exactly the four numbers (6 12 1 1) to construct 24. To reach 24, you can think of the common divisors of 24 such as 4, 6, 8, 3 and try to construct these first. Also you need to think of potential additions that can reach 24, such as 12 + 12.
        AI Assistant (you): Thanks for the hints! Here's one initial solution: (12 / (1 + 1)) * 6 = 24
        Math Expert: Let's check the answer step by step. (1+1) = 2, (12 / 2) = 6, 6 * 6 = 36 which is not 24! The answer is not correct. Can you fix this by considering other combinations? Please do not make similar mistakes.
        AI Assistant (you): Thanks for pointing out the mistake. Here is a revised solution considering 24 can also be reached by 3 * 8: (6 + 1 + 1) * (12 / 4) = 24.
        Math Expert: Let's first check if the calculation is correct. (6 + 1 + 1) = 8, 12 / 4 = 3, 8 * 3 = 24. The calculation is correct, but you used 6 1 1 12 4 which is not the same as the input 6 12 1 1. Can you avoid using a number that is not part of the input?
        AI Assistant (you): You are right, here is a revised solution considering 24 can be reached by 12 + 12 and without using any additional numbers: 6 * (1 - 1) + 12 = 24.
        Math Expert: Let's check the answer again. 1 - 1 = 0, 6 * 0 = 0, 0 + 12 = 12. I believe you are very close, here is a hint: try to change the "1 - 1" to "1 + 1".
        AI Assistant (you): Sure, here is the corrected answer:  6 * (1+1) + 12 = 24
        Math Expert: Let's verify the solution. 1 + 1 = 2, 6 * 2 = 12, 12 + 12 = 12. You used 1 1 6 12 which is identical to the input 6 12 1 1. Everything looks good!

        Finish collaboration!

        Final answer: 6 * (1 + 1) + 12 = 24

        ---
        ...
        '''
    ```
</div>

## Enhancements

- ‼️ [EmbedChain](https://github.com/embedchain/embedchain) Creates embeddings for bots to be used. 


## Implementation Frameworks

### Langchain
- ‼️[Langchain](https://python.langchain.com/en/latest/#) A primative python or javascript based primitive 'LLM' language that enables planned and agentic AI.
- ‼️[Langflow](https://github.com/logspace-ai/langflow) 
- ‼️[Awesome Langchain](https://github.com/kyrolabs/awesome-langchain)
- ‼️[Toolkit](https://www.toolkit.club/) Generates LangChain plugins

#### Tutorials
  - https://www.pinecone.io/learn/langchain-prompt-templates/
  - https://learn.deeplearning.ai/langchain/lesson/3/memory

## Llama index
- [llama index](https://www.llamaindex.ai/) and [Github](https://github.com/jerryjliu/llama_index) for integrating data ingestion and models. 
- [LlamaHub (community library of data loaders)](https://llamahub.ai)
- [LlamaLab (cutting-edge AGI projects using LlamaIndex)](https://github.com/run-llama/llama-lab)

 
## Others
- ‼️[Flowise](https://github.com/FlowiseAI/Flowise)
- ！[Chain Forge](https://github.com/ianarawjo/ChainForge) A data flow prompt engineering environment for evaluating ana analyzing LLM responses
- ‼️[llm-chain](https://docs.llm-chain.xyz/docs/introduction) ChatGPT and Alpaca support. Agentic with bash commands.
- [Auto Chain](https://github.com/Forethought-Technologies/AutoChain) 
- ‼️[Ollama.ai](https://olama.ai) Provides on mac silicon Llama2 calling. Has a great idea that resembles docker files for agent creation and pulling.

