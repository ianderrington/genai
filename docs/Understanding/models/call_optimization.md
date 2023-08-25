Time is money and the ability to quickly allow your GenAI to create high performing content is paramount. While related to engineering, there it is not a fully settled solution. Here we share understandings of good ways to make your model generate more efficiently, with minimal loss in quality. 

## Background

??? tip "[A Survey on Model Compression for Large Language Models](https://arxiv.org/pdf/2308.07633.pdf)"

## Pruning

Eliminate weights that do not produce consistently valuable outputs. 

## Low Rank Factorization 

Partition the model into smaller models 

## Knowledge distillation

Train a new smaller model using output of bigger models.

## Quantization
Reduce the precision of the models from fp32 to fp16, int8 and even binary! 



