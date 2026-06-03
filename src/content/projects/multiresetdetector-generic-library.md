---
title: MultiResetDetector_Generic Library
summary: A cross-platform Arduino library for detecting multiple resets within a configurable
  timeout period. It supports a vast array of hardware including AVR, STM32, SAMD,
  nRF52, and RP2040, utilizing various storage backends like EEPROM, FlashStorage,
  and LittleFS to persist reset counts for triggering configuration modes or special
  startup routines.
slug: multiresetdetector-generic-library
codeUrl: https://github.com/khoih-prog/MultiResetDetector_Generic
star: 5
version: v1.8.1
lastUpdated: '2022-12-05'
rtos: mbed-os
libraries:
- littlefs
- spiffs
topics:
- double-reset
- eeprom
- flashstorage
- flashstorage-samd
- flashstorage-stm32
- littlefs
- mbed
- mega2560
- multi-reset
- nano-rp2040-connect
- nrf52
- portenta
- portentah7
- raspberry-pi-pico
- rp2040
- sam-due
- samd21
- samd51
- stm32
- teensy
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- doubleresetdetector-generic
- esp-multiresetdetector
- esp-doubleresetdetector-library
- timezone-generic-library
- onewireng
- ds323x-generic
---

## Overview

The MultiResetDetector_Generic library is a versatile tool for embedded developers working with the Arduino ecosystem. Its primary purpose is to detect when a device has been reset multiple times in quick succession—typically within a 10-second window. This functionality is crucial for headless IoT devices that lack physical buttons; by power-cycling or hitting the reset button several times, a user can force the device into a special state, such as a WiFi configuration portal, a factory reset routine, or a debug mode.

This library is an evolution of several previous reset detection tools, expanded to support a massive range of modern microcontrollers and storage methods. It provides a unified API regardless of whether the underlying hardware uses dedicated EEPROM, internal Flash emulation, or a filesystem like LittleFS.

## Key Features and Capabilities

The library's standout feature is its broad hardware compatibility. It supports everything from classic 8-bit AVR chips to high-performance ARM Cortex-M7 boards. Key supported platforms include:

- **STMicroelectronics**: STM32F/L/H/G/WB/MP1 series.
- **Raspberry Pi**: RP2040-based boards like the Pico and Nano RP2040 Connect.
- **Nordic Semiconductor**: nRF52832 and nRF52840 (including Adafruit and Seeeduino variants).
- **Microchip/Atmel**: SAMD21, SAMD51, and SAM DUE.
- **Teensy**: The entire 3.x and 4.x lineup.
- **Realtek**: RTL8720DN and other AmebaD-based boards.

## Technical Implementation

To track resets across power cycles, the library must store a "flag" in non-volatile memory. Because different microcontrollers handle non-volatile storage differently, MultiResetDetector_Generic integrates with various storage drivers:

1.  **EEPROM**: Used for AVR and Teensy boards.
2.  **FlashStorage**: Utilizes specialized libraries for SAMD, STM32, and Realtek chips to emulate EEPROM in Flash memory.
3.  **Filesystems**: On boards running Mbed OS or the Earle Philhower RP2040 core, it uses LittleFS or SPIFFS to store a small data file (`/mrd.dat`).

When the device boots, the library checks this storage for a specific bitmask. If the mask is present and the timestamp is within the timeout period, it increments the reset counter. If the counter reaches a user-defined threshold, the `detectMultiReset()` function returns true.

## Practical Usage

Integrating the library into a project is straightforward. Developers define the number of resets required and the timeout duration. In the `setup()` function, the detector is initialized, and the application logic branches based on whether a multi-reset was detected.

```cpp
#define MRD_TIMES     5
#define MRD_TIMEOUT   10

MultiResetDetector* mrd;

void setup() {
  mrd = new MultiResetDetector(MRD_TIMEOUT, MRD_TIMES);

  if (mrd->detectMultiReset()) {
    Serial.println("Multi-reset detected! Entering Config Portal...");
    // Enter configuration mode here
  } else {
    Serial.println("Normal boot.");
  }
}

void loop() {
  // Call this to stop detecting after a successful boot
  mrd->stop();
  // ... application code ...
}
```

## Ecosystem Integration

MultiResetDetector_Generic serves as a foundational component for many other popular Arduino libraries, particularly those focused on connection management. It is a core dependency for various "WiFi Manager" style libraries (like `BlynkEthernet_WM` or `WiFiManager_Generic_Lite`), where it provides the mechanism for users to reset forgotten network credentials without needing to reflash the firmware.
