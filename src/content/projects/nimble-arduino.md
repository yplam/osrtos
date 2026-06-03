---
title: NimBLE-Arduino
summary: A lightweight Bluetooth Low Energy (BLE) library for Arduino based on the
  NimBLE stack. It provides a resource-efficient alternative to the standard Bluedroid-based
  BLE library for ESP32 and Nordic nRF5 series microcontrollers, significantly reducing
  flash and RAM usage.
slug: nimble-arduino
codeUrl: https://github.com/h2zero/NimBLE-Arduino
siteUrl: https://h2zero.github.io/NimBLE-Arduino/
star: 984
version: 2.3.7
lastUpdated: '2025-10-30'
rtos: freertos
libraries:
- nimble
topics:
- arduino
- arduino-ble-library
- arduinoble
- ble
- bluetooth
- bluetooth-arduino
- bluetooth-le
- bluetooth-low-energy
- esp32
- nimble
- nimble-arduino-library
- nrf51
- nrf52
isShow: true
createdAt: '2026-01-01'
updatedAt: '2026-01-04'
relatedProjects:
- arduino-serial-ble
- nimble-ota
- n-able-arduino-core
- hijelhid-blekeyboard
- esp32-ble-ota-arduino
- bleota-esp32-ota-updates-over-ble
---

## Overview

NimBLE-Arduino is a high-performance, resource-efficient Bluetooth Low Energy (BLE) stack for the Arduino framework. It is a fork of the Apache NimBLE stack, specifically refactored to compile within the Arduino IDE and PlatformIO environments. The project serves as a lightweight alternative to the original Bluedroid-based BLE library commonly used with ESP32 microcontrollers.

The primary advantage of NimBLE-Arduino is its significantly lower resource footprint. Compared to the standard Bluedroid library, it uses approximately 50% less flash space and roughly 100KB less RAM while maintaining nearly 100% compatibility with existing application code. This makes it an ideal choice for complex projects where memory and storage are at a premium.

## Hardware Support

The library is designed to support a wide range of modern microcontrollers:

*   **Espressif Systems:** Full support for the ESP32, ESP32-C3, ESP32-S3, ESP32-C6, ESP32-H2, ESP32-C2, and ESP32-C5.
*   **Nordic Semiconductor:** Support for the nRF51 and nRF52 series (requires the use of the n-able Arduino core).

For Nordic devices, NimBLE-Arduino provides a completely open-source and configurable BLE stack. Unlike proprietary SoftDevices, this allows for full debugging, better resource management, and a cross-platform API.

## Key Features and Capabilities

NimBLE-Arduino is not just a port; it is an actively developed library that introduces several enhancements over the original ESP32 BLE implementations:

*   **Performance Optimizations:** Reduced CPU overhead and improved stability for both server and client applications.
*   **Bluetooth 5 Support:** Includes support for Extended Advertising, Coded PHY (Long Range), and 2M PHY on capable hardware.
*   **Flexible Configuration:** Users can customize the stack via the `src/nimconfig.h` file, allowing them to adjust parameters like the maximum number of concurrent connections (defaulting to 3 on ESP32).
*   **Beacon Support:** Includes specialized examples for BLE Beacons, Eddystone, and iBeacon implementations.
*   **L2CAP Infrastructure:** Recent updates have introduced L2CAP support for more advanced data transfer scenarios.

## Technical Implementation

The library tracks the `esp-nimble` repository (specifically the `nimble-1.5.0-idf` branch). On ESP32 targets, it utilizes the FreeRTOS porting layer to manage timing and task execution. For developers using the ESP-IDF directly rather than Arduino, the author maintains a separate component version of this library called `esp-nimble-cpp`.

One of the standout technical features is the `NimBLEAttValue` class, which was introduced to reduce the RAM footprint of characteristic and descriptor values. It supports seamless conversions from Arduino Strings and various other data types, making it easier to integrate with standard Arduino sketches.

## Migration and Versioning

With the release of Version 2.x, the library has undergone significant refactoring to improve the API and performance. While Version 2 introduces some breaking changes—such as the removal of the `NimBLESecurity` class in favor of more streamlined connection info—the project provides extensive migration guides to help users transition from 1.x or from the original Bluedroid library.

## Getting Started

To use the library in an Arduino sketch, simply include the main header:

```cpp
#include "NimBLEDevice.h"
```

For PlatformIO users, the library can be added to the `platformio.ini` configuration:

```ini
lib_deps =
    h2zero/NimBLE-Arduino@^2.1.0
```

Detailed examples for creating a `NimBLE_Server` or `NimBLE_Client` are included in the repository, providing a roadmap for implementing services, characteristics, and scanning logic.
