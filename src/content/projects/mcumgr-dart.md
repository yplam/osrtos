---
title: mcumgr-dart
summary: A Dart client library for the mcumgr protocol, enabling device management
  and firmware updates for embedded systems running Apache Mynewt or Zephyr. It provides
  a transport-agnostic implementation of the Simple Management Protocol (SMP) with
  support for CBOR encoding and optimized image uploads.
slug: mcumgr-dart
codeUrl: https://github.com/jkdhn/mcumgr-dart
star: 8
lastUpdated: '2022-07-07'
rtos: apache-mynewt
libraries:
- mcuboot
topics:
- dart
- flutter
- mynewt
- zephyr
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mcumanager-ios
- mcumanager-android
- pelion-device-management-client-example-for-mbed-os
- anjay-zephyr
- nimble-ota
- golioth-firmware-sdk
---

## Overview

`mcumgr-dart` is a client-side implementation of the [mcumgr](https://github.com/apache/mynewt-mcumgr) device management protocol, written in Dart. This protocol is the standard management stack for the Apache Mynewt RTOS and is also widely used within the Zephyr Project ecosystem. The library allows developers to build mobile or desktop applications (often using Flutter) that can interact with embedded devices for tasks like firmware updates, file system management, and remote command execution.

## Key Features

### Device Firmware Upgrades (DFU)
The primary feature of the library is its ability to handle the complex workflow of updating firmware on a remote device. This includes:
- Fragmenting and uploading firmware images to the device's flash memory.
- Managing the state of image slots (e.g., setting an image to 'pending').
- Triggering reboots and confirming successful boots to prevent automatic rollbacks by the bootloader.

### Transport Agnostic Design
One of the library's strengths is that it does not mandate a specific communication layer. Instead, it provides a generic interface where the user provides a `Stream` for incoming bytes and a callback function for outgoing bytes. This makes it compatible with any transport layer, including:
- **Bluetooth LE:** Commonly used with the `flutter_blue` package for mobile DFU apps.
- **Serial/UART:** For direct wired management.
- **UDP/TCP:** For managing IoT devices over a network.

### Optimized Data Transfer
To handle the constraints of embedded communication, the library supports configurable chunk sizes and windowing. The `windowSize` parameter allows the client to send multiple data chunks before requiring an acknowledgment, which significantly improves upload speeds over high-latency links like Bluetooth.

## Technical Implementation

The library implements the Simple Management Protocol (SMP) and uses the `cbor` package for data serialization, matching the requirements of the mcumgr specification. It handles the header construction, sequence numbering, and payload encoding required to communicate with the mcumgr daemon running on the target microcontroller.

### Example Integration

Setting up a client involves initializing the `Client` class with your transport logic. For a Bluetooth LE implementation, the setup typically involves discovering the SMP service and characteristic, requesting a higher MTU for better performance, and piping the characteristic notifications into the mcumgr client:

```dart
final client = Client(
  input: characteristic.onValueChangedStream,
  output: (value) => characteristic.write(value, withoutResponse: true),
);
```

## Ecosystem Compatibility

`mcumgr-dart` is designed to be fully compatible with devices running the `mcumgr` server-side implementation. This includes devices using the **MCUboot** bootloader, which is the standard bootloader for both Apache Mynewt and Zephyr. By providing a Dart-native implementation, it fills a vital gap for Flutter developers looking to create professional-grade IoT commissioning and maintenance tools.
