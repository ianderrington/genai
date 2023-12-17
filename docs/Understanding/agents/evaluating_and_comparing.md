Because of potential pitfalls with Generative AI technology, it is essential to evaluate, compare, and test models such that they meet the indendent requirements.

Below are some tools that you can use to help with this!

## Repositories

??? code "[Helm](https://github.com/stanford-crfm/helm) contains code used in the Holistic Evaluation of Language Models project"
    [Paper](https://arxiv.org/abs/2211.09110)
    <img width="817" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/40b280b6-749e-49fd-8e72-3b51c38d06b9">

??? code "[Arthur.ai Bench](https://github.com/arthur-ai/bench) Bench is a tool for evaluating LLMs for production use cases. "

    ![image](https://github.com/ianderrington/genai/assets/76016868/377d86c7-9ebf-4828-8e6a-582b86a499f9)
    ![image](https://github.com/ianderrington/genai/assets/76016868/081f14b5-f2b7-47e6-985b-a886ed66eaf1)

??? code "[DeepEval](https://github.com/mr-gpt/deepeval) provides a Pythonic way to run offline evaluations on your LLM pipelines"
    "... so you can launch comfortably into production. The guiding philosophy is a "Pytest for LLM" that aims to make productionizing and evaluating LLMs as easy as ensuring all tests pass."
    ![image](https://github.com/mr-gpt/deepeval/blob/main/assets/synthetic-query-generation.png)


??? code "[Auto Evaluator](https://autoevaluator.langchain.com/) with [github](https://github.com/rlancemartin/auto-evaluator) to evaluate appropriate components of chains to enable best performance"
    ![image](https://blog.langchain.dev/content/images/size/w1600/2023/04/auto-eval.png)


??? code tip "[Identifying the Risks of LM Agents with an LM-Emulated Sandbox](https://arxiv.org/pdf/2309.15817.pdf)"
    Where in their [paper](https://arxiv.org/pdf/2309.15817.pdf) they demonstrate an emulation container to evaluate the safety of an Agent.

    <img width="1198" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/48305f8b-7d79-4c36-b731-2aacd035fa49">

??? code tip "[AgentBench: Evaluating LLMs as Agents](https://github.com/THUDM/AgentBench)"
    A comprehensive 8-environment evaluation for different agents from different models.
    [Paper](https://arxiv.org/pdf/2308.03688.pdf)
    ![image](https://github.com/ianderrington/genai/assets/76016868/b6d3e2d8-7548-4336-b9ae-ced2844aa6ae)

??? code "[JudgeLM: Fine-tuned Large Language Models are Scalable Judges](https://github.com/baaivision/judgelm) trains LLMs to judge the outputs of LLMs based on reference examples and achieves greater coherence than human rating"
    Also provides a great example GUI and interface using GradIO
    ![image](https://github.com/ianderrington/genai/assets/76016868/4a3ca49f-39d0-453c-98f5-3498d743afa1)
