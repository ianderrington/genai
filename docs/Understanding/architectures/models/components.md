The components of model classes include a number of operations. 

## Activation Functions

<!--start-activations-->

### Softmax
Softmax is an activation function that computes a probability-like output for logistic outputs. Generally given in the form

$$
(softmax(x))𝑖=exp(𝑥𝑖)∑𝑗exp(𝑥𝑗)

softmax(x_i) = \exp(x_i)/\sum_j\exp(x_j)
$$

#### Is softmax Off by 1? 

Based on some observations by [Qualcom](https://arxiv.org/pdf/2306.12929.pdf), where "97%+ of outlier activations in LLMs occur in whitespace and punctuation positions.”  there was indication that it is important to have 'no attention' given to some tokens.
Adding a $1$ to the demonimator allows for `no attention` to be had. This is describe [here](https://www.evanmiller.org/attention-is-off-by-one.html), discussed [here](https://news.ycombinator.com/item?id=36851494) and already found in the [flaxformer](
https://github.com/google/flaxformer/blame/ee62754ebe5a5eeb111493622de5537133822e3e/flaxformer/components/attention/dense_attention.py#L50) architecture. A general conclusion is that it is likely more important for highly quantized weights, but 32 and 16 bit dtypes are probably unaffected. 

<!--stop-activations-->

## Embeddings
<!--start-embeddings-->
Embeddings play a key role in AI as they translate [tokens](../data/tokenizing.md) into numerical representation that can be processed by the AI. 

'What are Embeddings' is an essential [read](http://vickiboykis.com/what_are_embeddings/) that elucidates the concept of embeddings in a digestible manner. For a deeper dive, check the accompanied [Github](https://github.com/veekaybee/what_are_embeddings/blob/main/README.md) page.
<!--stop-embeddings-->