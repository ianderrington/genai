
## Operational Toolkits for LLMops
- ‼️[Hugging Face Transformers](https://huggingface.co/transformers/v4.0.1/index.html)
- ‼️[Adapters for Hugging Face](https://adapterhub.ml/)
- ‼️[Open LLM](https://github.com/bentoml/OpenLLM)



- [Chatall](https://github.com/sunner/ChatALL) To interact with multiple chatbots at the same time.
- ‼️ [LocalAI](https://github.com/go-skynet/LocalAI) drop-in replacement REST API that’s compatible with OpenAI API specifications for local inferencing.

### Llama

Llama is Meta's now open-source model. Llama 2 is MIT and free for commercial use. 

- [Ollama.ai](https://ollama.ai/) A very nice command-line wrapper for running Llama models on your computer. 
- [Llama from Meta](https://ai.meta.com/llama/) Direct from the source 
- [For Llama](https://github.com/Lightning-AI/lit-llama)
- [MedAlpaca](https://github.com/kbressem/medAlpaca)

- [Llama-2 on a CPU](https://towardsdatascience.com/running-llama-2-on-cpu-inference-for-document-q-a-3d636037a3d8) and [Github](https://github.com/kennethleungty/Llama-2-Open-Source-LLM-CPU-Inference)

## Python Tools

<div class="result" markdown>
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
