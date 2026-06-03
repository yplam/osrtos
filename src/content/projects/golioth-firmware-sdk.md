---
title: Golioth Firmware SDK
summary: A comprehensive software development kit for connecting embedded devices
  to the Golioth IoT cloud. It provides robust middleware for OTA updates, data streaming,
  remote logging, and device management across platforms like Zephyr, ESP-IDF, and
  ModusToolbox.
slug: golioth-firmware-sdk
codeUrl: https://github.com/golioth/golioth-firmware-sdk
siteUrl: https://docs.golioth.io/firmware/golioth-firmware-sdk
star: 104
version: v0.22.0
lastUpdated: '2025-12-22'
rtos: zephyr
libraries:
- littlefs
- mcuboot
- open-thread
topics:
- coap
- embedded
- esp-idf
- esp32
- firmware
- firmware-update
- freertos
- internet-of-things
- iot
- iot-platform
- lte
- modustoolbox
- nordic-semiconductor
- ota
- ota-firmware-updates
- rpc
- software-update
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- golioth-zephyr-sdk
- spotflow-observability-device-sdk
- multizone-iot-sdk
- ameba-rtos-sdk
- mongoose-os
- iotsharp-for-rt-thread
---

The Golioth Firmware SDK is a powerful middleware layer designed to bridge the gap between embedded hardware and the Golioth IoT cloud. It provides a standardized set of APIs that allow developers to implement complex IoT features—such as over-the-air (OTA) firmware updates, remote logging, and real-time data synchronization—without having to build the underlying communication protocols from scratch.

Built to be platform-agnostic, the SDK is designed for preemptive operating systems that provide an internet stack. It features first-class support for several major embedded ecosystems, including Zephyr RTOS, Espressif's ESP-IDF, and Infineon's ModusToolbox. It even includes experimental support for Linux, allowing for easier prototyping and testing on single-board computers.

## Core Services and Capabilities

The SDK organizes its functionality into several specialized services, each addressing a common requirement in IoT development:

- **LightDB State & Stream**: These services handle data persistence and time-series streaming. LightDB State allows for real-time synchronization of device state with the cloud, while Stream is optimized for high-frequency sensor data.
- **Over-the-Air (OTA) Updates**: A robust firmware update module that supports multi-component updates, resumeable downloads, and rollback protection. It is designed to work with bootloaders like MCUboot.
- **Remote Logging**: Developers can send system logs directly to the Golioth console, making it significantly easier to debug devices deployed in the field.
- **Remote Procedure Call (RPC) & Settings**: These modules allow the cloud to trigger specific functions on the device or update configuration parameters at runtime without requiring a reboot.
- **Location Service**: A newer addition that helps resolve Wi-Fi scan results and cellular tower information into approximate geolocation.

## Technical Architecture

Under the hood, the Golioth SDK utilizes efficient, industry-standard protocols. It primarily uses CoAP (Constrained Application Protocol) over DTLS (Datagram Transport Layer Security) for secure, low-overhead communication. Data is typically serialized using CBOR (Concise Binary Object Representation), which provides a compact binary format ideal for resource-constrained microcontrollers.

The SDK is structured with a Platform Abstraction Layer (PAL), which simplifies the process of porting the SDK to new hardware or operating systems. This abstraction covers system-level requirements like thread management, semaphores, and networking sockets.

## Hardware and RTOS Integration

Golioth maintains a rigorous Continuous Integration (CI) system that verifies the SDK against a variety of hardware configurations. Verified boards include:

- **Espressif**: ESP32-S3-DevKitC-1 (using both ESP-IDF and Zephyr)
- **Nordic Semiconductor**: nRF9160 DK (nRF Connect SDK) and nRF52840 DK
- **NXP**: FRDM-RW612
- **Infineon**: CY8CPROTO-062-4343W

For Zephyr users, the SDK integrates seamlessly with the `west` meta-tool, allowing it to be managed as a module within a Zephyr workspace. ESP-IDF users can include it as a component in their existing build system.

## Getting Started

The repository is organized to help developers get up and running quickly. The `examples` directory contains platform-specific applications ranging from a simple "Hello World" to complex OTA and sensor streaming demonstrations. The `golioth_basics` example is the recommended starting point for most users, as it demonstrates the core loop of connecting to the cloud and interacting with the primary Golioth services.
