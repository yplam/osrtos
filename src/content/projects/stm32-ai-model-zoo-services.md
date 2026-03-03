---
title: STM32 AI Model Zoo Services
summary: A comprehensive suite of Python scripts and services designed to facilitate
  the end-to-end integration of AI models onto STM32 microcontrollers and microprocessors.
  It supports PyTorch, TensorFlow, and ONNX frameworks, providing tools for training,
  quantization, benchmarking, and automatic application code generation for various
  computer vision and audio use cases.
slug: stm32-ai-model-zoo-services
codeUrl: https://github.com/STMicroelectronics/stm32ai-modelzoo-services
siteUrl: https://stedgeai-dc.st.com/home
star: 118
version: v4.0.0
lastUpdated: '2026-01-23'
rtos: cmsis
libraries:
- tensorflow-micro
topics:
- ai
- modelzoo
- services
- st
- stm32
- stm32f4
- stm32f7
- stm32h7
- stm32l4
- stm32mp1
- stm32n6
- stm32u5
- stmicro
- stmicroelectronics
isShow: true
image: /202603/stm32ai.webp
createdAt: '2026-03-03'
updatedAt: '2026-03-03'
---

## Bringing AI to the Edge with STM32

The STM32 AI Model Zoo Services repository is a pivotal resource for developers looking to bridge the gap between high-level machine learning frameworks and resource-constrained embedded hardware. STMicroelectronics has created a modular ecosystem that simplifies the complex process of taking a model from a training environment—such as a GPU-powered workstation—to a production-ready STM32 microcontroller (MCU) or microprocessor (MPU).

## A Unified AI Workflow

One of the standout features of this project is its support for a wide array of frameworks. Recently expanded to include comprehensive PyTorch support alongside TensorFlow and ONNX, the Model Zoo Services provide a consistent interface regardless of your preferred AI stack. The workflow is orchestrated through a single entry point: a YAML configuration file. This file allows users to define "chained services" that automate the progression from a floating-point model to a quantized, benchmarked, and deployed application.

## Key Capabilities: BYOM and BYOD

The services are designed around two core philosophies to accommodate different developer needs:
- **Bring Your Own Model (BYOM):** If you have a custom architecture, the services provide scripts to quantize, evaluate, and benchmark it against reference STM32 hardware.
- **Bring Your Own Data (BYOD):** For users who want to leverage ST's optimized reference models, the repository includes scripts for retraining or fine-tuning those models on custom datasets, ensuring high performance without starting from scratch.

## Diverse Use Cases

The repository is organized by application, providing step-by-step guides for a variety of domains:
- **Computer Vision:** Image classification, object detection, face detection, and semantic segmentation.
- **Audio Processing:** Audio event detection and speech enhancement.
- **Sensing:** Human activity recognition and hand posture recognition using Time-of-Flight (ToF) sensors.
- **Industrial:** Arc fault detection for electrical signal analysis.

## Hardware Acceleration and Optimization

The project integrates deeply with **STEdgeAI Core** (formerly STM32Cube.AI), which is the engine that converts neural networks into optimized C code for STM32 devices. It provides performance metrics for both float and quantized models across various targets, including the high-performance STM32H7, the MPU-based STM32MP2, and the specialized STM32N6 series featuring dedicated NPU acceleration.

## Developer-Friendly Ecosystem

To reduce installation and compatibility issues, ST provides a Docker-based setup that includes the full software stack. Furthermore, the services are integrated with the **STEdgeAI Developer Cloud**, allowing developers to benchmark their models on real hardware remotely without needing the physical boards on their desks. For experiment tracking, the project supports **ClearML** and **MLflow**, bringing MLOps best practices to the embedded world.

Whether you are a data scientist looking to see your model run on a microcontroller or an embedded engineer tasked with adding intelligence to a device, the STM32 AI Model Zoo Services provide the necessary scaffolding to make edge AI a reality.
