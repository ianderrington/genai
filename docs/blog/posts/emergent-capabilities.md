---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - Scaling
  - Theory
authors: parnian
coverImage: /images/blog/emergent-capabilities.png
---

# Emergent Capabilities: When Scale Creates Surprise

Emergent capabilities are abilities that appear suddenly in larger models without being explicitly trained—behaviors that seem to "emerge" from scale alone, often catching researchers by surprise.

## What Is Emergence?

```
Non-emergent capability (gradual improvement):
Scale:    1B    10B    100B    1T
Accuracy: 20%   40%    60%     80%

Emergent capability (phase transition):
Scale:    1B    10B    100B    1T
Accuracy: 0%    0%     0%      85%
                              ↑
                          Sudden jump!
```

## The Original Observation

BIG-bench (2022) documented this across hundreds of tasks:

```python
# Emergent pattern
def is_emergent(accuracy_vs_scale):
    """
    Emergent = near-random at small scale,
    sudden jump at larger scale.
    """
    small_scale_accuracy = accuracy_vs_scale[:3]  # < 10B params
    large_scale_accuracy = accuracy_vs_scale[-1]   # > 100B params

    # Near random at small scale
    near_random = np.mean(small_scale_accuracy) < 0.4

    # Much better at large scale
    big_jump = large_scale_accuracy > np.mean(small_scale_accuracy) + 0.3

    return near_random and big_jump
```

## Notable Emergent Capabilities

### 1. Chain-of-Thought Reasoning

```
Model size < 100B:
Q: "If I have 3 apples and give away 1, then buy 2 more, how many?"
A: "5" (wrong, no reasoning)

Model size > 100B:
Q: Same question
A: "Let me work through this:
    - Start with 3 apples
    - Give away 1: 3 - 1 = 2 apples
    - Buy 2 more: 2 + 2 = 4 apples
    So the answer is 4."
```

### 2. In-Context Learning

```python
# Small models: examples don't help much
# Large models: few examples enable new tasks

prompt = """
Translate English to French:
cat -> chat
dog -> chien
house -> maison
computer -> """

# 1B model: "computer" (doesn't understand task)
# 100B model: "ordinateur" (learned pattern from examples)
```

### 3. Instruction Following

```
Capability emerges around 10B parameters:

Before emergence:
"Write a haiku about computers"
-> "Computers are machines that process information..."

After emergence:
"Write a haiku about computers"
-> "Silicon pathways
    Logic flows through circuits bright
    Zeros become ones"
```

### 4. Theory of Mind

```python
# Sally-Anne test for understanding others' beliefs

story = """
Sally puts a ball in a basket and leaves.
Anne moves the ball to a box.
Sally comes back.
Where will Sally look for the ball?
"""

# Small model: "In the box" (where it actually is)
# Large model: "In the basket" (where Sally believes it is)
```

## Why Does Emergence Happen?

### Hypothesis 1: Sparse Circuits

```
At small scale:
- Not enough capacity for all skills
- Model learns common patterns only

At large scale:
- Dedicated circuits form for specific skills
- Critical mass of relevant neurons connects
- Capability suddenly "clicks"
```

### Hypothesis 2: Compositional Generalization

```python
def emergent_composition(model_size):
    """
    Small models learn primitive skills.
    Large models compose them into new capabilities.
    """
    primitive_skills = {
        "pattern_matching": learned_early,
        "counting": learned_early,
        "logical_operators": learned_early,
        "memory_retrieval": learned_early,
    }

    # Only at large scale do these compose
    if model_size > threshold:
        return compose(
            primitive_skills["pattern_matching"],
            primitive_skills["counting"],
            primitive_skills["logical_operators"]
        )  # = Multi-step arithmetic
    else:
        return None
```

### Hypothesis 3: Task Representation

```
Small scale: Task encoded implicitly, unreliably
Large scale: Task encoded explicitly, reliably

Example: Addition
Small model internal: [vague arithmetic vibes]
Large model internal: [add(x, y) -> retrieve sum operation -> apply]
```

## The Emergence Controversy

### Claim: Emergence Might Be a Mirage

```python
# Mirzadeh et al. (2024) argument:

def apparent_emergence(metric, scale):
    """
    Emergence might be artifact of:
    1. Nonlinear metrics (accuracy, exact match)
    2. Insufficient resolution
    """

    # With linear metric (cross-entropy loss):
    # - Performance improves smoothly
    # - No sudden jumps

    # With nonlinear metric (accuracy):
    # - Threshold effect creates apparent jump
    # - Model gradually gets better at task
    # - Only crosses "correct" threshold at scale

    loss = predict_loss(scale)  # Smooth!
    accuracy = threshold(loss)   # Jumpy!

    return loss, accuracy
```

### Counter-Argument: Still Surprising

```
Even if metric artifacts exist:

1. Practical emergence is real
   - You can't use 1B model for CoT
   - You can use 100B model for CoT
   - Something changed, whatever you call it

2. Some emergence is metric-independent
   - In-context learning appears abruptly
   - Theory of mind appears abruptly
   - Not just threshold effects
```

## Predicting Emergence

```python
class EmergencePredictor:
    """Attempt to predict when capabilities emerge."""

    def __init__(self, capability_requirements):
        self.requirements = capability_requirements

    def predict_threshold(self, capability):
        """
        Estimate scale needed for capability.
        Based on:
        - Task complexity
        - Required primitives
        - Data requirements
        """
        req = self.requirements[capability]

        base_scale = 1e9  # 1B parameters

        # Multiply by complexity factors
        scale = base_scale
        scale *= req.compositional_depth ** 2
        scale *= req.required_context_length
        scale *= req.precision_required

        return scale

    def capability_roadmap(self, target_capabilities):
        """Which capabilities emerge at what scale?"""
        roadmap = []
        for cap in target_capabilities:
            threshold = self.predict_threshold(cap)
            roadmap.append((cap, threshold))

        return sorted(roadmap, key=lambda x: x[1])
```

## Implications

### For Model Development

```
1. Scale matters, but unpredictably
   - Can't just train bigger model and expect everything
   - Must evaluate specific capabilities at each scale

2. Evaluation complexity
   - Must test many capabilities
   - Capabilities appear between checkpoints
   - Need continuous evaluation

3. Safety implications
   - Dangerous capabilities might emerge suddenly
   - Hard to predict when
   - Must evaluate before and during deployment
```

### For AI Safety

```python
class SafetyEmergenceMonitor:
    """Monitor for dangerous emergent capabilities."""

    def __init__(self, model, dangerous_capabilities):
        self.model = model
        self.dangers = dangerous_capabilities

    def evaluate_continuously(self, training_steps):
        alerts = []
        for step in training_steps:
            checkpoint = self.model.checkpoint(step)

            for danger in self.dangers:
                capability = self.probe(checkpoint, danger)
                if capability.emerged and not capability.was_emerged_before:
                    alerts.append({
                        "capability": danger,
                        "emerged_at": step,
                        "severity": danger.severity
                    })

        return alerts
```

## Open Questions

| Question | Status |
|----------|--------|
| Can we predict emergence? | Partially - rough scaling estimates |
| Is emergence fundamental? | Debated - may be metric artifact |
| What capabilities will emerge next? | Unknown - surveillance needed |
| Can we control emergence? | Research ongoing |
| Is there a capability ceiling? | Unknown |

## References

- [Emergent Abilities of Large Language Models](https://arxiv.org/abs/2206.07682)
- [Are Emergent Abilities a Mirage?](https://arxiv.org/abs/2304.15004)
- [Beyond the Imitation Game (BIG-bench)](https://arxiv.org/abs/2206.04615)
- [Language Models as Knowledge Bases](https://arxiv.org/abs/1909.01066)

---

*Emergence challenges our understanding of AI development—capabilities that appear from nowhere force us to acknowledge that we don't fully understand what we're building.*
