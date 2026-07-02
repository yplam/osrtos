---
title: E-ink Meeting Room Schedule Display
summary: A wireless e-ink device based on the ESP32-powered Soldered Inkplate 6 platform
  that displays meeting room schedules. It utilizes the Roombelt backend for data
  and features a secondary digital photo frame mode that reads images from a microSD
  card.
slug: e-ink-meeting-room-schedule-display
codeUrl: https://github.com/ziolko/eink-calendar-display
siteUrl: https://roombelt.com
lastUpdated: '2024-08-26'
licenses:
- GPL-3.0
image: /202605/eink-calendar-display_1.avif
rtos: freertos
topics:
- eink
- inkplate
- inkplate-6
- meetingroom
- platformio
isShow: true
createdAt: '2026-05-10T09:13:35+00:00'
updatedAt: '2026-05-10T09:13:35+00:00'
relatedProjects:
- ai-desk-card
- esphome-e-ink-4-color-dashboard
- git-contributions-e-ink-display
- epd-nrf5-e-paper-display-calendar-and-photo-frame
- 42-smart-cluster-sign
- esp-e-paper-component
---

Creating a wireless e-ink device provides an elegant solution for displaying schedules for meeting rooms or home offices. This project leverages high-visibility e-paper technology to create a low-power display that remains readable in various lighting conditions without the glare of traditional screens.


Beyond its primary function as a schedule tracker, the device is designed to be versatile. After office hours, it can automatically transition into a digital photo frame. In this mode, it displays images stored on a microSD card, making it an aesthetic addition to a home office environment when not in active use for meetings.

![E-ink device operating in photo frame mode](/202605/eink-calendar-display_3.avif)

## Hardware Platform

The system is built around the Soldered Inkplate 6, a powerful e-paper board powered by an ESP32 microcontroller. This board is specifically chosen for its integrated Wi-Fi capabilities and ease of use with the Arduino framework. To ensure portability and a clean aesthetic, the device is powered by a 3.7V Li-ion battery (3000mAh or greater) and housed in a custom 3D-printed case consisting of a front frame and a back cover.

For data connectivity and scheduling, the device uses Roombelt as its backend service. This integration allows the display to fetch real-time calendar information and update the e-ink screen accordingly.

## Firmware and Development

The firmware is developed using PlatformIO within the Visual Studio Code environment. It utilizes the Arduino framework for ESP32, specifically targeting the `esp32dev` board configuration. The build process incorporates the Inkplate-Arduino-library to manage the display hardware, along with ArduinoJson for handling configuration data and a Crypto library for secure communications.

The project defines two primary build environments: 
- **Debug**: Includes an exception decoder and higher log levels for development.
- **Release**: Optimized for performance with minimized logging.

## Configuration and Setup

Connectivity settings are managed externally to the firmware, allowing for easy updates without recompiling the code. WiFi credentials and other settings are read from a `config.json` file stored on a FAT-formatted microSD card. The structure of this configuration is straightforward:

```json
{
    "ssid": "WiFi network name",
    "password": "Wifi network password"
}
```

## Assembly and Construction

The physical assembly involves two 3D-printed components. These parts are designed to be printed with supports at a 0.2 resolution and 20% infill. The assembly process is mechanical, requiring four M2*10 screws to secure the back cover to the front frame. Internally, the battery is secured to the back cover using double-sided tape, and the Inkplate board is seated within the front cover before the components are connected and screwed together.
