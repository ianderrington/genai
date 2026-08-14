---
date:
  created: 2025-02-23
  updated: 2025-02-23
categories:
  - Research
  - Alignment
  - Safety
authors:
  - parnian
---

# AI Alignment Techniques: Building AI That Does What We Want

AI alignment ensures that AI systems pursue goals that are beneficial to humans—a challenge that becomes increasingly critical as systems become more capable.

## The Alignment Problem

```
The challenge:
1. Specify what we want (specification)
2. Train model to want that (training)
3. Verify it actually wants that (evaluation)
4. Ensure it remains aligned (robustness)

All four are hard. Failure at any = misaligned AI.
```

## Approaches to Alignment

### 1. Reinforcement Learning from Human Feedback (RLHF)

```python
class RLHF:
    """Standard approach: Human preferences → Reward model → RL."""

    def __init__(self, base_model, human_annotators):
        self.model = base_model
        self.annotators = human_annotators

    def collect_comparisons(self, prompts, n_comparisons=10000):
        """Collect human preference data."""
        comparisons = []
        for prompt in prompts:
            # Generate two responses
            response_a = self.model.generate(prompt)
            response_b = self.model.generate(prompt)

            # Human chooses better one
            preference = self.annotators.choose(prompt, response_a, response_b)

            comparisons.append({
                "prompt": prompt,
                "chosen": response_a if preference == "A" else response_b,
                "rejected": response_b if preference == "A" else response_a
            })

        return comparisons

    def train_reward_model(self, comparisons):
        """Train model to predict human preferences."""
        self.reward_model = RewardModel()

        for comp in comparisons:
            score_chosen = self.reward_model(comp["prompt"], comp["chosen"])
            score_rejected = self.reward_model(comp["prompt"], comp["rejected"])

            # Bradley-Terry loss: chosen should score higher
            loss = -torch.log(torch.sigmoid(score_chosen - score_rejected))
            loss.backward()

    def rl_finetune(self, prompts):
        """Finetune with PPO using reward model."""
        for prompt in prompts:
            response = self.model.generate(prompt)
            reward = self.reward_model(prompt, response)

            # PPO update
            self.ppo_step(prompt, response, reward)
```

### 2. Direct Preference Optimization (DPO)

```python
class DPO:
    """Skip reward model, directly optimize for preferences."""

    def __init__(self, model, reference_model, beta=0.1):
        self.model = model
        self.ref = reference_model  # Frozen copy
        self.beta = beta

    def loss(self, prompt, chosen, rejected):
        # Log probabilities under both models
        pi_chosen = self.model.log_prob(chosen | prompt)
        pi_rejected = self.model.log_prob(rejected | prompt)
        ref_chosen = self.ref.log_prob(chosen | prompt)
        ref_rejected = self.ref.log_prob(rejected | prompt)

        # DPO loss
        logits = self.beta * (
            (pi_chosen - ref_chosen) - (pi_rejected - ref_rejected)
        )
        return -F.logsigmoid(logits).mean()
```

### 3. Constitutional AI (CAI)

```python
class ConstitutionalAI:
    """Self-critique against explicit principles."""

    def __init__(self, model, constitution):
        self.model = model
        self.constitution = constitution

    def critique_and_revise(self, prompt, response):
        """Model critiques own response against principles."""
        for principle in self.constitution:
            # Critique
            critique = self.model.generate(f"""
            Principle: {principle}
            Response: {response}

            Does this response violate the principle? If so, how?
            Critique:
            """)

            if "violates" in critique.lower():
                # Revise
                response = self.model.generate(f"""
                Original: {response}
                Critique: {critique}
                Principle: {principle}

                Revised response that follows the principle:
                """)

        return response
```

### 4. Iterated Amplification

```python
class IteratedAmplification:
    """Recursively decompose hard problems into easier ones."""

    def __init__(self, human, weak_ai):
        self.human = human
        self.ai = weak_ai

    def amplified_answer(self, question, depth=0, max_depth=3):
        if depth >= max_depth or self.is_simple(question):
            # Base case: human answers directly
            return self.human.answer(question)

        # Decompose into sub-questions
        sub_questions = self.decompose(question)

        # Recursively answer sub-questions
        sub_answers = [
            self.amplified_answer(q, depth + 1)
            for q in sub_questions
        ]

        # Human synthesizes sub-answers into final answer
        return self.human.synthesize(question, sub_answers)

    def train_ai_to_amplify(self):
        """Train AI to mimic amplified human."""
        training_data = []
        for question in self.hard_questions:
            answer = self.amplified_answer(question)
            training_data.append((question, answer))

        self.ai.finetune(training_data)
```

### 5. Debate

```python
class AIDebate:
    """Two AI agents debate, human judges."""

    def __init__(self, debater_a, debater_b, judge):
        self.debater_a = debater_a
        self.debater_b = debater_b
        self.judge = judge  # Human or AI

    def debate(self, question, max_rounds=5):
        transcript = []
        positions = self.assign_positions(question)

        for round in range(max_rounds):
            # A makes argument
            arg_a = self.debater_a.argue(
                question, positions["A"], transcript
            )
            transcript.append(("A", arg_a))

            # B responds
            arg_b = self.debater_b.argue(
                question, positions["B"], transcript
            )
            transcript.append(("B", arg_b))

        # Judge decides winner
        winner = self.judge.decide(question, transcript)
        return winner, transcript
```

### 6. Scalable Oversight

```python
class ScalableOversight:
    """Techniques for humans to oversee superhuman AI."""

    def sandwiching(self, task):
        """
        Weak-to-strong generalization:
        Train on expert labels, but evaluate on harder tasks
        """
        # Easy tasks: human can verify
        easy_verified = self.human_verified(task, difficulty="easy")

        # Hard tasks: use model trained on easy
        model = self.train(easy_verified)
        hard_outputs = model.generate(task, difficulty="hard")

        # Spot-check hard outputs
        return self.spot_check_evaluate(hard_outputs)

    def recursive_reward_modeling(self, task):
        """
        Use AI to help humans evaluate AI on tasks
        humans can't evaluate alone.
        """
        if self.human_can_evaluate(task):
            return self.human.evaluate(task)

        # Decompose evaluation into subtasks
        subtasks = self.decompose_evaluation(task)

        # Recursively evaluate subtasks
        subtask_evaluations = [
            self.recursive_reward_modeling(st)
            for st in subtasks
        ]

        # Combine into overall evaluation
        return self.combine_evaluations(subtask_evaluations)
```

## Evaluation & Interpretability

```python
class AlignmentEvaluator:
    def evaluate_helpfulness(self, model, test_cases):
        """Does model actually help with tasks?"""
        scores = []
        for case in test_cases:
            response = model.generate(case.prompt)
            score = self.rate_helpfulness(case, response)
            scores.append(score)
        return np.mean(scores)

    def evaluate_harmlessness(self, model, adversarial_prompts):
        """Does model refuse harmful requests?"""
        refusal_rate = 0
        for prompt in adversarial_prompts:
            response = model.generate(prompt)
            if self.is_refusal(response):
                refusal_rate += 1
        return refusal_rate / len(adversarial_prompts)

    def evaluate_honesty(self, model, factual_questions):
        """Does model express appropriate uncertainty?"""
        scores = []
        for q in factual_questions:
            response = model.generate(q.question)
            # Check calibration: confident when right, uncertain when wrong
            confidence = self.extract_confidence(response)
            correct = self.check_answer(response, q.answer)
            scores.append(self.calibration_score(confidence, correct))
        return np.mean(scores)
```

## Open Problems

| Problem | Description | Status |
|---------|-------------|--------|
| Reward Hacking | Model exploits reward function loopholes | Active research |
| Distribution Shift | Alignment fails in new situations | Partially addressed |
| Deceptive Alignment | Model appears aligned but isn't | Unsolved |
| Goal Misgeneralization | Model learns wrong goal from training | Active research |
| Scalable Oversight | Supervising superhuman systems | Active research |
| Value Specification | Formalizing human values | Fundamental challenge |

## Future Directions

1. **Interpretability**: Understanding model internals
2. **Formal verification**: Mathematical guarantees
3. **Cooperative AI**: Multiple AI systems that cooperate
4. **Value learning**: Learning values from human behavior
5. **Corrigibility**: AI that welcomes correction

## References

- [Training Language Models to Follow Instructions (InstructGPT)](https://arxiv.org/abs/2203.02155)
- [Constitutional AI](https://arxiv.org/abs/2212.08073)
- [AI Safety via Debate](https://arxiv.org/abs/1805.00899)
- [Iterated Amplification](https://arxiv.org/abs/1810.08575)
- [Scalable Oversight](https://arxiv.org/abs/2211.03540)

---

*Alignment is not a problem to solve once—it's an ongoing challenge of ensuring AI systems remain beneficial as they become more capable than their creators.*
