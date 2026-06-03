---
title: ZJ-SDK RT-Thread for Nordic nRF52840
summary: A specialized software development kit for the ZJ-TEK nRF52840 development
  board, integrating the RT-Thread V4.0 real-time operating system with Nordic SDK
  15.0. It provides a complete firmware framework for nRF52 series microcontrollers
  with support for LCD displays, 9-axis sensors, and QSPI flash.
slug: zj-sdk-rt-thread-for-nordic-nrf52840
codeUrl: https://github.com/ZJ-TEK/ZJ-SDK-RT-Thread-NORDIC
siteUrl: http://bbs.codertown.cn
star: 80
lastUpdated: '2022-11-22'
rtos: rt-thread
topics:
- ant
- ble
- finsh
- nordic
- nrf51800
- nrf52832
- nrf52840
- rt-thread
- rtthread
- zj-ble
- zj-sdk
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zj-ble-rt-thread-and-nimble-for-nordic-nrf52
- zj-tek-rt-thread-nimble-littlevgl-nordic-project
- golioth-zephyr-sdk
- nuclei-software-development-kit-nuclei-sdk
- kendryte-k210-freertos-sdk
- ameba-rtos-sdk
---

## Overview

The ZJ-SDK-RT-Thread-NORDIC project is a comprehensive software development kit (SDK) designed specifically for the ZJ-TEK nRF52840 development board, also known as the "CaoMengDe" board. By combining the power of the RT-Thread V4.0 real-time operating system with the official Nordic Semiconductor SDK 15.0, this project provides a robust foundation for building complex Bluetooth Low Energy (BLE) and IoT applications.

While the primary target is the nRF52840, the SDK is designed with flexibility in mind, allowing developers to easily adapt the code for the nRF52832 chip. This makes it a versatile choice for developers working across the Nordic nRF52 family.

## Technical Architecture

The SDK architecture is built on three main pillars:
1.  **RT-Thread V4.0 Kernel**: Provides the multitasking environment, semaphore management, and standard RTOS primitives required for modern embedded applications.
2.  **Nordic SDK 15.0**: Leverages the official hardware abstraction layers (HAL) and BLE stacks provided by Nordic Semiconductor to ensure high performance and reliability.
3.  **ZJ-TEK Board Support Package (BSP)**: Includes specific drivers and application code for the unique hardware features found on the CaoMengDe development board.

## Hardware Capabilities

The SDK is pre-configured to support a wide array of onboard peripherals, making it suitable for wearable devices, sensor nodes, and human-machine interface (HMI) prototypes. Key hardware resources supported include:

- **Display**: A 240x240 color LCD for visual feedback and user interfaces.
- **Sensors**: Integrated support for the MPU9250 nine-axis motion sensor (accelerometer, gyroscope, and magnetometer).
- **Storage**: 8MB of NorFlash connected via a high-speed QSPI interface, alongside 2048 bits of EEPROM for configuration data.
- **Connectivity**: Full utilization of the nRF52840's BLE capabilities and NFC functionality.
- **Debugging**: Integrated DAPLink support for drag-and-drop firmware updates and easy debugging.
- **User Interface**: Support for 4 programmable LEDs and 4 user buttons.

## Development Environment

To accommodate different developer workflows, the project supports the two most popular integrated development environments (IDEs) in the ARM Cortex-M ecosystem:
- **Segger Embedded Studio (SES)**: A powerful, cross-platform IDE that is free for use with Nordic devices.
- **Keil MDK**: The industry-standard development environment for ARM-based microcontrollers.

The repository is organized into clear directories, separating the RT-Thread kernel, the Nordic HAL, and specific application code for both the nRF52840 and nRF52832 targets. This structure allows developers to quickly locate drivers or start new application logic without navigating through unrelated middleware.
