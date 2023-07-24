Raw generative models do not generally produce globally accurate outputs given input prompts. [^n1] 
[^n1]: We will be describing text-focused models in this discussion though variations can be appropriately considered for other domains and datatypes
This is due to the manner of training and next-word-prediction (or more arbitrary masked-word prediction) is probabilistically 'greedy'. Namely, within a sampling of outputs, the next-prediction will be sampled based on their _immediate_ likelihood. To improve the outputs, the models are further refined using various approaches. These approaches 'align' the output to accurately considered 

Global alignment 

Ensuring the output of models are appropriately capable of 


