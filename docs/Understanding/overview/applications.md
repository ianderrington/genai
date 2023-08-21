We explores different activities and fields that utilize Generative AI's capabilities and provide a few notable references for each. For an overview of applications (and challenges), we highly recommend [Challenges and Applications of Large Language Models](https://arxiv.org/pdf/2307.10169.pdf)

There are many generally distinct domains of Gen()AI application, though many be compositional. Effectively any information that can be recorded onto a computer may be made by Gen()AI.

* Language
* Visual 2D
* Visual 3D
* Visual 2D with time
* Visual 3D with time
* Brain recordings
* Weather patterns
* Protein folding 


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

### Building Knowledge Graphs

Knowledge graphs can be created with the help of Generative AI. Understanding relationships between pieces of information allows the technology to create visual representations of connections, improving information processing.

- [GPT for knowledge graphs](https://medium.com/@m-elbably/gpt-graph-a-simple-tool-for-knowledge-graph-exploration-70e0e3861716) and [Github](https://github.com/m-elbably/gpt-graph)

- [Ontology mapping](https://medium.com/@peter.lawrence_47665/encouraging-results-for-knowledge-graph-extraction-by-llm-ontology-prompting-60a7e5dcaf0a)

### Language translation
Generative AI is inceasingly good at translating between domains. 

### Personal assistants and memory
- [Quiver](https://github.com/StanGirard/quiv) A LLM for self second brain. 


### Code Generation

Very powerfully it can generate code to accomplish a task based on natural language input. This is very promising but still requires human oversight, due to the [challenge](./challenges.md) associated with using Automated AI systems without human input or oversight.

- [Wizard Coding](https://github.com/nlpxucan/WizardLM/tree/main/WizardCoder)
- [AutoPR](https://github.com/irgolic/AutoPR)
- [Codium pr-agent](https://github.com/Codium-ai/pr-agent) 
- [Summarization with Langchain](https://github.com/EnkrateiaLucca/summarization_with_langchain) A splendid view of a quick streamlit app that does PDF summarization. 

### Applicaton and component replacement

- [GPT as backend](https://github.com/RootbeerComputer/backend-GPT)

### Sound and Music Generation

- [AudioCraft (Meta)](https://ai.meta.com/blog/audiocraft-musicgen-audiogen-encodec-generative-ai-audio/)

### Audio Visual Generation

- [Showrunner Agents](https://fablestudio.github.io/showrunner-agents/)

## Fields
Here are a few fields where Gen()AI is already having formative impacts. 

### Robotics

- [CLAIRIFY](https://ac-rad.github.io/clairify/) Translates English to domain-specific languages like robots. 
  - https://arxiv.org/abs/2303.14100
- [RT-2](https://robotics-transformer2.github.io/assets/rt2.pdf) An impressive demonstration of multi-step fusing (PaLI-X) and Pathways Language model Embodied (PaLM-E) as components of it. 

### Science

??? tip "[Emergent autonomous scientific research](https://arxiv.org/pdf/2304.05332.pdf)"
    <img width="658" alt="image" src="https://github.com/ianderrington/general/assets/76016868/7fd5c4ce-9468-4cf2-a9b9-d3913b66e656">


### Healthcare

- [Health system-scale language models are all-purpose prediction engines](https://www.nature.com/articles/s41586-023-06160-y) Uses LLM based system to integrate real time clinical workflows with note-writing and electronic ordering. Generally quite-performant and. a great indication of how they could be used to predict things such as readmission rates, and many other applications. 

- [LLMs encode clinical knowledge](https://www.nature.com/articles/s41586-023-06291-2)

### Chemistry

??? tip "[Grammar-Induced Geometry for Data-Efficient Molecular Property Prediction](https://openreview.net/pdf?id=SGQi3LgFnqj) IMPORTANT uses heirarchichal metagraphs to stitch-together molecular nodes. " 
    This results in leaves that are 'actual' molecules. Using graph neural-diffusion, it does amazingly well even with minimal data-sets (100 examples).
    <img width="1052" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/50894091-fdc9-4a8f-9836-90cec4a147d0"> 


### Biology

- [Evolutionary-scale prediction of atomic-level protein structure with a language model](https://www.science.org/doi/10.1126/science.ade2574) End to end Language model enabling structure sequence pairing, coupled with an equivariant transformer structure model at the end. 
-  https://arxiv.org/pdf/2303.16416.pdf
-  https://arxiv.org/abs/2304.02496
- [Biomedical simulation](https://www.biorxiv.org/content/10.1101/2023.06.16.545235v1.full.pdf)

### Kinesiology 

- [Motion GPT](https://github.com/openmotionlab/motiongpt)


## Societal simulations

- [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/pdf/2304.03442.pdf): 
  They gave 25 AI agents motivations & memory, and put them in a simulated town. Not only did they engage in complex behavior.The actions were rated more human than humans roleplaying.
  Demo: https://t.co/pYNF4BBveG

### Finance

- [ML for trading (NOT LLM based)](https://github.com/stefan-jansen/machine-learning-for-trading)
- https://github.com/irgolic/AutoPR
- [Finance GPT](https://github.com/ai4finance-foundation/fingpt) LLMs for finance
