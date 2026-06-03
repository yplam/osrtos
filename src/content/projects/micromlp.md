---
title: MicroMLP
summary: A lightweight multilayer perceptron neural network library specifically designed
  for MicroPython environments on ESP32 and Pycom modules. It provides a single-file
  implementation of artificial neural networks with support for multiple activation
  functions, supervised learning, and Q-Learning for reinforcement learning tasks.
slug: micromlp
codeUrl: https://github.com/jczic/MicroMLP
siteUrl: https://www.hc2.fr
star: 193
lastUpdated: '2020-12-23'
rtos: ''
libraries:
- micropython
topics:
- ai
- ann
- artificial-intelligence
- deep-learning
- deeplearning
- esp32
- hc2
- lopy
- machine-learning
- micropython
- mlp
- multilayer-perceptron
- neural-network
- neurons
- predictive-modeling
- pycom
- q-learning
- qlearning
- wipy
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- ncnn-mp-neural-network-inference-for-micropython
- esp-dl-micropython-binding
- esp32-ai-connect
- espai-unified-ai-api-client-for-esp32
- embedmcp-embedded-mcp-server-library
- pycopy-standard-library-pycopy-lib
---

## Overview

MicroMLP is a compact and efficient implementation of a multilayer perceptron (MLP) artificial neural network, specifically optimized for MicroPython-based microcontrollers like the ESP32 and Pycom modules. Designed with the "Keep It Simple, Stupid" (KISS) principle in mind, the entire library is contained within a single file, `microMLP.py`, making it exceptionally easy to integrate into resource-constrained embedded projects.

The library allows developers to implement deep learning capabilities directly on the edge for tasks such as signal processing, pattern recognition, robotics control, and complex function approximation. By operating natively in MicroPython, it bridges the gap between high-level AI concepts and low-level embedded hardware.

## Key Features and Capabilities

MicroMLP offers a robust set of features for building and training neural networks on microcontrollers:

- **Flexible Architecture**: Supports modifiable multilayer structures and custom connection patterns between neurons.
- **Integrated Bias and Plasticity**: Neurons include integrated bias, and the system supports connection plasticity to enhance learning dynamics.
- **Multiple Activation Functions**: Includes built-in support for Heaviside binary step, Logistic (Sigmoid), Hyperbolic Tangent (TanH), SoftPlus, ReLU (Rectified Linear Unit), and Gaussian functions.
- **Advanced Learning Algorithms**: Beyond standard supervised learning with backpropagation, MicroMLP includes Q-Learning functions for reinforcement learning applications.
- **Data Management**: Built-in mechanisms for managing sets of examples and automated learning loops with Mean Absolute Error (MAE) tracking.
- **Model Persistence**: Full support for saving and loading the entire network structure and weights to/from JSON files, allowing models to be trained on one device and deployed on another.

## Technical Implementation

The library is written in pure MicroPython, utilizing the `math` module for calculations and the `json` module for model serialization. It is designed to be hardware-agnostic within the MicroPython ecosystem, though it specifically targets the ESP32 and Pycom hardware. For randomness—essential for weight initialization—it attempts to use the hardware random number generator (`machine.rng`) when available, falling back to the standard `random` module otherwise.

A unique aspect of MicroMLP is the `NNValue` class, which provides a standardized way to handle various input types. It can scale values from percentages, bytes, booleans, or analog signals into the normalized range required by the neural network, simplifying the interface between physical sensors and the AI model.

## Getting Started: The XOR Problem

One of the classic benchmarks for a neural network is solving the XOR (Exclusive Or) problem, which requires a non-linear hidden layer. The following example demonstrates how to create, train, and test a network using MicroMLP:

```python
from microMLP import MicroMLP

# Create a network with 2 inputs, 2 hidden neurons, and 1 output
mlp = MicroMLP.Create( neuronsByLayers           = [2, 2, 1],
                       activationFuncName        = MicroMLP.ACTFUNC_TANH,
                       layersAutoConnectFunction = MicroMLP.LayersFullConnect )

# Define boolean inputs using the NNValue helper
nnFalse  = MicroMLP.NNValue.FromBool(False)
nnTrue   = MicroMLP.NNValue.FromBool(True)

# Add training examples
mlp.AddExample( [nnFalse, nnFalse], [nnFalse] )
mlp.AddExample( [nnFalse, nnTrue ], [nnTrue ] )
mlp.AddExample( [nnTrue , nnTrue ], [nnFalse] )
mlp.AddExample( [nnTrue , nnFalse], [nnTrue ] )

# Execute the learning process
learnCount = mlp.LearnExamples()

# Predict and print results
print("False xor True  = %s" % mlp.Predict([nnFalse, nnTrue] )[0].AsBool)
```

## Reinforcement Learning with Q-Learning

MicroMLP stands out by offering integrated Q-Learning capabilities. This allows the neural network to act as a function approximator for a Q-table, enabling embedded agents to learn optimal behaviors through interaction with their environment. Functions like `QLearningLearnForChosenAction` and `QLearningPredictBestActionIndex` provide the necessary primitives to implement reinforcement learning loops for robotics and autonomous systems directly on the MCU.
