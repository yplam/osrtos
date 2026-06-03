---
title: 'TreeCore CPU: A Series of RISC-V Processors'
summary: A collection of 64-bit RISC-V processor cores developed from scratch using
  Verilog and Chisel3. The project features multiple iterations ranging from simple
  FSM models to multi-issue pipelined cores with cache support, capable of booting
  RT-Thread and running on FPGA platforms.
slug: treecore-cpu-a-series-of-risc-v-processors
codeUrl: https://github.com/microdynamics-cpu/tree-core-cpu
siteUrl: https://ysyx.org
star: 46
version: v0.0.5
lastUpdated: '2023-11-08'
rtos: rt-thread
topics:
- chisel
- cpu
- processor
- riscv
- rt-thread
- rtl
- scala
- softcore
- verilator
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rt-thread-for-picorv32-on-lichee-tang
- level-risc-v
- picorv32-rt-thread-on-lichee-tang-eg4s20
- apache-nuttx-rtos-on-64-bit-risc-v
- hbird-e203-rt-thread-on-lichee-tang
- fazyrv-a-scalable-risc-v-core
---

## Overview

TreeCore CPU is a series of RISC-V processors developed as part of the Open Source Chip Project by University (OSCPU), an initiative by the Institute of Computing Technology, Chinese Academy of Sciences (ICT, CAS). Known colloquially as the "One Life, One Chip" project, it aims to provide students and enthusiasts with the tools and knowledge to design their own processors using entirely open-source toolchains. 

The project follows an incremental learning philosophy. Rather than presenting complex architectural concepts all at once, TreeCore provides a step-by-step progression through different processor levels, allowing developers to build upon a simple model until a fully functional, high-performance core is achieved.

## Processor Generations

The TreeCore series is divided into several "Learning Levels" (L1 through L4), each representing a different stage of architectural complexity:

*   **TreeCoreL1**: A 64-bit Finite State Machine (FSM) implementation written in Verilog, serving as an introductory bundle for learning Verilator and Chisel modules.
*   **TreeCoreL2**: A more advanced 64-bit single-issue, five-stage pipeline core written in Chisel3. It supports the RISC-V Integer (I) instruction set, machine mode privilege levels, and AXI4 interfaces for instruction and memory access. Notably, it includes dynamic branch prediction and is capable of booting the RT-Thread RTOS.
*   **TreeCoreL3**: A 64-bit single-issue, five-stage pipeline core written in Verilog, featuring an integrated cache and custom software runtimes.
*   **TreeCoreL4**: A high-performance 64-bit two-issue, six-stage pipeline core written in Chisel3, currently under active development.

## Technical Architecture and Features

TreeCore processors are designed to be compatible with modern SoC environments. The TreeCoreL2, for instance, utilizes a standard AXI4 bus and provides a comprehensive memory map that includes support for CLINT (Core Local Interruptor), UART16550, SPI controllers, and Flash XIP mode. This compatibility allows the cores to be integrated into the ysyxSoC framework for more accurate system-level simulation.

Key architectural features include:
*   **Pipeline Design**: Five-to-six stage pipelines optimized for RISC-V ISA.
*   **Branch Prediction**: Dynamic branch prediction mechanisms to improve instruction throughput.
*   **Privilege Modes**: Support for Machine Mode, enabling the execution of real-time operating systems.
*   **Bus Interfaces**: AXI4-based memory and peripheral access.

## Development and Simulation Environment

The project leverages a robust open-source ecosystem for verification and testing. The simulation framework utilizes Verilator for RTL simulation, NEMU (New Emulator) as a golden model for differential testing (difftest), and DRAMsim3 for accurate memory simulation. 

Verification is handled through several test suites:
*   **ISA Tests**: Standard RISC-V compliance tests to ensure instruction accuracy.
*   **Benchmarks**: Support for CoreMark, Dhrystone, and Microbench to evaluate performance.
*   **SoC Tests**: Integration tests using the ysyxSoC project to simulate real-world hardware environments, including booting applications from Flash or memory loaders.

## Getting Started

The project is primarily targeted at Linux environments (specifically Ubuntu 20.04 LTS). The development workflow is automated via Makefiles, covering environment setup, library compilation (NEMU, DRAMsim3), and testcase building. Developers can run recursive unit tests to validate modifications to the processor design, with the framework providing real-time feedback on test progress, PASS/FAIL status, and IPC (Instructions Per Cycle) values.
