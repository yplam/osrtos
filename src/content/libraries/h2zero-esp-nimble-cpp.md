---
title: esp-nimble-cpp
summary: esp-nimble-cpp is a high-performance, thread-safe C++ wrapper for the Apache
  NimBLE Bluetooth Low Energy stack, specifically optimized for the ESP32 series.
  It provides a resource-efficient alternative to the default Bluedroid-based library,
  significantly reducing RAM and Flash consumption while maintaining API compatibility
  with popular ESP32 BLE libraries.
slug: h2zero-esp-nimble-cpp
codeUrl: https://github.com/h2zero/esp-nimble-cpp
siteUrl: https://h2zero.github.io/esp-nimble-cpp/
star: 268
version: 2.3.4
lastUpdated: '2026-03-17'
licenses:
- Apache-2.0
libraryType: Wireless
createdAt: '2025-12-29'
updatedAt: '2026-03-17'
---

### Features


- Thread-safe implementation allowing characteristic and descriptor updates from any application thread.

- Significant resource optimization, consuming approximately 100kB less RAM and 50% less Flash than Bluedroid-based alternatives.

- Support for Bluetooth 5.0 features including Extended Advertising, 2M PHY, and Coded PHY.

- Comprehensive C++ class wrappers for BLE Device, Server, Client, Scan, and Advertising management.

- Native support for a wide range of Espressif targets including ESP32, S3, C2, C3, C5, C6, C61, H2, and P4.

- Synchronous and asynchronous connection options for BLE clients to prevent blocking application tasks.

- Automated 0x2902 descriptor management for handling client notification and indication subscriptions.

- Advanced security implementation supporting 'Just Works', Passkey Entry, and Numeric Comparison authentication.

- L2CAP infrastructure support for implementing connection-oriented channels.

- Customizable logging system with configurable verbosity levels and color-coded debug output via Kconfig.

- Dynamic attribute management allowing for the removal of services and characteristics at runtime.

- Efficient memory handling using the NimBLEAttValue class to minimize heap reallocations.

- Support for directed advertising and customizable discoverability modes.

- Integrated whitelist and bond management APIs for device filtering and security persistence.

- Configurable MTU exchange and Data Length Extension (DLE) support for optimized throughput.

- Compatibility layer for existing nkolban/esp32-snippets BLE codebases to ease migration.



The esp-nimble-cpp library is architected as an object-oriented C++ abstraction layer over the Apache NimBLE stack, which is the preferred BLE host for resource-constrained ESP32 applications. The design follows a singleton pattern for the core device management via `NimBLEDevice`, while utilizing a callback-driven architecture to handle asynchronous BLE events. By wrapping the underlying C-based NimBLE API, the library provides a structured hierarchy of Services, Characteristics, and Descriptors that mirror the GATT profile structure.

At its core, the library manages the complex state machine of the BLE stack, including scanning, advertising, and connection management. It introduces the `NimBLEAttValue` class to handle attribute data efficiently, reducing the overhead typically associated with string-based buffers. The library is designed to be thread-safe, utilizing FreeRTOS primitives to ensure that GATT operations can be performed safely across different system tasks without corrupting the stack state.

**Core Components:**
- **NimBLEDevice**: The central management hub for initializing the stack, managing security, and creating clients or servers.
- **NimBLEServer**: Manages the local GATT database and handles connections from remote central devices.
- **NimBLEClient**: Facilitates connections to remote peripherals, service discovery, and attribute manipulation.
- **NimBLEScan**: Handles the discovery of nearby advertising devices with configurable filters.
- **NimBLEAdvertising**: Manages the broadcasting of advertisement and scan response data.

### Use Cases

This library is ideal for:
- **IoT Sensor Nodes**: Implementing low-power peripherals that transmit sensor data to smartphones or gateways while requiring a minimal memory footprint.
- **Human Interface Devices (HID)**: Creating BLE keyboards, mice, or game controllers using the specialized `NimBLEHIDDevice` class.
- **Industrial Gateways**: Developing central devices that must maintain multiple simultaneous connections to various BLE peripherals.
- **Battery-Powered Wearables**: Applications where reducing Flash and RAM usage directly translates to better power efficiency and more room for application logic.

### Getting Started

To begin development, include `NimBLEDevice.h` in your project. Initialization is performed by calling `NimBLEDevice::init("Device Name")` within your `app_main` or `setup` function. For ESP-IDF users, the library requires Bluetooth to be enabled in `menuconfig`, with the 'Bluetooth host' set to NimBLE. Developers migrating from older libraries should consult the [1.x to 2.x Migration Guide](https://github.com/h2zero/esp-nimble-cpp/blob/main/docs/1.x_to2.x_migration_guide.md) and the [New User Guide](https://github.com/h2zero/esp-nimble-cpp/blob/main/docs/New_user_guide.md) for detailed implementation patterns and API changes. Comprehensive class documentation is available at the [official API reference](https://h2zero.github.io/esp-nimble-cpp/).
