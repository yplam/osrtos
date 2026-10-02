---
title: InkCast
summary: InkCast is an ESP32-S3 firmware for a battery-powered e-paper weather station
  that balances high-density information with extreme power efficiency. Built using
  the Arduino framework on FreeRTOS, it features a web-based configuration portal
  and supports multiple weather providers to deliver a long-lasting, wall-mounted
  dashboard.
slug: inkcast
codeUrl: https://github.com/Blisart/InkCast
version: 0.1.1-alpha
lastUpdated: '2026-06-10'
licenses:
- AGPL-3.0
image: /202608/InkCast_0.avif
rtos: freertos
libraries:
- u8g2
- spiffs
topics:
- 3d-printing
- arduino
- battery-powered
- eink
- eink-devices
- einkdisplay
- epaper
- epaper-displays
- epaper-screen
- esp32
- esp32-arduino
- esp32-s3
- inkcast
- iot
- low-power
- open-meteo
- openweathermap
- weather-station
- weather-station-eink
- weather-station-esp32
isShow: true
createdAt: '2026-08-02T06:40:49+00:00'
updatedAt: '2026-08-02T06:40:49+00:00'
relatedProjects:
- volna-2bw42-weather-station-firmware
- inkwatchy
- desk-weather-clock-geekmagic-s3
- flightportrait-firmware
- esphome-e-ink-4-color-dashboard
- weather-micro-station-for-t-display-s3
---

InkCast is a specialized firmware designed to turn an ESP32-S3 and a large e-paper display into a sophisticated, low-power weather dashboard. Unlike many simple weather displays, InkCast focuses on information density and long-term autonomy, providing a comprehensive view of current conditions, hourly trends, and multi-day forecasts while maintaining a battery life that can exceed a year on a single charge.

## High-Density E-Paper Dashboard

The project is built around the GDEM0397T81P, a 3.97-inch black-and-white e-paper panel with an 800x480 resolution. This high pixel density allows the UI to display a wealth of data without feeling cluttered. The screen is divided into three primary zones:

*   **Status Bar**: Displays the city name, current date and time, Wi-Fi connectivity, and battery health.
*   **Current Conditions**: A prominent block featuring weather icons, "feels-like" temperatures, precipitation probability, and astronomical data like sunrise and sunset times.
*   **Forecast Area**: A detailed 48-hour chart showing temperature curves and precipitation bars, alongside cards for a 6-day forecast.

## Hardware and Power Management

The recommended hardware stack utilizes the LILYGO T-Energy-S3, an ESP32-S3 board that includes integrated 18650 battery support and power management. By leveraging the ESP32's deep sleep capabilities, InkCast achieves a typical power consumption of only 5-6 mAh per day at a default 2-hour refresh interval. This efficiency allows the device to run for approximately 1 to 1.5 years on standard 18650 cells (2000-3000 mAh).

To ensure the device remains responsive for maintenance, InkCast includes a dedicated debug mode. When connected to a computer via USB or when a specific GPIO is shorted, the device stays awake, enabling serial logging and a web-based administration panel.

## Web-Based Configuration

One of the standout features of InkCast is its built-in web admin panel. This interface allows users to configure the device without needing to reflash the firmware. Through the browser, users can update:

*   Wi-Fi credentials.
*   Weather provider selection (Open-Meteo or OpenWeatherMap).
*   Geographic coordinates and city labels.
*   Refresh intervals (ranging from 1 to 1440 minutes).

If the device cannot connect to a saved Wi-Fi network, it automatically falls back to an Access Point mode (`ESP-Weather-Setup`), allowing for seamless first-time provisioning or credential recovery.

## Technical Implementation

The firmware is developed for the Arduino ecosystem and relies on several key libraries for its functionality. It uses `GxEPD2` for display driving, `U8g2_for_Adafruit_GFX` for high-quality UTF-8 text rendering, and `ArduinoJson` for parsing weather data from API providers. 

Because the project includes large font assets and weather icons, the firmware requires specific partition schemes. Users must select a partition layout with at least 3MB for the application (such as "Huge APP" or specific 16MB Flash configurations) to accommodate the binary size.

## UI Simulator

For developers looking to customize the interface, InkCast includes a desktop simulator in the `sim/` directory. This allows for rapid iteration on typography, spacing, and layout logic without the time-consuming process of flashing hardware and waiting for e-paper refresh cycles. This makes it an excellent platform for those who wish to extend the dashboard to display other types of data, such as smart home metrics or personal calendars.
