---
title: Cardputer GPS Info
summary: A lightweight GPS diagnostic and information tool designed for the M5Stack
  Cardputer. It parses NMEA 0183 data using the TinyGPSPlus library to display real-time
  coordinates, satellite visibility, and sky plots. The project features configurable
  UART settings and microSD support for persistent configuration on ESP32-S3 hardware.
slug: cardputer-gps-info
codeUrl: https://github.com/alcor55/Cardputer-GPS-Info
version: v1.1.0
lastUpdated: '2025-11-12'
image: /202604/Cardputer-GPS-Info_0.avif
rtos: freertos
topics:
- cardputer
- gps
- m5stack
- nmea0183
isShow: true
createdAt: '2026-04-28T02:36:37+00:00'
updatedAt: '2026-04-28T02:36:37+00:00'
---

Cardputer GPS Info serves as a dedicated utility for the M5Stack Cardputer, transforming the compact handheld into a functional GPS receiver and diagnostic terminal. By reading NMEA data through a serial connection, the tool provides a comprehensive overview of location, speed, and satellite health directly on the integrated display.


The recent version 1.1.0 update introduced significant quality-of-life improvements, including a configuration file (`cpGpsInfo.conf`) stored on the microSD card. This allows users to persist settings such as RX/TX pins and baud rates without recompiling the code. Additionally, the tool now includes an explicit GPS error state indicator (on, off, or err) to help troubleshoot connection issues.

## Comprehensive Satellite Tracking
One of the core strengths of the application is its ability to track every satellite the receiver identifies. It categorizes them into three states: those currently in the fix, those that are visible, and those that have been seen but are not currently utilized. 

![A detailed sky plot showing satellite positions and signal status](/202604/Cardputer-GPS-Info_1.avif)

The sky plot provides a visual representation of satellite positions in the sky, using a color-coded system for quick assessment:

*   **Green**: Satellites actively used in the current position fix.
*   **Yellow**: Visible satellites providing data but not in the fix.
*   **Red**: Known satellites that are currently unavailable.

Users can toggle satellite IDs and system information on the plot to get a deeper look at the constellation data.

## Interactive Controls and Configuration
The tool leverages the Cardputer's keyboard for real-time interaction. Users can start or stop the serial stream, enter the configuration menu, or toggle visual elements on the sky plot using simple key bindings.

![The configuration and help menu interface](/202604/Cardputer-GPS-Info_2.avif)

Beyond the screen, the application can output data to a connected PC. Pressing `[l]` prints a detailed satellite list to the USB serial console, while `[n]` enables the streaming of raw NMEA sentences. This effectively turns the Cardputer into a GPS bridge for external mapping software or debugging tools on a computer.

## Hardware Integration
The project is compatible with the M5Stack Cardputer (v1, v1.1, and ADV). It requires an external GPS module connected to the Grove port or internal pins, with the TX and RX lines being fully configurable via the software menu.

![The hardware setup with a GPS module connected to the Cardputer](/202604/Cardputer-GPS-Info_4.avif)

By combining the TinyGPSPlus parsing engine with the M5Cardputer library's display and input capabilities, this tool offers a portable solution for verifying GPS performance and monitoring satellite constellations in the field.
