# Deploying Libraries and Tools

This document provides an overview of various libraries and tools that can be used for deploying AI models. It is divided into several sections, each focusing on a specific aspect of deployment. The sections include LLM Ops, Models, Finetuning, Serving, Programming Convenience, Memory Interaction, Executors and Interpreters, Data Creation, and General.

## LLM Ops

LLM Ops refers to operations related to Large Language Models. Here are a couple of tools that can assist in managing these operations:


- [LLM Ops](https://github.com/microsoft/lmops): This is a Microsoft tool for managing large language models.
- [Reliable GPT](https://github.com/BerriAI/reliableGPT): This is a wrapper that prevents failures due to rate limiting requests.

## Models

This section provides a selection of repositories that enable the creation of models:

- [Hugging Face Transformers](https://huggingface.co/transformers/v4.0.1/index.html): This is a popular library for creating transformer models.

### Finetuning

Finetuning is the process of adapting a pre-trained model to a specific task. For more in-depth information on this, please see the [finetuning](../../Understanding/architectures/finetuning.md) page. Here are some tools for finetuning:

- [Adapters for Hugging Face](https://adapterhub.ml/): This is a tool for finetuning Hugging Face models.
- [Chatall](https://github.com/sunner/ChatALL): This tool allows interaction with multiple chatbots at the same time.
- [LocalAI](https://github.com/go-skynet/LocalAI): This is a drop-in replacement REST API that’s compatible with OpenAI API specifications for local inferencing.

??? code "[Tool Bench](https://github.com/OpenBMB/ToolBench) 'This project (ToolLLM) aims to construct open-source, large-scale, high-quality instruction tuning SFT data to facilitate the construction of powerful LLMs with general tool-use capability.'"

    ![image](https://github.com/OpenBMB/ToolBench/blob/master/assets/overview.png)

### Serving
!!! code "[Open LLM](https://github.com/bentoml/OpenLLM) to run inference with any open-source large-language models, deploy to the cloud or on-premises, and build powerful AI apps."

#### Distributed

??? code "[Petals](https://github.com/bigscience-workshop/petals) Run large language models at home, BitTorrent-style."

    Generate text with distributed LLaMA 2 (70B), Stable Beluga 2, Guanaco-65B or BLOOM-176B and fine‑tune them for your own tasks — right from your desktop computer or Google Cola
    [Launch your own swarm](https://github.com/bigscience-workshop/petals/wiki/Launch-your-own-swarm)

### Programming Convenience

??? code "[Magentic](https://github.com/jackmpcollins/magentic) for decorators"
    A nice and simple plugin that allows a `@prompt` decorator to call functions as an llm, including function-choice calls.
    Their example](https://github.com/jackmpcollins/magentic)
    ```python
    from typing import Literal

    from magentic import prompt, FunctionCall


    def activate_oven(temperature: int, mode: Literal["broil", "bake", "roast"]) -> str:
        """Turn the oven on with the provided settings."""
        return f"Preheating to {temperature} F with mode {mode}"


    @prompt(
        "Prepare the oven so I can make {food}",
        functions=[activate_oven],
    )
    def configure_oven(food: str) -> FunctionCall[str]:
        ...


    output = configure_oven("cookies!")
    # FunctionCall(<function activate_oven at 0x1105a6200>, temperature=350, mode='bake')
    output()
    # 'Preheating to 350 F with mode bake'
    ```



### Memory Interaction

!!! tip "[Deploying on Azure for Embeddings](https://github.com/ruoccofabrizio/azure-open-ai-embeddings-qna)"

!!! tip "[Integrating with Azure Services](https://www.youtube.com/watch?v=tW2EA4aZ_YQ)"

!!! code "[GPTCache](https://github.com/zilliztech/GPTCache) to quickly Cache your results to speed second-time queries."

!!! code "[AGent Smith AI](https://github.com/monarch-initiative/agent-smith-ai) makes it easy to instantiate AI agents that can safely and easily call APIs and locally defined functions to interact with the world."

!!! code "[Monarch Assistant](https://github.com/monarch-initiative/monarch-assistant) Uses AGent Smith for RAG purposes"

!!! code "[Curage GPT](https://github.com/monarch-initiative/curate-gpt)"


###  Executors and Interpeters

Executors are programming levels of abstraction that encourage the execution of any tools or intractions with internal and external memories and states.

Interpreters are executors that facilitate model computation by parsing, formatting, or otherwise preparing the data for effective use. They can also be used to interpret output to perform routing of actions.

Such efforts can be used to reduce input complexity, token-count, to detect potentially unreasonable inputs or outputs. These interpreters _may_ be agents or models themselves, thought that is not required.

!!! example "Link Routing"
    A model may not be guaranteed to produce equivalent output based on a complex input string such as an html address. Consequently, pre-parsing the output and substituting a simple name for an address, such as 'html_1', and then re-introducing that within any output, both using RegEx, may enable more effective output.

!!! code "[Guardrails](https://shreyar.github.io/guardrails/) To help format output and prevent improper prompts."



!!! code "[Semantic Kernel](https://github.com/microsoft/semantic-kernel/tree/main)"
    [Github](https://github.com/microsoft/semantic-kernel/blob/main/samples/notebooks/python/00-getting-started.ipynb),

!!! code "️[Guidance](https://github.com/microsoft/guidance/) Interleaving generation, prompting and logical control to single  continuous flow."


## Data Creation

Generative AI is a splendid use-case for creating data that can be used to train or refine new models. Here are some tools that allow for creation of data for down-stream purposes, always being sure to be consistent with [dual-use concerns](../../Understanding/overview/challenges.md#dual-use).

!!! code "[AutoLabel](https://github.com/refuel-ai/autolabel) A nice pythonic system for generating semantic labels repeatedly for use in downstream datasets"

!!! code "[Kor](https://github.com/eyurtsev/kor) For extracting structured data using LLMs."

## General

