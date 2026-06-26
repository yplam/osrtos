---
title: Mbed BLE GAP Scanner
summary: A BLE GAP scanning application built on Mbed OS that demonstrates the use
  of LE_CODED PHY for increased communication range. It features a robust advertising
  data parser and event-driven architecture for discovering and reporting nearby BLE
  devices.
slug: mbed-ble-gap-scanner
codeUrl: https://github.com/tjpetz/mbed_BLE_GAP_scanner
star: 0
lastUpdated: '2021-04-11'
rtos: mbed-os
topics:
- arduino
- ble
- bluetooth
- mbed-os
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mbed-os-ble-gap-advertiser-for-arduino-nano-33-ble
- ghostble
- develop-your-own-bluetooth-low-energy-applications
- esp32-ble-uart-mx
- openhaystack-zephyr-firmware
- ble-sniffer-for-nrf54l15
---

## Overview

The Mbed BLE GAP Scanner is a specialized example project designed to demonstrate Bluetooth Low Energy (BLE) scanning capabilities using the Mbed OS framework. Its primary focus is the utilization of the LE_CODED PHY, a feature introduced in Bluetooth 5.0 that provides significantly greater range compared to the standard 1M or 2M PHYs. This project is intended to work in tandem with a corresponding advertiser project to test and validate long-range BLE communications.

## Technical Implementation

Built upon the Mbed OS BLE API, the project implements a robust GAP (Generic Access Profile) scanner. It leverages the `ble::Gap::EventHandler` to manage asynchronous events such as advertising reports, connection updates, and PHY changes. 

One of the core components of the application is the use of the `events::EventQueue`. This ensures that all BLE callbacks are serialized and processed on a safe user thread, preventing race conditions and ensuring system stability. The scanner is configured to look for devices on multiple PHYs simultaneously, including both the standard 1M PHY and the long-range LE Coded PHY.

### Key Features

- **Long Range Support**: Specifically configured to scan using the LE_CODED PHY for extended distance communication.
- **Advanced Payload Parsing**: Includes a comprehensive implementation of `ble::AdvertisingDataParser` to extract and display various fields from advertising packets, such as:
  - Local Names (Complete and Shortened)
  - Service UUIDs (16-bit, 32-bit, and 128-bit)
  - TX Power Levels and RSSI
  - Manufacturer Specific Data
  - Appearance and Flags
- **Dynamic PHY Management**: The application attempts to upgrade the preferred PHY to 2M where supported to reduce power consumption during active connections.
- **Detailed Reporting**: Outputs real-time scan results to the serial console, providing MAC addresses, signal strength, and decoded advertising flags.

## Scanning Logic

The scanning process is defined by specific intervals and windows. The application uses a scan interval of 80 (50ms) and a scan window of 60 (37.5ms) for the Coded PHY, while maintaining a separate configuration for the 1M PHY. This dual-configuration allows the device to remain compatible with standard BLE devices while prioritizing long-range discovery.

```cpp
ble_error_t error = _gap.setScanParameters(
  ble::ScanParameters()
    .setPhys(true, true)
    .setCodedPhyConfiguration(ble::scan_interval_t(80), ble::scan_window_t(60), false)
    .set1mPhyConfiguration(ble::scan_interval_t(100), ble::scan_window_t(40), false)
);
```

## Getting Started

To use this project, you need an Mbed OS compatible development board equipped with a Bluetooth 5.0 (or later) radio that supports Coded PHY features (such as the Nordic Semiconductor nRF52840). The project is structured as an Arduino-compatible `.ino` file but relies heavily on Mbed OS headers. 

Upon startup, the device initializes the BLE stack, prints its own MAC address, and begins scanning. When a device is found, the serial output provides a detailed breakdown of the peer's capabilities and identity. This makes it an excellent tool for debugging BLE environments or evaluating the performance of Bluetooth Long Range in real-world scenarios.
