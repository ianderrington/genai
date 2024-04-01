The reverse of the phrase "garbage in, garbage out", is "goodness in, goodness out". While we can use [selection](./selection.md) to improve the quality of data, the  data augmentation can help expand the 'goodness' that can be enabled. Data augmentation can be used in areas where data is specialized, real-world, costly, scarce, or not sufficiently diverse. It can also be used to reformat or improve upon general input data by highlighting particular components about that data. It can also be used to generated higher quality data that can improve the behavior of LLM's in various manners. Large volumes of synthetic data, which can be used to train highly task-specific models.  The use of synthetic data can be considered [recurrent](../../architectures/training/recurrent.md).

## What is Data Augmentation?

Data augmentation is a process of creating new data from the existing data for model [pre-training](../../architectures/training/pre-training.md) and [fine-tuning](../../architectures/training/finetuning.md). It is a form of data that can be used to improve the performance of machine learning models. The main idea behind data augmentation is to create variations in or structure from original data, that can capture different perspectives and scenarios, thereby enriching the dataset. Both heuristics and AI-enabled algorithms be used to augment data, thought predominantly AI is used for augmentation of text-based LLMS. Data augmentation has shown direct value in nearly all domains and modalities it has been explored in. We focus here primarily on text-LLM augmentation. 

### What does Data augmentation do? 

* **Improve data quality:** Augmentation can be used to **modify** original data even to the point of removing or **filtering** the data, and to **generate** new data with higher quality.

* **Dealing with Imbalanced Data**: In many real-world scenarios, the data we have is imbalanced. Data augmentation can help balance the dataset by creating synthetic data for under-represented domains and classes.

* **Increasing Dataset Size**: Data augmentation can help increase the size of the dataset. This can be particularly useful when we have limited data for training our model.

### Why is Data Augmentation Important?

Data augmentation can Improve Model Performance.  Performans occurs because it can providing more varied data, and more consistently clean and regular data for training. This can help the model learn more embeddings and reduce the impact of lower quality data. 

!!! note
    The choice of data augmentation techniques depends on the type of data and the specific problem at hand. It is important to choose techniques that are relevant and meaningful for the given context.


## Overview of the Data Simulation Process

The process of data simulation involves several steps:

1. **Define the Goal of Simulated Data**: The first step is to identify the purpose of the augmenting the model data, with **generation**, **modification** or **filter**. 

2. **Consider formatting** to otherwise create structures of any modified or augmented data. Such structures can help to increase 

3. **Select the Prompt**: The prompt is the input that triggers the generation of synthetic data. It could be a specific command, a set of parameters, or a particular scenario.

4. **Generate and Evaluate**: After setting up the prompt, the next step is to generate the synthetic data. This data is then evaluated to ensure it meets the defined goals and quality standards.


### AI-enabled Augmentation


## Benefits
Models Phi# like [Phi-2](https://huggingface.co/microsoft/phi-2) have revealed how modifying the training data can enable significantly smaller models to perform similarly or better than much better models, as was done in 'Textbooks are all you need'. 


??? tip "[Textbooks are all you need](https://arxiv.org/pdf/2306.11644.pdf)"
    This study utilized a large volume of generated data and transformer-classifiers to filter the data and create a high-quality model. The model was trained over four days on eight A-100s and achieved outperforming results. 
    

??? note "[Rephrasing the Web: A Recipe for Compute & Data-Efficient Language Modeling](https://arxiv.org/pdf/2401.16380.pdf)" web-rephrase-augmented-pre-training

    The authors reveal that creating new training-examples from input data using an off-the-shelf model (Mistral-7B) can yield convergence speeds that are 3x without doing so. The  rephrasing is done in a manner that is 'like wikipedia' or in a 'question-answer format'. They are also done at different levels of style diversity, such as a child or a a scholar. In detailed analysis they found that:
    
    * Style diversity improves the value
    * Reasonable paraphraser models are needed
    * It is better than standard augmentation that does random deletions or synonym replacements.
    
    Here is one of a few example rephrasing prompts: 
    ```markdown
    “For the following paragraph give me a paraphrase of the same in high-quality English language as in sentences on Wikipedia”
    ```
    <img width="556" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/343f2dfa-0ab6-47f0-b695-a5ddefe838c4">


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/GAIR-NLP/ReAlign) [Reformatted Alignment]([Reformatted Alignment](https://github.com/GAIR-NLP/ReAlign)) demonstrates that reformatting responses of instruction data with to pre-established criteria and collated evidence improves alignment, factuality, and readability." realign-reformatted-alignment

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


## Useful Resources

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/google-research/syn-rep-learn) [StableRep: Synthetic Images from Text-to-Image Models Make Strong Visual Representation Learners]([StableRep: Synthetic Images from Text-to-Image Models Make Strong Visual Representation Learners](https://github.com/google-research/syn-rep-learn))"
    This research paper by Google Research delves into the use of synthetic images generated from text-to-image models for training visual representation learners.

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/shacklettbp/madrona) [Madrona]([Madrona](https://github.com/shacklettbp/madrona))"
    Madrona is a prototype game engine designed for creating high-throughput, GPU-accelerated simulators. These simulators can run thousands of virtual environment instances and generate millions of aggregate simulation steps per second on a single GPU.

!!! abstract "[TuNA](https://replit.com/@olafblitz/tuna-asyncio?v=1&ref=blog.langchain.dev#main.py) for using LangChain to create volumes of synthetic data pairs."
    [Blog](https://blog.langchain.dev/introducing-tuna-a-tool-for-rapidly-generating-synthetic-fine-tuning-datasets/)



