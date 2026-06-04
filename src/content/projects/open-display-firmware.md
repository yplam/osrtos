---
title: Open Display Firmware
summary: A firmware solution for Bluetooth Low Energy (BLE) electronic display tags
  supporting NRF52840 and ESP32 microcontrollers. It provides a framework for managing
  e-paper displays, configuring tag settings, and uploading images over BLE. The project
  is built using the Arduino framework and PlatformIO.
slug: open-display-firmware
codeUrl: https://github.com/OpenDisplay-org/Firmware
siteUrl: https://opendisplay.org/firmware/install/
star: 13
version: '0.66'
lastUpdated: '2026-01-12'
rtos: freertos
libraries:
- littlefs
topics:
- ble
- epaper
- epaper-displays
- epaper-screen
- esp32
- nrf52840
isShow: false
createdAt: '2026-01-18'
updatedAt: '2026-01-18'
relatedProjects:
- epd-nrf5-e-paper-display-calendar-and-photo-frame
- nrf52811-solum-tag-firmware
- esp32-ble-ota-arduino
- readmepaper-esp32-7-color-e-paper-display-project
- lvgl-watch-firmware-for-open-smartwatch
- crumble
---

Open Display Firmware is an open-source project dedicated to powering Bluetooth Low Energy (BLE) based display tags. Designed to be versatile and efficient, it provides the necessary logic to drive e-paper displays across a variety of modern microcontrollers, including the NRF52840 and several ESP32 variants like the S3, C6, and C3.

The project is structured to simplify the deployment of electronic shelf labels (ESL) or custom information displays. By leveraging BLE, users can wirelessly update display content, configure device settings, and manage power-efficient operations.

## Hardware and Platform Support

The firmware is built on the PlatformIO ecosystem, utilizing the Arduino framework for high-level hardware abstraction. It specifically targets several popular embedded platforms:

- **NRF52840**: Often used in low-power BLE applications, supported via the Nordic nRF52 platform.
- **ESP32-S3, C6, and C3**: High-performance and cost-effective wireless SoCs. The ESP32 builds take advantage of the underlying FreeRTOS environment for task management and watchdog control, ensuring system stability during long-running operations.

## Key Technical Components

The firmware integrates several specialized libraries to handle the unique requirements of e-paper displays and wireless communication:

- **Display Driving**: It utilizes the `bb_epaper` library for interfacing with various e-paper ICs, providing the low-level signals required to refresh electronic ink.
- **Data Compression**: The `uzlib` library is employed to handle compressed data, which is essential for maximizing the limited bandwidth of BLE when transmitting image buffers.
- **Storage**: On ESP32 platforms, the project uses LittleFS for robust filesystem management. This allows for persistent storage of configuration settings and image data directly on the flash memory.

## Functionality and Tools

Beyond the core firmware, the Open Display ecosystem provides web-based tools for interacting with the tags. These tools allow users to perform several critical tasks without needing a complex local development environment:

- **Installation**: Streamlined firmware flashing for supported boards via a web interface.
- **Configuration**: A dedicated interface to adjust BLE tag settings to suit specific deployment needs.
- **Display Testing**: Tools to test display functionality and upload images directly to the hardware to verify visual output.

The project is actively evolving, with a roadmap that includes adding WiFi support for ESP32 boards, 802.15.4 protocol support for alternative wireless networking, and expanded sensor integration. This makes it a robust starting point for developers looking to build custom IoT display solutions or smart signage.
