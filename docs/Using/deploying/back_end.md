# Deploying AI Models: Backend Considerations

Deploying AI models involves a variety of considerations, especially when it comes to backend infrastructure. The backend is the engine that powers your AI application, handling the complex computations and data processing that your models require. When setting up your backend, you need to consider factors such as latency, model availability, and compute resources. 

- **Latency**: This refers to the delay between a user's action and the system's response. In AI applications, low latency is crucial for a smooth user experience. 

- **Model Performance**: Your AI model should be readily available to process requests to the quality needed by your end user. If it doesn't give sufficiently reopted. asonable results, then it will not be ad

- **Compute Resources**: AI models, especially large ones, require significant computational resources. You need to ensure that your backend has enough processing power and memory to handle your model's requirements. 

For more information on compute resources, refer to our [computation guide](computation.md).

## Libraries for Backend Deployment

There are several libraries available that can help you deploy your AI models on the backend. These libraries provide tools and functionalities that simplify the process of setting up and managing your backend infrastructure.

- [FlexFlow](https://github.com/flexflow/FlexFlow): A low-latency, high-performance LLM serving library.

- [llm](https://github.com/simonw/llm): A CLI utility and Python library for interacting with Large Language Models, including OpenAI, PaLM, and local models installed on your own machine.

- [vLLM](https://vllm.ai/): This library utilizes PagedAttention to manage attention keys/values, enabling 24x throughput than other transformers without architecture changes.

- [Text Generation Inference](https://github.com/Preemo-Inc/text-generation-inference): An open-sourced implementation forked from HF. It is a Rust, Python, and gRPC server for text generation inference.

- [Lit-Gpt](https://github.com/Lightning-AI/lit-gpt#setup): A hackable implementation of state-of-the-art open-source large language models.

- [Torch Serve](https://pytorch.org/serve/large_model_inference.html): This library enables efficient serving of PyTorch models.

- [Triton Inference Server](https://github.com/triton-inference-server/server): Part of NVIDIA AI Inference, this server provides a robust solution for deploying AI models.

- [litellm by BerriAI](https://github.com/BerriAI/litellm/blob/main/cookbook/proxy-server/readme.md): This library provides code to enable deployments on railway.app.

## Platforms for Backend Deployment

Several platforms provide infrastructure and services that can help you deploy your AI models on the backend.

- [Azure-Chat-GPT](https://github.com/davidxw/azurechatgpt): This platform allows you to run GPT on Azure services.

- [Amazon Sagemaker](https://aws.amazon.com/sagemaker/): Part of the AWS suite, Sagemaker allows for streamlined running of AI models in various manners.

- [Lamini](https://www.lamini.ai/): This platform provides tools and services to help you build your AI applications.

## Tutorials

For more hands-on guidance, you can refer to the following tutorials:

- [GCP Tutorial](https://towardsdatascience.com/how-to-deploy-large-size-deep-learning-models-into-production-66b851d17f33): This tutorial provides a step-by-step guide on how to deploy large-size deep learning models into production using Google Cloud Platform.