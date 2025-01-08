Because LLMs generally are part of broader agent systems, it is important to evaluate them. While [model evaluation](../architectures/evaluating_and_comparing.md) and [prompt](#../prompting/index.md) evaluation is essential to understanding optimizing individual components, it is essential to evaluate the higher-level agents and agent systems. 

There is a lot of similarity of [what to evaluate](../architectures/evaluating_and_comparing.md#what-to-evaluate) for models, so we primarily focus on tools and methods of [how to evaluate agents](#evaluating-agents) 

## Evaluating Agents

??? abstract "[MLE-BENCH: EVALUATING MACHINE LEARNING AGENTS ON MACHINE LEARNING ENGINEERING](github.com/openai/mle-bench/)" 
    The authors share in their [paper](https://arxiv.org/pdf/2410.07095) at kaggle-competition environmet for agents surrounding ML challenges. 
    
    <img width="550" alt="image" src="https://github.com/user-attachments/assets/10909e0f-6787-4f6c-a95b-6b1d7210d02a">

    <img width="592" alt="image" src="https://github.com/user-attachments/assets/ab8789d4-f9d3-4875-a777-1bc381e785cc">

    

??? abstract "[Promptfoo: a tool for testing and evaluating LLM output quality](https://github.com/promptfoo/promptfoo)"
    ![image](https://github.com/ianderrington/genai/assets/76016868/c318311a-f65f-49a5-8636-e3f977d4a1f3)

    With promptfoo, you can:
    
    Systematically test prompts, models, and RAGs with predefined test cases
    Evaluate quality and catch regressions by comparing LLM outputs side-by-side
    Speed up evaluations with caching and concurrency
    Score outputs automatically by defining test cases
    Use as a CLI, library, or in CI/CD
    Use OpenAI, Anthropic, Azure, Google, HuggingFace, open-source models like Llama, or integrate custom API providers for any LLM API

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/mr-gpt/deepeval) [DeepEval](https://github.com/mr-gpt/deepeval) provides a Pythonic way to run offline evaluations on your LLM pipelines"
    "... so you can launch comfortably into production. The guiding philosophy is a "Pytest for LLM" that aims to make productionizing and evaluating LLMs as easy as ensuring all tests pass."
    ![image](https://github.com/mr-gpt/deepeval/blob/main/assets/synthetic-query-generation.png)
    It integrates with Llama index [here](https://docs.confident-ai.com/docs/integrations-llamaindex)

??? note "[API-BLEND: A Comprehensive Corpora for Training and Benchmarking API LLMs](https://arxiv.org/abs/2402.15491)"

    There is a growing need for Large Language Models (LLMs) to effectively use tools and external Application Programming Interfaces (APIs) to plan and complete tasks. As such, there is tremendous interest in methods that can acquire sufficient quantities of train and test data that involve calls to tools / APIs. Two lines of research have emerged as the predominant strategies for addressing this challenge. The first has focused on synthetic data generation techniques, while the second has involved curating task-adjacent datasets which can be transformed into API / Tool-based tasks. In this paper, we focus on the task of identifying, curating, and transforming existing datasets and, in turn, introduce API-BLEND, a large corpora for training and systematic testing of tool-augmented LLMs. The datasets mimic real-world scenarios involving API-tasks such as API / tool detection, slot filling, and sequencing of the detected APIs. We demonstrate the utility of the API-BLEND dataset for both training and benchmarking purposes.


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/stanford-crfm/helm) [Helm](https://github.com/stanford-crfm/helm) contains code used in the Holistic Evaluation of Language Models project"
    [Paper](https://arxiv.org/pdf/2211.09110.pdf)
    <img width="817" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/40b280b6-749e-49fd-8e72-3b51c38d06b9">

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/arthur-ai/bench) [Arthur.ai Bench](https://github.com/arthur-ai/bench) Bench is a tool for evaluating LLMs for production use cases. "

    ![image](https://github.com/ianderrington/genai/assets/76016868/377d86c7-9ebf-4828-8e6a-582b86a499f9)
    ![image](https://github.com/ianderrington/genai/assets/76016868/081f14b5-f2b7-47e6-985b-a886ed66eaf1)



??? abstract "[Auto Evaluator (Langchain)](https://autoevaluator.langchain.com/) with ![GitHub Repo stars](https://badgen.net/github/stars/rlancemartin/auto-evaluator) [github](https://github.com/rlancemartin/auto-evaluator) to evaluate appropriate components of chains to enable best performance"
    ![image](https://blog.langchain.dev/content/images/size/w1600/2023/04/auto-eval.png)


??? abstract tip "[Identifying the Risks of LM Agents with an LM-Emulated Sandbox](https://arxiv.org/pdf/2309.15817.pdf)"
    Where in their [paper](https://arxiv.org/pdf/2309.15817.pdf) they demonstrate an emulation container to evaluate the safety of an Agent.

    <img width="1198" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/48305f8b-7d79-4c36-b731-2aacd035fa49">

??? abstract tip "![GitHub Repo stars](https://badgen.net/github/stars/THUDM/AgentBench) [AgentBench: Evaluating LLMs as Agents](https://github.com/THUDM/AgentBench)"
    A comprehensive 8-environment evaluation for different agents from different models.
    [Paper](https://arxiv.org/pdf/2308.03688.pdf)
    ![image](https://github.com/ianderrington/genai/assets/76016868/b6d3e2d8-7548-4336-b9ae-ced2844aa6ae)

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/baaivision/judgelm) [JudgeLM: Fine-tuned Large Language Models are Scalable Judges](https://github.com/baaivision/judgelm) trains LLMs to judge the outputs of LLMs based on reference examples and achieves greater coherence than human rating"
    Also provides a great example GUI and interface using GradIO
    ![image](https://github.com/ianderrington/genai/assets/76016868/4a3ca49f-39d0-453c-98f5-3498d743afa1)


??? example "[Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference](https://chat.lmsys.org/)"
    
    **Abstract:** Large Language Models (LLMs) have unlocked new capabilities and applications; however, evaluating the alignment with human preferences still poses significant challenges. To address this issue, we introduce Chatbot Arena, an open platform for evaluating LLMs based on human preferences. Our methodology employs a pairwise comparison approach and leverages input from a diverse user base through crowdsourcing. The platform has been operational for several months, amassing over 240K votes. This paper describes the platform, analyzes the data we have collected so far, and explains the tried-and-true statistical methods we are using for efficient and accurate evaluation and ranking of models. We confirm that the crowdsourced questions are sufficiently diverse and discriminating and that the crowdsourced human votes are in good agreement with those of expert raters. These analyses collectively establish a robust foundation for the credibility of Chatbot Arena. Because of its unique value and openness, Chatbot Arena has emerged as one of the most referenced LLM leaderboards, widely cited by leading LLM developers and companies.
    [Paper](https://arxiv.org/html/2403.04132v1)

## Example evaluations

??? abstract "[Agent Eval Refine](https://github.com/Berkeley-NLP/Agent-Eval-Refine) design and use evaluation models to both evaluate and autonomously refine the performance of digital agents that browse the web or control mobile devices."
    - [Paper](https://arxiv.org/pdf/2404.06474.pdf)
