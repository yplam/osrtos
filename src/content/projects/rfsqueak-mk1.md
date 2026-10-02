---
title: RFSqueak-MK1
summary: RFSqueak-MK1 is a portable embedded system for RF spectrum scanning and Morse
  code communication, built around an ESP32 MCU and a CC1101 Sub-1GHz transceiver.
  It features real-time signal visualization through a color TFT display and provides
  a tactile interface for frequency tuning and manual Morse keying. The firmware leverages
  the Arduino framework and RadioLib to offer features like waterfall displays, channel
  occupancy monitoring, and automated Morse decoding.
slug: rfsqueak-mk1
codeUrl: https://github.com/romankalyna/RFsquek
lastUpdated: '2025-09-07'
licenses:
- MIT
image: /202608/RFsquek_1.avif
rtos: ''
topics:
- cc1101
- embedded-systems
- esp32
- ism-band
- morse-code
- radiolib
- rf
- sdr
- spectrum-analyzer
- st7789
- sub-ghz
isShow: true
createdAt: '2026-08-12T13:59:42+00:00'
updatedAt: '2026-08-12T13:59:42+00:00'
relatedProjects:
- esp-graber
- espri-esp-radio-interface
- esp32-64-band-audio-spectrum-analyser
- esp32-morse-keyer
- k3ng-cw-keyer-for-esp32-and-pico-2w
- bbtalkie
---

RFSqueak-MK1 is an open-source project developed by Roman Kalyna, designed for real-time RF spectrum analysis and Morse code communication. This portable device combines the processing power of the ESP32 with the versatility of the CC1101 radio transceiver, creating a compact tool for hobbyists and RF enthusiasts to monitor sub-1GHz frequencies and communicate using traditional Morse code.


## Core Features

The device is packed with features for both analysis and communication. For spectrum scanning, it provides a real-time waterfall visualization and occupancy monitoring across various frequency ranges. The Morse code system allows users to transmit and receive Morse between nodes with live decoding on the screen. 

The user interface is designed for portability, featuring a 1.14" ST7789 color TFT display (135×240 resolution) and an intuitive control scheme. Navigation is handled via a potentiometer for smooth frequency tuning and menu scrolling, while two tactile buttons (SELECT and BACK) manage Morse keying and mode selection. The system is designed for low power operation, making it ideal for field use with a standard 4×AA battery pack.

## Hardware Architecture

The RFSqueak-MK1 is built on a modular hardware stack:
- **MCU**: ESP32 Dev Board (240MHz dual-core) providing Wi-Fi and Bluetooth capabilities.
- **RF Module**: CC1101 Sub-1GHz transceiver connected via a shared SPI bus.
- **Display**: 1.14" ST7789 color TFT LCD for high-density data visualization.
- **Power Management**: An HW-441 3.3V regulator ensures stable power from a 6V battery input.

### Pin Configuration and Wiring

The system utilizes a shared VSPI bus for the radio and display. Note that while the CC1101 uses the MISO (GPIO 19) line, the TFT display operates in a write-only mode and does not require it. Separate Chip Select (CS) lines (GPIO 27 for CC1101 and GPIO 5 for the TFT) allow the ESP32 to multiplex communication between the peripherals. The potentiometer is connected to ADC1 (GPIO 34) with noise filtering, and the buttons use internal pull-up configurations.

![RFSqueak-MK1 Wiring Diagram](/202608/RFsquek_0.avif)

Critical hardware considerations include the installation of 0.1μF ceramic bypass capacitors between the potentiometer signal and ground to filter analog noise, and between the CC1101 VCC and GND for power supply decoupling. An SMA connector is used to attach an antenna optimized for the 433MHz ISM band.

## Software Implementation

The firmware is developed using the Arduino framework, either via the Arduino IDE or PlatformIO. It relies on several core libraries, including **RadioLib** for advanced radio control and **Adafruit GFX/ST7789** for graphics rendering. 

### Application Modules
- **RF Spectrum Engine**: Manages high-speed frequency scanning with adjustable step sizes and RSSI measurement. It translates raw signal strength into color-coded waterfall visualizations.
- **Morse Code System**: Features a complete encoder/decoder implementation. It includes automatic timing detection to recognize symbols based on configurable dit/dah ratios and gap thresholds.
- **User Interface**: A multi-page navigation system that provides smooth transitions between waterfall views, occupancy monitors, and settings pages. It uses debounced button handling and smooth ADC filtering for the potentiometer input to ensure a responsive feel.

## Getting Started

To build the RFSqueak-MK1, users need basic soldering skills and an ESP32-compatible development environment. After installing the required libraries (RadioLib, Adafruit GFX, and Adafruit ST7735/ST7789), the `RFsquek.ino` sketch can be compiled and uploaded. Upon first boot, the SELECT button and potentiometer allow the user to navigate to the "Radio" menu for scanning or "Morse TX/RX" for communication testing.

## Technical Specifications

The device offers robust RF performance with a frequency range of 300–928 MHz (typically 433.92 MHz by default). It supports various modulations such as OOK, ASK, FSK, and MSK. The system achieves a sensitivity of approximately -110 dBm and a scan rate of up to 1000 channels per second depending on configuration. The Morse system is capable of handling speeds from 5 to 50 WPM with auto-detection.

![RFSqueak-MK1 Spectrum Scanner Interface](/202608/RFsquek_2.avif)
