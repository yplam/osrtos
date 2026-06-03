---
title: Mongoose OS Environmental Sensors Application
summary: An IoT application for the ESP32 platform that integrates Bosch BME680 and
  Sensirion SGP30 sensors to deliver environmental data to AWS IoT Core. It utilizes
  Mongoose OS for hardware abstraction, cloud connectivity, and device management.
slug: mongoose-os-environmental-sensors-application
codeUrl: https://github.com/wolfeidau/mgos-envsensors
star: 0
lastUpdated: '2018-03-27'
rtos: mongoose-os
topics:
- aws-iot
- bme680
- iot
- mongoose-os
- sgp30
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mongoose-os-environment-logger
- swarmsense-iot-platform-with-mongoose-os
- losant-mqtt-example-for-mongoose-os
- mongoose-os-aws-iot-uart-and-thing-shadow-example
- mqtt-demo-for-stm32-iot-discovery-board-with-thingsboard
- sgp30-gas-sensor-library-for-mongoose-os
---

## Overview

This project provides a reference implementation for an environmental monitoring IoT node using Mongoose OS. Designed to run on the ESP32 platform, the application integrates two sophisticated sensors—the Bosch BME680 and the Sensirion SGP30—to capture a wide range of atmospheric and air quality data. The collected telemetry is then securely transmitted to AWS IoT Core, leveraging the built-in cloud integration features of Mongoose OS.

## Hardware and Sensors

The application is built around the ESP32 microcontroller and utilizes I2C for sensor communication. The primary sensing components include:

- **Bosch BME680**: A 4-in-1 environmental sensor that measures gas (VOCs), atmospheric pressure, ambient humidity, and temperature.
- **Sensirion SGP30**: A multi-pixel gas sensor designed for indoor air quality monitoring, providing signals for Total Volatile Organic Compounds (TVOC) and CO2 equivalent (eCO2).

The project configuration defines specific GPIO pins for the I2C bus (SDA on GPIO 18 and SCL on GPIO 19) and sets the default I2C address for the BME680 to 0x77, which is common for many breakout boards.

## Cloud Integration and Features

A core strength of this project is its deep integration with the AWS IoT ecosystem. By utilizing Mongoose OS libraries, the application supports several advanced IoT features out of the box:

- **AWS IoT Core**: Reliable and secure MQTT-based data delivery.
- **Device Shadow**: Synchronization of device state using the `ota-shadow` and `shadow` libraries, allowing for remote monitoring and control.
- **OTA Updates**: Support for over-the-air firmware updates to ensure the device remains secure and up-to-date.
- **RPC Services**: Remote Procedure Call services for file system management and configuration over UART or network.

## Technical Implementation

The project is managed via a `mos.yml` configuration file, which defines the build environment and dependencies. It pulls in specialized drivers for the SGP30 and BME680 sensors, as well as standard Mongoose OS libraries for WiFi, SNTP time synchronization, and I2C communication. 

For developers looking to extend the project, the inclusion of the `mjs` library suggests support for JavaScript-based application logic alongside traditional C sources. The build process is streamlined through the `mos` toolchain, with a provided Makefile that simplifies common tasks such as building the firmware, flashing the device, and monitoring the serial console.
