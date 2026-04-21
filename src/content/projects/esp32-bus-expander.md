---
title: ESP32 Bus Expander
summary: ESP32 Bus Expander is a companion firmware for the ESP32 Bus Pirate that
  adds 5 GHz Wi-Fi and 802.15.4 radio support. Running on an ESP32-C5, it acts as
  a radio coprocessor connected via UART to provide advanced wireless capabilities
  not available on standard ESP32-S3 boards. The project leverages the Arduino framework
  and is designed to be easily flashable via a web-based interface.
slug: esp32-bus-expander
codeUrl: https://github.com/geo-tp/ESP32-Bus-Expander
siteUrl: https://geo-tp.github.io/ESP32-Bus-Pirate/webflasher/
lastUpdated: '2026-03-13'
licenses:
- MIT
image: /202604/ESP32-Bus-Expander_0.avif
rtos: freertos
topics:
- 802-15-4
- arduino
- debugging
- esp32
- esp32-bus-pirate
- hardware-hacking
- protocol
- wifi
- wifi6
isShow: true
createdAt: '2026-04-21T01:09:30+00:00'
updatedAt: '2026-04-21T01:09:30+00:00'
---

The ESP32 Bus Expander is a strategic addition to the ESP32 Bus Pirate ecosystem, designed specifically to overcome the hardware limitations of single-chip solutions. While the main ESP32 Bus Pirate (often based on the ESP32-S3) is a powerhouse for general-purpose tasks and high-speed USB interfacing, it typically lacks support for the 5 GHz Wi-Fi band. The Bus Expander addresses this by introducing the ESP32-C5—Espressif's first dual-band Wi-Fi chip—into the architecture.

### The Coprocessor Architecture

The project operates on a "radio coprocessor" model. In this setup, the main ESP32 Bus Pirate handles the command-line interface, scripting, and primary logic, while the Bus Expander manages the complex RF tasks. The two devices communicate over a standard UART connection. This modular approach allows users to upgrade their wireless capabilities without replacing their entire setup or porting the main firmware to a new architecture.

The connection is straightforward, requiring only three wires to bridge the two devices:
- **RX (Bus Pirate) to Pin 9 (Expander)**
- **TX (Bus Pirate) to Pin 10 (Expander)**
- **Common Ground (GND)**

Once connected, the Bus Pirate firmware can detect the expander and route commands to it, allowing the user to interact with 5 GHz networks directly from their existing CLI.

### Wireless Capabilities

The primary feature of the current firmware is 5 GHz Wi-Fi support. This enables the Bus Pirate to interact with modern enterprise and home networks that have migrated away from the congested 2.4 GHz spectrum. Beyond simple connectivity, the firmware incorporates features inspired by the "Evil Firmware" project, such as packet sniffing, deauthentication, and handshake capture. These tools are essential for security professionals and hobbyists performing wireless audits and network analysis.

### Future-Proofing with 802.15.4

One of the most exciting aspects of the ESP32 Bus Expander is its planned support for 802.15.4-based protocols. The ESP32-C5 hardware is natively capable of supporting Zigbee, Thread, and Matter. As the firmware matures, the Bus Expander will allow the Bus Pirate to act as a gateway or sniffer for these IoT protocols, making it a comprehensive tool for analyzing smart home environments and industrial wireless sensors.

### Technical Environment

The project is built using the PlatformIO ecosystem and the Arduino framework, running on top of FreeRTOS. It utilizes several key libraries to handle its internal logic, including `ArduinoJson` for structured data communication and `eModbus` for industrial protocol support. For visual feedback, it supports onboard LEDs (specifically Pin 27 on the C5 DevKit) via the Adafruit NeoPixel library.

Flashing the device is simplified through a dedicated web flasher, ensuring that users can get the expander running without complex toolchain setups. By selecting the **ESP32 Bus Expander (ESP32-C5)** target in the web interface, the firmware can be deployed directly from a browser to the hardware.
