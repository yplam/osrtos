---
title: HijelHID BLEKeyboard
summary: A comprehensive Bluetooth Low Energy (BLE) HID keyboard library for the ESP32,
  built on the NimBLE-Arduino stack for high efficiency. It supports standard keyboard
  layouts, media keys, and advanced power management features including light and
  deep sleep. The library is designed for creating physical or emulated HID devices
  compatible with iOS, Android, macOS, Windows, and Linux.
slug: hijelhid-blekeyboard
codeUrl: https://github.com/HijelHub/HijelHID_BLEKeyboard
version: 0.5.0
lastUpdated: '2026-04-09'
licenses:
- Apache-2.0
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- nimble
topics:
- arduino
- bluetooth
- bluetooth-low-energy
- esp32
- esp32-arduino
- hid
- hidkeyboard
- keyboard
- nimble
- nimble-arduino-library
isShow: false
createdAt: '2026-04-16T03:44:55+00:00'
updatedAt: '2026-04-16T03:44:55+00:00'
---

## Turning the ESP32 into a Versatile BLE Input Device

The HijelHID BLEKeyboard library provides a robust framework for transforming an ESP32 into a Bluetooth Low Energy (BLE) Human Interface Device (HID). Unlike many basic implementations, this library is built on top of the NimBLE-Arduino stack, which offers significant memory and power efficiency advantages over the standard Bluedroid stack typically found in ESP32 projects. This makes it an ideal choice for battery-powered peripherals where every milliamp and kilobyte of heap counts.

## Unified API for Seamless Interaction

One of the standout features of HijelHID BLEKeyboard is its unified API. Developers don't need to manage separate logic for standard alphanumeric keys and consumer media keys. The library provides high-level functions like `tap()`, `press()`, and `release()` that automatically handle the underlying HID report differences. Whether you are sending a simple "Hello World" string or controlling system volume and playback, the interface remains consistent.

For text entry, the library supports `print()` and `println()` methods, handling uppercase letters, punctuation, and spaces automatically. For more granular control, the `tap()` function allows for complex key combinations, such as `CTRL+ALT+DEL`, by combining modifiers with a pipe operator.

## Advanced Power Management

Power consumption is a critical factor for any wireless keyboard. HijelHID BLEKeyboard addresses this with several built-in optimizations:

*   **Idle Radio Power Saving**: The library automatically reduces the BLE radio duty cycle after five seconds of inactivity. This drops the connection event frequency from approximately 133 per second to just 1.6 per second, significantly extending battery life without requiring manual intervention.
*   **Sleep Mode Integration**: It provides dedicated hooks for ESP32 light and deep sleep. Using `beforeSleep()` and `afterWake()`, developers can ensure that the HID state is cleanly managed and that the host device reconnects seamlessly when the microcontroller wakes up.
*   **TX Power Control**: Users can adjust the radio transmit power to match the required range, further optimizing energy usage for close-proximity devices.

## Security and Platform Compatibility

Security is handled through flexible pairing modes. While the library defaults to "JustWorks" for easy pairing, it also supports Passkey authentication. This mode generates a numerical code that must be verified on the host device, providing a layer of protection against unauthorized connections. 

The library has undergone extensive testing across major operating systems, ensuring compatibility with iOS, Android, macOS, Windows 11, and Linux (BlueZ). It even handles platform-specific quirks, such as the HID descriptor caching behavior in Windows and the modifier key interception issues sometimes found in Linux environments.

## Quick Start Example

Getting started is straightforward. Once the library and its NimBLE dependency are installed, a basic keyboard can be implemented in just a few lines of code:

```cpp
#include <HijelHID_BLEKeyboard.h>

HijelHID_BLEKeyboard keyboard("My Custom Keyboard", "Manufacturer", 100);

void setup() {
    keyboard.begin();
}

void loop() {
    if (keyboard.isConnected()) {
        // Type a message and press Enter
        keyboard.println("Hello from ESP32!");
        
        // Use a media key
        keyboard.tap(MEDIA_VOLUME_UP);
        
        delay(10000);
    }
}
```

## Technical Depth and Feedback

Beyond basic typing, the library offers deep integration with the host OS. It can track LED states (Num Lock, Caps Lock, Scroll Lock) via callbacks, allowing the physical device to sync its own LEDs with the host's software state. It also includes a `kill()` method for permanent shutdown, which deinitializes the BLE stack to free up approximately 38KB of heap memory—a vital feature for multi-functional devices that may only need Bluetooth connectivity occasionally.
