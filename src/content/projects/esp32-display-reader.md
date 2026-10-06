---
title: ESP32 Display Reader
summary: An ESP32-based firmware for optical character recognition of 7-segment displays
  and status symbols using camera modules. It processes visual data locally and transmits
  recognized values to Home Assistant via MQTT, featuring a comprehensive web interface
  for ROI configuration and system management.
slug: esp32-display-reader
codeUrl: https://github.com/DocBigs-Lab/ESP32-Display-Reader
siteUrl: https://docbigs-lab.github.io/ESP32-Display-Reader/
lastUpdated: '2026-09-13'
image: /202610/ESP32-Display-Reader_0.avif
rtos: freertos
topics:
- auto-discovery
- docbigs-lab
- esp-camera
- esp32
- home-assistant
- mqtt
isShow: true
createdAt: '2026-10-06T01:35:15+00:00'
updatedAt: '2026-10-06T01:35:15+00:00'
---

The ESP32 Display Reader is a specialized firmware designed for ESP32 devices equipped with cameras. Its primary purpose is to act as an optical reader for 7-segment displays and status symbols, effectively digitizing data from legacy appliances or industrial equipment that lacks native smart connectivity. By capturing images and processing them locally, the system can identify numerical values and binary status indicators, making them available to modern IoT ecosystems.

### Display Compatibility

The system is optimized for reading "self-illuminating" displays, such as those found on modern heat pumps or digital meters. These displays provide the high contrast necessary for reliable optical recognition without complex lighting setups.


While the reader can also be used with traditional LCD displays, these typically require external illumination to achieve the contrast levels required for the image processing algorithms to function correctly.

### System Interface and Integration

One of the core strengths of this project is its user-friendly management system. It features a robust web interface that allows users to configure the device entirely within a browser. This includes setting up the Regions of Interest (ROI) for symbols and 7-segment digits, as well as managing firmware updates.

![ESP32 Display Reader Web Interface](/202610/ESP32-Display-Reader_2.avif)

Data captured by the camera is translated into MQTT messages. The firmware includes native Home Assistant Auto Discovery support, allowing the recognized numbers and symbols to appear automatically as entities within a Home Assistant instance.

![Home Assistant MQTT Integration Result](/202610/ESP32-Display-Reader_3.avif)

### Key Features

*   **Camera-Based Recognition**: Specialized in identifying 7-segment digits and on/off status symbols.
*   **Configurable Data Processing**: Supports numerical values with adjustable decimal places and custom publish intervals.
*   **Smart Home Ready**: Full MQTT integration with Home Assistant Auto Discovery for seamless sensor setup.
*   **Lighting Control**: Built-in support for optional PWM-controlled lighting or WS2812B (NeoPixel) LED channels to assist in low-light environments.
*   **Advanced Management**: Includes a Segment/Profiles Editor for different display types, JSON-based configuration export/import, and OTA firmware updates.

### Technical Requirements and Hardware

Due to the intensive nature of image processing on an embedded chip, the firmware requires an ESP32 module with PSRAM. This additional memory is essential for handling the frame buffers and processing tasks.

Currently supported hardware includes:
*   **ESP32-CAM**: The AI-Thinker compatible modules are fully supported.
*   **ESP32 WROVER**: Standard WROVER modules with camera headers.
*   **M5Stack AtomS3R M12**: Support for this ESP32-S3 and OV3660 based hardware is currently in beta.

### Getting Started

The project offers a streamlined installation process via a web-based installer, which automatically detects the connected chip and flashes the appropriate firmware directly from the browser. For developers preferring local builds, the project is structured for PlatformIO, allowing for standard compilation and uploading via the command line.
