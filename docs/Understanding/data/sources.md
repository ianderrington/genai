
## Data sources


RedPajama
Pile
CommonCrawl (webscrape)
C4 (CommonCrawl)
Github
Books
Arxiv
StackExchange

- [unarXive 2022: All arXiv Publications Pre-Processed for NLP](https://arxiv.org/pdf/2303.14957.pdf)

- [Redpajama](https://www.together.xyz/blog/redpajama)
- [BIG-bench](https://github.com/google/BIG-bench/blob/main/docs/doc.md)
- [Metaseq](https://github.com/facebookresearch/metaseq/)
- [Kaggle-code](https://www.kaggle.com/datasets/kaggle/meta-kaggle-code)


The largest open source text dataset just dropped

??? tip "[Dolma. (by AI2)](https://huggingface.co/datasets/allenai/dolma)"
    WARNING: The license is not 'open source'
    3 Trillion tokens of high quality data.

    - Diverse: Documents, code, academic papers, wiki..
    - Focused: English only.
    - De-duplicated.
    - Filtered for high quality.

    But most importantly:
    The largest open curated dataset for pretraining.

    -----

    • Link: https://huggingface.co/datasets/allenai/dolma
    • Blog: https://blog.allenai.org/dolma-3-trillion-tokens-open-llm-corpus-9a0ff4b8da64
    • Code: https://github.com/allenai/dolma
    • Paper: https://drive.google.com/file/d/12gOf5I5RytsD159nSP7iim_5zN31FCXq/view


## Process Supervision
- [prm800k](https://github.com/openai/prm800k)



!!! note "[MathPile: A Billion-Token-Scale Pretraining Corpus for Math](https://huggingface.co/papers/2312.17120)"
    High-quality, large-scale corpora are the cornerstone of building foundation models. In this work, we introduce MathPile, a diverse and high-quality math-centric corpus comprising about 9.5 billion tokens. Throughout its creation, we adhered to the principle of ``less is more'', firmly believing in the supremacy of data quality over quantity, even in the pre-training phase. Our meticulous data collection and processing efforts included a complex suite of preprocessing, prefiltering, language identification, cleaning, filtering, and deduplication, ensuring the high quality of our corpus. Furthermore, we performed data contamination detection on downstream benchmark test sets to eliminate duplicates. We hope our MathPile can help to enhance the mathematical reasoning abilities of language models. We plan to open-source different versions of \mathpile with the scripts used for processing, to facilitate future developments in this field.
