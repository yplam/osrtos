---
title: torch2cmsis
summary: A Python library for converting neural networks developed in PyTorch to the
  CMSIS-NN Legacy API. It automates the generation of C header files containing weights
  and parameters, enabling the deployment of quantized models onto ARM Cortex-M microcontrollers.
slug: torch2cmsis
codeUrl: https://github.com/BCJuan/torch2cmsis
star: 29
version: v_0.1
lastUpdated: '2021-01-05'
rtos: cmsis
topics:
- cmsis
- embedded
- neural-networks
- pytorch
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- keras-to-cmsis-nn-converter
- pruning-deep-learning-models-for-arm-cortex-m
- utensor-code-generator-utensor-cgen
- cmsis-parser
- ncnn-mp-neural-network-inference-for-micropython
- stm32-bare-metal-code-generator
---

## Bridging PyTorch and CMSIS-NN

torch2cmsis is a specialized tool designed to bridge the gap between high-level deep learning development in PyTorch and low-level deployment on ARM Cortex-M microcontrollers. By targeting the CMSIS-NN Legacy API, the library allows developers to take models trained in a modern Python environment and export them into a format that can be compiled directly into embedded firmware.

The core philosophy of the project is simplicity: build your network in PyTorch, apply the converter, and receive the necessary C header files containing all weights and parameters required for inference on the target hardware.

## Core Functionality and Workflow

The conversion process is managed through the `CMSISConverter` class. The typical workflow involves three primary steps:

1.  **Model Definition**: Create and train your neural network using standard PyTorch components.
2.  **Conversion**: Run the `convert_model()` method, which processes the PyTorch graph and generates header files for weights and parameters.
3.  **Verification**: The library provides built-in utilities to ensure the converted model behaves as expected. The `evaluate_cmsis` function checks the accuracy of the generated C code against a test dataloader, while `sample_inference_checker` allows developers to compare activations between PyTorch and CMSIS layer-by-layer to ensure parity.

## Technical Features and Support

torch2cmsis currently focuses on the q7 quantization scheme, which is essential for running efficient inference on resource-constrained microcontrollers. The library supports a variety of common neural network layers, including:

*   **Convolutional Layers**: Conv2d
*   **Linear Layers**: Fully connected layers
*   **Pooling**: Both MaxPool2d and AvgPool2d

The project also includes a support matrix for ongoing development, with plans to expand into q15 quantization, depthwise convolutions, and more complex operations like element-wise addition and product.

## Implementation Caveats

As the project is currently in an active development phase, there are several architectural requirements for PyTorch models to be compatible with the converter:

*   **Flat Architecture**: Models should avoid containers like `nn.Sequential` or `nn.ModuleList`. The converter uses `named_children` to inspect the graph, and nested containers can sometimes obscure the layer hierarchy.
*   **Interface Naming**: The first fully connected layer following the convolutional layers must be named `self.interface`. This helps the converter identify the transition point between feature extraction and classification.
*   **Data Handling**: Dataloaders must return simple (input, label) tuples to facilitate the internal evaluation of the network during the quantization refinement process.

## Getting Started

For developers looking to integrate this into their pipeline, the repository includes a comprehensive MNIST example. This example demonstrates how to obtain quantized weights, generate the necessary C headers, and perform basic logging to manually verify that activations on the embedded target match the original PyTorch model. The library can be installed easily via pip, making it a lightweight addition to existing machine learning workflows.
