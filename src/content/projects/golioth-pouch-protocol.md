---
title: Golioth Pouch Protocol
summary: A non-IP communication protocol designed for resource-constrained devices
  to interact with cloud services through gateways. Implemented as a Zephyr module,
  it supports various transports like BLE GATT and provides built-in support for Golioth
  services including logging, OTA updates, and data streaming.
slug: golioth-pouch-protocol
codeUrl: https://github.com/golioth/pouch
star: 14
version: v0.1.0
lastUpdated: '2026-03-18'
rtos: zephyr
libraries:
- mcuboot
- littlefs
topics:
- ble
- bluetooth
- golioth
- iot
- zephyr-rtos
isShow: false
createdAt: '2026-03-24'
updatedAt: '2026-03-24'
---

## Overview

`pouch` is a specialized non-IP protocol developed by Golioth to facilitate communication between embedded devices and cloud services. It is particularly useful for devices that lack a direct internet connection and must communicate through one or more gateways. By abstracting the underlying transport layer, `pouch` allows developers to focus on application logic while the protocol handles the complexities of message delivery and service interaction.

The project is designed as a native Zephyr module, making it easy to integrate into existing Zephyr-based firmware projects. It leverages standard Zephyr tooling like `west` for dependency management and `Kconfig` for feature selection.

## Key Features

- **Transport Agnostic**: While messages are delivered over a transport, the protocol itself is decoupled from the physical layer. Currently, it provides robust support for Bluetooth Low Energy (BLE) via the GATT profile.
- **Golioth Service Integration**: Out-of-the-box support for essential device management services, including Logging, Over-the-Air (OTA) updates, Settings management, and Data Streaming.
- **Secure Communication**: Built-in support for encrypted transfers using Streaming Authenticated Encryption with Associated Data (SAEAD). It supports modern algorithms like ChaCha20-Poly1305 and AES-GCM through integration with mbedTLS and the PSA Crypto API.
- **Efficient Serialization**: Uses `zcbor` for compact and efficient data serialization, ensuring minimal overhead on constrained links.

## Technical Architecture

`pouch` is structured to handle both uplink (device-to-cloud) and downlink (cloud-to-device) communication. The core logic manages message buffering, block-based transfers for large payloads (like OTA images), and event queuing for application-level processing.

### Supported Transports

- **BLE GATT**: Implements the protocol over Bluetooth Low Energy, allowing mobile phones or dedicated gateways to act as the bridge to Golioth services.
- **HTTP Client**: Provides an alternative transport for environments where a simplified HTTP-based gateway is available.

### Security and Encryption

The protocol emphasizes security, offering an encryption scheme that utilizes the PSA Crypto interface. It supports server certificate validation to prevent man-in-the-middle attacks and requires specific elliptic curves (like secp384r1) for robust identity verification. For development environments, a plaintext mode is also available, though strongly discouraged for production use.

## Getting Started with Zephyr

To add `pouch` to a Zephyr project, users include it in their `west.yml` manifest. Because it relies on `zcbor` for header generation, the environment must have the corresponding Python tooling installed. Configuration is handled through Zephyr's Kconfig system, where developers can tune parameters such as block sizes, thread priorities, and stack sizes to fit their specific hardware constraints.

```yaml
- name: pouch
  path: modules/lib/pouch
  revision: main
  url: https://github.com/golioth/pouch.git
```

Once integrated, the `golioth_sdk` provided within the repository offers a high-level API to interact with Golioth services over the `pouch` protocol, significantly reducing the boilerplate code required for cloud-connected embedded applications.
