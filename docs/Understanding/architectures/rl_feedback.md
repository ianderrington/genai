Reinforcement learning feedback provides a method to extend data-sparse examples to provide a way of training to produce entire output traces that are optimal. 

In general, Reinforcement-learning feedback is a method that trains a policy model to predict an optimal sequence of output results given inputs. 

Starting initially from Reinforcement Learning From Human Feedback (RLHF), it has also evolved to include Reinforcement Learning from AI Feedback (RLAIF). 

!!! note "Key Takeaway"
    RLHF is a technique that trains a model to predict the best sequence of token outputs, conditioned on a given input. 

## Understanding RLF

During pre-training, the next token output is maximized probabilistically. However, this method does not always yield the optimal next token in different contexts or in response to varying inputs, as it may not be able to attend to relevant information properly. 

To provide better paths, supervised fine-tuning can be used to update base models to predict output that is more accurate given the input. This process often requires a high volume of quality data, typically labeled by humans, which can be costly to obtain. Moreover, the volume of quality data may not cover the desired input space comprehensively enough for the models to be generalizable. 

To condition a model to produce the desired output given a certain type of input, it is crucial to ensure the entire path of tokens that are predicted are correct, rather than individually predicted tokens. This is where Reinforcement Learning comes into play. 

Reinforcement Learning uses the outcomes of a game, also known as a roll-out, to determine how to improve the choices or moves made during the game. In the context of Language Models, this means the moves are discrete and are the next tokens that are produced. 

A [policy](#policy) helps to decide what action or direction to take based on your current state or location. Specifically, a proximal policy predicts a probability distribution over all potential output states, shaping the entire path of the outcome. 

The policy model creates a path of tokens that will end with a reward that is closest to the preferred reward. Feedback, generally from humans or other models, is used to update the policy model. However, not all variations of input data can be reasonably considered given the volume of feedback that could be provided. 

A [reward model](#reward-model) is created to estimate how humans would evaluate the output. This model allows general human-informed guidance to help improve the policy model iteratively. 

One of the most successful examples of this is [Instruct GPT](https://arxiv.org/pdf/2203.02155.pdf), which follows the process outlined above. This method underlies the basis of Chat-GPT 3 and 4. 

??? note "Many RL methods use 'outcome' evaluations, but [process reward models ](#process-reward-model) can be better"
    Using RL feedback from human labelers to provide feedback on intermediate steps, in [Let's Verify Step By Step](https://arxiv.org/pdf/2305.20050.pdf) the authors demonstrate that providing feedback on intermediate steps can yield a reward model that is considerably better on various math-tests, than it is for outcome-based reward models. 

    
    
## Policy

### Proximal Policy optimization 

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

??? "[Let's reward step by step; Step-Level Reward Model as the Navigators for Reasoning](https://arxiv.org/abs/2310.10080)" 
    <img width="495" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4bf366b4-f7f6-47ed-b5aa-2b94ab140796">
    <img width="687" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a2706b6e-78e0-458b-a607-069758207909">




Literature to read and integrate :
https://arxiv.org/pdf/2211.14275.pdf
https://arxiv.org/abs/2308.01825


## RLHF

??? important "[Starling-7B: Increasing LLM Helpfulness & Harmlessness with RLAIF](https://starling.cs.berkeley.edu/) provides a solid example using RLAIF generated with GPT-4 to create a 7B model that is almost as good as GPT-4"
    They also released a [data set called Nectar](https://huggingface.co/datasets/berkeley-nest/Nectar) that with over 180k GPT-4 ranked outputs. 


- [Can foundation models label data like humans?](https://huggingface.co/blog/llm-leaderboard) Using GPT to review model outputs produced biased results. Changing the prompt doesn't really help to de-bias it. There are many additional considerations surrounding model evaluation.

## Essential additional information

- [RLHF: Reinforcement Learning from Human Feedback](https://huyenchip.com/2023/05/02/rlhf.html) A splendid summary of the RLHF system.


![RLHF Diagram](https://github.com/ianderrington/genai/assets/76016868/2fb5b4d5-ecc9-45b3-9d16-63fab4ab6db0)

- [RLHF basics by hugging face](https://huggingface.co/blog/rlhf) A really good introduction to parse again.
- [RLHF for Palm in Pytorch](https://github.com/lucidrains/PaLM-rlhf-pytorch)
- [Aligning Large Language Models Through Synthetic Feedback](https://arxiv.org/abs/2305.13735) Using a hierarchy of systems to improve model alignment.

??? note  "[Learning to summarize from human feedback](https://proceedings.neurips.cc/paper/2020/file/1f89885d556929e98d3ef9b86448f951-Paper.pdf) Provides initial successful examples using PPO and human feedback to improve summaries."
