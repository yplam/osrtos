---
title: M5Cardputer Movement Detector Alarm
summary: An alarm system for the M5Cardputer platform that utilizes a PIR sensor to
  detect motion. The project features audible alerts, RGB LED status indicators, and
  an interactive display interface with adjustable volume and brightness controls.
slug: m5cardputer-movement-detector-alarm
codeUrl: https://github.com/geo-tp/M5Cardputer-Alarm-PIR-Sensor
star: 11
version: v1.0
lastUpdated: '2024-05-24'
rtos: freertos
topics:
- alam
- cardputer
- m5cardputer
- m5stack
- pir-sensor
isShow: false
createdAt: '2026-03-24'
updatedAt: '2026-03-24'
---

## Overview

The M5Cardputer Movement Detector Alarm is a specialized firmware designed to transform the M5Cardputer—a portable ESP32-S3 based development kit—into a functional security device. By interfacing with a digital PIR (Passive Infrared) sensor, the system monitors its environment for movement and triggers a multi-sensory alarm response upon detection.

Built using the Arduino framework and the M5Cardputer library, this project demonstrates how to integrate external Grove-compatible sensors with the M5Stack ecosystem to create practical, real-world applications. The system is designed for ease of use, offering both pre-compiled binaries for quick deployment via M5Burner and source code for developers looking to customize the alarm logic.

## Key Features

The firmware leverages the unique hardware capabilities of the M5Cardputer to provide a comprehensive user experience:

- **Motion Detection:** Interfaces with a digital PIR sensor (optimized for the Grove Digital PIR Sensor) connected to Pin 1.
- **Visual Alerts:** When movement is detected, the built-in RGB LED switches to red, and the 1.14-inch TFT screen displays the current detection status.
- **Audible Alarm:** The system generates a frequency-patterned alarm sound through the onboard speaker to alert users of an intrusion.
- **Interactive Controls:** Users can fine-tune the device's behavior using the integrated keyboard. The arrow keys provide intuitive control over display brightness and alarm volume.
- **Status Monitoring:** The screen provides real-time feedback on the sensor state and system settings.

## Technical Implementation

The project is developed using PlatformIO and targets the `m5stack-stamps3` board, which powers the M5Cardputer. It relies on the FreeRTOS-based Arduino core for ESP32 to handle concurrent tasks such as sensor polling, display updates, and audio generation.

### Hardware Configuration

The system is designed to work with any standard digital PIR sensor, though it is specifically documented for use with the Seeed Studio Grove Digital PIR Sensor. The sensor is connected via the M5Cardputer's Grove port, utilizing Pin 1 for digital input. 

### User Interface and Controls

One of the highlights of this project is the utilization of the M5Cardputer's keyboard for on-the-fly adjustments:
- **Volume Control:** Use the Up and Down arrow keys to increase or decrease the alarm's decibel level.
- **Brightness Control:** Use the Left and Right arrow keys to dim or brighten the TFT display, allowing for discreet operation or high visibility depending on the environment.

## Getting Started

For users looking to deploy the alarm quickly, the firmware is available on M5Burner within the M5Cardputer section. Developers wishing to modify the code can use the PlatformIO environment to build and flash the project. Once powered on, the PIR sensor begins monitoring immediately. When the digital signal from the sensor goes high, the alarm sequence is triggered, providing both local visual and audio feedback.
