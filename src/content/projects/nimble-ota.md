---
title: NimBLE OTA
summary: NimBLE OTA is a specialized library for ESP32 devices that enables firmware
  updates over Bluetooth Low Energy (BLE). It leverages the memory-efficient NimBLE
  stack to provide a robust OTA service, featuring secure authentication, progress
  tracking, and compatibility with both Python-based and web-based upload tools.
slug: nimble-ota
codeUrl: https://github.com/h2zero/NimBLEOta
version: 0.2.0
lastUpdated: '2025-04-12'
licenses:
- MIT
image: /202603/NimBLEOta_0.avif
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- nimble
topics:
- arduino
- ble
- esp32
- nimble
- nimble-arduino-library
- over-the-air-update
isShow: true
createdAt: '2026-03-31'
updatedAt: '2026-03-31'
---

Updating firmware wirelessly is a fundamental requirement for modern IoT devices, especially those deployed in hard-to-reach locations. While Wi-Fi-based Over-The-Air (OTA) updates are common, Bluetooth Low Energy (BLE) offers a compelling alternative for low-power devices or environments where Wi-Fi is unavailable. NimBLE OTA provides a streamlined implementation of this capability for the ESP32 platform, built upon the foundation of the Espressif BLE OTA component.

### Efficient BLE Stack Integration

One of the primary advantages of this library is its reliance on the NimBLE stack via either the `NimBLE-Arduino` or `esp-nimble-cpp` libraries. Unlike the standard Bluedroid stack used in many ESP32 projects, NimBLE is significantly more memory-efficient, often saving upwards of 100KB of RAM and reducing flash usage. This efficiency is critical during an OTA process, where the system must simultaneously manage the BLE connection, data buffering, and flash writing operations without exhausting system resources.

### The OTA Service Architecture

The library operates by creating a dedicated GATT Service with the UUID `0x8018`. This service acts as the communication hub between the client (the firmware uploader) and the server (the ESP32 device). The protocol is broken down into four specific characteristics:

*   **RECV_FW_CHAR (0x8020):** Handles the incoming firmware data and sends acknowledgments.
*   **PROGRESS_BAR_CHAR (0x8021):** Reports the current status of the update to the client.
*   **COMMAND_CHAR (0x8022):** Manages control signals such as starting or stopping the OTA process.
*   **CUSTOMER_CHAR (0x8023):** Provides a channel for user-defined data exchange.

Data transmission is handled in sectors, typically 4K in size. Each sector is verified using a CRC16 check to ensure data integrity before the next sector is requested. This granular verification prevents corrupted firmware from being written to the flash partition.

### Implementation and Security

Integrating NimBLE OTA into an existing project is straightforward. After initializing the NimBLE device, the OTA service can be started with a single call. For applications requiring feedback, the library supports a callback system where developers can hook into specific events by deriving a class from `NimBLEOtaCallbacks`.

```cpp
#include <NimBLEOta.h>

static NimBLEOta bleOta;

void setup() {
    NimBLEDevice::init("My ESP32 Device");
    // Optional: Set up security before starting the service
    NimBLEDevice::setSecurityAuth(false, true, true);
    NimBLEDevice::setSecurityIOCap(BLE_HS_IO_DISPLAY_ONLY);
    
    // Start the service with callbacks and security enabled
    bleOta.start(&otaCallbacks, true);
}
```

Security is a paramount concern for OTA updates to prevent unauthorized firmware injection. NimBLE OTA supports Man-In-The-Middle (MITM) protection and passkey authentication. By enabling these features, the device ensures that only authorized users with physical access to the device (to see the passkey) can initiate a firmware update.

### Tooling and Ecosystem

To facilitate the upload process, the project provides a Python-based upload script (`nimbleota.py`) that handles the sector-by-sector transmission and CRC verification automatically. Additionally, for users who prefer a graphical interface, the library is compatible with the BLEOTA WebApp, allowing firmware updates directly from a web browser using Web Bluetooth. This flexibility makes it an excellent choice for both industrial deployments and consumer electronics where ease of maintenance is key.
