---
title: Hail IoT Development Module
summary: Hail is a versatile IoT development module designed to run the Tock operating
  system, featuring a SAM4L Cortex-M4 microcontroller and an nRF51822 BLE radio. It
  integrates multiple environmental and motion sensors into a Particle Photon-compatible
  form factor for rapid prototyping and deployment.
slug: hail-iot-development-module
codeUrl: https://github.com/lab11/hail
siteUrl: https://www.tockos.org/hardware/
star: 8
lastUpdated: '2018-12-10'
rtos: tock
topics:
- ble
- hardware
- open-hardware
- tock
- university-project
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- nrf52840-m-2-developer-kit
- cyberboard-v2
- thingbot-subghz
- nrf54l15-connect-kit
- tinycore-esp32-s3-learning-platform
- objex-link
---

## Overview

Hail is a specialized IoT development module engineered to showcase the capabilities of the Tock operating system. It provides a robust hardware platform for developers looking to build secure, low-power embedded applications. By combining a powerful application processor with a dedicated Bluetooth Low Energy (BLE) radio and a suite of environmental sensors, Hail serves as a comprehensive reference design for modern IoT devices.

The board is designed with the Particle Photon form factor and pinout, making it compatible with a wide range of existing breadboards and accessories. This hardware choice facilitates easy prototyping while providing the advanced memory protection and isolation features offered by the Tock kernel.

## Hardware Architecture

The heart of the Hail module is the Atmel SAM4L, an ARM Cortex-M4 microcontroller known for its high efficiency and low power consumption. This processor handles the main application logic and interfaces with the onboard sensors. Connectivity is provided by a Nordic Semiconductor nRF51822 BLE radio, which allows the device to communicate with smartphones and other IoT gateways.

**Integrated Sensors include:**
- **SI7021**: High-accuracy temperature and humidity sensing.
- **ISL29035**: Digital light sensor for ambient light monitoring.
- **FXOS8700CQ**: A 6-axis sensor combining a 3D accelerometer and a 3D magnetometer for motion and orientation tracking.

## Software and Ecosystem

Hail is deeply integrated with the Tock ecosystem. Tock is a secure embedded operating system that allows multiple untrusted applications to run concurrently on a single microcontroller. The Hail repository provides the necessary infrastructure to support this environment, including a custom bootloader and commissioning tools.

### The Tock Kernel
While the kernel source resides in the main Tock repository, Hail is one of the primary supported boards. This integration allows developers to leverage Tock's process isolation and system call interface to build reliable firmware that is resistant to common bugs and security vulnerabilities.

### BLE Serialization
By default, the nRF51822 radio on Hail is programmed with a serialization application. This setup allows the SAM4L processor to control the BLE radio over a UART connection using standard SoftDevice commands. This architecture simplifies BLE development by offloading the complex radio stack management to the dedicated Nordic chip.

### Bootloader and Programming
Hail supports a software bootloader that enables firmware updates over USB. This eliminates the need for external JTAG or SWD programmers during standard development cycles. The `tockloader` utility is the recommended tool for managing applications and kernel images on the board, providing a seamless workflow for flashing and debugging.
