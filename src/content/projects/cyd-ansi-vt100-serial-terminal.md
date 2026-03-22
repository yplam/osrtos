---
title: CYD ANSI-VT100 Serial Terminal
summary: A mini-project that transforms the ESP32-based Cheap Yellow Display (CYD)
  into a standalone ANSI-VT100 serial terminal. It utilizes the FabGL library to handle
  terminal emulation and display output, allowing users to monitor serial data from
  other microcontrollers at 115200 baud without a PC.
slug: cyd-ansi-vt100-serial-terminal
codeUrl: https://github.com/envenomator/cyd_terminal
star: 16
lastUpdated: '2025-09-30'
rtos: freertos
topics:
- ansi
- cheapyellowdisplay
- cyd
- esp32
- serial
- serialterminal
- terminal
- vt100
isShow: true
image: /202603/terminal.webp
createdAt: '2026-03-22'
updatedAt: '2026-03-22'
---

## Overview

The CYD Terminal project is a practical utility for embedded developers that turns the popular "Cheap Yellow Display" (ESP32-2432S028) into a portable, standalone ANSI-VT100 serial terminal. This setup is particularly useful for debugging microcontrollers in the field or on a workbench where a full PC setup might be cumbersome. By leveraging the ESP32's processing power and integrated display, the project creates a dedicated window into serial data streams.

## Hardware Requirements

The project is designed specifically for the **ESP32-2432S028**, often referred to as the Cheap Yellow Display (CYD). This board features an ESP32 module, a 2.8-inch color touchscreen, and various expansion headers. 

One critical hardware modification is noted for reliable operation: the two small 100-ohm resistors located near the Rx/Tx JST connector (P1) should be replaced with 0-ohm resistors or small wire bridges. The original resistors can interfere with high-speed serial signal integrity, and bypassing them ensures a stable connection at standard baud rates.

## Technical Implementation

The firmware is built using the **Arduino framework** within the **PlatformIO** ecosystem. It relies heavily on the **FabGL library**, a powerful graphics and terminal abstraction layer for the ESP32. FabGL provides the ANSI-VT100 terminal emulation, handling escape codes and text rendering that allow the display to behave like a classic hardware terminal.

The system is configured to operate at **115200 baud with 8N1 parameters** (8 data bits, no parity, 1 stop bit). While the ESP32 typically operates at 3.3V, the project notes that the RX pin on this specific board is 5V tolerant, making it easier to interface with a wide variety of 5V microcontrollers like the Arduino Uno or Mega.

## Connectivity and Setup

Connecting the terminal to a target device is straightforward using the JST connector P1 provided with most CYD units:
- **VIN**: Connect to a 5V power supply.
- **GND**: Common ground between the supply and the target microcontroller.
- **RX**: Connect to the TX pin of the target microcontroller.

For a professional finish, the project supports a 3D-printable enclosure designed specifically for the Sunton ESP32-2432S028R, which includes the necessary cutouts for the serial connector and power input.

## Software Configuration

The project uses a standard `platformio.ini` configuration targeting the `esp32doit-devkit-v1` board. A specific workaround is noted in the configuration for the FabGL library regarding a header conflict in `ICMP.cpp`, requiring a manual path adjustment to the `WiFiGeneric.h` file within the ESP32 Arduino framework. This ensures that the networking components of the library do not conflict with the terminal functionality during the build process.
