---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - Training
  - Alignment
authors: parnian
coverImage: /images/blog/instruction-tuning.png
---

# Instruction Tuning: Teaching Models to Follow Directions

Instruction tuning transforms base language models from next-token predictors into helpful assistants that understand and execute user requests—the crucial step that makes GPT-4 different from GPT-4-base.

## The Problem with Base Models

Base models are trained to predict text, not follow instructions:

```
Base Model:
User: "Translate 'hello' to French"
Model: "is a common language learning exercise..."

Instruction-Tuned:
User: "Translate 'hello' to French"
Model: "Bonjour"
```

## What Instruction Tuning Adds

```
Base Model Training:
Objective: P(next_token | previous_tokens)
Data: Internet text (books, web, code)
Result: Text completion

+ Instruction Tuning:
Objective: P(response | instruction)
Data: (instruction, response) pairs
Result: Instruction following
```

## Dataset Construction

### Manual Annotation

```python
# High-quality but expensive
instruction_dataset = [
    {
        "instruction": "Write a haiku about programming",
        "response": "Curly braces nest\nLogic flows through silicon\nBugs hide in the code"
    },
    {
        "instruction": "Explain quantum computing in simple terms",
        "response": "Imagine a coin spinning in the air..."
    }
]
```

### Self-Instruct

```python
class SelfInstruct:
    """Generate instructions using the model itself."""

    def __init__(self, model, seed_tasks):
        self.model = model
        self.seed_tasks = seed_tasks  # ~175 human-written seeds
        self.task_pool = list(seed_tasks)

    def generate_instruction(self):
        # Sample existing tasks as examples
        examples = random.sample(self.task_pool, k=3)

        prompt = f"""Here are some example tasks:
{self.format_examples(examples)}

Generate a new, different task:
Task:"""

        new_instruction = self.model.generate(prompt)
        return new_instruction

    def generate_instance(self, instruction):
        """Generate input-output pair for instruction."""
        prompt = f"""Task: {instruction}

Generate an example input and correct output.
Input:"""

        response = self.model.generate(prompt)
        return self.parse_input_output(response)

    def filter_quality(self, instruction, response):
        """Remove low-quality examples."""
        # Check diversity
        if self.too_similar_to_pool(instruction):
            return False

        # Check validity
        if not self.model.can_follow(instruction, response):
            return False

        return True
```

### Evol-Instruct (WizardLM)

```python
class EvolInstruct:
    """Evolve simple instructions into complex ones."""

    def __init__(self, model):
        self.model = model

    def evolve(self, instruction, method="deepen"):
        if method == "deepen":
            return self.add_constraints(instruction)
        elif method == "broaden":
            return self.add_requirements(instruction)
        elif method == "concretize":
            return self.make_specific(instruction)
        elif method == "complicate":
            return self.add_steps(instruction)

    def add_constraints(self, instruction):
        prompt = f"""Make this task harder by adding constraints:

Original: {instruction}

Harder version:"""
        return self.model.generate(prompt)

    def evolution_chain(self, seed_instruction, depth=4):
        """Progressively evolve an instruction."""
        instructions = [seed_instruction]

        for i in range(depth):
            method = random.choice(["deepen", "broaden", "concretize"])
            evolved = self.evolve(instructions[-1], method)
            instructions.append(evolved)

        return instructions
```

## Training Approaches

### Standard Fine-Tuning

```python
class InstructionTuner:
    def __init__(self, model, tokenizer):
        self.model = model
        self.tokenizer = tokenizer

    def format_prompt(self, instruction, response=None):
        if response:
            return f"""Below is an instruction. Write a response.

### Instruction:
{instruction}

### Response:
{response}"""
        else:
            return f"""Below is an instruction. Write a response.

### Instruction:
{instruction}

### Response:
"""

    def compute_loss(self, batch):
        prompts = [self.format_prompt(inst, resp)
                   for inst, resp in batch]

        inputs = self.tokenizer(prompts, return_tensors="pt", padding=True)

        # Only compute loss on response tokens
        labels = inputs.input_ids.clone()
        labels[labels == self.tokenizer.pad_token_id] = -100

        # Mask instruction portion
        for i, (inst, _) in enumerate(batch):
            inst_len = len(self.tokenizer(self.format_prompt(inst)).input_ids)
            labels[i, :inst_len] = -100

        outputs = self.model(**inputs, labels=labels)
        return outputs.loss
```

### Parameter-Efficient Tuning (LoRA)

```python
from peft import LoraConfig, get_peft_model

def setup_lora_tuning(model):
    config = LoraConfig(
        r=16,  # Rank of update matrices
        lora_alpha=32,
        target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
        lora_dropout=0.1,
        bias="none",
        task_type="CAUSAL_LM"
    )

    return get_peft_model(model, config)

# Only ~0.1% of parameters are trained
# But achieves similar quality to full fine-tuning
```

## Multi-Task Instruction Tuning

### FLAN-Style

```python
# Mix many tasks with instructional templates
TASK_TEMPLATES = {
    "summarization": [
        "Summarize the following text:\n{text}",
        "Write a brief summary:\n{text}",
        "TL;DR:\n{text}",
    ],
    "translation": [
        "Translate to {language}:\n{text}",
        "How do you say '{text}' in {language}?",
    ],
    "qa": [
        "Question: {question}\nAnswer:",
        "Q: {question}\nA:",
        "Based on the context, answer: {question}\nContext: {context}",
    ]
}

def format_task(task_type, example):
    template = random.choice(TASK_TEMPLATES[task_type])
    return template.format(**example)
```

### Task Balancing

```python
class BalancedTaskMixer:
    """Prevent overfitting to any single task."""

    def __init__(self, task_datasets, strategy="proportional"):
        self.tasks = task_datasets
        self.strategy = strategy

    def get_batch(self, batch_size):
        if self.strategy == "proportional":
            # Proportional to dataset size
            weights = [len(d) for d in self.tasks.values()]
        elif self.strategy == "uniform":
            # Equal representation
            weights = [1] * len(self.tasks)
        elif self.strategy == "examples_per_task":
            # Cap examples per task
            weights = [min(len(d), 10000) for d in self.tasks.values()]

        samples = []
        for _ in range(batch_size):
            task = random.choices(list(self.tasks.keys()), weights=weights)[0]
            example = random.choice(self.tasks[task])
            samples.append((task, example))

        return samples
```

## Quality Improvements

### Response Filtering

```python
class QualityFilter:
    def __init__(self, reward_model, threshold=0.7):
        self.rm = reward_model
        self.threshold = threshold

    def filter_dataset(self, examples):
        """Keep only high-quality instruction-response pairs."""
        filtered = []
        for instruction, response in examples:
            score = self.rm.score(instruction, response)
            if score > self.threshold:
                filtered.append((instruction, response))
        return filtered

    def rejection_sampling(self, instruction, model, n_samples=16):
        """Generate many responses, keep the best."""
        responses = [model.generate(instruction) for _ in range(n_samples)]
        scores = [self.rm.score(instruction, r) for r in responses]
        best_idx = scores.index(max(scores))
        return responses[best_idx]
```

### Chain-of-Thought Data

```python
def add_reasoning_traces(examples, model):
    """Augment with step-by-step reasoning."""
    augmented = []
    for instruction, response in examples:
        # Generate reasoning
        prompt = f"""Solve this step by step:
{instruction}

Let's think through this:"""

        reasoning = model.generate(prompt)

        # Combine reasoning with answer
        full_response = f"""Let me think through this step by step:
{reasoning}

Therefore, the answer is: {response}"""

        augmented.append((instruction, full_response))

    return augmented
```

## Evaluation

### Automatic Metrics

```python
def evaluate_instruction_following(model, test_set):
    metrics = {
        "format_adherence": 0,
        "task_completion": 0,
        "coherence": 0,
    }

    for instruction, expected in test_set:
        response = model.generate(instruction)

        # Does it follow format requirements?
        metrics["format_adherence"] += check_format(instruction, response)

        # Did it complete the task?
        metrics["task_completion"] += task_complete(instruction, response, expected)

        # Is the response coherent?
        metrics["coherence"] += coherence_score(response)

    return {k: v / len(test_set) for k, v in metrics.items()}
```

### Human Evaluation

```
Dimensions:
1. Helpfulness (1-5): Does it answer the question?
2. Harmlessness (1-5): Is it safe and appropriate?
3. Honesty (1-5): Does it avoid hallucination?
4. Instruction Following (1-5): Did it do what was asked?

Compare: Response A vs Response B (which is better?)
```

## Notable Instruction-Tuned Models

| Model | Base | Method | Dataset Size |
|-------|------|--------|--------------|
| FLAN-T5 | T5 | Multi-task | 1,800+ tasks |
| Alpaca | LLaMA | Self-Instruct | 52K |
| Vicuna | LLaMA | ShareGPT | 70K conversations |
| WizardLM | LLaMA | Evol-Instruct | 250K |
| Orca | LLaMA | Explanation tuning | 5M |

## References

- [FLAN: Finetuned Language Models](https://arxiv.org/abs/2109.01652)
- [Self-Instruct](https://arxiv.org/abs/2212.10560)
- [WizardLM: Evol-Instruct](https://arxiv.org/abs/2304.12244)
- [Orca: Progressive Learning](https://arxiv.org/abs/2306.02707)

---

*Instruction tuning teaches models not just what to say, but how to listen—transforming pattern completion into genuine task execution.*
