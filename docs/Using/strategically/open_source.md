!!! quote "Open source is eating the world"

While a bit hyperbolic, the power open source is hard to disregard. Enabling effective complexity to built into and between companies, it provides a legal framework that has accelerated the evolution of software and opened it up for many to use.

Within AI, there is no exception, and it is potentially even more powerful. In discussions of a widely circulated memo that left Google, they describe how [Open-source will reduce the moats](https://simonwillison.net/2023/May/4/no-moat/()) when it comes to AI.

As such, we emphasize the nature of this project is to interact and connect with open-source as effectively as possible, while relying on enabling the open-source community to create more effectively.

!!! important "What is open source AI?"
    According to the [Open Source Initiative](https://opensource.org/deepdive/drafts/the-open-source-ai-definition-draft-v-0-0-5#:~:text=To%20be%20Open%20Source%2C%20an,including%20to%20change%20its%20output.), to be Open Source, an AI system needs to be available under legal terms that grant the freedoms to:
    
    * Use the system for any purpose and without having to ask for permission.
    * Study how the system works and inspect its components.
    * Modify the system for any purpose, including to change its output.
    * Share the system for others to use with or without modifications, for any purpose.

## The Open-Weight Landscape

Almost none of the major "open" model families actually meet the OSI definition above. What's really on offer, in nearly every case, is **open weights**: you can download, run, and fine-tune the model, but the training data and the exact training process usually stay closed. That distinction matters more than the marketing language suggests, and it's worth knowing which license each family actually ships under before building on it.

| Family | Maker | License | Notes |
|---|---|---|---|
| **Llama 4** (Scout, Maverick) | Meta | Llama 4 Community License | Open weights, not OSI open source. A 700M-monthly-active-user cap requires a separate license from Meta above that threshold, and EU-domiciled users/companies are currently excluded from using or distributing the models. |
| **Mistral 3**, Mixtral, Codestral | Mistral AI | Apache 2.0 | The most permissive of the major families. Genuinely unrestricted for commercial self-hosting, with no user-count or revenue caps. |
| **Qwen3** | Alibaba | Split: Apache 2.0 for the smaller dense models, a custom license for the largest MoE flagship | The custom license on the flagship model gates specific high-revenue use cases (AI coding/office-assistant products above defined revenue thresholds need a separate license). The smaller models stay fully Apache 2.0. |
| **DeepSeek V3 / R1** | DeepSeek | MIT | The most permissive license of any frontier-capable family, with no usage caps and no revenue gates. DeepSeek V3's base-model training cost was reported around \$5.6M. R1's own reasoning-specific RL training run was separately reported around \$294K, a figure that describes only the incremental reasoning stage, not the full cost of building the model, since R1 needs V3 as a starting point. Treat the smaller number as a components cost, not the model's total cost. |

## Choosing Between Them

None of this means "open beats closed" or the reverse. The real trade-off is narrower than it sounds:

- **If self-hosting is the goal and licensing simplicity matters most**, Mistral's Apache 2.0 models and DeepSeek's MIT-licensed models carry the least legal overhead.
- **If you're building a product with real revenue at meaningful scale**, check each family's specific caps directly. Llama 4's user-count cap and Qwen3's revenue-gated carve-outs are the kind of detail that only bites once you've already built on the model.
- **Open weights still means someone else trained it.** You get to inspect and fine-tune the model, not audit the training data or reproduce the training run. Treat "open" as a spectrum, not a binary, when deciding how much to trust a given model for a given use case.
