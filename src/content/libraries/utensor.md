---
title: uTensor
slug: utensor
summary: uTensor is a lightweight machine learning inference framework optimized for
  Arm Cortex-M microcontrollers, featuring a core runtime of approximately 2KB. It
  utilizes an offline tool to translate TensorFlow models into efficient C++11 code,
  providing deterministic memory usage and high-performance execution through CMSIS-DSP
  integration.
codeUrl: https://github.com/uTensor/uTensor
siteUrl: https://github.com/uTensor/uTensor
star: 1918
version: v0.0.1
lastUpdated: '2024-09-06'
components:
- MachineLearning
- Profiling
platforms:
- ARM
- ARM Cortex-M
- Linux
- Windows
- macOS
- POSIX
libraryType: MachineLearning
createdAt: '2024-09-06'
updatedAt: '2026-04-07'
---

### Features


- Extremely small core runtime footprint of approximately 2KB for resource-constrained environments.

- Offline translation tool that converts TensorFlow models directly into C++11 source code.

- Deterministic RAM usage guaranteed at code generation or compile time.

- Dedicated memory regions for tensor metadata and data to ensure system safety and prevent heap collisions.

- Tensor-agnostic operator design allowing high-performance kernels to fetch data blocks efficiently.

- Support for CMSIS-DSP optimized kernels for accelerated inference on Arm targets.

- Compile-time error checking for mismatched tensor inputs, outputs, and dimensions.

- Lightweight class hierarchy designed to minimize the per-tensor memory overhead.

- High-level C++ tensor interface that mimics higher-level languages while maintaining C++ performance.

- Support for custom operators and extensible error handling modules.

- Integration with Mbed OS as a standard library for rapid deployment.

- Ability to use ROM-resident tensors (RomTensor) to save volatile memory.

- Local circular arena allocators for managing metadata and temporary RAM data without a global heap.

- Trivial GDB debugging support due to clear, human-readable generated code.

- Cross-platform support for local development and testing on Linux, Windows, and macOS.



### Architecture

uTensor follows a decoupled architecture consisting of a minimal core runtime and a set of modular extensions. The core library provides the fundamental interfaces for tensors, operators, and memory management, ensuring that the overhead remains negligible (approx. 2KB). The architecture is designed to be "tensor-agnostic," meaning operators are decoupled from the specific underlying data storage implementation, allowing for high-performance data block fetching.

The framework emphasizes system safety by avoiding shared heaps. Instead, it uses a `Context` object to manage `localCircularArenaAllocator` instances for metadata and data. Tensors act as lightweight handles to data, and operators use a name-binding input/output map to ensure type and shape safety at compile time. This structure ensures that the runtime can guarantee a maximum RAM footprint before the code is even deployed to the target hardware.

#### Core Components
- **Core Runtime**: Minimal engine managing the execution context and interface definitions.
- **Tensor Interface**: Abstract layer for data access, supporting `RomTensor` for static weights and `RamTensor` for intermediate values.
- **Memory Managers**: Arena-based allocators that provide deterministic memory footprints and prevent fragmentation.
- **Operator Library**: Collection of kernels (including CMSIS-DSP optimized versions) for model execution.
- **Offline Toolchain**: Python-based tool for converting TensorFlow graphs into C++11 code.

### Use Cases

This library is ideal for:
- **Edge AI**: Deploying deep learning models on extremely resource-constrained microcontrollers with less than 32KB of RAM.
- **Industrial Sensing**: Real-time signal processing and pattern recognition using CMSIS-DSP optimized kernels on Arm Cortex-M hardware.
- **Battery-Powered Devices**: Minimizing power consumption through low-overhead inference and efficient memory access patterns.
- **Safety-Critical Systems**: Applications requiring guaranteed maximum RAM usage and no dynamic heap allocation to prevent runtime collisions.
- **Rapid Prototyping**: Developers familiar with TensorFlow who need a direct path to C++ deployment on Mbed OS or other Arm-based platforms.

### Getting Started

To get started with uTensor, developers typically follow a workflow that begins with training a model in TensorFlow and using the uTensor offline tool to generate C++ files. For local development, the library uses CMake; a build can be initialized by creating a build directory and running `cmake -DPACKAGE_TUTORIALS=ON ..` followed by `make`. For Mbed OS users, uTensor can be imported directly using the command `mbed import https://github.com/uTensor/uTensor.git`. Detailed tutorials on error handling and creating custom operators are available in the `tutorials/` directory of the repository to help developers extend the framework for specific application needs.
