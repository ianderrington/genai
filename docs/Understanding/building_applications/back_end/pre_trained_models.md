---
title: "Pre-trained Models"
description: "A guide to available pre-trained models and their capabilities"
bullet_points:
  - "Overview of open-source and closed-source pre-trained models"
  - "Comparison of different model architectures and capabilities"
  - "Implementation considerations and API access options"
---

# Pre-trained Models

!!! important "Dynamic Field"
    It is impossible to keep up manually with all pre-trained models. For the most up-to-date information, refer to the [Hugging Face Open LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard).

Because of the costs associated with aggregating sufficient data and performing large-scale [training](../../architectures/training/index.md), it is often preferable to start with pre-trained models. They can be both [open source](#open-source) and [closed source](#closed-source) in origin, and choosing between them will be an important decision related to project requirements.

To ensure models meet technical, customer, and organizational requirements, it is important to [compare and evaluate](../../architectures/optimizing/evaluating_and_comparing.md) them.

## API-Based Models

??? abstract "API Access"
    - [OpenAI](https://github.com/openai/openai-python): Access to GPT models through API
    - [Hugging Face Transformers](https://huggingface.co/transformers/v4.0.1/index.html): Popular library for transformer models

## Open Source Models

### Latest Developments

??? abstract "[Llama 3](https://scontent-sjc3-1.xx.fbcdn.net/v/t39.2365-6/453304228_1160109801904614_7143520450792086005_n.pdf?_nc_cat=108&ccb=1-7&_nc_sid=3c67a6&_nc_ohc=XgSnguNUd6sQ7kNvgGtsxm7&_nc_ht=scontent-sjc3-1.xx&oh=00_AYCKlqn26hRGQkCUODmVGuRJLCkOQ5PgDcnb-2vX3VUj-A&oe=66FB5247)" 
    Trained on 15T Multilingual tokens, with 405B trainable parameters:
    - Powerful data selection and synthesis strategy
    - Simple post-training with SFT, rejection sampling, and DPO
    - 4D Parallelism combining TP, PP, CP, and DP
    <img width="1115" alt="image" src="https://github.com/user-attachments/assets/2da877df-c4ba-43d3-a80c-55264b041956">
    
    Parallelism approach:
    ![image](https://github.com/user-attachments/assets/3230f1a4-532d-45d5-81fa-029a025eabf8)
    
    Multimodal training:
    ![image](https://github.com/user-attachments/assets/2cc41289-4619-45a7-8d45-02fcba41ebff)

### Multimodal Models

??? abstract "[MOLMO](https://molmo.allenai.org/paper.pdf)"
    High-quality image captioning using voice recordings:
    - [Blog](https://molmo.allenai.org/blog)
    - [Paper](https://molmo.allenai.org/paper.pdf)

### Text Models

??? tip "[Llama 2](https://ai.meta.com/llama/)"
    Open-source set of 7B-70B models:
    - [Paper: Llama 2: Open Foundation and Fine-Tuned Chat Models](https://arxiv.org/pdf/2307.09288.pdf)
    - Strong performance across tasks
    <img width="1393" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5f6a647d-c0dc-453c-9334-3632e86bc19e">

??? abstract "[Mistral](https://github.com/mistralai/mistral-src)"
    Released September 2023:
    - [Announcement](https://mistral.ai/news/announcing-mistral-7b/)
    - [Hugging Face](https://huggingface.co/mistralai)
    ![image](https://github.com/ianderrington/genai/assets/76016868/ad494e0e-c854-4866-88db-be7c379a004a)

??? tip "Additional Text Models"
    - [Llama2 Uncensored](https://huggingface.co/Tap-M/Luna-AI-Llama2-Uncensored)
    - [TinyLlama](https://github.com/jzhang38/TinyLlama)
    - [Open Llama](https://github.com/openlm-research/open_llama)
    - [UAE Falcon](https://www.tii.ae/news/uaes-falcon-40b-now-royalty-free)
    - [Orca (Microsoft)](https://arxiv.org/pdf/2306.02707.pdf)
    - [MosaicML](https://www.mosaicml.com/blog/long-context-mpt-7b-8k)
    - [LAION-AI](https://github.com/LAION-AI/Open-Assistant)
    - [Unilm](https://github.com/microsoft/unilm)
    - [GPT4all](https://gpt4all.io/index.html)
    - [DoctorGPT](https://github.com/llSourcell/DoctorGPT)

??? abstract "[Qwen](https://huggingface.co/Qwen)"
    Open-source models including Qwen-72B and Qwen-1.8B:
    - Trained on 3T tokens of high-quality data
    - 32K context window length
    - Enhanced system prompt capability
    - Qwen-1.8B optimized for efficiency (3GB GPU memory)
    - [GitHub Repository](https://github.com/QwenLM/Qwen)

### Vision Models

??? tip "Vision-Focused Models"
    - [StableLM: Stability AI Language Models](https://github.com/stability-AI/stableLM/)
    - [Stable Diffusion](https://github.com/apple/ml-stable-diffusion)

### Speech Models

??? abstract "[Moshi](https://github.com/kyutai-labs/moshi)"
    Speech-text foundation model for real-time dialogue

## Closed Source Models

??? important "[OpenAI o1](https://arxiv.org/pdf/2409.18486)"
    Next generation model with integrated chain of thought:
    - Improved complex reasoning and transparent explanations
    - Scales performance with inference compute
    - Introduces AGI-benchmark 1.0 with 27 categories
    - Demonstrates inference time scaling laws
    ![image](https://github.com/user-attachments/assets/2a1d10ee-63c4-483f-be67-5170ee5c4d78)
    - [Reproducible Results](https://github.com/hughbzhang/o1_inference_scaling_laws)
    - [System Card](https://assets.ctfassets.net/kftzwdyauwt9/67qJD51Aur3eIc96iOfeOP/71551c3d223cd97e591aa89567306912/o1_system_card.pdf)

??? important "[Gemini](https://blog.google/technology/ai/google-gemini-ai/)"
    Google's multimodal model:
    - [Technical Report](https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf)
    - [AlphaCode2 Report](https://storage.googleapis.com/deepmind-media/AlphaCode2/AlphaCode2_Tech_Report.pdf)
    <img width="633" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/6e1ff291-fcfc-479d-aa07-d13486d82424">
    <img width="653" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c21a4954-49d9-4bbb-a364-aae017cc8584">

??? tip "Additional Closed Source Models"
    - [Bard](https://bard.google.com/)
    - [Claude (Anthropic)](https://www.anthropic.com/claude)
    - [ChatGPT (OpenAI)](https://openai.com/blog/chatgpt)
    - [Medpalm](https://arxiv.org/pdf/2212.13138.pdf)
