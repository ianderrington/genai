
An LLM in isolation can have value, but it is often much easier to use when integrated with UI/UX and a host of elements that augment its performance. Here we describe some important components. 

!!! tip "[LLM Patterns](https://eugeneyan.com/writing/llm-patterns/) An impressively thorough and well-written discussion on LLMs and patterns within them"
    Important patterns mentioned (references to discussions herein):
    * [Evaluating and comparing](evaluating_and_comparing.md)
    * [Retreival Augmented Generation (RAG)](../agents/rag.md)
    * [Fine tuning](optimization.md#finetuning)
    * [Caching](../agents/memory.md#caching) to reduce latency.
    * [Guardrails](../agents/chains.md#guardrails) to ensure output (and input) quality.
    * Data Flywheel to use data collection and feedback to improve model and experience
    * Cascade Breaking models up into smaller simpler tasks instead of big ones.
    * Monitoring to ensure value is being derived
    * Effective (defensive) UX to ensure the models can be used well.
    ![image](https://github.com/ianderrington/genai/assets/76016868/fd03db2c-c695-4f52-8306-062fad5c3779)


## Reference Materials

??? tip "[Emerging Architectures for LLM Applications](https://a16z.com/2023/06/20/emerging-architectures-for-llm-applications/) A detailed discussion of the components and their interactions using orchestration systems."

    ![image](https://github.com/ianderrington/genai/assets/76016868/f287eaef-6b86-4846-8885-2b3ad3cd614b) [^n1]