---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - 3D Generation
  - Computer Vision
authors: parnian
---

# NeRF: Neural Radiance Fields for View Synthesis

Neural Radiance Fields (NeRF) revolutionized 3D scene representation by using neural networks to encode continuous volumetric scenes, enabling photorealistic novel view synthesis from a sparse set of input images.

## The Core Idea

NeRF represents a scene as a continuous 5D function:

```
F: (x, y, z, θ, φ) → (RGB, σ)

Where:
- (x, y, z): 3D position
- (θ, φ): Viewing direction (spherical coordinates)
- RGB: Color at that point from that direction
- σ: Volume density (opacity)
```

## Why Direction Matters

View-dependent effects (reflections, specularity) require knowing the viewing angle:

```
Same 3D point, different colors:

Point on chrome surface:
- View from front: Bright reflection (R=255, G=255, B=255)
- View from side: Dark gray (R=50, G=50, B=50)

Point on matte surface:
- Any direction: Same color (R=150, G=100, B=80)
```

## The MLP Architecture

```python
class NeRF(nn.Module):
    def __init__(self, pos_dim=60, dir_dim=24, hidden=256):
        super().__init__()

        # Positional encoding expands dimensions
        # Position: 3 → 60 (10 frequencies × 2 × 3)
        # Direction: 3 → 24 (4 frequencies × 2 × 3)

        # First part: position only → density + features
        self.pos_layers = nn.Sequential(
            nn.Linear(pos_dim, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU(),
        )

        # Skip connection at layer 5
        self.skip_layer = nn.Linear(pos_dim + hidden, hidden)

        self.pos_layers_2 = nn.Sequential(
            nn.Linear(hidden, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU(),
        )

        # Density output (view-independent)
        self.density_layer = nn.Linear(hidden, 1)

        # Color output (view-dependent)
        self.feature_layer = nn.Linear(hidden, hidden)
        self.color_layers = nn.Sequential(
            nn.Linear(hidden + dir_dim, hidden // 2), nn.ReLU(),
            nn.Linear(hidden // 2, 3), nn.Sigmoid()
        )

    def forward(self, pos_encoded, dir_encoded):
        # Process position
        h = self.pos_layers(pos_encoded)
        h = self.skip_layer(torch.cat([h, pos_encoded], dim=-1))
        h = F.relu(h)
        h = self.pos_layers_2(h)

        # Density (only depends on position)
        density = F.relu(self.density_layer(h))

        # Color (depends on position and direction)
        features = self.feature_layer(h)
        color = self.color_layers(torch.cat([features, dir_encoded], dim=-1))

        return color, density
```

## Positional Encoding

Raw coordinates can't represent high-frequency detail:

```python
def positional_encoding(x, L):
    """
    Map coordinates to higher dimensional space.
    x: [batch, 3] coordinates
    L: number of frequency bands
    """
    freqs = 2.0 ** torch.linspace(0, L-1, L)  # [1, 2, 4, 8, ...]

    # Compute sin and cos at each frequency
    encoded = []
    for freq in freqs:
        encoded.append(torch.sin(freq * np.pi * x))
        encoded.append(torch.cos(freq * np.pi * x))

    return torch.cat(encoded, dim=-1)

# Example:
# x = [0.5, 0.3, 0.1], L = 10
# Output: 60-dimensional vector (10 freqs × 2 trig × 3 coords)
```

## Volume Rendering

To render a pixel, shoot a ray and integrate:

```python
def render_ray(model, ray_origin, ray_direction, near, far, n_samples):
    # Sample points along ray
    t_vals = torch.linspace(near, far, n_samples)
    points = ray_origin + t_vals[..., None] * ray_direction

    # Query network at each point
    colors, densities = model(encode(points), encode(ray_direction))

    # Volume rendering equation
    # α = 1 - exp(-σ * δ)  where δ = distance between samples
    deltas = t_vals[1:] - t_vals[:-1]
    alphas = 1 - torch.exp(-densities[:-1] * deltas)

    # Transmittance: probability light reaches this point
    transmittance = torch.cumprod(1 - alphas + 1e-10, dim=0)
    transmittance = torch.cat([torch.ones(1), transmittance[:-1]])

    # Weights for each sample
    weights = alphas * transmittance

    # Final color: weighted sum
    rgb = (weights[..., None] * colors[:-1]).sum(dim=0)

    return rgb
```

## Training Pipeline

```
Input: ~100 images with known camera poses

For each iteration:
1. Sample random batch of rays from training images
2. For each ray:
   a. Sample 64 coarse points
   b. Render coarse prediction
   c. Sample 128 fine points (importance sampling)
   d. Render fine prediction
3. Loss = MSE(predicted_rgb, ground_truth_rgb)
4. Backprop through everything
```

## Hierarchical Sampling

Don't waste samples on empty space:

```python
def hierarchical_sample(coarse_weights, t_vals, n_fine):
    """Sample more points where coarse pass found stuff."""

    # Normalize weights to form PDF
    weights = coarse_weights + 1e-5
    pdf = weights / weights.sum()

    # CDF for inverse transform sampling
    cdf = torch.cumsum(pdf, dim=0)

    # Sample from CDF
    u = torch.rand(n_fine)
    indices = torch.searchsorted(cdf, u)

    # Get t values for fine samples
    t_fine = t_vals[indices]

    # Combine with coarse samples
    t_all = torch.sort(torch.cat([t_vals, t_fine]))[0]

    return t_all
```

## NeRF Variants

### Instant-NGP (2022)

Hash-based encoding for 100x faster training:

```
Traditional: Position → MLP(60→256→256→...) → Output
Instant-NGP: Position → HashGrid Lookup → Small MLP → Output

Training: Hours → Minutes
Rendering: Seconds → Milliseconds
```

### Mip-NeRF (2021)

Anti-aliasing by reasoning about ray cones, not rays:

```
NeRF: Ray = single line through pixel center
Mip-NeRF: Cone = all rays through pixel area

Handles different viewing distances without aliasing
```

### NeRF in the Wild (2021)

Handle uncontrolled photo collections:

```
Challenges:
- Varying lighting (day/night photos)
- Transient objects (people, cars)
- Exposure differences

Solution: Per-image appearance codes + transient network
```

## Comparison

| Method | Training | Rendering | Quality | Memory |
|--------|----------|-----------|---------|--------|
| NeRF | 1-2 days | 30s/frame | High | Low |
| Instant-NGP | 5-15 min | Real-time | High | Medium |
| 3D Gaussian Splatting | 15-30 min | 100+ FPS | Higher | High |

## Limitations

1. **Training time**: Original NeRF needs hours per scene
2. **Static scenes**: No native support for dynamics
3. **Known poses**: Requires accurate camera calibration
4. **Bounded scenes**: Struggles with unbounded outdoor scenes

## Applications

| Domain | Use Case |
|--------|----------|
| VR/AR | Photorealistic environment capture |
| Film/VFX | Digital set reconstruction |
| Robotics | Scene understanding and simulation |
| Cultural Heritage | 3D digitization of artifacts |
| Real Estate | Virtual property tours |
| E-commerce | 3D product visualization |

## Code Example

```python
# Using nerfstudio library
from nerfstudio.models.instant_ngp import NGPModel
from nerfstudio.pipelines.base_pipeline import VanillaPipeline
from nerfstudio.data.dataparsers.colmap_dataparser import ColmapDataParser

# Load data (COLMAP format)
dataparser = ColmapDataParser(data_path="scene/")
datamanager = dataparser.setup()

# Create model
model = NGPModel()

# Train
pipeline = VanillaPipeline(model, datamanager)
for step in range(20000):
    loss = pipeline.train_step()
    if step % 1000 == 0:
        print(f"Step {step}, Loss: {loss:.4f}")

# Render novel view
camera_pose = get_novel_pose()
rgb = pipeline.render(camera_pose)
```

## Future Directions

1. **Real-time training**: Train NeRF interactively
2. **Generation**: Text-to-NeRF, single-image-to-NeRF
3. **Editing**: Semantic manipulation of NeRF scenes
4. **Scaling**: City-scale NeRF representations
5. **Physics**: NeRF with physical simulation

## References

- [NeRF: Representing Scenes as Neural Radiance Fields](https://arxiv.org/abs/2003.08934)
- [Instant Neural Graphics Primitives](https://nvlabs.github.io/instant-ngp/)
- [Mip-NeRF](https://arxiv.org/abs/2103.13415)
- [NeRF in the Wild](https://nerf-w.github.io/)

---

*NeRF demonstrated that a simple MLP can encode complex 3D scenes with remarkable fidelity—a neural network as a continuous, differentiable 3D representation.*
