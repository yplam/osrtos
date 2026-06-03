---
title: C3Mini-BlueJammer
summary: A compact 2.4GHz frequency disruptor based on the ESP32-C3 and dual nRF24L01
  modules. It targets Bluetooth, BLE, WiFi, and RC drone signals for educational security
  testing and controlled disruption.
slug: c3mini-bluejammer
codeUrl: https://github.com/EmenstaNougat/C3Mini-BlueJammer
siteUrl: https://emensta.pages.dev
star: 69
version: c3mini-bluejammer-v2
lastUpdated: '2025-10-27'
rtos: freertos
topics:
- bluejammer
- bluetooth
- bluetooth-low-energy
- c3mini-bluejammer
- cybersecurity
- diy
- electronics
- esp32c3
- esp32c3-super-mini
- firmware
- gt24mini
- jammer
- minimal
- noise-generator
- nrf24l01
- pentesting
- rc
- wifi
isShow: true
image: /202601/blue-jammer.webp
createdAt: '2026-01-15'
updatedAt: '2026-01-15'
relatedProjects:
- esp32-bluejammer
- esp32-2-4ghz-jammer
- esp32-bluetooth-signal-jammer
- nrf24-jammer
- espnrf24-jammer
- cc1101-jammer
---

## Overview

The C3Mini-BlueJammer is a specialized firmware and hardware project designed for the ESP32-C3 platform. It functions as a multi-protocol disruptor for the 2.4GHz band, capable of interfering with Bluetooth, Bluetooth Low Energy (BLE), WiFi, and Radio Controlled (RC) signals. By utilizing the ESP32-C3's processing power alongside dual nRF24L01 (GT24-Mini) modules, the project achieves a high-density noise floor across the broadband spectrum in a significantly smaller form factor than traditional jamming tools.

## Technical Capabilities

The project is engineered to disrupt various communication standards by flooding specific frequency ranges with unnecessary packets (DoS) and noise. It covers the following operational channels:

- **Bluetooth**: 79 channels ranging from 2.402 GHz to 2.480 GHz.
- **BLE**: 40 channels ranging from 2.400 GHz to 2.4835 GHz.
- **WiFi**: 14 channels with varying widths (20MHz to 40MHz).
- **RC Drones**: 125 channels ranging from 2.400 GHz to 2.525 GHz.

With standard 2.4GHz antennas, the device achieves a range of approximately 20 to 30 meters, which can be extended through the use of high-gain router antennas or signal amplifiers.

## Hardware Architecture

The system is built around the ESP32-C3, a RISC-V based microcontroller. The hardware design is optimized for portability and stealth, often utilizing a custom "C3Mini-RF" PCB. Key components include:

- **ESP32-C3 OLED Dev Module**: Acts as the central controller and provides a user interface via a 0.42" or 0.96" OLED screen.
- **Dual GT24-Mini Modules**: Two nRF24L01+ based modules are used to maximize the interference capability across the spectrum.
- **Power Management**: Support for 3.7V Li-Ion batteries via TP4056 charging modules and JST-PH 2.0 connectors for mobile operation.

The project utilizes both HSPI and VSPI buses on the ESP32-C3 to communicate with the dual RF modules simultaneously, ensuring high-speed packet injection.

## Operation and Firmware

The firmware is designed for immediate operation upon power-up. Users can cycle through different jamming modes using the physical "Boot" button on the C3Mini module. The device provides feedback through a status LED and an OLED display:

- **1 Blink**: Bluetooth Mode
- **2 Blinks**: BLE Mode
- **3 Blinks**: WiFi Mode
- **4 Blinks**: RC Mode

For ease of deployment, the project offers a web-based flasher, allowing users to install the firmware directly via a browser, as well as standard binary files for advanced users using traditional ESP32 flashing tools.

## Educational Purpose and Legality

It is important to note that the C3Mini-BlueJammer is intended strictly for educational purposes and security research. Jamming radio communications is illegal in many jurisdictions and should only be performed in controlled, legal environments for testing the resilience of wireless protocols against interference.
