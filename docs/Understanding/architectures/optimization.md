Time is money and the ability to quickly allow your GenAI to create high-performing content is paramount. While related to engineering, there is not a fully settled solution. Here we share an understanding of good ways to make your model generate more efficiently, with minimal loss in quality. 

While most successful models may use a [combination of approaches(#combination-approaches) there are several methods used to reduce model sizes

## Different methods

1. [Pruning](#pruning)
2. [Quantization](#quantization)
3. [Knowledge Distillation](#knowledge-distillation)
4. [Low-rank and sparsity approximations](#low-rank-and-sparsity-approximations)
5. [Mixture of Experts](#mixture-of-experts)
6. Neural Architecture Search (NAS)


### Pruning

Pruning eliminates weights that do not produce consistently highly-impactful outputs.

??? important "[Fast as Chita: Neural network pruning with combinatorial optimization](https://blog.research.google/2023/08/neural-network-pruning-with.html)"

    [Arxiv paper](https://arxiv.org/abs/2302.14623)
     "an optimization-based approach for pruning pre-trained neural networks at scale. CHITA (which stands for “Combinatorial Hessian-free Iterative Thresholding Algorithm”) outperforms existing pruning methods in terms of scalability and performance tradeoffs, and it does so by leveraging advances from several fields, including high-dimensional statistics, combinatorial optimization, and neural network pruning."
     [![Fast as Chita](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIuxL23IilgYpOEWtnP9B4zbiPnuV5NUML47JP0q1idyLLmZUqRlHrxx77iFIinFWUXMekNhKSltLlZvzBSTaqsYmbithvXGlvggyaAZrtb4mg9oiYMWArjvf_lj7T9IbY1Ae4-wijzOZzTazsxWImdGRgLSyAJEc5WQWHvylSwcHQJWX8gXfEk70l8iEs/s1600/image5.gif)](https://blog.research.google/2023/08/neural-network-pruning-with.html)

### Quantization
Precision details the manner in which binary bits represent numbers in a computer. Generally, the greater the number of bits, the broader the variety of numbers that can be represented. 

Broken down into the `exponent` and `fraction`, as the different values can have specific implications for the training of models. Quite generally, [bfloat16](https://en.wikipedia.org/wiki/Bfloat16_floating-point_format) (developed by Google Brain) offers an effective balance of size and dynamic expressibility for LLMs, and is a well-used number format. 

To have improved performance, the models may be reduced, however, to using fewer bits. Standard fp16 may sometimes reduced to int8, and even binary representations.  

??? info "Comparison of range and precision"
   ![image](https://huggingface.co/blog/assets/96_hf_bitsandbytes_integration/tf32-Mantissa-chart-hi-res-FINAL.png)

Purpose of quantization

<figure markdown>
  ![Quantization](https://github.com/ianderrington/genai/assets/76016868/f1ff3e1a-1157-47a0-9e64-5ec29111a256){ width="500" }
  <figcaption>Quantization summarized image taken from [Advanced Practical Data Science Lecture 9: Compression Techniques and Distillation](https://harvard-iacs.github.io/2020F-AC295/lectures/lecture9/presentation/lecture9.pdf)</figcaption>
</figure>

#### When? During or after training?
There are general times when quantization may be performed. During training, post-training. 
Here are the pros/cons of each kind:

TODO: Table with this information 

#### Examples

??? code "[SmoothQuant: Accurate and Efficient Post-trainign Quantizationf or LLMs](https://github.com/mit-han-lab/smoothquant)"
    Using some post-training smoothing, they shift the weights in such a way that they are easier to quantize. 
    [Paper](https://arxiv.org/abs/2211.10438.pdf)
    <img width="337" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ed34f663-5792-471f-9927-f3622f3243a3">
    
!!! code "[HF bitsandbytes](https://huggingface.co/blog/hf-bitsandbytes-integration) and code [From Github](https://github.com/huggingface/blog/blob/main/assets/96_hf_bitsandbytes_integration/example.py)"
    [Paper](https://arxiv.org/abs/2309.14717)
    
    
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

??? code "[Pushing Mixture of Experts to the Limit: Extremely Parameter Efficient MoE for Instruction Tuning](https://github.com/for-ai/parameter-efficient-moe)"
    "The codebase is built on T5X, which defines the model and training loop; Flaxformer, which defines the model computation; Flax, which defines the low level model layers; and Jax, which provides the execution."
    [Paper](https://arxiv.org/pdf/2309.05444.pdf)
    ![image](https://github.com/ianderrington/genai/assets/76016868/ca081309-dca9-4081-a6eb-30d929715ef9)
    
### Combination Approaches

??? code "[QLoRA: Efficient Finetuning of Quantized LLms](https://github.com/artidoro/qlora) uses Quantization and Low-Rank Adapters to enable SoTA models with even smaller models"
    [Paper](https://arxiv.org/abs/2305.14314) 
    [Example HF 4bit transformers](https://huggingface.co/blog/4bit-transformers-bitsandbytes)



## Tooling

!!! code "[Bitsandbytes](https://github.com/TimDettmers/bitsandbytes) by provides a lightweight wrapper around CUDA custom functions, in particular 8-bit optimizers, matrix multiplication (LLM.int8()), and quantization functions."


## Overview References

??? tip "[A Survey on Model Compression for Large Language Models](https://arxiv.org/pdf/2308.07633.pdf)"

