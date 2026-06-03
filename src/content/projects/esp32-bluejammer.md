---
title: ESP32-BlueJammer
summary: A 2.4GHz broadband interference tool built for the ESP32 platform using dual
  nRF24L01+ modules. It targets Bluetooth, BLE, WiFi, and RC drone frequencies for
  security testing and educational purposes.
slug: esp32-bluejammer
codeUrl: https://github.com/EmenstaNougat/ESP32-BlueJammer
siteUrl: https://emensta.pages.dev
star: 5317
version: ESP32-BlueJammer-official
lastUpdated: '2026-01-18'
rtos: freertos
libraries:
- u8g2
topics:
- bluetooth
- bt
- coding
- cybersecurity
- diy
- electronics
- esp32
- flashing
- hacker
- hacking
- jammer
- nrf24
- programming
isShow: true
image: /202602/esp32-bluejammer.webp
createdAt: '2026-02-18'
updatedAt: '2026-02-18'
relatedProjects:
- esp32-2-4ghz-jammer
- c3mini-bluejammer
- esp32-bluetooth-signal-jammer
- espnrf24-jammer
- nrf24-jammer
- nrfbluenullifier
---

## Overview

The ESP32-BlueJammer is a specialized firmware and hardware project designed to disrupt communications across the 2.4GHz spectrum. By leveraging the processing power of an ESP32 microcontroller and the radio capabilities of dual nRF24L01+ modules, the system can perform Denial-of-Service (DoS) attacks on various wireless protocols. It is designed primarily for security professionals and enthusiasts to conduct controlled disruption tests and evaluate the resilience of 2.4GHz devices against interference.

## Technical Capabilities

The project provides comprehensive coverage of the 2.4GHz band by targeting specific channel widths and frequency ranges associated with common consumer electronics:

- **Classic Bluetooth**: Targets 79 channels from 2.402 GHz to 2.480 GHz with 1 MHz channel widths.
- **Bluetooth Low Energy (BLE)**: Targets 40 channels from 2.400 GHz to 2.4835 GHz with 2 MHz channel widths.
- **WiFi**: Targets 14 channels across the standard 2.4GHz WiFi spectrum, disrupting 20 MHz to 40 MHz bands.
- **RC Systems**: Targets 125 channels from 2.400 GHz to 2.525 GHz, affecting drones and remote-controlled gadgets.

## Hardware Architecture

The system is built around an ESP32 Dev Module (specifically the ESP32-32U) and utilizes two nRF24L01+PA+LNA modules. The use of two RF modules allows for simultaneous interference across different parts of the spectrum or increased packet density. The hardware setup typically includes:

- **Dual nRF24L01+ Modules**: Connected via HSPI and VSPI buses to maximize throughput.
- **OLED Display**: A 0.96" I2C display provides real-time feedback on the current operation mode.
- **Antenna Configuration**: Supports up to three antennas (two for the RF modules and one for the ESP32 itself) to ensure stable, long-range interference.
- **Power Management**: Includes support for 3.7V Li-Ion batteries with TP4056 charging modules for portable operation.

## Operation and User Interface

The ESP32-BlueJammer features a "Combo-Channel-Select" firmware that allows users to cycle through different jamming modes using the physical 'Boot' button on the ESP32. The system provides feedback through both the OLED screen and a status LED:

- **1 Blink**: Bluetooth Jamming
- **2 Blinks**: BLE Jamming
- **3 Blinks**: WiFi Jamming
- **4 Blinks**: RC/Drone Jamming

Upon powering on, the device immediately begins transmitting noise and unnecessary packets on the selected frequency range. This "plug-and-play" approach ensures that the device is ready for testing as soon as it is deployed.

## Firmware and Deployment

While the source code for the ESP32-BlueJammer remains closed-source to protect the developer's unique implementation of the frequency hopping and packet injection logic, the project provides pre-compiled binary files. Users can flash these files using a dedicated web-based flasher or standard ESP32 flashing tools. The project supports various hardware configurations, including generic builds and builds optimized for specific OLED pinouts.

## Legal and Ethical Disclaimer

It is critical to note that jamming wireless communications is illegal in many jurisdictions and can interfere with essential services. This project is intended strictly for educational purposes and authorized security testing in controlled environments. Users are responsible for ensuring their actions comply with local laws and regulations.
