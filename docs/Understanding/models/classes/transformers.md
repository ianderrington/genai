TODO
## Components

TODO: Describe transformers and components

1. Attention: Query, Key, Vectors
1. Positional Encoding
1. Layer Normalization

### Attention Models

Layer normalization observably improves results [On Layer Normalization in the Transformer Architecture](http://proceedings.mlr.press/v119/xiong20b/xiong20b.pdf)

## Reviews
<div class="result" markdown>
??? tip [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
</div>
<div class="result" markdown>
??? tip [The Transformer Blueprint: A Holistic Guide to the Transformer Neural Network Architecture](https://deeprevision.github.io/posts/001-transformer/)
    A thorough exposition of transformer technology.
</div>


### Softmax?

The softmax is dominantly researched activation function. There may be other activation functions that are better, such as the 

### GPT

- [Illustrated GPT](http://jalammar.github.io/illustrated-gpt2/)
- [How GPT3 works](https://jalammar.github.io/how-gpt3-works-visualizations-animations/)
Excellent summary of the progress of GPT over time, revealing core components, optimizations, and essential variations to the major Foundation model architectures.

## Useful References and Research

### General Introductions

- [Transformers by Lucas Beyer (presentation)](https://docs.google.com/presentation/d/1ZXFIhYczos679r70Yu8vV9uO6B1J0ztzeDxbnBxD1S0/mobilepresent?fbclid=IwAR18pR_Mf46mkZ1_E3NFOwYY2wVx0aATficgfh_GWZd29c_lWNRa4vK5zy8&slide=id.g31364026ad_3_2)

- [Five years of progress in GPTs](https://finbarrtimbers.substack.com/p/five-years-of-progress-in-gpts?utm_source=substack&utm_medium=email)

### Seminal documents

- [Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/pdf/1409.0473.pdf) First paper indicating the notion of 'attention' sort of mechanism.

- [Attention Is All you Need](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf) Initial paper indicating that attention is very powerful and potential replacement of LLM architectures. 

- [Formal Algorithms for Transformers in 2023](https://arxiv.org/pdf/2207.09238.pdf)
Important discussion revealing the components of Transformers.

### Positional Encoding
This component helps to remove the impilcit position-independence that 'vanilla' attention methods have.  

- [A Gentle Introduction to Positional Encoding in Transformer Models, pt1]( https://machinelearningmastery.com/a-gentle-introduction-to-positional-encoding-in-transformer-models-part-1/)

- [Transformer Language Models without POsitional Encodings STill Learn Positional Information](https://arxiv.org/abs/2203.16634) Indications that causal LMS may derive positional awareness from more than the positional embeddings: they learn it from the causal mask. 

#### Modifications
- [A Simple yet Effective Learnable Positional Encoding Method for Improving Document Transformer Model](https://aclanthology.org/2022.findings-aacl.42.pdf) They introduce a learnable sinusoidal positional encoding feed forward network. Demonstrates significant improvements over other datasets. 




## Improvements, Optimizations, and Variations. 

- [](https://github.com/neuro-inc/ml-recipe-hier-attention)

- [Scaling Transformer to 1M tokens and beyond with RMT](https://arxiv.or dsvg/abs/2304.11062) [Github](https://github.com/booydar/t5-experiments/tree/scaling-report) Uses a Recurrent Memory Transformer(RMT) architecture to extend understanding to large lengths. 

<div class="result" markdown>
!!! tip "[MEGABYTE: Predicting Million-byte Sequences with Multiscale Transformers](https://arxiv.org/pdf/2305.07185.pdf)"
    MEGABYTE segments sequences into patches and uses a local submodel within patches and a global model between patches. Very nice demonstration that allows for $O(N^{4/3}$ scaling directly on bytes, thereby bypassing tokenization requirements found with traditional transformers.

??? note 
    <img width="446" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/0c2ea874-5257-4ed8-9abb-73b8f969f356">
</div>

- [Hyena Architecture](https://arxiv.org/pdf/2302.10866.pdf) Uses inspiration from FFT to create a drop in replacement for Transformer models. 

<div class="result" markdown>
!!! tip "[Infinite former](https://arxiv.org/pdf/2109.00301.pdf)"
    Uses a representation of the input sequence as a continuous signal expressed in a combination of N radial basis functions. Promising but potentially complex. Worth consideration.

??? note
    [Github](https://github.com/deep-spin/infinite-former) 
    ![Infinity Former](https://github.com/ianderrington/general/assets/76016868/96d8efb8-46ab-4662-b62b-4763ad454a80){ align=left width="300"  loading=lazy }

### Computation Reduction

[SpQR: A Sparse-Quantized Representation for Near-Lossless LLM Weight Compression](https://arxiv.org/pdf/2306.03078v1.pdf)

### Fine Tuning

Using examples to fine-tune a model can reduce the number of tokens needed to achieve a sufficiently reasonable response. Can be expensive to retrain though.

<div class="reult" markdown>
!!! tip "[Symbol Tuning Improves in-context learning in Language Models](https://arxiv.org/pdf/2305.08298.pdf)"
 
??? note
    <img width="488" alt="image" src="https://github.com/ianderrington/general/assets/76016868/a75d4a36-0e20-4259-bd10-c7180b5468b5">


## Other modalities

### Vision

### Graphs

<div class="result" markdown>
!!! tip "[Transformers Meet Directed Graphs](https://arxiv.org/pdf/2302.00049.pdf)"
    An interesting-if-also-complex variation of Transformer GNNs that uses 'direction-aware' positional encodings to help handle both undirected and directed graphs.

??? note
    <img width="516" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/d7eea1fc-622f-43df-aff3-748fbcf462dc">
</adiv>

## Training variations
### Fairness Enablement

- [Concept Erasure](https://arxiv.org/pdf/2306.03819.pdf)

### Using Knowledge Links

- [LinkBERT](https://github.com/michiyasunaga/LinkBERT) places in the context window hyperlinked references to achieve better performance and is a drop-in replacement for BERT models. 

### Multimodal

- [Visual GPT](https://arxiv.org/pdf/2303.04671.pdf)
- [Language is not all you need](https://arxiv.org/pdf/2302.14045.pdf)
- [Meta-Transformer: A Unified Framework for Multimodal Learning](https://arxiv.org/abs/2307.10802) The first framework to perform unified learning across 12 modalities with unpaired data. It does so by learning an embedding that can be shared across the modalities. [Github](https://kxgong.github.io/meta_transformer/) 

## Abstractions

- [Looped Transformers and Programmable Computers](https://arxiv.org/pdf/2301.13196.pdf) Understanding that transformer networks can simulate complex algorithms when hardcoded with specific weights and made intoa  loop. 'Machine Learning' 'Machine code'. "We demonstrate that
a constant number of encoder layers can emulate basic computing blocks, including embedding edit operations, non-linear functions, function calls, program counters, and conditional branches. Using these building blocks, we emulate a small instruction-set computer."


## Code 
- [Hugging Face Transformers](https://huggingface.co/docs/transformers/main/index) An API to access a large number of pre-trained transformers. Pytorch based. 
- [Fast Transformers](https://github.com/idiap/fast-transformers/tree/master) A quality collection of a number of transformer implementations written in Pytorch. 
