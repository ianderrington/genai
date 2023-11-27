TODO: 
There are many ways that you can evaluate your model, and the manner of evaluation will generally  depend on your use case. 

As a general principle in ML, it is important to have your evaluation or test ing data thoroughly separated from your training data. If this is not done, it may be considered an improper test because the model will have had a chance to 'learn' the answers directly, and the test may not thoroughly represent any form of generalization that the model may have achieved. If needed, the 'contamination' of data may be removed with [automated methods](https://lmsys.org/blog/2023-11-14-llm-decontaminator/). 


## Metrics
- Exact Match (EM) 
TODO: Finish this

While single-LLM calls are useful to evaluate, [comparing and evaluating](../agents/evaluating_and_comparing.md) system-evaluation will likely be essential to ensure successful [deployment](../../Using/deploying/index.md).



### General Discussions
??? tip "[How do we know how smart AI systems are?](https://www.science.org/doi/10.1126/science.adj5957)"
    “AI systems, especially generative language systems like GPT-4, will become increasingly influential in our lives, as will claims about their cognitive capacities. Thus, designing methods to properly assess their intelligence—and associated capabilities and limitations—is an urgent matter. To scientifically evaluate claims of humanlike and even superhuman machine intelligence, we need more transparency on the ways these models are trained, and better experimental methods and benchmarks. Transparency will rely on the development of open-source (rather than closed, commercial) AI models. Better experimental methods and benchmarks will be brought about through collaborations between AI researchers and cognitive scientists who have long investigated how to do robust tests for intelligence, understanding, and other cognitive capabilities in children, animals, and other “alien” intelligences.”

## Evaluation Methods and Libraries
### General

??? code "[ROSCOE: A SUITE OF METRICS FOR SCORING STEP-BYSTEP REASONING](https://github.com/facebookresearch/ParlAI/tree/main/projects/roscoe) is ' a new suite of interpretable, unsupervised metrics that enables evaluation of step-by-step reasoning generations of LMs when no golden reference generation exists. ' "
    [Paper](https://arxiv.org/pdf/2212.07919.pdf)

### Domain specific 

!!! code "[Legal Bench](https://github.com/HazyResearch/legalbench/) is an ongoing open science effort to collaboratively curate tasks for evaluating LLM legal reasoning in English."

The evaluation of models helps us to identify which, if any, model to use for a particular task at hand. Directly related to the manner of pre-training, fine-tuning, and any RLHF, the ways that we consider the output can also be used to improve the models. 

## Measure what matters

TODO: COMPLETE THIS

* Hallucinations
* Logic/Math
* Sycophancy, or the degree to which a model mirrors biases, large or small, put into input queries. The repo, [sycophancy-eval](https://github.com/meg-tong/sycophancy-eval) offers some ability to evaluate this. 
