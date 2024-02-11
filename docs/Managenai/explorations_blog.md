### 2024-01-31
TODO: 
Use LangGraph, With  Streamlit to look at Knowledge Graph



### 2024-01-30
Working on enabling admonitions to be shared so that there is greater viral potential of this. This required building a [mkdocs plugin](../../mkdocs-extensions/mkdocs-shareable-admonition/README.md). 
The result is any adnomitions will have the potential for a fourth component at the end of the line that gives the share-title. 
While this is a 'hacky' solution, it solves the immediate needs. 

### 2024-01-27 
#### Sharing Improvements
Realized that in order to have appropriately viral growth would need to build link sharing that would enable sharing important concept-cards or paper-cards. 

**Concept card** is a small description of a concept, with visuals, like a wiki but more succinct and contained, only providing essential references if they were derivative or otherwise necessary to still understand the concepts. 

**Paper card** is the description of a paper, with visuls, that allows the paper to be understood and maybe used *directly*. 

These would need to be enabled through admonitions. 

Looked into it, and it might be possible?

Here is how it would happen. 
An mkdocs plugin is built. This Plugin would:
1. Look for admonitions elements in markdown files
2. For admonition elements that have extra input that is known as 'share-name'
3. For these components, the full admonition block is extracted (with 'share-name' removed) and copied into to a temporary markdown file of the same name. This markdown file is added to the 'to process' list for markdowns to be rendered... 
4. The extracted markdown is not rendered in the full mkdocs template with menus and what not, just as a mkdocs html. It is rendered individually so that it can be embededed into the iframe. (or some variant). This rendered html, will also have a link back to the original document, to allow easier tracking. This html will also have meta-tags allowing for link unfurling. The html admonition will not render the title of the admonition, just the elements.
5. In the original document, document, a 'share' button is given, that points to the extracted URL. The admonition retains the title. It will embed an iframe pointing to the compiled html of the extracted markdown. 



!!! question "Does this allow iframe"
    <iframe src="contributing.html"></iframe>

### 2024-01-23
#### Working on Summarization chain interface. 

https://medium.com/@johnthuo/chat-with-your-pdf-using-langchain-f-a-i-s-s-and-openai-to-query-pdfs-e7bfde086155 --> Nice and simple. Faiss + OpenAI
https://medium.com/@gaurav.jaik86/building-an-ai-powered-chat-with-pdf-app-with-streamlit-langchain-faiss-and-llama2-affadea65737

####  Working on pdf extraction to markdown.
Build something: 
`python genai/kg/pdf_extract.py downloads/pdf/arxiv/1904.10509/*`
But it does HORRIBLE job at preserving the math formats 
This is somthing that does all of the stuff: https://github.com/raahii/arxiv-formula-extractor
Another option: https://www.reddit.com/r/Oobabooga/comments/16n7dm8/how_to_go_from_pdf_with_math_equations_to_html/
Translates them to html: https://github.com/arxiv-vanity/arxiv-vanity which uses this: https://github.com/arxiv-vanity/engrafo

In general, we will just not worry about this presently 
<a id="MyHeading"></a>
Found this one https://github.com/VikParuchuri/marker?tab=readme-ov-file
Installed it and it worked well. It doesn't extract images though, and it requires poetry and tesseract, meaning that a docker image is the only way to run it effectively. 
It is also non-commercial use, so all information from this needs to be used appropriately
docker with tesseract: https://stackoverflow.com/questions/73318168/how-do-i-add-tesseract-to-my-docker-container-so-i-can-use-pytesseract
poetry with docker https://medium.com/@albertazzir/blazing-fast-python-docker-builds-with-poetry-a78a66f5aed0
It also didn't work. 
Note that this is very slow... approximately 30 seconds/pdf file. 

Still need: extract images and tables from PDFS. 

### 2024-01-22
Built things
* Checked out VRSEN/agency-swarm and it was OK. 

### 2024-01-21
* Created a genai/submodule connections pattern to allow for consistent 'calling' of modules based on what I've had to do or go-through. 

- That is in submodule-connections. 
* explored 'assefelevoic/gpt-researcher' code as part of this. 

TODO: Create a system to automatically create these abilities to call it. 

Explored (https://github.com/tomasonjo/llm-movieagent)
It uses the neo4j semantic layer. 
https://python.langchain.com/docs/templates/neo4j-semantic-layer
has a solid ingest function. 
It still behaves oddly as admitted by main author... likely requires better partitioning: less abstraction, as I could not see how that worked well.
Found that it didn't work so well. Learned that this is the 'semantic layer' and added that as a concept in the agent memory. The Sematnic Layer doesn't do so well it seems. 

* Read about [Experiential Co-Learning of Software-Developing Agents](https://arxiv.org/pdf/2312.17025.pdf) and how cool it is to have agents that share memory
* Chat dev had a list of 1800 structure Agents in the file ChatDev/SRRD/data/data_attribute_format.csv... 

### 2024-01-20
* Installed the ChatDev repo from OpenBMB to see if it would work, and it stalled somewhere. --> To Come back to!
* Installed the ChatGPT Researcher Had to install rust
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
* Worked on improving agents/chains and cognitive architectures. 

### 2024-01
Made the `doc_graph_generation.py` to enable dock graph extraction of what is found in documentation

```bash 
conda activate genai2
python genai/kg/doc_graph_generation.py -s -v -g test_graph.gf -r 'docs'
```