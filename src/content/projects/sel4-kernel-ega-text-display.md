---
title: seL4 Kernel EGA Text Display
summary: A test project for the seL4 microkernel demonstrating EGA text display functionality
  on x86 platforms. It provides a simple implementation for graphical output in a
  secure microkernel environment, inspired by the seL4 examples repository.
slug: sel4-kernel-ega-text-display
codeUrl: https://github.com/manu88/Sel4_EGA
star: 0
lastUpdated: '2018-11-05'
rtos: sel4
topics:
- display
- ega
- sel4
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- fel4-test-project
- lvgl-demo-test
- lvgl-test-app-for-apache-nuttx
- st7789-and-lvgl-demo-for-apache-nuttx-rtos
- sel4-kernel-101
- jc3248w535-lvgl-v9-test-project
---

## Overview

The `Sel4_EGA` project is a specialized test environment designed to explore EGA (Enhanced Graphics Adapter) text display capabilities within the seL4 microkernel ecosystem. As seL4 is a high-assurance, high-performance microkernel, projects like this serve as essential building blocks for developers looking to implement user-interface elements or debugging consoles in secure embedded environments.

By focusing on the EGA text display, this project provides a bridge between the low-level microkernel primitives and human-readable output. It is particularly useful for developers working on x86-based embedded systems where a standard VGA/EGA console is required for system status monitoring or early-stage boot diagnostics.

## Project Inspiration and Context

This project draws significant inspiration from the `seL4Examples` repository, which is the standard starting point for many developers entering the seL4 ecosystem. The primary goal of `Sel4_EGA` is to provide a straightforward, minimal implementation of text output to an EGA display buffer. This is a classic task in systems programming that involves writing character and attribute bytes directly to memory-mapped I/O regions associated with the legacy video hardware.

## Technical Implementation

The project is built using the standard seL4 CMake build system. It specifically targets the x86 platform, as evidenced by the build configuration which forces the kernel architecture to `x86` and enables IOMMU support when not in simulation mode. 

### Key Build Configurations:
- **Architecture**: Specifically locked to x86 to support legacy EGA hardware interfaces.
- **Debug Support**: The project relies on `seL4_DebugPutChar`, which is a common debug primitive in the seL4 kernel. This allows the project to function even before complex platsupport drivers are fully initialized.
- **IOMMU Support**: When running on physical hardware, the project enables the Kernel IOMMU to maintain the security properties of the microkernel while interacting with hardware devices.

## Simulation and Hardware Support

One of the most useful features of this project is its integrated support for simulation. The build system includes logic to generate simulation scripts that are pre-configured for graphical output. By setting the `GRAPHIC` property to `TRUE` in the simulation script generator, the project allows developers to verify the EGA output in an emulated environment (like QEMU) without needing physical x86 hardware with an EGA-compatible BIOS.

## Getting Started

To work with this project, developers typically need a configured seL4 development environment, including the seL4 python tools and a compatible cross-compiler for x86. The project structure follows the standard seL4 layout, where the core logic resides within the `projects` directory. 

Because it is a test project, it serves as a clean template for more complex graphical applications. Developers can examine the memory mapping logic used to access the EGA buffer and the character rendering routines to understand how to manage hardware resources under the strict capability-based security model of seL4.
