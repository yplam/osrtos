---
title: ESP32 2.4GHz Jammer
summary: An ESP32-based firmware designed to disrupt 2.4 GHz wireless signals using
  nRF24L01 PA/LNA modules. It features multiple operational modes for interfering
  with Bluetooth, BLE, Wi-Fi, and RC drone communications for educational research.
slug: esp32-2-4ghz-jammer
codeUrl: https://github.com/KEI4251/ESP32-Jammer-
siteUrl: https://kei4251.github.io/ESP32-Jammer-/
star: 13
lastUpdated: '2025-02-17'
rtos: freertos
topics:
- arduino
- coding
- cybersecurity
- diy
- electronics
- esp32
- hacking
- jammer
- programming
isShow: false
createdAt: '2026-01-17'
updatedAt: '2026-01-17'
relatedProjects:
- esp32-bluejammer
- esp32-bluetooth-signal-jammer
- c3mini-bluejammer
- nrf24-jammer
- espnrf24-jammer
- cc1101-jammer
---

## Overview

The KEI 2.4GHz Jammer is an embedded firmware project designed for the ESP32 platform. By leveraging the radio capabilities of the nRF24L01 PA/LNA modules, this tool generates noise signals within the 2.4 GHz frequency band. Its primary purpose is to demonstrate how wireless communication protocols—such as Bluetooth, Wi-Fi, and proprietary RC drone links—can be disrupted by high-power interference.

## Technical Capabilities

The jammer is designed to target specific wireless technologies through four distinct operational modes:

- **Bluetooth & BLE**: Targets standard Bluetooth and Bluetooth Low Energy devices.
- **Wi-Fi**: Disrupts 802.11b/g/n signals operating in the 2.4 GHz spectrum.
- **RC Drones**: Specifically targets the radio control links used by many consumer drones.

The system works by overpowering legitimate signals with noise. The effective range of the device is highly dependent on the antenna configuration; using high-gain antennas or RF amplifiers can significantly extend the interference radius.

## Hardware Architecture

The project is built around the ESP32-WROOM-32U microcontroller. To achieve effective jamming, it utilizes two nRF24L01 PA/LNA modules. The use of two modules allows for more flexible signal generation, often utilizing both the HSPI and VSPI buses of the ESP32 simultaneously.

### GPIO Configuration

The project defines specific pin layouts for connecting the radio modules to the ESP32:

**HSPI Interface:**
- CE: GPIO 16
- CSN: GPIO 15
- SCK: GPIO 14
- MOSI: GPIO 13
- MISO: GPIO 12

**VSPI Interface:**
- CE: GPIO 22
- CSN: GPIO 21
- SCK: GPIO 18
- MOSI: GPIO 23
- MISO: GPIO 19

For stable operation, the project recommends adding 10uF capacitors across the VCC and GND pins of the nRF24L01 modules to handle power spikes during transmission.

## Deployment and Web Flasher

One of the standout features of this project is the integrated Web Flasher. This tool allows users to install the firmware directly from a web browser using the Web Serial API. This eliminates the need for complex local build environments or manual toolchain setup. Users simply connect their ESP32 via USB, select the appropriate COM port, and the web interface handles the flashing process.

## Ethical and Legal Considerations

It is critical to note that signal jamming is illegal in many jurisdictions as it can interfere with emergency services and public communications. This project is provided strictly for educational purposes and RF research. Users are responsible for complying with local laws and regulations regarding radio frequency transmissions.
