---
title: FZ nRF24 Jammer
summary: An RF interference application for the Flipper Zero platform that utilizes
  NRF24L01 modules to suppress 2.4GHz signals. It supports multiple hardware configurations,
  including single, dual, and quad module setups, to target Bluetooth, Wi-Fi, Zigbee,
  and drone communications.
slug: fz-nrf24-jammer
codeUrl: https://github.com/W0rthlessS0ul/FZ_nRF24_jammer
star: 87
version: V1.5.0
lastUpdated: '2026-01-19'
rtos: freertos
topics:
- ble
- bluetooth
- flipper
- jammer
- nrf24
- wifi
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- nrf24-jammer
- espnrf24-jammer
- esp32-bluejammer
- esp32-2-4ghz-jammer
- nrf24-bluejammer
- c3mini-bluejammer
---

## Overview

The FZ nRF24 Jammer is a specialized application designed for the Flipper Zero, enabling users to explore the world of RF interference and signal suppression. By integrating the Flipper Zero with external NRF24L01+PA+LNA modules, this project provides a portable solution for jamming various 2.4GHz technologies. It is particularly effective against Bluetooth, BLE, Wi-Fi, Zigbee, and drone control signals.

## Hardware Architecture

The project is built around the NRF24L01+PA+LNA module, which is known for its versatility in the 2.4GHz ISM band. To ensure stable operation, the hardware design incorporates a 16V 100µF capacitor and an AMS1117 3.3V step-down module. The power regulation is a critical component; versions prior to 1.4.0 required an update to include the AMS1117 to prevent incorrect module behavior due to power instability.

One of the most interesting aspects of this project is its scalability. It supports three distinct hardware configurations:
- **Single nRF24:** Uses the HSPI connection on the Flipper Zero.
- **Two nRF24:** Utilizes both HSPI and VSPI connections.
- **Four nRF24:** A complex setup using multiple GPIO pins for control signals.

In these multi-module configurations, the SPI interfaces share the clock (SCK) and data lines (MOSI, MISO), while separate control signals (CSN and CE) manage the individual modules. This allows the Flipper Zero to coordinate multiple transmitters for more effective interference.

## Technical Capabilities

The jammer operates by flooding specific frequencies within the 2.4GHz spectrum, effectively drowning out legitimate signals. The application provides specific modes for different targets:
- **Bluetooth & BLE:** Disrupting wireless audio and device pairing.
- **Wi-Fi:** Suppressing 802.11 signals on the 2.4GHz band.
- **Drones:** Interfering with the control links of various UAVs.
- **Zigbee:** Disrupting smart home mesh networks.

## User Interface and Control

The application features a custom menu system tailored for the Flipper Zero's physical buttons. Users can navigate through menu items using the directional pad and select options with the OK button. The "Misc Jammer" mode offers granular control over the target frequency:
- **Channel Adjustment:** Short presses change the channel by 1, while double and triple presses jump by 10 or 100 channels respectively.
- **Continuous Scanning:** Long presses allow for rapid channel scrolling.
- **Mode Switching:** The left and right buttons allow users to toggle between different jamming algorithms and target profiles.

## Installation and Setup

Deploying the FZ nRF24 Jammer involves downloading the appropriate application file (.fap) for the user's specific Flipper Zero firmware. Using the qFlipper desktop tool, the application can be transferred directly to the device's file system. Once the hardware is soldered according to the provided schematics (HSPI/VSPI layouts), the jammer is ready for field testing and RF research.
