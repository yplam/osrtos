---
title: MAX17263 Test App for Mongoose OS
summary: A Mongoose OS application designed to test the MAX17263 fuel gauge library,
  which was ported from Arduino. It provides a framework for integrating battery monitoring
  into IoT devices using the ModelGauge m5 algorithm.
slug: max17263-test-app-for-mongoose-os
codeUrl: https://github.com/Podnet/max17263-mgos-test
star: 1
lastUpdated: '2020-06-01'
rtos: mongoose-os
topics:
- arduino
- battery-level
- c
- cpp
- esp32
- esp8266
- max17263
- mongoose-os
- mongoose-os-app
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- max17263-library-for-mongoose-os
- hx711-testing-app-for-mongoose-os
- mcp2515-can-testing-app-for-mongoose-os
- ltc68xx-battery-monitoring-library-for-mongoose-os
- hx711-library-for-mongoose-os
- sgp30-gas-sensor-library-for-mongoose-os
---

## Overview

The MAX17263 test app is a specialized firmware project built for Mongoose OS, designed to validate and test the MAX17263 fuel gauge library. The MAX17263 is an ultra-low power IC from Maxim Integrated that implements the ModelGauge m5 algorithm, providing highly accurate battery state-of-charge (SoC) monitoring without requiring battery characterization in many cases.

This repository serves as a practical example for developers looking to integrate battery management systems (BMS) into the Mongoose OS ecosystem. It specifically focuses on the process of porting existing Arduino-based drivers into the C/C++ environment provided by Mongoose OS, making it a valuable reference for firmware engineers working on IoT power management.

## Technical Architecture

The project is structured as a standard Mongoose OS application, utilizing the platform's modular build system. The core configuration is managed via the `mos.yml` file, which defines the build environment, hardware abstraction layers, and external dependencies.

### Key Components

- **Mongoose OS Framework**: Provides the underlying RTOS and system services, including networking, security, and remote management.
- **MAX17263 Library Integration**: The project includes a specific port of the MAX17263 driver, originally sourced from the Arduino community, adapted for the Mongoose OS library structure.
- **RPC Services**: To facilitate testing and debugging, the application integrates several standard Mongoose OS RPC (Remote Procedure Call) services, including `rpc-service-fs` for filesystem interaction and `rpc-service-config` for runtime configuration.

## Porting and Development Status

One of the primary goals of this repository is to resolve specific technical challenges encountered when moving from the Arduino framework to a more structured RTOS environment. The project documentation highlights ongoing work in two main areas:

- **C++ Class Structure**: Refining how class methods are called within the library's implementation files to ensure compatibility with the Mongoose OS C++ compiler settings.
- **I2C Initialization**: Transitioning from the Arduino-specific `Wire.h` pattern to the native Mongoose OS I2C API. This is a critical step for ensuring that the fuel gauge can communicate reliably with the host microcontroller (such as an ESP32 or STM32) using the platform's native bus drivers.

## Hardware Support

The application is designed to interface with the MAX17263 hardware over an I2C bus. While Mongoose OS is cross-platform, this implementation is particularly suited for low-power wireless modules where battery life monitoring is essential. The ModelGauge m5 algorithm supported by the hardware allows the system to report remaining capacity, time-to-empty, and state-of-health, which are vital metrics for remote IoT deployments.

## Getting Started

To use this project, developers need the `mos` toolchain installed. The build process is handled by the Mongoose OS build server or local Docker container, which automatically fetches the dependencies listed in the `mos.yml` file. This includes the core boards support and the specific MAX17263 driver repository. Once built, the firmware can be flashed to any supported microcontroller to begin testing battery telemetry via the Mongoose OS console or RPC interface.
