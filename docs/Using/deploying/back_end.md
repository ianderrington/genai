## Libraries

!!! code "[FlexFlow](https://github.com/flexflow/FlexFlow) Low-Latency, High-Performance LLM Serving"
    Check this out!   

!!! code "[llm](https://github.com/simonw/llm) A CLI utility and Python library for interacting with Large Language Models, including OpenAI, PaLM and local models installed on your own machine."


??? code "[vLLM](https://vllm.ai/) utilizes **PagedAttention** to manage attention keys/values to enable 24x throughput than other transformers w/out architecture changes"

    "PagedAttention allows storing continuous keys and values in non-contiguous memory space. Specifically, PagedAttention partitions the KV cache of each sequence into blocks, each block containing the keys and values for a fixed number of tokens. During the attention computation, the PagedAttention kernel identifies and fetches these blocks efficiently."
    ![Paged Attention](https://vllm.ai/assets/figures/annimation0.gif)
    [Github](https://github.com/vllm-project/vllm)

??? code "[Text Generation Inference](https://github.com/Preemo-Inc/text-generation-inference) an open-sourced implementation forked from HF"

    "A Rust, Python and gRPC server for text generation inference. Used in production at HuggingFace to power LLMs api-inference widgets."    
    ![image](https://github.com/ianderrington/genai/assets/76016868/a3f5ddbf-a2e3-45ae-bca4-200c07c9dd91)

!!! code "[Lit-Gpt](https://github.com/Lightning-AI/lit-gpt#setup) Hackable implementation of state-of-the-art open-source large language models released under the Apache 2.0 license."

!!! code "[Torch Serve](https://pytorch.org/serve/large_model_inference.html) enable efficient serving."

??? tip "[Triton Inference Server](https://github.com/triton-inference-server/server) Part of NVIDIA AI Inference" 
    [Tutorial](https://github.com/triton-inference-server/server)

!!! code "[litellm by BerriAI](https://github.com/BerriAI/litellm/blob/main/cookbook/proxy-server/readme.md) provides code to enable railways deployed on railway.app"
    
    [Railway.app](https://railway.app/about)

## Platforms 

!!! code "[Azure-Chat-GPT](https://github.com/davidxw/azurechatgpt) to run GPT on Azure services"

!!! note "[Amazon Sagemaker](https://aws.amazon.com/sagemaker/) and the AWS suite allows for streamlined running of AI models in various manners"


## Tutorials
!!! tip "[GCP Tutorial](https://towardsdatascience.com/how-to-deploy-large-size-deep-learning-models-into-production-66b851d17f33)"
