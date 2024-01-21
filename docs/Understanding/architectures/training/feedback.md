In generation models, higher quality is generally found through feedback methods. Because token-generation is greedy, or it generally maximizes the likelihood of the immediate token and not all subsequent tokens, the complete-generation may easily be biased by tokens that are generated that do not lead to more globally optimial responses. Feedback methods are designed to guide the generation of the entire set of next token(s) to more successfully fulfill the intention of calling prompts. 

!!! important "Navigating through a maze of tokens"
    The process of generating responses can be likened to navigating through a maze of tokens. The final generation token, 'EOF', signifies the end of the output and the completion of a path through the maze, which is the 'destination'. The quality of this path depends on the individual steps taken while navigating the maze. It is possible to take wrong 'turns' in the maze, resulting in a 'wrong' or suboptimal path when the generation arrives at the final destination. This is where [feedback](#feedback) comes into play, guiding the path through the maze towards a more correct destination. 


Feedback can be provided by humans, referred to as [human-feedback (HF)](#feedback), or by AI, known as [AI-feedback (AIF)](#ai-feedback), or a combination of both. 


[^n1]Note: This is different from [recurrent_training](./recurrent.md) where a model is used to generate training examples to improve the training of a subsequent model. 

Feedback-based model updates can be categorized into two types: those that use [reinforcement learning](#reinforcement-learning-based-feedback) (RL) and those that use [RL-free feedback](#rl-free-feedback). 

Prominent models, like GPT-4, [Reinforcement Learning with Human Feedback, RLHF](#RLHF), has enabled some of the most powerful models. 

!!! note "Key Takeaway"
    Feedback is a technique that trains a model to predict a more optimal sequence of token outputs conditioned on a given input.


## Feedback

Feedback is generated from evaluations by people or AI of two or more outputs conditioned on an input prompt. These evaluations can be applied to the entirety of an output or specific portions of it. The evaluation results are then used to optimize the complete path.  

In generative models, the quality of output is often enhanced through feedback mechanisms. This is because token-generation is typically a greedy process, maximizing the likelihood of the immediate token without considering the impact on subsequent tokens. As a result, the complete generation can be biased by tokens that do not lead to globally optimal responses. Feedback methods are designed to guide the generation of the entire set of next tokens to more effectively fulfill the intention of the calling prompts.


## Reinforcement learning based feedback
Reinforcement Learning (RL) uses the outcomes of a game, also known as a roll-out, to determine how to improve the choices or moves made during the game. In the context of Language Models, these moves are discrete and correspond to the next tokens that are produced.

A [policy](#policy) helps to decide what action or direction to take based on your current state or location. Specifically, a proximal policy predicts a probability distribution over all potential output states, shaping the entire path of the outcome.

The policy model creates a path of tokens that will end with a reward that is closest to the preferred reward. Feedback, generally from humans or other models, is used to update the policy model. However, not all variations of input data can be reasonably considered given the volume of feedback that could be provided.

A [reward model](#reward-model) is created to estimate how humans would evaluate the output. This model allows general human-informed guidance to help improve the policy model iteratively.

One of the most successful examples of this is [Instruct GPT](https://arxiv.org/pdf/2203.02155.pdf), which follows the process outlined above. This method underlies the basis of Chat-GPT 3 and 4.

??? note "Many RL methods use 'outcome' evaluations, but [process reward models ](#process-reward-models) can be better"
    Using RL feedback from human labelers to provide feedback on intermediate steps, in [Let's Verify Step By Step](https://arxiv.org/pdf/2305.20050.pdf) the authors demonstrate that providing feedback on intermediate steps can yield a reward model that is considerably better on various math-tests, than it is for outcome-based reward models.

??? important "[(Anthropic) Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback](https://arxiv.org/pdf/2204.05862.pdf)"
    <img width="784" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ec75fbc6-c3a9-404d-9a69-035f3ea6316b">


## RLHF
??? note  "[Learning to summarize from human feedback](https://proceedings.neurips.cc/paper/2020/file/1f89885d556929e98d3ef9b86448f951-Paper.pdf) Provides initial successful examples using PPO and human feedback to improve summaries."


- [RLHF: Reinforcement Learning from Human Feedback](https://huyenchip.com/2023/05/02/rlhf.html) A splendid summary of the RLHF system.


![RLHF Diagram](https://github.com/ianderrington/genai/assets/76016868/2fb5b4d5-ecc9-45b3-9d16-63fab4ab6db0)

- [RLHF basics by hugging face](https://huggingface.co/blog/rlhf) A really good introduction to parse again.
- [RLHF for Palm in Pytorch](https://github.com/lucidrains/PaLM-rlhf-pytorch)



### Policy

#### Proximal Policy optimization

There are several policy gradient methods to optimize, a common one being [proximal policy optimization](#proximal-policy-optimization), or PPO.

$$
\hat{g} = \hat{\mathbb{E}}_t \left[ \nabla_\theta \log \pi_\theta(a_t | s_t) \hat{A}_t \right]
$$

TODO: Expand this based on [Proximal Policy Optimization Algorithms](https://arxiv.org/pdf/1707.06347.pdf)

## Reward Models

A reward model is used to approximate the  quality, or reward, that a labeler (a person) might assign to an example output.

While multiple examples may be ranked and used simultaneously, the reward model may be trained by considering only a winning and a losing example. The reward models will produce a $S_w$ $S_l$ for winning and losing examples.

The reward model is trained with the objective of incentivizing the winning response to have a lower score than the losing response. More specifically, it minimizes

$$
-E_x(\log(\sigma(s_w-s_l)))
$$

TODO: Expand this to include more mathematics.

### Process reward models

Much like intermediate points to a ball-game are indicators of the winner of a game, a process reward model approximates the quality of intermediate steps in a total outcome.

Having intermediate rewards provides better guidance on how the token generation occurs before the token termination.

??? "[Let's reward step by step; Step-Level Reward Model as the Navigators for Reasoning](https://arxiv.org/pdf/2310.10080.pdf)"
    <img width="495" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4bf366b4-f7f6-47ed-b5aa-2b94ab140796">
    <img width="687" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a2706b6e-78e0-458b-a607-069758207909">

### RLAIF
Because of the ability to minimize costs associated with feedback, reinforcement Learning from AI Feedback (RLAIF) has proved additionally valuable. 

??? important "[Starling-7B: Increasing LLM Helpfulness & Harmlessness with RLAIF](https://starling.cs.berkeley.edu/) provides a solid example using RLAIF generated with GPT-4 to create a 7B model that is almost as good as GPT-4"
    They also released a [data set called Nectar](https://huggingface.co/datasets/berkeley-nest/Nectar) that with over 180k GPT-4 ranked outputs.


- [Can foundation models label data like humans?](https://huggingface.co/blog/llm-leaderboard) Using GPT to review model outputs produced biased results. Changing the prompt doesn't really help to de-bias it. There are many additional considerations surrounding model evaluation.

- [Aligning Large Language Models Through Synthetic Feedback](https://arxiv.org/pdf/2305.13735.pdf) Using a hierarchy of systems to improve model alignment.

## RL-free feedback

It is possible to provide feedback without using Reinforcement learning. Using a technique called 'Direct Policy Optimization', DPO, models can be optimize without explicitly generating a reward model for different output prompts. Using this method helps to reduce several challenges associated with RL, including the need to iteratively train reward models, and any stability challenges that are offen associated with reinforcement learning. 

TODO: INtegrate this: 
https://arxiv.org/pdf/2305.18290.pdf


## TODO
Literature to read and integrate :
https://arxiv.org/pdf/2211.14275.pdf
https://arxiv.org/pdf/2308.01825.pdf

