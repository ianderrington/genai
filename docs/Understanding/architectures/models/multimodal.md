??? code "[SPHINX: THE JOINT MIXING OF WEIGHTS, TASKS, AND VISUAL EMBEDDINGS FOR MULTI-MODAL LARGE LANGUAGE MODELS](https://github.com/Alpha-VLLM/LLaMA2-Accessory)"
  ABSTRACT
    We present SPHINX, a versatile multi-modal large language model (MLLM)
    with a joint mixing of model weights, tuning tasks, and visual embeddings. First,
    for stronger vision-language alignment, we unfreeze the large language model
    (LLM) during pre-training, and introduce a weight mix strategy between LLMs
    trained by real-world and synthetic data. By directly integrating the weights from
    two domains, the mixed LLM can efficiently incorporate diverse semantics with
    favorable robustness. Then, to enable multi-purpose capabilities, we mix a variety
    of tasks for joint visual instruction tuning, and design task-specific instructions
    to avoid inter-task conflict. In addition to the basic visual question answering,
    we include more challenging tasks such as region-level understanding, caption
    grounding, document layout detection, and human pose estimation, contributing
    to mutual enhancement over different scenarios. Additionally, we propose to
    extract comprehensive visual embeddings from various network architectures,
    pre-training paradigms, and information granularity, providing language models
    with more robust image representations. Based on our proposed joint mixing,
    SPHINX exhibits superior multi-modal understanding capabilities on a wide range
    of applications. On top of this, we further propose an efficient strategy aiming to
    better capture fine-grained appearances of high-resolution images. With a mixing
    of different scales and high-resolution sub-images, SPHINX attains exceptional
    visual parsing and reasoning performance on existing evaluation benchmarks.
    We hope our work may cast a light on the exploration of joint mixing in future
    MLLM research. Code is released at https://github.com/Alpha-VLLM/
    LLaMA2-Accessory."
  <img width="581" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/94a699fb-bdff-4366-919e-fe3811d80d46">

  [Paper](https://arxiv.org/pdf/2311.07575.pdf)

??? [SPHINX: The Joint Mixing of Weights, Tasks, and Visual Embeddings for Multi-modal Large Language Models (Shanghai AI Laboratory, November 2023)](https://arxiv.org/abs/2311.07575)

    Abstract:
    "We present SPHINX, a versatile multi-modal large language model (MLLM) with a joint mixing of model weights, tuning tasks, and visual embeddings. First, for stronger vision-language alignment, we unfreeze the large language model (LLM) during pre-training, and introduce a weight mix strategy between LLMs trained by real-world and synthetic data. By directly integrating the weights from two domains, the mixed LLM can efficiently incorporate diverse semantics with favorable robustness. Then, to enable multi-purpose capabilities, we mix a variety of tasks for joint visual instruction tuning, and design task-specific instructions to avoid inter-task conflict. In addition to the basic visual question answering, we include more challenging tasks such as region-level understanding, caption grounding, document layout detection, and human pose estimation, contributing to mutual enhancement over different scenarios. Additionally, we propose to extract comprehensive visual embeddings from various network architectures, pre-training paradigms, and information granularity, providing language models with more robust image representations. Based on our proposed joint mixing, SPHINX exhibits superior multi-modal understanding capabilities on a wide range of applications. On top of this, we further propose an efficient strategy aiming to better capture fine-grained appearances of high-resolution images. With a mixing of different scales and high-resolution sub-images, SPHINX attains exceptional visual parsing and reasoning performance on existing evaluation benchmarks. We hope our work may cast a light on the exploration of joint mixing in future MLLM research. "

