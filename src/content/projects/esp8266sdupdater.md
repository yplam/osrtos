---
title: ESP8266SDUpdater
summary: An Arduino library for the ESP8266 that allows applications to be packaged
  on an SD card and loaded dynamically. It enables firmware updates from different
  contexts like menu applications or MQTT messages, specifically targeting ESP8266
  modules with 4MB or more flash.
slug: esp8266sdupdater
codeUrl: https://github.com/tobozo/ESP8266SDUpdater
star: 27
version: v0.0.2
lastUpdated: '2018-05-27'
rtos: ''
libraries:
- spiffs
topics:
- arduino
- esp8266
- m5stack-sd-updater
- sd-card
- spiffs
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- http-server-from-sd-card-for-esp8266
- esp32-ble-ota-arduino
- sd-h-and-fs-h-port-for-mongoose-os
- bleota-esp32-ota-updates-over-ble
- esp-fs-webserver
- tab5-launcher
---

ESP8266SDUpdater serves as a technical bridge for developers working with the ESP8266 platform who require a flexible way to manage multiple firmware binaries. Acting as a prequel to the popular M5Stack-SD-Updater, this library provides the necessary logic to flash new firmware directly from a microSD card, bypassing the need for traditional serial or Wi-Fi-based OTA (Over-The-Air) updates.

## Core Functionality

The primary purpose of ESP8266SDUpdater is to enable a "multi-boot" style environment. By storing various compiled `.bin` files on an SD card, a single ESP8266 device can switch between different applications on the fly. This is particularly useful for handheld gaming consoles, multi-purpose IoT sensors, or devices that need to run diagnostic tools that are too large to fit into the primary flash alongside the main application.

The library provides a simple API to trigger an update. By calling `sdUpdater.updateFromSD()`, the system looks for a specific binary (defaulting to `MENU.BIN`) on the SD card, writes it to the flash memory, and prepares the device for a reboot into the new software context.

## Hardware and Compatibility

The library is specifically designed for ESP8266 modules with 4MB of flash or more. It requires a standard microSD card reader connected via SPI. It has been tested and used with various niche ESP8266 platforms such as the OLEDiESP, OLEDiCADE, Espresso Lite, and the Lameboy handheld.

## Technical Challenges and Implementation

One of the significant hurdles addressed by this library is the namespace conflict within the ESP8266 Arduino core. Both the SD library and the SPIFFS (Serial Peripheral Interface Flash File System) library often compete for the `FS` namespace. ESP8266SDUpdater manages this by requiring specific include orders and providing solutions for compiler errors related to scope and architecture support.

Developers using this library are encouraged to use the `fs::` prefix for file system objects (e.g., `fs::File`, `fs::Dir`) to avoid ambiguity. The project also provides detailed troubleshooting steps for resolving library conflicts, such as downgrading the standard SD library or ensuring the built-in ESP8266 SD library takes precedence over generic versions.

## Getting Started

Integrating the updater into an existing sketch is designed to be minimally invasive. The updater should be initialized as early as possible in the code:

```cpp
#include "ESP8266SDUpdater.h"
SDUpdater sdUpdater;

void loop() {
  // Example: Trigger update on button press
  if(digitalRead(BUTTON_A_PIN) == 0) {
    Serial.println("Loading new binary...");
    sdUpdater.updateFromSD("/GAME.BIN");
    ESP.restart(); // Restart is required to boot into the new firmware
  }
}
```

By leveraging this library, developers can create sophisticated menu-driven systems where the user can select from a list of applications stored on external storage, significantly expanding the utility of the ESP8266's limited internal flash memory.
