Evaluating and comparing models is essential to enabling quality outcomes. There are a number of ways that models can be evaluated, and in many domains. [How to evaluate](#how-to-evaluate) the models may depend on the intended use-cases of the model, but generally evaluating an LLM architectures look at the performance of individual architecture-calls. When multiple calls are chained together, as with [agents](../agents/index.md) it is preferable to [evaluate them accordingly](../agents/evaluating_and_comparing.md). Because LLM models may be more frozen, and potentially less-likely to change, it is likely important to evaluate a the architecture-level first, before moving on to more complex and high-level evaluations. It also is important to know that model-evaluations will be dependent on your [prompting](../prompting/index.md), and consequently if one wishes to find optimal models, one should consider [prompt optimization](../prompting/index.md#optimizions)

If you are using or developing your own models, checking out the [leader boards](#leaderboards) will help you to identify models that are appropriately performant for your needs. But what are your needs? That it is why it is important to know [what you should evaluate](#what-to-evaluate). With this in hand, you can then figure out [how to evaluate](#how-to-evaluate) your LLM models. 

## Leaderboards

Here are a few boards that help to aggregate and test models that have been released.

- [Hugging Face LLM leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard) An essential chart for documenting the model performance across multiple models.
- [lmsys.org leader board](https://lmsys.org/blog/2023-06-22-leaderboard/)

## **What** to evaluate?
There are several domains of expertise where it may be essential to measure Model's performance. For general-performance models, even if not [multi-model](models/multimodal.md), it is useful to consider [multiple-criteria](#multi-criteria-evaluation) simultaneously, which may include [specific criteria](#specific-evaluation) to evaluate


### Multi-criteria evaluation

??? important "[HELM Instruct: A Multidimensional Instruction Following Evaluation Framework with Absolute Ratings](https://crfm.stanford.edu/2024/02/18/helm-instruct.html)" helm-instruct
    **Developments** The authors create HELM instruct to use multiple LLMs to evaluate multiple model for given input instructions. They evaluate around the following criteria: _Helpfulness, Understandability, Completeness, COnciseness, and Harmlessness_. 

    ![image](https://github.com/ianderrington/genai/assets/76016868/2217abd4-bf6a-4513-86c9-a229f40c3f62)
    The evaluation rubric is as follows
    ![image](https://github.com/ianderrington/genai/assets/76016868/6b7fd52e-9c93-46a8-9d3e-b321e430b698)
    
    **Results** They find that GPT-4 generally performs the best in all metrics. Interestingly, however, they do not find high consistency amongst evaluators.
    ![image](https://github.com/ianderrington/genai/assets/76016868/cc53d97d-86f3-43a6-9899-d06dcb33feff)


#### Generalization ability

It may be important for your modal to have generalization beyond your training data. If so, it is important to thoroughly separate any testing data from the training data. To remove this, you will want to work on your [data](../data/index.md) preparation. If needed, the 'contamination' of data may be removed with [automated methods](https://lmsys.org/blog/2023-11-14-llm-decontaminator/).


### Specific Criteria

#### Accuracy vs Hallucination

Hallucinations remain a core problem with LLMs as they may generate linguistic and syntatically correct statements, that lack epistemic or factually grounded understanding. 

??? important "Hugging faces [leaderboard](https://huggingface.co/blog/leaderboards-on-the-hub-hallucinations) on hallucinations provides a comparison of different models' hallucinations"
    Much is based on [awesome-hallucination-detection](https://github.com/EdinburghNLP/awesome-hallucination-detection) 
https://github.com/princeton-nlp/SWE-agent
!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/sylinrl/TruthfulQA) [Truthful - QA]([Truthful - QA](https://github.com/sylinrl/TruthfulQA)) helpes to Measuring How Models Mimic Human Falsehoods" 


#### Information Retrieval

The ability for an LLM to 'recall' information within its context window is an integral part of its ability function with contextually relevant information, and to act as effective retrieval mechanisms. To evaluate this ability, the _needle-in-a-haystack_ test can be used. In it the following occur: 

1. Place a random fact or statement (the 'needle') in the middle of a long context window (the 'haystack')
2. Ask the model to retrieve this statement
3. Iterate over various document depths (where the needle is placed) and context lengths to measure performance

In ideal systems, context retrieval will be independent of the position within the context, and of the content itself. 

??? important "![GitHub Repo stars](https://badgen.net/github/stars/gkamradt/LLMTest_NeedleInAHaystack) [Testing with LLMTest_NeedleInAHaystack repo]([Testing with LLMTest_NeedleInAHaystack repo](https://github.com/gkamradt/LLMTest_NeedleInAHaystack)) shows where in the context space that LLMs may fail at context retrieval." 
    As demonstrated additionally in the authors' [youtube](https://www.youtube.com/watch?v=KwRRuiCCdmc)

It was, however Anthropic found, that [LLMs can perform better](https://www.anthropic.com/news/claude-2-1-prompting) context retrieval when phrases are added: 

```markdown
 “Here is the most relevant sentence in the context:” 
```


While information retrieval are important, they might also be good at following instructions.

??? abstract "[FollowIR: Evaluating and Teaching Information Retrieval Models to Follow Instructions](https://arxiv.org/pdf/2403.15246.pdf) creates FOLLOWIR, which contains a benchmark that explicitly measures the instruction following ability of retrieval model"
   

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/huggingface/lighteval) [Lighteval by Hugging Face]([Lighteval by Hugging Face](https://github.com/huggingface/lighteval)) provides lightweight framework for LLM evaluation"

#### Question Answering

### Domain expertise

#### Language generation 

#### Code generation

#### Math, logic, and reasoning

#### Science and engineering

#### Healthcare and medicine

#### Law and policy


!!! abstract "[Legal Bench](https://github.com/HazyResearch/legalbench/) is an ongoing open science effort to collaboratively curate tasks for evaluating LLM legal reasoning in English."

#### Embodied Devices and Robotics

### AI-psychology 
While it may be projective to consider AI as having 'psychology', it may be useful to relate to different human-like characteristics when evaluating GenAI models.

#### Creativity


#### Deception
??? "[Role play with large language models (Murray Shanahan et al., November 2023)](https://www.nature.com/articles/s41586-023-06647-8)"

   Abstract:
   "As dialogue agents become increasingly human-like in their performance, we must develop effective ways to describe their behaviour in high-level terms without falling into the trap of anthropomorphism. Here we foreground the concept of role play. Casting dialogue-agent behaviour in terms of role play allows us to draw on familiar folk psychological terms, without ascribing human characteristics to language models that they in fact lack. Two important cases of dialogue-agent behaviour are addressed this way, namely,         
 (apparent) deception and (apparent) self-awareness."

#### Sycophancy

Sycophancy is the degree to which a model mirrors biases, large or small, that are put into input queries by the user. In ideal systems, sycophancy will be minimized to prevent _echo-chamber_ amplification of innaccuracies. 

!!! abstract "The repo ![GitHub Repo stars](https://badgen.net/github/stars/meg-tong/sycophancy-eval) [Sycophancy-eval]([Sycophancy-eval](https://github.com/meg-tong/sycophancy-eval)) offers manners and methods of evaluating sycophancy. "

### General Discussions

??? tip "[How do we know how smart AI systems are?](https://www.science.org/doi/10.1126/science.adj5957)"
    “AI systems, especially generative language systems like GPT-4, will become increasingly influential in our lives, as will claims about their cognitive capacities. Thus, designing methods to properly assess their intelligence—and associated capabilities and limitations—is an urgent matter. To scientifically evaluate claims of humanlike and even superhuman machine intelligence, we need more transparency on the ways these models are trained, and better experimental methods and benchmarks. Transparency will rely on the development of open-source (rather than closed, commercial) AI models. Better experimental methods and benchmarks will be brought about through collaborations between AI researchers and cognitive scientists who have long investigated how to do robust tests for intelligence, understanding, and other cognitive capabilities in children, animals, and other “alien” intelligences.”


## **How** to evaluate
While it may seem reasonable to evaluate with a 'guess-and-check' approach, this is not scaleable, nor is will it be quantitatively informative. That is why the use of various tools/libaries are essential to evaluate your models. This 

### Measurements Libraries

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/ianarawjo/ChainForge) [Chain Forge: An open-source visual programming environment for battle-testing prompts to LLMs.]([Chain Forge: An open-source visual programming environment for battle-testing prompts to LLMs.](https://github.com/ianarawjo/ChainForge))"

??? abstract "[ROSCOE: A SUITE OF METRICS FOR SCORING STEP-BYSTEP REASONING](https://github.com/facebookresearch/ParlAI/tree/main/projects/roscoe) is ' a new suite of interpretable, unsupervised metrics that enables evaluation of step-by-step reasoning generations of LMs when no golden reference generation exists. ' "
    [Paper](https://arxiv.org/pdf/2212.07919.pdf)


??? "[Introducing MMMU, a Massive Multi-discipline Multimodal Understanding and Reasoning Benchmark for Expert AGI.](https://mmmu-benchmark.github.io)"
    [Paper](https://arxiv.org/pdf/2311.16502.pdf)

    11.5K meticulously collected multimodal questions from college exams, quizzes, and textbooks
    Spanning Art & Design 🎨, Business 💼, Science 🔬, Health & Medicine 🩺, Humanities & Social Science 📖, Tech & Engineering 🛠️ across 30 subjects and 183 subfields
    30 heterogeneous image types🗺️📉🎼, such as charts, diagrams, maps, tables, music sheets, and chemical structures
    Focuses on advanced perception and reasoning with domain-specific knowledge 🧠
    Results and Takeaways from evaluating 14 open-source models and #GPT4-Vision:
    🧐MMMU Benchmark post a great challenge to existing #LMMs: #GPT4V only hits 56% accuracy, showing a vast landscape for #LMMs advancement.
    💪 Long way to go for open-source LMMs. Top open-source models like #BLIP2-FLAN-T5-XXL and #LLaVA-1.5 achieve around 34% accuracy.
    🖼️📝OCR and captions addition to #LLMs show little gain in MMMU, highlighting the need for deeper joint image-text interpretation.
    Models tend to perform better on photos and paintings🖼️ than on diagrams and tables📊, where nuanced and fine-grained visual information persists.
    🤖Error analysis on 150 error cases of GPT-4V reveals that 35% of errors are perceptual, 29% stem from a lack of knowledge, and 26% are due to flaws in the reasoning process.

#### Domain specific

!!! abstract "[Legal Bench](https://github.com/HazyResearch/legalbench/) is an ongoing open science effort to collaboratively curate tasks for evaluating LLM legal reasoning in English."

The evaluation of models helps us to identify which, if any, model to use for a particular task at hand. Directly related to the manner of pre-training, fine-tuning, and any RLHF, the ways that we consider the output can also be used to improve the models.


## Useful References

??? important "![GitHub Repo stars](https://badgen.net/github/stars/MLGroupJLU/LLM-eval-survey) [LLM Eval survey, paper collection]([LLM Eval survey, paper collection](https://github.com/MLGroupJLU/LLM-eval-survey))"
    [Paper](https://arxiv.org/abs/2307.03109)
