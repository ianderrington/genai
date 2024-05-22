Here we share novel and promising architectures that may supplement or supplant other presently established models.


## Models

??? code "[REPRESENTATION ENGINEERING: A TOP-DOWN APPROACH TO AI TRANSPARENCY](github.com/andyzoujm/representation-engineering)" repe
    **Developments** The authors create a manner of extracting conceptual relations within models by prompting them, and examining the layer-wise activations associated with that word, and a linear model is trained to identify the direction principal to activating that concept. The _reading vector_ forms the the principal componentassociated with that concept can be most liketly added to the output to enhance that quality. This leads to the potential to directly create alignments, hallucination control, and other targeted revisions of output. 
    ```
    Consider the amount of <concept> in the following:
    <stimulus>
    The amount of <concept> is
    ```
    <img width="287" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/51cacbe7-f2f1-46d5-b77f-4906cae3f893">

    <img width="889" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c7711e10-28cd-472f-a2a5-fc5186289d48">
    <img width="509" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/6d595078-10be-4a42-bc8e-79ee9b9279e4">
    <img width="684" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4c357680-c221-4821-a4ed-720ba0410d34">

    <img width="690" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4c57323f-e8b8-4967-8ab3-f837e40a7a11">

    



!!! tip "[Bayesian Flow Networks](https://arxiv.org/pdf/2308.07037.pdf) A new class of generative models for discrete and continuous data and generation"


!!! tip "[Retentive Network: A successor to Transformer for Large Language Models](https://arxiv.org/pdf/2307.08621.pdf) Important LLM-like system using similar components that may help it to be more scaleable than `O(N^2)` memory and `O(N)` inference complexity."

??? code "![GitHub Repo stars](https://badgen.net/github/stars/cosmoquester/memoria) [Memoria](https://github.com/cosmoquester/memoria) stores and retrieves information called engram at multiple memory levels of working memory, short-term memory, and long-term memory, using connection weights that change according to Hebb’s rule. "
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

??? code "![GitHub Repo stars](https://badgen.net/github/stars/state-spaces/mamba) [Mamba: Linear-Time Sequence Modeling with Selective State Spaces](https://github.com/state-spaces/mamba)"
    Their method provides potential highly parallelizable that operates on very long contexts. 
    ![image](https://github.com/ianderrington/genai/assets/76016868/6be90c7e-a135-4a05-bd2b-cd4344b5a61e)
    <img width="601" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a5db3865-79d3-4ea2-b729-ecd2b7afc9d5">

#### Others

!!! code "![GitHub Repo stars](https://badgen.net/github/stars/HazyResearch/hyena-dna) [HyenaDNA: Long-Range Genomic Sequence Modeling at Single Nucleotide Resolution](https://github.com/HazyResearch/hyena-dna) Uses inspiration from FFT to create a drop-in replacement for Transformer models."
    [Paper for Hyena Architecture](https://arxiv.org/pdf/2302.10866.pdf)


!!! tip "[Retentive Network: A successor to Transformer for Large Language Models](https://arxiv.org/pdf/2307.08621.pdf) Important LLM-like system using similar components that may help it to be more scaleable than `O(N^2)` memory and `O(N)` inference complexity."


    


- Linear Attention
- H3
- RWKV
    [Paper](https://arxiv.org/pdf/2312.00752.pdf)
