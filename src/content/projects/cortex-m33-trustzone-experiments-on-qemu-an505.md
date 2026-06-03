---
title: Cortex-M33 TrustZone Experiments on QEMU AN505
summary: A technical demonstration of ARMv8-M Security Extensions (TrustZone) targeting
  the Cortex-M33 processor. It provides a complete environment for building and emulating
  secure and non-secure firmware images on the MPS2+ AN505 platform using QEMU and
  CMSIS.
slug: cortex-m33-trustzone-experiments-on-qemu-an505
codeUrl: https://github.com/Introduction-To-System-On-Chip/QEMU_an505
star: 15
lastUpdated: '2021-03-28'
rtos: cmsis
topics:
- boot
- cmsis
- idau
- mpc
- qemu
- qemu-arm
- sau
- v8m
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- qemu-emulation-for-ti-lm3s6965-cortex-m3
- solox-amp-rust
- sel4-armv8-vmm-manifest
- lvgl-port-for-arm-cortex-m55-and-mps3-an547
- multizone-security-tee-for-risc-v
- mtower-trusted-execution-environment
---

## Overview

The Cortex-M33 Experiments project is a specialized development environment designed for exploring the ARMv8-M architecture, specifically focusing on Security Extensions (TrustZone). By targeting the AN505 IoT Kit Subsystem design for the V2M-MPS2+ platform, this repository provides the necessary scaffolding to develop, build, and debug secure and non-secure firmware in an emulated environment using QEMU.

At its core, the project demonstrates the hardware-enforced isolation between Secure and Non-Secure states, a fundamental feature of modern embedded security. It leverages the CMSIS (Cortex Microcontroller Software Interface Standard) to provide a consistent hardware abstraction layer across the different security domains.

## Technical Architecture

The project is structured to handle the unique requirements of TrustZone-M, where the processor operates in two distinct security states. The build system is configured to produce two separate executable images:

- **Secure Image (`secure.elf`)**: Contains the security-critical code, handles system initialization, and defines the Secure Gateway (SG) instructions that allow the non-secure side to call specific secure functions.
- **Non-Secure Image (`nonsecure.elf`)**: Contains the main application logic and operates with restricted access to system resources, interacting with the secure side only through defined entry points.

The project includes a sophisticated Makefile that manages the compilation of both images, handles the generation of the CMSE (Cortex-M Security Extensions) import library, and ensures that memory maps for both domains are correctly aligned according to the AN505 specification.

## Key Features

- **TrustZone-M Implementation**: Demonstrates the practical setup of Secure and Non-Secure project separation, including linker script management and vector table relocation.
- **QEMU Integration**: Tailored for the `mps2-an505` machine in QEMU, allowing for full system emulation without requiring physical hardware.
- **CMSIS-Based**: Utilizes CMSIS-Core and Device headers for the ARMCM33, ensuring industry-standard register access and startup routines.
- **Debugging Support**: Includes pre-configured GDB targets and QEMU monitor commands for inspecting CPU state and interrupts during execution.

## Getting Started

The project requires the Arm GNU Toolchain (specifically tested with `gcc-arm-none-eabi-8-2019-q3`) and a patched version of QEMU capable of emulating the AN505. 

### Build and Execution

The build process is centralized in the root Makefile. Users must define the paths to their local toolchain, CMSIS, and QEMU installations. Once configured, the system can be built and run with simple commands:

```bash
make        # Compiles both secure and non-secure images
make run    # Launches QEMU with both images loaded into memory
```

For debugging, the project supports a GDB server mode:

```bash
make gdbserver  # Starts QEMU in a waiting state
make gdb         # Connects the Arm GDB client to the session
```

## Hardware Emulation Details

The project targets the Arm CoreLink SSE-200 Subsystem as implemented in the AN505. This includes specific memory mapping for the MPC (Memory Protection Controller) and PPC (Peripheral Protection Controller), which are essential for defining which memory regions and peripherals are accessible to the Non-Secure code. The provided linker scripts (`gcc_arm.ld` and `gcc_arm_ns.ld`) are specifically adapted from the standard CMSIS templates to match the SIE-200 Memory Map Overview.
