---
title: MQ135 Air Quality Sensor
summary: A firmware project for monitoring air quality and CO2 levels using the MQ135
  gas sensor with Arduino-compatible microcontrollers. It features a specialized calibration
  workflow and supports data output via OLED displays, ThingSpeak, and Home Assistant
  via MQTT.
slug: mq135-air-quality-sensor
codeUrl: https://github.com/Bobbo117/MQ135-Air-Quality-Sensor
siteUrl: http://davidegironi.blogspot.com/2014/01/cheap-co2-meter-using-mq135-sensor-with.html
star: 20
lastUpdated: '2024-08-29'
rtos: ''
topics:
- aduino
- air-quality-sensor
- arduino-air-quality-sensor
- co2-detector
- co2-sensor
- esp32
- esp8266
- flying-fish
- home-assistant
- mq135
- mq135-calibration
- mq135-co2-calibration
- mq135-sensor
- thingspeak
- vhotsmcomp
isShow: true
image: /202602/mq135.webp
createdAt: '2026-02-11'
updatedAt: '2026-02-11'
relatedProjects:
- air-quality-monitor
- project-aura
- q-sensor-multi-functional-zigbee-air-quality-sensor
- sgp30-gas-sensor-library-for-mongoose-os
- esphome-ikea-vindriktning
- ccs811-digital-gas-sensor-driver-for-rt-thread
---

## Overview

The MQ135 Air Quality Sensor project is a specialized firmware implementation designed to transform a standard MQ135 gas sensor into a functional CO2 and air quality monitor. By leveraging Arduino-compatible controllers such as the ESP8266 or ESP32, the project provides a bridge between raw analog sensor data and modern IoT platforms. 

The MQ135 sensor is known for its sensitivity to various gases, including ammonia, nitrogen oxides, alcohol, aromatic compounds, sulfide, and smoke. However, in a typical home environment where these gases are absent, the sensor's resistance changes can be effectively mapped to CO2 concentrations. This project focuses on the calibration and software logic required to make these readings useful for everyday monitoring.

## Hardware Architecture

The system is designed to be flexible, supporting various microcontrollers. While the implementation often utilizes the Lolin D1 Mini (ESP8266), the code is adaptable to ESP32 and standard Arduino boards. 

Key hardware considerations include:
- **Voltage Regulation**: Since the MQ135 operates at 5V and outputs an analog signal up to 5V, a voltage divider (typically 170k and 330k ohms) is required when interfacing with 3.3V logic controllers like the ESP8266 to prevent pin damage.
- **Sensor Structure**: The MQ135 board includes a heater coil, a load resistor (RL), and a potentiometer for digital threshold triggering.
- **Display**: An I2C OLED display provides real-time local feedback of PPM levels and calibration data.

## Calibration and Operation

One of the most critical aspects of using MQ-series sensors is calibration. The MQ135's resistance (Rs) changes based on gas concentration, but each individual sensor has a unique baseline resistance (R0) in clean air. 

The project outlines a specific calibration workflow:
1. **Burn-in Period**: The sensor must be powered for 48 hours before first use to stabilize the chemical element.
2. **Outdoor Calibration**: The unit is placed outdoors in clean air (approx. 400-420 ppm CO2) to determine the R0 value.
3. **Software Configuration**: Users must measure their specific board's load resistor (RL) and update the firmware definitions before compiling.

## Integration and Data Visualization

The project excels in its variety of output options, allowing users to choose the level of complexity for their monitoring setup:
- **Local Monitoring**: Real-time data is sent to the Arduino IDE Serial Monitor and the attached OLED display.
- **Cloud Logging**: Integration with ThingSpeak allows for long-term data trending and remote access.
- **Smart Home Integration**: By using MQTT, the sensor can be integrated into Home Assistant. This enables advanced automation, such as triggering ventilation fans or air purifiers when CO2 levels exceed a certain threshold.

## Technical Observations

The implementation notes that while the MQ135 is effective for tracking trends, its accuracy can be influenced by environmental factors. For instance, high levels of PM2.5 particles (such as from wildfires) can dominate the sensor's response, masking CO2 fluctuations. The project emphasizes that while these sensors may not match the precision of laboratory equipment, they are highly effective for identifying air quality trends and "spikes" caused by human activity, such as cooking or occupying a closed room.
