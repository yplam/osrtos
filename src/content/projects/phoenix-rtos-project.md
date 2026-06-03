---
title: Phoenix-RTOS Project
summary: A scalable real-time operating system for IoT based on a custom microkernel.
  It supports multiple architectures including ARM Cortex-M/A, x86, and RISC-V, providing
  a POSIX-compliant environment and advanced partitioning for aerospace and industrial
  applications.
slug: phoenix-rtos-project
codeUrl: https://github.com/phoenix-rtos/phoenix-rtos-project
siteUrl: https://phoenix-rtos.com
star: 60
version: v3.2.0
lastUpdated: '2025-12-16'
rtos: Phoenix-RTOS
libraries:
- lwip
topics:
- phoenix-rtos
- rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nuttx-real-time-operating-system
- rt-thread-smart-porting-for-risc-v-qemu-and-k210
- freertos-port-for-risc-v
- micro-ros-for-rt-thread
- raspberry-pi-rtos-rpi-rtos
- apache-nuttx-rtos
---

## Overview

Phoenix-RTOS is a scalable, real-time operating system designed specifically for the Internet of Things (IoT). Built upon its own proprietary microkernel, it offers a versatile platform that spans the spectrum of embedded computing—from resource-constrained microcontrollers to high-performance computer systems featuring multiple processors and gigabytes of RAM. 

The project is engineered with a focus on modularity and standards compliance. By providing a POSIX-compatible application environment, it allows developers to execute regular UN*X applications on embedded hardware. Furthermore, the system is expanding into safety-critical domains with the development of an ARINC653 execution environment (APEX) and a DO-178C certification package, making it a candidate for advanced aerospace and industrial applications.

## Architecture and Design

At its core, Phoenix-RTOS utilizes a microkernel architecture. This design philosophy moves most system services—such as device drivers, filesystems, and network stacks—out of the kernel space and into user space. This approach enhances system stability and security, as a failure in a driver or service does not necessarily crash the entire operating system.

The repository serves as a "microdistribution" or project aggregator. It brings together all the essential components required to build a functional system image:
- **Kernel**: The core microkernel responsible for scheduling and IPC.
- **Standard Library (libphoenix)**: A custom implementation of the standard C library optimized for the RTOS.
- **Device Drivers**: Support for various hardware peripherals.
- **Filesystems**: Multiple filesystem implementations for data storage.
- **Loader (plo)**: The Phoenix-RTOS Loader for booting the system.
- **Network Stack**: Integration with lwIP for robust networking capabilities.

## Hardware Support

Phoenix-RTOS is highly portable and supports a wide range of modern architectures and platforms:
- **ARM**: Support for both Cortex-M (microcontrollers) and Cortex-A (application processors).
- **Intel x86**: Compatibility with traditional PC architectures.
- **RISC-V**: Support for the emerging open standard instruction set.
- **Reference Boards**: Support for popular development boards and specific microcontrollers used in industrial appliances.

The system has already seen real-world deployment in Smart Utility appliances, including smart gas meters, energy meters, and data concentrators (DCU), proving its reliability in production environments.

## Development Environment

The project provides a streamlined build process designed to work on modern Linux distributions like Ubuntu. It includes scripts for Docker-based development, ensuring that developers can maintain a consistent build environment across different host machines. The `build.project` script manages the compilation of various targets and projects, allowing for easy customization of the final system image.

For those looking to get started, the project maintains extensive documentation covering the system philosophy, architecture, and quick-start guides for running images on both physical hardware and emulators like QEMU.
