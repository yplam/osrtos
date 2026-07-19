---
title: Noodle Neural Network Inference Engine
summary: Noodle is a lightweight neural network inference engine designed to bring
  machine learning to resource-constrained microcontrollers like the Arduino Uno,
  Mega, and ESP32. By streaming activations and weights from external storage such
  as SD cards or flash memory, Noodle bypasses the typical RAM limitations that often
  prevent low-tier MCUs from running complex models.
slug: noodle-neural-network-inference-engine
codeUrl: https://github.com/auralius/noodle
siteUrl: https://auralius.github.io/noodle/
lastUpdated: '2026-06-19'
licenses:
- MIT
image: /202607/noodle_0.avif
rtos: ''
libraries:
- tensorflow-micro
- tft-espi
topics:
- arduino
- cnn
- embedded-ai
- esp32
- lenet
isShow: true
createdAt: '2026-07-15T05:10:22+00:00'
updatedAt: '2026-07-15T05:10:22+00:00'
relatedProjects:
- ncnn-mp-neural-network-inference-for-micropython
- micromlp
- picolm
- tensorflow-lite-micro-for-rt-thread
- atome-lm
- fashion-mnist-on-esp32-with-tensorflow-lite-micro
---

## Overview

Noodle is a specialized neural network inference engine designed for the most constrained environments in the embedded world. While modern TinyML frameworks often require significant RAM to hold model weights and intermediate tensors, Noodle takes a different approach. It provides a modular set of primitive functions for convolution layers, dense layers, pooling, and activations, with a core architecture designed to stream data to and from external filesystems.

By leveraging storage interfaces like SD cards, FFat, or SD_MMC, Noodle allows developers to overcome the physical RAM limitations of low-tier microcontrollers. This makes it possible to run inference on hardware that would traditionally be considered too underpowered for deep learning, such as the Arduino Uno R3, Uno R4, and Mega 2560, as well as more modern platforms like the ESP32 and Raspberry Pi Pico.

## Solving the RAM Bottleneck

The primary innovation of Noodle is its file streaming support. In a typical inference engine, the activations (the outputs of each layer) must reside in RAM. For deep networks or high-resolution inputs, these tensors can quickly exceed the available memory on a standard MCU. Noodle mitigates this by allowing intermediate activations, weights, and biases to be streamed directly from a filesystem. This "out-of-core" processing style ensures that the memory footprint remains predictable and small, regardless of the model's depth.

## Modular Architecture and Layer Support

Noodle provides the essential building blocks for modern neural networks:
- **Convolution Layers**: Support for standard 2D convolutions.
- **Dense Layers**: Standard fully connected layers.
- **Pooling**: Support for Max and Mean pooling modes.
- **Activations**: Implementation of common activation functions required for non-linear processing.

The library is designed to be highly configurable via build flags. For example, developers can define the pooling mode (`NOODLE_POOL_MEAN` or `NOODLE_POOL_MAX`), set the maximum kernel size (`NOODLE_MAX_K`), or specify the block size for fully connected layers (`NOODLE_FCN_BLOCK`) to tune performance for specific hardware targets.

## Hardware and Framework Integration

Although Noodle is built with the Arduino framework for ease of use and portability, it is primarily developed using Visual Studio Code and PlatformIO. This allows for sophisticated build configurations across a wide variety of architectures:
- **8-bit AVR**: Arduino Uno and Mega 2560.
- **32-bit RISC-V & ARM**: ESP32-S3, ESP32-P4, Renesas-based Uno R4, and the Raspberry Pi Pico (RP2040/RP2350).
- **STM32**: Support for platforms like the STM32 Blue Pill.

In some advanced examples, Noodle is used alongside TensorFlow Lite for Microcontrollers (TFLM), allowing developers to compare performance or use Noodle's unique streaming capabilities for specific layers while utilizing TFLM for others.

## Training and Deployment Workflow

The workflow for Noodle typically begins in a high-level environment like Keras (often using a PyTorch back-end). Once a model is trained, the project provides a utility script, `model_exporter.py`, which exports the weights and biases into a format compatible with Noodle's file-streaming engine. These files are then uploaded to the target device's filesystem (such as an SD card or internal flash via FFat) where the Noodle engine can access them during inference.

## Real-World Applications

The repository includes a diverse range of examples demonstrating Noodle's versatility in the medical and industrial fields:
- **Medical Imaging**: Implementations for Medical MNIST (BloodMNIST and PneumoniaMNIST) and scoliosis-related data processing.
- **Computer Vision**: Deployments of LeNet-5, SqueezeNet, and FireNet (CIFAR-10) on microcontrollers.
- **Anomaly Detection**: Integration with MLPerf Tiny benchmarks for tasks like Visual Wake Words (VWW) and anomaly detection (AD).
- **Signal Processing**: Peak detection and auto-encoder implementations for denoising and data compression.
