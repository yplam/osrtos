---
title: WT32-SC01 PLUS Smart Desk Companion
summary: A network-connected desk companion firmware for the ESP32-S3 based WT32-SC01
  PLUS touch display. It integrates a real-time clock, OpenWeatherMap weather data,
  and an online radio player using LVGL for the graphical interface and FreeRTOS for
  task management.
slug: wt32-sc01-plus-smart-desk-companion
codeUrl: https://github.com/SubCoderHUN/WT32-SC01-PLUS
star: 30
version: V1.4
lastUpdated: '2025-10-26'
rtos: freertos
libraries:
- lvgl
topics:
- arduino
- esp32
- esp32-s3
- platformio
- platformio-arduino
- vscode
- vscode-extension
- wt32-sc01-plus
isShow: true
image: /202603/mainscreen.webp
createdAt: '2026-03-04'
updatedAt: '2026-03-04'
---

The WT32-SC01 PLUS Smart Desk Companion is a feature-rich firmware project designed to transform Espressif's ESP32-S3 based touch display module into a versatile desktop utility. By combining high-performance graphics with network connectivity, the project creates a centralized hub for time, weather, and multimedia.

## Core Functionality

The application serves several primary roles as a desk companion. It functions as a synchronized network clock and provides live weather updates by fetching data from the OpenWeatherMap API. Beyond static information, the firmware includes a built-in online radio player capable of streaming audio over the internet. To support these features, the system manages user preferences—such as Wi-Fi credentials, location settings, and brightness levels—using EEPROM for persistent storage, ensuring settings remain intact across reboots.

## Technical Architecture

The project is built on a modern embedded stack optimized for the ESP32-S3 SoC. It utilizes the following components:

- **Graphics & UI**: The user interface is powered by the Light and Versatile Graphics Library (LVGL), known for its ability to create sophisticated UIs on microcontrollers. Rendering is handled by the LovyanGFX driver, which provides high-speed display communication.
- **RTOS Integration**: As is standard for ESP32-S3 development within the Arduino and ESP-IDF frameworks, the project relies on FreeRTOS to manage concurrent operations, such as handling touch input, updating the display, and maintaining network streams.
- **Hardware Interfacing**: The firmware supports I2S audio output for radio playback and SPI-based microSD card access for optional activity logging.

## User Interface Design

A significant aspect of this project is its integration with SquareLine Studio. The visual elements were designed using this professional UI editor, and the repository includes the original `.spj` project file. This allows developers to graphically modify the interface, add new screens, or change the aesthetic before exporting the generated C++ code back into the PlatformIO project.

## Hardware and Customization

The firmware is specifically tailored for the WT32-SC01 PLUS module, which features a 480×320 capacitive touch screen. The project is designed to be extensible; while it currently supports weather and radio, the author has planned future enhancements to utilize remaining GPIOs for expansion modules and more detailed weather forecasting. 

For developers, the project uses the PlatformIO IDE, making it straightforward to build and flash. The inclusion of comprehensive English and Hungarian documentation provides deep dives into the technical implementation and setup process, making it an accessible platform for both users and contributors looking to build custom HMI (Human Machine Interface) solutions.
