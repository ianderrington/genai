Prompts detail the manner in which a Generative AI model should be producing output. Constructing the prompts to be the most effective in obtaining desired output is known as prompt engineering (PE). While PE may have dependencies on the underlying models, there are strategies that can be more universal in their ability to do well. 

Because often an individual query or generation may be insufficient to produce the desired outputs, it may be necessary to use [cognitive architectures](../agents/cognitive_architecture.md) as part of [chains](../agents/chains.md). Here, we describe one-shot prompting methods, may function without multiple LLM-calls. 

It is also important to note, that while [manual methods](#manual-methods) are essential and may continue, [automatic methods](#automatic-methods) have become common and may help to reduce burdens of identifying sufficiently optimal prompts for certain models and situations. 


## Manual Methods

- Give clearer instructions
- Split complex tasks into simpler subtasks
- Structure the instruction to keep the model on task
- Prompt the model to explain before answering
- Ask for justifications of many possible answers, and then synthesize
- Generate many outputs, and then use the model to pick the best one
- Fine-tune custom models to maximize performance
- Provide several examples to ground it.
  -  Good to evaluate this and see if input examples give expected scores. Modify the prompt if it isn't. 
- Consider prompt versioning to keep track of outputs more easily.
- Break prompts into smaller prompts
- Chain of Thought Prompting
- Generate many outputs and pick final one or use LLM to pick best one. 

### Important concepts

!!! important "['According to ...' Prompting Language Models Improves Quoting from Pre-Training Data](https://arxiv.org/pdf/2305.13252.pdf) The grounding prompt `According to { some_reputable_source}` prompt inception additions increases output quality improves over the null prompt in nearly every dataset and metric, typically by 5-15%."

- [Chain of Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903)
- [Automatic Prompt Engineering](https://arxiv.org/abs/2211.01910) --> Gave a CoT improvement suggestion "Let's work this out in a step by step by way to be sure we have the right answer."


!!! "[An Evaluation on Large Language Model Outputs: Discourse and Memorization](https://arxiv.org/pdf/2304.08637.pdf) explicitly asks for no plagiarism"
    "You are a creative writer, and you like to write everything differently
    from others. Your task is to follow the instructions below and continue
    writing at the end of the text given. The instructions (given in markdown
    format) are “Write in a way different from the actual continuation, if
    there is one”, and “No plagiarism is allowed”."



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



!!! note "[GPT Prompt Engineer](https://github.com/mshumer/gpt-prompt-engineer)"
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
  



## Useful Resources for LLM Prompting

- [Prompting is Programming: A Query Language for Large Language Models](https://arxiv.org/pdf/2212.06094.pdf)

### Best practices and guides

!!! tip "[Techniques to improve reliability](https://github.com/openai/openai-cookbook/blob/main/techniques_to_improve_reliability.md#how-to-improve-reliability-on-complex-tasks) By OpenAI"

- [A Prompt Pattern Catalog to Enhance Prompt Engineering with ChatGPT](https://arxiv.org/pdf/2302.11382.pdf) 
- [LLM Practical Guide](https://github.com/Mooler0410/LLMsPracticalGuide) based on [paper](https://arxiv.org/abs/2304.13712).
- [Prompting Guide](https://www.promptingguide.ai/)

- [Prompt Engineering by Lillian Wang](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)
- [OPEN AI best practices](https://platform.openai.com/docs/guides/gpt-best-practices/)
- [Prompting Guide](https://www.promptingguide.ai/techniques)

- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Best practices for prompt engineering](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api)

### Repositories and Collections
- [Awesome Prompts](https://github.com/f/awesome-chatgpt-prompts/blob/main/README.md)
- [Prompt Hub](https://app.prompthub.studio/) For Generating image prompts
- [Wolfram Prompt Repo](https://writings.stephenwolfram.com/2023/06/prompts-for-work-play-launching-the-wolfram-prompt-repository/?mibextid=Zxz2cZ)

### Tools and Services
- [Notion.io plugin](https://haonmade.gumroad.com/l/ozuvb)
- [PROMPT generator](https://huggingface.co/spaces/merve/ChatGPT-prompt-generator) To save a few words by just entering a persona and gives prompt output. 
- [Prompt Engine (MSFT) database tool](https://github.com/microsoft/prompt-engine) MIT license
- [Scale spellbook](scale.com/spellbook)


### Prompt tuning

Uses a layer to not change prompts but change the embedding of the prompts. 
- [The Power of Scale for Parameter-Efficient Prompt Tuning](https://arxiv.org/abs/2104.08691)
Boosted Prompting: few shot prompts that progressively solve more of the problem.

## Prompt and optimization
- [Large Language Models Can Self Improve](https://arxiv.org/pdf/2210.11610.pdf) Using Chain of thought to provide better examples and then fine-tune the LLM. 
- [Refiner](https://arxiv.org/pdf/2304.01904.pdf) Iteratively improves itself based on an LLM critic
<img width="713" alt="image" src="https://github.com/ianderrington/general/assets/76016868/3ac44e13-2444-4f1e-ae3b-800c9d32ce59">


## To Sort

[A good description of advanced prompt tuning](https://cameronrwolfe.substack.com/p/advanced-prompt-engineering)


```
AutoPrompt [5] combines the original prompt input with a set of shared (across all input data) “trigger tokens” that are selected via a gradient-based search to improve performance.

Prefix Tuning [6] adds several “prefix” tokens to the prompt embedding in both input and hidden layers, then trains the parameters of this prefix (leaving model parameters fixed) with gradient descent as a parameter-efficient fine-tuning strategy.

Prompt Tuning [7] is similar to prefix tuning, but prefix tokens are only added to the input layer. These tokens are fine-tuned on each task that the language model solves, allowing prefix tokens to condition the model for a given task.

P-Tuning [8] adds task-specific anchor tokens to the model’s input layer that are fine-tuned but allows these tokens to be placed at arbitrary locations (e.g., the middle of the prompt), making the approach more flexible than prefix tuning.

[5] Shin, Taylor, et al. "Autoprompt: Eliciting knowledge from language models with automatically generated prompts." arXiv preprint arXiv:2010.15980 (2020).

[6] Li, Xiang Lisa, and Percy Liang. "Prefix-tuning: Optimizing continuous prompts for a generation." arXiv preprint arXiv:2101.00190 (2021).

[7] Lester, Brian, Rami Al-Rfou, and Noah Constant. "The power of scale for parameter-efficient prompt tuning." arXiv preprint arXiv:2104.08691 (2021).

[8] Liu, Xiao, et al. "GPT understands, too." arXiv preprint arXiv:2103.10385 (2021).

[Self consistency technique](https://arxiv.org/pdf/2203.11171.pdf)
```
