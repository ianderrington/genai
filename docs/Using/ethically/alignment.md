Raw generative models do not generally produce globally accurate outputs given input prompts. 

This is due to the manner of training and next-word-prediction (or more arbitrary masked-word prediction) is probabilistically 'greedy'. Namely, within a sampling of outputs, the next-prediction will be sampled based on their _immediate_ likelihood. To improve the outputs, the models are further refined using various approaches. These approaches 'align' the output to accurately considered 

Global alignment 

## References

- [OpenAI's approach to alignment research](https://openai.com/blog/our-approach-to-alignment-research)