---
title: RT-Thread for Picorv32 on Lichee Tang
summary: A project demonstrating the RT-Thread RTOS running on a Picorv32 RISC-V soft
  core implemented on the Lichee Tang (EG4S20) FPGA board. It includes the FPGA bitstream
  project and the RT-Thread Nano firmware port for the RISC-V architecture.
slug: rt-thread-for-picorv32-on-lichee-tang
codeUrl: https://github.com/wuhanstudio/picorv32_tang
star: 29
lastUpdated: '2023-10-03'
rtos: rt-thread
topics:
- fpga
- picorv32
- risc-v
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- picorv32-rt-thread-on-lichee-tang-eg4s20
- hbird-e203-rt-thread-on-lichee-tang
- freertos-port-for-risc-v
- rt-thread-smart-porting-for-risc-v-qemu-and-k210
- cmsis-rtos-on-micro-bit
- treecore-cpu-a-series-of-risc-v-processors
---

The picorv32_tang project brings together two powerful open-source technologies: the Picorv32 RISC-V CPU core and the RT-Thread Real-Time Operating System. Specifically targeting the Lichee Tang (EG4S20) FPGA board, this repository provides a complete environment for running a modern RTOS on a custom soft-core processor.

Picorv32 is a size-optimized RISC-V CPU core that implements the RV32I instruction set. By deploying this core on the Lichee Tang FPGA, developers can create a custom SoC (System on Chip) environment. RT-Thread, a burgeoning RTOS known for being small, stable, and fast, provides the software foundation, offering a robust environment for embedded applications.

## Project Structure

The project is structured into two main components:
- **FPGA Soft Core**: Located in the `picorv32_EG4S20` directory, this contains the hardware description and project files necessary to instantiate the RISC-V core on the EG4S20 chip.
- **Firmware**: The `rtthread-nano` directory contains the RTOS port, specifically configured as a Board Support Package (BSP) for the Picorv32 core.

## Technical Workflow

To get the system running, the workflow involves several distinct steps that bridge the gap between software compilation and hardware synthesis:

1.  **Firmware Compilation**: The RT-Thread operating system is built using the `riscv32-unknown-elf-gcc` toolchain. This process generates a standard binary file (`rt-thread.bin`).
2.  **Memory Initialization**: Because FPGAs typically initialize internal memory (BRAM) using specific formats, the project includes a `bin2mif` utility. This Python script converts the compiled binary into a Memory Initialization File (MIF), which is then used by the FPGA synthesis tool to pre-load the firmware into the processor's instruction memory.
3.  **Bitstream Generation**: Using the Tang Dynasty (TD) IDE, the FPGA project is synthesized, and a bitstream is generated. This bitstream includes both the Picorv32 CPU logic and the pre-loaded RT-Thread firmware.

## Interaction and Usage

Once the bitstream is flashed to the Lichee Tang board, the system boots into the RT-Thread environment. Users can interact with the system through the FinSH shell (msh), which provides a command-line interface over a serial connection. This allows for real-time interaction with the RTOS running inside the FPGA-based RISC-V core.

This project serves as an excellent reference for developers interested in RISC-V soft cores, FPGA-based SoC design, and RTOS porting. It demonstrates the feasibility of running a full-featured RTOS on a minimal RISC-V implementation within a cost-effective FPGA environment.
