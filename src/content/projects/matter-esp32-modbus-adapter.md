---
title: Matter ESP32 Modbus Adapter
summary: A Modbus to Matter adapter designed for the ESP32-C6 microcontroller. It
  enables Modbus-compatible devices, such as the Eastron SDM120M energy meter, to
  be exposed as Matter Electrical Sensor devices using the ESP-IDF framework and NimBLE
  Bluetooth stack.
slug: matter-esp32-modbus-adapter
codeUrl: https://github.com/tomasmcguinness/matter-esp32-modbus-adapter
star: 0
lastUpdated: '2026-03-29'
rtos: freertos
libraries:
- nimble
- lwip
isShow: true
image: /202603/modbus-over-matter-with-esp32.webp
createdAt: '2026-03-30'
updatedAt: '2026-03-30'
---

## Overview

The Matter ESP32 Modbus Adapter is an open-source project designed to bridge the gap between traditional Modbus-enabled hardware and the modern Matter smart home ecosystem. Developed specifically for the ESP32-C6 microcontroller, this project provides a functional template for exposing industrial or utility sensors as native Matter devices.

## Bridging Modbus and Matter

Modbus remains a staple protocol in industrial automation and energy monitoring, but it lacks native integration with consumer smart home platforms. This project solves that by acting as a gateway. It polls data from Modbus devices and translates those readings into Matter clusters. 

The primary implementation focuses on the Eastron SDM120M, a single-phase energy meter. The readings from this device are mapped and exposed to Matter controllers as an Electrical Sensor Device Type, allowing users to monitor energy consumption within standard smart home ecosystems.

## Hardware and Platform

The project is optimized for the Seeed XIAO ESP32-C6, a compact development board featuring the ESP32-C6 SoC. This chip is particularly well-suited for Matter applications as it supports Wi-Fi 6, Bluetooth 5 (LE), and IEEE 802.15.4 (Thread), providing the necessary radio hardware for Matter's multi-transport architecture. The GPIO configuration in the source code is pre-set to match the XIAO form factor, simplifying the hardware setup for developers.

## Technical Architecture

Built upon the Espressif IoT Development Framework (ESP-IDF) version 5.4, the project leverages several key components to ensure reliable operation:

- **FreeRTOS**: Manages task scheduling for Modbus polling and Matter event handling, ensuring that network communication does not interfere with sensor data acquisition.
- **Matter (Project CHIP)**: The core protocol stack used to handle commissioning, security, and data modeling. It allows the ESP32 to communicate with Matter fabrics.
- **NimBLE**: Utilized as the Bluetooth Low Energy stack for the commissioning process, providing a memory-efficient alternative to the standard Bluedroid stack.
- **Modbus Protocol**: Implemented to communicate with the Eastron SDM120M via a serial interface (typically RS485 with a transceiver).

## Key Features

- **Native Matter Support**: Devices appear as standard electrical sensors in Matter-compatible applications like Apple Home, Google Home, or Home Assistant.
- **Energy Monitoring**: Specifically designed to read electrical parameters such as voltage, current, and power from the SDM120M meter.
- **ESP32-C6 Optimization**: Takes advantage of the latest RISC-V based ESP32 silicon for efficient, modern wireless connectivity.
- **Customizable Partitioning**: Includes a custom `partitions.csv` to accommodate the large flash requirements of the Matter stack and NVS storage.

## Getting Started

To use this project, developers need an ESP-IDF environment configured for version 5.x. The project follows the standard ESP-IDF build system using CMake. The `sdkconfig` file provides the necessary hardware peripheral definitions, while the `main` directory contains the logic for Modbus register mapping and Matter attribute reporting. Once flashed to a XIAO ESP32-C6 and connected to a Modbus RTU interface, the device can be commissioned into a Matter fabric using a standard pairing process.
