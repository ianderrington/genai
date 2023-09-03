
!!! tip "[Self-Alignment with Instruction Backtranslation](https://arxiv.org/pdf/2308.06259.pdf)"
    <img width="892" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/d92f4bbd-b86a-41a9-ae9e-b2c2084d8e42">

    The seed model is used to construct training examples by generating instruction prompts
    for web documents (self-augmentation), and then selecting high quality examples
    from among these candidates (self-curation). This data is then used to finetune
    a stronger model. F
