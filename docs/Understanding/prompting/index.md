
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

### Humanization

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

???+ info "Who How How What How?"
    | **Category**          | **Description**               |
    |-----------------------|-------------------------------|
    | Persona               | Who are you?                  |
    | Tone                  | How should you respond?       |
    | Anti-Tone             | How you should not respond.   |
    | Task                  | What type of information do you want. |
    | Begin Task            | How should we start.          |

???+ note SCRIBE
     | **Category** | **Description** |
     |--------------|-----------------|
     | Specify (S)  | Assign a unique, engaging role to ChatGPT to guide its responses. |
     | Contextualize (C) | Provide detailed background information to set the stage. |
     | Responsibility (R) | Clearly define ChatGPT's task, aligning it with the role and context. |
     | Instructions (I) | Offer clear, step-by-step guidance for ChatGPT. |
     | Banter (B) | Engage in interactive dialogue to refine ChatGPT's output. |
     | Evaluate (E) | Assess the final output, considering accuracy and relevance. |


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


### Retrieval Augmented Prompting

Retrieval-based prompting uses [RAG](../agents/rag.md) lookup to identify appropriate prompts that may more successfully generate results.


## Optimizations

[Auto prompting](auto_prompting.md) is the process of automatically generating or improving prompts and has the ability to improve performance, rendering much the art of prompting into an engineering problem.

### Prompt Tuning

Uses a layer to not change prompts but change the embedding of the prompts.
- [The Power of Scale for Parameter-Efficient Prompt Tuning](https://arxiv.org/pdf/2104.08691.pdf)

## Guides and Surveys of Best Practices

??? abstract "[A Survey of Prompt Engineering Methods in Large Language Models for Different NLP Tasks](https://arxiv.org/pdf/2407.12994)"

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

!!! tip "[A good description of advanced prompt tuning](https://cameronrwolfe.substack.com/p/advanced-prompt-engineering)"

## Interesting Research

## Information to Sort into this Document


Prefix Tuning [6] adds several “prefix” tokens to the prompt embedding in both input and hidden layers, then trains the parameters of this prefix (leaving model parameters fixed) with gradient descent as a parameter-efficient fine-tuning strategy.

Prompt Tuning [7] is similar to prefix tuning, but prefix tokens are only added to the input layer. These tokens are fine-tuned on each task that the language model solves, allowing prefix tokens to condition the model for a given task.

P-Tuning [8] adds task-specific anchor tokens to the model’s input layer that are fine-tuned but allows these tokens to be placed at arbitrary locations (e.g., the middle of the prompt), making the approach more flexible than prefix tuning.



[6] Li, Xiang Lisa, and Percy Liang. "Prefix-tuning: Optimizing continuous prompts for a generation." arXiv preprint arXiv:2101.00190 (2021).

[7] Lester, Brian, Rami Al-Rfou, and Noah Constant. "The power of scale for parameter-efficient prompt tuning." arXiv preprint arXiv:2104.08691 (2021).

[8] Liu, Xiao, et al. "GPT understands, too." arXiv preprint arXiv:2103.10385 (2021).

[Self consistency technique](https://arxiv.org/pdf/2203.11171.pdf)
