---
title: Energy Consumption Monitor
summary: A Mongoose OS application designed to monitor household energy consumption
  by counting pulses from an energy meter's LED. It leverages a hybrid C and JavaScript
  architecture to provide real-time tracking on ESP8266 or ESP32 hardware.
codeUrl: https://github.com/infrat/energymon-js
isShow: false
rtos: mongoose-os
libraries: []
topics:
- c
- esp8266
- javascript
- mongoose-os
star: 0
lastUpdated: '2017-12-31'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- energy-consumption-monitor-energymon-c
- hlw8012-and-bl0937-energy-meter-library-for-mongoose-os
- zigbee-gas-counter
- energyme-home
- mongoose-os-esp8266-pir-monitor
- coffee-bin-mqtt
---

Monitoring household energy consumption is a popular entry point for home automation enthusiasts. The **Energy Consumption Monitor** (energymon-js) project offers a streamlined solution for this task by focusing on a simple yet effective method: counting the pulses emitted by a standard energy meter's LED.

Most modern digital energy meters feature a calibration LED that flashes at a specific rate (e.g., 1000 pulses per kWh). By placing a light sensor over this LED, this project can accurately calculate real-time power usage and cumulative energy consumption without requiring invasive electrical work.

### Technical Architecture

The project is built on **Mongoose OS**, an IoT firmware development framework that excels at rapid prototyping and reliable deployment. It utilizes a hybrid programming model:

*   **C Backend**: The core logic for handling high-frequency tasks, such as GPIO interrupts for pulse detection, is typically handled in C (`src/main.c`) to ensure no pulses are missed due to timing jitters.
*   **JavaScript Frontend**: The application logic and high-level configuration are managed via `fs/init.js`. Mongoose OS's mJS engine allows developers to write business logic in JavaScript, making it easier to handle data formatting and cloud integration.
*   **Web Interface**: The inclusion of `fs/index.html` suggests a built-in web server capability, allowing users to view their energy data directly from a browser connected to the device's IP address.

### Key Features

*   **Pulse Counting**: Accurately tracks energy usage by monitoring LED flashes.
*   **Cross-Platform**: Designed to run on popular low-cost microcontrollers like the ESP8266 and ESP32.
*   **Mongoose OS Integration**: Benefits from the robust ecosystem of Mongoose OS, including easy Wi-Fi configuration and over-the-air (OTA) updates.
*   **Simple Configuration**: The `mos.yml` file defines the project structure and dependencies, making it easy to build and flash using the `mos` toolchain.

### Getting Started

To use this project, you will need a Mongoose OS development environment set up. The general workflow involves:

1.  Cloning the repository.
2.  Connecting your ESP8266 or ESP32.
3.  Running `mos build` and `mos flash` to deploy the firmware.
4.  Wiring a phototransistor or light sensor to the designated GPIO pin to start capturing pulses.

This project serves as an excellent template for anyone looking to build a custom energy monitoring dashboard or integrate power usage data into a larger smart home ecosystem.
