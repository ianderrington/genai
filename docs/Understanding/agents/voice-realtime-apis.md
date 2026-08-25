---
title: Real-Time Voice and Multimodal Agent APIs
description: Native speech-to-speech vs. cascaded voice pipelines, and a comparison of OpenAI's Realtime API, Google's Gemini Live API, and Anthropic's voice mode
---

# Real-Time Voice and Multimodal Agent APIs

Voice agents split into two architecturally different approaches, and the difference shows up directly in latency, cost, and what the model can actually perceive.

## Native Speech-to-Speech vs. Cascaded Pipelines

**Cascaded** (the older, still common approach): speech-to-text converts the user's audio to a transcript, a text-based LLM generates a text response, text-to-speech converts that response back to audio. Three separate models, three hops, and every hop adds latency and loses information the audio itself carried: tone, pace, emotion, interruption timing.

**Native speech-to-speech**: one model processes audio in and produces audio out directly, without a text intermediary. This is what lets a model react to how something was said, not just what was said, and cuts round-trip latency to something close to real conversation.

!!! note "Anthropic's voice mode is cascaded, not native"
    As of mid-2026, Claude's voice mode runs a speech-to-text, text, text-to-speech pipeline rather than a native audio model, supporting 18 languages. This is a real architectural difference from OpenAI's and Google's offerings below, not just a feature gap, worth knowing before assuming every "voice mode" works the same way under the hood.

## Comparison

| API | Maker | Architecture | Notable for |
|-----|-------|---------------|-------------|
| **Realtime API (gpt-realtime-2)** | OpenAI | Native speech-to-speech | GPT-5-class reasoning in the voice model itself, 128K context, complex agentic tool-calling during a live conversation |
| **Gemini Live API (Gemini 3.1 Flash Live)** | Google DeepMind | Native speech-to-speech | Simultaneous audio + vision + text in one session, the only major option that can process live video during a voice conversation; substantially cheaper per audio token |
| **Claude voice mode** | Anthropic | Cascaded (STT to LLM to TTS) | 18 languages, built on Claude's existing text reasoning rather than a dedicated audio model |

OpenAI shipped gpt-realtime-2 on May 7, 2026 (alongside GPT-Realtime-Translate and GPT-Realtime-Whisper), reporting a 96.6% score on the Big Bench Audio benchmark. A follow-up release, gpt-realtime-2.1, landed July 6, 2026, cutting p95 voice latency by at least 25% for real-time voice agents. Google's Gemini 3.1 Flash Live launched March 26, 2026.

## Choosing Between Them

- **Need the model to see what the user is showing it while talking?** Gemini Live is currently the only one of these three that processes live video alongside audio in the same session, not a separate call.
- **Need the lowest per-token audio cost at scale?** Gemini Live's audio token pricing is reported at roughly a tenth of OpenAI's, a real factor once you're running voice at volume rather than prototyping.
- **Need the most capable reasoning inside the voice model itself**, for complex multi-step agentic tasks conducted entirely by voice? OpenAI's Realtime API is built specifically around GPT-5-class reasoning running natively in the audio path, not bolted on afterward.
- **Already building on Claude and don't need sub-second native audio latency?** The cascaded pipeline is a real, working option, just architecturally different from the other two, and worth knowing that difference exists before assuming feature parity.

## Related Pages

- [Agent Harnesses](./harnesses.md) - the runtime layer these voice APIs get embedded into for a full voice agent product
- [Multimodal Models](../architectures/models/multimodal.md) - how audio, video, and text combine in a single model more broadly
- [Computer Use](./computer-use.md) - the visual counterpart to real-time voice: agents that perceive and act on a screen
