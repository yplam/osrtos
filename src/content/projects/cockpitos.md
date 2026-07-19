---
title: CockpitOS
summary: A high-performance ESP32 firmware for DCS World cockpit panels using the
  DCS-BIOS protocol. It supports native USB HID, WiFi, and Serial transports while
  providing drivers for various displays, LEDs, and input devices with a focus on
  static memory allocation and non-blocking I/O.
slug: cockpitos
codeUrl: https://github.com/BojoteX/CockpitOS
siteUrl: https://cockpitos.bojote.com/
star: 12
version: v1.1.3
lastUpdated: '2026-01-20'
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
topics:
- arduino
- cockpit
- cockpit-project
- cockpitos
- dcs
- dcs-bios
- dcs-world
- dcsbios
- dcsworld
- esp32
- esp32-arduino
- firmware
- led-control
- simpit
isShow: false
createdAt: '2026-01-31'
updatedAt: '2026-01-31'
relatedProjects:
- hyperk
- esp32-p4-home-assistant-display
- deck
- hometiles
- fastled-idf
- klipper-esp32
---

CockpitOS is a specialized firmware project designed for flight simulation enthusiasts who build physical cockpit panels for DCS World. Built natively for the ESP32 family—including the Classic, S2, S3, C3, C6, and P4 variants—it acts as a high-performance bridge between physical hardware and the simulator using the DCS-BIOS protocol. While inspired by the original DCS-BIOS Arduino Library, CockpitOS is reimagined for modern hardware, offering native USB support, wireless connectivity, and a robust architecture suited for complex multi-panel setups.

## Advanced Connectivity Options

One of the primary advantages of CockpitOS is its flexible transport layer. Unlike traditional Arduino-based solutions that often rely on virtual COM ports and external utilities like `socat`, CockpitOS leverages the native USB capabilities of the ESP32-S2 and S3. By exposing the device as a USB HID gamepad with Feature Reports, it creates a bidirectional mailbox that communicates with a PC-side HID Manager. This approach eliminates driver issues and COM port enumeration conflicts common in large simulator pits.

For builders who prefer a cable-free environment, CockpitOS includes a WiFi UDP transport. This allows panels to communicate wirelessly with the DCS-BIOS host, making it ideal for mobile consoles or auxiliary panels. Legacy Serial support is also maintained for compatibility with existing setups.

## High-Performance Architecture

CockpitOS is engineered with embedded best practices to ensure stability during long simulation sessions:
- **Static Memory Allocation**: The firmware avoids heap fragmentation by using static buffers, ensuring the system remains stable over hours of operation.
- **Non-Blocking I/O**: The entire system is built around state machines and interrupts rather than delays, allowing for a 250 Hz input polling rate and 30-60 Hz display refresh rates.
- **O(1) Label Lookups**: Using perfect hashing, the firmware can look up DCS-BIOS addresses in constant time. This allows a single device to filter through thousands of simulator updates efficiently, only processing the data relevant to its specific panel.

## Hardware Support and Extensibility

The project provides out-of-the-box support for a wide array of cockpit-specific hardware:
- **Inputs**: Supports standard buttons, toggle switches, rotary encoders, and multi-position selectors. It also integrates I2C expanders like the PCA9555 and shift registers like the 74HC165 for high-density panels.
- **Outputs**: Includes drivers for GPIO LEDs with PWM dimming, WS2812 RGB LEDs, and specialized LED drivers such as the TM1637 and GN1640T.
- **Displays**: Supports HT1622 segment LCDs (commonly used for IFEI and UFC panels) and SPI TFT gauges via the LovyanGFX library.

## Configuration via Label Sets

CockpitOS uses a concept called "Label Sets" to define a panel's configuration. Each Label Set contains an `InputMapping.h` for hardware-to-command definitions and an `LEDMapping.h` for simulator-to-indicator definitions. A Python-based generator script processes these mappings to create optimized runtime data files, allowing users to customize their hardware without rewriting the core firmware logic.

## Getting Started

To deploy CockpitOS, developers use the Arduino IDE with the ESP32 Arduino Core. After selecting a Label Set and configuring the transport mode (USB, WiFi, or Serial) in `Config.h`, the firmware is uploaded to the ESP32. For USB mode, the included `HID_Manager.py` script bridges the device to the DCS-BIOS UDP stream on the host PC. The project also features an AI Assistant trained on the codebase to help users troubleshoot wiring or generate custom mapping entries.
