---
title: Sony Spresense SDK
summary: The official software development kit for the Sony Spresense development
  board, built upon the NuttX real-time operating system. It provides a comprehensive
  environment for developing high-performance IoT applications with support for multi-core
  processing and edge AI through the Neural Network Runtime.
slug: sony-spresense-sdk
codeUrl: https://github.com/sonydevworld/spresense
siteUrl: https://developer.sony.com/develop/spresense/docs/sdk_set_up_en.html
star: 186
version: v3.4.5
lastUpdated: '2025-09-25'
rtos: nuttx
topics:
- nuttx
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- kendryte-k210-freertos-sdk
- ameba-freertos-pro2-sdk
- esp8266-rtos-software-development-kit-sdk
- ameba-rtos-sdk
- nuclei-software-development-kit-nuclei-sdk
- zj-sdk-rt-thread-for-nordic-nrf52840
---

## Overview

The Spresense SDK is the official development framework for Sony's Spresense development board. Spresense is a compact, high-performance development board based on the Sony CXD5602 multicore processor, designed for power-efficient IoT applications. The SDK leverages the NuttX real-time operating system (RTOS) to provide a POSIX-compliant environment, making it familiar to developers with Linux or Unix experience.

## Architecture and Components

The repository is structured to provide a complete ecosystem for embedded development. It consists of several key submodules that work together to form the full SDK:

- **NuttX Kernel**: A customized version of the NuttX RTOS specifically ported for the Spresense hardware architecture.
- **SDK Applications**: A collection of original NuttX applications along with Spresense-specific ports and examples.
- **Neural Network Runtime**: Integration with the `nnabla-c-runtime` (Neural Network Libraries), which enables the execution of neural network models directly on the Spresense hardware for edge AI applications.

## Key Features

- **Multicore Support**: Designed to take advantage of the Spresense board's multicore architecture for parallel processing tasks.
- **Edge AI Integration**: Built-in support for neural network runtimes, allowing for sophisticated machine learning tasks at the edge.
- **POSIX Compliance**: By using NuttX, the SDK provides a standard set of APIs for file systems, networking, and task management.
- **Flexible Build System**: Features a configuration system inspired by the Linux kernel's kconfig, allowing developers to easily enable or disable features and drivers.
- **Docker Support**: Provides a pre-compiled Docker container that includes all necessary prerequisites, ensuring a consistent build environment across different host platforms.

## Getting Started

The SDK requires a GCC ARM toolchain for cross-compilation. Sony provides an `install-tools.sh` script to automate the setup of the development environment, including the installation of necessary packages and the toolchain. 

Setting up a project involves configuring the SDK for a specific example or application using a Python-based configuration tool. For instance, to build a basic 'hello world' example, a developer would navigate to the SDK folder and run:

```bash
$ tools/config.py examples/hello
$ make
```

The build process generates a `nuttx.spk` file, which is the final firmware image ready to be flashed onto the Spresense board. For developers who prefer containerized environments, the SDK includes a `spresense_env.sh` script to wrap build commands within a Docker container, simplifying the dependency management process.
