---
title: 'xoss_sync: Open Source BLE Sync for XOSS Cyclo-computers'
summary: A synchronization tool written in CPython and MicroPython for fetching FIT
  activity files from XOSS and Cycplus cyclo-computers via Bluetooth Low Energy (BLE).
  It implements the YMODEM protocol over the Nordic UART Service to provide an open-source
  alternative to proprietary mobile applications.
slug: xoss-sync-open-source-ble-sync-for-xoss-cyclo-computers
codeUrl: https://github.com/ekspla/xoss_sync
star: 17
lastUpdated: '2026-02-28'
rtos: freertos
libraries:
- micropython
- nimble
topics:
- aioble
- bicycle-computer
- ble
- bleak
- bluetooth-low-energy
- cycling
- cycplus
- esp32
- fit
- fit-file
- gps
- linux
- macos
- micropython
- nordic-uart-service
- python
- python3
- windows
- xoss
- ymodem
isShow: false
createdAt: '2026-03-22'
updatedAt: '2026-03-22'
---

## Overview

xoss_sync is a specialized utility designed to bridge the gap between proprietary cycling hardware and open data standards. Many modern cyclo-computers, such as the XOSS G+ series, rely on closed-source mobile applications and cloud services to sync activity data. This project provides a transparent, open-source alternative using Python (CPython) and MicroPython to fetch FIT (Flexible and Interoperable Data Transfer) files directly from the device over Bluetooth Low Energy (BLE).

By implementing the file transfer logic independently, xoss_sync allows users to take full control of their GPS track logs without requiring an internet connection or a proprietary account. The project is particularly useful for privacy-conscious cyclists and developers looking to integrate cycling data into custom dashboards or local storage solutions.

## Technical Implementation

The project leverages the **YMODEM protocol** over the **Nordic UART Service (NUS)**, which is a common pattern for file transfers in Nordic Semiconductor-based embedded devices. It supports both standard 128-byte (SOH) and 1024-byte (STX) data blocks, though the latter is optimized for newer hardware generations.

### Cross-Platform Support

xoss_sync is available in two distinct versions:

1.  **PC Version (CPython):** Built using the `Bleak` library, this version is compatible with Windows, Linux (BlueZ), and macOS. It is ideal for users who want to sync their data directly to a laptop or desktop.
2.  **MicroPython (MPY) Version:** Specifically designed for the **ESP32** and **ESP32-S3** microcontrollers using the `aioble` library. This version enables the creation of standalone hardware sync boxes that can automatically download files to an SD card when a cyclo-computer is nearby.

## Key Features

- **Data Retrieval:** Automatically scans for target devices, lists available FIT files, and downloads new activities.
- **Storage Management:** Provides visibility into the device's free disk space.
- **Settings Configuration:** Allows users to modify device settings (such as timezone, backlight, and autopause) by uploading modified `Setting.json` files.
- **Performance Optimization:** The project includes extensive research into BLE connection intervals and MTU (Maximum Transmission Unit) sizes to maximize throughput. For MicroPython users, it even suggests FreeRTOS kernel modifications (`CONFIG_FREERTOS_HZ`) to achieve higher transfer speeds.

## Hardware Compatibility

While primarily tested on the **XOSS G+ (Gen1, Gen2, and Gen3)** and **XOSS NAV**, the project is designed with flexibility in mind. By adjusting the target device name and file list parameters (e.g., switching from `filelist.txt` to `workouts.json`), it can support a variety of similar devices, including:
- Cycplus M1/M2/M3
- CooSpo BC102/107/200
- ROCKBROS cyclo-computers

## Getting Started

For PC users, the process is as simple as installing the `bleak` library and running the script. The tool will scan for the device, connect, and begin downloading any FIT files not already present in the local directory.

```python
# Example of the PC version scanning and retrieving data
Scanning for Bluetooth devices...
Found target device: XOSS G-040989 - EC:37:9F:xx:yy:zz
Connected to XOSS G-040989
Free Diskspace: 684/8104kb
Retrieving 20240715062336.fit
Successfully wrote combined data to 20240715062336.fit
```

For embedded developers, the MicroPython version provides a robust starting point for building dedicated IoT gateways. It handles the complexities of asynchronous BLE communication and file system operations on SD cards, making it a powerful tool for the cycling community.
