Transformers are a powerful type of architecture allows input sequences to be considered with the whole input context. They are built on [self attention] mechanism, that performs an $O(N^2)$ computation fon the input sequence and, in continued stacks, provides the ability to represent relations between inputs at different levels of abstration. 

Transformers can be used in three general ways: encoder-only, decoder-only and encoder-decoder. 

In Encoder-only networks, like Bert, the entire input text is used, but is useful for primarily output classification tasks (sequence-to-value). 

As in the original [Transformer ATtention paper], encoder-decoder networks are used to convert sequence to sequences for language translation. In these systems, an encoder will first project information based on the input, generate new outputs, and the new outpus will be used in a recurrent fashion to generate subsequent outputs. 

In Decoder-only networks, like [GPT](gpt.md), because they are _next-token_predictions_, they only require information from words/tokens that have been previously seen. The outputs will be the estimates of the probability of the next word/token. While next-token prediction is singular, this can happen iteratively, and with the proper prompting, the generation of output sequences can perform a varity of sequence-to-sequence tasks, such as language translation. 


  * Attention: Token being predicted is mapped to a query vector and tokens in context are mapped to key and value vectors. Inner products are used to combine to extract information.
  * Bi-directional / unmasked
  * Unidirectional / masked self attetion
  * Cross attention applies attention to the primary sequence and treates the second token sequence the context.
  * Multi-head attention. Multiple attention heads in parallel.
  * Layer normalization. Found to be computationally efficient version sets m = beta = 0 or root mean square layer normalizagion or `RMSnorm`.
  * Unembedding: Learns to convert vector intot he vocuabulary elements.

## Visualizing The Structures

??? note "[Visualizing Large Transformers](https://bbycroft.net/llm)" visualizing-large-transformers
    A very interesting representation of visual transformers.
    <img width="785" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ecca4ace-6623-4341-b223-c12be4de3c11">

    

## Components

1. Positional Encoding
1. Attention: Query, Key, Vectors
1. Layer Normalization

Initially the word, or subword is broken anad represented as a lookup-key to find an 'embedding'. This can be trained alongside transformer models, or pre-trained from other models. It provides a vector representation of the input word.

To allow the token+embedding to _attend_ or share information with the other inputs, calculate a 'self-attention matrix' with the following pieces. 
1. A Query matrix $W^Q$
2. A Key matrix $W^K$
3. A Value matrix $W^V$

For each token/word $i$, the embedding is multiplied by this matrix to yield a query vector, a key vector, and a value vector, $Q_i$, $K_i$ and $V_i$

Each query-vector, is then multiplied by each key-vector, resulting in matrix computation $Q*V$. Because the key-query is suppoesed to describe how important an input combination is, it is then normalized by the dimension of the values to allow for similar behavior for different dimensions, and then  passed through a soft-max function 

$softmax(\frac{(Q * K^T)}{\sqrt{d_k}})

This is then multiplied by the value matrix to provide the attention output. 

$Z_(head i) = $softmax(\frac{(Q * K^T)}{\sqrt{d_k}}) V$

Multiple attention heads can be combined by stacking them together and then multiplied by a final matrix that will produce a final

$Z = cat(Z_i) * W^O$

Finally, this matrix is with input values to have a residual connection, and the [layer is normalized](#layer-normalization). 

This matrix can be passed to additional layers, or a final fully-connected projection layer. 


### Positional Encoding

[Standard embeddings are position in variant](), meaning the position of the token/word in the input will have little importance. As token/ word positions have certain importance, position-embeddings are also used. Generally additive, position embeddings are based on varying sinusoids, or trainable parameters. 

- [A Gentle Introduction to Positional Encoding in Transformer Models, pt1]( https://machinelearningmastery.com/a-gentle-introduction-to-positional-encoding-in-transformer-models-part-1/)

- [Transformer Language Models without POsitional Encodings STill Learn Positional Information](https://arxiv.org/pdf/2203.16634.pdf) Indications that causal LMS may derive positional awareness from more than the positional embeddings: they learn it from the causal mask.

TODO: Which is used more and why aren't trainable, and why are not non-linear embeddings considered as opposed to just addative...? 
  
### Layer Normalization 

Layer normalization observably improves results [On Layer Normalization in the Transformer Architecture](http://proceedings.mlr.press/v119/xiong20b/xiong20b.pdf)

## Reviews

??? tip "[The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)"

??? tip "[The Transformer Blueprint: A Holistic Guide to the Transformer Neural Network Architecture](https://deeprevision.github.io/posts/001-transformer/) provides q thorough exposition of transformer technology."

## Useful References and Research

### General Introductions

- [Transformers by Lucas Beyer (presentation)](https://docs.google.com/presentation/d/1ZXFIhYczos679r70Yu8vV9uO6B1J0ztzeDxbnBxD1S0/mobilepresent?fbclid=IwAR18pR_Mf46mkZ1_E3NFOwYY2wVx0aATficgfh_GWZd29c_lWNRa4vK5zy8&slide=id.g31364026ad_3_2)


### Seminal documents

- [Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/pdf/1409.0473.pdf) First paper indicating the notion of 'attention' sort of mechanism.

- [Attention Is All you Need](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf) Initial paper indicating that attention is very powerful and potential replacement of LLM architectures.

- [Formal Algorithms for Transformers in 2023](https://arxiv.org/pdf/2207.09238.pdf)
Important discussion revealing the components of Transformers.



#### Modifications
- [A Simple yet Effective Learnable Positional Encoding Method for Improving Document Transformer Model](https://aclanthology.org/2022.findings-aacl.42.pdf) They introduce a learnable sinusoidal positional encoding feed forward network. Demonstrates significant improvements over other datasets.


## Enhancements and variations

### Context length Improvements

In its vanilla state, Transformers are $O(N^2)$ in their computation with self-complexity. This makes long context lengths increasingly costly to train and generate.
Improvements in context length, for both training and generation have found ways to generally work-around these limits. While there is ample research in this domain, we present a few of the most successful methods.
They improve computation complexity in one of several ways:

- Introducing sparsity that is
    - Banded or fixed
    - Hierarchical
    - Banded to reduce full computation
    - $/Lambda$ shaped with a banded window that also takes into account observably important first tokens.

- Inclusion of a recurrent RNN-style that permits memory to be retained.
- Memory retrieval systems.

??? code "[Generating Long Sequences with Sparse Transformers](https://arxiv.org/pdf/1904.10509.pdf) provides simple solutions to generate longer sequences."
    <img width="662" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/86d4dc29-7711-490d-a2a8-99c4a4d34027">


??? code "[Heirarchichal Attention](https://github.com/neuro-inc/ml-recipe-hier-attention)"
    [Paper](https://arxiv.org/pdf/2304.11062.pdf)

!!! code "[Scaling Transformer to 1M tokens and beyond with RMT](https://github.com/booydar/t5-experiments/tree/scaling-report) Uses a Recurrent Memory Transformer(RMT) architecture to extend understanding to large lengths."


??? tip "[MEGABYTE: Predicting Million-byte Sequences with Multiscale Transformers](https://arxiv.org/pdf/2305.07185.pdf)"

    MEGABYTE segments sequences into patches and uses a local submodel within patches and a global model between patches. Very nice demonstration that allows for $O(N^{4/3}$ scaling directly on bytes, thereby bypassing tokenization requirements found with traditional transformers.

    <img width="446" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/0c2ea874-5257-4ed8-9abb-73b8f969f356">

    An open source version made by `lucidrains`: [Megabyte Github implementation for PyTorch](https://github.com/lucidrains/MEGABYTE-pytorch)


??? code "[Infinite Former](https://github.com/deep-spin/infinite-former) Uses a representation of the input sequence as a continuous signal expressed in a combination of N radial basis functions."
    [Paper](https://arxiv.org/pdf/2109.00301.pdf)
    ![Infinity Former](https://github.com/ianderrington/general/assets/76016868/96d8efb8-46ab-4662-b62b-4763ad454a80){ align=left width="300"  loading=lazy }

??? tip "[LM-INfinite: Simple On-the-Fly Length Generalization for Large Language Models](https://arxiv.org/pdf/2308.16137.pdf) provides an O(n) time/space extension allows LMMs to ability to go to 32k tokens and 2.7x speedup."
    <img width="545" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/d3c4ccbb-9fc9-4bc5-9b54-7b2270c26cc8">
        <img width="850" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/0eb9dc5d-b409-4b98-95c0-e712fd186dc1">
    <img width="863" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c2bdf11c-dec1-4575-99ef-e931ae306d61">

??? code "[Efficient Streaming Language Models with Attention Sinks](https://github.com/mit-han-lab/streaming-llm)"
    [Paper](https://arxiv.org/pdf/2309.17453.pdf)
    ![image](https://github.com/ianderrington/genai/assets/76016868/fb9cbf5a-ee6b-4558-8283-87aeaedf280a)




### Computation Reduction

??? code "[Simplified Transformers](https://github.com/bobby-he/simplified_transformers) that removes the 'value' parameter-set to increase speed by 14% with potentially minimal accuracy reduction"

    Herein the authors reveal a variation of transformers that removes the 'value' parameter to yield notable speed gains at the same performance level.
    <img width="632" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/16a8b01d-10df-4188-addd-345128ba4156">
    [Paper](https://arxiv.org/pdf/2311.01906.pdf)


[SpQR: A Sparse-Quantized Representation for Near-Lossless LLM Weight Compression](https://arxiv.org/pdf/2306.03078v1.pdf)

### Fine Tuning

Using examples to fine-tune a model can reduce the number of tokens needed to achieve a sufficiently reasonable response. Can be expensive to retrain though.


??? tip "[Symbol Tuning Improves in-context learning in Language Models](https://arxiv.org/pdf/2305.08298.pdf)"
    <img width="488" alt="image" src="https://github.com/ianderrington/general/assets/76016868/a75d4a36-0e20-4259-bd10-c7180b5468b5">


## Other modalities

### Vision

### Graphs


??? tip "[Transformers Meet Directed Graphs](https://arxiv.org/pdf/2302.00049.pdf) introduces a variation of Transformer GNNs that uses 'direction-aware' positional encodings to help handle both undirected and directed graphs"
    <img width="516" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/d7eea1fc-622f-43df-aff3-748fbcf462dc">


## Training variations
### Fairness Enablement

- [Concept Erasure](https://arxiv.org/pdf/2306.03819.pdf)

### Using Knowledge Links

- [LinkBERT](https://github.com/michiyasunaga/LinkBERT) places in the context window hyperlinked references to achieve better performance and is a drop-in replacement for BERT models.

### Multimodal

??? important "[Jack of All Tasks, Master of Many: Designing General-purpose Coarse-to-Fine Vision-Language Model](https://arxiv.org/pdf/2312.12423.pdf)"

    <img width="672" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/61e04782-ee50-4964-829b-270cd8a0041c">

    > In this work, we present VistaLLM, the first generalpurpose vision model that addresses coarse- and finegrained vision-language reasoning and grounding tasks over single and multiple input images. We unify these tasks by converting them into an instruction-following sequenceto-sequence format. We efficiently transform binary masks into a sequence of points by proposing a gradient-aware adaptive contour sampling scheme, which significantly improves over the naive uniform sampling technique previously used for sequence-to-sequence segmentation tasks

- [Visual GPT](https://arxiv.org/pdf/2303.04671.pdf)
- [Language is not all you need](https://arxiv.org/pdf/2302.14045.pdf)
- [Meta-Transformer: A Unified Framework for Multimodal Learning](https://arxiv.org/pdf/2307.10802.pdf) The first framework to perform unified learning across 12 modalities with unpaired data. It does so by learning an embedding that can be shared across the modalities. [Github](https://kxgong.github.io/meta_transformer/)

### Graph

!!! note "[Invariant Graph Transformer](https://arxiv.org/pdf/2312.07859.pdf)"
    
    <img width="348" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/43ab8576-6c74-4f1d-ba67-8c0a6e728c27">

    <img width="695" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/66251260-2113-47d1-a416-2d160d7a2bef">


## Abstractions

- [Looped Transformers and Programmable Computers](https://arxiv.org/pdf/2301.13196.pdf) Understanding that transformer networks can simulate complex algorithms when hardcoded with specific weights and made intoa  loop. 'Machine Learning' 'Machine code'. "We demonstrate that
a constant number of encoder layers can emulate basic computing blocks, including embedding edit operations, non-linear functions, function calls, program counters, and conditional branches. Using these building blocks, we emulate a small instruction-set computer."


## Code
- [Hugging Face Transformers](https://huggingface.co/docs/transformers/main/index) An API to access a large number of pre-trained transformers. Pytorch based.
- [Fast Transformers](https://github.com/idiap/fast-transformers/tree/master) A quality collection of a number of transformer implementations written in Pytorch.

## Theory and Experiment

??? note "[A MATHEMATICAL PERSPECTIVE ON TRANSFORMERS](https://arxiv.org/pdf/2312.10794.pdf)"
     We develop a mathematical framework for analyzing Transformers based on their interpretation as interacting particle systems, which
reveals that clusters emerge in long time. 

