
## Chains

Chains can be considered linked generative interactions where information can be processed with interpreters, tools, or other agents/GenAIs.
Done well, they can be built up to form reasoning systems that can enable more successful reasoning or task completion. 

These can enable passing concepts or data and re-introducing them directly throughout the database. 


## Basic Chains
Chains start with an input that may first be analyzed with another algorithm, such as by splitting or substituting an HTML link for a token representing a variable. This output may then be directed to part of a template. The prompt-template. The prompt templates then fill in the information. This information is then passed to the LLM. Then the LLM generates the output. This output may then again be processed to re-introduce extracted information removed from the original prompt call (like HTML), to use the output to affect the next actions to be taken, such as printing the output for a person, calling programmatic functions (tools) or sharing with specific downstream chains (routing).


### Examples

- Basic Chain (Chat) 
  - With human interaction
  - With prompt structuring. 

- Routing Chain

Chain with memory storage and retrieval
Chain with memory retrieval 
Multi-model chains.

(Other chains from lang-chain)





## Resources

- [Chain of thought hub](https://github.com/FranxYao/chain-of-thought-hub)

## Concepts

### Thought Structures
Thought structures are chain patterns used by singular (or even multiple agents in [systems](./systems.md) that enable more robust responses.  They can be executed automatically with the given frameworks and sometimes done manually in a chat setting. 

Here are some known thought structures that are improving agentic output.

#### Structural Decomposition 

<div class="result" markdown>
??? tip "[Skeleton of Thought](https://arxiv.org/pdf/2307.15337.pdf)" 
    A nice structure that resembles the thoughtful creation of answers allows for parallelization and hence speedup, with comparable or better results in answer generation. 
    <img width="408" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f5afe9d3-3f3a-4b32-b651-cb9dbb6132cd">

    ```markdown  title="Skeleton prompt template"
        [User:] You’re an organizer responsible for only giving the skeleton (not the full content) for answering the question.
        Provide the skeleton in a list of points (numbered 1., 2., 3., etc.) to answer the question. Instead of writing a full
        sentence, each skeleton point should be very short with only 3∼5 words. Generally, the skeleton should have 3∼10
        points.
        Question:
        What are the typical types of Chinese dishes?
        Skeleton:
        1. Dumplings.
        2. Noodles.
        3. Dim Sum.
        4. Hot Pot.
        5. Wonton.
        6. Ma Po Tofu.
        7. Char Siu.
        8. Fried Rice.
        Question:
        What are some practical tips for individuals to reduce their carbon emissions?
        Skeleton:
        1. Energy conservation.
        2. Efficient transportation.
        3. Home energy efficiency.
        4. Reduce water consumption.
        5. Sustainable diet.
        6. Sustainable travel.
        Now, please provide the skeleton for the following question.
        {question}
        Skeleton:
        [Assistant:] 1.
    ```
    ```markdown  title="Point expanding prompt template"
        [User:] You’re responsible for continuing the writing of one and only one point in the overall answer to the following
        question.
        {question}
        The skeleton of the answer is
        {skeleton}
        Continue and only continue the writing of point {point index}. Write it **very shortly** in 1∼2 sentence and
        do not continue with other points!
        [Assistant:] {point index}. {point skeleton}
    ```
</div>

<div class="result" markdown>
??? tip "[Large Language Model Guided Tree-of-Thought](https://arxiv.org/abs/2305.08291)" 
    [Github](https://github.com/jieyilong/tree-of-thought-puzzle-solver)
</div>

<div class="result" markdown>
??? tip "[Tree of Thoughts: Deliberate Problem Solving with Large Language Models](https://arxiv.org/pdf/2305.10601.pdf)
    A method that allows for idea-expansion and selection of the final result output by choosing the best at each stage."  
    **The thought flow**
    ![image](https://github.com/ianderrington/genai/assets/76016868/db284abd-642f-441a-be7e-12611d917b28)
    [Github](https://github.com/ysymyth/tree-of-thought-llm)
  
    "[Prompts compared](https://github.com/princeton-nlp/tree-of-thought-llm/blob/master/src/tot/prompts/text.py)"
    ```python
        standard_prompt = '''
        Write a coherent passage of 4 short paragraphs. The end sentence of each paragraph must be: {input}
        '''
        cot_prompt = '''
        Write a coherent passage of 4 short paragraphs. The end sentence of each paragraph must be: {input}
        
        Make a plan then write. Your output should be of the following format:
        
        Plan:
        Your plan here.
        
        Passage:
        Your passage here.
        '''
        
        vote_prompt = '''Given an instruction and several choices, decide which choice is most promising. Analyze each choice in detail, then conclude in the last line "The best choice is {s}", where s the integer id of the choice.
        '''
        
        compare_prompt = '''Briefly analyze the coherency of the following two passages. Conclude in the last line "The more coherent passage is 1", "The more coherent passage is 2", or "The two passages are similarly coherent".
        '''
        
        score_prompt = '''Analyze the following passage, then at the last line conclude "Thus the coherency score is {s}", where s is an integer from 1 to 10.
        ''' 
    ```
  
</div>

<div class="result" markdown>
??? tip "[Meta Tree of thought](https://github.com/kyegomez/Meta-Tree-Of-Thoughts)"
    <img width="1663" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e516604b-57b2-4d82-b9a9-0168c8eb9f15">

</div>

<div class="result" markdown>
??? tip "[Graph of Thought](https://www.linkedin.com/posts/tonyseale_gpt4-promptengineering-semanticweb-activity-7075381524631580672-TAv3/)" 
    An excellent thought on what next to consider when dealing with knowledge (or other output like information) generation chains.
    ![image](https://github.com/ianderrington/genai/assets/76016868/9f195465-2b6b-47b7-9041-369ad0597649)
</div>

<div class="result" markdown>
??? tip "[Strategic Reasoning with Language Models](https://arxiv.org/abs/2305.19165) Uses game trees and observed and inferred beliefs to achieve closer to optimal results. "
     Powerful to consider for inferred beliefs and interacting in situations where negotiation or games are being played.
    <img width="1008" alt="image" src="https://github.com/ianderrington/general/assets/76016868/5ffa0653-a323-44a6-bff5-b49e3be6091a">
</div>

#### Perceptive decomposition

Breaking up the topic by considering different personas, within the _same_ model-call partitions can be quite successful. Often [systems](./systems.md) can be used as well, though the complexity of implementation increases.

<div class="result" markdown>
??? tip "[Unleashing Cognitive Synergy in Large Language Models: A Task-Solving Agent Through Multi-person Self-Collaboration](https://arxiv.org/pdf/2307.05300.pdf)"
    Uses a prompt that initiates a group of personas to be used within the same LLM call to facilitate collaborative analysis and creation of the final output. Solid improvement but comparisons to other techniques are potentially uncertain.
   "[Example prompt](https://github.com/MikeWangWZHL/Solo-Performance-Prompting/blob/main/prompts/trivia_creative_writing.py)" 
   
    ```python title="Trivia writing SPP'

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
        
        '''
    ```
</div>

#### Tool requirements

<div class="result" markdown>
??? tip "[Certified Reasoning with Language models](https://arxiv.org/abs/2306.04031) A 'logical guide' tool that an LLM can use." 
    It " uses _constrained decoding_ to ensure the model will incrementally generate one of the valid outputs." 
</div>



## Implementation Frameworks

### Langchain

- [Langchain](https://python.langchain.com/en/latest/#) A primitive python or javascript-based primitive 'LLM' language that enables planned and agentic AI.
- [Langflow](https://github.com/logspace-ai/langflow) 
- [Awesome Langchain](https://github.com/kyrolabs/awesome-langchain)
- [Toolkit](https://www.toolkit.club/) Generates LangChain plugins

#### Tutorials

- https://www.pinecone.io/learn/langchain-prompt-templates/
- https://learn.deeplearning.ai/langchain/lesson/3/memory

### Llama index

- [llama index](https://www.llamaindex.ai/) and [Github](https://github.com/jerryjliu/llama_index) for integrating data ingestion and models. 
- [LlamaHub (community library of data loaders)](https://llamahub.ai)
- [LlamaLab (cutting-edge AGI projects using LlamaIndex)](https://github.com/run-llama/llama-lab)
- [Ollama.ai](https://olama.ai) Provides on mac silicon Llama2 calling. Has a great idea that resembles docker files for agent creation and pulling.
 
### Others

- [Flowise](https://github.com/FlowiseAI/Flowise)
- [Chain Forge](https://github.com/ianarawjo/ChainForge) A data flow prompt engineering environment for evaluating ana analyzing LLM responses
- [llm-chain](https://docs.llm-chain.xyz/docs/introduction) ChatGPT and Alpaca support. Agentic with bash commands.
- [Agent Flow](https://github.com/simonmesmith/agentflow)
- [Auto Chain](https://github.com/Forethought-Technologies/AutoChain) 


