---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Research
  - Training
  - Data
authors: parnian
coverImage: /images/blog/data-curation-llms.png
---

# Data Curation: The Hidden Art Behind Great LLMs

Data curation—selecting, cleaning, and organizing training data—is often more important than model architecture. The best models win not by being bigger, but by training on better data.

## Quality Over Quantity

```
GPT-3 era thinking:
More data = better model
Scrape everything, filter nothing

Modern understanding:
Quality >> Quantity
10B high-quality tokens > 1T low-quality tokens

Evidence: Phi-3 (3.8B params) matches GPT-3.5 (175B)
          due to carefully curated synthetic data
```

## The Data Pipeline

```
Raw Web Crawl (100TB+)
        │
        ▼
┌───────────────┐
│  Deduplication │
│  (URL, exact,  │
│   MinHash)     │
└───────────────┘
        │ ~30% remains
        ▼
┌───────────────┐
│  Language ID   │
│  Filter noise  │
└───────────────┘
        │ ~80% remains
        ▼
┌───────────────┐
│  Quality      │
│  Filtering    │
└───────────────┘
        │ ~20% remains
        ▼
┌───────────────┐
│  Toxicity &   │
│  Safety       │
└───────────────┘
        │ ~90% remains
        ▼
┌───────────────┐
│  Domain       │
│  Mixing       │
└───────────────┘
        │
        ▼
   Training Data (~1-5TB)
```

## Deduplication

### Exact Deduplication

```python
def exact_dedup(documents):
    """Remove exact duplicates using hashing."""
    seen_hashes = set()
    unique_docs = []

    for doc in documents:
        doc_hash = hashlib.sha256(doc.encode()).hexdigest()
        if doc_hash not in seen_hashes:
            seen_hashes.add(doc_hash)
            unique_docs.append(doc)

    return unique_docs
```

### Near-Duplicate Detection (MinHash)

```python
from datasketch import MinHash, MinHashLSH

class NearDuplicateDetector:
    def __init__(self, threshold=0.8, num_perm=128):
        self.lsh = MinHashLSH(threshold=threshold, num_perm=num_perm)
        self.num_perm = num_perm

    def get_minhash(self, text):
        """Create MinHash signature for document."""
        m = MinHash(num_perm=self.num_perm)
        # Use n-grams
        words = text.split()
        for i in range(len(words) - 5):
            ngram = ' '.join(words[i:i+5])
            m.update(ngram.encode('utf-8'))
        return m

    def deduplicate(self, documents):
        unique = []
        for idx, doc in enumerate(documents):
            mh = self.get_minhash(doc)

            # Check for near-duplicates
            duplicates = self.lsh.query(mh)
            if not duplicates:
                self.lsh.insert(str(idx), mh)
                unique.append(doc)

        return unique
```

### Contamination Detection

```python
class ContaminationChecker:
    """Detect benchmark data in training set."""

    def __init__(self, benchmarks):
        self.benchmark_ngrams = {}
        for name, data in benchmarks.items():
            ngrams = set()
            for example in data:
                for n in [8, 13]:  # 8-gram and 13-gram
                    ngrams.update(self.get_ngrams(example, n))
            self.benchmark_ngrams[name] = ngrams

    def check_document(self, doc):
        """Check if document contains benchmark data."""
        doc_ngrams = set(self.get_ngrams(doc, 13))

        contaminated = []
        for benchmark, bench_ngrams in self.benchmark_ngrams.items():
            overlap = doc_ngrams & bench_ngrams
            if len(overlap) > 0:
                contaminated.append(benchmark)

        return contaminated
```

## Quality Filtering

### Heuristic Filters

```python
class HeuristicQualityFilter:
    def __init__(self):
        self.rules = [
            self.check_length,
            self.check_word_ratio,
            self.check_repetition,
            self.check_punctuation,
            self.check_stopwords,
        ]

    def check_length(self, doc):
        """Filter very short or very long documents."""
        words = len(doc.split())
        return 50 <= words <= 100000

    def check_word_ratio(self, doc):
        """Filter documents with too many short words."""
        words = doc.split()
        short_words = sum(1 for w in words if len(w) <= 3)
        return short_words / len(words) < 0.4

    def check_repetition(self, doc):
        """Filter documents with excessive repetition."""
        lines = doc.split('\n')
        if len(lines) > 1:
            unique_ratio = len(set(lines)) / len(lines)
            return unique_ratio > 0.3
        return True

    def check_punctuation(self, doc):
        """Filter documents with no/excessive punctuation."""
        punct_count = sum(1 for c in doc if c in '.,!?;:')
        return 0.001 < punct_count / len(doc) < 0.1

    def is_high_quality(self, doc):
        return all(rule(doc) for rule in self.rules)
```

### ML-Based Quality Scoring

```python
class QualityClassifier:
    """Train classifier on high/low quality examples."""

    def __init__(self):
        # Train on Wikipedia (high) vs random web (low)
        self.classifier = train_classifier()

    def score(self, document):
        """Score document quality 0-1."""
        features = self.extract_features(document)
        return self.classifier.predict_proba(features)[1]

    def extract_features(self, doc):
        return {
            "perplexity": self.compute_perplexity(doc),
            "unique_words": len(set(doc.split())) / len(doc.split()),
            "avg_word_length": np.mean([len(w) for w in doc.split()]),
            "sentence_length": np.mean([len(s.split()) for s in doc.split('.')]),
            "capital_ratio": sum(1 for c in doc if c.isupper()) / len(doc),
        }


class PerplexityFilter:
    """Use language model perplexity as quality signal."""

    def __init__(self, reference_model):
        self.model = reference_model
        # Calibrate on known-quality data
        self.low_threshold, self.high_threshold = self.calibrate()

    def filter(self, doc):
        ppl = self.model.perplexity(doc)
        # Very low ppl: too simple/repetitive
        # Very high ppl: gibberish/wrong language
        return self.low_threshold < ppl < self.high_threshold
```

## Domain Mixing

```python
class DomainMixer:
    """Balance data across domains."""

    def __init__(self, target_distribution):
        # e.g., {"web": 0.6, "books": 0.15, "code": 0.15, "wiki": 0.1}
        self.target = target_distribution

    def mix(self, domain_data):
        """Sample from each domain according to target distribution."""
        mixed = []
        total_tokens = sum(len(d) for d in domain_data.values())

        for domain, data in domain_data.items():
            target_tokens = int(total_tokens * self.target[domain])
            sampled = self.sample_tokens(data, target_tokens)
            mixed.extend(sampled)

        return self.shuffle(mixed)

    def optimal_mix(self, eval_tasks):
        """Find mixing ratio that maximizes downstream performance."""
        # Grid search or Bayesian optimization
        best_mix = None
        best_score = 0

        for mix in self.candidate_mixes():
            model = train_small_model(self.mix_data(mix))
            score = evaluate(model, eval_tasks)
            if score > best_score:
                best_score = score
                best_mix = mix

        return best_mix
```

## Data Synthesis

```python
class SyntheticDataGenerator:
    """Generate high-quality training data with LLMs."""

    def __init__(self, teacher_model):
        self.teacher = teacher_model

    def generate_qa_pairs(self, topic, n=1000):
        """Generate question-answer pairs."""
        pairs = []
        for _ in range(n):
            # Generate question
            q = self.teacher.generate(f"Generate a complex question about {topic}:")

            # Generate answer
            a = self.teacher.generate(f"Question: {q}\nProvide a detailed answer:")

            # Self-critique and refine
            critique = self.teacher.generate(
                f"Q: {q}\nA: {a}\nCritique this answer for accuracy and completeness:"
            )

            refined = self.teacher.generate(
                f"Q: {q}\nOriginal answer: {a}\nCritique: {critique}\nImproved answer:"
            )

            pairs.append((q, refined))

        return pairs

    def generate_chain_of_thought(self, problems):
        """Augment problems with reasoning traces."""
        augmented = []
        for problem in problems:
            cot = self.teacher.generate(
                f"Solve step by step:\n{problem}\n\nStep 1:"
            )
            augmented.append(f"{problem}\n\nLet's think step by step:\n{cot}")
        return augmented
```

## Curriculum Design

```python
class CurriculumScheduler:
    """Order training data from easy to hard."""

    def __init__(self, data, difficulty_scorer):
        self.data = data
        self.scorer = difficulty_scorer

    def score_difficulty(self, example):
        """Estimate example difficulty."""
        return self.scorer.score(example)

    def create_curriculum(self, n_stages=4):
        """Sort data by difficulty into stages."""
        scored = [(ex, self.score_difficulty(ex)) for ex in self.data]
        sorted_data = sorted(scored, key=lambda x: x[1])

        stage_size = len(sorted_data) // n_stages
        stages = []
        for i in range(n_stages):
            start = i * stage_size
            end = (i + 1) * stage_size if i < n_stages - 1 else len(sorted_data)
            stages.append([ex for ex, _ in sorted_data[start:end]])

        return stages
```

## Measuring Data Quality

| Metric | Description |
|--------|-------------|
| Perplexity | LM confidence on text (lower = more coherent) |
| Diversity | Unique n-grams, topic coverage |
| Contamination | Overlap with evaluation sets |
| Toxicity | Harmful content ratio |
| Duplication | Exact and near-duplicate rate |
| Domain Coverage | Balance across topics |

## References

- [The RefinedWeb Dataset](https://arxiv.org/abs/2306.01116)
- [Quality vs Quantity in Pre-training](https://arxiv.org/abs/2305.16264)
- [Scaling Data-Constrained Language Models](https://arxiv.org/abs/2305.16264)
- [Textbooks Are All You Need](https://arxiv.org/abs/2306.11644)

---

*Data curation is the unglamorous foundation of great AI—the painstaking work that determines whether a model becomes brilliant or mediocre, regardless of its size.*
