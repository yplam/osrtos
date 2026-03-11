---
title: MaixPy (v4)
summary: A Python SDK for edge AI vision and audio applications targeting Sipeed's
  MaixCAM and MaixCAM2 hardware. It provides high-level APIs for NPU-accelerated AI
  models, image processing, and peripheral control on RISC-V and ARM-based embedded
  systems.
slug: maixpy-v4
codeUrl: https://github.com/sipeed/MaixPy
siteUrl: https://wiki.sipeed.com/maixpy/
star: 637
version: v4.10.3
lastUpdated: '2025-12-30'
rtos: rt-thread
topics:
- ai
- ai-vision
- edge-ai
- embedded
- maixcam
- maixcam-pro
- maixcam2
- maixpy
- monitor
isShow: true
image: /202512/maixpy.webp
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
---

## Overview

MaixPy (v4) is a powerful development framework designed to simplify the deployment of AI vision and audio projects on edge devices. Developed by Sipeed, it combines the ease of Python 3 programming with high-performance hardware acceleration. Unlike previous versions that relied on MicroPython, MaixPy v4 leverages standard Python 3, allowing developers to use familiar libraries like OpenCV and NumPy while maintaining the low-latency performance required for embedded AI applications.

## Key Features and Capabilities

MaixPy is built to bridge the gap between complex AI model development and embedded hardware deployment. It offers a comprehensive ecosystem that includes:

- **AI Vision Algorithms**: Built-in support for object detection (YOLOv5, YOLOv8, YOLO11), image classification (MobileNet, ResNet), and feature extraction.
- **Advanced AI Support**: Capabilities for Large Language Models (LLM), Visual Language Models (VLM), and audio processing algorithms.
- **Hardware Acceleration**: Deep integration with the Neural Processing Unit (NPU) of target SoCs, achieving high frame rates for complex models.
- **Peripheral Control**: Simple Python APIs for managing hardware interfaces such as UART, I2C, SPI, cameras, and displays.
- **Multi-OS Support**: Designed to run on hybrid environments, including Linux (BuildRoot/Ubuntu) paired with real-time operating systems like RT-Thread (RTT) for low-latency tasks.

## Hardware Platforms

The framework is optimized for Sipeed’s latest generation of hardware:

- **MaixCAM**: Features a 1GHz RISC-V processor for Linux and a 700MHz RISC-V core for RTOS tasks, equipped with a 1Tops NPU.
- **MaixCAM2**: A more powerful platform utilizing dual-core ARM A53 processors (1.2GHz) and a 3.2Tops NPU, capable of running larger models like Qwen or DeepSeek 0.5B/1.5B.

## Concise API Design

One of the primary goals of MaixPy is to enable rapid prototyping. A complete AI vision classifier can be implemented in just a few lines of code:

```python
from maix import camera, display, image, nn

# Initialize the classifier with a pre-trained model
classifier = nn.Classifier(model="/root/models/mobilenetv2.mud")
cam = camera.Camera(classifier.input_width(), classifier.input_height(), classifier.input_format())
disp = display.Display()

while 1:
    img = cam.read()
    res = classifier.classify(img)
    max_idx, max_prob = res[0]
    msg = f"{max_prob:5.2f}: {classifier.labels[max_idx]}"
    img.draw_string(10, 10, msg, image.COLOR_RED)
    disp.show(img)
```

## Development Ecosystem

Beyond the SDK, MaixPy is supported by a robust set of tools:

- **MaixVision**: A dedicated workstation/IDE that simplifies code writing, debugging, and deployment.
- **MaixHub**: An online platform providing free AI training services, allowing users to train and deploy models to MaixCAM devices without requiring expensive local hardware or deep AI expertise.
- **MaixCDK**: A C++ SDK with identical APIs for developers who need to transition from Python prototyping to production-grade C++ deployment.
