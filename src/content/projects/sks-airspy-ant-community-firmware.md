---
title: SKS AIRSPY ANT+ Community Firmware
summary: An alternative firmware for the SKS AIRSPY tire pressure sensor based on
  the Zephyr RTOS. It implements the ANT+ TPMS device profile to allow integration
  with standard cycling computers, replacing the proprietary Bluetooth-only stock
  firmware. The project targets the nRF52832 SoC and supports features like OTA updates
  via MCUBoot and BLE logging.
slug: sks-airspy-ant-community-firmware
codeUrl: https://github.com/bitmeal/sks_airspy_ant_community_fw
star: 22
version: v1.2.3
lastUpdated: '2025-02-25'
rtos: zephyr
libraries:
- mcuboot
topics:
- airspy
- ant
- ant-plus
- antplus
- nrf52
- nrf52832
- sks
- tpms
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- ruuvitag-firmware-for-zephyr-os
- twatch-v3-firmware-for-esp32
- esp32-ble-ota-arduino
- openhaystack-zephyr-firmware
- bleota-esp32-ota-updates-over-ble
- opensleep
---

## Overview

The SKS AIRSPY is a popular tire pressure monitoring system (TPMS) for cyclists, but its stock firmware is limited to communicating with a proprietary companion app via Bluetooth. The SKS AIRSPY ANT+ Community Firmware is an open-source alternative designed to unlock the hardware's full potential. By implementing the industry-standard ANT+ TPMS device profile, this firmware allows the sensors to communicate directly with a wide range of cycling computers from manufacturers like Wahoo and Garmin, providing real-time pressure data without the need for a smartphone.

## Technical Foundation

Built on the Zephyr RTOS and the nRF Connect SDK, the firmware targets the Nordic Semiconductor nRF52832 SoC found inside the AIRSPY hardware (specifically the TPMS-10-2 board revision). The project leverages several sophisticated embedded technologies to provide a robust user experience:

- **Zephyr RTOS & ZBUS**: Utilizes the Zephyr ecosystem for thread management and the ZBUS (Zephyr Bus) for internal message passing between sensor reading, Bluetooth, and ANT+ modules.
- **ANT+ TPMS Profile**: Implements the Tyre Pressure Monitoring System profile, including common pages for battery state (Page 82), software version (Page 81), and manufacturer information (Page 80).
- **MCUBoot & OTA DFU**: Includes support for Over-the-Air Device Firmware Updates via Bluetooth Low Energy, allowing users to update the firmware using the nRF Connect mobile app after the initial physical flash.
- **Power Management**: Optimized for long-term battery life, achieving approximately 19µA in idle mode and 276µA during active operation, which translates to over a year of standby time on a standard 220mAh battery.

## Hardware and Installation

Because the stock SKS firmware uses signed update payloads, the initial installation of the community firmware requires physical access to the device's internal Serial Wire Debug (SWD) port. This involves opening the sensor housing and connecting a compatible programmer (such as a J-Link or Black Magic Probe) to the four-pin 1.27mm spacing port on the PCB. Once the chip is unlocked and the community firmware is flashed, subsequent updates can be performed wirelessly.

One unique feature of the firmware is its configuration flexibility. Users can set a custom Device ID via a specific BLE service UUID to match the laser engraving on the sensor body, ensuring that the digital ID remains consistent with the physical hardware even after replacing the original software.

## Features and Compatibility

The firmware is designed to be "set and forget." Once paired via ANT+, the sensor acts as a standard cycling peripheral. It has been tested successfully with devices like the Wahoo ELEMNT Bolt and Android-based ANT+ tools. Beyond pressure monitoring, the firmware provides diagnostic capabilities through a RTT (Real Time Transfer) console over SWD and logging over the Nordic UART Service (NUS) via Bluetooth, which is accessible for a short window after battery insertion.

## Development and Contribution

For developers looking to extend the project, it requires the nRF SDK and the ANT SDK. The project includes a specific patch for the ANT SDK to enable compatibility with the nRF52832 SoC. The source code is organized into modular components, with dedicated files for SPI communication with the pressure sensor, Bluetooth management, and ANT+ profile logic. The project is licensed under a mix of MPL-2.0, Apache-2.0, and Nordic-5-Clause licenses, reflecting its use of various open-source and vendor-specific components.
