---
date:
  created: 2025-03-04
  updated: 2025-03-04
categories:
  - Research
  - Efficiency
  - Training
authors:
  - parnian
---

# Knowledge Distillation: Teaching Small Models to Think Big

Knowledge distillation transfers the capabilities of large "teacher" models into smaller, faster "student" models—enabling deployment of powerful AI in resource-constrained environments.

## The Core Idea

Instead of training on hard labels, students learn from teacher's soft predictions:

```
Hard labels (one-hot):
"cat" → [1, 0, 0, 0]  (cat, dog, bird, fish)

Soft labels (teacher predictions):
"cat" → [0.85, 0.10, 0.03, 0.02]

The soft labels encode:
- This is probably a cat (0.85)
- It looks somewhat like a dog (0.10) — maybe a similar shape?
- Unlikely to be a bird or fish (0.03, 0.02)

This "dark knowledge" teaches relationships between classes
```

## Classical Knowledge Distillation

```python
class DistillationTrainer:
    def __init__(self, teacher, student, temperature=4.0, alpha=0.5):
        self.teacher = teacher.eval()  # Frozen
        self.student = student
        self.T = temperature
        self.alpha = alpha

    def distillation_loss(self, inputs, labels):
        # Student predictions
        student_logits = self.student(inputs)

        # Teacher predictions (no gradient)
        with torch.no_grad():
            teacher_logits = self.teacher(inputs)

        # Soft target loss (KL divergence)
        soft_targets = F.softmax(teacher_logits / self.T, dim=-1)
        soft_predictions = F.log_softmax(student_logits / self.T, dim=-1)
        soft_loss = F.kl_div(
            soft_predictions,
            soft_targets,
            reduction='batchmean'
        ) * (self.T ** 2)

        # Hard target loss (standard cross-entropy)
        hard_loss = F.cross_entropy(student_logits, labels)

        # Combined loss
        return self.alpha * soft_loss + (1 - self.alpha) * hard_loss
```

## Temperature: Softening the Distribution

```python
def temperature_softmax(logits, T):
    """Higher T = softer distribution, more information transfer."""
    return F.softmax(logits / T, dim=-1)

# Example: logits = [5.0, 2.0, 1.0, 0.5]
# T=1: [0.87, 0.05, 0.02, 0.01]  (peaked, little info)
# T=4: [0.48, 0.22, 0.16, 0.14]  (spread, rich info)
```

## LLM Distillation Methods

### 1. Sequence-Level Distillation

```python
class SequenceDistillation:
    def __init__(self, teacher, student, tokenizer):
        self.teacher = teacher
        self.student = student
        self.tokenizer = tokenizer

    def create_distillation_data(self, prompts, n_samples=4):
        """Generate training data from teacher."""
        data = []
        for prompt in prompts:
            # Teacher generates multiple completions
            completions = self.teacher.generate(
                prompt,
                num_return_sequences=n_samples,
                temperature=0.8
            )
            for completion in completions:
                data.append({
                    "prompt": prompt,
                    "completion": completion
                })
        return data

    def train_student(self, distillation_data):
        """Train student on teacher's outputs."""
        for example in distillation_data:
            inputs = self.tokenizer(example["prompt"])
            labels = self.tokenizer(example["completion"])
            loss = self.student.forward(inputs, labels=labels)
            loss.backward()
```

### 2. Token-Level Distillation

```python
def token_level_distillation(teacher, student, input_ids):
    """Match token probability distributions."""
    with torch.no_grad():
        teacher_logits = teacher(input_ids).logits

    student_logits = student(input_ids).logits

    # KL divergence at each position
    loss = F.kl_div(
        F.log_softmax(student_logits, dim=-1),
        F.softmax(teacher_logits / temperature, dim=-1),
        reduction='batchmean'
    )
    return loss
```

### 3. Feature-Level Distillation

```python
class FeatureDistillation(nn.Module):
    """Match intermediate representations."""

    def __init__(self, teacher, student, layer_mapping):
        super().__init__()
        self.teacher = teacher
        self.student = student
        self.layer_mapping = layer_mapping  # {student_layer: teacher_layer}

        # Projection layers if dimensions differ
        self.projectors = nn.ModuleDict()
        for s_layer, t_layer in layer_mapping.items():
            s_dim = student.config.hidden_size
            t_dim = teacher.config.hidden_size
            if s_dim != t_dim:
                self.projectors[s_layer] = nn.Linear(s_dim, t_dim)

    def forward(self, input_ids):
        # Get intermediate representations
        teacher_hiddens = self.get_hiddens(self.teacher, input_ids)
        student_hiddens = self.get_hiddens(self.student, input_ids)

        # Compute feature matching loss
        loss = 0
        for s_layer, t_layer in self.layer_mapping.items():
            s_feat = student_hiddens[s_layer]
            t_feat = teacher_hiddens[t_layer]

            if s_layer in self.projectors:
                s_feat = self.projectors[s_layer](s_feat)

            loss += F.mse_loss(s_feat, t_feat.detach())

        return loss / len(self.layer_mapping)
```

### 4. Attention Transfer

```python
def attention_transfer_loss(teacher_attentions, student_attentions):
    """Student mimics teacher's attention patterns."""
    loss = 0
    for t_attn, s_attn in zip(teacher_attentions, student_attentions):
        # Average over heads
        t_attn_mean = t_attn.mean(dim=1)  # [batch, seq, seq]
        s_attn_mean = s_attn.mean(dim=1)

        # MSE loss on attention maps
        loss += F.mse_loss(s_attn_mean, t_attn_mean.detach())

    return loss / len(teacher_attentions)
```

## Practical Distillation Recipe

```python
class ComprehensiveDistiller:
    def __init__(
        self,
        teacher,
        student,
        token_weight=1.0,
        feature_weight=0.5,
        attention_weight=0.1,
        hard_label_weight=0.5
    ):
        self.teacher = teacher
        self.student = student
        self.weights = {
            "token": token_weight,
            "feature": feature_weight,
            "attention": attention_weight,
            "hard": hard_label_weight
        }

    def compute_loss(self, input_ids, labels):
        # Teacher forward (no grad)
        with torch.no_grad():
            teacher_out = self.teacher(
                input_ids,
                output_hidden_states=True,
                output_attentions=True
            )

        # Student forward
        student_out = self.student(
            input_ids,
            output_hidden_states=True,
            output_attentions=True
        )

        # Token-level distillation
        token_loss = self.token_distillation(
            teacher_out.logits, student_out.logits
        )

        # Feature matching
        feature_loss = self.feature_distillation(
            teacher_out.hidden_states,
            student_out.hidden_states
        )

        # Attention transfer
        attention_loss = self.attention_distillation(
            teacher_out.attentions,
            student_out.attentions
        )

        # Hard label loss
        hard_loss = F.cross_entropy(
            student_out.logits.view(-1, vocab_size),
            labels.view(-1)
        )

        # Combined loss
        total_loss = (
            self.weights["token"] * token_loss +
            self.weights["feature"] * feature_loss +
            self.weights["attention"] * attention_loss +
            self.weights["hard"] * hard_loss
        )

        return total_loss
```

## Notable Distilled Models

| Student | Teacher | Size Reduction | Quality Retention |
|---------|---------|----------------|-------------------|
| DistilBERT | BERT-base | 40% smaller | 97% quality |
| TinyBERT | BERT-base | 7.5x smaller | 96% quality |
| MiniLM | BERT/RoBERTa | 10x smaller | 95% quality |
| Alpaca | GPT-3.5 | ~100x smaller | ~85% quality |
| Mistral-7B | - | Native small | Matches 30B |
| Phi-3 | Web data | 3.8B params | Matches 7B |

## Self-Distillation

Model teaches itself through different configurations:

```python
class SelfDistillation:
    """Deeper layers teach shallower layers."""

    def __init__(self, model):
        self.model = model

    def forward(self, input_ids):
        # Get outputs from all layers
        all_hidden_states = self.model(
            input_ids, output_hidden_states=True
        ).hidden_states

        # Final layer (deepest) is the teacher
        teacher_hidden = all_hidden_states[-1]

        # Earlier layers learn from final layer
        loss = 0
        for student_hidden in all_hidden_states[:-1]:
            loss += F.mse_loss(
                student_hidden,
                teacher_hidden.detach()
            )

        return loss / (len(all_hidden_states) - 1)
```

## Data Augmentation for Distillation

```python
def augment_for_distillation(prompt, teacher):
    """Generate diverse training examples."""
    variations = []

    # 1. Rephrase the prompt
    rephrased = teacher.generate(f"Rephrase: {prompt}")
    variations.append(rephrased)

    # 2. Generate at different temperatures
    for temp in [0.3, 0.7, 1.0]:
        output = teacher.generate(prompt, temperature=temp)
        variations.append(output)

    # 3. Chain-of-thought reasoning
    cot = teacher.generate(f"Think step by step: {prompt}")
    variations.append(cot)

    return variations
```

## Future Directions

1. **Online distillation**: Continuous learning from improving teachers
2. **Multi-teacher distillation**: Ensemble knowledge transfer
3. **Task-specific distillation**: Optimize for specific use cases
4. **Distillation without labels**: Self-supervised distillation

## References

- [Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531)
- [DistilBERT](https://arxiv.org/abs/1910.01108)
- [TinyBERT](https://arxiv.org/abs/1909.10351)
- [Knowledge Distillation: A Survey](https://arxiv.org/abs/2006.05525)

---

*Distillation reveals that what makes a model powerful isn't just its size, but the knowledge it has accumulated—and that knowledge can be compressed far more than the parameters themselves.*
