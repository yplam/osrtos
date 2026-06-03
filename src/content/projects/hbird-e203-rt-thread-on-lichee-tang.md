---
title: Hbird E203 + RT-Thread on Lichee Tang
summary: This project integrates the RT-Thread RTOS with the HBird E203 RISC-V soft
  core on the Lichee Tang EG4S20 FPGA. It provides a complete workflow for flashing
  the FPGA bitstream and building the RT-Thread firmware using the Nuclei SDK.
slug: hbird-e203-rt-thread-on-lichee-tang
codeUrl: https://github.com/wuhanstudio/hbird_e203_tang
star: 12
lastUpdated: '2021-01-18'
rtos: rt-thread
topics:
- e203
- fpga
- risc-v
- rt-thread
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- picorv32-rt-thread-on-lichee-tang-eg4s20
- rt-thread-for-picorv32-on-lichee-tang
- nuclei-software-development-kit-nuclei-sdk
- stm32f1-rtos-example-project
- rt-thread-smart-porting-for-risc-v-qemu-and-k210
- cmsis-rtos-on-micro-bit
---

## Overview

The Hbird E203 + RT-Thread project brings together two powerful open-source ecosystems: the RISC-V architecture and the RT-Thread Real-Time Operating System. By targeting the Lichee Tang (EG4S20) FPGA board, this repository demonstrates how to deploy a functional RISC-V soft core and run a modern RTOS on top of it.

At the heart of this project is the **HBird E203 (蜂鸟 E203)**, an open-source RISC-V CPU core designed for low power and high efficiency. To provide a robust software environment, the project utilizes **RT-Thread**, a burgeoning RTOS known for its small footprint, stability, and high performance in embedded systems.

## Hardware and Software Components

The project is structured around two main components, managed as Git submodules:
- **FPGA Soft Core**: The HBird E203 implementation tailored for the Lichee Tang board.
- **Firmware**: The RT-Thread operating system integrated with the Nuclei SDK.

The Lichee Tang board, based on the Anlogic EG4S20 FPGA, acts as the physical platform. Once the bitstream is uploaded, the FPGA effectively becomes a RISC-V development board, capable of executing standard RISC-V instructions and running complex software stacks.

## Technical Implementation

The integration relies on the Nuclei SDK to provide the necessary drivers and hardware abstraction layers for the E203 core. The build system is configured to target the `hbird` SOC and the `hbird_eval` board configuration. Communication with the board for debugging and firmware uploading is handled via JTAG, allowing for a standard professional development workflow.

### Development Workflow

Deploying the system involves a two-step process:
1. **FPGA Configuration**: Using the Tang IDE, developers generate and flash the bitstream to the EG4S20 FPGA. This step defines the hardware architecture of the RISC-V core.
2. **Firmware Compilation**: The RT-Thread firmware is compiled using the Nuclei toolchain (GCC and OpenOCD). The project includes a FinSH shell (msh), which provides a command-line interface directly on the embedded device upon boot.

```bash
# Example build command
$ make SOC=hbird BOARD=hbird_eval CORE=e203 upload
```

## Key Features

- **Open Source RISC-V**: Leverages the SI-RISCV E200 series open-source core.
- **Real-Time Capabilities**: RT-Thread provides multi-threading, semaphores, and a modular architecture suitable for IoT and industrial applications.
- **Interactive Shell**: Includes the RT-Thread FinSH console, allowing users to interact with the system via a serial terminal.
- **Extensible SDK**: Built upon the Nuclei SDK, making it easier to port existing RISC-V applications to the platform.

This project serves as an excellent starting point for developers interested in RISC-V hardware-software co-design and those looking to explore RTOS deployment on FPGA-based soft cores.
