### Caching

Input caching is a technique that leverages memory to improve response time and efficiency. Instead of generating tokens based on the next input, it uses caching to identify responses that may have already been generated for similar prompts. This significantly enhances the efficiency of repeated queries. However, it may cause issues if the initial response was not satisfactory, as the system would return the same cached response.

!!! important "[PROMPT CACHE: MODULAR ATTENTION REUSE FOR LOW-LATENCY INFERENCE](https://arxiv.org/pdf/2311.04934.pdf)"
    This stores partial Query, Key, Value pairs to minimize prompt-reuse. 
    

!!! abstract "![GitHub Repo stars](https://badgen.net/github/stars/zilliztech/GPTCache) [GPTCache]([GPTCache](https://github.com/zilliztech/GPTCache)) to quickly Cache your results to speed second-time queries."