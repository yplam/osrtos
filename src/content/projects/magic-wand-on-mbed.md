---
title: Magic Wand on mbed
summary: A port of the TensorFlow Lite Magic Wand gesture recognition example to the
  mbed K66F platform. It utilizes mbed OS and TensorFlow Lite for Microcontrollers
  to perform real-time gesture detection on embedded hardware, covering the full pipeline
  from data collection to deployment.
slug: magic-wand-on-mbed
codeUrl: https://github.com/hankhjliao/magic_wand_mbed
star: 1
lastUpdated: '2023-01-27'
rtos: mbed-os
libraries:
- tensorflow-micro
topics:
- mbed-os
- tensorflow-lite
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- utensor-mnist-handwriting-recognition-demo
- tensorflow-lite-micro-for-rt-thread
- edgeai-utensor-embedded-rtos-for-arm-processors
- speech-recognition-on-stm32-using-machine-learning
- edge-ai-on-embedded-linux-i-mx-8m-plus
- fashion-mnist-on-esp32-with-tensorflow-lite-micro
---

## Overview

The Magic Wand project is a specialized implementation of gesture recognition designed for the mbed K66F (FRDM-K66F) development board. While the original TensorFlow Lite for Microcontrollers example was primarily targeted at Arduino, Himax, and SparkFun Edge platforms, this repository adapts the workflow for the ARM Cortex-M4F based K66F, leveraging the mbed OS ecosystem.

The project demonstrates the end-to-end process of deploying machine learning on the edge, allowing a device to recognize physical gestures—such as drawing shapes in the air—using accelerometer data and a pre-trained neural network.

## Technical Stack

The implementation relies on a specific set of tools and versions to ensure compatibility and performance on the target hardware:

- **mbed OS 5.14.0**: Provides the underlying RTOS and hardware abstraction layer for the K66F.
- **TensorFlow Lite Micro (2.1.0)**: The inference engine used to run the quantized model on the microcontroller.
- **Python 3.7**: Used for the model training and data processing scripts.
- **GNU Screen**: Utilized for serial communication and data monitoring during the collection phase.

## Project Workflow

The repository is organized into three distinct phases, each essential for a successful machine learning deployment on embedded systems:

### Data Collection
Before a model can recognize gestures, it needs data. This phase involves capturing raw accelerometer readings from the K66F. The project includes scripts to stream this data over a serial connection to a host machine, where it is stored for training.

### Model Training
Using the collected data (or provided datasets), the training phase utilizes TensorFlow to create a neural network capable of classifying different motion patterns. This process typically happens on a workstation or in a cloud environment like Google Colab. The resulting model is then converted into a TensorFlow Lite FlatBuffer and subsequently into a C++ byte array for embedded integration.

### Model Deployment
The final phase involves compiling the TensorFlow Lite Micro interpreter along with the gesture model into a binary for the FRDM-K66F. Once flashed, the board processes real-time sensor data through the inference engine to identify gestures locally without needing cloud connectivity.

## Hardware Support

The primary target is the **NXP FRDM-K66F**, a high-performance development platform featuring an ARM Cortex-M4 core with a Floating Point Unit (FPU). This hardware is well-suited for digital signal processing and machine learning tasks due to its 180MHz clock speed and 2MB of Flash memory, which provides ample space for the TensorFlow Lite Micro library and the gesture model weights.
