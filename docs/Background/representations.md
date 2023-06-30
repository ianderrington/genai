

Data, represented on disk in binary, though perhaps read in different digital representations  is broken up into individual units called tokens. These tokens, corresponding to contiguous strings of 

## Digital Representations
Digital representations relates to how data is encoded into memory (short, long) in any way. When it comes to text, the most common representations are utf8 and ascii. It is possible, and potentially useful to consider pure 'binary' representations, especially when considering multimodal data (see below).

## Tokenization

- [Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/abs/1508.07909) Indicates that breaking up words can offer high value results (2015)


### Multimodal

- ‼️ [Bytes are all you need](https://arxiv.org/pdf/2306.00238.pdf) Reveals that just taking file bytes into transformer technology can directly enable improvements in performance accuracy. The accuracy method varies based on encoding method. Their model is called ByteFormer [Github](https://github.com/apple/ml-cvnets/tree/main/examples/byteformer)
 
## Tokenization

- [Tiktoken](https://github.com/openai/tiktoken) uses BPE and is theoretically used in GPT models. Can be used on pure-binary and limited character data (I've checked!). 
- [Token Monster](https://github.com/alasdairforsythe/tokenmonster) Uses 35% fewer tokens and uses a top-down approach, instead of a bottom-up constructive approach. Likely of high value. 

### Special tokens

There are special tokens that are used by high-level interpreters on what next to do. 

```markdown
START_TOKEN
STOP_TOKEN 
MASK_TOKEN
MODALITY_TOKEN
```

`mask_token`, `bos_token` (beginning of sequence), `eos_token`
  
## Embeddings
‼️[What are Embeddings](http://vickiboykis.com/what_are_embeddings/)[Github](https://github.com/veekaybee/what_are_embeddings/blob/main/README.md)

##