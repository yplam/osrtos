---
title: ESP32 BLE OTA Arduino
summary: A project enabling Over-the-Air (OTA) firmware updates for ESP32 microcontrollers
  using Bluetooth Low Energy (BLE). It supports both the standard ESP32 BLE library
  and the more memory-efficient NimBLE-Arduino, providing Python scripts and an Android
  app for the update process.
codeUrl: https://github.com/fbiego/ESP32_BLE_OTA_Arduino
siteUrl: https://github.com/fbiego/ESP32_BLE_OTA_Arduino
isShow: false
rtos: freertos
libraries:
- nimble
- spiffs
topics:
- android
- arduino
- ble
- bluetooth-le
- bluetooth-low-energy
- esp32
- firmware
- ota
- ota-update
- spiffs
star: 262
lastUpdated: '2024-08-12'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- bleota-esp32-ota-updates-over-ble
- nimble-ota
- open-display-firmware
- multi-firmware-esp
- arduino-serial-ble
- esp32-ble-uart-mx
---

Updating firmware on an ESP32 is a common requirement for IoT devices, but most standard solutions rely on a Wi-Fi connection. In scenarios where Wi-Fi is unavailable, unreliable, or too power-hungry, Bluetooth Low Energy (BLE) offers a compelling alternative. The **ESP32_BLE_OTA_Arduino** project provides a robust implementation for performing OTA updates over BLE, allowing developers to push new firmware directly from a smartphone or a computer.

### Overview and Performance

The project demonstrates how to handle large binary transfers over BLE characteristics to update the ESP32's flash memory. According to the project benchmarks, it can achieve upload speeds of approximately **12kb/s peak**, allowing a ~1MB firmware file to be uploaded in roughly 1 minute and 25 seconds. This is a significant improvement over older BLE OTA implementations which often hovered around 3kb/s.

### Flexible Library Support

One of the key strengths of this repository is its flexibility regarding BLE stacks. It provides two main implementations:
1.  **Standard BLE**: Uses the default `BLEDevice.h` library included with the ESP32 Arduino core. This is straightforward but has a larger memory footprint.
2.  **NimBLE**: Uses the `NimBLE-Arduino` library, which is significantly more memory-efficient. This is often preferred in complex projects where RAM and Flash space are at a premium.

### Storage and File Systems

The project supports different internal storage mechanisms for the update process. Users can choose between **SPIFFS** and **FFat** (FatFS on Flash). While SPIFFS is common, the project notes that FFat is generally faster for write operations, which contributes to the "Fast Mode" capability during the update process.

### Technical Implementation

The system works by defining a specific BLE Service and Characteristics for data reception (RX) and status transmission (TX). The firmware is sent in chunks, which are then processed using the standard Arduino `Update.h` library. Below is a snippet of the UUIDs and mode definitions used in the project:

```c
#define SERVICE_UUID              "fb1e4001-54ae-4a28-9f74-dfccb248601d"
#define CHARACTERISTIC_UUID_RX    "fb1e4002-54ae-4a28-9f74-dfccb248601d"
#define CHARACTERISTIC_UUID_TX    "fb1e4003-54ae-4a28-9f74-dfccb248601d"

#define NORMAL_MODE   0   // normal operation
#define UPDATE_MODE   1   // receiving firmware
#define OTA_MODE      2   // installing firmware
```

### Ecosystem and Tools

To facilitate the update process, the developer provides multiple client-side tools:
-   **Android App**: A dedicated application available on the Google Play Store designed specifically to interface with this BLE OTA service.
-   **Python Scripts**: For developers who prefer updating from a PC, the repository includes `ota_updater.py` and `discover.py`. These scripts use Python's BLE capabilities to find the ESP32 and stream the binary file.

### Getting Started

To use this project, you can clone the repository and open the provided `.ino` files in the Arduino IDE or use the PlatformIO configuration. If you are using the NimBLE version, ensure you have the `h2zero/NimBLE-Arduino` library installed. The project is configured for the `esp32doit-devkit-v1` by default but can be easily adapted for other ESP32 variants. Once the firmware is flashed, you can use the Python script or the Android app to select a new `.bin` file and begin the wireless update process.
