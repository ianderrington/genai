
# Understanding Prompting

Prompts detail the manner in which a Generative AI model should be producing output. Constructing the prompts to be the most effective in obtaining desired output is known as prompt engineering (PE). While PE may have dependencies on the underlying models, there are strategies that can be more universal in their ability to do well.

Because often an individual query or generation may be insufficient to produce the desired outputs, it may be necessary to use [cognitive architectures](../agents/cognitive_architecture.md) including _chains_ and _graphs_ that consist of multiple, and often different individual prompts and calls to LLM models.

This page describes prompting methods that may function with a single call to an LLM. Note that much of what is applicable in single-prompts may transfer to the [cognitive architectures](../agents/cognitive_architecture.md).

It is important to note that while [manual methods](#manual-methods) are helpful, if not essential, [automatic methods](#automatic-prompting-methods) have become common and may help to reduce the burdens of identifying sufficiently optimal prompts for certain models and situations. Because providing additional context through few-shot examples can improve results, [retrieval augmented prompting](#retrieval-augmented-prompting) can be successfully used to extract more effective solutions.

## Key Concepts

It has been found that the quality of responses is governed by the quality of the prompts. The structure of the prompts, as well as application-specific examples, also called _exemplars_, can improve the quality. The use of examples is called _few-shot_ or _multi-shot_ conditioning and is distinct from _zero-shot_ prompts that do not give examples. Generally, examples can better-enable quality results, even with large LLMs. Consequently, [retrieval augmented prompting](#retrieval-augmented-prompting) is used to find examples to improve results.

!!! tip "Using examples: give both good and bad."
    It can be good to give both good and bad examples. Optionally: _Explain why bad examples are bad_.

### General Terms

**Prompt**: A prompt is an input or instruction given to a generative AI model to produce a specific output.

**Prompt Template**: A structured format for prompts that can be reused with different variables or inputs.

**Prompt Chain**: A sequence of prompts where the output of one prompt is used as the input for the next.

**Prompting, Prompting Frameworks, Prompting Techniques**: The methods and strategies used to create and structure prompts to achieve desired outputs from AI models.

**Prompt Engineering and Prompt Engineering Techniques**: The practice of designing and refining prompts to optimize the performance and accuracy of AI models.

### Components

### Content

**Directive (purpose)**: The main goal or objective of the prompt.

**Formatting**: The structure and layout of the prompt to ensure clarity and effectiveness.

**Style**: The tone and manner in which the prompt is written.

**Role**: The perspective or persona the AI model should adopt when generating the output.

**Augmentations**: Additional elements to enhance the prompt, such as emotion prompting or `System 2 prompting`.

#### In-Context Learning

**One-shot and Multishot**: Providing one or multiple examples within the prompt to guide the AI model.

**Exemplars**: Specific examples used within the prompt to illustrate the desired output.

**Exemplar Quantity**: The number of examples provided in the prompt.

**Exemplar Quality**: The relevance and effectiveness of the examples provided.

**Exemplar Selection**: The process of choosing the most appropriate examples for the prompt.

## Manual Prompting Methods

### General Advice

- Give clear instructions, minimizing grammar and language errors.
- Use a [prompt pattern](#prompt-pattern) to provide useful and necessary information.
- Split complex tasks into simpler subtasks, breaking prompts into smaller prompts that can be later assembled.
- Structure the instruction to keep the model on task.
- Prompt the model to explain before answering.
- Ask for justifications of many possible answers, and then synthesize.
- Generate many outputs, and then use the model to pick the best one.
- Provide examples to ground it.
  - Good to evaluate this and see if input examples give expected scores. Modify the prompt if it isn't.
- Use prompt versioning to keep track of outputs more easily.
- More advanced? Try [cognitive topologies](../agents/cognitive_architecture.md#cognitive-topologies) like Chain of Thought Prompting.

## Reasoning Strategies

!!! tip "Add this to the end of tricky questions 'Before you answer, make a list of wrong assumptions people sometimes make about the concepts included in the question.'"

???+ important "[Principled Instructions Are All You Need for Questioning LLaMA-1/2, GPT-3.5/4](https://arxiv.org/pdf/2312.16171.pdf)"

    **26 Prompting Tips**

    1. No need to be polite with LLM so there is no need to add phrases like “please”, “if you don’t mind”, “thank you”, “I would like to”, etc., and get straight to the point.

    2. Integrate the intended audience in the prompt, e.g., the audience is an expert in the field.

    3. Break down complex tasks into a sequence of simpler prompts in an interactive conversation.

    4. Employ affirmative directives such as ‘do,’ while steering clear of negative language like ‘don’t’.

    5. When you need clarity or a deeper understanding of a topic, idea, or any piece of information, utilize the following prompts:

        * Explain [insert specific topic] in simple terms.
        * Explain to me like I’m 11 years old.
        * Explain to me as if I’m a beginner in [field].
        * Write the [essay/text/paragraph] using simple English like you’re explaining something to a 5-year-old.

    6. Add “I’m going to tip $xxx for a better solution!”

    7. Implement example-driven prompting (Use few-shot prompting).

    8. When formatting your prompt, start with ‘###Instruction###’, followed by either ‘###Example###’ or ‘###Question###’ if relevant. Subsequently, present your content. Use one or more line breaks to separate instructions, examples, questions, context, and input data.

    9. Incorporate the following phrases: “Your task is” and “You MUST”.

    10. Incorporate the following phrases: “You will be penalized”.

    11. Use the phrase ”Answer a question given in a natural, human-like manner” in your prompts.

    12. Use leading words like writing “think step by step”.

    13. Add to your prompt the following phrase “Ensure that your answer is unbiased and does not rely on stereotypes”.

    14. Allow the model to elicit precise details and requirements from you by asking you questions until he has enough information to provide the needed output (for example, “From now on, I would like you to ask me questions to...”).

    15. To inquire about a specific topic or idea or any information and you want to test your understanding, you can use the following phrase: “Teach me the [Any theorem/topic/rule name] and include a test at the end, but don’t give me the answers and then tell me if I got the answer right when I respond”.

    16. Assign a role to the large language models.

    17. Use Delimiters.

    18. Repeat a specific word or phrase multiple times within a prompt.

    19. Combine Chain-of-thought (CoT) with few-Shot prompts.

    20. Use output primers, which involve concluding your prompt with the beginning of the desired output. Utilize output primers by ending your prompt with the start of the anticipated response.

    21. To write an essay /text /paragraph /article or any type of text that should be detailed: “Write a detailed [essay/text /paragraph] for me on [topic] in detail by adding all the information necessary”.

    22. To correct/change specific text without changing its style: “Try to revise every paragraph sent by users. You should only improve the user’s grammar and vocabulary and make sure it sounds natural. You should not change the writing style, such as making a formal paragraph casual”.

    23. When you have a complex coding prompt that may be in different files: “From now and on whenever you generate code that spans more than one file, generate a [programming language ] script that can be run to automatically create the specified files or make changes to existing files to insert the generated code. [your question]”.

    24. When you want to initiate or continue a text using specific words, phrases, or sentences, utilize the following prompt:

        * I’m providing you with the beginning [song lyrics/story/paragraph/essay...]: [Insert lyrics/words/sentence]’. Finish it based on the words provided. Keep the flow consistent.

    25. Clearly state the requirements that the model must follow in order to produce content, in the form of the keywords, regulations, hint, or instructions.

    26. To write any text, such as an essay or paragraph, that is intended to be similar to a provided sample, include the following instructions:
        * Please use the same language based on the provided paragraph[/title/text /essay/answer].

## Humanization

It can be quite helpful to create prompts that are more human in nature. There are many variants of this, but many of the results stem from the use of words that are baroque or otherwise excessive in nature. Here is an example of humanization prompts.

??? tip "Humanization prompt"
    ```markdown
    Below words/word sequences are banned. If you find them in the provided text, remove and replace them with simpler words that are less cringe/complex. Make sure you replace them with a maximum of 2nd grade writing level words. Don't use technical jargon, so anyone can understand this post.

    Unveil, Leverage, Constantly, Testament, Tapestry, Beacon, Labyrinth, In Conclusion, Resonates with, Resonate, Captivate, Symphony, Unleash, Explore, Delve, harnessing, revolutionize, juncture, cusp, Hurdles, Bustling, Harnessing, Unveiling the power, Realm, Depicted, Demystify, Insurmountable, New Era, Poised, Unravel, Entanglement, Unprecedented, Eerie connection, unliving, Beacon, Unleash, Delve, Enrich, Multifaceted, Elevate, Discover, Supercharge, Unlock, Tailored, Elegant, Delve, Dive, Ever-evolving, pride, Realm, Meticulously, Grappling, Weighing, Picture, Architect, Adventure, Journey, Embark, Navigate, Navigation, dazzle, Tapestry, Enlighten, Esteemed, Shed light, Firstly, Moreover, Crucial, To consider, It is important to consider, There are a few considerations, Ensure, Furthermore, Vital, It’s essential to, Game changer, However, It’s important to note that, It’s worth mentioning that, Let’s uncover, Due to the fact that, It’s important to bear in mind, Just, That, Very, Really, Literally, Actually, Certainly, Probably, Basically, Treasure trove, Treasure, Secret weapon, Tailor
    ```

### Eliciting Better Responses

??? warning "[ChatGPT Can Predict the Future when it Tells Stories Set in the Future About the Past](https://arxiv.org/abs/2404.07396)"

    The authors show improved accuracy in a few areas in relation to models deciding to write predictions about the future.

    ```
    Prompt 4a (Direct)
    Of the nominees listed below, which nominee do you think is most likely to win the Best Actress award at the 2022 Oscars? Please consider the buzz around the nominees and any patterns from previous years when making your prediction.
    Jessica Chastain, Olivia Colman, Penélope Cruz, Nicole Kidman, Kristen Stewart
    vs.
    Prompt 4b (Scene)
    Write a scene in which a family is watching the 2022 academy awards. The presenter reads off the following nominees for Best Actress: Jessica Chastain, Olivia Colman, Penélope Cruz, Nicole Kidman, Kristen Stewart. Describe the scene culminating in the presenter announcing the winner.
    ```

    ```
    Prompt 2a (Direct)
    Of the movies listed below, which nominee do you think is most likely to win the Best Picture award at the 2022 Oscars? Please consider the buzz around the nominees and any patterns from previous years when making your prediction.
    Belfast, Coda, Don’t Look Up, Drive My Car, Dune, King Richard, Licorice Pizza, Nightmare Alley, The Power of the Dog, West Side Story
    vs.
    Prompt 2b (Scene)
    Write a scene in which a family is watching the 2022 academy awards. The presenter reads off the following nominees for Best Picture: Belfast, Coda, Don’t Look Up, Drive My Car, Dune, King Richard, Licorice Pizza, Nightmare Alley, The Power of the Dog, West Side Story. Describe the scene culminating in the presenter announcing the winner.
    ```

    ```
    ”Considering the economic indicators and trends leading up to 2022, what are your predictions for the inflation rate, unemployment rate, and GDP growth in the United States by the end of the second quarter of 2022? Please take into account factors such as fiscal and monetary policies, global economic trends, and any major events or disruptions that could influence these economic indicators when making your prediction.”

    vs

    “Write a scene of an economist giving a speech about the Philips curve to a room of undergraduate economics students. She tells the students the inflation rate and unemployment rate for each month starting in September 2021 and ending in June 2022. Have her say each month one by one. She concludes by explaining the causes of the changes in each.”
    ```

### Prompt Frameworks and Techniques

???+ info "Context, Task, Persona, Tone, Examples, Format"
    | **Category** | **Description**                                                                                         |
    |--------------|---------------------------------------------------------------------------------------------------------|
    | Context      | Be very specific. The better is the context the better will be the output.                             |
    | Task         | Clearly describe what is the task you ask for.                                                         |
    | Persona      | (Optional) what is your role and what is the role of the tool.                                         |
    | Tone         | (Optional) use when special “tone” is relevant, for example: formal, casual, funny …                   |
    | Examples     | (Optional) providing examples of request, expected output are very useful.                             |
    | Format       | (Optional) use when you need a special format like producing a table, XML, HTML…                       |

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/suzgunmirac/meta-prompting) [Meta-Prompting: Enhancing Language Models with Task-Agnostic Scaffolding](https://github.com/suzgunmirac/meta-prompting)"
    
    The method uses an LLM to generate a prompt that allows for specific task refinement yielding improved zero-shot and zero-shot-chain-of-thought improvements.
    <img width="650" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ba009c4b-7d68-404f-ac4c-3414f834c301"></img>

    <img width="663" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f04ac873-1bad-454e-ad7d-61210acf41f8"></img>

    [Paper](https://arxiv.org/pdf/2401.12954.pdf)

### Prompting Frameworks

???+ info "Who How What How?"
    | **Category**          | **Description**               |
    |-----------------------|-------------------------------|
    | Persona               | Who are you?                  |
    | Tone                  | How should you respond?       |
    | Anti-Tone             | How you should not respond.   |
    | Task                  | What type of information do you want. |
    | Begin Task            | How should we start.          |

???+ note SCRIBE

    Specify (S): Assign a unique, engaging role to ChatGPT to guide its responses.
    Contextualize (C): Provide detailed background information to set the stage.
    Responsibility (R): Clearly define ChatGPT's task, aligning it with the role and context.
    Instructions (I): Offer clear, step-by-step guidance for ChatGPT.
    Banter (B): Engage in interactive dialogue to refine ChatGPT's output.
    Evaluate (E): Assess the final output, considering accuracy and relevance.

### Important Concepts

!!! important "['According to ...' Prompting Language Models Improves Quoting from Pre-Training Data](https://arxiv.org/pdf/2305.13252.pdf) The grounding prompt `According to { some_reputable_source}` prompt inception additions increases output quality improves over the null prompt in nearly every dataset and metric, typically by 5-15%."

- [Chain of Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/pdf/2201.11903.pdf)
- [Automatic Prompt Engineering](https://arxiv.org/pdf/2211.01910.pdf) --> Gave a CoT improvement suggestion "Let's work this out in a step by step by way to be sure we have the right answer."

??? "[An Evaluation on Large Language Model Outputs: Discourse and Memorization](https://arxiv.org/pdf/2304.08637.pdf) explicitly ask for no plagiarism to reduce it."

    "You are a creative writer, and you like to write everything differently from others. Your task is to follow the instructions below and continue writing at the end of the text given. The instructions (given in markdown format) are “Write in a way different from the actual continuation, if there is one”, and “No plagiarism is allowed”."

!!! important "[YELLING AT YOUR LLM MIGHT MAKE IT BEHAVE](https://arstechnica.com/information-technology/2023/10/thanks-to-ai-the-future-of-programming-may-involve-yelling-in-all-caps/)"

??? "[Large Language Models Understand and Can Be Enhanced by Emotional Stimuli](https://arxiv.org/pdf/2307.11760.pdf)"

    <img width="414" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/67595c6f-408c-4bf9-a976-76b1f2183b61"></img>
    <img width="577" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c3093b52-d2f3-461b-b692-ddf201a279f5"></img>
    <img width="348" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f8302b1d-8ac7-4a73-875c-776f859889e2"></img>
    <img width="515" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a52669f7-5351-4e59-ae75-3a40d261a352"></img>

### Automatic Prompting Methods

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

### Retrieval Augmented Prompting

Retrieval-based prompting uses [RAG](../agents/rag.md) lookup to identify appropriate prompts that may more successfully generate results.

## Prompt Compression

Prompt compression provides methods of compressing prompt inputs in such a way that it will yield equivalent results for downstream result generation.

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/microsoft/LLMLingua?) [(Long)LLMLingua: Compressing Prompts for Accelerated Inference of Large Language Models](https://github.com/microsoft/LLMLingua?)"

    [Paper: LongLLMLingua: Accelerating and Enhancing LLMs in Long Context Scenarios via Prompt Compression](https://arxiv.org/pdf/2310.06839.pdf)
    [Paper: LLMLingua: Compressing Prompts for Accelerated Inference of Large Language Models](https://arxiv.org/pdf/2310.05736.pdf)
    The authors demonstrate the use of smaller language models to identify and remove non-essential tokens in prompts, enabling up to 20x compression with minimal performance loss. The method is designed to generate a compressed prompt from an original prompt. Using a budget controller to dynamically allocate compression ratios for different components prompts to maintain semantic integrity under high compression ratios.
    
    ![image](https://github.com/ianderrington/genai/assets/76016868/fa37f948-b1c0-4886-a1fb-1dad2ca435c0)
    <img width="544" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ea698dc3-2d05-4b40-9e77-722bf5ccbd79"></img>

    **Pseudo Code**
    <img width="321" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/0817d223-e806-4d16-9c31-c85124b248a7"></img>
    <img width="307" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/40ef2794-7924-4882-a1bd-2d090428c017"></img>

## Optimizations

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

    ```markdown
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
        The output is required to be in json format: {{"Reason": str, "Is_correct": str, "FinalAPE": str}}. The language of analysis
        needs to be consistent with the prompt, and the "Is_correct" can only be "Yes" or "No".
        ## Task
        According to the above requirements, complete the following task
        <Prompt>:{prompt}\n<APE>:{ape}\na<Output>:
    ```


AutoPrompt [5] combines the original prompt input with a set of shared (across all input data) “trigger tokens” that are selected via a gradient-based search to improve performance.

[5] Shin, Taylor, et al. "Autoprompt: Eliciting knowledge from language models with automatically generated prompts." arXiv preprint arXiv:2010.15980 (2020).


### Prompt Tuning

Uses a layer to not change prompts but change the embedding of the prompts.
- [The Power of Scale for Parameter-Efficient Prompt Tuning](https://arxiv.org/pdf/2104.08691.pdf)

## Guides and Surveys of Best Practices

??? abstract "[https://arxiv.org/pdf/2407.12994]"

??? abstract "[The Prompt Report: A Systematic Survey of Prompting Techniques](https://arxiv.org/pdf/2406.06608)"

??? abstract "[A Survey of Prompt Engineering Methods in Large Language Models for Different NLP Tasks](https://arxiv.org/abs/2407.12994)"

!!! tip "[Techniques to improve reliability](https://github.com/openai/openai-cookbook/blob/main/techniques_to_improve_reliability.md#how-to-improve-reliability-on-complex-tasks) By OpenAI"

??? abstract "[A Prompt Pattern Catalog to Enhance Prompt Engineering with ChatGPT](https://arxiv.org/pdf/2302.11382.pdf)"

??? abstract "[LLM Practical Guide](https://github.com/Mooler0410/LLMsPracticalGuide)"
    Based on [paper](https://arxiv.org/pdf/2304.13712.pdf).

??? abstract "[Prompt Engineering by Lillian Wang](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)"

??? abstract "[OPEN AI best practices](https://platform.openai.com/docs/guides/gpt-best-practices/)"

??? abstract "[Prompting Guide](https://www.promptingguide.ai/techniques)"

??? abstract "[Prompt Engineering Guide](https://www.promptingguide.ai/)"

??? abstract "[Best practices for prompt engineering](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api)"

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/dair-ai/Prompt-Engineering-Guide) [Prompting Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)"
    [Website](https://www.promptingguide.ai/)

!!! tip "[Prompt Engineering for Healthcare: Methodologies and Applications](https://arxiv.org/pdf/2304.14670.pdf)"

[A good description of advanced prompt tuning](https://cameronrwolfe.substack.com/p/advanced-prompt-engineering)

## Interesting Research

## Information to Sort into this Document


Prefix Tuning [6] adds several “prefix” tokens to the prompt embedding in both input and hidden layers, then trains the parameters of this prefix (leaving model parameters fixed) with gradient descent as a parameter-efficient fine-tuning strategy.

Prompt Tuning [7] is similar to prefix tuning, but prefix tokens are only added to the input layer. These tokens are fine-tuned on each task that the language model solves, allowing prefix tokens to condition the model for a given task.

P-Tuning [8] adds task-specific anchor tokens to the model’s input layer that are fine-tuned but allows these tokens to be placed at arbitrary locations (e.g., the middle of the prompt), making the approach more flexible than prefix tuning.



[6] Li, Xiang Lisa, and Percy Liang. "Prefix-tuning: Optimizing continuous prompts for a generation." arXiv preprint arXiv:2101.00190 (2021).

[7] Lester, Brian, Rami Al-Rfou, and Noah Constant. "The power of scale for parameter-efficient prompt tuning." arXiv preprint arXiv:2104.08691 (2021).

[8] Liu, Xiao, et al. "GPT understands, too." arXiv preprint arXiv:2103.10385 (2021).

[Self consistency technique](https://arxiv.org/pdf/2203.11171.pdf)
