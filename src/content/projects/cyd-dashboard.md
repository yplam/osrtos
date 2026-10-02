---
title: CYD Dashboard
summary: A comprehensive multi-screen information dashboard for the ESP32-based 'Cheap
  Yellow Display' (CYD) featuring real-time amateur radio data, weather, and financial
  tracking. Built with a hybrid Arduino and ESP-IDF framework, it utilizes FreeRTOS
  for task management and LovyanGFX for high-performance rendering on 2.8-inch touchscreens.
slug: cyd-dashboard
codeUrl: https://github.com/Matt-Housley/cyd-dashboard
version: v1.18.032
lastUpdated: '2026-07-29'
licenses:
- MIT
rtos: freertos
libraries:
- spiffs
- lwip
topics:
- amateur-radio
- arduino
- cheap-yellow-display
- cyd
- dashboard
- dx-cluster
- esp32
- esp32-2432s028
- ft8
- greyline
- ham-radio
- hf-propagation
- ili9341
- iss-tracker
- lovyangfx
- platformio
- pota
- pskreporter
- sota
- weather-station
isShow: false
createdAt: '2026-08-06T11:20:10+00:00'
updatedAt: '2026-08-06T11:20:10+00:00'
relatedProjects:
- overhead
- cyd-tactical-weather-station
- esp32-cyd-weather-station-with-3-day-forecast
- wt32-sc01-plus-smart-desk-companion
- bbmonitor
- sensorstation3
---

The CYD Dashboard transforms the affordable ESP32-2432S028 module—popularly known as the "Cheap Yellow Display"—into a sophisticated, multi-functional data hub. While the project is heavily tailored toward amateur (ham) radio operators, it functions as a versatile desktop companion by integrating weather forecasts, news feeds, and financial market tracking into a single, touch-interactive interface.

### Multi-Screen Ecosystem

The dashboard features 14 distinct screens that cycle automatically or can be navigated manually via the touchscreen. Key screens include:

*   **Amateur Radio Tools**: Real-time HF propagation conditions, solar indices, and live spots for POTA (Parks on the Air), SOTA (Summits on the Air), and DX clusters. 
*   **Orbital Tracking**: A live ISS tracker with a day/night world map, terminator line, and a prediction engine that calculates the next visible pass for the user's specific location.
*   **Environmental Data**: A 7-day weather forecast powered by the Open-Meteo API, featuring animated icons and a red "Lightning Alert" banner that triggers when thunderstorms are detected nearby.
*   **Information Feeds**: RSS-based news headlines from the BBC and MacRumors, complete with thumbnail images and expandable text popups.
*   **Financials**: A stocks and cryptocurrency tracker with multi-year sparklines for visual trend analysis.

### Technical Architecture

One of the most notable aspects of this project is its hybrid build system. By pinning specific versions of the ESP32 platform, the developer successfully combines the Arduino framework for ease of use with the ESP-IDF for low-level system control. This allows for advanced configurations in `sdkconfig.defaults` that are typically unavailable in standard Arduino builds.

A critical technical achievement is the project's efficient memory management. To handle multiple HTTPS API requests on the ESP32, the firmware utilizes an asymmetric TLS record buffer. This optimization cuts the contiguous heap required for SSL handshakes by half, ensuring stable performance even when the system is parsing large JSON responses or streaming image data.

### Hardware Integration

The firmware is optimized for the standard 2.8-inch ILI9341 display and XPT2046 resistive touch controller found on most CYD units. However, it is designed with hardware variability in mind. The `lgfx_config.h` file provides a centralized location to swap driver classes for ST7789 displays or capacitive touch controllers like the GT911. 

The project also makes creative use of the CYD's onboard peripherals:
*   **Common-Anode RGB LED**: Provides at-a-glance status notifications, such as blue for data loading, green for ISS visibility, and red for weather alerts.
*   **MicroSD Slot**: Used for capturing 24-bit BMP screenshots of the dashboard.
*   **SPIFFS**: Stores persistent settings and touch calibration data across reboots.

### Customization and Setup

Setting up the dashboard is streamlined through a captive portal for WiFi configuration. Once connected, users can access an on-device settings menu to input their Maidenhead grid locator, amateur radio callsign, and preferred units for distance and temperature. The project also includes a unit-test suite using the Unity framework, which runs directly on the ESP32 to verify logic for coordinate conversions, timezone lookups, and data parsing.
