The components of model classes include a number of operations. 

## Activation Functions

start="<!--start-activations-->"

%}
### Softmax
Softmax is an activation function that computes a probability-like output for logistic outputs. Generally given in the form

(softmax(x))𝑖=exp(𝑥𝑖)∑𝑗exp(𝑥𝑗)
$$
softmax(x_i) = \exp(x_i)/\sum_j\exp(x_j)
$$

#### Is softmax Off by 1? 

Based on some observations by [Qualcom](https://arxiv.org/pdf/2306.12929.pdf), where "97%+ of outlier activations in LLMs occur in whitespace and punctuation positions.”  there was indication that it is important to have 'no attention' given to some tokens.
Adding a $1$ to the demonimator allows for `no attention` to be had. This is describe [here](https://www.evanmiller.org/attention-is-off-by-one.html), discussed [here](https://news.ycombinator.com/item?id=36851494) and already found in the [flaxformer](
https://github.com/google/flaxformer/blame/ee62754ebe5a5eeb111493622de5537133822e3e/flaxformer/components/attention/dense_attention.py#L50) architecture. A general conclusion is that it is likely more important for highly quantized weights, but 32 and 16 bit dtypes are probably unaffected. 

end="<!--stop-stop activations-->"
