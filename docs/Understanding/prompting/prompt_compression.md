## Prompt Compression

Prompt compression provides methods of compressing prompt inputs in such a way that it will yield equivalent results for downstream result generation.

??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/microsoft/LLMLingua?) [(Long)LLMLingua: Compressing Prompts for Accelerated Inference of Large Language Models](https://github.com/microsoft/LLMLingua?)"

    [Paper: LongLLMLingua: Accelerating and Enhancing LLMs in Long Context Scenarios via Prompt Compression](https://arxiv.org/pdf/2310.06839.pdf)
    [Paper: LLMLingua: Compressing Prompts for Accelerated Inference of Large Language Models](https://arxiv.org/pdf/2310.05736.pdf)
    The authors demonstrate the use of smaller language models to identify and remove non-essential tokens in prompts, enabling up to 20x compression with minimal performance loss. The method is designed to generate a compressed prompt from an original prompt. Using a budget controller to dynamically allocate compression ratios for different components prompts to maintain semantic integrity under high compression ratios.
    
    ![image](https://github.com/ianderrington/genai/assets/76016868/fa37f948-b1c0-4886-a1fb-1dad2ca435c0)
    <img width="544" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ea698dc3-2d05-4b40-9e77-722bf5ccbd79"></img>

    **Pseudo Code**
    <img width="321" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/0817d223-e806-4d16-9c31-c85124b248a7"></img>
    <img width="307" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/40ef2794-7924-4882-a1bd-2d090428c017"></img>
