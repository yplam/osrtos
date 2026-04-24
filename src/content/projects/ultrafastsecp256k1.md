---
title: UltrafastSecp256k1
summary: A high-performance, multi-backend secp256k1 elliptic curve cryptography engine
  optimized for CPU, GPU, and embedded systems. It supports a comprehensive cryptographic
  stack including ECDSA, Schnorr, and ZK proofs, targeting platforms like ESP32, STM32,
  and RISC-V.
slug: ultrafastsecp256k1
codeUrl: https://github.com/shrec/UltrafastSecp256k1
siteUrl: https://shrec.github.io/UltrafastSecp256k1/
version: v3.67.0
lastUpdated: '2026-04-23'
licenses:
- MIT
rtos: freertos
libraries:
- lwip
- platformio-platformio-core
topics:
- android
- arm64
- bitcoin
- constant-time
- cryptography
- cuda
- ecdsa
- embedded
- ethereum
- ffi
- gpu-cryptography
- ios
- nodejs
- opencl
- python
- riscv
- rust
- schnorr-signatures
- secp256k1
- webassembly
isShow: false
createdAt: '2026-04-24T09:31:22+00:00'
updatedAt: '2026-04-24T09:31:22+00:00'
---

UltrafastSecp256k1 is a high-performance cryptographic engine designed to push the limits of secp256k1 operations across a vast array of hardware. While many libraries focus on a single platform, this project provides a unified C++20 core that scales from the massive parallel processing power of modern GPUs down to the resource-constrained environments of microcontrollers like the ESP32 and STM32. It is built for modern workloads including blockchain infrastructure, high-throughput signature verification, and zero-knowledge proof pipelines.

### Multi-Backend Architecture

The project stands out for its versatile backend support. It provides high-throughput kernels for NVIDIA GPUs (CUDA), AMD and other GPUs (OpenCL), and Apple Silicon (Metal). For embedded systems, the library is optimized for ARM64, RISC-V (RV64GC), and specific microcontrollers. It includes dedicated support for the Espressif ecosystem, featuring benchmarks and test suites for the ESP32-S3, ESP32-C6, and ESP32-P4. On these platforms, it integrates with the ESP-IDF framework, leveraging the FreeRTOS kernel and LwIP for networking-related cryptographic tasks.

### Continuous Adversarial Audit

Security in UltrafastSecp256k1 is not a static milestone but a continuous process. The repository implements a "Continuous Audit" system that runs over 1,000,000 assertions per build. This includes 60 non-exploit modules and 189 exploit Proof-of-Concept (PoC) tests designed to detect regressions in security-critical paths. The library also employs formal verification tools like ct-verif and Valgrind CT to ensure constant-time execution, protecting against side-channel attacks on secret-key operations.

### Advanced Cryptographic Features

Beyond basic ECDSA signing and verification, UltrafastSecp256k1 implements a wide range of modern protocols:
- **BIP-340 Schnorr Signatures**: Full support for Bitcoin's Taproot-compatible signatures.
- **Threshold Signatures**: First open-source GPU implementation of FROST partial verification.
- **Silent Payments (BIP-352)**: A highly optimized GPU pipeline capable of scanning millions of tweaks per second.
- **Zero-Knowledge Proofs**: Pedersen commitments, DLEQ proofs, and Bulletproof range proofs.
- **Multi-Party Computation**: MuSig2 and adaptor signatures.

### Performance and Benchmarking

Performance is a core pillar of the project. On high-end hardware like the RTX 5060 Ti, the library can process millions of ECDSA and Schnorr signatures per second. For embedded targets, the project provides specialized assembly optimizations to maximize throughput on architectures like RISC-V and Cortex-M. The repository includes comprehensive benchmarking tools, such as the `esp32_bench_hornet`, allowing developers to measure exact performance on their specific hardware.

### Getting Started

For developers using C++, the library offers a zero-dependency core. It can be integrated into CMake projects or used via a stable C ABI. Multi-language bindings are also available for Python, Node.js, Rust, Go, and more. 

```bash
# Build from source using CMake
git clone https://github.com/shrec/UltrafastSecp256k1.git
cd UltrafastSecp256k1
cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release
cmake --build build -j
./build/selftest
```

For embedded developers, the project includes PlatformIO and ESP-IDF components, making it easy to drop into existing firmware projects. Whether you are building a hardware wallet on an STM32 or a high-speed transaction validator on a GPU cluster, UltrafastSecp256k1 provides the tools and the evidence-based security model required for production-grade cryptography.
