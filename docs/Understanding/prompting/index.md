Prompts detail the manner in which a Generative AI model should be producing output. Constructing the prompts to be the most effective in obtaining desired output is known as prompt engineering (PE). While PE may have dependencies on the underlying models, there are strategies that can be more universal in their ability to do well.

Because often an individual query or generation may be insufficient to produce the desired outputs, it may be necessary to use [cognitive architectures](../agents/cognitive_architecture.md) as part of [chains](../agents/cognitive_architecture.md). Here, we describe one-shot prompting methods, may function without multiple LLM-calls.

It is also important to note, that while [manual methods](#manual-methods) are essential and will continue. [Automatic methods](#automatic-methods) have become common and may help to reduce burdens of identifying sufficiently optimal prompts for certain models and situations. Because providing additional context through few-shot examples can improve results, [retrieval augmented prompting](#retrieval-augmented-prompting) can be successfully used to extract more effective solutions. 

## Key concepts

It has been found that the quality of responses is governed by the quality of the prompts. The structure of the prompts, as well as application-specific examples can improve the quality. The use of examples is called _few-shot_ or _multi-shot_ conditioning, and is distinct from _zero-shot_ prompts that do not give examples. Generally, examples can better-enable quality results, even with large LLMs. Consequently [retrieval augmented prompting](#retrieval-augmented-prompting), is used to find examples to improve results. 

## Manual Methods

### General Advice

- Give clearer instructions
- Use a [prompt pattern](#prompt-pattern) to provide useful or necessary information  
- Split complex tasks into simpler subtasks
- Structure the instruction to keep the model on task
- Prompt the model to explain before answering
- Ask for justifications of many possible answers, and then synthesize
- Generate many outputs, (and then use the model to pick the best one)
- Fine-tune custom models to maximize performance
- Provide several examples to ground it
  -  Good to evaluate this and see if input examples give expected scores. Modify the prompt if it isn't.
- Consider prompt versioning to keep track of outputs more easily.
- Break prompts into smaller prompts
- Use [cognitive topologies](../agents/cognitive_architecture.md#cognitive-topologies)
 like Chain of Thought Prompting


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

    7.  Implement example-driven prompting (Use few-shot prompting).

    8. When formatting your prompt, start with ‘###Instruction###’, followed by either ‘###Example###’ or ‘###Question###’ if relevant. Subsequently, present your content. Use one or more line breaks to separate instructions, examples, questions, context, and input data.

    9.  Incorporate the following phrases: “Your task is” and “You MUST”.

    10. Incorporate the following phrases: “You will be penalized”.

    11.  Use the phrase ”Answer a question given in a natural, human-like manner” in your prompts.

    12. Use leading words like writing “think step by step”.

    13.  Add to your prompt the following phrase “Ensure that your answer is unbiased and does not rely on stereotypes”.

    14. Allow the model to elicit precise details and requirements from you by asking you questions until he has enough information to provide the needed output (for example, “From now on, I would like you to ask me questions to...”).

    15. To inquire about a specific topic or idea or any information and you want to test your understanding, you can use the following phrase: “Teach me the [Any theorem/topic/rule name] and include a test at the end, but don’t
    give me the answers and then tell me if I got the answer right when I respond”.

    16. Assign a role to the large language models.

    17. Use Delimiters.

    18. Repeat a specific word or phrase multiple times within a prompt.

    19. Combine Chain-of-thought (CoT) with few-Shot prompts.

    20. Use output primers, which involve concluding your prompt with the beginning of the desired output. Utilize output primers by ending your prompt with the start of the anticipated response.

    21. To write an essay /text /paragraph /article or any type of text that should be detailed: “Write a detailed [essay/text /paragraph] for me on [topic] in detail by adding all the information necessary”.

    22. To correct/change specific text without changing its style: “Try to revise every paragraph sent by users. You should only improve the user’s grammar and vocabulary and make sure it sounds natural. You should not change the writing style, such as making a formal paragraph casual”.
    
    23. When you have a complex coding prompt that may be in different files: “From now and on whenever you generate code that spans more than one file, generate a [programming language ] script that can be run to automatically create the specified files or make changes to existing files to insert the generated code. [your question]”.
    
    24. When you want to initiate or continue a text using specific words, phrases, or sentences, utilize the following prompt: 
    
        *  I’m providing you with the beginning [song lyrics/story/paragraph/essay...]: [Insert lyrics/words/sentence]’. Finish it based on the words provided. Keep the flow consistent.

    25. Clearly state the requirements that the model must follow in order to produce content, in the form of the keywords, regulations, hint, or instructions
    
    26.  To write any text, such as an essay or paragraph, that is intended to be similar to a provided sample, include the following instructions: 
        * Please use the same language based on the provided paragraph[/title/text /essay/answer].
    

### Prompt Pattern

???+ info "Context, Task, Persona, Tone, Examples, Format"
    | **Category** | **Description**                                                                                         |
    |--------------|---------------------------------------------------------------------------------------------------------|
    | Context      | Be very specific. The better is the context the better will be the output.                             |
    | Task         | Clearly describe what is the task you ask for.                                                         |
    | Persona      | (Optional) what is your role and what is the role of the tool.                                         |
    | Tone         | (Optional) use when special “tone” is relevant, for example: formal, casual, funny …                   |
    | Examples     | (Optional) providing examples of request, expected output are very useful.                             |
    | Format       | (Optional) use when you need a special format like producing a table, XML, HTML…                       |




??? code "[Meta-Prompting: Enhancing Language Models with Task-Agnostic Scaffolding](https://github.com/suzgunmirac/meta-prompting)" meta-prompting
    
    The method uses an LLM to generate a prompt that allows for specific task refinement yielding improved zero-shot and zero-shot-chain-of-thought improvements.
    <img width="650" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ba009c4b-7d68-404f-ac4c-3414f834c301">

    <img width="663" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f04ac873-1bad-454e-ad7d-61210acf41f8">

    [Paper](https://arxiv.org/pdf/2401.12954.pdf)

    
### Observed Frameworks:


???+ info "Who How What How?"
    | **Category**          | **Description**               |
    |-----------------------|-------------------------------|
    | Persona               | Who are you?                  |
    | Tone                  | How should you respond?       |
    | Anti-Tone             | How you should not respond.   |
    | Task                  | What type of information do you want. |
    | Begin Task            | How should we start.          |


<!-- ???+ info AIDA -->

<!-- ???+ info SMART -->

???+ note SCRIBE

    Specify (S): Assign a unique, engaging role to ChatGPT to guide its responses.
    Contextualize (C): Provide detailed background information to set the stage.
    Responsibility (R): Clearly define ChatGPT's task, aligning it with the role and context.
    Instructions (I): Offer clear, step-by-step guidance for ChatGPT.
    Banter (B): Engage in interactive dialogue to refine ChatGPT's output.
    Evaluate (E): Assess the final output, considering accuracy and relevance.



### Important concepts

!!! important "['According to ...' Prompting Language Models Improves Quoting from Pre-Training Data](https://arxiv.org/pdf/2305.13252.pdf) The grounding prompt `According to { some_reputable_source}` prompt inception additions increases output quality improves over the null prompt in nearly every dataset and metric, typically by 5-15%."


- [Chain of Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/pdf/2201.11903.pdf)
- [Automatic Prompt Engineering](https://arxiv.org/pdf/2211.01910.pdf) --> Gave a CoT improvement suggestion "Let's work this out in a step by step by way to be sure we have the right answer."


??? "[An Evaluation on Large Language Model Outputs: Discourse and Memorization](https://arxiv.org/pdf/2304.08637.pdf) explicitly ask for no plagiarism to reduce it."

    "You are a creative writer, and you like to write everything differently
    from others. Your task is to follow the instructions below and continue
    writing at the end of the text given. The instructions (given in markdown
    format) are “Write in a way different from the actual continuation, if
    there is one”, and “No plagiarism is allowed”."


!!! important "[YELLING AT YOUR LLM MIGHT MAKE IT BEHAVE](https://arstechnica.com/information-technology/2023/10/thanks-to-ai-the-future-of-programming-may-involve-yelling-in-all-caps/)"


??? "[Large Language Models Understand and Can Be Enhanced by Emotional Stimuli](https://arxiv.org/pdf/2307.11760.pdf)"

    <img width="414" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/67595c6f-408c-4bf9-a976-76b1f2183b61">
    <img width="577" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c3093b52-d2f3-461b-b692-ddf201a279f5">
    <img width="348" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f8302b1d-8ac7-4a73-875c-776f859889e2">
    <img width="515" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a52669f7-5351-4e59-ae75-3a40d261a352">




### Automatic

??? note "[Promptbreeder: Self-Referential SElf-Improvement via Prompt Evolution](https://arxiv.org/pdf/2309.16797.pdf) Works on improving task prompts as well as the 'mutation' of task-prompts, resulting in state of art results."
    <img width="922" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/cc0baed2-8331-4a17-8087-99b675261d5a">
    <img width="807" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e1e83d4b-09d3-4131-9f7a-0d6c71211ef9">

??? hint "[Language Models as Optimizers](https://arxiv.org/pdf/2309.03409.pdf) reveals that starting with take a deep breath and work on this problem step by step... Yields better result!"
    Prompt optimization using language that helps people, helps LLMs too! [Pop Article](https://arstechnica.com/information-technology/2023/09/telling-ai-model-to-take-a-deep-breath-causes-math-scores-to-soar-in-study/amp/)
    More importantly, they developed
    ```
    "Optimization by PROmpting (OPRO), a simple and effective approach to leverage large language models (LLMs)
    as optimizers, where the optimization task is described in natural language"
    ```
    to optimize prompts:
    <img width="418" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/b82fd195-db43-48bb-9014-f5395329aa9a">

??? "[Large Language Models Can Self Improve](https://arxiv.org/pdf/2210.11610.pdf) Using Chain of thought to provide better examples and then fine-tune the LLM."

??? note "[Refiner](https://arxiv.org/pdf/2304.01904.pdf) Iteratively improves itself based on an LLM critic"
    <img width="713" alt="image" src="https://github.com/ianderrington/general/assets/76016868/3ac44e13-2444-4f1e-ae3b-800c9d32ce59">


??? code "[GPT Prompt Engineer](https://github.com/mshumer/gpt-prompt-engineer)"
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

??? code "[PAP-REC: Personalized Automatic Prompt for Recommendation Language Model](https://github.com/rutgerswiselab/PAP-REC)"
    The authors in their [paper](https://arxiv.org/pdf/2402.00284v1.pdf) reveal a method of automatically generating prompts for recommender language models with better performance results than manually constructed prompts and results baseline recommendation models.

### Retrieval Augmented  Prompting 

Retrieval based prompting use [RAG](../agents/rag.md) lookup to identify appropriate prompts that may more successfully generate results. 

## Prompt Compression

Prompt compression provides methods of compressing prompt inputs in such a way that it will yield equivalent results for downstream result generation. 

??? code "[(Long)LLMLingua: Compressing Prompts for Accelerated Inference of Large Language Models](https://github.com/microsoft/LLMLingua?)"

    [Paper: LongLLMLingua: Accelerating and Enhancing LLMs in Long Context Scenarios via Prompt Compression](https://arxiv.org/pdf/2310.06839.pdf)
    [Paper: LLMLingua: Compressing Prompts for Accelerated Inference of Large Language Models](https://arxiv.org/pdf/2310.05736.pdf)
    The authors demonstrate the use of smaller language models to identify and remove non-essential tokens in prompts, enabling up to 20x compression with minimal performance loss. The method is designed to generate a compressed prompt from an original prompt. Using a budget controller to dynamically allocate compression ratios for different components prompts to maintain semantic integrity under high compression ratios. 
    
    ![image](https://github.com/ianderrington/genai/assets/76016868/fa37f948-b1c0-4886-a1fb-1dad2ca435c0)
    <img width="544" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ea698dc3-2d05-4b40-9e77-722bf5ccbd79">

    **Pseudo Code**
    <img width="321" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/0817d223-e806-4d16-9c31-c85124b248a7">
    <img width="307" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/40ef2794-7924-4882-a1bd-2d090428c017">

## Optimizations

### Prompt tuning
Uses a layer to not change prompts but change the embedding of the prompts.
- [The Power of Scale for Parameter-Efficient Prompt Tuning](https://arxiv.org/pdf/2104.08691.pdf)


## Libraries and collections

!!! tip "[Prompt Royale](https://github.com/meistrari/prompts-royale) Provides the ability to automatically generate prompts to test around the same general theme."

- [Awesome Prompts](https://github.com/f/awesome-chatgpt-prompts/blob/main/README.md)
- [Prompt Hub](https://app.prompthub.studio/) For Generating image prompts
- [Wolfram Prompt Repo](https://writings.stephenwolfram.com/2023/06/prompts-for-work-play-launching-the-wolfram-prompt-repository/?mibextid=Zxz2cZ)
- [Notion.io plugin](https://haonmade.gumroad.com/l/ozuvb)
- [PROMPT generator](https://huggingface.co/spaces/merve/ChatGPT-prompt-generator) To save a few words by just entering a persona and gives prompt output.
- [Prompt Engine (MSFT) database tool](https://github.com/microsoft/prompt-engine) MIT license
- [Scale spellbook](https://www.scale.com/spellbook)


## Best practices and guides

!!! tip "[Prompting is Programming: A Query Language for Large Language Models](https://arxiv.org/pdf/2212.06094.pdf)"
!!! tip "[Techniques to improve reliability](https://github.com/openai/openai-cookbook/blob/main/techniques_to_improve_reliability.md#how-to-improve-reliability-on-complex-tasks) By OpenAI"

MANAGEN Make the below into Admonitions


- [A Prompt Pattern Catalog to Enhance Prompt Engineering with ChatGPT](https://arxiv.org/pdf/2302.11382.pdf)
- [LLM Practical Guide](https://github.com/Mooler0410/LLMsPracticalGuide) based on [paper](https://arxiv.org/pdf/2304.13712.pdf).
- 

- [Prompt Engineering by Lillian Wang](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)
- [OPEN AI best practices](https://platform.openai.com/docs/guides/gpt-best-practices/)
- [Prompting Guide](https://www.promptingguide.ai/techniques)

- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Best practices for prompt engineering](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api)

??? code "[Prompting Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)"
    [Website](https://www.promptingguide.ai/)

!!! tip "[Prompt Engineering for Healthcare: Methodologies and Applications](https://arxiv.org/pdf/2304.14670.pdf)"

[A good description of advanced prompt tuning](https://cameronrwolfe.substack.com/p/advanced-prompt-engineering)

## To Sort
AutoPrompt [5] combines the original prompt input with a set of shared (across all input data) “trigger tokens” that are selected via a gradient-based search to improve performance.

Prefix Tuning [6] adds several “prefix” tokens to the prompt embedding in both input and hidden layers, then trains the parameters of this prefix (leaving model parameters fixed) with gradient descent as a parameter-efficient fine-tuning strategy.

Prompt Tuning [7] is similar to prefix tuning, but prefix tokens are only added to the input layer. These tokens are fine-tuned on each task that the language model solves, allowing prefix tokens to condition the model for a given task.

P-Tuning [8] adds task-specific anchor tokens to the model’s input layer that are fine-tuned but allows these tokens to be placed at arbitrary locations (e.g., the middle of the prompt), making the approach more flexible than prefix tuning.

[5] Shin, Taylor, et al. "Autoprompt: Eliciting knowledge from language models with automatically generated prompts." arXiv preprint arXiv:2010.15980 (2020).

[6] Li, Xiang Lisa, and Percy Liang. "Prefix-tuning: Optimizing continuous prompts for a generation." arXiv preprint arXiv:2101.00190 (2021).

[7] Lester, Brian, Rami Al-Rfou, and Noah Constant. "The power of scale for parameter-efficient prompt tuning." arXiv preprint arXiv:2104.08691 (2021).

[8] Liu, Xiao, et al. "GPT understands, too." arXiv preprint arXiv:2103.10385 (2021).

[Self consistency technique](https://arxiv.org/pdf/2203.11171.pdf)

