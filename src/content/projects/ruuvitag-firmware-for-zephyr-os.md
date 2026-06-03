---
title: Ruuvitag Firmware for Zephyr OS
summary: A firmware implementation for RuuviTag sensor nodes based on the Zephyr RTOS
  and Nordic Semiconductor's nRF Connect SDK. It supports environmental sensing, Bluetooth
  Low Energy (BLE) beaconing, and secure remote firmware updates via MCUBoot.
slug: ruuvitag-firmware-for-zephyr-os
codeUrl: https://github.com/a-smiggle/ruuvitag_fw_zephyr
star: 10
version: v1.4.1
lastUpdated: '2022-11-26'
rtos: zephyr
libraries:
- mcuboot
- littlefs
topics:
- ruuvitag
- zephyr
- zephyr-os
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- openhaystack-zephyr-firmware
- sensilo-ble-sensor-node
- blue-clover-plt-demo-v2-zephyr-firmware
- sks-airspy-ant-community-firmware
- twatch-v3-firmware-for-esp32
- open-display-firmware
---

The ruuvitag_fw_zephyr project provides a modern firmware implementation for the RuuviTag sensor platform, leveraging the power and flexibility of the Zephyr Real-Time Operating System (RTOS). Developed using the nRF Connect SDK (NCS), this firmware transitions the RuuviTag ecosystem into a highly modular and scalable environment suitable for professional IoT deployments.

## Core Functionality

At its heart, the firmware is designed to transform a RuuviTag into a versatile IoT sensor node. It integrates several key hardware components and drivers to provide a comprehensive sensing solution:

- **Environmental Sensing**: Built-in support for the BME280 sensor to monitor temperature, humidity, and atmospheric pressure.
- **Precision Temperature**: Integration with the TMP117 sensor for applications requiring high-accuracy thermal monitoring.
- **Motion Tracking**: Driver support for the LIS2DH12 accelerometer to detect movement or orientation.
- **Connectivity**: Bluetooth Low Energy (BLE) for broadcasting sensor data (beaconing) and NFC for device identification and configuration.

## Secure Updates and Bootloading

One of the standout features of this implementation is its robust support for remote Device Firmware Updates (DFU). By integrating MCUBoot, the project ensures that firmware can be safely updated over-the-air. Users can trigger update mode by interacting with the hardware buttons during boot or runtime. 

Once in DFU mode, the device remains connectable for a configurable timeout—defaulting to 2 minutes—allowing updates via standard tools like the nRF Connect mobile application. The system uses the LittleFS file system and MCUMGR to manage image uploads and system state during the update process.

## Technical Architecture

The project follows the standard Zephyr application structure, making it easy for developers familiar with the ecosystem to navigate. It utilizes `prj.conf` for kernel and feature configuration, enabling specific subsystems like the BLE controller, I2C/SPI drivers, and hardware info retrieval. 

The build system is managed via CMake, with a convenient `Makefile` provided to simplify common tasks. This wrapper allows developers to quickly build different variants of the firmware, including debug builds and versions bundled with the bootloader.

## Getting Started

Building the firmware requires a properly configured nRF Connect SDK environment (specifically tested with NCS v1.7.0). Once the environment is set up, the project can be compiled and flashed using simple commands:

```bash
# Build the standard firmware and flash it to a connected board
make

# Build the full firmware including the MCUBoot bootloader
make app_bootloader

# View debug messages from the device
make debug
```

The firmware is designed to be power-efficient, utilizing Zephyr's power management features and the nRF52's DCDC converters to maximize battery life on the coin-cell powered RuuviTag hardware. This makes it an ideal choice for long-term remote sensing applications where reliability and low maintenance are critical.
