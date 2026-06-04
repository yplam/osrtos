---
title: OpenHaystack Zephyr Firmware
summary: A firmware implementation of the OpenHaystack framework for tracking personal
  Bluetooth devices via Apple's Find My network. Built on the Zephyr RTOS, it enables
  various Bluetooth Low Energy devices to act as tracking tags by broadcasting advertisements.
  It supports multiple Nordic Semiconductor nRF52-based boards and can be integrated
  as a Zephyr module.
slug: openhaystack-zephyr-firmware
codeUrl: https://github.com/koenvervloesem/openhaystack-zephyr
star: 78
lastUpdated: '2022-06-10'
rtos: zephyr
topics:
- bbc-microbit
- ble
- bluetooth-low-energy
- find-my
- nrf52840
- openhaystack
- ruuvitag
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- send-my-sensor
- ruuvitag-firmware-for-zephyr-os
- esp32-watch-for-openhaystack
- open-display-firmware
- zephyr-rtos-for-dwm1001
- zephyr-native-meshtastic-stack
---

## Overview

The OpenHaystack Zephyr firmware project provides an open-source implementation of the OpenHaystack framework, allowing developers to create their own tracking tags compatible with Apple's Find My network. By leveraging the Zephyr Real-Time Operating System (RTOS), this project offers a highly portable and robust solution for a wide range of Bluetooth Low Energy (BLE) hardware.

OpenHaystack is a framework that enables the tracking of personal devices by broadcasting specific BLE advertisements that are picked up by the massive network of Apple devices. This firmware specifically handles the advertisement generation and broadcasting required for a device to appear within the OpenHaystack macOS application.

## Technical Implementation and RTOS Integration

The project is built using the Zephyr RTOS, which provides the underlying BLE stack and hardware abstraction layers. This choice of operating system allows the firmware to support a variety of microcontrollers with minimal code changes. The core logic is encapsulated as a Zephyr module, located in the `modules/openhaystack` directory, making it easy to integrate into larger, more complex Zephyr-based applications.

Currently, the firmware serves as a proof-of-concept. It implements the advertising of a single static public key. While it does not yet include advanced power management features, its structure as a Zephyr application provides a clear path for developers to implement power-saving states or additional sensor integration.

## Hardware Support

Because it is based on Zephyr, the firmware is compatible with many BLE-capable devices. It has been specifically tested and verified on several popular development platforms:

- **Nordic Semiconductor nRF52840 Dongle**: A versatile USB-based BLE development tool.
- **BBC micro:bit v2**: An educational board based on the nRF52833.
- **RuuviTag**: An nRF52832-based environmental sensor node.
- **April USB Dongle 52840 & makerdiary nRF52840 MDK**: Derivatives of the nRF52840 using the Adafruit bootloader.

## Customization and Deployment

A critical aspect of using this firmware is configuring the public key that identifies the tag within the Find My network. The project supports two primary methods for key configuration:

1.  **Source Modification**: Developers can directly initialize the `public_key` array in `main.c` with their raw 28-byte key.
2.  **Binary Patching**: For users who prefer not to rebuild from source, the project includes a script (`openhaypatch.sh`) that can patch the default placeholder string in the compiled `.bin` file.

```c
// Example of setting the public key in main.c
static char public_key[28] = {0x61, 0xc4, 0xc2, 0x55, ...};
```

## Build and Development Workflow

The project utilizes the Zephyr `west` meta-tool for workspace management, building, and flashing. This standardizes the development environment and simplifies dependency management. For boards supporting USB UART, a debug configuration is provided to allow developers to monitor logs via a serial terminal.

To build for a specific target, users typically use the following command structure:

```shell
west build -p auto -b $BOARD -s app
```

Beyond acting as a standalone tracker, the modular nature of the code allows it to be used in other projects, such as "Send My Sensor," which utilizes the OpenHaystack module to upload arbitrary sensor data through the Find My network infrastructure.
