Behavior refers to  the way in which onme acts or conducts oneself, especially towards others. GenAI is no different, especially when using Natural languages, though it can be applied to the way other modalities 'behave' as well.

For language models, there is are concerns regarding their ability to command, self regulate, and grow, and parts of those will involve examining their behavior.

In order to better understand the risks, both large and small, it is essential examine their behavior.

While there are many traits that one might be looking for, there are a few that are often emphasized. Traits can be changed through changing any aspect of the model, such as with finetuning and  RLHF.

Traits can be relevant to mutliple levels of the model. From how it performs, with with traditional measurmeents of performance [link], to how it is percieved by people based on its responses to their inputs.

Here we share some important research that provide useful manners of looking at models and how they behave. The behaviors might not always be universal, but sometimes they have potential to be more broadly applicable.

!!! note "[Discovering Language Model Behaviors with Model-Written Evaluations](https://arxiv.org/pdf/2212.09251.pdf)"
    They use LLM's to generate testing sets to do evaluations on 154 different things to help understand the models and how training finetuning/RLHF impacts the output.
    [Evaluations here](https://github.com/anthropics/evals).
    Interestingly they can see changes in important traits like 'self preservation' that change with more training.
    <img width="313" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e3fa38a1-9eb8-411e-8100-8f127738ac4b">

    <img width="301" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/672e23d2-78bb-4ef5-af21-48d0d28e8ce1">

    <img width="276" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a00fedf1-2be7-4d07-9cb3-dc79b7692695">

    <img width="277" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5449d13b-ed2c-4b21-86f3-fcc298f87a98">


    <img width="298" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5de40246-ca47-4166-bfa4-ab4300a786c6">


!!! note "[How do How do LLMs recall facts](https://www.alignmentforum.org/.../p/iGuwZTHWb6DFY3sKB)?" 

    v/ Neel Nanda of Google DeepMind 
    "Early MLP layers act as a lookup table, with significant superposition! They recognise entities and produce their attributes as directions. We suggest viewing fact recall as a black box making "multi-token embeddings. 
    Our hope was to understand a circuit in superposition at the parameter level, but we failed at this. We carefully falsify several naive hypotheses, but fact recall seems pretty cursed. We can black box the lookup part, so this doesn't sink the mech interp agenda, but it's a blow.
    Importantly, though we failed to understand *how* MLP neurons look up tokens to attributes, we think that *once* the attributes are looked up, they are interpretable, and there’s important work to be done (eg with Sparse Autoencoders) decoding them. 
    We show that, more generally, early layers specialise in processing nearby tokens, only going long-range in mid-layers. If you truncate the context to the nearest 5-10 tokens and look at similarity of residual streams, it starts high and sharply drops. But it’s not a hard rule. 
    Despite the MLP layers being in high superposition, with many distributed or polysemantic neurons, we found a baseball neuron! It was causally relevant and systematically fired for baseball players, though it also did other things on the full data distribution 
    To find the baseball direction we first trained probes, but later found mechanistic probes - the baseball unembed times the OV circuit of key heads, gives a more principled probe, without needing to train one! We think this is a cool technique we’d love to see more work on. 
    This has interesting parallels with 
    this work showing relationship decoding (in fact recall) is a linear map - we speculate that the maps they find are mostly the OV circuits of key attention heads. 
    https://arxiv.org/pdf/2308.09124.pdf
    More generally, linear probes have a lot of promise as a technique for circuit analysis. By layer 6(/32) the sport is known with high accuracy, so it suffices to zoom in on early MLP layers to understand factual recall, rather than needing to understand the full circuit! 
    Some weird observations - we'd love to see future work!
    Early layers do longer-range processing on common words and punctuation, intuitively, it’s easier to figure out meaning without context than for a token in a multi-token word. 
    On random names if you probe for a sport, there’s often a confident (nonsense) answer, but the model doesn’t output this answer. Why? Turns out the fact extractor heads don't look. Their *key* represents if it's an athlete, their value represents the sport, and it does an AND. "
    Fact Finding: Attempting to Reverse-Engineer Factual Recall on the Neuron Level 
    https://www.alignmentforum.org/.../p/iGuwZTHWb6DFY3sKB
    ]