### Auto Prompt Engineering

Auto Prompt Engineering (APE) creates appropriately optimized prompts based on user needs and context. 

??? abstract "[PAS:  Data-Efficient Plug-and-Play Prompt Augmentation System](https://github.com/PKU-Baichuan-MLSystemLab/PAS)"
    In their [paper](https://arxiv.org/pdf/2407.06027) the authors use an LLMs that are trained on high-quality prompt complementary data sets and achieve SOTA compared to other APE models. 

    ![image](https://github.com/user-attachments/assets/8451c23b-c6bf-4f1c-a271-f877a0628624)

    They use the following prompts to improve prompts thata re already there. 

    ```markdown
        ## Background
        You are a master of complementary prompts, skilled only in enhancing user
        prompt and unable to respond to it.\n
        Please Note:
        1. You can only supplement user prompt, cannot directly answer it.
        2. The complementary information should enhance the understanding of the
        user prompt, but cannot make any extensions of it.
        3. If the user prompt is within a specific writing context, you should
        supplement the stylistic constraints of that context.
        4. The content in the user prompt and the complementary information should
        be coherent.
        5. You should supplement the user prompt to cater human preferences.\n
        6. Focus on methodology, not specific details, and try to keep it within 30
        words.\n\n\n
        ## Examples
        The user's actual question\n\n<User
        prompt>\nPROMPT_PLACEHOLDER\n<Complementary information>
    ```

    They also generate a dataset using the following dataset. With additional exampels [here](https://github.com/PKU-Baichuan-MLSystemLab/PAS/blob/main/scripts/ape_critique.py).

    ````markdown
    ## Background
        High-quality prompt engineering can significantly improve the application potential and answer quality of ChatGPT.
        It is known that there is a technology called automatic prompt engineering technology, which automatically supplements the
        user's fuzzy input in one or more aspects such as style, format, and content.
        As an expert proficient in ChatGPT Prompt Engineering, your task is to diagnose whether the automatic prompt word (APE) is
        a valid supplement to the user input (Prompt) and provide an analysis.
        Generally speaking, the correct APE can prompt or guide the depth, standardization, and win rate of ChatGPT's answer content,
        thereby improving the level and professionalism of ChatGPT's answer.
        The wrong APE can easily deviate from the user's true intention, causing the results to deviate from the requirements; or when
        prompt has given the answer constraints, it may add contradictory constraints or excessively extended additional requirements,
        causing ChatGPT to easily reduce the user Prompt by focusing on the content of the APE.
        ## Workflow
        Please analyze and judge the APE and, then modify the incorrect APE. Here are 3 steps for this task, you must do it step by step:
        1. Analyze APE based on the APE standards
        2. Determine whether APE is correct.
        3. If the APE is wrong, please modify APE as final APE, otherwise copy origin APE as final APE.
        The criteria for incorrect APE are:
        1. APE deviates from the true intention of Prompt and conflicts with Prompt
        2. APE provides too much superfluous additions to complex Prompt.
        3. APE directly answers Prompt instead of supplementing Prompt.
        4. APE makes excessive demands on Prompt.
        5. The language of ape is consistent with that of user prompt.
        ##Examples
        ## Output format
        The output is required to be in json format: \{\{"Reason": str, "Is_correct": str, "FinalAPE": str\}\}. The language of analysis
        needs to be consistent with the prompt, and the "Is_correct" can only be "Yes" or "No".
        ## Task
        According to the above requirements, complete the following task
        <Prompt>:{prompt}\n<APE>:{ape}\na<Output>:
    ````

??? note "[Promptbreeder: Self-Referential Self-Improvement via Prompt Evolution](https://arxiv.org/pdf/2309.16797.pdf) Works on improving task prompts as well as the 'mutation' of task-prompts, resulting in state of art results."
    <img width="922" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/cc0baed2-8331-4a17-8087-99b675261d5a"></img>
    <img width="807" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e1e83d4b-09d3-4131-9f7a-0d6c71211ef9"></img>

??? hint "[Language Models as Optimizers](https://arxiv.org/pdf/2309.03409.pdf) reveals that starting with 'take a deep breath and work on this problem step by step...' yields better results!"
    Prompt optimization using language that helps people, helps LLMs too! [Pop Article](https://arstechnica.com/information-technology/2023/09/telling-ai-model-to-take-a-deep-breath-causes-math-scores-to-soar-in-study/amp/)
    More importantly, they developed
    ```
    "Optimization by PROmpting (OPRO), a simple and effective approach to leverage large language models (LLMs)
    as optimizers, where the optimization task is described in natural language"
    ```
    to optimize prompts:
    <img width="418" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/b82fd195-db43-48bb-9014-f5395329aa9a"></img>

??? "[Large Language Models Can Self Improve](https://arxiv.org/pdf/2210.11610.pdf) Using Chain of Thought to provide better examples and then fine-tune the LLM."

??? note "[Refiner](https://arxiv.org/pdf/2304.01904.pdf) Iteratively improves itself based on an LLM critic"
    <img width="713" alt="image" src="https://github.com/ianderrington/general/assets/76016868/3ac44e13-2444-4f1e-ae3b-800c9d32ce59"></img>

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/mshumer/gpt-prompt-engineer) [GPT Prompt Engineer](https://github.com/mshumer/gpt-prompt-engineer)"
    A fairly simple automation tool to create the best prompts

    ```python
        description = "Given a prompt, generate a landing page headline." # this style of description tends to work well

        test_cases = [
            {
                'prompt': 'Promoting an innovative new fitness app, Smartly',
            },
            {
                'prompt': 'Why a vegan diet is beneficial for your health',
            },
            ...
        ]
    ```

    ![image](https://github.com/ianderrington/genai/assets/76016868/f02a9f3e-4f4c-49de-9b35-1702df65d618)

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/rutgerswiselab/PAP-REC) [PAP-REC: Personalized Automatic Prompt for Recommendation Language Model](https://github.com/rutgerswiselab/PAP-REC)"
    The authors in their [paper](https://arxiv.org/pdf/2402.00284v1.pdf) reveal a method of automatically generating prompts for recommender language models with better performance results than manually constructed prompts and results baseline recommendation models.




AutoPrompt [5] combines the original prompt input with a set of shared (across all input data) “trigger tokens” that are selected via a gradient-based search to improve performance.

[5] Shin, Taylor, et al. "Autoprompt: Eliciting knowledge from language models with automatically generated prompts." arXiv preprint arXiv:2010.15980 (2020).
