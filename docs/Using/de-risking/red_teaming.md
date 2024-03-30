# Red Teaming in AI

Generative models are primarily designed to predict the next token. However, this does not necessarily ensure that the model will excel in generating text that aligns with external requirements.

While standard testing may help identify flaws within the test sets, and fixes can be incrementally developed to address these flaws, such as with Reinforcement Learning from Human Feedback (RLHF), red-teaming aims to identify ways in which behaviors that are identified as misaligned can be successfully extracted by manipulating the model's inputs.

!!! quote "Definitions"
    **Red-teaming** is a form of evaluation that uncovers model vulnerabilities that could lead to undesirable behaviors. ^N1
    **Jailbreaking** is another term for red-teaming where the Language Model (LLM) is manipulated to bypass its guardrails." ^N1

## Red Teaming Approaches

Red teaming can be conducted through manual or automated approaches. Each has its own advantages and can be chosen based on the specific requirements and constraints of the project.

### Manual Approaches

Manual red teaming involves human testers who attempt to exploit the vulnerabilities of the AI model. This approach allows for creative and unpredictable testing scenarios that may not be covered by automated methods. However, it can be time-consuming and may not be feasible for large-scale models.

### Automated Approaches

Automated red teaming uses programmed scripts or tools to test the AI model. This approach can cover a wide range of scenarios in a short amount of time, making it suitable for large-scale models. However, it may not be able to cover as many unique and creative scenarios as manual testing.

??? abstract "[Custom GPT Security Analysis](https://github.com/sherdencooper/prompt-injection) provides research and systems to use adversarial prompts to evaluate GPT's"
   <img width="575" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/4b99aae5-4f96-4f37-a30a-6c214a379a4d">
   [Paper](https://arxiv.org/pdf/2311.11538.pdf)

## Attack methods

### Divergence ATtacks

??? note "[Scalable Extraction of Training Data from (Production) Language Models](https://arxiv.org/pdf/2311.17035.pdf)"
   "Developed a new divergence attack that causes the model to diverge from its chatbot-style generations and emit training data at a " high rate.

## Further Reading

For more information on red teaming in AI, consider the following resources:

^N1: [Hugging Face](https://huggingface.co/blog/red-teaming)

<<< end input
