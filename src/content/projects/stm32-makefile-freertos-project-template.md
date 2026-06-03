---
title: STM32 Makefile FreeRTOS Project Template
summary: A boilerplate project for STM32F10x microcontrollers using FreeRTOS and a
  Makefile-based build system. It integrates the STM32 Standard Peripheral Library
  and provides a ready-to-use environment for developing embedded applications with
  GNU ARM GCC and ST-Link.
slug: stm32-makefile-freertos-project-template
codeUrl: https://github.com/freelamb/stm32f10x_makefile_freertos
star: 46
lastUpdated: '2022-03-08'
rtos: freertos
topics:
- freertos
- gcc
- makefile
- stm32
- stm32f103
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f107-makefile-freertos-template
- stm32-base-project-template
- stm32-libopencm3-freertos-platformio-template
- stm32-rtic-project-template
- stm32f103rb-templates-and-examples
- stm32f1-rtos-example-project
---

The STM32 Makefile FreeRTOS project is a streamlined development template designed for engineers who prefer a command-line workflow over heavy integrated development environments (IDEs). By leveraging the GNU ARM GCC toolchain and a modular Makefile structure, it provides a robust foundation for building real-time applications on the STM32F10x series of microcontrollers.

### Project Architecture and Build System

At the heart of this project is a sophisticated Makefile system split into logical components. The main `Makefile` handles the primary build logic, while `makefile_std_lib.mk` and `makefile_freertos.mk` manage the inclusion of the STM32 Standard Peripheral Library and the FreeRTOS kernel, respectively. This modularity allows developers to easily swap out library versions or add new source directories without cluttering the main configuration.

The project includes a custom linker script, `stm32_flash.ld`, which defines the memory layout for a typical STM32F103 device with 64KB of Flash and 20KB of RAM. It handles the placement of the vector table, code sections, and initialized data, ensuring the binary is correctly mapped for the Cortex-M3 architecture.

### Integrated RTOS Support

FreeRTOS is integrated as a core component, with the build system configured to compile the kernel source, including the portable layer for ARM Cortex-M3 and the `heap_4.c` memory management scheme. This setup enables immediate use of tasks, queues, and semaphores in the user application code. The repository structure separates the RTOS kernel from user logic, maintaining a clean distinction between middleware and application code.

### Hardware and Debugging

While the template is generic for the STM32F10x family, it specifically highlights support for the popular STM32F103C8T6 (often found on "Blue Pill" boards). The provided example demonstrates basic hardware interaction, such as toggling an LED on GPIOB11 and using a UART for logging.

For deployment and debugging, the project integrates with the `stlink` utility. Developers can flash their firmware directly from the terminal and initiate debugging sessions using `st-util` combined with `arm-none-eabi-gdb`. This workflow is highly efficient for developers using lightweight text editors or modern cross-platform editors like VS Code or CLion.

### Getting Started

To use this project, ensure the GNU ARM Embedded Toolchain and `stlink` are installed on your system. The build process is straightforward and utilizes standard make commands:

```bash
# Build the project to generate .elf, .bin, and .hex files
make

# Flash the binary to the MCU using ST-Link
make flash

# Erase the MCU flash memory
make erase

# Clean build artifacts
make clean
```

The repository also includes a `build.sh` script for a one-touch "clean, build, and flash" cycle, further simplifying the development loop. For those using CLion, the project provides references for configuring the IDE to work with this Makefile-based structure, bridging the gap between CLI efficiency and IDE convenience.
