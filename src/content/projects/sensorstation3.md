---
title: SensorStation3
summary: SensorStation3 is an ESP32-based environmental monitoring station that utilizes
  FreeRTOS and the LVGL graphics library to provide a real-time touchscreen dashboard.
  It supports a variety of I2C sensors for tracking temperature, humidity, CO2, and
  atmospheric pressure, featuring seamless integration with Home Assistant and MQTT-based
  platforms.
slug: sensorstation3
codeUrl: https://github.com/ScorpionZZZ/SensorStation3
siteUrl: https://hackaday.io/project/206202-sensorstation3
version: 1.6.8
lastUpdated: '2026-08-01'
licenses:
- Apache-2.0
image: /202608/SensorStation3_0.avif
rtos: freertos
libraries:
- lvgl
- lwip
topics:
- air-quality
- bme280
- bme680
- bmp280
- cheap-yellow-display
- co2
- domoticz
- embedded-c
- environmental-monitoring
- esp-idf
- esp32
- home-automation
- ili9341
- iot
- lvgl
- mqtt
- ota-update
- st7789
- thingsboard
- touchscreen
isShow: true
createdAt: '2026-08-06T11:21:26+00:00'
updatedAt: '2026-08-06T11:21:26+00:00'
relatedProjects:
- project-aura
- q-sensor-multi-functional-zigbee-air-quality-sensor
- esp32-p4-home-assistant-display
- esp32-s3-smart-home-control-panel
- comfosense-touch-zehnder-comfoair-q350-mqtt-bridge-controller
- espmonitor-iot-environment-monitoring-system
---

SensorStation3 is a comprehensive environmental monitoring solution designed for the ESP32 platform, specifically optimized for the "Cheap Yellow Display" (CYD) hardware. By leveraging the latest ESP-IDF framework and FreeRTOS, the project creates a robust hub for tracking indoor climate and air quality metrics. It moves beyond simple data logging by providing a localized, interactive dashboard that makes environmental data immediately accessible without needing to open a mobile app or web browser.

## Advanced Visual Dashboard

The heart of the project is its touchscreen interface, powered by the LVGL (Light and Versatile Graphics Library) version 9. The dashboard is designed for high readability and information density, displaying not just current values but also 24-hour historical graphs, trend indicators, and rates of change for temperature and humidity. This allows users to visualize how their environment is evolving over time. 

The firmware is engineered for hardware flexibility, featuring automatic detection of display controllers. Whether a board uses an ILI9341 or an ST7789 panel, the system identifies the hardware at boot and configures the display drivers accordingly. This plug-and-play philosophy extends to the sensors as well; the station automatically scans the I2C bus to detect and initialize supported environmental modules.

## Comprehensive Sensor Support

SensorStation3 supports a wide array of popular I2C sensors, ranging from basic pressure sensors to advanced air quality monitors. Supported hardware includes:

- **BME280/BMP280**: Reliable standards for temperature, humidity, and atmospheric pressure.
- **BME680**: Supports gas resistance and volatile organic compound (VOC) monitoring. The project includes optional integration with the Bosch BSEC library for advanced Indoor Air Quality (IAQ) calculations.
- **SCD40/SCD41**: High-accuracy NDIR sensors for direct CO2 measurement, providing more precise readings than equivalent calculated values.

For users dealing with internal device heat, the software includes temperature offset compensation, ensuring that readings remain accurate even when the sensor is mounted close to the ESP32 processor.

## Smart Home Ecosystem Integration

While the local display is a primary feature, SensorStation3 is fully equipped for the modern smart home. It utilizes the lwIP stack for networking and provides native MQTT integration. For Home Assistant users, the project implements MQTT Discovery, allowing the device and all its sensors to be automatically detected and configured as entities without any manual YAML editing.

Beyond Home Assistant, the station supports Domoticz and ThingsBoard, making it a versatile edge device for broader IoT architectures. It also maintains time accuracy via NTP synchronization, ensuring that the on-screen graphs and logs are always correctly timestamped.

## Maintenance and Configuration

One of the project's most user-friendly aspects is its approach to configuration. Rather than requiring users to hardcode Wi-Fi credentials or MQTT settings into the source code, SensorStation3 provides an on-device settings screen. Users can scan for Wi-Fi networks, enter passwords via an on-screen keyboard, and configure broker details directly on the device. These settings are stored securely in Non-Volatile Storage (NVS).

To ensure the device stays up to date with the latest features and security patches, the project includes a sophisticated Over-the-Air (OTA) update manager. The device periodically checks a remote manifest for new firmware versions and provides an on-screen notification when an update is available, allowing for one-touch installation of the latest binary.
