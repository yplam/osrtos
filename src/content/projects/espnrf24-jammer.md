---
title: ESPnRF24 Jammer
summary: A low-power 2.4GHz wireless jammer built on the ESP32-S3 platform using nRF24L01+PA+LNA
  modules. It provides a comprehensive web interface for targeting WiFi, Bluetooth,
  and Zigbee signals across custom frequency ranges.
slug: espnrf24-jammer
codeUrl: https://github.com/chickendrop89/ESPnRF24-Jammer
lastUpdated: '2026-03-03'
licenses:
- GPL-3.0
image: /202604/ESPnRF24-Jammer_0.avif
rtos: freertos
libraries:
- spiffs
topics:
- 24ghz
- bluetooth
- drone
- esp32
- esp32s3-devkitc-1
- jammer
- jamming
- nrf24
- nrf24l01
- platformio
- rf24
- si24r1
- wifi
- zigbee
isShow: true
createdAt: '2026-04-19T23:01:31+00:00'
updatedAt: '2026-04-19T23:01:31+00:00'
---

## Overview

The ESPnRF24 Jammer is a specialized embedded project designed to demonstrate the vulnerabilities of 2.4GHz wireless protocols. By combining the processing power of the ESP32-S3 with the radio frequency capabilities of multiple nRF24L01+ modules, this project creates a portable device capable of disrupting various wireless signals within the 2.4GHz spectrum. It is designed primarily for educational and research purposes, highlighting how low-cost hardware can be used to interfere with common communication standards.

## Hardware Architecture

The project is built around the ESP32-S3, specifically the devkitc-1, though it is compatible with any ESP32 board that offers a dual-core chip and two usable SPI buses. The dual-core capability is essential for managing the web-based control interface on one core while handling the timing-sensitive radio transmission tasks on the other.

The radio hardware consists of two nRF24L01+PA+LNA modules. These modules are favored for their low power consumption and the inclusion of a Power Amplifier (PA) and Low Noise Amplifier (LNA), which significantly extend the range and effectiveness of the jamming signal. To ensure stable operation during high-power transmission bursts, the project requires 100uF electrolytic capacitors soldered across the VCC and GND pins of each radio module.

For local status monitoring, the system supports SSD1306 OLED displays (typically 128x64 resolution), providing real-time feedback on the device's current state without requiring a connected mobile device or computer.

## Versatile Jamming Capabilities

One of the standout features of this project is its ability to target specific protocols rather than just blasting noise across the entire spectrum. Through the web interface, users can select from several pre-configured jamming modes:

- **WiFi (2.4 GHz):** Targets standard 802.11b/g/n signals.
- **Bluetooth & BLE:** Disrupts both classic Bluetooth and Low Energy connections.
- **Zigbee:** Useful for testing the resilience of smart home devices.
- **Drones:** Targets the common control frequencies used by many consumer UAVs.
- **Custom Ranges:** Allows for fine-tuned frequency selection to target specific narrow-band signals.

## Software and User Interface

The firmware is developed using the Arduino framework within the PlatformIO ecosystem. It utilizes the SPIFFS filesystem to store and serve a modern web interface. When the device is powered on, it can act as a captive portal, automatically redirecting connected users to the control dashboard. This interface allows for real-time configuration of TX power, frequency ranges, and active jamming modes.

The project structure is highly configurable via the `include/options.h` file, where users can define pin mappings for the SPI buses and the OLED display. This modularity ensures that the code can be easily ported to different ESP32 variants or custom PCB designs.

## Technical Implementation

The project leverages the high-performance build environment of the ESP32-S3, utilizing PSRAM support and strict C++17 standards. By managing two separate SPI buses, the ESP32 can control two nRF24 modules simultaneously, increasing the density of the interference. The use of the RF24 library provides the low-level access needed to manipulate the radio registers for unconventional transmission patterns required for effective jamming.

## Legal and Safety Warning

It is critical to note that the use of radio frequency jammers is illegal in many jurisdictions. This project is shared strictly for educational research into radio frequency interference and wireless security. Users are responsible for complying with all local laws and regulations regarding radio transmissions. Misuse of this technology can lead to severe legal consequences, including fines and imprisonment.
