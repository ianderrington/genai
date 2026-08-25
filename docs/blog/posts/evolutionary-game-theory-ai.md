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

## Why "Robust Model = ESS" Doesn't Hold Up

The framing above treats a robust model as an evolutionarily stable strategy: a defense, once dominant, that resists invasion by an attacking mutant. In practice, adversarial defenses have repeatedly failed to behave like real ESS solutions, and it's worth being specific about why.

Athalye, Carlini, and Wagner (2018) examined every adversarial defense accepted to ICLR that year and found that seven of eight relied on what they called obfuscated gradients — the defense looked robust only because it broke the specific attack method being used to test it, not because it was actually hard to fool. Once the authors adapted their attack to the defense, all seven broke. That is the opposite of an ESS: a real evolutionarily stable strategy resists invasion by any mutant strategy, not just the ones tested against it. Most published "robust" models resist only the attacks their authors thought to try.

This is a genuine, unresolved problem, not a solved one dressed up in evolutionary language. A defense that looks stable is usually stable only within the narrow threat model it was evaluated against — change the attack, and the equilibrium collapses. Anyone using this post's ESS framing to reason about model security should treat "robust" as a claim scoped to a specific, stated attack, never as a general property, because the field's own track record shows that gap gets exploited almost every time.

## References

- [The Logic of Animal Conflict (Maynard Smith & Price, 1973) — the founding paper of evolutionary game theory](https://www.nature.com/articles/246015a0)

---

*The games life plays teach us how AI systems can coexist and cooperate.*
