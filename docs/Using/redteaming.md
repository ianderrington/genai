Generative models are generally built to do one thing: predict the next token. This by no means will guarantee that the model does well in generating text that is aligned with external requirements.

While standard testing might allow one to identify flaws within the test sets, and fixes may be gradually built in to account for the flaws, such as with RLHF, red-teaming seeks to identify the manners in which behaviors that are identified out of alignment, can be successfully extracted by manipulating the inputs to the models. 

!!! quote "Definitions"
    **Red-teaming** is a form of evaluation that elicits model vulnerabilities that might lead to undesirable behaviors. ^N1
    **Jailbreaking** is another term for red-teaming wherein the LLM is manipulated to break away from its guardrails." ^N1

### Manual Approaches
COPILOT (Expand discussion here)

### Automated Approaches
??? code "[Custom GPT Security Analysis](https://github.com/sherdencooper/prompt-injection) provides research and systems to use adversarial prompts to evaluate GPT's"       
   <img width="575" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4b99aae5-4f96-4f37-a30a-6c214a379a4d">
   [Paper](https://arxiv.org/pdf/2311.11538.pdf)


## Essential reading
^N1: [Hugging Face](https://huggingface.co/blog/red-teaming)
