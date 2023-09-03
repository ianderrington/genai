
## LLM Ops

- [LLM Ops](https://github.com/microsoft/lmops)
- [Reliable GPT](https://github.com/BerriAI/reliableGPT) A wrapper that prevents failures due to rate limiting requests. 

## Models

Here we share a selection of repositories, that enable the creation of models.

- [Hugging Face Transformers](https://huggingface.co/transformers/v4.0.1/index.html)

### Finetuning

Please see the [finetuning](../../Understanding/models/finetuning.md) page for more in depth information on this. 

- [Adapters for Hugging Face](https://adapterhub.ml/)
- [Chatall](https://github.com/sunner/ChatALL) To interact with multiple chatbots at the same time.
- [LocalAI](https://github.com/go-skynet/LocalAI) drop-in replacement REST API that’s compatible with OpenAI API specifications for local inferencing.

??? code "[Tool Bench](https://github.com/OpenBMB/ToolBench) 'This project (ToolLLM) aims to construct open-source, large-scale, high-quality instruction tuning SFT data to facilitate the construction of powerful LLMs with general tool-use capability.'"

    ![image](https://github.com/OpenBMB/ToolBench/blob/master/assets/overview.png)

### Serving
!!! code "[Open LLM](https://github.com/bentoml/OpenLLM) to run inference with any open-source large-language models, deploy to the cloud or on-premises, and build powerful AI apps."

#### Distributed

!!! "[Petals](https://github.com/bigscience-workshop/petals) Run large language models at home, BitTorrent-style."

    Generate text with distributed LLaMA 2 (70B), Stable Beluga 2, Guanaco-65B or BLOOM-176B and fine‑tune them for your own tasks — right from your desktop computer or Google Cola
    [Launch your own swarm](https://github.com/bigscience-workshop/petals/wiki/Launch-your-own-swarm)

### Programming Convenience

!!! tip "[Magentic](https://github.com/jackmpcollins/magentic)
    A nice and simple plugin that allows a `@prompt` decorator to call functions as an llm, including function-choice calls.

??? example "[their example](https://github.com/jackmpcollins/magentic)
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

- [Deploying on Azure for Embeddings](https://github.com/ruoccofabrizio/azure-open-ai-embeddings-qna)
- [Integrating with Azure Services](https://www.youtube.com/watch?v=tW2EA4aZ_YQ)


!!! tip "[EmbedChain](https://github.com/embedchain/embedchain)"
    "Embedchain is a framework to easily create LLM powered bots over any dataset." OpenAI and Llama2 so far.

??? example
    ```python
        import os

        from embedchain import Llama2App
        
        os.environ['REPLICATE_API_TOKEN'] = "REPLICATE API TOKEN"
        
        zuck_bot = Llama2App()
        
        # Embed your data
        zuck_bot.add("youtube_video", "https://www.youtube.com/watch?v=Ff4fRgnuFgQ")
        zuck_bot.add("web_page", "https://en.wikipedia.org/wiki/Mark_Zuckerberg")
        
        # Nice, your bot is ready now. Start asking questions to your bot.
        zuck_bot.query("Who is Mark Zuckerberg?")
        # Answer: Mark Zuckerberg is an American internet entrepreneur and business magnate. He is the co-founder and CEO of Facebook. 
    ```

!!! code "[GPTCache](https://github.com/zilliztech/GPTCache) to quickly Cache your results to speed second-time queries."

###  Executors and Interpeters

Executors are programming levels of abstraction that encourage the execution of any tools or intractions with internal and external memories and states. 

Interpreters are executors that facilitate model computation by parsing, formatting, or otherwise preparing the data for effective use. They can also be used to interpret output to perform routing of actions. 

Such efforts can be used to reduce input complexity, token-count, to detect potentially unreasonable inputs or outputs. These interpreters _may_ be agents or models themselves, thought that is not required. 

!!! example "Link Routing"
    A model may not be guaranteed to produce equivalent output based on a complex input string such as an html address. Consequently, pre-parsing the output and substituting a simple name for an address, such as 'html_1', and then re-introducing that within any output, both using RegEx, may enable more effective output. 

- [Guardrails](https://shreyar.github.io/guardrails/) To help format output and prevent improper prompts.

- [Semantic Kernel](https://github.com/microsoft/semantic-kernel/blob/main/samples/notebooks/python/00-getting-started.ipynb), [Github](https://github.com/microsoft/semantic-kernel/tree/main)

- ️[Guidance](https://github.com/microsoft/guidance/) Interleaving generation, prompting and logical control to single  continuous flow.



## Data Creation

Generative AI is a splendid use-case for creating data that can be used to train or refine new models. Here are some tools that allow for creation of data for down-stream purposes, always being sure to be consistent with [dual-use concerns](../../Understanding/overview/challenges.md#dual-use).

!!! code "[AutoLabel](https://github.com/refuel-ai/autolabel) A nice pythonic system for generating semantic labels repeatedly for use in downstream datasets"

!!! code "[Kor](https://github.com/eyurtsev/kor) For extracting structured data using LLMs."

## General

### Network Visualization

Being able to see the 'structure' of some neural networks make it easier to understand, and more aesthetic.  Please see
[PlotNeuralNet](https://github.com/HarisIqbal88/PlotNeuralNet) and a nice [writeup](https://pub.towardsai.net/creating-stunning-neural-network-visualizations-with-chatgpt-and-plotneuralnet-adab37589e5) on how to use it. 