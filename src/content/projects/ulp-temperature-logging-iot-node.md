---
title: ULP Temperature Logging IoT Node
summary: An ultra-low power temperature logging IoT node based on the ESP8266 microcontroller.
  It leverages deep sleep, edge computing, and static IP configurations to minimize
  power consumption while logging data to LittleFS and transmitting hourly statistics
  via MQTT.
slug: ulp-temperature-logging-iot-node
codeUrl: https://github.com/Rad-hi/ULP_Temp_logger
star: 17
lastUpdated: '2021-05-06'
rtos: ''
libraries:
- littlefs
topics:
- esp8266
- esp8266-projects
- json
- littlefs
- mqtt
- temperature-logger
- ulp
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- losant-temperature-sensor-for-mongoose-os
- mongoose-os-esp8266-pir-monitor
- esp-temperature-to-losant-using-mongoose-os
- mongoose-os-environment-logger
- coffee-bin-mqtt
- esp8266-mlx90614-temperature-monitor
---

# Ultra-Low Power Temperature Logging with ESP8266

The ULP Temperature Logger is a specialized IoT node designed for extreme energy efficiency using the ESP8266 microcontroller. While many ESP8266 projects struggle with power consumption due to the overhead of development boards, this project focuses on a bare-bones implementation to achieve the 20uA deep sleep current promised by the manufacturer.

## The Power Efficiency Challenge

Achieving true ultra-low power (ULP) performance on the ESP8266 requires more than just calling a sleep function. This project implements several hardware and software strategies to maximize battery life:

- **Bare-bones Hardware**: By avoiding standard development boards, the project eliminates "parasitic" power consumption from onboard LEDs, voltage regulators, and USB-to-serial converters.
- **Deep Sleep Optimization**: The node spends the vast majority of its time in a 20uA deep sleep state.
- **Smart WiFi Management**: The ESP8266 is configured to wake up with the WiFi radio OFF. The radio is only enabled when data needs to be transmitted, which happens once every 24 hours.
- **Static IP Configuration**: By using a static IP, the node avoids the time and energy required for a DHCP handshake, significantly reducing the active WiFi time.

## Edge Computing and Data Processing

The core philosophy of the project is "edge computing" for power savings. Instead of transmitting every reading over power-hungry WiFi, the node wakes up every minute, performs a quick sensor read, and logs the data locally. 

To provide meaningful data without excessive storage or transmission costs, the system processes raw readings into hourly summaries. For every hour of operation, the node calculates the maximum, minimum, and mean temperature values. By only transmitting these statistics once per day, the system reduces its total WiFi "on-time" to just 6-8 seconds per day.

## Storage and Connectivity

Data is stored using the **LittleFS** file system on the ESP8266's internal flash memory. To maintain state and track time across deep sleep cycles without a dedicated external Real-Time Clock (RTC) chip, the project utilizes the ESP8266's internal RTC memory. While not perfectly accurate over long periods, it is sufficient for temperature logging intervals.

The final data is formatted as a structured JSON object containing 24 sets of hourly statistics. This data is published via MQTT, making it compatible with various IoT platforms and visualization tools. The project also includes a companion desktop application written in Python to download, visualize, and format the data into CSV files.

## Performance Statistics

The efficiency of this approach is backed by real-world measurements:

- **Deep sleep current**: ~20uA
- **Logging wake-up time**: ~60ms (Average current ~40mA)
- **Transmission wake-up**: ~7.5 seconds (Average current ~80mA)
- **Total daily active time**: ~1 minute 34 seconds

This project serves as an excellent reference for developers looking to build long-term battery-powered IoT sensors that require local data persistence and efficient network utilization.
