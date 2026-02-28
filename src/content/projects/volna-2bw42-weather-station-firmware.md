---
title: Volna 2BW42 Weather Station Firmware
summary: An Arduino-based firmware for E-Ink weather stations targeting ESP8266 and
  ESP32 platforms. It supports BME280, SCD41, and DS18B20 sensors, provides MQTT connectivity
  for smart home integration, and features a web-based UI for configuration and custom
  design uploads.
slug: volna-2bw42-weather-station-firmware
codeUrl: https://github.com/NC22/Volna42BW
siteUrl: https://42volna.ru/
star: 88
version: v0.98
lastUpdated: '2025-11-08'
rtos: freertos
libraries:
- platformio-platformio-core
topics:
- arduino
- domoticz
- eink
- einkdisplay
- esp32
- esp8266
- home-assistant
- open-meteo
- openweather
- openweathermap
- weather-station
isShow: true
image: /202602/volna42bw.webp
createdAt: '2026-02-28'
updatedAt: '2026-02-28'
---

## Overview

Volna 2BW42 is a comprehensive firmware solution designed for DIY weather stations utilizing monochrome E-Ink displays. Built on the Arduino framework and optimized for the ESP8266 and ESP32 microcontrollers, this project provides a robust platform for environmental monitoring with a focus on high visibility and extreme power efficiency.

The project stands out by offering a bridge between local sensor data and cloud-based weather services, all while maintaining a low-power profile suitable for long-term battery operation. Its modular design allows users to customize both the hardware components and the visual interface.

## Hardware and Display Support

The firmware is compatible with a wide range of hardware configurations. It natively supports popular microcontrollers including the ESP8266 (such as the D1 Mini) and the ESP32 (including S3 variants). The primary output medium is monochrome E-Ink (Electronic Paper) displays, which are ideal for weather stations due to their paper-like readability and zero power consumption when maintaining a static image.

**Supported displays include:**
- 4.2-inch (400x300) and 1.5-inch (200x200) panels.
- Hardware from Waveshare, WeAct, Heltec, and compatible equivalents.

## Sensor Integration and Data Sources

Volna 2BW42 is designed to be flexible with data acquisition. It can gather information from local physical sensors or pull data from external APIs and smart home controllers.

- **Local Sensors:** Supports the BME280 for temperature, humidity, and pressure; the SCD41 for CO2 monitoring; and the DS18B20 for high-precision temperature readings.
- **External Integration:** The firmware can receive data via MQTT or fetch information from Home Assistant, Domoticz, Open-Meteo, and OpenWeather APIs.
- **Data Transmission:** Local sensor readings can be broadcast to an MQTT broker, allowing the weather station to act as a sensor node in a larger IoT ecosystem.

## Power Efficiency and Autonomous Operation

A key feature of the Volna 2BW42 is its autonomous mode. The device is designed to spend most of its time in a deep-sleep state, waking up at defined intervals (defaulting to every 10 minutes) to refresh the sensor data and update the E-Ink display. For time-sensitive information, a partial update mode allows the clock area to refresh every 1-2 minutes without a full screen flash. This efficiency allows a standard 2000 mAh 18650 battery to power the device for several months.

## Web Interface and Customization

Configuration is handled through an intuitive web-based panel. When the device is in setup mode, it acts as a Wi-Fi Access Point, allowing users to configure Wi-Fi credentials, MQTT settings, and sensor pins without modifying the source code. 

One of the most unique aspects of the project is the ability to create and upload custom UI designs through the web panel. This allows users to personalize the layout of weather icons, graphs, and text fields to suit their specific needs. The UI supports multiple languages, including English, Russian, Japanese, and German.

## Getting Started

The project is developed using PlatformIO. To get started, developers should:
1. Open the project in the PlatformIO environment.
2. Configure hardware-specific pinouts in `UserDefines.h` to match their specific display and sensor wiring.
3. Adjust default settings in `UserSetting.h` if necessary.
4. Build and upload the firmware to the target ESP8266 or ESP32 board.

Once flashed, the initial configuration is performed by connecting to the `VOLNA42-EINK` Wi-Fi hotspot and accessing the local web interface.
