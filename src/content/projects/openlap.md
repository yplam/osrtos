---
title: OpenLap
summary: A single-pilot FPV laptimer based on the ESP32 microcontroller and the RX5808
  video receiver. It features a web-based interface for race management, real-time
  RSSI calibration, and integrated battery monitoring using the Arduino framework.
slug: openlap
codeUrl: https://github.com/dot1nt/OpenLap
star: 13
lastUpdated: '2025-05-08'
rtos: freertos
libraries:
- littlefs
topics:
- arduino
- drone
- drones
- esp32
- fpv
- fpv-drones
- fpvracing
- laptimer
isShow: true
image: /202602/openlap.webp
createdAt: '2026-02-04'
updatedAt: '2026-02-04'
relatedProjects:
- nearplane-adsb-tracker
- euc-dash-esp32-dashboard
- avem
- fpv-drone-stm32f411-flight-controller
- esp32-flight-tracker
- drone-stm32f1
---

## Overview

OpenLap is an open-source, DIY laptimer designed specifically for single-pilot FPV (First Person View) drone racing. By leveraging the processing power and built-in Wi-Fi capabilities of the ESP32, combined with the widely available RX5808 video receiver module, OpenLap provides a portable and cost-effective solution for pilots to track their performance. The system functions by monitoring the RSSI (Received Signal Strength Indicator) from the drone's video transmitter to detect when it passes through a gate.

## Hardware Architecture

The project is built around the ESP32 development board. To interface with the RX5808 receiver, a small hardware modification known as the "SPI Mod" is required, allowing the ESP32 to communicate with the receiver over the SPI bus. This enables the firmware to programmatically change frequencies and channels. 

Key hardware connections include:
- **SPI Interface**: MOSI and SCK pins are used to control the RX5808.
- **RSSI Monitoring**: The analog RSSI signal from the receiver is connected to an analog input on the ESP32 (pin D33) to detect the proximity of the drone.
- **Battery Monitoring**: The system includes support for monitoring the laptimer's own battery voltage. Because the ESP32 has a 3.3V limit, the project utilizes a simple voltage divider circuit to safely step down battery voltages (such as from a 4S LiPo) to a readable level.

## Firmware and Software Stack

OpenLap is developed using the Arduino framework within the PlatformIO ecosystem. The firmware utilizes several modern embedded software techniques to ensure a responsive user experience:

- **Asynchronous Web Server**: By using `ESPAsyncWebServer`, the laptimer hosts a web interface that remains responsive even while the system is actively monitoring RSSI for lap passes.
- **Filesystem Integration**: The project uses `LittleFS` to store the web application files separately from the main firmware, allowing for a rich, browser-based UI.
- **JSON Communication**: `ArduinoJson` is employed to handle configuration data and real-time updates between the ESP32 and the client browser.

## Features and Usage

The user experience is centered around a mobile-friendly web interface. Upon powering up, the ESP32 creates a Wi-Fi Access Point. Once connected, users can access the control dashboard via their browser to:

- **Select Frequency**: Pick the specific band and channel matching the drone's video transmitter.
- **Calibrate**: A critical feature that allows the pilot to set the signal threshold. By placing the drone at the furthest point of the gate and clicking "Calibrate," the system adjusts its sensitivity to prevent false triggers.
- **Race Management**: Set lap counts or choose an infinite race mode. The system provides real-time feedback on lap times and battery health.

## Customization and Assembly

Beyond the electronics, OpenLap includes CAD files for a 3D-printable enclosure, making it a complete field-ready device. Configuration settings, such as Wi-Fi credentials and battery resistor values, are easily accessible in a central `config.h` file, allowing users to tailor the device to their specific hardware setup.
