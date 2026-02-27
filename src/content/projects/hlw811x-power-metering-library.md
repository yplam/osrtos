---
title: HLW811x Power Metering Library
summary: A driver library for the HLW8110 and HLW8112 power metering ICs, designed
  for embedded systems. It currently supports the ESP32 platform via ESP-IDF and features
  a portable architecture for integration with other microcontrollers.
slug: hlw811x-power-metering-library
codeUrl: https://github.com/MahdaSystem/HLW811x
star: 19
lastUpdated: '2024-06-06'
rtos: freertos
topics:
- current
- esp32
- esp32-idf
- hlw8110
- hlw8112
- hlw811x
- power-measurement
- power-meter
- powermeter
- voltage
isShow: false
createdAt: '2026-02-27'
updatedAt: '2026-02-27'
---

## Overview

The HLW811x library is a specialized driver designed for the HLW8110 and HLW8112 high-precision power metering integrated circuits. These ICs are commonly found in smart home devices, energy monitoring systems, and industrial power meters, providing accurate measurements of electrical parameters such as voltage, current, and power consumption.

This project aims to simplify the integration of these sensors into embedded firmware by providing a structured API to interact with the chip's registers and internal calculation engines.

## Hardware Support and Portability

Currently, the library is optimized for the **ESP32** platform using the **ESP-IDF** (Espressif IoT Development Framework). Because ESP-IDF is built upon FreeRTOS, the library fits naturally into multi-threaded embedded applications.

One of the core strengths of this library is its focus on portability. The repository is organized with a clear separation between the core driver logic and the hardware abstraction layer:
- **src**: Contains the main driver logic and register definitions for the HLW811x series.
- **port**: Contains platform-specific implementations. This structure allows developers to port the driver to other microcontrollers (such as STM32, Arduino, or nRF52) by simply implementing the communication interface (SPI or UART) for their specific hardware.
- **config**: Provides configuration files to tune the driver behavior and calibration settings.

## Key Features

The HLW811x ICs are capable of measuring a wide array of AC parameters, and this driver provides the interface needed to access them:
- **RMS Measurements**: Retrieve Root Mean Square values for both voltage and current.
- **Power Calculation**: Access active power, reactive power, and apparent power data.
- **Energy Metering**: Monitor energy accumulation over time for billing or usage tracking.
- **Line Frequency**: Measure the frequency of the AC signal.

## Technical Implementation

The driver handles the low-level complexities of the HLW811x communication protocol. This includes managing register reads/writes, handling checksums or data integrity checks if applicable, and converting raw register values into human-readable units (like Volts, Amps, and Watts) based on the user's calibration constants.

## Getting Started

For developers using the ESP32, the library can be integrated as a component within an ESP-IDF project. Users will typically need to:
1. Initialize the communication peripheral (SPI or UART) on the ESP32.
2. Link the peripheral to the HLW811x driver via the porting layer.
3. Call the initialization functions to configure the IC's gain and monitoring modes.
4. Periodically poll the driver or use interrupts to retrieve the latest metering data.

As the project is currently under development, it offers a flexible foundation for developers who need to implement custom power monitoring solutions and are comfortable working with evolving codebases.
