---
title: RT-Thread NimBLE
summary: A port of the Apache NimBLE Bluetooth 5.0 stack for the RT-Thread RTOS. It
  provides full Host and Controller layer support for Nordic nRF51 and nRF52 series
  microcontrollers, as well as a Host-only mode for external controllers via HCI UART.
slug: rt-thread-nimble
codeUrl: https://github.com/RT-Thread-packages/nimble
siteUrl: http://mynewt.apache.org/latest/network/docs/index.html
star: 138
version: v1.0.0
lastUpdated: '2023-01-15'
rtos: rt-thread
libraries:
- nimble
topics:
- '52832'
- ble
- ble5
- bluetooth
- nimble
isShow: true
createdAt: '2026-01-01'
updatedAt: '2026-01-04'
relatedProjects:
- zj-ble-rt-thread-and-nimble-for-nordic-nrf52
- n-able-arduino-core
- arduino-serial-ble
- zj-tek-rt-thread-nimble-littlevgl-nordic-project
- nimble-arduino
- uc-modbus-for-rt-thread
---

## Overview

RT-Thread NimBLE is a high-performance Bluetooth Low Energy (BLE) protocol stack port for the RT-Thread real-time operating system. Based on the open-source Apache NimBLE project—originally part of the Apache Mynewt ecosystem—this package provides a complete, memory-efficient BLE 5.0 solution. It is designed to replace proprietary stacks like Nordic's SoftDevice, offering developers full control over both the Host and Controller layers of the Bluetooth protocol.

## Key Features and Capabilities

The stack is feature-rich, supporting modern Bluetooth specifications that enhance range, speed, and reliability. Key technical highlights include:

- **LE Advertising Extensions**: Support for extended advertising data.
- **High-Speed PHY**: 2Mbit/s physical layer for faster data throughput.
- **Coded PHY**: Support for LE Long Range communication.
- **Mesh Networking**: Comprehensive Mesh support including Advertising and GATT bearers, Relay support, and GATT Proxy.
- **Security**: Robust security management with LE Secure Connections and Transport Specific Key Distribution.
- **Multi-Role Support**: Concurrent operation of Central, Peripheral, Observer, and Broadcaster roles.

Beyond the core protocol, the package includes built-in support for numerous standard BLE Profiles and Services, such as Heart Rate (HRS), Battery Service (BAS), Device Information (DIS), and Cycling Speed and Cadence (CSC).

## Technical Architecture

The project is structured to provide flexibility depending on the hardware target. In its 1.0 release, it supports full deployment (both Host and Controller) on Nordic nRF51 and nRF52 series chips. In more recent versions, the stack can be configured to run the Host layer on a primary MCU while communicating with an external Bluetooth Controller via a standard HCI interface over UART.

The repository is organized into several key directories:
- `nimble/`: Contains the core stack implementation (Host, Controller, and Drivers).
- `porting/`: Houses the OS Abstraction Layer (NPL) specifically implemented for RT-Thread.
- `apps/`: Includes a variety of sample applications ranging from simple beacons to complex Mesh nodes.
- `ext/`: Includes third-party dependencies like the Tinycrypt library for cryptographic operations.

## Hardware Support

RT-Thread NimBLE is optimized for the Nordic Semiconductor nRF5x family, specifically the nRF51, nRF52832, and nRF52840. It has also been successfully integrated into development platforms like the ART-Pi and can be tested in simulated environments using QEMU combined with external Bluetooth controller hardware.

## Getting Started

Integrating NimBLE into an RT-Thread project is managed through the RT-Thread online package manager. Users can enable the package and configure specific roles (Central/Peripheral), log levels, and HCI transport settings through the `menuconfig` interface. 

For developers looking to jumpstart their application, the `apps/` directory provides numerous templates. For example, the `bleprph` sample demonstrates a standard peripheral device with GATT services, while `blemesh` provides a foundation for building interconnected mesh networks. Detailed documentation and API references are available through the Apache Mynewt official documentation, which serves as the primary technical resource for the underlying stack logic.
