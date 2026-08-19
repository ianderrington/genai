---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - Training
  - Theory
authors: parnian
---

# Scaling Laws: The Mathematics of AI Progress

Scaling laws describe how model performance improves predictably with more parameters, data, and compute—providing a roadmap for AI development and investment decisions.

## The Fundamental Discovery

OpenAI's 2020 paper revealed that loss follows power laws:

```
L(N) = (Nc/N)^αN      # Loss vs Parameters
L(D) = (Dc/D)^αD      # Loss vs Data
L(C) = (Cc/C)^αC      # Loss vs Compute

Where:
- L = Cross-entropy loss
- N = Number of parameters
- D = Dataset size (tokens)
- C = Compute (FLOPs)
- α = Scaling exponents (~0.076 for N, ~0.095 for D)
- Nc, Dc, Cc = Critical scale constants
```

## What the Laws Tell Us

```
Key insight: Doubling parameters reduces loss by ~5%
            Doubling data reduces loss by ~7%

Practical implication:
To halve the loss → need ~8000x parameters OR ~500x data

Loss 1.0  │████████████████████████████████████████
Loss 0.9  │███████████████████████████████████
Loss 0.8  │█████████████████████████████
Loss 0.7  │███████████████████████
Loss 0.6  │██████████████████
Loss 0.5  │█████████████
          └──────────────────────────────────────→ Scale (log)
```

## Compute-Optimal Training (Chinchilla)

DeepMind's Chinchilla paper showed optimal allocation:

```python
def chinchilla_optimal(compute_budget):
    """
    Optimal parameter count and token count for given compute.

    Chinchilla finding: N and D should scale equally
    Previous (GPT-3): N scaled faster than D

    For C = 6 * N * D (approximate FLOPs):
    N_opt ≈ 0.92 * C^0.5
    D_opt ≈ 1.08 * C^0.5
    """
    n_params = 0.92 * (compute_budget ** 0.5)
    n_tokens = 1.08 * (compute_budget ** 0.5)

    return n_params, n_tokens

# Example: Given 10^24 FLOPs
# - GPT-3 approach: 175B params, 300B tokens (undertrained)
# - Chinchilla: 70B params, 1.4T tokens (optimal)
```

## Beyond Compute-Optimal

Chinchilla assumes inference is free. In practice:

```python
def inference_aware_optimal(compute_budget, inference_budget):
    """
    Account for inference cost in optimal sizing.

    More params = more inference cost
    Smaller models may be better if heavily used
    """
    # Pure Chinchilla optimal
    n_chinchilla = chinchilla_optimal(compute_budget)[0]

    # Inference cost per token
    inference_cost_per_token = lambda n: 2 * n  # ~2 FLOPs per param

    # Total inference over lifetime
    total_inference = inference_budget * inference_cost_per_token(n_chinchilla)

    # If inference dominates, prefer smaller model trained longer
    if total_inference > compute_budget:
        # Overtrain a smaller model
        reduction_factor = (compute_budget / total_inference) ** 0.5
        return n_chinchilla * reduction_factor

    return n_chinchilla
```

## Emergent Capabilities

Some capabilities appear suddenly above certain scales:

```
Capability vs Scale:

Accuracy │                           ╱
100%     │                          ╱
         │                         ╱
50%      │    ────────────────────╯
         │    (random)
0%       │
         └────────────────────────────→ Scale (log)
                                  ^
                            Emergence threshold

Examples:
- Arithmetic: emerges ~10B parameters
- Translation: emerges ~1B parameters
- Code: emerges ~10B parameters
- Multi-step reasoning: emerges ~100B parameters
```

## Predicting Performance

```python
class ScalingPredictor:
    """Predict performance at new scales."""

    def __init__(self, scaling_exponent=0.08, critical_scale=1e10):
        self.alpha = scaling_exponent
        self.nc = critical_scale

    def predict_loss(self, n_params):
        """Predict loss for given parameter count."""
        return (self.nc / n_params) ** self.alpha

    def fit_from_experiments(self, experiments):
        """Learn scaling constants from experiments."""
        # experiments: [(n_params, loss), ...]
        log_n = np.log([e[0] for e in experiments])
        log_loss = np.log([e[1] for e in experiments])

        # Linear regression in log-log space
        self.alpha, log_nc = np.polyfit(log_n, log_loss, 1)
        self.alpha = -self.alpha
        self.nc = np.exp(-log_nc / self.alpha)

    def extrapolate(self, target_loss):
        """How many parameters needed for target loss?"""
        return self.nc * (target_loss ** (-1/self.alpha))
```

## Multi-Modal Scaling

Different modalities have different scaling:

```
Vision Transformers:
L(N) ∝ N^(-0.071)  # Similar to language

Video Models:
L(N) ∝ N^(-0.056)  # Harder to scale

Speech Models:
L(N) ∝ N^(-0.083)  # Easier to scale

Multimodal (Vision-Language):
L(N) ∝ N^(-0.065)  # Between vision and language
```

## The Compute-Performance Frontier

```python
def compute_frontier(target_loss, models_data):
    """
    Find the frontier of best loss achieved for each compute budget.

    models_data: [(compute, loss, method), ...]
    """
    sorted_by_compute = sorted(models_data, key=lambda x: x[0])

    frontier = []
    best_loss = float('inf')

    for compute, loss, method in sorted_by_compute:
        if loss < best_loss:
            best_loss = loss
            frontier.append((compute, loss, method))

    return frontier

# The frontier tells you:
# - What's the best achievable loss at each compute level?
# - Which methods/architectures are on the frontier?
# - How much compute is needed for a target loss?
```

## Breaking Scaling Laws

Research directions to improve scaling:

```
1. Architecture Innovations:
   - Mixture of Experts: Better params/FLOP ratio
   - State space models: Linear vs quadratic attention
   - Retrieval augmentation: External memory

2. Data Quality:
   - Curation > quantity at some point
   - Deduplication improves efficiency
   - Synthetic data for targeted capabilities

3. Training Techniques:
   - Curriculum learning: Easy to hard
   - Distillation: Transfer knowledge efficiently
   - Sparse training: Train different subsets

4. Inference Efficiency:
   - Quantization: More with less precision
   - Speculative decoding: Generate faster
   - KV cache optimization: Handle longer contexts
```

## Practical Implications

### Planning Training Runs

```python
def plan_training_run(compute_budget, target_quality):
    """Plan optimal training configuration."""

    # Chinchilla-optimal sizing
    n_params, n_tokens = chinchilla_optimal(compute_budget)

    # Estimate quality
    predicted_loss = predict_loss(n_params, n_tokens)

    if predicted_loss > target_quality:
        # Need more compute
        required = estimate_required_compute(target_quality)
        print(f"Need {required / compute_budget:.1f}x more compute")
        return None

    return {
        "parameters": n_params,
        "tokens": n_tokens,
        "batch_size": compute_batch_size(n_params),
        "learning_rate": compute_lr(n_params),
        "estimated_loss": predicted_loss
    }
```

### Budget Allocation

```
Given $10M for training:
- A100 hours ≈ $1/hour
- 10M hours ≈ 10^23 FLOPs

Chinchilla optimal:
- ~10B parameters
- ~200B tokens
- Predicted perplexity: ~15

Alternative: Inference-optimized
- ~1B parameters
- ~2T tokens
- Predicted perplexity: ~20 (worse)
- But 10x cheaper to serve!
```

## Controversies and Limitations

1. **Law vs Guideline**: Not true physical laws
2. **Architecture Dependence**: Laws change with architecture
3. **Task Specificity**: Different tasks, different scaling
4. **Emergent Unpredictability**: Can't predict emergence
5. **Data Quality**: Laws assume i.i.d. web data

## References

- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Chinchilla: Training Compute-Optimal LLMs](https://arxiv.org/abs/2203.15556)
- [Emergent Abilities of Large Language Models](https://arxiv.org/abs/2206.07682)
- [Beyond Chinchilla-Optimal](https://arxiv.org/abs/2404.10102)

---

*Scaling laws transformed AI development from art to science—we can now predict the future of AI capabilities with remarkable accuracy, turning research into engineering.*
