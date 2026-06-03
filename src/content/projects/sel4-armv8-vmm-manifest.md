---
title: seL4 ARMv8 VMM Manifest
summary: A build manifest for deploying a virtualized seL4 environment on ARMv8 platforms
  including the Xilinx ZCU102 and NXP i.MX8. It integrates the seL4 microkernel with
  a Virtual Machine Monitor (VMM) to support guest Linux instances and inter-VM communication.
slug: sel4-armv8-vmm-manifest
codeUrl: https://github.com/dornerworks/sel4-armv8-vmm-manifest
star: 7
lastUpdated: '2019-01-10'
rtos: sel4
topics:
- security
- sel4
- virtualization
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- cortex-m33-trustzone-experiments-on-qemu-an505
- the-sel4-white-paper
- bpf-ebpf-for-microcontroller-compartmentalization
- selfe-sys-rust-bindings-for-sel4
- hydra-hybrid-design-for-remote-attestation-on-sel4
- rust-sel4-toy-system-for-i-mx6-sabre-lite
---

## Overview

The `sel4-armv8-vmm-manifest` project provides a streamlined build system for deploying a Virtual Machine Monitor (VMM) on top of the seL4 microkernel for ARMv8-A architectures. Specifically targeting the Xilinx Zynq UltraScale+ MPSoC (ZCU102) and the i.MX8, this repository uses the Google `repo` tool to manage a complex ecosystem of kernel source code, system libraries, and build tools required to create a functional hypervisor environment.

By leveraging seL4's high-assurance capabilities, this project allows developers to run virtualized guest operating systems—primarily Linux—with strong isolation and controlled communication channels. This is particularly relevant for safety-critical or secure embedded systems where multiple software components with different criticality levels must coexist on the same hardware.

## Technical Architecture

The system is composed of several layers managed through the manifest:

- **seL4 Microkernel**: The core hypervisor providing hardware-enforced isolation.
- **VMM Application**: A specialized seL4 user-space application that manages guest execution, traps sensitive instructions, and emulates necessary hardware peripherals.
- **Guest OS**: The manifest includes instructions for building a custom PetaLinux distribution to run as a virtual machine.
- **Inter-VM Communication**: The project integrates `vchan`, a simplified communication protocol for passing data between isolated partitions.

## Key Components and Libraries

The manifest pulls in a variety of essential seL4 libraries and tools:
- **libsel4arm-vmm**: The core library providing VMM functionality for ARM platforms.
- **seL4_libs**: Standard seL4 support libraries including `libsel4utils`, `libsel4vspace` (address space management), and `libsel4vka` (kernel object allocation).
- **util_libs**: General utility libraries such as `libplatsupport` for hardware abstraction and `libelf` for loading guest binaries.
- **musllibc**: A lightweight C library implementation compatible with seL4.

## Building for the ZCU102

The project provides a detailed workflow for the Xilinx ZCU102 platform. This involves a multi-stage process:

1.  **Guest Linux Preparation**: Using Xilinx PetaLinux tools to create a kernel image configured for virtualization. This includes modifications to the serial console handling and the integration of the `vchan` kernel module.
2.  **seL4 Build**: Utilizing a specialized Docker environment to ensure toolchain consistency, the seL4 microkernel and the VMM application are compiled using a standard Kbuild/Makefile system.
3.  **Deployment**: The resulting image is typically booted via U-Boot using TFTP. The system is designed to utilize multiple UARTs—one for the seL4/VMM host and another for the guest virtual machines.

## Inter-VM Communication with vchan

A notable feature of this manifest is the inclusion of the `vchan` module. In a virtualized environment, guests are isolated from one another. `vchan` provides a mechanism for high-performance data transfer between these isolated domains, allowing for complex multi-OS architectures where a secure seL4 partition can communicate with a general-purpose Linux guest.
