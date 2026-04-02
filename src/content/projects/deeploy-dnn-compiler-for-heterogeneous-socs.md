---
title: 'Deeploy: DNN Compiler for Heterogeneous SoCs'
summary: Deeploy is an ONNX-to-C compiler designed for deploying deep neural networks
  on multi-cluster, heterogeneous SoCs and RISC-V platforms. It automates the generation
  of optimized C code by performing constraint-based tiling and memory orchestration,
  targeting architectures like PULP, GAP9, and ARM Cortex-M for energy-efficient TinyML.
slug: deeploy-dnn-compiler-for-heterogeneous-socs
codeUrl: https://github.com/pulp-platform/Deeploy
siteUrl: https://pulp-platform.github.io/Deeploy/
version: v0.2.1
lastUpdated: '2026-03-26'
rtos: cmsis
topics:
- mcu
- ml-compiler
- tinyml
isShow: false
createdAt: '2026-04-02T23:27:42+00:00'
updatedAt: '2026-04-02T23:27:42+00:00'
---

Deploying Deep Neural Networks (DNNs) on the edge is a balancing act between limited memory, tight energy budgets, and the need for high throughput. As models grow in complexity—shifting from simple convolutions to sophisticated Transformer architectures—the gap between high-level AI frameworks and low-level embedded hardware continues to widen. Deeploy addresses this challenge by serving as an ONNX-to-C compiler that generates low-level, optimized C code specifically tailored for multi-cluster, heterogeneous Systems-on-Chip (SoCs).

Developed as part of the PULP project, a joint effort between ETH Zurich and the University of Bologna, Deeploy adopts a bottom-up compiler perspective. Instead of treating hardware as a monolithic entity, it models target architectures in a fine-grained and modular manner. This allows the compiler to exploit specific hardware features like DMA engines, multi-level memory hierarchies, and hardware accelerators with high precision.

### The Compilation Pipeline

The transformation from a high-level ONNX graph to executable C code involves six distinct stages. It begins with ONNX parsing and type checking, which includes quantization-aware inference to ensure the model matches the target's bit-precision requirements (supporting INT8, INT16, FP32, and FP64). Following topology optimization, the compiler enters one of its most critical phases: constraint-based tiling.

Because edge devices often have very limited L1 scratchpad memory, large neural network layers must be broken down into smaller tiles. Deeploy utilizes the OR-Tools CP-SAT solver to perform tiling analysis, ensuring that activations and weights fit within specific memory constraints across L1, L2, and L3 hierarchies. This analysis is paired with memory allocation strategies that support double buffering, allowing the system to overlap DMA data transfers with computation to hide latency and maximize hardware utilization.

### Broad Hardware Support

Deeploy is designed to be highly extensible through an abstract `DeploymentPlatform` interface. This modularity allows it to support a wide variety of platforms, ranging from standard CPUs to advanced parallel RISC-V clusters:

*   **RISC-V Architectures**: Extensive support for PULP-based platforms including Siracusa, Snitch Clusters, and MemPool. It integrates with specialized libraries like `pulp-nn-mixed` and `pulp-nnx` for accelerated inference.
*   **ARM Cortex-M**: Integration with the CMSIS-NN library enables deployment on popular ARM-based microcontrollers, utilizing DSP and SIMD instructions for performance.
*   **Heterogeneous Accelerators**: The framework supports specialized hardware like the Neureka accelerator and the GAP9 SoC, managing the complex data movement required to feed these high-performance engines.

### Practical Usage and Testing

The framework provides a Python-based infrastructure to streamline the deployment process. Users can generate code for a specific platform using dedicated runner scripts. For example, generating a tiled Matrix Multiplication for the Siracusa platform is as simple as defining the core count and memory constraints:

```python
python deeployRunner_tiled_siracusa.py -t Tests/Kernels/Integer/MatMul/Regular --cores=8 --l1=16000
```

This command triggers the full compilation flow, resulting in a `Network.c` file that contains the orchestrated calls for tiling, DMA transfers, and kernel execution. To ensure a consistent environment, the project provides a comprehensive Docker container pre-loaded with the necessary toolchains (LLVM/Clang) and cycle-accurate simulators like GVSoC, Banshee, and QEMU. This allows developers to validate their generated code in a bit-accurate simulation environment before moving to physical hardware.

By focusing on the fine-grained modeling of hardware and memory, Deeploy enables the deployment of Small Language Models (SLMs) and TinyML applications that were previously too resource-intensive for microcontrollers. It represents a significant step forward in making advanced AI both energy-efficient and accessible on the smallest of devices.
