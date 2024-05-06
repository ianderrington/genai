A cognitive architecture is a higher-level orchestration of individual interactions with input, LLMs, Memory, and Inputs. They are can be focused on both simple and complex tasks. 

One input call to an LLM output produces output(s) based on their input [prompts](../prompting/index.md).  Cognitive architectures, sometimes also considered [chains](#chains) allow for richer and more valuable outputs by connecting inputs + outputs with other components. These components may process GenAI output, enable the execution of [actions and tools](./actions_and_tools.md), and interact with [memory](./memory.md) in different forms of [#environments]. Chains can build more complex and integrated systems to enable higher-quality reasoning and results.

Biological [Connectionism and Cognitive Architecture](https://ruccs.rutgers.edu/images/personal-zenon-pylyshyn/proseminars/Proseminar13/ConnectionistArchitecture.pdf) considered design system with a connection of a large number but highly connected units to facilitate computational-like behavior seen from Animals. For Gen()AI, however, cognitive architectures can be constructed in more linear [chains](#chains), as in the case of the LLM-enabled chat, or more complex branching [graph chains](#graph-chains), which have been shown to increase performance. 

## Aspects of in Cognitive Architectures

### Activities
- **Rephrasing** or reformatting the input in such a way that the next
- **Observing** or ingesting, intentionally or passively, gaining stored information that may assist in the tasks at hand.
- **Reasoning** or the ability to create causal connections between input and output. These are often taken care of at the level of the LLM.
- **Planning** to enable more complicated goals to be broken down into individually accomplishable tasks. May use external tools like memory to keep track of tasks.
- **Deciding and prioritizing** to select between different options or available components
- **Summarizing and Abstracting** to compress information into reusable chunks or otherwise abstract information to be more effective.
- **Logging + Remembering: Learning** being the automatic or initiated information storage and recall that is accessed in [memory](./memory.md)
- **Reflection**, or an internal (or external) evaluation of output, be it thoughts, planning, and thoughts.
- **Tool use** While overlapping directly with Observing or taking memory actions, tool usage may be part of cognitive patterns (like using a `scratch-pad`) and must be considered as such.

### Models
Models provide the computational core of Agents. Acting like a 'brain' that takes in input [prompts](#prompts), they return outputs. Generally, the models may be considered `frozen` for a given agent, but sometimes, agentic feedback is used to help model creation with [recurrent training](../architectures/training/recurrent.md).

### Cognitive Architectures

???+ important "[Cognitive Architectures for Language Agents](https://arxiv.org/pdf/2309.02427.pdf) is a thoughtful understanding of Cognitive Architectures" cognitive-architectures
    They reveal a number of thoughtful perspectives on how to consider agents, considering much of what we have included here. Going further,
    <img width="549" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/16087788-df56-44cd-91be-8755d17fd7c0">

    <img width="620" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/61c3c209-492b-498e-ae31-39f6869e1208">
    Relations between different systems.
    <img width="656" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/2a083bb1-7408-4195-a425-52289d4109e1">

    Prompt engineering as control flow
    <img width="623" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/46c00cc8-6530-4a76-af5d-35e70ae1b1cd">

### Cognitive Topologies

???+ important "[Topologies of Reasoning: Demystifying Chains, Trees, and Graphs of Thoughts](https://arxiv.org/pdf/2401.14295.pdf) provide excellent ways of thinking about reasoning." topologies-of-reasoning
    
    The authors present topologies of reasoning as ways of thinking about reasoning using LLMs, or 'thoughts' that are called **nodes** and edges are dependencies between the thoughts are **edges**.
    If one thought is reachable from a task statement, that is a solution node, and the route is the **solution topology**. 

    They share thorough discussions on the following methods.
    
    1. Basic Input-Output (IO)
    2. Chain-of-Thought (CoT)
    3. Multiple CoTs (CoT-SC)
    4. Tree of Thoughts (ToT)
    5. Graph of Thoughts (GoT)

    They consider common concepts such as:

    1. Multistep reasoning
    2. Zero-Shot Reasoning
    3. Planning and & Task Decomposition
    4. Task Preprocessing
    5. Iterative Refinement
    6. Tool Utilizatoin
    

    <img width="745" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a0775270-66d5-445f-ac7e-4f4a77c7eb0d">

    They also summarize the general flow of a prompting interaction. 

    1. The user sends their prompt
    2. Preprocessing 
    3. Adding to into a prompting context
    4. Input the content to the LLM
    5. LLM Generation
    6. Post-processing (Checking NSFW)
    7. Returning information into the context,  and either
    8. Iterating before returning to the user
    9. Reply to the user
    
    <img width="729" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4823a84c-32fc-487f-b723-b013cf31a5c7">

    They then share some important concepts related to topology.

    <img width="738" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e25e44c1-51d5-4076-87de-4e4f2c28e264">

    

    They finally discuss Research opportunities:

    1. Exploring New Topology Classes
    2. Explicit Representation in Single-prompt Settings
    3. Automatically Deriving Tree and Graph Topologies
    4. Advancing Single-Prompt Schemes
    5. Investigating New Schedule Approaches
    6. Investigating Novel Graph Classes
    8. Integrating Graph Algorithms and Paradigms
    9. Diversifying Modalities in Prompting (multimodal)
    10. Enhancing Retrieval in Prompting
    11. Parallel Design in Prompting
    12. Integrating Structure-Enhanced Prompting with Graph Neural Networks
    13. Integrating Structure-Enhanced Prompting with Complex Architectures
    14. Hardware acceleration    




## Important Architectures

Thought systems are chain patterns used by single agents and [systems](./systems.md) to enable more robust responses.
They can be executed programmatically given frameworks or sometimes done manually in a chat setting.

Here are some known thought structures that are improving agentic output.

### Chains

???+ important "[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/pdf/2201.11903.pdf)"
    
    [Neurips paper](https://proceedings.neurips.cc/paper_files/paper/2022/file/9d5609613524ecf4f15af0f7b31abca4-Paper-Conference.pdf)"

    A classic paper, demonstrating the use of in-call task breakdown to better-enable more successful outputs. Often represented as appending a phrase such as `let's think about this step by step` both with and without exemplars to improve success quality going from zero to multi-shot prompts. 
    <img width="531" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/baf1ac6e-0a37-4b1d-83a5-925d12f91d66">


???+ code "![GitHub Repo stars](https://badgen.net/github/stars/ysymyth/ReAct) [ReAct]([ReAct](https://github.com/ysymyth/ReAct))"

    Effectively Observe, Think, Act, Repeat.
    [Paper](https://arxiv.org/pdf/2210.03629.pdf)

???+ abstract "[Self-Refine: Iterative Refinement with Self-Feedback](https://github.com/madaan/self-refine)" self-refine
    The authors reveal in their [paper](https://arxiv.org/pdf/2303.17651.pdf) that LLMs can generate feedback on their work, to repeatedly improve the output.
    ![image](https://github.com/ianderrington/genai/assets/76016868/e680022f-1f52-4cd1-a074-4eba542b2ba4)



???+ code "![GitHub Repo stars](https://badgen.net/github/stars/noahshinn024/reflexion) [Reflexion: an autonomous agent with dynamic memory and self-reflection]([Reflexion: an autonomous agent with dynamic memory and self-reflection](https://github.com/noahshinn024/reflexion)) an agent with dynamic memory and self-reflection capabilities"

    ![image](https://github.com/ianderrington/genai/assets/76016868/f289200d-e2d5-453a-9256-af1652573459)
    - [Paper](https://arxiv.org/pdf/2303.11366.pdf)
    - [Another Inspired github](https://github.com/GammaTauAI/reflexion-human-eval)


??? abstract "[Thread of Thought Unraveling Chaotic Contexts](https://arxiv.org/pdf/2311.08734v1.pdf) helps to summarize and deal with 'chaotic contexts' (tangents) "
    <img width="966" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/7b5c18e0-6adb-407b-a765-30095cbff850">



??? important "[The Impact of Reasoning Step Length on Large Language Models -- Appending "you must think more steps](https://arxiv.org/abs/2401.04925)"
    Appending "you must think more steps" to "Let’s think step by step" increases the reasoning steps and signficantly improves the accuracy on various reasoning tasks.

    ```txt
    "Think About The Word: This strategy is to ask the model to interpret the word and rebuild the
    knowledge base. Typically a word has multiple different meanings, and the effect of this is to get
    the model to think outside the box and reinterpret the words in the problem based on the generated
    interpretations. This process does not introduce new information. In the prompt, we give examples
    of the words that the model is thinking about, and the model automatically picks words for this
    process based on the new question.
    • Read the question again: Read the questions repeatedly to reduce the interference of other texts
    on the chain of thought. In short, we let the model remember the questions.
    • Repeat State: Similar to repeated readings, we include a small summary of the current state after a
    long chain of reasoning, aiming to help the model simplify its memory and reduce the interference
    of other texts in the CoT.
    • Self-Verification: Humans will check if their answers are correct when answering questions.
    Therefore, before the model gets the answer, we add a self-verification process to judge whether
    the answer is reasonable based on some basic information.
    • Make Equation: For mathematical problems, Make Equations can help humans summarize and
    simplify memory. And for some problems that require the assumption of an unknown number x,
    establishing an equation is an essential process. We simulated this process and let the model try to
    make equations in mathematical problems
    "

    In their prompts they have the following:
    ```markdown
    **Think About The World:**
    _prompt:_
    Q: Could someone in Tokyo take a taxi to the Metropolitan Museum of Art?
    A: Let’s think step by step. The stem of the sentence is Tokyo, take a taxi, Metropolitan Museum
    of Art. Think about Tokyo... Think about taking a taxi... Think about the Metropolitan Museum of
    Art... Inference: Tokyo is in Japan and the Metropolitan Museum of Art is in New York. The two
    places are separated by the sea, so you can’t take a taxi there. Since the two places are separated
    by the sea, you can’t take a taxi there. The answer is yes.
    Q: {question}
    
    **Read the question again**
    _prompt:_
    Q: Mark’s father gave him $85. Mark bought 10 books, each of which cost $5. How much money
    does Mark have left?
    A: Let’s think step by step. The question is: How much money does Mark have left? So we need
    to calculate How much money does Mark have left. Start looking for information about money
    now. Mark’s father gave him $85. Mark bought 10 books, each of which cost $5. That means that
    Mark spent $50 on books. So we have equation money = +85 - 50 = 35. So Mark has $85 - $50 =
    $35 left. So the answer is 35.
    Q: {question}
    **Repeat State**
    _prompt:_
    Q: A coin is heads up. Janette does not flip the coin. Stacey flips the coin. Ronny flips the coin.
    Kim does not flip the coin. Is the coin still heads up? Note that "flip" here means "reverse".
    A: Let’s think step by step. The state of the coin from the beginning is heads up. Janette does not
    flip the coin, so the coin remains heads up. coin is heads up. Stacey flips the coin, so the coin is
    now tails up. coin is now tail up. Ronny flips the coin, so the coin is now heads up again. Kim
    does not flip the coin, so the coin remains heads up. coin is head up. The answer is yes.
    Q: {question}

    **Self-Verification**
    _prompt:_
    Q: Take the last letters of each words in "Alina Alessandra Amina Bianca" and concatenate them.
    A: Let’s think step by step. There is four words. So the answer will consist of four letters. Explain
    concatenate: concatenate is a term used in computer programming and mathematics, referring to
    the operation of combining two or more strings, sequences, or sets in a linear order. The last letter
    of "Alina" is "a". The last letter of "Alessandra" is "a". The last letter of "Amina" is "a". The last
    letter of "Bianca" is "a". So we have four letters. So the final answer is "aaaa". The answer is aaaa.
    Q: {question}
    **Make Equation**
    _prompt:_
    Q: 5 children were riding on the bus. At the bus stop 63 children got off the bus while some more
    got on the bus. Then there were 14 children altogether on the bus. How many more children got
    on the bus than those that got off?
    A: Let’s think step by step. first step, 5 children were riding on the bus. We know 5 children is on
    the bus. second step,There were 63 children that got off the bus. third step, some more got on the
    bus we define as unknown x. fourth step, 14 children remained on the bus, which means we can
    calculate unknow x.we have equation x+5-63 = 14, now we know x is 72. fifth step, Therefore, 72
    - 63 = 9. 9 more children got on the bus than those that got off. The answer is 9.
    Q: {question}
    ```

??? important "[Chain of Code: Reasoning with a Language Model-Augmented Code Emulator](https://arxiv.org/pdf/2312.04474.pdf)"

    [Site](https://sites.google.com/view/chain-of-code)
    A powerful solution to reasoning-based problems. It generates code-based solutions that can be executed or pseudo-executed with llm-enabled execution emulation (if code interpreter execution fails).  
    <img width="658" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/cc5128c6-d99f-4130-961f-48280947c42e">
    <img width="647" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/d115b042-ee91-464a-8915-4757286658fe">


??? important "[System 2 Attention (is something you might need too)](https://arxiv.org/pdf/2311.11829.pdf)"

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



??? tip "[Program of Thoughts Prompting: Disentangling Computation from Reasoning for Numerical Reasoning Tasks](https://arxiv.org/pdf/2211.12588.pdf)"

    Superseded by Chain of Code.
    Generates code to answer financial, and math-related problems.
    <img width="649" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/20376dba-1944-4486-8510-33feec16dd36">


### Including Memory

There are other [memory based solutions](memory.md) including [RAG](rag.md) that improve results. Here we reveal a few important ones.

??? important "[Show your work: Scratch Pads for Intermediate Computation with Language Models](https://arxiv.org/pdf/2112.00114.pdf)"
    
    Demonstrates the use of 'scratch pads' to store intermediate results that can be recalled later for improved perfomance. 
    

### Planning and Reflective

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

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/bioplanner/bioplanner) [BioPlanner: Automatic Evaluation of LLMs on Protocol Planning in Biology]([BioPlanner: Automatic Evaluation of LLMs on Protocol Planning in Biology](https://github.com/bioplanner/bioplanner))"

    [Paper](https://arxiv.org/pdf/2310.10632.pdf)
    Abstract: The ability to automatically generate accurate protocols for scientific experiments would represent a major step towards the automation of science. Large Language Models (LLMs) have impressive capabilities on a wide range of tasks, such as question answering and the generation of coherent text and code. However, LLMs can struggle with multi-step problems and long-term planning, which are crucial for designing scientific experiments. Moreover, evaluation of the accuracy of scientific protocols is challenging, because experiments can be described correctly in many different ways, require expert knowledge to evaluate, and cannot usually be executed automatically. Here we present an automatic evaluation framework for the task of planning experimental protocols, and we introduce BioProt: a dataset of biology protocols with corresponding pseudocode representations. To measure performance on generating scientific protocols, we use an LLM to convert a natural language protocol into pseudocode, and then evaluate an LLM's ability to reconstruct the pseudocode from a high-level description and a list of admissible pseudocode functions. We evaluate GPT-3 and GPT-4 on this task and explore their robustness. We externally validate the utility of pseudocode representations of text by generating accurate novel protocols using retrieved pseudocode, and we run a generated protocol successfully in our biological laboratory. Our framework is extensible to the evaluation and improvement of language model planning abilities in other areas of science or other areas that lack automatic evaluation.


### Branching

General manners of search.
<img width="565" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/3025c425-4f12-4b50-8d23-33a6002fa2aa">

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/SqueezeAILab/LLMCompiler) [LLMCompiler: An LLM Compiler for Parallel Function Calling]([LLMCompiler: An LLM Compiler for Parallel Function Calling](https://github.com/SqueezeAILab/LLMCompiler)) provides an useful framework that improves latency, accuracy, and costs by orchestrating parallel calls."
    [Paper](https://arxiv.org/pdf/2312.04511.pdf)
    This breaks components down into a task-fetching unit and an executor to dynamically identify the tasks that could be executed, performs argument replacements on intermediate results, and an executor that performs function calls provided by the Task-fetching unit. 
    ![image](https://github.com/ianderrington/genai/assets/76016868/e461a9b8-042e-4687-a2ce-73b8ea412318)
    <img width="654" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/9d8c8d9e-1145-4cce-be1e-846cba71b1d4">

    

??? important "[Toolchain*: Efficient Action Space Navigation in Large Language Models with A* Search](https://arxiv.org/pdf/2310.13227.pdf) provides an efficient tree guided-search algorithm that allows SOT performance"

    As opposed to other branching methods that allow for efficient exploration of action space, helping to find global optimization of a series of LLM calls.
    It happens in 3 general steps:

    -  **Selection** from the highest quality frontier nodes $\F(\Tau)$ of tree $\Tau$, by choosing the node $n_next = arg min_{n\elem \F(\Tau)} f(n), given a cost-function oracle f(n) that provides the cost of the best plan of incorporating the $n$-th call into the chain.
    - **Expansion** to create the _fronteir_ nodes of up to k-potential actions for the next step can be sampled.
    - **Updating** the frontier nodes to repeat the process.

    The choice of the cost function is based on the $A^*$ algorithm, where $f(n) = g(n) + h(n)$ where $g(n)$ is the cost of the path from the start node, and $h(n)$ is a heuristic function that estimates the cheapest path from $n$ to the destination goal.

    Their choice of $g(n)$ is generally the sum of single-step costs from ancestor nodes. More accurately they create a geometric sum of two different step value functions.

    One step function is a _task-specific heuristic function_ that maximizes the longest-common subsequence score over other paths. The longest-common subsequence score finds the longest-common subsequence between plan $s_n$ and other plans $m_j$ and divides by the smaller lengths of the paths $s_n$ and $m_j$.

    The other step function is a self-consistency frequency that takes an ensemble approach to generate the next steps. It calculates the number of actions that arrive at step n using non-semantically equivalent reasoning steps, divided by the number of k samples.

    Their choice of the future cost $h(n)$ is a multiplicative combination of a similar task-specific heuristic and an imagination score, enabled by an LLM.

    The future task-specific heuristic calculates the average fractional position of action found within all plans.

    The imagination score directly queries the LLMs to imagine more concrete steps until target node $n_T$ and computing the ratio of the number of steps of the number between the current node n ancestors to the target node. The higher score 'suggests the imagined plan closely captures the path to the current step, indicating that fewer remaining steps are needed to accomplish the task in the imagination of LLMs.

    <img width="276" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c544e5ae-10a0-4fa7-bb05-9fd607524096">
    <img width="272" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a1b4af81-6769-458b-8b9d-c7474309477f">
    <img width="275" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/b66028d7-bb42-4c9c-887f-505262062f5f">


??? tip "[Algorithm of Thoughts](https://arxiv.org/pdf/2308.10379.pdf) A general extension of Chain of Thought, similar to Graph of Thoughts"

    <img width="850" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/daca5b24-8ca4-4548-a3b4-1c5eac34017f">


??? abstract "[Graph of Thoughts](https://arxiv.org/pdf/2308.09687.pdf) Generalizes Chain of Thought, Tree of Thoughts, and similar systems of thought"

    <img width="753" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/7edd59b0-d6bb-4d70-9fba-90c8f705fc98">

??? tip "[Graph of Thought](https://www.linkedin.com/posts/tonyseale_gpt4-promptengineering-semanticweb-activity-7075381524631580672-TAv3/)"

    An excellent thought on what to consider next when dealing with knowledge (or other output like information) generation chains.
    ![image](https://github.com/ianderrington/genai/assets/76016868/9f195465-2b6b-47b7-9041-369ad0597649)

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/kyegomez/Meta-Tree-Of-Thoughts) [Meta Tree of thought]([Meta Tree of thought](https://github.com/kyegomez/Meta-Tree-Of-Thoughts))"

    <img width="1663" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e516604b-57b2-4d82-b9a9-0168c8eb9f15">

??? tip "[Strategic Reasoning with Language Models](https://arxiv.org/pdf/2305.19165.pdf) Uses game trees and observed and inferred beliefs to achieve closer to optimal results. "

     Powerful to consider for inferred beliefs and interacting in situations where negotiation or games are being played.
    <img width="1008" alt="image" src="https://github.com/ianderrington/general/assets/76016868/5ffa0653-a323-44a6-bff5-b49e3be6091a">

??? abstract "[Large Language Model Guided Tree-of-Thought](https://arxiv.org/pdf/2305.08291.pdf)"

    [Github](https://github.com/jieyilong/tree-of-thought-puzzle-solver)


??? abstract "[Tree of Thoughts: Deliberate Problem Solving with Large Language Models](https://arxiv.org/pdf/2305.10601.pdf) A method that allows for idea-expansion and selection of the final result output by choosing the best at each stage."

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

??? tip "[Teaching Large Language Models to Self-Debug](https://arxiv.org/pdf/2304.05128.pdf) `transcoder`"

    Coding focused LLM system to continuously improve self.
    <img width="865" alt="image" src="https://user-images.githubusercontent.com/76016868/231906559-758d89e4-d22a-4a3a-aa96-1d630e48651d.png">

??? tip "[Language Models can Solve Computer Tasks](https://arxiv.org/pdf/2303.17491.pdf) Uses Recursive Criticism and Improvement."

    [Website](https://posgnu.github.io/rci-web/), [GitHub](https://github.com/posgnu/rci-agent)  Combining with Chain of Thought it is even better. The method: Plan: Critique, Improve
    - Explicit RCI: "Review your previous answer and find problems with your answer." --> "Based on the problems you found, improve your answer." Recursively Criticizes and Improves its output. This sort of prompting outperforms Chain of Thought, and combined it works even better.

### Structural and Task Decomposition

Breaking down the input into a divide-and-conquer approach is a valuable approach to more complex requests. Considering separate perspectives, within the _same_ model, or within separate model calls with different prompt-inceptions as in agent [systems](./systems.md) can improve performance.

??? tip "[ProTIP: Progressive Tool Retrieval Improves Planning](https://arxiv.org/pdf/2312.10332.pdf)" protip-progressive-tool-retrieval

    The authors demonstrate a dynamic contrastive learning-based framework implicitly performs task decomposition without explicit subtask requirements, while retaining subtask automicity.
    <img width="676" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/52204bc7-fc1d-467a-9c3c-7fc367ac4b44">


???+ tip "[Skeleton of Thought](https://arxiv.org/pdf/2307.15337.pdf)"

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

??? tip "[Certified Reasoning with Language models](https://arxiv.org/pdf/2306.04031.pdf) A 'logical guide' tool that an LLM can use."

    It " uses _constrained decoding_ to ensure the model will incrementally generate one of the valid outputs."
    <img width="956" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/bf581eb0-96b1-4175-97d0-98f081a03438">
    Possible open-source implementation [here](https://github.com/kyegomez/LOGICGUIDE)

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/normal-computing/outlines) [Outlines]([Outlines](https://github.com/normal-computing/outlines)) guides the model generation of next-token logits to guide the generation corresponding to regex / JSON and pydantic schema. compatible with all models."

    Also provides a way to functionalize templates to separate prompt logic.

### Automated chain discovery, selection, and creation.

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/amazon-science/auto-cot) [Auto-CoT: Automatic Chain of Thought Prompting in Large Language Models]([Auto-CoT: Automatic Chain of Thought Prompting in Large Language Models](https://github.com/amazon-science/auto-cot))"

    [Paper](https://arxiv.org/pdf/2210.03493.pdf)
    This algorithm samples exemplars to construct demonstrations that enable improved accuracy of multi-shotted outcomes using the Chain-of-Thought prompting method. 
    <img width="647" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e0c1161f-ce0b-4302-b05a-55b094032c8e">

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





### Chain Optimization

Problems such as Hallucinations can be mitigated through downstream methods of process.

??? tip "[A stitch in time saves Nine](https://arxiv.org/pdf/2307.03987.pdf)"

    A process to mitigate model hallucination using RAG.
    <img width="602" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/cae43c6d-34d8-4005-bb3e-54f89747dc30">


