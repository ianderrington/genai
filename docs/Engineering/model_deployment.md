![image](https://github.com/ianderrington/genai/assets/76016868/9b379996-e311-4b9b-a35e-9020702fa050)
    https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html

## Back-End (Model serving)



??? code "[vLLM](https://vllm.ai/) utilizes **PagedAttention** to manage attention keys/values to enable 24x throughput than other transformers w/out architecture changes"

    "PagedAttention allows storing continuous keys and values in non-contiguous memory space. Specifically, PagedAttention partitions the KV cache of each sequence into blocks, each block containing the keys and values for a fixed number of tokens. During the attention computation, the PagedAttention kernel identifies and fetches these blocks efficiently."
    ![Paged Attention](https://vllm.ai/assets/figures/annimation0.gif)

!!! tip [GCP Tutorial](https://towardsdatascience.com/how-to-deploy-large-size-deep-learning-models-into-production-66b851d17f33)

??? tip "[Text Generation Inference](https://github.com/Preemo-Inc/text-generation-inference) an open-sourced implementation forked from HF"

    "A Rust, Python and gRPC server for text generation inference. Used in production at HuggingFace to power LLMs api-inference widgets."    
    ![image](https://github.com/ianderrington/genai/assets/76016868/a3f5ddbf-a2e3-45ae-bca4-200c07c9dd91)

!!! tip "[Lit-Gpt](https://github.com/Lightning-AI/lit-gpt#setup) Hackable implementation of state-of-the-art open-source large language models released under the Apache 2.0 license."

!!! tip "[Azure-Chat-GPT](https://github.com/davidxw/azurechatgpt) to run GPT on Azure services"

!!! code "[Torch Serve](https://pytorch.org/serve/large_model_inference.html) enable efficient serving.

??? tip "[Triton Inference Server](https://github.com/triton-inference-server/server) Part of NVIDIA AI Inference" 
    [Tutorial](https://github.com/triton-inference-server/server)

!!! code "[litellm by BerriAI](https://github.com/BerriAI/litellm/blob/main/cookbook/proxy-server/readme.md) provides code to enable railways deployed on railway.app"

!!! website "[Railway.app](https://railway.app/about)

### Tutorials
- [How to Deploy Large Size Deep Learning Models Into Production](https://towardsdatascience.com/how-to-deploy-large-size-deep-learning-models-into-production-66b851d17f33)





## Overview Lit

- [Neptune-nlp-models-infrastructure](https://neptune.ai/blog/nlp-models-infrastructure-cost-optimization#:~:text=Use%20a%20lightweight%20deployment%20framework,serve%20predictions%20over%20a%20network.)



The deployment of models enables callers, people or other software, to use them. While deployment may initially consist of only 'making a model available for calling'. 

Because the model may be one limiting- consider the deployment of the model to be separate from the deployment of the model's encapsulating project, though they are directly connected.  

There are many component touchpoints along the way, and more so for customers that have higher requirements.

Quickly, models of the desired specs must be stored in a file and then loaded for serving. Serving as user inputs that are routed to the served model, optionally batched to improve average request latency, and outputs returned routed appropriately to users. 

As would be done for other AI-enalbed products, you will need to have in mind the following

1. Caller needs (customer requirements)
2. Servable model to appropriately service customer and environmental requirements.
3. Compute needed to enable service
4. Budget needed to fund compute
5. Compute Host that will work with the budget
6. Visualization needs of the customer
7. GUI Framework, and visualization service

Keep in mind the needs will change as the understanding of all of the answers above shifts. Still, it is important to get _something_ that you can iterate from, particularly if your solution involves a data flywheel (which it should!).

##  Caller needs
What the caller requires will depend on the target audience your offering is provided. Focusing on narrower audiences allow you to have fewer (initial) requirements and may enable MVP generation quickly. These audiences can expand or shift as needed. Often needs will require 'rapid' results that are 'good'. 

## Servable model
The models must be sufficient to provide the content that the 
< common requirements for servable models>
<other important topics and sub-bullets

