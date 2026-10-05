

# Workflows vs. Agents

**Workflow**: steps are fixed in code before the system runs.

- 📋 Predictable — every path is known ahead of time
- 🧪 Testable — each step can be tested in isolation
- 📉 Predictable failure modes and costs

**Agent**: the model decides its own steps while running.

- 🔀 Flexible — handles open-ended problems fixed code paths can't anticipate
- 🎲 Behavior is decided at runtime, not written in advance
- 📈 Harder to bound cost, latency, and failure modes

!!! tip "[Building Effective Agents (Anthropic)](https://www.anthropic.com/engineering/building-effective-agents)"
    Anthropic's own guidance: most production systems don't need an autonomous agent, they need a workflow with clear steps and tight tools. Add agent-style autonomy only once the task's flexibility needs genuinely outweigh the latency, cost, and error-compounding you give up.

---
