
## Methods of optimization 

There are two general targets to consider in optimizing proteins: **Evolutionary**, that starts from a specific protein and aims to optimize it, and **De Novo**, which builds more indirectly around a particular goal or outcome without specific reference to an individual protein. 

### Considerations of optimization 
There are components of include 

- [Protocol optimization](#protocol-optimization)
- [Sequence optimization](#molecule-optimization)
- [Reagent optimization](#measurement-optimization)

#### Sequence optimization 
The protein protein sequence may is a primary target of optimization because the sequence has direct impact over the enzyme's structure and function. 

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/evo-design/evo) [Evo: DNA foundation modeling from molecular to genome scale]([Evo: DNA foundation modeling from molecular to genome scale](https://github.com/evo-design/evo))" evo
    **Developments**
    [Paper](https://www.biorxiv.org/content/10.1101/2024.02.27.582234v2.full.pdf)

#### Reagent optimization

Proteins do not function in isolation, but in a surrounding environment of agents and reagents. While protein sequences are of immediate itnerest because of potential gains of information, rea-gent types and  concentrations will powerfully govern the quality of synthesized products. A protein that has been evaluated in one condition, is unlikely  to be optimial in another condition, and similarly, an protein that is optimized based on sequence, may not be optimal in new conditions. It may be useful to use reagent-optimization to reduce or eliminate potentially harmful or toxic material. 


??? tip "[Exploring Optimal Reaction Conditions Guided by Graph Neural Networks and Bayesian Optimization (2022)](https://pubs.acs.org/doi/10.1021/acsomega.2c05165)"
    **Developments** The authors present a n approach that determines `suitable` conditions for organic reactions using Bayesina Optimization that is guided by Graph Neural Networks trained on organic synthesis data. The resulting algorithm is better than other state of art and human-optimization by over 8%. 




#### Protocol optimization

Similarly to _reagents_, the overall protocol in how a reagent or set of reagents are combined may significantly impact not just the quality of the results, but costs and disposal considerations that may need to be considered as well. The protocols may be followed by people, or for more fully automous systems, written into code or pseudo-code that can be injested by robotic systems. For both practical and ethical reasons, it is important to _evaluate_ protocols before following them, lest the results be a potentially avoidable waste of time due to failed outcomes, or potentially harmful because they are not effectively understood. 


   

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/bioplanner/bioplanner) [BioPlanner: Automatic Evaluation of LLMs on Protocol Planning in Biology]([BioPlanner: Automatic Evaluation of LLMs on Protocol Planning in Biology](https://github.com/bioplanner/bioplanner))"

    <img width="642" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/3a7cfe64-03b9-4ecb-aeac-f18c66902c91">
    
    Abstract: The ability to automatically generate accurate protocols for scientific experiments would represent a major step towards the automation of science. Large Language Models (LLMs) have impressive capabilities on a wide range of tasks, such as question answering and the generation of coherent text and code. However, LLMs can struggle with multi-step problems and long-term planning, which are crucial for designing scientific experiments. Moreover, evaluation of the accuracy of scientific protocols is challenging, because experiments can be described correctly in many different ways, require expert knowledge to evaluate, and cannot usually be executed automatically. Here we present an automatic evaluation framework for the task of planning experimental protocols, and we introduce BioProt: a dataset of biology protocols with corresponding pseudocode representations. To measure performance on generating scientific protocols, we use an LLM to convert a natural language protocol into pseudocode, and then evaluate an LLM's ability to reconstruct the pseudocode from a high-level description and a list of admissible pseudocode functions. We evaluate GPT-3 and GPT-4 on this task and explore their robustness. We externally validate the utility of pseudocode representations of text by generating accurate novel protocols using retrieved pseudocode, and we run a generated protocol successfully in our biological laboratory. Our framework is extensible to the evaluation and improvement of language model planning abilities in other areas of science or other areas that lack automatic evaluation.
    [Paper](https://arxiv.org/pdf/2310.10632.pdf)

!!! tip "[A Language for Modeling and Optimizing Experimental Biological Protocols](https://www.mdpi.com/2079-3197/9/10/107) presents a Gaussian process model to optimize experimental protocols"



### To File

-  https://arxiv.org/pdf/2303.16416.pdf
-  https://arxiv.org/pdf/2304.02496.pdf
- [Biomedical simulation](https://www.biorxiv.org/content/10.1101/2023.06.16.545235v1.full.pdf)


