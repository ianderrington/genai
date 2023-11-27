We explores different activities and fields that utilize Generative AI's capabilities and provide a few notable references for each. For an overview of applications (and challenges), we highly recommend [Challenges and Applications of Large Language Models](https://arxiv.org/pdf/2307.10169.pdf)


There is a philosophical overlap with 'predictive' AI where a predictive model could just be said to 'generate' either possible future outcomes or estimated classifications of data. 

There are many generally distinct domains of Gen()AI application, though many be compositional. Effectively any information that can be recorded onto a computer may be made by Gen()AI.

## General Modalities
MANGEN (Expand, and clarify the below )
* Language, Spoken and Written
* Visual 2D, Images, Diagrams, 
* Visual 3D
* Visual 2D with time
* Visual 3D with time
* Graphical (Relation and influence networks)
* Generally linear biological sequences (Genome, Proteome)
* Multidimensional Temporal sequences (weather, brain recordings, stock market)
* Multimodal variants of the above. 


## General Activities
There are many activities that can be used in many, if not all, fields of applications. We mention a few below:

### Summarization 

Summarization is a key application for Generative AI. It uses the technology to provide brief, accurate summaries of a larger body of text.

### Classification

With or without examples LLMs can perform classification on input, though sometimes additional supervised training may be preferred to improve accuracy.

### Semantic Search

Generative AI has the capability to understand relationships between words and concepts. By embedding an input, the technology can measure semantic, or 'meaning', nearness via distance calculations. This capability enhances the potential for memory recall with imperfect inputs and improves action routing. 

### Prose Generation

Generative AI can be utilized for a wide range of prose generation applications, such as:

- Drafting and refining text and notes.
- Brainstorming and ideation.
- Generating initial drafts for later human editing.
- Creating descriptions and explanations.
- Rewriting to target different audiences.
- Expanding on key points.
- Improving flow and readability

- [Pyprompt chatgpt](http://morganlancer.com/en/portfolio/pyprompt_chatgpt)



### Language Translation

Generative AI is increasingly good at translating between domains. 

### Personal assistants and memory
- [Quiver](https://github.com/StanGirard/quiv) A LLM for self second brain. 

### Compression

??? important "[Language Modeling Is Compression](https://arxiv.org/pdf/2309.10668.pdf) demonstrates lossless compression of text and images with upwards of 3x smaller compression."
    Uses either newly trained 200K-3M transformer models or pre-trained Chinchilla models and achieves impressive compression rates. 
    <img width="1298" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ffa8ac86-3876-4ecb-8b18-e14b47b972e5">
    Details on implementation are somewhat hidden. 


### Font generation
- [Fontogen](https://github.com/SerCeMan/fontogen) [Read more here](https://serce.me/posts/02-10-2023-hey-computer-make-me-a-font)

### Code Generation

Very powerfully it can generate code to accomplish a task based on natural language input. This is very promising but still requires human oversight, due to the [challenge](./challenges.md) associated with using Automated AI systems without human input or oversight.

- [Wizard Coding](https://github.com/nlpxucan/WizardLM/tree/main/WizardCoder)
- [AutoPR](https://github.com/irgolic/AutoPR)
- [Codium pr-agent](https://github.com/Codium-ai/pr-agent) 
- [Code AI consulting](https://github.com/AI-Citizen/SolidGPT) Allows you to 'query your code' in a chatlike manner. 

### Documentation extraction

- [Summarization with Langchain](https://github.com/EnkrateiaLucca/summarization_with_langchain) A splendid view of a quick streamlit app that does PDF summarization.

- [Deepdoctection](https://github.com/deepdoctection/deepdoctection)

### Application and component replacement

- [GPT as backend](https://github.com/RootbeerComputer/backend-GPT)

### Sound and Music Generation

- [AudioCraft (Meta)](https://ai.meta.com/blog/audiocraft-musicgen-audiogen-encodec-generative-ai-audio/)

### Audio Visual Generation

- [Showrunner Agents](https://fablestudio.github.io/showrunner-agents/)
