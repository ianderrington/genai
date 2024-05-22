# Deploying Libraries and Tools

This document provides an overview of various libraries and tools that can be used for deploying AI models. It is divided into several sections, each focusing on a specific aspect of deployment. The sections include LLM Ops, Models, Finetuning, Serving, Programming Convenience, Memory Interaction, Executors and Interpreters, Data Creation, and General.

## LLM Ops

LLM Ops refers to operations related to Large Language Models. Here are a couple of tools that can assist in managing these operations:

- [LLM Ops](https://github.com/microsoft/lmops): This is a Microsoft tool for managing large language models.
- [Reliable GPT](https://github.com/BerriAI/reliableGPT): This is a wrapper that prevents failures due to rate limiting requests.

## Models

This section provides a selection of repositories that enable the creation of models:

- [Hugging Face Transformers](https://huggingface.co/transformers/v4.0.1/index.html): This is a popular library for creating transformer models.

- [Chatall](https://github.com/sunner/ChatALL): This tool allows interaction with multiple chatbots at the same time.
- [LocalAI](https://github.com/go-skynet/LocalAI): This is a drop-in replacement REST API that’s compatible with OpenAI API specifications for local inferencing.

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/OpenBMB/ToolBench) 'This project (ToolLLM) [Tool Bench](https://github.com/OpenBMB/ToolBench) 'This project (ToolLLM) aims to construct open-source, large-scale, high-quality instruction tuning SFT data to facilitate the construction of powerful LLMs with general tool-use capability.'"

    ![image](https://github.com/OpenBMB/ToolBench/blob/master/assets/overview.png)


## Chat with Memory

??? abstract "[Anything LLM](https://github.com/Mintplex-Labs/anything-llm?tab=readme-ov-fileI) is a full-stack application that enables you to turn any document, resource, or piece of content into context that any LLM can use as references during chatting."
    This application allows you to pick and choose which LLM or Vector Database you want to use as well as supporting multi-user management and permissions.

??? abstract "[MemGPT](https://github.com/cpacker/MemGPT)  allows you to build LLM agents with self-editing memory"

### Serving

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/bentoml/OpenLLM) [Open LLM](https://github.com/bentoml/OpenLLM) to run inference with any open-source large-language models, deploy to the cloud or on-premises, and build powerful AI apps."

#### Distributed

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/bigscience-workshop/petals) [Petals](https://github.com/bigscience-workshop/petals) Run large language models at home, BitTorrent-style."

    Generate text with distributed LLaMA 2 (70B), Stable Beluga 2, Guanaco-65B or BLOOM-176B and fine‑tune them for your own tasks — right from your desktop computer or Google Cola
    [Launch your own swarm](https://github.com/bigscience-workshop/petals/wiki/Launch-your-own-swarm)

### Programming Convenience

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/jackmpcollins/magentic) [Magentic](https://github.com/jackmpcollins/magentic) for decorators"
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




!!! tip "![GitHub Repo stars](https://badgen.net/github/stars/ruoccofabrizio/azure-open-ai-embeddings-qna) [Deploying on Azure for Embeddings](https://github.com/ruoccofabrizio/azure-open-ai-embeddings-qna)"

!!! tip "[Integrating with Azure Services](https://www.youtube.com/watch?v=tW2EA4aZ_YQ)"
