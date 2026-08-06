---
date:
  created: 2025-03-18
  updated: 2025-03-18
categories:
  - Research
  - Inference
  - Memory
authors: 
  - parnian
---

# KV Cache Optimization: Scaling to Million-Token Contexts

The KV (Key-Value) cache is the memory bottleneck for long-context LLM inference. This post explores techniques to reduce KV cache memory while maintaining model quality.

## The KV Cache Problem

For each generated token, we cache Keys and Values from all previous tokens:

```
Memory = 2 × layers × heads × seq_len × head_dim × bytes

For LLaMA-70B at 100K context:
= 2 × 80 × 64 × 100,000 × 128 × 2 (FP16)
= 262 GB just for KV cache!
```

## Optimization Techniques

### 1. Multi-Query Attention (MQA)

Share K,V across all query heads:

```
Standard MHA:  Q[H,D] × K[H,D] × V[H,D]
MQA:           Q[H,D] × K[1,D] × V[1,D]

Memory reduction: H× (e.g., 64×)
```

### 2. Grouped-Query Attention (GQA)

Compromise between MHA and MQA:

```python
class GroupedQueryAttention(nn.Module):
    def __init__(self, d_model, n_heads, n_kv_heads):
        self.n_heads = n_heads
        self.n_kv_heads = n_kv_heads
        self.head_dim = d_model // n_heads
        
        self.q_proj = nn.Linear(d_model, n_heads * self.head_dim)
        self.k_proj = nn.Linear(d_model, n_kv_heads * self.head_dim)
        self.v_proj = nn.Linear(d_model, n_kv_heads * self.head_dim)
    
    def forward(self, x, kv_cache=None):
        q = self.q_proj(x).view(B, L, self.n_heads, self.head_dim)
        k = self.k_proj(x).view(B, L, self.n_kv_heads, self.head_dim)
        v = self.v_proj(x).view(B, L, self.n_kv_heads, self.head_dim)
        
        # Repeat KV heads to match Q heads
        k = k.repeat_interleave(self.n_heads // self.n_kv_heads, dim=2)
        v = v.repeat_interleave(self.n_heads // self.n_kv_heads, dim=2)
```

### 3. KV Cache Quantization

Reduce precision of cached values:

```python
def quantize_kv_cache(k, v, bits=4):
    # Per-channel quantization
    k_min, k_max = k.min(dim=-1), k.max(dim=-1)
    v_min, v_max = v.min(dim=-1), v.max(dim=-1)
    
    # Quantize
    k_quant = quantize(k, k_min, k_max, bits)
    v_quant = quantize(v, v_min, v_max, bits)
    
    return k_quant, v_quant, (k_min, k_max, v_min, v_max)

# FP16 → INT4 = 4× memory reduction
```

### 4. Sliding Window Attention

Only attend to recent tokens:

```python
def sliding_window_attention(q, k, v, window_size=4096):
    seq_len = q.shape[1]
    
    # Create sliding window mask
    mask = torch.ones(seq_len, seq_len, dtype=torch.bool)
    for i in range(seq_len):
        mask[i, max(0, i-window_size):i+1] = False
    
    # Apply mask (set masked positions to -inf)
    attn_weights = q @ k.T / math.sqrt(d)
    attn_weights.masked_fill_(mask, float('-inf'))
    
    return softmax(attn_weights) @ v
```

### 5. StreamingLLM

Keep attention sinks + recent tokens:

```python
def streaming_attention(q, k, v, n_sink=4, n_recent=4096):
    """
    Keep first n_sink tokens (attention sinks) +
    most recent n_recent tokens
    """
    seq_len = k.shape[1]
    
    if seq_len <= n_sink + n_recent:
        return standard_attention(q, k, v)
    
    # Select sink + recent tokens
    keep_indices = list(range(n_sink)) + list(range(seq_len - n_recent, seq_len))
    
    k_selected = k[:, keep_indices]
    v_selected = v[:, keep_indices]
    
    return standard_attention(q, k_selected, v_selected)
```

### 6. Token Dropping / Pruning

Remove less important tokens from cache:

```python
def prune_kv_cache(k, v, importance_scores, keep_ratio=0.5):
    """Remove lowest-importance tokens"""
    n_keep = int(k.shape[1] * keep_ratio)
    
    # Keep top-k by importance
    _, indices = importance_scores.topk(n_keep)
    indices = indices.sort().values
    
    k_pruned = k[:, indices]
    v_pruned = v[:, indices]
    
    return k_pruned, v_pruned
```

### 7. Paged Attention (vLLM)

Manage KV cache like virtual memory:

```
Physical KV blocks    Logical sequence
┌────┬────┬────┐     ┌────┬────┬────┬────┐
│ B0 │ B1 │ B2 │ ←── │ S0 │ S1 │ S2 │ S3 │
└────┴────┴────┘     └────┴────┴────┴────┘
                           ↓
                     Page table maps
                     logical → physical
```

Benefits:
- No memory fragmentation
- Efficient batch scheduling
- Memory sharing across sequences

## Comparison

| Technique | Memory Reduction | Quality Impact | Complexity |
|-----------|------------------|----------------|------------|
| MQA | 64× | Moderate | Architecture change |
| GQA (8 groups) | 8× | Minimal | Architecture change |
| INT4 Quantization | 4× | Minimal | Easy |
| Sliding Window | Bounded | Task-dependent | Easy |
| StreamingLLM | Bounded | Minimal | Easy |
| Paged Attention | No reduction | None | Complex |

## Combining Techniques

Modern systems combine multiple approaches:

```
LLaMA-3-70B Long Context:
- GQA (8 KV heads vs 64 Q heads): 8× reduction
- Sliding window (128K): Bounded memory
- Paged attention: No fragmentation
- INT8 KV cache: Additional 2× reduction

Result: 1M+ tokens feasible on single GPU
```

---

*The KV cache is where the rubber meets the road for long-context LLMs—these optimizations make million-token contexts practical.*
