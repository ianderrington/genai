Generating new data from an input involves selecting the next best token or sets of tokens given an output logit vector. 

## Contrastive Decoding

Demonstrates large improvements by using differences between better and worse models shows substantial improvement in generative quality.

**Contrastive inference:**
!!! quote "Any method which controls behavior differential at inference time, directly contrasting outputs from a desirable inference process with outputs from an undesirable inference process."
  --Sean Obrien
  <img width="824" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/9e20dedf-12c1-4f87-8fc3-6da419c9cf0a">

!!! tip "[Contrastive Decoding Improves Reasonign in Large Language Models](https://arxiv.org/pdf/2309.09117.pdf)"

!!! tip "[Contrastive Decoding: Open-ended Text Generation as Optimization](https://arxiv.org/pdf/2210.15097.pdf)"
  
??? code "[Dola: Decoding by Contrasting Layers Improves Factuality in Large Language Models](https://github.com/voidism/DoLa) "
    [Paper](https://arxiv.org/pdf/2309.03883.pdf)
    <img width="594" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ae1873a8-3d44-4a61-b409-049de25f91c2">
    ```
    "(They) amplify the factual knowledge in an LM
    through a contrastive decoding approach, where the output probability over the next word is obtained from
    the difference in logits obtained from a higher layer versus a lower layer"
    ```
    <img width="930" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/72b72c33-d355-4ee7-966e-72ad67a3b0c1">