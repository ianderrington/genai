Observability for Generative AI means being able to see what a model is actually doing in production: what it's costing, how fast it's responding, and whether its inputs and outputs are behaving the way you expect. Without it, a model that's silently degrading, or silently getting expensive, looks identical to one that's working fine.

## What to Track

- **Inputs.** Watch for anomalies or drift in what users are actually sending the model. A shift in input patterns often predicts a shift in output quality before you'd otherwise notice.
- **Outputs.** Track correctness against the corresponding input over time, not just in aggregate. This is what catches recurring failure modes instead of one-off errors.
- **Cost.** Inference cost scales with usage in ways that are easy to lose track of until the bill arrives. Regular review lets you catch a runaway prompt or an inefficient retrieval step before it compounds.
- **Latency.** Track inference speed the same way you'd track any other production service's response time, since a model that's slow under load is a real user-facing problem, not just an infrastructure detail.
- **Underlying infrastructure.** The hardware and software the model runs on needs its own monitoring, separate from the model's own metrics, so you can tell a model-quality problem from an infrastructure problem.

## Libraries and Tools

!!! example "![GitHub Repo stars](https://badgen.net/github/stars/e2b-dev/e2b) [E2B](https://github.com/e2b-dev/e2b)"
    A sandboxed, framework-agnostic runtime for AI agents to execute code, giving you a place to trace and inspect what an agent actually did, not just what it claims it did.

!!! example "[Lunary](https://lunary.ai) (formerly LLMonitor)"
    Self-hosted LLM monitoring covering cost, per-user usage, request logs, and feedback collection.
