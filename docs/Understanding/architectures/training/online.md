## Online Training

Online training, also called 'test time training' occurs during [generation](../generation.md) to enables model parameters to dynamically evolve as they see additional samples after base training occurs. This differs from in-context learning where models can adapt to new tasks without parameter changes by updating [prompts](../../prompting/index.md) with examples or improved instructions. 

??? note "[The Surprising Effectiveness of Test-Time Training for Abstract Reasoning](https://github.com/ekinakyurek/marc)" test-time-training
    The authors show in their [paper]((https://ekinakyurek.github.io/papers/ttt.pdf) method to improve AI's ability to work on the Abstract Reasoning Challenge/Corpus (ARC), and show that a novel test time training with self consistency can greatly improve reasoning above strict Finetuning. 

    <img width="678" alt="image" src="https://github.com/user-attachments/assets/6a93f4a6-253a-4145-81ed-88c8ca50a7c3">

    

??? abstract "[Online-LoRA](ttps://github.com/christina200/online-lora-official)" online-lora
    The authors provide code and show in [their paper](https://arxiv.org/abs/2411.05663) a manner of enabling online-lora to finetune pre-trained Vision Transformers (ViT)s in real time, thereby addressing the issues with reherasl buffers. They use dynamic loss values to ensure automatic recognition of data distribution shipfts and a novel online weight regularization strategy for combining different model parameters.
    
    ![image](https://github.com/user-attachments/assets/b2800849-e6b4-43a2-822a-5686f4e4f400)
