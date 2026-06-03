---
title: Golioth Zephyr SDK
summary: A specialized Device SDK designed to integrate Zephyr RTOS-based firmware
  with the Golioth IoT Cloud. It provides built-in support for secure communication,
  over-the-air (OTA) updates, remote logging, and real-time data synchronization via
  LightDB.
slug: golioth-zephyr-sdk
codeUrl: https://github.com/golioth/golioth-zephyr-sdk
siteUrl: https://zephyr-sdk-docs.golioth.io/
star: 75
version: v0.8.0
lastUpdated: '2024-03-26'
rtos: zephyr
libraries:
- mcuboot
topics:
- coap
- esp32
- espressif
- feather
- golioth
- internet-of-things
- iot
- nordic-semiconductor
- nordicsemi
- real-time-operating-system
- rtos
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- golioth-firmware-sdk
- spotflow-observability-device-sdk
- multizone-iot-sdk
- infuse-iot-sdk
- anjay-zephyr
- ameba-rtos-sdk
---

## Overview

The Golioth Zephyr SDK serves as a bridge between the Zephyr Real-Time Operating System and the Golioth Cloud ecosystem. It allows developers to quickly build IoT applications that leverage Golioth's suite of services, including device management, data orchestration, and secure connectivity. 

**Note on Deprecation:** As of mid-2024, this specific repository has been deprecated in favor of the more unified [Golioth Firmware SDK](https://github.com/golioth/golioth-firmware-sdk). While it remains a valuable reference for existing Zephyr-based projects, new developments are encouraged to migrate to the newer SDK for continued support and updates.

## Key Services and Capabilities

The SDK is built to handle the heavy lifting of cloud communication, allowing developers to focus on their application logic. It provides native support for several core Golioth services:

- **LightDB State & Stream:** A NoSQL-like data store for managing device state and streaming time-series data using CoAP.
- **Over-the-Air (OTA) Updates:** Integrated firmware update capabilities, supporting multi-image DFU (Device Firmware Update) processes.
- **Remote Logging:** Seamlessly forward Zephyr system logs to the Golioth Cloud for centralized monitoring and debugging.
- **Settings Management:** Remotely manage device configurations and parameters through a unified cloud interface.
- **Authentication:** Secure device-to-cloud communication using Pre-Shared Keys (PSK) or certificate-based authentication.

## Technical Architecture

The SDK is designed to be used as a `west` module, the standard meta-tool for Zephyr development. It integrates deeply with the Zephyr build system, utilizing Kconfig for feature selection and Devicetree for hardware abstraction. 

Internally, the SDK utilizes CoAP (Constrained Application Protocol) over DTLS for efficient, low-overhead communication suitable for resource-constrained microcontrollers. The project has evolved from using QCBOR to the `zcbor` library for efficient data serialization, ensuring minimal memory footprint during cloud interactions.

## Hardware Support

The Golioth Zephyr SDK has been extensively tested across a variety of popular embedded platforms, including:

- **Nordic Semiconductor:** nRF9160 DK (Cellular IoT), nRF52840 DK (with ESP32-AT for Wi-Fi).
- **Espressif:** ESP32-WROOM-32D.
- **NXP:** MIMXRT1060-EVKB.
- **Emulation:** QEMU x86 for rapid prototyping and CI/CD testing.

## Getting Started

Because the SDK is a `west` manifest repository, setting up a project is straightforward. Developers can initialize a new workspace by pointing `west` to the Golioth manifest:

```console
west init -m https://github.com/golioth/golioth-zephyr-sdk.git --mf west-zephyr.yml
west update
```

For those working within the **nRF Connect SDK (NCS)** ecosystem, a specific manifest (`west-ncs.yml`) is provided to ensure compatibility with Nordic's cellular and wireless stacks. 

## Sample Applications

The repository includes a robust set of samples that demonstrate how to implement specific features. These range from a simple "Hello" application that connects to the cloud, to complex DFU examples that show how to handle firmware updates safely. Each sample includes a README with specific instructions for supported boards, such as pinout configurations for ESP32 or LTE link monitoring for the nRF91 series.
