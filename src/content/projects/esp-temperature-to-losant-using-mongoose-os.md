---
title: ESP Temperature to Losant using Mongoose OS
summary: A Mongoose OS application for ESP32 and ESP8266 that periodically publishes
  internal temperature sensor readings to the Losant IoT platform via MQTT. It features
  deep sleep support for power efficiency, an OTA mode for configuration, and adjustable
  temperature offsets to compensate for MCU internal heat.
slug: esp-temperature-to-losant-using-mongoose-os
codeUrl: https://github.com/UtkarshVerma/esp-temp
star: 6
lastUpdated: '2018-08-12'
rtos: mongoose-os
topics:
- esp32
- esp8266
- hacktoberfest
- losant
- mongoose-os
- mongoose-os-app
- mqtt
- temperature-sensor
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- losant-temperature-sensor-for-mongoose-os
- mongoose-os-mlx90614-ir-temperature-monitor
- mongoose-os-esp8266-pir-monitor
- losant-mqtt-mongoose-os-example
- coffee-bin-mqtt
- mongoose-os-environment-logger
---

## Overview

This project provides a streamlined solution for monitoring ambient temperature using the internal sensors of ESP32 and ESP8266 microcontrollers. By leveraging Mongoose OS, the application efficiently collects temperature data and transmits it to the Losant IoT platform via MQTT. It is designed for low-power operation, utilizing deep sleep modes to extend battery life while maintaining periodic data reporting.

## Key Features

The application includes several integrated features designed for practical deployment and ease of use:

- **Deep Sleep Integration**: To conserve power, the device enters deep sleep between readings. The sleep interval is configurable via the `minToSleep` variable, which defaults to 20 minutes.
- **OTA Mode**: Because deep sleep can make it difficult to push updates or access the console, the project implements a specialized "OTA Mode." By pressing the Flash or Boot button immediately after startup, users can disable deep sleep for one boot cycle, allowing for over-the-air updates and configuration changes.
- **Temperature Calibration**: Since the app relies on internal MCU sensors, readings can be affected by internal chip heat. The `tempOffset` feature allows users to subtract a specific value (defaulting to 17) to better approximate the actual ambient temperature.
- **Flexible Units**: Users can toggle between Celsius and Fahrenheit by adjusting the `enableConv` setting within the application code.

## Technical Implementation

The project is built on Mongoose OS, utilizing its native MQTT stack and configuration schema. The `mos.yml` file defines the hardware abstraction layer, mapping LED and button pins for both ESP32 and ESP8266 platforms automatically. 

Communication with Losant is handled over MQTT, with the broker set to `broker.losant.com:8883`. The application expects a specific device attribute named `temp` (Data Type: Number) to be configured in the Losant dashboard to receive and visualize the incoming data.

## Hardware Support

The project is tested and compatible with:
- **ESP32**: Utilizing pin 21 for the status LED and pin 0 for the boot button.
- **ESP8266**: Utilizing pin 2 for the status LED and pin 0 for the boot button.

## Getting Started

To deploy the firmware, users require the `mos` tool. The workflow involves building the firmware for the specific architecture (esp32 or esp8266), flashing the device, and configuring WiFi credentials. Once the hardware is prepared, the MQTT connection is established by setting the Losant Device ID, Access Key, and Access Secret through the Mongoose OS configuration tool. 

Once configured, the device will automatically wake up, read the internal sensor, apply the defined offset, publish the data to Losant, and return to deep sleep.
