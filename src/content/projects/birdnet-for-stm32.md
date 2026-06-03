---
title: BirdNET for STM32
summary: A specialized framework for training and deploying BirdNET audio classification
  models on the STM32N6570-DK development board. It provides a complete pipeline from
  dataset preparation and TensorFlow training to optimized NPU deployment using STMicroelectronics'
  X-CUBE-AI tools.
slug: birdnet-for-stm32
codeUrl: https://github.com/birdnet-team/birdnet-stm32
siteUrl: https://stm32ai-cs.st.com/assets/embedded-docs/stneuralart_getting_started.html
star: 10
lastUpdated: '2025-12-12'
rtos: ''
libraries:
- tensorflow-micro
topics:
- audio
- bioacoustics
- birdnet
- birds
- classification
- edge-ai
- stm32
- stm32n6
- tinyml
isShow: true
image: /202602/birdnet.webp
createdAt: '2026-02-03'
updatedAt: '2026-02-03'
relatedProjects:
- stm32n6-getting-started-for-audio-ai
- esp32-rtsp-mic-for-birdnet-go
- stm32-ai-model-zoo-services
- tensorflow-lite-micro-for-rt-thread
- image-classification-getting-started-for-stm32n6
- speech-recognition-on-stm32-using-machine-learning
---

## Overview

BirdNET-STM32 is a comprehensive project designed to bring advanced bioacoustic monitoring to edge devices. It focuses on the deployment of the BirdNET audio classification model onto the STM32N6570-DK development board, leveraging the high-performance capabilities of the STM32N6 series and its integrated Neural Processing Unit (NPU). The repository provides a full-stack workflow, covering dataset preparation, model training in TensorFlow, quantization, and final deployment using the ST Edge AI ecosystem.

## Hardware and Performance

The primary target for this project is the STM32N6570-DK, a development platform featuring the STM32N6 microcontroller. This chip is particularly well-suited for audio AI tasks due to its dedicated NPU, which significantly accelerates deep learning inference. 

According to the project documentation, a pre-trained model optimized for this platform can perform inference on a single audio chunk in approximately 3.3 ms. This performance is roughly 900 times faster than real-time, allowing for extremely low power consumption or the ability to process multiple audio streams simultaneously.

## Technical Architecture

The project utilizes a Depthwise Separable Convolutional Neural Network (DS-CNN) architecture. One of the unique aspects of this implementation is the flexible audio frontend, which supports several modes:

- **Precomputed/Librosa**: Mel spectrograms computed offline.
- **Hybrid**: Linear magnitude spectrograms provided to the model, which then applies fixed mel scaling.
- **Raw/TF**: Raw audio provided directly to the model, with a TensorFlow-based frontend producing features internally.

This flexibility allows developers to balance the computational load between the MCU's general-purpose cores and the NPU.

## Deployment Pipeline

The deployment process is integrated with STMicroelectronics' X-CUBE-AI framework. The workflow follows these critical steps:

1.  **Training**: Using `train.py`, users can train custom models on subsets of the iNatSounds dataset or their own recordings.
2.  **Conversion**: The `convert.py` script transforms Keras models into quantized TFLite models using Post-Training Quantization (PTQ).
3.  **ST Edge AI Generation**: The `stedgeai` CLI tool converts the TFLite model into optimized C code specifically tailored for the STM32N6 NPU.
4.  **On-Device Validation**: The project includes scripts to validate the model's performance directly on the target hardware, comparing on-device output against reference Keras results to ensure numerical accuracy.

## Getting Started

The repository includes a pre-trained model (`birdnet_stm32n6_100.tflite`) trained on 100 common bird species. To deploy a custom model, users need to set up a Python 3.12 environment and install the dependencies listed in `requirements.txt`, which include TensorFlow and Librosa. The deployment phase requires the STM32Cube.AI CLI, STM32CubeProgrammer, and the ARM GNU toolchain.

For developers looking to build a full application, the project outlines a demo structure involving real-time audio capture via on-board microphones, FFT accumulation in a ring buffer, and periodic inference to log top-5 predictions to a serial console.
