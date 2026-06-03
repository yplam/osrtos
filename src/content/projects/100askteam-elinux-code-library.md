---
title: 100askTeam eLinux Code Library
summary: A comprehensive documentation and code repository for embedded Linux development
  on DongshanPI and other development boards. It covers Linux C programming, driver
  development for GPIO, I2C, and SPI subsystems, and integration of middleware like
  LVGL and MQTT across NXP, ST, and Allwinner platforms.
slug: 100askteam-elinux-code-library
codeUrl: https://github.com/100askTeam/LinuxCodeLibrary
siteUrl: https://code.100ask.net
star: 12
lastUpdated: '2023-03-10'
rtos: ''
libraries:
- lvgl
topics:
- allwinner
- d1-h
- d1s
- imx6ull
- linuxc
- lvgl
- mqtt
- nxp
- sigmastar
- ssd210
- st
- stm32mp1
- t113
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- sama5d27-resource-sharing
- fctc-art-pi-code-iot-from-chip-to-cloud
- esp-lvgl
- stm32-cortex-m4-code-examples
- lvgl-for-embedded-linux
- blinker-iot-documentation
---

## Overview

The 100askTeam eLinux Code Library serves as a central knowledge base and implementation guide for developers working with embedded Linux on DongshanPI boards. Maintained by the 100ask Team, this repository bridges the gap between theoretical Linux concepts and practical hardware implementation across multiple SoC architectures, including ARM Cortex-A and RISC-V platforms.

## A Multi-Stage Learning Path

The project is organized into four distinct stages, designed to take a developer from basic environment setup to complex system-level integration:

### Stage 1: Linux C Programming Foundations
This section covers the essential tools of the trade, including Linux Shell commands, Makefile construction, and the GNU toolchain (GCC, GDB, Objdump). It also delves into core programming concepts such as File I/O, process and thread management, and network programming, providing the necessary background for application-level development.

### Stage 2: Component & Middleware Development
Focusing on higher-level abstractions, this stage includes significant resources for the **LVGL** (Light and Versatile Graphics Library) for creating embedded GUIs. It also covers audio/video components and networking stacks, including MQTT for IoT connectivity, which are critical for modern embedded devices.

### Stage 3: Device Driver Development
This is a deep dive into the Linux kernel's subsystem architecture. It provides specific driver examples for NXP (i.MX6ULL) and ST (STM32MP157) platforms. The documentation covers:
- **GPIO Subsystem**: Drivers for LEDs, keys, and sensors like the DHT11, DS18B20, and SR501.
- **I2C Subsystem**: Implementation for EEPROMs like the AT24C02.
- **SPI Subsystem**: Drivers for OLED displays and DAC modules.

### Stage 4: System Development
The final stage addresses the broader system architecture, including Git version control and platform-specific system builds. It provides guidance for NXP, ST, Allwinner (D1-H, T113, V853), and StarFive (SSD202) SoCs, helping developers understand how to bring up a full Linux distribution on custom hardware.

## Hardware Platform Support

One of the repository's primary strengths is its broad hardware compatibility. It provides tailored documentation and code for several popular embedded SoCs:
- **NXP i.MX6ULL**: Detailed driver and system support for the Pro and Mini variants.
- **ST STM32MP157**: Comprehensive coverage for the MP157 Pro development boards.
- **Allwinner Technology**: Support for the RISC-V based Nezha D1-H, as well as the T113 and V853 SoCs.
- **StarFive**: Resources for the SSD202Pro platform.

## Practical Implementation and Drivers

The library doesn't just provide code; it explains the interaction with the Linux kernel subsystems. For instance, the GPIO subsystem documentation includes practical examples for various sensors and actuators, such as the SR501 PIR sensor, SR04 ultrasonic sensor, and HS0038 infrared receiver. By providing side-by-side examples for different SoCs (NXP vs. ST), it helps developers understand the portability and platform-specific nuances of Linux driver development.

## Middleware Integration

For modern embedded applications, the repository highlights the integration of the LVGL graphics library. It provides specific examples for running LVGL on the i.MX6ULL and STM32MP157 platforms, enabling developers to build sophisticated user interfaces on embedded Linux. Additionally, the inclusion of MQTT components facilitates the development of connected IoT devices, providing a clear path from local hardware control to cloud-based communication.

This repository is an essential companion for anyone using 100ask development boards or looking to deepen their understanding of the embedded Linux ecosystem through practical, well-documented examples.
