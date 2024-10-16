Generating new data from an input involves selecting the next best token or sets of tokens given an output logit vector.

## Contrastive Decoding

Demonstrates large improvements by using differences between better and worse models shows substantial improvement in generative quality.

**Contrastive inference:**

!!! quote "Any method which controls behavior differential at inference time, directly contrasting outputs from a desirable inference process with outputs from an undesirable inference process. --Sean Obrien"

???+ tip "[Contrastive Decoding Improves Reasoning in Large Language Models](https://arxiv.org/pdf/2309.09117.pdf)"
    <img width="865" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/72f3d72a-eb5d-435f-bfd7-f8be2ae34d07">


??? tip "[Contrastive Decoding: Open-ended Text Generation as Optimization](https://arxiv.org/pdf/2210.15097.pdf)"
    <img width="312" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f53b6aa3-a2d7-40d8-841a-822344bcb962">


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/voidism/DoLa) [Dola: Decoding by Contrasting Layers Improves Factuality in Large Language Models](https://github.com/voidism/DoLa) "
    [Paper](https://arxiv.org/pdf/2309.03883.pdf)
    <img width="594" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ae1873a8-3d44-4a61-b409-049de25f91c2">
    ```
    "(They) amplify the factual knowledge in an LM
    through a contrastive decoding approach, where the output probability over the next word is obtained from
    the difference in logits obtained from a higher layer versus a lower layer"
    ```
    <img width="930" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/72b72c33-d355-4ee7-966e-72ad67a3b0c1">


!!! tip "[Decoding Strategies in Large Language Models](https://towardsdatascience.com/decoding-strategies-in-large-language-models-9733a8f70539)"

## Speculative Approaches

### Speculative Streaming

??? note "[Speculative Streaming: Fast LLM Inference without Auxiliary Models](https://arxiv.org/pdf/2402.11131)" speculative-streaming
     The authors show in their paper "single-model speculative decoding method that fuses drafting into the targetmodel by changing the fine-tuning objective from next token prediction to future n-gram prediction. Speculative Streaming speeds up decoding by 1.8 - 3.1X in a diverse set of tasks"
|
    <img width="332" alt="image" src="https://github.com/user-attachments/assets/469c0929-0867-43f6-8d37-4cf6bf6a169e">


### Speculative Sampling

Speculative sampling is a technique that relies on speedups due to generation parallelism to create k-next tokens samples to reduce latency. It starts by using a smaller model to generate a draft set of tokens. These are then run in parallel (instead of serial which is standard) to produce output logits. The draft and target-model tokens are compared and randomly sampled to allow the acceptance of the draft tokens or to generate a new token set.

??? note "[Accelerating Large Language Model Decoding with Speculative Sampling](https://arxiv.org/pdf/2302.01318.pdf)" speculative-sampling
    <img width="665" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/948d7e87-b71c-465e-b3c5-28177e85ef6c">
    

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/lucidrains/speculative-decoding) [Speculative Decoding implementation by Lucidrains](https://github.com/lucidrains/speculative-decoding)"
    

## Joint decoding

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/clinicalml/co-llm) [Co-LLM: Learning to Decode Collaboratively with Multiple Language Models](https://github.com/clinicalml/co-llm)" co-llm
    **Developments** The author show in their [paper](https://arxiv.org/pdf/2403.03870.pdf) that the use of multiple models to improve generated content using the outputs of one as context for the others. 
    
    <img width="1158" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5dc9a6bf-d3bc-4e58-a895-abe8c5aaa093">

    ![image](https://github.com/ianderrington/genai/assets/76016868/80437470-f1dd-40ad-8f9a-6082c52aea97)

