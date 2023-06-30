## Transformers
- [Amazing Presentation on Transformers](https://docs.google.com/presentation/d/1ZXFIhYczos679r70Yu8vV9uO6B1J0ztzeDxbnBxD1S0/mobilepresent?fbclid=IwAR18pR_Mf46mkZ1_E3NFOwYY2wVx0aATficgfh_GWZd29c_lWNRa4vK5zy8&slide=id.g31364026ad_3_2)


### Basic Transformer information
- [Attention Is All you Need](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf) Initial paper indicating that attention is very powerful and potential replacement of LLM architectures. 
- [Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/pdf/1409.0473.pdf) First paper indicating the notion of 'attention' sort of mechanism.




### Improvements
- [Infinite former](https://arxiv.org/pdf/2109.00301.pdf) <img width="302" alt="image" src="https://github.com/ianderrington/general/assets/76016868/96d8efb8-46ab-4662-b62b-4763ad454a80"> Uses a representation of input sequence as a continuous signal expressed in a combination of N radial basis functions. Promising but potentially complex. Worth consideration [Github](https://github.com/deep-spin/infinite-former)


### GPT
- [Illustrated GPT](http://jalammar.github.io/illustrated-gpt2/)
- [How GPT3 works](https://jalammar.github.io/how-gpt3-works-visualizations-animations/)
- [Five years of progress in GPTs](https://finbarrtimbers.substack.com/p/five-years-of-progress-in-gpts?utm_source=substack&utm_medium=email)
Excellent summary of the progress of GPT over time, revealing core components, optimizations, and essential variations to the major Foundation model architectures.



  
- [Formal Algorithms for Transformers in 2023](https://arxiv.org/pdf/2207.09238.pdf)
Important discussion revealing the components of Transformers.

### LLM Model Variations

To improve length:
- [Scaling Transformer to 1M tokens and beyond with RMT](https://arxiv.org/abs/2304.11062) [Github](https://github.com/booydar/t5-experiments/tree/scaling-report) Uses a Recurrent Memory Transformer(RMT) architecture to extend understanding to large lengths. 
- ‼️[MEGABYTE: Predicting Million-byte Sequences with Multiscale Transformers](https://arxiv.org/pdf/2305.07185.pdf) MEGABYTE segments sequences into patches and uses a local submodel within patches and a global model between patches
- [Hyena Architecture](https://arxiv.org/pdf/2302.10866.pdf) Uses inspiration from FFT to create a drop in replacement for Transformer models. Quite complex and maybe overhyped.
  
## Improvements and Optimizations

### 

[SpQR: A Sparse-Quantized Representation for Near-Lossless LLM Weight Compression](https://arxiv.org/pdf/2306.03078v1.pdf)

### Fine Tuning

Using examples to fine-tune a model can reduce the number of tokens needed to achieve a sufficiently reasonable response. Can be expensive to retrain though.
- [Symbol Tuning IMproves in-context learning in Language Models](https://arxiv.org/pdf/2305.08298.pdf)
<img width="488" alt="image" src="https://github.com/ianderrington/general/assets/76016868/a75d4a36-0e20-4259-bd10-c7180b5468b5">


## LLM Model Optimizations



### Fairness Enablement

- [Concept Erasure](https://arxiv.org/pdf/2306.03819.pdf)

### Training variations

- [LinkBERT](https://github.com/michiyasunaga/LinkBERT) places in the context window hyperlinked references to achieve better performance.  

### Multimodal

* ‼️ [Visual GPT](https://arxiv.org/pdf/2303.04671.pdf)
* ‼️ [Language is not all you need](https://arxiv.org/pdf/2302.14045.pdf)

## Abstractions

- [Looped Transformers and Programmable Computers](https://arxiv.org/pdf/2301.13196.pdf) Understanding that transformer networks can simulate complex algorithms when hardcoded with specific weights and made intoa  loop. 'Machine Learning' 'Machine code'. "We demonstrate that
a constant number of encoder layers can emulate basic computing blocks, including embedding edit operations, non-linear functions, function calls, program counters, and conditional branches. Using these building blocks, we emulate a small instruction-set computer."
