---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - Computer Vision
  - Architecture
authors: parnian
---

# Vision Transformers: Attention Is All You Need for Images

Vision Transformers (ViT) brought the transformer revolution to computer vision, proving that the same attention mechanisms powering GPT can see images as well as—or better than—CNNs.

## The Core Insight

Images can be tokenized like text:

```
Text tokenization:     "Hello world" → ["Hello", "world"]
Image tokenization:    [224×224 image] → [196 patches of 16×16]

Each patch becomes a "visual word"
Attention operates over patches, not pixels
```

## ViT Architecture

```python
class VisionTransformer(nn.Module):
    def __init__(
        self,
        image_size=224,
        patch_size=16,
        n_classes=1000,
        dim=768,
        depth=12,
        heads=12,
        mlp_dim=3072
    ):
        super().__init__()
        n_patches = (image_size // patch_size) ** 2  # 196 for 224/16

        # Patch embedding
        self.patch_embed = nn.Conv2d(
            3, dim,
            kernel_size=patch_size,
            stride=patch_size
        )

        # Class token (like BERT's [CLS])
        self.cls_token = nn.Parameter(torch.randn(1, 1, dim))

        # Position embeddings
        self.pos_embed = nn.Parameter(torch.randn(1, n_patches + 1, dim))

        # Transformer blocks
        self.blocks = nn.ModuleList([
            TransformerBlock(dim, heads, mlp_dim)
            for _ in range(depth)
        ])

        # Classification head
        self.head = nn.Linear(dim, n_classes)

    def forward(self, x):
        # x: [B, 3, 224, 224]

        # Patchify: [B, 3, 224, 224] → [B, dim, 14, 14]
        x = self.patch_embed(x)

        # Flatten spatial: [B, dim, 14, 14] → [B, 196, dim]
        x = x.flatten(2).transpose(1, 2)

        # Prepend class token: [B, 197, dim]
        cls_tokens = self.cls_token.expand(x.shape[0], -1, -1)
        x = torch.cat([cls_tokens, x], dim=1)

        # Add position embedding
        x = x + self.pos_embed

        # Transformer
        for block in self.blocks:
            x = block(x)

        # Classify using [CLS] token
        return self.head(x[:, 0])
```

## Why Patches, Not Pixels?

```
Full pixel attention:
224 × 224 = 50,176 tokens
Attention: 50,176² = 2.5B operations per layer 😱

Patch attention:
14 × 14 = 196 tokens
Attention: 196² = 38K operations per layer ✓

Patches capture local structure that attention refines globally
```

## Position Embeddings Matter

ViT needs to know where patches are:

```python
# Learned positions (original ViT)
pos_embed = nn.Parameter(torch.randn(1, n_patches + 1, dim))

# 2D sin-cos positions (more inductive bias)
def get_2d_sincos_pos_embed(embed_dim, grid_size):
    grid_h = np.arange(grid_size, dtype=np.float32)
    grid_w = np.arange(grid_size, dtype=np.float32)
    grid = np.meshgrid(grid_w, grid_h)
    grid = np.stack(grid, axis=0).reshape([2, 1, grid_size, grid_size])

    pos_embed = get_1d_sincos_pos_embed_from_grid(embed_dim // 2, grid[0])
    pos_embed = np.concatenate([
        pos_embed,
        get_1d_sincos_pos_embed_from_grid(embed_dim // 2, grid[1])
    ], axis=1)

    return pos_embed

# Rotary positions (RoPE for vision)
# Encodes relative position in attention computation
```

## ViT Variants

### DeiT (Data-efficient ViT)

```python
class DeiT(VisionTransformer):
    """ViT with better training recipe."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Distillation token
        self.dist_token = nn.Parameter(torch.randn(1, 1, self.dim))
        self.dist_head = nn.Linear(self.dim, self.n_classes)

    def forward(self, x):
        # ... patch embedding ...

        # Add both [CLS] and [DIST] tokens
        x = torch.cat([self.cls_token, self.dist_token, patches], dim=1)

        # ... transformer ...

        # Two outputs: classification and distillation
        cls_out = self.head(x[:, 0])
        dist_out = self.dist_head(x[:, 1])
        return cls_out, dist_out

# Training: soft labels from CNN teacher
```

### Swin Transformer

```python
class SwinTransformerBlock(nn.Module):
    """Hierarchical vision transformer with shifted windows."""

    def __init__(self, dim, input_resolution, num_heads, window_size=7):
        super().__init__()
        self.window_size = window_size
        self.shift_size = window_size // 2

        self.attn = WindowAttention(dim, window_size, num_heads)
        self.mlp = MLP(dim)

    def forward(self, x):
        H, W = self.input_resolution

        # Partition into windows
        x_windows = window_partition(x, self.window_size)

        # Window attention
        attn_windows = self.attn(x_windows)

        # Merge windows
        x = window_reverse(attn_windows, self.window_size, H, W)

        # Shifted window (next layer)
        x_shifted = torch.roll(x, shifts=(-self.shift_size, -self.shift_size), dims=(1, 2))

        return x
```

### CvT (Convolutional Vision Transformer)

```python
class ConvolutionalTokenEmbedding(nn.Module):
    """Replace linear projection with conv layers."""

    def __init__(self, in_channels, out_channels, kernel_size=3):
        super().__init__()
        self.conv = nn.Conv2d(
            in_channels, out_channels,
            kernel_size=kernel_size,
            padding=kernel_size // 2,
            stride=2  # Downsample
        )
        self.norm = nn.LayerNorm(out_channels)

    def forward(self, x):
        x = self.conv(x)
        x = x.flatten(2).transpose(1, 2)
        return self.norm(x)
```

## Training Recipes

### Data Augmentation (Critical for ViT)

```python
from torchvision import transforms

train_transform = transforms.Compose([
    transforms.RandomResizedCrop(224),
    transforms.RandomHorizontalFlip(),
    transforms.RandAugment(num_ops=2, magnitude=9),  # Key for ViT
    transforms.ColorJitter(0.4, 0.4, 0.4),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
    transforms.RandomErasing(p=0.25),
])
```

### Training Hyperparameters

```python
# ViT-B/16 training config
config = {
    "batch_size": 4096,
    "epochs": 300,
    "optimizer": "AdamW",
    "learning_rate": 1e-3,
    "weight_decay": 0.3,
    "warmup_epochs": 5,
    "lr_schedule": "cosine",

    # Regularization
    "drop_path": 0.1,
    "mixup_alpha": 0.8,
    "cutmix_alpha": 1.0,
    "label_smoothing": 0.1,
}
```

## Self-Supervised Pre-training

### MAE (Masked Autoencoder)

```python
class MAE(nn.Module):
    """BERT-style pre-training for vision."""

    def __init__(self, encoder, decoder, mask_ratio=0.75):
        super().__init__()
        self.encoder = encoder
        self.decoder = decoder
        self.mask_ratio = mask_ratio

    def forward(self, x):
        # Random mask 75% of patches
        patches = self.patchify(x)
        mask = self.random_mask(patches, self.mask_ratio)

        # Encode visible patches only
        visible = patches[~mask]
        encoded = self.encoder(visible)

        # Decode all patches (insert mask tokens)
        full_seq = self.insert_mask_tokens(encoded, mask)
        decoded = self.decoder(full_seq)

        # Reconstruct masked patches
        loss = F.mse_loss(decoded[mask], patches[mask])
        return loss
```

### DINO (Self-Distillation)

```python
class DINO:
    """Self-supervised learning via self-distillation."""

    def __init__(self, student, teacher):
        self.student = student
        self.teacher = teacher  # EMA of student

    def forward(self, x):
        # Different augmentations
        x_student = self.strong_aug(x)
        x_teacher = self.weak_aug(x)

        # Get representations
        s_out = self.student(x_student)
        with torch.no_grad():
            t_out = self.teacher(x_teacher)

        # Cross-entropy loss
        loss = self.cross_entropy(s_out, t_out.softmax(dim=-1))

        # Update teacher EMA
        self.update_teacher()

        return loss
```

## Comparison

| Model | ImageNet Top-1 | Params | FLOPs |
|-------|----------------|--------|-------|
| ResNet-50 | 76.2% | 25M | 4.1G |
| ViT-B/16 | 77.9% | 86M | 17.6G |
| ViT-L/16 | 79.7% | 307M | 61.6G |
| Swin-B | 83.5% | 88M | 15.4G |
| ViT-G/14 (JFT) | 90.5% | 1.8B | 2500G |

## Applications Beyond Classification

```
Object Detection: ViTDet, DETR
Segmentation: SegFormer, Mask2Former
Video: TimeSformer, ViViT
3D: Point-BERT, PCT
Medical: MedViT, TransUNet
Remote Sensing: SatViT
```

## References

- [An Image is Worth 16x16 Words (ViT)](https://arxiv.org/abs/2010.11929)
- [DeiT: Training Data-Efficient Image Transformers](https://arxiv.org/abs/2012.12877)
- [Swin Transformer](https://arxiv.org/abs/2103.14030)
- [Masked Autoencoders (MAE)](https://arxiv.org/abs/2111.06377)

---

*Vision Transformers proved that attention isn't domain-specific—the same mechanism that models language can model images, video, audio, and potentially any sequential or structured data.*
