Reinforcement learning is a class of ML that uses dynamic feedback from an environment to reinforce successful outcomes.

In the context of Generative AI, each generated token can be treated as an action in the state-space of possible tokens. Consequently, RL has been used as a method for improving generative models via [feedback](../training/feedback.md) methods, most notably RLHF and its variants.

## Notable Research

??? abstract "[Learning to Model the World with Language](https://github.com/jlin816/dynalang)"
    Uses multimodal agents to build world models that let them act in an environment, and introduces the Homegrid evaluation game as a testbed. [Paper](https://arxiv.org/pdf/2308.01399.pdf)
    <img width="1012" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/7ac4076b-e577-47be-b6af-a2429a8a62fa">

??? abstract "[Pearl (Meta)](https://github.com/facebookresearch/Pearl)"
    A production-ready reinforcement learning library from Meta, designed for building real RL-based agents rather than just research prototypes.
