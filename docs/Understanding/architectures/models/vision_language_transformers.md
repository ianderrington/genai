---
title: Vision-Language Models (VLMs)
description: Transformers that understand both images and text
authors:
  - parnian
---

# Vision-Language Models (VLMs)

Vision-Language Models combine visual understanding with language capabilities, enabling AI systems to reason about images, answer questions about visual content, and generate descriptions.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    VLM ARCHITECTURE                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐     ┌─────────────────────────────┐   │
│  │   Image     │     │        Text                  │   │
│  │   Input     │     │        Input                 │   │
│  └──────┬──────┘     └────────────┬────────────────┘   │
│         │                         │                     │
│         ▼                         ▼                     │
│  ┌─────────────┐     ┌─────────────────────────────┐   │
│  │   Vision    │     │      Text Tokenizer         │   │
│  │   Encoder   │     │      + Embedding            │   │
│  │  (ViT/CLIP) │     └────────────┬────────────────┘   │
│  └──────┬──────┘                  │                     │
│         │                         │                     │
│         ▼                         │                     │
│  ┌─────────────┐                  │                     │
│  │  Projection │                  │                     │
│  │    Layer    │                  │                     │
│  └──────┬──────┘                  │                     │
│         │                         │                     │
│         └────────────┬────────────┘                     │
│                      ▼                                  │
│         ┌─────────────────────────────┐                │
│         │     Language Model          │                │
│         │   (LLaMA, GPT, etc.)        │                │
│         └─────────────────────────────┘                │
│                      │                                  │
│                      ▼                                  │
│              [Text Output]                              │
└─────────────────────────────────────────────────────────┘
```

## Key Models

### GPT-4V / GPT-4o (OpenAI)
- Native multimodal understanding
- Strong reasoning over images
- Handles complex visual tasks
- Available via API

### Claude 3 (Anthropic)
- Vision capability across all tiers
- Strong at document analysis
- Good at reading charts/diagrams
- Safety-focused design

### Gemini (Google)
- Native multimodal from training
- Available in multiple sizes
- Integrated with Google services

### LLaVA (Open Source)
```
LLaVA Architecture:
- Vision Encoder: CLIP ViT-L/14
- Projection: Linear or MLP
- Language Model: Vicuna/LLaMA
- Training: Two-stage (pretrain + finetune)
```

### Qwen-VL / InternVL (Open Source)
- Strong open-source alternatives
- Competitive with proprietary models
- Various sizes available

## Capabilities

### Visual Question Answering (VQA)
```python
response = vlm.ask(
    image="chart.png",
    question="What was the revenue growth in Q3?"
)
# "The chart shows Q3 revenue grew by 15% year-over-year"
```

### Image Description
```python
description = vlm.describe(
    image="product.jpg",
    detail_level="comprehensive"
)
# Detailed description of visual content
```

### Document Understanding
- OCR + comprehension
- Form extraction
- Invoice processing
- Receipt parsing

### Visual Reasoning
- Multi-step visual problems
- Spatial reasoning
- Counting and comparison
- Abstract pattern recognition

## Training Approaches

### Pretraining
1. **Image-text contrastive** (CLIP-style)
2. **Image captioning** (describe images)
3. **Interleaved image-text** (documents)

### Instruction Tuning
```python
# Example instruction-following data
{
    "image": "photo.jpg",
    "conversations": [
        {"from": "human", "value": "<image>\nDescribe this image"},
        {"from": "gpt", "value": "The image shows..."},
        {"from": "human", "value": "What colors are present?"},
        {"from": "gpt", "value": "The dominant colors are..."}
    ]
}
```

## Image Encoding Methods

### ViT Patches
```
Original Image (224x224)
         │
         ▼
Split into patches (14x14 = 196 patches of 16x16)
         │
         ▼
Linear projection + position embeddings
         │
         ▼
Transformer encoder (12 layers)
         │
         ▼
Image tokens (196 tokens of dim 768)
```

### High Resolution Handling
```python
# Dynamic resolution with tiling
def encode_high_res(image, max_tiles=6):
    # Base encoding
    base = encode_at_resolution(image, 336)
    
    # Tile for detail
    tiles = create_tiles(image, max_tiles)
    tile_encodings = [encode_at_resolution(t, 336) for t in tiles]
    
    # Combine
    return concat([base] + tile_encodings)
```

## Applications

| Application | Example Use Case |
|-------------|------------------|
| Accessibility | Image descriptions for blind users |
| E-commerce | Product image search, cataloging |
| Healthcare | Medical image analysis assistance |
| Robotics | Visual grounding for actions |
| Education | Diagram explanation, homework help |
| Security | Content moderation, surveillance |
| Creative | Image editing instructions |

## Evaluation Benchmarks

| Benchmark | Focus |
|-----------|-------|
| VQAv2 | General visual QA |
| OKVQA | Outside knowledge VQA |
| TextVQA | Text in images |
| DocVQA | Document understanding |
| ChartQA | Chart/graph understanding |
| MMMU | Multi-discipline reasoning |
| RealWorldQA | Real-world visual reasoning |

## Code Example

```python
from transformers import LlavaForConditionalGeneration, AutoProcessor

# Load model
model = LlavaForConditionalGeneration.from_pretrained(
    "llava-hf/llava-1.5-7b-hf"
)
processor = AutoProcessor.from_pretrained("llava-hf/llava-1.5-7b-hf")

# Prepare inputs
image = load_image("example.jpg")
prompt = "USER: <image>\nWhat is shown in this image?\nASSISTANT:"

inputs = processor(text=prompt, images=image, return_tensors="pt")

# Generate
output = model.generate(**inputs, max_new_tokens=200)
response = processor.decode(output[0], skip_special_tokens=True)
```

## References

- [LLaVA: Visual Instruction Tuning](https://arxiv.org/abs/2304.08485)
- [Flamingo: Few-Shot Learning with Visual Prompting](https://arxiv.org/abs/2204.14198)
- [CLIP: Learning Visual Concepts from Natural Language](https://arxiv.org/abs/2103.00020)
- [A Survey on Vision-Language Models](https://vlm.aman.ai)

---

*Vision-language models bring AI closer to human-like perception—understanding the world through both sight and language.*
