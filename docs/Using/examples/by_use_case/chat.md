Conversational chat is the most common way people interact with generative AI directly: a back-and-forth exchange where the model holds context across turns, rather than a single one-shot request. The consumer-facing chat products (ChatGPT, Claude.ai, Gemini) are the highest-traffic entry point into GenAI for most users, and the underlying pattern (maintain conversation history, feed it back into the model on each turn) is also the foundation most agent and RAG systems build on top of.

For self-hosted or privacy-sensitive deployments where sending data to a hosted chat product isn't an option:

??? abstract "[PrivateGPT](https://github.com/zylon-ai/private-gpt)"
    A fully local, offline chat interface over your own documents — no data leaves your machine. Useful specifically for the case where the value of chat (conversational Q&A) is wanted, but a hosted API is ruled out by data-sensitivity requirements.
