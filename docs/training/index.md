Basics: [Distributed Training](https://neptune.ai/blog/distributed-training)
https://neptune.ai/blog/distributed-training-frameworks-and-tools




### Fine Tuning using Distillation

Train on model trains a new model on the output of a new model. 
- [Alpaca ](https://github.com/tatsu-lab/stanford_alpaca)

### Fine tuning Optimizations

- [Full Parameter Fine-Tuning for Large Language Models with Limited Resources.](https://github.com/openlmlab/lomo) Introduces LOMO: LOw-Memory Optimization to fuse 

### Adapter layers

- [AdapterHub: A Framework for Adapting Transformers](https://arxiv.org/pdf/2007.07779.pdf) [Website](https://adapterhub.ml/)
Adapters are efficient and performant layers that can optimize performance without needing to do inefficient fine-tuning. 


## RLHF

- ‼️ [RLHF basics by hugging face](https://huggingface.co/blog/rlhf) A realy good intro to parse again.
- [RLHF for Palm in Pytorch](https://github.com/lucidrains/PaLM-rlhf-pytorch)
- [AligningLargeLanguageModelsthroughSyntheticFeedback](https://arxiv.org/abs/2305.13735) Using a heirarchy of systems to 

### AI-enabled ranking

- [Can foundation models label data like humans?](https://huggingface.co/blog/llm-leaderboard) using GPT to review model outputs produced biased results. Changing the prompt doesn't really help to de-bias it. Lots of additional considerations surrounding model evaluation