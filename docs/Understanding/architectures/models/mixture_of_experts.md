# Mixture of Experts

MOE provides the ability to use different smaller models that have better performance in certain domains. Their use is notable, as it has been stated that GPT-4 is powered by 8 different agents.

??? tip "[Scaling Expert Language Models with Unsupervised Domain Discovery](https://arxiv.org/pdf/2303.14177.pdf)"
    **Developments**  "Our method clusters a corpus into sets of related documents, trains a separate expert language model on each cluster, and combines them in a sparse ensemble for inference. This approach generalizes embarrassingly parallel training by automatically discovering the domains for each expert, and eliminates nearly all the communication overhead of existing sparse language models. "

    <img width="680" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f4ec7e2e-bf27-4fc0-b420-0010e1caef71">


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/robertcsordas/moe_attention) [SwitchHead: Accelerating Transformers with Mixture-of-Experts Attention](https://github.com/robertcsordas/moe_attention)"
    [Paper](https://arxiv.org/pdf/2312.07987.pdf)

    <img width="568" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/8cdb5b54-c0b3-47b3-bef0-8535cd0106a4">


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/for-ai/parameter-efficient-moe) [Pushing Mixture of Experts to the Limit: Extremely Parameter Efficient MoE for Instruction Tuning](https://github.com/for-ai/parameter-efficient-moe)"

    "The codebase is built on T5X, which defines the model and training loop; Flaxformer, which defines the model computation; Flax, which defines the low level model layers; and Jax, which provides the execution."
    [Paper](https://arxiv.org/pdf/2309.05444.pdf)
    ![image](https://github.com/ianderrington/genai/assets/76016868/ca081309-dca9-4081-a6eb-30d929715ef9)

??? abstract "[Blending Is All You Need: Cheaper, Better Alternative to Trillion-Parameters LLM](https://huggingface.co/ChaiML)"
    [Paper](https://arxiv.org/pdf/2401.02994.pdf)
    The authors demonstrate that selecting parameters from differently trained models at generation can yield significant improvements in performance for lower-sized models.
    Here is the algorithm:
    # Algorithm 1 Blended Algorithm

        1. k ← 1
        2. while true do
        3.     uₖ ← user’s current input turn
        4.     Sample model parameter θₙ ~ Pθ
        5.     Generate response rₖ according to:
        6.         rₖ ~ P(r|u₁:k, r₁:k−1; θₙ)
        7.     k = k + 1
        8. end while
