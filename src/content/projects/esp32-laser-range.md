---
title: ESP32 Laser Range
summary: A DIY home laser shooting range built with the ESP32 and an OV2640 camera.
  The system detects laser pulses from a toy gun, applies perspective correction for
  accurate scoring, and provides a web-based dashboard for real-time feedback.
slug: esp32-laser-range
codeUrl: https://github.com/DIMOSUS/ESP32LaserRange
star: 28
lastUpdated: '2026-01-03'
rtos: freertos
topics:
- arduino
- computer-vision
- diy
- esp32
- ov2640
isShow: false
createdAt: '2026-01-15'
updatedAt: '2026-01-15'
relatedProjects:
- home-assistant-security-camera-with-esp32-cam
- engineering-diy-esp32-sensors-cameras-for-home-assistant
- bbmonitor
- esp32-cam-yolo-object-and-animal-detection
- esp32-thermal-camera-viewer
- openfire-firmware-for-esp32
---

## Overview

The ESP32 Laser Range is a creative application of computer vision on low-cost embedded hardware. By combining an ESP32 microcontroller with an OV2640 camera module, this project transforms a standard printed target into an interactive digital shooting range. It is designed to detect short laser pulses from toy guns, calculate the hit position, and display the results on a web interface accessible via tablets or computers.

## Technical Implementation

The core of the project lies in its ability to process image data in real-time. The ESP32 captures frames at approximately 60 frames per second, searching for the specific high-intensity signature of a laser spot. Because the camera is often mounted at an angle relative to the target, the project implements perspective correction (homography). This mathematical transformation maps the raw camera coordinates to the flat plane of the target, ensuring that hits are recorded accurately regardless of the camera's physical placement.

### Key Features
- **Real-time Detection**: High-speed frame capture for responsive hit detection.
- **Perspective Correction**: 4-point calibration allows the camera to be placed at various angles while maintaining accuracy.
- **Integrated Web Server**: No external PC software is required; the ESP32 hosts its own web interface for scoring and calibration.
- **Persistent Storage**: Calibration data is saved to the ESP32's flash memory, so the device remains ready for use after power cycles.
- **Multimedia Feedback**: The system includes support for playing gunshot sounds through the web interface to enhance the user experience.

## Hardware Requirements

The project specifically targets ESP32 modules equipped with PSRAM, such as the Freenove ESP32 Wrover or AI-Thinker modules. The additional memory provided by PSRAM is critical for handling the image buffers required for the OV2640 camera and the subsequent computer vision processing. On the transmitter side, users can adapt standard laser pointers, provided the pulse duration is tuned to approximately 10 milliseconds to be reliably captured by the camera sensor.

## Getting Started

Setting up the ESP32 Laser Range involves flashing the firmware via the Arduino IDE. Users must configure their Wi-Fi credentials and select the appropriate camera model definition in the source code. Once deployed, the system is calibrated through a dedicated web page where the user selects the four corners of the target. This calibration process aligns the digital coordinate system with the physical target, enabling precise scoring. 

The project relies on several key libraries for its functionality, including `ESPAsyncWebServer` for the user interface, `ArduinoJson` for data handling, and `JPEGDEC` for image processing tasks. By leveraging these tools, the project demonstrates how sophisticated computer vision concepts like homography can be implemented on affordable, hobbyist-grade microcontrollers.
