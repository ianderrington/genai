---
title: Tensor Math
description: Research-level linear algebra for deep learning, including the Tensor Programs series on hyperparameter transfer across model width
---

# Tensor Math

Tensor math is linear algebra applied at the scale modern deep learning actually runs at. This page assumes graduate-level familiarity with linear algebra and probability, it's the deepest, most research-facing material on this site, not a starting point. If you're looking for the basics, see [AI and ML Basics](./index.md) instead.

## Foundational reference

- [Tensor Decompositions and Applications](https://www.kolda.net/publication/TensorReview.pdf) (Kolda & Bader): the standard survey of tensor decomposition methods and their applications

## The Tensor Programs series

A line of research (Greg Yang and collaborators) that formalizes how neural network computations behave in the infinite-width limit, with direct practical payoff: it tells you how to transfer hyperparameters tuned on a small model to a much larger one without re-tuning from scratch.

??? abstract "[Tensor Programs I: Wide Feedforward or Recurrent Neural Networks of Any Architecture are Gaussian Processes](https://arxiv.org/pdf/1910.12478.pdf)"

    Shows that the output embeddings of two samples become i.i.d. under random permutations, and generalizes this to tensors via NETSOR, a computation framework with three general mapping types for function variables.

    ```
    NETSOR programs are straight-line programs, where each variable follows one of three types, G, H, or A (such variables are called G-vars, H-vars, and A-vars), and after input variables, new variables can be introduced by one of the rules MatMul, LinComb, Nonlin to be discussed shortly. G and H are vector types and A is a matrix type; intuitively, G-vars should be thought of as vectors that are asymptotically Gaussian, H-vars are images of G-vars by coordinatewise nonlinearities, and A-vars are random matrices with iid Gaussian entries. Each type is annotated by dimensionality information:

    If x is a (vector) variable of type G (or H) and has dimension n, we write x : G(n) (or x : H(n)).
    If A is a (matrix) variable of type A and has size n1 × n2, we write A : A(n1, n2)
    G is a subtype of H, so that x : G(n) implies x : H(n).
    ```

    A G-var is roughly a "pass-through," similar to an activation function.

    Reference implementation: [thegregyang/GP4A on GitHub](https://github.com/thegregyang/GP4A).

    <img width="893" alt="Tensor Programs diagram" loading="lazy" src="https://github.com/ianderrington/genai/assets/76016868/4f06e713-f86f-476c-8dda-01ff9d8cf49f">

??? abstract "[Tensor Programs IVb: Adaptive Optimization in the ∞-Width Limit](https://arxiv.org/pdf/2308.01814.pdf)"

    Shows how to scale hyperparameters when changing the width of a model's feature parameters. Reference implementation: [microsoft/mup](https://github.com/microsoft/mup), which applies the maximal update parametrization (μP) described in the paper.

    <img width="317" alt="muP hyperparameter transfer diagram" loading="lazy" src="https://github.com/ianderrington/genai/assets/76016868/70fca938-0004-4885-a929-d11e06fe6658">

    > "We show that optimal hyperparameters become stable across neural network sizes when we parametrize the model in maximal update parametrization (μP). This can be used to tune extremely large neural networks such as large pretrained transformers, as we have done in our work. More generally, μP reduces the fragility and uncertainty when transitioning from exploration to scaling up, which are not often talked about explicitly in the deep learning literature."
