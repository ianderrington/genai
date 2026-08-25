---
title: AI and ML Basics
description: What a model actually is, and what "training" and "learning" mean, explained from zero
---

# AI and ML Basics

This page assumes no background. If you already know what a parameter, a training loop, or a neural network is, skip ahead to [Gen()AI](../gen_ai/chronology.md) or the [architectures](../../architectures/index.md) section.

## What a Model Actually Is

A machine learning model is just a function. It takes an input and gives back an output. That's the whole idea. A spam filter takes an email and outputs "spam" or "not spam." A translation model takes an English sentence and outputs a French one. An image generator takes a text description and outputs pixels.

So what makes it a *machine learning* model, instead of an ordinary function a programmer wrote by hand? Where the function comes from. Nobody has ever successfully hand-written rules for "this photo contains a cat" - the visual patterns are too numerous and too subtle for that. Instead, you show the model thousands of examples, photos labeled "cat" or "not cat," and adjust the function until it starts getting those examples right. The function's shape gets discovered from data. Nobody designs it by hand.

## Parameters: The Knobs Being Adjusted

A model has parameters, sometimes called weights, and they're just numbers that control its behavior. A small model might have thousands of them. A large language model has billions. Each parameter starts out close to random.

"Training" a model means nudging every one of those numbers, a little at a time, so the outputs get closer to what you want. That's it. Nothing more mysterious is happening under the hood - training is a search over billions of numbers, guided by a signal that tells you which direction to move each one.

## The Training Loop, Concretely

Here's what actually happens, step by step, when a model trains:

1. **Show it an example.** Feed the model an input it hasn't adjusted for yet - a photo, a sentence, a partial piece of text.
2. **Get its current guess.** With its current parameters, the model produces some output.
3. **Measure how wrong it was.** Compare that output to the correct answer using a *loss function* - one number that's large when the model is way off and small when it's close.
4. **Work out which way to nudge each parameter.** This uses calculus, specifically the chain rule, applied automatically. It's called backpropagation, and it calculates exactly how much each of the billions of parameters contributed to the error, and which direction to move it to reduce that error.
5. **Nudge every parameter a small step in that direction.** This step is gradient descent - the model's parameters move slightly "downhill" toward lower error.
6. **Repeat. Millions or billions of times**, across a huge number of examples.

Each step barely changes the model at all. What makes deep learning work is doing this an enormous number of times, on an enormous number of examples, until all those tiny nudges add up to a function that actually generalizes to things it's never seen.

## What a Neural Network Is

A neural network is one specific way of building the function above. It's organized in layers: an input layer, one or more hidden layers, an output layer. Each layer is made of units - loosely (and only loosely) inspired by biological neurons - that take numbers from the previous layer, multiply them by parameters, add everything up, and pass the result through a simple nonlinear function before handing it to the next layer.

That nonlinearity matters more than it might seem. Without it, stacking layers would be pointless - any number of purely linear layers collapses down to a single linear function, no more powerful than one layer alone. The nonlinearity is what lets a network with enough layers and parameters approximate genuinely complicated functions: the relationship between pixels and "cat," or between a string of words and the most likely next one.

## Where "Generative" Fits In

Everything above describes a model that predicts something: a label, a next word, a class. A generative model uses the same machinery - parameters, training loops, gradient descent - but gets trained to produce new content instead of a single prediction. A full sentence. A full image. A full audio clip. Built piece by piece, or all at once, guided by the patterns it learned from training data.

That's why the [Overview](../index.md) page's diagram puts Generative AI as a subset of AI in general. It's the same underlying training process, just aimed at generation instead of classification or prediction.

## Going Deeper

Once the above feels solid, here's where to go next, roughly in order of how much background they assume:

- [Gen()AI chronology](../gen_ai/chronology.md) - how the field got to today's models
- [Architectures](../../architectures/index.md) - the specific network designs (transformers, diffusion models) built on the ideas above
- [Tensor math](tensor_maths.md) - the linear algebra underneath, at a research-paper level of depth. Fair warning: that page assumes graduate-level familiarity with everything above it.

## Tools for Learning by Building

Practical, code-first resources for building models yourself once the concepts above click:

- [Catalyst](https://github.com/catalyst-team/catalyst) - a framework for boilerplate-minimal ML training on top of PyTorch
- [Lightning + Hydra](https://github.com/ashleve/lightning-hydra-template) - the Lightning training framework with Hydra-based configuration management
- [Lightning Hugging Face adapter](https://github.com/mariomeissner/lightning-hydra-transformers/blob/main/src/architectures/hf_model.py) - connecting Lightning to Hugging Face models
- [AI Canon by a16z](https://a16z.com/2023/05/25/ai-canon/) - a curated reading list for once you're ready for primary sources
- [PlotNeuralNet](https://github.com/HarisIqbal88/PlotNeuralNet) - a tool for visualizing network architecture diagrams, with a [usage writeup](https://pub.towardsai.net/creating-stunning-neural-network-visualizations-with-chatgpt-and-plotneuralnet-adab37589e5)
