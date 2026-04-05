---
title: XIAO ESP32C6 Sketches
summary: A comprehensive collection of Arduino and PlatformIO examples for the Seeed
  Studio XIAO ESP32C6 development board. The repository covers essential hardware
  features including WiFi benchmarking, BLE, Zigbee, Matter protocol integration,
  and low-power deep sleep configurations.
slug: xiao-esp32c6-sketches
codeUrl: https://github.com/sigmdel/xiao_esp32c6_sketches
siteUrl: https://www.sigmdel.ca/michel/ha/xiao/xiao_esp32c6_intro_en.html
version: v3.1.1_2025-01-24
lastUpdated: '2026-02-22'
licenses:
- 0BSD
image: /202604/xiao_esp32c6_sketches_0.avif
rtos: ''
topics:
- arduino
- esp32-arduino
- esp32-c6
- introduction
- pioarduino
- xiao
isShow: true
createdAt: '2026-04-04T09:55:28+00:00'
updatedAt: '2026-04-04T09:55:28+00:00'
---

The Seeed Studio XIAO ESP32C6 is a compact yet powerful development board based on the Espressif ESP32-C6 SoC. This repository serves as a technical companion to the board, providing a wide array of sketches that demonstrate its capabilities across various wireless protocols and hardware peripherals. Whether you are looking to benchmark WiFi performance, explore the latest smart home standards like Matter and Zigbee, or optimize power consumption for battery-operated devices, these examples provide a solid foundation.

## Versatile Development Environments

One of the standout features of this project is its dual-compatibility with the Arduino IDE and the pioarduino (PlatformIO) environment. Each project is structured to satisfy the requirements of both ecosystems. For Arduino users, the sketches are organized into standard directories with `.ino` files. For those preferring a more robust IDE experience, the repository includes `platformio.ini` configurations that utilize the pioarduino fork, which is specifically optimized for recent ESP32 microcontrollers.

To ensure consistent behavior across different setups, the repository includes a local `libraries` folder. This approach avoids the common "dependency hell" associated with external library managers, making the projects self-contained and easier to compile right out of the box.

## Exploring Connectivity: WiFi, BLE, and Beyond

The ESP32-C6 is a connectivity powerhouse, and this repository explores those features in depth. Beyond simple WiFi scanning, the projects include tools to measure WiFi connection latency and signal strength (RSSI) across different transmission power levels. This is particularly useful for developers trying to balance battery life with network reliability.

For modern IoT applications, the repository provides implementations for:

*   **Bluetooth Low Energy (BLE)**: Toggling on-board peripherals via mobile apps.
*   **Zigbee**: Examples for both On/Off Switches (Coordinators/Routers) and On/Off Lights (End Devices), demonstrating how to integrate the XIAO into existing Zigbee networks or Zigbee2MQTT setups.
*   **Matter**: Forward-looking examples that implement the Matter smart home protocol, allowing the XIAO ESP32C6 to communicate with ecosystems like Amazon Alexa over WiFi using BLE for commissioning.

## Low Power and Hardware Optimization

Power management is critical for the diminutive XIAO form factor. The repository includes detailed examples of deep sleep implementation, showing how to wake the device using either timed intervals or external I/O events. These sketches are essential for creating sensors that can run for months on a small LiPo battery.

Additionally, the project tackles specific hardware nuances of the XIAO ESP32C6, such as the RF switch configuration. The `xiao32c6_antenna` project examines how to programmatically toggle between the onboard ceramic antenna and an external antenna via the U.FL connector, ensuring optimal wireless performance for any enclosure design.

## Project Highlights

*   **System Diagnostics**: Tools to print MCU information, memory statistics, and firmware size.
*   **Web Interfaces**: Asynchronous web servers to control the built-in LED, providing a template for remote monitoring and control.
*   **Pin Mapping**: Reference utilities to document I/O pin assignments and macros specific to the XIAO hardware abstraction layer.
*   **Protocol Migration**: Updated examples that reflect the transition from older ESP32 Arduino cores to version 3.3.6+, ensuring compatibility with the latest Espressif features.
