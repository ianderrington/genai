Here we share novel and promising architectures that may supplement or supplant other presently established models.


## Models

!!! tip "[Bayesian Flow Networks](https://arxiv.org/pdf/2308.07037.pdf) A new class of generative models for discrete and continuous data and generation"


!!! tip "[Retentive Network: A successor to Transformer for Large Language Models](https://arxiv.org/pdf/2307.08621.pdf) Important LLM-like system using similar components that may help it to be more scaleable than `O(N^2)` memory and `O(N)` inference complexity."

??? code "[Memoria](https://github.com/cosmoquester/memoria) stores and retrieves information called engram at multiple memory levels of working memory, short-term memory, and long-term memory, using connection weights that change according to Hebb’s rule. "
    [Paper](https://arxiv.org/pdf/2310.03052.pdf)
    <img width="778" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/2a0bc1b1-9409-45a3-b8b4-08d363619354">
    <img width="628" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a2cd82b8-b92a-446e-bc8f-95116dfe15ea">
    <img width="688" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/fe79add1-6748-45d8-a187-1db22c74a185">


### Structured State Space Sequence Models (SSSSMs)

Structured state space sequence models are a class of models that generally combine RNNs, convolutions with inspiration from state-space methods.

Well-known methods include:

### MambaByte

Operating on bytes directly instead of relying on encoding representation and subword tokenization and modality offers models greater flexability and versatility. Attending to the increased context length, which has been enabled by SSSSMs 

??? code "[MambaByte: Token-free Selective State Space Model](https://arxiv.org/pdf/2401.13660.pdf)" 
    [MegaByte-Pytorch Github](https://github.com/lucidrains/MEGABYTE-pytorch)

??? code "[Mamba: Linear-Time Sequence Modeling with Selective State Spaces](https://github.com/state-spaces/mamba)"
    Their method provides potential highly parallelizable that operates on very long contexts. 
    ![image](https://github.com/ianderrington/genai/assets/76016868/6be90c7e-a135-4a05-bd2b-cd4344b5a61e)
    <img width="601" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a5db3865-79d3-4ea2-b729-ecd2b7afc9d5">

#### Others

!!! code "[HyenaDNA: Long-Range Genomic Sequence Modeling at Single Nucleotide Resolution](https://github.com/HazyResearch/hyena-dna) Uses inspiration from FFT to create a drop-in replacement for Transformer models."
    [Paper for Hyena Architecture](https://arxiv.org/pdf/2302.10866.pdf)


!!! tip "[Retentive Network: A successor to Transformer for Large Language Models](https://arxiv.org/pdf/2307.08621.pdf) Important LLM-like system using similar components that may help it to be more scaleable than `O(N^2)` memory and `O(N)` inference complexity."


    


- Linear Attention
- H3
- RWKV
    [Paper](https://arxiv.org/pdf/2312.00752.pdf)
