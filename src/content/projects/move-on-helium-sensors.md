---
title: MOVE-ON Helium Sensors
summary: The sensor subsystem for the MOVE-ON Helium high-altitude balloon mission,
  built on Mbed OS. It provides data collection and monitoring capabilities for balloon-borne
  scientific payloads, targeting STM32 microcontrollers. The project includes integration
  with Grafana for data visualization and supports automated deployment via GitLab
  CI.
slug: move-on-helium-sensors
codeUrl: https://github.com/MOVE-II/move-on-helium-sensors
star: 0
lastUpdated: '2018-05-27'
rtos: mbed-os
topics:
- mbed-os
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- apache-mynewt-sensor-network-for-stm32-blue-pill
- project-shadow-flight
- freevario
- mbed-os-treasure-data-example
- mqtt-demo-for-stm32-iot-discovery-board-with-thingsboard
- pv-curve-tracer
---

## Overview

The MOVE-ON Helium Sensors project is a specialized firmware subsystem designed for the MOVE-ON Helium high-altitude balloon mission. It serves as the primary sensor data acquisition unit, collecting critical environmental and system data during flight. Built on the Arm Mbed OS platform, the project provides a robust foundation for real-time sensor monitoring in the demanding conditions of high-altitude ballooning.

## Technical Architecture

The system is developed using the Mbed OS framework, specifically targeting STM32 microcontrollers. The architecture leverages the Mbed CLI for dependency management and build orchestration, ensuring a reproducible environment across different development machines. 

Key technical components include:
- **Mbed OS Core**: Provides the real-time operating system primitives, thread management, and hardware abstraction layers.
- **Sensor Interfacing**: Logic for communicating with various onboard sensors via standard protocols.
- **Telemetry Output**: Data is exposed via Micro USB for local debugging and monitoring, as well as integrated into a broader telemetry pipeline.
- **Visualization**: The project includes documentation and configurations for a Grafana dashboard, allowing operators to visualize sensor data in real-time during testing or flight.

## Development and Build System

The project maintains a sophisticated development workflow designed for both local development and automated continuous integration. It supports multiple toolchains and environments:
- **Toolchain**: GNU Arm Embedded Toolchain (gcc-arm-none-eabi).
- **IDE Support**: Export configurations for SW4STM32 (Eclipse), allowing developers to use a full-featured graphical IDE for debugging.
- **Containerization**: A Dockerfile is provided to standardize the build environment, ensuring that the Mbed CLI and ARM toolchain versions are consistent across the team.
- **CI/CD**: A GitLab CI pipeline is configured to automate the build process, generate artifacts, and even handle remote deployment to target hardware via `st-flash` over SSH.

## Hardware Integration

The firmware is designed to run on STM32-based hardware, likely Nucleo or custom boards, utilizing ST-Link for flashing and debugging. The README provides specific instructions for interfacing with the device over Micro USB using tools like `picocom`, enabling a 115200 baud serial interface for data retrieval and system status monitoring.

## Getting Started

For developers looking to work with the MOVE-ON Helium Sensors, the project utilizes `direnv` and `virtualenv` to manage the Python-based Mbed CLI environment. Once the environment is set up, the project can be compiled using a standard Makefile interface within the `src` directory. The build system supports several targets, including `make flash` for local deployment and `make deploy` for remote CI-based flashing and serial tailing.
