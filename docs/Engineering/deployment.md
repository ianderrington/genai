The deployment of models enables people to use them for their intended purpose. There are many component touchpoints along the way, and more so for customers that have higher requirements.

Models of the desired specs must be stored in a file and then loaded for serving. Serving as user inputs that are routed to the served model, optionally batched to improve average request latency, and outputs returned routed appropriately to users. 

Breaking this down, you will need to determine, at least as a first guess, at the following:

1. Customer needs
2. Servable model to appropriately service customer and environmental requirements.
3. Compute needed to enable service
4. Budget needed to fund compute
5. Compute Host that will work with the budget
6. Visualization needs of the customer
7. GUI Framework, and visualization service

Keep in mind the needs will change as the understanding of all of the answers above shifts. Still, it is important to get _something_ that you can iterate from, particularly if your solution involves a data flywheel (which it should!).

##  Customer needs
< common customer needs and themes>
<other important topics and sub-bullets

## Servable model
< common requirements for servable models>
<other important topics and sub-bullets
## ...

![image](https://github.com/ianderrington/genai/assets/76016868/9b379996-e311-4b9b-a35e-9020702fa050)
https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html

## Back-End (Model serving)


### Hosting services
- [GCP Tutorial](https://towardsdatascience.com/how-to-deploy-large-size-deep-learning-models-into-production-66b851d17f33)
- 
??? tip "[Text Generation Inference](https://github.com/Preemo-Inc/text-generation-inference) an open-sourced implementation forked from HF"
    "A Rust, Python and gRPC server for text generation inference. Used in production at HuggingFace to power LLMs api-inference widgets."    
    ![image](https://github.com/ianderrington/genai/assets/76016868/a3f5ddbf-a2e3-45ae-bca4-200c07c9dd91)

!!! tip "[Lit-Gpt](https://github.com/Lightning-AI/lit-gpt#setup) Hackable implementation of state-of-the-art open-source large language models released under the Apache 2.0 license."

!!! tip "[Azure-Chat-GPT](https://github.com/davidxw/azurechatgpt) to run GPT on Azure services"

!!! code "[Torch Serve](https://pytorch.org/serve/large_model_inference.html) enable efficient serving.

??? tip "[Triton Inference Server](https://github.com/triton-inference-server/server) Part of NVIDIA AI Inference" 
    [Tutorial](https://github.com/triton-inference-server/server)

### Tutorials
- [](https://towardsdatascience.com/how-to-deploy-large-size-deep-learning-models-into-production-66b851d17f33)

## Front-End Interfaces
People have to access it to be useful

- [GPT Graph](https://github.com/m-elbably/gpt-graph) Allows for a graphical network representation of chat interactions.

### Open source methods

- [Streamlit](https://blog.streamlit.io/langchain-streamlit/)
- [DemoGPT](https://github.com/melih-unsal/DemoGPT) Connects Langchain and streamlit to create dynamic apps that can be repeatedly used for interacting with Chat- GPTs. 



## Overview Lit

- [Neptune-nlp-models-infrastructure](https://neptune.ai/blog/nlp-models-infrastructure-cost-optimization#:~:text=Use%20a%20lightweight%20deployment%20framework,serve%20predictions%20over%20a%20network.)
