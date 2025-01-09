## 🚧 It is impossible to keep up manually 🚧 

Because it is not possible to manually maintain open-source references, we refer the reader to the [Hugging face OPen LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard)

Still, below, we relay several important and foundational ones. 

## Pre trained models

Because of the costs associated with aggregating sufficient data and performing large-scale [training](../architectures/training/index.md) it is often preferrable to start with pre-trained models. They can be both [open source](#open-source) and [closed source](#closed-source) in origin, and choosing between the two of them will be an important decisions related to project requirements. 

Whatever pre-trained model that you use, to ensure they meet technical, customer, and organizational requirements it is important to  by [compare and evaluate](../architectures/evaluating_and_comparing.md) them. 

Below we share important models. 

### APIs based model usage
- [OpenAI](https://github.com/openai/openai-python)

- [Hugging Face Transformers](https://huggingface.co/transformers/v4.0.1/index.html): This is a popular library for creating transformer models.

## Open Source
### [Llama Herds](https://llama.meta.com/)

??? abstract "[Llama 3](https://scontent-sjc3-1.xx.fbcdn.net/v/t39.2365-6/453304228_1160109801904614_7143520450792086005_n.pdf?_nc_cat=108&ccb=1-7&_nc_sid=3c67a6&_nc_ohc=XgSnguNUd6sQ7kNvgGtsxm7&_nc_ht=scontent-sjc3-1.xx&oh=00_AYCKlqn26hRGQkCUODmVGuRJLCkOQ5PgDcnb-2vX3VUj-A&oe=66FB5247)" 
   Trained on 15T Multilingual tokens, with a max of 405B trainable parameters, the Meta team introduces a powerful bevy of new models with generally SOTA performance, especially for opensource models. They employed a more powerful data selection and synthesis strategy, with a generally simple post-training procedure using SFT, reejction sampling and DPO optimization. 
   <img width="1115" alt="image" src="https://github.com/user-attachments/assets/2da877df-c4ba-43d3-a80c-55264b041956">
   
   They also use '4D Parallelism to combine tensor parallelism (TP) pipeline parallelism (PP) Context parallelism (CP) and data parallelism (DP) 

   ![image](https://github.com/user-attachments/assets/3230f1a4-532d-45d5-81fa-029a025eabf8)

   Finally, it is also multimodel. Here is their training approach:

   ![image](https://github.com/user-attachments/assets/2cc41289-4619-45a7-8d45-02fcba41ebff)




### MultiModal

??? abstract "[MOLMO](https://molmo.allenai.org/paper.pdf)" Molmo
    **Developments** A very high quality set of source set of models. They succeed with very high quality image captioning using the voice recordings to ensure annotations of images are done well and with high quality.
    [Blog](https://molmo.allenai.org/blog)
    [Paper](https://molmo.allenai.org/paper.pdf)
    
### Text-focused

??? tip "[Llama](https://ai.meta.com/llama/) is a library and set of models that has an expanding community due to the generally open-source nature of high-quality Llama 2 model."
    [Llama 2: Open Foundation and Fine-Tuned Chat Models](https://arxiv.org/pdf/2307.09288.pdf) A nearly open source set of 7B-70B models with quality performance"
    <img width="1393" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5f6a647d-c0dc-453c-9334-3632e86bc19e">

??? abstract "**Sept, 2023** ![GitHub Repo stars](https://badgen.net/github/stars/mistralai/mistral-src) [Mistral Transformer](https://github.com/mistralai/mistral-src)"

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

??? abstract "[Qwen]"

    Open-source : Qwen-72B and Qwen-1.8B! Including Base, Chat and Quantized versions.

    🌟 Qwen-72B has been trained on high-quality data consisting of 3T tokens, boasting a larger parameter scale and more training data to achieve a comprehensive performance upgrade. Additionally, we have expanded the context window length to 32K and enhanced the system prompt capability, allowing users to customize their own AI assistant with just a single prompt.

    🎁 Qwen-1.8B is our additional gift to the research community, striking a balance between maintaining essential functionalities and maximizing efficiency, generating 2K-length text content with just 3GB of GPU memory.

    🤗 https://huggingface.co/Qwen
    🤖 https://github.com/QwenLM/Qwen

### Vision focused

- [StableLM: Stability AI Language Models](https://github.com/stability-AI/stableLM/)
- [Stable Diffusion](https://github.com/apple/ml-stable-diffusion)



!!! abstract 
    https://arxiv.org/pdf/2403.17297.pdf
    The evolution of Large Language Models (LLMs) like ChatGPT and GPT-4 has sparked discussions on the advent of Artificial General Intelligence (AGI). However, replicating such advancements in open-source models has been challenging. This paper introduces InternLM2, an open-source LLM that outperforms its predecessors in comprehensive evaluations across 6 dimensions and 30 benchmarks, long-context modeling, and open-ended subjective evaluations through innovative pre-training and optimization techniques. The pre-training process of InternLM2 is meticulously detailed, highlighting the preparation of diverse data types including text, code, and long-context data. InternLM2 efficiently captures long-term dependencies, initially trained on 4k tokens before advancing to 32k tokens in pre-training and fine-tuning stages, exhibiting remarkable performance on the 200k ``Needle-in-a-Haystack" test. InternLM2 is further aligned using Supervised Fine-Tuning (SFT) and a novel Conditional Online Reinforcement Learning from Human Feedback (COOL RLHF) strategy that addresses conflicting human preferences and reward hacking. By releasing InternLM2 models in different training stages and model sizes, we provide the community with insights into the model's evolution.

### Speech-to-text

??? abstract "[Moshi: a speech-text foundation model for real time dialogue](https://github.com/kyutai-labs/moshi)" moshi


## Closed Source

??? important "[Evaluation of OpenAI o1: Opportunities and Challenges of AGI](https://arxiv.org/pdf/2409.18486)"
    The OpenAI reveals the next level of generation of improved models by directly integrating 'chain of thought' into the process. This allows it to 'think before it answer' allowing complex reasoning tasks and more transprent explanations to be provided. Importantly, o1 scales its imporformance with increased compute during inference, as opposed to during training. This leads it to SOTA results on anumber of components. 
    
    They also introduce the AGI-benchmark 1.0 to enable AI research and evaluation on 27 distinct categories looking at five major cognitive faculties: Reasoning, Creation & Design, Diagnosis, Reflection and Planning. 

   Importantly, they also demonstrate inference time scaling laws that show improved accuracy when more tokens are used at inference/generation time. 
   
    ![image](https://github.com/user-attachments/assets/2a1d10ee-63c4-483f-be67-5170ee5c4d78)

   These appear to be generally reproducable [here](https://github.com/hughbzhang/o1_inference_scaling_laws?tab=readme-ov-file)
   Their system card is [here](https://assets.ctfassets.net/kftzwdyauwt9/67qJD51Aur3eIc96iOfeOP/71551c3d223cd97e591aa89567306912/o1_system_card.pdf)




??? important "[Gemini](https://blog.google/technology/ai/google-gemini-ai/)"
    [Report](https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf)
    [Tech Report](https://storage.googleapis.com/deepmind-media/AlphaCode2/AlphaCode2_Tech_Report.pdf)
    <img width="633" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/6e1ff291-fcfc-479d-aa07-d13486d82424">
    <img width="653" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c21a4954-49d9-4bbb-a364-aae017cc8584">



- [Bard](https://bard.google.com/)
- [Claud]()
- [ChatGPT (OpenAI)](https://openai.com/blog/chatgpt)
- [Medpalm](https://arxiv.org/pdf/2212.13138.pdf)
