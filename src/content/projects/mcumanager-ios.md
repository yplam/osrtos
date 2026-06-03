---
title: McuManager iOS
summary: A transport-agnostic implementation of the McuManager protocol for iOS, enabling
  over-the-air (OTA) firmware upgrades and device management for microcontrollers
  running Zephyr or Apache Mynewt. It provides a modular architecture with specialized
  managers for image handling, file system access, and system logging.
slug: mcumanager-ios
codeUrl: https://github.com/JuulLabs-OSS/mcumgr-ios
star: 42
version: 0.12.0
lastUpdated: '2021-09-24'
rtos: zephyr
libraries:
- mcuboot
topics:
- ble
- dfu
- ios
- iot
- mcumgr
- mynewt
- newtmgr
- zephyr
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mcumanager-android
- mcumgr-dart
- pelion-device-management-client-example-for-mbed-os
- mender-ota-example-for-stm32l4-and-zephyr-rtos
- anjay-zephyr
- nimble-ota
---

## Overview

McuManager iOS is a mobile library designed to facilitate communication between iOS applications and microcontrollers using the McuManager protocol. Also known as the Newt Manager (NMP) or Simple Management Protocol (SMP), this application-layer protocol is the standard for managing and monitoring devices running the Apache Mynewt RTOS or the Zephyr Project. It is most commonly utilized for performing robust over-the-air (OTA) firmware updates in conjunction with the MCUboot bootloader.

## Modular Command Groups

The library is structured into several "Managers," each responsible for a specific functional group of the McuManager protocol. This modularity allows developers to interact with only the subsystems they need:

*   **ImageManager**: Handles firmware image state on the device and manages binary uploads to different flash slots.
*   **DefaultManager**: Provides core OS-level commands, including task statistics, memory pool monitoring, device resets, and time synchronization.
*   **FileSystemManager**: Enables the downloading and uploading of files directly to and from the device's internal file system.
*   **Stats & Config Managers**: Allow for reading real-time statistics and reading or writing configuration values on the fly.
*   **Log & Crash Managers**: Facilitate the collection of system logs and the execution of crash tests for debugging purposes.

## Firmware Upgrade Workflow

One of the primary use cases for McuManager iOS is the `FirmwareUpgradeManager`. This component provides a high-level abstraction for the multi-step firmware update process, which typically involves uploading the image, testing it, resetting the device, and confirming the new firmware. 

The manager supports several modes to ensure safety and reliability:
*   **.testAndConfirm**: The recommended mode. It uploads the image and tests it; if the device fails to boot the new image, it automatically reverts to the previous version upon the next reset.
*   **.confirmOnly**: Directly confirms the image after upload, which is faster but riskier if the new firmware is unstable.
*   **.testOnly**: Useful for manual verification before final confirmation.

### Example Implementation

Integrating the library into a Swift project is straightforward. Developers initialize a transport layer (typically BLE) and pass it to the desired manager:

```swift
// Initialize the BLE transporter using a scanned peripheral
let bleTransport = McuMgrBleTransport(cbPeripheral)

// Initialize the FirmwareUpgradeManager using the transport and a delegate
let dfuManager = FirmwareUpgradeManager(bleTransport, delegate)

// Start the firmware upgrade with the image data
dfuManager.start(data: imageData)
```

## Transport and Logging

While the library includes a default Bluetooth Low Energy transport (`McuMgrBleTransport`), it is designed to be transport-agnostic. By conforming to the `McuMgrTransport` protocol, developers can extend the library to work over other interfaces such as Serial, Wi-Fi, or even custom proprietary links.

For developers, the library offers deep visibility through its logging system. By implementing the `McuMgrLogDelegate`, you can capture protocol-level logs and integrate them with the iOS unified logging system (OSLog), making it easier to debug complex interactions between the mobile app and the embedded hardware.

***Note: This repository is currently deprecated. Developers are encouraged to use the maintained forks provided by Nordic Semiconductor for ongoing projects.***
