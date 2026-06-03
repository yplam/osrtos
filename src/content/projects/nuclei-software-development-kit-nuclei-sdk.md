---
title: Nuclei Software Development Kit (Nuclei SDK)
summary: A comprehensive software development kit for Nuclei Evaluation SoCs based
  on the RISC-V architecture. It provides a unified framework including the NMSIS
  hardware abstraction layer, peripheral drivers, and pre-integrated support for multiple
  RTOS kernels including FreeRTOS, RT-Thread, uC/OS-II, and ThreadX.
slug: nuclei-software-development-kit-nuclei-sdk
codeUrl: https://github.com/Nuclei-Software/nuclei-sdk
siteUrl: http://doc.nucleisys.com/nuclei_sdk
star: 154
version: n100-0.2.1
lastUpdated: '2025-08-04'
rtos: freertos
topics:
- embedded-hal
- embedded-systems
- fpga-evaluation-board
- freertos
- iot-platform
- makefile
- nmsis
- nuclei
- nuclei-sdk
- opensource
- platformio
- risc-v
- riscv
- rt-thread
- rtos
- sdk
- ucosii
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- kendryte-k210-freertos-sdk
- esp8266-rtos-software-development-kit-sdk
- zephyr-sdk
- ameba-rtos-sdk
- ameba-freertos-pro2-sdk
- zj-sdk-rt-thread-for-nordic-nrf52840
---

## Introduction

The Nuclei Software Development Kit (Nuclei SDK) is a robust platform designed for developers working with Nuclei Evaluation SoCs. Built on the RISC-V architecture, it provides a unified environment to develop, evaluate, and deploy software across the entire spectrum of Nuclei processor cores, from the low-power 100 series to the high-performance 1000 series. The SDK is specifically tailored to help developers leverage the unique features of Nuclei's processor designs while maintaining a standardized development workflow.

## The NMSIS Framework

At the heart of the Nuclei SDK is the Nuclei Microcontroller Software Interface Standard (NMSIS). Similar to the industry-standard CMSIS for ARM, NMSIS provides a consistent hardware abstraction layer for RISC-V processors. This framework includes several key components:

- **NMSIS-Core**: Provides standardized APIs for the processor core and its immediate peripherals.
- **NMSIS-DSP**: A library of optimized digital signal processing functions for RISC-V.
- **NMSIS-NN**: Efficient neural network kernels designed for AI at the edge.

This standardization ensures that code remains portable across different Nuclei-based hardware platforms, significantly reducing the effort required to migrate projects between different SoC configurations.

## Multi-RTOS Integration

One of the most significant advantages of the Nuclei SDK is its seamless integration with several popular Real-Time Operating Systems. Rather than forcing developers into a single ecosystem, the SDK provides ready-to-use packages for multiple kernels, allowing developers to choose the best fit for their application requirements. Supported RTOSes include:

- **FreeRTOS**: The widely-adopted open-source RTOS for embedded systems.
- **RT-Thread**: A powerful, scalable RTOS with a rich component ecosystem.
- **uC/OS-II**: A classic, highly reliable RTOS often used in industrial and safety-critical applications.
- **ThreadX**: A high-performance RTOS from the Eclipse Foundation (formerly Microsoft Azure RTOS).

Each RTOS is located in the `OS/` directory, and the SDK includes corresponding application examples in the `application/` folder, making it easy to start a new project with a preferred kernel.

## Hardware and Toolchain Support

The SDK is designed to be flexible regarding development tools. It supports the standard Nuclei RISC-V GCC and Clang toolchains, as well as commercial compilers like IAR and Terapines ZCC. For hardware, it primarily targets Nuclei FPGA evaluation boards (EvalSoC) and the GD32VF103 series. It supports various download modes, including running directly from Flash (XIP), running from ILM/RAM, and DDR/SRAM modes for larger applications.

## Build System and Workflow

The Nuclei SDK utilizes a sophisticated Makefile-based build system that simplifies complex compilation tasks. Developers can switch between different CPU cores and download modes using simple command-line arguments. For example, building an application for an N300 core to run in ILM is straightforward:

```shell
make CORE=n300 DOWNLOAD=ilm all
```

The system also supports advanced debugging workflows through OpenOCD and GDB, as well as simulation environments like QEMU. For those who prefer integrated development environments, the SDK is compatible with Nuclei Studio, which provides a graphical interface for project management, building, and debugging. It also supports the PlatformIO ecosystem and RT-Thread's SCons build system.

## Getting Started

To begin development, users typically set up their environment using the provided `setup.sh` (for Linux) or `setup.bat` (for Windows) scripts. These scripts configure the paths to the necessary toolchains and utilities. Once the environment is sourced, building an application is as simple as navigating to the project directory and running the `make` command. The SDK includes a wide variety of bare-metal and OS-based examples to serve as templates for new projects.
