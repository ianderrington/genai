
### 2024-01-23
####  Working on pdf extraction to markdown.
Build something: 
`python genai/kg/pdf_extract.py downloads/pdf/arxiv/1904.10509/*`
But it does HORRIBLE job at preserving the math formats 
This is somthing that does all of the stuff: https://github.com/raahii/arxiv-formula-extractor
Another option: https://www.reddit.com/r/Oobabooga/comments/16n7dm8/how_to_go_from_pdf_with_math_equations_to_html/
Translates them to html: https://github.com/arxiv-vanity/arxiv-vanity which uses this: https://github.com/arxiv-vanity/engrafo

In general, we will just not worry about this presently 

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