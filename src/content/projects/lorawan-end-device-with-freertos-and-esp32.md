---
title: LoRaWAN End-Device with FreeRTOS and ESP32
summary: A LoRaWAN end-device implementation for ESP32 and SX1276 using FreeRTOS.
  It collects environmental data from a BMP180 sensor and battery status, transmitting
  the information to the ATC public network every 30 minutes.
slug: lorawan-end-device-with-freertos-and-esp32
codeUrl: https://github.com/phfbertoleti/lorawan_freertos_esp32
star: 19
lastUpdated: '2020-07-11'
rtos: freertos
topics:
- bmp180
- esp32
- freertos
- lorawan
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- esp32-ruuvitag-collector
- mongoose-os-environment-logger
- bresserweathersensorlw
- tempo-iot-edge-device
- mqtt-demo-for-stm32-iot-discovery-board-with-thingsboard
- ikea-vindriktning-air-quality-sensor-for-apache-nuttx
---

## Overview

This project provides a complete implementation of a LoRaWAN end-device using the ESP32 SoC and the SX1276 LoRa radio. Specifically designed for the Heltec WiFi LoRa v1 development board, the firmware is configured to connect to the American Tower Corporation (ATC) public LoRaWAN network using Activation by Personalization (ABP). 

The system leverages FreeRTOS to manage multiple concurrent tasks, including sensor data acquisition, battery management, and network communication. It serves as a practical template for developers looking to deploy IoT nodes that require long-range connectivity and low-power management.

## Hardware and Sensing

The project is built around the Heltec WiFi LoRa v1 board, which integrates an ESP32 and an SX1276 radio. For environmental monitoring, it utilizes the BMP180 sensor to measure barometric pressure (hPa) and ambient temperature (°C). 

In addition to environmental data, the firmware monitors its own power source. It reads the battery voltage and calculates the remaining charge percentage. A critical hardware detail noted in the project is the use of a voltage divider (470k / 100k resistors) on GPIO37 (ADC1_1) to ensure the battery voltage (up to 4.2V) is scaled down to the 1.1V limit supported by the ESP32's ADC.

## Software Architecture

The firmware is developed within the Arduino IDE but utilizes FreeRTOS for its underlying task scheduling. This allows the application to maintain a responsive user interface on the integrated 128x64 OLED display while handling the timing-sensitive LoRaWAN stack in the background.

Key features of the software implementation include:
- **Periodic Transmission**: Data is sent to the LoRaWAN gateway every 30 minutes.
- **LoRaWAN Stack**: It utilizes the MCCI LoRaWAN LMIC Library (tested with version 2.3.2).
- **Local Visualization**: Real-time measurements are displayed on the onboard OLED screen.
- **Reliability**: The project incorporates watchdog routines to ensure system stability in remote deployments.

## Configuration and Deployment

To deploy this project, users must configure the LMIC library for the correct region and radio hardware. The project is pre-configured for the AU921 frequency band, which is common in regions like Brazil for the ATC network. Users must also provide their own Network Session Key, Application Session Key, and Device Address within the `LORAWAN_defs.h` file.

### LMIC Configuration

The `lmic_project_config.h` file within the LMIC library must be modified to match the following settings:

```c
#define CFG_au921 1
#define CFG_sx1276_radio 1
```

This ensures the stack uses the correct frequency plan and radio driver for the Heltec board's hardware configuration.
