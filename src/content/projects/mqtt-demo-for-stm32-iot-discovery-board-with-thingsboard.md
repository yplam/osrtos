---
title: MQTT Demo for STM32 IoT Discovery Board with Thingsboard
summary: An Mbed OS application for the STM32 B-L475E-IOT01A Discovery Board that
  transmits environmental data to the Thingsboard IoT platform. It integrates the
  HTS221 temperature and humidity sensor with the ISM43362 WiFi module using the MQTT
  protocol.
slug: mqtt-demo-for-stm32-iot-discovery-board-with-thingsboard
codeUrl: https://github.com/priyablue/MQTT-demo-MBED-DISCO_L475VG_IOT01A
star: 1
lastUpdated: '2020-05-30'
rtos: mbed-os
libraries:
- lwip
- littlefs
topics:
- discol475vgiot01a
- humidity-sensor
- iot
- mbed-os
- mqtt
- stm32f4-discovery
- temperature-sensor
- thingsboard
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- mbed-os-treasure-data-example
- aws-iot-with-the-l475vg-iot01a-on-mbed-os
- mongoose-os-environment-logger
- mongoose-os-environmental-sensors-application
- mbed-to-azure-iot-hub
- mbed-os-6-stm32-iot-ethernet-controller
---

## Overview

This project provides a practical implementation of an IoT node using the STM32 B-L475E-IOT01A Discovery Board. By leveraging Mbed OS, the application connects to the Thingsboard IoT platform to visualize real-time environmental data. The demo specifically focuses on capturing temperature and humidity readings from the onboard HTS221 sensor and transmitting them over a WiFi connection using the MQTT protocol.

## Hardware and Connectivity

The project is tailored for the STM32 IoT Discovery Board (DISCO_L475VG_IOT01A), which is a feature-rich platform designed for cloud connectivity. Key hardware components utilized in this demo include:

- **STM32L475VG MCU**: An ultra-low-power ARM Cortex-M4 microcontroller.
- **ISM43362 WiFi Module**: Provides the network interface for cloud communication via the Inventek Systems module.
- **HTS221 Sensor**: A capacitive digital sensor for relative humidity and temperature.

While the project defaults to the ISM43362 WiFi driver, the use of Mbed OS's Network Socket API (NSAPI) ensures that the application logic remains compatible with other connectivity options. By swapping the network driver and updating the `mbed_app.json` configuration, the project can be adapted for Ethernet, Cellular, or other WiFi shields.

## Technical Architecture

The software is built on Mbed OS, utilizing its RTOS capabilities and networking stack. The communication flow follows a standard IoT pattern:

1.  **Network Initialization**: The ISM43362 driver establishes a connection to the local WiFi access point using credentials defined in the application configuration.
2.  **MQTT Client Setup**: The application initializes an MQTT client configured to communicate with the Thingsboard demo broker (`demo.thingsboard.io`).
3.  **Data Acquisition**: The HTS221 sensor is polled for environmental data using the I2C interface.
4.  **Cloud Publishing**: Data is formatted into a JSON payload and published to the platform using a device-specific access token for authentication.

## Configuration and Setup

The project uses `mbed_app.json` for centralized configuration. This file is crucial as it defines the WiFi SSID, password, and the Thingsboard API key (access token). 

```json
{
    "config": {
        "wifi-ssid": {
            "help": "WiFi SSID",
            "value": "\"Your_SSID\""
        },
        "wifi-password": {
            "help": "WiFi Password",
            "value": "\"Your_Password\""
        },
        "api-key":{
            "help":  "access token",
            "value": "\"Your_Thingsboard_Token\""
        }
    }
}
```

The `mbed_config.h` file, which is automatically generated during the build process, further defines system-level parameters such as clock sources and library-specific settings for lwIP and the LittleFS filesystem.

## Getting Started

To deploy this demo, users need an account on `demo.thingsboard.io` to generate a device access token. Once the credentials are configured in `mbed_app.json`, the project can be compiled using the Mbed Online Compiler or the Mbed CLI. The application provides a straightforward path for developers to transition from a local sensor reading to a cloud-connected IoT solution, demonstrating the ease of integrating STMicroelectronics hardware with modern IoT platforms.
