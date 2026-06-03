---
title: Project Aura
summary: An open-source air-quality station based on the ESP32-S3, featuring a professional-grade
  sensor suite and a touch-enabled LVGL user interface. It integrates MQTT for Home
  Assistant discovery and provides a local web portal for configuration and telemetry
  monitoring.
slug: project-aura
codeUrl: https://github.com/21cncstudio/project_aura
siteUrl: https://makerworld.com/en/crowdfunding/159-project-aura-make-the-invisible-visible
star: 103
version: v1.0.7
lastUpdated: '2026-02-07'
rtos: freertos
libraries:
- littlefs
- lvgl
topics:
- 3d-printing
- adafruit
- air-quality
- arduino
- diy
- esp32
- esp32-s3
- home-assistant
- indoor-air-quality
- iot
- lvgl
- mqtt
- open-hardware
- platformio
- sen66
- sensirion
- sensors
- sfa30
- smart-home
- waveshare
isShow: true
image: /202602/aura.webp
createdAt: '2026-02-08'
updatedAt: '2026-02-08'
relatedProjects:
- esphome-ikea-vindriktning
- q-sensor-multi-functional-zigbee-air-quality-sensor
- esp32-s3-smart-home-control-panel
- air-quality-monitor
- bitclock
- comfosense-touch-zehnder-comfoair-q350-mqtt-bridge-controller
---

Project Aura is an open-source air-quality station designed for makers who want a polished, reliable device rather than a bare sensor board. Built around the ESP32-S3, it combines high-quality telemetry with a professional user interface and seamless smart home integration. The project is specifically designed to be accessible, requiring no soldering when using recommended Grove or QT connectors, making it an ideal project for both hobbyists and those seeking a functional home environmental monitor.

## Hardware and Sensor Suite

The device is built on the Waveshare ESP32-S3-Touch-LCD-4.3, which provides a large 800x480 display for real-time data visualization. At its core, Project Aura utilizes a sophisticated array of sensors to provide comprehensive environmental data:
- **Sensirion SEN66**: Measures PM2.5, PM10, CO2, VOC, NOx, temperature, and humidity.
- **Sensirion SFA30**: Dedicated formaldehyde (HCHO) sensing.
- **BMP580 or DPS310**: High-precision barometric pressure monitoring.
- **PCF8523 RTC**: Real-time clock for accurate timekeeping and data logging.

## Software Architecture

The firmware is built using the Arduino framework on top of the ESP32-S3's FreeRTOS-based environment. The architecture is modular, utilizing specialized managers to handle different system responsibilities:
- **SensorManager**: Orchestrates data collection from the I2C bus.
- **NetworkManager**: Handles Wi-Fi connectivity and the captive portal setup.
- **MqttManager**: Manages communication with Home Assistant and other MQTT brokers.
- **TimeManager**: Synchronizes time via NTP and the local RTC.
- **Reliability Layer**: Includes a Safe Boot policy, watchdog timers, and memory monitoring to ensure the device remains stable over long periods.

## User Interface and Experience

Project Aura features a smooth, touch-friendly UI powered by the LVGL library. The interface includes multiple screens for a live dashboard, detailed settings, theme presets, and backlight control. It supports a wide range of languages, including English, German, Spanish, French, Italian, Dutch, Portuguese, and Simplified Chinese. For night-time use, the device includes a dedicated night mode and custom theme support.

## Connectivity and Integration

One of the standout features of Project Aura is its ease of configuration. On the first boot, the device creates a Wi-Fi access point that serves a local web portal for credential setup. Once connected, users can access a full mDNS-enabled web interface (http://aura.local) to configure MQTT settings, timezones, and display preferences. 

For smart home enthusiasts, the project is "Home Assistant ready." It supports automatic MQTT discovery, allowing the device to appear in Home Assistant instantly without manual configuration. The repository even provides ready-to-use YAML code for a custom Home Assistant dashboard to match the device's physical UI.

## Build and Reliability

The project emphasizes reliability through its "Safe Boot" mechanism, which can automatically roll back to the last-known-good configuration if a crash is detected. Developers can build and flash the firmware using PlatformIO, and the project includes a comprehensive test suite for native host testing to ensure the stability of core modules like the pressure history and storage managers.
