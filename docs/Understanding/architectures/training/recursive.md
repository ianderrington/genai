recursive training involves the use of an LLM so improve the selection or variety of data for that LLM. This is well describe in [data augmentation](../../data/augmentation/index.md)

The process of data simulation for AI typically involves two main steps:

1. **Training a Broad and Generalized Model:** The first step involves training a broad and generalized model. This model is trained on a wide-ranging dataset and is capable of generating highly specific synthetic data.

2. **Training a Narrow and Task-Specific Model:** The second step involves training a narrower, task-specific model on the synthetic data generated by the broad model. This task-specific model is tailored to the task at hand and can perform it with high accuracy.

```mermaid
graph LR
  A[Train Broad and Generalized Model] --> B[Generate Highly Specific Data]
  B --> C[Train Narrow and Task-Specific Model on Specific Data]
```

## Research and Understanding

??? note "[Beyond Model Collapse: Scaling Up with Synthesized Data Requires Reinforcement](https://arxiv.org/pdf/2406.07515)"
    **Results**: The authors show that training from feedback-augmented synthesized data, either
    by pruning incorrect predictions or by selecting the best of several guesses, can prevent model collapse. 


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/SqueezeAILab/LLM2LLM) [LLM2LLM: Boosting LLMs with Novel Iterative Data Enhancement](https://github.com/SqueezeAILab/LLM2LLM)"
    **Developments** The authors reveal in their [paper](https://arxiv.org/pdf/2403.15042.pdf) a solution an iterative training and generation approach that enable effective fine tuning on low-data regimes. 
    <img width="1033" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c8d8e420-69e3-435a-a854-7f1f43bff09b">


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/tatsu-lab/stanford_alpaca) [Alpaca ](https://github.com/tatsu-lab/stanford_alpaca)"



??? tip "[Shepherd: A Critic for Language Model Generation](https://arxiv.org/pdf/2308.04592.pdf) A 7B model trained to critique outputs"

    **Example chat response**
    <img width="560" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c207939b-9bd7-4a20-b747-ea46d13534f7">


??? tip "[Baize: An Open-Source Chat Model with Parameter-Efficient Tuning on Self-Chat Data](https://arxiv.org/pdf/2304.01196.pdf) Parameter efficient LLama Tuning and risk minimization"
    with a new 'Self Distillation' with Feedback to improve itself even more. RESEARCH ONLY
    <img width="587" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5426c030-96a6-4e85-a37f-d465a7e13ab5">


??? tip "[Self-Alignment with Instruction Backtranslation](https://arxiv.org/pdf/2308.06259.pdf)"
    <img width="892" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/d92f4bbd-b86a-41a9-ae9e-b2c2084d8e42">

    The seed model is used to construct training examples by generating instruction prompts
    for web documents (self-augmentation), and then selecting high quality examples
    from among these candidates (self-curation). This data is then used to finetune
    a stronger model. F

??? abstract "[WizardMath: Empowering Mathematical Reasoning for Large Language Models via _Reinforced Evol-Instruct_](https://github.com/nlpxucan/WizardLM/WizardMath)"
    Llama-2 based reinforcement enables substantial improvement over other models.
    <img width="670" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ea4313c0-9ba7-4000-b77b-a363bce049f8">
    [Paper](https://github.com/nlpxucan/WizardLM/blob/main/WizardMath/WizardMath_Paper.pdf)


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/sd-fabric/fabric) [Fabic](https://github.com/sd-fabric/fabric) is a technique to incorporate iterative feedback into the generative process of diffusion models based on StableDiffusion."
    [Paper](https://arxiv.org/pdf/2307.10159.pdf)


## Error modes
It has been found that when models are trained on output generated by those models, they can lead collapse. This collapse occurs because patterns that are generated may not fully embody non-synthetic data, leading progressively worse patterns that are generated. With enough time, the results can be sufficiently ungrounded that they become gibberish. While there are manners of helping to prevent this from happening, including tightly controlling the formats and content of the inputs (and outputs) of the data, it is not guaranteed that the synthetic data will be as syntatically, semantically, or epistmelogically valid. 

!!! important "[The Curse of Recursion: Training on Generated Data Makes Models Forget](https://arxiv.org/abs/2305.17493)"


!!! important "[Model Collapse Explained](https://www.techtarget.com/whatis/feature/"Model-collapse-explained-How-synthetic-training-data-breaks-AI)"

!!! important "[AI models collapse when trained on recursively generated data](https://www.nature.com/articles/s41586-024-07566-y)"

