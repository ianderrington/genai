TODO: 
Base intro and discussion

## Developing Results

??? note "[An Emulator for Fine-Tuning Large Language Models using Small Language Models](https://arxiv.org/pdf/2310.12962.pdf)"
    Emulated fine-tuning cross-pollinates reward models used in small (or large) models for their alternative-sized model resulting in improvements in both instruction following and helpfulness. They also find by combining with speculative decoding, that there can be a speedup for larger models by a factor of 2.5.
    <img width="1088" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/f6b84225-3a5c-4545-8ad3-d8f40b7536cf">
    <img width="1017" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5ae8af02-02f9-43ab-a545-16b7709935e8">
    <img width="431" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/c9a25085-2e3e-4cfb-912c-09d978310887">




??? code "[Open Pipe](https://github.com/OpenPipe/OpenPipe) Use powerful but expensive LLMs to fine-tune smaller and cheaper models suited to your exact needs. Evaluate the model and prompt combinations in the playground. Query your past requests and export optimized training data."

    <img width="839" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/54d6ace2-522e-44af-a554-64f8bbfb383e">


!!! code "[Slow Llama](https://github.com/okuvshynov/slowllama) for finetuning on a M1/M2 mac)"

