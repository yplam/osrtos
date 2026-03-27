---
title: Bitclock
summary: An open-source e-ink desk companion, clock, and air quality monitor based
  on the ESP32. It utilizes the ESP-IDF framework for firmware and includes a custom
  PCB, 3D-printable enclosure, and a web-based configuration tool.
slug: bitclock
codeUrl: https://github.com/goat-hill/bitclock
siteUrl: https://bitclock.io
star: 105
version: v1.1.3
lastUpdated: '2025-12-16'
rtos: freertos
topics:
- 3d-printing
- aqi
- ble
- esp-idf
- esp32
- esp32-s3
- freertos
- lvgl
- nextjs
- pcb
isShow: true
image: /202603/bitclock.webp
createdAt: '2026-03-24'
updatedAt: '2026-03-24'
---

Bitclock is an open-source, multi-functional desk companion that combines a clock with air quality monitoring capabilities. Designed around an e-ink display, it provides a high-contrast, always-on interface that is easy on the eyes and aesthetically pleasing in any office or home environment.

The project is a comprehensive example of a modern embedded system, spanning firmware development, hardware design, mechanical engineering, and web-based user interfaces. While available as a commercial product, it remains fully open-source for makers and developers who wish to build, modify, or study the design.

## Hardware and Design

At the heart of Bitclock is an ESP32 microcontroller, chosen for its robust Wi-Fi and Bluetooth capabilities. The device features a custom PCB designed in KiCad, which integrates the MCU with an e-ink display and environmental sensors. The physical form factor is defined by a custom enclosure designed in OnShape, with STEP files and 3D printing instructions provided for those who want to manufacture the shell themselves.

## Firmware Architecture

The firmware is developed using the ESP-IDF (Espressif IoT Development Framework), which leverages FreeRTOS for task management and system stability. This choice allows for advanced features such as efficient power management and reliable networking, which are crucial for a device that functions as a persistent IoT monitor. The project also serves as an educational resource, with associated blog posts detailing advanced ESP32 development techniques using VS Code and the ESP-IDF.

## Web Integration and Configuration

One of the standout features of Bitclock is its user-friendly setup process. While many DIY projects require complex serial commands for configuration, Bitclock provides a seamless web-based configurator built with Next.js. Users can visit the dedicated connection portal to configure device settings, connect to local Wi-Fi, and customize the display output directly from a browser.

## Open Source Ecosystem

The Bitclock repository is structured as a monorepo, providing a complete look at the product lifecycle:
- **bitclock-fw**: The ESP-IDF firmware source code.
- **bitclock-pcb**: KiCad schematics, board layouts, and JLCPCB-ready manufacturing files.
- **bitclock-enclosure**: CAD designs and 3D printing instructions.
- **bitclock-web**: The Next.js source code for the homepage and device configurator.

By providing the full stack of design files, Bitclock serves as an excellent reference project for developers looking to see how a professional IoT product is built from the ground up, from the initial schematic to the final web-based user interface.
