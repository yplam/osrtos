---
title: Arm Mbed OS Blue Pill USB Demo
summary: A demonstration project for the STM32F103C8 'Blue Pill' board using the Arm
  Mbed OS USB stack. It features a custom linker configuration to support the 128KB
  flash variants commonly found on these boards and provides a foundation for implementing
  USB communication on low-cost STM32 hardware.
slug: arm-mbed-os-blue-pill-usb-demo
codeUrl: https://github.com/codetent/mbed-os-blue-pill-usb-demo
star: 7
lastUpdated: '2018-06-19'
rtos: mbed-os
topics:
- blue-pill
- bluepill
- mbed
- mbed-os
- stm32f103
- stm32f103c8t6
- usb
- usb-cdc
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- bluepill-board-support-for-mbed-os-6
- stm32-libopencm3-freertos-platformio-template
- minimal-mbed-os-template-for-stm32f103
- mbed-os-6-support-for-weact-black-pill-stm32f401cc
- ip-over-usb
- stm32f103c8-freertos-cmsis-blink-example
---

The "Blue Pill" STM32F103C8 board is a staple in the hobbyist and professional embedded community due to its low cost and versatile ARM Cortex-M3 core. This project provides a practical demonstration of integrating the Arm Mbed OS USB stack with this hardware, enabling developers to implement USB-based communication protocols efficiently.

### Overcoming Hardware Limitations

One of the unique aspects of this project is its handling of the STM32F103C8's memory layout. While officially specified with 64KB of flash, many "Blue Pill" boards are shipped with chips that actually contain 128KB. To take advantage of this, the project utilizes a custom linker file. This modification ensures that the Mbed OS environment can fully utilize the available memory, which is often necessary given the footprint of a full RTOS and USB stack.

### Technical Configuration

The project is configured using `mbed_app.json`, which includes specific target overrides for the `BLUEPILL_F103C8`. A notable configuration is the `INITIAL_SP` macro, set to `0x20005000UL`, which defines the initial stack pointer. The build system is managed via a standard Makefile that wraps `mbed-cli` commands, providing a streamlined workflow for compiling with debug symbols or creating release builds.

### USB Integration

By leveraging the built-in Mbed OS USB stack, the demo simplifies the process of setting up USB Serial or other USB device classes. Mbed OS abstracts the complex register-level configuration of the STM32 USB peripheral, allowing developers to focus on application logic rather than low-level driver implementation. The project includes the necessary configuration files (`mbed_config.h`) to ensure the RTOS and its drivers are correctly initialized for the STM32F1 series.

### Development Workflow

The project is designed to be built using the GNU Arm Embedded Toolchain and flashed using the STM32 ST-LINK Utility. The included Makefile provides convenient targets for common development tasks:

- **Build**: Compiles the project with debug symbols using the Mbed debug profile.
- **Release**: Compiles an optimized version for deployment.
- **Run**: Builds and automatically flashes the binary to the board using the ST-LINK CLI via SWD.

This demo serves as an excellent starting point for developers looking to build USB-enabled devices on the STM32 platform using a modern, RTOS-based framework while navigating the specific quirks of the Blue Pill hardware ecosystem.
