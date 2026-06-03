---
title: Tensorflow Lite Micro for RT-Thread
summary: A port of the Tensorflow Lite Micro inference framework for the RT-Thread
  real-time operating system. It enables the deployment of deep learning models on
  resource-constrained embedded systems, featuring optimizations for ARM Cortex-M
  cores via CMSIS-NN and support for multiple hardware platforms including STM32 and
  Raspberry Pi.
slug: tensorflow-lite-micro-for-rt-thread
codeUrl: https://github.com/QingChuanWS/TensorflowLiteMicro
siteUrl: https://github.com/QingChuanWS
star: 22
version: 1.0.2
lastUpdated: '2021-01-29'
rtos: rt-thread
libraries:
- tensorflow-micro
topics:
- audio
- cmsis-nn
- deep-learning
- gcc-arm
- rt-thread
- stm32f4
- tensorflow
- tensorflow-lite
- tensorflow-lite-micro
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- edgeai-utensor-embedded-rtos-for-arm-processors
- pruning-deep-learning-models-for-arm-cortex-m
- stm32n6-getting-started-for-audio-ai
- micro-ros-for-rt-thread
- speech-recognition-on-stm32-using-machine-learning
- magic-wand-on-mbed
---

## Introduction to Tensorflow Lite Micro on RT-Thread

The Tensorflow Lite Micro (TFLu) package is a specialized port of Google's lightweight deep learning inference framework, specifically tailored for the RT-Thread real-time operating system. This project addresses the challenges of deploying sophisticated machine learning models on embedded systems where resources like RAM, flash memory, and power consumption are strictly limited.

By integrating TFLu into the RT-Thread ecosystem, developers can leverage a familiar environment to run neural network inference on microcontrollers and low-power SoCs. The package is designed to be modular, allowing users to choose between generic portable implementations and hardware-accelerated kernels.

## Supported Hardware Platforms

The project targets several popular embedded platforms, providing optimized paths for different architectures:

- **ART-Pi (STM32H750)**: A high-performance 32-bit ARM Cortex-M7 platform.
- **Raspberry Pi 4**: Utilizing the Cortex-A72 core (64-bit) for more demanding inference tasks.
- **Nucleo-STM32L496**: A power-efficient ARM Cortex-M4 target.
- **Kendryte K210**: A RISC-V based SoC with hardware AI acceleration capabilities.

## Key Features and Optimization Paths

One of the most significant features of this port is the ability to choose the operation type based on the target hardware. Through the RT-Thread configuration tool (`menuconfig`), developers can select between two primary operation modes:

### Reference Operations
These are the standard TFLu operators. They are written in platform-independent C++ and offer maximum portability. While they can run on almost any hardware supported by RT-Thread, they do not utilize hardware-specific acceleration and are generally slower.

### CMSIS-NN Operations
For ARM Cortex-M4 and Cortex-M7 devices, the package supports CMSIS-NN. This library leverages DSP and FPU hardware components to significantly accelerate neural network computations. This is particularly effective for convolutional layers and depthwise convolutions commonly found in vision and audio models.

## Resource Requirements and Usage

Tensorflow Lite Micro is designed to be lean. The framework itself occupies approximately 16KB of RAM at runtime. When running the provided official audio recognition example, the total memory footprint is roughly 22KB. This makes it suitable even for MCUs with limited internal SRAM.

To get started, users can enable the package via the RT-Thread online package manager:

```
RT-Thread online packages
    miscellaneous packages --->
        [*] Tensorflow Lite Micro: a lightweight deep learning end-test inference framework
```

Once enabled, developers can configure the specific version, select official examples (such as the audio recognition demo), and choose the optimization level (Reference vs. CMSIS-NN). For those using the audio example, the project includes a ready-to-use `audio_main.cc` that can be integrated directly into an RT-Thread application directory.

## Documentation and Community

The repository provides comprehensive documentation, including an API manual and a user guide. These documents detail the supported operators and the step-by-step process for deploying a trained model onto an RT-Thread target. The project is maintained under the LGPLv2.1 license, encouraging community contribution and integration into both open-source and commercial RT-Thread projects.
