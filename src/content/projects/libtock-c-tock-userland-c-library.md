---
title: 'libtock-c: Tock Userland C Library'
summary: The C userland library and SDK for the Tock operating system, providing the
  core APIs and build system for developing embedded applications. It supports ARM
  Cortex-M and RISC-V architectures and includes integrated support for popular libraries
  like LWIP, LVGL, and OpenThread.
slug: libtock-c-tock-userland-c-library
codeUrl: https://github.com/tock/libtock-c
star: 88
version: release-2.1
lastUpdated: '2025-11-30'
rtos: tock
libraries:
- lvgl
- lwip
- u8g2
- open-thread
topics:
- c
- embedded
- embedded-c
- embedded-cpp
- tock
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- rust-support-for-rt-thread
- tock-for-stm32
- rust-stub-library-for-apache-nuttx
- nuclei-software-development-kit-nuclei-sdk
- clickos-toolchain
- kendryte-k210-freertos-sdk
---

## Overview

libtock-c is the primary C and C++ userland library for the Tock operating system. Tock is a secure, embedded operating system designed for microcontrollers, utilizing a unique architecture that separates the kernel (written in Rust) from userland applications. libtock-c provides the necessary system call wrappers, headers, and build infrastructure to develop these applications in C or C++.

The library acts as the interface between the application and the Tock kernel, abstracting the underlying system calls into a familiar C API. This allows developers to write applications that are portable across different Tock-compatible hardware platforms without needing to rewrite driver interactions for every board.

## The Tock Application Model

Unlike traditional RTOS environments where applications are compiled directly with the kernel, Tock applications are separate entities. They are compiled into Tock Application Bundles (TABs), which contain multiple binaries for different CPU architectures. This design allows the same application package to be deployed on various hardware, such as Nordic nRF52 development kits or RISC-V platforms, with the kernel selecting the appropriate binary at runtime.

libtock-c handles the complexities of this model, including:
- **Position Independent Code (PIC)**: Ensuring applications can run at different memory offsets.
- **Memory Layout**: Managing the stack and heap requirements through the linker scripts.
- **System Call Interface**: Providing synchronous and asynchronous wrappers for kernel services.

## Supported Architectures and Toolchains

libtock-c supports a wide range of embedded architectures, primarily focusing on 32-bit microcontrollers. The build system is configured to target:
- **ARM Cortex-M**: Including M0, M3, M4, and M7 variants.
- **RISC-V**: Including rv32i, rv32imc, and rv32imac extensions.

To build applications, developers typically use the `arm-none-eabi` or `riscv64-unknown-elf` GCC toolchains. The project also includes experimental support for LLVM/Clang for RISC-V targets. A critical component of the build process is `elf2tab`, a tool that converts standard ELF binaries into the Tock-specific TAB format, incorporating metadata like required stack size and kernel version compatibility.

## Integrated Libraries and Middleware

Beyond core system calls, libtock-c includes several popular open-source libraries ported to the Tock environment. This ecosystem allows developers to build feature-rich applications quickly:
- **Networking**: Integration with **lwIP** for TCP/IP and **OpenThread** for Thread networking.
- **Graphics**: Support for **LVGL** and **u8g2** for driving displays.
- **Scripting**: A port of **Lua 5.3** for embedded scripting.
- **Serialization**: Support for nRF Serialization and other communication protocols.

## Building and Deployment

The build system is based on Make, with a hierarchical structure that allows for easy application development. A typical workflow involves navigating to an example directory and running the build script:

```bash
cd examples
./build_all.sh
```

This generates `.tab` files for each example. Deployment is handled by `tockloader`, a Python-based tool that communicates with the board's bootloader or JTAG programmer to install, uninstall, and manage applications on the device.

```bash
tockloader install --board nrf52dk --jlink blink/build/blink.tab
```

## Technical Implementation Details

The project utilizes a generic linker script (`userland_generic.ld`) and a sophisticated set of Makefiles (`Configuration.mk`, `AppMakefile.mk`) to manage the build process. These files handle the generation of the TBF (Tock Binary Format) headers, which tell the kernel how much RAM the application needs and where its entry point is located. The library also provides a size-optimized version of `newlib` (newlib-nano) to minimize the memory footprint of C applications, which is essential for resource-constrained microcontrollers.
