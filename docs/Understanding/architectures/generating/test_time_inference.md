# Test-Time Inference

Test-time inference (also called test-time compute or test-time scaling) improves output quality by spending more computation at inference time, rather than only at training time. Two distinct approaches to this:

??? note "[s1: Simple Test-Time Scaling](https://github.com/simplescaling/s1)"
    [Paper](https://arxiv.org/abs/2501.19393) — fine-tunes Qwen2.5-32B-Instruct on a small, carefully curated dataset (1,000 questions with reasoning traces, selected for difficulty, diversity, and quality) and controls reasoning length at inference time with "budget forcing": either cutting the model's thinking short, or lengthening it by appending "Wait" to make it reconsider and often correct flawed reasoning. The result exceeds OpenAI's o1-preview on competition math by up to 27%, despite the small dataset and explicit training simplicity.

??? note "[Scaling Up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach](https://arxiv.org/abs/2502.05171)"
    A different mechanism for the same goal: instead of generating more visible reasoning tokens like chain-of-thought, this architecture iterates a recurrent computation block, "unrolling" to arbitrary depth at inference time without any specialized reasoning-specific training. This lets it capture reasoning that's hard to express in language at all, at the cost of that reasoning being invisible to the user rather than inspectable like a chain-of-thought trace.
