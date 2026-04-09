---
title: 'Q_sensor: Multi-functional Zigbee Air Quality Sensor'
summary: An ESP32-C6 based environmental monitor that tracks CO2, VOCs, temperature,
  and more using the Zigbee protocol. Built on the ESP-IDF framework with FreeRTOS,
  it features seamless integration with Zigbee2MQTT and supports OTA updates.
slug: q-sensor-multi-functional-zigbee-air-quality-sensor
codeUrl: https://github.com/xyzroe/Q_sensor
version: '24'
lastUpdated: '2025-07-22'
licenses:
- NOASSERTION
rtos: freertos
libraries:
- lwip
topics:
- ags10
- aht20
- bh1750
- bmp280
- c6
- co2
- esp-idf
- esp32-c6
- qmi8658c
- scd40
- zigbee
- zigbee-ota
- zigbee2mqtt
isShow: false
createdAt: '2026-04-08T23:41:30+00:00'
updatedAt: '2026-04-08T23:41:30+00:00'
---

## Overview

Maintaining a healthy indoor environment requires more than just checking the temperature. The **Q_sensor** is a sophisticated, multi-functional air quality monitoring station designed to provide a comprehensive view of your surroundings. Built on the modern ESP32-C6 RISC-V microcontroller, this project leverages the Zigbee protocol to integrate seamlessly into smart home ecosystems, offering a robust alternative to standard Wi-Fi or Bluetooth sensors.

At its core, Q_sensor is a data-gathering powerhouse. It combines seven distinct sensing technologies to monitor everything from invisible gases to physical motion, making it an ideal hub for home automation and health monitoring.

## A Comprehensive Sensor Suite

The Q_sensor project stands out due to its dense integration of high-quality environmental sensors. Rather than relying on a single multi-sensor chip, it utilizes dedicated components for each metric to ensure accuracy and reliability:

*   **CO2 Monitoring (SCD40):** A high-performance photoacoustic sensor that provides precise carbon dioxide readings.
*   **VOC Index (AGS10):** Measures Volatile Organic Compounds, essential for detecting off-gassing from furniture or cleaning products.
*   **Atmospheric Pressure (BMP280):** Tracks barometric pressure, which is also used to calibrate the SCD40 for more accurate CO2 readings.
*   **Climate (AHT20):** Provides dedicated temperature and humidity data.
*   **Light Intensity (BH1750):** An ambient light sensor for monitoring room brightness.
*   **Motion & Orientation (QMI8658C):** A 6-axis attitude gyro sensor that can detect movement or the device's physical orientation.
*   **Presence Detection (BS5820):** A 5.8G radar sensor that provides binary occupancy detection, which is significantly more sensitive than traditional PIR sensors.

## Technical Architecture

The firmware is developed using the **Espressif IoT Development Framework (ESP-IDF)**, specifically targeting version 5.3.1. By utilizing the **FreeRTOS** kernel, the system manages multiple concurrent tasks, such as polling the I2C sensor bus every 10 seconds, maintaining the Zigbee network stack, and handling user interactions via the onboard button and LED.

One of the more elegant technical implementations in Q_sensor is the cross-sensor communication. For instance, the SCD40 CO2 sensor receives real-time pressure data from the BMP280. Since CO2 measurement is sensitive to atmospheric pressure, this internal compensation loop ensures that the data reported over Zigbee is as accurate as possible regardless of your altitude or local weather conditions.

## Connectivity and Ecosystem

Q_sensor is designed with the Zigbee protocol at its heart, utilizing the `esp-zigbee-lib` and `esp-zboss-lib` components. This allows it to operate as a low-power mesh device within a smart home network. It is fully compatible with **Zigbee2MQTT**, and the repository includes a custom external converter (`q.js`) to ensure all sensor values are correctly mapped and exposed to Home Assistant or other MQTT-based platforms.

Key features of the Zigbee implementation include:
*   **Standard Clusters:** Most values use standard Zigbee clusters, ensuring broad compatibility with various gateways.
*   **Configurable Reporting:** Users can fine-tune how often data is sent to the coordinator to balance network traffic and data resolution.
*   **Over-the-Air (OTA) Updates:** The firmware supports remote updates, allowing for feature enhancements or bug fixes without needing to plug the device into a computer.

## Hardware and GPIO Configuration

The project is optimized for the ESP32-C6, taking advantage of its native Zigbee and Thread support. The hardware layout utilizes a standard I2C bus for the majority of the sensors (SDA on IO6, SCL on IO7), while specialized pins handle the radar input and ADC monitoring for voltage levels. 

Whether you are looking to build a custom air quality monitor for your office or a high-sensitivity presence detector for your smart home, Q_sensor provides a professional-grade foundation using the latest in ESP32 hardware and Zigbee communication.
