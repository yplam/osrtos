---
title: MaixPy Scripts
summary: A comprehensive collection of MicroPython scripts for the MaixPy platform,
  targeting Sipeed hardware based on the Kendryte K210 RISC-V SoC. It includes examples
  for machine vision, AI acceleration, hardware peripheral control, and multimedia
  processing.
slug: maixpy-scripts
codeUrl: https://github.com/sipeed/MaixPy_scripts
siteUrl: https://maixpy.sipeed.com
star: 646
version: v0.2.4
lastUpdated: '2024-01-20'
rtos: freertos
libraries:
- micropython
- tensorflow-micro
topics:
- ai
- aiot
- demo
- examples
- k210
- maixpy
- micropython
- scripts
- sipeed
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-examples-for-01studio-development-boards
- maixpy-v4
- micropython-samples-and-drivers
- mbot2-and-cyberpi-programming-examples
- micropython-for-kendryte-k210-lobo-port
- sparkfun-python-examples
---

## Overview

MaixPy_scripts is the official repository of example code and utility scripts for the MaixPy ecosystem. MaixPy is a specialized port of MicroPython designed for the Kendryte K210, a dual-core 64-bit RISC-V SoC that features dedicated hardware acceleration for AI and machine vision tasks. This repository serves as a practical guide for developers to implement edge computing solutions using the Python programming language.

The project provides a bridge between high-level Python scripting and the low-level hardware capabilities of Sipeed's development boards, such as the Maix Bit, Maixduino, and Maix Cube. By abstracting complex C-based SDKs into accessible MicroPython modules, it enables rapid prototyping of AI-powered embedded systems.

## Key Functional Areas

The repository is structured into several specialized directories, each focusing on a different aspect of the MaixPy environment:

### Machine Vision and AI Processing
The `machine_vision` directory is a core component of the project, containing demos for vision-related tasks. These scripts demonstrate how to utilize the K210's KPU (Knowledge Processing Unit) to run neural network models for object detection, face recognition, and image classification. It provides the necessary boilerplate to load `.kmodel` files and process camera streams in real-time.

### Hardware API and Board Configuration
For developers needing to interface with physical components, the `hardware` and `board` directories offer extensive examples. These cover standard embedded protocols and peripherals, including:
- GPIO, PWM, and Timer control
- I2C, SPI, and UART communication
- Hardware-specific configurations for various Sipeed development boards
- Sensor interfacing and driver implementations

### Multimedia and Networking
The platform's capabilities extend beyond AI into general-purpose multimedia. The `multimedia` section includes scripts for audio processing, video playback, and GUI development. Meanwhile, the `network` directory provides examples for connecting to the internet or local networks, facilitating IoT applications that require data transmission to the cloud.

## Technical Implementation

MaixPy scripts run on a firmware base that typically utilizes FreeRTOS as the underlying real-time operating system. This allows the MicroPython interpreter to run alongside hardware-accelerated tasks with predictable timing. The scripts leverage specialized modules like `Maix.KPU` for AI operations and `sensor` for camera management, which are unique to the MaixPy port.

## Getting Started

To utilize these scripts, users must have a compatible Sipeed hardware device flashed with the MaixPy firmware. Scripts can be uploaded and executed using the MaixPy IDE or via serial tools. The repository is designed to be used in conjunction with the official MaixPy documentation, providing a hands-on reference for the APIs described there. 

Whether you are implementing a simple LED blink or a complex real-time face tracking system, these scripts provide the foundational code required to harness the power of RISC-V and AI at the edge.
