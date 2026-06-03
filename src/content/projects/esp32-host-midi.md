---
title: ESP32_Host_MIDI
summary: A modular Arduino library for the ESP32-S3 that enables USB Host MIDI and
  BLE MIDI server functionality. It provides a complete solution for receiving, interpreting,
  and displaying MIDI messages, featuring a dedicated MIDI handler for note processing
  and a display module optimized for the ST7789 controller.
slug: esp32-host-midi
codeUrl: https://github.com/sauloverissimo/ESP32_Host_MIDI
star: 19
version: 1.0.3
lastUpdated: '2025-04-03'
rtos: freertos
topics:
- ble
- esp32
- esp32-arduino
- host
- lilygo-tdisplay-s3
- lovyangfx
- midi
- otg
- pcm5102a
- st7789
- t-display
- t-display-s3
- usb
isShow: false
createdAt: '2026-01-27'
updatedAt: '2026-01-27'
relatedProjects:
- esp32-s3-soundfont-sf2-sampler-synthesizer
- esp32-nimble-hid-client
- esp32-smartdisplay
- esp32-st7789v-ft6236u-arduino-lvgl-demo
- lilygo-t-display-s3-boilerplate
- esp32-tux
---

## Overview

ESP32_Host_MIDI is a comprehensive library designed for the Arduino IDE that transforms an ESP32 (specifically the ESP32-S3) into a powerful MIDI hub. By leveraging the USB-OTG and Bluetooth Low Energy (BLE) capabilities of the ESP32-S3, the project allows developers to receive, process, and visualize MIDI data from both physical USB controllers and wireless BLE devices. 

While optimized for the LilyGO T-Display S3, the library's modular architecture makes it highly adaptable to various hardware configurations. It serves as an excellent foundation for building MIDI monitors, synthesizers, or bridge devices that need to interface with modern musical equipment.

## Modular Architecture

The project is built around a clean, modular design that separates hardware communication from data processing. This structure is divided into four primary components:

- **USB Connection Module**: Implements USB Host functionality, allowing the ESP32 to act as the master for connected MIDI keyboards or controllers. It handles the low-level USB-OTG events and extracts the relevant MIDI packets.
- **BLE Connection Module**: Configures the ESP32 as a BLE MIDI server. This enables the device to appear as a wireless MIDI destination for mobile apps or computers, supporting advertising and secure data transmission.
- **MIDI Handler**: The brain of the library, this module interprets raw MIDI data. It handles NoteOn and NoteOff events, converts MIDI note numbers into musical notation (like "C4"), and manages an active note state. It even includes support for a history buffer stored in PSRAM for tracking sequences of events.
- **Display Handler**: Specifically tuned for the ST7789 display using the LovyanGFX library, this module provides flicker-free rendering of MIDI activity, ensuring that real-time performance data is legible and responsive.

## Technical Implementation

Version 2.0 of the library introduced several significant performance enhancements. The MIDI processing now utilizes a dynamic queue (`std::deque`) to manage event flow, preventing data loss during high-density MIDI streams. The USB stack has been reworked to minimize latency by focusing on the first four relevant bytes of MIDI packets, and the system makes better use of USB interrupts to reduce the load on the main execution loop.

For developers using the T-Display S3, the library includes a pre-configured pin mapping file (`ESP32_Pin_Config.h`) that handles the complex wiring of the onboard display and USB-OTG pins, significantly lowering the barrier to entry for new projects.

## Getting Started

To use the library, developers need the Arduino IDE and the LovyanGFX library for display management. The core integration involves initializing the USB and BLE modules and calling their respective task handlers within the main loop to ensure non-blocking operation.

```cpp
#include <ESP32_Host_MIDI.h>

USB_Conexion usbMIDI;
BLE_Conexion bleMIDI;
ST7789_Handler display;

void setup() {
    usbMIDI.begin();
    bleMIDI.begin();
    display.init();
    display.printMessage("MIDI System Ready", 0, 0);
}

void loop() {
    // Process background tasks for USB and BLE
    usbMIDI.task();
    bleMIDI.task();
}
```

## Hardware and Customization

Although the project is showcased on the ESP32-S3 T-Display, it is compatible with other ESP32 variants that support USB-OTG. Users can easily modify the `ESP32_Pin_Config.h` file to match different pinouts or display types. The modular nature of the code allows for the replacement of the display handler with a different graphics library or the addition of new MIDI processing logic, such as chord detection or MIDI clock synchronization.
