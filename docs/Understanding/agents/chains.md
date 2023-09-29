Language models produce outputs based on their model and input prompts. **Chains** allow for richer and more valuable outputs by connecting inputs + outputs with other components. These components may process GenAI output, enable the execution of [actions and tools](./actions_and_tools.md), and interact with [memory](./memory.md). Chains can be used to build more complex and integrated systems to enable higher-quality reasoning and results.

Because of their nature, chains can be constructed in a more [basic](#basic-chains), linear fashion - as in the case of the LLM-enabled chats. They can also be constructed more generally with parallel GenAI calls, resulting in [graph chains](#graph-chains) of varying complexity, which have been shown to increase performance further. 

Each call to GenAI may be considered a _chain node_ with constant parameters, such as [_prompt templates_](#prompt-templates), and variable parameters that are governed by external functions (including other chain/GenAI calls). 

Both [basic](#basic-chains) and [graph](#graph-chain) can rely on [thought systems](#thought-systems) that further improve their performance by using specific prompts that are separated in different calls or combined in a singular prompt, that guide GenAI chained outputs and inputs. 

## Basic Chains

Input to a chain node may be passed directly, embedded into a prompt template, and/or processed with traditional algorithms, like regular expressions, and augmented with [memory](./memory.md) before being processed by the GenAI. 

### Prompt templates

The prompt templates are an unresolved string that is completed before passing to a GenAI request.  Basic templates codify general [prompt-engineering](../prompting/index.md) patterns to lead to the more desired outputs.

### Thought Systems

Thought systems are chain patterns used by single agents and [systems](./systems.md) to enable more robust responses. 
They can be executed programmatically given frameworks or sometimes done manually in a chat setting. 

Here are some known thought structures that are improving agentic output.

??? tip "[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://proceedings.neurips.cc/paper_files/paper/2022/file/9d5609613524ecf4f15af0f7b31abca4-Paper-Conference.pdf)"

    <img width="537" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4dcb9273-8965-461d-8da7-ae9a0be6debc">

### Recursive

??? tip "[Teaching Large Language Models to Self-Debug](https://arxiv.org/abs/2304.05128) `transcoder`"

    Coding focused LLM system to continuously improve self. 
    <img width="865" alt="image" src="https://user-images.githubusercontent.com/76016868/231906559-758d89e4-d22a-4a3a-aa96-1d630e48651d.png">

??? tip "[Language Models can Solve Computer Tasks](https://arxiv.org/pdf/2303.17491.pdf) Uses Recursive Criticism and Improvement."

    [Website](https://posgnu.github.io/rci-web/), [GitHub](https://github.com/posgnu/rci-agent)  Combining with Chain of Thought it is even better. The method: Plan: Critique, Improve 
    - Explicit RCI: "Review your previous answer and find problems with your answer." --> "Based on the problems you found, improve your answer." Recursively Criticizes and Improves its output. This sort of prompting outperforms Chain of Thought, and combined it works even better.  

### Structural Decomposition 

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

## Graph chains

!!! tip "[Algorithm of Thoughts](https://arxiv.org/pdf/2308.10379.pdf) A general extension of Chain of Thought, similar to Graph of Thoughts"

    <img width="850" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/daca5b24-8ca4-4548-a3b4-1c5eac34017f">


!!! code "[Graph of Thoughts](https://arxiv.org/pdf/2308.09687.pdf) Generalizes Chain of Thought, Tree of Thoughts, and similar systems of thought"

    <img width="753" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/7edd59b0-d6bb-4d70-9fba-90c8f705fc98">

??? tip "[Graph of Thought](https://www.linkedin.com/posts/tonyseale_gpt4-promptengineering-semanticweb-activity-7075381524631580672-TAv3/)" 

    An excellent thought on what next to consider when dealing with knowledge (or other output like information) generation chains.
    ![image](https://github.com/ianderrington/genai/assets/76016868/9f195465-2b6b-47b7-9041-369ad0597649)

??? code "[Meta Tree of thought](https://github.com/kyegomez/Meta-Tree-Of-Thoughts)"

    <img width="1663" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e516604b-57b2-4d82-b9a9-0168c8eb9f15">

??? tip "[Strategic Reasoning with Language Models](https://arxiv.org/abs/2305.19165) Uses game trees and observed and inferred beliefs to achieve closer to optimal results. "

     Powerful to consider for inferred beliefs and interacting in situations where negotiation or games are being played.
    <img width="1008" alt="image" src="https://github.com/ianderrington/general/assets/76016868/5ffa0653-a323-44a6-bff5-b49e3be6091a">

??? code "[Large Language Model Guided Tree-of-Thought](https://arxiv.org/abs/2305.08291)"

    [Github](https://github.com/jieyilong/tree-of-thought-puzzle-solver)


??? code "[Tree of Thoughts: Deliberate Problem Solving with Large Language Models](https://arxiv.org/pdf/2305.10601.pdf) A method that allows for idea-expansion and selection of the final result output by choosing the best at each stage."  

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

#### Problem decomposition

Breaking down the input into a divide-and-conquer approach is a valuable approach to more complex requests. Considering separate perspectives, within the _same_ model, or within separate model calls with different prompt-inceptions as in agent [systems](./systems.md) can improve performance.

??? tip "[Question Decomposition Improves the Faithfulness of Model-Generated Reasoning](https://arxiv.org/pdf/2307.11768.pdf)"

    <img width="1287" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/0d51fbcc-8179-46c2-b1dc-37d2e2a6a420">
    [A nice discussion on it](https://www.forbes.com/sites/lanceeliot/2023/07/31/new-prompt-engineering-technique-pumps-up-chain-of-thought-with-factored-decomposition-and-spurs-exciting-uplift-when-using-generative-ai/)

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
    
??? tip [Teach LLMs to Personalize – An Approach inspired by Writing Education](https://arxiv.org/pdf/2308.07968.pdf)

    <img width="531" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/2638d727-8fbd-4fc7-84a0-ae2bc0e8b2ab">
    
### Constraining outputs 

??? tip "[Certified Reasoning with Language models](https://arxiv.org/abs/2306.04031) A 'logical guide' tool that an LLM can use." 

    It " uses _constrained decoding_ to ensure the model will incrementally generate one of the valid outputs." 
    <img width="956" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/bf581eb0-96b1-4175-97d0-98f081a03438">
    Possible open source implementation [here](https://github.com/kyegomez/LOGICGUIDE/tree/main)

??? code "[Outlines](https://github.com/normal-computing/outlines) guides the model generation of next-token logits to guide the generation corresponding to regex / JSON and pydantic schema. compatible with all models."

    Also provides a way to functionalize templates to separate prompt logic.


### Chain optimization 
Problems such as Hallucinations can be mitigated through downstream methods of process. 

??? tip "[A stitch in time saves Nine](https://arxiv.org/abs/2307.03987)"

    A process to mitigate model hallucination using RAG. 
    <img width="602" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/cae43c6d-34d8-4005-bb3e-54f89747dc30">

    
