---
date:
  created: 2025-03-13
  updated: 2025-03-13
categories:
  - Research
  - World Models
  - Video
authors: 
  - parnian
---

# World Models: AI That Simulates Reality

World models are AI systems that learn to simulate the dynamics of environments, enabling planning, imagination, and understanding of physics and causality—the foundation for systems like Sora.

## What Are World Models?

A world model learns to predict how the world evolves over time:

```
State(t) + Action → State(t+1)
```

This enables:
- **Planning**: Imagine future states before acting
- **Counterfactuals**: "What if I had done X instead?"
- **Transfer learning**: Apply knowledge across similar environments
- **Data efficiency**: Learn from imagined experiences

## Historical Context

### Ha & Schmidhuber's World Models (2018)

The foundational paper introduced a three-component architecture:

```
┌─────────────────────────────────────────────────────┐
│                  WORLD MODEL                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐        │
│  │    V    │    │    M    │    │    C    │        │
│  │ (Vision)│───►│ (Memory)│───►│(Control)│        │
│  │   VAE   │    │ MDN-RNN │    │ Linear  │        │
│  └─────────┘    └─────────┘    └─────────┘        │
│       ↑                             │              │
│       │         Environment         │              │
│       └─────────────────────────────┘              │
└─────────────────────────────────────────────────────┘
```

- **V (Vision)**: Compress observations to latent space
- **M (Memory)**: Predict future latent states
- **C (Controller)**: Choose actions based on latent state

### Dreamer Series

**DreamerV1/V2/V3**: State-of-the-art model-based RL:

```python
class Dreamer:
    def __init__(self):
        self.encoder = ConvEncoder()  # Observation → Latent
        self.rssm = RSSM()            # Recurrent State-Space Model
        self.decoder = ConvDecoder()  # Latent → Observation
        self.reward_model = MLP()     # Predict rewards
        self.actor = MLP()            # Policy
        self.critic = MLP()           # Value function
    
    def imagine(self, start_state, horizon):
        """Imagine future trajectories without environment interaction."""
        states = [start_state]
        rewards = []
        
        for t in range(horizon):
            action = self.actor(states[-1])
            next_state = self.rssm.imagine_step(states[-1], action)
            reward = self.reward_model(next_state)
            
            states.append(next_state)
            rewards.append(reward)
        
        return states, rewards
```

## Modern Video World Models

### Sora (OpenAI)

Sora represents a breakthrough in world modeling for video:

```
Text Prompt → [Diffusion Transformer] → Video
                      ↓
              Learns:
              - Physics (gravity, collisions)
              - Persistence (objects remain)
              - Causality (actions have effects)
              - 3D consistency (coherent space)
```

Key innovations:
1. **Patch-based representation**: Videos as spacetime patches
2. **DiT architecture**: Diffusion with transformers
3. **Scaling**: Massive compute enables emergent physics

### Genie (DeepMind)

Interactive world model learned from video:

```
Observation → [Latent Actions] → Next Frame
                    ↓
            Learns controllable dynamics
            without action labels
```

### UniSim (DeepMind)

Universal simulator for real-world interaction:
- Learns from diverse video data
- Generalizes across domains
- Enables robot learning in simulation

## Technical Components

### Latent Dynamics Models

Learn dynamics in compressed latent space:

```python
class LatentDynamicsModel(nn.Module):
    def __init__(self, latent_dim, action_dim):
        super().__init__()
        self.transition = nn.Sequential(
            nn.Linear(latent_dim + action_dim, 256),
            nn.ReLU(),
            nn.Linear(256, 256),
            nn.ReLU(),
            nn.Linear(256, latent_dim * 2)  # Mean and variance
        )
    
    def forward(self, z, action):
        combined = torch.cat([z, action], dim=-1)
        params = self.transition(combined)
        mean, log_var = params.chunk(2, dim=-1)
        
        # Reparameterization trick
        std = torch.exp(0.5 * log_var)
        eps = torch.randn_like(std)
        z_next = mean + std * eps
        
        return z_next, mean, log_var
```

### Recurrent State-Space Models (RSSM)

Combine deterministic and stochastic components:

```python
class RSSM(nn.Module):
    def __init__(self, stoch_size, deter_size, hidden_size):
        super().__init__()
        self.stoch_size = stoch_size
        self.deter_size = deter_size
        
        # Deterministic path (GRU)
        self.gru = nn.GRUCell(hidden_size, deter_size)
        
        # Stochastic path (prior and posterior)
        self.prior = nn.Sequential(
            nn.Linear(deter_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, stoch_size * 2)
        )
        self.posterior = nn.Sequential(
            nn.Linear(deter_size + embed_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, stoch_size * 2)
        )
```

### Video Prediction Architectures

```
Frame 1, 2, 3 → Encoder → Latent Sequence
                              ↓
                        Transformer
                              ↓
                   Future Latent Sequence
                              ↓
                         Decoder → Frame 4, 5, 6
```

## Training Approaches

### Reconstruction Loss

```python
def reconstruction_loss(model, observations, actions):
    # Encode observations
    latents = model.encode(observations)
    
    # Predict next latents
    predicted_latents = model.predict(latents[:-1], actions)
    
    # Decode predictions
    predicted_obs = model.decode(predicted_latents)
    
    # Compare to actual next observations
    return F.mse_loss(predicted_obs, observations[1:])
```

### Contrastive Learning

Learn representations that distinguish real from imagined:

```python
def contrastive_loss(model, real_sequence, imagined_sequence):
    real_features = model.encode_sequence(real_sequence)
    fake_features = model.encode_sequence(imagined_sequence)
    
    # Real futures should be close, fake should be far
    positive = cosine_similarity(real_features[:-1], real_features[1:])
    negative = cosine_similarity(real_features[:-1], fake_features[1:])
    
    return -torch.log(positive / (positive + negative))
```

## Applications

| Domain | Application |
|--------|-------------|
| Robotics | Sim-to-real transfer, planning |
| Gaming | NPC behavior, level generation |
| Autonomous Vehicles | Scenario simulation |
| Video Generation | Sora-style content creation |
| Scientific Simulation | Physics, climate, biology |
| Decision Making | Strategic planning, forecasting |

## Evaluation

### Metrics

1. **Prediction Accuracy**: How well do predicted frames match reality?
2. **Physical Plausibility**: Do predictions obey physics?
3. **Temporal Consistency**: Do objects persist correctly?
4. **Planning Performance**: Does imagined planning improve real-world performance?

### Benchmarks

- **RoboNet**: Robot manipulation videos
- **Something-Something**: Human action videos
- **PHYRE**: Physical reasoning tasks
- **BAIR Robot Push**: Robot pushing objects

## Challenges

1. **Long-horizon prediction**: Error accumulates over time
2. **Rare events**: Hard to predict unusual occurrences
3. **Precise physics**: Small errors compound
4. **Generalization**: Models often overfit to training domains
5. **Compute cost**: High-quality world models are expensive

## Future Directions

1. **Foundation world models**: Pre-trained on internet video
2. **Hierarchical world models**: Multiple levels of abstraction
3. **Compositional world models**: Combine learned components
4. **World models for reasoning**: Beyond physical simulation to abstract reasoning

## References

- [World Models (Ha & Schmidhuber, 2018)](https://worldmodels.github.io/)
- [DreamerV3](https://danijar.com/project/dreamerv3/)
- [Sora Technical Report](https://openai.com/sora)
- [Genie: Generative Interactive Environments](https://sites.google.com/view/genie-2024)

---

*World models represent a path toward AI that truly understands reality—not just pattern-matching, but building internal simulations of how the world works.*
