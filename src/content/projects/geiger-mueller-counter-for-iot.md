---
title: Geiger Mueller Counter for IoT
summary: An IoT-enabled Geiger counter based on the ESP8266 microcontroller and SBM-20
  tubes. It features a built-in web server for real-time monitoring, data logging
  to SPIFFS for long-term radiation tracking, and a custom high-voltage booster circuit.
slug: geiger-mueller-counter-for-iot
codeUrl: https://github.com/mkgeiger/geiger-counter-iot
star: 7
version: v1.4
lastUpdated: '2019-03-18'
rtos: ''
libraries:
- spiffs
topics:
- arduino
- booster
- buzzer
- cpm
- esp32
- esp8266
- geiger-counter
- geiger-muller
- high-voltage
- http-server
- iot
- ntp-client
- sbm-20
- spiffs
- wifi
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- iot-esp8266-serial-forwarder
- zigbee-gas-counter
- esp8266-web-server-and-spiffs-integration
- iot-industrial-operation-and-room-condition-monitor
- nmea0183-wifi-marine-data-gateway
- esp-datalogger-with-firebase-and-spiffs
---

## Overview

The Geiger Mueller Counter for IoT is a modern take on radiation monitoring, repurposing vintage SBM-20u tubes into a connected device. Built around the NodeMCU ESP8266-12E, this project bridges the gap between classic analog sensing and modern data logging. It is designed to function both as a portable device for spot-checking materials and as a stationary station for long-term environmental monitoring.

## Hardware Architecture

The heart of the system is the ESP8266, chosen for its integrated WiFi capabilities and sufficient flash memory for local data storage. Because Geiger tubes require high voltage to operate, the project includes a custom-designed high-voltage booster circuit that steps up 3.3V to a regulated 400V. This booster uses a CMOS oscillator and a series of Zener diodes to maintain a stable supply for the SBM-20 tubes.

**Key hardware components include:**
- **SBM-20 Tubes**: Sensitive to beta and gamma radiation.
- **NodeMCU ESP8266**: Manages pulse counting, networking, and the web interface.
- **High Voltage Booster**: A custom circuit providing the necessary 400V anode voltage.
- **Piezo Buzzer**: Provides audible feedback for radiation hits, which can be toggled via a physical mode switch.

## Software and Connectivity

The firmware is developed using the Arduino framework. It leverages the WiFiManager library to allow users to configure network credentials without hardcoding them into the source. Once connected, the device synchronizes its internal clock via NTP every 10 minutes to ensure accurate timestamps for data logging.

### Web Interface and Data Management

The device hosts a local HTTP server (accessible via `geigercounter.local`) that provides a real-time dashboard. This interface displays:
- Current ionizing radiation dose and hit counts.
- A graphical gauge showing the dose over the last minute.
- A historical diagram of CPM (counts per minute) and dose values for the last hour.
- Filesystem status and data download links.

For long-term tracking, the system utilizes the SPIFFS (Serial Peripheral Interface Flash File System) to store median values every 10 minutes. This efficient logging strategy allows the device to store up to two years of continuous data locally. Log files are formatted for easy import into spreadsheet software like LibreOffice Calc.

## Technical Implementation

The project handles radiation math by applying a conversion factor specific to the SBM-20 tube (approximately 0.00277 μS/h per cpm). The firmware is optimized for low power consumption, allowing it to be powered by a standard mobile phone charger or a USB power bank for portable use. 

To ensure high-resolution measurements, the system supports multiple GM tubes in parallel. By adapting the `SBM20_FACTOR` and `NBR_GMTUBES` macros in the source code, users can scale the sensitivity of the device to meet specific measurement requirements.
