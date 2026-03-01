---
title: MCP2518FD CAN FD Logger for Raspberry Pi Pico
summary: A high-performance CAN BUS FD logger implementation for the Raspberry Pi
  Pico and Pico W microcontrollers. It utilizes the MCP2518FD controller via SPI to
  capture and record Flexible Data Rate (FD) communication, targeting automotive diagnostics
  and industrial monitoring applications.
slug: mcp2518fd-can-fd-logger-for-raspberry-pi-pico
codeUrl: https://github.com/Pier836/MCP2518FD-on-Raspberry-Pico
star: 10
lastUpdated: '2024-05-01'
rtos: ''
topics:
- c
- canbus
- canbus-shield
- mcp2518fd
- pico
- raspberry-pi-pico
- rp2040
- visual-studio-code
isShow: true
image: /202602/mcp2518fd.webp
createdAt: '2026-03-01'
updatedAt: '2026-03-01'
---

## Overview

The MCP2518FD-on-Raspberry-Pico project provides a robust implementation of a CAN BUS logger designed for the Raspberry Pi Pico ecosystem. By interfacing the RP2040 microcontroller with the Microchip MCP2518FD CAN FD controller, this project enables high-speed data logging with support for the Flexible Data Rate (FD) protocol. This makes it an ideal tool for automotive diagnostics, vehicle performance analysis, and industrial communication monitoring where high bandwidth and reliability are required.

Developed using the C/C++ Pico SDK and Visual Studio Code, the project serves as both a functional logging application and a driver porting example, demonstrating how to bridge professional-grade CAN controllers with the versatile Raspberry Pi Pico hardware.

## Hardware Implementation

The system is designed to work with a specific hardware stack that ensures signal integrity and ease of connection:

- **Raspberry Pi Pico / Pico W**: Acts as the central processing unit, managing the SPI communication with the CAN controller and handling data processing. The Pico W variant adds the potential for wireless data transmission or remote monitoring.
- **Dual CAN PICO V1.0**: A carrier board that facilitates the connection between the Pico and multiple CAN modules, simplifying the wiring and power management.
- **CAN BUS FD V1.4 Shield**: This module houses the MCP2518FD controller and the necessary transceivers to interface with the physical CAN bus, supporting the higher data rates associated with CAN FD.
- **PCF85063 RTC**: The inclusion of a real-time clock driver suggests support for accurate timestamping of logged CAN messages, which is critical for post-capture analysis.

## Technical Architecture

The software architecture is centered around a port of the official Microchip MCP251xFD SPI API. This ensures that the implementation follows the manufacturer's recommended procedures for initializing and managing the CAN FD controller. 

### Key Software Components:
- **Driver Layer (`drv_canfdspi_api.c`)**: A comprehensive port of the Microchip API, providing functions for configuring bit times, managing FIFOs, and handling error states.
- **SPI Abstraction (`drv_spi.c`)**: Tailors the SPI communication to the RP2040's hardware peripherals, ensuring efficient data transfer between the MCU and the CAN shield.
- **Application Logic (`app.c`)**: Manages the high-level state machine of the logger, including initialization, transmission requests, and receive handling.
- **Build System**: The project uses a standard CMake configuration, making it compatible with the official Raspberry Pi Pico toolchain and easy to integrate into larger firmware projects.

## Key Features

- **CAN FD Support**: Unlike standard CAN, this implementation supports Flexible Data Rate, allowing for larger payloads and faster bitrates.
- **Efficient SPI Communication**: Uses the hardware SPI capabilities of the RP2040 to minimize latency during message capture.
- **Configurable FIFOs**: Supports the configuration of transmit and receive channels to optimize the logger for specific bus loads.
- **Diagnostic Capabilities**: Includes functions for reading error counters and bus diagnostics, providing insight into the health of the connected CAN network.
- **LED Status Indicators**: Integrated LED control for visual feedback during initialization and data activity.

## Getting Started

To use the logger, developers need to set up the Raspberry Pi Pico SDK environment. The project is configured to build a `.uf2` file that can be dropped onto the Pico. The `CMakeLists.txt` file defines the project structure and links the necessary hardware libraries (`hardware_spi`, `hardware_gpio`, `hardware_i2c`). 

Users can customize the logging behavior by modifying `app.c`, where message IDs and FIFO settings are defined. The project also supports both the standard Pico and the Pico W, with the build configuration easily toggled in the CMake settings.
