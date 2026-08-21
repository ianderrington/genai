![Comparison chart](/assets/eval-watch/eval-watch-2026-08-21.svg)

> **Methodology:** this comparison is based on reading each project's own release notes and a bounded summary of its changed files via GitHub's compare API - not hands-on execution of the tools. Scores and notes below are grounded in what maintainers themselves documented, not independent testing.

This cycle looked at 5 new release(s) across the watched AI eval/benchmark tooling field.

### promptfoo/promptfoo - 0.122.0 (score: 4.5/10)

This release is mostly a security and maintenance update: it patches several dependency vulnerabilities, fixes provider bugs (Nscale, WebSocket streaming), and drops Node.js 20 support. It does not claim any change to evaluation accuracy or quality.

Impact 5/10 - Stability 5/10 - Eval quality 2/10 - Documentation 6/10

**Notable changes:**
- Patched multiple dependency vulnerabilities, including keeping Shai-Hulud compromised package versions unreachable
- Patched undici in code-scan-action and guarded both lockfiles
- Pinned socket.io-parser above a packet-decoder DoS vulnerability
- Fixed Nscale provider model identifiers and stopped provider settings from leaking into the request body
- Fixed WebSocket evals hanging when a stream stalls
- Updated Anthropic packages and OpenTelemetry dependencies

**Breaking changes:**
- Dropped Node.js 20 support

[Release notes →](https://github.com/promptfoo/promptfoo/releases/tag/0.122.0)

### confident-ai/deepeval - python-v4.1.9 (score: 4.3/10)

This is a minor incremental release with two small features (trace flushing, tool-call metric type), a wizard/setup-script improvement, and three bug fixes including an OTel attribute mutability fix. Nothing in the notes claims a change to evaluation accuracy or quality, and no breaking changes are mentioned.

Impact 3/10 - Stability 8/10 - Eval quality 2/10 - Documentation 4/10

**Notable changes:**
- Added sync and async flushing of traces (#3045)
- Added `type` field in tool-calls metrics (#3062)
- Introduced a deepeval wizard (#3084)
- Updated setup-script.ts (#3085)
- Fixed OTel integrations to make attributes mutable (#3058)
- Fixed typos in Bedrock integration and RAG QA tutorial (#3075)

[Release notes →](https://github.com/confident-ai/deepeval/releases/tag/python-v4.1.9)

### vibrantlabsai/ragas - v0.4.3 (score: 6/10)

This release adds a DSPy-based prompt optimizer and several small fixes for LLM caching, pickling, and language support. The changes are incremental and mostly additive, with no breaking changes noted, but the notes give no direct evidence of broader evaluation-accuracy gains beyond the FactualCorrectness language fix.

Impact 5/10 - Stability 9/10 - Eval quality 4/10 - Documentation 6/10

**Notable changes:**
- Added DSPyOptimizer with MIPROv2 for advanced prompt optimization
- Added DSPy caching support
- Added system prompt support for InstructorLLM and LiteLLMStructuredLLM
- Added llms.txt generation and a copy-to-llm button for LLM-friendly documentation
- Fixed FactualCorrectness to enable language adaptation
- Fixed DiskCacheBackend pickling issue with InstructorLLM

**Limitations noted by maintainers:**
- DEFAULT_TOKENIZER previously made network calls at import time, now fixed to lazy-init (implies this was a known issue before this release)
- DiscreteMetric LLM examples in docs did not match the actual API before this fix

[Release notes →](https://github.com/vibrantlabsai/ragas/releases/tag/v0.4.3)

### EleutherAI/lm-evaluation-harness - v0.4.12 (score: 7.3/10)

This release adds four new model backends, native tensor parallelism for the HF backend, a TaskManager refactor, five new benchmarks, and over 20 task-correctness fixes. It carries three explicit breaking changes, so users must check their configs before upgrading. The release notes are clear and well organized, though the tool itself was not tested here.

Impact 8/10 - Stability 5/10 - Eval quality 8/10 - Documentation 8/10

**Notable changes:**
- New model backends: TensorRT-LLM, Megatron-LM (with TP/EP/DP), Intel Gaudi via optimum-habana, and LiteLLM AI gateway for 100+ providers
- Native tensor parallelism for transformers-based HF models via tp_plan
- TaskManager refactor: TaskManager.load(...) now returns a flat {tasks, groups} dict instead of the legacy nested structure
- New benchmarks: InfiniteBench (long-context, 12 sub-tasks), CRUXEval (Python code reasoning), Toksuite (multilingual tokenization robustness), NEREL-bench (Russian NER/relation extraction), JFinQA (Japanese financial reasoning)
- Trackio logger added with per-sample Trace logging
- Fixed GPQA preprocessing regex that corrupted answer text with brackets, and MMLU-Pro few-shot answers leaking into the user role under chat templates

**Breaking changes:**
- SteeredHF renamed to SteeredModel — users must update imports
- vLLM minimum version bumped to >=0.18 as part of data-parallel-with-Ray fixes
- enable_thinking is now disallowed for multiple_choice/loglikelihood tasks, and think_end_token is now required when enable_thinking=True — configs that combined these previously failed silently

**Limitations noted by maintainers:**
- load_task_or_group(...) and get_task_dict(...) are deprecated shims that return the old nested shape, not the new flat shape
- Duplicate task/group configs within the same root are now skipped with a log message instead of silently overwritten (behavior change worth checking custom setups against)
- ConfigurableGroup is now a deprecated wrapper around the new Group class

[Release notes →](https://github.com/EleutherAI/lm-evaluation-harness/releases/tag/v0.4.12)

### braintrustdata/autoevals - js-0.3.0 (score: 3.5/10)

This release contains only CI/publishing pipeline changes, not code changes. It sets up trusted npm publishing and fixes the Node release runtime version. No user-facing features, fixes, or eval-quality changes appear in the notes.

Impact 1/10 - Stability 10/10 - Eval quality 0/10 - Documentation 3/10

**Notable changes:**
- ci(publish): clear npm tokens for trusted publishing (PR #198)
- ci(publish): use tool versions for Node release runtime (PR #199)

[Release notes →](https://github.com/braintrustdata/autoevals/releases/tag/js-0.3.0)
