---
title: Zephyr SDK
summary: The Zephyr Software Development Kit (SDK) is a comprehensive toolset providing
  cross-compilation toolchains and host tools for the Zephyr RTOS. It supports a wide
  array of architectures including ARM, RISC-V, Xtensa, and x86, and bundles essential
  utilities like QEMU and OpenOCD for emulation and debugging.
slug: zephyr-sdk
codeUrl: https://github.com/zephyrproject-rtos/sdk-ng
star: 245
version: v0.17.4
lastUpdated: '2025-12-11'
rtos: zephyr
topics:
- sdk
- sdk-components
- zephyr
- zephyr-sdk
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- swedish-embedded-platform-sdk
- docker-containers-for-the-zephyr-rtos
- nuclei-software-development-kit-nuclei-sdk
- swedish-embedded-workstation
- spotflow-observability-device-sdk
- ameba-rtos-sdk
---

The Zephyr SDK is a critical component of the Zephyr RTOS ecosystem, providing the necessary infrastructure to compile, link, and debug embedded applications across a vast array of hardware architectures. Unlike traditional toolchains that might target a single processor family, the Zephyr SDK is a multi-architecture powerhouse, ensuring that developers have a consistent environment whether they are working on a low-power ARM Cortex-M microcontroller or a high-performance RISC-V SoC.

### Comprehensive Architecture Support

One of the standout features of the Zephyr SDK is its broad support for target architectures. It includes optimized toolchains for:

- **ARM**: Covering 32-bit and 64-bit profiles (A, R, and M profiles).
- **RISC-V**: Supporting both 32-bit and 64-bit variants, including RV32I, RV32E, and RV64I configurations.
- **Xtensa**: Including support for various vendor-specific variants like those from Espressif, Intel, and NXP.
- **ARC, MIPS, x86, and SPARC**: Providing coverage for industrial, aerospace, and legacy platforms.

### Integrated Host Tools

Beyond just compilers, the SDK bundles essential host tools that streamline the development workflow. **QEMU** and **Xilinx QEMU** are included for architecture emulation, allowing developers to test their code in a virtual environment before deploying to physical hardware. For on-chip debugging and programming, the SDK provides **OpenOCD** and **BOSSA**, ensuring that the bridge between the development machine and the target silicon is seamless.

### Modern Toolchain Components

The SDK is built on a foundation of modern, open-source compiler technology. Recent releases have transitioned to using **Picolibc** as the default C library, significantly reducing the binary footprint for resource-constrained devices. Furthermore, the SDK has introduced support for **Clang/LLVM** toolchains alongside the traditional **GNU GCC** suites, giving developers more choice in their compilation strategy and access to modern static analysis and optimization features.

### Development and Release Workflow

The project utilizes a robust CI/CD pipeline to maintain toolchain quality. The build process is managed through a series of submodules, including `binutils`, `gcc`, `gdb`, and `llvm`. This modular approach allows the Zephyr project to maintain forks of these tools with specific patches required for embedded targets. Developers can even test their own patches by submitting draft pull requests to the `sdk-ng` repository, which trigger automated builds of the entire SDK to verify changes against the Zephyr ecosystem.

### Host Platform Compatibility

The Zephyr SDK is designed to be cross-platform, with binary releases available for multiple host operating systems:

- **Linux**: Supporting both x86-64 and AArch64 (ARM64) hosts.
- **macOS**: Supporting Intel and Apple Silicon (AArch64).
- **Windows**: Supporting x86-64 environments.

This ensures that regardless of the developer's operating system, they have access to the same high-quality tools for Zephyr RTOS development, facilitating collaboration across diverse engineering teams.
