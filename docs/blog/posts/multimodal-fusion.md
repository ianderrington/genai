---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - Multimodal
  - Architecture
authors: parnian
coverImage: /images/blog/multimodal-fusion.png
---

# Multimodal Fusion: Unifying Vision, Language, and Beyond

Multimodal fusion combines information from different modalities (text, images, audio, video) into unified representations, enabling AI systems that can see, read, and hear simultaneously.

## Why Multimodal?

```
Single-modal limitations:
- Text: Can't see the world
- Vision: Can't reason in language
- Audio: Can't read

Multimodal strengths:
- Ground language in visual reality
- Reason about images with language
- Connect speech to meaning
- Unified world understanding
```

## Fusion Architectures

### Early Fusion

```python
class EarlyFusion(nn.Module):
    """Combine modalities at input level."""

    def __init__(self, text_dim, vision_dim, hidden_dim):
        super().__init__()
        self.text_proj = nn.Linear(text_dim, hidden_dim)
        self.vision_proj = nn.Linear(vision_dim, hidden_dim)
        self.transformer = TransformerEncoder(hidden_dim)

    def forward(self, text_tokens, image_patches):
        # Project to common space
        text_emb = self.text_proj(text_tokens)
        vision_emb = self.vision_proj(image_patches)

        # Concatenate and process together
        combined = torch.cat([text_emb, vision_emb], dim=1)
        return self.transformer(combined)

# Pros: Deep cross-modal interaction
# Cons: Expensive, modality-specific preprocessing
```

### Late Fusion

```python
class LateFusion(nn.Module):
    """Process modalities separately, combine at output."""

    def __init__(self):
        super().__init__()
        self.text_encoder = TextEncoder()
        self.vision_encoder = VisionEncoder()
        self.fusion = nn.Linear(hidden_dim * 2, hidden_dim)

    def forward(self, text, image):
        # Independent encoding
        text_features = self.text_encoder(text)
        vision_features = self.vision_encoder(image)

        # Combine at the end
        combined = torch.cat([text_features, vision_features], dim=-1)
        return self.fusion(combined)

# Pros: Efficient, can use pretrained encoders
# Cons: Limited cross-modal interaction
```

### Cross-Attention Fusion

```python
class CrossAttentionFusion(nn.Module):
    """Modalities attend to each other."""

    def __init__(self, dim, n_heads):
        super().__init__()
        self.text_to_vision = nn.MultiheadAttention(dim, n_heads)
        self.vision_to_text = nn.MultiheadAttention(dim, n_heads)

    def forward(self, text_features, vision_features):
        # Text attends to vision
        text_enhanced, _ = self.text_to_vision(
            query=text_features,
            key=vision_features,
            value=vision_features
        )

        # Vision attends to text
        vision_enhanced, _ = self.vision_to_text(
            query=vision_features,
            key=text_features,
            value=text_features
        )

        return text_enhanced, vision_enhanced
```

## Notable Multimodal Models

### CLIP: Contrastive Language-Image Pre-training

```python
class CLIP(nn.Module):
    """Align images and text in shared embedding space."""

    def __init__(self):
        super().__init__()
        self.image_encoder = ViT()
        self.text_encoder = Transformer()

    def forward(self, images, texts):
        # Encode both modalities
        image_features = self.image_encoder(images)
        text_features = self.text_encoder(texts)

        # Normalize
        image_features = F.normalize(image_features, dim=-1)
        text_features = F.normalize(text_features, dim=-1)

        # Compute similarity matrix
        logits = image_features @ text_features.T * self.logit_scale

        return logits

    def contrastive_loss(self, logits):
        """Diagonal = positive pairs, off-diagonal = negatives."""
        labels = torch.arange(len(logits))
        loss_i = F.cross_entropy(logits, labels)
        loss_t = F.cross_entropy(logits.T, labels)
        return (loss_i + loss_t) / 2
```

### Flamingo: Few-Shot Visual Language Model

```python
class Flamingo(nn.Module):
    """Interleave images in language model."""

    def __init__(self, llm, vision_encoder):
        super().__init__()
        self.llm = llm  # Frozen
        self.vision = vision_encoder  # Frozen
        self.perceiver = PerceiverResampler()  # Learned
        self.gated_xattn = GatedCrossAttention()  # Learned

    def forward(self, text_tokens, images):
        # Encode images to fixed-size representation
        image_features = self.vision(images)
        image_tokens = self.perceiver(image_features)

        # Insert cross-attention layers in LLM
        hidden = self.llm.embed(text_tokens)

        for layer in self.llm.layers:
            # Standard self-attention
            hidden = layer.self_attn(hidden)

            # Gated cross-attention to images
            hidden = hidden + self.gated_xattn(hidden, image_tokens)

            # FFN
            hidden = layer.ffn(hidden)

        return self.llm.output(hidden)
```

### LLaVA: Visual Instruction Tuning

```python
class LLaVA(nn.Module):
    """Simple but effective: project vision into LLM."""

    def __init__(self, vision_encoder, llm, proj_dim):
        super().__init__()
        self.vision = vision_encoder  # CLIP ViT
        self.llm = llm  # LLaMA
        self.projector = nn.Linear(vision_encoder.dim, llm.dim)

    def forward(self, image, text):
        # Get image features
        image_features = self.vision(image)

        # Project to LLM dimension
        image_tokens = self.projector(image_features)

        # Embed text
        text_tokens = self.llm.embed(text)

        # Concatenate and run through LLM
        combined = torch.cat([image_tokens, text_tokens], dim=1)
        return self.llm(combined)
```

### GPT-4V / Gemini Architecture Pattern

```python
class UnifiedMultimodalLLM(nn.Module):
    """Native multimodal from the ground up."""

    def __init__(self, vocab_size, dim, n_layers):
        super().__init__()
        # Unified tokenizer for all modalities
        self.text_embed = nn.Embedding(vocab_size, dim)
        self.image_tokenizer = PatchEmbedding()
        self.audio_tokenizer = AudioEmbedding()
        self.video_tokenizer = VideoEmbedding()

        # Single transformer processes all
        self.transformer = TransformerDecoder(dim, n_layers)

        # Modality-specific output heads
        self.heads = nn.ModuleDict({
            "text": nn.Linear(dim, vocab_size),
            "image": ImageDecoder(),
            "audio": AudioDecoder()
        })

    def forward(self, inputs):
        # Tokenize each modality
        tokens = []
        for modality, data in inputs.items():
            if modality == "text":
                tokens.append(self.text_embed(data))
            elif modality == "image":
                tokens.append(self.image_tokenizer(data))
            elif modality == "audio":
                tokens.append(self.audio_tokenizer(data))

        # Process through unified transformer
        combined = torch.cat(tokens, dim=1)
        hidden = self.transformer(combined)

        return hidden
```

## Training Strategies

### Contrastive Pre-training

```python
def contrastive_pretraining(model, image_batch, text_batch):
    """Learn to match images and captions."""
    image_emb = model.encode_image(image_batch)
    text_emb = model.encode_text(text_batch)

    # InfoNCE loss
    similarity = image_emb @ text_emb.T / temperature
    labels = torch.arange(len(similarity))

    loss = (F.cross_entropy(similarity, labels) +
            F.cross_entropy(similarity.T, labels)) / 2

    return loss
```

### Captioning Pre-training

```python
def captioning_pretraining(model, images, captions):
    """Learn to describe images."""
    # Teacher forcing: predict next token given image + previous tokens
    logits = model(images, captions[:, :-1])
    loss = F.cross_entropy(
        logits.reshape(-1, vocab_size),
        captions[:, 1:].reshape(-1)
    )
    return loss
```

### Instruction Tuning

```python
def multimodal_instruction_tuning(model, examples):
    """Learn to follow multimodal instructions."""
    for example in examples:
        # Example: {"image": ..., "instruction": "Describe...", "response": "..."}
        loss = model.compute_loss(
            image=example["image"],
            instruction=example["instruction"],
            target=example["response"]
        )
        loss.backward()
```

## Applications

| Task | Input Modalities | Description |
|------|-----------------|-------------|
| Visual QA | Image + Text | Answer questions about images |
| Image Captioning | Image | Generate text descriptions |
| Text-to-Image | Text | Generate images from prompts |
| Video Understanding | Video + Text | Comprehend video content |
| Document QA | Document + Text | Answer questions about PDFs |
| Audio-Visual | Video + Audio | Process video with sound |
| Any-to-Any | All | Unified multimodal understanding |

## Challenges

```
1. Alignment
   Problem: Different modalities have different semantics
   Solution: Large-scale paired training data

2. Computation
   Problem: Processing multiple modalities is expensive
   Solution: Efficient architectures (perceiver, cross-attn)

3. Missing Modalities
   Problem: Not all inputs have all modalities
   Solution: Modality dropout, flexible architectures

4. Hallucination
   Problem: Model describes things not in image
   Solution: Grounding, verification mechanisms
```

## References

- [CLIP: Learning Transferable Visual Models](https://arxiv.org/abs/2103.00020)
- [Flamingo: A Visual Language Model](https://arxiv.org/abs/2204.14198)
- [LLaVA: Visual Instruction Tuning](https://arxiv.org/abs/2304.08485)
- [Gemini: A Family of Highly Capable Models](https://arxiv.org/abs/2312.11805)

---

*Multimodal AI represents the path toward truly general intelligence—systems that understand the world through multiple senses, just as humans do.*
