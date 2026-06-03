---
title: Mbed to IBM Watson IoT Platform
summary: An example application for Mbed OS that connects to the IBM Watson IoT Platform
  using MQTT over TLS. It demonstrates secure cloud connectivity, NTP time synchronization,
  and multi-target support for hardware like Wio 3G and GR-LYCHEE.
slug: mbed-to-ibm-watson-iot-platform
codeUrl: https://github.com/coisme/Mbed-to-IBM-Watson-IoT
siteUrl: https://os.mbed.com/users/coisme/notebook/ibm-watson-iot-from-mbed-os-device/
star: 0
lastUpdated: '2019-11-26'
rtos: mbed-os
libraries:
- lwip
topics:
- ibm-watson-iot
- mbed-os
- mqtt
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mbed-to-google-cloud-iot
- mbed-to-azure-iot-hub
- mbed-to-aws-iot-example
- aws-iot-with-the-l475vg-iot01a-on-mbed-os
- losant-mqtt-example-for-mongoose-os
- mbed-os-treasure-data-example
---

## Overview

Connecting embedded devices to the cloud requires a robust combination of networking protocols and security measures. This project provides a practical reference implementation for Mbed OS devices to communicate with the IBM Watson IoT Platform. By utilizing MQTT over TLS, it ensures that data transmitted from the edge to the cloud remains encrypted and authenticated.

The project is designed to be portable across various Mbed-enabled hardware, with specific configurations provided for cellular and Wi-Fi enabled boards. It serves as a template for developers looking to integrate industrial IoT platforms with ARM Cortex-M based microcontrollers.

## Technical Architecture

The application leverages several key components of the Mbed ecosystem to facilitate reliable cloud communication:

- **MQTT over TLS**: The project uses the `mbed-mqtt` library to handle the messaging protocol, specifically targeting port 8883 for secure communication. It includes the necessary Root CA certificates to verify the IBM Watson IoT server's identity.
- **NTP Synchronization**: Secure TLS connections require accurate system time to validate certificate expiration. The project integrates an `ntp-client` to synchronize the device's internal clock before attempting a handshake with the cloud.
- **Network Abstraction**: Through the use of `mbed_app.json`, the project supports multiple network interfaces. This includes cellular PPP connections for the Seeed Wio 3G and Wio BG96, as well as Wi-Fi connectivity for the Renesas GR-LYCHEE using an ESP32 as a network co-processor.

## Key Features

- **Secure Connectivity**: Implements TLS-based encryption for all MQTT traffic.
- **Flexible Hardware Support**: Pre-configured for various targets including WIO_3G, WIO_BG96, and GR_LYCHEE.
- **Configurable Parameters**: Centralized configuration for Organization ID, Device Type, Device ID, and Auth Tokens via `MQTT_server_setting.h`.
- **Mbed OS Integration**: Utilizes Mbed's native networking stack, including Nanostack and LWIP depending on the target hardware.

## Implementation Details

The core logic resides in `main.cpp`, which orchestrates the network connection, time synchronization, and the MQTT client lifecycle. The application follows a standard IoT pattern: initializing the network interface, fetching the current time via NTP, establishing a secure TCP socket, and finally performing the MQTT connect and publish operations.

For cellular devices, the project includes specific overrides to enable PPP (Point-to-Point Protocol) and IPv4 support via LWIP. For Wi-Fi devices like the GR-LYCHEE, it utilizes the `WIFI_ESP32` component to manage the wireless link.

## Getting Started

To use this project, developers need to provide their IBM Watson IoT credentials in `MQTT_server_setting.h`. This includes the `ORG_ID`, `DEVICE_TYPE`, `DEVICE_ID`, and the authentication `TOKEN`. The project also requires the Root CA certificate in PEM format to establish the trust chain for the TLS connection. Once configured, the project can be compiled using the Mbed CLI or the Mbed Online Compiler for the desired target board.
