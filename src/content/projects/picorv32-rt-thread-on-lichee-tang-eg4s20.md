---
title: Picorv32 + RT-Thread on Lichee Tang (EG4S20)
summary: A project demonstrating the integration of the RT-Thread RTOS with the Picorv32
  RISC-V soft core on the Lichee Tang EG4S20 FPGA. It provides the necessary Verilog
  source for the processor and the firmware build system to run a real-time operating
  system on custom hardware.
slug: picorv32-rt-thread-on-lichee-tang-eg4s20
codeUrl: https://github.com/wuhanstudio/picorv32_EG4S20
star: 15
lastUpdated: '2023-10-03'
rtos: rt-thread
topics:
- lichee-tang
- picorv32
- picosoc
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rt-thread-for-picorv32-on-lichee-tang
- hbird-e203-rt-thread-on-lichee-tang
- cmsis-rtos-on-micro-bit
- freertos-port-for-risc-v
- echronos-on-stm32f4x-nucleo-board
- raspberry-pi-pico-freertos-sample-application
---

## Overview

The picorv32_EG4S20 project provides a complete implementation of the RT-Thread Real-Time Operating System running on a Picorv32 RISC-V soft core. This implementation is specifically targeted at the Lichee Tang (EG4S20) FPGA, showcasing how open-source hardware and software can be combined to create a functional RISC-V embedded system.

Picorv32 is a size-optimized RISC-V CPU core that implements the RV32I instruction set, making it an ideal candidate for FPGA-based soft processors. By porting RT-Thread—a popular, small, and fast RTOS—to this core, the project enables developers to utilize high-level multitasking and system services on custom silicon logic.

## Key Features

- **RISC-V Soft Core**: Utilizes the Picorv32 processor, providing a standard RV32I execution environment.
- **RTOS Integration**: Runs RT-Thread 3.1.3, offering a stable environment for real-time applications.
- **FPGA Resource Utilization**: Designed for the Anlogic EG4S20 (Lichee Tang), utilizing various IP cores including PLL, SDRAM, ROM, and UART.
- **Complete Toolchain Workflow**: Includes instructions for building the firmware using the RISC-V GCC toolchain and converting binaries into Memory Initialization Files (MIF) for FPGA ROM loading.

## Technical Implementation

The repository is structured into two primary components: the FPGA hardware design and the software firmware. The hardware side includes the Verilog source for the Picorv32 core, a simple UART for console output, and an SDRAM controller. 

The software side utilizes RT-Thread Nano, a lightweight version of the RTOS. The build process involves compiling the C-based firmware into a binary format, which is then processed by a Python script (`bin2mif.py`) to create a format suitable for initializing the FPGA's internal memory. This allows the processor to begin executing the RTOS immediately upon power-up or reset.

## Hardware Support

The project is specifically tailored for the **Lichee Tang** board, which features the **Anlogic EG4S20** FPGA. The design includes several critical IP cores to support the operating system:
- **PLL**: For clock management.
- **SDRAM**: Providing external memory for the RTOS and applications.
- **ROM**: For storing the initial boot firmware.
- **UART**: For the RT-Thread FinSH console (msh).

## Getting Started

To use this project, developers need the `riscv32-unknown-elf-gcc` toolchain for firmware compilation and the Tang Dynasty (TD) IDE for FPGA bitstream generation. The workflow follows a three-step process: building the RT-Thread firmware using CMake, converting the resulting binary to a MIF file, and finally generating and uploading the bitstream to the FPGA board. Once flashed, the system provides a functional RT-Thread shell over the UART interface, allowing for interactive command execution.
