# Alignment and Existential Concerns

## Why Raw Models Need Alignment

A raw generative model is trained to predict the next token given the tokens before it. At each step, it samples from a probability distribution built from patterns in its training data. Nothing in that training process points the model toward being helpful, honest, or safe. Those properties have to be added afterward, through a separate stage often called alignment.

The most common approaches:

- **Supervised fine-tuning on curated examples** of the behavior you want, so the model has direct demonstrations to imitate rather than whatever pattern happened to dominate its pretraining data.
- **Reinforcement learning from human feedback (RLHF)**, where human raters compare model outputs and a reward model trained on those comparisons steers the model toward outputs people actually prefer.
- **Constitutional methods**, where the model critiques and revises its own outputs against a written set of principles, reducing how much raw human labeling the process needs.

This site's [alignment techniques post](../../blog/posts/ai-alignment-techniques.md) covers these methods in technical depth, with citations to the original InstructGPT, Constitutional AI, and AI-safety-via-debate papers. OpenAI's own account of their process is at [Our Approach to Alignment Research](https://openai.com/index/our-approach-to-alignment-research/).

## Alignment Can Be Removed, Not Just Added

Alignment is not a permanent property once trained in. Qi et al. (2023) showed that fine-tuning an already-aligned model, even on a dataset that looks entirely benign, can quietly degrade its safety behavior. The paper's finding that matters most for anyone deploying a fine-tuned model: this happens even when nobody intended it, from ordinary fine-tuning on ordinary data, not just from a deliberate attack. Anyone fine-tuning a model for a downstream use case should treat safety re-evaluation as a required step after fine-tuning, not an optional one.

## Existential and Self-Existential Concerns

Two distinct kinds of concern get discussed under this heading, and it's worth keeping them separate:

**Harm to people**, whether from a model being misused deliberately or from a capable model causing harm without anyone intending it. This is the concern most public AI-safety discussion focuses on, and it scales with model capability: a more capable model has a larger blast radius for both kinds of failure.

**Harm to the models themselves, in an aggregate, self-referential sense.** As more of the internet's content is itself AI-generated, models trained on that content risk a degradation effect called model collapse, where each generation trained on the previous generation's output loses a little more of the tails of the real data distribution. Shumailov et al. (2023) demonstrated this formally across several model types, not just as a hypothetical. If unmanaged, the field's own output becomes a contaminant to future training data, a genuinely different kind of existential concern than the harm-to-people framing above.

## Alignment With People vs. Alignment With the Model

Most alignment work aligns a single model with a single, implicit standard of "helpful and harmless." That gets harder once you consider that different people have different, sometimes conflicting values, and a system serving many people at once can't simultaneously satisfy all of them with one fixed behavior. Yampolskiy (2019) proposes one way to sidestep the conflict directly: instead of merging everyone's preferences into one aggregate value function, give each user their own individually-optimized environment. Whether that's the right answer or not, it names the real structural problem underneath most "align the model with human values" framing: whose values, precisely, and what happens when two users' values disagree.

## Jailbreaking

Jailbreaking is the practice of getting an aligned model to produce output its alignment training was meant to prevent. Two distinct approaches show up in practice:

- **Prompting-based**, where the attacker crafts input text alone, no access to the model's weights required, exploiting gaps between what the alignment training covered and the full space of possible inputs.
- **Fine-tuning-based**, the mechanism covered above under "Alignment Can Be Removed, Not Just Added." An attacker with fine-tuning access degrades the model's safety training directly, which is generally more reliable than prompting alone, but it requires a level of access prompting doesn't.

## References

- [Our Approach to Alignment Research (OpenAI)](https://openai.com/index/our-approach-to-alignment-research/)
- [Fine-tuning Aligned Language Models Compromises Safety, Even When Users Do Not Intend To! (Qi et al., 2023)](https://arxiv.org/abs/2310.03693)
- [The Curse of Recursion: Training on Generated Data Makes Models Forget (Shumailov et al., 2023)](https://arxiv.org/abs/2305.17493)
- [Personal Universes: A Solution to the Multi-Agent Value Alignment Problem (Yampolskiy, 2019)](https://arxiv.org/abs/1901.01851)
