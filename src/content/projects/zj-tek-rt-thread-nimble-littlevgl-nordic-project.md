---
title: ZJ-TEK RT-Thread NimBLE LittlevGL Nordic Project
summary: An integrated application project for Nordic nRF52840 and nRF52832 platforms
  featuring the RT-Thread RTOS, NimBLE BLE 5.0 stack, and LittlevGL (LVGL) graphics
  library. It demonstrates a complete embedded system solution including heart rate
  monitoring (HRM) and graphical user interface components.
slug: zj-tek-rt-thread-nimble-littlevgl-nordic-project
codeUrl: https://github.com/ZJ-TEK/ZJ_RT_Thread_NimBLE_LittlevGL_Nordic
siteUrl: http://bbs.codertown.cn
star: 7
lastUpdated: '2019-10-08'
rtos: rt-thread
libraries:
- nimble
- lvgl
topics:
- gui
- littlevgl
- mynewt
- nimble
- nordic
- nrf52840
- rt-thread
- rtthread
- zj-ble
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zephyr-lvgl-sample-for-nrf52840-mdk
- zj-ble-rt-thread-and-nimble-for-nordic-nrf52
- lvgl-demo-embarcadores
- zj-sdk-rt-thread-for-nordic-nrf52840
- zig-lvgl-touchscreen-app-on-apache-nuttx-rtos
- stm32l476g-discovery-rtos-sensor-project
---

## Overview

The ZJ-TEK project provides a comprehensive integration of several major open-source embedded technologies onto the Nordic Semiconductor nRF52 series hardware. By combining the RT-Thread real-time operating system with the Apache Mynewt NimBLE Bluetooth Low Energy (BLE) stack and the LittlevGL (LVGL) graphics library, this repository serves as a robust foundation for developing sophisticated IoT devices with rich user interfaces.

## Core Technologies

This project leverages a powerful stack of open-source components to provide a full-featured development environment:

- **RT-Thread V4.0**: A mature, Chinese-originated open-source RTOS that provides the kernel services, thread management, and synchronization primitives required for complex embedded applications.
- **Apache Mynewt NimBLE**: A completely open-source BLE 5.0 protocol stack. Unlike proprietary stacks, NimBLE allows for deep inspection and customization of the Bluetooth communication layer.
- **LittlevGL (LVGL) v6.02**: A popular graphics library used to create beautiful embedded GUIs. In this project, it is used to render heart rate data and system information on local displays.
- **Nordic nrfx Drivers**: The project utilizes the hardware abstraction layer from Nordic SDK 15.0, ensuring efficient peripheral control for the nRF52840 and nRF52832 SoCs.

## Hardware and Development Environment

The project is specifically tailored for the Nordic nRF52840 and nRF52832 Bluetooth chips. These SoCs are widely used in the industry for their low power consumption and high performance. For development, the project supports the Keil MDK (Microcontroller Development Kit) integrated development environment, providing a familiar workflow for professional firmware engineers.

## Key Features and Demonstrations

The repository includes a Heart Rate Monitor (HRM) example that showcases the synergy between the BLE stack and the UI library. The demonstration includes:

- **BLE Advertising**: The device broadcasts HRM data, which can be discovered by standard BLE scanners.
- **Device Information Service**: Exposure of system metadata via BLE GATT services.
- **Graphical Interface**: Real-time heart rate visualization and UI screens rendered via LittlevGL.

The project structure is organized to separate the RTOS kernel, the BLE stack, the HAL (Hardware Abstraction Layer), and the application logic, making it a useful reference for developers looking to port similar stacks to other Nordic-based hardware.
