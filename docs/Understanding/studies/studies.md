We are in an age of experimental applied mathematics. Often times we do not know what the results of a particular model or method will be until it is programmed and evaluated. Though often times theory-can inform the best ways forward, we are still far from from a unified theory of AI, (or even intelligence for that matter) and we will likely always be learning things. 

For GenAI and LLMs, much of what has been learned has been surmised or known only in the gist. More thorough understanding has occurred through painstaking experiments, and anecdotal and statistical evaluations of models and methods. Still, we don't always know 'how' they are able to do what they do. 

It is debated that sufficiently large models exhibit 'emergence'. While not always defined universally, this can be considered as the ability for the model to perform tasks beyond what they initially were trained to do, or to be 'greater than the individual sum of the parts'. While this distinction may be of merit it remains a popular arena for academic debates. 


## References


- [Transformers learn through gradual rank increase](https://huggingface.co/papers/2306.07042) They "identify incremental learning dynamics in transformers, where the difference between trained and initial weights progressively increases in rank. We rigorously prove this occurs under the simplifying assumptions of diagonal weight matrices and small initialization. Our experiments support the theory and also show that phenomenon can occur in practice without the simplifying assumptions."

<div class=markdown>
  !!!tip "[Grokking](https://pair.withgoogle.com/explorables/grokking/)"
      When training, if test loss starts to increase while the training loss continues to go down, it is often considered to be memorization. With hyperparameters (weight decay) extremely long training may result in the test loss eventually going down, allowing for generalization to occur. While not fully understood, it is important to be aware of this phenomenon. 
</div>
