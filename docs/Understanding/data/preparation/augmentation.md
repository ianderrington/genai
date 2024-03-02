
Data augmentation is a strategy that enables practitioners to increase the quality and/or diversity of data available for training models, without actually collecting new data. 

## What is Data Augmentation?

Data augmentation is a process of creating new data from the existing data for model [pre-training](../../architectures/training/pre-training.md) and [fine-tuning](../../architectures/training/finetuning.md). It is a form of [synthetic data](synthetic.md) generation that can be used to improve the performance of machine learning models. The main idea behind data augmentation is to create variations in or structure from original data, that can capture different perspectives and scenarios, thereby enriching the dataset. Data augmentation has shown direct value in nearly all domains and modalities it has been explored in. We focus here primarily on text-LLM augmentation. 

### Why is Data Augmentation Important?

Data augmentation is important for several reasons:

1. **Improving Model Performance**: Data augmentation can help improve the performance of models by providing more varied data, and more consistently clean and regular data for training. This can help the model learn more embeddings and reduce the impact of lower quality data. 

2. **Dealing with Imbalanced Data**: In many real-world scenarios, the data we have is imbalanced. Data augmentation can help balance the dataset by creating synthetic data for under-represented domains and classes.

3. **Increasing Dataset Size**: Data augmentation can help increase the size of the dataset. This can be particularly useful when we have limited data for training our model.


!!! note
    The choice of data augmentation techniques depends on the type of data and the specific problem at hand. It is important to choose techniques that are relevant and meaningful for the given context.


## Types of Data Augmentation

Both heuristics and AI can be used to augment data, thought predominantly AI is used for augmentation of text-based LLMS. 

### AI-enabled Augmentation

??? code "[Reformatted Alignment](https://github.com/GAIR-NLP/ReAlign) demonstrates that reformatting responses of instruction data with to pre-established criteria and collated evidence improves alignment, factuality, and readability." realign-reformatted-alignment

    **Develpoments** By reformatting instruction data in a consistent manner, and connecting it with a Google Search API, the results are able to generate higher quality data that is ReAligned' resulting in improvements over several models, judged both by GPT-4 and people. 
    
    <img width="619" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/0e024b17-a3bf-440f-9605-54636db1d81b">

    <img width="656" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/1953f494-583e-47bd-8dca-8958cc9020ce">
    <img width="588" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/226afec2-8d79-4af4-834d-f67af0006348">

    [Paper](https://arxiv.org/pdf/2402.12219.pdf)

??? tip "[Rephrasing the Web: A Recipe for Compute and Data-Efficient Language Modeling](https://arxiv.org/html/2401.16380v1)" rephrasing-the-web
    
    **Developments** The authors demonstrate Web Rephrase Augmented Pre-training (WRAP) an instruction-tuned model prompted to paraphrase documents for pre-training LLMs on real and synthetic rephrases. They demonstrate speed up of pretraining by about 3-fold, while demonstrating model performance gains of more than 2%, due to incorporating style diversity reflective of downstream evaluation style, and because it is higher quality than web-scraped data. 
    
    <img width="888" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/970ced84-ad1d-464b-8fbf-cc92ddc26406">

    **Method** They repharse documents on the web in four different styles: "(i) Easy (text that even a toddler will understand); (ii) Medium (in high quality English such as that found on Wikipedia); (iii) Hard (in terse and abstruse language); (iv) Q/A (in conversation question-answering format)." Here are the prompts:

    **Easy Style**
    
    A style designed to generate content understandable by toddlers.
    
    ```bash
    A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the questions. USER: For the following paragraph give me a paraphrase of the same using a very small vocabulary and extremely simple sentences that a toddler will understand:
    ```
    
    **Hard Style**
    
    A style designed to generate content comprehensible primarily to scholars using arcane language.
    ```bash
    A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the questions. USER: For the following paragraph give me a paraphrase of the same using very terse and abstruse language that only an erudite scholar will understand. Replace simple words and phrases with rare and complex ones:
    ```
    
    **Medium Style**
    
    A style designed to generate content comparable to standard encyclopedic entries.
    
    ```bash 
    A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the questions. USER: For the following paragraph give me a diverse paraphrase of the same in high quality English language as in sentences on Wikipedia:
    ```
    
    **Q/A Style**
    
    A style intended to convert narratives into a conversational format.
    
    ```bash
    A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the questions. USER: Convert the following paragraph into a conversational format with multiple tags of "Question:" followed by "Answer:":
    ```
    


