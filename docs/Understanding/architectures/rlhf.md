# RLHF

Reinforcement Learning From Human Feedback (RLHF) is a method that trains a policy model to predict the sequence of output results, based on a given input. 

!!! note "Key Takeaway"
    RLHF is a technique that trains a model to predict the best sequence of token outputs, conditioned on a given input. 

## Understanding RLHF

During pre-training, the next token output is maximized probabilistically. However, this method does not always yield the optimal next token in different contexts or in response to varying inputs, as it may not be able to attend to relevant information properly. 

To provide better paths, supervised fine-tuning can be used to update base models to predict output that is more accurate given the input. This process often requires a high volume of quality data, typically labeled by humans, which can be costly to obtain. Moreover, the volume of quality data may not cover the desired input space comprehensively enough for the models to be generalizable. 

To condition a model to produce the desired output given a certain type of input, it is crucial to ensure the entire path of tokens that are predicted are correct, rather than individually predicted tokens. This is where Reinforcement Learning comes into play. 

Reinforcement Learning uses the outcomes of a game, also known as a roll-out, to determine how to improve the choices or moves made during the game. In the context of Language Models, this means the moves are discrete and are the next tokens that are produced. 

A [policy](#policy) helps to decide what action or direction to take based on your current state or location. Specifically, a proximal policy predicts a probability distribution over all potential output states, shaping the entire path of the outcome. 

The policy model creates a path of tokens that will end with a reward that is closest to the preferred reward. Feedback, generally from humans or other models, is used to update the policy model. However, not all variations of input data can be reasonably considered given the volume of feedback that could be provided. 

A [reward model](#reward-model) is created to estimate how humans would evaluate the output. This model allows general human-informed guidance to help improve the policy model iteratively. 

TODO: INclude OPENAI's Instruct GPT 

One of the most successful examples of this is [Instruct GPT](https://arxiv.org/pdf/2203.02155.pdf), which follows the process outlined above. This method underlies the basis of Chat-GPT 3 and 4. 

## Policy

### Proximal Policy optimization 

There are several policy gradient methods to optimize, a common one being [proximal policy optimization](#proximal-policy-optimization), or PPO. 

$$
\hat{g} = \hat{\mathbb{E}}_t \left[ \nabla_\theta \log \pi_\theta(a_t | s_t) \hat{A}_t \right]
$$

TODO: Expand this based on [Proximal Policy Optimization Algorithms](https://arxiv.org/pdf/1707.06347.pdf)

## Reward Model 

A reward model is used to approximate the evaluation quality, or reward, that a labeler (a person) might assign to an example output. 

While multiple examples may be ranked and used simultaneously, the reward model may be trained by considering only a winning and a losing example. The reward models will produce a $S_w$ $S_l$ for winning and losing examples. 

The reward model is trained with an objective to incentivize the winning response to have a lower score than the losing response. More specifically, it minimizes 

$$
-E_x(\log(\sigma(s_w-s_l)))
$$

TODO: Expand this to include more mathematics. 

## AI-enabled ranking

- [Can foundation models label data like humans?](https://huggingface.co/blog/llm-leaderboard) Using GPT to review model outputs produced biased results. Changing the prompt doesn't really help to de-bias it. There are many additional considerations surrounding model evaluation.

## Essential additional information

- [RLHF: Reinforcement Learning from Human Feedback](https://huyenchip.com/2023/05/02/rlhf.html) A splendid summary of the RLHF system.


![RLHF Diagram](https://github.com/ianderrington/genai/assets/76016868/2fb5b4d5-ecc9-45b3-9d16-63fab4ab6db0)

- [RLHF basics by hugging face](https://huggingface.co/blog/rlhf) A really good introduction to parse again.
- [RLHF for Palm in Pytorch](https://github.com/lucidrains/PaLM-rlhf-pytorch)
- [Aligning Large Language Models Through Synthetic Feedback](https://arxiv.org/abs/2305.13735) Using a hierarchy of systems to improve model alignment.