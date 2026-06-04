---
title: ESP32 Reticulum Network Stack Gateway Node
summary: A multi-interface network gateway firmware for the ESP32 series that implements
  the Reticulum Network Stack (Reticulum). It enables transparent packet routing and
  bridging across WiFi, ESP-NOW, LoRa, Serial, and HAM radio interfaces, providing
  a resilient and cryptographically secured communication mesh.
slug: esp32-reticulum-network-stack-gateway-node
codeUrl: https://github.com/AkitaEngineering/ESP32-C3-Reticulum-Node
star: 30
lastUpdated: '2026-01-03'
rtos: freertos
libraries:
- lwip
topics:
- akita
- akita-engineering
- esp32
- gateway
- reticulum
isShow: false
createdAt: '2026-01-13'
updatedAt: '2026-01-13'
relatedProjects:
- meshcore-mqtt-gateway
- meshtnc
- esp32-mesh-control
- genius-gateway
- zephyr-native-meshtastic-stack
- esp32-gps-gateway-with-rtk-ntrip-support
---

## Overview

The ESP32 Reticulum Network Stack (RNS) Gateway Node is a sophisticated firmware implementation designed to transform various ESP32 microcontrollers into versatile network gateway nodes. By implementing the Reticulum protocol stack, this project enables seamless, transparent packet routing and bridging across a wide array of physical and logical network interfaces. It is specifically engineered to provide resilient communication in environments where traditional infrastructure might be unavailable or unreliable.

At its core, the system acts as a multi-interface bridge, allowing data to flow between heterogeneous networks such as WiFi, LoRa, and even amateur radio frequencies. The project leverages the cryptographic security and decentralized nature of Reticulum to ensure that communication remains private and robust across all connected segments.

## Multi-Interface Gateway Capabilities

One of the most powerful aspects of this gateway is its ability to manage multiple concurrent network interfaces. The `InterfaceManager` component abstracts the physical layer, allowing the node to route traffic between:

*   **WiFi UDP**: Standard IEEE 802.11 networking for local area connectivity.
*   **ESP-NOW**: Espressif's proprietary low-power, peer-to-peer protocol for direct device communication without a router.
*   **LoRa**: Long-range radio communication using SX1278-compatible modules, ideal for wide-area mesh networking.
*   **Serial UART (KISS)**: Asynchronous serial communication using the KISS protocol, enabling integration with external computers or TNCs.
*   **Bluetooth Classic**: Serial Port Profile (SPP) support for wireless serial bridging on compatible ESP32 variants.
*   **HAM Modem**: Integration with amateur radio equipment using AX.25 and APRS protocols.
*   **IPFS**: A gateway client for InterPlanetary File System content addressing.

## Architecture and Routing

The system architecture is modular, centered around a `ReticulumNode` controller that manages the routing table, link states, and packet serialization. The routing protocol utilizes a distance-vector approach with announce-based discovery. Nodes periodically transmit "announce" packets, allowing the network to dynamically map routes based on hop counts and link quality.

Reliability is handled at the transport layer through a link-management system. This ensures that point-to-point connections benefit from acknowledgment-based retransmissions and sequence numbering, even over lossy radio links. The system supports a maximum of 15 hops and can manage up to 20 concurrent routes in its default configuration, making it suitable for medium-scale mesh deployments.

## Technical Specifications

*   **Packet Format**: RNS Header Type 1 (19-byte header) with a configurable payload up to 200 bytes.
*   **Addressing**: 8-byte (64-bit) cryptographically derived addresses stored in non-volatile memory.
*   **Throughput**: Optimized for low-bandwidth, high-reliability links, achieving approximately 10 packets per second depending on the interface.
*   **Security**: Inherits Reticulum's end-to-end encryption and authentication features.

## Hardware and Platform Support

The firmware is highly portable across the Espressif ecosystem, with dedicated support for:
*   **ESP32-C3 / C5 / C6**: RISC-V based variants (UART1 for KISS, BLE support).
*   **ESP32-S2 / S3**: High-performance variants with native USB and Bluetooth Classic support.
*   **Heltec LoRa32 v3/v4**: Specialized development boards with integrated LoRa modules and displays.

## Getting Started

The project is built using the PlatformIO ecosystem. Configuration is primarily handled through `include/Config.h`, where users can define WiFi credentials and interface parameters. Build-time flags in `platformio.ini` allow developers to enable or disable specific features like LoRa or HAM modem support to optimize memory usage for specific hardware targets.

```cpp
// Example configuration in Config.h
const char *WIFI_SSID = "your_ssid";
const char *WIFI_PASSWORD = "your_password";

// Interface selection via build flags
#ifdef LORA_ENABLED
    // LoRa specific pins and frequencies
    #define LORA_FREQ 915.0
    #define LORA_BW 125.0
#endif
```

By combining modern microcontroller flexibility with the robust Reticulum protocol, this gateway node provides a critical building block for off-grid communication, emergency services, and decentralized networking experiments.
