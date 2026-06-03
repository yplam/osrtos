---
title: FreeRTOS Emulator
summary: A POSIX-based FreeRTOS implementation combined with SDL2 graphics for x86
  emulation. It provides a platform for teaching and developing FreeRTOS applications
  on standard PC hardware without requiring physical embedded devices.
slug: freertos-emulator
codeUrl: https://github.com/alxhoff/FreeRTOS-Emulator
siteUrl: https://alxhoff.github.io/FreeRTOS-Emulator/
star: 65
version: v1.3
lastUpdated: '2024-09-09'
rtos: freertos
topics:
- emulator
- freertos
- teaching-freertos
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- development-of-real-time-systems-assignments
- eclipse-simulator-for-lvgl-using-sdl
- freertos-for-raspberry-pi-3-64-bit
- tiny386
- unicorn-emulator-for-apache-nuttx-on-avaota-a1-arm64-sbc
- lvgl-demo-embarcadores
---

## Overview

The FreeRTOS Emulator is a specialized implementation of FreeRTOS designed to run on x86 architectures using the POSIX port. By combining the FreeRTOS kernel with SDL2 graphics, it creates a powerful environment for teaching and prototyping embedded systems software on standard Linux workstations. This project is notably used at the Technical University of Munich for their "Embedded Systems Programming Lab," allowing students to master RTOS concepts without the immediate need for physical microcontrollers.

## Technical Architecture

The emulator is built upon a foundation of several modular components that simulate a typical embedded environment:

- **FreeRTOS Kernel**: Uses a specific fork of the FreeRTOS-Kernel (updated to V10.5.0) to ensure tight control over the execution environment.
- **POSIX Port**: Enables the kernel to run as a standard Linux process, mapping RTOS tasks to POSIX threads while maintaining the scheduling behavior of FreeRTOS.
- **SDL2 Graphics Library**: Provides a visual interface for the emulator, allowing developers to create graphical outputs for their simulated embedded applications.
- **Asynchronous I/O**: Includes a dedicated library for handling communications via POSIX message queues and sockets, simulating real-world connectivity.
- **State Machine Framework**: Offers a structured way to implement task logic, helping users organize complex RTOS behaviors.

## Advanced Development Tools

One of the standout features of this emulator is its deep integration with modern development and analysis tools. Because it runs on x86 Linux, it can leverage a suite of tools that are often difficult to use on bare-metal hardware:

- **Static Analysis**: Built-in support for Clang Tidy and CppCheck to catch style violations and undefined behavior.
- **Dynamic Analysis**: Easy integration with Valgrind for memory checking and Google Sanitizers (Address, Undefined Behavior, and Thread sanitizers) to detect runtime errors.
- **Function Tracing**: An experimental tracing system using GCC's function instrumentation (`-finstrument-functions`). This allows developers to generate a `trace.out` file that logs function entries and exits with microsecond timestamps, which can then be converted into human-readable logs.

## Debugging and Signal Handling

Debugging an RTOS on top of a general-purpose OS presents unique challenges, particularly regarding signal handling. The emulator utilizes `SIGUSR1` and `SIG34` for internal IPC. To prevent GDB from interrupting the simulation constantly, the project provides a pre-configured `.gdbinit` file that instructs the debugger to ignore these specific signals, ensuring a smooth debugging experience in environments like VSCode or Eclipse.

## Getting Started

The project uses a standard CMake build system. Once dependencies like SDL2 development headers are installed, the project can be compiled and run directly from the terminal. The emulator is designed to be run from the `bin` directory to ensure that resource paths for fonts and graphics are correctly resolved.

```bash
cd build
cmake ..
make
cd ../bin
./FreeRTOS_Emulator
```

For those looking for a more structured development environment, the project includes templates for VSCode and can generate Eclipse CDT4 project files, making it a versatile choice for both classroom instruction and professional prototyping.
