---
title: 'XC-OS: A Lightweight Graphical OS for MCUs'
summary: XC-OS is a compact embedded graphical operating system built on FreeRTOS
  and LVGL. Designed for microcontrollers like the STM32F405, it supports Lua-based
  third-party applications and drivers, featuring a suite of built-in tools including
  a music player, video player, and Arduboy game system emulator.
slug: xc-os-a-lightweight-graphical-os-for-mcus
codeUrl: https://github.com/FASTSHIFT/XC-OS
star: 78
lastUpdated: '2021-05-11'
rtos: freertos
libraries:
- lvgl
topics:
- embedded
- freertos
- littlevgl
- lua
- lvgl
- os
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- minios-esp
- lua-rtos-for-esp32
- smolos
- dnx-rtos
- lekaos
- micropython-and-lvgl-firmware-for-esp32
---

XC-OS is a sophisticated graphical operating system designed for resource-constrained microcontrollers. By integrating the FreeRTOS kernel with the LVGL (formerly LittlevGL) UI framework, it creates a desktop-like experience on embedded hardware without requiring external RAM or Flash memory expansion.

### Core Architecture
At its heart, XC-OS utilizes FreeRTOS V10.2.0 for task management and scheduling. The user interface is driven by LittlevGL V6.1, providing a smooth, touch-capable GUI. One of the most distinctive features of XC-OS is its support for third-party applications and drivers written in Lua. This scripting capability allows developers to extend the system's functionality dynamically without needing to recompile the entire firmware, a rare feature for systems of this scale.

### Hardware Capabilities
The project is optimized for the STM32F405RGT6 microcontroller, running at an overclocked frequency of 216MHz. It supports high-resolution displays like the ILI9488 (3.5-inch, 480x320) via a 16-bit bus, achieving a 70Hz refresh rate. The hardware integration includes:
- **Touch Control**: GT911 capacitive touch support.
- **Audio**: PAM8403 amplifier and Huawei Honor 8 speaker assembly for high-quality sound output.
- **Sensors**: MPU6050 accelerometer for motion-based interactions.
- **Storage**: Micro SD card support via the SdFat library for file management and app storage.
- **Communication**: NRF24L01+ wireless modules and dual USART interfaces.

### Integrated Application Suite
XC-OS comes pre-loaded with a comprehensive set of applications that demonstrate its versatility as a mobile embedded platform:
- **Multimedia**: A music player supporting WAV formats with synchronized lyrics (LRC/XLRC) and a 256-point FFT spectrum display. It also includes a dedicated video player (BmpVideo).
- **Development Tools**: A built-in Lua code editor and debugging terminal, alongside a Shell with file transfer protocol support for easy development.
- **Gaming**: An Arduboy and Arduboy2 game system emulator, allowing users to play classic 8-bit games with support for background switching and independent save states.
- **System Utilities**: A file browser, text editor, task manager, and a system settings app for managing themes, battery info, and power control.

### Extensibility and Design
The system is designed to be modular and user-friendly. It can automatically identify new devices and generate graphical interfaces for them. The project also emphasizes a complete DIY aesthetic, providing 3D-printable PLA cases and custom PCB designs. This makes XC-OS not just a software project, but a complete open-source hardware and software package for enthusiasts looking to build their own handheld embedded workstation or gaming device.
