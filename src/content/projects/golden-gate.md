---
title: Golden Gate
summary: A portable cross-platform networking framework that enables secure IP-based
  communication over Bluetooth Low Energy. It provides a consistent model for using
  protocols like CoAP, MQTT, and TLS across embedded devices, mobile apps, and desktop
  platforms.
slug: golden-gate
codeUrl: https://github.com/Fitbit/golden-gate
siteUrl: https://fitbit.github.io/golden-gate/
star: 312
lastUpdated: '2024-04-17'
rtos: apache-mynewt
topics:
- ble
- bluetooth
- coap
- coap-client
- coap-server
- corebluetooth
- dtls
- gatt
- gatt-client
- gatt-server
- ip
- lwip
- network
- networking
- protocol
- tcp-ip
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- golioth-pouch-protocol
- 6lowpan-ble-bridge
- unabto-sdk
- zephyr-native-meshtastic-stack
- openthread-rtos
- herald-for-c
---

Project Golden Gate is a sophisticated, portable framework designed by Fitbit to solve a common challenge in the IoT and wearable space: providing reliable, secure, and standardized network communication over Bluetooth Low Energy (BLE). While BLE is ubiquitous in mobile and wearable devices, its native GATT (Generic Attribute Profile) interface is often too limited for complex networking needs. Golden Gate bridges this gap by layering a full IP-based stack on top of BLE, allowing developers to use familiar protocols like CoAP, MQTT, and TLS even on resource-constrained hardware.

### A Unified Networking Model

The core philosophy of Golden Gate is to provide a consistent programming model across diverse environments. Whether you are developing firmware for a wearable device, a mobile app for iOS or Android, or a desktop application, the framework offers a familiar socket-like abstraction. This allows for the implementation of functionality using standard protocols such as:

- **CoAP & HTTP**: For RESTful communication.
- **WebSockets & MQTT**: For real-time messaging and data streaming.
- **TLS & TCP/UDP/IP**: For secure, reliable transport.

By abstracting the underlying transport—which is initially focused on BLE but designed to be transport-agnostic—Golden Gate enables developers to focus on application logic rather than the intricacies of BLE connection management and data fragmentation.

### Architecture and Portability

The framework is built with a modular architecture to ensure it can scale from high-end smartphones down to microcontrollers with very limited memory. The project structure is divided into several key components:

- **Core Library**: Written in C for maximum portability and performance across different CPU architectures.
- **Language Bindings**: High-level wrappers for Kotlin (Android) and Swift (iOS) make it easy to integrate into modern mobile development workflows.
- **Build System**: Utilizes CMake for a flexible, cross-platform build process, supported by Docker containers and Conda environments to ensure development consistency.

### Hardware and Platform Support

Golden Gate is designed to run almost anywhere. The project includes specific support and examples for a wide range of hardware and operating systems:

- **Embedded Boards**: Nordic nRF52840-DK and Espressif ESP32.
- **Mobile Devices**: iPhones, iPads, and Android phones/tablets.
- **Desktop Operating Systems**: macOS, Linux, and Windows.

The inclusion of Apache Mynewt support (indicated by the integration of the `newt` tool in the project's Docker environment) further emphasizes its readiness for professional-grade embedded RTOS environments.

### Getting Started

For developers looking to dive in, the repository provides a wealth of resources including code examples, test automation tools, and comprehensive documentation. The sample applications demonstrate how to set up CoAP clients and servers that communicate seamlessly across different device types. By integrating the library into an IoT device or mobile app, developers can leverage the provided examples to build robust communicating services without reinventing the networking stack. Detailed guides and API references are available through the project's online documentation portal.
