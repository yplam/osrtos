---
title: CMSIS-RTOS on micro:bit
summary: A project demonstrating the implementation of CMSIS-RTOS (RTX) on the BBC
  micro:bit v1.5 hardware. It integrates the ARM CMSIS_5 library and Nordic nrfx HAL
  to provide a real-time operating system environment for the nRF51 microcontroller.
codeUrl: https://github.com/SaitoYutaka/CMSIS-RTOS-microbit
isShow: false
rtos: cmsis
libraries: []
topics:
- arm
- cmsis
- microbit
- nrf51
- rtos
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- stm32f1-rtos-example-project
- qemu-emulation-for-ti-lm3s6965-cortex-m3
- raspberry-pi-pico-freertos-sample-application
- micro-ros-for-rt-thread
- stm32f103c8-freertos-cmsis-blink-example
- echronos-on-stm32f4x-nucleo-board
---

The BBC micro:bit is a staple in educational electronics, but beneath its simple exterior lies a capable Nordic nRF51 SoC based on the ARM Cortex-M0 architecture. While many developers interact with it via MicroPython or MakeCode, the **CMSIS-RTOS-microbit** project opens the door to professional-grade real-time operating system (RTOS) development using the ARM CMSIS-RTOS (RTX) standard.

### Project Overview

This project provides a complete environment for running CMSIS-RTOS RTX on the micro:bit version 1.5. By leveraging the CMSIS_5 framework and the Nordic `nrfx` hardware abstraction layer, it allows developers to utilize standard RTOS features like multi-threading, mutexes, semaphores, and mailboxes on the micro:bit's nRF51822 chip. This is particularly useful for those looking to transition from high-level block coding to low-level C development with a structured kernel.

### Technical Architecture

The project is built upon several key components:
- **CMSIS_5**: Specifically the RTX implementation of CMSIS-RTOS, providing the kernel and scheduling logic.
- **nrfx**: The standalone hardware abstraction layer for Nordic Semiconductor SoCs, used for low-level peripheral access.
- **Newlib**: A C standard library implementation intended for use on embedded systems.
- **GNU Arm Embedded Toolchain**: The project uses `arm-none-eabi-gcc` for cross-compilation.

The build system is managed via a Makefile that handles the compilation of the RTX kernel, the Nordic startup files, and the user application code. It also includes a specific patch (`disable-software_init_hook-rt_systick_init.patch`) to ensure compatibility between the RTOS tick initialization and the hardware startup sequence.

### Getting Started

Setting up the project involves a few steps to gather the necessary source dependencies. The author provides a helper script to automate the retrieval of the CMSIS, nrfx, and newlib sources:

```sh
$ ./get-src-build-newlib.sh
$ cd build
$ make
```

Once the build is complete, a `main.hex` file is generated. This can be flashed directly to a physical micro:bit by copying it to the device's USB drive interface.

### Debugging with QEMU

One of the most interesting features of this repository is the integrated support for QEMU. This allows developers to test and debug their RTOS applications in a simulated environment without needing the physical hardware on hand at all times. The project includes VS Code configuration files (`launch.json` and `tasks.json`) to streamline the debugging process.

To run the simulation, you can use the following command:

```sh
$ cd build
$ qemu-system-arm -M microbit -device loader,file=main.hex -serial stdio -s -S
```

This setup enables a GDB server that VS Code can attach to, providing a full source-level debugging experience including breakpoints and variable inspection for an RTOS running on a virtual micro:bit.

### Conclusion

CMSIS-RTOS-microbit is an excellent resource for embedded developers who want to explore the power of ARM's standard RTOS interface on accessible hardware. By bridging the gap between professional middleware and educational platforms, it serves as both a learning tool and a solid foundation for more complex micro:bit projects.
