---
title: XIAO Debug Mate
summary: The Seeed Studio XIAO Debug Mate is an open-source multi-tool based on the
  ESP32-S3 designed for debugging embedded systems. It integrates a DAPLink debugger,
  a serial UART monitor, and a high-precision power profiler with visual feedback
  via an onboard 2.01-inch TFT LCD and a 36-LED matrix. The project utilizes FreeRTOS,
  LVGL for its graphical interface, and the TFT_eSPI library for display management.
slug: xiao-debug-mate
codeUrl: https://github.com/Seeed-Studio/OSHW-XIAO-Debug-Mate
siteUrl: https://www.seeedstudio.com/Seeed-Studio-XIAO-Debug-Mate-p-6588.html
version: v1.2
lastUpdated: '2026-01-19'
rtos: freertos
libraries:
- lvgl
- tft-espi
topics:
- arduino
- daplink
- debugging-tool
- embedded-systems
- esp32-s3
- uart-monitor
isShow: false
createdAt: '2026-04-17T10:09:24+00:00'
updatedAt: '2026-04-17T10:09:24+00:00'
---

## A Versatile Companion for Embedded Development

Debugging embedded systems often requires a desk cluttered with various probes, logic analyzers, and multimeters. The Seeed Studio XIAO Debug Mate aims to consolidate these essential tools into a single, pocket-sized device. Built around the powerful ESP32-S3 microcontroller, it serves as an all-in-one debugging station specifically optimized for the XIAO ecosystem but flexible enough to support any ARM Cortex-M microcontroller.

At its core, the Debug Mate provides three critical functions: a DAPLink-compatible SWD debugger, an intelligent serial monitor with UART passthrough, and a high-precision power profiler. What sets it apart from standard debug probes is its standalone visual feedback system, featuring a 2.01-inch TFT LCD and a unique 36-LED matrix that provides instant status updates without needing a PC connection.

## Core Capabilities

### Professional-Grade Debugging
By implementing the DAPLink protocol, the Debug Mate offers full compatibility with industry-standard tools like OpenOCD and PyOCD. This allows developers to set breakpoints, step through code, and inspect memory on target boards including the XIAO SAMD21, RP2040, and the newer RA4M1. The device acts as a bridge, bringing professional debugging features to an accessible, open-source form factor.

### Intelligent Serial Monitoring
Serial communication is the bread and butter of embedded development. The Debug Mate functions as a UART bridge that can monitor data between a XIAO board and a computer, or act as a standalone sniffer for external UART devices like Raspberry Pi or Grove sensors. The onboard display provides real-time visualization of data streams, which is invaluable for field testing where bringing a laptop might be impractical.

### Precision Power Profiling
Understanding power consumption is vital for battery-operated devices. The Debug Mate includes factory-calibrated power monitoring circuitry capable of tracking consumption down to the microamp (μA) level. It can identify peak and valley consumption patterns and monitor ultra-low-power states, providing developers with the data needed to optimize their firmware for long-term efficiency.

## Hardware and User Interface

The hardware design is tailored for ease of use. It features a dedicated socket for XIAO boards using pogo pins to ensure reliable contact without permanent soldering. For external hardware, it provides standard expansion headers and a Grove connector. 

Interaction is handled through a tactile rotary encoder and a user button, allowing developers to navigate the menu system quickly. The visual experience is powered by the LVGL (Light and Versatile Graphics Library), ensuring a smooth and responsive UI on the 240x296 resolution screen. A standout hardware feature is the 36-LED matrix, which defaults to displaying the current baud rate, providing a quick visual reference during high-speed data transfers.

## Technical Implementation

The project is built on the ESP32 Arduino core, leveraging FreeRTOS for task management. To achieve its high level of integration—particularly the USB-OTG functionality required for DAPLink—the project utilizes the Adafruit TinyUSB library. 

Developers looking to build the firmware from source will find a modular structure. The core logic is housed in the `0_Firmware` directory, while the graphical interface and display drivers are managed via customized versions of LVGL and TFT_eSPI. Interestingly, the project requires slight modifications to the standard ESP32 Arduino core files to disable default USB initialization, allowing the custom TinyUSB stack to take full control of the hardware's communication ports.

## Supported Ecosystem

While the Debug Mate is a natural fit for the Seeed Studio XIAO series, its utility extends to the broader ARM ecosystem. It currently supports:
- **XIAO Series**: SAMD21, RA4M1, nRF52840 (Sense), RP2040, RP2350, and MG24.
- **General ARM**: Any Cortex-M microcontroller via standard SWD and UART pins.

This project represents a community-driven effort to make professional debugging tools more accessible, originating from discussions within the XIAO open roadmap and evolving into a polished, open-source hardware solution.
