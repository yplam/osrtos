---
title: Send My Sensor
summary: A Zephyr RTOS-based firmware that leverages Apple's Find My network to transmit
  sensor data from offline devices. It broadcasts Bluetooth Low Energy advertisements
  containing sensor readings, which are then forwarded by nearby Apple devices to
  the OpenHaystack ecosystem.
slug: send-my-sensor
codeUrl: https://github.com/koenvervloesem/send-my-sensor
star: 22
lastUpdated: '2022-06-10'
rtos: zephyr
topics:
- ble
- bluetooth-low-energy
- bme280
- find-my
- nrf52840
- openhaystack
- ruuvitag
- ruuvitag-sensor
- sensor
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- openhaystack-zephyr-firmware
- ruuvitag-firmware-for-zephyr-os
- sensilo-ble-sensor-node
- esp32-watch-for-openhaystack
- lorawan-end-device-with-freertos-and-esp32
- bluetooth-mesh-sensor-network
---

## Overview

Send My Sensor is an innovative proof-of-concept project that enables data transmission from embedded devices without a direct internet connection. By leveraging the OpenHaystack framework, the project (ab)uses Apple's Find My network to relay sensor data. The firmware broadcasts Bluetooth Low Energy (BLE) advertisements that mimic the behavior of Apple-compatible tracking tags. When a nearby Apple device picks up these signals, it automatically forwards the encrypted location/data payload to Apple's servers, where it can later be retrieved using specialized tools.

## Technical Foundation

The project is built on the Zephyr Real-Time Operating System (RTOS). Choosing Zephyr provides significant advantages in terms of portability and hardware abstraction. Because the firmware is based on the Zephyr ecosystem, it can be adapted to run on a wide variety of Bluetooth Low Energy microcontrollers beyond the initially tested hardware. 

The application specifically integrates with the OpenHaystack Zephyr module to handle the complexities of the Find My protocol. In its default configuration, the firmware reads environmental data from a Bosch BME280 temperature, humidity, and pressure sensor, though the modular nature of Zephyr allows for easy adaptation to other sensor types.

## Hardware Support

While the project is designed to be portable, it has been explicitly tested and verified on several popular development platforms:

- **Nordic Semiconductor nRF52840 Dongle**: A compact USB-based BLE development tool. The project includes specific device overlays for connecting a BME280 sensor via I²C.
- **RuuviTag**: An open-source Bluetooth sensor beacon based on the nRF52832. Older versions of the RuuviTag feature a built-in BME280, making them an ideal self-contained platform for this firmware.

## Implementation Details

The firmware operates by encoding sensor readings into the payload of BLE advertisements. Users must specify a unique `modem_id` within the source code to identify their specific device in the tracking network. Once flashed, the device begins broadcasting; the data eventually becomes visible in the Send My DataFetcher application on macOS.

As a proof-of-concept, the project currently focuses on functionality over optimization. It does not yet implement advanced power management, meaning battery-powered deployments may require further tuning for long-term use. Additionally, the current implementation transmits data without extra encryption layers beyond the base protocol, meaning anyone with the modem ID can technically read the broadcasted messages.

## Getting Started

Building the project requires a standard Zephyr development environment. The workflow involves initializing a workspace using the `west` tool, fetching the OpenHaystack Zephyr module, and then compiling the application for the target board. For boards like the nRF52840 Dongle, the project provides specific instructions for packaging the firmware into a DFU (Device Firmware Update) zip file for flashing over USB.
