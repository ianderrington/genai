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
5. [Mixture of Experts](../models/mixture_of_experts.md)
6. Neural Architecture Search (NAS)
7. [Hardware enabled optimization](#hardware-enabled-optimization)
8. [Compression](#compression)
9. [Caching](#caching)


### Pruning

Pruning is a technique that eliminates weights that do not consistently produce highly impactful outputs.



======

!!! tip "[SparseGPT: Massive Language Models Can Be Accurately Pruned in One-Shot](https://arxiv.org/pdf/2301.00774.pdf) Remove up to ~50% parameters preserving quality"

??? important "[Fast as Chita: Neural network pruning with combinatorial optimization](https://blog.research.google/2023/08/neural-network-pruning-with.html)"

    [Arxiv paper](https://arxiv.org/pdf/2302.14623.pdf)
     "An optimization-based approach for pruning pre-trained neural networks at scale. CHITA (which stands for “Combinatorial Hessian-free Iterative Thresholding Algorithm”) outperforms existing pruning methods in terms of scalability and performance tradeoffs, and it does so by leveraging advances from several fields, including high-dimensional statistics, combinatorial optimization, and neural network pruning."
     [![Fast as Chita](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIuxL23IilgYpOEWtnP9B4zbiPnuV5NUML47JP0q1idyLLmZUqRlHrxx77iFIinFWUXMekNhKSltLlZvzBSTaqsYmbithvXGlvggyaAZrtb4mg9oiYMWArjvf_lj7T9IbY1Ae4-wijzOZzTazsxWImdGRgLSyAJEc5WQWHvylSwcHQJWX8gXfEk70l8iEs/s1600/image5.gif)](https://blog.research.google/2023/08/neural-network-pruning-with.html)

Related to pruning is the use of smaller models that are initialized based on larger ones

??? abstract "[Weight Selection](https://github.com/OscarXZQ/weight-selection)"
    A nice way to initialize smaller models from bigger ones
    [Paper](https://arxiv.org/pdf/2311.18823.pdf)
    <img width="270" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/2c14986f-8edc-430e-bb59-3d3bae4f30d3">

??? abstract "[Transformer Compression with SliceGPT](https://github.com/microsoft/TransformerCompression)" slice-gpt

    **Developments** In their [paper](https://arxiv.org/pdf/2401.15024.pdf) the authors reveal that a manner of replacing matrices with dense smaller dense matrices reducing the embedding dimensions. This can eliminate up to 25% of parameters (and embeddings) for LLama-2, and maintain 99% zero shot task performance across multiple models. 
    <img width="547" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/7f01e175-f18b-4f69-b39a-d876375061b9">

    <img width="278" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/0f971929-396b-4ec8-9816-6ec239f6b863">

    <img width="281" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/991b7842-3a37-45c3-90eb-b8b01d0628ed">



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



======

#### When to quantize: During or after training?

There are general times when quantization may be performed. During training, post-training.
Here are the benefit chart for each method each kind:

MANAGEN: (Table with this the characteristic chart of the different methods to help individuals know specific challenges and benefits)

#### Examples

??? abstract "[SmoothQuant: Accurate and Efficient Post-trainign Quantizationf or LLMs](https://github.com/mit-han-lab/smoothquant)"
    Using some post-training smoothing, they shift the weights in such a way that they are easier to quantize.
    [Paper](https://arxiv.org/pdf/2211.10438.pdf.pdf)
    <img width="337" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ed34f663-5792-471f-9927-f3622f3243a3">

??? abstract "[HF bitsandbytes](https://huggingface.co/blog/hf-bitsandbytes-integration) and code [From Github](https://github.com/huggingface/blog/blob/main/assets/96_hf_bitsandbytes_integration/example.py)"
    [Paper](https://arxiv.org/pdf/2309.14717.pdf)


??? abstract "[PB-LLM: Partially Binarized Large Language Models](https://github.com/hahnyuan/PB-LLM) to compress identified model weights into a single bit, while allowing others to only be partially compressed."

    [Paper](https://github.com/hahnyuan/PB-LLM)





??? abstract "[GPTVQ: The Blessing of Dimensionality for LLM Quantization](https://arxiv.org/pdf/2402.15319.pdf)"

    The authors "show that the size versus accuracy trade-off of neural network quantization can be significantly improved by increasing the quantization dimensionality. We propose the GPTVQ method, a new fast method for post-training vector quantization (VQ) that scales well to Large Language Models (LLMs). Our method interleaves quantization of one or more columns with updates to the remaining unquantized weights, using information from the Hessian of the per-layer output reconstruction MSE. Quantization codebooks are initialized using an efficient data-aware version of the EM algorithm. The codebooks are then updated, and further compressed by using integer quantization and SVD-based compression. GPTVQ establishes a new state-of-the art in the size vs accuracy trade-offs on a wide range of LLMs such as Llama-v2 and Mistral. Furthermore, our method is efficient: on a single H100 it takes between 3 and 11 hours to process a Llamav2-70B model, depending on quantization setting. Lastly, with on-device timings for VQ decompression on a mobile CPU we show that VQ leads to improved latency compared to using a 4-bit integer format."


    [Code](https://github.com/qualcomm-ai-research/gptvq) [Code](https://github.com/Qualcomm-AI-research/transformer-quantization)

### Knowledge Distillation

Train a new smaller model using the output of bigger models.
(TODO)


### Fusion approaches 
??? abstract "[QA-LoRA: Quantization Ware Low-Rank Adaptation of Large Language Models](https://github.com/yuhuixu1993/qa-lora)"
    ![image](https://github.com/ianderrington/genai/assets/76016868/87219990-b7e8-4895-a274-a55584f2cb9e)

[Knowledge Distillation and Compression Demo.ipynb](https://colab.research.google.com/drive/1A0SWlfcd6ISzsc0gLBIr4N_vECHhUAst#scrollTo=6v59Uu9pb_wM)



??? abstract "[SqueezeLLM](https://github.com/SqueezeAILab/SqueezeLLM)  They are able to have 2x fold in model size for equivalent performance in perplexity. They use 'Dense and SParce Quantization' 
    [SqueezeLLM](https://arxiv.org/pdf/2306.07629.pdf)

### Low rank and sparsity approximations
TODO


??? abstract "[GaLore: Memory-Efficient LLM Training by Gradient Low-Rank Projection](https://arxiv.org/pdf/2403.03507.pdf)" GaLore
  
    **Developments**
    "For the first time, we show that the Llama 7B LLM can be trained on a single consumer-grade GPU (RTX 4090) with only 24GB memory. This represents more than 82.5% reduction in memory for storing optimizer states during training.
    
    Training LLMs from scratch currently requires huge computational resources with large memory GPUs. While there has been significant progress in reducing memory requirements during fine-tuning (e.g., LORA), they do not apply for pre-training LLMs. We design methods that overcome this obstacle and provide significant memory reduction throughout training LLMs.
    
    Training LLMs often requires the use of preconditioned optimization algorithms such as Adam to achieve rapid convergence. These algorithms accumulate extensive gradient statistics, proportional to the model's parameter size, making the storage of these optimizer states the primary memory constraint during training. Instead of focusing just on engineering and system efforts to reduce memory consumption, we went back to fundamentals. 
    
    We looked at the slow-changing low-rank structure of the gradient matrix during training.  We introduce a novel approach that leverages the low-rank nature of gradients via Gradient Low-Rank Projection (GaLore). So instead of expressing the weight matrix as low rank, which leads to a big performance degradation during pretraining, we instead express the gradient weight matrix as low rank without performance degradation, while significantly reducing memory requirements."

    <img width="352" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/05166538-7af7-4239-a194-03496760dbf5">



#### Model Merging

??? abstract "[🐟 Evolutionary Optimization of Model Merging Recipes](https://github.com/SakanaAI/evolutionary-model-merge)"
    **Developments:** The authors demosntrate a "a new paradigm for automated model composition, paving the way for exploring alternative, efficient approaches to foundation model development" by merging models. 
    ![image](https://github.com/ianderrington/genai/assets/76016868/be153c45-2d6d-4fdc-8d0d-5ff721b83d64)

    [Paper](https://arxiv.org/abs/2403.13187)

### Combination Approaches


??? abstract "[QLoRA: Efficient Finetuning of Quantized LLms](https://github.com/artidoro/qlora) uses Quantization and Low-Rank Adapters to enable SoTA models with even smaller models"
    [Paper](https://arxiv.org/pdf/2305.14314.pdf)
    [Example HF 4bit transformers](https://huggingface.co/blog/4bit-transformers-bitsandbytes)

### Hardware enabled optimization

??? important "[LLM in a flash: Efficient Large Language Model Inference with Limited Memory](https://arxiv.org/pdf/2312.11514.pdf)"

    > Large language models (LLMs) are central to modern natural language processing, delivering exceptional performance in various tasks. However, their intensive computational and memory requirements present challenges, especially for devices with limited DRAM capacity. This paper tackles the challenge of efficiently running LLMs that exceed the available DRAM capacity by storing the model parameters on flash memory but bringing them on demand to DRAM. Our method involves constructing an inference cost model that harmonizes with the flash memory behavior, guiding us to optimize in two critical areas: reducing the volume of data transferred from flash and reading data in larger, more contiguous chunks. Within this flash memory-informed framework, we introduce two principal techniques. First, “windowing” strategically reduces data transfer by reusing previously activated neurons, and second, “row-column bundling”, tailored to the sequential data access strengths of flash memory, increases the size of data chunks read from flash memory. These methods collectively enable running models up to twice the size of the available DRAM, with a 4-5x and 20-25x increase in inference speed compared to naive loading approaches in CPU and GPU, respectively. Our integration of sparsity awareness, context-adaptive loading, and a hardware-oriented design paves the way for effective inference of LLMs on devices with limited memory

### Compression

!!! tip "[Learning to Compress Prompts with Gist Tokens](https://arxiv.org/pdf/2304.08467.pdf). Can enable 26x compression and 40% FLOP reduction and improvements by training 'gist tokens' to summarize information."

### Caching


KV-Cache Optimization
??? important "[MODEL TELLS YOU WHAT TO DISCARD:ADAPTIVE KV CACHE COMPRESSION FOR LLMS](https://openreview.net/pdf?id=uNrFpDPMyo)"
    
    This method performs dynamic ablation of KV pairs minimizing the number of computes that need to happen. They just remove K-V cach



## Tooling

!!! abstract "[Bitsandbytes](https://github.com/TimDettmers/bitsandbytes) by provides a lightweight wrapper around CUDA custom functions, in particular 8-bit optimizers, matrix multiplication (LLM.int8()), and quantization functions."



## Overview References

??? tip "[A Survey on Model Compression for Large Language Models](https://arxiv.org/pdf/2308.07633.pdf)"

??? tip "[Make LLMs go faster](https://vgel.me/posts/faster-inference/)"
 
