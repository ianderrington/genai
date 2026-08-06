---
date:
  created: 2025-02-20
  updated: 2025-02-20
categories:
  - Research
  - Architecture
  - AutoML
authors:
  - parnian
---

# Neural Architecture Search: AI That Designs AI

Neural Architecture Search (NAS) automates the design of neural network architectures, using machine learning to discover optimal model structures that outperform human-designed networks.

## The Architecture Design Problem

```
Human architecture design:
1. Expert proposes architecture
2. Train and evaluate
3. Modify based on intuition
4. Repeat (weeks/months)

NAS:
1. Define search space
2. Search algorithm explores
3. Evaluate candidates (often with tricks)
4. Find optimal architecture (days/hours)
```

## Search Space Definition

```python
class TransformerSearchSpace:
    """Define what architectures are possible."""

    def __init__(self):
        self.choices = {
            # Per-layer choices
            "num_heads": [4, 8, 12, 16],
            "hidden_dim": [512, 768, 1024, 1536, 2048],
            "ffn_ratio": [2, 3, 4, 5],
            "activation": ["gelu", "swiglu", "relu"],

            # Global choices
            "num_layers": range(6, 25),
            "attention_type": ["full", "local", "linear", "sparse"],
            "position_encoding": ["learned", "sinusoidal", "rotary", "alibi"],

            # Normalization
            "norm_type": ["layer", "rms", "group"],
            "norm_position": ["pre", "post"],
        }

    def sample_architecture(self):
        """Random architecture from search space."""
        arch = {}
        for key, choices in self.choices.items():
            if isinstance(choices, range):
                arch[key] = random.choice(list(choices))
            else:
                arch[key] = random.choice(choices)
        return arch

    def encode(self, architecture):
        """Convert architecture to vector for optimization."""
        # One-hot encode each choice
        encoding = []
        for key, choices in self.choices.items():
            one_hot = [1 if c == architecture[key] else 0 for c in choices]
            encoding.extend(one_hot)
        return np.array(encoding)
```

## Search Algorithms

### Random Search (Baseline)

```python
def random_search(search_space, n_trials, evaluator):
    """Surprisingly strong baseline."""
    best_arch = None
    best_score = float('-inf')

    for _ in range(n_trials):
        arch = search_space.sample_architecture()
        score = evaluator.evaluate(arch)

        if score > best_score:
            best_score = score
            best_arch = arch

    return best_arch, best_score
```

### Evolutionary Search

```python
class EvolutionaryNAS:
    """Evolve architectures through mutation and selection."""

    def __init__(self, search_space, population_size=50):
        self.space = search_space
        self.pop_size = population_size

    def search(self, evaluator, generations=100):
        # Initialize population
        population = [self.space.sample_architecture()
                      for _ in range(self.pop_size)]
        fitness = [evaluator.evaluate(arch) for arch in population]

        for gen in range(generations):
            # Selection: tournament
            parents = self.tournament_select(population, fitness, k=2)

            # Crossover and mutation
            children = []
            for p1, p2 in zip(parents[::2], parents[1::2]):
                child = self.crossover(p1, p2)
                child = self.mutate(child)
                children.append(child)

            # Evaluate children
            child_fitness = [evaluator.evaluate(c) for c in children]

            # Replace worst with children
            population, fitness = self.replace_worst(
                population, fitness, children, child_fitness
            )

        return population[np.argmax(fitness)]

    def mutate(self, arch, mutation_rate=0.1):
        """Randomly modify architecture choices."""
        mutated = arch.copy()
        for key in self.space.choices:
            if random.random() < mutation_rate:
                mutated[key] = random.choice(self.space.choices[key])
        return mutated
```

### Reinforcement Learning NAS

```python
class RLNAS:
    """Controller RNN generates architectures, learns from rewards."""

    def __init__(self, search_space, hidden_dim=100):
        self.space = search_space
        self.controller = ControllerRNN(hidden_dim)

    def search(self, evaluator, n_episodes=1000):
        optimizer = torch.optim.Adam(self.controller.parameters())

        for episode in range(n_episodes):
            # Controller generates architecture
            arch, log_probs = self.controller.sample_architecture()

            # Evaluate architecture
            reward = evaluator.evaluate(arch)

            # REINFORCE update
            loss = -reward * sum(log_probs)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        # Return best architecture found
        return self.controller.best_architecture()


class ControllerRNN(nn.Module):
    """Generates architecture decisions autoregressively."""

    def __init__(self, hidden_dim):
        super().__init__()
        self.lstm = nn.LSTM(hidden_dim, hidden_dim)
        self.decision_heads = nn.ModuleDict()  # One per decision type

    def sample_architecture(self):
        arch = {}
        log_probs = []
        hidden = self.init_hidden()

        for decision in self.decisions:
            # LSTM step
            hidden = self.lstm_step(hidden)

            # Sample this decision
            logits = self.decision_heads[decision](hidden)
            prob = F.softmax(logits, dim=-1)
            choice = torch.multinomial(prob, 1)

            arch[decision] = choice
            log_probs.append(prob[choice].log())

        return arch, log_probs
```

### Differentiable NAS (DARTS)

```python
class DARTS:
    """Make architecture search differentiable."""

    def __init__(self, operations):
        self.ops = operations
        # Architecture parameters (learnable)
        self.alpha = nn.Parameter(
            torch.randn(len(operations))
        )

    def forward(self, x):
        """Soft combination of all operations."""
        weights = F.softmax(self.alpha, dim=0)
        return sum(w * op(x) for w, op in zip(weights, self.ops))

    def search(self, train_data, val_data, epochs=50):
        """Bilevel optimization."""
        arch_optimizer = torch.optim.Adam([self.alpha])
        weight_optimizer = torch.optim.SGD(self.op_parameters())

        for epoch in range(epochs):
            # Update weights on training data
            for batch in train_data:
                loss = self.compute_loss(batch)
                weight_optimizer.zero_grad()
                loss.backward()
                weight_optimizer.step()

            # Update architecture on validation data
            for batch in val_data:
                loss = self.compute_loss(batch)
                arch_optimizer.zero_grad()
                loss.backward()
                arch_optimizer.step()

        # Discretize to final architecture
        return self.discretize()

    def discretize(self):
        """Convert soft weights to hard architecture."""
        return torch.argmax(self.alpha)
```

## Efficient Evaluation

### Weight Sharing (One-Shot NAS)

```python
class SuperNet(nn.Module):
    """Train one network containing all architectures."""

    def __init__(self, search_space):
        super().__init__()
        self.space = search_space

        # Create all possible layers
        self.layers = nn.ModuleDict()
        for choice in search_space.all_choices():
            self.layers[choice] = create_layer(choice)

    def forward(self, x, architecture):
        """Forward pass for specific architecture."""
        for layer_idx, choice in enumerate(architecture):
            layer = self.layers[f"{layer_idx}_{choice}"]
            x = layer(x)
        return x

    def evaluate_architecture(self, architecture, val_data):
        """Evaluate without retraining."""
        self.eval()
        total_correct = 0
        for batch in val_data:
            preds = self.forward(batch.x, architecture)
            total_correct += (preds.argmax(-1) == batch.y).sum()
        return total_correct / len(val_data)
```

### Predictor-Based NAS

```python
class PerformancePredictor:
    """Predict architecture performance without training."""

    def __init__(self):
        self.encoder = ArchitectureEncoder()
        self.predictor = nn.Sequential(
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, 1)
        )

    def train_predictor(self, arch_perf_pairs):
        """Train on (architecture, performance) pairs."""
        for arch, perf in arch_perf_pairs:
            encoding = self.encoder(arch)
            pred = self.predictor(encoding)
            loss = F.mse_loss(pred, perf)
            loss.backward()

    def search_with_predictor(self, search_space, n_candidates=10000):
        """Generate many, predict, evaluate top-k."""
        candidates = [search_space.sample() for _ in range(n_candidates)]
        predictions = [self.predict(arch) for arch in candidates]

        # Only evaluate top predicted
        top_k = np.argsort(predictions)[-10:]
        actual_scores = [full_evaluate(candidates[i]) for i in top_k]

        return candidates[top_k[np.argmax(actual_scores)]]
```

## Notable NAS Results

| Architecture | Task | Method | Result |
|-------------|------|--------|--------|
| NASNet | ImageNet | RL | 82.7% top-1 |
| AmoebaNet | ImageNet | Evolution | 83.1% top-1 |
| EfficientNet | ImageNet | RL + Scaling | 84.4% top-1 |
| AutoML-Zero | Learning algs | Evolution | Discovered SGD |
| Primer | Transformers | Evolution | 4x faster than vanilla |

## Hardware-Aware NAS

```python
class HardwareAwareNAS:
    """Optimize for accuracy AND latency/energy."""

    def __init__(self, search_space, target_hardware):
        self.space = search_space
        self.hardware = target_hardware

    def evaluate(self, architecture):
        """Multi-objective: accuracy and efficiency."""
        # Train and get accuracy
        accuracy = train_and_evaluate(architecture)

        # Measure or predict hardware metrics
        latency = self.hardware.measure_latency(architecture)
        energy = self.hardware.measure_energy(architecture)
        memory = self.hardware.measure_memory(architecture)

        return {
            "accuracy": accuracy,
            "latency": latency,
            "energy": energy,
            "memory": memory
        }

    def pareto_search(self):
        """Find Pareto-optimal architectures."""
        results = []
        for arch in self.search():
            metrics = self.evaluate(arch)
            results.append((arch, metrics))

        return self.pareto_frontier(results)
```

## Future Directions

1. **Foundation model NAS**: Search over trillion-parameter spaces
2. **Multi-task NAS**: One architecture for many tasks
3. **Continual NAS**: Adapt architecture over time
4. **Emergent architectures**: Novel designs unlike human intuitions

## References

- [Neural Architecture Search with Reinforcement Learning](https://arxiv.org/abs/1611.01578)
- [DARTS: Differentiable Architecture Search](https://arxiv.org/abs/1806.09055)
- [EfficientNet: Rethinking Model Scaling](https://arxiv.org/abs/1905.11946)
- [Primer: Searching for Efficient Transformers](https://arxiv.org/abs/2109.08668)

---

*Neural Architecture Search represents AI's ability to improve itself—not just learning from data, but learning how to learn from data.*
