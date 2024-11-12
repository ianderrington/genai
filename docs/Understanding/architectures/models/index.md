MANGEN: This entire document needs to be reorganized and revised.

The models for Generative AI consist of the computational components that are trained to generate outputs conditioned upon given inputs. While computational models may be used to generate impressive new content, as for traditional state-machines that make output choices based on heuristics, they differ from those that are data-informed. 

## Architecture Genres

* Encoder-Decoder (EDT), is also sequence-to-sequence.
* Encoder-only: (BERT)
* Decoder-only (GPT) Next-token
* Multi-domain decoder-only transformer (Gato)


## Model Classes
Different model classes of models can often be used with multiple types of model learning. Because of their present degree of quality present model Architectures tend to be transformer-based, or diffusion-based, or made from any other sufficently capable AI method. While Generative Adversarial Networks, [GANS](https://en.wikipedia.org/wiki/Generative_adversarial_network) were the initially most successful, the challenges in training them successfully can be difficult to surmount. Below we describe the model classes in greater detail.

- [Transformers](./transformers.md)
- [Reinforcement Learning](./reinforcement_learning.md)
- [Diffusion models](./diffusion_models.md)
- [Generative Adversarial Networks](./gans.md)
- [Developing Architectures](./developing_architectures.md)

## Model Domains

While there is a great deal in several primary domains of Generative AI, Text, Image, sound, video, there are many other modalities that are of interest. Here we share prominent and interesting methods for these domains. These models will often rely on [tokenization](../../data/tokenizing.md). Once tokenized, the transformed projected in some way to an _embedding vector_ that can be used by  downstream LLM's, as well as vector-databases.

## Multi-Modal Models

Multi-modal Large Language Models (MLMMs) enable us to connect information from different domains, and bring us closer to artificial general intelligence. 

It can be challenging to fuse different domains of data, such as text and images, for a number of reasons. Here are some essential concepts to consider when working with or building MLMMs.

There are two general methods to create MLMMS: 

1. **Early Fusion**: Combine data modalities and then train a singular model to begin with. 
1. **Late Fusion**: Create separate language models for different modalities and then combine the models under a fine-tuning objective.

Each of these offers different benefits and challenges. 

??? important "[How to Bridge the Gap between Modalities: A Comprehensive Survey on Multi-modal Large Language Model](https://arxiv.org/pdf/2311.07594.pdf)"
    
TODO: Clip paper

??? important "[Meta Transformer](https://arxiv.org/pdf/2307.10802.pdf) Combines embedding in from 12 modalities by adjoining individual models and flattening them together."
    <img width="868" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f366d75d-43fd-4101-84e6-53baa49b64ab">
    [Github](https://github.com/invictus717/MetaTransformer)


### Vision-Language Models
Vision Language models are among the most prominent of models beyond language models. They are often based on [transformer](./transformers.md) though there are some unique requirements in them. There are some interesting ways of considering how to the different domains in ways that may have applicability across models. Here are a few useful considerations.  

??? tip "[SPAE: Semantic Pyramid AutoEncoder for Multimodal Generation with Frozen LLMs](https://arxiv.org/pdf/2306.17842.pdf) A really cool idea that uses pyramidal representations and compresses information into text-tokens of different levels."

    It can be reconstructed as needed. These tokens then could be used in novel image generation via semantic mapping with an LLM.
    <img width="1252" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e64de0a0-0e8b-4d2e-9c0e-bb89fcdd67e8">

??? tip "[Towards Language Models That Can See: Computer Vision Through the LENS of Natural Language](https://arxiv.org/pdf/2306.16410.pdf) Represents images into language and combines them with a Frozen LLM to produce output."
    <img width="843" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/efb3e439-ba1e-45f1-90c3-840b393c45df">
    <img width="853" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/dd327581-60d6-4e2e-a503-5aa1871c903c">
    [Github](https://github.com/ContextualAI/lens)
    [Website](https://contextual.ai/introducing-lens/)

### Tabular Models
- [Challenges in End-to-End Neural Scientific Table Recognitions](https://ieeexplore.ieee.org/abstract/document/8978078)

## Model Fusion

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/fanqiwan/fusellm) [KNOWLEDGE FUSION OF LARGE LANGUAGE MODELS](https://github.com/fanqiwan/fusellm)" fuse-llm
    **Developments** FuseLM provides a manner and method of combining different LLMs to train a new `fused` model based on the probabilistic output of each of the different LLMs. 
    <img width="1269" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/30e0e6ab-1976-4a26-af60-17df09fe2b05">
    <img width="972" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/edc7593e-2eab-4916-ac27-291f28eba122">



## Common Components
The components of model classes include a number of functional operations. 

### Activations

!!! important "Softmax" softmax
    Softmax is an activation function that computes a probability-like output for logistic outputs. Generally given in the form
    
    The softmax function with temperature that you're asking about can be expressed in the following form:
    
    $$ p_i = \frac{e^{z_i/\theta}}{\sum_{j=1}^K e^{z_j/\theta}} $$
    
    Where:
    - $$p_i$$ is the probability for the i-th class
    - $$z_i$$ is the i-th logit (input to softmax)
    - \theta is the temperature parameter
    - K is the number of classes
    
    Key points about this equation:
    
    1. The temperature parameter $\theta$ appears in both the numerator and denominator, dividing each logit $$z_i$$.
    
    2. As $\theta$ approaches 0, the distribution becomes more peaked (harder), concentrating most of the probability mass on the largest logit.
    3. As T increases, the distribution becomes more uniform (softer), spreading probability mass more evenly across all classes.
    4. When T = 1, this reduces to the standard softmax function.
    5. The term $$e^{z_i/T}$$ is equivalent to $$(e^{z_i})^{1/T}$$, which shows how the temperature acts as an exponent to the exponential term.
    
    By tuning the temperature parameter, you can effectively control the "peakiness" or "softness" of the output probability distribution, which can be crucial for various machine learning applications.
    
    Key properties of the softmax function include:
    
    1. **Normalization**: The output values sum to 1, making them interpretable as probabilities.
    
    2. **Exponentiation**: The use of $$e^{z_i}$$ ensures all outputs are positive.
    
    3. **Relative scale**: Larger input values result in larger probabilities, while preserving the relative ordering of the inputs.
    
    4. **Non-linear transformation**: The softmax function introduces non-linearity, which is crucial for modeling complex relationships in neural networks.

But is softmax int he present form completely apparent. Here is some research indiating that some modifications may be preferred. 

!!! important "[softmax is not enough (for sharp out-of-distribution)](https://arxiv.org/pdf/2410.01104)" adaptive-temperature
    **Developments** The authors show that for robust circuits to exist, they must generalize well to arbitrary and valid inputs. They show that as the the number of out-of-distribution tokens increase, the sharpness  decresses and the attention coefficients decrease even if they were appropriately sharp for in-distribution examples. To solve this they propose and adaptive temperature that modifies $\theta$ based on the entropy of the input coefficient, motivated by the fact that decreaseing the temperature must decrease the entropy. 
    
    <img width="542" alt="image" src="https://github.com/user-attachments/assets/39b3d084-f644-4d1b-b1ce-a4a5ef8068d8">

    Their _ad-hoc_ algorithm is presented as an exxample below, using [JAX]. 
    ```python
        def adaptive_temperature_softmax(logits):
            original_probs = jax.nn.softmax(logits)
            poly_fit = jnp.array([-0.037, 0.481, -2.3, 4.917, -1.791]) # see Figure 5
            entropy = jnp.sum(-original_probs * jnp.log(original_probs + 1e-9),
            axis=-1, keepdims=True) # compute the Shannon entropy
            beta = jnp.where( # beta = 1 / theta
            entropy > 0.5, # don’t overcorrect low-entropy heads
            jnp.maximum(jnp.polyval(poly_fit, entropy), 1.0), # never increase entropy
            1.0)
            return jax.nn.softmax(logits * beta)
    ```



!!! note "Is softmax Off by 1?"

    Based on some observations by [Qualcom](https://arxiv.org/pdf/2306.12929.pdf), where "97%+ of outlier activations in LLMs occur in whitespace and punctuation positions.”  there was indication that it is important to have 'no attention' given to some tokens.

    Adding a $1$ to the demonimator allows for `no attention` to be had. This is describe [here](https://www.evanmiller.org/attention-is-off-by-one.html), discussed [here](https://news.ycombinator.com/item?id=36851494) and already found in the [flaxformer](https://github.com/google/flaxformer/blame/ee62754ebe5a5eeb111493622de5537133822e3e/flaxformer/components/attention/dense_attention.py#L50) architecture.

    A general conclusion is that it is likely more important for highly quantized weights, but 32 and 16 bit dtypes are probably unaffected.



## Embeddings
Embeddings play a key role in AI as they translate [tokens](../../data/tokenizing.md) into numerical representation that can be processed by the AI.

'What are Embeddings' is an essential [read](http://vickiboykis.com/what_are_embeddings/) that elucidates the concept of embeddings in a digestible manner. For a deeper dive, check the accompanied [Github](https://github.com/veekaybee/what_are_embeddings/blob/main/README.md) page.

### Position Embeddings

Position embedding is an essential aspect of transformer-based attention models -- without it the order of tokens in the sequence would not matter. 

A common manner of including positional embeddings is to _add_ them to the text embeddings. There are other manners of including embeddings. 

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/microsoft/DeBERTa) [Deberta: Decoding-Enhanced Bert with Disentangled Attention](https://github.com/microsoft/DeBERTa)"
    [Paper](https://arxiv.org/pdf/2006.03654.pdf)
    The authors herein describe a manner of including embeddings in a manner that enables position-dependence but does not require addition of the embeddings. 
    

## General Literature

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/RUCAIBox/LLMSurvey) [A Survey of Large Language Models](https://github.com/RUCAIBox/LLMSurvey)"
    [Paper](https://arxiv.org/pdf/2303.18223.pdf)


## TO SORT

  * [HuBERT: Self-Supervised Speech Representation Learning by Masked Prediction of Hidden Units](https://ieeexplore.ieee.org/abstract/document/9585401)
  * [Generating Diverse High-Fidelity Images with VQ-VAE-2](https://arxiv.org/pdf/1906.00446.pdf)
  * Token Embedding: Mapping to a vector space.
  * Positional Embedding: Learned or hard-coded mapping to position of sequence to a vector space


