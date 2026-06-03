---
title: Home Smart Mesh SDK for Thingy53
summary: A Zephyr-based reference SDK for the Nordic Thingy53 IoT prototyping platform.
  It provides drivers and samples for air quality monitoring using the BME688 sensor,
  OpenThread mesh networking, and C++ application logic with JSON-based configuration.
slug: home-smart-mesh-sdk-for-thingy53
codeUrl: https://github.com/HomeSmartMesh/sdk-hsm-thingy53
star: 22
lastUpdated: '2024-01-27'
rtos: zephyr
libraries:
- open-thread
- mcuboot
- lvgl
- littlefs
topics:
- air-quality
- bh1749
- bme688
- bsec2
- light-color
- mesh-networks
- openthread
- sensor
- thingy53
- thread
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- bluetooth-mesh-sensor-network
- beelight-zigbee-light-environment-sensor
- q-sensor-multi-functional-zigbee-air-quality-sensor
- esphome-ikea-vindriktning
- ruuvitag-firmware-for-zephyr-os
- ccs811-digital-gas-sensor-driver-for-rt-thread
---

The `sdk-hsm-thingy53` repository is a comprehensive development kit for the Nordic Thingy53, built on the Zephyr RTOS. It serves as a reference for creating smart home sensors and mesh network nodes, specifically focusing on environmental sensing and low-power communication within the Home Smart Mesh ecosystem.

### Advanced Environmental Sensing

One of the standout features of this SDK is its deep integration with the Bosch BME688 "digital nose" sensor. Unlike standard drivers that only provide temperature and humidity, this project includes a custom Zephyr driver and a C++ server subsystem. It integrates Bosch's BSEC2 library to provide Indoor Air Quality (IAQ) measurements, CO2 equivalents, and Breath VOC calculations. 

The driver extension functions enable the BME688 to operate in parallel mode, allowing for complex gas measurement profiles. A C++ wrapper allows developers to configure these profiles using JSON structures, delivering results like gas resistance across multiple channels in a format that maps directly to MQTT payloads.

### Mesh Networking with OpenThread

The SDK leverages OpenThread to create a robust mesh network. It includes a variety of samples for Thread commissioning (Joiner/Commissioner), UDP packet broadcasting, and JSON-based endpoints. This allows Thingy53 devices to act as sensor servers that report data to a central gateway, such as a Raspberry Pi, or respond to remote commands over the mesh.

### Hardware Support

Designed specifically for the Nordic Thingy53 (nRF5340 SoC), the project provides out-of-the-box support for the board's primary components:
- **BME688**: Gas, pressure, temperature, and humidity sensing with AI-driven IAQ.
- **BH1749NUC**: High-precision RGB and IR light sensing.
- **nPM1100 PMIC**: Battery voltage monitoring and charging status via GPIO and ADC.
- **User Interface**: RGB LED control via PWM and button handling for system resets or Thread commissioning.

### Modular Architecture

The repository is structured as a Zephyr workspace application, making it lightweight and easy to integrate into larger projects. It contains:
- **Drivers**: Custom implementations for the BME688 and BH1749 using Zephyr's Sensor API.
- **Subsystems**: The `bme688_server` library, which handles the complexity of the Bosch BSEC2 binary integration.
- **Samples**: Over 20 graduated samples ranging from simple UART "Alive Counters" to a full-featured "Sensors Server" that broadcasts environmental data over OpenThread.

### Getting Started

The project uses the `west` tool for dependency management. By initializing the workspace with the provided manifest, developers get a curated environment including the nRF Connect SDK (NCS) and necessary modules like OpenThread and MCUBoot. Building and flashing is handled through standard Zephyr workflows:

```bash
# Initialize the workspace
west init -m https://github.com/HomeSmartMesh/sdk-hsm-thingy53 --mr main
west update

# Build the sensors server sample
cd hsm/samples/20_sensors_server
west build
west flash
```

This SDK is an ideal starting point for developers looking to build professional-grade IoT sensors with the nRF5340, combining the power of Zephyr RTOS with advanced environmental sensing and modern mesh networking.
