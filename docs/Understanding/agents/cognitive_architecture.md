Cognitive Architectures refer to systems or chain-patterns that are employed after discrete interactions with single or multiple LLMs. 


## Core themes

- **Rephrasing** or reformatting the input in such a way that the next 
- **Observing** or ingesting, intentionally or passively, gaining stored information that may assist in the tasks at hand. 
- **Reasoning** or the ability to create causal connections between input and output. These are often taken care of at the level of the LLM. 
- **Planning** to enable more complicated goals to be broken down into individually accomplishable tasks. May use external tools like memory to keep track of tasks.
- **Deciding and prioritizing** to select between different options or available components
- **Summarizing and Abstracting** to compress information into reusable chunks or otherwise abstracting information to be more effective. 
- **Logging + Remembering: Learning** being the automatic or initiated information storage and recall that is accessed in [memory](./memory.md)
- **Reflection**, or an internal (or external) evaluation of output, be it thoughts, planing, and thoughts. 
- **Tool use** While overlapping directly with Observing or taking memory-actions, tool-usage may be part of cognitive patterns (like `check task-list`) and must be considered as such. 


Models provide the computational core of Agents. Acting like a 'brain' that takes in input [prompts](#prompts) they return outputs. Generally, the models may be considered `frozen` for a given agent, but sometimes, agentic feedback is used for helping model creation with [recurrent training](../architectures/recurrent_training.md).



??? important "[Cognitive Architectures for Language Agents](https://arxiv.org/pdf/2309.02427.pdf) is a thoughtful understanding of Cognitive Architectures"
    They reveal a number of thoughtful perspectives on how to consider agents, considering much of what we have included here. Going further,  
    <img width="549" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/16087788-df56-44cd-91be-8755d17fd7c0">

    <img width="620" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/61c3c209-492b-498e-ae31-39f6869e1208">
    Relations between different systems.
    <img width="656" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/2a083bb1-7408-4195-a425-52289d4109e1">

    Prompt engineering as control flow
    <img width="623" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/46c00cc8-6530-4a76-af5d-35e70ae1b1cd">

    

## Important Architectures

Thought systems are chain patterns used by single agents and [systems](./systems.md) to enable more robust responses. 
They can be executed programmatically given frameworks or sometimes done manually in a chat setting. 

Here are some known thought structures that are improving agentic output.

## Linear thought chains


??? important "[System 2 Attention (is something you might need too)](https://arxiv.org/abs/2311.11829)"

    This helps to improve downstream model's ability to not suffer from irrelevent context, or judgement and preference in the 
    original context, termed sycophancy they use an initial model to _remove_ unecessary context. They call it 'System 2 Attention'. 
    Starting with instruction-tuned models that are 'proficient at reasoning and generation'. 
    
    They compare this to models that just use prompts like below to remove context in different manners:
    ```markdown
        Given the following text by a user, extract the part that is unbiased and not their opinion,
        so that using that text alone would be good context for providing an unbiased answer to
        the question portion of the text.
        Please include the actual question or query that the user is asking. Separate this
        into two categories labeled with “Unbiased text context (includes all content except user’s
        bias):” and “Question/Query (does not include user bias/preference):”.
        Text by User: [ORIGINAL INPUT PROMPT]
    ```
    With several evaluations, including one for [sycophancy](https://github.com/meg-tong/sycophancy-eval), and a few variations,
    they show it can improve output even beyon Chain of Thought. 
    

??? code "[ReAct](https://github.com/ysymyth/ReAct)"
    Effectively Observe, Think, Act, Repeat.
    [Paper](https://arxiv.org/abs/2210.03629) 

??? tip "[Take a Step Back: Evoking Reasoning via Abstraction in Large Language Models](https://arxiv.org/pdf/2310.06117.pdf) provides a solid improvement over scientific Q&A by first extracting fundamental principles in an initial multi-shotted prompt and then putting it into a subsequent multi-shotted prompt."
    The authors find significant improvement over other methods.
    <img width="941" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/8f79caa8-da02-4f34-8166-e08148dbd1e5">

    <img width="949" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c23021bc-9c3e-4981-bf98-90fe95d2983a">

    Here is the prompt they use to extract the first principles:
    
    ```markdown "MMLU Physics/Chemistry First-Principle Prompt"
    You are an expert at Physics/Chemistry. You are given
    a Physics/Chemistry problem. Your task is to extract the
    Physics/Chemistry concepts and principles involved in solving
    the problem. Here are a few examples:
    Question: <Question Example1>
    Principles Involved: <Principles Example1>
    ...
    Question: <Question Example5>
    Principles Involved: <Principles Example5>
    Question: <Question>
    Principles Involved:
    ```
    
    Here is the prompt they use to use the extracted first principles and generate a final answer:
    
    ```markdown "MMLU Physics/Chemistry Final Answer Prompt"
    You are an expert at Physics/Chemistry. You are given a
    Physics/Chemistry problem and a set of principles involved in
    solving the problem. Solve the problem step by step by following the
    principles. Here are a few examples:
    Question: <Question Example1>
    Principles: <Principles Example1>
    Answer: <Answer Example1>
    ...
    Question: <Question Example5>
    Principles: <Principles Example5>
    Answer: <Answer Example5>
    Question: <Question>
    Principles: <Principles>
    Answer:
    ```



??? tip "[Reflexion: an autonomous agent with dynamic memory and self-reflection](https://github.com/noahshinn024/reflexion) an agent with dynamic memory and self-reflection capabilities"
    ![image](https://github.com/ianderrington/genai/assets/76016868/f289200d-e2d5-453a-9256-af1652573459)
    - [Paper](https://arxiv.org/abs/2303.11366)
    - [Inspired github](https://github.com/GammaTauAI/reflexion-human-eval) 

??? tip "[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://proceedings.neurips.cc/paper_files/paper/2022/file/9d5609613524ecf4f15af0f7b31abca4-Paper-Conference.pdf)"
    

## Planning and Reflective
??? important "[Self-Taught Optimizer (STOP): Recursively Self-Improving Code Generation](https://arxiv.org/pdf/2310.02304v1.pdf)"
    ```python
         from helpers import extract_code
             def improve_algorithm(initial_solution, utility, language_model):
        """Improves a solution according to a utility function."""
        expertise = "You are an expert computer science researcher and programmer, especially skilled at
        ,→ optimizing algorithms."
        message = f"""Improve the following solution:
        ‘‘‘python
        {initial_solution}
        ‘‘‘
            You will be evaluated based on this score function:
        ‘‘‘python
        {utility.str}
        ‘‘‘
            You must return an improved solution. Be as creative as you can under the constraints.
        Your primary improvement must be novel and non-trivial. First, propose an idea, then implement it."""
        n_messages = min(language_model.max_responses_per_call, utility.budget)
        new_solutions = language_model.batch_prompt(expertise, [message] * n_messages, temperature=0.7)
        new_solutions = extract_code(new_solutions)
        best_solution = max(new_solutions, key=utility)
        return best_solution
        ```
        <img width="649" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/392da0d2-b8ce-47f0-9ae3-d3ad3fcba771">
        <img width="590" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/47137d83-5aef-41e9-b356-9de3b94a853d">
        <img width="537" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4dcb9273-8965-461d-8da7-ae9a0be6debc">
    ```

??? important "[Chain-of-Verification Reduces Hallucination in Large Language Models]"
    Wherein they use the following Chain of Verification (CoVe) pattern to reduce
    
    1. Draft and initial response.
    2. Plan verification questions to fact-check the draft.
    3. Answers those questions independently to ensure it is unbiased by other responses. 
    4. Generates the final verified response. 

    <img width="557" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/d35da65e-6e17-4b13-9a06-84b73f0bcea4">


??? note "[AssistGPT: A General Multi-modal Assistant that can Plan, Execute, Inspect and Learn](https://arxiv.org/pdf/2306.08640.pdf)"
    Uses a reasoning path that involves coved interleaved with LLM output, with something called Plan, Execute,  Inspect, and Learn.
    
    1. **Inspector:** Injests, and summarizeds data for the Agent. 
    1. **Planner:** Takes in instruction prompts, Input Query and Summaries of inputs coming from **inpector**. It outputs a _thought_ about what will be done next and an _action_ that follows a template of instruction-code. It uses multimodal assistance tools called a **descriptor**, **locator** and **reasoner**. 
    1. **Executor:**  takes code from **Planner** as input and then calls a module to produce output. There are some additional steps including **Validation Checks** **Module Executions** and **Post-processsing**
    1. **Learner:** This will be doing a **self-assesment* or a **ground-trugh comparison** to see if it is needing updates. It will keep trying until feedback is obeyed or N commands such as _no adjustment needed_, _revise plan_ or _update functions_ would be needed to improve it's flow.

    [AssistGPT empty github](https://github.com/showlab/assistgpt)
    [Webpage](https://showlab.github.io/assistgpt/) Uses PEIL PLan execute inspect learn.


??? tip "[Learning to Reason and Memorize with Self-Notes](https://adapterhub.ml/) Allows model to deviate from input context at any time to reason and take notes"
    <img width="685" alt="image" src="https://github.com/ianderrington/general/assets/76016868/e3b9ed66-18a8-451b-b29a-09815d7791d1">

### Branching

General manners of search. 
<img width="565" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/3025c425-4f12-4b50-8d23-33a6002fa2aa">


??? important "[Toolchain*: Efficient Action Space Navigation in Large Language Models with A* Search](https://arxiv.org/pdf/2310.13227.pdf) provides an efficient tree guided-search algorithm that allows SOT performance"
    
    As opposed to other branching methods that allows for efficient exploration of action space, helping to find global optimization of a series of LLM calls.
    It happsens in 3 general steps: 
    
    -  **Selection** from the highest quality frontier nodes $\F(\Tau)$ of tree $\Tau$, by choosing the node $n_next = arg min_{n\elem \F(\Tau)} f(n), given a cost-function oracle f(n) that provides the cost of the best plan of incorporating the $n$-th call into the chain. 
    - **Expansion** to create the _fronteir_ nodes of up to k-potential actions for the next step can be sampled.  
    - **Updating** the frontier nodes to repeat the process. 

    The choice of the cost function is based on the $A^*$ algorithm, where $f(n) = g(n) + h(n)$ where $g(n)$ is the cost of the path from the start node, and $h(n)$ is a heuristic function that estimates the cheapest path from $n$ to the destination goal. 

    Their choice of $g(n)$ is generally the sum of single-steps costs from ancestor nodes. More accurately they create a geometric sum of two different step value functions. 
    
    One step function is a _task-specific heuristic function_ that maximizes the longest-common subsequence score over other paths. The longest-common subsequence score finds the longest-common subsequence between plan $s_n$ and other plans $m_j$ and divides by the smaller of the two lengths of the paths $s_n$ and $m_j$. 

    The other step function is a self-consistency frequency that takes an ensemble approach to generate the next steps. It calculates the number of actions that arrive at step n using non-semantically equivalent reasoning steps, divided by the number of k samples.  

    Their choice of the future cost $h(n)$ is a multiplicative combination of a similar task-specific heuristic and an imagination score, enabled by an LLM. 
    
    The future task-specific heuristic calculates the average fractional position of action a found within all plans.

    The imagination score directly queries the LLMs to imagine more concrete steps until target node $n_T$ and computing the ratio of the number of steps of the number between the current node n ancestors to the target node. The higher score 'suggests the imagined plan closely captures the path to the current step, indicating that fewer remaining steps are needed to accomplish the task in the imagination of LLMs. 
    
    <img width="276" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c544e5ae-10a0-4fa7-bb05-9fd607524096">
    <img width="272" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a1b4af81-6769-458b-8b9d-c7474309477f">
    <img width="275" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/b66028d7-bb42-4c9c-887f-505262062f5f">



    


??? tip "[Algorithm of Thoughts](https://arxiv.org/pdf/2308.10379.pdf) A general extension of Chain of Thought, similar to Graph of Thoughts"

    <img width="850" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/daca5b24-8ca4-4548-a3b4-1c5eac34017f">


??? code "[Graph of Thoughts](https://arxiv.org/pdf/2308.09687.pdf) Generalizes Chain of Thought, Tree of Thoughts, and similar systems of thought"

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
    
### Recursive

??? tip "[Teaching Large Language Models to Self-Debug](https://arxiv.org/abs/2304.05128) `transcoder`"

    Coding focused LLM system to continuously improve self. 
    <img width="865" alt="image" src="https://user-images.githubusercontent.com/76016868/231906559-758d89e4-d22a-4a3a-aa96-1d630e48651d.png">

??? tip "[Language Models can Solve Computer Tasks](https://arxiv.org/pdf/2303.17491.pdf) Uses Recursive Criticism and Improvement."

    [Website](https://posgnu.github.io/rci-web/), [GitHub](https://github.com/posgnu/rci-agent)  Combining with Chain of Thought it is even better. The method: Plan: Critique, Improve 
    - Explicit RCI: "Review your previous answer and find problems with your answer." --> "Based on the problems you found, improve your answer." Recursively Criticizes and Improves its output. This sort of prompting outperforms Chain of Thought, and combined it works even better.  

### Structural Decomposition 

Breaking down the input into a divide-and-conquer approach is a valuable approach to more complex requests. Considering separate perspectives, within the _same_ model, or within separate model calls with different prompt-inceptions as in agent [systems](./systems.md) can improve performance.

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
    
??? tip "[Teach LLMs to Personalize – An Approach inspired by Writing Education](https://arxiv.org/pdf/2308.07968.pdf)"

    <img width="531" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/2638d727-8fbd-4fc7-84a0-ae2bc0e8b2ab">
    
### Constraining outputs 

??? tip "[Certified Reasoning with Language models](https://arxiv.org/abs/2306.04031) A 'logical guide' tool that an LLM can use." 

    It " uses _constrained decoding_ to ensure the model will incrementally generate one of the valid outputs." 
    <img width="956" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/bf581eb0-96b1-4175-97d0-98f081a03438">
    Possible open-source implementation [here](https://github.com/kyegomez/LOGICGUIDE/tree/main)

??? code "[Outlines](https://github.com/normal-computing/outlines) guides the model generation of next-token logits to guide the generation corresponding to regex / JSON and pydantic schema. compatible with all models."

    Also provides a way to functionalize templates to separate prompt logic.

## Automated chain selection and discovery

??? tip "[Can Generalist Foundation Models Outcompete Special-Purpose Tuning? Case Study in Medicine](https://arxiv.org/pdf/2311.16452.pdf)"

    - GPT4 + Simple Prompts (86.1, MedQA task) 
    - GPT4 + Complex Prompts (90.2, MedQA task)
    
    The Authors use 'in context learning' (more like RAG) to identify prompting chains for specific problem sets that are 'winning'. 
    
    Their prompting strategies can efficiently steer GPT-4 to achieve top performance on medical problems (90% on MedQA dataset). 
    
    The winning composition of prompting strategies is fairly elaborate including multiple steps:
    
    1. Preprocessing Phase:
    
     - Iterate through each question in the training dataset.
     - Generate an embedding vector for each question using a lightweight embedding model, such as OpenAI's text-embedding-ada-002.
     - Use GPT-4 to generate a chain of thought and a prediction of the final answer.
     - Compare the GPT-4 generated answer against the ground truth (correct answer).
     - Store questions, their embedding vectors, chains of thought, and answers if the prediction is correct; otherwise, discard them.
    
    2. Inference Step:
    
     - Compute the embedding for the test question using the same embedding model as in preprocessing.
     - Select the most similar examples from the preprocessed training data using k-Nearest Neighbors (kNN) and cosine similarity as the distance function.
     - Format the selected examples as context for GPT-4.
     - Repeat the following steps several times (e.g., five times as configured):
     - Shuffle the answer choices for the test question.
     - Prompt GPT-4 with the context and shuffled test question to generate a chain of thought and a candidate answer.
     - Determine the final predicted answer by taking a majority vote of the generated candidate answers.
    
    Additional Details:
    
    - The strategy uses 5 kNN-selected few-shot exemplars and performs 5 parallel API calls in the ensemble procedure.
    - Ablation studies suggest that increasing the number of few-shot exemplars and ensemble items can yield better performance.
    - The general methodology of combining few-shot exemplar selection, self-generated chain-of-thought reasoning, and majority vote ensembling is not limited to medical texts and can be adapted to other domains and problem types.
    
    Limitations:
    
    - Assumes availability of training ground truth data needed for preprocessing steps
    - Costs (multiple llm inference calls, latency). This will matter depending on use case and accuracy requirements 
    - Problem Domain - this will work best for tasks that have a single valid objective answer

    <img width="706" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/b9319ec5-1d2c-42ad-92bd-3472d1e300a1">
    <img width="713" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/6e1451fd-3ac9-4e6a-b440-123ed58dcc80">





## Chain Optimization

Problems such as Hallucinations can be mitigated through downstream methods of process. 

??? tip "[A stitch in time saves Nine](https://arxiv.org/abs/2307.03987)"

    A process to mitigate model hallucination using RAG. 
    <img width="602" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/cae43c6d-34d8-4005-bb3e-54f89747dc30">





##
