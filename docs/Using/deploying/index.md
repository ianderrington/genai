Deploying models allows callers, people or other applications, to utilize them. It initially involves making the model accessible for calling. However, it's essential to look at the deployment of the model separately from the deployment of the model's encapsulating project, even though the two are closely related. 

There can be multiple components involved, especially for clients with higher requirements. The desired models should be stored in a file and then made available for service. Users' input is directed to the hosted model, optionally batched to enhance average request latency, and the results are returned and appropriately redirected to the users. 

When developing AI-enabled products, consider the following components:

### 1. [Customer Needs](#caller-needs)

The client's necessities are determined by the specific target audience you're catering to. Concentrating on a smaller audience helps to minimize initial requirements and might assist in the quick creation of a minimum viable product (MVP). The needs of the audience can be expanded or altered as required. Typically, the requirements demand quick and satisfactory results.

### 2. [Servable Model](#servable-model)

The models must be capable of delivering the required content with an acceptable latency to meet your model's marketing requirements.

To create a serviceable model, you may need to [optimize](../../Understanding/architectures/optimization.md) your models' serving.

### [Compute Requirements](#compute-needs)

Consider these general factors (as suggested by AWS) when assessing the requirements for model deployment.

![image](https://github.com/ianderrington/genai/assets/76016868/9b379996-e311-4b9b-a35e-9020702fa050.png)

### [Budget Constraints](#budget-available)

The allocated budget will affect your tool's monetization strategy. Highly dependent on your business model, it is crucial to optimize [model serving](../../Understanding/architectures/optimization.md) to avoid excessive computing needs.

### [Back-end Computing](#compute-back-end)

Choosing your back-end will involve deciding between do-it-yourself and fully serviced [frameworks](./frameworks.md) on some computing host solution. You may also need additional [tools and libraries](libraries_and_tools.md) for your solution.

### [Front-end Interface](./front_end.md)

Finally, you'll need to present the results to the end-user effectively. Look into our discussion on [front ends](./front_end.md) for best practices and excellent solutions for your model output.

Remember that needs will evolve as your understanding of all the above factors shifts. So it's crucial to start with a base that you can iterate from, especially if your solution involves a [data flywheel](https://brightdata.com/blog/brightdata-in-practice/using-data-flywheel-to-scale-your-business).

## Useful Tips 

??? tip "[State of GPT by Andrej Karpathy](https://build.microsoft.com/en-US/sessions/db3f4859-cd30-4445-a0cd-553c3304f8e2) A comprehensive presentation on the general state of Generative AI made possible by GPT."

    <img width="925" alt="image" src="https://github.com/ianderrington/general/assets/76016868/de2d3b33-9e79-407d-b3c7-5b795f330722" loading="lazy">
    <img width="918" alt="image" src="https://github.com/ianderrington/general/assets/76016868/0ecb56de-966a-40c5-8d14-1df3b4a5a89f">
    <img width="282" alt="image" src="https://github.com/ianderrington/general/assets/76016868/7cea8be4-26dd-46c3-9001-fcf625e5975d">
    <img width="918" alt="image" src="https://github.com/ianderrington/general/assets/76016868/a32295bd-9d88-4b31-bd10-134e11e6c546">
    <img width="886" alt="image" src="https://github.com/ianderrington/general/assets/76016868/7b1c6c4b-3778-4536-8d10-03696f3624c5">

## Reference Materials

??? tip "[Emerging Architectures for LLM Applications](https://a16z.com/2023/06/20/emerging-architectures-for-llm-applications/) A detailed discussion of the components and their interactions using orchestration systems."

    ![image](https://github.com/ianderrington/genai/assets/76016868/f287eaef-6b86-4846-8885-2b3ad3cd614b) [^n1]

??? tip "[Challenges and Applications of Large Language Models Kaddour et al](https://arxiv.org/abs/2307.10169) This is a well-done and comprehensive review."

## Additional Literature

Here are some other overviews to assist you in understanding the practical aspects of Generative AI, particularly with regards to GPT and large language models.

- [Neptune-nlp-models-infrastructure](https://neptune.ai/blog/nlp-models-infrastructure-cost-optimization#:~:text=Use%20a%20lightweight%20deployment%20framework,serve%20predictions%20over%20a%20network.)
- [How to Deploy Large Size Deep Learning Models Into Production](https://towardsdatascience.com/how-to-deploy-large-size-deep-learning-models-into-production-66b851d17f33)