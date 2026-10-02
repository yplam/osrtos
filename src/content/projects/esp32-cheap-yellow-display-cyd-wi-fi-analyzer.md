---
title: ESP32 Cheap Yellow Display (CYD) Wi-Fi Analyzer
summary: This project transforms an ESP32 'Cheap Yellow Display' (CYD) into a graphical
  Wi-Fi signal analyzer, visualizing network strength and channel congestion. It utilizes
  the Arduino_GFX_Library to support various display drivers like the ST7789 and ILI9341
  on a 320x170 resolution screen, making it compatible with multiple hardware iterations
  of the CYD platform.
slug: esp32-cheap-yellow-display-cyd-wi-fi-analyzer
codeUrl: https://github.com/AndroidCrypto/ESP32_CYD_WiFi_Analyzer
siteUrl: https://medium.com/@androidcrypto/use-an-esp32-cheap-yellow-device-as-graphical-wi-fi-analyzer-47549374a1e3
lastUpdated: '2025-11-28'
licenses:
- MIT
image: /202608/ESP32_CYD_WiFi_Analyzer_0.avif
rtos: ''
topics:
- analyzer
- cheap-yellow-display
- cyd
- esp32
- ili9341
- st7789
- st7796
- wifi
isShow: true
createdAt: '2026-08-02T06:40:03+00:00'
updatedAt: '2026-08-02T06:40:03+00:00'
relatedProjects:
- esp32-marauder-for-cheap-yellow-display-cyd
- esp32-smartdisplay
- three-ips-displays-with-st7789
- cyd-ansi-vt100-serial-terminal
- esp32-cheap-yellow-display-micropython-lvgl
- esp32-st7789v-ft6236u-arduino-lvgl-demo
---

The ESP32 Cheap Yellow Display (CYD) Wi-Fi Analyzer is a specialized tool designed to visualize the local wireless environment. By leveraging the integrated display and Wi-Fi capabilities of the ESP32, this project provides a clear, graphical representation of network signal strength and channel usage, helping users identify interference and optimize their network setup.

### Understanding the Cheap Yellow Display (CYD)

The "Cheap Yellow Display" has become a popular choice for rapid development in the embedded community. These devices typically integrate an ESP32 WROOM microcontroller with a TFT display, an optional touch surface, an SD card reader, and an RGB LED. 

Initially introduced with a 2.8-inch display using the ILI9341 driver and XPT2046 resistive touch controller, newer versions have expanded the ecosystem. Current iterations range from 1.28 to 7 inches and utilize various driver chips. For this specific implementation, 1.9-inch variants with a resolution of 320 x 170 pixels in landscape orientation are targeted. While most units use the ESP32 WROOM, some newer models feature the more powerful ESP32-S3 chip.


### Software Architecture and Libraries

To manage the diverse range of display hardware found in the CYD ecosystem, the project relies on the **GFX library for Arduino** (specifically version 1.6.3). This library provides the necessary abstraction to handle different display drivers such as the ST7789, ILI9341, and ST7796. 

![Graphical representation of WiFi signal strength and channels](/202608/ESP32_CYD_WiFi_Analyzer_1.avif)

The core functionality of the analyzer involves scanning the 2.4GHz spectrum using the native `WiFi.h` library (or `ESP8266WiFi.h` for compatible boards). The software processes the Received Signal Strength Indicator (RSSI) data from surrounding access points and maps them to their respective Wi-Fi channels, creating a real-time visualization of channel congestion.

### Development and Configuration

The project is developed using the Arduino IDE (Version 2.3.6) and requires the `arduino-esp32` boards package (Version 3.2.0). When configuring the environment, the "ESP32 Dev Module" is the standard board selection for most CYD hardware.

![WiFi Analyzer UI showing network congestion](/202608/ESP32_CYD_WiFi_Analyzer_2.avif)

Because the CYD hardware can vary between manufacturers, the code is designed to be adaptable. The use of the Arduino_GFX_Library ensures that as long as the correct pins and driver chips are defined, the analyzer can function across different hardware revisions. This makes it a versatile tool for anyone working with the ESP32 platform who needs a portable, visual way to inspect Wi-Fi network health.
