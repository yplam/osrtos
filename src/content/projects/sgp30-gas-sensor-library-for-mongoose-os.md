---
title: SGP30 Gas Sensor Library for Mongoose OS
summary: A Mongoose OS library for the Sensirion SGP30 multi-pixel gas sensor that
  provides measurements for TVOC and CO2 equivalent levels. It integrates the official
  Sensirion embedded driver and utilizes the I2C interface for hardware communication.
  The library is designed for embedded IoT applications requiring air quality monitoring.
slug: sgp30-gas-sensor-library-for-mongoose-os
codeUrl: https://github.com/wolfeidau/mgos-sgp30
siteUrl: https://www.sensirion.com/en/environmental-sensors/gas-sensors/multi-pixel-gas-sensors/
star: 1
lastUpdated: '2018-03-27'
rtos: mongoose-os
topics:
- iot
- mongoose-os
- sgp30
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mongoose-os-bme680-library
- sgp30-gas-sensor-driver-for-rt-thread
- ccs811-digital-gas-sensor-driver-for-rt-thread
- mongoose-os-environmental-sensors-application
- max17263-library-for-mongoose-os
- ltc68xx-battery-monitoring-library-for-mongoose-os
---

The `mgos-sgp30` library provides a seamless integration for the Sensirion SGP30 gas sensor within the Mongoose OS ecosystem. The SGP30 is a high-performance multi-pixel gas sensor designed for indoor air quality monitoring, capable of measuring Total Volatile Organic Compounds (TVOC) and CO2 equivalent (eCO2) signals with high stability and accuracy.

### Core Functionality

This library acts as a wrapper around the official Sensirion Embedded SGP30 Driver, ensuring that the low-level communication protocols and sensor-specific logic adhere to the manufacturer's specifications. By leveraging the Mongoose OS I2C driver, it provides a stable interface for retrieving air quality data in real-time. The library handles the initialization of the sensor and the periodic measurement cycles required to maintain accurate readings.

### Key Features

- **Air Quality Metrics**: Provides direct access to TVOC and eCO2 readings, which are essential for environmental monitoring applications.
- **I2C Interface Support**: Utilizes the standard Mongoose OS I2C library, making it compatible with various hardware platforms supported by the OS, such as ESP32 and STM32.
- **Multi-Language Support**: The project includes support for both C and JavaScript (via mJS). The presence of the `mjs_fs` directory indicates that developers can interact with the sensor using high-level scripts, which is a core feature of the Mongoose OS workflow.
- **Official Driver Integration**: By incorporating the Sensirion Embedded Driver, the library ensures that complex tasks like baseline compensation and sensor calibration are handled correctly according to the hardware's requirements.

### Technical Implementation

The project is structured as a standard Mongoose OS library. The `mos.yml` configuration file defines the necessary dependencies, specifically the `mongoose-os-libs/i2c` library. The source code is organized into the main library logic and a specific `SGP30_driver` subdirectory containing the vendor-supplied code. This modular approach allows for easy updates to the underlying driver while maintaining a consistent API for the user.

### Getting Started

To use this library in a Mongoose OS project, developers add it to their `mos.yml` dependencies. Once included, the sensor can be initialized over the I2C bus. The library abstracts the complexities of the SGP30's measurement cycles, allowing developers to focus on application-level logic like data logging, local display, or cloud reporting via MQTT or HTTP. 

Because it is built for Mongoose OS, it benefits from the platform's robust networking and OTA (Over-the-Air) update capabilities, making it an excellent choice for distributed IoT sensor networks. The library is released under the Apache License 2.0, making it suitable for both open-source and commercial embedded applications.
