---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - Efficiency
  - Deployment
authors: parnian
---

# LLM Quantization: Running Giants on Consumer Hardware

Quantization reduces the precision of model weights and activations, enabling massive language models to run on consumer GPUs, mobile devices, and edge hardware with minimal quality loss.

## The Precision Hierarchy

```
FP32 (Full Precision):     32 bits per parameter
FP16 (Half Precision):     16 bits per parameter
BF16 (Brain Float):        16 bits (more range, less precision)
INT8 (8-bit Integer):       8 bits per parameter
INT4 (4-bit Integer):       4 bits per parameter
INT2 (2-bit Integer):       2 bits per parameter

Memory for 70B model:
FP32: 280 GB
FP16: 140 GB
INT8:  70 GB
INT4:  35 GB  ← Fits on 2x RTX 4090 (48GB)
INT2:  17.5 GB
```

## Why Quantization Works

LLM weights follow approximately normal distributions:

```
Weight distribution:
        ████
       ██████
      ████████
     ██████████
    ████████████
━━━━━━━━━━━━━━━━━━
   -3σ  -2σ  μ  +2σ +3σ

Most weights are near zero → don't need full precision
Outliers are rare but important → need special handling
```

## Post-Training Quantization (PTQ)

Quantize after training without retraining:

```python
def quantize_tensor(tensor, bits=8, symmetric=True):
    """Basic uniform quantization."""
    if symmetric:
        # Symmetric: range is [-max, max]
        scale = tensor.abs().max() / (2**(bits-1) - 1)
        zero_point = 0
    else:
        # Asymmetric: range is [min, max]
        min_val, max_val = tensor.min(), tensor.max()
        scale = (max_val - min_val) / (2**bits - 1)
        zero_point = round(-min_val / scale)

    # Quantize
    q_tensor = torch.round(tensor / scale + zero_point)
    q_tensor = q_tensor.clamp(0, 2**bits - 1).to(torch.uint8)

    return q_tensor, scale, zero_point

def dequantize_tensor(q_tensor, scale, zero_point):
    """Convert back to float for computation."""
    return scale * (q_tensor.float() - zero_point)
```

## GPTQ: Optimal Brain Quantization

Layer-by-layer quantization minimizing squared error:

```python
class GPTQQuantizer:
    def __init__(self, layer, bits=4):
        self.bits = bits
        self.layer = layer

    def quantize(self, calibration_data):
        # Collect Hessian approximation from calibration data
        H = self.compute_hessian(calibration_data)

        W = self.layer.weight.data.clone()
        Q = torch.zeros_like(W)

        # Process columns in optimal order
        for col_idx in self.get_optimal_order(H):
            # Quantize this column
            q_col = self.quantize_column(W[:, col_idx])
            Q[:, col_idx] = q_col

            # Compensate error in remaining columns
            error = W[:, col_idx] - self.dequantize(q_col)
            for remaining_col in range(col_idx + 1, W.shape[1]):
                W[:, remaining_col] -= (
                    error * H[col_idx, remaining_col] / H[col_idx, col_idx]
                )

        return Q
```

## AWQ: Activation-Aware Weight Quantization

Protect weights that matter most based on activation patterns:

```python
class AWQQuantizer:
    def __init__(self, model, bits=4):
        self.model = model
        self.bits = bits

    def find_important_weights(self, calibration_data):
        """Weights multiplied by large activations are important."""
        importance = {}

        for batch in calibration_data:
            activations = self.model.get_activations(batch)
            for name, act in activations.items():
                # Weight importance ∝ activation magnitude
                weight_importance = act.abs().mean(dim=0)
                if name in importance:
                    importance[name] += weight_importance
                else:
                    importance[name] = weight_importance

        return importance

    def quantize_with_scaling(self, W, importance):
        """Scale important weights up before quantization."""
        # Find optimal scale that protects important weights
        scale = self.search_optimal_scale(W, importance)

        # Scale weights (important ones get more precision)
        W_scaled = W * scale

        # Quantize
        W_quant = self.quantize(W_scaled)

        # Store scale for inference (divide activations)
        return W_quant, scale
```

## QLoRA: Quantized Fine-Tuning

Fine-tune quantized models efficiently:

```python
class QLoRALayer(nn.Module):
    def __init__(self, base_layer, r=16, alpha=32):
        super().__init__()
        # Frozen 4-bit base weights
        self.base_weight = quantize_nf4(base_layer.weight)

        # Trainable low-rank adapters (full precision)
        self.lora_A = nn.Parameter(torch.randn(r, base_layer.in_features))
        self.lora_B = nn.Parameter(torch.zeros(base_layer.out_features, r))
        self.scaling = alpha / r

    def forward(self, x):
        # Dequantize base (happens in compute)
        base_out = F.linear(x, dequantize_nf4(self.base_weight))

        # Add LoRA contribution
        lora_out = (x @ self.lora_A.T) @ self.lora_B.T * self.scaling

        return base_out + lora_out
```

## NormalFloat4 (NF4) Quantization

Information-theoretically optimal 4-bit representation:

```python
# NF4 Quantile-based quantization
# Maps values to 16 levels based on normal distribution quantiles

NF4_LEVELS = [
    -1.0, -0.6962, -0.5251, -0.3949,
    -0.2844, -0.1848, -0.0911, 0.0,
    0.0796, 0.1609, 0.2461, 0.3379,
    0.4407, 0.5626, 0.7230, 1.0
]

def quantize_nf4(tensor):
    """Quantize to NF4 format."""
    # Normalize to [-1, 1] range per block
    blocks = tensor.view(-1, BLOCK_SIZE)
    absmax = blocks.abs().max(dim=1, keepdim=True).values
    normalized = blocks / absmax

    # Find nearest NF4 level
    distances = (normalized.unsqueeze(-1) - torch.tensor(NF4_LEVELS)).abs()
    indices = distances.argmin(dim=-1)

    return indices, absmax

def dequantize_nf4(indices, absmax):
    """Dequantize from NF4."""
    return torch.tensor(NF4_LEVELS)[indices] * absmax
```

## Handling Outliers

Large activation outliers break naive quantization:

```python
class MixedPrecisionLinear(nn.Module):
    """Keep outlier channels in higher precision."""

    def __init__(self, layer, outlier_threshold=6.0):
        super().__init__()

        # Find outlier channels (> 6 standard deviations)
        channel_max = layer.weight.abs().max(dim=0).values
        mean, std = channel_max.mean(), channel_max.std()
        self.outlier_mask = channel_max > mean + outlier_threshold * std

        # Separate outlier and normal weights
        self.normal_weight = quantize_int8(
            layer.weight[:, ~self.outlier_mask]
        )
        self.outlier_weight = layer.weight[:, self.outlier_mask].half()

    def forward(self, x):
        # Split input
        x_normal = x[:, :, ~self.outlier_mask]
        x_outlier = x[:, :, self.outlier_mask]

        # Mixed computation
        out_normal = F.linear(x_normal, dequantize(self.normal_weight))
        out_outlier = F.linear(x_outlier.half(), self.outlier_weight)

        return out_normal + out_outlier.float()
```

## Quantization Comparison

| Method | Bits | Quality vs FP16 | Speed | Memory |
|--------|------|-----------------|-------|--------|
| FP16 | 16 | Baseline | 1x | 1x |
| INT8 (naive) | 8 | -2% | 1.5x | 0.5x |
| GPTQ | 4 | -0.5% | 2x | 0.25x |
| AWQ | 4 | -0.3% | 2x | 0.25x |
| NF4 (QLoRA) | 4 | -0.2% | 1.8x | 0.25x |
| INT2 | 2 | -5% | 3x | 0.125x |

## Practical Usage

### llama.cpp

```bash
# Quantize to 4-bit
./quantize ./models/llama-70b.gguf ./models/llama-70b-q4_k_m.gguf Q4_K_M

# Run quantized model
./main -m ./models/llama-70b-q4_k_m.gguf \
  -p "Hello, how are you?" \
  -n 128 \
  --threads 8
```

### Transformers + bitsandbytes

```python
from transformers import AutoModelForCausalLM
import torch

# Load in 4-bit
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-70b-hf",
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,  # Nested quantization
)
```

### vLLM

```python
from vllm import LLM

llm = LLM(
    model="meta-llama/Llama-2-70b-hf",
    quantization="awq",  # or "gptq"
    tensor_parallel_size=2,
)
```

## Future Directions

1. **1-bit models (BitNet)**: Binary weights, 10x efficiency
2. **Activation quantization**: Currently bottleneck for speed
3. **Hardware co-design**: TPUs/NPUs optimized for low-bit
4. **Learned quantization**: Train quantization-aware models

## References

- [GPTQ: Accurate Post-Training Quantization](https://arxiv.org/abs/2210.17323)
- [AWQ: Activation-aware Weight Quantization](https://arxiv.org/abs/2306.00978)
- [QLoRA: Efficient Finetuning](https://arxiv.org/abs/2305.14314)
- [The Era of 1-bit LLMs](https://arxiv.org/abs/2402.17764)

---

*Quantization proves that model intelligence is remarkably robust to precision loss—most of those 32 bits were never essential to begin with.*
