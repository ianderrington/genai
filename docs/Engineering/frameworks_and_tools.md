TODO, split this up in other documents up by what it does, not what it is.

While still evolving there is an increasing number of quality frameworks that are suited to successfully enabling Generative AI applications. 

- [Langchain](#langchain) is a early system that has stellar success with a principled design allowing for extensive applications to built on top of it. 
- [Llama Ecosystem](#llama-ecosystem) is a a community of Llama-focused modelers, based on the Meta model called Llama, Llama-2 and beyond. 
- [A number of others](#others).

## Frameworks and Tools

The excitement about the tooling around Generative AI make it hard to keep up with development and deprecation of powerful frameworks and tools. Some of the mentioned references may not be fully completed, or even nascent repos to build their intended purposes (described here). Please let us know if we are missing anything [here](../Managing/contributing.md). 

### Langchain

- [Langchain](https://python.langchain.com/en/latest/#) A primitive python or javascript-based primitive 'LLM' language that enables planned and agentic AI.
- [Langflow](https://github.com/logspace-ai/langflow) 
- [Awesome Langchain](https://github.com/kyrolabs/awesome-langchain)
- [Toolkit](https://www.toolkit.club/) Generates LangChain plugins

#### Tutorials

- https://www.pinecone.io/learn/langchain-prompt-templates/
- https://learn.deeplearning.ai/langchain/lesson/3/memory

### Llama ecosystem

Llama is Meta's now open-source model. Llama 2 is MIT and free for commercial use. 

- [Llama](https://ai.meta.com/llama/) Direct from the source 
- [Lit-Llama](https://github.com/Lightning-AI/lit-llama)
- [MedAlpaca](https://github.com/kbressem/medAlpaca)
- [Llama-2 on a CPU](https://towardsdatascience.com/running-llama-2-on-cpu-inference-for-document-q-a-3d636037a3d8) and [Github](https://github.com/kennethleungty/Llama-2-Open-Source-LLM-CPU-Inference)
- [GPT LLM Training](https://github.com/mshumer/gpt-llm-trainer) Generates and trains fine-tuned LLAMA-2 LLMs for specific tasks. 
- [llama index](https://www.llamaindex.ai/) and [Github](https://github.com/jerryjliu/llama_index) for integrating data ingestion and models. 
- [LlamaHub (community library of data loaders)](https://llamahub.ai)
- [LlamaLab (cutting-edge AGI projects using LlamaIndex)](https://github.com/run-llama/llama-lab)
- [Ollama.ai](https://olama.ai) Provides on mac silicon Llama2 calling. Has a great idea that resembles docker files for agent creation and pulling.
- [Running Llama 2 and other Open-Source LLMs on CPU Inference Locally for Document Q&A](https://github.com/kennethleungty/Llama-2-Open-Source-LLM-CPU-Inference)
### Others

- [Flowise](https://github.com/FlowiseAI/Flowise)
- [Chain Forge](https://github.com/ianarawjo/ChainForge) A data flow prompt engineering environment for evaluating ana analyzing LLM responses
- [llm-chain](https://docs.llm-chain.xyz/docs/introduction) ChatGPT and Alpaca support. Agentic with bash commands.
- [Agent Flow](https://github.com/simonmesmith/agentflow)
- [Auto Chain](https://github.com/Forethought-Technologies/AutoChain) 

## Tools

### Models
- [Hugging Face Transformers](https://huggingface.co/transformers/v4.0.1/index.html)
- [Adapters for Hugging Face](https://adapterhub.ml/)
- [Open LLM](https://github.com/bentoml/OpenLLM)



- [Chatall](https://github.com/sunner/ChatALL) To interact with multiple chatbots at the same time.
- ‼️ [LocalAI](https://github.com/go-skynet/LocalAI) drop-in replacement REST API that’s compatible with OpenAI API specifications for local inferencing.

### Distributing Methods

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

### Data Creation

- [AutoLabel](https://github.com/refuel-ai/autolabel) A nice pythonic system for generating semantic labels repeatedly for use in downstream datasets

### LLM-enabled data-extraction

- [Kor](https://github.com/eyurtsev/kor) For extracting structured data using LLMs.



## Visualization

Being able to see the 'structure' of some neural networks make it easier to understand, and more aesthetic.  Please see
[PlotNeuralNet](https://github.com/HarisIqbal88/PlotNeuralNet) and a nice [writeup](https://pub.towardsai.net/creating-stunning-neural-network-visualizations-with-chatgpt-and-plotneuralnet-adab37589e5) on how to use it. 

### Memory Interaction


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


