---
date:
  created: 2025-03-15
  updated: 2025-03-15
categories:
  - Research
  - Optimization
  - Efficiency
authors: 
  - parnian
---

# Flash Attention: IO-Aware Exact Attention

Flash Attention revolutionized transformer efficiency by making attention computation memory-efficient without any approximation—enabling longer contexts and faster training through careful GPU memory management.

## The Attention Bottleneck

Standard attention is quadratic in sequence length:

```
For sequence length N:
- Compute QK^T: O(N²) operations, O(N²) memory
- Store attention matrix: O(N²) memory
- Apply softmax: O(N²) operations
- Multiply by V: O(N²) operations

Problem: For N=32k, attention matrix = 4GB (float32)!
```

## The Key Insight

Flash Attention recognizes that the bottleneck isn't computation—it's **memory bandwidth**:

```
GPU Memory Hierarchy:
┌─────────────────────────────────────────────┐
│          HBM (High Bandwidth Memory)         │
│          ~80GB, 2TB/s bandwidth              │
└─────────────────────────────────────────────┘
                    ↕ Slow
┌─────────────────────────────────────────────┐
│              SRAM (On-chip)                  │
│          ~20MB, 19TB/s bandwidth             │
└─────────────────────────────────────────────┘
                    ↕ Fast
┌─────────────────────────────────────────────┐
│              Registers                       │
└─────────────────────────────────────────────┘

Standard attention: Read Q,K,V from HBM → Compute → Write N² to HBM → Read N² → Output
Flash attention:    Read Q,K,V tiles from HBM → Compute in SRAM → Write O to HBM
                    (Never materialize N² matrix in HBM!)
```

## The Algorithm

### Tiling

Process attention in blocks that fit in SRAM:

```python
def flash_attention(Q, K, V, block_size=64):
    N, d = Q.shape
    O = torch.zeros_like(Q)
    L = torch.zeros(N)  # Log-sum-exp for numerical stability
    
    # Process in blocks
    for i in range(0, N, block_size):
        Qi = Q[i:i+block_size]
        Oi = torch.zeros_like(Qi)
        Li = torch.full((block_size,), float('-inf'))
        
        for j in range(0, N, block_size):
            Kj = K[j:j+block_size]
            Vj = V[j:j+block_size]
            
            # Compute block attention scores
            Sij = Qi @ Kj.T / math.sqrt(d)
            
            # Online softmax update
            mi_new = torch.maximum(Li, Sij.max(dim=-1).values)
            
            # Rescale existing output
            scale_old = torch.exp(Li - mi_new)
            scale_new = torch.exp(Sij - mi_new.unsqueeze(-1))
            
            # Update output
            Oi = scale_old.unsqueeze(-1) * Oi + scale_new @ Vj
            Li = mi_new + torch.log(
                torch.exp(Li - mi_new) + scale_new.sum(dim=-1)
            )
        
        O[i:i+block_size] = Oi / torch.exp(Li).unsqueeze(-1)
    
    return O
```

### Online Softmax

The key trick—compute softmax incrementally without full matrix:

```python
def online_softmax_update(m_prev, l_prev, o_prev, s_new, v_new):
    """
    m: running maximum
    l: running sum of exp(x - m)
    o: running weighted sum
    s_new: new attention scores
    v_new: new values
    """
    m_new = max(m_prev, max(s_new))
    
    # Rescale factors
    alpha = exp(m_prev - m_new)
    beta = exp(s_new - m_new)
    
    # Update statistics
    l_new = alpha * l_prev + sum(beta)
    o_new = alpha * o_prev + sum(beta.unsqueeze(-1) * v_new)
    
    return m_new, l_new, o_new
```

## Flash Attention 2 Improvements

### Better Parallelism

```
Flash Attention 1: Parallelize over batch, heads
Flash Attention 2: + Parallelize over sequence length
                   (Better GPU occupancy)
```

### Reduced Non-Matmul FLOPs

```python
# FA1: Many divisions and exp() calls per block
# FA2: Reorganized to minimize non-matmul operations

# FA2 processes Q blocks in outer loop (not K blocks)
# This reduces writes to HBM
```

### Work Partitioning

```
FA1: Each thread block handles one output block
FA2: Split work across warps within thread block
     - Better load balancing
     - Reduced synchronization
```

## Flash Attention 3 (2024)

Further optimizations for Hopper GPUs (H100):

1. **Tensor Cores**: Better utilization of FP8 tensor cores
2. **Async operations**: Overlap compute and memory access
3. **Warp specialization**: Different warps do different tasks
4. **Block quantization**: FP8 with per-block scaling

## Usage

### PyTorch (Native)

```python
import torch.nn.functional as F

# Requires PyTorch 2.0+
output = F.scaled_dot_product_attention(
    query, key, value,
    is_causal=True,  # For autoregressive models
    enable_math=False,  # Use flash attention
)
```

### Flash Attention Library

```python
from flash_attn import flash_attn_func

output = flash_attn_func(
    q, k, v,
    causal=True,
    softmax_scale=1.0 / math.sqrt(head_dim)
)
```

### Transformers Library

```python
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained(
    "model_name",
    attn_implementation="flash_attention_2"
)
```

## Benchmarks

| Sequence Length | Standard Attention | Flash Attention 2 | Speedup |
|-----------------|-------------------|-------------------|---------|
| 1024 | 100% | 85% | 1.2x |
| 4096 | 100% | 40% | 2.5x |
| 16384 | OOM | 25% | ∞ |
| 65536 | OOM | 15% | ∞ |

Memory usage: **O(N)** instead of **O(N²)**

## Variants

### Multi-Query Attention (MQA)

```
Standard:  Q: [B, H, N, D], K: [B, H, N, D], V: [B, H, N, D]
MQA:       Q: [B, H, N, D], K: [B, 1, N, D], V: [B, 1, N, D]

Flash Attention handles both efficiently
```

### Grouped-Query Attention (GQA)

```
GQA:       Q: [B, H, N, D], K: [B, G, N, D], V: [B, G, N, D]
           where H is divisible by G
```

### Sliding Window

```python
output = flash_attn_func(
    q, k, v,
    window_size=(512, 512),  # Local attention window
    causal=True
)
```

## Limitations

1. **Hardware specific**: Optimized for NVIDIA GPUs (CUDA)
2. **Head dimension**: Works best with standard head dims (64, 128)
3. **Compilation**: Requires careful CUDA kernel tuning
4. **Debugging**: Harder to debug fused kernels

## References

- [Flash Attention Paper](https://arxiv.org/abs/2205.14135)
- [Flash Attention 2](https://arxiv.org/abs/2307.08691)
- [Flash Attention GitHub](https://github.com/Dao-AILab/flash-attention)

---

*Flash Attention teaches a profound lesson: the biggest gains often come not from algorithmic changes, but from understanding hardware constraints.*
