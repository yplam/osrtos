---
title: IoT Agricultural Data Monitoring System
summary: An IoT-based monitoring system for agricultural fields using an ESP8266 or
  ESP32 microcontroller. It collects temperature, humidity, soil moisture, and rainfall
  data, serving a dynamic web interface hosted directly on the device's flash memory
  via SPIFFS.
slug: iot-agricultural-data-monitoring-system
codeUrl: https://github.com/Ariful17/IoT-Project-on-Agricultural-Data-Monitoring
star: 1
lastUpdated: '2022-10-16'
rtos: ''
libraries:
- spiffs
topics:
- agriculture
- esp32
- esp8266
- iot
- spiffs
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- espmonitor-iot-environmental-monitoring-system
- smart-farming-iot-system
- smart-plant-monitoring-system
- espmonitor-iot-environment-monitoring-system
- esp8266-dht22-spiffs-web-server
- iot-industrial-operation-and-room-condition-monitor
---

## Overview

The IoT Agricultural Data Monitoring project is a specialized firmware solution designed for real-time environmental tracking in farming environments. Built primarily for the ESP8266 (NodeMCU) and compatible with ESP32, the system serves as a standalone field device that monitors critical agricultural metrics and provides a dynamic, auto-refreshing web interface for users to visualize data over a local network or the internet.

By integrating multiple sensors and leveraging on-device storage, the project eliminates the need for external cloud services for basic data visualization, making it an efficient solution for localized smart farming applications.

## Hardware and Sensor Integration

The system utilizes a variety of sensors to capture a comprehensive picture of field conditions:

- **DHT11 Sensor**: Measures ambient temperature and humidity.
- **Soil Moisture Sensor**: Monitors the water content in the soil to assist in irrigation management.
- **Capacitive Rain Sensor**: Detects precipitation levels and raining conditions.
- **ADS1115 ADC**: Since the ESP8266 has limited analog-to-digital converter (ADC) capabilities, the project employs the Adafruit ADS1115 16-bit ADC. This allows for high-precision readings from multiple analog sensors (moisture and rain) via the I2C protocol.

## Technical Architecture

The firmware is built on the Arduino framework and utilizes an asynchronous architecture to ensure the web server remains responsive while the device continues to sample sensor data. 

### Web Server and SPIFFS

A key feature of this project is the use of the **SPIFFS (Serial Peripheral Interface Flash File System)** protocol. The 4MB flash memory of the ESP8266 is partitioned to store `webpage.html` directly on the device. When a user accesses the device's IP address, the `ESPAsyncWebServer` serves this file from the internal file system.

### Real-Time Data Visualization

The frontend interface is built using **Highcharts.js**, a powerful JavaScript library for creating interactive charts. The HTML file stored in SPIFFS contains scripts that perform asynchronous HTTP GET requests to specific API endpoints on the ESP8266:

- `/temperature`
- `/humidity`
- `/moisture`
- `/rain`

These requests are handled by the `ESPAsyncWebServer` in the firmware, which returns the latest sensor values as plain text. The charts then update dynamically every second without requiring a full page reload.

## Firmware Implementation

The core logic is contained within `Nodemcu_field_device.ino`. The setup routine initializes the sensors, mounts the SPIFFS file system, and configures the WiFi connection. Notably, the project supports fixed IP configuration, which is essential for reliable access to the web interface in a local network environment.

```cpp
// Route for root / web page
server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send(SPIFFS, "/webpage.html");
});

// Endpoint for temperature data
server.on("/temperature", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send_P(200, "text/plain", readtemperature().c_str());
});
```

The main loop handles the periodic reading of sensors, storing values in global variables that the server can access whenever a web client requests an update. This separation of concerns between data acquisition and data serving ensures system stability.

## Getting Started

To deploy this system, users need to upload the firmware to their NodeMCU or ESP32 and use a SPIFFS upload tool to place the `webpage.html` file into the device's flash memory. Once connected to the local WiFi, the device prints its IP address to the Serial Monitor. Navigating to this IP in any web browser opens the dashboard, displaying live graphs of the field's environmental status.
