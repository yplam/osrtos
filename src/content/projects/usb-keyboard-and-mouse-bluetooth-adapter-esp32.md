---
title: USB Keyboard and Mouse Bluetooth Adapter (ESP32)
summary: This project transforms an ESP32 into a bridge between wired USB peripherals
  and Bluetooth-enabled hosts. By combining software-defined USB host capabilities
  with the NimBLE stack, it allows standard USB keyboards and mice to function as
  wireless BLE devices across multiple operating systems.
slug: usb-keyboard-and-mouse-bluetooth-adapter-esp32
codeUrl: https://github.com/jmdmahdi/ESP32-USB-TO-BLE
lastUpdated: '2025-01-20'
licenses:
- MIT
image: /202603/ESP32-USB-TO-BLE_0.avif
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- nimble
topics:
- arduino
- bluetooth
- esp32
- espressif
- hid
- usb
- usb-soft-host
isShow: true
createdAt: '2026-03-31T13:13:04+00:00'
updatedAt: '2026-03-31T13:13:04+00:00'
---

## Bridging the Gap Between Wired and Wireless

The ESP32-USB-TO-BLE project offers a practical solution for users who want to use their favorite wired mechanical keyboards or high-precision mice with devices that lack USB ports, such as tablets or smartphones. By acting as a transparent bridge, this project captures HID (Human Interface Device) signals from a USB connection and retransmits them over Bluetooth Low Energy (BLE). 

This implementation is particularly useful for creating a cleaner workspace or for legacy hardware enthusiasts who want to bring their high-quality wired peripherals into a modern, wireless ecosystem. It supports Windows, macOS, Linux, iOS, and Android, making it a versatile tool for cross-platform workflows.

## Technical Architecture

The heart of the project lies in its ability to manage two distinct communication stacks simultaneously. On one side, it functions as a USB Host. While many microcontrollers can act as USB *devices*, acting as a *host* is significantly more complex. The project utilizes the `ESP32-USB-Soft-Host` library, which allows standard ESP32 pins to interface with USB devices through software bit-banging and precise timing. This means even a standard ESP32-WROOM-32 can be used with a few external components.

On the wireless side, the project leverages the **NimBLE** stack via the `NimBLE-Arduino` library. NimBLE is a highly optimized Bluetooth stack that consumes significantly less RAM and flash memory than the default Bluedroid stack typically used in ESP32 projects. This efficiency is critical here, as the ESP32 must handle the real-time processing of USB data packets without introducing noticeable latency into the Bluetooth transmission.

## Hardware Versatility

One of the standout features of this repository is its support for different hardware configurations:

*   **Native Support**: For those seeking the best performance, the project is optimized for the **ESP32-S3-USB-OTG** development board. This board features native USB host capabilities and integrated power management, making it a plug-and-play solution.
*   **Software Host**: For developers using standard ESP32 boards, the project provides a pin mapping guide to connect USB-A female ports to specific GPIOs (such as 16, 17, 22, and 23). This software-defined approach democratizes the hardware requirements, allowing almost any ESP32 dev kit to participate.

## Key Features

*   **Simultaneous Input**: The adapter can handle both a keyboard and a mouse at the same time, maintaining separate BLE HID profiles for each.
*   **Plug-and-Play**: Once paired, the adapter remembers the host device and reconnects automatically upon power-up.
*   **Low Latency**: By utilizing the lightweight NimBLE stack and optimized HID report routing, the input lag is kept to a minimum, suitable for productivity and general use.
*   **Portable Potential**: With the addition of a LiPo battery and a charging module, the entire setup can be housed in a small 3D-printed case to create a pocket-sized wireless adapter.

## Getting Started

To build the project, developers can use the provided PlatformIO configuration. The `platformio.ini` file is pre-configured with the necessary build flags and library dependencies, including the specific NimBLE version required for stable operation. 

```cpp
// Example of how the project handles the bridge logic
// The firmware detects USB HID reports and routes them to BLE handlers
void loop() {
  // USB Host tasks to poll connected devices
  usb_host_task();
  
  // If a keyboard report is received, send it over BLE
  if (keyboard_data_ready) {
    bleKeyboard.setReport(report_buffer);
    bleKeyboard.sendReport();
  }
}
```

Once the firmware is flashed, the ESP32 will appear in your device's Bluetooth settings as "ESP32 Keyboard" and "ESP32 Mouse." Simply pair them, and your wired peripherals are instantly transformed into wireless tools.
