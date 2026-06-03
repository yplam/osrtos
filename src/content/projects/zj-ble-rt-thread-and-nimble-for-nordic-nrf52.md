---
title: 'ZJ-BLE: RT-Thread and NimBLE for Nordic nRF52'
summary: A comprehensive BLE 5.0 development platform for Nordic nRF52 series microcontrollers,
  integrating the RT-Thread RTOS with the Apache NimBLE protocol stack. It provides
  a fully open-source alternative to proprietary BLE stacks, utilizing Nordic SDK
  15.0 drivers and supporting the Keil MDK development environment.
slug: zj-ble-rt-thread-and-nimble-for-nordic-nrf52
codeUrl: https://github.com/ZJ-TEK/ZJ-RT-Thread-NIMBLE-NORDIC
siteUrl: http://bbs.codertown.cn
star: 32
lastUpdated: '2019-09-20'
rtos: rt-thread
libraries:
- nimble
topics:
- mynewt
- nimble
- nordic
- nrf51822
- nrf52832
- nrf52840
- rt-thread
- rtthread
- zj-ble
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rt-thread-nimble
- zj-sdk-rt-thread-for-nordic-nrf52840
- zj-tek-rt-thread-nimble-littlevgl-nordic-project
- n-able-arduino-core
- nrf52840-m-2-developer-kit
- ameba-rtos-sdk
---

## Overview

ZJ-BLE is an open-source project designed to bring a fully transparent and customizable Bluetooth Low Energy (BLE) 5.0 solution to the Nordic Semiconductor nRF52 series. By combining the power of the RT-Thread real-time operating system with the Apache NimBLE protocol stack, this project offers developers a robust alternative to proprietary vendor stacks. It is specifically tailored for the nRF52832 and nRF52840 platforms, providing a seamless integration of RTOS task management with high-performance wireless communication.

## Core Components

The project architecture is built upon several well-established open-source and industry-standard components:

- **RT-Thread V4.0**: A mature, widely-used RTOS that provides the kernel services, thread scheduling, and synchronization primitives required for complex embedded applications.
- **Apache NimBLE**: A complete, open-source BLE 5.0 stack (part of the Apache Mynewt project) that replaces the traditional Nordic SoftDevice. This allows for deep debugging and customization of the BLE controller and host layers.
- **Nordic SDK 15.0 (nrfx)**: The project utilizes the official Nordic nrfx drivers to interface with the hardware peripherals, ensuring high performance and reliability on the nRF52 silicon.

## Hardware and Toolchain Support

ZJ-BLE is optimized for the Nordic nRF52 series, specifically targeting the nRF52832 and nRF52840 SoCs. While the documentation focuses on these newer chips, the repository also includes application support for the legacy nRF51822. 

For development, the project is fully compatible with the **Keil MDK (Microcontroller Development Kit)**. This allows developers to use a familiar IDE for coding, compiling, and debugging their BLE applications. The inclusion of pre-configured project files simplifies the setup process, enabling users to get their hardware up and running quickly.

## Heart Rate Monitor (HRM) Example

To demonstrate the capabilities of the integrated stack, the project includes a Heart Rate Monitor (HRM) demonstration. This example showcases several key BLE functionalities:

- **Advertising**: The device broadcasts its presence using standard BLE advertising packets.
- **Device Information Service (DIS)**: Provides metadata about the hardware to connected peers.
- **Heart Rate Service (HRS)**: Simulates or transmits actual heart rate data to a central device (such as a smartphone app).

These examples serve as a template for developers looking to implement their own custom BLE profiles or standard GATT services within the RT-Thread environment.

## Technical Implementation

The integration leverages RT-Thread's device driver model and IPC (Inter-Process Communication) mechanisms to handle BLE events. By using NimBLE instead of a closed-source SoftDevice, developers have full visibility into the timing and execution of the Bluetooth stack, which is critical for power optimization and complex real-time behavior. The project structure separates the hardware abstraction layer (NORDIC_HAL), the RTOS kernel (RT_THREAD), and the protocol stack (Mynewt_NimBLE), making it easy to maintain and update individual components.
