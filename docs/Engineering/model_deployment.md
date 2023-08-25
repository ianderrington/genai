The deployment of models enables callers, people, or other software, to use them. While deployment may initially consist of only 'making a model available for calling'. 

Because the model may be one limiting- consider the deployment of the model to be separate from the deployment of the model's encapsulating project, though they are directly connected.  

There are many component touchpoints along the way, and more so for customers that have higher requirements.

Quickly, models of the desired specs must be stored in a file and then loaded for serving. Serving as user inputs that are routed to the served model, optionally batched to improve average request latency, and outputs returned routed appropriately to users. 

As would be done for other AI-enabled products, you will need to have in mind the following

1. [Caller needs](#caller-needs) (customer requirements)
2. [Servable model](#servable-model) to appropriately service customer and environmental requirements.
3. [Compute needed](#compute-needs) to enable service
4. [Budget available](#budget-available) the compute
5. [Compute back end](#compute-back-end) service or framework that will work with the budget
7. [Front End](./front_end) that provides the appropriate visualization

Keep in mind the needs will change as the understanding of all of the answers above shifts. Still, it is important to get _something_ that you can iterate from, particularly if your solution involves some form of a [data flywheel](https://brightdata.com/blog/brightdata-in-practice/using-data-flywheel-to-scale-your-business).

###  Caller needs

What the caller requires will depend on the target audience your offering is provided. Focusing on narrower audiences allow you to have fewer (initial) requirements and may enable MVP generation quickly. These audiences can expand or shift as needed. Often needs will require 'rapid' results that are 'good'. 

### Servable model

The models must be sufficient to provide the content that the model have a sufficiently reasonable latency that it can enable the throughput requirements of your model. 

To enable a properly servable model, it may likely be required to [optimize](./../Understanding/models/call_optimization.md) the serving of your models.

### Compute needs

Here are some general considerations (from AWS) regarding how to consider the requirements of model deployment.

![image](https://github.com/ianderrington/genai/assets/76016868/9b379996-e311-4b9b-a35e-9020702fa050)
    https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html

### Budget available

Your calculated budget will be useful to consider the monetization strategy of your tool. While highly dependant on your business model, knowing when to inspire greater [model serving optimization](../Understanding/models/call_optimization.md) to prevent 'too much compute'. 

### Compute back-end

Part of determining your back-end will involve selecting the [frameworks and tools](./frameworks_and_tools.md) that you use. 

!!! tip [GCP Tutorial](https://towardsdatascience.com/how-to-deploy-large-size-deep-learning-models-into-production-66b851d17f33)

??? code "[vLLM](https://vllm.ai/) utilizes **PagedAttention** to manage attention keys/values to enable 24x throughput than other transformers w/out architecture changes"

    "PagedAttention allows storing continuous keys and values in non-contiguous memory space. Specifically, PagedAttention partitions the KV cache of each sequence into blocks, each block containing the keys and values for a fixed number of tokens. During the attention computation, the PagedAttention kernel identifies and fetches these blocks efficiently."
    ![Paged Attention](https://vllm.ai/assets/figures/annimation0.gif)
    [Github](https://github.com/vllm-project/vllm)

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

!!! code "[FlexFlow](https://github.com/flexflow/FlexFlow) Low-Latency, High-Performance LLM Serving"
    Check this out!    

### Front end

At the end of a model that is ready to be deployed, you'll need to get the results to the end-user in a useful manner. Look into the discussion on [front ends](./front_end.md) for some quality solutions and best practices to for your model output.

### Overview Literature

- [Neptune-nlp-models-infrastructure](https://neptune.ai/blog/nlp-models-infrastructure-cost-optimization#:~:text=Use%20a%20lightweight%20deployment%20framework,serve%20predictions%20over%20a%20network.)

- [How to Deploy Large Size Deep Learning Models Into Production](https://towardsdatascience.com/how-to-deploy-large-size-deep-learning-models-into-production-66b851d17f33)

