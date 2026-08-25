---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - Alignment
  - Safety
authors: parnian
coverImage: /images/blog/constitutional-ai-safety.png
---

# Constitutional AI: Principles-Based Alignment

Constitutional AI (CAI) represents Anthropic's approach to training helpful, harmless, and honest AI systems using a set of principles rather than extensive human feedback on every output.

## The Problem with Pure RLHF

Standard RLHF has limitations:

```
Traditional RLHF:
Human labelers → Rate outputs → Train reward model → RL fine-tune

Issues:
1. Labeler disagreements on edge cases
2. Expensive and slow scaling
3. Hard to articulate implicit values
4. Inconsistent feedback across labelers
```

## The Constitutional Approach

CAI uses explicit principles that the model critiques itself against:

```
The Constitution (example principles):
1. Choose responses that are helpful but not harmful
2. Avoid outputs that are deceptive or manipulative
3. Respect user autonomy while maintaining safety
4. Be honest about uncertainty and limitations
5. Avoid discrimination and bias
```

## Two-Phase Training

### Phase 1: Supervised Learning from AI Feedback (SL-CAI)

```python
def sl_cai_training(model, prompts, constitution):
    training_data = []

    for prompt in prompts:
        # Generate initial response
        response = model.generate(prompt)

        # Self-critique against principles
        critique = model.generate(f"""
        Given the principle: {constitution[0]}
        Critique this response: {response}
        """)

        # Generate revised response
        revision = model.generate(f"""
        Original response: {response}
        Critique: {critique}
        Generate an improved response that addresses the critique.
        """)

        training_data.append((prompt, revision))

    # Fine-tune on revised responses
    model.finetune(training_data)
```

### Phase 2: RLHF from AI Feedback (RL-CAI)

```python
def rl_cai_training(model, prompts, constitution):
    comparisons = []

    for prompt in prompts:
        # Generate multiple responses
        responses = [model.generate(prompt) for _ in range(k)]

        # AI evaluates against constitution
        for i, resp_a in enumerate(responses):
            for j, resp_b in enumerate(responses):
                if i < j:
                    preference = model.generate(f"""
                    Given principle: {constitution}
                    Compare:
                    Response A: {resp_a}
                    Response B: {resp_b}
                    Which better follows the principle?
                    """)
                    comparisons.append((resp_a, resp_b, preference))

    # Train reward model on AI preferences
    reward_model = train_rm(comparisons)

    # RL fine-tune
    model = ppo_train(model, reward_model)
```

## Key Principles Categories

### Harmlessness

```
- Avoid helping with dangerous activities
- Don't generate content that could enable harm
- Refuse requests for weapons, drugs, etc.
- Protect vulnerable groups
```

### Helpfulness

```
- Provide accurate, useful information
- Understand and address user intent
- Offer actionable guidance
- Acknowledge limitations honestly
```

### Honesty

```
- Don't make up information
- Express uncertainty appropriately
- Correct misconceptions
- Distinguish fact from opinion
```

## Chain of Thought Critique

The model explains its reasoning:

```
User: How do I pick a lock?

Internal reasoning (CAI):
"This request could enable illegal entry. However, it could
also be legitimate (locksmith, locked out of own home,
educational interest). I should:
1. Not provide detailed instructions for bypassing security
2. Suggest legitimate alternatives (locksmith, landlord)
3. Mention educational resources if genuinely curious"

Response: "If you're locked out, I'd recommend calling a
locksmith or your landlord. For educational interest in
lock mechanisms, there are legitimate lockpicking hobby
communities and educational resources."
```

## Comparison with Other Approaches

| Approach | Feedback Source | Scalability | Consistency |
|----------|----------------|-------------|-------------|
| Pure RLHF | Human labelers | Low | Variable |
| Constitutional AI | AI + Principles | High | High |
| Rule-based filtering | Hardcoded rules | High | Rigid |
| Red-teaming | Adversarial humans | Medium | Targeted |

## Limitations

1. **Principle conflicts**: What if helpfulness conflicts with harmlessness?
2. **Cultural variance**: Principles may not translate across cultures
3. **Specification gaming**: Model might follow letter, not spirit
4. **Evolving norms**: Static constitution vs. changing values

## Implementation Considerations

```python
class ConstitutionalTrainer:
    def __init__(self, base_model, constitution):
        self.model = base_model
        self.constitution = constitution
        self.critique_model = base_model  # Same model critiques

    def critique_response(self, prompt, response):
        critiques = []
        for principle in self.constitution:
            critique = self.critique_model.generate(f"""
            Principle: {principle}

            Prompt: {prompt}
            Response: {response}

            Does this response violate the principle? If so, how?
            Critique:
            """)
            critiques.append(critique)
        return critiques

    def revise_response(self, prompt, response, critiques):
        return self.model.generate(f"""
        Original prompt: {prompt}
        Original response: {response}

        Critiques:
        {chr(10).join(critiques)}

        Generate an improved response addressing all critiques:
        """)
```

## Red-Teaming Results

Bai et al. (2022) evaluated harmlessness using crowdworker Elo comparisons rather than a fixed refusal-rate benchmark: human raters judged pairs of model responses head-to-head across a pool of over 180,000 red-team prompts (roughly 42,500 human-written, the rest model-generated), and each model's harmlessness was scored by its resulting Elo rating rather than a percentage. The paper's central finding: models trained with the full two-phase process (SL-CAI followed by RL-CAI) scored significantly more harmless than both a standard RLHF baseline and the SL-CAI-only intermediate model, and did so without becoming more evasive, a failure mode simpler harmlessness training tends to produce. See the [paper](https://arxiv.org/abs/2212.08073) directly for the full Elo curves and evaluation methodology rather than a single summary number, since that's the more accurate way to represent what a head-to-head preference comparison actually measures.

## Future Directions

1. **Dynamic constitutions**: Principles that evolve with feedback
2. **Multi-stakeholder principles**: Different principles for different contexts
3. **Verifiable constitutions**: Formal methods for principle verification
4. **Constitutional debate**: Multiple AI agents debating interpretations

## References

- [Constitutional AI Paper](https://arxiv.org/abs/2212.08073)
- [Anthropic's Approach to AI Safety](https://www.anthropic.com/research)
- [RLHF Limitations](https://arxiv.org/abs/2307.15217)

---

*Constitutional AI shows that explicit principles can guide AI behavior more consistently than implicit human preferences—a step toward AI systems whose values we can inspect and verify.*
