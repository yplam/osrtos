---
title: nrfBlueNullifier
summary: A security research tool designed to jam classic Bluetooth signals using
  ESP32 and NRF24L01+PA/LNA modules. It utilizes high-gain radio modules to broadcast
  constant carrier waves and perform rapid channel hopping across the 2.4GHz spectrum.
slug: nrfbluenullifier
codeUrl: https://github.com/wirebits/nrfBlueNullifier
lastUpdated: '2026-01-29'
licenses:
- GPL-3.0
image: /202604/nrfBlueNullifier_0.avif
rtos: ''
topics:
- bluetooth-classic
- bluetooth-nrf
- bluetooth-signal-jammer
- bluetooth-speaker
- bluetooth-speakers
- nrf24l01
- nrf24l01plus
isShow: true
createdAt: '2026-04-08T00:07:40+00:00'
updatedAt: '2026-04-08T00:07:40+00:00'
---

## Overview

nrfBlueNullifier is a specialized hardware tool designed for signal interference research, specifically targeting classic Bluetooth communications. By leveraging the popular ESP32 microcontroller and the NRF24L01+PA/LNA radio module, this project creates a mechanism to disrupt Bluetooth connectivity in a localized area. It works by broadcasting a constant carrier signal across the frequency channels used by Bluetooth devices, effectively "nullifying" the signal and preventing successful data exchange.

While the NRF24L01 is typically used for low-power wireless data transmission, nrfBlueNullifier repurposes its hardware capabilities. By forcing the module into a continuous transmission mode and rapidly cycling through channels, it creates enough noise to overwhelm standard Bluetooth frequency-hopping spread spectrum (FHSS) signals.

## Hardware Architecture

The project is designed to be flexible, supporting multiple hardware configurations depending on the desired level of interference and available components. It primarily targets the ESP32 platform due to its robust SPI support and high processing speed, which is necessary for rapid frequency switching.

### Single Module Configuration
For users with a single NRF24L01+PA/LNA module, the project provides two distinct wiring and code options based on the ESP32's SPI buses:
- **VSPI Implementation:** Utilizes the standard Virtual SPI pins, common in many ESP32 development boards.
- **HSPI Implementation:** Uses the Hardware SPI pins, allowing for alternative pin mapping if the VSPI pins are occupied by other peripherals like displays or SD cards.

### Dual Module Configuration
To increase the effectiveness of the interference, nrfBlueNullifier supports a dual-module setup. In this configuration, two NRF24L01 modules are used simultaneously—one connected to the VSPI bus and the other to the HSPI bus. This allows the system to sweep and randomize transmission frequencies across two different channels at once, significantly increasing the density of the interference across the 2.4GHz spectrum.

## Technical Implementation

The firmware relies on the **RF24 library** to interface with the radio hardware. A key aspect of the project's operation is how it manages the host ESP32's internal resources. To ensure that the NRF24L01 modules have maximum power stability and to prevent internal signal conflicts, the firmware explicitly disables the ESP32’s onboard Bluetooth and Wi-Fi controllers.

This is achieved by including low-level ESP-IDF headers such as `esp_bt.h`, `esp_wifi.h`, and `esp_bt_main.h`. By calling the appropriate de-initialization functions for these internal radios, the project minimizes electromagnetic interference from the host board itself and ensures that the SPI communication with the external NRF24L01 modules remains timing-accurate.

## Operation and Logic

The core logic of the firmware involves a continuous loop that performs the following actions:
1.  **Channel Selection:** The code selects specific frequencies within the 2.4GHz ISM band that overlap with standard Bluetooth channels.
2.  **Carrier Transmission:** It instructs the NRF24L01 to enter a constant carrier mode, which transmits an unmodulated signal at maximum power (+PA/LNA).
3.  **Rapid Hopping:** The firmware quickly hops between these channels to match the frequency-hopping nature of Bluetooth, ensuring that the interference covers the entire band rather than just a single static frequency.

By utilizing the "PA/LNA" (Power Amplifier / Low Noise Amplifier) versions of the NRF24L01, the tool achieves a much greater range and signal strength than standard low-power modules, making it a potent tool for testing the resilience of Bluetooth-enabled devices against intentional interference.
