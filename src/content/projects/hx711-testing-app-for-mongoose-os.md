---
title: HX711 Testing App for Mongoose OS
summary: A testing application for the HX711 load cell amplifier library ported to
  Mongoose OS. It demonstrates the integration of the Arduino-based HX711 driver within
  the Mongoose OS ecosystem for weight measurement applications.
slug: hx711-testing-app-for-mongoose-os
codeUrl: https://github.com/Podnet/hx711-mgos-test
star: 1
lastUpdated: '2020-06-13'
rtos: mongoose-os
topics:
- arduino
- c
- esp32
- esp8266
- hx711
- mongoose-os
- mongoose-os-app
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- hx711-library-for-mongoose-os
- max17263-test-app-for-mongoose-os
- mcp2515-can-testing-app-for-mongoose-os
- max17263-library-for-mongoose-os
- ds18b20-mgos-test
- lis3dh-accelerometer-library-for-mongoose-os
---

## Overview

The HX711-Test project is a dedicated testing application designed for Mongoose OS, specifically targeting the integration of the HX711 load cell amplifier. The project serves as a bridge for developers looking to use the popular Arduino HX711 library within the Mongoose OS environment, providing a verified port and a functional example of how to interface with weight sensors.

## Technical Implementation

The application is built using the Mongoose OS build system, defined by the `mos.yml` configuration file. It leverages the modular nature of Mongoose OS to include the HX711 library as a dependency. The project specifically references a port of the HX711 library originally designed for the Arduino framework, adapting it for use with Mongoose OS's C-based environment.

**Key components of the project include:**
- **Build Configuration**: The `mos.yml` file manages the project metadata, versioning, and external library dependencies.
- **Source Structure**: The application logic is contained within the `src` directory, while the `fs` directory is used for filesystem-related assets required by the Mongoose OS runtime.
- **Documentation**: The inclusion of a `Doxyfile` suggests that the project is prepared for automated API documentation generation, facilitating easier maintenance and integration for other developers.

## Hardware Integration

The HX711 is a precision 24-bit analog-to-digital converter (ADC) designed for weigh scales and industrial control applications to interface directly with a bridge sensor. This test app allows developers to verify that the timing-sensitive communication protocol used by the HX711 is functioning correctly on hardware supported by Mongoose OS, such as the ESP32 or ESP8266.

## Getting Started

To use this application, developers typically use the `mos` tool to build and flash the firmware to their target device. The project is configured to automatically pull the necessary HX711 library from its remote origin during the build process. This setup ensures that the latest compatible version of the library port is used, simplifying the development workflow for IoT-based weighing solutions.
