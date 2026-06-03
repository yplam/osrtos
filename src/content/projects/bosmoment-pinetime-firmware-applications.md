---
title: Bosmoment PineTime Firmware Applications
summary: A collection of firmware applications and modules for the PineTime smartwatch
  based on the RIOT operating system. It features a graphical user interface powered
  by LVGL and Bluetooth 5.0 connectivity using the NimBLE stack.
slug: bosmoment-pinetime-firmware-applications
codeUrl: https://github.com/bosmoment/PineTime-apps
star: 78
lastUpdated: '2020-03-09'
rtos: riot
libraries:
- lvgl
- nimble
topics:
- c
- embedded
- littlefs
- littlevgl
- nimble
- pinetime
- riot
- riot-os
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- infinitime
- pinetime-zephyr-firmware
- hypnos
- pinetime-rs
- wasp-os
- zephyrwatch
---

## Overview

The Bosmoment PineTime-apps repository provides a specialized firmware environment for the PineTime open-source smartwatch. Built on the RIOT operating system, this project offers a modular approach to smartwatch firmware, integrating high-quality open-source components to provide a functional and extensible user experience. 

The project leverages the nRF52832 SoC's capabilities to deliver features like Bluetooth LE connectivity, real-time timekeeping, and a touch-driven graphical interface. It is designed for developers who want to build custom watch faces or applications while utilizing a robust, real-time foundation.

## Technical Architecture

The firmware is constructed using three primary pillars:

- **RIOT OS**: A microkernel-based operating system designed for the Internet of Things, providing the underlying scheduling, hardware abstraction, and power management.
- **NimBLE**: An Apache-licensed Bluetooth 5.0 stack that handles all wireless communication, including GATT services and secure pairing.
- **LVGL (LittlevGL)**: A powerful and open-source graphics library used to create the watch's user interface, supporting smooth animations and touch interactions.

## Key Features

### Connectivity and Synchronization
Bluetooth LE support is a core component of the firmware. It includes a GATT Current Time Service client for automatic time synchronization with a host device. The firmware supports Bluetooth pairing and bonding, though currently, bonds are stored in volatile memory. To facilitate easy identification, the device uses a custom UUID (9851dc0a-b04a-1399-5646-3b38788cb1c5), which is compatible with specialized forks of the GadgetBridge Android application.

### User Interface
The graphical interface supports multiple watch faces with smooth scrolling transitions. The default watch face displays the time, date, battery status, and Bluetooth connection state. The project also includes proof-of-concept faces for notifications and activity tracking, demonstrating the flexibility of the widget system.

### Hardware Integration
- **Touch Support**: Includes a driver for the cst816s touch screen with gesture support.
- **Timekeeping**: Uses the nRF52832 RTC for accurate time and date updates.
- **Watchdog Timer**: For system reliability, a watchdog timer runs with a 5-second timeout. It is automatically reset every second unless the physical button is held down, allowing for a manual system reset.
- **Logging**: STDIO is implemented via the Segger RTT protocol, providing a non-intrusive way to debug the system while it is running.

## Project Structure

The repository is organized to encourage modularity and reuse:

- **apps**: Contains the main firmware entry points, such as the primary `pinetime` application.
- **modules**: Houses shared logic and drivers that support the firmware applications.
- **widgets**: A collection of user-facing components, including stopwatches, heartbeat graphs, and configuration menus.

## Getting Started

Developers looking to build or modify the firmware should first ensure that the RIOT submodule is initialized. The build system is based on standard Makefiles. Within an application directory (like `apps/pinetime`), users can compile the firmware using `make all`. Flashing is typically handled via Segger J-Link tools, though the build system allows for overriding these settings to support other programmers.

For those interested in the companion experience, a fork of GadgetBridge is available that recognizes the custom UUID of this firmware, enabling encrypted communication and secure time synchronization between the smartphone and the watch.
