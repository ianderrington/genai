## Regulatory Challenges

### Copywrites

[A thorough discussion on copyright issues](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4523551)


## Technical Challenges
!!! [Open challenges in LLM research](LLMhttps://huyenchip.com/2023/08/16/llm-research-open-challenges.html#5_design_a_new_model_architecture)
Challenges associated with GenAI.

    ```markdown

    1. Reduce and measure hallucinations
    2. Optimize context length and context construction
    3. Incorporate other data modalities
    4. Make LLMs faster and cheaper
    5. Design a new model architecture
    6. Develop GPU alternatives
    7. Make agents usable
    8. Improve learning from human preference
    9. Improve the efficiency of the chat interface
    10. Build LLMs for non-English languages

    ```
    

### Unintentional

### Hallucinations

## Intentional

### Dual Use


## 

Apart from [ethical considerations](../../Using/ethically/index.md), there are general challenges associated with the technology.

Importantly, applications that rely on the output of these models may have challenges due to

1. The stochastic nature of the output
1. Changes in the output over time for models that are non-static. See, for instance [ChatGPT's behavior changing over time](https://arxiv.org/abs/2307.09009)
1. The technical difficulties associated with training such mdoels.
1. The quality of the input data.

While some of these all of these challenges can be mitigated through better engineering.

1. Better methods and reduce temperature:
1. Freeze models. Use Have continuous monitoring of models, and use pLLM-observability tools]
