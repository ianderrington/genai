- [Langchain](#langchain) is a early system that has stellar success with a principled design allowing for extensive applications to built on top of it. 
- [Llama Ecosystem](#llama-ecosystem) is a a community of Llama-focused modelers, based on the Meta model called Llama, Llama-2 and beyond. 
- [A number of others](#others).

## Frameworks and Tools

The excitement about the tooling around Generative AI make it hard to keep up with development and deprecation of powerful frameworks and tools. Some of the mentioned references may not be fully completed, or even nascent repos to build their intended purposes (described here). Please let us know if we are missing anything [here](../../Managen.ai/contributing.md). 

Starting with base programming languages, increasingly higher level frameworks enable training and calling of AI models. Higher level orchestration libraries and platforms allow creating and evaluating chains, agents, and systems that sometimmes use visual-interfaces. These can be often augmented with various tools/packages/repositories. On top of these involve mostly or all-complete frameworks and platforms that enable nearly complete. 

### Base languages
Prominent languages include [python](https://www.python.org), [C++/CUDA](https://en.wikipedia.org/wiki/CUDA), and [Javascript](https://www.javascript.com). Because of its popularity, we will be python-focused in this project.

### AI-level software libraries

- [PyTorch](https://pytorch.org/) a popular python-focused system for creating and using AI.
- [Tensorflow](https://tensorflow.org) a popular multi-language eco-system for creating and using AI.
- [spAcy](https://spacy.io/) is a library for advanced Natural Language Processing in Python and Cython.

### Orchestration-Level software libraries

Handling the inputs/outputs to GenAI in a consistent and reliable manner has spurred the creation of software libraries that can work with GenAI that is called as a service, or hosted locally.

#### LangChain
[Langchain](https://python.langchain.com/en/latest/#) Is a primitive python or javascript-based primitive 'LLM' language that enables planned and agentic AI.

##### Going deeper
- [Awesome Langchain](https://github.com/kyrolabs/awesome-langchain)
- [Toolkit](https://www.toolkit.club/) Generates LangChain plugins
- [Langflow](https://github.com/logspace-ai/langflow) 

**Tutorials:**

- https://www.pinecone.io/learn/langchain-prompt-templates/
- https://learn.deeplearning.ai/langchain/lesson/3/memory

#### Llama ecosystem

[Llama](https://ai.meta.com/llama/) is a library and set of models that has an expanding community due to the generally open-source nature of high-quality Llama 2 model. 

- [Lit-Llama](https://github.com/Lightning-AI/lit-llama)
- [MedAlpaca](https://github.com/kbressem/medAlpaca)
- [Llama-2 on a CPU](https://towardsdatascience.com/running-llama-2-on-cpu-inference-for-document-q-a-3d636037a3d8) and [Github](https://github.com/kennethleungty/Llama-2-Open-Source-LLM-CPU-Inference)
- [GPT LLM Training](https://github.com/mshumer/gpt-llm-trainer) Generates and trains fine-tuned LLAMA-2 LLMs for specific tasks. 
- [llama index](https://www.llamaindex.ai/) and [Github](https://github.com/jerryjliu/llama_index) for integrating data ingestion and models. 
- [LlamaHub (community library of data loaders)](https://llamahub.ai)
- [LlamaLab (cutting-edge AGI projects using LlamaIndex)](https://github.com/run-llama/llama-lab)
- [Ollama.ai](https://olama.ai) Provides on mac silicon Llama2 calling. Has a great idea that resembles docker files for agent creation and pulling.
- [Running Llama 2 and other Open-Source LLMs on CPU Inference Locally for Document Q&A](https://github.com/kennethleungty/Llama-2-Open-Source-LLM-CPU-Inference)

#### Others

??? tip "[txtai](https://github.com/neuml/txtai) 'is an all-in-one embeddings database for semantic search, LLM orchestration and language model workflows."

    ![image](https://raw.githubusercontent.com/neuml/txtai/master/docs/images/architecture.png#gh-light-mode-only)

- [Flowise](https://github.com/FlowiseAI/Flowise)
- [Chain Forge](https://github.com/ianarawjo/ChainForge) A data flow prompt engineering environment for evaluating ana analyzing LLM responses
- [llm-chain](https://docs.llm-chain.xyz/docs/introduction) ChatGPT and Alpaca support. Agentic with bash commands.
- [Agent Flow](https://github.com/simonmesmith/agentflow)
- [Auto Chain](https://github.com/Forethought-Technologies/AutoChain)
- [Chatall](https://github.com/sunner/ChatALL) To interact with multiple chatbots at the same time.
- [LocalAI](https://github.com/go-skynet/LocalAI) drop-in replacement REST API that’s compatible with OpenAI API specifications for local inferencing.



  
### Training, Tuning and Deployment

??? code "[Tool Bench](https://github.com/OpenBMB/ToolBench) 'This project (ToolLLM) aims to construct open-source, large-scale, high-quality instruction tuning SFT data to facilitate the construction of powerful LLMs with general tool-use capability.'"

    ![image](https://github.com/OpenBMB/ToolBench/blob/master/assets/overview.png)


### Models
- [Hugging Face Transformers](https://huggingface.co/transformers/v4.0.1/index.html)
- [Adapters for Hugging Face](https://adapterhub.ml/)
- [Open LLM](https://github.com/bentoml/OpenLLM)


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

### Distributing Methods

!!! "[Petals](https://github.com/bigscience-workshop/petals) Run large language models at home, BitTorrent-style."

    Generate text with distributed LLaMA 2 (70B), Stable Beluga 2, Guanaco-65B or BLOOM-176B and fine‑tune them for your own tasks — right from your desktop computer or Google Cola
    [Launch your own swarm](https://github.com/bigscience-workshop/petals/wiki/Launch-your-own-swarm)

### Miscellanous Tooling

#### Convenience libraries

??? tip "[Magentic](https://github.com/jackmpcollins/magentic)  allows a `@prompt` decorator to call functions as an llm, including function-choice calls"
    
    Includes function-choice calls
    
    [Their example](https://github.com/jackmpcollins/magentic)
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
- [Kor](https://github.com/eyurtsev/kor) For extracting structured data using LLMs.



## Visualization

Being able to see the 'structure' of some neural networks make it easier to understand, and more aesthetic.  Please see
[PlotNeuralNet](https://github.com/HarisIqbal88/PlotNeuralNet) and a nice [writeup](https://pub.towardsai.net/creating-stunning-neural-network-visualizations-with-chatgpt-and-plotneuralnet-adab37589e5) on how to use it. 



