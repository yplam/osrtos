---
title: Eclipse ThreadX IoT DevKit Starter Application
summary: A foundational starter application for the MXChip AZ3166 IoT DevKit based
  on the Eclipse ThreadX RTOS and NetX Duo network stack. It provides a preconfigured
  environment for the STM32F412RG MCU, enabling WiFi connectivity and peripheral access
  for embedded IoT development.
slug: eclipse-threadx-iot-devkit-starter-application
codeUrl: https://github.com/eclipse-threadx/iot-devkit
siteUrl: https://projects.eclipse.org/projects/iot.threadx
star: 14
version: v1.0.0
lastUpdated: '2025-10-07'
rtos: threadx
libraries:
- filex
- guix
- eclipse-threadx-levelx
topics:
- eclipse-threadx
- iot
- iot-device
- iot-hub
- mcu
- microcontroller
isShow: true
image: /202601/emw3166.webp
createdAt: '2026-01-22'
updatedAt: '2026-01-22'
relatedProjects:
- stm32l475-freertos-iot-project
- stm32f429-nucleo-lwip-and-freertos-template
- ameba-rtos-sdk
- eclipse-threadx-usbx
- iotconnect-azure-rtos-sdk
- eclipse-threadx-netx-duo
---

## Overview

The Eclipse ThreadX IoT DevKit Starter Application is a specialized firmware template designed for developers working with the MXChip AZ3166 IoT DevKit. Originally developed by Microsoft and now part of the Eclipse Foundation's ThreadX ecosystem, this project serves as a streamlined starting point for building real-time IoT applications. By removing complex cloud-specific dependencies like Azure IoT Cloud, it provides a clean slate for developers to implement their own logic using the high-performance ThreadX RTOS and NetX Duo network stack.

## Hardware Support: The MXChip AZ3166

The primary target for this application is the MXChip AZ3166, a popular IoT development board that is both Arduino-compatible and capable of running sophisticated RTOS environments. At its heart lies the STMicroelectronics STM32F412RG MCU, featuring an ARM Cortex-M4 core clocked at 100MHz, 1MB of Flash, and 256KB of SRAM.

The board is densely packed with peripherals that the starter application is designed to initialize and manage, including:
- A 128x64 dot matrix OLED display (VGM128064)
- An HTS221 Temperature and Humidity sensor
- An LPS22HB Atmospheric pressure sensor
- A six-axis accelerometer (LSM6DSL) and geomagnetic sensor (LIS2MDL)
- WiFi connectivity (2.4GHz)
- Audio capabilities via the NAU88C10 ADC/DAC

## Technical Architecture

The project leverages the full Eclipse ThreadX suite, which is renowned for its safety certifications and MISRA-C compliance. The core components include:

- **ThreadX**: The advanced real-time operating system providing multitasking, scheduling, and synchronization.
- **NetX Duo**: An industrial-grade TCP/IP network stack that handles the board's WiFi connectivity and provides the foundation for MQTT or HTTP communication.

The build system is modern and cross-platform, utilizing CMake and Ninja. It is specifically optimized for the Arm GNU Toolchain (arm-none-eabi-gcc), making it accessible for developers on Windows, Linux, and macOS (including native support for Apple Silicon).

## Getting Started

To use this starter application, developers must clone the repository with submodules to ensure the ThreadX and NetX Duo source code is included. The application flow begins by scanning the I2C bus to identify onboard sensors, followed by the initialization of the ThreadX kernel and the WiFi subsystem.

### WiFi Configuration

Connecting the board to a local network requires simple modifications to the `cloud_config.h` header file. Developers can define their network credentials as follows:

```c
// cloud_config.h
#define HOSTNAME      "MyDevKit"
#define WIFI_SSID     "Your_SSID"
#define WIFI_PASSWORD "Your_Password"
#define WIFI_MODE     WIFI_MODE_WPA2
```

Once configured, the application provides real-time feedback through a serial terminal (115,200 baud), displaying the MAC address and connection status. Deployment is handled via a virtual USB drive; copying the compiled `mxchip_threadx.bin` file to the board's mass storage interface triggers the bootloader to flash the new firmware.

## Development and Contribution

As an Eclipse Foundation project, this repository operates under the Eclipse IP Policy and requires contributors to sign an Eclipse Contributor Agreement (ECA). The project maintains high standards for code quality, following the strict MISRA-C rules inherited from the original ThreadX source, ensuring that the starter application is suitable for both prototyping and safety-critical industrial applications.
