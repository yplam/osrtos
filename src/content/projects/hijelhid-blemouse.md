---
title: HijelHID_BLEMouse
summary: HijelHID_BLEMouse is an ESP32 Bluetooth Low Energy (BLE) Human Interface
  Device (HID) mouse library built on NimBLE-Arduino. It provides both an interrupt-safe
  base layer for hardware sensor integration and a high-level macro layer for scripted
  automation and emulation. The library targets ESP32 microcontrollers with BLE radio
  support across Windows, macOS, Linux, Android, and iOS platforms.
slug: hijelhid-blemouse
codeUrl: https://github.com/HijelHub/HijelHID_BLEMouse
version: 0.1.0
lastUpdated: '2026-04-09'
licenses:
- Apache-2.0
rtos: freertos
libraries:
- nimble
- h2zero-esp-nimble-cpp
topics:
- arduino
- bluetooth
- bluetooth-low-energy
- esp32
- esp32-arduino
- hid
- hid-mouse
- mouse
- nimble
- nimble-arduino-library
isShow: false
createdAt: '2026-10-13T10:51:32+00:00'
updatedAt: '2026-10-13T10:51:32+00:00'
---

## Overview

HijelHID_BLEMouse turns an ESP32 microcontroller into a full-featured Bluetooth Low Energy (BLE) Human Interface Device (HID) mouse. Designed on top of the resource-efficient [NimBLE-Arduino](https://github.com/h2zero/NimBLE-Arduino) stack, it offers a lightweight alternative to traditional ESP-IDF Bluedroid implementations, making it well-suited for building physical mouse peripherals with sensors and physical switches or building programmable input emulators.

The library supports up to five standard mouse buttons (Left, Right, Middle, Back, Forward), horizontal tilt-wheel scrolling (AC Pan), vertical scrolling, and relative X/Y movement. To minimize energy consumption on battery-powered builds, HijelHID_BLEMouse automatically throttles BLE connection activity after five seconds of inactivity and instantly returns to full operational speed the moment input is queued.

## Dual-Layer API Architecture

A central design feature of HijelHID_BLEMouse is its distinct separation between the low-level base API and high-level macro methods:

- **Base Layer (Interrupt-Safe):** All core low-level methods (`move`, `addScroll`, `addScrollH`, `setButton`) are non-blocking and safe to invoke directly from hardware Interrupt Service Routines (ISRs). This enables clean integration with optical sensor pins and mechanical microswitches without queue bottlenecks.
- **Macro Layer (Emulation & Scripting):** Methods such as `moveTo`, `scroll`, `click`, and `doubleClick` handle multi-report sequencing, rate limiting, and press/release timing automatically. These methods are designed for FreeRTOS tasks and the standard Arduino `loop()` function.

Developers can seamlessly combine both layers—for example, managing physical button clicks in hardware interrupts while issuing smooth cursor transitions via high-level helper methods.

```cpp
#include <HijelHID_BLEMouse.h>

HijelBLEMouse mouse("Custom Mouse", "Hijel", 100, 5, true);

void setup() {
    mouse.begin();
}

void loop() {
    if (mouse.isPaired()) {
        // Smoothly pan diagonally over 1000ms
        mouse.moveTo(300, 200, 1000);
        mouse.click(MouseButton::Left);
        delay(2000);
    }
}
```

## Power Management and Hardware Controls

Power efficiency is critical for portable Bluetooth peripherals. In addition to dynamic connection parameter updates during idle periods, HijelHID_BLEMouse provides:

- **Configurable Update Rates:** Reports can be scheduled at 125 Hz (7.5 ms interval, BLE minimum), 100 Hz, 50 Hz, or 25 Hz to balance smoothness against power consumption.
- **RF Transmission Power Adjustment:** Radio output power can be tuned from level 1 (-12 dBm) up to level 8 (+9 dBm).
- **Sleep Integration:** Built-in hooks for ESP32 light sleep (`beforeSleep()` and `afterWake()`) ensure clean radio shutdowns and automatic reconnection with bonded hosts, while NVS bonding storage guarantees quick recovery after deep sleep cycles.

## Pairing Security and Platform Compatibility

The library supports both unauthenticated "Just Works" pairing and numeric passkey authentication. When passkey mode is enabled, sketches can attach a callback to display the 6-digit challenge code on a display or serial console for user verification.

HijelHID_BLEMouse has been tested across all major client operating systems, including Windows 11, macOS Ventura, Ubuntu 22.04 LTS, Android 16, and iOS (with AssistiveTouch enabled). It is compatible with all ESP32 variants featuring BLE hardware, excluding BLE-less chips such as the ESP32-S2 and ESP32-P4.
