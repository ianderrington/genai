Generative models are generally built to do one thing: predict the next token. This by no means will guarantee that the model does well in generating text that is aligned with external requirements.

While standard testing might allow one to identify flaws within the test sets, and fixes may be gradually built in to account for the flaws, such as with RLHF, red-teaming seeks to identify the manners in which behaviors that are identified out of alignment, can be successfully extracted by manipulating the inputs to the models. 

More specifically: 

!!! quote "Definitions"
    **Red-teaming** is a form of evaluation that elicits model vulnerabilities that might lead to undesirable behaviors. ^N1
    **Jailbreaking** is another term for red-teaming wherein the LLM is manipulated to break away from its guardrails." ^N!

## Essential reading
^N1: [Hugging Face](https://huggingface.co/blog/red-teaming)
