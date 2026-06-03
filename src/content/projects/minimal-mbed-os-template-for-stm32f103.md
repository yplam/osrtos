---
title: Minimal Mbed OS Template for STM32F103
summary: A lightweight project template for developing applications on the STM32F103C8
  microcontroller using Mbed OS and PlatformIO. It features a streamlined configuration
  using newlib-nano to minimize memory footprint while providing full access to Mbed
  OS APIs.
slug: minimal-mbed-os-template-for-stm32f103
codeUrl: https://github.com/tsaarni/stm32f103-minimal-template
siteUrl: https://os.mbed.com/docs/
star: 1
lastUpdated: '2019-08-24'
rtos: mbed-os
topics:
- mbed-os
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- minimal-mbed-os-template-for-stm32f030
- stm32f1xx-bare-metal-template
- stm32-libopencm3-freertos-platformio-template
- stm32-makefile-freertos-project-template
- stm32f103-cmsis-libraries-and-projects
- stm32-rtic-project-template
---

The STM32F103C8, often found on the popular "Blue Pill" development boards, is a versatile microcontroller, but setting up a modern development environment for it can sometimes be cumbersome. This project provides a minimal, ready-to-use template for building applications on this hardware using Mbed OS.

While Mbed OS is a powerful RTOS with a rich set of APIs, it is often perceived as having a large memory footprint. This template addresses that concern by utilizing `newlib-nano`, a small-footprint variant of the C standard library. This optimization ensures that even with the RTOS overhead, there is significant flash memory remaining for complex application logic.

## Development with PlatformIO

The project is built around the PlatformIO ecosystem, which simplifies dependency management and build configurations. Instead of manually configuring toolchains, developers can use the provided `platformio.ini` to define the environment. The configuration targets the `genericSTM32F103RB` board (which is compatible with the C8 variant's instruction set) and sets the framework to `mbed`.

A notable feature in the configuration is the use of modern C++ standards. The template is configured to use C++17, allowing developers to leverage modern language features while working on resource-constrained embedded hardware.

## Application Configuration

Fine-tuning the RTOS behavior is handled through the `mbed_app.json` file. This template includes specific overrides to optimize the system for barebones STM32 hardware:

- **Clock Source**: It disables the Low Speed External (LSE) oscillator requirement (`target.lse_available: 0`), which is essential for boards that might lack a 32.768 kHz crystal.
- **Serial Communication**: The standard I/O (stdio) is mapped to `PA_9` (TX) and `PA_10` (RX) with a default baud rate of 115200, making it easy to view debug logs via a standard serial-to-USB adapter.

## Hardware Integration

For flashing and debugging, the project is designed to work with an ST-LINK/V2 programmer using the SWD (Serial Wire Debug) protocol. The minimal wiring requires connecting the SWDIO, SWCLK, GND, and 3.3V pins. Once connected, the PlatformIO integration allows for a seamless workflow:

```bash
# Compile and flash the firmware
pio run -t upload

# View serial debug logs
pio device monitor -b 115200
```

This template serves as an excellent starting point for developers who want the high-level abstractions of Mbed OS—such as its threading model, drivers, and networking stacks—without the complexity of setting up a project from scratch for the STM32F1 series.
