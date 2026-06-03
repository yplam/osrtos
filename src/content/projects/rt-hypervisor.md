---
title: RT-Hypervisor
summary: A real-time hypervisor designed for automotive embedded systems, built upon
  the RT-Thread RTOS. It supports ARMv8-A architectures such as the Cortex-A53 and
  provides virtualization capabilities for running Guest OS instances.
slug: rt-hypervisor
codeUrl: https://github.com/Suqier/RT-Hypervisor
star: 12
lastUpdated: '2023-02-01'
rtos: rt-thread
libraries:
- lwip
topics:
- armv8-a
- embedded
- hypervisor
- real-time
- rt-thread
- virtualization
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- freertos-cell-for-the-jailhouse-hypervisor
- rust-support-for-rt-thread
- phoenix-rtos-project
- freertos-port-for-risc-v
- chibios
- mos-rtos
---

## Overview

RT-Hypervisor is a real-time hypervisor specifically engineered for the demanding requirements of automotive embedded systems. Built on the foundation of the RT-Thread real-time operating system, it extends the kernel's capabilities to support hardware-assisted virtualization. This allows developers to run multiple isolated operating systems (Guest OS) on a single hardware platform, which is a critical requirement in modern automotive architectures where consolidation and safety-critical isolation are paramount.

## Technical Architecture

The project targets the ARMv8-A architecture, with primary support and testing focused on the Cortex-A53 processor. By leveraging ARM's virtualization extensions, RT-Hypervisor manages system resources and provides a secure environment for Guest OS execution. It utilizes the Generic Interrupt Controller version 3 (GICv3) and integrates deeply with Flattened Device Tree (FDT) for hardware description and resource allocation.

Key technical components include:
- **Kernel Core**: Based on RT-Thread v4.1.0, providing robust scheduling and IPC.
- **Virtualization Layer**: Implements the logic required to trap and emulate sensitive instructions and manage second-stage address translation.
- **AArch64 Support**: Full 64-bit support for modern ARM SoCs.
- **GICv3 Integration**: Advanced interrupt management for virtualized environments.

## Hardware and Emulation

RT-Hypervisor is designed to run on high-performance embedded SoCs, but it provides excellent support for the QEMU emulator, specifically the `virt` machine type. This allows developers to test hypervisor logic and Guest OS integration without physical hardware. The project utilizes standard tools like the Device Tree Compiler (`dtc`) to manipulate system configurations, enabling flexible mapping of peripherals to different virtual machines.

## Key Features

- **Real-Time Performance**: Inherits the deterministic behavior of RT-Thread, ensuring that high-priority tasks and hypervisor operations meet strict timing requirements.
- **Automotive Focus**: Designed with the isolation and reliability needs of the automotive industry in mind.
- **Guest OS Support**: Capability to load and run standard RT-Thread images or other operating systems as guests.
- **Flexible Configuration**: Uses Kconfig for system-wide configuration and Device Trees for hardware mapping.

## Getting Started

The project is typically built using the SCons build system, consistent with the RT-Thread ecosystem. For those using emulation, the project provides specific QEMU commands to launch the hypervisor with a Guest OS image. A typical startup involves loading the hypervisor ELF file, a Guest OS binary, and a compiled Device Tree Blob (DTB). 

Developers are encouraged to use the `add_fdt` branch for the latest features regarding device tree integration. The repository includes comprehensive tools for decompiling and recompiling device trees, allowing for fine-grained control over the virtualized hardware environment.
