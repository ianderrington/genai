---
date:
  created: 2025-03-14
  updated: 2025-03-14
categories:
  - Research
  - Training
  - Alignment
authors: 
  - parnian
---

# DPO: Direct Preference Optimization Explained

Direct Preference Optimization (DPO) has emerged as a simpler, more stable alternative to RLHF for aligning language models with human preferences—achieving comparable results without training a separate reward model.

## The Problem with RLHF

RLHF requires multiple complex components:

```
RLHF Pipeline:
1. Collect preference data (human comparisons)
2. Train reward model on preferences
3. Use PPO to optimize policy against reward model
4. Repeat with updated data

Issues:
- Reward model can be exploited
- PPO is unstable and sensitive to hyperparameters
- Multiple models to train and maintain
- High computational cost
```

## DPO's Key Insight

DPO shows that the optimal policy can be derived directly from preferences:

```
Given: Preference pairs (y_w, y_l) where y_w is preferred over y_l

RLHF: Preferences → Reward Model → PPO → Aligned Policy

DPO:  Preferences → Aligned Policy (directly!)
```

### Mathematical Foundation

The Bradley-Terry preference model:

$$p(y_w \succ y_l | x) = \sigma(r(x, y_w) - r(x, y_l))$$

DPO shows the optimal policy satisfies:

$$r(x, y) = \beta \log \frac{\pi_\theta(y|x)}{\pi_{ref}(y|x)} + \beta \log Z(x)$$

This means we can substitute the policy directly into the preference model, eliminating the need for a separate reward model.

### The DPO Loss

```python
def dpo_loss(model, ref_model, x, y_w, y_l, beta=0.1):
    """
    x: input prompt
    y_w: preferred completion
    y_l: dispreferred completion
    beta: temperature parameter
    """
    # Log probabilities from policy
    logp_w = model.log_prob(y_w | x)
    logp_l = model.log_prob(y_l | x)
    
    # Log probabilities from reference model
    ref_logp_w = ref_model.log_prob(y_w | x)
    ref_logp_l = ref_model.log_prob(y_l | x)
    
    # Log ratios
    log_ratio_w = logp_w - ref_logp_w
    log_ratio_l = logp_l - ref_logp_l
    
    # DPO loss
    loss = -F.logsigmoid(beta * (log_ratio_w - log_ratio_l))
    
    return loss.mean()
```

## Training Pipeline

```
┌─────────────────────────────────────────────────────┐
│                 DPO Training                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────┐                               │
│  │ Preference Data │                               │
│  │ (x, y_w, y_l)   │                               │
│  └────────┬────────┘                               │
│           │                                         │
│           ▼                                         │
│  ┌─────────────────┐     ┌─────────────────┐      │
│  │  Policy Model   │     │ Reference Model │      │
│  │   π_θ (train)   │     │   π_ref (frozen)│      │
│  └────────┬────────┘     └────────┬────────┘      │
│           │                       │                │
│           └───────────┬───────────┘                │
│                       │                            │
│                       ▼                            │
│              ┌─────────────────┐                  │
│              │    DPO Loss     │                  │
│              │   (gradient)    │                  │
│              └─────────────────┘                  │
└─────────────────────────────────────────────────────┘
```

## Implementation

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from datasets import load_dataset

class DPOTrainer:
    def __init__(self, model_name, beta=0.1, learning_rate=1e-6):
        self.model = AutoModelForCausalLM.from_pretrained(model_name)
        self.ref_model = AutoModelForCausalLM.from_pretrained(model_name)
        self.ref_model.eval()  # Freeze reference model
        
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.beta = beta
        self.optimizer = torch.optim.AdamW(
            self.model.parameters(), 
            lr=learning_rate
        )
    
    def compute_log_probs(self, model, input_ids, attention_mask):
        with torch.no_grad() if model == self.ref_model else torch.enable_grad():
            outputs = model(input_ids, attention_mask=attention_mask)
            logits = outputs.logits[:, :-1, :]
            labels = input_ids[:, 1:]
            
            log_probs = F.log_softmax(logits, dim=-1)
            selected_log_probs = torch.gather(
                log_probs, 
                dim=-1, 
                index=labels.unsqueeze(-1)
            ).squeeze(-1)
            
            # Sum over sequence
            return (selected_log_probs * attention_mask[:, 1:]).sum(dim=1)
    
    def train_step(self, batch):
        # Tokenize
        chosen_ids = self.tokenizer(batch['chosen'], return_tensors='pt')
        rejected_ids = self.tokenizer(batch['rejected'], return_tensors='pt')
        
        # Compute log probs
        pi_chosen = self.compute_log_probs(self.model, **chosen_ids)
        pi_rejected = self.compute_log_probs(self.model, **rejected_ids)
        ref_chosen = self.compute_log_probs(self.ref_model, **chosen_ids)
        ref_rejected = self.compute_log_probs(self.ref_model, **rejected_ids)
        
        # DPO loss
        chosen_rewards = self.beta * (pi_chosen - ref_chosen)
        rejected_rewards = self.beta * (pi_rejected - ref_rejected)
        
        loss = -F.logsigmoid(chosen_rewards - rejected_rewards).mean()
        
        # Backward
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()
        
        return loss.item()
```

## Variants and Extensions

### IPO (Identity Preference Optimization)

Addresses distribution shift with a different loss:

$$\mathcal{L}_{IPO} = \left(\log\frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)} - \log\frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)} - \frac{1}{2\beta}\right)^2$$

### KTO (Kahneman-Tversky Optimization)

Uses individual ratings rather than pairs:

```python
def kto_loss(model, ref_model, x, y, is_good, beta=0.1):
    log_ratio = model.log_prob(y|x) - ref_model.log_prob(y|x)
    
    if is_good:
        return 1 - sigmoid(beta * log_ratio)
    else:
        return 1 - sigmoid(-beta * log_ratio)
```

### ORPO (Odds Ratio Preference Optimization)

No reference model needed:

$$\mathcal{L}_{ORPO} = -\log p(y_w|x) + \lambda \cdot \log\sigma\left(\log\frac{p(y_w|x)}{1-p(y_w|x)} - \log\frac{p(y_l|x)}{1-p(y_l|x)}\right)$$

### SimPO (Simple Preference Optimization)

Uses length-normalized rewards:

$$r(x, y) = \frac{\beta}{|y|} \log \pi_\theta(y|x) - \gamma$$

## Comparison

| Method | Reward Model | Reference Model | Stability | Performance |
|--------|--------------|-----------------|-----------|-------------|
| RLHF + PPO | Required | Required | Unstable | High |
| DPO | None | Required | Stable | High |
| IPO | None | Required | Stable | High |
| KTO | None | Required | Stable | Medium |
| ORPO | None | None | Very Stable | Medium |
| SimPO | None | None | Very Stable | High |

## Best Practices

### Data Quality

```python
# Good preference data:
{
    "prompt": "Explain quantum computing",
    "chosen": "Quantum computing uses quantum mechanical phenomena...",  # Accurate, helpful
    "rejected": "Quantum computers are really fast computers..."  # Oversimplified
}

# Avoid ambiguous pairs where both are equally good/bad
```

### Hyperparameters

| Parameter | Typical Range | Effect |
|-----------|---------------|--------|
| β (beta) | 0.05 - 0.5 | Higher = stronger constraint to reference |
| Learning rate | 1e-7 - 5e-6 | Lower than SFT |
| Batch size | 16 - 64 | Larger is more stable |
| Epochs | 1 - 3 | More risks overfitting |

### Training Tips

1. Start from a good SFT model
2. Use β around 0.1 as a starting point
3. Monitor both chosen and rejected rewards
4. Watch for reward hacking (gap growing too fast)
5. Validate on held-out preference data

## When to Use DPO vs RLHF

**Use DPO when:**
- Simpler pipeline preferred
- Limited compute
- Stable training important
- Moderate alignment needs

**Use RLHF when:**
- Reward model needed for other purposes
- Fine-grained reward shaping needed
- Online data collection planned
- Maximum performance required

## References

- [DPO Paper](https://arxiv.org/abs/2305.18290)
- [IPO Paper](https://arxiv.org/abs/2310.12036)
- [KTO Paper](https://arxiv.org/abs/2402.01306)
- [ORPO Paper](https://arxiv.org/abs/2403.07691)
- [SimPO Paper](https://arxiv.org/abs/2405.14734)

---

*DPO represents a philosophical shift: instead of learning what's good (reward modeling) then chasing it (RL), we directly learn to prefer what's good.*
