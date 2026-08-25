# Hosting

Hosting is the decision of where a model actually runs once you've chosen it. This page covers the decision framework; the [back-end index](index.md) covers the specific tools and cloud platforms available for each option below.

## The Three Options

### Managed API

Call a hosted model (OpenAI, Anthropic, Google) over the network. No infrastructure to run.

- Fastest to build, zero ops burden
- Cost scales directly with usage, no fixed floor
- Data leaves your infrastructure on every call, a real constraint for regulated or sensitive workloads
- You're bound to that provider's latency, rate limits, and uptime

### Self-hosted, your infrastructure

Run an open-weight model (Llama, Mistral, DeepSeek) on hardware you control, cloud or on-prem.

- Data never leaves your infrastructure
- Fixed cost regardless of usage volume, which favors high, steady traffic and disfavors spiky or low traffic
- You own the operational burden: scaling, monitoring, upgrading the serving stack
- Model quality ceiling is whatever open-weight models currently offer, generally behind the frontier managed APIs

### Managed self-hosted

A cloud provider runs an open-weight model for you (Amazon SageMaker, Azure ML, dedicated inference endpoints).

- Middle ground: your choice of model, without owning the serving infrastructure yourself
- Still bills for reserved capacity even during idle periods, unlike a pure pay-per-call API
- Provider lock-in similar to a managed API, but over infrastructure rather than a specific model

## What Actually Drives the Choice

The decision usually comes down to three questions, in order:

1. **Can this data leave your infrastructure?** If not, self-hosted or managed self-hosted is the only option, full stop, regardless of the other trade-offs.
2. **Is usage steady or spiky?** Steady, high-volume traffic favors fixed-cost self-hosting. Spiky or low-volume traffic favors pay-per-call APIs, where idle time costs nothing.
3. **Does the task need frontier model quality, or is a smaller open-weight model good enough?** If frontier quality is required, that currently narrows the field to managed APIs; open-weight models are closing the gap but aren't there for every task.

See [computation](computation.md) for the hardware-level detail once you've decided self-hosting is the right call, and [pre-trained models](pre_trained_models.md) for choosing which model to run either way.
