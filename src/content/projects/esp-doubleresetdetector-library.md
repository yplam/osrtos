---
title: ESP_DoubleResetDetector Library
summary: A specialized Arduino library for ESP32 and ESP8266 microcontrollers designed
  to detect double-reset events. It enables developers to trigger specific actions,
  like opening a configuration portal or clearing settings, by detecting two consecutive
  resets within a defined time window using various storage backends.
slug: esp-doubleresetdetector-library
codeUrl: https://github.com/khoih-prog/ESP_DoubleResetDetector
star: 52
version: v1.3.2
lastUpdated: '2022-12-05'
rtos: ''
libraries:
- littlefs
- spiffs
topics:
- arduino-platform
- config-portal
- configuration
- eeprom
- esp-doubleresetdetector
- esp32
- esp32-arduino
- esp32-c3
- esp32-s2
- esp32-s3
- esp8266
- esp8266-arduino
- espressif
- littlefs
- rtc-memory
- spiffs
- spiffs-support
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp-multiresetdetector
- doubleresetdetector-generic
- multiresetdetector-generic-library
- espsavecrashspiffs
- esp8266sdupdater
- rtcmemory
---

## Overview

The ESP_DoubleResetDetector library provides a robust mechanism for ESP8266 and ESP32 microcontrollers to detect a "double reset" event. This pattern is widely used in the IoT industry to allow users to force a device into a configuration mode—such as a WiFi captive portal—without needing dedicated physical buttons for factory resets. By simply toggling the power or pressing the reset button twice within a short window (defaulting to 10 seconds), the device can recognize the intent to change settings.

This library is an improved and expanded version of the original DoubleResetDetector, adding support for the ESP32 family and multiple storage methods to ensure compatibility with modern file systems and memory management practices.

## Key Features & Capabilities

One of the primary improvements this library offers is its flexibility in where it stores the reset flag. While original implementations were often limited to specific hardware registers, this version supports several persistence layers:

- **LittleFS & SPIFFS**: Uses the onboard flash file system to store reset state, which is the recommended approach for modern ESP cores.
- **EEPROM**: Provides a standard way to persist the flag in non-volatile memory.
- **RTC Memory**: Available on ESP8266 for fast storage that persists through software resets, though it may be lost during deep power cycles.

## Hardware Support

The library is designed to work across the modern Espressif ecosystem, including:
- **ESP32 Series**: Support for standard ESP32, ESP32-C3, ESP32-S2, and ESP32-S3.
- **ESP8266 Series**: Full compatibility with all standard ESP8266 boards.

## Technical Implementation

Integrating the library into an Arduino sketch involves defining the storage method before including the header, then initializing the detector with a timeout value. The `detectDoubleReset()` method is typically called early in the `setup()` function to determine the boot path. If a double reset is detected, the application can branch into a configuration routine; otherwise, it proceeds with a normal startup.

```cpp
// Select storage method before including the library
#define ESP_DRD_USE_LITTLEFS    true
#include <ESP_DoubleResetDetector.h>

#define DRD_TIMEOUT 10
#define DRD_ADDRESS 0

DoubleResetDetector* drd;

void setup() {
  Serial.begin(115200);
  drd = new DoubleResetDetector(DRD_TIMEOUT, DRD_ADDRESS);

  if (drd->detectDoubleReset()) {
    Serial.println("Double Reset Detected - Entering Config Mode");
    // Trigger your configuration portal here
  } else {
    Serial.println("Normal Boot");
  }
}

void loop() {
  // Call loop to allow the detector to clear the flag after the timeout
  drd->loop();
}
```

The `loop()` method is essential as it monitors the elapsed time since boot. Once the timeout period passes without a second reset, the library clears the flag so that subsequent resets are treated as normal "single" resets.

## Ecosystem Integration

ESP_DoubleResetDetector has become a foundational component for many popular ESP-based management libraries. It is a core dependency or optional feature in several high-profile projects, including `ESP_WiFiManager`, `Blynk_WM`, and various asynchronous WiFi managers. This widespread adoption makes it a standard tool for developers building professional-grade IoT firmware that requires user-friendly configuration workflows without extra hardware components.
