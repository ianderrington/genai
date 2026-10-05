MLOps (Machine Learning Operations) is the discipline of running AI models reliably in production: deployment, monitoring, versioning, and retraining, treated as an operational practice rather than a one-time deployment step. For GenAI specifically, this extends to prompt versioning, model-output evaluation, and tracking behavior drift as underlying models change.

## Core Practices

- **Deployment and serving**: getting a model into a state where it reliably answers real requests at the latency and cost your application needs.
- **Monitoring**: tracking output quality, latency, cost, and failure rates over time, not just at launch.
- **Evaluation**: running the model against a fixed test set on every change (a new prompt, a new model version) to catch regressions before they reach users.
- **Versioning**: tracking which model version, prompt version, and configuration produced a given output, so a regression can actually be traced back to its cause.

## Tools

- [Vertex AI](https://cloud.google.com/vertex-ai) (Google Cloud) — a managed platform covering training, deployment, and monitoring for both traditional ML and generative models.
- [Weights & Biases](https://wandb.ai/) — experiment tracking and evaluation, widely used for both training runs and LLM evaluation pipelines.
- [MLflow](https://mlflow.org/) — open-source model lifecycle tracking (experiments, versioning, deployment), model-agnostic and not tied to any one cloud provider.
- [LangSmith](https://www.langchain.com/langsmith) — tracing and evaluation built specifically for LLM applications, including prompt-level debugging.

See [LLM Operations](../../Understanding/building_applications/back_end/llm_ops/index.md) for the deeper technical coverage of deployment and monitoring architecture this page's practical summary draws from.
