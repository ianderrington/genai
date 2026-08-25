---
date: '2026-08-06'
dateModified: '2026-08-06'
categories:
  - Biology
  - Evolution
  - Game Theory
authors: parnian
coverImage: /images/blog/evolutionary-game-theory-ai.png
---

# Evolutionary Game Theory in AI Systems

Evolutionary game theory, developed to explain biological phenomena like cooperation and altruism, provides essential tools for understanding and designing multi-agent AI systems.

## Origins

John Maynard Smith introduced evolutionary game theory in the 1970s to explain animal conflicts. Unlike classical game theory, it doesn't assume rationality—strategies spread based on reproductive success.

## Key Concepts

### Evolutionarily Stable Strategies (ESS)
A strategy that, once dominant, cannot be invaded by mutants. In AI:
- Robust policies against perturbations
- Equilibria in multi-agent systems
- Defense against adversarial attacks

### Replicator Dynamics
Describes how strategy frequencies change over time:
```
dx_i/dt = x_i(f_i - φ)
```
Where f_i is fitness and φ is average fitness.

### The Prisoner's Dilemma
The canonical problem of cooperation:
- Individual incentive to defect
- Collective benefit from cooperation
- How does cooperation evolve?

## Applications in AI

### Cooperative AI
Using evolutionary mechanisms to promote cooperation:
- Direct reciprocity (tit-for-tat)
- Indirect reciprocity (reputation)
- Kin selection (similar agents cooperate)
- Group selection (cooperating groups outcompete)

### Robust Adversarial Training
Viewing adversarial attacks as an evolutionary game:
- Model: defending strategy
- Adversary: attacking strategy
- ESS: robust model

### Population-Based Exploration
Maintaining diverse agent populations that:
- Explore different strategies
- Avoid local optima
- Create curricula for each other

## Insights for GenAI

1. Cooperation doesn't require intelligence—it emerges
2. Stability matters more than optimality
3. Diversity prevents catastrophic failures
4. Evolution finds solutions game theory proves exist

## References

- [The Logic of Animal Conflict (Maynard Smith & Price, 1973) — the founding paper of evolutionary game theory](https://www.nature.com/articles/246015a0)

---

*The games life plays teach us how AI systems can coexist and cooperate.*
