---
title: uTensor Code Generator (utensor_cgen)
summary: A Python-based CLI tool and library designed to convert machine learning
  models into optimized C++ source code for the uTensor runtime. It provides advanced
  graph transformation capabilities, including node fusion and offline tensor memory
  allocation, specifically tailored for resource-constrained microcontrollers.
slug: utensor-code-generator-utensor-cgen
codeUrl: https://github.com/uTensor/utensor_cgen
siteUrl: https://utensor-cgen.readthedocs.io/en/latest/
star: 54
version: remove-legacy
lastUpdated: '2025-12-13'
rtos: ''
libraries:
- utensor
topics:
- deep-learning
- edge-computing
- embedded
- iot
- microcontroller
- python
- utensor
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- keras-to-cmsis-nn-converter
- torch2cmsis
- ncnn-mp-neural-network-inference-for-micropython
- deeploy-dnn-compiler-for-heterogeneous-socs
- stm32-bare-metal-code-generator
- atome-lm
---

## Overview

uTensor is an ultra-lightweight AI inference engine built for microcontrollers. To bridge the gap between high-level machine learning frameworks and the resource-constrained world of embedded systems, the project provides `utensor_cgen`. This tool acts as a specialized compiler that transforms trained models—primarily from TensorFlow and Keras—into efficient C++ code that can run directly on bare-metal hardware or embedded operating systems.

By converting models into static C++ source files and headers, `utensor_cgen` eliminates the need for heavy runtime interpreters on the target device. This approach significantly reduces the memory footprint and increases execution speed, making it possible to run neural networks on devices with only a few kilobytes of RAM.

## Key Features & Capabilities

### The utensor-cli
At the heart of the project is `utensor-cli`, a command-line interface that simplifies the model deployment workflow. Developers can use the CLI to inspect model files (such as TensorFlow `.pb` files), visualize graph nodes, and execute the conversion process. The tool is highly configurable via TOML files, allowing users to define target-specific parameters for the generated code.

### Subgraph Isomorphic Matcher
One of the most powerful features of `utensor_cgen` is its ability to perform isomorphic subgraph matching. This allows the generator to identify specific patterns within a neural network graph—such as a convolution followed by a ReLU and a MaxPool—and replace them with a single, optimized "fused" operation. This node fusion reduces the overhead of intermediate tensor allocations and speeds up inference.

### Offline Tensor Memory Allocation
Memory management is a critical challenge in embedded AI. `utensor_cgen` addresses this through an offline tensor memory allocation planner. Instead of allocating memory dynamically during runtime, the tool analyzes the graph's topological sort and plans the memory address offsets for every tensor at compile time. This ensures that memory is reused as soon as a tensor is no longer needed, minimizing the total RAM required for model execution.

## Technical Implementation

The generator is written in Python and leverages several modern technologies to ensure flexibility and performance:
- **Jinja2**: Used for templating the generated C++ and HPP files.
- **Graph Transformation**: Includes transformers for dropout removal, identity operation stripping, and reference counting.
- **Framework Support**: While it has deep roots in TensorFlow, it also supports ONNX and Keras, providing a path for models trained in PyTorch or other frameworks to reach embedded targets.

## Getting Started

The typical workflow involves three main steps: inspection, configuration, and conversion. 

First, you can inspect a model to identify output nodes:
```console
$ utensor-cli show model.pb --oneline
```

Next, you generate a configuration file for your specific target:
```console
$ utensor-cli generate-config --target utensor -o myconfig.toml
```

Finally, you convert the model into C++ source code:
```console
$ utensor-cli convert model.pb --output-nodes=pred --config=myconfig.toml
```

The resulting files include the model logic and the constant weights, which can then be compiled alongside the uTensor runtime and your application code. This workflow enables rapid iteration from training in a high-level environment to deployment on an MCU.
