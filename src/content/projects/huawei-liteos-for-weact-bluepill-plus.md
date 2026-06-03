---
title: Huawei LiteOS for WeAct BluePill Plus
summary: A port of Huawei LiteOS 5.1.0 for the GD32F303-based WeAct BluePill Plus
  development board. It features a system console, USB CDC serial communication, and
  USB HID mouse emulation using the libusb_stm32 stack.
slug: huawei-liteos-for-weact-bluepill-plus
codeUrl: https://github.com/koendv/liteos-bluepillplus
star: 1
version: v0.0
lastUpdated: '2021-08-21'
rtos: liteos
topics:
- gd32f303
- liteos
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- arm-mbed-os-blue-pill-usb-demo
- mbed-os-6-port-for-weact-stm32h743vit6
- rt-thread-nimble
- mbed-os-6-support-for-weact-black-pill-stm32f411ce
- pinephone-usb-driver-for-apache-nuttx-rtos
- stm32-bluepill-rndis-device-with-lwip
---

## Overview

This project provides a functional build of Huawei LiteOS 5.1.0 tailored for the GD32F303 microcontroller, specifically targeting the WeAct BluePill Plus development board. While originally based on the GD32F303RGT6_BearPi target, this repository includes the necessary patches to adapt the kernel and hardware abstraction layers for the BluePill Plus hardware, ensuring compatibility with its specific pinout and peripherals.

## Key Features

The implementation demonstrates the versatility of Huawei LiteOS on GD32 hardware through several integrated demos:

- **System Console**: A fully functional Huawei LiteOS shell accessible via serial0 (PA9/PA10), allowing for real-time interaction with the kernel.
- **USB CDC Serial**: Implements a USB communications device class that echoes back received characters, demonstrating serial-over-USB capabilities.
- **USB HID Device**: A Human Interface Device demo that moves the mouse cursor in small circles, showcasing interrupt-driven USB communication.
- **LED Control**: Basic GPIO management for status indication, adapted for the specific LED pin on the BluePill Plus.

## Technical Implementation

The project leverages the fact that the GD32F303 USB hardware is register-compatible with the STM32F103. It utilizes the `libusb_stm32` stack, a device-only USB stack optimized for speed and size on STM32 ARM microcontrollers. This choice provides a lightweight alternative to larger stacks like TinyUSB while maintaining high performance for embedded tasks.

To bridge the gap between the standard LiteOS BearPi target and the BluePill Plus, the project provides several critical patches:

- **Makefile Patches**: Updates the build system to generate binaries in Intel Hex format suitable for common flashing tools.
- **Linker Script Fixes**: Completes the memory mapping required for the GD32F303RGT6 to ensure the binary links correctly.
- **Hardware Adaptation**: A specific patch for the WeAct BluePill Plus reassigns the system LED from pin PB0 (used on the BearPi) to pin PB2.

## Getting Started

Developing with this project requires the `arm-none-eabi` GCC toolchain. Configuration is handled through the standard LiteOS `menuconfig` interface, where users should select the GD family and the GD32F303RGT6_BearPi target. 

```bash
# Example configuration via menuconfig
(Top) → Targets
    Family (GD)
    Target (GD32F303RGT6_BearPi)
[*] Enable Floating Pointer Unit
[*] Enable Access Permission Control
```

Once compiled, the firmware can be flashed using `stm32flash` via a USB-to-serial adapter connected to pins PA9 and PA10. The board must be placed in DFU mode (using the BOOT0 and RESET buttons) before the hex file can be transferred. Upon reboot, the system initializes the LiteOS kernel and launches the application scheduler, presenting the user with a greeting and a command prompt.
