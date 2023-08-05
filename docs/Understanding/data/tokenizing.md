
In generative AI, the raw data—whether it be in binary, text, or a different form—is divided into individual units termed as *tokens*. These play a crucial role in easing the understanding and manipulation of data for the AI.

## Understanding Tokenization
Tokenization is the process of splitting data into these individual units. The choice of a token largely depends on the data type and the expected outcome of the AI. In text data, for instance, tokens often correspond to single words or subwords. 

### Subword Units
A subword unit, or a part of a word, can be a token in itself. The paper titled [Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/abs/1508.07909) brings to light the effectiveness of subword units in improving results. This type of tokenization was used in a neural machine translation system and it significantly improved the handling of rare words.




### Special tokens

There are special tokens that are used by high-level interpreters on what next to do. 

| Token Name | Description |
| --- | --- |
| START_TOKEN or BOS_TOKEN | This is used to indicate the beginning of a sequence. BOS stands for "Beginning Of Sequence". |
| STOP_TOKEN or EOS_TOKEN | This is used to indicate the end of a sequence. EOS stands for "End Of Sequence". |
| MASK_TOKEN | This is used to represent a masked value, which the model needs to predict. |
| MODALITY_TOKEN | This is used to indicate the type of data in the sequence (such as text, images, etc.) |


## Multimodal Tokenization
Multimodal tokenization is an area of tokenization that focuses on incorporating multiple data forms or modes. This facet of tokenization has seen remarkable strides. [Bytes are all you need](https://arxiv.org/pdf/2306.00238.pdf)—a study utilizing transformer technology to input file bytes directly—demonstrates that multimodal tokenization can assist in improving the AI's performance accuracy. The researchers in the study developed ByteFormer, a model based on their study’s findings that can be accessed [here](https://github.com/apple/ml-cvnets/tree/main/examples/byteformer).

## Significance of Embeddings
Embeddings play a key role in AI as they translate tokens into numerical representation that can be processed by the AI. 'What are Embeddings' is an essential [read](http://vickiboykis.com/what_are_embeddings/) that elucidates the concept of embeddings in a digestible manner. For a deeper dive, check the accompanied [Github](https://github.com/veekaybee/what_are_embeddings/blob/main/README.md) page.

## Tools
Examples of coding tools that facilitate tokenization include [Tiktoken](https://github.com/openai/tiktoken) which utilizes Byte Pair Encoding (BPE) for tokenization and is purportedly used in GPT models. An alternative tool is [Token Monster](https://github.com/alasdairforsythe/tokenmonster), which takes a unique top-down approach and results in almost 35% less tokens as opposed to the standard bottom-up approach.

## Essential References
- [Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/abs/1508.07909)
- [Bytes are all you need](https://arxiv.org/pdf/2306.00238.pdf)
- [Tiktoken](https://github.com/openai/tiktoken)
- [ByteFormer Github](https://github.com/apple/ml-cvnets/tree/main/examples/byteformer)
- [Token Monster](https://github.com/alasdairforsythe/tokenmonster)
- ️[What are Embeddings](http://vickiboykis.com/what_are_embeddings/)[Github](https://github.com/veekaybee/what_are_embeddings/blob/main/README.md)
- [Github page on Embeddings](https://github.com/veekaybee/what_are_embeddings/blob/main/README.md)

