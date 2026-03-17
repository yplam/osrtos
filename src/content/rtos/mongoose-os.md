---
title: Mongoose OS
slug: mongoose-os
summary: Mongoose OS is a modular IoT firmware development framework designed for
  microcontrollers, enabling rapid development in both C/C++ and JavaScript. It provides
  a comprehensive environment for connected devices with built-in support for secure
  OTA updates, remote management via a robust RPC mechanism, and native integration
  with major cloud providers like AWS IoT and Google IoT Core.
codeUrl: https://github.com/cesanta/mongoose-os
siteUrl: https://mongoose-os.com/
star: 2631
version: 2.20.0
lastUpdated: '2026-03-16'
components:
- OTA
- Cryptography
- MemoryEncryption
- TLS/SSL
- MQTT
- WebSocket
- FileSystem
- Network
- WiFi
- Bluetooth
- BLE
- DNS
- SNTP
- HTTP
- Shell
- Bootloader
- SecureBoot
- PKI
- CodeSigning
- Ethernet
- JSON
- ADC
- PWM
- I2C
- SPI
- UART
platforms:
- ARM Cortex-M
- Xtensa
- Linux
- ESP32
- ESP8266
- STM32F4
- STM32L4
- STM32F7
- CC3200
- CC3220
- POSIX
licenses:
- Apache-2.0
libraries:
- mbedTLS
- lwIP
- FreeRTOS
- mJS
- Frozen
createdAt: '2025-12-24'
updatedAt: '2026-03-17'
---

### Features


- Dual-language development support allowing application logic to be written in C/C++ or JavaScript (mJS).

- Reliable Over-The-Air (OTA) firmware updates with automatic rollback on failure to prevent bricking.

- Integrated RPC (Remote Procedure Call) mechanism for device management over UART, MQTT, HTTP, and BLE.

- Built-in flash encryption and support for external hardware security modules like ATCA crypto chips.

- Native integration for AWS IoT, Google Cloud IoT Core, Microsoft Azure, and IBM Watson IoT.

- Embedded JavaScript engine (mJS) specifically optimized for low-memory microcontroller environments.

- Support for multiple file systems including LittleFS, SPIFFS, and RAM-based virtual file systems.

- Comprehensive networking stack including WiFi, Ethernet, and PPPoS for cellular connectivity.

- Built-in configuration management system with persistent storage and remote access capabilities.

- Integrated device management via the mDash dashboard service for remote monitoring and control.

- Support for Bluetooth Low Energy (BLE) including GATT services for configuration and debugging.

- Extensive driver library for various sensors, barometers, and LED displays.

- Real-time event system for handling hardware interrupts and network state changes.

- Cryptographic support via ARM mbedTLS optimized for small memory footprints.

- Built-in SNTP support for time synchronization over the network.

- Support for various industrial protocols and transports including MQTT and WebSockets.



### Architecture

Mongoose OS features a highly modular architectural design consisting of a core engine and a vast ecosystem of pluggable libraries. The system is designed to be lightweight yet extensible, allowing developers to include only the necessary components for their specific hardware and application requirements. At its heart, the framework utilizes an event-driven model, where the core manages system events, network transitions, and hardware interrupts, dispatching them to registered handlers in either C or JavaScript.

A central pillar of the architecture is the **RPC (Remote Procedure Call)** mechanism. This subsystem allows for seamless communication between the device and external entities (such as a cloud dashboard or a mobile app) over various transports like MQTT, WebSockets, or Serial. The framework also includes a Virtual File System (VFS) layer that abstracts different storage backends, enabling consistent file operations across SPIFFS, LittleFS, or FAT systems.

#### Core Components
- **mJS Engine**: A restricted JavaScript engine designed for microcontrollers with limited RAM.
- **RPC Layer**: Provides remote management, configuration, and diagnostic capabilities.
- **Configuration System**: A structured, persistent storage system for device settings.
- **Networking Stack**: Integrated support for WiFi, Ethernet, and TCP/IP protocols.
- **Security Module**: Handles flash encryption, TLS/SSL termination, and hardware crypto-chip interfacing.

### Use Cases

This RTOS is ideal for:

- **Industrial IoT**: Deploying remotely manageable sensors and controllers that require secure, reliable OTA updates in the field.
- **Smart Home Appliances**: Building connected consumer devices that benefit from rapid prototyping using JavaScript and native cloud integration.
- **Asset Tracking**: Developing low-power cellular or WiFi-based trackers using the integrated PPPoS and GPS/location libraries.
- **Cloud Gateways**: Creating bridge devices that aggregate local sensor data (via BLE or Modbus) and push it to AWS, Azure, or Google Cloud.
- **Secure Edge Computing**: Applications requiring hardware-level security and encrypted storage for sensitive data processing.

### Getting Started

To begin development with Mongoose OS, the primary tool is `mos`, a cross-platform command-line utility and Web UI. Developers should first download and install the `mos` tool for their operating system (Windows, macOS, or Linux). The typical workflow involves connecting a supported development board (like an ESP32 or STM32) via USB, using `mos clone` to start from a template application, and then running `mos build` and `mos flash` to compile and deploy the firmware. 

Comprehensive documentation, including quickstart guides for C and JavaScript, API references, and cloud integration tutorials, is available at [mongoose-os.com/docs](https://mongoose-os.com/docs/mongoose-os/quickstart/setup.md). Technical support is provided through an active community forum and a Gitter chat room for real-time collaboration.
