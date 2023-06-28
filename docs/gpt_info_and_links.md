
This summarizes important research, tools, best practices, and (generally) state of art results and topics related to GPT-enabled technology. Please note that it will *not* focus on the topic of AI Ethics.  

This will be versioned with continued publications with what we find.

## Overviews

## Videos
[State of GPT by Andrej Karpathy](https://build.microsoft.com/en-US/sessions/db3f4859-cd30-4445-a0cd-553c3304f8e2)
  <img width="925" alt="image" src="https://github.com/ianderrington/general/assets/76016868/de2d3b33-9e79-407d-b3c7-5b795f330722">
<img width="918" alt="image" src="https://github.com/ianderrington/general/assets/76016868/0ecb56de-966a-40c5-8d14-1df3b4a5a89f">
<img width="282" alt="image" src="https://github.com/ianderrington/general/assets/76016868/7cea8be4-26dd-46c3-9001-fcf625e5975d">
<img width="918" alt="image" src="https://github.com/ianderrington/general/assets/76016868/a32295bd-9d88-4b31-bd10-134e11e6c546">
<img width="886" alt="image" src="https://github.com/ianderrington/general/assets/76016868/7b1c6c4b-3778-4536-8d10-03696f3624c5">
<img width="927" alt="image" src="https://github.com/ianderrington/general/assets/76016868/dc89e484-aed6-485f-9a3e-84cdfcf858d2">

- [Lex Fridman](https://www.youtube.com/@lexfridman)
- [David Shapiro](https://www.youtube.com/@DavidShapiroAutomator)
- [AI Explained](https://www.youtube.com/@ai-explained-)
- [Yannic Kilcher](https://www.youtube.com/@YannicKilcher)

- [Understanding Large Language Models](https://magazine.sebastianraschka.com/p/understanding-large-language-models)
- ‼️[Emerging Architectures for LLM Applications](https://a16z.com/2023/06/20/emerging-architectures-for-llm-applications/) A very nice high overview of the component market for LLM architectures.
- 
## Guides
- ‼️[LLM Practical Guide](https://github.com/Mooler0410/LLMsPracticalGuide) based on [paper](https://arxiv.org/abs/2304.13712).

# Services + Providers

## Competition boards
- [Hugging Face LLM leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard) An essential chart for documenting the model peformance across multiple models.

- [lmsys.org leader board](lmsys.org/blog/2023-05-10-leaderboard)
- [Foundation model Providers EU AI compliance](https://crfm.stanford.edu/2023/06/15/eu-ai-act.html)

## Models and APIs 
* [Bard](https://bard.google.com/)
* [Claud]()
* [ChatGPT](https://openai.com/blog/chatgpt)

## Building and deploying
- [Fixie](https://www.fixie.ai/)

## Models
* [Medpalm](https://arxiv.org/abs/2212.13138)
* [Llama](https://github.com/facebookresearch/llama) (Non-commercial ??)
* [Open Llama](https://github.com/openlm-research/open_llama) (Non-commercial ??)
* [UAE Falcon](https://www.tii.ae/news/uaes-falcon-40b-now-royalty-free) (Apache License)


### Image models
- [StableLM: Stability AI Language Models](https://github.com/stability-AI/stableLM/)  CC BY-SA-4.0

### MultiModal 
- [Unilm](https://github.com/microsoft/unilm) (MSFT


### LLM Training + Deployment
- ‼️[CodeTF](https://github.com/salesforce/CodeTF) From Salesforce
- ‼️[Azure Open AI samples](https://github.com/Azure/azure-openai-samples) Sample end-to-end use cases with chatbots, content generation. 
- [RLHF with DeepSpeed (Microsoft)](https://github.com/microsoft/DeepSpeed/tree/master/blogs/deepspeed-chat)
- [vLLM](https://vllm.readthedocs.io/en/latest/getting_started/installation.html) a python repo to help run LLMs. 

### LLM Prompting
- ‼️[Prompting Guide](https://www.promptingguide.ai/)
- [Wolfram Prompt Repo](https://writings.stephenwolfram.com/2023/06/prompts-for-work-play-launching-the-wolfram-prompt-repository/?mibextid=Zxz2cZ)
- ‼️[Prompt Engine (MSFT) database tool](https://github.com/microsoft/prompt-engine) MIT license





#### Plugins
- ‼️[Prompt Genius](https://chrome.google.com/webstore/detail/chatgpt-prompt-genius/jjdnakkfjnnbbckhifcfchagnpofjffo)


### Image + Movie

## Data sets
RedPajama
Pile
CommonCrawl (webscrape)
C4 (CommonCrawl)
Github
Books
Arxiv
StackExchange

- [Mini Wob++](http://miniwob.farama.org/) For web interactive environments for accomplishing different tasks. Quite useful.
- [unarXive 2022: All arXiv Publications Pre-Processed for NLP](https://arxiv.org/pdf/2303.14957.pdf)

- [Redpajama](https://www.together.xyz/blog/redpajama)
- [BIG-bench](https://github.com/google/BIG-bench/blob/main/docs/doc.md) APACHE 2.0
- [Metaseq](https://github.com/facebookresearch/metaseq/) For working with Oen pre-trained transformers (from fairseq)


## Engineering and Deployment
- [Deploying on Azure for Embeddings](https://github.com/ruoccofabrizio/azure-open-ai-embeddings-qna)
- [Integrating with Azure Services](https://www.youtube.com/watch?v=tW2EA4aZ_YQ)
- [LLM Engineering by Huyen Chip](https://huyenchip.com/2023/04/11/llm-engineering.html)
- [The whole training process by Huyen Chip](https://huyenchip.com/2023/05/02/rlhf.html)
- [Langchain service deployment](https://github.com/ajndkr/lanarky)

## Operational Toolkits for LLMops
- ‼️[Hugging Face Transformers](https://huggingface.co/transformers/v4.0.1/index.html)
- ‼️[Adapters for Hugging Face](https://adapterhub.ml/)
- ‼️[Open LLM](https://github.com/bentoml/OpenLLM)

## Foundational Programming Interfaces (Chains, agents, tools)

- ‼️[Guidance](https://github.com/microsoft/guidance/) Interleaving generation, prompting and logical control to single  continuous flow.
- ‼️[Semantic Kernel]([https://github.com/microsoft/semantic-kernel/blob/main/samples/notebooks/python/00-getting-started.ipynb](https://github.com/microsoft/semantic-kernel/tree/main))
- ‼️[Rebuff](https://github.com/woop/rebuff) a prompt injection detection service.
- ‼️[Guardrails](https://shreyar.github.io/guardrails/) To help format output and prevent improper prompts.
- [Native function calls](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_call_functions_with_chat_models.ipynb) and [json support with OpenAI](https://yonom.substack.com/p/native-json-output-from-gpt-4) 
- [AutoLabel](https://github.com/refuel-ai/autolabel) A nice pythonic system for generating semantic labels repeatedly for use in downstream datasets
- [Levanter (not just LLMS) ](https://crfm.stanford.edu/2023/06/16/levanter-1_0-release.html) Codebase for training FMs with JAX. Using Haliax for naming tensors field-names instead of indexes. (for example Batch, Feature....). Full sharding and distributable / parallelizable. 

### Langchain

- ‼️[Langchain](https://python.langchain.com/en/latest/#) A primative python or javascript based primitive 'LLM' language that enables planned and agentic AI.
  - ‼️[Langflow](https://github.com/logspace-ai/langflow) 
  - ‼️[Awesome Langchain](https://github.com/kyrolabs/awesome-langchain)
  -   - ‼️[Toolkit](https://www.toolkit.club/) Generates LangChain plugins


### LLM-Chain
- ‼️[llm-chain](https://docs.llm-chain.xyz/docs/introduction) ChatGPT and Alpaca support. Agentic with bash commands.

### Llama index
- [llama index](https://www.llamaindex.ai/) and [Github](https://github.com/jerryjliu/llama_index) for integrating data ingestion and models. 
- [LlamaHub (community library of data loaders)](https://llamahub.ai)
- [LlamaLab (cutting-edge AGI projects using LlamaIndex)](https://github.com/run-llama/llama-lab)

#### Tutorials
  - https://www.pinecone.io/learn/langchain-prompt-templates/
  - https://learn.deeplearning.ai/langchain/lesson/3/memory
 
## Others
- ‼️[Flowise](https://github.com/FlowiseAI/Flowise)
- ！[Chain Forge](https://github.com/ianarawjo/ChainForge) A data flow prompt engineering environment for evaluating ana analyzing LLM responses
- ‼️ [EmbedChain](https://github.com/embedchain/embedchain) Creates embeddings for bots to be used. 







# Education and Research
To sort 
Basics: [Distributed Training](https://neptune.ai/blog/distributed-training)
https://neptune.ai/blog/distributed-training-frameworks-and-tools
## General

- [Eight Things to Know about Large Language Models](https://cims.nyu.edu/~sbowman/eightthings.pdf?utm_source=substack&utm_medium=email)
```markdown 
 1. LLMs predictably get more capable with increasing investment, even without targeted innovation.
 2. Many important LLM behaviors emerge unpredictably as a byproduct of increasing investment.
 3. LLMs often appear to learn and use representations of the outside world.
 4. There are no reliable techniques for steering the behavior of LLMs.
 5. Experts are not yet able to interpret the inner workings of LLMs.
 6. Human performance on a task isn’t an upper bound on LLM performance.
 7. LLMs need not express the values of their creators nor the values encoded in web text.
 8. Brief interactions with LLMs are often misleading.
```

- Observations:
  1. LLM Output can be ambiguous 
  2. LLM output can be inconsistent because of stochasticity --> Prompt engineering is possible.

- [A Survey of Large Language Models](https://arxiv.org/pdf/2303.18223.pdf) A very comprehensive paper discussing LLM technology. 

### Self-supervised learning
- ‼️ [A cookbook of self-supervised Learning](https://arxiv.org/pdf/2304.12210.pdf) 

## Binary Representations
- ‼️ [Bytes are all you need](https://arxiv.org/pdf/2306.00238.pdf) Reveals that just taking file bytes into transformer technology can directly enable improvements in performance accuracy. The accuracy method varies based on encoding method. Their model is called ByteFormer [Github](https://github.com/apple/ml-cvnets/tree/main/examples/byteformer)
- 

## Tokenization
- [Tiktoken](https://github.com/openai/tiktoken) uses BPE and is theoretically used in GPT models. 
- [Token Monster](https://github.com/alasdairforsythe/tokenmonster) Uses 35% fewer tokens and uses a top-down approach, instead of a bottom-up constructive approach. Likely of high value. 


## Embeddings
‼️[What are Embeddings](http://vickiboykis.com/what_are_embeddings/)[Github](https://github.com/veekaybee/what_are_embeddings/blob/main/README.md)

##


## Metrics:
- Exact Match (EM) 

## Transformers
- [Amazing Presentation on Transformers](https://docs.google.com/presentation/d/1ZXFIhYczos679r70Yu8vV9uO6B1J0ztzeDxbnBxD1S0/mobilepresent?fbclid=IwAR18pR_Mf46mkZ1_E3NFOwYY2wVx0aATficgfh_GWZd29c_lWNRa4vK5zy8&slide=id.g31364026ad_3_2)

### Improvements
- [Infinite former](https://arxiv.org/pdf/2109.00301.pdf) <img width="302" alt="image" src="https://github.com/ianderrington/general/assets/76016868/96d8efb8-46ab-4662-b62b-4763ad454a80"> Uses a representation of input sequence as a continuous signal expressed in a combination of N radial basis functions. Promising but potentially complex. Worth consideration [Github](https://github.com/
deep-spin/infinite-former)


### GPT
- [Illustrated GPT](http://jalammar.github.io/illustrated-gpt2/)
- [How GPT3 works](https://jalammar.github.io/how-gpt3-works-visualizations-animations/)
- [Five years of progress in GPTs](https://finbarrtimbers.substack.com/p/five-years-of-progress-in-gpts?utm_source=substack&utm_medium=email)
Excellent summary of the progress of GPT over time, revealing core components, optimizations, and essential variations to the major Foundation model architectures.



  
- [Formal Algorithms for Transformers in 2023](https://arxiv.org/pdf/2207.09238.pdf)
Important discussion revealing the components of Transformers.

!!! note

  **Tasks:**

  * Chunking: breaking up into smaller chunks
  * Sequence modeling (DTransformer: NExt prediction 
  * Sequence modeling (EDTransformer): Seq2Seq mappingto different domains.
  * Classification (Etransformer): classification

  **Tokenization:** 
  Starts with a vocabulary but then must be encoded in some way. 

  * Character Level: Has very long sequences
  * Word Level: Rare words don't work
  * Subword level: Simpleset and most successful is Byte Pair Encoding
  * Special Characters: `mask_token`, `bos_token` (beginning of sequence), `eos_token`
  
 
  **Components:**
  
  * Token Embedding: Mapping to a vector space. 
  * Positional Embedding: Learned or hard-coded mapping to position of sequence to a vector space
  * Attention: Token being predicted is mapped to a query vector and tokens in context are mapped to key and value vectors. Inner products are used to combine to extract information. 
  * Bi-directional / unmasked
  * Unidirectional / masked self attetion
  * Cross attention applies attention to the primary sequence and treates the second token sequence the context. 
  * Multi-head attention. Multiple attention heads in parallel.
  * Layer normalization. Found to be computationally efficient version sets m = beta = 0 or root mean square layer normalizagion or `RMSnorm`. 
  * Unembedding: Learns to convert vector intot he vocuabulary elements. 
  
  **Architectures:**

  * Encoder-Decoder (EDT), is also sequence-to-sequence. 
  * Encoder-only: (BERT)
  * Decoder-only (GPT) Next-token 
  * Multi-domain decoder-only transformer (Gato)

  **Practical considerations**

  * Data preprocessing: Cleaning, augmenting, noising, shuffling, t
  * Architectures: sparce layers, weight-sharing
  * Training: minibatch, batch norm, weight initialization, ensembling, adversarial
  * Regularization: weight decay early stopping cross-validation, dropout, noise


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

### Fine Tuning using Distillation

Train on model trains a new model on the output of a new model. 
- [Alpaca ](https://github.com/tatsu-lab/stanford_alpaca)

### Fine tuning Optimizations

- [Full Parameter Fine-Tuning for Large Language Models with Limited Resources.](https://github.com/openlmlab/lomo) Introduces LOMO: LOw-Memory Optimization to fuse 
- 

### Adapter layers

- [AdapterHub: A Framework for Adapting Transformers](https://arxiv.org/pdf/2007.07779.pdf) [Website](https://adapterhub.ml/)
Adapters are efficient and performant layers that can optimize performance without needing to do inefficient fine-tuning. 


## RLHF

- ‼️ [RLHF basics by hugging face](https://huggingface.co/blog/rlhf) A realy good intro to parse again.
- [RLHF for Palm in Pytorch](https://github.com/lucidrains/PaLM-rlhf-pytorch)
- [AligningLargeLanguageModelsthroughSyntheticFeedback](https://arxiv.org/abs/2305.13735) Using a heirarchy of systems to 

### AI-enabled ranking

- [Can foundation models label data like humans?](https://huggingface.co/blog/llm-leaderboard) using GPT to review model outputs produced biased results. Changing the prompt doesn't really help to de-bias it. Lots of additional considerations surrounding model evaluation
- 

## Prompt and optimization
- [Large Language Models Can Self Improve](https://arxiv.org/pdf/2210.11610.pdf) Using Chain of thought to provide better examples and then fine-tune the LLM. 
- [Refiner](https://arxiv.org/pdf/2304.01904.pdf) Iteratively improves itself based on an LLM critic
<img width="713" alt="image" src="https://github.com/ianderrington/general/assets/76016868/3ac44e13-2444-4f1e-ae3b-800c9d32ce59">

- [PROMPT generator](https://huggingface.co/spaces/merve/ChatGPT-prompt-generator) To save a few words by just entering a persona and igives prompt output. 

### Manual Prompt optimization

### Auto Prompt Optimizations
[A good description of advanced prompt tuning](https://cameronrwolfe.substack.com/p/advanced-prompt-engineering)
```
AutoPrompt [5] combines the original prompt input with a set of shared (across all input data) “trigger tokens” that are selected via a gradient-based search to improve performance.

Prefix Tuning [6] adds several “prefix” tokens to the prompt embedding in both input and hidden layers, then trains the parameters of this prefix (leaving model parameters fixed) with gradient descent as a parameter-efficient fine-tuning strategy.

Prompt Tuning [7] is similar to prefix tuning, but prefix tokens are only added to the input layer. These tokens are fine-tuned on each task that the language model solves, allowing prefix tokens to condition the model for a given task.

P-Tuning [8] adds task-specific anchor tokens to the model’s input layer that are fine-tuned but allows these tokens to be placed at arbitrary locations (e.g., the middle of the prompt), making the approach more flexible than prefix tuning.

[5] Shin, Taylor, et al. "Autoprompt: Eliciting knowledge from language models with automatically generated prompts." arXiv preprint arXiv:2010.15980 (2020).

[6] Li, Xiang Lisa, and Percy Liang. "Prefix-tuning: Optimizing continuous prompts for a generation." arXiv preprint arXiv:2101.00190 (2021).

[7] Lester, Brian, Rami Al-Rfou, and Noah Constant. "The power of scale for parameter-efficient prompt tuning." arXiv preprint arXiv:2104.08691 (2021).

[8] Liu, Xiao, et al. "GPT understands, too." arXiv preprint arXiv:2103.10385 (2021).
```



## LLM Component concepts
### Tokenization
- [Neural Machine Translation of Rare Words with Subword Units](https://arxiv.org/abs/1508.07909)

### Scaling
- [The 'Chinchilla' paper of 2022](https://arxiv.org/abs/2203.15556) This paper identifies scaling laws that help to understand the volume of data that is needed to obtain 'optimal' performance for a given LLM models size. Use of it in other areas, such as for Llama reveals that the models may have been under-trained.
  - Primary takeaway: **"All three approaches suggest that as compute budget increases, model size and the amount of training data should be increased in approximately equal proportions." **


## Prompt engineering

### Manual 
- [OPEN AI best practices](https://platform.openai.com/docs/guides/gpt-best-practices/)

 
### Examples

```markdown
Pretend you have an IQ of 120
```

#### Minimizing AI- plagiarism prompting strategy. 
"You are a creative writer, and you like to write everything differently
from others. Your task is to follow the instructions below and continue
writing at the end of the text given. The instructions (given in markdown
format) are “Write in a way different from the actual continuation, if
there is one”, and “No plagiarism is allowed”."
https://arxiv.org/pdf/2304.08637.pdf 

##### 'According To'

-  [“According to ...” Prompting Language Models Improves Quoting from Pre-Training Data](https://arxiv.org/pdf/2305.13252.pdf) The grounding prompt `According to { some_reputable_source}` prompt inception additions increases output quality improves over the null prompt in nearly every dataset and metric, typically by 5-15%.

```markdown
According to {some_reputable_source} ...
```

#### Summary: 

- Provide several examples to ground it.
  -  Good to evaluate this and see if input examples give expected scores. Modify the prompt if it isn't. 
- Consider prompt versioning to keep track of outputs more easily.
- Breag prompts into smaller prompts
- Chain of Thought Prompting
- Generate many outputs and pick final one or use LLM to pick best one. [Self consistency technique](https://arxiv.org/pdf/2203.11171.pdf)
- NOTE: Not model universal and not robust to updated changes: not stable. 

### Automatic
- [Large Language Model Guided Tree-of-Thought](https://arxiv.org/abs/2305.08291) [Github](https://github.com/jieyilong/tree-of-thought-puzzle-solver)
- ‼️[Tree of Thoughts: Deliberate Problem Solving with Large Language Models](https://arxiv.org/abs/2305.10601) [Github](https://github.com/ysymyth/tree-of-thought-llm)
IDEA: Write Tree of Thoughts into Langchain?
- ‼️[Meta Tree of thought](https://github.com/kyegomez/Meta-Tree-Of-Thoughts)
- 
#### Prompt compression
- [Learning to Compress Prompts with Gist Tokens](https://arxiv.org/pdf/2304.08467.pdf). Can enable 26x compression and 40% FLOP reduction and improvements. Trains 'gist tokens' to summarize information. 

### Resources

- ‼️ [Awesome Prompts](https://github.com/f/awesome-chatgpt-prompts/blob/main/README.md?fbclid=IwAR0_nY_o0c8olt3z7d9vibGUMOrx520Ezs9ej-PNpQfzBru01R5VCpWTnNg)
- ‼️ [Prompt Engineering by Lillian Wang](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Best practices for prompt engineering](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api)
- [Chain of Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903)
- [Automatic Prompt Engineering](https://arxiv.org/abs/2211.01910) --> Gave a CoT improvement suggestion "Let's work this out in a step by step by way to be sure we have the right answer."
- [Techniques to improve reliability](https://github.com/openai/openai-cookbook/blob/main/techniques_to_improve_reliability.md#how-to-improve-reliability-on-complex-tasks) By OpenAI 
 - Give clearer instructions
 - Split complex tasks into simpler subtasks
 - Structure the instruction to keep the model on task
 - Prompt the model to explain before answering
 - Ask for justifications of many possible answers, and then synthesize
 - Generate many outputs, and then use the model to pick the best one
 - Fine-tune custom models to maximize performance



### Prompt tuning

Uses a layer to not change prompts but change the embedding of the prompts. 
- [The Power of Scale for Parameter-Efficient Prompt Tuning](https://arxiv.org/abs/2104.08691)
Boosted Prompting: few shot prompts that progressively solve more of the problem.


##### For Llama
- [For Llama](https://github.com/Lightning-AI/lit-llama)
- [MedAlpaca](https://github.com/kbressem/medAlpaca)

### Theory
- [ Prompting is Programming: A Query Language for Large Language Models](https://arxiv.org/pdf/2212.06094.pdf)


## LLM Model Optimizations

### Pruning and compression

- [SparseGPT: Massive Language Models Can Be Accurately Pruned in One-Shot](https://arxiv.org/abs/2301.00774) Remove up to ~50% parameters preserving performance
- [Scaling Expert Language Models with Unsupervised Domain Discovery](https://arxiv.org/pdf/2303.14177.pdf) Cluster-Branch-Train-Merge (c-BTM), a new way to scale sparse expert LLMs on any dataset. 
- [Github](https://github.com/kernelmachine/cbtm)
-  [SqueezeLLM](paper) They are able to have 2x fold in model size for equivalent performance in perplexity. They use 'Dense and SParce Quantization' [Github](https://github.com/SqueezeAILab/SqueezeLLM)
-  (SORT) [DeepSpeed ZeRO++](https://www.microsoft.com/en-us/research/blog/deepspeed-zero-a-leap-in-speed-for-llm-and-chat-model-training-with-4x-less-communication/) A framework for accelerating model pre-training, finetuning, RLHF updating.  by minimizing communication overhead. A likely essential concept to be very familiar with. 

- [ Awesome AGents]( A series https://github.com/e2b-dev/awesome-ai-agents) of nicely curated AGents that helps to understand the differences they might contain.

### Fairness Enablement

- [Concept Erasure](https://arxiv.org/pdf/2306.03819.pdf)

### Training variations

- [LinkBERT](https://github.com/michiyasunaga/LinkBERT) places in the context window hyperlinked references to achieve better performance.  
- [Cluster-Branch-Train-Merge (c-BTM)], a new way to scale sparse expert LLMs on any dataset Paper: https://arxiv.org/abs/2303.14177 [Github](https://github.com/kernelmachine/)

### [https://arxiv.org/pdf/2303.14177.pdf]

## Extensions

### Adapters
https://adapterhub.ml/

### Vector databases
- [Vector Databases (primer by Pinecone.io)](https://www.pinecone.io/learn/vector-database/)
Use embeddings to create query vector databases such as:
   Pinecone, Qdrant, Weaviate, Chroma as well as the incumbents Faiss, Redis, Milvus, ScaNN.


### Memory Augmented

- [Improving language models by retrieving from trillions of tokens](https://arxiv.org/pdf/2112.04426.pdf)


### Multimodal

* ‼️ [Visual GPT](https://arxiv.org/pdf/2303.04671.pdf)
* ‼️ [Language is not all you need](https://arxiv.org/pdf/2302.14045.pdf)

### Recurrent and self-improving

- ‼️ [ReAct](https://arxiv.org/abs/2210.03629) [Github](https://github.com/ysymyth/ReAct) 
  - Effectively Observe, Think, Act, Repeat. Has limited action space 
- [Reflexion](Reflexion: an autonomous agent with dynamic memory and self-reflection): "Reflexion, an approach that endows an agent with dynamic memory and self-reflection capabilities to enhance its existing reasoning trace and task-specific action choice abilities"
  - [Github](https://github.com/noahshinn024/reflexion)
  - [Inspired github](https://github.com/GammaTauAI/reflexion-human-eval) 
- [Teaching Large Language Models to Self-Debug](https://arxiv.org/abs/2304.05128) `transcoder`
<img width="865" alt="image" src="https://user-images.githubusercontent.com/76016868/231906559-758d89e4-d22a-4a3a-aa96-1d630e48651d.png">

- [Self-play GPT](https://arxiv.org/pdf/2305.10142.pdf) Uses different LLMs and different roles to provide feedback on how to improve and enable autonomous improvement while game playing. 
- [Language Models can Solve Computer Tasks](https://arxiv.org/pdf/2303.17491.pdf), [Website](https://posgnu.github.io/rci-web/), [GitHub](https://github.com/posgnu/rci-agent) USes Recursive Criticism and Improvement. Combining with Chain of Thought it is even better. The method: Plan: Critique, Improve 
  - Explicit RCI: "Review your previous answer and find problems with your answer." --> "Based on the problems you found, improve your answer." Recursively Criticizes and Improves its output. This sort of prompting outperforms Chain of Thought, and combined it works even better.  
- [GPT-Bargaining](https://github.com/FranxYao/GPT-Bargaining) Uses multiple rounds to improve negotiation tactics based on external feedback. (Manager-like)
- ‼️[RL4L Allen ai](https://arxiv.org/pdf/2305.08844.pdf) Uses smaller critique model feedback to improve larger model output with a policy gradient to fine-tune the critique model while allowing reasonable performance gains. [Github](https://github.com/allenai/RL4LMs)

- [Strategic Reasoning with Language Models](https://arxiv.org/abs/2305.19165?utm_source=substack&utm_medium=email) Uses game trees and observed and inferred beliefs to achieve closer to optimal results. Powerful to consider for inferred beliefs and interacting in situations where negotiation or games are being played.
<img width="1008" alt="image" src="https://github.com/ianderrington/general/assets/76016868/5ffa0653-a323-44a6-bff5-b49e3be6091a">
https://arxiv.org/pdf/2306.08640.pdf

### Agentic
#### Overview
- [Agents overview by Lilian Weng](https://lilianweng.github.io/posts/2023-06-23-agent)

#### Results
- [Toolformer](https://arxiv.org/pdf/2302.04761.pdf) This section describes GPT that has been enabled with more 'agency' or the ability to do better.
- [HuggingGPT of 2023](https://arxiv.org/pdf/2303.17580.pdf) This paper describes a paradigm where ChatGPT is enabled with the ability to launch other ML models based on input. It does so by creating a Task list, then by identifying appropriate models, and then executing them.
  - ‼️ [Github repo known as JARVIS here](https://github.com/microsoft/JARVIS)
  - [TaskMatrix.ai](https://arxiv.org/abs/2303.16434) seemingly from the same authors. 
- [AUTO GPT](https://github.com/Torantulino/Auto-GPT) Auto GPT
- ‼️ [GPT engineer](https://github.com/AntonOsika/gpt-engineer )
- ‼️ [BabyAGI](https://github.com/yoheinakajima/babyagi)
- ‼️ [CAMEL](https://github.com/camel-ai/camel) inception prompting to guide chat agents toward task completion. Also [implemented in Langchain](https://python.langchain.com/en/latest/use_cases/agent_simulations/camel_role_playing.html)
- [Loop GPT](https://github.com/farizrahman4u/loopgpt) A re-implementation of Auto-GPT with modularity and extensibility in mind. 
- [Chameleon GPT](https://arxiv.org/pdf/2304.09842.pdf) A multi-agentic service that is able to accomplish many separate tasks, building it compositionally. (Project Idea: build in Langchain???)
<img width="1191" alt="image" src="https://github.com/ianderrington/general/assets/76016868/0dc2f25a-0eea-42ed-a108-c90cfeed8e1d">
- [Baize: An Open-Source Chat Model with Parameter-Efficient Tuning on Self-Chat Data](https://arxiv.org/pdf/2304.01196.pdf) Parameter efficient LLama Tuning and risk minimization with a new 'Self Distillation' with Feedback to improve itself even more. RESEARCH ONLY
- ‼️[Robo-GPT](https://github.com/rokstrnisa/Robo-GPT)
- (Open source + Product) [Agent-GPT](https://github.com/reworkd/AgentGPT) and [WEbsite](https://agentgpt.reworkd.ai/) --> Doesn't have agency/tools... So it is not good. A fancy wrapper for multi-task planning and execution. Limited at present. 
- ‼️ (Open source + product) [Super-AGI](https://github.com/TransformerOptimus/SuperAGI)  --> Seemingly better than SuperAGI because more tools accessible and GUI. Allows multiple agents (no communication though)
- ‼️  [AssistGPT: A General Multi-modal Assistant that can Plan, Execute, Inspect, and Learn] (https://arxiv.org/pdf/2306.08640.pdf) [Webpage](https://showlab.github.io/assistgpt/) Uses PEIL PLan execute inspect learn. Code coming soon. 
- ‼️ [GPT Engineer](https://github.com/AntonOsika/gpt-engineer)

### Agent Improvements

- [Learning to Reason and Memorize with Self-Notes](https://adapterhub.ml/) "Allows model to deviate from input context at any time to reason and take notes"

<img width="685" alt="image" src="https://github.com/ianderrington/general/assets/76016868/e3b9ed66-18a8-451b-b29a-09815d7791d1">

- [Large language models as tool makers](https://arxiv.org/pdf/2305.17126.pdf) [Github](https://github.com/ctlllll/llm-toolmaker) Allows high-quality tools to be reused by more lightweight models.

<img width="545" alt="image" src="https://github.com/ianderrington/general/assets/76016868/fc0d79fd-54b7-493b-93a4-5eafd76584a6">

- [CREATOR: Disentangling Abstract and Concrete Reasonings of Large Language Models through Tool Creation](https://arxiv.org/pdf/2305.14318.pdf)

  <img width="750" alt="image" src="https://github.com/ianderrington/general/assets/76016868/0762aaaf-871e-495c-b560-f4e019c8020e">
<img width="1012" alt="image" src="https://github.com/ianderrington/general/assets/76016868/81b88f7e-af2e-424e-9cb8-0e377bc141c0">


### Multi-Agentic Systems
- [Can Language Models Teach Weaker Agents? Teacher Explanations Improve Students via Theory of Mind](https://arxiv.org/pdf/2306.09299.pdf) Uses Theory fo Mind to try to improve student performance. [Github](https://github.com/swarnaHub/ExplanationIntervention)

- 
!!! idea "Make an algorithm -> find a tool"
    best tool finder system. 

#### Tools
- [Certified Reasoning with Language models](https://arxiv.org/abs/2306.04031) A 'logical guide' tool that an LLM can use. 

### Measurements

[Chain of thought hub](https://github.com/FranxYao/chain-of-thought-hub)

## Applications

- [Wizard Coding](https://github.com/nlpxucan/WizardLM/tree/main/WizardCoder)


### Book Writing

- [Pyprompt chatgpt](http://morganlancer.com/en/portfolio/pyprompt_chatgpt)

### Software component replacements

- [GPT as backend](https://github.com/RootbeerComputer/backend-GPT)

### Robotics

- [CLAIRIFY](https://ac-rad.github.io/clairify/) Translates English to domain-specific languages like robots. 
  - https://arxiv.org/abs/2303.14100

### Science and Tech

- [Emergent autonomous scientific research](https://arxiv.org/pdf/2304.05332.pdf)
<img width="658" alt="image" src="https://github.com/ianderrington/general/assets/76016868/7fd5c4ce-9468-4cf2-a9b9-d3913b66e656">

#### Healthcare

- [Health system-scale language models are all-purpose prediction engines](https://www.nature.com/articles/s41586-023-06160-y) Uses LLM based system to integrate real time clinical workflows with note-writing and electronic ordering. Generally quite-performant and. a great indication of how they could be used to predict things such as readmission rates, and many other applications. 

#### Biology

- [Evolutionary-scale prediction of atomic-level protein structure with a language model](https://www.science.org/doi/10.1126/science.ade2574) End to end Language model enabling structure sequence pairing, coupled with an equivariant transformer structure model at the end. 
-  https://arxiv.org/pdf/2303.16416.pdf
-  https://arxiv.org/abs/2304.02496
-  ！[Biomedical simulation](https://www.biorxiv.org/content/10.1101/2023.06.16.545235v1.full.pdf)

### Societal simulations

- [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/pdf/2304.03442.pdf): 
  They gave 25 AI agents motivations & memory, and put them in a simulated town. Not only did they engage in complex behavior (including throwing a Valentine’s Day party) but the actions were rated more human than humans roleplaying.
  Demo: https://t.co/pYNF4BBveG

### Finance

- [ML for trading (NOT LLM based)](https://github.com/stefan-jansen/machine-learning-for-trading)

## Theory

- [Looped Transformers and Programmable Computers](https://arxiv.org/pdf/2301.13196.pdf) Understanding that transformer networks can simulate complex algorithms when hardcoded with specific weights and made intoa  loop. 'Machine Learning' 'Machine code'. "We demonstrate that
a constant number of encoder layers can emulate basic computing blocks, including embedding edit operations, non-linear functions, function calls, program counters, and conditional branches. Using these building blocks, we emulate a small instruction-set computer."


- [Scaling Expert Language Models with Unsupervised Domain Discovery](https://arxiv.org/pdf/2303.14177.pdf) "parse language models on arbitrary text corpora. Our method clusters a corpus into sets of related documents, trains a separate expert language model on each cluster, and combines them in a sparse ensemble for inference. This approach generalizes embarrassingly parallel training by automatically discovering the domains for each expert, and eliminates nearly all the communication overhead of existing sparse language models. "

# Interesting Companies:
- [Mosaic ML](https://www.mosaicml.com/blog/mpt-30b) LLM ops based company with potentially good products
- [e2b](https://github.com/e2b-dev/e2b) Write documentation, get code. 
- [Codium](https://www.codium.ai/blog/codiumai-powered-by-testgpt-accounces-beta-and-raised-11m/?utm_source=substack&utm_medium=email)
- [Why labs](https://whylabs.ai/safeguard-large-language-models) for LLM observability and other solutions.

## Content Detectors

- [Sapling AI content detector](https://sapling.ai/ai-content-detector)



## To sort and read
- [“Textbooks are all you need”](https://arxiv.org/pdf/2306.11644.pdf) A to-be opensourced high-quality model by Microsoft revealing the importance of high-quality input data. only used 4 days on 8 A-100s to train to reach out-performing results. (It also uses a lot of simulated data). Coding-focused model. 
- ‼️[RL4LMs by microsoft](https://github.com/allenai/RL4LMs/tree/main) A modular RL library to fine-tune language models to human preferences. [paper](https://arxiv.org/pdf/2305.08844.pdf)
- ‼️[Kor](https://github.com/eyurtsev/kor) For extracting strucutred data using LLMs. 
## Agentic
- [smolai](https://github.com/ThomasEwing04/SMOL_AI) https://www.youtube.com/watch?v=zsxyqz6SYp8&t=1s
### Basic Transformer information
- [Attention Is All you Need](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf) Initial paper indicating that attention is very powerful and potential replacement of LLM architectures. 
- [Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/pdf/1409.0473.pdf) First paper indicating the notion of 'attention' sort of mechanism.


- [Dataleap.xyz](Dataleap.xyz): CoPilot for research. Perhaps 'Upwork' for Ai agents...

 ‼️ Utility: - [Reliable GPT](https://github.com/BerriAI/reliableGPT) A wrapper that prevents failures due to rate limiting requests. 
Prompt management:  PromptLayer and Helicone
- Go over all of these! https://www.promptingguide.ai/techniques
- [A Prompt Pattern Catalog to Enhance Prompt Engineering with ChatGPT](https://arxiv.org/pdf/2302.11382.pdf)
- ‼️ [FastChat Covnersation]( https://github.com/lm-sys/FastChat/blob/main/fastchat/conversation.py) This very nice 'multi model' chat interface class allows for effective translation between different models. 
- ‼️ ‼️ [Quiver](https://github.com/StanGirard/quiv) A LLM for self Second brain. 
- [Chatall](https://github.com/sunner/ChatALL) To interact with multiple chatbots at the same time.
- ‼️ [LocalAI](https://github.com/go-skynet/LocalAI) drop-in replacement REST API that’s compatible with OpenAI API specifications for local inferencing.
- [Finance GPT](https://github.com/ai4finance-foundation/fingpt) LLMs for finance
- https://github.com/irgolic/AutoPR

- https://github.com/Helicone/helicone

- https://github.com/jerryjliu/llama_index
- scale.com/spellbook
- [LAION-AI](https://github.com/LAION-AI/Open-Assistant)

- [Motion GPT](https://github.com/openmotionlab/motiongpt)
