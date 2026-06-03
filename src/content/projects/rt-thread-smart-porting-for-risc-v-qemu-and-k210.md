---
title: RT-Thread Smart Porting for RISC-V (QEMU and K210)
summary: A project focused on porting RT-Thread Smart, a microkernel RTOS with MMU
  support, to RISC-V platforms including QEMU and the Kendryte K210 SoC. It implements
  system calls via a POSIX-compliant interface using musl libc and supports both Supervisor
  and User modes.
slug: rt-thread-smart-porting-for-risc-v-qemu-and-k210
codeUrl: https://github.com/oscomp/proj24-rt-smart-porting
star: 3
lastUpdated: '2020-12-25'
rtos: rt-thread
topics:
- microkernel
- risc-v
- rt-thread
- rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- freertos-port-for-risc-v
- apache-nuttx-rtos-on-64-bit-risc-v
- phoenix-rtos-project
- rt-thread-for-picorv32-on-lichee-tang
- c-common-for-rt-thread
- micropython-for-kendryte-k210-lobo-port
---

## Overview

RT-Thread Smart (rt-smart) is an open-source microkernel operating system that brings the benefits of a traditional RTOS together with the advanced memory management capabilities of a microkernel. This project focuses on porting rt-smart to the RISC-V architecture, specifically targeting the QEMU emulator and the Kendryte K210 SoC. 

While many RISC-V operating systems are currently available, few provide robust support for Memory Management Units (MMU). This project addresses that gap by implementing the MMU virtual memory mechanism on RISC-V, allowing for a clear separation between kernel space (Supervisor mode) and user space (User mode).

## Key Features and Technical Specifications

The porting effort emphasizes compatibility and standard-compliant interfaces to ensure a smooth development experience for embedded software engineers. Key technical features include:

- **POSIX Subset Support**: The system call interface is designed to support a subset of the POSIX standard, facilitating the porting of existing Linux/Unix applications.
- **Musl Libc Integration**: The project utilizes musl libc, a lightweight and efficient C library, to provide standard library functions for user-space applications.
- **RISC-V Architecture**: Full support for RISC-V platforms, leveraging the architecture's S-mode (Supervisor) for the kernel and U-mode (User) for applications.
- **MMU Virtual Memory**: Implementation of virtual memory management to provide process isolation and memory protection.

## Target Platforms

The project targets two primary environments for development and deployment:

### QEMU Simulation
The initial phase of the project involves porting rt-smart to the QEMU RISC-V emulator. This requires adapting the kernel to handle QEMU's virtual UART and timer hardware. This environment serves as a critical testing ground for the musl libc interface and core kernel functionality before moving to physical hardware.

### Kendryte K210
The primary hardware target is the Kendryte K210, a dual-core RISC-V SoC. The porting effort for the K210 includes:
- **Basic Porting**: Implementing MMU support and ensuring the system runs in S-mode while user programs run in U-mode.
- **Peripheral Drivers**: Extending the system to support hardware-specific features such as GPIO, SPI, and SPI Flash.
- **File System Support**: Mounting readable and writable file systems to allow for persistent storage and user program downloads.

## Project Context

This repository was developed as part of the "OS Function Design" track for the 2021 National Undergraduate Operating System Competition. It serves as a comprehensive example of how to bring modern OS features like virtual memory and process isolation to resource-constrained RISC-V hardware, bridging the gap between traditional RTOS and full-scale GPOS like Linux.
