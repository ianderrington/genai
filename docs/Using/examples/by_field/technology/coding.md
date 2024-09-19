### Code Generation

Very powerfully it can generate code to accomplish a task based on natural language input. 

There are ways areas where AI can enable code-creation, arranged generally from 'easiest' to 'hardest'. 

* Colaborative
  - Code explaining and repository 
  - Chat interfaces with copy-paste
  - Copilots integrated into IDEs
  
* Autonomous
  - Coding Challenges
  - PR revew
  - Issue and bug resolution
  - Issue and bug identification
  - Code-only autonomous
  - Multi-modal autonomous


- [Wizard Coding](https://github.com/nlpxucan/WizardLM/WizardCoder)
- [AutoPR](https://github.com/irgolic/AutoPR)
- [Codium pr-agent](https://github.com/Codium-ai/pr-agent)
- [Code AI consulting](https://github.com/AI-Citizen/SolidGPT) Allows you to 'query your code' in a chatlike manner.


??? abstract "![GitHub Repo stars](https://badgen.net/github/stars/microsoft/stop)  [RECURSIVELY SELF-IMPROVING CODE GENERATION](https://github.com/microsoft/stop)" self-taught-optimizer
    "In this work, we use a language-model-infused scaffolding program to improve itself. We start with a seed "improver" that improves an input program according to a given utility function by querying a language model several times and returning the best solution. We then run this seed improver to improve itself. "
    [Paper](https://arxiv.org/abs/2310.02304)

## Coding

??? abstract "[SWE-agent](https://github.com/princeton-nlp/SWE-agent) is not too shabby of a code-generating system that can read issues and make PRs" 
    It didn't pass our general tests, but we will evaluate further. 

??? abstract "[Open Hands](https://github.com/All-Hands-AI/OpenHands) to provide a powerful GUI-enablement resembling the commercial coding assistants" 

??? abstract "[AutoCodeRover: Autonomous Program Improvement](https://github.com/nus-apr/auto-code-rover/) is a fully automated approach for resolving GitHub issues (bug fixing and feature addition) where LLMs are combined with analysis and debugging capabilities to prioritize patch locations ultimately leading to a patch." 
  [Paper](https://arxiv.org/pdf/2404.05427.pdf)

??? abstract "[Alpha Codium](https://github.com/Codium-ai/AlphaCodium)"

   ...beats DeepMind's AlphaCode and their new AlphaCode2 without needing to fine-tune a model!"
  
  • [Paper](https://arxiv.org/abs/2401.08500)
  • [Blog](https://codium.ai/blog/alphacodium-state-of-the-art-code-generation-for-code-contests/)

??? abstract "[SWE-agent]( https://github.com/princeton-nlp/SWE-agent) turns LMs (e.g. GPT-4) into software engineering agents"

    "...that can fix bugs and issues in real GitHub repositories: “SWE-agent is our new system for autonomously solving issues in GitHub repos. It gets similar accuracy to Devin on SWE-bench, takes 93 seconds on average, and is open source! We designed a new agent-computer interface to make it easy for GPT-4 to edit and run code. SWE-agent works by interacting with a specialized terminal, which allows it to: 🔍 Open, scroll, and search through files✍️ Edit specific lines with automatic syntax check 🧪 Write and execute tests. This custom-built interface is critical for good performance! Our key insight is that LMs require carefully designed agent-computer interfaces (similar to how humans like good UI design)."

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/peterw/Chat-with-Github-Repo)  [Chat with github repo](https://github.com/peterw/Chat-with-Github-Repo)"

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/bigcode-project/octopack) [Octopack](https://github.com/bigcode-project/octopack) [Github](https://arxiv.org/pdf/2308.07124.pdf)"

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/semanser/codel) [Codel](https://github.com/semanser/codel)"

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/openchatai/opencopilot) [Open Copilot](https://github.com/openchatai/opencopilot)"

    ![image](https://user-images.githubusercontent.com/32633162/263495581-a0cdc888-d2de-46b7-8c0b-96e876050b6e.png)


??? example "[Design2Code: How Far Are We From Automating Front-End Engineering?](https://arxiv.org/abs/2403.03163)"
    Abstract:

    Generative AI has made rapid advancements in recent years, achieving unprecedented capabilities in multimodal understanding and code generation. This can enable a new paradigm of front-end development, in which multimodal LLMs might directly convert visual designs into code implementations. In this work, we formalize this as a Design2Code task and conduct comprehensive benchmarking. Specifically, we manually curate a benchmark of 484 diverse real-world webpages as test cases and develop a set of automatic evaluation metrics to assess how well current multimodal LLMs can generate the code implementations that directly render into the given reference webpages, given the screenshots as input. We also complement automatic metrics with comprehensive human evaluations. We develop a suite of multimodal prompting methods and show their effectiveness on GPT-4V and Gemini Pro Vision. We further finetune an open-source Design2Code-18B model that successfully matches the performance of Gemini Pro Vision. Both human evaluation and automatic metrics show that GPT-4V performs the best on this task compared to other models. Moreover, annotators think GPT-4V generated webpages can replace the original reference webpages in 49% of cases in terms of visual appearance and content; and perhaps surprisingly, in 64% of cases GPT-4V generated webpages are considered better than the original reference webpages. Our fine-grained break-down metrics indicate that open-source models mostly lag in recalling visual elements from the input webpages and in generating correct layout designs, while aspects like text content and coloring can be drastically improved with proper finetuning.

## AI-Coding Products

- [Copilot](https://copilot.github.com/) - AI pair programmer by GitHub
- [RepoCoder](https://arxiv.org/pdf/2303.12570.pdf) [Github](https://github.com/microsoft/CodeT/RepoCoder) Provides a tool to enable AI agents to generate code for existing GitHub repositories
- [TabNine](https://www.tabnine.com/) - AI code completion tool
- [DeepTabNine](https://github.com/github/DeepTabNine) - Open source version of TabNine
code completion model
- [ChatGPT](https://chat.openai.com/) Does quite well with code creation


## Other uses

!!! abstract "[GPT as backend](https://github.com/RootbeerComputer/backend-GPT)"
