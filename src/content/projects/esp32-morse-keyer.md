---
title: ESP32 Morse Keyer
summary: A single-button wireless keyboard built on the ESP32-C5 that translates Morse
  code patterns into HID keystrokes over Bluetooth Low Energy. It features a real-time
  LVGL UI on a tiny 0.85-inch display and implements secure BLE bonding using the
  NimBLE stack.
slug: esp32-morse-keyer
codeUrl: https://github.com/0015/esp32-morse-keyer
siteUrl: https://youtu.be/8A1nrHq854I
lastUpdated: '2026-05-25'
licenses:
- MIT
image: /202605/esp32-morse-keyer_0.avif
rtos: freertos
libraries:
- lvgl
- nimble
topics:
- esp32c5
- lvgl
- mechanicalkeyboard
- morse-code
- morse-keyboard
- screenkey
- thatproject
isShow: true
createdAt: '2026-05-31T13:48:35+00:00'
updatedAt: '2026-05-31T13:48:35+00:00'
---

## Turning Dots and Dashes into Modern Keystrokes

Standard keyboards rely on dozens of switches and complex matrix scanning, but the ESP32 Morse Keyer takes a different approach. By stripping the interface down to a single physical button, this project explores the intersection of classic telegraphy and modern wireless protocols. Built on the ESP32-C5, it captures short and long presses, decodes them into alphanumeric characters, and transmits them as standard HID reports to any Bluetooth-enabled host, including macOS, iOS, and Android.

At its core, the project is a practical demonstration of the ESP32-C5's native BLE 5 stack and the latest version of the LVGL graphics library. It serves not just as a functional input device, but as a reference architecture for developers looking to implement secure, cross-platform BLE HID devices from scratch using the ESP-IDF.

## The Hardware: A Display Inside a Keycap

The physical heart of the device is the Waveshare ScreenKey, a unique module that combines a mechanical keyboard switch with a 0.85-inch IPS LCD. This allows the "key" itself to act as a dynamic interface. The system is powered by the ESP32-C5-WiFi6-KIT, which provides a RISC-V core and a built-in Li-Po charging circuit, making the entire setup portable and battery-ready.

### Technical Specifications
- **MCU**: ESP32-C5 (RISC-V, 240 MHz)
- **Display**: 0.85-inch IPS (ST7735 driver, 128x128 resolution)
- **Connectivity**: BLE 5, Wi-Fi 6, Zigbee, and Thread
- **Interface**: 4-wire SPI for the display and a single GPIO for the mechanical switch

## Intelligent Morse Decoding

The software handles the nuance of Morse timing with a simple but effective logic: a press shorter than 300 ms is registered as a dot, while anything longer is a dash. To ensure a smooth typing experience, the system waits for one second of silence after the last input before triggering the character decoder. This allows the user to input complex sequences for letters A–Z and numbers 0–9. 

A long-press reset (holding for 3 seconds) provides a fail-safe, clearing the current sequence, history, and all stored BLE bonds to allow for a fresh start.

## Secure BLE HID Implementation

Unlike many DIY BLE projects that skip security for simplicity, the ESP32 Morse Keyer implements a robust HID over GATT Profile (HOGP) using the NimBLE stack. It utilizes LE Secure Connections (LESC) and stores bonds in Non-Volatile Storage (NVS) for seamless reconnection.

One of the more interesting technical hurdles addressed in this project is macOS GATT cache management. By using a fixed public BLE MAC address and sending GATT Service Changed indications, the device ensures the host recognizes the HID driver immediately upon connection. The HID reports follow a standard 8-byte format:

```
Byte 0 : Modifier keys (e.g., 0x02 for Left Shift)
Byte 1 : Reserved (0x00)
Byte 2 : Keycode (HID usage ID, e.g., 0x04 for 'A')
Byte 3–7 : Keycode (Padding for 6-key rollover compatibility)
```

## Visual Feedback with LVGL v9

Despite the tiny screen real estate, the device provides comprehensive feedback using LVGL v9.5.0. The UI is split into several functional zones:
- **Input Zone**: Displays current dots and dashes in amber as they are typed.
- **Character Zone**: Shows the last decoded character in a large, high-contrast white font.
- **History Zone**: A rolling blue text feed of previously typed characters.
- **Status Zone**: A simple dot indicator for BLE connection and security status.

## Building and Customization

The project is structured as a standard ESP-IDF component-based application. It relies on `esp_lvgl_port` for display management and the `espressif/button` component for debouncing and event handling. For those looking to put the device into daily use, the repository includes STL files for a custom two-part 3D-printed enclosure that houses the dev board, the ScreenKey module, and a small Li-Po battery.
