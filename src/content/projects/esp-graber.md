---
title: ESP-GRABER
summary: A versatile Sub-GHz radio frequency tool for the ESP32 platform using the
  CC1101 transceiver. It enables reading, replaying, and storing signals across 315,
  433, 868, and 915 MHz frequencies, supporting protocols like Princeton, KeeLoq,
  and StarLine.
slug: esp-graber
codeUrl: https://github.com/Teapot174/ESP-GRABER
star: 112
version: v1.1
lastUpdated: '2025-12-17'
rtos: freertos
topics:
- arduino
- cc1101
- esp32
- hack
- hackrf
isShow: true
image: /202601/esp-graber.webp
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- daeva-rf-cybersecurity-tool
- project-starbeam
- esp-hack-fw
- cc1101-jammer
- esp32-bit-pirate
- esp32-bus-pirate
---

## Overview

ESP-GRABER is an open-source firmware and hardware project designed for interacting with Sub-GHz radio frequencies. Built on the ESP32-WROOM platform and utilizing the CC1101 transceiver module, it serves as a portable tool for capturing, analyzing, and replaying radio signals. The project is particularly useful for security researchers and hobbyists interested in testing the security of wireless systems such as garage door openers, remote barriers, and smart home devices.

## Key Features

The project provides a comprehensive suite of tools for Sub-GHz exploration:

- **Signal Capture & Replay**: Read and repeat signals across common frequencies including 315 MHz, 433.92 MHz, 868 MHz, and 915 MHz.
- **Protocol Support**: Native support for several popular modulations and protocols, including Princeton, RcSwitch, Came, Holtec, Nice, StarLine, and KeeLoq.
- **Frequency Analyzer**: A built-in scanner to detect active frequencies in the environment by monitoring RSSI levels.
- **Signal Storage**: Onboard EEPROM storage allows users to save up to 20 captured keys for later use.
- **User Interface**: Integrated support for an SSD1306 OLED display and a 4-button navigation system for standalone operation.

## Technical Implementation

ESP-GRABER is developed using the Arduino framework for ESP32. It leverages the `ELECHOUSE_CC1101` library to interface with the CC1101 radio module via SPI. Signal decoding is handled through a combination of the `RCSwitch` library and custom raw signal processing logic, allowing the device to handle both standard protocols and unknown "raw" signals.

The system architecture is divided into several operational modes:
- **Receive Mode**: Configures the CC1101 to listen on a specific frequency and decodes incoming data packets.
- **Transmit Mode**: Switches the CC1101 to TX mode and synthesizes signals based on stored key data or captured raw timings.
- **Analyzer Mode**: Rapidly cycles through a list of predefined frequencies to identify nearby transmissions.
- **Jammer Mode**: A research-oriented feature that transmits a continuous carrier or noise to test device interference resilience (noted as illegal for use in public spaces).

## Hardware Requirements

To build an ESP-GRABER device, the following components are required:
- **ESP32-WROOM**: The core microcontroller providing processing power and GPIO management.
- **CC1101 Module**: The Sub-GHz transceiver responsible for radio communication.
- **SSD1306 OLED**: A 128x64 display for the menu system.
- **Navigation Buttons**: Four buttons assigned to Up, Down, OK, and Back functions.

## Getting Started

The project can be compiled using the Arduino IDE or flashed directly using provided binary releases. The firmware expects a specific wiring configuration for the SPI interface (G5, G18, G23, G19) and I2C display (G21, G22). Once powered on, users can navigate the menu to select their target frequency and begin scanning for signals. Captured signals can be saved to the ESP32's internal EEPROM with a long-press of the OK button, ensuring that important keys are preserved even after a power cycle.
