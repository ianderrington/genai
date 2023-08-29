The deployment of models enables callers, people, or other software, to use them. While deployment may initially consist of only 'making a model available for calling'. 

Because the model may be one limiting- consider the deployment of the model to be separate from the deployment of the model's encapsulating project, though they are directly connected.  

There are many component touchpoints along the way, and more so for customers that have higher requirements.

Quickly, models of the desired specs must be stored in a file and then loaded for serving. Serving as user inputs that are routed to the served model, optionally batched to improve average request latency, and outputs returned routed appropriately to users. 

As would be done for other AI-enabled products, you will need to have in mind the following

1. [Caller needs](#caller-needs) (customer requirements)
2. [Servable model](#servable-model) to appropriately service customer and environmental requirements.
3. [Compute needed](#compute-needs) to enable service
4. [Budget available](#budget-available) the compute
5. [Compute back end](#compute-back-end) service and framework that will work with the budget you have
7. [Front End](./front_end) that provides the appropriate visualization

Keep in mind the needs will change as the understanding of all of the answers above shifts. Still, it is important to get _something_ that you can iterate from, particularly if your solution involves some form of a [data flywheel](https://brightdata.com/blog/brightdata-in-practice/using-data-flywheel-to-scale-your-business).

###  Caller needs

What the caller requires will depend on the target audience your offering is provided. Focusing on narrower audiences allow you to have fewer (initial) requirements and may enable MVP generation quickly. These audiences can expand or shift as needed. Often needs will require 'rapid' results that are 'good'. 

### Servable model

The models must be sufficient to provide the content that the model have a sufficiently reasonable latency that it can enable the throughput requirements of your model. 

To enable a properly servable model, it may likely be required to [optimize](../models/call_optimization.md) the serving of your models.

### Compute needs

Here are some general considerations (from AWS) regarding how to consider the requirements of model deployment.

![[image](https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html)](https://github.com/ianderrington/genai/assets/76016868/9b379996-e311-4b9b-a35e-9020702fa050)
    

### Budget available

Your calculated budget will be useful to consider the monetization strategy of your tool. While highly dependant on your business model, knowing when to inspire greater [model serving optimization](../models/call_optimization.md) to prevent 'too much compute'. 

### [Compute back end](back_end.md)

To determining your back-end will involve selecting from both DIY and full-service [frameworks](./frameworks.md) that you use on some compute host solution and perhaps connected with other [tools and libraries](libraries_and_tools.md) that can help your solution. 


### [Front end](front_end.md)

At the end of a model that is ready to be deployed, you'll need to get the results to the end-user in a useful manner. Look into the discussion on [front ends](./front_end.md) for some quality solutions and best practices to for your model output.

## Tips 

??? tip "[State of GPT by Andrej Karpathy](https://build.microsoft.com/en-US/sessions/db3f4859-cd30-4445-a0cd-553c3304f8e2) A stellar presentation to update on the general state of Genai enabled by GPT"

    <img width="925" alt="image" src="https://github.com/ianderrington/general/assets/76016868/de2d3b33-9e79-407d-b3c7-5b795f330722" loading="lazy">
    <img width="918" alt="image" src="https://github.com/ianderrington/general/assets/76016868/0ecb56de-966a-40c5-8d14-1df3b4a5a89f">
    <img width="282" alt="image" src="https://github.com/ianderrington/general/assets/76016868/7cea8be4-26dd-46c3-9001-fcf625e5975d">
    <img width="918" alt="image" src="https://github.com/ianderrington/general/assets/76016868/a32295bd-9d88-4b31-bd10-134e11e6c546">
    <img width="886" alt="image" src="https://github.com/ianderrington/general/assets/76016868/7b1c6c4b-3778-4536-8d10-03696f3624c5">

## References

??? tip "[Emerging Architectures for LLM Applications](https://a16z.com/2023/06/20/emerging-architectures-for-llm-applications/) A very nice discussion of the components and their interactions via orchestration systems."

    ![image](https://github.com/ianderrington/genai/assets/76016868/f287eaef-6b86-4846-8885-2b3ad3cd614b) [^n1]

??? tip "[Challenges and Applications of Large Language Models Kaddour et al](https://arxiv.org/abs/2307.10169) Well done and thorough."

## Overview Literature

Below are some overviews to help with practical aspects of Generative AI, particularly GPT and LLMs.

- [Neptune-nlp-models-infrastructure](https://neptune.ai/blog/nlp-models-infrastructure-cost-optimization#:~:text=Use%20a%20lightweight%20deployment%20framework,serve%20predictions%20over%20a%20network.)

- [How to Deploy Large Size Deep Learning Models Into Production](https://towardsdatascience.com/how-to-deploy-large-size-deep-learning-models-into-production-66b851d17f33)

