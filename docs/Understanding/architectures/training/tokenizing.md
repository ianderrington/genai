
In generative AI, the raw data—whether it be in text or binary input is divided into individual units termed as *tokens*. These are then made into IDs that provide a lookup table that can be used in downstream learning that allow for context aware [embedding representations](../models/embedding.md).

## Understanding Tokenization
Tokenization is the process of splitting data into these individual units. Broken up as The choice of a token largely depends on the data type and the expected outcome of the AI. In text data, for instance, tokens often correspond to single words or subwords. These tokens can be represented in one-hot encoding, or as an ID.

Tokenization can be have a pre-processing phase, called pre-tokenization that will use regular expressions for defining patterns for text segmentation. GPT-2 and GPT-4 do that as well as one called punct.

There are many types of tokenizers, including Byte-Pair Encoding (BPE), WordPIece and SentencePiece. 

???+ note "Pre-tokenization methods"
    <img width="445" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/050ce1cc-2d11-4d98-a178-af706d149aa9">

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/karpathy/minbpe) [Minimal BPE tokenizer by Andrej Karpathy](https://github.com/karpathy/minbpe) provides a understandable and efficient demonstration of several modern tokenizing methods including BPE, RegExp, BPE and GPT-4. "


### Character Tokenizers
Character tokenizers represent individual characters as tokens, creating very small representations. The do not often, 

### Word tokenizers
Word tokenizers break up text in a rule-base fashion that allow whole tex to be split into diffent units. Because of the large number of words, and variations, it would be necessary to maintain a large vocabulary, that causes memory and computation-complexity issues. [spaCy](https://spacy.io/) and [Moses](http://www.statmt.org/moses/?n=Development.GetStarted) are two common word tokenizers.

### Subword Tokenizers

A subword unit, or a part of a word, can be a token in itself. 


#### Byte-Pair Encoding

The paper titled [Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/pdf/1508.07909.pdf) introduced Byte-Pair encoding to create subword to allowing for highly common character patterns to be compressed into tokens, thereby reducing vocabulary-size requirements. 


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/openai/tiktoken) [Tiktoken](https://github.com/openai/tiktoken) is a fast BPE tokenizer for use with OpenAI models"

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/alasdairforsythe/tokenmonster) [Token Monster](https://github.com/alasdairforsythe/tokenmonster) is an ungreedy subword tokenizer and vocabulary generator, enabling language models to run faster, cheaper, smarter and generate longer streams of text. " token-monster
    ![image](https://github.com/ianderrington/genai/assets/76016868/97a33624-1281-49d9-aa3a-9a4bedd689f0)

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/google/sentencepiece) implements subword units (e.g., byte-pair-encoding (BPE) [Sentence Piece](https://github.com/google/sentencepiece) implements subword units (e.g., byte-pair-encoding (BPE) and unigram language model"

??? important "[Unigram Language Model (Kudo)](https://arxiv.org/pdf/1804.10959.pdf) introduces subword regularization, which trains the model with multiple subword segmentations probabilistically sampled during training" 

    Effectively, this takes aliasing-like effects that cause different tokenization. It is more effective because it breaks it down in different ways.

!!! important "![GitHub Repo stars](https://badgen.net/github/stars/nomic-ai/contrastors) [Fully open source tokenizer: Nomic](https://github.com/nomic-ai/contrastors)"
    [Nomic](https://blog.nomic.ai/posts/nomic-embed-text-v1) provides a disruptive tokenizer that is fully open source, with code and weights!


## Special tokens

There are special tokens that are used by high-level interpreters on what next to do.

| Token Name | Description |
| --- | --- |
| START_TOKEN or BOS_TOKEN | This is used to indicate the beginning of a sequence. BOS stands for "Beginning Of Sequence". |
| STOP_TOKEN or EOS_TOKEN | This is used to indicate the end of a sequence. EOS stands for "End Of Sequence". |
| MASK_TOKEN | This is used to represent a masked value, which the model needs to predict. |
| MODALITY_TOKEN | This is used to indicate the type of data in the sequence (such as text, images, etc.) |

## Other modalities

### Speech tokenization

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/zhangxinfd/speechtokenizer)  is a unified speech tokenizer for speech language models, which adopts the Encoder-Decoder architecture with residual vector quantization (RVQ) [Speech Tokenizer](https://github.com/zhangxinfd/speechtokenizer)  is a unified speech tokenizer for speech language models, which adopts the Encoder-Decoder architecture with residual vector quantization (RVQ)"

    ![image](https://github.com/ZhangXInFD/SpeechTokenizer/raw/main/images/speechtokenizer_framework.jpg)

### Multimodal Tokenization

Multimodal tokenization is an area of tokenization that focuses on incorporating multiple data forms or modes. This facet of tokenization has seen remarkable strides. [Bytes are all you need](https://arxiv.org/pdf/2306.00238.pdf)—a study utilizing transformer technology to input file bytes directly—demonstrates that multimodal tokenization can assist in improving the AI's performance accuracy. The researchers in the study developed ByteFormer, a model based on their study’s findings that can be accessed [here](https://github.com/apple/ml-cvnets/examples/byteformer).

### Tokenizing might not be necessary

It is regarded that tokenizing is a bit arbitrary and has disadvantages. There are promising results using methods without tokenization [MEGABYTE: Predicting Million-byte Sequences with Multiscale Transformers](https://arxiv.org/pdf/2305.07185) that "show that MEGABYTE allows byte-level models to perform competitively with subword models on long context language modeling"


### Heirarchichal Tokenization
!!! abstract "[Floret Vectors](https://explosion.ai/blog/floret-vectors)"

??? tip "[Superbloom: Bloom filter meets Transformer](https://arxiv.org/pdf/2002.04723.pdf)"
    Wherein a bloom filter is used to create tokens/embeddings.
    ![image](https://github.com/ianderrington/genai/assets/76016868/5ba71e69-7eaa-416c-b09a-940e016db145)

## Interesting research

??? important "[Getting the most out of your tokenizer for pre-training and domain adaptation](https://arxiv.org/pdf/2402.01035.pdf)"

    The authors highlight sub-optimial tokenizers hurt performance and efficiency of models, and reveal specialized Byte-Pair Encoding code tokenizers with a new pre-tokenizer with improved performance. 
    <img width="340" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/96e8d12a-5c95-4270-b41a-8e201335ecdd">
    <img width="445" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/70403f6b-68d4-4b0e-93c4-3315a91aec24">


## References

- [Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/pdf/1508.07909.pdf)
- [Bytes are all you need](https://arxiv.org/pdf/2306.00238.pdf)
- [ByteFormer Github](https://github.com/apple/ml-cvnets/examples/byteformer)
- [What are Embeddings](http://vickiboykis.com/what_are_embeddings/)[Github](https://github.com/veekaybee/what_are_embeddings/blob/main/README.md)
- [Tokenizers](https://huggingface.co/docs/transformers/en/tokenizer_summary)


- [Token Monster](https://github.com/alasdairforsythe/tokenmonster)
