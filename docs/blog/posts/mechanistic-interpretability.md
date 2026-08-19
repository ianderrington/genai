---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - Interpretability
  - Safety
authors: parnian
---

# Mechanistic Interpretability: Reverse-Engineering Neural Networks

Mechanistic interpretability aims to understand neural networks by identifying the specific algorithms and circuits they implement—moving beyond behavioral analysis to truly understand *how* models work internally.

## The Core Challenge

Neural networks are often called "black boxes," but mechanistic interpretability researchers argue they're more like "compiled code"—difficult to read but not fundamentally unknowable.

```
Traditional ML:    Input → [Black Box] → Output
                           ↓
Mechanistic:       Input → [Circuits, Features, Algorithms] → Output
                           ↓
                   We can understand each component
```

## Key Concepts

### Features and Superposition

**Features**: The fundamental units of representation in neural networks. A feature might represent "the concept of dogs" or "the presence of curves."

**Superposition**: Networks represent more features than they have dimensions by encoding multiple features in overlapping patterns:

$$\text{Features} \gg \text{Dimensions}$$

This is possible because not all features activate simultaneously, allowing efficient "compressed" representations.

### Circuits

Circuits are subgraphs of the network that implement specific computations:

```
Example: Indirect Object Identification Circuit

"When Mary and John went to the store, John gave a drink to"
                                                          ↓
[Name Mover Heads] ← [S-Inhibition Heads] ← [Duplicate Token Heads]
        ↓                    ↓                      ↓
   Copy "Mary"         Inhibit "John"         Detect repetition
        ↓
   Output: "Mary"
```

### Attention Head Functions

Specific attention heads perform identifiable functions:

| Head Type | Function | Example |
|-----------|----------|---------|
| Induction Heads | Pattern completion | [A][B]...[A] → [B] |
| Name Mover Heads | Copy names to output | "John said" → "John" |
| Negative Heads | Suppress incorrect outputs | Reduce probability of wrong tokens |
| Backup Heads | Redundancy for important functions | Parallel circuits |

## Research Methodology

### 1. Activation Patching

Replace activations from one input with another to identify causal importance:

```python
def activation_patching(model, clean_input, corrupted_input, layer, position):
    # Run model on both inputs
    clean_activations = model.get_activations(clean_input, layer)
    corrupted_activations = model.get_activations(corrupted_input, layer)
    
    # Patch: use clean activation at specific position in corrupted run
    patched_activations = corrupted_activations.clone()
    patched_activations[position] = clean_activations[position]
    
    # Measure effect on output
    return model.forward_with_activations(corrupted_input, patched_activations, layer)
```

### 2. Probing

Train simple classifiers on intermediate activations:

```python
class LinearProbe(nn.Module):
    def __init__(self, hidden_dim, num_classes):
        super().__init__()
        self.linear = nn.Linear(hidden_dim, num_classes)
    
    def forward(self, activations):
        return self.linear(activations)

# Train probe to predict if activation represents "positive sentiment"
probe = LinearProbe(768, 2)
# If probe achieves high accuracy, the feature is linearly represented
```

### 3. Sparse Autoencoders

Decompose activations into interpretable features:

```python
class SparseAutoencoder(nn.Module):
    def __init__(self, d_model, n_features, sparsity_coef=1e-3):
        super().__init__()
        self.encoder = nn.Linear(d_model, n_features)
        self.decoder = nn.Linear(n_features, d_model)
        self.sparsity_coef = sparsity_coef
    
    def forward(self, x):
        # Encode to sparse features
        features = F.relu(self.encoder(x))
        # Decode back
        reconstruction = self.decoder(features)
        
        # Loss = reconstruction + sparsity
        recon_loss = F.mse_loss(reconstruction, x)
        sparsity_loss = self.sparsity_coef * features.abs().mean()
        
        return reconstruction, features, recon_loss + sparsity_loss
```

## Major Findings

### Anthropic's Research

1. **Features are interpretable**: Sparse autoencoders find features corresponding to concepts like "Golden Gate Bridge," "deception," "code errors"

2. **Feature steering**: Activating specific features changes model behavior predictably

3. **Safety-relevant features**: Features exist for concepts like "harmful content," "deception," "sycophancy"

### OpenAI's Research

1. **Superposition is real**: GPT-2 uses superposition extensively, especially in early layers

2. **Circuits are modular**: Specific circuits handle specific tasks (e.g., modular arithmetic)

3. **Scaling affects interpretability**: Larger models may be *more* interpretable due to less superposition pressure

## Applications

### AI Safety

```
1. Identify deception features → Monitor for activation
2. Find refusal circuits → Ensure robustness to jailbreaks
3. Locate knowledge → Verify factual grounding
4. Map goal representations → Align with human values
```

### Model Editing

```python
# If we find the "Eiffel Tower → Paris" circuit:
def edit_knowledge(model, old_fact, new_fact):
    # Locate relevant parameters
    circuit = find_circuit(model, old_fact)
    
    # Modify weights to encode new fact
    edit_weights(circuit, new_fact)
    
    # Verify edit is localized
    assert other_knowledge_preserved(model)
```

### Debugging

Understanding *why* a model fails enables targeted fixes rather than brute-force retraining.

## Challenges

1. **Scale**: Models have billions of parameters; manual analysis doesn't scale
2. **Polysemanticity**: Single neurons often represent multiple concepts
3. **Distributed representations**: Important computations span many components
4. **Validation**: How do we verify our interpretations are correct?

## Tools & Resources

- **TransformerLens**: Library for mechanistic interpretability
- **Neuronpedia**: Database of interpretable features
- **Circuitsvis**: Visualization tools
- **SAELens**: Sparse autoencoder training

## Future Directions

1. **Automated interpretability**: Using AI to interpret AI
2. **Scaling to frontier models**: Interpreting GPT-4/Claude-scale systems
3. **Real-time monitoring**: Interpretability during inference
4. **Formal verification**: Mathematical proofs about model behavior

## References

- [Zoom In: An Introduction to Circuits](https://distill.pub/2020/circuits/zoom-in/)
- [A Mathematical Framework for Transformer Circuits](https://transformer-circuits.pub/)
- [Towards Monosemanticity: Decomposing Language Models](https://transformer-circuits.pub/2023/monosemantic-features/)
- [Scaling Monosemanticity](https://transformer-circuits.pub/2024/scaling-monosemanticity/)

---

*Mechanistic interpretability may be our best hope for truly understanding—and safely deploying—advanced AI systems.*
