There are different categories for Agents, which are often either by the environment in which they act or by the manner in which they are used. 

**Environments**

1. Human+Chat-agents
1. Autonomous chat-agents
1. Agent-systems
1. Physical-input agents

**Purpose:**

* Do simple/single things: perhaps ephemeral. 
* Do a complex task that may require simple things. Very likely enduring, especially if they are expert systems.. 
* Doing a list set of complex tasks, perhaps more continuously enduring. 

### Agent Examples

Here are a few examples. Because agents are hard to disentangle from core components, we describe more throughout, especially in the section on [cognitive architectures](./cognitive_architecture.md)

??? code "[Fresh LLMs](https://github.com/freshllms/freshqa that propose FreshQA, a dynamic QA benchmark, and FreshPrompt that allows LLMs to stay up to date"
    - [Paper](https://arxiv.org/pdf/2310.03214.pdf)
    
    <img width="558" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/b9cc4b22-3f98-40db-adfe-728a434abb72">
    It also includes question-premise checking to help minimize hallucination
    <img width="555" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/e272bc63-a0a0-4735-a2d6-da79b6840107">



??? code "[Reasoning on Graphs: Faithful and Interpretable Large Language Model Reasoning](https://github.com/RManLuo/reasoning-on-graphs)"
    In their [paper](https://browse.arxiv.org/pdf/2310.01061.pdf) they present a Planning-Retrieval-Reasoning framework that called 'Reasoning on Graphs' or RoG.
    RoG generates ground plans enabled by KGs which are then used to retrieve reasoning paths for the LLM. 
    <img width="576" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/a05f9e37-72ab-421d-8a54-0c3ef78c9302">


??? tip "[Large language models as tool makers](https://arxiv.org/pdf/2305.17126.pdf) [Github](https://github.com/ctlllll/llm-toolmaker) Allows high-quality tools to be reused by more lightweight models."
    <img width="545" alt="image" src="https://github.com/ianderrington/general/assets/76016868/fc0d79fd-54b7-493b-93a4-5eafd76584a6">


??? tip "[CREATOR: Disentangling Abstract and Concrete Reasonings of Large Language Models through Tool Creation](https://arxiv.org/pdf/2305.14318.pdf)"
    <img width="750" alt="image" src="https://github.com/ianderrington/general/assets/76016868/0762aaaf-871e-495c-b560-f4e019c8020e">
    <img width="1012" alt="image" src="https://github.com/ianderrington/general/assets/76016868/81b88f7e-af2e-424e-9cb8-0e377bc141c0">


??? tip "[smolai](https://github.com/ThomasEwing04/SMOL_AI) https://www.youtube.com/watch?v=zsxyqz6SYp8&t=1s An interesting example"

??? code "[Agent-GPT](https://github.com/reworkd/AgentGPT)"
    [Website](https://agentgpt.reworkd.ai/) 

!!! tip "[GPT Engineer](https://github.com/AntonOsika/gpt-engineer)"

??? tip "[DevOpsGPT](https://github.com/kuafuai/DevOpsGPT)"
    ```
    Through the above introduction and Demo demonstration, you must be curious about how DevOpsGPT achieves the entire process of automated requirement development in an existing project. Below is a brief overview of the entire process:
    ```
    ![image](https://github.com/ianderrington/genai/assets/76016868/5e60c94c-7c03-4667-ae5f-3a9282cf30c4)
    ```

    
        Clarify requirement documents: Interact with DevOpsGPT to clarify and confirm details in requirement documents.
        Generate interface documentation: DevOpsGPT can generate interface documentation based on the requirements, facilitating interface design and implementation for developers.
        Write pseudocode based on existing projects: Analyze existing projects to generate corresponding pseudocode, providing developers with references and starting points.
        Refine and optimize code functionality: Developers improve and optimize functionality based on the generated code.
        Continuous integration: Utilize DevOps tools for continuous integration to automate code integration and testing.
        Software version release: Deploy software versions to the target environment using DevOpsGPT and DevOps tools.
    ```

??? tip "[UniversalNER](https://arxiv.org/pdf/2308.03279.pdf) Used ChatGPT to distill a much smaller model for a certain domain,"
    ```
    "Large language models (LLMs) have demonstrated remarkable generalizability, such as understanding arbitrary entities and relations. Instruction tuning has proven effective for distilling LLMs into more cost-efficient models such as Alpaca and Vicuna. Yet such student models still trail the original LLMs by large margins in downstream applications. In this paper, we explore targeted distillation with mission-focused instruction tuning to train student models that can excel in a broad application class such as open information extraction. Using named entity recognition (NER) for case study, we show how ChatGPT can be distilled into much smaller UniversalNER models for open NER. For evaluation, we assemble the largest NER benchmark to date, comprising 43 datasets across 9 diverse domains such as biomedicine, programming, social media, law, finance. Without using any direct supervision, UniversalNER attains remarkable NER accuracy across tens of thousands of entity types, outperforming general instruction-tuned models such as Alpaca and Vicuna by over 30 absolute F1 points in average. With a tiny fraction of parameters, UniversalNER not only acquires ChatGPT’s capability in recognizing arbitrary entity types, but also outperforms its NER accuracy by 7-9 absolute F1 points in average. Remarkably, UniversalNER even outperforms by a large margin state-of-the-art multi-task instruction-tuned systems such as InstructUIE, which uses supervised NER examples. We also conduct thorough ablation studies to assess the impact of various components in our distillation approach. We will release the distillation recipe, data, and UniversalNER models to facilitate future research on targeted distillation."
    ```
    https://arxiv.org/pdf/2308.03279.pdf
    https://github.com/universal-ner/universal-ner


??? important "[Suspicion-Agent: Playing imperfect Information Games with Theory of Mind Aware GPT-4](https://github.com/CR-Gjx/Suspicion-Agent)"
    Introduces directly into the prompts a Theory-of-Mind about their awareness and own estimations and will update accordingly." 
    <img width="648" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/7d3d171c-5bae-4942-9469-ace20c4ef62b">
    <img width="678" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c1a762f6-5729-4d4f-8bb8-c288d7d639a0">

??? code "[CLIN: A Continually Learning Language Agent for Rapid Task Adaptation and Generalization](https://allenai.github.io/clin/)"
    An agent that stores a memory involving action, rationale, and result so that it can improve doing certain tasks. It uses a lookup to identify things that it needs to do and likely causal relations to decide to work on it.
    The code is a little Academic, but generally readable here [Github](https://github.com/allenai/clin/blob/main/scienceworld/clin_agent.py#L10). 
    
    On the ScienceWorldEnv environment simulator it performed reasonably well. 
    
    <img width="816" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ccc0d2aa-4eab-4ffa-bfa4-7b9a0f7587d1">
    
    ![image](https://github.com/ianderrington/genai/assets/76016868/7a9cffc3-1f67-4ea2-8368-8380f323f16a)
    <img width="814" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/af71d9db-a542-4289-a833-d16ca5e9b574">


## Libraries

!!! code "[Robo GPT](https://github.com/rokstrnisa/Robo-GPT)"

!!! code "[Chrome-GPT](https://github.com/richardyc/Chrome-GPT): an experimental AutoGPT agent that interacts with Chrome"
    



