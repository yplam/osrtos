---
title: ESPHome IKEA VINDRIKTNING
summary: A project providing ESPHome configurations and wiring guides to integrate
  the IKEA VINDRIKTNING air quality sensor into smart home ecosystems. It supports
  ESP32 and ESP8266 platforms, offering features like MQTT connectivity, Home Assistant
  autodiscovery, and a local web interface for real-time PM2.5 monitoring.
slug: esphome-ikea-vindriktning
codeUrl: https://github.com/DzurisHome/ESPHome-IKEA-VINDRIKTNING
star: 88
lastUpdated: '2026-02-07'
rtos: freertos
topics:
- diy
- dzurishome
- esphome
- esphome-config
- hass
- homeassistant
- ikea
- mqtt
- particulate-matter
- pm25
- smart-home
- smarthome
- vindriktning
isShow: false
createdAt: '2026-02-16'
updatedAt: '2026-02-16'
relatedProjects:
- project-aura
- smart-iot-sensor-with-xiao-esp32c6
- ikea-vindriktning-air-quality-sensor-for-apache-nuttx
- engineering-diy-esp32-sensors-cameras-for-home-assistant
- mq135-air-quality-sensor
- q-sensor-multi-functional-zigbee-air-quality-sensor
---

The IKEA VINDRIKTNING is a popular, affordable air quality sensor designed to measure PM2.5 particulate matter. While functional as a standalone device with its built-in LED indicator, it lacks connectivity out of the box. This project bridges that gap by using ESPHome to transform the VINDRIKTNING into a fully integrated smart home component.

By adding an ESP32 or ESP8266 microcontroller, users can extract data from the internal sensor and broadcast it over a network. The project supports a variety of small-form-factor boards, including the XIAO ESP32-C3, Wemos D1 Mini, and the ESP32 C3 Super Mini, making it easy to fit the electronics inside the original IKEA housing without significant modifications.

## Key Features and Integrations

The primary advantage of this modification is the seamless integration with Home Assistant. Using ESPHome's native API or MQTT, the sensor data becomes available for automations, long-term statistics, and dashboard visualization. 

- **Local Control:** Data is processed locally on the device without reliance on external cloud services.
- **Home Assistant Autodiscovery:** Once flashed and connected to the network, the device is automatically recognized by Home Assistant.
- **Web Server:** A built-in web interface allows users to check air quality levels directly via a browser.
- **OTA Updates:** Future configuration changes or firmware updates can be pushed over-the-air, eliminating the need to disassemble the unit once it is installed.

## Technical Implementation

The project utilizes the UART interface of the VINDRIKTNING's internal sensor. The ESP board intercepts the serial data sent to the original controller. The provided YAML configurations handle the communication required to parse the PM2.5 values and present them as standard sensor entities.

For users choosing single-core chips like the ESP32-C3, the project provides specific guidance on managing BLE (Bluetooth Low Energy) trackers. Because BLE scanning can be resource-intensive on single-core hardware, specific configuration tweaks are recommended to ensure system stability and reliable sensor reporting.

## Hardware and Wiring

The modification requires basic soldering skills to connect the ESP board to the VINDRIKTNING PCB. The project documentation provides detailed pinout tables for several popular microcontrollers, ensuring that users can correctly map the 5V power, Ground, and the REST/FAN pins to the appropriate GPIOs on their chosen board.

## Air Quality Visualization

The project maintains the original color-coding logic of the IKEA device within the digital interface, allowing for a consistent experience between the physical hardware and the digital dashboard:

- **Green:** 0-35 μg/m³ (Good air quality)
- **Orange:** 36-85 μg/m³ (Fair air quality)
- **Red:** 86+ μg/m³ (Poor air quality)

By digitizing these thresholds, users can trigger smart home actions, such as turning on an air purifier when the status changes from green to orange, or sending a notification if levels reach the red zone.
