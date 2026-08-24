---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - Architecture
  - Efficiency
authors: parnian
coverImage: /images/blog/mixture-of-experts.png
---

# Mixture of Experts: Scaling Beyond Dense Models

Mixture of Experts (MoE) architectures achieve massive scale while keeping inference costs manageable—by activating only a subset of parameters for each input.

## The Dense Model Problem

Dense transformers activate every parameter for every token:

```
Dense Transformer:
Parameters: 175B
FLOPs per token: ~350 TFLOPs
Every forward pass uses ALL 175B parameters

MoE Alternative:
Total Parameters: 1.8T
Active Parameters: ~18B (1% at a time)
FLOPs per token: ~36 TFLOPs
10x more capacity, similar compute
```

## Core Architecture

```python
class MoELayer(nn.Module):
    def __init__(self, d_model, n_experts, expert_capacity, top_k=2):
        super().__init__()
        self.n_experts = n_experts
        self.top_k = top_k
        self.expert_capacity = expert_capacity

        # Router: decides which experts to use
        self.router = nn.Linear(d_model, n_experts)

        # Experts: independent FFN blocks
        self.experts = nn.ModuleList([
            FFNBlock(d_model) for _ in range(n_experts)
        ])

    def forward(self, x):
        # x: [batch, seq_len, d_model]
        batch_size, seq_len, d_model = x.shape

        # Compute routing scores
        router_logits = self.router(x)  # [batch, seq, n_experts]
        router_probs = F.softmax(router_logits, dim=-1)

        # Select top-k experts per token
        top_k_probs, top_k_indices = torch.topk(
            router_probs, self.top_k, dim=-1
        )

        # Normalize selected probabilities
        top_k_probs = top_k_probs / top_k_probs.sum(dim=-1, keepdim=True)

        # Compute expert outputs
        output = torch.zeros_like(x)
        for i, expert in enumerate(self.experts):
            # Find tokens routed to this expert
            mask = (top_k_indices == i).any(dim=-1)
            if mask.any():
                expert_input = x[mask]
                expert_output = expert(expert_input)

                # Weight by routing probability
                weights = top_k_probs[mask][top_k_indices[mask] == i]
                output[mask] += weights.unsqueeze(-1) * expert_output

        return output
```

## Load Balancing

Without balance, all tokens might route to one "popular" expert:

```python
def load_balancing_loss(router_probs, top_k_indices, n_experts):
    """Encourage uniform expert utilization."""

    # Fraction of tokens routed to each expert
    tokens_per_expert = torch.bincount(
        top_k_indices.flatten(),
        minlength=n_experts
    ).float()
    tokens_fraction = tokens_per_expert / tokens_per_expert.sum()

    # Average routing probability to each expert
    router_prob_per_expert = router_probs.mean(dim=[0, 1])

    # Auxiliary loss: penalize imbalance
    # Ideal: both are uniform (1/n_experts each)
    aux_loss = n_experts * (tokens_fraction * router_prob_per_expert).sum()

    return aux_loss
```

## Expert Capacity

Prevent single expert from being overwhelmed:

```python
class CapacitiedMoE(nn.Module):
    def __init__(self, d_model, n_experts, capacity_factor=1.25):
        super().__init__()
        self.capacity_factor = capacity_factor
        # ... (same as before)

    def forward(self, x):
        batch_size, seq_len, _ = x.shape

        # Maximum tokens per expert
        capacity = int(self.capacity_factor * seq_len / self.n_experts)

        # Route tokens with capacity constraint
        expert_mask = torch.zeros(batch_size, seq_len, self.n_experts)
        expert_counts = torch.zeros(self.n_experts)

        for b in range(batch_size):
            for s in range(seq_len):
                probs = router_probs[b, s]
                for expert_idx in probs.argsort(descending=True):
                    if expert_counts[expert_idx] < capacity:
                        expert_mask[b, s, expert_idx] = 1
                        expert_counts[expert_idx] += 1
                        break
                # Overflow tokens are dropped!

        return self.compute_with_mask(x, expert_mask)
```

## Router Architectures

### Token Choice (Standard)

```
Each token chooses its top-k experts
+ Simple, common approach
- Can cause load imbalance
```

### Expert Choice

```python
def expert_choice_routing(x, n_experts, capacity):
    """Experts choose which tokens to process."""
    router_logits = self.router(x)  # [batch*seq, n_experts]

    # Each expert picks top-capacity tokens
    expert_outputs = []
    for expert_idx in range(n_experts):
        scores = router_logits[:, expert_idx]
        top_indices = scores.topk(capacity).indices
        expert_input = x[top_indices]
        expert_output = self.experts[expert_idx](expert_input)
        expert_outputs.append((top_indices, expert_output))

    # Combine outputs
    return combine_expert_outputs(expert_outputs, x.shape)
```

### Soft Routing (Soft MoE)

```python
def soft_routing(x, n_experts, n_slots):
    """Differentiable weighted combination."""
    # Create slots for each expert
    slots = self.slot_embedding(expert_ids)  # [n_experts, n_slots, d]

    # Attention: tokens attend to all slots
    dispatch_weights = softmax(x @ slots.T)  # [batch, seq, n_experts*n_slots]

    # Weighted input to each expert
    expert_inputs = einsum('bsd,bsk->bkd', x, dispatch_weights)

    # Process through experts
    expert_outputs = [exp(inp) for exp, inp in zip(self.experts, expert_inputs)]

    # Combine back to sequence
    combine_weights = softmax(slots @ x.T)
    output = einsum('bkd,bks->bsd', expert_outputs, combine_weights)

    return output
```

## Notable MoE Models

| Model | Total Params | Active Params | Experts | Top-k |
|-------|-------------|---------------|---------|-------|
| Switch-C | 1.6T | 1.6B | 2048 | 1 |
| GLaM | 1.2T | 96B | 64 | 2 |
| Mixtral 8x7B | 46.7B | 12.9B | 8 | 2 |
| Mixtral 8x22B | 176B | 39B | 8 | 2 |
| GPT-4 (rumored) | ~1.8T | ~200B | 16 | 2 |
| DeepSeek MoE | 145B | 22B | 64 | 6 |

## Training Challenges

### Router Collapse

Early training can lock into degenerate solutions:

```python
# Problem: Router always picks expert 0
router_probs = [0.99, 0.01, 0.00, ...]  # Every token

# Solutions:
# 1. Add noise during training
noisy_logits = router_logits + gumbel_noise() * temperature

# 2. Expert dropout: randomly drop experts
if training:
    available_experts = random.sample(range(n_experts), k=n_experts-2)

# 3. Strong load balancing loss
total_loss = task_loss + 0.1 * load_balance_loss
```

### Expert Specialization

Good: Experts learn different skills

```
Expert 0: Math and code
Expert 1: Creative writing
Expert 2: Factual knowledge
Expert 3: Reasoning
...
```

Bad: Experts are random subsets, no clear specialization

### All-to-All Communication (Distributed)

```
Problem: Each token might need different experts on different GPUs

Solution: All-to-all collective
1. Each GPU has some experts
2. Tokens are dispatched to appropriate GPUs
3. Experts process their tokens
4. Results sent back (another all-to-all)

Cost: 2 all-to-all per MoE layer
Optimization: Pipeline with computation
```

## Inference Efficiency

```python
class EfficientMoEInference:
    def __init__(self, model):
        self.model = model
        # Pre-allocate expert buffers
        self.expert_buffers = [
            torch.zeros(max_batch, d_model, device='cuda')
            for _ in range(n_experts)
        ]

    def forward(self, x):
        # Batch by expert for efficient execution
        routes = self.model.route(x)

        outputs = []
        for expert_idx in range(self.n_experts):
            mask = routes == expert_idx
            if mask.any():
                # Process all tokens for this expert together
                batch = x[mask]
                out = self.model.experts[expert_idx](batch)
                outputs.append((mask, out))

        return self.scatter(outputs, x.shape)
```

## MoE vs Dense Trade-offs

| Aspect | Dense | MoE |
|--------|-------|-----|
| Parameter efficiency | Lower (all used) | Higher (sparse activation) |
| Memory at inference | All params loaded | All params loaded |
| Compute at inference | Proportional to params | Sublinear in params |
| Training stability | More stable | Requires careful balancing |
| Serving complexity | Simple | Expert routing overhead |
| Batch efficiency | High | Can have load imbalance |

## Implementation Tips

```python
# 1. Start with fewer experts, scale up
n_experts = 8  # Not 2048 from the start

# 2. Use expert parallelism
# Each GPU holds subset of experts
expert_parallel_group = dist.new_group(ranks=[...])

# 3. Capacity factor > 1 to avoid drops
capacity_factor = 1.5  # 50% buffer

# 4. Monitor routing entropy
def routing_entropy(probs):
    return -(probs * probs.log()).sum(-1).mean()
# High entropy = balanced, low = collapsed
```

## References

- [Switch Transformers](https://arxiv.org/abs/2101.03961)
- [Mixtral of Experts](https://arxiv.org/abs/2401.04088)
- [GLaM: Efficient Scaling](https://arxiv.org/abs/2112.06905)
- [ST-MoE: Stable Training](https://arxiv.org/abs/2202.08906)

---

*Mixture of Experts demonstrates that intelligence might not require using all knowledge for every problem—the art is in knowing which subset of capabilities to activate.*
