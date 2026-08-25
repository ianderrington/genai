Planning is the task of decomposing a goal into an ordered sequence of steps before acting, distinct from single-turn generation or reactive chat. It's the capability most agent frameworks lean on for anything beyond a single tool call, and it's also one of the weaker points for current LLMs on genuinely novel, multi-step problems.

!!! tip "[What's the Plan? Evaluating and Developing Planning-Aware Techniques for LLMs](https://arxiv.org/pdf/2402.11489.pdf)"
    Surveys how well LLMs actually plan versus how well they merely sound like they're planning, and covers techniques (explicit plan-then-execute prompting, self-verification of intermediate steps) that measurably improve real planning performance over naive single-pass generation.
