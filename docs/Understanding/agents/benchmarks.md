---
title: Agent Benchmarks
description: What agent benchmarks measure, what the current state of the art looks like, and how to evaluate agents for your actual use case
bullets:
  - Benchmark scores measure narrow capability ranges under controlled conditions — they do not predict production reliability
  - Contamination is pervasive in frontier model benchmarks; SWE-bench-Live and TAU-bench are the most contamination-resistant options
  - The most important evaluation metric for production agents is pass@k across multiple independent trials, not single-run accuracy
---

# Agent Benchmarks

Benchmarks serve a real purpose: they provide a shared vocabulary for comparing agent capabilities and tracking progress over time. But they are systematically misread in ways that lead to poor deployment decisions.

This page explains what the major benchmarks actually measure, what the current state-of-the-art scores mean, and how to build an evaluation practice that reflects real production performance rather than controlled benchmark conditions.

---

## The Major Benchmarks

### Code and Software Engineering

#### SWE-bench Verified

The most widely cited benchmark for coding agents. Tasks are real GitHub issues from popular open-source repositories; success means the agent produces a code change that passes the repository's existing test suite.

**2025–2026 SOTA:** Claude Opus 4.5 at 45.9% on the Verified split.

**What it measures:** The ability to understand a bug report, locate the relevant code, produce a fix, and have that fix pass automated tests.

**What it does not measure:** The quality of the fix beyond test passage, the appropriateness of the approach, maintainability, or performance on issues not represented in the training distribution.

**Contamination concern:** Contamination has been found across frontier models on this benchmark. Models trained on data that includes benchmark solutions score artificially high. This is not a theoretical risk — researchers have documented it in multiple frontier model evaluations.

#### SWE-bench-Live

A continuously updated version of SWE-bench that draws from issues filed after the model's training cutoff. New issues are added monthly; solved issues are retired.

**Scores:** Consistently lower than on the original Verified split, which is what you should expect — the contamination-free numbers are the honest numbers.

**Why it matters:** If you are trying to understand what a coding agent will actually do on novel code problems, SWE-bench-Live is more predictive than Verified. The performance gap between the two benchmarks is a rough estimate of how much contamination inflates Verified scores.

#### SWE-bench Pro

Scale AI's harder benchmark: 1,865 tasks requiring long-horizon, multi-file changes, averaging 107 lines of code across 4.1 files. Designed to test the class of problems that require understanding a large codebase and making coordinated changes.

**Why it matters:** Most real engineering tasks are closer to SWE-bench Pro than to the short-horizon SWE-bench Verified issues. Scores on SWE-bench Pro are significantly lower than on Verified, which is a useful reality check.

---

### General Agent Capability

#### GAIA

Tests general assistant capabilities: multi-step reasoning, web search, tool use, file parsing, and information synthesis. Questions require using multiple capabilities in sequence to reach a final answer.

**2025 SOTA:** 75% (H2O.ai multi-agent system).

**Human baseline:** ~92%.

**What the gap tells you:** The remaining 25 percentage points between the best agent system and human performance represents genuinely hard coordination and reasoning problems — the kind that still require human judgment in production.

#### Gaia2

A more recent, harder variant featuring dynamic and asynchronous environments where conditions change during task execution. More representative of real-world assistant tasks where the world does not pause while you reason.

**2025 SOTA:** GPT-5 at 42% pass@1.

**What it measures:** Adaptive reasoning under changing conditions — closer to what a real personal assistant deals with than the static GAIA tasks.

---

### Customer Service and Business Workflows

#### TAU-bench

Tests agents on customer service tasks with real business logic: airline booking systems, retail order management, telecom account handling. Agents interact with real tool states and must satisfy both user requests and business policy constraints simultaneously.

**2025 scores:** GPT-4o below 50% on most task domains; pass@8 (success in at least one of 8 independent runs) below 25% for the hardest domains.

**Why TAU-bench is the most honest agentic benchmark:**

- Uses real, live tool states rather than simulated environments
- Requires satisfying multiple constraints simultaneously (user goal AND policy compliance)
- Measures across multiple independent runs, not just single-run accuracy
- Tasks reflect actual business workflows, not idealized test scenarios

The low pass@8 scores are particularly notable: for some task types, even if you retry the same task 8 times, the agent succeeds less than 25% of the time. This is the honest floor of current agent reliability for complex customer service workflows.

---

### Expert Knowledge

#### Humanity's Last Exam

3,000 questions curated by domain experts across a wide range of academic disciplines — designed to be at or beyond the frontier of human expert knowledge.

**Launch score (o3):** ~26.6%.

**What it measures:** Breadth and depth of specialized knowledge, multi-step reasoning from first principles. Not an agent benchmark in the autonomous sense, but a useful calibration for what models currently know and don't know at expert level.

---

## Benchmark Comparison Table

| Benchmark | Focus | 2025–2026 SOTA | Human Baseline | Contamination Risk |
|-----------|-------|----------------|----------------|-------------------|
| SWE-bench Verified | Fix real GitHub issues | Claude Opus 4.5: 45.9% | ~100% (trivial for experts) | High — documented |
| SWE-bench-Live | Same, contamination-free | Lower than Verified | ~100% | Low — by design |
| SWE-bench Pro | Long-horizon multi-file code | — | ~100% | Low — recent |
| GAIA | Multi-step reasoning + tools | 75% (H2O.ai) | ~92% | Moderate |
| Gaia2 | Dynamic environments | 42% (GPT-5, pass@1) | Not published | Low — newer |
| TAU-bench | Customer service + business logic | GPT-4o <50% | ~80–90% | Low |
| Humanity's Last Exam | Expert-level knowledge | ~26.6% (o3 at launch) | ~100% (per domain) | Low |

---

## How to Interpret Benchmark Scores

### Single-pass accuracy overstates reliability

The most common mistake in reading benchmark results: treating a score like "45.9% on SWE-bench" as meaning the agent succeeds 45.9% of the time in production.

Single-pass accuracy measures whether the agent succeeds on the first attempt under controlled conditions. Production agents:
- Face a different distribution of tasks than benchmarks
- Encounter API failures, timeouts, and partial information
- May need to retry
- Operate without the clean scaffolding that benchmark harnesses provide

**pass@k** — the probability of success in at least one of k independent runs — is a more honest measure of production reliability. TAU-bench reports pass@8; most other benchmarks do not.

### Contamination inflates scores

Models trained on data that includes benchmark solutions or related content score artificially high. This is a documented phenomenon across frontier models, not a theoretical concern.

Interpretation: treat SWE-bench Verified scores as an upper bound on what a model can do on those specific task types. SWE-bench-Live scores are the more honest estimate of novel-task performance.

### Benchmarks test narrow capability ranges

GAIA tests certain kinds of multi-step reasoning. SWE-bench tests certain kinds of code repair. TAU-bench tests certain kinds of customer service logic. None of them test:

- Error handling quality
- Behavior under adversarial inputs
- Cost efficiency
- Latency under real load
- Graceful degradation when tools fail

Production performance depends heavily on factors that benchmarks do not measure: the quality of your prompt engineering, the design of your error handling, the robustness of your tool integrations, and the clarity of your task specification.

### Benchmark scores do not predict user satisfaction

This is the sharpest gap. A 67% PR merge rate (Devin 2025) does not mean 67% of developers who use Devin are satisfied. It means 67% of submitted PRs eventually get merged — some after significant human revision. User satisfaction is a function of how much friction the remaining 33% creates, and whether the 67% actually reduces net work.

!!! warning "The evaluation gap (2025 AI Agent Index)"
    - Tool-calling accuracy is rarely tracked even by organizations with production agents
    - No standard safety reporting format exists across commercial deployments
    - Most organizations use single-run accuracy, which overstates reliability
    - Benchmark scores do not predict user satisfaction

---

## Evaluating Your Own Agents

External benchmarks tell you about model capability in controlled conditions. They do not tell you how your agent will perform on your tasks, with your tools, in your environment.

### Define success criteria before you build

Evaluation after the fact leads to benchmarks designed to confirm success rather than measure it honestly. Before you start building, define:

- What does a successful run look like? (Concrete, measurable, not "it worked")
- What is the acceptable failure rate?
- What is the acceptable cost per successful task?
- What is the baseline — what does a human do this task in, at what quality?

### Run multiple independent trials

Do not rely on single-run evaluations. Run each test case at least 5 times (pass@5); for critical workflows, run 10 (pass@10). Report the full distribution, not just the best run.

A system that succeeds 80% of the time with pass@1 is very different from one that succeeds 50% of the time with pass@1 but 95% of the time with pass@3 — the second system may be better suited to a retry-on-failure deployment pattern.

### Test failure paths

Most internal evaluations test only the success path: the agent gets valid inputs, the tools respond correctly, the task is well-specified. Production failures are overwhelmingly on the failure paths:

- What happens when a required tool times out?
- What does the agent do when it gets a response in an unexpected format?
- What happens when the task specification is ambiguous?
- What happens when the agent hits its token limit mid-task?

If you have not evaluated these paths, you do not know your failure mode.

### Monitor production telemetry

Offline evaluation against a test set is necessary but not sufficient. Production monitoring tells you things test sets cannot:

- Which task types generate the highest failure rates in the real distribution
- How cost scales with the actual (not expected) range of task complexity
- Whether output quality degrades over time (model or tool drift)
- Whether users are finding workarounds for agent failures (a signal you might miss in aggregate metrics)

Track cost per successful task, not just aggregate cost or aggregate success rate. Cost efficiency and reliability degrade in subtle, correlated ways that the aggregate numbers hide.

### Build an evaluation harness before you scale

It is much harder to retrofit evaluation infrastructure onto a scaled agent deployment than to build it from the start. Evaluation requirements to have in place before expanding scope:

1. A test set that covers the actual task distribution (not just easy cases)
2. Automated pass@k calculation across multiple runs
3. Cost tracking per run, attributed to task type
4. Output quality metrics appropriate to your domain
5. A process for adding new test cases when you discover new failure modes

---

## References

- [SWE-bench](https://www.swebench.com/)
- [SWE-bench-Live](https://livecodebench.github.io/)
- [GAIA benchmark paper](https://arxiv.org/abs/2311.12983)
- [TAU-bench](https://github.com/sierra-research/tau-bench)
- [Humanity's Last Exam](https://agi.safe.ai/)
- [AI Agent Index 2025](https://aiagentindex.mit.edu/) — MIT evaluation gap findings
- [Devin 2025 performance review](https://www.cognition-labs.com/)
- Scale AI SWE-bench Pro documentation
