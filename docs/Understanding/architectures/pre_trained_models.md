## 🚧 It is impossible to keep up manually 🚧 

Because it is not possible to manually maintain open-source references, we refer the reader to the [Hugging face OPen LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard)

Still, below, we relay several important and foundational ones. 

## Pre trained models

Because of the costs associated with aggregating sufficient data and performing large-scale [training](../architectures/training/index.md) it is often preferrable to start with pre-trained models. They can be both [open source](#open-source) and [closed source](#closed-source) in origin, and choosing between the two of them will be an important decisions related to project requirements. 

Whatever pre-trained model that you use, to ensure they meet technical, customer, and organizational requirements it is important to  by [compare and evaluate](evaluating_and_comparing.md) them. 

Below we share important models. 

## Open Source

### Text-focused

??? tip "[Llama 2: Open Foundation and Fine-Tuned Chat Models](https://arxiv.org/pdf/2307.09288.pdf) A nearly open source set of 7B-70B models with quality performance"
    <img width="1393" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5f6a647d-c0dc-453c-9334-3632e86bc19e">

??? code "**Sept, 2023** [Mistral Transformer](https://github.com/mistralai/mistral-src)"

    [Announcement](https://mistral.ai/news/announcing-mistral-7b/)
    [Hugging Face](https://huggingface.co/mistralai)
    ![image](https://github.com/ianderrington/genai/assets/76016868/ad494e0e-c854-4866-88db-be7c379a004a)

- [Llama2](https://ai.meta.com/llama/)
- [Llama2 uncensorred](https://huggingface.co/Tap-M/Luna-AI-Llama2-Uncensored)
- [TinyLlama](https://github.com/jzhang38/TinyLlama)
- [Open Llama](https://github.com/openlm-research/open_llama)
- [UAE Falcon](https://www.tii.ae/news/uaes-falcon-40b-now-royalty-free)
- [Orca (Microsoft)](https://arxiv.org/pdf/2306.02707.pdf)
- [MosaicML](https://www.mosaicml.com/blog/long-context-mpt-7b-8k)
- [LAION-AI](https://github.com/LAION-AI/Open-Assistant) An attempted open-source version of ChatGPT"
- [Unilm](https://github.com/microsoft/unilm) (MSFT)
- [GPT4all](https://gpt4all.io/index.html)
- [DoctorGPT](https://github.com/llSourcell/DoctorGPT)

??? code "[Qwen]"

    Open-source : Qwen-72B and Qwen-1.8B! Including Base, Chat and Quantized versions.

    🌟 Qwen-72B has been trained on high-quality data consisting of 3T tokens, boasting a larger parameter scale and more training data to achieve a comprehensive performance upgrade. Additionally, we have expanded the context window length to 32K and enhanced the system prompt capability, allowing users to customize their own AI assistant with just a single prompt.

    🎁 Qwen-1.8B is our additional gift to the research community, striking a balance between maintaining essential functionalities and maximizing efficiency, generating 2K-length text content with just 3GB of GPU memory.

    🤗 https://huggingface.co/Qwen
    🤖 https://github.com/QwenLM/Qwen

### Vision focused

- [StableLM: Stability AI Language Models](https://github.com/stability-AI/stableLM/)
- [Stable Diffusion](https://github.com/apple/ml-stable-diffusion)



!!! code 
    https://arxiv.org/pdf/2403.17297.pdf
    The evolution of Large Language Models (LLMs) like ChatGPT and GPT-4 has sparked discussions on the advent of Artificial General Intelligence (AGI). However, replicating such advancements in open-source models has been challenging. This paper introduces InternLM2, an open-source LLM that outperforms its predecessors in comprehensive evaluations across 6 dimensions and 30 benchmarks, long-context modeling, and open-ended subjective evaluations through innovative pre-training and optimization techniques. The pre-training process of InternLM2 is meticulously detailed, highlighting the preparation of diverse data types including text, code, and long-context data. InternLM2 efficiently captures long-term dependencies, initially trained on 4k tokens before advancing to 32k tokens in pre-training and fine-tuning stages, exhibiting remarkable performance on the 200k ``Needle-in-a-Haystack" test. InternLM2 is further aligned using Supervised Fine-Tuning (SFT) and a novel Conditional Online Reinforcement Learning from Human Feedback (COOL RLHF) strategy that addresses conflicting human preferences and reward hacking. By releasing InternLM2 models in different training stages and model sizes, we provide the community with insights into the model's evolution.

### Multimodal


## Closed Source

??? important "[Gemini](https://blog.google/technology/ai/google-gemini-ai/)"
    [Report](https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf)
    [Tech Report](https://storage.googleapis.com/deepmind-media/AlphaCode2/AlphaCode2_Tech_Report.pdf)
    <img width="633" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/6e1ff291-fcfc-479d-aa07-d13486d82424">
    <img width="653" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c21a4954-49d9-4bbb-a364-aae017cc8584">



- [Bard](https://bard.google.com/)
- [Claud]()
- [ChatGPT (OpenAI)](https://openai.com/blog/chatgpt)
- [Medpalm](https://arxiv.org/pdf/2212.13138.pdf)
