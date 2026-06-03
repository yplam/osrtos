---
title: MAX17263 Library for Mongoose OS
summary: A Mongoose OS library providing support for the MAX17263 battery fuel gauge
  IC. It is a port of the Arduino library, utilizing Mongoose OS's Arduino compatibility
  layer and Wire library for I2C communication.
slug: max17263-library-for-mongoose-os
codeUrl: https://github.com/Podnet/MAX17263
star: 2
lastUpdated: '2020-05-24'
rtos: mongoose-os
topics:
- arduino
- battery-monitor
- battery-soc
- battery-status
- esp32
- mongoose-os
- mongoose-os-library
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- max17263-test-app-for-mongoose-os
- ltc68xx-battery-monitoring-library-for-mongoose-os
- hx711-library-for-mongoose-os
- lis3dh-accelerometer-library-for-mongoose-os
- sgp30-gas-sensor-library-for-mongoose-os
- arduino-rf24-for-mongoose-os
---

The MAX17263 is a high-precision battery fuel gauge IC designed to provide accurate state-of-charge (SoC) data for lithium-ion batteries. This repository provides a dedicated library for Mongoose OS, allowing developers to easily integrate battery monitoring capabilities into their IoT firmware.

Originally based on an Arduino implementation, this library has been ported to the Mongoose OS ecosystem. It leverages the `arduino-compat` and `arduino-wire` libraries provided by the Mongoose OS team, which allows the driver to use familiar I2C communication patterns while running within the Mongoose OS environment.

## Integration with Mongoose OS

The library is structured as a standard Mongoose OS library. To use it in a project, developers simply need to add it to their `mos.yml` configuration file. Because it depends on the Arduino compatibility layers, it bridges the gap between existing Arduino-based sensor drivers and the robust, cloud-ready features of Mongoose OS.

## Key Features

The MAX17263 IC itself is known for its ModelGauge m5 algorithm, which simplifies battery management by eliminating the need for battery characterization in many applications. By using this library, Mongoose OS applications can access critical battery metrics, including:

- **State of Charge**: Real-time battery percentage monitoring.
- **Voltage and Current**: Precise readings of battery electrical characteristics.
- **Capacity Estimation**: Insights into remaining capacity and time-to-empty calculations.
- **Temperature Sensing**: Access to internal or external temperature data for thermal management.

This port ensures that these hardware features are accessible through a consistent interface, making it an essential component for battery-powered IoT devices built on platforms like the ESP32 or CC32xx that run Mongoose OS.

## Technical Architecture

The project follows the standard Mongoose OS directory structure, with source files located in the `src` directory and headers in `include`. The `mos.yml` manifest defines the build requirements and dependencies, ensuring that the necessary I2C (Wire) and compatibility headers are pulled in during the build process. This modular approach allows for easy updates and maintenance while keeping the core application logic clean and focused on the device's primary functionality.
