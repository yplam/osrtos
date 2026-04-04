---
title: Arduino Serial BLE
summary: A library for ESP32 Arduino that implements the Nordic UART Service (NUS)
  to provide a HardwareSerial-compatible BLE interface. It supports both the standard
  ESP32 BLE stack and the memory-efficient NimBLE-Arduino library, while offering
  optional integration with the Embedded Template Library (ETL) for deterministic
  memory management.
slug: arduino-serial-ble
codeUrl: https://github.com/senseshift/arduino-ble-serial
siteUrl: https://senseshift.io
version: v1.2.2
lastUpdated: '2025-12-03'
licenses:
- MIT
rtos: freertos
libraries:
- nimble
- h2zero-esp-nimble-cpp
topics:
- arduino
- arduino-library
- bluetooth-low-energy
- esp32
- nimble
- platformio
- platformio-library
- serial-communication
- serialport
isShow: false
createdAt: '2026-04-04T00:45:04+00:00'
updatedAt: '2026-04-04T00:45:04+00:00'
---

Connecting embedded devices to mobile apps or desktop terminals often requires a reliable serial-like interface. The Arduino Serial BLE library simplifies this process for ESP32 developers by implementing the Nordic UART Service (NUS). This service is a widely recognized standard for transparent data over Bluetooth Low Energy (BLE), making it compatible with numerous mobile applications like nRF Connect and Serial Bluetooth Terminal.

One of the primary strengths of this library is its API design. By mimicking the standard `HardwareSerial` interface, it allows developers to treat a BLE connection just like a physical UART port. This means that functions like `available()`, `read()`, `write()`, and `print()` work exactly as expected, significantly lowering the barrier to entry for those familiar with traditional Arduino development.

### Optimization with NimBLE

Standard BLE implementations on the ESP32 can be heavy, consuming a large portion of available Flash and RAM. Arduino Serial BLE addresses this by providing native support for the NimBLE-Arduino stack. By switching to NimBLE, developers can see a dramatic reduction in resource usage. For instance, Flash usage can drop from roughly 85% to 44% on standard ESP32 modules, and RAM consumption is similarly optimized. This efficiency is crucial for complex projects where the BLE stack must coexist with other memory-intensive tasks or large application logic.

To use NimBLE, the library provides a simple configuration flag. In the Arduino IDE, this is handled by defining `BLESERIAL_USE_NIMBLE` before including the header, or via build flags in PlatformIO environments.

### Memory Management and ETL Support

For industrial or high-reliability applications, dynamic memory allocation (the heap) can be a source of fragmentation and unpredictable behavior. Arduino Serial BLE includes support for the Embedded Template Library (ETL). This allows developers to use fixed-capacity queues or circular buffers for the internal BLE read buffer. By utilizing `etl::queue` or `etl::circular_buffer`, the library can operate with deterministic memory usage, ensuring that the serial bridge remains stable even under heavy data loads.

### Customization and Flexibility

While the library defaults to the standard Nordic UART UUIDs, it is fully configurable. This is particularly useful when interfacing with proprietary systems or specific hardware like the Microchip BM70 or RN4870 modules, which use different UUID sets for their transparent UART services. Developers can pass custom Service and Characteristic UUIDs directly into the `begin()` function or even provide pre-configured BLE characteristics for advanced control over properties like encryption and permissions.

### Basic Implementation Example

Setting up a basic bridge between the physical serial port and BLE is straightforward:

```cpp
#include <BLESerial.h>

BLESerial<> SerialBLE;

void setup() {
    Serial.begin(9600);
    SerialBLE.begin("ESP32-BLE-Slave");
}

void loop() {
    // Forward data from Physical Serial to BLE
    if (Serial.available()) {
        SerialBLE.write(Serial.read());
        SerialBLE.flush();
    }
    // Forward data from BLE to Physical Serial
    if (SerialBLE.available()) {
        Serial.write(SerialBLE.read());
    }
}
```

Beyond simple data echoing, the library supports secure connections. By implementing security callbacks, developers can handle passkey authentication and encrypted pairing, ensuring that the serial data remains private and the device is protected from unauthorized access. Whether you are building a simple wireless debug console or a secure industrial gateway, this library provides the tools necessary to bridge the gap between physical and wireless serial communication.
