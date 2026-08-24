---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - Inference
  - Efficiency
authors: parnian
coverImage: /images/blog/speculative-decoding.png
---

# Speculative Decoding: Faster LLM Inference Through Speculation

Speculative decoding accelerates LLM inference by using a small, fast draft model to propose tokens that the large model verifies in parallel—achieving 2-3x speedups without changing outputs.

## The Inference Bottleneck

LLM inference is memory-bandwidth bound, not compute bound:

```
For each token:
1. Load all model weights from memory (~100GB for 70B model)
2. Compute attention over context
3. Generate ONE token
4. Repeat

Problem: GPU utilization is very low during autoregressive generation
```

## The Key Insight

Verification is parallelizable, generation is not:

```
Standard:    Generate t₁ → Generate t₂ → Generate t₃ → Generate t₄
             [slow]        [slow]        [slow]        [slow]

Speculative: Draft [t₁,t₂,t₃,t₄] → Verify all in parallel
             [fast, small model]   [one forward pass, big model]
```

## The Algorithm

```python
def speculative_decode(target_model, draft_model, prompt, gamma=4):
    """
    gamma: number of tokens to speculate
    """
    output = prompt
    
    while not done:
        # 1. Draft: generate gamma tokens with small model
        draft_tokens = []
        draft_probs = []
        
        for _ in range(gamma):
            logits = draft_model(output + draft_tokens)
            prob = softmax(logits[-1])
            token = sample(prob)
            draft_tokens.append(token)
            draft_probs.append(prob[token])
        
        # 2. Verify: run target model on all drafts at once
        target_logits = target_model(output + draft_tokens)
        target_probs = [softmax(l) for l in target_logits[-gamma-1:]]
        
        # 3. Accept/reject each token
        accepted = 0
        for i in range(gamma):
            r = random.random()
            acceptance_prob = min(1, target_probs[i][draft_tokens[i]] / draft_probs[i])
            
            if r < acceptance_prob:
                accepted += 1
            else:
                # Reject this and all following tokens
                break
        
        # 4. Sample correction token if rejected
        if accepted < gamma:
            # Resample from adjusted distribution
            correction = sample(adjusted_distribution(target_probs[accepted], draft_probs))
            output.extend(draft_tokens[:accepted] + [correction])
        else:
            # All accepted, sample one more from target
            output.extend(draft_tokens)
            bonus = sample(target_probs[-1])
            output.append(bonus)
    
    return output
```

## Mathematical Guarantee

Speculative decoding preserves the target distribution **exactly**:

$$P(\text{accepted tokens}) = P_{\text{target}}(\text{tokens})$$

This is achieved through rejection sampling with careful probability adjustment.

## Variants

### Self-Speculative Decoding

Use early layers of the same model as draft:

```python
def self_speculative(model, prompt, early_exit_layer=8):
    # Draft using early layers only
    hidden = model.embed(prompt)
    for layer in model.layers[:early_exit_layer]:
        hidden = layer(hidden)
    draft_logits = model.lm_head(hidden)
    
    # Verify with full model
    full_logits = model(prompt + draft_tokens)
```

### Medusa

Add multiple prediction heads for parallel speculation:

```
                    ┌─► Head 1 → predict t+1
Model hidden ──────├─► Head 2 → predict t+2
                    ├─► Head 3 → predict t+3
                    └─► Head 4 → predict t+4
```

### Lookahead Decoding

Parallel token generation using Jacobi iteration:

```python
def lookahead_decode(model, prompt, window_size=5):
    # Initialize guesses
    guesses = [model.sample(prompt) for _ in range(window_size)]
    
    # Iterate until convergence
    while not converged:
        # Parallel forward pass
        all_logits = model.forward_parallel(prompt + guesses)
        
        # Update guesses
        new_guesses = [sample(logits) for logits in all_logits]
        
        # Check convergence
        converged = (new_guesses == guesses)
        guesses = new_guesses
```

## Speedup Analysis

Expected tokens per forward pass:

$$E[\text{accepted}] = \frac{1 - \alpha^{\gamma+1}}{1 - \alpha}$$

Where α = probability draft matches target.

| Draft Quality (α) | γ=4 | γ=8 |
|-------------------|-----|-----|
| 0.5 | 1.94 | 1.99 |
| 0.7 | 2.95 | 3.54 |
| 0.9 | 4.10 | 6.13 |

**Speedup ≈ E[accepted] / (1 + draft_cost/target_cost)**

## Practical Considerations

### Draft Model Selection

| Target Model | Good Draft Models |
|--------------|-------------------|
| LLaMA-70B | LLaMA-7B, TinyLLaMA |
| GPT-4 | GPT-3.5-turbo |
| Claude-3-Opus | Claude-3-Haiku |

### Optimal Speculation Length

```python
def optimal_gamma(alpha, draft_cost, target_cost):
    """
    alpha: acceptance rate
    draft_cost: relative cost of draft model
    target_cost: relative cost of target model (usually 1)
    """
    # Optimal gamma increases with alpha, decreases with draft cost
    return int(math.log(draft_cost / target_cost) / math.log(alpha))
```

## Integration

### vLLM

```python
from vllm import LLM, SamplingParams

llm = LLM(
    model="meta-llama/Llama-2-70b",
    speculative_model="meta-llama/Llama-2-7b",
    num_speculative_tokens=4
)
```

### HuggingFace

```python
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("large_model")
assistant = AutoModelForCausalLM.from_pretrained("small_model")

outputs = model.generate(
    inputs,
    assistant_model=assistant,
    do_sample=True
)
```

---

*Speculative decoding exemplifies a key principle: the hardest problems often have solutions that exploit structure we didn't know we had.*
