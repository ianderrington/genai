We are in an age of experimental applied mathematics. Often times we do not know what the results of a particular model or method will be until it is programmed and evaluated. Though often times theory-can inform the best ways forward, we are still far from from a unified theory of AI, (or even intelligence for that matter) and we will likely always be learning things.

For GenAI and LLMs, much of what has been learned has been surmised or known only in the gist. More thorough understanding has occurred through painstaking experiments, and anecdotal and statistical evaluations of models and methods. Still, we don't always know 'how' they are able to do what they do.

It is debated that sufficiently large models exhibit 'emergence'. While not always defined universally, this can be considered as the ability for the model to perform tasks beyond what they initially were trained to do, or to be 'greater than the individual sum of the parts'. While this distinction may be of merit it remains a popular arena for academic debates.


##

??? note "[SEMANTIC UNCERTAINTY: LINGUISTIC INVARIANCES FOR UNCERTAINTY ESTIMATION IN NATURAL LANGUAGE GENERATION](https://arxiv.org/pdf/2302.09664.pdf)"

    <img width="908" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c45f0580-2681-40cf-91c7-57bfde4f929d">


??? tip "[Transformers learn through gradual rank increase](https://huggingface.co/papers/2306.07042)"

    They "identify incremental learning dynamics in transformers, where the difference between trained and initial weights progressively increases in rank. We rigorously prove this occurs under the simplifying assumptions of diagonal weight matrices and small initialization. Our experiments support the theory and also show that phenomenon can occur in practice without the simplifying assumptions."

??? tip "[Grokking](https://pair.withgoogle.com/explorables/grokking/)"
    When training, if test loss starts to increase while the training loss continues to go down, it is often considered to be memorization. With hyperparameters (weight decay) extremely long training may result in the test loss eventually going down, allowing for generalization to occur. While not fully understood, it is important to be aware of this phenomenon.


??? "[Multimodal Neurons in Pretrained Text-Only Transformers](https://arxiv.org/pdf/2308.01544.pdf)"
    Neat demonstration "finding multimodal neurons in text-only transformer MLPs and show that these neurons consistently translate image semantics into language."

??? "[Scaling Data-Constrained Language Models](https://arxiv.org/pdf/2305.16264.pdf) Demonstrations that repeated token use is less valuable than new token use."

    [Github](https://github.com/huggingface/datablations)
    <img width="539" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ddd534a2-915f-417d-a6e2-6091d425fa02">


??? "[Studying Large Language Model Generalization with Influence Functions](https://arxiv.org/pdf/2308.03296.pdf)"

??? "[Calibrated Language Models Must Hallucinate](https://arxiv.org/pdf/2311.14648.pdf)"
    The authors demonstrate that in pre-trained models that are calibrated, have a hallucination rate that is proportional to the 'mono-fact' rate within the training data. Calibrated models are those that predict next tokens with a probabilities corresponding to their observation frequency.

    ```markdown
        "pretraining LMs for predictive accuracy leads to hallucination even in an ideal world where the
        training data is perfectly factual, there is no blur between facts and hallucinations, each document
        contains at most one fact, and there is not even a prompt that would encourage hallucination"
    ```
