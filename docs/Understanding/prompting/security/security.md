# Prompt Security

Prompt injection is the top risk in [OWASP's Top 10 for LLM applications](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) (LLM01): an attacker manipulates a model's behavior through crafted input, causing it to act against its intended instructions. It comes in two distinct forms that need different defenses.

## Direct Prompt Injection ("Jailbreaking")

A user directly crafts input designed to override the system prompt or bypass the model's intended constraints. This is the more visible, more discussed form: the user is the attacker, and the attack surface is whatever the user can type.

## Indirect Prompt Injection

The more dangerous form for real deployed systems. Here, the attacker never talks to the model directly. Instead, they plant malicious instructions in content the model will later read: a webpage, a document, an email, a file. When the model processes that content, as part of a RAG pipeline or an agent browsing the web, it can't distinguish the attacker's embedded instructions from its legitimate task. The instructions don't even need to be human-visible, only machine-parseable, so a prompt injection can hide in white-on-white text or a hidden HTML attribute a human reviewer would never notice.

## Other Prompt-Level Problems

1. **Befuddlement**: tricking the model, particularly in customer-facing settings, into confabulating information it shouldn't state as fact.
2. **Data privacy**: prompts or retrieved context can leak sensitive information into a model's output, or into logs, in ways that violate privacy expectations.
3. **Prompt leaking**: an attacker gets the model to reveal its own system prompt, exposing proprietary instructions or the specific guardrails a deployment relies on.
4. **Tool hacking**: for an agent with access to real tools (file access, code execution, API calls), a successful injection doesn't just produce a bad response, it can trigger a real, harmful action.

## Why This Is Structurally Hard to Fully Prevent

Unlike traditional injection attacks (SQL injection, for example), there's no clean separation between "code" and "data" in a language model's input: the system prompt, the user's message, and any retrieved content all flow into the same context window as plain text, and the model has no built-in mechanism to treat one part as more trustworthy than another. Defenses (input filtering, output validation, keeping untrusted content clearly delimited, least-privilege tool access) reduce risk but none of them close the gap completely, which is why "assume any external content the model reads could contain an attack" is the safer default for anything with real tool access.
