---
title: Flipper LoRa Relay App
summary: An application for the Flipper Zero that enables LoRa radio communication
  using the SX1262 chipset. It supports sniffing, packet injection, and LoRaWAN US915/EU868
  configurations for network analysis and peripheral testing.
slug: flipper-lora-relay-app
codeUrl: https://github.com/ElectronicCats/flipper-SX1262-LoRa
siteUrl: https://electroniccats.com/
star: 83
version: v1.1.4.0
lastUpdated: '2025-11-24'
rtos: freertos
topics:
- flipper
- flipper-plugin
- flipperzero
- lora
isShow: true
image: /202602/Flipper-Add-On-SubGhz-1-1.webp
createdAt: '2026-02-18'
updatedAt: '2026-02-18'
relatedProjects:
- flipper-rs485-modbus-plugin
- lora-test-app-for-semtech-sx1262-and-apache-nuttx
- fz-nrf24-jammer
- lorawan-test-app-for-apache-nuttx
- zephyr-lorawan-lora-examples
- ropixon-at-lora-dongle
---

The Flipper LoRa Relay App is a specialized tool designed for the Flipper Zero multi-tool, extending its capabilities into the world of Long Range (LoRa) radio communication. By leveraging the Electronic Cats Flipper Add-On: Sub-GHz, which features the Semtech SX1262 transceiver, this application transforms the Flipper Zero into a portable LoRa sniffer and injector.

## LoRa Communication and Analysis

LoRa is a popular low-power wide-area network (LPWAN) technology used extensively in IoT devices, smart cities, and industrial monitoring. The Flipper LoRa Relay App provides a user-friendly interface to interact with these signals. Users can perform basic yet essential tasks such as sniffing packets from nearby LoRa devices and injecting custom transmissions. This makes it an invaluable tool for developers and security researchers performing network analysis, error detection, or configuring new peripherals within a LoRa network.

## Key Features and Functionality

The application is built to handle various LoRa configurations. It allows users to customize LoRa parameters directly from the Flipper's interface. Notably, it includes dedicated menus for LoRaWAN regions, specifically US915 and EU868, ensuring compatibility with the most common frequency bands used globally.

One of the core features is the ability to read and display data sniffed from LoRa devices in real-time. To facilitate deeper analysis, the app supports exporting these sniffing sessions into LOG files stored on the Flipper's SD card. These logs aren't just for reading; the application can also send LoRa packets directly from these saved files, enabling replay testing or verifying device responses to specific packet structures.

## Hardware Integration

To use this application, the Electronic Cats Flipper Add-On: Sub-GHz is required. This hardware module provides the necessary SX1262 radio hardware that the Flipper Zero lacks natively for these specific frequencies and modulation techniques. The integration between the software and the SX1262 hardware allows for precise control over the radio's behavior, including frequency selection and modulation parameters.

## Technical Implementation

The project is maintained by Electronic Cats and is open for community contributions. It follows standard Flipper Zero application structures, utilizing the Flipper's internal APIs which are built upon a FreeRTOS-based firmware environment. The inclusion of `.clang-format` and pre-commit hooks indicates a focus on code quality and maintainability, which is crucial for community-driven embedded projects. For developers looking to extend the functionality, the repository provides a clear structure for adding new LoRa-based features or supporting additional regional parameters.
