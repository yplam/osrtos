---
title: AXP2101 PMIC Driver for ESP-IDF
summary: A specialized port of the XPowersLib library to the ESP-IDF framework for
  managing the AXP2101 Power Management IC. It provides a comprehensive API for controlling
  power rails, monitoring status, and configuring voltage outputs on ESP32-based hardware.
slug: axp2101-pmic-driver-for-esp-idf
codeUrl: https://github.com/HwzLoveDz/AXP2101-PMIC
star: 12
lastUpdated: '2025-05-19'
rtos: freertos
libraries:
- lwip
topics:
- c
- cpp
- esp-idf
- esp32
- esp32-s3
- pmic
isShow: false
createdAt: '2026-02-25'
updatedAt: '2026-02-25'
---

## Overview

The AXP2101-PMIC project is a dedicated port of the XPowersLib library specifically tailored for the ESP-IDF (Espressif IoT Development Framework). This repository serves as an implementation example and driver set for the AXP2101 Power Management Integrated Circuit (PMIC), which is commonly used in advanced ESP32-S3 and IoT development boards to manage complex power requirements.

By integrating XPowersLib into the ESP-IDF environment, this project allows developers to leverage the full power of the AXP2101, including fine-grained control over multiple power domains, battery charging management, and system protection features. It simplifies the process of initializing the PMU (Power Management Unit) and provides a clean API for adjusting voltages across various rails like DCDC, ALDO, and BLDO.

## Key Features

- **Comprehensive Rail Control**: Enables and disables specific power rails including DCDC1-5, ALDO1-4, and BLDO1.
- **Voltage Management**: Provides APIs to set precise millivolt values for different components, ensuring hardware safety and efficiency.
- **I2C Integration**: Uses the standard ESP-IDF I2C driver for communication, with configurable GPIO pins for SCL and SDA.
- **Interrupt Support**: Includes support for PMU interrupt pins to handle power-related events asynchronously.
- **Menuconfig Integration**: Fully integrated with the ESP-IDF `menuconfig` system, allowing developers to configure PMU types and pin assignments through a graphical interface.

## Technical Implementation

The driver is built as an ESP-IDF component, making it easy to drop into existing projects. It relies on the underlying FreeRTOS kernel provided by ESP-IDF for task management and synchronization. The implementation abstracts the complex register-level operations of the AXP2101 into high-level C++ and C APIs.

### Configuration and Build

The project utilizes the standard ESP-IDF build system. Configuration is handled via `idf.py menuconfig`, where users can navigate to the `XPowers Configuration` menu to define:
- The specific PMU Type.
- I2C SCL and SDA GPIO numbers (defaulting to 22 and 21).
- The PMU Interrupt Pin (defaulting to 35).

## Example Usage

When the project is built and flashed, it initializes the I2C bus and the PMU. The following output demonstrates the driver successfully configuring various power rails for an attached system:

```text
I (345) mian: I2C initialized successfully
I (355) AXP2101: Init PMU SUCCESS!
I (385) AXP2101: DCDC=======================================================================
I (385) AXP2101: DC1  :ENABLE    Voltage:3300 mV
I (385) AXP2101: DC2  :DISABLE   Voltage:900 mV
I (395) AXP2101: DC3  :ENABLE    Voltage:3300 mV
I (405) AXP2101: ALDO=======================================================================
I (415) AXP2101: ALDO1:ENABLE    Voltage:1800 mV
I (425) AXP2101: ALDO2:ENABLE    Voltage:2800 mV
```

## Hardware Compatibility

While primarily tested with the ESP32-S3 as indicated by the project's `sdkconfig`, the driver is designed to be compatible with any SoC supported by ESP-IDF v5.x that features an I2C peripheral. It is particularly useful for developers working with LilyGO T-Display-S3 or similar boards that utilize the XPowers AXP series PMICs for power distribution.
