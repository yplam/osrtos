---
title: McuManager Android
summary: A transport-agnostic Android implementation of the McuManager protocol used
  to manage microcontrollers running Apache Mynewt and Zephyr. It enables over-the-air
  (OTA) firmware upgrades, log and statistic collection, and remote file system management.
slug: mcumanager-android
codeUrl: https://github.com/JuulLabs-OSS/mcumgr-android
star: 53
version: 0.11.0
lastUpdated: '2021-09-23'
rtos: zephyr
topics:
- android
- ble
- dfu
- iot
- mcumgr
- mynewt
- newtmgr
- zephyr
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mcumanager-ios
- mcumgr-dart
- esp32-ble-ota-arduino
- mender-ota-example-for-stm32l4-and-zephyr-rtos
- pelion-device-management-client-example-for-mbed-os
- anjay-zephyr
---

## Overview

McuManager Android is a mobile library that implements the McuManager application layer protocol. This protocol is specifically designed to manage and monitor microcontrollers running embedded operating systems like Apache Mynewt and Zephyr. By providing a standardized way to interact with these devices, the library allows Android applications to perform complex tasks such as over-the-air (OTA) firmware upgrades, log collection, and file system manipulation.

The library is designed to be transport-agnostic, meaning it can be used over various communication channels. While it includes a default implementation for Bluetooth Low Energy (BLE) using Nordic Semiconductor's Android-BLE-Library, developers can extend the core functionality to support other transports like Serial or USB.

## Command Groups and Managers

Functionality in McuManager is organized into command groups, which are represented in the Android library as specialized Manager classes. These managers extend the base `McuManager` class and provide high-level APIs for specific tasks:

*   **DefaultManager**: Handles OS-level operations including task and memory pool statistics, device time synchronization, and remote resets.
*   **ImageManager**: Responsible for managing firmware images on the device, including querying image state and performing uploads.
*   **StatsManager**: Facilitates the retrieval of real-time statistics from the embedded system.
*   **ConfigManager**: Allows for reading and writing configuration values on the target device.
*   **LogManager**: Provides mechanisms to collect and stream logs from the microcontroller.
*   **FsManager**: Enables file-system operations, allowing users to upload or download files directly from the device's storage.

## Firmware Upgrade Workflow

One of the most critical features of this library is the `FirmwareUpgradeManager`. Firmware upgrades in the McuManager ecosystem typically follow a four-step process: `upload`, `test`, `reset`, and `confirm`. The library simplifies this by providing a state machine that handles these transitions automatically.

### Upgrade Modes

The library supports several modes for firmware updates, allowing developers to choose the level of safety required for their application:

*   **TEST_AND_CONFIRM**: The default and recommended mode. It uploads the image, tests it, resets the device, and then confirms the image. This provides a safety net; if the new firmware fails to boot, the device can revert to the previous working image.
*   **CONFIRM_ONLY**: A faster but riskier mode that skips the test phase. If the device fails to boot, it may require manual recovery (re-flashing).
*   **TEST_ONLY**: Useful for manual verification where the user wants to run the new image once without making it the permanent primary boot image.

### Implementation Example

Integrating the library into an Android application involves initializing a transporter and passing it to the upgrade manager. Below is a basic example of how to start a BLE-based firmware upgrade:

```java
// Initialize the BLE transporter with context and a BluetoothDevice
McuMgrTransport transport = new McuMgrBleTransport(context, bluetoothDevice);

// Initialize the FirmwareUpgradeManager
FirmwareUpgradeManager dfuManager = new FirmwareUpgradeManager(transport, dfuCallback);

// Start the firmware upgrade with the image data
dfuManager.start(imageData);
```

## State Management and Validation

The `FirmwareUpgradeManager` includes a `VALIDATE` state that runs before any data is uploaded. This state checks the current image slot status on the device. If the target image is already present in a secondary slot, the manager can skip the upload phase and move directly to testing or confirmation. This optimization significantly reduces the time required for re-attempts or multi-device synchronization.
