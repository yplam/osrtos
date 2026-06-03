---
title: NodeMCU Device Lua Modules
summary: A comprehensive collection of Lua modules and a build environment for NodeMCU
  firmware, targeting ESP8266 and ESP32 microcontrollers. It includes features for
  WiFi management, Home Assistant integration, and various sensor/controller implementations
  using SPIFFS and LFS.
slug: nodemcu-device-lua-modules
codeUrl: https://github.com/fikin/nodemcu-device
star: 1
lastUpdated: '2024-08-17'
rtos: freertos
libraries:
- spiffs
- lwip
- u8g2
- ucglib
topics:
- home-assistant
- lfs
- nodemon
- spiffs
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nodemcu-firmware
- esp8266-home-automation
- mongoose-os-programs-and-examples
- homey-smart-home-controllers
- iot-framework-for-nodemcu
- micropython-smarthome-node-pysmartnode
---

## Overview

NodeMCU Device is a specialized repository designed to streamline the development and deployment of Lua-based firmware for ESP8266 and ESP32 microcontrollers. It provides a structured environment for managing Lua modules, automating the build process for NodeMCU firmware images, and integrating advanced features like Home Assistant support and captive portals. 

The project is built around the NodeMCU ecosystem, leveraging its ability to run Lua scripts on low-cost hardware. By utilizing both SPIFFS (SPI Flash File System) and LFS (Lua Flash Store), the project optimizes memory usage, allowing complex applications to run on devices with limited RAM, such as the WeMos D1 Mini.

## Key Features and Capabilities

The repository includes a wide array of pre-built Lua modules that cover common IoT requirements:

- **Network Management**: Includes a robust WiFi manager, mDNS advertising, and a Telnet server for remote access.
- **Web Services**: An HTTP server featuring a captive portal for initial configuration and support for Over-the-Air (OTA) updates.
- **Smart Home Integration**: Native integration with Home Assistant, allowing devices to be discovered and controlled easily within a home automation ecosystem.
- **Control Systems**: Implementations for PID controllers and thermostat control loops, suitable for HVAC or industrial automation tasks.
- **Logging**: Support for sending system logs over rsyslog (BSD UDP format) for centralized monitoring.
- **Sensor Support**: Modules for various hardware including DS18B20 temperature sensors, HC-SR04 ultrasonic sensors, and SCT013 current sensors.

## Technical Architecture

The project uses a modular directory structure where each functionality is encapsulated in its own folder under `lua_modules`. Each module typically contains two sub-directories:
- `lua/`: Files intended for the Lua Flash Store (LFS), which are compiled into the firmware to save RAM.
- `fs/`: Files intended for the SPIFFS filesystem, such as static web assets or configuration files.

The build system is driven by a `Makefile` and a `build.config` file. The configuration file allows developers to select which C modules (like `adc`, `gpio`, `wifi`) and Lua modules should be included in the final image. This selective approach ensures that the resulting firmware is lean and tailored to the specific hardware constraints of the target device.

## Build and Deployment Workflow

The project automates the complex task of patching and compiling the NodeMCU firmware. The workflow generally follows these steps:

1.  **Configuration**: Define the required modules and hardware settings in `build.config`.
2.  **Preparation**: Run `make prepare-firmware`, which clones the necessary upstream repositories (like `nodemcu-firmware`) and patches headers with the project's specific configurations.
3.  **Compilation**: Execute `make build` to generate the firmware binaries, SPIFFS images, and LFS images.
4.  **Flashing**: Use `make flash` to deploy the binaries to the connected microcontroller via serial.

One unique aspect of this project is its handling of LFS. On the first boot, the device is designed to auto-flash the `LFS.img` stored within the SPIFFS partition and then reboot, ensuring the latest compiled Lua code is active in the flash-mapped memory.

## Testing and Quality Assurance

To ensure reliability, the project includes both unit tests and integration tests. It utilizes `nodemcu-lua-mocks` to simulate the NodeMCU environment on a host machine, allowing for rapid development and verification of Lua logic without requiring physical hardware for every iteration. Coverage is tracked using `luacov`, providing insights into the robustness of the module implementations.
