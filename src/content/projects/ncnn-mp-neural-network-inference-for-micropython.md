---
title: 'ncnn_mp: Neural Network Inference for MicroPython'
summary: An external C module that integrates Tencent's ncnn high-performance neural
  network inference framework into MicroPython. It enables object-oriented AI model
  execution on resource-constrained microcontrollers such as ESP32 and STM32, providing
  a Pythonic interface for embedded AI.
slug: ncnn-mp-neural-network-inference-for-micropython
codeUrl: https://github.com/Willaaaaaaa/ncnn_mp
star: 13
lastUpdated: '2025-12-07'
rtos: freertos
libraries:
- micropython
topics:
- micropython
- ncnn
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- micromlp
- tensorflow-lite-micro-for-rt-thread
- noodle-neural-network-inference-engine
- esp-dl-micropython-binding
- sparkfun-micropython-opencv
- pikapython
---

# ncnn_mp: Bringing High-Performance AI to MicroPython

The ncnn_mp project is a specialized bridge that brings Tencent's ncnn, a high-performance neural network inference framework, to the MicroPython ecosystem. While ncnn is widely recognized in the mobile and desktop AI space for its efficiency, ncnn_mp focuses on making these capabilities accessible to developers working with resource-constrained microcontrollers (MCUs) like the ESP32-S3 and STM32.

## Bridging the Gap Between AI and Microcontrollers

Running neural networks on microcontrollers typically involves significant complexity, often requiring developers to work with low-level C APIs and manual memory management. ncnn_mp simplifies this by providing a Pythonic, object-oriented interface. It wraps the ncnn C API, allowing developers to load models, manipulate tensors, and run inference using familiar Python syntax while maintaining the underlying performance of the ncnn framework.

The project transforms standard ncnn C-style handles into intuitive Python objects. Key classes available in the module include:
- **Net**: The core class for loading and running neural network models.
- **Extractor**: Used to perform inference and retrieve results from specific layers.
- **Mat**: Represents the multi-dimensional arrays (tensors) used for input and output.
- **Allocator & Option**: Provide control over memory allocation strategies and framework configuration.

## Optimized for Embedded Environments

Unlike standard Python bindings for ncnn, ncnn_mp is specifically designed for the constraints of embedded systems. It utilizes a wrapper around the ncnn C API rather than the more resource-heavy C++ interface where possible, making it ideal for devices with limited RAM and processing power. 

To enhance the developer experience, the project includes a `.pyi` stub file. This enables modern IDEs to provide full autocompletion, type hints, and inline documentation, which is often a challenge when working with external C modules in MicroPython.

## Hardware Support and Integration

ncnn_mp is designed to be cross-platform within the MicroPython ecosystem. It currently provides detailed build instructions and examples for:
- **Unix Port**: For testing and development on Linux environments.
- **ESP32-S3**: Leveraging the ESP-IDF toolchain and FreeRTOS-based environment.
- **FireBeetle 2 ESP32-P4**: Demonstrated through community tutorials for tasks like MNIST and SqueezeNet image classification.

The integration process involves building ncnn as a library using a cross-compilation toolchain (like the one provided for ESP32-S3) and then compiling MicroPython with the ncnn_mp module included as a user C module.

## Getting Started with ncnn_mp

Developers can get started by cloning the repository and its submodules (ncnn and MicroPython). The workflow typically involves building the ncnn library for the target architecture first, followed by the MicroPython firmware. Once flashed, running a model is as simple as:

```python
import ncnn

# Initialize the network
net = ncnn.Net()
net.load_param("model.param")
net.load_model("model.bin")

# Prepare input data
in_mat = ncnn.Mat(227, 227, 3)
# ... fill mat with data ...

# Run inference
ex = net.create_extractor()
ex.input("data", in_mat)
out_mat = ncnn.Mat()
ex.extract("output", out_mat)
```

By combining the ease of MicroPython with the power of ncnn, ncnn_mp opens up new possibilities for edge AI, enabling sophisticated machine learning tasks to run directly on low-power embedded hardware.
