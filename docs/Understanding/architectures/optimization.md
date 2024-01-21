Models must yield results that are sufficiently good for downstream users. This is quite often the accuracy, an [evaluation and comparison](evaluating_and_comparing.md) metric. Efficiency another is a crucial aspect of AI model development. The ability to generate high-performing content quickly can significantly impact the overall performance of your AI model. Although there isn't a universally accepted solution, several methods can help optimize your model for better efficiency without compromising quality.

Most successful models employ a combination of approaches to reduce model sizes. This document provides an understanding of these methods and how they can be applied to optimize your AI model.

## Model metric optimizations

MANAGEN(Please describe model optimization methods and what is mentioned below)

* Data (quality and volume)
* Hyper parameters: Batch size is important. Use gradient accumulation if possible.
* Model size
* Model structure (BERT vs last-token prediction)


## Model Performance Optimization

The following are some of the commonly used methods for optimizing AI models:

1. [Pruning](#pruning)
2. [Quantization](#quantization)
3. [Knowledge Distillation](#knowledge-distillation)
4. [Low-rank and sparsity approximations](#low-rank-and-sparsity-approximations)
5. [Mixture of Experts](#mixture-of-experts)
6. Neural Architecture Search (NAS)
7. [Hardware enabled optimization](#hardware-enabled-optimization)

### Pruning

Pruning is a technique that eliminates weights that do not consistently produce highly impactful outputs.

??? important "[Fast as Chita: Neural network pruning with combinatorial optimization](https://blog.research.google/2023/08/neural-network-pruning-with.html)"

    [Arxiv paper](https://arxiv.org/pdf/2302.14623.pdf)
     "An optimization-based approach for pruning pre-trained neural networks at scale. CHITA (which stands for “Combinatorial Hessian-free Iterative Thresholding Algorithm”) outperforms existing pruning methods in terms of scalability and performance tradeoffs, and it does so by leveraging advances from several fields, including high-dimensional statistics, combinatorial optimization, and neural network pruning."
     [![Fast as Chita](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIuxL23IilgYpOEWtnP9B4zbiPnuV5NUML47JP0q1idyLLmZUqRlHrxx77iFIinFWUXMekNhKSltLlZvzBSTaqsYmbithvXGlvggyaAZrtb4mg9oiYMWArjvf_lj7T9IbY1Ae4-wijzOZzTazsxWImdGRgLSyAJEc5WQWHvylSwcHQJWX8gXfEk70l8iEs/s1600/image5.gif)](https://blog.research.google/2023/08/neural-network-pruning-with.html)

Related to pruning is the use of smaller models that are initialized based on larger ones

??? code "[Weight Selection](https://github.com/OscarXZQ/weight-selection)"
    A nice way to initialize smaller models from bigger ones
    [Paper](https://arxiv.org/pdf/2311.18823.pdf)
    <img width="270" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/2c14986f-8edc-430e-bb59-3d3bae4f30d3">


### Quantization
Precision details the manner in which binary bits represent numbers in a computer. Generally, the greater the number of bits, the broader the variety of numbers that can be represented.

Broken down into the `exponent` and `fraction`, as the different values can have specific implications for the training of models. Quite generally, [bfloat16](https://en.wikipedia.org/wiki/Bfloat16_floating-point_format) (developed by Google Brain) offers an effective balance of size and dynamic expressibility for LLMs, and is a well-used number format.

To have improved performance, the models may be reduced, however, to using fewer bits. Standard fp16 may sometimes reduced to int8, and even binary representations.

???+ info "What is Precision?"

    <figure markdown>
    ![Quantization](https://github.com/ianderrington/genai/assets/76016868/f1ff3e1a-1157-47a0-9e64-5ec29111a256){ width="500" }
    <figcaption>Quantization summarized image taken from [Advanced Practical Data Science Lecture 9: Compression Techniques and Distillation](https://harvard-iacs.github.io/2020F-AC295/lectures/lecture9/presentation/lecture9.pdf)</figcaption>
    </figure>

    ![image](https://huggingface.co/blog/assets/96_hf_bitsandbytes_integration/tf32-Mantissa-chart-hi-res-FINAL.png)


#### When to quantize: During or after training?

There are general times when quantization may be performed. During training, post-training.
Here are the benefit chart for each method each kind:

MANAGEN: (Table with this the characteristic chart of the different methods to help individuals know specific challenges and benefits)

#### Examples

??? code "[SmoothQuant: Accurate and Efficient Post-trainign Quantizationf or LLMs](https://github.com/mit-han-lab/smoothquant)"
    Using some post-training smoothing, they shift the weights in such a way that they are easier to quantize.
    [Paper](https://arxiv.org/pdf/2211.10438.pdf.pdf)
    <img width="337" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ed34f663-5792-471f-9927-f3622f3243a3">

??? code "[HF bitsandbytes](https://huggingface.co/blog/hf-bitsandbytes-integration) and code [From Github](https://github.com/huggingface/blog/blob/main/assets/96_hf_bitsandbytes_integration/example.py)"
    [Paper](https://arxiv.org/pdf/2309.14717.pdf)


??? code "[PB-LLM: Partially Binarized Large Language Models](https://github.com/hahnyuan/PB-LLM) to compress identified model weights into a single bit, while allowing others to only be partially compressed."
    [Paper](https://github.com/hahnyuan/PB-LLM)

### Knowledge Distillation

Train a new smaller model using the output of bigger models.
(TODO)

??? code "[QA-LoRA: Quantization Ware Low-Rank Adaptation of Large Language Models](https://github.com/yuhuixu1993/qa-lora)"
    ![image](https://github.com/ianderrington/genai/assets/76016868/87219990-b7e8-4895-a274-a55584f2cb9e)

[Knowledge Distillation and Compression Demo.ipynb](https://colab.research.google.com/drive/1A0SWlfcd6ISzsc0gLBIr4N_vECHhUAst#scrollTo=6v59Uu9pb_wM)

### Low rank and sparsity approximations
TODO


### Mixture of Experts

MOE provides the ability to use different smaller models that have better performance in certain domains. Their use is notable, as it has been stated that GPT-4 is powered by 8 different agents.

??? code "[SwitchHead: Accelerating Transformers with Mixture-of-Experts Attention](https://github.com/robertcsordas/moe_attention)"
    [Paper](https://arxiv.org/pdf/2312.07987.pdf)

    <img width="568" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/8cdb5b54-c0b3-47b3-bef0-8535cd0106a4">


??? code "[Pushing Mixture of Experts to the Limit: Extremely Parameter Efficient MoE for Instruction Tuning](https://github.com/for-ai/parameter-efficient-moe)"

    "The codebase is built on T5X, which defines the model and training loop; Flaxformer, which defines the model computation; Flax, which defines the low level model layers; and Jax, which provides the execution."
    [Paper](https://arxiv.org/pdf/2309.05444.pdf)
    ![image](https://github.com/ianderrington/genai/assets/76016868/ca081309-dca9-4081-a6eb-30d929715ef9)

??? code "[Blending Is All You Need: Cheaper, Better Alternative to Trillion-Parameters LLM](https://huggingface.co/ChaiML)"
    [Paper](https://arxiv.org/pdf/2401.02994.pdf)
    The authors demonstrate that selecting parameters from differently trained models at generation can yield significant improvements in performance for lower-sized models.
    Here is the algorithm:
    # Algorithm 1 Blended Algorithm

        1. k ← 1
        2. while true do
        3.     uₖ ← user’s current input turn
        4.     Sample model parameter θₙ ~ Pθ
        5.     Generate response rₖ according to:
        6.         rₖ ~ P(r|u₁:k, r₁:k−1; θₙ)
        7.     k = k + 1
        8. end while


### Combination Approaches


??? code "[QLoRA: Efficient Finetuning of Quantized LLms](https://github.com/artidoro/qlora) uses Quantization and Low-Rank Adapters to enable SoTA models with even smaller models"
    [Paper](https://arxiv.org/pdf/2305.14314.pdf)
    [Example HF 4bit transformers](https://huggingface.co/blog/4bit-transformers-bitsandbytes)

### Hardware enabled optimization

??? important "[LLM in a flash: Efficient Large Language Model Inference with Limited Memory](https://arxiv.org/pdf/2312.11514.pdf)"

    > Large language models (LLMs) are central to modern natural language processing, delivering exceptional performance in various tasks. However, their intensive computational and memory requirements present challenges, especially for devices with limited DRAM capacity. This paper tackles the challenge of efficiently running LLMs that exceed the available DRAM capacity by storing the model parameters on flash memory but bringing them on demand to DRAM. Our method involves constructing an inference cost model that harmonizes with the flash memory behavior, guiding us to optimize in two critical areas: reducing the volume of data transferred from flash and reading data in larger, more contiguous chunks. Within this flash memory-informed framework, we introduce two principal techniques. First, “windowing” strategically reduces data transfer by reusing previously activated neurons, and second, “row-column bundling”, tailored to the sequential data access strengths of flash memory, increases the size of data chunks read from flash memory. These methods collectively enable running models up to twice the size of the available DRAM, with a 4-5x and 20-25x increase in inference speed compared to naive loading approaches in CPU and GPU, respectively. Our integration of sparsity awareness, context-adaptive loading, and a hardware-oriented design paves the way for effective inference of LLMs on devices with limited memory

## Tooling

!!! code "[Bitsandbytes](https://github.com/TimDettmers/bitsandbytes) by provides a lightweight wrapper around CUDA custom functions, in particular 8-bit optimizers, matrix multiplication (LLM.int8()), and quantization functions."



## Overview References

??? tip "[A Survey on Model Compression for Large Language Models](https://arxiv.org/pdf/2308.07633.pdf)"
