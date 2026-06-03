---
title: Blinky Pico 2 Dual Core Bare Metal
summary: A bare-metal implementation for the Raspberry Pi Pico 2 (RP2350) supporting
  both ARM Cortex-M33 and RISC-V Hazard3 architectures. It demonstrates dual-core
  boot sequences, clock initialization, and a basic blinky application without using
  the official SDK. The project is written in C11 with minimal assembly, providing
  a low-level starting point for RP2350 development.
slug: blinky-pico-2-dual-core-bare-metal
codeUrl: https://github.com/Chalandi/Blinky_Pico2_dual_core_nosdk
star: 21
lastUpdated: '2025-05-16'
rtos: ''
topics:
- no-sdk
- pi-pico2
- pico2
- rp2350
- rp2350b
- rp235x
isShow: true
image: /202602/pico-2.webp
createdAt: '2026-02-14'
updatedAt: '2026-02-14'
relatedProjects:
- pico-demos-for-rp2040
- rtic-blinky-for-nrf52840
- raspberry-pi-pico-freertos-sample-application
- lpc43xx-freertos-led-blinking-example
- seal-test-bare-bones-example
- micropython-for-bare-metal-raspberry-pi
---

The `Blinky_Pico2_dual_core_nosdk` project offers a deep dive into the low-level internals of the Raspberry Pi Pico 2, powered by the RP2350 microcontroller. Unlike most projects that rely on the official Raspberry Pi Pico SDK, this repository provides a completely manual, bare-metal implementation. It serves as an educational resource for developers who want to understand exactly what happens from the moment the processor leaves reset until the first LED blinks.

One of the most interesting features of the RP2350 is its dual-architecture support, featuring both ARM Cortex-M33 and RISC-V Hazard3 cores. This project fully embraces this flexibility, providing build paths for both architectures. Whether you are targeting the ARM or RISC-V instruction set, the repository demonstrates how to initialize the hardware and manage the boot process from scratch.

## Architecture and Startup

The application architecture follows a specific dual-core startup protocol. Core 0 is responsible for the initial heavy lifting: it sets up the C/C++ runtime environment, configures the system clocks and Phase-Locked Loops (PLLs) to bring the CPU to its full 150 MHz speed, and handles hardware settings like flash wait states. 

Once the environment is ready, Core 0 triggers the startup of Core 1 via a specific hardware protocol. In this specific example, Core 1 takes over the task of running the "blinky" LED application, while Core 0 enters a low-power idle loop. This separation of concerns is a classic example of how to manage multi-core systems at the register level.

## Technical Implementation

The project is implemented primarily in C11, adhering to a philosophy of using the absolute minimum amount of assembly language required. This makes the codebase highly readable and easier to port or modify. The timebase for the application is derived directly from the SysTick timer, ensuring consistent timing for the LED toggling without needing complex driver layers or external dependencies.

Key features include:
- **Dual-core support**: Booting both ARM and RISC-V cores.
- **Clock Initialization**: Manual configuration of PLLs and system clocks to 150 MHz.
- **Minimalist Design**: Minimal use of assembly and zero reliance on external SDKs.
- **Educational Build System**: A clear GNU Make-based system that produces ELF, HEX, and MAP files for analysis.

## Building the Project

For developers looking to move away from heavy frameworks, the build system is refreshingly simple. It uses standard GNU Make and provides straightforward shell scripts to compile for either architecture. 

To build for ARM:
```sh
./Rebuild.sh ARM
```

To build for RISC-V:
```sh
./Rebuild.sh RISC-V
```

The build results are organized into an `Output` directory, providing assembly list files that allow developers to inspect the generated machine code—a vital feature for bare-metal debugging and optimization. This repository is an excellent starting point for anyone looking to build their own lightweight RTOS, specialized firmware, or simply gain a better understanding of the RP2350 hardware without the abstraction of a vendor-supplied SDK.
