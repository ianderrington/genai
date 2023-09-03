Time is money and the ability to quickly allow your GenAI to create high performing content is paramount. While related to engineering, there it is not a fully settled solution. Here we share understandings of good ways to make your model generate more efficiently, with minimal loss in quality. 

## Background

??? tip "[A Survey on Model Compression for Large Language Models](https://arxiv.org/pdf/2308.07633.pdf)"

## Pruning

Eliminate weights that do not produce consistently valuable outputs. 


??? important "[Fast as Chita: Neural network pruning with combinatorial optimization](https://blog.research.google/2023/08/neural-network-pruning-with.html)"

    [Arxiv paper](https://arxiv.org/abs/2302.14623)
     "an optimization-based approach for pruning pre-trained neural networks at scale. CHITA (which stands for “Combinatorial Hessian-free Iterative Thresholding Algorithm”) outperforms existing pruning methods in terms of scalability and performance tradeoffs, and it does so by leveraging advances from several fields, including high-dimensional statistics, combinatorial optimization, and neural network pruning."
     [![Fast as Chita](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIuxL23IilgYpOEWtnP9B4zbiPnuV5NUML47JP0q1idyLLmZUqRlHrxx77iFIinFWUXMekNhKSltLlZvzBSTaqsYmbithvXGlvggyaAZrtb4mg9oiYMWArjvf_lj7T9IbY1Ae4-wijzOZzTazsxWImdGRgLSyAJEc5WQWHvylSwcHQJWX8gXfEk70l8iEs/s1600/image5.gif)](https://blog.research.google/2023/08/neural-network-pruning-with.html)


## Low Rank Factorization 

Partition the model into smaller models 

## Knowledge distillation

Train a new smaller model using output of bigger models.

## Quantization
Reduce the precision of the models from fp32 to fp16, int8 and even binary! 



