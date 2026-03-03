---
title: MaixPy
summary: MaixPy (v4) is a high-level Python SDK designed for rapid deployment of AI
  vision and audio applications on edge computing hardware. It provides a simplified
  Python interface to the MaixCDK C++ framework, enabling hardware-accelerated NPU
  inference, multimedia processing, and peripheral control on RISC-V and ARM-based
  edge devices.
slug: sipeed-maixpy
codeUrl: https://github.com/sipeed/MaixPy
star: 686
version: v4.12.4
lastUpdated: '2026-02-02'
licenses:
- Apache-2.0
libraryType: MachineLearning
createdAt: '2025-12-30'
updatedAt: '2026-03-03'
---

### Features


- High-level Python 3 API for rapid prototyping of AI vision and audio projects.

- Integrated support for NPU-accelerated AI models including YOLOv5, YOLOv8, YOLO11, and MobileNet.

- Support for Large Language Models (LLM) and Vision Language Models (VLM) on edge devices.

- Unified API across Python and C++ (MaixCDK) for seamless transition from prototype to production.

- Hardware-accelerated video encoding and decoding (H.264/H.265/JPEG) up to 4K resolution.

- Comprehensive peripheral control for UART, I2C, SPI, and GPIO via standard Python modules.

- Built-in image processing algorithms compatible with OpenMV and OpenCV standards.

- Native support for multiple hardware platforms including MaixCAM, MaixCAM-Pro, and MaixCAM2.

- Dual-OS architecture support, running on Linux (Buildroot/Ubuntu) alongside real-time subsystems (RTOS/RTT).

- Integration with MaixHub for one-click online AI model training and deployment.

- MaixVision IDE support for visual debugging and code management.

- High-performance NPU utilization reaching up to 3.2 Tops@INT8 on supported hardware.

- Support for WiFi 6 and Bluetooth Low Energy (BLE 5.4) connectivity.

- Automated API documentation and stub generation using pybind11-stubgen.

- Extensible component-based architecture allowing for custom C++ module integration.



MaixPy v4 is built as a multi-layered ecosystem that bridges high-level scripting with low-level hardware acceleration. At its core, the library acts as a Python wrapper for **MaixCDK** (C++ Development Kit), utilizing `pybind11` to expose high-performance C++ components to the Python environment. This design allows developers to leverage the ease of Python for application logic while maintaining the execution speed of C++ for compute-intensive tasks like NPU inference and image processing.

The system architecture is designed to be cross-platform, supporting various backends including Linux (Buildroot or Ubuntu) and real-time operating systems (RTOS/RTT). It employs a component-based structure where modules for camera input, display output, neural network inference (NN), and hardware peripherals are decoupled, allowing for flexible project configurations.

**Core Components:**
- **Maix Module**: The primary Python namespace containing sub-modules for `camera`, `display`, `image`, `nn`, and `uart`.
- **MaixCDK**: The underlying C++ SDK providing the implementation for hardware abstraction and NPU drivers.
- **NPU Accelerator**: Specialized logic for executing quantized INT8 models (YOLO, ResNet, etc.) with hardware acceleration.
- **Multimedia Pipeline**: Handles high-speed video streaming, encoding (H.264/H.265), and decoding.

### Use Cases
This library is ideal for:
- **Edge AI Deployment**: Rapidly deploying object detection, image classification, or face recognition models to low-power embedded devices using Python.
- **STEM Education**: Teaching AI and robotics concepts through an accessible Python API that abstracts complex hardware and driver interactions.
- **Industrial Quality Assurance**: Building automated visual inspection systems for production lines that require real-time processing and peripheral control (e.g., triggering actuators via UART/GPIO).
- **Smart IoT Devices**: Developing connected devices that require vision-based intelligence, such as smart security cameras or interactive kiosks with LLM capabilities.

### Getting Started
To begin developing with MaixPy, it is recommended to use a supported hardware platform like **MaixCAM**. Developers can install the `maixpy` package via `pip` on compatible Linux environments or use the pre-installed firmware on Sipeed hardware. For those wishing to build from source, the process involves setting up the **MaixCDK** environment variable (`MAIXCDK_PATH`) and running the `project.py` build script. Detailed documentation, including API references and quick-start tutorials, is available at the official Sipeed Wiki. For a visual development experience, the **MaixVision IDE** provides a workstation-like environment for coding and real-time debugging.
