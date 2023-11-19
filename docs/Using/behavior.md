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
