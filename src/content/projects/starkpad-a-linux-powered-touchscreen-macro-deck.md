---
title: 'Starkpad: A Linux-Powered Touchscreen Macro Deck'
summary: Starkpad is an open-source hardware interface that transforms a Linux-based
  touchscreen into a fully customizable virtual keyboard, precision touchpad, and
  programmable macro deck. It features a multi-stage architecture using an Arduino
  UNO Q for the UI and a Seeed XIAO RP2040 for driverless USB HID emulation.
slug: starkpad-a-linux-powered-touchscreen-macro-deck
codeUrl: https://github.com/BlommeJan/Starkpad
star: 14
lastUpdated: '2026-01-26'
rtos: ''
libraries:
- lvgl
topics:
- arduino-uno-q
- diy-electronics
- embedded
- hid
- keyboard
- lvgl
- macro-pad
- rp2040
- touchpad
isShow: false
createdAt: '2026-01-31'
updatedAt: '2026-01-31'
relatedProjects:
- hd2-macropad
- gesture-detecting-macro-keyboard
- esp32berry
- piokmbox-high-performance-usb-hid-passthrough-for-rp2350
- lumen
- deck
---

## Overview

Starkpad is a sophisticated open-source hardware project that bridges the gap between high-level touchscreen interfaces and low-level HID (Human Interface Device) input. By combining the processing power of an embedded Linux host with the real-time capabilities of microcontrollers, Starkpad creates a versatile macro deck that functions as a virtual keyboard, mouse, and programmable shortcut controller. 

The system is designed to be driverless, meaning it works out of the box with any PC, Mac, or Linux machine. It achieves this by emulating standard USB HID reports through a dedicated receiver dongle, making it an ideal tool for creative professionals, developers, and power users who need tactile, customizable control over their digital workspace.

## System Architecture

The Starkpad architecture is divided into three distinct hardware stages to ensure responsiveness and reliability:

1.  **The Linux Host (Arduino UNO Q):** This serves as the brain of the device. It runs Yocto Linux and hosts the primary user interface built with the LVGL graphics library. This stage handles the high-level logic, such as rendering the keyboard layouts, managing the macro grid, and hosting a web-based configuration server.
2.  **The MCU Bridge (ATmega4809):** Integrated into the UNO Q, this microcontroller acts as a transparent serial passthrough. It forwards data from the Linux environment to the external hardware pins, ensuring that the high-level application can communicate with external peripherals via UART.
3.  **The USB Receiver (Seeed XIAO RP2040):** This external dongle receives serial data from the bridge and translates it into standard USB HID commands. Using the TinyUSB stack, it presents itself to the target computer as a generic keyboard and mouse.

## The SHIDP Protocol

Communication between the components is handled by a custom, lightweight protocol called **SHIDP** (Serial Human Interface Device Protocol). Designed specifically for low latency, SHIDP uses fixed 8-byte frames to transmit input data. Each frame includes a sync byte, a type identifier (Keyboard, Mouse, Media, or Macro), an action (Tap, Hold, or Release), and a 4-byte payload for keycodes or coordinate deltas.

To ensure system safety, the protocol incorporates a checksum for error detection and a hardware watchdog. If the receiver fails to receive a valid frame within 80 milliseconds, it automatically releases all active keys and mouse buttons, preventing "stuck" inputs if the connection is interrupted.

## Key Features

Starkpad offers several distinct modes of operation, all accessible via the responsive touchscreen interface:

-   **Virtual Keyboard:** A full QWERTY layout supporting multiple languages and layouts, including US, Colemak, and BE-nl. It supports complex modifier combinations like Ctrl+Shift+S.
-   **Precision Touchpad:** Transforms the screen into a relative mouse input device with dedicated left and right click areas, providing smooth cursor control.
-   **Macro Grid:** A powerful grid of 60 programmable buttons per application profile. Users can create custom shortcuts for software like Figma, Blender, or VS Code. These macros can execute single keypresses, media controls, or even type out long strings of text.
-   **Web Configuration:** The device includes a Python Flask-based web server. Users can connect to the Starkpad via their local network to edit button icons, modify shortcuts, and change themes without touching a line of code.

## Technical Implementation

The project leverages a modern embedded stack. The UI is rendered using **LVGL**, allowing for high-performance graphics on the Waveshare 12.3" capacitive display. On the receiver side, the RP2040 utilizes the **Adafruit TinyUSB** library to handle the complexities of USB HID descriptors. The configuration is stored in JSON format, making it easy to back up or share custom application profiles across the community.
