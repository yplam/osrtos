---
title: Zephyr CoAPS Client with TinyDTLS
summary: A reliable and efficient CoAPS client for Zephyr RTOS utilizing the Eclipse/TinyDTLS
  library. It implements DTLS 1.2 Connection ID to minimize handshake overhead and
  power consumption in cellular IoT applications. The project targets Nordic Semiconductor
  nRF91 series hardware, including the Thingy:91 and various development kits.
slug: zephyr-coaps-client-with-tinydtls
codeUrl: https://github.com/boaks/zephyr-coaps-client
siteUrl: https://www.zephyrproject.org/
star: 41
version: v0.10
lastUpdated: '2025-10-24'
rtos: zephyr
libraries:
- mcuboot
topics:
- coap
- dtls-cid
- dtls12
- iot
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- building-wireless-sensor-networks-with-openthread
- anjay-zephyr-client
- anjay-zephyr
- pyrinas-zephyr
- infuse-iot-sdk
- coap-eap-with-eap-noob-in-contiki
---

## Reliable, Efficient, and Encrypted Cellular IoT

The Zephyr CoAPS Demo Client is a specialized implementation designed to showcase high-efficiency communication over cellular networks. By combining the Zephyr RTOS with the Eclipse/TinyDTLS library, this project enables CoAP over DTLS 1.2 with a critical optimization: the DTLS 1.2 Connection ID (RFC 9146). This feature allows devices to maintain secure sessions even when IP addresses change or after long periods of dormancy, effectively eliminating the expensive overhead of frequent DTLS handshakes.

In cellular IoT environments like LTE-M and NB-IoT, reducing message exchange to just two IP messages—one request and one response—is vital for battery longevity. This project demonstrates that a device like the Nordic Thingy:91 can run for 7 to 15 months on a single battery charge while exchanging messages every hour.

## Key Features and Capabilities

- **DTLS 1.2 Connection ID Support**: Uses the Eclipse/TinyDTLS library to implement CID, which is essential for mobile applications where network attachment points frequently shift.
- **Low Power Optimization**: Specifically tuned for the nRF91 series, the client manages modem sleep states and power-saving modes (PSM/eDRX) to maximize field life.
- **Comprehensive Hardware Support**: Targets the Nordic Semiconductor nRF9160, nRF9161, and nRF9151 SoCs. Supported boards include the Thingy:91, Thingy:91X, Circuit Dojo Feather, and Conexio Stratus Pro.
- **Remote Management**: Includes functions for remote configuration from a server and supports firmware updates over both UART (XMODEM) and CoAP.
- **Environmental Sensing**: Integrated support for various sensors including BME680, SHT31, and ADXL362 accelerometer for motion detection.

## Technical Architecture

The project is built as a standard Zephyr application, leveraging the `west` meta-tool for dependency management. It integrates deeply with the Nordic Connect SDK (NCS), specifically versions 2.6.4 and 2.9.2. The build system uses CMake and Kconfig to allow highly granular configuration of features such as GNSS location, battery monitoring, and specific sensor drivers.

One of the project's strengths is its modular configuration system. It provides multiple project configuration files (`.conf`) for different use cases, such as:
- `lowpower-prj.conf`: Optimized for minimal energy consumption.
- `debug-prj.conf`: Enables verbose logging and debugging symbols.
- `tracker-prj.conf`: Configures the device for GNSS tracking applications.

## Getting Started

To build the project, users need a Zephyr development environment and the Nordic Connect SDK. The project uses a `west.yml` file to manage its specific dependencies, including the TinyDTLS library. A typical build command targeting the Thingy:91 would look like:

```bash
west build -b thingy91_nrf9160_ns
```

The repository includes a detailed "Fast Track" guide for users who want to test cellular coverage using pre-built binaries, as well as a "Build Track" for developers looking to customize the firmware. Because the project is intended as groundwork for custom IoT solutions, it provides extensive documentation on power measurement, cellular network exploration, and remote control protocols.
