---
title: ESP_MultiResetDetector
summary: An Arduino library for ESP32 and ESP8266 that detects multiple hardware resets
  within a configurable timeout. It supports persisting reset counts using EEPROM,
  SPIFFS, LittleFS, or RTC memory to trigger alternative startup modes like configuration
  portals.
slug: esp-multiresetdetector
codeUrl: https://github.com/khoih-prog/ESP_MultiResetDetector
star: 11
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
- esp-multiresetdetector
- esp-wifimanager
- esp32
- esp32-arduino
- esp32-c3
- esp32-s2
- esp32-s3
- esp8266
- esp8266-arduino
- espasync-wifimanager
- espressif
- littlefs
- rtc-memory
- spiffs
- spiffs-support
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp-doubleresetdetector-library
- multiresetdetector-generic-library
- doubleresetdetector-generic
- bleeper
- espsavecrashspiffs
- rtcmemory
---

The ESP_MultiResetDetector library is a specialized tool for developers working with ESP8266 and ESP32 microcontrollers, particularly in the IoT space. It addresses a common challenge in embedded systems: providing a user-friendly way to trigger a "factory reset" or "configuration mode" on devices that may lack physical buttons or complex user interfaces.

### The Evolution of Reset Detection
Building upon the concepts of the original DoubleResetDetector, this library expands functionality to support "multi-reset" scenarios. Instead of being limited to just two resets, developers can configure the system to detect any number of subsequent resets (e.g., three, four, or five) within a specific timeout period. This added flexibility helps prevent accidental triggers and allows for multiple "hidden" functions based on the number of times the device is power-cycled in quick succession.

### Persistent Storage Support
The core mechanism of reset detection relies on persisting a counter across reboots. ESP_MultiResetDetector provides robust support for various storage mediums to ensure the count is maintained even when the processor restarts:
- **LittleFS & SPIFFS**: Modern filesystem-based storage for both ESP8266 and ESP32.
- **EEPROM**: A traditional choice for simple data persistence across many Arduino-compatible boards.
- **RTC Memory**: Specifically for ESP8266, allowing for persistence without flash wear, though generally less recommended than filesystem approaches for long-term reliability.

### Hardware and Framework Compatibility
The library is designed to be highly compatible across the Espressif ecosystem. It supports the standard ESP32 and ESP8266 cores, as well as newer variants like the ESP32-C3, ESP32-S2, and ESP32-S3. It integrates seamlessly with the Arduino IDE and PlatformIO development environments, making it a versatile choice for various project structures.

### Practical Implementation
Integrating the library into an existing project involves defining the storage method and the detection parameters—such as the number of resets and the timeout duration—before including the header. This allows the library to be lightweight and only compile the necessary code for the chosen storage backend.

```cpp
// Define storage and parameters before inclusion
#define ESP_MRD_USE_LITTLEFS    true
#define MRD_TIMES               5
#define MRD_TIMEOUT             10

#include <ESP_MultiResetDetector.h>

MultiResetDetector* mrd;

void setup() {
  mrd = new MultiResetDetector(MRD_TIMEOUT, 0);

  if (mrd->detectMultiReset()) {
    // Multi-reset detected: Trigger Config Portal or Reset Settings
    Serial.println("Multi Reset Detected");
  } else {
    // Normal startup
    Serial.println("No Multi Reset Detected");
  }
}

void loop() {
  // The loop method handles the timeout logic to clear the reset count
  mrd->loop();
}
```

### Ecosystem Integration
ESP_MultiResetDetector is a foundational component for many other popular ESP-based libraries. It is frequently used in conjunction with advanced WiFi managers like `ESP_WiFiManager` and `ESPAsync_WiFiManager`. In these contexts, it provides a "fail-safe" mechanism to re-enter a configuration portal if the stored WiFi credentials are no longer valid or if the user needs to change device settings without accessing the internal firmware.
