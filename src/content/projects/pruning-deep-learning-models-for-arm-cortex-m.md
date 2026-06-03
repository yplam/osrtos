---
title: Pruning Deep Learning Models for ARM Cortex-M
summary: A framework for optimizing deep learning models through convolutional and
  fully-connected layer pruning, specifically designed for deployment on ARM Cortex-M
  microcontrollers. It leverages the CMSIS library and Mbed OS to achieve significant
  reductions in inference time on hardware like the NuMaker-PFM-M487 board.
slug: pruning-deep-learning-models-for-arm-cortex-m
codeUrl: https://github.com/mshirw/Pruning-model-for-ARM-CortexM
star: 8
lastUpdated: '2024-05-01'
rtos: mbed-os
topics:
- cmsis-nn
- mbed-os
- pruning
- pytorch
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- tensorflow-lite-micro-for-rt-thread
- edgeai-utensor-embedded-rtos-for-arm-processors
- torch2cmsis
- keras-to-cmsis-nn-converter
- deeploy-dnn-compiler-for-heterogeneous-socs
- ncnn-mp-neural-network-inference-for-micropython
---

## Overview

Deploying deep learning models on resource-constrained microcontrollers (MCUs) requires a delicate balance between model size, inference speed, and accuracy. This project addresses these challenges by integrating advanced model pruning methods and porting the optimized results to ARM Cortex-M hardware. By utilizing the CMSIS library and Mbed OS, the project demonstrates how to significantly reduce the computational footprint of popular architectures like LeNet, AlexNet, and VGG.

## Pruning Techniques

The project implements two primary pruning strategies based on established research:
- **Convolutional Layer Pruning**: Focuses on reducing the number of filters in convolutional layers to decrease the number of operations required for feature extraction.
- **Fully-Connected Layer Pruning**: Targets the dense layers of the network, removing redundant connections to minimize memory usage and parameter count.

These methods allow developers to strip away unnecessary weights from a pre-trained model while maintaining a high level of performance, which is critical for the limited SRAM and Flash memory found on ARM Cortex-M devices.

## System Workflow

The optimization pipeline follows a structured flow from high-level training to low-level embedded deployment:

1.  **Training and Pruning**: Models are trained and pruned using PyTorch. The `pruning.py` script allows users to specify datasets (MNIST or CIFAR10), model architectures, and pruning sensitivity.
2.  **Quantization**: After pruning, the model undergoes weight quantization to convert floating-point parameters into fixed-point integers, which are much more efficient for MCU execution.
3.  **Code Generation**: The `inference_alexnet.py` (and similar scripts for other models) generates a `cortexm_weight.h` header file. This file contains the quantized weights and biases formatted for use with the CMSIS-NN library.
4.  **Hardware Deployment**: The generated code is integrated into an Mbed OS project and deployed to the NuMaker-PFM-M487 development board for real-time inference.

## Technical Implementation

The core logic is handled by several Python scripts that manage the transition from PyTorch tensors to C-style arrays. For example, the training and pruning process can be initiated with a single command:

```python
python pruning.py --dataset cifar10 --model alexnet-light --lr 0.001 --epochs 80 --retrain-epochs 80 --prune-layers conv1 conv2 conv3 conv4 --prune-channels 0 0 10 10 --sensitivity 0.8
```

Once the model is pruned and retrained, the quantization script prepares the weights for the ARM CMSIS library:

```python
python inference_alexnet.py
```

## Performance Results

The project provides empirical data on the effectiveness of these optimizations. Testing on the NuMaker-PFM-M487 board showed measurable improvements in inference latency:

- **LeNet-Light (MNIST)**: Reduced inference time from 30ms to 22ms with a minimal accuracy drop (99.11% to 98.55%).
- **AlexNet-Light (CIFAR10)**: Reduced inference time from 20ms to 14ms.
- **VGG-Light (CIFAR10)**: Reduced inference time from 47ms to 32ms.

These results highlight the project's ability to make complex neural networks viable for real-time applications on low-power embedded systems.
