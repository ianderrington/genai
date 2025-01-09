# Building Agents



!!! abstract "[Open GPTs](https://github.com/langchain-ai/opengpts) Enables the creation of agents and assistants, using Langchain components"

??? abstract "[The Open Source AI Assistant Framework & API](https://github.com/superagent-ai/superagent)" superagent
    [Docs](https://docs.superagent.sh/overview/overview/introduction)

??? abstract "[Agenta-AI](https://github.com/Agenta-AI/agenta) provides end-to-end LLM developer platform. It provides the tools for prompt engineering and management, ⚖️ evaluation, human annotation, and 🚀 deployment. All without imposing any restrictions on your choice of framework, library, or model." 

??? abstract "[Jarvis](https://github.com/microsoft/JARVIS/) provides essential components to enable LLM-agents to have tools. They provide ToolBench, HuggingGPT, and EasyTool at present." jarvis

??? important "[Easy Tool: Enhancing LLM-based Agents with Concise Tool Instruction](https://arxiv.org/pdf/2401.06201.pdf) provides a framework transforming diverse and lengthy tool documentation into a unified and concise tool instruction for easier tool usage" easy-tool

    **Development**
    Easy Tool follows a simple pattern of: 1. Task Planning, 2. Tool Retrieval, 3. Tool Selection and 4. Tool Execution, coupled with thoughtful prompting to enable SOT tool usage over multiple models. 

    **Problem**
    Using new tools, software,  especially can be challenging for LLMs (and people too!), especially with a poor or redundant documentation and a variety of usage manners. 
    <img width="733" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4b17492e-c227-4633-9620-437fb08ab8c9">

    **Solution**
    Easy tool provides "a simple method to condense tool documentation into more concise and effective tool instructions."

    ```markdown
         I: Tool Description Generation
         /* I: Task prompt */
         Your task is to create a concise and effective tool usage description based on the tool documentation. You should ensure the description only contains the purposes of the
         tool without irrelevant information. Here is an example:
         /* Examples */
         {Tool Documentation}
         Tool usage description:
         {Tool_name} is a tool that can {General_Purposes}.
         This tool has {Number} multiple built-in functions:
         1. {Function_1} is to {Functionality_of_Function_1} 2. {Function_2} is to ...
         /* Auto generation of tool description */ {ToolDocumentationof‘AviationWeatherCenter’} Tool usage description:
         ‘Aviation Weather Center’ is a tool which can provide official aviation weather data...
         II: Tool Function Guidelines Construction
         /* Task prompt */
         Your task is to create the scenario that will use the tool.
         1. You are given a tool with its purpose and its parameters list. The scenario should adopt the parameters in the list.
         2. If the parameters and parameters are both null, you
         should set: {"Scenario": XX, "Parameters":{}}.
         Here is an example:
         /* Examples */
         {Tool_name} is a tool that can {General_Purposes}. {Function_i} is to {Functionality_of_Function_i} {Parameter List of Function_i}
         One scenario for {Function_i} of {Tool_name} is: {"Scenario": XX, "Parameters":{XX:XX}}
         /* Auto-construction for Tool Function Guidelines */
         ‘Ebay’ can get products from Ebay in a specific country. ‘Product Details’ in ‘Ebay’ can get the product details for a given product id and a specific country.
         {Parameter List of ‘Product Details’}
         One scenario for ‘Product Details’ of ‘Ebay’ is:
         {"Scenario": "if you want to know the details of the product with product ID 1954 in Germany from Ebay", "Parameters":{"product_id": 1954, "country": "Germany"}}.
    ```
    <img width="418" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/caed1a08-4761-4809-8a05-c2d026e26281">

    **Results** 
    The performance is SOT over multiple models. ChatGPT, ToolLLaMA-7B, Vicuna-7B, Mistral-Instruct-&B and GPT-4
    <img width="820" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5a4a1b6d-986c-491e-9642-c28f6d56f771">


??? important "[Hugging GPT: Solving AI Tasks with ChatGPT and its Friends in Hugging Face](https://arxiv.org/abs/2303.17580)" hugging-gpt
    
    **Development** 
    
    Hugging GPT enables LLM models to call other models via the Hugging Face Repo
    
    **Problem**
    
    LLMs are not the best task for all tasks. Enabling LLMS to use task-specific models can improve the quality of the results.
    
    **Solution**
    Hugging GPT provides an intervace for LLMs by breaking it down into 1. Task Planning, 2. Model Selection, 3. Task Execution, and 4. Response Generation 

    <img width="724" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/293351bf-63c8-40d3-a972-90207a5e409a">
    
    <img width="740" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a5aa16d3-4468-4413-b537-fb63298b285b">
    <img width="696" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/9cd2a6f8-5d6c-47a0-81f2-74258136880a">

    **Results**
    The results provide substiantial evidence that HuggingGPT can enable successful single, sequential, and graph-based tasks.
    


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/lupantech/chameleon-llm) [🦎 Chameleon: Plug-and-Play Compositional Reasoning with GPT-4](https://github.com/lupantech/chameleon-llm)"
   [Paper](https://arxiv.org/pdf/2304.09842.pdf)
   <img width="892" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/0deb10a1-ca97-4bc3-925d-707585fbf297">


## Atomatic building Agents

??? abstract "[Automated Design of Agentic Systems](https://github.com/ShengranHu/ADAS)" adas
    **Developments** In their [paper](https://arxiv.org/pdf/2408.08435) the authors revealmeta-agents that observe adn critique prompting nd efforts to enable better agents. In their own words: 
    > "The core concept of Meta Agent Search is to instruct a meta agent to iteratively create interestingly new agents, evaluate them, add them to an archive that stores discovered agents, and use this archive to help the meta agent in subsequent iterations create yet more interestingly new agents."
    ![image](https://github.com/user-attachments/assets/1a9459c9-aecf-4c25-9231-cbd89fb51334)
    ![image](https://github.com/user-attachments/assets/3afbf915-2b0b-4b04-be85-3f04445aa697)
    ```markdown
    You are an expert machine learning researcher testing different agentic systems.
    [Brief Description of the Domain]
    [Framework Code]
    [Output Instructions and Examples]
    [Discovered Agent Archive] (initialized with baselines, updated at every iteration)
    # Your task
    You are deeply familiar with prompting techniques and the agent works from the literature. Your goal is
    to maximize the performance by proposing interestingly new agents ......
    Use the knowledge from the archive and inspiration from academic literature to propose the next
    interesting agentic system design.
    ```



## Platforms and systems for building agents

These are platforms with varying degrees of features and elements that can enable the building of agents with either/or APIs and low-code solutions. 

??? abstract "[Databerry](https://github.com/gmpetrov/databerry/)"

??? abstract "[Anything-LLM](https://github.com/Mintplex-Labs/anything-llm)"


## Resources

??? abstract "[Awesome Agents](https://github.com/slavakurilyak/awesome-ai-agents)"

