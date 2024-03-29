
??? [Distributed Path Composition (by Google) ](https://arxiv.org/pdf/2403.10616)

    v/@Ar_Douillard

    An experimental mixture of experts that can be trained across the world, with no limit engineering-wise on its size, while being able to be light-weight and fast at test-time.

    Everything everywhere all at once.

    Our long-term goal is to train a network across the entire world, using all the compute.

    Thus, we need to re-visit existing architectures to limit the communication overhead, memory limit, and inference speed. 

    Current methods aren't enough!

    Before designing a new architecture, we need an underlying distributed training algorithm.

    We choose DiLoCo, that can do data-parallelism across the world.

    But DP isn't enough, We also need distributed model-parallelism to fit x-large networks! 

    DiLoCo synchronizes identical replicas, as in data-parallelism, every hundred of steps by:

    1) compute a delta "outer gradient" in the parameters space between replica and previous checkpoint
    2) communicating & averaging all outer gradients
    3) performing outer optimization 

    To also support data-parallelism, we propose a simple extension of DiLoCo:

    We synchronize a subset of the parameters, with a subset of the replicas.

    e.g. the second block 2 can be synchronized only among Pi_1 and Pi_2 to produce 2a. 

    By doing so, our model , is actually never materialized in a single location but distributed by subset.

    We pre-shard before training the dataset with k-Means, and further refine this later with a learned discriminative gater

    Each expert, denoted by Pi, is trained on a particular subset of the distribution

    Contrarily to classical MoE, routing is at sequence-level and not per-token. 

    At test-time, we don't need to full network (that would be too big to be materialized anyway).

    We can route the full sequence to a single expert path, that in our case is only of size 150M! 

    However, a typical conversation may need multiple experts, thus we propose frequent gating at test-time, by routing chunks of tokens to different experts. 

    Our final model is made of 256 paths of 150M parameters each.

    Using a single path per sequence reaches 12.39ppl on C4, much better than the equivalent dense baseline of 16.09ppl. 

    With frequent gating, we can outperform a 1B dense baseline (11.41ppl) while being significantly faster, both at train time and test time.
    

    This paper wasn't done on toy setting, but in an actual distributed system we designed.

    We had our network trained on a variety of devices (V100, A100, TPU v3, TPU v4) and across multiple countries.

    **Abstract** Progress in machine learning (ML) has been fueled by scaling neural network models. This scaling has been enabled by ever more heroic feats of engineering, necessary for accommodating ML approaches that require high bandwidth communication between devices working in parallel. In this work, we propose a co-designed modular architecture and training approach for ML models, dubbed DIstributed PAth COmposition (DiPaCo). During training, DiPaCo distributes computation by paths through a set of shared modules. Together with a Local-SGD inspired optimization (DiLoCo) that keeps modules in sync with drastically reduced communication, Our approach facilitates training across poorly connected and heterogeneous workers, with a design that ensures robustness 
    to worker failures and preemptions. At inference time, only a single path needs to be executed for each input, without the need for any model compression. We consider this approach as a first prototype towards a new paradigm of large-scale learning, one that is less synchronous and more modular. Our experiments on the widely used C4 benchmark show that, for the same amount of training steps but less wall-clock time, DiPaCo exceeds the performance of a 1 billion-parameter dense transformer language model by choosing one of 256 possible paths, each with a size of 150 million parameters.