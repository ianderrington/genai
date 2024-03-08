TODO: Put scaling laws in here. 

??? code "[GaLore: Memory-Efficient LLM Training by Gradient Low-Rank Projection](https://arxiv.org/pdf/2403.03507.pdf)" GaLore
  
    **Developments**
    "For the first time, we show that the Llama 7B LLM can be trained on a single consumer-grade GPU (RTX 4090) with only 24GB memory. This represents more than 82.5% reduction in memory for storing optimizer states during training.
    
    Training LLMs from scratch currently requires huge computational resources with large memory GPUs. While there has been significant progress in reducing memory requirements during fine-tuning (e.g., LORA), they do not apply for pre-training LLMs. We design methods that overcome this obstacle and provide significant memory reduction throughout training LLMs.
    
    Training LLMs often requires the use of preconditioned optimization algorithms such as Adam to achieve rapid convergence. These algorithms accumulate extensive gradient statistics, proportional to the model's parameter size, making the storage of these optimizer states the primary memory constraint during training. Instead of focusing just on engineering and system efforts to reduce memory consumption, we went back to fundamentals. 
    
    We looked at the slow-changing low-rank structure of the gradient matrix during training.  We introduce a novel approach that leverages the low-rank nature of gradients via Gradient Low-Rank Projection (GaLore). So instead of expressing the weight matrix as low rank, which leads to a big performance degradation during pretraining, we instead express the gradient weight matrix as low rank without performance degradation, while significantly reducing memory requirements."

    <img width="352" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/05166538-7af7-4239-a194-03496760dbf5">
