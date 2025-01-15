GenAI, while promising, presents a variety of challenges at multiple levels. These challenges can also be viewed as _risks_, emphasizing their significance. Although some solutions to these challenges are referenced in this document, it's important to note that these challenges are not fully 'solved'. 

The challenges associated with GenAI can be broadly categorized into [technical challenges](#technical-challenges) and [ethical challenges](#ethical-challenges). Technical challenges pertain to the practical aspects of implementing and using GenAI, while ethical challenges involve the potential risks and moral implications of using GenAI. 

## Technical Challenges

???+ important "Technical challenges with GenAI" technical-challenges-with-genai
    * Reducing [hallucinations](#hallucinations-and-confabulations) and improving accuracy
    * Make LLMs generate results more [quickly and cheaply](../../architectures/generating/index.md)
    * Optimize context length and context construction
    * [Training](../../architectures/training/index.md) LLMs more efficiently 
    * Improving the quality of [data](../../data/index.md)
    * Incorporating other [data modalities](../../architectures/models/multimodal.md)
    * Productionizing [new model architecture](../../architectures/models/developing_architectures.md)
    * Develop GPU alternatives
    * Making [agents](../../agents/index.md) usable
    * Improve learning from human preferences
    * Improving [UI/UX experience](../../building_applications/front_end/index.md) with GenAI
    
### Hallucinations and Confabulations

There are a number of issues related to modle accuracy that pose challenges for GenAI models. Most prominant among them are the effect of _Hallucinations_, or more linguistically, _confabulations_, though the former term is now firmly understood and established. Models confabulate, hallucinate, by making up facts or sentences that have no reasoanble bearing to reality.


## Ethical Challenges

???+ important "Ethical challenges with GenAI" ethical-challenges-with-genai
    * [Job displacement](#job-displacement)
    * [Copywrite and IP](#copywrite-and-ip)
    * [Dual Use](#dual-use)

In general [ethical use](../../../Using/ethically/index.md) of GenAI will necessarily be considered to address all or most of these challenges.

At a high level, the concerns for displacement and capture of people's jobs must be taken into consideration. With arguments both minimizing and amplifying the concern, estimates still have around 300 million jobs replaced by AI, [according to a Goldman Sachs report](https://www.goldmansachs.com/intelligence/pages/generative-ai-could-raise-global-gdp-by-7-percent.html). AT the same time GDP could be increased by 7% and lift productivity. It is still apparent that [upskilling](#upskilling) to enable people to work with AI as an enabling tool is important to consider.

At nearly the highest level of challenge is to have GenAI that is Aligned for the betterment of humanity and our planet and not to its detriment with [dual use](#dual-use). Because of the expansive and moral-philosophical nature of this, as in what is defining 'betterment' it is difficult. Concretely, however, minimizing potential risks associated with GenAI, especially Autonomous Agents, are necessary to address at a functional level, both at organizations and within governments and the regulatory bodies that coordinate the two.


### Job displacement

GenAI enables the automation of a large number of knowledge-based, and administrative tasks as well as creative efforts. Consequently, GenAI has already been found to enable job-displacement. In the next few years, up to [30% hours currently worked across the US economy could be automated with help of GenAI](https://www.mckinsey.com/mgi/our-research/generative-ai-and-the-future-of-work-in-america). 

#### Upskilling

Upskilling will require training employees to use GenAI to enable their work, or to find other work that GenAI is not well-suited for.

### Copywrite and IP

Related to job-displacement, the content created with GenAI remains in a precarious state with regard's to copyright and IP. While there are indications that content generated purely from AI may not be copyrighted (in the US), it is generally accepted AI can provide the basis for content that may be copyrighted. The evolution of this may take years of debate and resolution of laws to settle before confusion is fully settled.

??? note "[Talkin’ ‘Bout AI Generation](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4523551) A thorough discussion on copyright issues"
    <img width="529" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/75a1b0e9-7d4b-4db2-a0ee-f18890cce403">


### Dual Use

The technology may be found to have dual-use, or that which is harmful, _instead of helpful_ to end-recipients. 

## References

!!! note "[Open challenges in LLM research](LLMhttps://huyenchip.com/2023/08/16/llm-research-open-challenges.html#5_design_a_new_model_architecture)"