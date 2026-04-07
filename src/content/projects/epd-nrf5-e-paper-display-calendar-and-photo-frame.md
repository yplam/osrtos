---
title: 'EPD-nRF5: E-Paper Display Calendar and Photo Frame'
summary: An embedded firmware for nRF51 and nRF52 microcontrollers designed to drive
  e-paper displays for calendar and digital photo frame applications. It features
  Bluetooth image transmission, Chinese lunar calendar support, and a Web Bluetooth
  interface for cross-platform configuration.
slug: epd-nrf5-e-paper-display-calendar-and-photo-frame
codeUrl: https://github.com/tsl0922/EPD-nRF5
siteUrl: https://tsl0922.github.io/EPD-nRF5/
version: v1.9
lastUpdated: '2026-03-09'
licenses:
- GPL-3.0
image: /202604/EPD-nRF5_0.avif
rtos: ''
libraries:
- nanopb
- u8g2
topics:
- ble
- bluetooth
- e-ink
- nrf51
- nrf51822
- nrf52
- nrf52811
isShow: true
createdAt: '2026-04-06T23:56:08+00:00'
updatedAt: '2026-04-06T23:56:08+00:00'
---

## Overview

EPD-nRF5 is a specialized firmware project designed to transform e-paper displays (EPD) into functional smart devices, such as digital calendars or photo frames. Built primarily for the Nordic Semiconductor nRF5 series microcontrollers, the project bridges the gap between low-power wireless connectivity and high-contrast, energy-efficient display technology. 

The firmware is particularly notable for its native support for complex calendar data, including the Chinese lunar calendar, solar terms, and holiday schedules. Beyond its role as a timekeeper, it doubles as a digital photo frame capable of receiving and displaying images wirelessly via Bluetooth Low Energy (BLE).

## Hardware and Compatibility

The project offers broad support for the Nordic ecosystem, targeting both the legacy nRF51 series and the more modern nRF52 series. Supported microcontrollers include:

*   **nRF51 Series**: nRF51822, nRF51802
*   **nRF52 Series**: nRF52811, nRF52810

On the display side, the firmware is compatible with common e-paper drivers such as the UC81xx and SSD16xx series. This covers a wide range of panels, including black and white, three-color, and four-color displays. One of the project's most flexible features is its ability to drive different screen sizes (such as 4.2-inch and 7.5-inch) using the same firmware, with the configuration being switchable online through a web interface.

## Technical Architecture

The project leverages the Nordic nRF5 SDK, utilizing version 12.3.0 for nRF51 devices and version 17.1.0 for nRF52 devices. This ensures robust BLE connectivity through the use of Nordic's SoftDevice (S130/S112) stacks. 

For graphics rendering, the system integrates several well-known libraries:
*   **Adafruit GFX**: Provides the core graphics primitives for drawing shapes and managing display buffers.
*   **U8g2 Fonts**: Used for high-quality text rendering, essential for the detailed calendar interface.
*   **NanoPB**: Handles Protocol Buffers, likely used for structured data communication during configuration or firmware updates.
*   **Micro-ecc**: Provides cryptographic support for secure Device Firmware Updates (DFU).

The repository also includes a PC-based emulator. By compiling the project with GCC via the provided Makefile, developers can test the GUI logic, lunar calendar calculations, and font rendering on a standard Windows environment before deploying to the actual hardware.

## Key Features

### Web Bluetooth Interface
One of the standout aspects of EPD-nRF5 is its management system. Instead of requiring a dedicated mobile app, it utilizes the Web Bluetooth API. This allows users to connect to the e-paper display directly through a compatible web browser on a phone or computer. Users can upload images, apply various dithering algorithms to match the e-paper's bit depth, and even add text or doodles to the image before transmission.

### Advanced Calendar Logic
The firmware isn't just a static display driver; it contains logic for calculating Chinese lunar dates, solar terms, and adjusting for regional work schedules. This makes it a highly localized and useful tool for users requiring more than just a standard Gregorian calendar.

### Power and Connectivity
Designed with low power in mind, the project supports sleep and wake functionality. It can be integrated with NFC or wireless charging triggers to manage power states effectively. For maintenance, it supports over-the-air (OTA) firmware updates, allowing the device to be updated without physical access to the programming headers.
