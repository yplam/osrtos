---
title: M5Cardputer GPS Logger
summary: A GPS logging application for the M5Cardputer platform that records location
  data to an SD card. It features a dual-mode operation including a power-saving sleep
  mode and a normal mode with real-time data display on the integrated screen.
slug: m5cardputer-gps-logger
codeUrl: https://github.com/geo-tp/M5Cardputer-GPS-Logger
star: 32
version: v1.0
lastUpdated: '2024-05-21'
rtos: freertos
topics:
- cardputer
- gps
- logger
- m5cardputer
- m5stack
- m5stack-cardputer
- sdcard
isShow: false
createdAt: '2026-03-24'
updatedAt: '2026-03-24'
---

The M5Cardputer GPS Logger is a specialized firmware designed for the M5Stack Cardputer, transforming the compact, keyboard-equipped device into a portable GPS tracking station. By interfacing with a UART GPS module—specifically tested with the Grove GPS Air530—the project provides a streamlined way to capture and store geospatial data in a standard CSV format.

## Operational Modes

The application is built around two distinct operational states to balance visibility and power consumption:

- **NORMAL Mode**: This mode is designed for active monitoring. It updates the onboard display every three seconds with current GPS coordinates while logging data to the SD card at one-minute intervals. Users can manually toggle the screen or the SD logging functionality to suit their needs.
- **SLEEP Mode**: For long-term tracking where battery life is a concern, Sleep mode transitions the ESP32-S3 into a light sleep state between logs. In this mode, the screen is powered down to conserve energy, yet the device continues to wake up every minute to commit the latest GPS string to the `gps_data.csv` file at the root of the SD card.

## Technical Implementation

The project is developed using the Arduino framework on the Espressif ESP32-S3 platform. It leverages the `M5Cardputer` library for hardware abstraction (screen, keyboard, and power management) and the `TinyGPSPlus` library for efficient parsing of NMEA sentences from the GPS module. 

Data is stored on a microSD card, which is a requirement for the logging functionality. The system is configured via PlatformIO, targeting the `m5stack-stamps3` board definition, which reflects the internal core of the Cardputer.

## User Interface and Controls

Interaction is handled through the Cardputer's physical keyboard, providing tactile control over the logging process:

- **OK Key**: Toggles SD card logging on or off.
- **S Key**: Toggles the screen backlight to save power without entering full sleep mode.
- **- and = Keys**: Adjust the screen brightness levels.

## Getting Started

Users can deploy the firmware using the M5Burner tool by searching for the project in the M5CARDPUTER section, or by manually flashing the `firmware.bin` from the repository releases. A UART-based GPS module must be connected to the device's Grove port, and a formatted SD card must be inserted for data persistence.
